import { createTool } from '@mastra/core/tools';
import { tavily } from '@tavily/core';
import { z } from 'zod';

const client = tavily({ apiKey: process.env["TAVILY_API_KEY"] ?? "" });
const searchTool = createTool({
  id: "web-search",
  description: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E32\u0E01\u0E2D\u0E34\u0E19\u0E40\u0E17\u0E2D\u0E23\u0E4C\u0E40\u0E19\u0E47\u0E15 \u0E43\u0E0A\u0E49\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14\u0E2B\u0E23\u0E37\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E41\u0E19\u0E48\u0E43\u0E08",
  inputSchema: z.object({
    query: z.string().describe("\u0E04\u0E33\u0E04\u0E49\u0E19\u0E2B\u0E32"),
    maxResults: z.number().optional().default(5).describe("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14")
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        content: z.string(),
        score: z.number()
      })
    ),
    answer: z.string().optional()
  }),
  execute: async ({ query, maxResults }) => {
    const response = await client.search(query, {
      maxResults: maxResults ?? 5,
      includeAnswer: true
    });
    return {
      results: response.results.map((r) => ({
        title: r.title,
        url: r.url,
        content: r.content,
        score: r.score
      })),
      answer: response.answer
    };
  }
});

export { searchTool };
