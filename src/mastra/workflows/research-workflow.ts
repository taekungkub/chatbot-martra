import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import { searchTool } from "../tools/search-tool";

// Step 1: ค้นหาข้อมูลหลัก
const searchStep = createStep(searchTool);

// Step 2: สรุปและจัดระเบียบข้อมูล
const summarizeStep = createStep({
  id: "summarize-research",
  description: "สรุปและจัดระเบียบข้อมูลที่ค้นพบ",
  inputSchema: z.object({
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
  outputSchema: z.object({
    summary: z.string(),
    sources: z.array(z.string()),
    keyPoints: z.array(z.string()),
  }),
  execute: async ({ inputData }) => {
    const { results, answer } = inputData;

    // เรียงตาม score สูงสุดก่อน
    const topResults = [...results].sort((a, b) => b.score - a.score).slice(0, 3);

    const sources = topResults.map((r) => `${r.title} — ${r.url}`);

    // ดึง key points จากแต่ละผลลัพธ์ (ประโยคแรกของแต่ละแหล่ง)
    const keyPoints = topResults.map((r) => {
      const firstSentence = r.content.split(".")[0]?.trim() ?? r.content.slice(0, 150);
      return `• ${firstSentence}`;
    });

    const summary = answer
      ? answer
      : topResults.map((r) => r.content).join("\n\n").slice(0, 500);

    return { summary, sources, keyPoints };
  },
});

export const researchWorkflow = createWorkflow({
  id: "research-workflow",
  description: "ค้นหาข้อมูลจากเว็บและสรุปผลการวิจัย",
  inputSchema: z.object({
    query: z.string().describe("หัวข้อหรือคำถามที่ต้องการค้นหา"),
    maxResults: z.number().optional().default(5),
  }),
  outputSchema: z.object({
    summary: z.string(),
    sources: z.array(z.string()),
    keyPoints: z.array(z.string()),
  }),
})
  .then(searchStep)
  .then(summarizeStep)
  .commit();
