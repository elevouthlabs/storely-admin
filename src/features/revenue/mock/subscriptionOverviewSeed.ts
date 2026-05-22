/**
 * Single source for subscription rows shown on Subscription Overview (All + Failed tabs)
 * and resolved in revenueDetails by store slug.
 */
export type OverviewPlan = "Pro" | "Growth" | "Enterprise";

export type SubscriptionOverviewStatus = "Active" | "Grace Period";

export type SubscriptionOverviewRow = {
  store: string;
  handle: string;
  plan: OverviewPlan;
  status: SubscriptionOverviewStatus;
  renewal: string;
  paymentMethod: string;
  amount: string;
};

export const subscriptionOverviewRows: SubscriptionOverviewRow[] = [
  {
    store: "Fashion Hub Lagos",
    handle: "@fashionhub",
    plan: "Pro",
    status: "Active",
    renewal: "May 15, 2026",
    paymentMethod: "Visa •••• 4242",
    amount: "₦50,000",
  },
  {
    store: "Tech Gadgets NG",
    handle: "@techgadgets",
    plan: "Growth",
    status: "Active",
    renewal: "May 2, 2026",
    paymentMethod: "Mastercard •••• 5555",
    amount: "₦25,000",
  },
  {
    store: "Beauty Palace",
    handle: "@beautypalace",
    plan: "Pro",
    status: "Grace Period",
    renewal: "Apr 20, 2026",
    paymentMethod: "Visa •••• 1234",
    amount: "₦50,000",
  },
  {
    store: "Home Essentials",
    handle: "@homeessentials",
    plan: "Growth",
    status: "Active",
    renewal: "May 8, 2026",
    paymentMethod: "Paystack",
    amount: "₦25,000",
  },
  {
    store: "Sports Arena",
    handle: "@sportsarena",
    plan: "Pro",
    status: "Active",
    renewal: "-",
    paymentMethod: "-",
    amount: "₦0",
  },
  {
    store: "Book Corner",
    handle: "@bookcorner",
    plan: "Enterprise",
    status: "Active",
    renewal: "Jun 1, 2026",
    paymentMethod: "Bank Transfer",
    amount: "₦150,000",
  },
];
