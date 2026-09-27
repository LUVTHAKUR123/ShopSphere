import PolicyPageLayout from "@/components/policies/PolicyPageLayout";
import {
  TruckIcon,
  ClockIcon,
  CreditCardIcon,
  PackageIcon,
  AlertIcon,
  MailIcon,
} from "@/components/policies/icons";

export default function ShippingPolicy() {
  return (
    <PolicyPageLayout
      pageTitle="Shipping Policy"
      subtitle="Everything you need to know about how we process, ship, and deliver your orders."
      heroIcon={<TruckIcon size={64} color="#2563eb" />}
      lastUpdated="25 September 2026"
      footerNote="Fast, Reliable Delivery"
      introHeading="Introduction"
      introText={
        <>
          This Shipping Policy explains how ShopSphere processes and delivers
          orders, including timelines, charges, and what to do if something goes
          wrong along the way.
        </>
      }
      sidebarItems={[
        {
          id: "introduction",
          label: "Shipping Policy",
          icon: <TruckIcon size={18} />,
        },
        {
          id: "processing-time",
          label: "Processing Time",
          icon: <ClockIcon size={18} />,
        },
        {
          id: "delivery-timelines",
          label: "Delivery Timelines",
          icon: <PackageIcon size={18} />,
        },
        {
          id: "shipping-charges",
          label: "Shipping Charges",
          icon: <CreditCardIcon size={18} />,
        },
        {
          id: "tracking",
          label: "Order Tracking",
          icon: <TruckIcon size={18} />,
        },
        { id: "delays", label: "Delays", icon: <AlertIcon size={18} /> },
        { id: "contact-us", label: "Contact Us", icon: <MailIcon size={18} /> },
      ]}
      cards={[
        {
          id: "processing-time",
          number: 2,
          title: "Processing Time",
          icon: <ClockIcon size={22} />,
          color: "#2563eb",
          description:
            "Orders are processed within 1–2 business days of confirmation. You'll get an email once your order ships, with tracking details included.",
        },
        {
          id: "delivery-timelines",
          number: 3,
          title: "Delivery Timelines",
          icon: <PackageIcon size={22} />,
          color: "#16a34a",
          description:
            "Standard delivery takes 4–7 business days, express delivery 2–3 business days. Remote areas may take 1–2 extra days.",
        },
        {
          id: "shipping-charges",
          number: 4,
          title: "Shipping Charges",
          icon: <CreditCardIcon size={22} />,
          color: "#ea580c",
          description:
            "Shipping is free above a set order value shown at checkout. Orders below that amount incur a flat fee based on your delivery address.",
        },
        {
          id: "tracking",
          number: 5,
          title: "Order Tracking",
          icon: <TruckIcon size={22} />,
          color: "#7c3aed",
          description:
            "Once shipped, track your order anytime from the Track Order page using your order ID.",
        },
        {
          id: "delays",
          number: 6,
          title: "Delays",
          icon: <AlertIcon size={22} />,
          color: "#dc2626",
          description:
            "Deliveries may occasionally be delayed due to weather, courier issues, or high demand. We'll keep you updated if this happens.",
        },
        {
          id: "contact-us",
          number: 7,
          title: "Contact Us",
          icon: <MailIcon size={22} />,
          color: "#2563eb",
          description: (
            <>
              Shipping questions? Email us at{" "}
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
