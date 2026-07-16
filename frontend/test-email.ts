import { sendTransactionalEmail } from "./src/app/actions/email";
import { getSettings } from "./src/app/actions/settings";
import prisma from "./src/lib/prisma";

async function run() {
  await prisma.appSetting.upsert({
    where: { key: "preferred_email_service" },
    update: { value: "BREVO" },
    create: { key: "preferred_email_service", value: "BREVO" },
  });

  const settings = await getSettings();
  console.log("Current Email Settings:");
  console.log({
    emailProvider: settings["preferred_email_service"],
    hasBrevoKey: !!settings["brevo_api_key"],
    brevoFromEmail: settings["brevo_from_email"],
    brevoFromName: settings["brevo_from_name"],
  });

  console.log("Testing email send...");
  const res = await sendTransactionalEmail({
    to: "chandanprasad0@gmail.com",
    subject: "Test Invite via Brevo",
    htmlBody: "<p>This is a test email via Brevo</p>"
  });

  console.log("Result:", res);
}

run().catch(console.error);
