import { useState, useEffect } from "react";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/pages/Dashboard";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem("hp-onboarding-done");
    if (seen) setShowOnboarding(false);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hp-onboarding-done", "true");
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard />;
};

export default Index;
