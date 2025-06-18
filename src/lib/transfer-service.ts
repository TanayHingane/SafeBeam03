// lib/transfer-service.ts
import {
  databases,
  storage,
  DATABASE_ID,
  COLLECTION_ID,
  BUCKET_ID,
} from "./appwrite";
import { ID, Query, Models } from "appwrite";

export interface Transfer {
  $id: string;
  transferId: string;
  type: "text" | "file";
  content?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  fileId?: string;
  status: "pending" | "completed" | "expired";
  expiresAt: string;
}

export class TransferService {
  private generateTransferId(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async createTextTransfer(content: string): Promise<string> {
    const transferId = this.generateTransferId();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      transferId,
      type: "text",
      content,
      status: "pending",
      expiresAt: expiresAt.toISOString(),
    });

    return transferId;
  }

  async createFileTransfer(file: File): Promise<string> {
    const transferId = this.generateTransferId();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const fileUpload = await storage.createFile(BUCKET_ID, ID.unique(), file);

    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      transferId,
      type: "file",
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileId: fileUpload.$id,
      status: "pending",
      expiresAt: expiresAt.toISOString(),
    });

    return transferId;
  }

  async getTransfer(transferId: string): Promise<Transfer | null> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("transferId", transferId)]
      );

      if (response.documents.length === 0) {
        return null;
      }

      const doc = response.documents[0];
      const transfer = this.mapDocumentToTransfer(doc);

      if (new Date(transfer.expiresAt) < new Date()) {
        await this.deleteTransfer(transfer.$id);
        return null;
      }

      return transfer;
    } catch (error) {
      console.error("Error fetching transfer:", error);
      return null;
    }
  }

  async markAsCompleted(transferId: string): Promise<void> {
    const transfer = await this.getTransfer(transferId);
    if (transfer) {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, transfer.$id, {
        status: "completed",
      });
    }
  }

  async deleteTransfer(documentId: string): Promise<void> {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
  }

  async downloadFile(fileId: string): Promise<ArrayBuffer> {
    const downloadUrl = storage.getFileDownload(BUCKET_ID, fileId);
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error("File download failed");
    }

    const buffer = await response.arrayBuffer();
    return buffer;
  }

  getFilePreview(
    fileId: string,
    width: number = 400,
    height: number = 400
  ): string {
    return storage.getFilePreview(BUCKET_ID, fileId, width, height).toString();
  }

  private mapDocumentToTransfer(doc: Models.Document): Transfer {
    return {
      $id: doc.$id,
      transferId: doc.transferId,
      type: doc.type,
      content: doc.content,
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      fileType: doc.fileType,
      fileId: doc.fileId,
      status: doc.status,
      expiresAt: doc.expiresAt,
    };
  }
}

export const transferService = new TransferService();
