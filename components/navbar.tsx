import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

const Navar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        {/* <Image
          src={"./assets/plura-logo.svg"}
          width={40}
          height={40}
          alt="plur logo"
        /> */}
        <span className="text-xl font-bold"> Israbot.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        {user ? <UserButton /> : <SignInButton />}
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navar;
