/**
 * Simple file-based vector store for semantic search
 * Stores document chunks with their embeddings and metadata
 */

import fs from 'fs';
import path from 'path';
import { getEmbeddingsClient, cosineSimilarity } from './embeddings';

export interface DocumentChunk {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    source: string; // e.g., "notion:product-roadmap" or "slack:onboarding-channel"
    category?: string;
    timestamp?: string;
    [key: string]: any;
  };
}

export interface SearchResult {
  chunk: DocumentChunk;
  similarity: number;
}

class VectorStore {
  private storePath: string;
  private chunks: DocumentChunk[] = [];
  private isLoaded: boolean = false;

  constructor(storePath?: string) {
    // Default to data directory
    this.storePath = storePath || path.join(process.cwd(), 'data', 'vector-store.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory(): void {
    const dir = path.dirname(this.storePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Load vector store from disk
   */
  async load(): Promise<void> {
    if (this.isLoaded) return;

    try {
      if (fs.existsSync(this.storePath)) {
        const data = fs.readFileSync(this.storePath, 'utf-8');
        this.chunks = JSON.parse(data);
        console.log(`✅ Loaded ${this.chunks.length} document chunks from vector store`);
      } else {
        console.log('📝 No existing vector store found. Starting fresh.');
        this.chunks = [];
      }
      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading vector store:', error);
      this.chunks = [];
      this.isLoaded = true;
    }
  }

  /**
   * Save vector store to disk
   */
  async save(): Promise<void> {
    try {
      fs.writeFileSync(this.storePath, JSON.stringify(this.chunks, null, 2), 'utf-8');
      console.log(`✅ Saved ${this.chunks.length} document chunks to vector store`);
    } catch (error) {
      console.error('Error saving vector store:', error);
      throw error;
    }
  }

  /**
   * Add a single document chunk to the store
   */
  async addChunk(chunk: DocumentChunk): Promise<void> {
    await this.load();

    // Remove existing chunk with same ID if it exists
    this.chunks = this.chunks.filter(c => c.id !== chunk.id);

    // Add new chunk
    this.chunks.push(chunk);
  }

  /**
   * Add multiple document chunks to the store
   */
  async addChunks(chunks: DocumentChunk[]): Promise<void> {
    await this.load();

    for (const chunk of chunks) {
      // Remove existing chunk with same ID if it exists
      this.chunks = this.chunks.filter(c => c.id !== chunk.id);
      this.chunks.push(chunk);
    }
  }

  /**
   * Search for similar documents using semantic search
   */
  async search(query: string, topK: number = 5, minSimilarity: number = 0.5): Promise<SearchResult[]> {
    await this.load();

    if (this.chunks.length === 0) {
      console.log('⚠️ Vector store is empty. No documents to search.');
      return [];
    }

    // Generate embedding for the query
    const embeddingsClient = getEmbeddingsClient();
    const { embedding: queryEmbedding } = await embeddingsClient.generateEmbedding(query);

    // Calculate similarity scores
    const results: SearchResult[] = this.chunks.map(chunk => ({
      chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
    }));

    // Filter by minimum similarity and sort by score
    return results
      .filter(result => result.similarity >= minSimilarity)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }

  /**
   * Get all chunks from a specific source
   */
  async getChunksBySource(source: string): Promise<DocumentChunk[]> {
    await this.load();
    return this.chunks.filter(chunk => chunk.metadata.source === source);
  }

  /**
   * Delete chunks by source
   */
  async deleteBySource(source: string): Promise<number> {
    await this.load();
    const originalLength = this.chunks.length;
    this.chunks = this.chunks.filter(chunk => chunk.metadata.source !== source);
    const deletedCount = originalLength - this.chunks.length;
    await this.save();
    return deletedCount;
  }

  /**
   * Clear all chunks from the store
   */
  async clear(): Promise<void> {
    this.chunks = [];
    await this.save();
    console.log('✅ Cleared vector store');
  }

  /**
   * Get statistics about the vector store
   */
  async getStats(): Promise<{
    totalChunks: number;
    sources: string[];
    avgChunkLength: number;
  }> {
    await this.load();

    const sources = [...new Set(this.chunks.map(c => c.metadata.source))];
    const avgChunkLength = this.chunks.length > 0
      ? Math.round(this.chunks.reduce((sum, c) => sum + c.content.length, 0) / this.chunks.length)
      : 0;

    return {
      totalChunks: this.chunks.length,
      sources,
      avgChunkLength
    };
  }
}

// Singleton instance
let vectorStoreInstance: VectorStore | null = null;

export function getVectorStore(): VectorStore {
  if (!vectorStoreInstance) {
    vectorStoreInstance = new VectorStore();
  }
  return vectorStoreInstance;
}

export { VectorStore };
