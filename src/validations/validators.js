import {object, ref, string} from "yup";

export const registerSchema = object({
  email: string().email("Email is incorrect").required("Please insert email"),
  userName: string().min(2, "Username must be at least 2 characters long"),
  password: string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Confirm password doesn't match password"
  ),
});

export const loginSchema = object({
  email: string().email("Email is incorrect").required("Please insert email"),
  password: string().min(6, "Password must be at least 6 characters long"),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    console.log(errTxt);
    const mergeErr = new Error(errTxt);
    next(mergeErr);
  }
};
