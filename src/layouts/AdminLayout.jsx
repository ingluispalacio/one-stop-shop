import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Main from "../components/admin/Main";
import Footer from "../components/admin/Footer";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen w-full flex bg-gray-100 font-primary overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`flex flex-col flex-1 transition-[margin] duration-500 ease-in-out`}
      >
        <Header />
        <div className="flex-1  overflow-auto min-w-0">
          <Main />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
