import { ArrowLeft, ChevronRight, Shield, Heart, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Account",
      items: [
        { label: "Change Password" },
        { label: "Change Email" },
      ],
    },
    {
      title: "Privacy & Data",
      items: [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Export My Data" },
      ],
    },
    {
      title: "About",
      items: [
        { label: "About Hope in Pixels" },
        { label: "Our Fair AI Mission" },
        { label: "Citations & Research" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "FAQs" },
        { label: "Contact Us" },
        { label: "Report a Problem" },
      ],
    },
  ];

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
            HP
          </div>
          <div>
            <p className="text-primary-foreground font-semibold">Hope User</p>
            <p className="text-primary-foreground/60 text-sm">user@example.com</p>
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

        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {section.title}
            </h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if ("path" in item && item.path) navigate(item.path);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm text-foreground hover:bg-muted/50 transition-colors ${
                    i < section.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full py-3 text-sm font-semibold text-destructive hover:bg-destructive/5 rounded-xl transition-colors border border-destructive/20">
          Delete Account
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
    </div>
  );
};

export default SettingsPage;
