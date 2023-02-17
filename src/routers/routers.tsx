import {
  HiAcademicCap,
  HiBell,
  HiHome,
  HiOutlineAcademicCap,
  HiOutlineBell,
  HiOutlineHome,
  HiOutlineQueueList,
  HiOutlineUserCircle,
  HiQueueList,
  HiUserCircle,
} from "react-icons/hi2";
import { type Route } from "src/types/typings.t";

const commonRoutes: Route[] = [
  {
    name: "Home",
    inactiveIcon: <HiOutlineHome className="icon" />,
    activeIcon: <HiHome className="icon" />,
    to: "/",
  },
];

const teacherRoutes: Route[] = [
  {
    name: "School",
    inactiveIcon: <HiOutlineAcademicCap className="icon" />,
    activeIcon: <HiAcademicCap className="icon" />,
    to: "/tech/school",
  },
];

const studentRoutes: Route[] = [
  {
    name: "Performance",
    inactiveIcon: <HiOutlineQueueList className="icon" />,
    activeIcon: <HiQueueList className="icon" />,
    to: "/stud/performance",
  },
  {
    name: "Notifications",
    inactiveIcon: <HiOutlineBell className="icon" />,
    activeIcon: <HiBell className="icon" />,
    to: "/stud/notifications",
  },
  {
    name: "Profile",
    inactiveIcon: <HiOutlineUserCircle className="icon" />,
    activeIcon: <HiUserCircle className="icon" />,
    to: "/stud/profile",
  },
];

const routers = { commonRoutes, teacherRoutes, studentRoutes };

export default routers;
