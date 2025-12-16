# RAG System Setup Guide

This guide explains how to use the Retrieval Augmented Generation (RAG) system with semantic search to give your onboarding agent access to your Notion documents, Slack channel history, and other company documentation.

## 🎯 What is RAG?

RAG (Retrieval Augmented Generation) allows your agent to search through custom company documents using semantic search. Instead of matching keywords, it understands the *meaning* of questions and finds relevant information even when the exact words don't match.

**Example:**
- User asks: "How do we ship new features?"
- Agent searches knowledge base and finds: "Our deployment process uses CI/CD pipelines..."

## 📋 Prerequisites

- OpenAI API key (already configured if you're using the agent)
- Your Notion documents exported as text or markdown
- Slack channel history you want to include

## 🚀 Quick Start

### Step 1: Create Your Knowledge Base File

1. Copy the example file:
   ```bash
   cp knowledge-base.example.json knowledge-base.json
   ```

2. Edit `knowledge-base.json` and replace the example content with your actual documentation

### Step 2: Structure Your Content

The knowledge base file should follow this format:

```json
{
  "documents": [
    {
      "source": "notion:product-roadmap",
      "category": "product",
      "title": "Product Roadmap Q1 2024",
      "content": "Your actual content here..."
    },
    {
      "source": "slack:onboarding-channel",
      "category": "onboarding",
      "title": "Onboarding Channel FAQs",
      "content": "Compiled Q&As from Slack..."
    }
  ]
}
```

**Fields:**
- `source`: Unique identifier (format: `type:name`)
- `category`: Helps organize content (e.g., "product", "engineering", "culture")
- `title`: Human-readable title
- `content`: The actual text content (can be long, will be chunked automatically)

### Step 3: Ingest Your Documents

Run the ingestion script to process your documents and generate embeddings:

```bash
npm run ingest knowledge-base.json
```

This will:
1. Split each document into smaller chunks (~1000 characters)
2. Generate embeddings using OpenAI
3. Store everything in `data/vector-store.json`

**Example output:**
```
📄 Processing document: notion:product-roadmap
   Split into 5 chunks
🔄 Generating embeddings...
✅ Ingested 5 chunks from notion:product-roadmap

✅ Ingestion complete! Total chunks: 15

📊 Vector Store Stats:
   Total chunks: 15
   Sources: notion:product-roadmap, slack:onboarding-channel, ...
   Average chunk length: 892 characters
```

### Step 4: Test It Out

Start your agent and ask questions about your custom content:

```
User: "What's on the product roadmap?"
Agent: [Uses searchKnowledgeBase tool and returns relevant info]
```

## 📝 How to Prepare Your Content

### From Notion

1. Open your Notion page
2. Click `...` (three dots) → Export → Markdown & CSV
3. Copy the text content
4. Paste into the `content` field in `knowledge-base.json`

**Tip:** You can include multiple Notion pages as separate documents

### From Slack

1. Go to your Slack channel
2. Copy important messages, FAQs, and recurring topics
3. Compile them into a single document or split by topic
4. Paste into `knowledge-base.json`

**Tip:** Focus on:
- Frequently asked questions
- Important announcements
- Process explanations
- Helpful conversations

### Formatting Tips

- **Keep it clean**: Remove excessive formatting, emojis, and links
- **Stay focused**: Each document should cover a specific topic
- **Length doesn't matter**: Long documents will be chunked automatically
- **Add context**: Include enough context so each chunk makes sense on its own

## 🔧 Advanced Usage

### View Vector Store Stats

```bash
npm run ingest --stats
```

### Clear the Vector Store

```bash
npm run ingest --clear
```

### Update Existing Content

Just edit `knowledge-base.json` and run the ingestion script again. Documents with the same `source` will be updated.

### Chunk Size Configuration

By default, documents are split into ~1000 character chunks with 200 character overlap. To customize this, modify `src/scripts/ingestDocuments.ts`:

```typescript
await ingestDocument(doc.content, {
  source: doc.source,
  category: doc.category
}, {
  chunkSize: 1500,  // Increase for longer chunks
  overlap: 300      // Increase overlap for better context
});
```

## 🎯 When the Agent Uses Semantic Search

The agent automatically uses `searchKnowledgeBase` when:
- Questions are about company-specific processes or information
- Standard FAQs don't have enough detail
- The question matches topics in your knowledge base

**Examples:**
- "How do we deploy to production?"
- "What's on the product roadmap?"
- "Tell me about our engineering practices"
- "What were the key announcements this quarter?"

## 📊 How It Works

1. **Ingestion**: Documents are split into chunks and converted to embeddings (vectors)
2. **Storage**: Embeddings are saved to `data/vector-store.json`
3. **Query**: When a user asks a question, it's converted to an embedding
4. **Search**: The system finds chunks with similar embeddings (cosine similarity)
5. **Return**: Top 3 most relevant chunks are returned to the agent
6. **Response**: The agent uses this information to answer the question

## 🔍 Troubleshooting

### "No relevant information found"

**Cause**: The knowledge base is empty or your query doesn't match any content

**Solutions:**
- Make sure you've run the ingestion script
- Check that `data/vector-store.json` exists and has content
- Try rephrasing your question
- Add more content to your knowledge base

### Ingestion is slow

**Cause**: OpenAI API rate limits or large documents

**Solutions:**
- The script processes documents sequentially to avoid rate limits
- Large documents take longer due to embedding generation
- Consider splitting very large documents into smaller ones

### Embeddings API errors

**Cause**: Missing or invalid OpenAI API key

**Solutions:**
- Check that `OPENAI_API_KEY` is set in `.env`
- Verify the API key is valid
- Check your OpenAI account has API access

## 💡 Best Practices

1. **Start small**: Add 3-5 key documents first, test, then expand
2. **Keep it updated**: Re-run ingestion when documents change
3. **Organize by topic**: Use clear `source` identifiers and categories
4. **Test queries**: Try different questions to see what works best
5. **Monitor usage**: Check OpenAI API usage for embedding costs

## 💰 Cost Considerations

- **Embeddings**: ~$0.0001 per 1,000 tokens (~750 words)
- **Example**: 50 pages of text ≈ $0.20-$0.50 one-time cost
- **Queries**: Each search generates one embedding (negligible cost)
- **Storage**: Free (stored locally in JSON file)

## 🚀 Next Steps

1. Populate `knowledge-base.json` with your content
2. Run `npm run ingest knowledge-base.json`
3. Test the agent with questions about your custom content
4. Iterate and add more documents as needed

Happy onboarding! 🎉
