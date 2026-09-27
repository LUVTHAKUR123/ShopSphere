import PolicyPageLayout from "@/components/policies/PolicyPageLayout";
import {
  DocumentIcon,
  UserIcon,
  CreditCardIcon,
  PackageIcon,
  ShieldIcon,
  AlertIcon,
  GearIcon,
  MailIcon,
} from "@/components/policies/icons";

export default function TermsAndConditions() {
  return (
    <PolicyPageLayout
      pageTitle="Terms & Conditions"
      subtitle="Please read these terms carefully. By using ShopSphere, you agree to the terms and conditions outlined below."
      heroIcon={<DocumentIcon size={64} color="#2563eb" />}
      lastUpdated="25 September 2026"
      footerNote="Fair Use, Fair Service"
      introHeading="Acceptance of Terms"
      introText={
        <>
          By accessing or using ShopSphere, you agree to be bound by these
          terms. If you do not agree with any part of these terms, please do not
          use our website or services.
        </>
      }
      sidebarItems={[
        {
          id: "introduction",
          label: "Terms & Conditions",
          icon: <DocumentIcon size={18} />,
        },
        {
          id: "using-platform",
          label: "Using Our Platform",
          icon: <UserIcon size={18} />,
        },
        {
          id: "pricing-payment",
          label: "Pricing & Payment",
          icon: <CreditCardIcon size={18} />,
        },
        {
          id: "orders",
          label: "Orders & Cancellations",
          icon: <PackageIcon size={18} />,
        },
        {
          id: "ip",
          label: "Intellectual Property",
          icon: <ShieldIcon size={18} />,
        },
        {
          id: "liability",
          label: "Limitation of Liability",
          icon: <AlertIcon size={18} />,
        },
        {
          id: "changes",
          label: "Changes to Terms",
          icon: <GearIcon size={18} />,
        },
        { id: "contact-us", label: "Contact Us", icon: <MailIcon size={18} /> },
      ]}
      cards={[
        {
          id: "using-platform",
          number: 2,
          title: "Using Our Platform",
          icon: <UserIcon size={22} />,
          color: "#2563eb",
          description:
            "You must be at least 18, or have a parent/guardian's consent, to place an order. You agree to provide accurate information and use ShopSphere only for lawful purposes.",
        },
        {
          id: "pricing-payment",
          number: 3,
          title: "Pricing & Payment",
          icon: <CreditCardIcon size={22} />,
          color: "#16a34a",
          description:
            "All prices are listed in the applicable currency and may change without notice. Payment must be completed at checkout using a supported payment method.",
        },
        {
          id: "orders",
          number: 4,
          title: "Orders & Cancellations",
          icon: <PackageIcon size={22} />,
          color: "#ea580c",
          description:
            "We reserve the right to cancel or refuse any order due to availability, pricing errors, or suspected fraud. You will be notified and refunded if this happens.",
        },
        {
          id: "ip",
          number: 5,
          title: "Intellectual Property",
          icon: <ShieldIcon size={22} />,
          color: "#7c3aed",
          description:
            "All content on ShopSphere, including logos, text, and images, is owned by us or our licensors and may not be used without permission.",
        },
        {
          id: "liability",
          number: 6,
          title: "Limitation of Liability",
          icon: <AlertIcon size={22} />,
          color: "#dc2626",
          description:
            "ShopSphere is not liable for indirect or incidental damages arising from your use of the platform, to the extent permitted by law.",
        },
        {
          id: "changes",
          number: 7,
          title: "Changes to Terms",
          icon: <GearIcon size={22} />,
          color: "#0d9488",
          description:
            "We may update these terms from time to time. Continued use of ShopSphere after changes means you accept the revised terms.",
        },
        {
          id: "contact-us",
          number: 8,
          title: "Contact Us",
          icon: <MailIcon size={22} />,
          color: "#2563eb",
          description: (
            <>
              Questions about these terms? Reach us at{" "}
              <a
                href="mailto:support@shopsphere.com"
                style={{ color: "#2563eb" }}
              >
                support@shopsphere.com
              </a>
            </>
          ),
        },
      ]}
    />
  );
}
