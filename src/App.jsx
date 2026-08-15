import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coffee,
  CreditCard,
  Dumbbell,
  Gift,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Repeat,
  Rocket,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Target,
  User,
  UtensilsCrossed,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

// Update these before launch — trial length and price shown in the Pricing section.
const PRICING = {
  trialDays: 30,
  price: 49,
  currency: "$",
};

// Get a free access key at https://web3forms.com (no account needed — just
// enter your email and they send you a key instantly). Paste it below so
// the "Apply to Join" form delivers submissions straight to your inbox.
const WEB3FORMS_ACCESS_KEY = "d0c3aeac-8560-4469-b6d2-50267a559443";

// Categories currently open in the founding store program. Once you have
// real stores live, swap this section over to showcase them by name.
const founderCategories = [
  { name: "Coffee Shops", icon: Coffee },
  { name: "Hair & Beauty", icon: Scissors },
  { name: "Bakeries & Cafés", icon: UtensilsCrossed },
  { name: "Retail & Boutiques", icon: ShoppingBag },
  { name: "Gyms & Studios", icon: Dumbbell },
];

const links = {
  store: "https://store.pointshubrewards.com",
  customer: "https://pointshubrewards.com",
  support: "mailto:support@pointshubrewards.com",
  apply:
    "mailto:support@pointshubrewards.com?subject=" +
    encodeURIComponent("I want to add my store to PointsHub") +
    "&body=" +
    encodeURIComponent(
      "Hi PointsHub team,\n\nI'd like to sign my store up for PointsHub Rewards.\n\nStore name:\nLocation:\nBest phone/email to reach me:\n\nThanks!"
    ),
};

const benefits = [
  {
    icon: Repeat,
    title: "Turn one-time buyers into regulars",
    text: "Every purchase earns points, giving customers a reason to choose your store again instead of a competitor's.",
  },
  {
    icon: Zap,
    title: "Live in minutes, not months",
    text: "No developers, no app to build. Sign up, get your cards, and start rewarding customers the same day.",
  },
  {
    icon: Wallet,
    title: "No register overhaul required",
    text: "PointsHub runs alongside whatever you already use to check out customers — nothing to rip and replace.",
  },
  {
    icon: Target,
    title: "See who your best customers are",
    text: "Every scan is logged in your dashboard, so you know exactly who shops with you most and how often.",
  },
  {
    icon: Users,
    title: "Staff can run it in seconds",
    text: "Add or redeem points with a quick lookup — no training manuals, no complicated point-of-sale plugins.",
  },
  {
    icon: Building2,
    title: "Compete with the big chains",
    text: "Give customers the same kind of rewards program they get at national chains, without the enterprise budget.",
  },
];

const comparison = [
  {
    without: "Customers buy once and you never see them again",
    withUs: "Customers come back to earn and redeem points",
  },
  {
    without: "No idea who your repeat customers actually are",
    withUs: "Every visit is logged in one simple dashboard",
  },
  {
    without: "Paper punch cards get lost, forgotten, or faked",
    withUs: "One durable card that just works, every time",
  },
  {
    without: "Building a loyalty app costs thousands and takes months",
    withUs: "Ready to use the same day you sign up",
  },
  {
    without: "Marketing dollars spent chasing new customers",
    withUs: "Rewards spent keeping the customers you already earned",
  },
];

const faqs = [
  {
    q: "Do I need special equipment or a new POS?",
    a: "No. PointsHub runs alongside whatever register or point-of-sale system you already use. Staff add or redeem points from the store dashboard on any phone, tablet, or computer.",
  },
  {
    q: "How does the application process work?",
    a: "Applying takes two minutes — just send us your store details. We'll personally set up your account and reach out to get you live, usually within a couple of business days.",
  },
  {
    q: "What happens after I apply?",
    a: `Once your store is set up, you get ${PRICING.trialDays} days to try PointsHub with real customers, free. If it's working for your store, continue for ${PRICING.currency}${PRICING.price}/month. If not, just let us know — nothing further is charged.`,
  },
  {
    q: "Can I set my own rewards and point values?",
    a: "Yes. You control how many points a purchase earns and what customers can redeem them for — PointsHub just handles the tracking.",
  },
  {
    q: "Is customer data shared with other stores?",
    a: "No. Your customer activity and redemption data belong to your store. PointsHub only shows you the activity that happened at your business.",
  },
];

const emptyApplyForm = {
  storeName: "",
  contactName: "",
  email: "",
  phone: "",
  location: "",
  category: "",
  message: "",
};

function ApplyModal({ isOpen, onClose }) {
  const [form, setForm] = useState(emptyApplyForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New founding store application: ${form.storeName}`,
          from_name: form.contactName || form.storeName,
          store_name: form.storeName,
          contact_name: form.contactName,
          email: form.email,
          phone: form.phone,
          location: form.location,
          category: form.category,
          message: form.message,
        }),
      });

      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setForm(emptyApplyForm);
    }, 300);
  };

  return (
    <div className="modalOverlay" onClick={handleClose}>
      <div
        className="modalCard"
        role="dialog"
        aria-modal="true"
        aria-labelledby="applyModalTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modalClose" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="modalStatus">
            <CheckCircle2 size={44} className="modalStatusIcon success" />
            <h3>Application sent</h3>
            <p>
              Thanks — we've got your details. Our team will follow up
              personally within a couple of business days to get your store
              set up.
            </p>
            <button className="primaryButton" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="label">Founding store program</p>
            <h3 id="applyModalTitle">Apply to join PointsHub</h3>
            <p className="modalSubtext">
              Tell us about your store and we'll reach out to get you set up.
            </p>

            <form className="applyForm" onSubmit={handleSubmit}>
              <div className="formRow">
                <label>
                  Store name
                  <div className="inputWrap">
                    <Store size={16} />
                    <input
                      required
                      type="text"
                      value={form.storeName}
                      onChange={update("storeName")}
                      placeholder="Sunrise Coffee Co."
                    />
                  </div>
                </label>

                <label>
                  Your name
                  <div className="inputWrap">
                    <User size={16} />
                    <input
                      required
                      type="text"
                      value={form.contactName}
                      onChange={update("contactName")}
                      placeholder="Jane Smith"
                    />
                  </div>
                </label>
              </div>

              <div className="formRow">
                <label>
                  Email
                  <div className="inputWrap">
                    <Mail size={16} />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@yourstore.com"
                    />
                  </div>
                </label>

                <label>
                  Phone
                  <div className="inputWrap">
                    <Phone size={16} />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </label>
              </div>

              <div className="formRow">
                <label>
                  Location
                  <div className="inputWrap">
                    <MapPin size={16} />
                    <input
                      type="text"
                      value={form.location}
                      onChange={update("location")}
                      placeholder="City, State"
                    />
                  </div>
                </label>

                <label>
                  Category
                  <div className="inputWrap">
                    <Building2 size={16} />
                    <select value={form.category} onChange={update("category")}>
                      <option value="">Select a category</option>
                      {founderCategories.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </label>
              </div>

              <label>
                Anything else we should know?
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Optional"
                />
              </label>

              {status === "error" && (
                <div className="formError">
                  <AlertCircle size={18} />
                  Something went wrong sending your application. Please try
                  again, or{" "}
                  <a href={links.apply}>email us directly</a>.
                </div>
              )}

              <button
                type="submit"
                className="primaryButton"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="spin" /> Sending...
                  </>
                ) : (
                  <>
                    Submit Application <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faqItem ${isOpen ? "open" : ""}`}>
      <button className="faqQuestion" onClick={onToggle}>
        {item.q}
        <ChevronDown size={20} className="faqChevron" />
      </button>
      <div className="faqAnswer">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site">
      <nav className="navbar">
        <a href="#home" className="brand">
          <img src="/logo.ico" alt="PointsHub Rewards" className="brandLogo" />
          <div>
            <h1>PointsHub</h1>
            <p>Rewards</p>
          </div>
        </a>

        <div className="navLinks">
          <a href="#why">Why PointsHub</a>
          <a href="#partners">Partners</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>

        <a href={links.store} className="navButton">
          Store Login
        </a>
      </nav>

      <section id="home" className="hero">
        <div className="heroGlow" aria-hidden="true" />
        <div className="heroContent">
          <div className="pill">
            <Rocket size={16} />
            Now accepting founding stores — limited spots open
          </div>

          <h2>
            Keep customers
            <span> coming back.</span>
          </h2>

          <p className="heroText">
            PointsHub Rewards is the loyalty program built for stores that
            don't have an app team. Give every purchase a reason to become a
            repeat visit — with a dashboard you'll actually use.
          </p>

          <div className="heroActions">
            <button
              type="button"
              className="primaryButton"
              onClick={() => setIsApplyOpen(true)}
            >
              Apply to Join <ArrowRight size={18} />
            </button>

            <a href="#how" className="secondaryButton">
              See How It Works
            </a>
          </div>

          <div className="trustRow">
            <div>
              <BadgeCheck size={18} />
              {PRICING.trialDays}-day free trial
            </div>
            <div>
              <ShieldCheck size={18} />
              No developers needed
            </div>
            <div>
              <CreditCard size={18} />
              Works with your existing register
            </div>
          </div>
        </div>

        <div className="heroCard">
          <img
            src="/card-front.png"
            alt="PointsHub Rewards Card"
            className="customCardImage"
          />

          <div className="floatingBox boxOne">
            <Gift size={22} />
            <div>
              <h4>1,250 pts</h4>
              <p>Ready to redeem</p>
            </div>
          </div>

          <div className="floatingBox boxTwo">
            <Store size={22} />
            <div>
              <h4>New purchase</h4>
              <p>+100 points added</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div>
          <h3>Simple</h3>
          <p>No complicated setup for customers or staff.</p>
        </div>

        <div>
          <h3>Fast</h3>
          <p>Add, redeem, and check points in seconds.</p>
        </div>

        <div>
          <h3>Yours</h3>
          <p>Your rewards, your rules, your customer data.</p>
        </div>
      </section>

      <section id="why" className="section">
        <div className="sectionHeader">
          <p>Why stores choose PointsHub</p>
          <h2>A loyalty program that pays for itself</h2>
        </div>

        <div className="benefitsGrid">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <div
              className="benefitCard reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
              key={title}
            >
              <div className="benefitIcon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="partners" className="section">
        <div className="sectionHeader">
          <p>Founding store program</p>
          <h2>Be one of the first stores on PointsHub</h2>
        </div>

        <p className="foundingIntro">
          We're onboarding our very first stores right now — no crowded
          directory, no competing with a hundred other businesses for
          attention. Apply today and you'll help shape the program from day
          one.
        </p>

        <div className="partnersGrid">
          {founderCategories.map(({ name, icon: Icon }, i) => (
            <div
              className="partnerCard reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
              key={name}
            >
              <div className="partnerOpen">
                <span className="pulseDot" />
                Founding spot open
              </div>
              <div className="partnerIcon">
                <Icon size={24} />
              </div>
              <h3>{name}</h3>
              <p>No founding store signed up yet — be the first</p>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setIsApplyOpen(true)}
            className="partnerCard partnerCardAdd reveal"
            style={{ transitionDelay: `${founderCategories.length * 60}ms` }}
          >
            <div className="partnerAddIcon">
              <Plus size={24} />
            </div>
            <h3>Apply to become a founding store</h3>
            <p>Takes two minutes — we'll follow up personally</p>
          </button>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <p>The difference</p>
          <h2>What changes once you switch on PointsHub</h2>
        </div>

        <div className="compareGrid">
          <div className="compareCol compareWithout reveal">
            <h3>
              <X size={20} /> Without a loyalty program
            </h3>
            <ul>
              {comparison.map((row) => (
                <li key={row.without}>{row.without}</li>
              ))}
            </ul>
          </div>

          <div className="compareCol compareWith reveal">
            <h3>
              <Check size={20} /> With PointsHub
            </h3>
            <ul>
              {comparison.map((row) => (
                <li key={row.withUs}>{row.withUs}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="sectionHeader">
          <p>How it works</p>
          <h2>A simple reward flow for stores and customers</h2>
        </div>

        <div className="stepsGrid">
          <div className="stepCard reveal">
            <div className="stepNumber">01</div>
            <CreditCard size={34} />
            <h3>Customer gets a card</h3>
            <p>
              The customer receives a PointsHub card that can be used at
              participating stores.
            </p>
          </div>

          <div className="stepCard reveal" style={{ transitionDelay: "60ms" }}>
            <div className="stepNumber">02</div>
            <Store size={34} />
            <h3>Store adds points</h3>
            <p>
              Store staff swipe, scan, or enter the card number and add points
              after a purchase.
            </p>
          </div>

          <div className="stepCard reveal" style={{ transitionDelay: "120ms" }}>
            <div className="stepNumber">03</div>
            <Gift size={34} />
            <h3>Customer redeems</h3>
            <p>
              Once enough points are collected, the customer can redeem
              rewards at participating stores.
            </p>
          </div>
        </div>
      </section>

      <section id="stores" className="splitSection">
        <div className="splitText">
          <p className="label">For stores</p>
          <h2>Run a loyalty program without building your own app</h2>
          <p>
            PointsHub gives stores a simple dashboard to add points, redeem
            rewards, check card balances, and view transaction history — so
            you can focus on running your business, not managing software.
          </p>

          <div className="featureList">
            <div>
              <Building2 size={20} />
              Store-specific access
            </div>
            <div>
              <Users size={20} />
              Customer management
            </div>
            <div>
              <Gift size={20} />
              Reward redemption
            </div>
          </div>

          <button
            type="button"
            className="primaryButton smallButton"
            onClick={() => setIsApplyOpen(true)}
          >
            Apply to Join <ArrowRight size={18} />
          </button>
        </div>

        <div className="dashboardMock">
          <div className="mockHeader">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="mockCard wide">
            <p>Customers served today</p>
            <h3>28</h3>
          </div>

          <div className="mockGrid">
            <div className="mockCard">
              <p>Points added</p>
              <h3>4,850</h3>
            </div>
            <div className="mockCard">
              <p>Redeemed</p>
              <h3>1,000</h3>
            </div>
          </div>

          <div className="mockTable">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>

      <section id="customers" className="splitSection reverse">
        <div className="phoneMock">
          <div className="phoneTop"></div>

          <div className="phoneContent">
            <Smartphone size={34} />
            <h3>1,250 pts</h3>
            <p>Your current PointsHub balance</p>

            <div className="phoneItem">
              <span>Petro Store</span>
              <strong>+100</strong>
            </div>

            <div className="phoneItem">
              <span>Reward redeemed</span>
              <strong>-1000</strong>
            </div>
          </div>
        </div>

        <div className="splitText">
          <p className="label">For customers</p>
          <h2>Check points and rewards anytime</h2>
          <p>
            Customers can use the customer portal to view their balance and
            see their recent points activity.
          </p>

          <div className="featureList">
            <div>
              <CreditCard size={20} />
              Card balance
            </div>
            <div>
              <Gift size={20} />
              Redeem rewards
            </div>
            <div>
              <BadgeCheck size={20} />
              Simple history
            </div>
          </div>

          <a href={links.customer} className="secondaryButton smallButton">
            Open Customer Portal
          </a>
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="sectionHeader center">
          <p>Pricing</p>
          <h2>One plan. Everything included.</h2>
        </div>

        <div className="pricingCard reveal">
          <div className="pricingBadge">
            <Rocket size={16} />
            {PRICING.trialDays}-day free trial
          </div>

          <div className="pricingAmount">
            <span className="pricingCurrency">{PRICING.currency}</span>
            <span className="pricingNumber">{PRICING.price}</span>
            <span className="pricingPeriod">/ month after trial</span>
          </div>

          <p className="pricingNote">
            Apply and we'll set your store up personally — nothing is charged
            until after your {PRICING.trialDays}-day trial ends.
          </p>

          <div className="pricingFeatures">
            <div>
              <Check size={18} /> Unlimited customer cards
            </div>
            <div>
              <Check size={18} /> Store dashboard &amp; transaction history
            </div>
            <div>
              <Check size={18} /> Customer portal included
            </div>
            <div>
              <Check size={18} /> Works with your existing register
            </div>
            <div>
              <Check size={18} /> Email support
            </div>
          </div>

          <button
            type="button"
            className="primaryButton pricingButton"
            onClick={() => setIsApplyOpen(true)}
          >
            Apply to Join <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="sectionHeader">
          <p>Questions</p>
          <h2>Everything you need to know before you sign up</h2>
        </div>

        <div className="faqList">
          {faqs.map((item, i) => (
            <div className="reveal" style={{ transitionDelay: `${i * 50}ms` }} key={item.q}>
              <FaqItem
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="finalCta reveal">
        <Clock size={30} />
        <h2>Every day without a loyalty program is a customer you don't get back.</h2>
        <p>
          Apply to become a founding store and see how many customers come
          back for a second visit within your first {PRICING.trialDays}-day
          trial.
        </p>
        <button
          type="button"
          className="primaryButton ctaButton"
          onClick={() => setIsApplyOpen(true)}
        >
          Apply to Join <ArrowRight size={18} />
        </button>
      </section>

      <section id="contact" className="contactSection">
        <div>
          <p className="label">Contact</p>
          <h2>Need help with PointsHub?</h2>
          <p>
            For support, setup questions, or business inquiries, contact the
            PointsHub Rewards team.
          </p>
        </div>

        <a href={links.support} className="contactCard">
          <Mail size={26} />
          <div>
            <p>Email support</p>
            <h3>support@pointshubrewards.com</h3>
          </div>
        </a>
      </section>

      <footer className="footer">
        <div className="brand footerBrand">
          <img
            src="/logo.ico"
            alt="PointsHub Rewards"
            className="brandLogo footerLogo"
          />
          <div>
            <h1>PointsHub</h1>
            <p>Rewards</p>
          </div>
        </div>

        <p>
          © {new Date().getFullYear()} PointsHub Rewards. All rights reserved.
        </p>
      </footer>

      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </main>
  );
}

export default App;
