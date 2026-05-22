export type PayoutStatus = "Pending" | "On Hold";

export type PayoutHistoryRow = {
  date: string;
  amount: string;
  status: "Completed" | "Failed";
  reference: string;
};

export type BatchStoreRow = {
  store: string;
  amountOwed: string;
  paymentMethod: string;
  lastPayout: string;
  status: PayoutStatus;
  actionLabel: string;
  actionTone: "blue" | "purple";
  periodRange: string;
  processingFees: string;
  refundsIssued: string;
  netPayout: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  payoutHistory: PayoutHistoryRow[];
};

export const batchStores: BatchStoreRow[] = [
  {
    store: "Fashion Hub Lagos",
    amountOwed: "₦2,450,000",
    paymentMethod: "Bank Transfer",
    lastPayout: "Mar 28, 2026",
    status: "Pending",
    actionLabel: "View Details",
    actionTone: "blue",
    periodRange: "Mar 23 – Apr 22, 2026",
    processingFees: "₦57,000",
    refundsIssued: "₦225,000",
    netPayout: "₦2,340,000",
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "Fashion Hub Lagos Ltd",
    payoutHistory: [
      { date: "Mar 22, 2026", amount: "₦2,120,000", status: "Completed", reference: "PAY-2026-0322-001" },
      { date: "Feb 22, 2026", amount: "₦1,980,000", status: "Completed", reference: "PAY-2026-0222-014" },
      { date: "Jan 22, 2026", amount: "₦2,050,000", status: "Completed", reference: "PAY-2026-0122-008" },
    ],
  },
  {
    store: "Metro Fresh Mart",
    amountOwed: "₦1,890,000",
    paymentMethod: "Paystack",
    lastPayout: "Mar 28, 2026",
    status: "On Hold",
    actionLabel: "Resolve Hold",
    actionTone: "purple",
    periodRange: "Mar 23 – Apr 22, 2026",
    processingFees: "₦37,800",
    refundsIssued: "₦142,000",
    netPayout: "₦1,710,200",
    bankName: "Access Bank",
    accountNumber: "0987654321",
    accountName: "Metro Fresh Mart Ltd",
    payoutHistory: [
      { date: "Mar 22, 2026", amount: "₦1,650,000", status: "Completed", reference: "PAY-2026-0322-019" },
      { date: "Feb 22, 2026", amount: "₦1,720,000", status: "Completed", reference: "PAY-2026-0222-021" },
    ],
  },
  {
    store: "Beauty Cart NG",
    amountOwed: "₦1,650,000",
    paymentMethod: "Flutterwave",
    lastPayout: "Mar 28, 2026",
    status: "Pending",
    actionLabel: "View Details",
    actionTone: "blue",
    periodRange: "Mar 23 – Apr 22, 2026",
    processingFees: "₦33,000",
    refundsIssued: "₦98,500",
    netPayout: "₦1,518,500",
    bankName: "Zenith Bank",
    accountNumber: "2034567890",
    accountName: "Beauty Cart NG Ltd",
    payoutHistory: [
      { date: "Mar 22, 2026", amount: "₦1,420,000", status: "Completed", reference: "PAY-2026-0322-033" },
      { date: "Feb 22, 2026", amount: "₦1,380,000", status: "Completed", reference: "PAY-2026-0222-031" },
    ],
  },
  {
    store: "Techie Plaza",
    amountOwed: "₦1,420,000",
    paymentMethod: "Bank Transfer",
    lastPayout: "Mar 28, 2026",
    status: "Pending",
    actionLabel: "View Details",
    actionTone: "blue",
    periodRange: "Mar 23 – Apr 22, 2026",
    processingFees: "₦28,400",
    refundsIssued: "₦76,000",
    netPayout: "₦1,315,600",
    bankName: "First Bank",
    accountNumber: "3012345678",
    accountName: "Techie Plaza Enterprises",
    payoutHistory: [
      { date: "Mar 22, 2026", amount: "₦1,280,000", status: "Completed", reference: "PAY-2026-0322-041" },
      { date: "Feb 22, 2026", amount: "₦1,190,000", status: "Completed", reference: "PAY-2026-0222-039" },
    ],
  },
  {
    store: "Home Spot",
    amountOwed: "₦1,070,000",
    paymentMethod: "Paystack",
    lastPayout: "Mar 28, 2026",
    status: "Pending",
    actionLabel: "View Details",
    actionTone: "blue",
    periodRange: "Mar 23 – Apr 22, 2026",
    processingFees: "₦21,400",
    refundsIssued: "₦45,000",
    netPayout: "₦1,003,600",
    bankName: "UBA",
    accountNumber: "4567890123",
    accountName: "Home Spot Retail Ltd",
    payoutHistory: [
      { date: "Mar 22, 2026", amount: "₦980,000", status: "Completed", reference: "PAY-2026-0322-052" },
      { date: "Feb 22, 2026", amount: "₦910,000", status: "Completed", reference: "PAY-2026-0222-050" },
    ],
  },
];
