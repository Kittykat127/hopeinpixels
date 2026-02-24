import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Smartphone, Target, Sparkles, Upload, ArrowLeft, Camera, RotateCcw, Check, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const guidelines = [
  { icon: Sun, label: "Good Lighting", desc: "Use natural light, avoid shadows" },
  { icon: Smartphone, label: "Steady Camera", desc: "Hold 6–8 inches from skin" },
  { icon: Target, label: "Center the Lesion", desc: "Keep area of concern centered" },
  { icon: Sparkles, label: "Avoid Glare", desc: "No flash, no reflections" },
];

type ScanStep = "guide" | "camera" | "preview" | "analyzing";

const ScanPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ScanStep>("guide");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Could not access camera. Please allow camera permissions or upload a photo instead.");
    }
  }, [facingMode, stopCamera]);

  useEffect(() => {
    if (step === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step, startCamera, stopCamera]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
    stopCamera();
    setStep("preview");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      setStep("preview");
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    setStep("analyzing");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-skin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ image: capturedImage }),
        }
      );
      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Analysis failed" }));
        throw new Error(err.error || "Analysis failed");
      }
      const result = await response.json();
      navigate("/results/ai", { state: { result, image: capturedImage } });
    } catch (err: any) {
      console.error("Analysis error:", err);
      alert(err.message || "Analysis failed. Please try again.");
      setStep("preview");
    }
  };

  const resetScan = () => {
    setCapturedImage(null);
    setStep("guide");
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Restart camera when facingMode changes while in camera step
  useEffect(() => {
    if (step === "camera") {
      startCamera();
    }
  }, [facingMode, step, startCamera]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden elements */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="gradient-purple px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => {
              if (step === "guide") navigate("/");
              else resetScan();
            }}
            className="text-primary-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">
            {step === "guide" && "Scan Your Skin"}
            {step === "camera" && "Take a Photo"}
            {step === "preview" && "Review Photo"}
            {step === "analyzing" && "Analyzing..."}
          </h1>
        </div>
        <p className="text-xs text-primary-foreground/60 ml-8">
          Step {step === "guide" ? 1 : step === "camera" ? 2 : step === "preview" ? 3 : 4} of 4
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ===== GUIDE STEP ===== */}
        {step === "guide" && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="px-6 -mt-4 space-y-5 pb-8"
          >
            {/* Medical Disclaimer Banner */}
            <div className="bg-destructive/10 rounded-2xl p-4 border border-destructive/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Important Notice</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This app is <strong>not a medical device</strong> and <strong>cannot diagnose</strong> skin conditions. 
                    Results are for <strong>educational purposes only</strong> and should never replace professional medical advice. 
                    Always consult a qualified dermatologist or healthcare provider for any skin concerns.
                  </p>
                </div>
              </div>
            </div>

            {/* Camera viewfinder placeholder */}
            <div className="bg-card rounded-3xl overflow-hidden shadow-hp border border-border">
              <div className="aspect-[4/3] bg-muted/50 relative flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-hp-gold/50 flex items-center justify-center animate-float">
                  <Camera className="w-10 h-10 text-hp-gold/40" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2">
                    Position the skin area within the circle
                  </p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="grid grid-cols-2 gap-3">
              {guidelines.map((g, i) => (
                <motion.div
                  key={g.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-card rounded-xl p-4 border border-border flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <g.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{g.label}</p>
                    <p className="text-xs text-muted-foreground">{g.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button variant="gold" size="xl" className="w-full" onClick={() => setStep("camera")}>
                <Camera className="w-5 h-5 mr-2" />
                Open Camera
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-5 h-5 mr-2" />
                Upload from Gallery
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Don't worry about perfection—just do your best! Your photo is never shared.
            </p>
          </motion.div>
        )}

        {/* ===== CAMERA STEP ===== */}
        {step === "camera" && (
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 -mt-4 space-y-4 pb-8"
          >
            <div className="bg-card rounded-3xl overflow-hidden shadow-hp border border-border relative">
              {cameraError ? (
                <div className="aspect-[3/4] bg-muted/50 flex flex-col items-center justify-center p-6 text-center">
                  <AlertTriangle className="w-12 h-12 text-hp-gold mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">{cameraError}</p>
                  <Button variant="outline" size="default" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Instead
                  </Button>
                </div>
              ) : (
                <div className="aspect-[3/4] bg-foreground relative overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Target overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-52 h-52 rounded-full border-4 border-dashed border-hp-gold/60" />
                  </div>
                  {/* Flip camera button */}
                  <button
                    onClick={toggleCamera}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center"
                  >
                    <RotateCcw className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>
              )}
            </div>

            {!cameraError && (
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </button>
                <button
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full gradient-gold shadow-hp-gold flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-accent-foreground/20" />
                </button>
                <button
                  onClick={resetScan}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ===== PREVIEW STEP ===== */}
        {step === "preview" && capturedImage && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="px-6 -mt-4 space-y-4 pb-8"
          >
            <div className="bg-card rounded-3xl overflow-hidden shadow-hp border border-border">
              <img
                src={capturedImage}
                alt="Captured skin area"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>

            {/* Disclaimer reminder */}
            <div className="bg-destructive/5 rounded-xl p-3 border border-destructive/10">
              <p className="text-xs text-muted-foreground text-center">
                ⚠️ This is <strong>not a diagnosis</strong>. Results are for educational purposes only.
              </p>
            </div>

            <div className="space-y-3">
              <Button variant="gold" size="xl" className="w-full" onClick={handleAnalyze}>
                <Check className="w-5 h-5 mr-2" />
                Analyze This Photo
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep("camera")}>
                  <Camera className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== ANALYZING STEP ===== */}
        {step === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 -mt-4 pb-8 flex flex-col items-center justify-center min-h-[60vh]"
          >
            <div className="w-24 h-24 rounded-full gradient-gold animate-pulse-gold flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full gradient-purple animate-pulse flex items-center justify-center">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Analyzing your photo...</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Our AI is reviewing your image. This usually takes a few seconds.
            </p>
            {/* Progress bar */}
            <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="h-full gradient-purple rounded-full"
              />
            </div>
            <div className="mt-8 bg-destructive/5 rounded-xl p-3 border border-destructive/10 max-w-xs">
              <p className="text-xs text-muted-foreground text-center">
                ⚠️ Remember: This screening is <strong>not a medical diagnosis</strong>. 
                Please consult a doctor for professional evaluation.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanPage;
