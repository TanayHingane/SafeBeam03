// lib/cleanup-service.ts
import {
  databases,
  storage,
  DATABASE_ID,
  COLLECTION_ID,
  BUCKET_ID,
} from "./appwrite";
import { Query } from "appwrite";

export class CleanupService {
  async cleanupExpiredTransfers() {
    try {
      const expiredTransfers = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.lessThan("expiresAt", new Date().toISOString())]
      );

      for (const transfer of expiredTransfers.documents) {
        // Delete associated file if exists
        if (transfer.fileId) {
          try {
            await storage.deleteFile(BUCKET_ID, transfer.fileId);
          } catch (error) {
            console.error(`Failed to delete file ${transfer.fileId}:`, error);
          }
        }

        // Delete database record
        await databases.deleteDocument(
          DATABASE_ID,
          COLLECTION_ID,
          transfer.$id
        );
      }

      console.log(
        `Cleaned up ${expiredTransfers.documents.length} expired transfers`
      );
    } catch (error) {
      console.error("Cleanup failed:", error);
    }
  }
}

export const cleanupService = new CleanupService();
