"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const imageRef = useRef(null);
  const [totalUsers, setTotalUsers] = useState(null);

  // Scroll animation
  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch total users from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setTotalUsers(data.totalUsers);
      } catch (err) {
        console.error("Failed to load total users", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
            AI-Powered Career Toolkit for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and AI-powered tools for job success
          </p>
        </div>

        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image relative">
            <Image
              src="/banner.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />

            <div
              className="
                absolute top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2 
                text-black dark:text-white text-center
                w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%]
              "
            >
              <div className="gradient-title text-4xl md:text-5xl font-bold">
                {totalUsers !== null ? (
                  totalUsers.toLocaleString()
                ) : (
                  <Skeleton className="h-8 w-32 mx-auto" />
                )}
              </div>

              <p className="mt-2 text-lg md:text-xl font-medium max-w-xl mx-auto">
                Users have used Elevate to create AI-generated cover letters and resumes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
