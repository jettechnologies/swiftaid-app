import * as Yup from "yup";

export const signupSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please provide your email address"),
  contact: Yup.string()
    .matches(/^[0-9]{11}$/, "Invalid phone number")
    .required("Contact is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?"{}|<>]/,
      "Password must contain at least one special character"
    )
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  rememberMe: Yup.boolean()
    .required("Please select the remember me option")
    .default(false),
});
