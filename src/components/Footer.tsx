import React from "react";
import Link from "next/link";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="py-12 bg-white dark:bg-black border-t border-t-neutral-300 dark:border-t-neutral-800">
      <div className="container px-6 lg:max-w-5xl 2xl:max-w-6xl mx-auto">
        <div className="grid grid-cols-4 sm:justify-items-center gap-8 mb-12">
          <div className="md:col-span-2 col-span-4">
            <div className="mb-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-foreground w-fit"
              >
                <Logo />
              </Link>
            </div>
            <p className="text-foreground/70 max-w-md mb-6">
              SafeBeam is a secure and fast way to send and receive text or
              files using unique 4-digit IDs. It&apos;s perfect for sharing
              secured data.
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-medium text-lg mb-4">Product</h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink href="/transfer">Send</FooterLink>
              <FooterLink href="/transfer#receive-data">Receive</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
            </nav>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">About</h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink href="https://linkedin.com/in/tanayhingane">
                LinkedIn
              </FooterLink>
              <FooterLink href="https://tanayhingane03.vercel.app/">
                Portfolio
              </FooterLink>
              <FooterLink href="mailto:tanayhingane03@gmail.com?subject=Hello%20I%27m%20____%20from%20____%20company&body=I%20want%20to%20start%20a%20new%20project%20about%20____%20and%20time%20duration%20is%20___%20days.">
                Contact
              </FooterLink>
            </nav>
          </div>
        </div>

        <div className="border-t border-t-neutral-200 dark:border-t-neutral-900 pt-8 ">
          <div className="text-foreground/60 text-center text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SafeBeam. Created by{" "}
            <Link
              href={"https://tanayhingane03.vercel.app/"}
              className="hover:underline hover:underline-offset-4 font-semibold"
            >
              Tanay Hingane
            </Link>{" "}
            as a hobby project.
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}

const FooterLink = ({ href, children, small = false }: FooterLinkProps) => (
  <a
    href={href}
    className={`text-foreground/70 hover:text-foreground smooth-transition ${
      small ? "text-sm" : ""
    }`}
  >
    {children}
  </a>
);

export default Footer;
