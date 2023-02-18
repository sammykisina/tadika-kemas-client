import React from "react";
import { NavLink, Notification, SpinnerLoader, Title } from "@/components";

const StudentsNotifications = ({
  todaysNotifications,
  isFetchingProfile,
}: {
  todaysNotifications: any;
  isFetchingProfile: boolean;
}) => {
  return (
    <section className="w-[22rem] divide-y p-2">
      {/* title */}
      <div className="pb-2">
        <Title title="Todays Notifications." />
      </div>

      {/* notifications */}
      {isFetchingProfile ? (
        <div className="flex h-[20rem] items-center justify-center">
          <SpinnerLoader color="fill-primary" />
        </div>
      ) : (
        <div className="pt-2">
          {todaysNotifications?.length > 0 ? (
            <div>
              <div className="flex h-[20rem] flex-col gap-2 overflow-y-scroll scrollbar-hide">
                {todaysNotifications?.map(
                  (notification: any, notificationIndex: number) => (
                    <Notification
                      key={notificationIndex}
                      notification={notification}
                    />
                  )
                )}
              </div>

              <div className="mt-8 flex justify-center">
                <NavLink
                  type="large"
                  fullWidth={false}
                  active
                  route={{ name: "View All", to: "/stud/notifications" }}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-[20rem] items-center justify-center">
              No notifications todays.
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default StudentsNotifications;
