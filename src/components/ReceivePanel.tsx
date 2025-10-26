// components/ReceivePanel.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  FileIcon,
  FileText,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// CONTEXT & SERVICES
import { useTransfer } from "../../contexts/TransferContext"; // Adjust the import path as needed
import { transferService } from "../lib/transfer-service"; // Adjust the import path as needed

// SHADCN/UI COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Custom hook for a countdown timer.
 * @param initialSeconds - The total number of seconds to count down from.
 * @param active - A boolean to start or stop the timer.
 * @param onExpire - Callback function to run when the timer reaches 0.
 * @returns The remaining time in seconds.
 */
function useCountdown(
  initialSeconds: number,
  active: boolean,
  onExpire?: () => void
) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      setTimeLeft(initialSeconds);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            if (onExpire) {
              onExpire();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTimeLeft(initialSeconds); // Reset on deactivate
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active, initialSeconds, onExpire]);

  return timeLeft;
}

export const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

const getFileTypeLabel = (fileType: string): string => {
  if (!fileType) return "Unknown";

  const typeMap: Record<string, string> = {
    wordprocessingml: "DOCX",
    spreadsheetml: "XLSX",
    presentationml: "PPTX",
    pdf: "PDF",
    zip: "ZIP",
    image: "IMAGE",
    video: "VIDEO",
    audio: "AUDIO",
    text: "TEXT",
    json: "JSON",
    xml: "XML",
    html: "HTML",
    csv: "CSV",
  };

  for (const key of Object.keys(typeMap)) {
    if (fileType.includes(key)) {
      return typeMap[key];
    }
  }

  return "Unknown";
};

/**
 * A modern, responsive panel for receiving files or text content using a secure ID.
 */
export default function ReceivePanel() {
  const [transferId, setTransferId] = useState("");
  const { receiveTransfer, currentTransfer, isLoadingReceive, transferError } =
    useTransfer();
  const [copied, setCopied] = useState(false);

  // Transfer expiry logic
  const initialExpirationTime = 599; // 10 minutes - 1 second for immediate display
  const [isTransferActive, setIsTransferActive] = useState(false);
  const countdown = useCountdown(
    initialExpirationTime,
    isTransferActive,
    () => {
      setIsTransferActive(false);
      // Optionally, clear currentTransfer or show an expired message
    }
  );

  // Effect to manage transfer activity state when currentTransfer changes
  useEffect(() => {
    if (currentTransfer && !transferError) {
      setIsTransferActive(true);
    } else {
      setIsTransferActive(false);
    }
  }, [currentTransfer, transferError]);

  // Handler to initiate receiving a transfer
  const handleReceive = async () => {
    if (transferId.length === 4) {
      // Reset any previous transfer state before attempting a new receive
      await receiveTransfer(transferId);
      // If successful, the useEffect above will set isTransferActive to true
    }
  };

  // Handler to download a file
  const handleDownload = async () => {
    if (currentTransfer?.type === "file" && currentTransfer.fileId) {
      try {
        const fileData = await transferService.downloadFile(
          currentTransfer.fileId
        );
        const blob = new Blob([fileData], {
          type: currentTransfer.fileType || "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = currentTransfer.fileName || "download";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
        // TODO: Display an error notification to the user
      }
    }
  };

  // Handler to copy text content to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div
      className="container mx-auto mt-10 md:mt-0 flex flex-col mb-16 items-center justify-center px-4 py-12"
      id="receive-data"
    >
      <div className="mb-10 items-center flex flex-col">
        <div className="inline-block text-xs font-medium px-3 py-1 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-blue-300 border border-neutral-300 text-blue-500 rounded-full mb-2">
          <Download className="inline mr-2 h-3 w-3 md:hidden" />
          Receive Data
        </div>
        <h1 className="text-lg md:text-2xl font-bold dark:text-neutral-50 tracking-tight">
          Securely Receive Files & Text Instantly
        </h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-3xl font-bold tracking-tight">
            Receive Data
          </CardTitle>
          <CardDescription className="mt-2 text-sm md:text-lg text-muted-foreground">
            Enter the 4-digit ID to securely retrieve your transfer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={transferId}
              onChange={(value) => {
                setTransferId(value);
              }}
              aria-label="Enter 4-digit transfer ID"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-14 w-14 text-lg" />
                <InputOTPSlot index={1} className="h-14 w-14 text-lg" />
                <InputOTPSlot index={2} className="h-14 w-14 text-lg" />
                <InputOTPSlot index={3} className="h-14 w-14 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {transferError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 flex items-center justify-center rounded-md border border-red-400 bg-red-50 p-3 text-sm text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-300"
                  role="alert"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  {transferError}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Receive Button */}
          <Button
            onClick={handleReceive}
            disabled={transferId.length !== 4 || isLoadingReceive}
            className="w-full py-6 text-base font-semibold"
            aria-live="polite"
          >
            {isLoadingReceive ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-label="Loading" />
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Receive Transfer
              </>
            )}
          </Button>

          <AnimatePresence mode="wait">
            {currentTransfer && isTransferActive && countdown > 0 ? (
              // Display Received Content
              <motion.div
                key="transfer-details"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Separator className="my-6" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {currentTransfer.type === "text" ? (
                        <FileText className="mr-2 h-5 w-5 text-blue-500" />
                      ) : (
                        <FileIcon className="mr-2 h-5 w-5 text-blue-500" />
                      )}
                      <h3 className="text-lg font-semibold">
                        {currentTransfer.type === "text"
                          ? "Text Message"
                          : truncateString(
                              currentTransfer.fileName || "Unknown File",
                              25
                            )}
                      </h3>
                    </div>
                    {currentTransfer.type === "text" && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                copyToClipboard(currentTransfer.content || "")
                              }
                              aria-label={
                                copied
                                  ? "Copied text"
                                  : "Copy text to clipboard"
                              }
                            >
                              <AnimatePresence mode="wait" initial={false}>
                                {copied ? (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Check className="h-4 w-4 text-green-500" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="copy"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copied ? "Copied!" : "Copy Text"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {currentTransfer.type === "text" ? (
                    <div className="relative max-h-48 overflow-auto rounded-md border bg-muted/50 p-4 text-sm font-mono">
                      <pre className="whitespace-pre-wrap">
                        {currentTransfer.content}
                      </pre>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <Label>Size:</Label>
                        <span className="font-medium text-foreground">
                          {(
                            (currentTransfer.fileSize || 0) /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </span>
                        <Label>Type:</Label>
                        <span className="font-medium text-foreground">
                          {/* {currentTransfer.fileType || "Unknown"} */}
                          {getFileTypeLabel(currentTransfer.fileType!)}
                        </span>
                      </div>
                      <Button onClick={handleDownload} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download File
                      </Button>
                    </div>
                  )}

                  {/* Expiration Timer */}
                  {/* <div
                    className="mt-4 flex items-center justify-center rounded-md border border-amber-500/30 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-600/30 dark:bg-amber-900/10 dark:text-amber-400"
                    role="timer"
                    aria-live="polite"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    <span>
                      This transfer expires in{" "}
                      <span className="font-mono font-bold tabular-nums">
                        {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                        {String(countdown % 60).padStart(2, "0")}
                      </span>
                    </span>
                  </div> */}
                </div>
              </motion.div>
            ) : (
              // Expired / No Transfer state
              <AnimatePresence>
                {transferId.length === 4 &&
                  !isLoadingReceive &&
                  !currentTransfer &&
                  !transferError && (
                    <motion.div
                      key="no-transfer-info"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <Separator className="my-6" />
                      <div className="flex items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 p-3 text-center text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                        <Info className="mr-2 h-4 w-4" />
                        Awaiting transfer. Enter the ID to begin.
                      </div>
                    </motion.div>
                  )}
                {/* Display expired message only if a transfer existed but is no longer active */}
                {currentTransfer && !isTransferActive && countdown === 0 && (
                  <motion.div
                    key="transfer-expired"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-6 flex items-center justify-center rounded-md border border-red-400 bg-red-50 p-3 text-center text-sm font-medium text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-300"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    This transfer has expired.
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
