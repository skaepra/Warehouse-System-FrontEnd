import api from "../../../shared/api/axiosInstance";

export interface UserDetails {
  id: string;
  email: string;
  userName: string;
  isActive: boolean;
  roles: string[];
}

export interface ToggleStatusPayload {
  userId: string;
  isActive: boolean;
}

export const fetchUsers = async (): Promise<UserDetails[]> => {
  const res = await api.get<UserDetails[]>("/api/users");
  return res.data;
};

export const toggleUserStatus = async (payload: ToggleStatusPayload) => {
  const res = await api.patch<{ message: string }>(
    "/api/user/activationStatus",
    payload,
  );
  return res.data;
};
