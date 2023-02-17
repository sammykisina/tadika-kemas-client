import { SpinnerLoader, TabTitle, Table } from "@/components";
import { useProfile } from "@/hooks";
import React from "react";

const Performance = () => {
  /**
   * page states
   */
  const {
    profile,
    isFetchingProfile,
    modifyPerformanceDataForPerformanceTable,
    performanceTableColumns,
  } = useProfile();

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title */}
      <TabTitle title="Your Results Over The Year(s)." />

      <section className="mt-5">
        {isFetchingProfile ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : profile?.relationships?.performances?.length > 0 ? (
          <Table
            data={modifyPerformanceDataForPerformanceTable(
              profile?.relationships?.performances
            )}
            columns={performanceTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[26rem] sm:h-[24rem] lg:h-[30rem] md:h-[26rem] xl:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No performances found. <br />
            Contact your teacher for further inquiries
          </div>
        )}
      </section>
    </section>
  );
};

export default Performance;
