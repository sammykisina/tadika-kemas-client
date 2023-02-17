import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks";
import { EventAPI } from "@/api";
import type { Event } from "src/types/typings.t";
import eventAtoms from "src/atoms/Event";
import { useSetRecoilState } from "recoil";
import { Button, DeleteEvent, Notifications } from "@/components";
import { useMemo } from "react";

const useEvent = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const eventsTableColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Purpose",
        accessor: "purpose",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const {
    globalEventState,
    isEditingEventState,
    showCreateOrEditEventWidgetState,
  } = eventAtoms;
  const setGlobalEvent = useSetRecoilState(globalEventState);
  const setIsEditingEvent = useSetRecoilState(isEditingEventState);
  const setShowCreateOrEditEventWidget = useSetRecoilState(
    showCreateOrEditEventWidgetState
  );

  /**
   * hook functions
   */
  const { data: events, isLoading: isFetchingEvents } = useQuery({
    queryKey: ["events", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "admin") {
        return await EventAPI.getAllEvents();
      }

      return [];
    },
  });

  const { mutateAsync: createEventMutateAsync, isLoading: isCreatingEvent } =
    useMutation({
      mutationFn: (eventData: Event) => EventAPI.createEvent(eventData),

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
        setShowCreateOrEditEventWidget(false);
        Notifications.successNotification(data.message);
      },
    });

  const { mutateAsync: updateEventMutateAsync, isLoading: isUpdatingEvent } =
    useMutation({
      mutationFn: (data: { eventUuid: string; eventUpdateData: Event }) =>
        EventAPI.updateEvent(data),

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
        setGlobalEvent(null);
        setIsEditingEvent(false);
        setShowCreateOrEditEventWidget(false);
        Notifications.successNotification(data.message);
      },
    });

  const { mutateAsync: deleteEventMutateAsync, isLoading: isDeletingEvent } =
    useMutation({
      mutationFn: (eventUuid: string) => {
        return EventAPI.deleteEvent(eventUuid);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
        Notifications.successNotification(data.message);
      },
    });

  const modifyEventsDataForEventsTable = (events: any) => {
    let allEvents = [] as any;

    events.map((event: any) => {
      allEvents = [
        ...allEvents,
        {
          name: event?.attributes?.name,
          purpose: event?.attributes?.purpose,
          date: event?.attributes?.date,
          time: event?.attributes?.time,

          actions: (
            <div className="flex items-center gap-2">
              <Button
                title="edit"
                type="small"
                intent="primary"
                purpose={() => {
                  setIsEditingEvent(true);
                  setGlobalEvent(event);
                  setShowCreateOrEditEventWidget(true);
                }}
              />

              <DeleteEvent eventUuid={event?.attributes?.uuid} />
            </div>
          ),
        },
      ];
    });

    return allEvents;
  };

  return {
    events,
    isFetchingEvents,
    createEventMutateAsync,
    isCreatingEvent,
    updateEventMutateAsync,
    isUpdatingEvent,
    deleteEventMutateAsync,
    isDeletingEvent,
    modifyEventsDataForEventsTable,
    eventsTableColumns,
  };
};

export default useEvent;
