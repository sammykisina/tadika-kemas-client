import type { StudentData } from "src/types/typings.t";
import { API } from "./api";

const StudentRegistrationAPI = {
  getAllStudents: async () =>
    API.get("/admin/students?include=role&filter[role.slug]=student"),
  registerStudent: async (studentData: StudentData) =>
    API.post("/admin/students", studentData),
  updateStudent: async (data: {
    studentUuid: string;
    studentUpdateData: StudentData;
  }) =>
    API.patch(`/admin/students/${data.studentUuid}`, data.studentUpdateData),
  deleteStudent: async (studentUuid: string) =>
    API.delete(`/admin/students/${studentUuid}`),
};

export default StudentRegistrationAPI;
