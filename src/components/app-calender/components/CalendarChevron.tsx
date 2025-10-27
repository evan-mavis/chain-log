import { Spinner } from "@/components/ui/spinner";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";

type Props = {
  isNavigating?: boolean;
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: "left" | "right" | "down" | "up";
};

export default function CalendarChevron({
  isNavigating,
  className,
  orientation,
  ...props
}: Props) {
  if (isNavigating) {
    return <Spinner className={className ?? "size-4"} />;
  }
  if (orientation === "left") {
    return <ChevronLeftIcon className={className ?? "size-4"} {...props} />;
  }
  if (orientation === "right") {
    return <ChevronRightIcon className={className ?? "size-4"} {...props} />;
  }
  if (orientation === "up") {
    return <ChevronUpIcon className={className ?? "size-4"} {...props} />;
  }
  return <ChevronDownIcon className={className ?? "size-4"} {...props} />;
}
