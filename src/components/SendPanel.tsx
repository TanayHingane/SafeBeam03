// components/SendPanel.tsx
"use client";

import React, { useState } from "react";
import { Upload, Send, FileText } from "lucide-react";
import { useTransfer } from "../../contexts/TransferContext";
import { FileUpload } from "./ui/file-upload";
import { useId, useRef } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import "ldrs/react/NewtonsCradle.css";
import { NewtonsCradle } from "ldrs/react";
import { useTheme } from "next-themes";

export default function SendPanel() {
  const [activeTab, setActiveTab] = useState<"text" | "file">("file");
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const { sendText, sendFile, isLoading } = useTransfer();
  const { resolvedTheme } = useTheme(); // "light" | "dark" | undefined

  const id = useId();
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleSendText = async () => {
    if (!textContent.trim()) return;
    const id = await sendText(textContent);
    if (id) {
      setGeneratedId(id);
      setTextContent("");
    }
  };

  const handleSendFile = async () => {
    if (!selectedFile) return;
    const id = await sendFile(selectedFile);
    if (id) {
      setGeneratedId(id);
      setSelectedFile(null);
    }
  };

  return (
    <div
      className="bg-white dark:bg-black rounded-xl mx-auto p-6 w-full "
      id="send-data"
    >
      <div className="my-4 items-center flex flex-col">
        <div className="inline-block text-xs font-medium px-3 py-1 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-blue-300 border border-neutral-300 text-blue-500 rounded-full mb-2">
          Upload Anonymously
        </div>
        <h1 className="text-2xl font-bold dark:text-neutral-50 tracking-tight">
          Share your data securely
        </h1>
      </div>

      {/* Tab Selection */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "file" | "text")}
        className="w-full items-center flex justify-center my-7"
      >
        <TabsList className="items-center flex justify-center">
          <TabsTrigger value="file" className="w-[200px] cursor-pointer">
            <Upload className="h-4 w-4" />
            File
          </TabsTrigger>
          <TabsTrigger value="text" className="w-[200px] cursor-pointer">
            <FileText className="h-4 w-4" />
            Text
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content Area */}
      <div key={activeTab}>
        {activeTab === "text" ? (
          <div className="space-y-4">
            <div className="w-full max-w-4xl mx-auto min-h-44 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-44 p-5 border border-neutral-200 dark:border-neutral-800 border-dashed rounded-lg resize-none text-base text-black dark:text-white placeholder:text-muted-foreground"
                maxLength={10000000}
              />
            </div>
            <button
              onClick={handleSendText}
              disabled={!textContent.trim() || !!generatedId}
              className="cursor-pointer w-full bg-black text-white dark:bg-white dark:text-black py-3 px-4 rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                // <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <NewtonsCradle
                  size="45"
                  speed="1.75"
                  color={resolvedTheme === "dark" ? "black" : "white"}
                />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Text
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-full max-w-4xl mx-auto min-h-44 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload
                onChange={(files) => setSelectedFile(files[0] || null)}
              />
            </div>

            <button
              onClick={handleSendFile}
              disabled={!selectedFile || !!generatedId}
              className="cursor-pointer w-full bg-black text-white dark:bg-white dark:text-black py-3 px-4 rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                // <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <NewtonsCradle
                  size="45"
                  speed="1.75"
                  color={resolvedTheme === "dark" ? "black" : "white"}
                />
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Generated ID Display */}
      {generatedId && (
        // <motion.div
        //   initial={{ opacity: 0, scale: 0.9 }}
        //   animate={{ opacity: 1, scale: 1 }}
        //   className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        // >
        //   <p className="text-sm text-green-700 mb-2">Transfer ID generated:</p>
        //   <div className="bg-white p-3 rounded border text-center">
        //     <span className="text-2xl font-mono font-bold text-green-800">
        //       {generatedId}
        //     </span>
        //   </div>
        //   <p className="text-xs text-green-600 mt-2">
        //     Share this ID to allow others to receive your data
        //   </p>
        // </motion.div>

        <div className="mt-10 my-2 flex flex-col gap-2 rounded-lg bg-emerald-50  border dark:bg-[#171717]">
          <div className="flex justify-between items-center p-3 mt-2 px-5">
            <Label className="items-center justify-center text-base text-emerald-500 dark:text-neutral-100">
              Copy to clipboard
            </Label>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="text-emerald-400/80 dark:text-neutral-100 hover:text-emerald-400 dark:hover:text-neutral-50 focus-visible:border-ring focus-visible:ring-ring/50 inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                    aria-label={copied ? "Copied" : "Copy to clipboard"}
                    disabled={copied}
                  >
                    <div
                      className={cn(
                        "transition-all",
                        copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      )}
                    >
                      <CheckIcon
                        className="stroke-green-500"
                        size={16}
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute transition-all",
                        copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                      )}
                    >
                      <CopyIcon size={16} aria-hidden="true" />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="px-2 py-2 text-xs">
                  Copy to clipboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex bg-white dark:bg-black p-5 rounded-b-lg border-t">
            <Input
              ref={inputRef}
              id={id}
              className="text-center text-emerald-500 bg-emerald-50 dark:bg-[#171717] dark:text-neutral-100 h-14"
              type="text"
              defaultValue={generatedId}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
}
