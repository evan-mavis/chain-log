import { ConfettiSideCannons } from "../ui/confetti-side-cannons";
import { Textarea } from "../ui/textarea";

export default function LogForm() {
  return (
    <div className="mt-3 flex flex-col items-center justify-center sm:mr-4 sm:mt-0">
      <Textarea
        className="w-full"
        placeholder="What did you do today to keep your chain going?"
      />
      <div className="m-4 flex items-center justify-center">
        <ConfettiSideCannons>Log today</ConfettiSideCannons>
      </div>
    </div>
  );
}
