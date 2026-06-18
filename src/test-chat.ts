import { mastra } from "./mastra/index";

const agent = mastra.getAgent("weatherAgent");

const response = await agent.generate([
  { role: "user", content: "ขอข้อมูลทั่วไปของบริษัทหน่อย" },
]);

console.log(response.text);
