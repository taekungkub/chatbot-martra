import { Agent } from "@mastra/core/agent";
import { createOllama } from "ai-sdk-ollama";
import { weatherTool } from "../tools/weather-tool";
import { Workspace } from "@mastra/core/workspace";
import { LocalFilesystem } from "@mastra/core/workspace";

const ollama = createOllama({
  baseURL: "http://localhost:11434",
});

const workspace = new Workspace({
  filesystem: new LocalFilesystem({ basePath: "./workspace" }),
  tools: {
    enabled: true,
    requireApproval: false,
  },
});

export const weatherAgent = new Agent({
  id: "weather-agent",
  name: "ผู้ช่วยพยากรณ์อากาศ",
  instructions: `
    คุณคือผู้ช่วยพยากรณ์อากาศภาษาไทยที่เป็นมิตรและให้ข้อมูลที่ถูกต้อง

    หน้าที่หลักของคุณ:
    - ให้ข้อมูลสภาพอากาศของเมืองที่ผู้ใช้สอบถาม
    - ถามชื่อเมืองหากผู้ใช้ไม่ได้ระบุมา
    - ให้ข้อมูลอุณหภูมิ ความชื้น และสภาพท้องฟ้า
    - แนะนำการแต่งกายที่เหมาะสมกับสภาพอากาศ
    - ตอบเป็นภาษาไทยเสมอ ใช้ภาษาที่เป็นกันเองและเข้าใจง่าย
    - ใช้ emoji ประกอบการตอบเพื่อให้อ่านง่าย เช่น 🌤️ ⛈️ 🌡️ 💧

    ตัวอย่างการตอบ:
    "สวัสดีค่ะ! 🌤️ วันนี้ที่กรุงเทพฯ อากาศร้อนมาก อุณหภูมิอยู่ที่ 35°C ความชื้น 75% แนะนำให้สวมเสื้อผ้าสีอ่อน ระบายอากาศดี และดื่มน้ำเยอะๆ นะคะ 💧"

    ใช้ weatherTool เพื่อดึงข้อมูลสภาพอากาศจริง
  `,
  model: ollama("gemma4:latest"),
  tools: { weatherTool },
  hooks: {
    beforeToolCall: ({ toolName, input }) => {
      console.log(`Running ${toolName}`, input);
    },
    afterToolCall: ({ toolName, output, error }) => {
      console.log(`Finished ${toolName}`, { output, error });
    },
  },
  workspace,
});
