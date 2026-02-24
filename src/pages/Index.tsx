import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import Onboarding from "@/components/Onboarding";
import Dashboard from "@/pages/Dashboard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      navigate("/auth");
    }
    if (session) {
      const seen = localStorage.getItem("hp-onboarding-done");
      setShowOnboarding(!seen);
    }
  }, [loading, session, navigate]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hp-onboarding-done", "true");
    setShowOnboarding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  if (!session) return null;

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard />;
};

export default Index;
