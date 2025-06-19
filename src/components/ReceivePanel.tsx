// components/ReceivePanel.tsx
"use client";

import React, { useState } from "react";
import { Download, FileText, File, Copy } from "lucide-react";
import { useTransfer } from "../../contexts/TransferContext";
import { transferService } from "../lib/transfer-service";
import { motion } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import "ldrs/react/NewtonsCradle.css";
import { NewtonsCradle } from "ldrs/react";
import { useTheme } from "next-themes";

export default function ReceivePanel() {
  const [transferId, setTransferId] = useState("");
  const { receiveTransfer, currentTransfer, isLoadingReceive } = useTransfer();
  const { resolvedTheme } = useTheme(); // "light" | "dark" | undefined
  const [isValid, setIsValid] = useState(false);
  const [expireTimer, setExpireTimer] = useState<NodeJS.Timeout | null>(null);

  const handleReceive = async () => {
    if (transferId.length === 4) {
      await receiveTransfer(transferId);
      setTransferId("");

      setIsValid(true); // Set validity true when receive completes

      if (expireTimer) clearTimeout(expireTimer); // clear existing timer
      const timer = setTimeout(() => setIsValid(false), 10 * 60 * 1000); // 10 minutes
      setExpireTimer(timer);
    }
  };

  const handleDownload = async () => {
    if (currentTransfer?.type === "file" && currentTransfer.fileId) {
      try {
        const fileData = await transferService.downloadFile(
          currentTransfer.fileId
        );
        const blob = new Blob([fileData], { type: currentTransfer.fileType });
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
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="bg-white dark:bg-black mt-5 rounded-xl p-6 w-full max-w-full"
      id="receive-data"
    >
      <div className="my-4 items-center flex flex-col">
        {/* <div className="inline-block text-xs font-medium px-3 py-1 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-blue-300 border border-neutral-300 text-blue-500 rounded-full mb-2">
          Upload File Anonymously
        </div> */}
        <h1 className="text-2xl font-bold dark:text-neutral-50 tracking-tight">
          Receive File
        </h1>
        <p className="text-muted-foreground dark:text-neutral-500 mt-2">
          Enter the 4-digit transfer ID to receive the file
        </p>
      </div>

      <div className="mt-7 mb-5">
        <div className="mb-7 items-center flex justify-center">
          {/* <input
            type="text"
            value={transferId}
            onChange={(e) => setTransferId(e.target.value.slice(0, 4))}
            placeholder="1234"
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={4}
          /> */}
          <InputOTP
            maxLength={4}
            value={transferId}
            onChange={setTransferId}
            className="items-center justify-center bg-white dark:bg-black"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="h-12 w-12" />
              <InputOTPSlot index={1} className="h-12 w-12" />
              <InputOTPSlot index={2} className="h-12 w-12" />
              <InputOTPSlot index={3} className="h-12 w-12" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          onClick={handleReceive}
          disabled={transferId.length !== 4}
          className="w-full bg-black text-white dark:bg-white dark:text-black py-3 px-4 rounded-lg hover:bg-neutral-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoadingReceive ? (
            <NewtonsCradle
              size="45"
              speed="1.75"
              color={resolvedTheme === "dark" ? "black" : "white"}
            />
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Receive
            </>
          )}
        </button>

        {currentTransfer && isValid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50 dark:bg-[#171717] dark:border-neutral-800 border border-blue-100 rounded-lg"
          >
            <div className="flex justify-between">
              <div className="flex items-center mb-3">
                {currentTransfer.type === "text" ? (
                  <FileText className="w-5 h-5 text-blue-500 dark:text-white mr-2" />
                ) : (
                  <File className="w-5 h-5 text-blue-500 dark:text-white mr-2" />
                )}
                <span className="font-medium text-blue-500 dark:text-white">
                  {currentTransfer.type === "text"
                    ? "Text Message"
                    : currentTransfer.fileName}
                </span>
              </div>
              {currentTransfer.type === "text" && (
                <button
                  onClick={() => copyToClipboard(currentTransfer.content || "")}
                  className="text-blue-500 dark:text-white flex justify-center items-center text-sm -mt-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4 mr-2" />
                </button>
              )}
            </div>

            {currentTransfer.type === "text" ? (
              <div className="space-y-3">
                <div className="bg-white dark:bg-black p-3 rounded border max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-lg font-sans text-gray-800 dark:text-white">
                    {currentTransfer.content}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-white">
                  <p>
                    Size:{" "}
                    {((currentTransfer.fileSize || 0) / 1024 / 1024).toFixed(2)}{" "}
                    MB
                  </p>
                  <p>Type: {currentTransfer.fileType}</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full cursor-pointer bg-blue-600 dark:bg-white text-white dark:text-black py-2 px-4 rounded hover:bg-blue-700 dark:hover:none flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </button>
              </div>
            )}

            {currentTransfer && !isValid && (
              <div className="mt-6 text-center text-red-500 font-medium">
                ⌛ This transfer link has expired after 10 minutes.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
