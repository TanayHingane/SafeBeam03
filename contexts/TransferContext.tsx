// contexts/TransferContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { transferService, Transfer } from "../src/lib/transfer-service";
import toast from "react-hot-toast";

interface TransferContextType {
  isLoading: boolean;
  isLoadingReceive: boolean;
  currentTransfer: Transfer | null;
  sendText: (text: string) => Promise<string | null>;
  sendFile: (file: File) => Promise<string | null>;
  receiveTransfer: (id: string) => Promise<Transfer | null>;
  clearTransfer: () => void;
}

const TransferContext = createContext<TransferContextType | undefined>(
  undefined
);

export function TransferProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReceive, setIsLoadingReceive] = useState(false);
  const [currentTransfer, setCurrentTransfer] = useState<Transfer | null>(null);

  const sendText = useCallback(async (text: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const transferId = await transferService.createTextTransfer(text);
      toast.success(`Transfer created! ID: ${transferId}`);
      return transferId;
    } catch (error) {
      console.error("Error creating transfer:", error);
      toast.error("Failed to create transfer");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendFile = useCallback(async (file: File): Promise<string | null> => {
    setIsLoading(true);
    try {
      const transferId = await transferService.createFileTransfer(file);
      toast.success(`File transfer created! ID: ${transferId}`);
      return transferId;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const receiveTransfer = useCallback(
    async (id: string): Promise<Transfer | null> => {
      setIsLoadingReceive(true);
      try {
        const transfer = await transferService.getTransfer(id);
        if (transfer) {
          setCurrentTransfer(transfer);
          await transferService.markAsCompleted(id);
          return transfer;
        } else {
          toast.error("Transfer not found or expired");
          return null;
        }
      } catch (error) {
        console.error("Error retrieving transfer:", error);
        toast.error("Failed to retrieve transfer");
        return null;
      } finally {
        setIsLoadingReceive(false);
      }
    },
    []
  );

  const clearTransfer = useCallback(() => {
    setCurrentTransfer(null);
  }, []);

  return (
    <TransferContext.Provider
      value={{
        isLoading,
        isLoadingReceive,
        currentTransfer,
        sendText,
        sendFile,
        receiveTransfer,
        clearTransfer,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}

export function useTransfer() {
  const context = useContext(TransferContext);
  if (context === undefined) {
    throw new Error("useTransfer must be used within a TransferProvider");
  }
  return context;
}
