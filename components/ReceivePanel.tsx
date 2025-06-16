// components/ReceivePanel.tsx
"use client";

import React, { useState } from "react";
import { Download, FileText, File } from "lucide-react";
import { useTransfer } from "../contexts/TransferContext";
import { transferService } from "../lib/transfer-service";
import { motion } from "framer-motion";

export default function ReceivePanel() {
  const [transferId, setTransferId] = useState("");
  const { receiveTransfer, currentTransfer, isLoading, clearTransfer } =
    useTransfer();

  const handleReceive = async () => {
    if (transferId.length === 4) {
      await receiveTransfer(transferId);
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
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Receive Data
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter 4-digit Transfer ID
          </label>
          <input
            type="text"
            value={transferId}
            onChange={(e) => setTransferId(e.target.value.slice(0, 4))}
            placeholder="1234"
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={4}
          />
        </div>

        <button
          onClick={handleReceive}
          disabled={transferId.length !== 4 || isLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Receive
            </>
          )}
        </button>

        {currentTransfer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center mb-3">
              {currentTransfer.type === "text" ? (
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
              ) : (
                <File className="w-5 h-5 text-blue-600 mr-2" />
              )}
              <span className="font-medium text-blue-800">
                {currentTransfer.type === "text"
                  ? "Text Message"
                  : currentTransfer.fileName}
              </span>
            </div>

            {currentTransfer.type === "text" ? (
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">
                    {currentTransfer.content}
                  </pre>
                </div>
                <button
                  onClick={() => copyToClipboard(currentTransfer.content || "")}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
                >
                  Copy to Clipboard
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p>
                    Size:{" "}
                    {((currentTransfer.fileSize || 0) / 1024 / 1024).toFixed(2)}{" "}
                    MB
                  </p>
                  <p>Type: {currentTransfer.fileType}</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </button>
              </div>
            )}

            <button
              onClick={clearTransfer}
              className="w-full mt-3 text-gray-600 hover:text-gray-800 text-sm"
            >
              Clear
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
