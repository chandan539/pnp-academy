import { Metadata } from "next";
import SecurityClient from "./SecurityClient";

export const metadata: Metadata = {
  title: "Security Settings | Admin Dashboard",
  description: "Manage security settings and passwords",
};

export default function SecurityPage() {
  return <SecurityClient />;
}
