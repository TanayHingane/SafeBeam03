// components/SendPanel.tsx
"use client";

import React, { useState } from "react";
import { Upload, Send, FileText } from "lucide-react";
import { useTransfer } from "../contexts/TransferContext";
import { motion } from "framer-motion";

export default function SendPanel() {
  const [activeTab, setActiveTab] = useState<"text" | "file">("text");
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const { sendText, sendFile, isLoading } = useTransfer();

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
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
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={10000}
            />
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-600">Click to select file</span>
              </label>
            </div>

            {selectedFile && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-sm text-green-700 mb-2">Transfer ID generated:</p>
          <div className="bg-white p-3 rounded border text-center">
            <span className="text-2xl font-mono font-bold text-green-800">
              {generatedId}
            </span>
          </div>
          <p className="text-xs text-green-600 mt-2">
            Share this ID to allow others to receive your data
          </p>
        </motion.div>
      )}
    </div>
  );
}
