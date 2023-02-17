import React from "react";
import {
  Button,
  CreateOrEditEventWidget,
  SpinnerLoader,
  TabTitle,
  Table,
  Widget,
} from "@/components";
import { useEvent } from "@/hooks";
import eventAtoms from "src/atoms/Event";
import { useRecoilState } from "recoil";

const Events = () => {
  /**
   * component states
   */
  const {
    isFetchingEvents,
    events,
    modifyEventsDataForEventsTable,
    eventsTableColumns,
  } = useEvent();

  const { showCreateOrEditEventWidgetState } = eventAtoms;
  const [showCreateOrEditEventWidget, setShowCreateOrEditEventWidget] =
    useRecoilState(showCreateOrEditEventWidgetState);

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title and creation button */}
      <div className="flex  justify-between">
        <TabTitle title="Events." />

        <Button
          title="Create an Event"
          type="medium"
          intent="primary"
          purpose={() => setShowCreateOrEditEventWidget(true)}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingEvents ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : events?.length > 0 ? (
          <Table
            data={modifyEventsDataForEventsTable(events)}
            columns={eventsTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[28rem] lg:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Events created Yet.
          </div>
        )}
      </section>

      <Widget
        widgetState={showCreateOrEditEventWidget}
        component={<CreateOrEditEventWidget />}
        widgetStyles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Events;
