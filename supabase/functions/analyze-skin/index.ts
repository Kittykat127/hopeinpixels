import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI dermatology screening assistant for the app "Hope in Pixels". You analyze photos of skin conditions.

CRITICAL DISCLAIMERS YOU MUST INCLUDE:
- You are NOT a doctor and this is NOT a medical diagnosis.
- This is for EDUCATIONAL and INFORMATIONAL purposes only.
- The user MUST consult a qualified dermatologist or healthcare provider.

TASK:
Analyze the provided skin image and respond using the "analyze_skin" tool. Evaluate the image for potential skin conditions from this list of 23 conditions:
Acne Vulgaris, Atopic Dermatitis, Basal Cell Carcinoma, Eczema, Rosacea, Psoriasis, Melanoma, Contact Dermatitis, Squamous Cell Carcinoma, Actinic Keratosis, Seborrheic Keratosis, Vitiligo, Urticaria, Fungal Infection, Herpes Simplex, Shingles, Impetigo, Cellulitis, Lupus, Scarring, Warts, Molluscum Contagiosum, Skin Tag.

If the image does NOT appear to show skin or a skin condition, set "is_skin" to false and provide a message explaining that.

For severity, use the ABCDE rule where applicable (Asymmetry, Border, Color, Diameter, Evolution) and rate as "Low", "Moderate", or "High".

Provide 2-3 differential diagnoses with confidence percentages that sum to roughly 100% across all suggestions.
Provide practical, safe next steps (always including "see a dermatologist").
Provide commonly associated medications for educational reference only (never as a prescription).
Always include a suitable moisturiser (e.g. CeraVe Moisturising Cream, Cetaphil, Vanicream, or an appropriate option for the detected condition) in the medications list as a supportive care recommendation.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Strip data URL prefix if present to get raw base64
    const base64Data = image.includes(",") ? image.split(",")[1] : image;
    const mimeMatch = image.match(/^data:(image\/\w+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:${mimeType};base64,${base64Data}` },
              },
              {
                type: "text",
                text: "Please analyze this skin image for potential conditions. Remember: this is for educational screening only, not a diagnosis.",
              },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_skin",
              description: "Return structured skin analysis results",
              parameters: {
                type: "object",
                properties: {
                  is_skin: {
                    type: "boolean",
                    description: "Whether the image appears to show skin or a skin condition",
                  },
                  not_skin_message: {
                    type: "string",
                    description: "Message if is_skin is false explaining what was detected instead",
                  },
                  primary_condition: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      confidence: { type: "number", description: "0-100 percentage" },
                    },
                    required: ["name", "confidence"],
                  },
                  differentials: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        confidence: { type: "number" },
                      },
                      required: ["name", "confidence"],
                    },
                  },
                  severity: {
                    type: "object",
                    properties: {
                      level: { type: "string", enum: ["Low", "Moderate", "High"] },
                      score: { type: "number", description: "0-10 severity score" },
                    },
                    required: ["level", "score"],
                  },
                  indicators: {
                    type: "array",
                    items: { type: "string" },
                    description: "Visual indicators detected in the image",
                  },
                  next_steps: {
                    type: "array",
                    items: { type: "string" },
                    description: "Recommended next steps, always including seeing a doctor",
                  },
                  medications: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        dosage: { type: "string" },
                        type: { type: "string", description: "Over-the-counter or Prescription" },
                        rx: { type: "boolean" },
                      },
                      required: ["name", "dosage", "type", "rx"],
                    },
                  },
                },
                required: ["is_skin"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_skin" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI analysis failed. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "AI did not return structured results. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-skin error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
