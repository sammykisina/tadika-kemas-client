import { object, string } from "zod";

const eventSchema = object({
  name: string().min(1, { message: "Event name is required." }),
  purpose: string().min(15, { message: "Enter the purpose of this event." }),
  time: string().min(5, { message: "Enter the time of the event (24hrs)" }),
});

const eventManagementSchemas = {
  eventSchema,
};

export default eventManagementSchemas;
