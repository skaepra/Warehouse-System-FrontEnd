export type LoginPayload = {
  phone: string;
  password: string;
  deviceID:string;
  countryCode?: string;
  callingCode?: string;
  rememberMe: boolean;
};
