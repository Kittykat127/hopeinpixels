import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-purple px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Privacy Policy</h1>
        </div>
        <p className="text-xs text-primary-foreground/60 ml-8">Last updated: February 24, 2026</p>
      </div>

      <div className="px-6 mt-4 space-y-6">
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <Shield className="w-6 h-6 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground font-medium">
            Your privacy is fundamental to our mission. We are committed to protecting your personal data.
          </p>
        </div>

        <Section title="1. Introduction">
          Hope in Pixels ("we," "our," or "the App") is an AI-powered skin screening tool 
          designed for educational and informational purposes only. This Privacy Policy explains how we collect, 
          use, store, and protect your information when you use our application. By using Hope in Pixels, 
          you agree to the practices described in this policy.
        </Section>

        <Section title="2. Information We Collect">
          <strong>2.1 Information You Provide:</strong>
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>Account registration information (name, email address)</li>
            <li>Photos you choose to capture or upload for skin screening</li>
            <li>Notes or context you add to your scans (e.g., body location)</li>
            <li>Feedback you submit about screening results</li>
          </ul>
          <br />
          <strong>2.2 Automatically Collected Information:</strong>
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>Device type and operating system version</li>
            <li>App usage analytics (features used, session duration)</li>
            <li>Crash reports and performance data</li>
          </ul>
          <br />
          <strong>2.3 Information We Do NOT Collect:</strong>
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>Your precise location</li>
            <li>Contacts, messages, or call logs</li>
            <li>Data from other apps on your device</li>
            <li>Biometric data (fingerprints, face recognition)</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Skin Screening:</strong> Photos are processed by our AI model to provide educational screening suggestions. Images are encrypted during transmission and processing.</li>
            <li><strong>Account Management:</strong> Your email and name are used solely to manage your account and personalize your experience.</li>
            <li><strong>Improving AI Fairness:</strong> With your explicit consent, anonymized and de-identified data may be used to improve our AI model's accuracy and fairness across all skin tones. You can opt out at any time.</li>
            <li><strong>App Improvement:</strong> Aggregated, anonymous usage data helps us improve app performance and user experience.</li>
          </ul>
        </Section>

        <Section title="4. Photo & Image Data">
          <ul className="list-disc pl-4 space-y-1">
            <li>Photos are encrypted using AES-256 encryption at rest and TLS 1.3 during transmission.</li>
            <li>You can choose to store photos locally on your device only (no cloud upload).</li>
            <li>If cloud storage is enabled, photos are stored in encrypted, access-controlled storage.</li>
            <li>You can delete any photo at any time, and it will be permanently removed from our servers within 30 days.</li>
            <li>We <strong>never</strong> sell your photos or personal data to third parties.</li>
            <li>Photos are <strong>never</strong> used for advertising purposes.</li>
          </ul>
        </Section>

        <Section title="5. Data Sharing">
          We do <strong>not</strong> sell, rent, or trade your personal information. We may share data only in these limited circumstances:
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li><strong>With your consent:</strong> When you explicitly choose to share a report with your doctor.</li>
            <li><strong>Service providers:</strong> Trusted providers who help us operate the app (cloud hosting, analytics) under strict data processing agreements.</li>
            <li><strong>Legal requirements:</strong> When required by law, court order, or governmental regulation.</li>
            <li><strong>Research (opt-in only):</strong> Anonymized, de-identified data for academic research on AI fairness, only with your explicit consent.</li>
          </ul>
        </Section>

        <Section title="6. Data Security">
          <ul className="list-disc pl-4 space-y-1">
            <li>AES-256 encryption for data at rest</li>
            <li>TLS 1.3 for all data in transit</li>
            <li>JWT-based authentication with token rotation</li>
            <li>Rate limiting to prevent unauthorized access attempts</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls limiting employee access to user data</li>
          </ul>
        </Section>

        <Section title="7. Your Rights & Choices">
          You have the right to:
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li><strong>Access:</strong> View all data we have about you at any time.</li>
            <li><strong>Export:</strong> Download a copy of all your data.</li>
            <li><strong>Delete:</strong> Permanently delete your account and all associated data.</li>
            <li><strong>Opt out:</strong> Disable cloud backup, data sharing for research, and notifications.</li>
            <li><strong>Correct:</strong> Update your personal information at any time.</li>
          </ul>
        </Section>

        <Section title="8. Children's Privacy">
          Hope in Pixels is not intended for children under 13 years of age. We do not knowingly collect personal 
          information from children under 13. If we become aware that a child under 13 has provided us with 
          personal data, we will take steps to delete that information. If you are a parent or guardian and 
          believe your child has provided us with personal data, please contact us.
        </Section>

        <Section title="9. Medical Disclaimer">
          <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20 mt-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hope in Pixels is <strong>NOT a medical device</strong> and is <strong>NOT intended to diagnose, treat, cure, 
              or prevent any disease</strong>. The AI screening results are for educational and informational purposes only. 
              This app is not FDA-approved and does not replace professional medical advice, diagnosis, or treatment. 
              Always consult a qualified healthcare provider with any questions regarding a medical condition. 
              If you are experiencing a medical emergency, contact your local emergency services immediately.
            </p>
          </div>
        </Section>

        <Section title="10. Data Retention">
          <ul className="list-disc pl-4 space-y-1">
            <li>Active accounts: Data retained as long as your account is active.</li>
            <li>Deleted scans: Permanently removed within 30 days of deletion.</li>
            <li>Deleted accounts: All personal data permanently removed within 30 days.</li>
            <li>Anonymized research data (if consented): May be retained indefinitely as it cannot be linked back to you.</li>
          </ul>
        </Section>

        <Section title="11. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify you of any material changes 
          through the app or via email. Your continued use of the app after changes constitutes acceptance 
          of the updated policy.
        </Section>

        <Section title="12. Contact Us">
          If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
          <br /><br />
          <strong>Email:</strong> privacy@hopeinpixels.com<br />
          <strong>Subject Line:</strong> Privacy Policy Inquiry<br /><br />
          We aim to respond to all inquiries within 48 hours.
        </Section>

        <div className="text-center pt-4 pb-8">
          <p className="text-xs text-muted-foreground">
            Made with 💜 by students committed to fair healthcare for all.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2026 Hope in Pixels. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-base font-bold text-foreground mb-2">{title}</h2>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

export default PrivacyPolicyPage;
