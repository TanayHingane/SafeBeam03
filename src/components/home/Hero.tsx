import { PlayCircleIcon, ShieldCheck } from "lucide-react";

import { RevealText } from "@/components/gsap/reveal-text";
import { SpringButton } from "@/components/gsap/spring-button";
import { TextFallButton } from "@/components/gsap/text-fall-button";
import { TiltCard } from "@/components/gsap/tilt-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Hero1 = () => {
  return (
    <div className="container overflow-hidden p-4 sm:p-6 lg:p-12 xl:pt-36 xl:pb-28">
      <div className="grid h-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex flex-col items-start lg:order-1">
          <div className="bg-muted flex items-center gap-1.5 rounded-full py-1 ps-1 pe-3 text-sm">
            <div className="bg-blue-500 text-white rounded-full p-1">
              <ShieldCheck className="size-4" />
            </div>
            <p>Beam data securely</p>
          </div>

          <RevealText className="mt-3 text-2xl leading-[1.25] font-semibold sm:text-3xl lg:text-4xl">
            Transfer your data with OTP verification
          </RevealText>
          <p className="text-foreground/80 mt-3 max-w-lg max-sm:text-sm lg:mt-5">
            SmartBeam is a reliable and secure transfer platform, where you can
            send any type of file and it will generate an otp which will be
            active for only 10 min. you can recieve the file from any device any
            os when you enter the otp.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 sm:pt-6">
            <a href="/transfer" target="_blank">
              <TextFallButton className=" bg-primary text-primary-foreground cursor-pointer overflow-hidden rounded-full py-2 ps-4 pe-5 font-medium">
                Get Started
              </TextFallButton>
            </a>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
            >
              <SpringButton
                shaking={false}
                className="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-medium shadow-none"
              >
                Watch Demo
                <PlayCircleIcon className="size-4.5" />
              </SpringButton>
            </a>
          </div>
          <div className="mt-auto flex items-center gap-2 pt-4 lg:pt-6">
            <div className="flex -space-x-4 *:transition-all *:duration-300 *:hover:-translate-y-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>VD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-medium">Secured</p>
              <p className="text-muted-foreground line-clamp-1 text-sm leading-none max-sm:text-xs">
                Trusted by teams and businesses
              </p>
            </div>
          </div>
        </div>

        <TiltCard
          wrapperClassName="order-1 lg:order-2"
          className="bg-foreground/5 rounded-md p-2"
        >
          <img
            src="/dark.png"
            className="block dark:hidden h-80 w-full rounded-md object-cover sm:h-90 lg:h-100"
            alt="Hero Image"
          />

          <img
            src="/light.png"
            className="hidden dark:block h-80 w-full rounded-md object-cover sm:h-90 lg:h-100"
            alt="Hero Image"
          />
        </TiltCard>
      </div>
    </div>
  );
};

export default Hero1;
