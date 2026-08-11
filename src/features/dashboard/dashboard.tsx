import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { useEffect } from "react";
import { fetchDashboardData } from "../dashboard/dashboardSlice";
import { Icon } from "@iconify/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type MetricCard = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

type AlertItem = {
  text: string;
  time: string;
};

const alertFeed: AlertItem[] = [
  { text: 'Store "QikMart NG" flagged for unusual velocity', time: "2m ago" },
  { text: "3 failed payment retries detected", time: "11m ago" },
  { text: "26 products pending moderation review", time: "35m ago" },
  { text: "Dispute opened for order #ORD-8432", time: "1h ago" },
  { text: "Inventory sync delay in 3 stores", time: "2h ago" },
];

const stores = [
  { name: "Fashion Hub Lagos", change: "+15.2%", amount: "N1,750,000" },
  { name: "Metro Fresh Mart", change: "+13.1%", amount: "N1,420,500" },
  { name: "Beauty Cart NG", change: "+10.8%", amount: "N1,180,240" },
  { name: "Techie Plaza", change: "+8.6%", amount: "N972,100" },
  { name: "Home Spot", change: "+7.9%", amount: "N903,800" },
];

export const Dashboard = () => {
const { metrics, isLoading, error } = useAppSelector(
  (state) => state.dashboard
);
  const dispatch = useAppDispatch();  
  const metricCardClass = "rounded-lg border border-slate-200 bg-white p-3 shadow-sm min-h-[98px]";

  const token = localStorage.getItem("token");
  
  useEffect(() => {
  if (token) {
    dispatch(fetchDashboardData(token));
  }
}, [dispatch, token]);

if (isLoading) return <p>Loading dashboard...</p>;
if (error) return <p className="text-red-500">{error}</p>;
if (!metrics) return <p>Loading dashboard...</p>;

const topMetricCards: MetricCard[] = metrics
  ? [
      {
        title: "GMV today",
        value: `₦${(metrics.totalRevenue).toLocaleString()}`,
        change: "",
        trend: "up",
      },
      {
        title: "Active Stores",
        value: (metrics.totalStores ?? 0).toString(),
        change: "",
        trend: "up",
      },
      {
        title: "Order in-flight",
        value: (metrics.totalOrders ?? 0).toString(),
        change: "",
        trend: "up",
      },
      {
        title: "New signups today",
        value: (metrics.totalCustomers ?? 0).toString(),
        change: "",
        trend: "up",
      },
    ]
  : [];

const secondaryMetricCards: MetricCard[] = metrics
  ? [
      {
        title: "Total revenue MTD",
        value: metrics.pendingUsers.toString(),
        change: "",
        trend: "down",
      },
      {
        title: "Active subscriptions",
        value: metrics.pendingPayments.toString(),
        change: "",
        trend: "down",
      },
      {
        title: "AI API cost MTD",
        value: metrics.completedPayments.toString(),
        change: "",
        trend: "up",
      },
      {
        title: "Dispute resolution",
        value: "94.2%",
        change: "",
        trend: "up",
      },
    ]
  : [];

  const revenueData = [
  { "date": "Mon", "revenue": 800 },
  { "date": "Tue", "revenue": 1000 },
  { "date": "Wed", "revenue": 1200 },
  { "date": "Thu", "revenue": 1300 },
  { "date": "Fri", "revenue": 1900 },
  { "date": "Sat", "revenue": 1000 },
  { "date": "Sun", "revenue": 1500 }
]

  return (
    <section className="space-y-4">
      
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Platform overview</h1>
          <p className="mt-1 text-xs text-slate-500">Real-time pulse across every store, payment and signal.</p>
        </div>
        <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">
          Last 7 days
        </button>
      </header>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topMetricCards.map((card) => (
            <article key={card.title} className={metricCardClass}>
              <p className="text-[11px] text-slate-500">{card.title}</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{card.value}</p>
              <div className="mt-1 flex items-center gap-1">
                <Icon icon={card.trend === "up" ? "lucide:trending-up" : "lucide:trending-down"}
                 className={`h-4 w-4 ${card.trend === "up" ? "text-emerald-500" : "text-rose-500"}`} />
                <span className={`text-[11px] ${card.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>{card.change}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-[2fr_1.2fr]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <article className={metricCardClass}>
                <p className="text-[11px] text-slate-500">{secondaryMetricCards[0].title}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{secondaryMetricCards[0].value}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Icon icon={secondaryMetricCards[0].trend === "up" ? "lucide:trending-up" : "lucide:trending-down"}
                   className={`h-4 w-4 ${secondaryMetricCards[0].trend === "up" ? "text-emerald-500" : "text-rose-500"}`} />
                  <span className={`text-[11px] ${secondaryMetricCards[0].trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>{secondaryMetricCards[0].change}</span>
                </div>
              </article>

              <article className={metricCardClass}>
                <p className="text-[11px] text-slate-500">{secondaryMetricCards[1].title}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{secondaryMetricCards[1].value}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Icon icon={secondaryMetricCards[1].trend === "up" ? "lucide:trending-up" : "lucide:trending-down"}
                   className={`h-4 w-4 ${secondaryMetricCards[1].trend === "up" ? "text-emerald-500" : "text-rose-500"}`} />
                  <span className={`text-[11px] ${secondaryMetricCards[1].trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>{secondaryMetricCards[1].change}</span>
                </div>
              </article>

              <article className={metricCardClass}>
                <p className="text-[11px] text-slate-500">{secondaryMetricCards[2].title}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{secondaryMetricCards[2].value}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Icon icon={secondaryMetricCards[2].trend === "up" ? "lucide:trending-up" : "lucide:trending-down"}
                   className={`h-4 w-4 ${secondaryMetricCards[2].trend === "up" ? "text-emerald-500" : "text-rose-500"}`} />
                  <span className={`text-[11px] ${secondaryMetricCards[2].trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>{secondaryMetricCards[2].change}</span>
                </div>
              </article>

              <article className={metricCardClass}>
                <p className="text-[11px] text-slate-500">{secondaryMetricCards[3].title}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{secondaryMetricCards[3].value}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Icon icon={secondaryMetricCards[3].trend === "up" ? "lucide:trending-up" : "lucide:trending-down"}
                   className={`h-4 w-4 ${secondaryMetricCards[3].trend === "up" ? "text-emerald-500" : "text-rose-500"}`} />
                  <span className={`text-[11px] ${secondaryMetricCards[3].trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>{secondaryMetricCards[3].change}</span>
                </div>
              </article>
            </div>

            <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Revenue Over Time</h2>
                  <p className="text-[11px] text-slate-500">Daily gross merchandise volume - last 7 days</p>
                </div>
                <p className="text-sm font-semibold text-slate-700">N45.0m</p>
              </div>
              
                <ResponsiveContainer width="100%" height={230}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4B0082"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Top 5 Stores by Revenue</h2>
                <button className="text-xs font-medium text-violet-700 hover:text-violet-800">View all</button>
              </div>
              <div className="space-y-3">
                {stores.map((store) => (
                  <div key={store.name} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-semibold text-white">
                        FH
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{store.name}</p>
                        <p className="text-[11px] text-emerald-600">{store.change}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{store.amount}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Live Alert Feed</h2>
              <button className="text-xs font-medium text-violet-700 hover:text-violet-800">Refresh</button>
            </div>
            <div className="space-y-2.5">
              {alertFeed.map((item) => (
                <div key={item.text} className="rounded-md border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                    <div>
                      <p className="text-xs leading-5 text-slate-700">{item.text}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
