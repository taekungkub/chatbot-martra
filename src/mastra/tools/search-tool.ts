import { createTool } from "@mastra/core/tools";
import { tavily } from "@tavily/core";
import { z } from "zod";

const client = tavily({ apiKey: process.env["TAVILY_API_KEY"] ?? "" });

export const searchTool = createTool({
  id: "web-search",
  description: "ค้นหาข้อมูลจากอินเทอร์เน็ต ใช้เมื่อต้องการข้อมูลล่าสุดหรือข้อมูลที่ไม่แน่ใจ",
  inputSchema: z.object({
    query: z.string().describe("คำค้นหา"),
    maxResults: z.number().optional().default(5).describe("จำนวนผลลัพธ์สูงสุด"),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        content: z.string(),
        score: z.number(),
      })
    ),
    answer: z.string().optional(),
  }),
  execute: async ({ query, maxResults }) => {
    const response = await client.search(query, {
      maxResults: maxResults ?? 5,
      includeAnswer: true,
    });

    return {
      results: response.results.map((r) => ({
        title: r.title,
        url: r.url,
        content: r.content,
        score: r.score,
      })),
      answer: response.answer,
    };
  },
});
