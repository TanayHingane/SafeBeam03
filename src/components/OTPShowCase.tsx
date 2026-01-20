"use client";
import { useState, useEffect } from "react";
import { Lock, Clock } from "lucide-react";

const OTPShowcase = () => {
  const [otp, setOtp] = useState("8429");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Generate new OTP
          setOtp(Math.floor(100000 + Math.random() * 900000).toString());
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 relative">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
              One-Time Password System
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              Secure Access with{" "}
              <span className="gradient-text">10-Minute OTP</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
              Every transfer generates a unique 6-digit code that expires in 10
              minutes. Share it securely for instant access.
            </p>

            <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
              {[
                "Unique code for each transfer",
                "Auto-expires after 10 minutes",
                "No permanent links",
                "Works on any device",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground text-sm"
                >
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* OTP Visual */}
          <div className="flex justify-center">
            <div className="glass-card rounded-2xl border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 sm:py-12 min-w-full max-w-xs glow-effect">
              <div className="text-center mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-xs sm:text-base">
                  Your secure transfer code
                </p>
              </div>

              {/* OTP Display */}
              <div className="flex justify-center gap-1.5 sm:gap-2 mb-4">
                {otp.split("").map((digit, i) => (
                  <div
                    key={i}
                    className="w-9 h-11 sm:w-12 sm:h-14 rounded-lg bg-secondary flex items-center justify-center text-xl sm:text-2xl font-mono font-bold border border-border"
                  >
                    {digit}
                  </div>
                ))}
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm">
                <Clock className="w-4 h-4" />
                <span>Expires in</span>
                <span className="font-mono font-semibold text-primary">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-linear"
                  style={{ width: `${(timeLeft / 600) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OTPShowcase;
