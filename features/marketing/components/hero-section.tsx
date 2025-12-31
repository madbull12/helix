"use client";

import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Github from "@/components/logos/github";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Glow from "@/components/ui/glow";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import Screenshot from "@/components/ui/screenshot";
import { Section } from "@/components/ui/section";
import AnimatedGradientBadge from "@/features/marketing/components/animated-gradient-badge";
import { fadeBottomVariant } from "@/lib/motion-variants";
import { motion } from "motion/react";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Clarity for how your team works",
  description = "An AI-native workspace that turns conversations into decisions, summaries, and action — without the noise.",
  mockup = (
    <Screenshot
      srcLight="/assets/landing-page-ss.png"
      srcDark="/assets/landing-page-ss.png"
      alt="Helix Screenshot"
      width={1248}
      height={765}
      className="w-full"
    />
  ),
  badge = <AnimatedGradientBadge />,
  buttons = [
    {
      href: siteConfig.getStartedUrl,
      text: "Get Started",
      variant: "default",
    },
    {
      href: siteConfig.links.github,
      text: "Request a demo",
      variant: "glow",
    },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className
      )}
    >
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 text-center sm:gap-12"
        >
          {badge !== false && badge}
          <motion.h1
            key="title"
            variants={fadeBottomVariant}
            className=" from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            key="description"
            variants={fadeBottomVariant}
            className="text-md  text-muted-foreground relative z-10 max-w-185 font-medium text-balance delay-100 sm:text-xl"
          >
            {description}
          </motion.p>
          {buttons !== false && buttons.length > 0 && (
            <motion.div
              key="action-buttons"
              variants={fadeBottomVariant}
              className=" relative z-10 flex justify-center gap-4 delay-300"
            >
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  asChild
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </a>
                </Button>
              ))}
            </motion.div>
          )}
          {mockup !== false && (
            <motion.div
              key="mockup"
              variants={fadeBottomVariant}
              className="relative container pt-12"
            >
              <MockupFrame size="small">
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              <Glow variant="top" />
            </motion.div>
          )}
        </motion.div>
      </div>
      <ShootingStars />
      <StarsBackground />
    </Section>
  );
}
