"use client";

import { Download, HomeIcon, RefreshCcw, Send, UsersIcon } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
// import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "./logo";
import { Button } from "./ui/button";

// Navigation links with icons for desktop icon-only navigation
const navigationLinks = [
  { href: "/", label: "Home", icon: HomeIcon, active: true },
  { href: "/transfer", label: "Send", icon: Send },
  { href: "/transfer/#receive-data", label: "Receive", icon: Download },
  { href: "#", label: "Team", icon: UsersIcon },
];

// Language options

export default function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white dark:bg-black px-4 md:px-60">
      <div className="flex h-16 items-center justify-between gap-4 w-full">
        <a href="#" className="text-primary hover:text-primary/90">
          <Logo />
        </a>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            <TooltipProvider>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavigationMenuLink
                        href={link.href}
                        className="flex size-8 items-center justify-center p-1.5"
                      >
                        <link.icon size={20} aria-hidden="true" />
                        <span className="sr-only">{link.label}</span>
                      </NavigationMenuLink>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="px-2 py-1 text-xs">
                      <p>{link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </NavigationMenuItem>
              ))}
            </TooltipProvider>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            className="flex gap-2 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw size={16} aria-hidden="true" />
            Refresh
          </Button>
        </div>
      </div>
    </header>
  );
}
