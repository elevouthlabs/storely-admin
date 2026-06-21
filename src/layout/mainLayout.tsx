import { Outlet } from "react-router-dom";
import { Sidebar } from "../component/nav-component/sidebar";
import { TopNavbar } from "../component/topNavbar";
import { SidebarLayoutProvider, useSidebarLayout } from "./sidebarLayoutContext";

const MainLayoutShell = () => {
  const { isOpen, isMobile, close } = useSidebarLayout();

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#f5f5f5]">
      {isMobile && isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={close}
          aria-label="Close sidebar"
        />
      ) : null}

      <aside
        className={[
          "z-50 flex min-h-full shrink-0 flex-col justify-between overflow-hidden bg-[#2D1B4E] text-white transition-[width,transform] duration-300 ease-in-out",
          isMobile
            ? "fixed inset-y-0 left-0 w-[min(280px,85vw)] shadow-xl"
            : "relative",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0",
          !isMobile && isOpen ? "w-[250px]" : "",
          !isMobile && !isOpen ? "w-0" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Sidebar />
      </aside>

      <main className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
        <TopNavbar searchPlaceholder="Type to search..." />
        <div className="min-h-0 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export const MainLayout = () => (
  <SidebarLayoutProvider>
    <MainLayoutShell />
  </SidebarLayoutProvider>
);
