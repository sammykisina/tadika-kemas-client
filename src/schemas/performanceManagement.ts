import { object, string } from "zod";

const performanceSchema = object({
  year: string().min(4, { message: "Enter a valid year" }),
  marks: string().trim().min(1, { message: "Student marks is required." }),
  comment: string().min(10, { message: "Provide a comment for the student." }),
});

const studentManagementSchemas = {
  performanceSchema,
};

export default studentManagementSchemas;
