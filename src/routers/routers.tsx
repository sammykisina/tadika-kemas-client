import {
  HiAcademicCap,
  HiHome,
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineUserCircle,
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
  {
    name: "Profile",
    inactiveIcon: <HiOutlineUserCircle className="icon" />,
    activeIcon: <HiUserCircle className="icon" />,
    to: "/tech/profile",
  },
];

const routers = { commonRoutes, teacherRoutes };

export default routers;
