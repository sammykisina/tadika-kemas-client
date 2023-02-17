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
import { useAuth, useProfile } from "@/hooks";
import { format, isEqual } from "date-fns";

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

  const { profile, isFetchingProfile } = useProfile();

  const todaysNotifications = profile?.relationships?.notifications?.filter(
    (notification: any) =>
      isEqual(
        new Date(format(new Date(), "EE, MMM d, yyy")),
        new Date(
          format(
            new Date(notification?.attributes?.createdAt),
            "EE, MMM d, yyy"
          )
        )
      )
  );

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
        title = "Manage Students.";
        break;
      case "/stud/performance":
        title = "Your Performance.";
        break;
      case "/stud/profile":
        title = "Your Profile.";
        break;
      case "/stud/notifications":
        title = "Notifications.";
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
                dropdown_component={
                  <StudentsNotifications
                    todaysNotifications={todaysNotifications}
                    isFetchingProfile={isFetchingProfile}
                  />
                }
                display_state={showNotificationDropdown}
                setDisplayState={setShowNotificationDropdown}
                badge={
                  todaysNotifications?.length > 0 && todaysNotifications?.length
                }
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopHeader;
