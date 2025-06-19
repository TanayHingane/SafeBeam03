const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const database = new sdk.Databases(client);

  const databaseId = "your_database_id";
  const collectionId = "your_collection_id";

  const now = new Date().toISOString();

  try {
    const documents = await database.listDocuments(databaseId, collectionId, [
      sdk.Query.lessThan("expiresAt", now),
    ]);

    for (const doc of documents.documents) {
      await database.deleteDocument(databaseId, collectionId, doc.$id);
    }

    res.json({ deleted: documents.documents.length });
  } catch (error) {
    console.error("Failed to delete expired docs:", error);
    res.json({ error: error.message });
  }
};
