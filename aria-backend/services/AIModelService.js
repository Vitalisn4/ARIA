const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ensure the API key is configured
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not configured");
}
// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIModelService {
  /**
   * Generates an insight using the Gemini Pro model.
   * @param {string} prompt - The prompt to send to the AI.
   * @returns {Promise<string>} The AI-generated text content.
   */
  static async generateInsight(prompt) {
    try {
      // Select the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error("Error calling Google Gemini API:", error);
      throw new Error("Failed to generate insight from AI model.");
    }
  }

  /**
   * Creates an embedding vector using Google's embedding model.
   * @param {string} text - The text to embed.
   * @returns {Promise<Array<number>>} The embedding vector.
   */
  static async createEmbedding(text) {
    try {
      // Select the embedding model
      const model = genAI.getGenerativeModel({ model: "embedding-001" });

      const result = await model.embedContent(text);
      const embedding = result.embedding;

      return embedding.values;
    } catch (error) {
      console.error("Error calling Google Embedding API:", error);
      throw new Error("Failed to create embedding.");
    }
  }
}

module.exports = AIModelService;
