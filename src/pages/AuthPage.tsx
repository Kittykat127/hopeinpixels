import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User, ArrowLeft, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: displayName },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a confirmation link." });
      setMode("login");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email sent", description: "Check your inbox for a reset link." });
      setMode("login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-purple px-6 pt-10 pb-12 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/")} className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-primary-foreground" />
          </button>
          <span className="text-primary-foreground/70 text-sm">Back</span>
        </div>
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-2xl font-bold text-primary-foreground flex items-center gap-2">
            <Heart className="w-6 h-6 fill-primary-foreground" />
            {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h1>
          <p className="text-primary-foreground/60 text-sm mt-1">
            {mode === "login" ? "Sign in to continue" : mode === "signup" ? "Join Hope in Pixels" : "We'll send you a reset link"}
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 -mt-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-6 shadow-hp border border-border"
        >
          <form onSubmit={mode === "login" ? handleLogin : mode === "signup" ? handleSignup : handleForgotPassword} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="name" placeholder="Your name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="pl-10" required />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <button type="button" onClick={() => setMode("forgot")} className="text-xs text-primary hover:underline">
                Forgot password?
              </button>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-primary font-semibold hover:underline">Sign up</button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-primary font-semibold hover:underline">Sign in</button>
              </>
            )}
          </div>
        </motion.div>

        {/* Medical Disclaimer */}
        <div className="mt-6 bg-destructive/5 rounded-xl p-4 border border-destructive/10">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Not a medical device.</strong> Hope in Pixels provides educational AI screening only.
              Always consult a qualified healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
