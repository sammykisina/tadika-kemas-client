import { Events, Performance, Students, Tab } from "@/components";
import React, { useState } from "react";
import { HiOutlineWifi, HiQueueList, HiUserGroup } from "react-icons/hi2";

const School = () => {
  /**
   * pages states
   */

  const [index, setIndex] = useState(0);
  const schoolTabs = [
    {
      label: "Students",
      content: <Students />,
      icon: <HiUserGroup className="icon" />,
    },
    {
      label: "Performance",
      content: <Performance />,
      icon: <HiQueueList className="icon" />,
    },
    {
      label: "Events",
      content: <Events />,
      icon: <HiOutlineWifi className="icon rotate-90" />,
    },
  ];
  return (
    <section className="h-full">
      <Tab
        tabsData={schoolTabs}
        tabsBodyStyles="lg:grid grid-cols-6 duration-300"
        index={index}
        iconsOnlyTabs
        setIndex={setIndex}
        iconsOnlyTabsStyles="flex flex-row  flex-wrap duration-300 lg:flex-col gap-2 col-span-1"
        tabsContentHeight="mt-[1rem] py-2 lg:mt-0 scrollbar-hide "
      />
    </section>
  );
};

export default School;
