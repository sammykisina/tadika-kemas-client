import React from "react";
import Icon from "../UI/Icon";
import { HiCalendarDays } from "react-icons/hi2";

const Notification = ({ notification }: { notification: any }) => {
  return (
    <div className="themeBorder border px-4 py-2">
      <div className="flex items-center gap-3">
        <Icon
          iconWrapperStyles="bg-primary text-white w-[3rem] h-[3rem] rounded-full flex justify-center items-center"
          icon={<HiCalendarDays className="icon" />}
        />

        <span>Alert</span>
      </div>

      <div className="px-4">
        <span className="font-semibold text-primary first-letter:uppercase">
          {notification?.attributes?.name}
        </span>

        <p className="px-2 text-primary/50">
          {notification?.attributes?.purpose}
        </p>
      </div>

      <div className="mx-2 flex justify-center gap-2 bg-orange  font-semibold text-primary">
        <span> {notification?.attributes?.date}</span>
        <span> {notification?.attributes?.time}</span>
      </div>
    </div>
  );
};

export default Notification;
