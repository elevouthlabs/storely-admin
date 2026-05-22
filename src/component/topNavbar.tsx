import { useSidebarLayoutOptional } from "../layout/sidebarLayoutContext";
import { Icon } from "@iconify/react";

type TopNavbarProps = {
  searchPlaceholder?: string;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
};

export const TopNavbar = ({
  searchPlaceholder = "Type to search...",
  onToggleSidebar,
  isSidebarOpen,
}: TopNavbarProps) => {
  const layout = useSidebarLayoutOptional();

  const isOpen = isSidebarOpen ?? layout?.isOpen ?? false;
  const toggleSidebar = onToggleSidebar ?? layout?.toggle;

  return (
    <header className="-mx-4 -mt-4 mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:-mx-6 sm:-mt-6 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="shrink-0 transition-transform duration-300 ease-in-out rounded-md p-1.5 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        >
          {isOpen ? (
            <Icon icon="lucide:panel-right" className="h-6 w-6 shrink-0 text-slate-700" />
          ) : (
            <Icon icon="lucide:panel-left" className="h-6 w-6 shrink-0 text-slate-700" />
          )}
        </button>
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 sm:max-w-xs">
          <Icon icon="lucide:search" className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full min-w-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </label>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-[#f5f5f5] p-2 text-slate-500 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Icon icon="lucide:bell" className="h-5 w-5 shrink-0 text-slate-700" />
        </button>
        <div className="h-9 w-9 shrink-0 rounded-full bg-[linear-gradient(135deg,#98A2FF,#6C63FF)]" />
      </div>
    </header>
  );
};
