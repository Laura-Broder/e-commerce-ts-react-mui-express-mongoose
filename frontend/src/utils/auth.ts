import * as Yup from 'yup';

export const setJWT = (token: string) =>
  localStorage.setItem("jwt_token", token);
export const getJWT = () => localStorage.getItem("jwt_token");
export const removeJWT = () => localStorage.removeItem("jwt_token");



export const emailPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/^(?=.*\d).+$/, "Password must include at least one number")
    .matches(
      /^(?=.*[A-Z]).+$/,
      "Password must include at least one uppercase letter"
    )
    .required("Password is required"),
});
