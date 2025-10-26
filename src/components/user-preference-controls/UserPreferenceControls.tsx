import ThemeToggle from "../theme-toggle/ThemeToggle";
import AppAvatar from "../app-avatar/AppAvatar";
import MessagesToggle from "../messages-toggle/MessagedToggle";

export default function UserPreferenceControls() {
  return (
    <div className="mr-6 flex items-center justify-center space-x-2 rounded-md border-2 border-red-700 p-2">
      <MessagesToggle />

      <ThemeToggle />

      <AppAvatar />
    </div>
  );
}
