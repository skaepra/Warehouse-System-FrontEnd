import { LoginFormData  } from "../../auth/schemas/loginSchema";

export const initialLoginState: LoginFormData = {
  Email: "",
  password: "",
  Remember: false,
};