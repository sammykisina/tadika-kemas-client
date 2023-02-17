import type { Performance } from "src/types/typings.t";
import { API } from "./api";

const PerformanceAPI = {
  getAllPerformances: async () =>
    API.get("/admin/students/performances?include=student"),
  createPerformance: async (data: {
    studentUuid: string;
    performanceData: Performance;
  }) =>
    API.post(
      `/admin/students/${data.studentUuid}/performances`,
      data.performanceData
    ),
  updatePerformance: async (data: {
    studentUuid: string;
    performanceUuid: string;
    performanceUpdateData: Performance;
  }) =>
    API.patch(
      `/admin/students/${data.studentUuid}/performances/${data.performanceUuid}`,
      data.performanceUpdateData
    ),
};

export default PerformanceAPI;
