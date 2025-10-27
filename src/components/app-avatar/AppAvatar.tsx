"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAppMode } from "@/components/mode/ModeProvider";

export default function AppAvatar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { mode } = useAppMode();
  const isDemo = mode === "demo";
  const image = session?.user?.image ?? undefined;
  const name = session?.user?.name ?? undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={image} alt={name} referrerPolicy="no-referrer" />
          <AvatarFallback>
            {name?.charAt(0).toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={isDemo}
          onClick={async () => {
            if (isDemo) return;
            await authClient.signOut();
            router.replace("/");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
