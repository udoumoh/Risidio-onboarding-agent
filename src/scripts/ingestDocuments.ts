/**
 * Document ingestion script for populating the vector store
 * Processes text documents and generates embeddings for semantic search
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { getVectorStore, DocumentChunk } from '../utils/vectorStore';
import { getEmbeddingsClient } from '../utils/embeddings';

/**
 * Split text into smaller chunks for better semantic search
 * Uses a simple character-based chunking with overlap
 */
function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): string[] {
  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + chunkSize, text.length);
    const chunk = text.slice(startIndex, endIndex);
    chunks.push(chunk.trim());

    // Move forward with overlap
    startIndex += chunkSize - overlap;

    // Break if we're at the end
    if (endIndex === text.length) break;
  }

  return chunks;
}

/**
 * Ingest a single document into the vector store
 */
export async function ingestDocument(
  content: string,
  metadata: {
    source: string;
    category?: string;
    [key: string]: any;
  },
  options: {
    chunkSize?: number;
    overlap?: number;
  } = {}
): Promise<number> {
  const vectorStore = getVectorStore();
  const embeddingsClient = getEmbeddingsClient();

  // Split document into chunks
  const chunks = chunkText(
    content,
    options.chunkSize || 1000,
    options.overlap || 200
  );

  console.log(`📄 Processing document: ${metadata.source}`);
  console.log(`   Split into ${chunks.length} chunks`);

  // Generate embeddings for all chunks
  console.log('🔄 Generating embeddings...');
  const embeddings = await embeddingsClient.generateEmbeddings(chunks);

  // Create document chunks with embeddings
  const documentChunks: DocumentChunk[] = chunks.map((chunk, index) => {
    const embeddingData = embeddings[index];
    if (!embeddingData) {
      throw new Error(`Missing embedding for chunk ${index}`);
    }
    return {
      id: `${metadata.source}-chunk-${index}`,
      content: chunk,
      embedding: embeddingData.embedding,
      metadata: {
        ...metadata,
        chunkIndex: index,
        totalChunks: chunks.length,
        timestamp: new Date().toISOString()
      }
    };
  });

  // Add to vector store
  await vectorStore.addChunks(documentChunks);
  await vectorStore.save();

  console.log(`✅ Ingested ${chunks.length} chunks from ${metadata.source}\n`);
  return chunks.length;
}

/**
 * Ingest all documents from a knowledge base file
 */
export async function ingestFromKnowledgeBase(filePath: string): Promise<void> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Knowledge base file not found: ${filePath}`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const documents = data.documents || [];

  if (!Array.isArray(documents)) {
    throw new Error('Invalid knowledge base format. Expected { documents: [...] }');
  }

  console.log(`\n🚀 Starting ingestion of ${documents.length} documents...\n`);

  let totalChunks = 0;
  for (const doc of documents) {
    if (!doc.content || !doc.source) {
      console.log(`⚠️ Skipping invalid document: ${JSON.stringify(doc)}`);
      continue;
    }

    try {
      const chunkCount = await ingestDocument(doc.content, {
        source: doc.source,
        category: doc.category || 'general',
        title: doc.title,
        ...doc.metadata
      });
      totalChunks += chunkCount;
    } catch (error) {
      console.error(`❌ Error ingesting ${doc.source}:`, error);
    }
  }

  console.log(`\n✅ Ingestion complete! Total chunks: ${totalChunks}\n`);

  // Show stats
  const vectorStore = getVectorStore();
  const stats = await vectorStore.getStats();
  console.log('📊 Vector Store Stats:');
  console.log(`   Total chunks: ${stats.totalChunks}`);
  console.log(`   Sources: ${stats.sources.join(', ')}`);
  console.log(`   Average chunk length: ${stats.avgChunkLength} characters\n`);
}

/**
 * CLI interface for ingestion
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📚 Document Ingestion Tool

Usage:
  npm run ingest <knowledge-base-file>

Example:
  npm run ingest knowledge-base.json

Options:
  --clear    Clear the vector store before ingesting
  --stats    Show vector store statistics
    `);
    process.exit(0);
  }

  const vectorStore = getVectorStore();

  // Handle flags
  if (args.includes('--clear')) {
    console.log('🗑️ Clearing vector store...');
    await vectorStore.clear();
    return;
  }

  if (args.includes('--stats')) {
    const stats = await vectorStore.getStats();
    console.log('\n📊 Vector Store Stats:');
    console.log(`   Total chunks: ${stats.totalChunks}`);
    console.log(`   Sources: ${stats.sources.join(', ')}`);
    console.log(`   Average chunk length: ${stats.avgChunkLength} characters\n`);
    return;
  }

  // Ingest from file
  const fileName = args[0];
  if (!fileName) {
    console.error('❌ Error: Please provide a knowledge base file path');
    process.exit(1);
  }
  const filePath = path.resolve(fileName);
  await ingestFromKnowledgeBase(filePath);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}
