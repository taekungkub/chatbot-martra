import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const weatherTool = createTool({
  id: "get-weather",
  description: "\u0E14\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E20\u0E32\u0E1E\u0E2D\u0E32\u0E01\u0E32\u0E28\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E02\u0E2D\u0E07\u0E40\u0E21\u0E37\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E23\u0E30\u0E1A\u0E38",
  inputSchema: z.object({
    location: z.string().describe("\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E21\u0E37\u0E2D\u0E07")
  }),
  outputSchema: z.object({
    temperature: z.number(),
    condition: z.string(),
    humidity: z.number(),
    location: z.string()
  }),
  execute: async ({ location }) => {
    const mockData = {
      bangkok: { temperature: 35, condition: "\u0E41\u0E14\u0E14\u0E08\u0E31\u0E14", humidity: 75 },
      \u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E: { temperature: 35, condition: "\u0E41\u0E14\u0E14\u0E08\u0E31\u0E14", humidity: 75 },
      "\u0E01\u0E23\u0E38\u0E07\u0E40\u0E17\u0E1E\u0E21\u0E2B\u0E32\u0E19\u0E04\u0E23": { temperature: 35, condition: "\u0E41\u0E14\u0E14\u0E08\u0E31\u0E14", humidity: 75 },
      chiangmai: { temperature: 28, condition: "\u0E21\u0E35\u0E40\u0E21\u0E06\u0E1A\u0E32\u0E07\u0E2A\u0E48\u0E27\u0E19", humidity: 65 },
      \u0E40\u0E0A\u0E35\u0E22\u0E07\u0E43\u0E2B\u0E21\u0E48: { temperature: 28, condition: "\u0E21\u0E35\u0E40\u0E21\u0E06\u0E1A\u0E32\u0E07\u0E2A\u0E48\u0E27\u0E19", humidity: 65 },
      phuket: { temperature: 32, condition: "\u0E21\u0E35\u0E1D\u0E19\u0E15\u0E01", humidity: 85 },
      \u0E20\u0E39\u0E40\u0E01\u0E47\u0E15: { temperature: 32, condition: "\u0E21\u0E35\u0E1D\u0E19\u0E15\u0E01", humidity: 85 },
      london: { temperature: 15, condition: "\u0E21\u0E35\u0E40\u0E21\u0E06\u0E21\u0E32\u0E01", humidity: 80 },
      "new york": { temperature: 22, condition: "\u0E21\u0E35\u0E40\u0E21\u0E06\u0E1A\u0E32\u0E07\u0E2A\u0E48\u0E27\u0E19", humidity: 60 }
    };
    const key = location.toLowerCase();
    const data = mockData[key] ?? { temperature: 25, condition: "\u0E17\u0E49\u0E2D\u0E07\u0E1F\u0E49\u0E32\u0E41\u0E08\u0E48\u0E21\u0E43\u0E2A", humidity: 65 };
    return { ...data, location };
  }
});

export { weatherTool };
