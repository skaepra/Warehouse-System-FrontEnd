import { SignupFormData } from "../schemas/CreateEmployeeSchema";

export const initialSignupState: SignupFormData = {
  fullName: "",
  Email: "",
  password: "",
  Remember: false,
};
