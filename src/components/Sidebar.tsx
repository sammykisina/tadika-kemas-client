import { Logo } from "@/components";
import { useAuth } from "@/hooks";

const Sidebar = () => {
  /**
   * component states
   */
  const { logout, user } = useAuth();

  /**
   * component functions
   */

  return (
    <aside className="border-c_dark bg-c_blue relative  z-40 flex h-screen w-[250px] flex-col justify-between border-x-2 p-2 pt-8 duration-300">
      <div className="mt-5">
        {/* the logo */}
        <div className="flex justify-center">
          <Logo
            logo_styles="text-[2.5rem] text-white"
            dot_styles="w-2 h-2 bg-c_dark"
          />
        </div>

        {/* the links */}
        <ul className="flex flex-col gap-2  pt-6">links</ul>
      </div>

      {/* the logout button */}
      {user && (
        <button
          className={`bg-c_green text-c_dark flex items-center justify-center whitespace-nowrap  rounded-full px-4 py-2 font-bold focus:outline-none`}
          onClick={logout}
        >
          <span>Logout</span>
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
