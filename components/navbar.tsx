import React from "react";
import { ModeToggle } from "./mode-toggle";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
const Navar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex items-center backdrop-blur-sm justify-between p-4">
      <MainNav userId={user?.id ?? null} />
      <MobileNav userId={user?.id ?? null} />
      <aside className="flex items-center gap-2">
        {user ? <UserButton /> : <SignInButton />}
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navar;
