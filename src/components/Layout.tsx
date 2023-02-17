import { appAtoms } from "@/atoms";
import { type ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { Sidebar, TopHeader } from "@/components";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks";
import Login from "src/pages/login";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Layout = ({ children }: { children: ReactNode }) => {
  /**
   * component states
   */
  const { showSidebarState } = appAtoms;
  const showSidebar = useRecoilValue(showSidebarState);
  const { user, token } = useAuth();

  if (!token) return <Login />;

  return (
    <section className="relative mx-auto flex w-full max-w-[1200px]  sm:px-[20px]">
      {/* the Toaster */}
      <Toaster />

      {/* the sidebar */}
      <div
        className={`absolute bg-[#f6f2fd] duration-300 sm:left-0   ${
          showSidebar ? "left-0" : "-left-[100%]"
        } ${!user && "hidden"}`}
      >
        <Sidebar />
      </div>

      {/* the rest of the body */}
      <div
        className={`h-screen max-w-[1200px] flex-1 overflow-x-scroll p-2 duration-300 scrollbar-hide sm:ml-[250px] ${
          !user && "sm:ml-[0px]"
        }`}
      >
        <TopHeader />

        <div className="mt-5 h-[47rem] xs:h-[40rem]">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
