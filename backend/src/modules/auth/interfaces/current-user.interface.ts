export interface CurrentUserData {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}