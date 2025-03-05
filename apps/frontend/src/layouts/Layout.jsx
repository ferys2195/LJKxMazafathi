import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen flex">
      <aside className={`bg-base-100 drop-shadow-xl h-full`}>
        <Sidebar
          isCollapsed={isCollapsed}
          className="sticky top-0 h-full z-50"
        />
      </aside>

      <div className="flex flex-col flex-1">
        <header className="sticky top-0">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </header>
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
