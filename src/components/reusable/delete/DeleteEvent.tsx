import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useEvent } from "@/hooks";

type DeleteEventProps = {
  eventUuid: string;
};

const DeleteEvent: FC<DeleteEventProps> = ({ eventUuid }) => {
  /**
   * component states
   */
  const { isDeletingEvent, deleteEventMutateAsync } = useEvent();

  return (
    <Button
      title={
        isDeletingEvent ? (
          <SpinnerLoader color="fill-white" size="w-4 h-4" />
        ) : (
          "Delete"
        )
      }
      intent="danger"
      type="small"
      purpose={() => deleteEventMutateAsync(eventUuid)}
      disabled={isDeletingEvent}
    />
  );
};

export default DeleteEvent;
