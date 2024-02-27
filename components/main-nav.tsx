import Link from "next/link";
import Image from "next/image";
type MainNavProps = {
  userId: string | null;
};
export function MainNav({ userId }: MainNavProps) {
  return (
    <div className="hidden md:flex">
      <aside className="hidden md:flex items-center gap-2">
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
          <Link href={userId ? `/${userId}/chat-history` : "/sign-in"}>
            Chat
          </Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </ul>
      </nav>
    </div>
  );
}
