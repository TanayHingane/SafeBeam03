// app/page.tsx
"use client";

import { Toaster } from "react-hot-toast";
import { TransferProvider } from "../../contexts/TransferContext";
import SendPanel from "../../components/SendPanel";
import ReceivePanel from "../../components/ReceivePanel";
import {
  Rocket,
  Shield,
  Zap,
  Trash2,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <TransferProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Toaster position="top-right" />

        {/* Header */}
        <header className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">iDrop</h1>
            <div className="flex ml-3">
              <Shield className="w-6 h-6 text-red-500" />
              <span className="w-6 h-6 text-yellow-500">🔒</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Quick & Secure Data Sharing!
          </p>
          <p className="text-gray-500">
            Fast, secure, and account-free way to send and receive text or files
            using unique 4-digit IDs!
          </p>
        </header>

        {/* Features */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Data Transfer</h3>
                <p className="text-sm text-gray-600">
                  Send and receive text/files securely
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl mt-1">📁</span>
              <div>
                <h3 className="font-semibold text-gray-800">File Support</h3>
                <p className="text-sm text-gray-600">
                  Upload, preview, and download with ease
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Real-time Updates
                </h3>
                <p className="text-sm text-gray-600">
                  Instant transfers with notifications
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Trash2 className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Auto Cleanup</h3>
                <p className="text-sm text-gray-600">
                  Data auto-deletes after 10 minutes for privacy
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Modern UI</h3>
                <p className="text-sm text-gray-600">
                  Smooth animations & clean interface
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Smartphone className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Cross-Platform</h3>
                <p className="text-sm text-gray-600">
                  Works seamlessly on any device
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SendPanel />
            <ReceivePanel />
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500">
          <p>
            iDrop is the perfect temporary bridge for quick, private, and
            hassle-free data sharing.
          </p>
          <p className="text-sm mt-2">
            Try it out and let me know what you think!
          </p>
        </footer>
      </div>
    </TransferProvider>
  );
}
