import type { Metadata } from "next";
import AdminFeaturedClient from "./FeaturedClient";

export const metadata: Metadata = { title: "Admin · Featured" };

export default function AdminFeaturedPage() {
  return <AdminFeaturedClient />;
}
