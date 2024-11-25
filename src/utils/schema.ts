import * as Yup from "yup";

export const signupSchema = Yup.object({
  personal: Yup.string().required("Personal name cannot be blank"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please provide your email address"),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please enter your password again"),
});
