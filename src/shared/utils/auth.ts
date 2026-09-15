import { jwtDecode } from "jwt-decode";

export interface CustomJwtPayload {
  nameid?: string;
  email?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
  role?: string | string[];
}

export const getUserRoles = (): string[] => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;

    if (!roles) return [];
    return Array.isArray(roles) ? roles : [roles];
  } catch (error) {
    return [];
  }
};

export const hasRole = (allowedRoles: string[]): boolean => {
  const userRoles = getUserRoles();
  return userRoles.some((role) => allowedRoles.includes(role));
};