/**
 * Single source for subscription rows shown on Subscription Overview (All + Failed tabs)
 * and resolved in revenueDetails by store slug.
 */


export type CampaignOverviewStatus = "Sent" | "Scheduled" | "Draft";

export type CampaignOverviewRow = {
  name: string;
  type: string;
  audienceSize: number;
  status: CampaignOverviewStatus;
  Date: Date;
  rate: string;
};

export const campaignOverviewRows: CampaignOverviewRow[] = [
  {
    name: "April Product Update",
    type: "Email",
    audienceSize: 1000,
    status: "Sent",
    Date: new Date("2026-04-15"),
    rate: "42.3%",
  },
  {
    name: "April Product Update",
    type: "Email",
    audienceSize: 1000,
    status: "Sent",
    Date: new Date("2026-04-15"),
    rate: "42.3%",
  },
  {
    name: "April Product Update",
    type: "Email",
    audienceSize: 1000,
    status: "Sent",
    Date: new Date("2026-04-15"),
    rate: "42.3%",
  },
  {
    name: "April Product Update",
    type: "Email",
    audienceSize: 1000,
    status: "Sent",
    Date: new Date("2026-04-15"),
    rate: "42.3%",
  },
  {
    name: "April Product Update",
    type: "Email",
    audienceSize: 1000,
    status: "Sent",
    Date: new Date("2026-04-15"),
    rate: "42.3%",
  }
];
