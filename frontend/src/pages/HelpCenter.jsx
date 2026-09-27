import { useState } from "react";
import { HelpCircleIcon, MailIcon } from "@/components/policies/icons";

const FAQS = [
  {
    q: "Where is my order?",
    a: "Go to Track Order and enter your order ID to see live status and estimated delivery date.",
  },
  {
    q: "How do I return or exchange an item?",
    a: "Visit Account → Orders, select the item, and choose Return or Exchange. See our Returns & Refunds page for full details.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard, UPI, and PayPal, shown at checkout.",
  },
  {
    q: "How do I cancel an order?",
    a: "Orders can be cancelled from Account → Orders before they are shipped. Once shipped, you'll need to request a return instead.",
  },
  {
    q: "How do I contact support?",
    a: "Email support@shopsphere.com or use the chat icon in the bottom-right corner of any page.",
  },
];

const palette = {
  heroFrom: "#dbeafe",
  heroTo: "#eff6ff",
  navy: "#0f172a",
  border: "#e5e7eb",
  primary: "#2563eb",
};

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${palette.border}` }}>
      <button
        onClick={onToggle}
        className="btn d-flex align-items-center justify-content-between w-100"
        style={{ color: palette.navy, padding: "1rem 0", textAlign: "left", fontWeight: 600 }}
      >
        <span>{q}</span>
        <span style={{ color: palette.primary, fontSize: "1.25rem", lineHeight: 1 }}>
          {isOpen ? "–" : "+"}
        </span>
      </button>
      {isOpen && (
        <p style={{ color: "#475569", paddingBottom: "1rem", lineHeight: 1.7 }}>{a}</p>
      )}
    </div>
  );
}

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* Hero — same style as the other policy pages */}
      <div
        className="px-4 px-md-5 py-5"
        style={{ background: `linear-gradient(120deg, ${palette.heroFrom}, ${palette.heroTo})` }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 style={{ color: palette.navy, fontWeight: 800, fontSize: "2.75rem" }}>
                Help Center
              </h1>
              <p style={{ color: "#334155", fontSize: "1.05rem", maxWidth: "620px" }}>
                Find quick answers below, or reach out to our support team directly.
              </p>
            </div>
            <div className="col-lg-4 d-none d-lg-flex justify-content-end">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: 140, height: 140, borderRadius: "1.5rem", background: "rgba(37, 99, 235, 0.12)" }}
              >
                <HelpCircleIcon size={64} color="#2563eb" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ list */}
      <div className="container-fluid px-4 px-md-5 py-5">
        <div className="mx-auto" style={{ maxWidth: "760px" }}>
          <div className="mb-5">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

          <div
            className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-4"
            style={{ backgroundColor: "#eff6ff", borderRadius: "0.9rem" }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: palette.primary, color: "#fff" }}
              >
                <MailIcon size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: palette.navy }}>Still need help?</div>
                <div style={{ color: "#475569", fontSize: "0.9rem" }}>
                  Our support team typically replies within 24 hours.
                </div>
              </div>
            </div>
            <a
              href="mailto:support@shopsphere.com"
              className="btn"
              style={{ backgroundColor: palette.primary, color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}