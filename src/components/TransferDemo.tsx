"use client";
import { useState } from "react";
import {
  Upload,
  ArrowRight,
  FileText,
  Image,
  Video,
  File,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fileTypes = [
  { icon: FileText, label: "Docs", color: "text-blue-400" },
  { icon: Image, label: "Images", color: "text-green-400" },
  { icon: Video, label: "Videos", color: "text-purple-400" },
  { icon: File, label: "Any File", color: "text-orange-400" },
];

const TransferDemo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate file drop
    setFiles(["example-file.pdf"]);
  };

  const simulateUpload = () => {
    setFiles(["vacation-photos.zip"]);
  };

  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Transfer Area */}
          <div className="order-2 lg:order-1">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative rounded-3xl border-2 border-dashed  p-12 text-center transition-all duration-300
                ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border hover:border-primary/50 bg-card/30"
                }
              `}
            >
              {files.length === 0 ? (
                <>
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-float">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Drop files here
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    or click to browse from your device
                  </p>
                  <Button variant="outline" onClick={simulateUpload}>
                    Select Files
                  </Button>

                  {/* File type icons */}
                  <div className="flex justify-center gap-4 mt-8 pt-8 border-t border-neutral-300 dark:border-neutral-800">
                    {fileTypes.map((type) => (
                      <div key={type.label} className="text-center">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-1">
                          <type.icon className={`w-5 h-5 ${type.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {type.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">File Ready!</h3>
                  <p className="text-muted-foreground mb-6">{files[0]}</p>
                  <Button variant="secondary" size="lg">
                    Generate OTP Code
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 animate-fade-in-up">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Send Files in <span className="gradient-text">Seconds</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Drag and drop any file, get a secure 4-digit code, share it with
              anyone. It&apos;s that simple. No uploads to servers, no waiting,
              no limits.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Drop your file</h4>
                  <p className="text-muted-foreground text-sm">
                    Drag any file into the upload zone
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Get your OTP</h4>
                  <p className="text-muted-foreground text-sm">
                    A unique 4-digit code is generated instantly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Share securely</h4>
                  <p className="text-muted-foreground text-sm">
                    Recipient enters the code to receive your file
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferDemo;
