import { motion } from "framer-motion";
import { Sun, Smartphone, Target, Sparkles, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const guidelines = [
  { icon: Sun, label: "Good Lighting", desc: "Use natural light, avoid shadows" },
  { icon: Smartphone, label: "Steady Camera", desc: "Hold 6–8 inches from skin" },
  { icon: Target, label: "Center the Lesion", desc: "Keep area of concern centered" },
  { icon: Sparkles, label: "Avoid Glare", desc: "No flash, no reflections" },
];

const ScanPage = () => {
  const navigate = useNavigate();

  const handleScan = () => {
    navigate("/results/demo");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-purple px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">
            Take a Clear Photo
          </h1>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-6 pb-8">
        {/* Camera viewfinder mock */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-3xl overflow-hidden shadow-hp border border-border"
        >
          <div className="aspect-[3/4] bg-muted/50 relative flex items-center justify-center">
            {/* Target overlay */}
            <div className="w-48 h-48 rounded-full border-4 border-dashed border-hp-gold/50 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-hp-gold/30" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2">
                Position the skin area within the circle
              </p>
            </div>
          </div>
        </motion.div>

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
          <Button variant="gold" size="xl" className="w-full" onClick={handleScan}>
            <Target className="w-5 h-5 mr-2" />
            Take Photo (Demo)
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={handleScan}>
            <Upload className="w-5 h-5 mr-2" />
            Upload from Gallery
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Don't worry about perfection—our AI is trained to work with real-world photos.
        </p>
      </div>
    </div>
  );
};

export default ScanPage;
