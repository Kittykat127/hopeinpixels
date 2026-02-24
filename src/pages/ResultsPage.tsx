import { motion } from "framer-motion";
import { ArrowLeft, Share2, BookmarkPlus, Camera, CheckCircle2, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockResult = {
  condition: "Atopic Dermatitis",
  confidence: 90,
  severity: { level: "High" as const, score: 8.5 },
  differentials: [
    { name: "Contact Dermatitis", confidence: 7 },
    { name: "Psoriasis", confidence: 3 },
  ],
  indicators: [
    "Significant erythema (redness)",
    "Pronounced inflammation",
    "Signs of lichenification (skin thickening)",
    "Affected area: ~15cm²",
  ],
  nextSteps: [
    "Consult a dermatologist within 2 weeks",
    "Avoid scratching—try cold compresses for relief",
    "Keep the area moisturized with fragrance-free products",
  ],
  medications: [
    { name: "Hydrocortisone", dosage: "OTC PRN", type: "Over-the-counter", rx: false },
    { name: "Dupixent (dupilumab)", dosage: "300 mg SC BIV", type: "Prescription", rx: true },
    { name: "Upadacitinib (Rinvoq)", dosage: "15 mg QD PO", type: "Prescription", rx: true },
  ],
};

const severityColor = {
  Low: "text-success bg-success/10 border-success/20",
  Moderate: "text-hp-gold bg-hp-gold/10 border-hp-gold/20",
  High: "text-destructive bg-destructive/10 border-destructive/20",
};

const ResultsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="gradient-purple px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate("/")} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Your Results</h1>
          <button className="text-primary-foreground">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        {/* Main Result Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card rounded-2xl p-6 shadow-hp border border-border"
        >
          <h2 className="text-2xl font-bold text-primary mb-2">{mockResult.condition}</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="gradient-gold text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">
              {mockResult.confidence}% Confidence
            </span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full border ${severityColor[mockResult.severity.level]}`}>
              {mockResult.severity.level} Severity
            </span>
          </div>

          {/* Confidence bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mockResult.confidence}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full gradient-purple rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Score: {mockResult.severity.score}/10
          </p>
        </motion.div>

        {/* Indicators */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 shadow-hp border border-border"
        >
          <h3 className="text-sm font-bold text-foreground mb-3">Key Indicators</h3>
          <ul className="space-y-2">
            {mockResult.indicators.map((ind) => (
              <li key={ind} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {ind}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Differentials */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-5 shadow-hp border border-border"
        >
          <h3 className="text-sm font-bold text-foreground mb-3">Differential Diagnoses</h3>
          {mockResult.differentials.map((d) => (
            <div key={d.name} className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">{d.name}</span>
              <span className="text-sm font-semibold text-primary">{d.confidence}%</span>
            </div>
          ))}
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-hp-gold/10 rounded-2xl p-5 border border-hp-gold/20"
        >
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-hp-gold" />
            What to do now
          </h3>
          <ul className="space-y-2">
            {mockResult.nextSteps.map((step) => (
              <li key={step} className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-hp-gold before:font-bold">
                {step}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Medications */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl p-5 shadow-hp border border-border"
        >
          <h3 className="text-sm font-bold text-foreground mb-3">Recommended Medications</h3>
          <div className="space-y-3">
            {mockResult.medications.map((med) => (
              <div key={med.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-semibold text-foreground">{med.name}</p>
                  <p className="text-xs text-muted-foreground">{med.dosage}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${med.rx ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>
                  {med.type}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            These are AI-generated suggestions. Always consult a healthcare professional before taking any medication.
          </p>
        </motion.div>

        {/* Fairness badge */}
        <div className="flex items-center justify-center gap-2 py-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-xs text-muted-foreground">
            ✓ Validated for all skin tones (Fitzpatrick I-VI)
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="gold" size="lg" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share with Doctor
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex-1">
              <BookmarkPlus className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="lg" className="flex-1" onClick={() => navigate("/scan")}>
              <Camera className="w-4 h-4 mr-2" />
              New Scan
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          We're here with you. Early detection is a powerful step. 💜
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
