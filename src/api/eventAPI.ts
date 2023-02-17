import type { Event } from "src/types/typings.t";
import { API } from "./api";

const EventAPI = {
  getAllEvents: async () => API.get("/admin/events"),
  createEvent: async (eventData: Event) => API.post("/admin/events", eventData),
  updateEvent: async (data: { eventUuid: string; eventUpdateData: Event }) =>
    API.patch(`/admin/events/${data.eventUuid}`, data.eventUpdateData),
  deleteEvent: async (eventUuid: string) =>
    API.delete(`/admin/events/${eventUuid}`),
};

export default EventAPI;
