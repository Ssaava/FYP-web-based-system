import z from "zod";

export const RegisterSchema = z.object({
  first_name: z.string().nonempty("First Name is Required"),
  last_name: z.string().nonempty("Last Name is Required"),
  email: z.string().email("Incorrect Email").nonempty("Email is Required"),
  password: z.string().nonempty("Password is required"),
  category: z.string().nonempty("Category is Required"),
});
export const LoginSchema = z.object({
  email: z.string().email("Incorrect Email").nonempty("Email is Required"),
  password: z.string().nonempty("Password is required"),
});
