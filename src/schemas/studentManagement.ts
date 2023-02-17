import { object, string } from "zod";

const studentSchema = object({
  name: string({
    required_error: "Name is required.",
  })
    // .trim()
    .min(1, { message: "Name is required" }),

  email: string({
    required_error: "Email is required.",
  })
    .trim()
    .email({
      message: "Enter a valid email.",
    }),
  password: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5, { message: "Password is required" }),
  address: string({
    required_error: "Address is required.",
  })
    .trim()
    .min(1, { message: "Address is required" }),
  fartherName: string({
    required_error: "Father name is required.",
  })
    .trim()
    .min(1, { message: "Father name is required" }),
  fartherPhone: string({
    required_error: "Father phone is required.",
  })
    .trim()
    .min(8, { message: "Enter a valid phone number." }),
  motherName: string({
    required_error: "Mother name is required.",
  })
    .trim()
    .min(1, { message: "Mother name is required" }),
  motherPhone: string({
    required_error: "Enter a valid phone number.",
  })
    .trim()
    .min(8, { message: "Enter a valid phone number." }),
});

const studentManagementSchemas = {
  studentSchema,
};

export default studentManagementSchemas;
