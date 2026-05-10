import { usePageMeta } from '@/hooks/usePageMeta';

export default function Privacy() {
  usePageMeta(
    'Privacy Policy',
    'PCube Foundation privacy policy — how we collect, use, and protect your personal information.'
  );

  return (
    <main className="pt-40 pb-20 lg:pt-48 lg:pb-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <h1 className="font-display text-5xl lg:text-7xl tracking-tighter text-[hsl(var(--foreground))] mb-12 leading-[0.9]">
          PRIVACY<br />
          <span className="font-editorial italic font-normal text-[hsl(var(--primary))]">Policy</span>
        </h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-[hsl(var(--muted-foreground))] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl tracking-wider text-[hsl(var(--foreground))] mb-3">Who We Are</h2>
            <p>PCube Foundation is a Section 8 non-profit organization registered in Maharashtra, India (Reg. No: PCF/MH/2021/00847). Our website address is https://pcubefoundation.org.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl tracking-wider text-[hsl(var(--foreground))] mb-3">What Information We Collect</h2>
            <p>We collect information you voluntarily provide through our contact, volunteer, and sponsorship forms — including your name, email address, phone number, and message content. We use this information solely to respond to your inquiry or process your application. We do not sell, trade, or share your personal data with third parties.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl tracking-wider text-[hsl(var(--foreground))] mb-3">Donations and Payments</h2>
            <p>Donation payments are processed through Razorpay, a PCI-DSS compliant payment gateway. PCube Foundation does not store your card or payment details. Razorpay's own privacy policy governs payment data handling.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl tracking-wider text-[hsl(var(--foreground))] mb-3">Cookies</h2>
            <p>Our website does not use tracking cookies or third-party analytics cookies. We may use session cookies to maintain basic site functionality.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl tracking-wider text-[hsl(var(--foreground))] mb-3">Your Rights</h2>
            <p>You may request deletion of any personal information we hold about you at any time by contacting info@pcubefoundation.org. We will respond within 7 business days.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl tracking-wider text-[hsl(var(--foreground))] mb-3">Contact</h2>
            <p>For any privacy-related queries, contact: info@pcubefoundation.org</p>
          </section>
          <p className="text-[hsl(var(--muted-foreground))] text-xs">Last updated: May 2026</p>
        </div>
      </div>
    </main>
  );
}
