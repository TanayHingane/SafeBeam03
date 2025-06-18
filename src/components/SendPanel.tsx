// components/SendPanel.tsx
"use client";

import React, { useState } from "react";
import { Upload, Send, FileText } from "lucide-react";
import { useTransfer } from "../../contexts/TransferContext";
import { motion } from "framer-motion";
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

export default function SendPanel() {
  const [activeTab, setActiveTab] = useState<"text" | "file">("text");
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const { sendText, sendFile, isLoading } = useTransfer();

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

  // const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

  return (
    <div className="bg-white dark:bg-black rounded-xl shadow-lg p-6 w-full max-w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Send Data
      </h2>

      {/* Tab Selection */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
            activeTab === "text"
              ? "bg-white shadow-sm text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FileText className="w-4 h-4 mr-2" />
          Text
        </button>
        <button
          onClick={() => setActiveTab("file")}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
            activeTab === "file"
              ? "bg-white shadow-sm text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Upload className="w-4 h-4 mr-2" />
          File
        </button>
      </div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "text" ? (
          <div className="space-y-4">
            <div className="w-full max-w-4xl mx-auto min-h-44 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-44 p-3 border border-gray-300 border-dashed rounded-lg resize-none text-lg text-black "
                maxLength={10000}
              />
            </div>
            <button
              onClick={handleSendText}
              disabled={!textContent.trim() || isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
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
              disabled={!selectedFile || isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>

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

        <div className="mt-6 my-2 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Label className="mb-5">Copy to clipboard</Label>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
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
                        className="stroke-emerald-500"
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
                <TooltipContent className="px-2 py-1 text-xs">
                  Copy to clipboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              ref={inputRef}
              id={id}
              className="text-center"
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
