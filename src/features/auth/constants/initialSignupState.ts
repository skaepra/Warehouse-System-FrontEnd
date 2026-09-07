import { SignupFormData } from "../../auth/schemas/signupSchema";

export const initialSignupState: SignupFormData = {
  fullName: "",
  Email: "",
  password: "",
  Remember: false,
};
