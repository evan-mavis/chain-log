import ThemeToggle from "../theme-toggle/ThemeToggle";
import AppAvatar from "../app-avatar/AppAvatar";
import NotificationsToggle from "../notifications-toggle/NotificationsToggle";
import { getEmailNotificationSettings } from "@/app/dashboard/queries/user-settings";

export default async function UserPreferenceControls() {
  const settings = await getEmailNotificationSettings();
  return (
    <div className="mr-6 flex items-center justify-center space-x-2 rounded-md border-2 border-red-700 p-2">
      <NotificationsToggle
        initialOptIn={settings?.optIn ?? false}
        initialTime={settings?.time ?? "09:00"}
        initialTimezone={settings?.timezone ?? undefined}
      />
      <ThemeToggle />
      <AppAvatar />
    </div>
  );
}
