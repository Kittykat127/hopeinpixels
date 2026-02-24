import { motion } from "framer-motion";
import { Camera, BookOpen, Clock, Settings, Lightbulb, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const tips = [
  "The ABCDE rule helps spot melanoma: Asymmetry, Border, Color, Diameter, Evolution.",
  "Melanoma is one of the most treatable cancers if caught early.",
  "Dark skin can get skin cancer too—don't skip checks.",
  "Our AI was trained on 23 conditions across 6 skin types.",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const tip = tips[Math.floor(Math.random() * tips.length)];

  const quickActions = [
    { icon: Camera, label: "New Scan", path: "/scan", gold: true },
    { icon: BookOpen, label: "Glossary", path: "/glossary", gold: false },
    { icon: Clock, label: "History", path: "/history", gold: false },
    { icon: Settings, label: "Settings", path: "/settings", gold: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-purple px-6 pt-12 pb-16 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Hi there 👋
            </h1>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Hero CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="gold"
            size="xl"
            className="w-full animate-pulse-gold"
            onClick={() => navigate("/scan")}
          >
            <Camera className="w-5 h-5 mr-2" />
            Start New Scan
          </Button>
          <p className="text-center text-primary-foreground/60 text-xs mt-2">
            Free, private, takes 2 minutes
          </p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6 space-y-6 pb-8">
        {/* Stats Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-hp border border-border"
        >
          <p className="text-sm font-semibold text-foreground mb-3">
            Your skin health at a glance
          </p>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-2xl font-bold text-hp-purple">0</p>
              <p className="text-xs text-muted-foreground">Total Scans</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-hp-gold">—</p>
              <p className="text-xs text-muted-foreground">Last Scan</p>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Ready for your first scan?
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-3"
        >
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  action.gold
                    ? "gradient-gold shadow-hp-gold"
                    : "bg-primary/10"
                }`}
              >
                <action.icon
                  className={`w-6 h-6 ${
                    action.gold ? "text-accent-foreground" : "text-primary"
                  }`}
                />
              </div>
              <span className="text-xs font-medium text-foreground">
                {action.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tip Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-hp-gold/10 rounded-2xl p-5 border border-hp-gold/20"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-hp-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Did you know?
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tip}
              </p>
              <button
                onClick={() => navigate("/glossary")}
                className="text-xs font-semibold text-hp-gold mt-2 hover:underline"
              >
                Learn more →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-destructive/5 rounded-xl p-4 border border-destructive/10"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Not a medical device.</strong> Hope in Pixels provides educational AI screening only and 
              cannot diagnose conditions. Always consult a qualified healthcare professional.
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            You've helped us prove AI can be fair. Thank you{" "}
            <Heart className="w-3 h-3 text-hp-purple fill-hp-purple" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
