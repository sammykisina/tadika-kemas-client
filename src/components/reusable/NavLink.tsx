import { appAtoms } from "@/atoms";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { FC } from "react";
import { useSetRecoilState } from "recoil";
import { type Route } from "src/types/typings.t";

const navlinkStyles = cva(
  "flex items-center rounded-full  gap-3 duration-300  px-4 py-2  focus:outline-none whitespace-nowrap text-primary",
  {
    variants: {
      type: {
        small:
          "h-[38px] gap-[6px] text-[14px] hover:text-white hover:bg-c_dark px-4  py-2",
        medium: "h-[40px] gap-[8px] px-[16px] text-[16px] py-2 ",
        large:
          "h-[56px] gap-[8px] px-[20px] text-[18px] hover:text-white hover:bg-c_dark  py-2",
        link: "text-sm",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
      active: {
        true: "bg-primary w-full text-white",
        activeLink: "text-c_dark",
      },
    },
  }
);

interface NavLinkProps extends VariantProps<typeof navlinkStyles> {
  route: Route;
  moreActions?: () => void;
}

const NavLink: FC<NavLinkProps> = ({
  fullWidth,
  type,
  route,
  moreActions,
  active,
}) => {
  /**
   * component states
   */
  const { showSidebarState } = appAtoms;
  const setShowSidebar = useSetRecoilState(showSidebarState);

  return (
    <Link
      href={route.to}
      onClick={() => {
        setShowSidebar(false);
        moreActions && moreActions();
      }}
    >
      <div className={navlinkStyles({ fullWidth, type, active })}>
        <div className={` ${active && "duration-300"}`}>
          {active ? route.activeIcon : route.inactiveIcon}
        </div>

        <span className="">{route.name}</span>
      </div>
    </Link>
  );
};

export default NavLink;
