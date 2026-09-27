import PolicyPageLayout from "@/components/policies/PolicyPageLayout";
import {
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  LockIcon,
  ShareIcon,
  UserIcon,
  CookieIcon,
  DocumentIcon,
  MailIcon,
} from "@/components/policies/icons";

export default function PrivacyPolicy() {
  return (
    <PolicyPageLayout
      pageTitle="Privacy & Policy"
      subtitle="Your privacy is important to us. This policy explains how we collect, use, protect, and share your personal information."
      heroIcon={<ShieldIcon size={64} color="#2563eb" />}
      lastUpdated="25 September 2026"
      introHeading="Introduction"
      introText={
        <>
          At ShopSphere, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains what information we collect, how we use it, and the
          steps we take to keep it safe.
        </>
      }
      sidebarItems={[
        {
          id: "introduction",
          label: "Privacy & Policy",
          icon: <ShieldIcon size={18} />,
        },
        {
          id: "info-we-collect",
          label: "Information We Collect",
          icon: <DatabaseIcon size={18} />,
        },
        {
          id: "how-we-use",
          label: "How We Use Information",
          icon: <GearIcon size={18} />,
        },
        {
          id: "data-protection",
          label: "Data Protection",
          icon: <LockIcon size={18} />,
        },
        {
          id: "sharing",
          label: "Sharing of Information",
          icon: <ShareIcon size={18} />,
        },
        {
          id: "your-rights",
          label: "Your Rights",
          icon: <UserIcon size={18} />,
        },
        { id: "cookies", label: "Cookies", icon: <CookieIcon size={18} /> },
        {
          id: "policy-updates",
          label: "Policy Updates",
          icon: <DocumentIcon size={18} />,
        },
        { id: "contact-us", label: "Contact Us", icon: <MailIcon size={18} /> },
      ]}
      cards={[
        {
          id: "info-we-collect",
          number: 2,
          title: "Information We Collect",
          icon: <DatabaseIcon size={22} />,
          color: "#2563eb",
          description:
            "We collect personal information such as your name, email address, shipping address, and payment details when you create an account or make a purchase.",
        },
        {
          id: "how-we-use",
          number: 3,
          title: "How We Use Information",
          icon: <GearIcon size={22} />,
          color: "#16a34a",
          description:
            "We use your information to process orders, provide customer support, improve our services, and send important updates about your account.",
        },
        {
          id: "data-protection",
          number: 4,
          title: "Data Protection",
          icon: <LockIcon size={22} />,
          color: "#dc2626",
          description:
            "We implement industry-standard security measures to protect your personal information from unauthorized access, use, or disclosure.",
        },
        {
          id: "sharing",
          number: 5,
          title: "Sharing of Information",
          icon: <ShareIcon size={22} />,
          color: "#7c3aed",
          description:
            "We do not sell your personal information. We may share information with trusted third parties only when necessary to provide our services (e.g., payment processors, delivery partners).",
        },
        {
          id: "your-rights",
          number: 6,
          title: "Your Rights",
          icon: <UserIcon size={22} />,
          color: "#ea580c",
          description:
            "You have the right to access, update, or delete your personal information. You can also opt out of promotional communications at any time.",
        },
        {
          id: "cookies",
          number: 7,
          title: "Cookies",
          icon: <CookieIcon size={22} />,
          color: "#0d9488",
          description:
            "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings.",
        },
        {
          id: "policy-updates",
          number: 8,
          title: "Policy Updates",
          icon: <DocumentIcon size={22} />,
          color: "#db2777",
          description:
            'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.',
        },
        {
          id: "contact-us",
          number: 9,
          title: "Contact Us",
          icon: <MailIcon size={22} />,
          color: "#2563eb",
          description: (
            <>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:{" "}
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
