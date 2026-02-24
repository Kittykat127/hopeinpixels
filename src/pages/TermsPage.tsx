import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-purple px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="text-primary-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Terms of Service</h1>
        </div>
        <p className="text-xs text-primary-foreground/60 ml-8">Last updated: February 24, 2026</p>
      </div>

      <div className="px-6 mt-4 space-y-6">
        <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
          <p className="text-sm text-foreground font-bold mb-1">⚠️ Important — Please Read</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hope in Pixels is <strong>NOT a medical device</strong>, does <strong>NOT provide medical diagnoses</strong>, 
            and is <strong>NOT a substitute for professional medical advice</strong>. By using this app, you acknowledge and agree 
            to these terms.
          </p>
        </div>

        <Section title="1. Acceptance of Terms">
          By downloading, installing, or using Hope in Pixels, you agree to be bound by these Terms of Service. 
          If you do not agree, please do not use the app.
        </Section>

        <Section title="2. Nature of the Service">
          Hope in Pixels is an AI-powered educational screening tool that analyzes photos of skin conditions 
          to provide informational suggestions. The service:
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>Is for <strong>educational and informational purposes only</strong></li>
            <li>Does <strong>NOT</strong> provide medical diagnoses</li>
            <li>Does <strong>NOT</strong> replace professional medical evaluation</li>
            <li>Is <strong>NOT</strong> FDA-approved or classified as a medical device</li>
            <li>Should <strong>NOT</strong> be used to make medical decisions</li>
            <li>May produce inaccurate, incomplete, or misleading results</li>
          </ul>
        </Section>

        <Section title="3. Medical Disclaimer">
          <div className="bg-destructive/5 rounded-xl p-4 border border-destructive/10 mt-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT:</strong><br /><br />
              (a) The App is not a substitute for professional medical advice, diagnosis, or treatment.<br /><br />
              (b) You should never disregard professional medical advice or delay seeking treatment because of 
              information provided by this App.<br /><br />
              (c) If you have a medical emergency, call your local emergency services (e.g., 911) immediately.<br /><br />
              (d) We do not recommend or endorse any specific tests, physicians, products, procedures, opinions, 
              or other information that may be mentioned in the App.<br /><br />
              (e) Reliance on any information provided by the App is solely at your own risk.<br /><br />
              (f) The AI model has a known accuracy rate of approximately 89% and may produce incorrect results. 
              A wrong result could lead to false reassurance or unnecessary concern.
            </p>
          </div>
        </Section>

        <Section title="4. Limitation of Liability">
          To the maximum extent permitted by law, Hope in Pixels and its creators, contributors, and affiliates 
          shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, 
          including but not limited to:
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>Damages arising from reliance on screening results</li>
            <li>Delays in seeking medical treatment based on app results</li>
            <li>Misinterpretation of screening results</li>
            <li>Any health outcomes related to use or non-use of the app</li>
          </ul>
        </Section>

        <Section title="5. User Responsibilities">
          <ul className="list-disc pl-4 space-y-1">
            <li>You must be at least 13 years old to use this app.</li>
            <li>You are responsible for consulting a healthcare professional for any medical concerns.</li>
            <li>You should not upload images of other people without their consent.</li>
            <li>You must not use the app to attempt to diagnose others.</li>
            <li>You agree to provide accurate information when creating an account.</li>
          </ul>
        </Section>

        <Section title="6. Intellectual Property">
          The AI models, algorithms, design, and content of Hope in Pixels are protected by intellectual 
          property laws. You may not reverse engineer, decompile, or attempt to extract the AI model or 
          its training data.
        </Section>

        <Section title="7. Account Termination">
          We reserve the right to suspend or terminate your account if you violate these terms. 
          You may delete your account at any time through the Settings page. Upon deletion, all 
          your personal data will be permanently removed within 30 days.
        </Section>

        <Section title="8. Changes to Terms">
          We may modify these terms at any time. Material changes will be communicated through the app. 
          Continued use after changes constitutes acceptance.
        </Section>

        <Section title="9. Governing Law">
          These terms are governed by the laws of the United States. Any disputes shall be resolved 
          through binding arbitration in accordance with applicable rules.
        </Section>

        <Section title="10. Contact">
          For questions about these terms, contact: <strong>legal@hopeinpixels.com</strong>
        </Section>

        <div className="text-center pt-4 pb-8">
          <p className="text-xs text-muted-foreground">
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

export default TermsPage;
