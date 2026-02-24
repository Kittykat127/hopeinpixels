import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, Shield, Heart, AlertTriangle, Moon, Sun, Monitor, LogOut, Mail, Lock, Trash2, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [user, setUser] = useState<{ email?: string; displayName?: string } | null>(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [missionOpen, setMissionOpen] = useState(false);
  const [citationsOpen, setCitationsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(() => localStorage.getItem("hp-notifications") !== "false");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (u) {
        setUser({ email: u.email, displayName: u.user_metadata?.display_name || u.email });
      }
    });
  }, []);

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated" });
      setNewPassword("");
      setChangePasswordOpen(false);
    }
  };

  const handleChangeEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Confirmation sent", description: "Check both your old and new email." });
      setNewEmail("");
      setChangeEmailOpen(false);
    }
  };

  const handleExportData = async () => {
    const { data: { user: u } } = await supabase.auth.getUser();
    if (!u) return;
    const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", u.id).single();
    const blob = new Blob([JSON.stringify({ user: { email: u.email, created_at: u.created_at }, profile }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hope-in-pixels-data.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Data exported" });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleDeleteAccount = async () => {
    toast({ title: "Contact us", description: "Please email support to delete your account. We'll handle it within 48h." });
    setDeleteAccountOpen(false);
  };

  const handleToggleNotifications = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem("hp-notifications", String(checked));
    toast({ title: checked ? "Notifications enabled" : "Notifications disabled" });
  };

  const initials = user?.displayName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "HP";

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-purple px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Settings</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center text-accent-foreground text-xl font-bold">
            {initials}
          </div>
          <div>
            <p className="text-primary-foreground font-semibold">{user?.displayName || "Loading…"}</p>
            <p className="text-primary-foreground/60 text-sm">{user?.email || ""}</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-4 space-y-6">
        {/* Medical disclaimer */}
        <div className="bg-destructive/5 rounded-xl p-4 border border-destructive/10">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Medical Disclaimer:</strong> This app is not a medical device and cannot diagnose skin conditions.
              Results are for educational purposes only. Always consult a healthcare professional.
            </p>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">Appearance</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
              <div className="flex items-center gap-3">
                {resolvedTheme === "dark" ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                <span className="text-sm text-foreground">Dark Mode</span>
              </div>
              <Switch checked={resolvedTheme === "dark"} onCheckedChange={(c) => setTheme(c ? "dark" : "light")} />
            </div>
            <button
              onClick={() => setTheme("system")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Monitor className="w-4 h-4 text-primary" />
                <span>Use System Theme</span>
              </div>
              {theme === "system" && <span className="text-xs text-primary font-semibold">Active</span>}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">Preferences</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm text-foreground">Push Notifications</span>
              <Switch checked={notifications} onCheckedChange={handleToggleNotifications} />
            </div>
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">Account</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingsButton label="Change Password" icon={<Lock className="w-4 h-4" />} onClick={() => setChangePasswordOpen(true)} border />
            <SettingsButton label="Change Email" icon={<Mail className="w-4 h-4" />} onClick={() => setChangeEmailOpen(true)} />
          </div>
        </div>

        {/* Privacy & Data */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">Privacy & Data</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingsButton label="Privacy Policy" onClick={() => navigate("/privacy")} border />
            <SettingsButton label="Terms of Service" onClick={() => navigate("/terms")} border />
            <SettingsButton label="Export My Data" icon={<Download className="w-4 h-4" />} onClick={handleExportData} />
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">About</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingsButton label="About Hope in Pixels" onClick={() => setAboutOpen(true)} border />
            <SettingsButton label="Our Fair AI Mission" onClick={() => setMissionOpen(true)} border />
            <SettingsButton label="Citations & Research" onClick={() => setCitationsOpen(true)} />
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">Support</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingsButton label="FAQs" onClick={() => setFaqOpen(true)} border />
            <SettingsButton label="Contact Us" onClick={() => setContactOpen(true)} border />
            <SettingsButton label="Report a Problem" onClick={() => setReportOpen(true)} />
          </div>
        </div>

        {/* Sign Out */}
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>

        {/* Delete Account */}
        <button
          onClick={() => setDeleteAccountOpen(true)}
          className="w-full py-3 text-sm font-semibold text-destructive hover:bg-destructive/5 rounded-xl transition-colors border border-destructive/20"
        >
          <Trash2 className="w-4 h-4 inline mr-2" />Delete Account
        </button>

        <div className="text-center space-y-1 pt-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Hope in Pixels v1.0</span>
          </div>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-hp-purple fill-hp-purple" /> by students committed to fair healthcare for all
          </p>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your new password below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="np">New Password</Label>
            <Input id="np" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} />
          </div>
          <DialogFooter>
            <Button onClick={handleChangePassword} disabled={loading}>{loading ? "Saving…" : "Update Password"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={changeEmailOpen} onOpenChange={setChangeEmailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Email</DialogTitle>
            <DialogDescription>Enter your new email. You'll need to confirm both old and new addresses.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="ne">New Email</Label>
            <Input id="ne" type="email" placeholder="new@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={handleChangeEmail} disabled={loading}>{loading ? "Sending…" : "Update Email"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action is permanent. All your data, scan history, and profile will be erased. Contact our support team to proceed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteAccountOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>Contact Support</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <InfoDialog open={aboutOpen} onOpenChange={setAboutOpen} title="About Hope in Pixels">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hope in Pixels is an educational AI-powered skin screening tool built by students who believe healthcare technology should work for everyone, regardless of skin tone.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Our AI was trained on diverse datasets covering 23 skin conditions across all 6 Fitzpatrick skin types. We aim to reduce bias in dermatological AI and empower individuals with accessible health education.
        </p>
        <p className="text-xs text-muted-foreground mt-4 font-semibold">Version 1.0 • Made with ❤️</p>
      </InfoDialog>

      <InfoDialog open={missionOpen} onOpenChange={setMissionOpen} title="Our Fair AI Mission">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Studies show most dermatology AI tools are trained primarily on lighter skin, leading to dangerous misdiagnoses for people of color. We're building the opposite.
        </p>
        <ul className="text-sm text-muted-foreground mt-3 space-y-2 list-disc pl-4">
          <li>Equitable training data across all Fitzpatrick types</li>
          <li>Transparent confidence scores and limitations</li>
          <li>No hidden paywalls or data selling</li>
          <li>Open about what our AI can and cannot do</li>
        </ul>
      </InfoDialog>

      <InfoDialog open={citationsOpen} onOpenChange={setCitationsOpen} title="Citations & Research">
        <ul className="text-sm text-muted-foreground space-y-3">
          <li>Daneshjou, R. et al. (2022). "Disparities in dermatology AI performance across skin tones." <em>Nature Medicine</em>.</li>
          <li>Groh, M. et al. (2021). "Evaluating deep neural networks trained on clinical images." <em>Nature Medicine</em>.</li>
          <li>Fitzpatrick Skin Type Classification (I–VI).</li>
          <li>American Academy of Dermatology – ABCDE Rule for Melanoma Detection.</li>
        </ul>
      </InfoDialog>

      <InfoDialog open={faqOpen} onOpenChange={setFaqOpen} title="Frequently Asked Questions">
        <div className="space-y-4">
          <FaqItem q="Is this a medical device?" a="No. Hope in Pixels is for educational purposes only. Always see a doctor for any skin concerns." />
          <FaqItem q="Is my data private?" a="Yes. Images are processed by AI and never stored permanently. See our Privacy Policy for details." />
          <FaqItem q="How accurate is the AI?" a="Our AI provides screening suggestions, not diagnoses. Accuracy varies and should not replace professional evaluation." />
          <FaqItem q="Does it work on all skin tones?" a="We've specifically trained on diverse datasets across all 6 Fitzpatrick skin types to reduce bias." />
        </div>
      </InfoDialog>

      <InfoDialog open={contactOpen} onOpenChange={setContactOpen} title="Contact Us">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Have questions, feedback, or concerns? We'd love to hear from you.
        </p>
        <div className="mt-4 bg-muted rounded-lg p-4">
          <p className="text-sm font-medium text-foreground">📧 support@hopeinpixels.com</p>
          <p className="text-xs text-muted-foreground mt-1">We typically respond within 24–48 hours.</p>
        </div>
      </InfoDialog>

      <InfoDialog open={reportOpen} onOpenChange={setReportOpen} title="Report a Problem">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Found a bug or something doesn't look right? Let us know so we can fix it.
        </p>
        <div className="mt-4 bg-muted rounded-lg p-4">
          <p className="text-sm font-medium text-foreground">📧 bugs@hopeinpixels.com</p>
          <p className="text-xs text-muted-foreground mt-1">Please include a screenshot and description of the issue.</p>
        </div>
      </InfoDialog>
    </div>
  );
};

const SettingsButton = ({ label, icon, onClick, border }: { label: string; icon?: React.ReactNode; onClick: () => void; border?: boolean }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3.5 text-sm text-foreground hover:bg-muted/50 transition-colors ${border ? "border-b border-border" : ""}`}
  >
    <div className="flex items-center gap-3">
      {icon && <span className="text-primary">{icon}</span>}
      {label}
    </div>
    <ChevronRight className="w-4 h-4 text-muted-foreground" />
  </button>
);

const InfoDialog = ({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; children: React.ReactNode }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div>{children}</div>
    </DialogContent>
  </Dialog>
);

const FaqItem = ({ q, a }: { q: string; a: string }) => (
  <div>
    <p className="text-sm font-semibold text-foreground">{q}</p>
    <p className="text-sm text-muted-foreground mt-1">{a}</p>
  </div>
);

export default SettingsPage;
