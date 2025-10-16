import { Button } from "../ui/button";
import { ConfettiButton } from "../ui/confetti";

export default function LogButtons() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button>Acheived Goal</Button>
      <Button>Missed Goal</Button>
      {/* <ConfettiButton></ConfettiButton>
      <ConfettiButton></ConfettiButton> */}
    </div>
  );
}
