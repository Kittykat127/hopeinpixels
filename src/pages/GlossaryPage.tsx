import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Inflammatory", "Malignant", "Benign", "Infectious"];

const conditions = [
  { name: "Acne Vulgaris", category: "Inflammatory", desc: "Common skin condition causing pimples and blemishes", symptoms: ["Whiteheads", "Blackheads", "Inflammation"] },
  { name: "Atopic Dermatitis", category: "Inflammatory", desc: "Chronic condition causing itchy, inflamed skin", symptoms: ["Itching", "Redness", "Dry skin"] },
  { name: "Basal Cell Carcinoma", category: "Malignant", desc: "Most common type of skin cancer, usually slow-growing", symptoms: ["Pearly bump", "Flat lesion", "Bleeding sore"] },
  { name: "Eczema", category: "Inflammatory", desc: "Group of conditions causing inflamed, itchy skin", symptoms: ["Itchy patches", "Redness", "Swelling"] },
  { name: "Rosacea", category: "Inflammatory", desc: "Chronic skin condition causing facial redness", symptoms: ["Flushing", "Visible veins", "Bumps"] },
  { name: "Psoriasis", category: "Inflammatory", desc: "Autoimmune condition causing rapid skin cell turnover", symptoms: ["Scales", "Dry patches", "Itching"] },
  { name: "Melanoma", category: "Malignant", desc: "Most serious type of skin cancer developing in melanocytes", symptoms: ["Asymmetric mole", "Irregular borders", "Color changes"] },
  { name: "Contact Dermatitis", category: "Inflammatory", desc: "Skin reaction caused by contact with allergens or irritants", symptoms: ["Rash", "Blisters", "Itching"] },
  { name: "Squamous Cell Carcinoma", category: "Malignant", desc: "Second most common form of skin cancer", symptoms: ["Firm red nodule", "Flat sore", "Rough patch"] },
  { name: "Vitiligo", category: "Benign", desc: "Loss of skin color in patches due to melanocyte destruction", symptoms: ["White patches", "Premature graying", "Color loss"] },
  { name: "Fungal Infection", category: "Infectious", desc: "Skin infections caused by various fungi", symptoms: ["Ring-shaped rash", "Itching", "Scaling"] },
  { name: "Herpes Simplex", category: "Infectious", desc: "Viral infection causing blisters on skin or mucous membranes", symptoms: ["Cold sores", "Blisters", "Tingling"] },
  { name: "Warts", category: "Infectious", desc: "Small growths caused by human papillomavirus (HPV)", symptoms: ["Rough bumps", "Clusters", "Pain on pressure"] },
  { name: "Skin Tag", category: "Benign", desc: "Small, soft, benign growths hanging off the skin", symptoms: ["Painless growth", "Pedunculated", "Skin-colored"] },
];

const GlossaryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = conditions.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="gradient-purple px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">
            Skin Conditions & Medications
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conditions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none focus:ring-2 focus:ring-hp-gold/50"
          />
        </div>
      </div>

      <div className="px-6 mt-4 space-y-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "gradient-gold text-accent-foreground shadow-hp-gold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Condition Cards */}
        <div className="space-y-3">
          {filtered.map((condition, i) => (
            <motion.div
              key={condition.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-hp transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">{condition.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{condition.desc}</p>
                  <div className="flex gap-2 mt-2">
                    {condition.symptoms.map((s) => (
                      <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No conditions found matching "{search}"
          </p>
        )}

        <p className="text-center text-xs text-muted-foreground pt-4">
          Knowledge is power. Understanding your skin helps you advocate for your health. 💜
        </p>
      </div>
    </div>
  );
};

export default GlossaryPage;
