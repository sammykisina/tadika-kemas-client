import { HiHome, HiOutlineHome } from "react-icons/hi2";
import { type Route } from "src/types/typings.t";

const routes: Route[] = [
  {
    name: "Home",
    inactive_icon: <HiOutlineHome className="icon" />,
    active_icon: <HiHome className="icon" />,
    to: "/",
  },
];

export default routes;
