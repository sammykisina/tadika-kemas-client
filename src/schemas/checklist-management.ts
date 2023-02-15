import { object, string } from "zod";

const checklist_group_schema = object({
  name: string({
    required_error: "Name is required.",
  })
    .trim()
    .min(5, { message: "Name should be at least 5 characters long" }),
});

const checklist_schema = object({
  name: string({
    required_error: "Name is required.",
  })
    .trim()
    .min(5, { message: "Name should be at least 5 characters long" }),
});

const checklistTaskSchema = object({
  name: string({
    required_error: "Name is required.",
  })
    .trim()
    .min(5, { message: "Name should be at least 5 characters long" }),
  description: string({
    required_error: "Description is required.",
  })
    .trim()
    .min(10, { message: "Description should be at least 10 characters long" }),
});

const checklist_management_schemas = {
  checklist_group_schema,
  checklist_schema,
  checklistTaskSchema,
};

export default checklist_management_schemas;
