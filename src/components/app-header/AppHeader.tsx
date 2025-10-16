import UserPreferenceControls from "../user-preference-controls/UserPreferenceControls";

export default function AppHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="m-6 text-2xl font-bold">Chain Log</h1>
      <UserPreferenceControls />
    </div>
  );
}
