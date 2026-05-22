import storely from "../../assets/storely.png";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hook/useLogout";
import { useAppSelector } from "../../hook/reduxHook";
import { useSidebarLayoutOptional } from "../../layout/sidebarLayoutContext";
import { Icon, type IconifyIcon } from "@iconify/react";

type SidebarItem = {
  label: string;
  to: string;
  icon: string | IconifyIcon
};

const topItems: SidebarItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: "lucide:home" },
  { label: "Stores Directory", to: "/dashboard/store-directory", icon: "lucide:store" },
  { label: "User Management", to: "/dashboard/user-management", icon: "lucide:users" },
  { label: "Orders", to: "/dashboard/order", icon: "lucide:shopping-cart" },
  { label: "Revenue", to: "/dashboard/revenue", icon: "lucide:wallet" },
  { label: "AI Intelligence", to: "/dashboard/ai-intelligence", icon: "lucide:sparkles" },
  { label: "Risk & Moderation", to: "/dashboard/risk-moderation", icon: "lucide:asterisk" },
  { label: "Analytics", to: "/dashboard/analytics", icon: "lucide:bar-chart-2" },
  { label: "Campaign", to: "/dashboard/campaign", icon: "lucide:volume-2" },
  { label: "Settings", to: "/dashboard/settings", icon: "lucide:settings" },
];

export const Sidebar = () => {
  const { logout } = useLogout();
  const { user } = useAppSelector((state) => state.auth);
  const layout = useSidebarLayoutOptional();

  const initials =
    user?.fullName
      ?.split(" ")
      .map((word: string) => word[0])
      .join("") || "";

  const handleNavClick = () => {
    if (layout?.isMobile) {
      layout.close();
    }
  };

  return (
    <div className="flex h-full min-h-0 w-[250px] max-w-full flex-col">
      <header className="shrink-0 pb-4 !px-0 !py-0">
        <img src={storely} alt="Storely" />
        {/* className="h-auto w-full max-w-[140px] object-contain sm:max-w-[160px]" */}
      </header>

      <nav className="mt-4 min-h-0 flex-1 space-y-1 pr-1 px-2">
        {topItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/dashboard"}
            onClick={handleNavClick}
            className={({ isActive }) =>
              [
                "flex items-center gap-2 rounded-md border-l-[3px] px-3 py-2.5 text-sm transition",
                isActive
                  ? "border-white bg-violet-500/90 text-white"
                  : "border-transparent text-violet-100 hover:bg-violet-700/50",
              ].join(" ")
            }
          >
            <Icon icon={item.icon} className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <footer className="mt-4 shrink-0 border-t border-violet-900/60 pt-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left transition hover:bg-violet-700/40"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-300 text-xs font-semibold text-violet-900 sm:h-7 sm:w-7">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">{user ? user.fullName : "Admin"}</p>
            <p className="text-[11px] text-violet-200">Super Admin</p>
          </div>
        </button>
      </footer>
    </div>
  );
};
