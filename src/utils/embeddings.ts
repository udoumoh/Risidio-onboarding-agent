/**
 * Embeddings client for generating vector embeddings using OpenAI
 */

import axios from 'axios';

export interface EmbeddingResponse {
  embedding: number[];
  tokenCount: number;
}

class EmbeddingsClient {
  private apiKey: string;
  private model: string = 'text-embedding-3-small'; // More cost-effective

  constructor() {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      throw new Error('OPENAI_API_KEY is required for embeddings');
    }
    this.apiKey = key;
  }

  /**
   * Generate embedding for a single text
   */
  async generateEmbedding(text: string): Promise<EmbeddingResponse> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/embeddings',
        {
          model: this.model,
          input: text,
          encoding_format: 'float'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data.data[0];
      return {
        embedding: data.embedding,
        tokenCount: response.data.usage.total_tokens
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Embeddings API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  /**
   * Generate embeddings for multiple texts in batch
   */
  async generateEmbeddings(texts: string[]): Promise<EmbeddingResponse[]> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/embeddings',
        {
          model: this.model,
          input: texts,
          encoding_format: 'float'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data.map((item: any) => ({
        embedding: item.embedding,
        tokenCount: response.data.usage.total_tokens / texts.length // Approximate per-text
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Embeddings API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}

// Singleton instance
let embeddingsClientInstance: EmbeddingsClient | null = null;

export function getEmbeddingsClient(): EmbeddingsClient {
  if (!embeddingsClientInstance) {
    embeddingsClientInstance = new EmbeddingsClient();
  }
  return embeddingsClientInstance;
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    const aVal = a[i];
    const bVal = b[i];
    if (aVal !== undefined && bVal !== undefined) {
      dotProduct += aVal * bVal;
      normA += aVal * aVal;
      normB += bVal * bVal;
    }
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  if (magnitude === 0) return 0;

  return dotProduct / magnitude;
}
