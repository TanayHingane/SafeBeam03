import { CircleCheck, RocketIcon, XCircle, ZapIcon } from "lucide-react";

import { SpringButton } from "@/components/gsap/spring-button";
import { StaggerOnScroll } from "@/components/gsap/stagger-on-scroll";
import { Button } from "@/components/ui/button";
import SectionHeader from "../ui/SectionHead";

const Pricing1 = () => {
  return (
    <div
      className="bg-white dark:bg-black container py-7 sm:py-12 lg:pt-24 lg:pb-16"
      id="pricing"
    >
      <SectionHeader
        title="Choose Your Storage Type"
        description="We offer two powerful storage solutions to meet your specific needs."
      />
      <StaggerOnScroll
        effect="scale"
        className="mt-8 mb-12 grid h-full grid-cols-1 gap-10 md:gap-5 sm:mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-2 lg:gap-12 lg:px-12"
      >
        <div className="bg-background flex flex-col rounded-md border p-6">
          <div className="flex justify-between">
            <p className="text-2xl font-medium">Sharing</p>
            <p>
              <sup className="text-foreground/70 text-lg font-medium">₹</sup>
              <span className="text-3xl font-medium">0</span>
              <sub className="text-muted-foreground text-sm">/month</sub>
            </p>
          </div>
          <p className="text-muted-foreground mt-1 text-sm italic">
            Share your data
          </p>
          <p className="text-foreground/50 mt-4 text-xs font-medium uppercase">
            Features
          </p>
          <ul className="mt-2 list-none space-y-0.5">
            <li className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 mt-1 text-green-500" />
              <span>Storing for 10 mins</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 mt-1 text-green-500" />
              <span>Maximum 1 file</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 mt-1 text-green-500" />
              <span>Upto 50 MB</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 mt-1 text-red-500" />
              <span>No Unlimited storage</span>
            </li>
          </ul>
          <div className="mt-auto pt-5">
            <a href="/transfer">
              <SpringButton
                scale={0.95}
                shaking={false}
                className="hover:bg-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border py-2"
              >
                <RocketIcon className="size-4.5" />
                Start for Free
              </SpringButton>
            </a>
          </div>
        </div>
        <div className="bg-background relative flex flex-col rounded-md border p-6 shadow">
          <div className="bg-background absolute start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-0.5 text-xs">
            Recommended
          </div>
          <div className="flex justify-between">
            <p className="text-2xl font-medium">Storing</p>
            <p>
              <sup className="text-foreground/70 text-lg font-medium">₹</sup>
              <span className="text-3xl font-medium">99</span>
              <sub className="text-muted-foreground text-sm">/month</sub>
            </p>
          </div>
          <p className="text-muted-foreground mt-1 text-sm italic">
            Store your data
          </p>
          <p className="text-foreground/50 mt-4 text-xs font-medium uppercase">
            Features
          </p>
          <ul className="mt-2 list-none space-y-0.5">
            <li className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 mt-1 text-green-500" />
              <span>Storage for 30 days</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 mt-1 text-green-500" />
              <span>Upto 5 files</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 mt-1 text-green-500" />
              <span>Upto 2 GB</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheck className="w-4 h-4 mt-1 text-green-500" />
              <span>Access to all features</span>
            </li>
          </ul>
          <div className="mt-auto pt-5">
            <SpringButton
              scale={0.95}
              shaking={false}
              className="bg-primary cursor-not-allowed text-primary-foreground flex w-full items-center justify-center gap-2 rounded-md py-2"
              disabled
            >
              <ZapIcon className="size-4.5" />
              Coming Soon
            </SpringButton>
          </div>
        </div>
      </StaggerOnScroll>
      <div className="mt-6 text-center sm:mt-8 lg:mt-16">
        <p className="text-2xl font-medium">
          Let&apos;s create something amazing together?
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          Ready to bring your next project to life? Let&apos;s connect and
          discuss how I can help you achieve your goals.
        </p>
        <a
          href="mailto:tanayhingane03@gmail.com?subject=Hello%20I%27m%20____%20from%20____%20company&body=I%20want%20to%20start%20a%20new%20project%20about%20____%20and%20time%20duration%20is%20___%20days."
          target="_blank"
        >
          <Button className="mt-3">Contact Me</Button>
        </a>
      </div>
    </div>
  );
};

export default Pricing1;
