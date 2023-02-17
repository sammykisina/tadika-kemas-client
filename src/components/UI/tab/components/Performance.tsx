import React from "react";
import {
  Button,
  CreateOrEditPerformanceWidget,
  SpinnerLoader,
  TabTitle,
  Table,
  Widget,
} from "@/components";
import { usePerformance } from "@/hooks";
import { performanceAtoms } from "@/atoms";
import { useRecoilState } from "recoil";

const Performance = () => {
  /**
   * component states
   */
  const {
    isFetchingPerformances,
    performances,
    modifyPerformanceDataForPerformanceTable,
    performanceTableColumns,
  } = usePerformance();

  const { showCreateOrEditPerformanceWidgetState } = performanceAtoms;
  const [
    showCreateOrEditPerformanceWidget,
    setShowCreateOrEditPerformanceWidget,
  ] = useRecoilState(showCreateOrEditPerformanceWidgetState);

  /**
   * component functions
   */
  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title */}
      <div className="flex  justify-between">
        <TabTitle title="Performances." />

        <Button
          title="Add new Performance"
          type="medium"
          intent="primary"
          purpose={() => setShowCreateOrEditPerformanceWidget(true)}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingPerformances ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : performances?.length > 0 ? (
          <Table
            data={modifyPerformanceDataForPerformanceTable(performances)}
            columns={performanceTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[26rem] sm:h-[24rem] lg:h-[30rem] md:h-[26rem] xl:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Performances Added Yet.
          </div>
        )}
      </section>

      <Widget
        widgetState={showCreateOrEditPerformanceWidget}
        component={<CreateOrEditPerformanceWidget />}
        widgetStyles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Performance;
