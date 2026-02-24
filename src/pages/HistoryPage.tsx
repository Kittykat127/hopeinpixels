import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockHistory = [
  { id: "1", condition: "Atopic Dermatitis", date: "Feb 20, 2026", severity: "High" as const, confidence: 90 },
  { id: "2", condition: "Contact Dermatitis", date: "Feb 15, 2026", severity: "Moderate" as const, confidence: 78 },
  { id: "3", condition: "Acne Vulgaris", date: "Jan 28, 2026", severity: "Low" as const, confidence: 95 },
];

const severityStyles = {
  Low: "bg-success/10 text-success",
  Moderate: "bg-hp-gold/10 text-hp-gold-deep",
  High: "bg-destructive/10 text-destructive",
};

const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-purple px-6 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/")} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Scan History</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search scans..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none"
          />
        </div>
      </div>

      <div className="px-6 mt-4 space-y-3">
        {mockHistory.map((scan, i) => (
          <motion.div
            key={scan.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * i }}
            onClick={() => navigate("/results/demo")}
            className="bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-hp transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-lg">🔬</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{scan.condition}</p>
                  <p className="text-xs text-muted-foreground">{scan.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${severityStyles[scan.severity]}`}>
                  {scan.severity}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{scan.confidence}%</p>
              </div>
            </div>
          </motion.div>
        ))}

        <p className="text-center text-xs text-muted-foreground pt-4">
          Your skin health journey, all in one place. 💜
        </p>
      </div>
    </div>
  );
};

export default HistoryPage;
