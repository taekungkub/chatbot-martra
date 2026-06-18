import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const weatherTool = createTool({
  id: "get-weather",
  description: "ดึงข้อมูลสภาพอากาศปัจจุบันของเมืองที่ระบุ",
  inputSchema: z.object({
    location: z.string().describe("ชื่อเมือง"),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    condition: z.string(),
    humidity: z.number(),
    location: z.string(),
  }),
  execute: async ({ location }) => {
    // ข้อมูลจำลอง — เปลี่ยนเป็น API จริงได้ภายหลัง
    const mockData: Record<string, { temperature: number; condition: string; humidity: number }> = {
      bangkok: { temperature: 35, condition: "แดดจัด", humidity: 75 },
      กรุงเทพ: { temperature: 35, condition: "แดดจัด", humidity: 75 },
      "กรุงเทพมหานคร": { temperature: 35, condition: "แดดจัด", humidity: 75 },
      chiangmai: { temperature: 28, condition: "มีเมฆบางส่วน", humidity: 65 },
      เชียงใหม่: { temperature: 28, condition: "มีเมฆบางส่วน", humidity: 65 },
      phuket: { temperature: 32, condition: "มีฝนตก", humidity: 85 },
      ภูเก็ต: { temperature: 32, condition: "มีฝนตก", humidity: 85 },
      london: { temperature: 15, condition: "มีเมฆมาก", humidity: 80 },
      "new york": { temperature: 22, condition: "มีเมฆบางส่วน", humidity: 60 },
    };

    const key = location.toLowerCase();
    const data = mockData[key] ?? { temperature: 25, condition: "ท้องฟ้าแจ่มใส", humidity: 65 };

    return { ...data, location };
  },
});
