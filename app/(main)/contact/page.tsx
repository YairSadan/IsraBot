import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const ContactPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 gap-2 md:p-24">
      <div className="bg-gradient-to-r from-secondary-foreground to-accent bg-clip-text text-transparent">
        <h1 className="text-center text-6xl font-bold leading-none md:text-8xl">
          Let&apos;s Connect
        </h1>
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-xl md:text-3xl font-semibold first:mt-0">
        Discover more about me
      </h2>
      <div className="flex flex-col gap-y-1">
        <h3 className="scroll-m-20 md:text-2xl font-semibold tracking-tight">
          Connect on LinkedIn:
        </h3>
        <Button asChild size={"xl"}>
          <Link href={"https://www.linkedin.com/in/yair-sadan"} target="_blank">
            <LinkedInLogoIcon width={40} height={40} />
            <span className="ml-2">Linkedin</span>
          </Link>
        </Button>
        <br />
        <h3 className="scroll-m-20 md:text-2xl font-semibold tracking-tight">
          Explore My Projects on GitHub:
        </h3>
        <Button asChild size={"xl"}>
          <Link href={"https://www.github.com/YairSadan"} target="_blank">
            <GitHubLogoIcon width={40} height={40} />
            <span className="ml-2">Github</span>
          </Link>
        </Button>
        <br />
        <h3 className="scroll-m-20 md:text-2xl font-semibold tracking-tight">
          A Glimpse Into My World:
        </h3>
        <Button asChild size={"xl"}>
          <Link
            href={
              "https://www.instagram.com/yair_sadan1?igsh=MXNlZTM3NGJ5M3Ntag%3D%3D&utm_source=qr"
            }
            target="_blank"
          >
            <InstagramLogoIcon width={40} height={40} />
            <span className="ml-2">Instagram</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;
