import React, { useState } from 'react';
import { FYERS_AFFILIATE_URL } from '../utils/calculations';
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Award,
  Globe2,
  Mail,
  Facebook,
  Copy,
  Check,
  Send
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Can college students with no full-time job legally invest in the Indian stock market?',
    answer: 'Absolutely YES! Anyone who is 18 years or older with a valid PAN Card, Aadhaar Card (linked to a mobile number for OTP), and an active Indian bank account (savings or student account) can legally open a Demat & Trading account in 5 minutes.',
  },
  {
    question: 'How much money do I actually need to get started?',
    answer: 'You do not need lakhs or thousands. Most Nifty 50 Index Mutual Funds allow SIPs starting at just ₹100 or ₹500. Exchange Traded Funds (ETFs) like NIFTYBEES can be purchased for ~₹270 per unit directly on the exchange.',
  },
  {
    question: 'How are stock market gains taxed for young Indian investors?',
    answer: 'Equity investments held for more than 12 months qualify as Long-Term Capital Gains (LTCG), which are taxed at 12.5% on profits exceeding ₹1.25 Lakh per financial year (first ₹1.25L profit is completely tax-free!). Investments sold in under 12 months are taxed as Short-Term Capital Gains (STCG) at 20%.',
  },
  {
    question: 'Why should I open a Demat account with FYERS?',
    answer: 'FYERS is a leading SEBI-registered, tech-first Indian brokerage offering zero account opening fees, zero annual maintenance charges (AMC) for basic retail tiers, zero brokerage on equity delivery investments, and world-class TradingView charting for modern young investors.',
  },
  {
    question: 'How do I balance daily lifestyle expenses with investing?',
    answer: 'We advocate the golden 50-30-20 rule: 50% for necessities, 30% for guilt-free fun/social outings, and 20% strictly set aside for automated equity compounding. The secret is setting up an auto-debit SIP the morning after you receive funds, so you never accidentally spend it.',
  },
];

export const AboutUsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@investyouth.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.email && contactForm.message) {
      setMessageSent(true);
      setContactForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setMessageSent(false), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Hero / Mission */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>OUR MISSION AT INVESTYOUTH.IN</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Democratizing Dalal Street for India&apos;s 400 Million Youth
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            India is currently the youngest major economy in the world, with over 65% of the population under age 35. Our goal is to transform young India from mere consumers into proud equity owners of the Indian economic miracle.
          </p>
        </div>

        {/* The Indian Youth Narrative - Image + Story */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              The Demographic Dividend
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Why We Started investyouth.in
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              For decades, personal finance in Indian households was limited to real estate, physical gold, and bank Fixed Deposits. While these assets provided comfort, they routinely struggled to outpace real lifestyle inflation.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Today, India&apos;s digital public infrastructure (Aadhaar, UPI, DigiLocker) makes investing accessible from a ₹10,000 Android smartphone. Yet, young Indians are bombarded with dangerous &quot;get-rich-quick&quot; trading reels and dubious Telegram tip channels.
            </p>
            <p className="text-slate-700 font-semibold text-sm sm:text-base bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
              investyouth.in was born to provide a trusted, zero-jargon sanctuary where Indian college students and young professionals can learn the timeless science of compounding, asset allocation, and wealth creation.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-4/3 relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                alt="Young Indian students learning together"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <p className="font-bold text-base sm:text-lg">
                    Empowering the Next Generation of Indian Capital
                  </p>
                  <p className="text-xs text-slate-300">
                    Over 85,000 young investors guided through workshops and calculators
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Our 4 Guiding Principles
            </h2>
            <p className="text-sm text-slate-600">
              The foundational ethics that guide all our calculators, articles, and recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Literacy Before Capital
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Never invest in something you cannot explain to your grandmother. We prioritize foundational business literacy before deploying a single Rupee.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Compounding Over Gambling
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We strictly reject intoxicating short-term F&O gambles. True generational wealth is built through patient SIPs and long-term business compounding.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Zero-Jargon Transparency
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Finance doesn&apos;t have to be intimidating. We translate complex SEBI circulars and PE ratios into everyday relatable concepts for youth.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Regulatory Integrity
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We advocate exclusively for SEBI-registered brokers, AMFI-registered mutual funds, and RBI-regulated instruments. Your safety is paramount.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <section id="contact-us-section" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Contact Us & Connect
            </h2>
            <p className="text-sm text-slate-600">
              Have questions about college workshops, financial calculators, or campus ambassador programs? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-5">
              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Email Support & Queries
                    </span>
                    <a
                      href="mailto:hello@investyouth.in"
                      className="text-lg font-bold text-slate-900 hover:text-emerald-700 font-heading transition-colors"
                    >
                      hello@investyouth.in
                    </a>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Direct email for student inquiries, university workshop invitations, financial literacy questions, and media partnerships.
                </p>

                <div className="flex items-center gap-2.5 pt-1">
                  <a
                    id="contact-email-mailto-btn"
                    href="mailto:hello@investyouth.in"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                  <button
                    id="contact-email-copy-btn"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Facebook Page Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Official Facebook Page
                    </span>
                    <a
                      href="https://www.facebook.com/InvestYouth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-slate-900 hover:text-blue-600 font-heading transition-colors"
                    >
                      facebook.com/InvestYouth
                    </a>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Join our vibrant Facebook community for weekly Dalal Street breakdowns, student success stories, live webinars, and investment infographics.
                </p>

                <div className="pt-1">
                  <a
                    id="contact-facebook-link-btn"
                    href="https://www.facebook.com/InvestYouth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Visit Facebook Page</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Quick Commitment Notice */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Response Guarantee:</strong> Our youth team responds to all genuine inquiries within 24 to 48 hours.
                </span>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="space-y-1 mb-6">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Drop us a note below and our team will get back to your email directly.
                </p>
              </div>

              {messageSent ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                    Thank you for contacting InvestYouth. A member of our community team will reply to your email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="you@college.edu or gmail.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Subject / Inquiry Type</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-500 transition-colors bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="College Campus Workshop">College Campus Workshop Request</option>
                      <option value="SIP & SWP Calculator Feedback">SIP & SWP Calculator Feedback</option>
                      <option value="Campus Ambassador Application">Campus Ambassador Application</option>
                      <option value="Partnership Proposal">Partnership Proposal</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Your Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Got Questions? We&apos;ve Got Answers.
            </h2>
            <p className="text-sm text-slate-600">
              Common questions Indian college students and freshers ask before their first investment.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-emerald-700 text-sm sm:text-base transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl border border-slate-800 space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              Start Your Investment Journey with FYERS Today
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Paperless onboarding, zero equity brokerage, intuitive mobile app, and institutional-grade charting tailored for modern young investors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="about-cta-start-investment"
              href={FYERS_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            >
              <span>Start Investment Now</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            Aadhaar OTP verification • Digilocker integration • Instant activation
          </p>
        </div>
      </div>
    </div>
  );
};
