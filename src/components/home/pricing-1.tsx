import { RocketIcon, ZapIcon } from "lucide-react";

import { SpringButton } from "@/components/gsap/spring-button";
import { StaggerOnScroll } from "@/components/gsap/stagger-on-scroll";
import { Button } from "@/components/ui/button";
import SectionHeader from "../ui/SectionHead";

const Pricing1 = () => {
  return (
    <div className="bg-white dark:bg-black container py-6 sm:py-12 lg:pt-24 lg:pb-16">
      <SectionHeader
        title="Choose Your Storage Type"
        description="We offer two powerful storage solutions to meet your specific needs."
      />
      <StaggerOnScroll
        effect="slideInRight"
        className="mt-8 grid h-full grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-2 lg:gap-12 lg:px-12"
      >
        <div className="bg-background flex flex-col rounded-md border p-6">
          <div className="flex justify-between">
            <p className="text-2xl font-medium">Starter</p>
            <p>
              <sup className="text-foreground/70 text-lg font-medium">$</sup>
              <span className="text-3xl font-medium">0</span>
              <sub className="text-muted-foreground text-sm">/month</sub>
            </p>
          </div>
          <p className="text-muted-foreground mt-1 text-sm italic">
            Individuals just getting started
          </p>
          <p className="text-foreground/50 mt-4 text-xs font-medium uppercase">
            Features
          </p>
          <ul className="mt-2 list-inside list-disc space-y-0.5">
            <li>1 Project</li>
            <li>Community support</li>
            <li>Basic components</li>
            <li>Limited access to updates</li>
          </ul>
          <div className="mt-auto pt-5">
            <SpringButton
              scale={0.95}
              shaking={false}
              className="hover:bg-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border py-2"
            >
              <RocketIcon className="size-4.5" />
              Start for Free
            </SpringButton>
          </div>
        </div>
        <div className="bg-background relative flex flex-col rounded-md border p-6 shadow">
          <div className="bg-background absolute start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-0.5 text-xs">
            Most Popular
          </div>
          <div className="flex justify-between">
            <p className="text-2xl font-medium">Pro</p>
            <p>
              <sup className="text-foreground/70 text-lg font-medium">$</sup>
              <span className="text-3xl font-medium">19</span>
              <sub className="text-muted-foreground text-sm">/month</sub>
            </p>
          </div>
          <p className="text-muted-foreground mt-1 text-sm italic">
            Freelancers and solo developers
          </p>
          <p className="text-foreground/50 mt-4 text-xs font-medium uppercase">
            Features
          </p>
          <ul className="mt-2 list-inside list-disc space-y-0.5">
            <li>Unlimited projects</li>
            <li>Priority support</li>
            <li>All components included</li>
            <li>Regular updates</li>
            <li>Access to interaction animations</li>
          </ul>
          <div className="mt-auto pt-5">
            <SpringButton
              scale={0.95}
              shaking={false}
              className="bg-primary text-primary-foreground flex w-full cursor-pointer items-center justify-center gap-2 rounded-md py-2"
            >
              <ZapIcon className="size-4.5" />
              Upgrade to Pro
            </SpringButton>
          </div>
        </div>
      </StaggerOnScroll>
      <div className="mt-6 text-center sm:mt-8 lg:mt-16">
        <p className="text-2xl font-medium">Need something custom?</p>
        <p className="text-muted-foreground mt-1 text-sm">
          Let’s talk and find the right solution for you.
        </p>
        <Button className="mt-3">Contact Us</Button>
      </div>
    </div>
  );
};

export default Pricing1;
