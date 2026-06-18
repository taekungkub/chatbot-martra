import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import { weatherTool } from "../tools/weather-tool";

// Step 1: ดึงข้อมูลสภาพอากาศ
const fetchWeatherStep = createStep(weatherTool);

// Step 2: สรุปและแนะนำการแต่งกาย
const summarizeStep = createStep({
  id: "summarize-weather",
  description: "สรุปข้อมูลสภาพอากาศและให้คำแนะนำการแต่งกาย",
  inputSchema: z.object({
    temperature: z.number(),
    condition: z.string(),
    humidity: z.number(),
    location: z.string(),
  }),
  outputSchema: z.object({
    summary: z.string(),
    recommendation: z.string(),
  }),
  execute: async ({ inputData }) => {
    const { temperature, condition, humidity, location } = inputData;

    let recommendation = "";
    if (temperature >= 35) {
      recommendation = "อากาศร้อนมาก ควรสวมเสื้อผ้าสีอ่อน ระบายอากาศดี และดื่มน้ำมากๆ";
    } else if (temperature >= 28) {
      recommendation = "อากาศอบอุ่น ควรสวมเสื้อผ้าบางเบา และพกน้ำดื่มติดตัว";
    } else if (temperature >= 20) {
      recommendation = "อากาศพอดี เหมาะสำหรับการออกไปทำกิจกรรมนอกบ้าน";
    } else {
      recommendation = "อากาศเย็น ควรสวมเสื้อกันหนาว";
    }

    if (condition.includes("ฝน")) {
      recommendation += " และพกร่มด้วย";
    }

    if (humidity > 80) {
      recommendation += " ความชื้นสูงมาก อาจรู้สึกอึดอัด";
    }

    const summary = `📍 ${location}: ${condition}, อุณหภูมิ ${temperature}°C, ความชื้น ${humidity}%`;

    return { summary, recommendation };
  },
});

export const weatherWorkflow = createWorkflow({
  id: "weather-workflow",
  description: "วิเคราะห์สภาพอากาศและให้คำแนะนำการแต่งกาย",
  inputSchema: z.object({
    location: z.string().describe("ชื่อเมืองที่ต้องการตรวจสอบสภาพอากาศ"),
  }),
  outputSchema: z.object({
    summary: z.string(),
    recommendation: z.string(),
  }),
})
  .then(fetchWeatherStep)
  .then(summarizeStep)
  .commit();
