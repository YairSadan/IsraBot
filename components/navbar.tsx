import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
const Navar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between p-4">
      <aside className="flex items-center gap-2">
        <Link href={"/"}>
          <Image
            src={"/israelicon.png"}
            width={40}
            height={40}
            alt="israbot logo"
            className="rounded-full"
          />
        </Link>
        <span className="text-xl font-bold"> Israbot.</span>
      </aside>
      <nav className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transform md:block">
        <ul className="flex items-center justify-center text-sm gap-1 ml-9 sm:ml-0 sm:text-xl sm:gap-8">
          <Link href={user ? `/${user.id}/chat-history` : "/sign-in"}>
            History
          </Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </ul>
      </nav>
      <aside className="flex items-center gap-2">
        {user ? <UserButton /> : <SignInButton />}
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navar;
