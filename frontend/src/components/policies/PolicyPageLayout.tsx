import { useState, type ReactNode } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface PolicyCard {
  id: string;
  color: string;
  icon?: ReactNode;
  number: number | string;
  title: string;
  description: string;
}

interface PolicyPageLayoutProps {
  pageTitle: string;
  subtitle: string;
  heroIcon?: ReactNode;
  sidebarItems: SidebarItem[];
  introHeading: string;
  introText: string;
  cards: PolicyCard[];
  lastUpdated: string;
  footerNote?: string;
}

const palette = {
  heroFrom: "#dbeafe",
  heroTo: "#eff6ff",
  navy: "#0f172a",
  muted: "#64748b",
  border: "#e5e7eb",
  primary: "#2563eb",
};

export default function PolicyPageLayout({
  pageTitle,
  subtitle,
  heroIcon,
  sidebarItems,
  introHeading,
  introText,
  cards,
  lastUpdated,
  footerNote = "Your Privacy, Our Priority",
}: PolicyPageLayoutProps) {
  const [activeId, setActiveId] = useState(sidebarItems[0]?.id);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* Hero */}
      <div
        className="px-4 px-md-5 py-5"
        style={{
          background: `linear-gradient(120deg, ${palette.heroFrom}, ${palette.heroTo})`,
        }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 style={{ color: palette.navy, fontWeight: 800, fontSize: "2.75rem" }}>
                {pageTitle}
              </h1>
              <p style={{ color: "#334155", fontSize: "1.05rem", maxWidth: "620px" }}>
                {subtitle}
              </p>
            </div>
            <div className="col-lg-4 d-none d-lg-flex justify-content-end">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "1.5rem",
                  background: "rgba(37, 99, 235, 0.12)",
                }}
              >
                {heroIcon}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-fluid px-4 px-md-5 py-5">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div
              className="p-2 sticky-top"
              style={{ top: "1rem", border: `1px solid ${palette.border}`, borderRadius: "0.75rem" }}
            >
              {sidebarItems.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveId(item.id)}
                    className="d-flex align-items-center gap-2 text-decoration-none px-3 py-2 mb-1"
                    style={{
                      borderRadius: "0.5rem",
                      color: isActive ? palette.primary : "#334155",
                      backgroundColor: isActive ? "#eff6ff" : "transparent",
                      borderLeft: isActive ? `3px solid ${palette.primary}` : "3px solid transparent",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.92rem",
                    }}
                  >
                    <span style={{ display: "flex" }}>{item.icon}</span>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-9">
            <h2 id="introduction" style={{ fontWeight: 700, color: palette.navy }}>
              1. {introHeading}
            </h2>
            <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: "2rem" }}>{introText}</p>

            <div className="row g-4">
              {cards.map((card) => (
                <div className="col-md-6 col-xl-4" key={card.id} id={card.id}>
                  <div
                    className="p-4 h-100"
                    style={{ border: `1px solid ${palette.border}`, borderRadius: "0.9rem" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "0.65rem",
                        backgroundColor: `${card.color}1a`,
                        color: card.color,
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: "1.02rem", color: palette.navy }}>
                      {card.number}. {card.title}
                    </h3>
                    <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: 0 }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer highlight bar */}
            <div
              className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mt-5 p-4"
              style={{ backgroundColor: "#eff6ff", borderRadius: "0.9rem" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: palette.primary,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: palette.navy }}>{footerNote}</div>
                  <div style={{ color: "#475569", fontSize: "0.9rem" }}>
                    We are committed to keeping your information safe and secure.
                  </div>
                </div>
              </div>
              <div style={{ color: "#334155", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}