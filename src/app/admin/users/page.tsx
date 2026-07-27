import type { Metadata } from "next";
import AdminUsersClient from "./UsersClient";

export const metadata: Metadata = { title: "Admin · Users" };

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}
