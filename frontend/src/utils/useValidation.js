import * as yup from "yup";

function useValidation() {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .matches(
        /^[A-Za-z ]{2,}$/,
        "First name must contain only letters and spaces"
      )
      .required("First name is required"),

    lastName: yup
      .string()
      .min(2, "Last name must be at least 2 characters")
      .matches(
        /^[A-Za-z ]{2,}$/,
        "Last name must contain only letters and spaces"
      )
      .required("Last name is required"),

    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        "Password must contain uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),

    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  });

  return schema;
}

export default useValidation;
