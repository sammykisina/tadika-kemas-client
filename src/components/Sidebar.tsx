import { Button, Logo, NavLink } from "@/components";
import { useAuth } from "@/hooks";
import { routers } from "@/routers";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  /**
   * component states
   */
  const { logout, user } = useAuth();
  const { commonRoutes, teacherRoutes, studentRoutes } = routers;
  const pathname = usePathname();

  /**
   * component functions
   */

  return (
    <aside className="relative z-40  flex h-screen w-[250px] flex-col justify-between border-x-2 border-primary p-2 pt-8 duration-300">
      <div className="mt-5">
        {/* the logo */}
        <div className="flex justify-center">
          <Logo logo_styles="text-[2.5rem]" dot_styles="w-2 h-2 bg-orange" />
        </div>

        {/* the links */}
        <ul className="flex flex-col gap-2  pt-6">
          {/* teacher/admin routes */}
          {user?.role === "admin" &&
            commonRoutes
              .concat(teacherRoutes)
              .map((adminRoute, routeIndex) => (
                <NavLink
                  key={routeIndex}
                  route={adminRoute}
                  type="medium"
                  fullWidth={true}
                  active={pathname === adminRoute.to && true}
                />
              ))}

          {/* student/parent routes */}
          {user?.role === "student" &&
            commonRoutes
              .concat(studentRoutes)
              .map((studentRoute, routeIndex) => (
                <NavLink
                  key={routeIndex}
                  route={studentRoute}
                  type="medium"
                  fullWidth={true}
                  active={pathname === studentRoute.to && true}
                />
              ))}
        </ul>
      </div>

      {/* the logout button */}
      {user && (
        <Button title="logout" intent="primary" type="large" purpose={logout} />
      )}
    </aside>
  );
};

export default Sidebar;
