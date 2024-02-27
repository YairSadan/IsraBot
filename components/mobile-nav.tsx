"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

type MobileNavProps = {
  userId: string | null;
};
export function MobileNav({ userId }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href={"/"}
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Image
            src={"/israelicon.png"}
            width={40}
            height={40}
            alt="israbot logo"
            className="rounded-full"
          />
          <span className=" ml-2 font-bold">Israbot.</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <MobileLink
              href={userId ? `/${userId}/chat-history` : "/sign-in"}
              onOpenChange={setOpen}
            >
              Chat
            </MobileLink>
            <MobileLink href={"/about"} onOpenChange={setOpen}>
              About
            </MobileLink>
            <MobileLink href={"/contact"} onOpenChange={setOpen}>
              Contact
            </MobileLink>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
