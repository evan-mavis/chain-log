import { Link } from "lucide-react";
import UserPreferenceControls from "../user-preference-controls/UserPreferenceControls";

export default function AppHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-keyboard-wave m-6 flex items-center text-2xl font-bold">
        <span>Chain</span>
        <Link className="ml-2 mr-1 text-red-500" />
        <span>Log</span>
      </h1>
      <UserPreferenceControls />
    </div>
  );
}
