import { Icon, Notification, SpinnerLoader, Title } from "@/components";
import { useProfile } from "@/hooks";
import { format, isEqual } from "date-fns";
import React from "react";
import { HiCalendarDays } from "react-icons/hi2";

const Notifications = () => {
  /**
   * pages states
   */
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
  const earlierNotifications = profile?.relationships?.notifications?.filter(
    (notification: any) =>
      !isEqual(
        new Date(format(new Date(), "EE, MMM d, yyy")),
        new Date(
          format(
            new Date(notification?.attributes?.createdAt),
            "EE, MMM d, yyy"
          )
        )
      )
  );

  return (
    <section className="mt-2 flex h-[44.5rem] flex-col gap-2  overflow-y-scroll  px-2 scrollbar-hide xs:h-[39rem] xl:h-[39rem]">
      {/* Title */}
      <Title title="Your Notifications" title_styles="text-lg" />

      <div className="flex h-[44.5rem]   flex-col gap-5  space-y-4 overflow-y-scroll  pt-2   scrollbar-hide xs:h-[39rem] xl:h-[39rem] ">
        {/* Todays reports */}
        <div
          className={`border-yellow h-[24rem] w-full space-y-3 rounded-xl border px-3 py-2 xs:h-[20.5rem]`}
        >
          {/* Title */}
          <Title title="Today" title_styles="text-base" />

          {/* reports */}
          <div>
            {isFetchingProfile ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader color="fill-primary" />
              </div>
            ) : todaysNotifications?.length !== 0 ? (
              <div className="divide-c_yellow  flex  h-[19.5rem] flex-col gap-2 divide-y overflow-y-scroll py-2 scrollbar-hide xs:h-[17rem]">
                {todaysNotifications?.map(
                  (notification: any, notificationIndex: number) => (
                    <Notification
                      key={notificationIndex}
                      notification={notification}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                You Have No Notifications Today.
              </div>
            )}
          </div>
        </div>

        {/* Other Days reports */}
        <div
          className={`border-yellow  h-[14rem] w-full space-y-3 rounded-xl border px-3 py-2`}
        >
          {/* Title */}
          <Title title="Earlier" title_styles="text-base" />

          {/* reports */}
          <div>
            {isFetchingProfile ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader color="fill-primary" />
              </div>
            ) : earlierNotifications?.length !== 0 ? (
              <div className="divide-c_yellow  flex h-[11rem] flex-col gap-2  divide-y overflow-y-scroll py-2 scrollbar-hide ">
                {earlierNotifications?.map(
                  (notification: any, notificationIndex: number) => (
                    <Notification
                      key={notificationIndex}
                      notification={notification}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                You Don&apos;t Have Earlier Notifications Yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
