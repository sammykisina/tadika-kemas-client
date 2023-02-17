import { Button, Error, SpinnerLoader, WidgetHeader } from "@/components";
import { eventManagementSchemas } from "@/schemas";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import eventAtoms from "src/atoms/Event";
import type { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "react-date-range";
import { useEvent } from "@/hooks";
import { format } from "date-fns";

const CreateOrEditEvent = () => {
  /**
   * component states
   */
  const {
    globalEventState,
    isEditingEventState,
    showCreateOrEditEventWidgetState,
  } = eventAtoms;
  const [globalEvent, setGlobalEvent] = useRecoilState(globalEventState);
  const [isEditingEvent, setIsEditingEvent] =
    useRecoilState(isEditingEventState);
  const setShowCreateOrEditEventWidget = useSetRecoilState(
    showCreateOrEditEventWidgetState
  );

  const { eventSchema } = eventManagementSchemas;
  type EventSchema = z.infer<typeof eventSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const {
    isCreatingEvent,
    createEventMutateAsync,
    isUpdatingEvent,
    updateEventMutateAsync,
  } = useEvent();

  const [selectedEventDate, setSelectedEventDate] = useState(new Date());

  /**
   * component functions
   */

  const onSubmit: SubmitHandler<EventSchema> = ({ name, purpose, time }) => {
    isEditingEvent
      ? updateEventMutateAsync({
          eventUuid: globalEvent?.attributes?.uuid,
          eventUpdateData: {
            date: format(selectedEventDate, "EE, MMMM d, yyy"),
            name,
            purpose,
            time,
          },
        })
      : createEventMutateAsync({
          date: format(selectedEventDate, "EE, MMMM d, yyy"),
          name,
          purpose,
          time,
        });
  };

  useEffect(() => {
    if (globalEvent && isEditingEvent) {
      reset({
        name: globalEvent?.attributes?.name,
        purpose: globalEvent?.attributes?.purpose,
        time: globalEvent?.attributes?.time,
      });

      setSelectedEventDate(new Date(globalEvent?.attributes?.date));
    }
  }, [globalEvent, isEditingEvent, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalEvent(null);
          setIsEditingEvent(false);
          setShowCreateOrEditEventWidget(false);
          // clearForm();
        }}
        title={!isEditingEvent ? "Create An Event." : "Update Event."}
      />

      {/* body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[39rem] flex-col gap-6 overflow-y-scroll px-2"
      >
        <div className="flex w-full flex-col gap-4 overflow-y-scroll py-3 scrollbar-hide">
          {/* name */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <label className="input_label">Name</label>

              {errors["name"] && (
                <Error errorMessage={errors["name"].message} />
              )}
            </div>
          </div>

          {/* purpose */}
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Purpose"
                {...register("purpose", { required: true })}
              />
              <label className="input_label">Purpose</label>

              {errors["purpose"] && (
                <Error errorMessage={errors["purpose"].message} />
              )}
            </div>
          </div>

          {/* date and time */}
          <div className="flex  flex-col gap-y-5  rounded-md border border-primary/10  py-4 px-2">
            <div className=" flex justify-center  ">
              <span className="text-primary">Event Date</span>
              <Calendar
                date={selectedEventDate}
                minDate={new Date()}
                onChange={(date) => setSelectedEventDate(date)}
                color="#ff7d55"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Time (24hrs)"
                {...register("time", { required: true })}
              />
              <label className="input_label">Time (24hrs)</label>

              {errors["time"] && (
                <Error errorMessage={errors["time"].message} />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isEditingEvent ? (
                isUpdatingEvent ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isCreatingEvent ? (
                <SpinnerLoader color="fill-white" />
              ) : (
                "Create"
              )
            }
            intent="primary"
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditEvent;
