"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Message } from "ai/react";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DotsHorizontalIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isCollapsed: boolean;
  links: {
    name: string;
    messages: Message[];
    variant: "grey" | "ghost";
    id: string;
  }[];
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({ links, isCollapsed, isMobile }: SidebarProps) {
  const { userId } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();
  if (!userId || !user) return null;
  return (
    <div
      data-collapsed={isCollapsed}
      className="group relative flex h-full flex-col gap-4 overflow-y-auto p-2 data-[collapsed=true]:p-2"
    >
      {!isCollapsed && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <DotsHorizontalIcon />
            </Link>
            <Link
              href={pathname}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <Pencil2Icon />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={pathname + "?chatId=" + link.id}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      link.variant === "grey" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}
                  >
                    <div className="relative flex w-[30px] items-center border-4 border-red-900">
                      <Avatar className="absolute left-[-18px]">
                        <AvatarImage
                          src={"/israelIcon.svg"}
                          alt={link.name}
                          width={6}
                          height={6}
                          className="h-10 w-10 "
                        />
                      </Avatar>
                      <Avatar className="absolute left-[-4px]">
                        <AvatarImage
                          src={user.imageUrl}
                          alt={link.name}
                          width={6}
                          height={6}
                          className="h-10 w-10 "
                        />
                      </Avatar>
                    </div>
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={pathname + "?chatId=" + link.id}
              className={cn(
                buttonVariants({ variant: link.variant, size: "xl" }),
                link.variant === "grey" &&
                  "shrink dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start gap-4",
              )}
            >
              <div className="relative flex w-[30px] items-center border-4 border-red-900">
                <Avatar className="absolute left-[-18px]">
                  <AvatarImage
                    src={"/israelIcon.svg"}
                    alt={link.name}
                    width={6}
                    height={6}
                    className="h-10 w-10 "
                  />
                </Avatar>
                <Avatar className="absolute left-[-4px]">
                  <AvatarImage
                    src={user.imageUrl}
                    alt={link.name}
                    width={6}
                    height={6}
                    className="h-10 w-10 "
                  />
                </Avatar>
              </div>
              <div className="flex max-w-28 flex-col">
                <span>{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="truncate text-xs text-zinc-300 ">
                    <span className="font-bold">IsraBot: </span>
                    {link.messages[link.messages.length - 1].content}
                  </span>
                )}
              </div>
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
