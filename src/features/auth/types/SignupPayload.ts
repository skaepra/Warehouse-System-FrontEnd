export type SignupPayload = {
  fullName: string;
  phone: string;
  birthDate: string;
  password: string;
  photoUrl?: string;
  countryCode?: string;
  callingCode?: string;
};
