import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { appAtoms } from "@/atoms";
import {
  Dropdown,
  Icon,
  Profile,
  StudentsNotifications,
  Title,
} from "@/components";
import { HiBell, HiOutlineBell, HiOutlineUser, HiUser } from "react-icons/hi2";
import { useAuth } from "@/hooks";

const TopHeader = () => {
  /**
   * component states
   */
  const { showSidebarState } = appAtoms;
  const setShowSidebar = useSetRecoilState(showSidebarState);
  const pathname = usePathname();
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState<boolean>(false);

  const { user } = useAuth();

  /**
   * component function
   */
  const getTitle: (pathname: string) => string = (pathname) => {
    let title = "";

    switch (pathname) {
      case "/":
        title = "Home";
        break;
      case "/login":
        title = "Title.";
        break;
      case "/tech/school":
        title = "Manage Students";
        break;
      default:
        title = "Title";
    }

    return title;
  };

  return (
    <nav className="flex h-[50px] items-center justify-between rounded-md border border-primary/50 px-2 sm:px-0">
      <div className="flex items-center gap-x-4">
        <Icon
          icon={
            <HiOutlineMenuAlt3 className="text-c_green h-5 w-5 sm:hidden" />
          }
          purpose={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
        />

        {/* the current page title */}
        {pathname && (
          <Title
            title={getTitle(pathname)}
            title_styles="capitalize text-c_dark text-xl font-semibold tracking-wider"
          />
        )}
      </div>

      {/* the rest of the icons */}
      <div className="flex items-center  gap-x-2">
        {/* the current user dropdown */}
        {user && (
          <div className="flex px-2">
            <Dropdown
              inactive={<HiOutlineUser className="icon" />}
              active={<HiUser className="icon" />}
              dropdown_component={<Profile />}
              display_state={showProfileDropdown}
              setDisplayState={setShowProfileDropdown}
            />

            <div className={`${user?.role === "admin" && "hidden"}`}>
              <Dropdown
                inactive={<HiOutlineBell className="icon" />}
                active={<HiBell className="icon" />}
                dropdown_component={<StudentsNotifications />}
                display_state={showNotificationDropdown}
                setDisplayState={setShowNotificationDropdown}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopHeader;
