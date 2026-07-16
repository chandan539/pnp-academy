import { getSettings } from "@/app/actions/settings";
import LoginClient from "./LoginClient";

export default async function LoginPage() {
  const settings = await getSettings();
  const websiteTitle = settings.website_title || "PnP Academy";

  return <LoginClient websiteTitle={websiteTitle} />;
}
