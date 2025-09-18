"use client";

import {
  AlertCircleIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  // FileUpIcon,
  FolderLock,
  HeadphonesIcon,
  ImageIcon,
  Trash2,
  VideoIcon,
} from "lucide-react";

import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

const getFileIcon = (file: {
  file: File | { type?: string; name?: string };
}) => {
  const fileType = typeof file.file?.type === "string" ? file.file.type : "";
  const fileName = typeof file.file?.name === "string" ? file.file.name : "";

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileTextIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <FileArchiveIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <FileSpreadsheetIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("video/")) {
    return <VideoIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("audio/")) {
    return <HeadphonesIcon className="size-4 opacity-60" />;
  } else if (fileType.startsWith("image/")) {
    return <ImageIcon className="size-4 opacity-60" />;
  }

  return <FileIcon className="size-4 opacity-60" />;
};

interface FileUploadProps {
  onChange?: (files: File[]) => void;
}

export const truncateString = (str: string, num: number): string => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export function FileUpload({ onChange }: FileUploadProps) {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const maxFiles = 1;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    onFilesChange: (files) => {
      if (onChange) onChange(files.map((f) => f.file as File));
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 flex min-h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-colors"
      >
        <input
          {...getInputProps()}
          className="sr-only cursor-pointer"
          aria-label="Upload files"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="bg-background mb-2 flex size-11 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <FolderLock className="size-4 text-blue-500" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Upload files</p>
          <p className="text-muted-foreground mb-2 text-xs">
            Drag & drop or click to browse
          </p>
          <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
            <span>Max {maxFiles} files</span>
            <span>∙</span>
            <span>Up to {formatBytes(maxSize)}</span>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-sm"
          role="alert"
        >
          <AlertCircleIcon className="size-3" />
          <span>{errors[0]}</span>
        </div>
      )}

      {files.length == 0 ? null : (
        <div className="space-y-2 my-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-background flex items-center shadow-xs justify-between gap-2 rounded-lg  p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 dark:text-white">
                  {getFileIcon(file)}
                </div>
                <div className="flex min-w-0 justify-between items-center gap-16">
                  <p className="truncate text-[13px] font-medium">
                    {file.file.name.trim().length > 0
                      ? truncateString(file.file.name, 7)
                      : "Unnamed file"}
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 size-8 cursor-pointer bg-neutral-100 dark:bg-neutral-800 dark:text-white rounded-full"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}

          {/* {files.length >= 1 && (
            <div>
              <Button size="sm" variant="outline" onClick={clearFiles}>
                Remove all files
              </Button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
