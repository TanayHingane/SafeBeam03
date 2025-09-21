// components/UploadSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

// CONTEXT
import { useTransfer } from "../../contexts/TransferContext"; // Adjust the import path as needed

// SHADCN/UI COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileUpload } from "./ui/file-upload"; // Your custom file upload component

// ICONS
import {
  AlertTriangle,
  Check,
  Copy,
  FileText,
  FileUp,
  Loader2,
  Send,
  Upload,
} from "lucide-react";

/**
 * Custom hook for a countdown timer.
 * @param seconds - The total number of seconds to count down from.
 * @param active - A boolean to start or stop the timer.
 * @returns The remaining time in seconds.
 */
function useCountdown(seconds: number, active: boolean) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!active) {
      setTimeLeft(seconds);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, seconds]);

  return timeLeft;
}

/**
 * A modern, responsive section for uploading files or text content securely.
 */
export default function UploadSection() {
  const [activeTab, setActiveTab] = useState<"file" | "text">("file");
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [stopwatchActive, setStopwatchActive] = useState(false);

  const { sendText, sendFile, isLoading } = useTransfer();
  // const { resolvedTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const countdown = useCountdown(599, stopwatchActive); // 10 minutes

  // Handler to copy the generated ID to the clipboard
  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handler to send text content
  const handleSendText = async () => {
    if (!textContent.trim()) return;
    const id = await sendText(textContent);
    if (id) {
      setGeneratedId(id);
      setTextContent("");
      setStopwatchActive(true);
    }
  };

  // Handler to send a file
  const handleSendFile = async () => {
    if (!selectedFile) return;
    const id = await sendFile(selectedFile);
    if (id) {
      setGeneratedId(id);
      setSelectedFile(null);
      setStopwatchActive(true);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="container mx-auto grid pt-24 md:pt-0 md:min-h-screen items-center gap-12 px-4 md:grid-cols-2 lg:gap-20">
      {/* Left Column: Branding & Information */}
      <div className="flex-col items-center hidden text-center md:items-center md:flex">
        <Image
          src="/transfer_img.png"
          alt="Secure File Transfer Illustration"
          width={400}
          height={400}
          className="mb-6 h-auto w-full max-w-[250px] md:max-w-xs"
          priority
        />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Share Data.
          <br />
          Instantly & Securely.
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          Upload a file or paste text to generate a secure, temporary sharing
          ID. Your data is private and automatically deleted after 10 minutes.
        </p>
      </div>

      {/* Tagline for mobile view */}
      <div className="items-center flex-col -mb-5 block md:hidden text-center">
        <div className="inline-block text-xs font-medium px-3 py-1 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-blue-300 border border-neutral-300 text-blue-500 rounded-full mb-2">
          <FileUp className="inline mr-2 h-3 w-3" />
          Instant Uploads
        </div>
        <h1 className="text-lg md:text-2xl font-bold dark:text-neutral-50 tracking-tight">
          Share Files & Text Securely
        </h1>
      </div>

      {/* Right Column: Uploader */}
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {generatedId ? (
            // Success State Card
            <motion.div
              key="success-card"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card className="w-full overflow-hidden border-green-500/50 dark:border-green-500/40">
                <CardHeader className="bg-green-50/50 dark:bg-green-900/10">
                  <CardTitle className="flex items-center text-green-600 dark:text-green-400 text-lg md:text-xl lg:text-2xl">
                    <Check className="mr-2 h-5 w-5" />
                    Upload Successful!
                  </CardTitle>
                  <CardDescription className="text-xs md:text-base">
                    Share this ID with the recipient. It will expire shortly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div>
                    <Label
                      htmlFor="generated-id"
                      className="text-sm font-medium"
                    >
                      Your Secure Transfer ID
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Input
                        id="generated-id"
                        ref={inputRef}
                        type="text"
                        value={generatedId}
                        readOnly
                        className="flex-grow font-mono text-lg"
                        aria-label="Generated Transfer ID"
                      />
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={handleCopy}
                              aria-label={
                                copied ? "Copied" : "Copy to clipboard"
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
                            <p>{copied ? "Copied!" : "Copy ID"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  {stopwatchActive && countdown > 0 && (
                    <div className="flex items-center justify-center rounded-md border border-amber-500/30 bg-amber-50/50 p-3 text-center text-sm font-medium text-amber-700 dark:border-amber-500/20 dark:bg-amber-900/10 dark:text-amber-400">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>
                        Expires in{" "}
                        <span className="font-mono tabular-nums">
                          {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                          {String(countdown % 60).padStart(2, "0")}
                        </span>
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            // Uploader Card
            <motion.div key="uploader-card" variants={cardVariants}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg lg:text-xl">
                    Create a Secure Transfer
                  </CardTitle>
                  <CardDescription>
                    Select a method to upload your data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as "file" | "text")}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="file">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </TabsTrigger>
                      <TabsTrigger value="text">
                        <FileText className="mr-2 h-4 w-4" />
                        Paste Text
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="file" className="mt-6 space-y-4">
                      <FileUpload
                        onChange={(files) => setSelectedFile(files[0] || null)}
                      />
                      <Button
                        onClick={handleSendFile}
                        disabled={!selectedFile || isLoading}
                        className="w-full mt-2"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        Upload and Get ID
                      </Button>
                    </TabsContent>
                    <TabsContent value="text" className="mt-6 space-y-4">
                      <Textarea
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        placeholder="Paste your text here. Max 10MB."
                        className="h-40 resize-none"
                        maxLength={10000000}
                        aria-label="Text content to upload"
                      />
                      <Button
                        onClick={handleSendText}
                        disabled={!textContent.trim() || isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        Upload and Get ID
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
