import { ArrowLeft, ChevronRight, Shield, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Account",
      items: [
        { label: "Change Password", action: true },
        { label: "Change Email", action: true },
      ],
    },
    {
      title: "Privacy & Data",
      items: [
        { label: "Privacy Policy", action: true },
        { label: "Terms of Service", action: true },
        { label: "Export My Data", action: true },
      ],
    },
    {
      title: "About",
      items: [
        { label: "About Hope in Pixels", action: true },
        { label: "Our Fair AI Mission", action: true },
        { label: "Citations & Research", action: true },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "FAQs", action: true },
        { label: "Contact Us", action: true },
        { label: "Report a Problem", action: true },
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
        {/* Profile */}
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
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {section.title}
            </h3>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.label}
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
