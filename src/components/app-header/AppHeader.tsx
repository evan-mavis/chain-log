import { Link } from "lucide-react";
import UserPreferenceControls from "../user-preference-controls/UserPreferenceControls";

export default function AppHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="m-6 flex items-center text-2xl font-bold">
        <span>Chain</span>
        <Link className="mx-1 text-red-500" />
        <span>Log</span>
      </h1>
      <UserPreferenceControls />
    </div>
  );
}
