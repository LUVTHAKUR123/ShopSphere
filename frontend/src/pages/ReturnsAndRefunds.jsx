import PolicyPageLayout from "@/components/policies/PolicyPageLayout";
import {
  RotateIcon,
  ClockIcon,
  PackageIcon,
  UserIcon,
  AlertIcon,
  MailIcon,
} from "@/components/policies/icons";

export default function ReturnsAndRefunds() {
  return (
    <PolicyPageLayout
      pageTitle="Returns & Refunds"
      subtitle="Not quite right? Here's how returns, exchanges, and refunds work at ShopSphere."
      heroIcon={<RotateIcon size={64} color="#2563eb" />}
      lastUpdated="25 September 2026"
      footerNote="Easy Returns, No Hassle"
      introHeading="Introduction"
      introText={
        <>
          We want you to love what you ordered. If something isn't right, this
          policy explains how to return, exchange, or get a refund for your
          purchase.
        </>
      }
      sidebarItems={[
        {
          id: "introduction",
          label: "Returns & Refunds",
          icon: <RotateIcon size={18} />,
        },
        {
          id: "return-window",
          label: "Return Window",
          icon: <ClockIcon size={18} />,
        },
        {
          id: "start-return",
          label: "How to Start a Return",
          icon: <PackageIcon size={18} />,
        },
        {
          id: "refund-timeline",
          label: "Refund Timeline",
          icon: <ClockIcon size={18} />,
        },
        { id: "exchanges", label: "Exchanges", icon: <UserIcon size={18} /> },
        {
          id: "damaged-items",
          label: "Damaged or Wrong Items",
          icon: <AlertIcon size={18} />,
        },
        { id: "contact-us", label: "Contact Us", icon: <MailIcon size={18} /> },
      ]}
      cards={[
        {
          id: "return-window",
          number: 2,
          title: "Return Window",
          icon: <ClockIcon size={22} />,
          color: "#2563eb",
          description:
            "Most items can be returned within 7 days of delivery if unused, in original packaging, with tags attached. Innerwear, perishables, and personalized items aren't eligible.",
        },
        {
          id: "start-return",
          number: 3,
          title: "How to Start a Return",
          icon: <PackageIcon size={22} />,
          color: "#16a34a",
          description:
            'Go to Account → Orders, select the item, and choose "Return item." Our courier partner picks it up within 2–3 business days.',
        },
        {
          id: "refund-timeline",
          number: 4,
          title: "Refund Timeline",
          icon: <ClockIcon size={22} />,
          color: "#ea580c",
          description:
            "Once we receive and inspect the item, refunds are processed within 5–7 business days to your original payment method.",
        },
        {
          id: "exchanges",
          number: 5,
          title: "Exchanges",
          icon: <UserIcon size={22} />,
          color: "#7c3aed",
          description:
            'Need a different size or color? Choose "Exchange" instead of "Return," and we\'ll ship the replacement once the original item is received.',
        },
        {
          id: "damaged-items",
          number: 6,
          title: "Damaged or Wrong Items",
          icon: <AlertIcon size={22} />,
          color: "#dc2626",
          description:
            "Received a damaged, defective, or wrong item? Contact us within 48 hours with photos for a free replacement or full refund.",
        },
        {
          id: "contact-us",
          number: 7,
          title: "Contact Us",
          icon: <MailIcon size={22} />,
          color: "#2563eb",
          description: (
            <>
              Need help with a return? Email{" "}
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
