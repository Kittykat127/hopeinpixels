import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import onboardingScan from "@/assets/onboarding-scan.jpg";
import onboardingEquity from "@/assets/onboarding-equity.jpg";
import onboardingSteps from "@/assets/onboarding-steps.jpg";

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    image: onboardingEquity,
    headline: "Skin concerns? We're here to help.",
    body: "Millions lack access to dermatologists. Hope in Pixels gives you a first step toward understanding your skin health.",
  },
  {
    image: onboardingScan,
    headline: "AI that works for everyone",
    body: "Our AI is trained on all skin tones—so you get fair, accurate results regardless of your skin color.",
  },
  {
    image: onboardingSteps,
    headline: "Simple, private, secure",
    body: "Take a photo, get instant analysis, and learn your next steps. Your data stays yours.",
  },
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else onComplete();
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <div className="w-64 h-64 rounded-3xl overflow-hidden mb-8 shadow-hp-lg">
            <img
              src={slides[current].image}
              alt={slides[current].headline}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-primary-foreground mb-3">
            {slides[current].headline}
          </h2>
          <p className="text-primary-foreground/80 text-base leading-relaxed mb-8">
            {slides[current].body}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-hp-gold"
                : "w-2 bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>

      <Button variant="gold" size="xl" onClick={next} className="w-full max-w-xs">
        {current === slides.length - 1 ? "Get Started" : "Next"}
      </Button>

      {current < slides.length - 1 && (
        <button
          onClick={onComplete}
          className="mt-4 text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
        >
          Skip
        </button>
      )}
    </div>
  );
};

export default Onboarding;
