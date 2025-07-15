const AIModelService = require("./AIModelService");
const pinecone = require("../config/pinecone");

class CognitionService {
  static async getRecentCognitionSummary(userId) {
    // In a real app, query Pinecone for the most recent memories.
    const pineconeIndex = pinecone.Index("aria-context-index");
    try {
      const queryResponse = await pineconeIndex.query({
        topK: 1,
        filter: { userId: { $eq: userId } },
      });
      const lastMemory =
        queryResponse.matches.length > 0
          ? queryResponse.matches[0].metadata.text
          : "No memories yet.";
      return { lastJournalEntry: lastMemory };
    } catch (e) {
      // Handle case where index might be empty or user has no vectors
      return { lastJournalEntry: "Could not retrieve last memory." };
    }
  }
}
module.exports = CognitionService;
