export type SignupPayload = {
    FullName: string;
    Email: string;
    Password: string;
    Role: "Storekeeper" | "Sales" | "Manager";
};
