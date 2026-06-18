import { Mastra } from "@mastra/core";
import { weatherAgent } from "./agents/weather-agent";
import { researchAgent } from "./agents/research-agent";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { researchWorkflow } from "./workflows/research-workflow";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { Workspace } from "@mastra/core/workspace";
import { LocalFilesystem } from "@mastra/core/workspace";

const workspace = new Workspace({
  filesystem: new LocalFilesystem({ basePath: "./workspace" }),
  tools: {
    enabled: true,
    requireApproval: false,
  },
});

export const mastra = new Mastra({
  agents: { weatherAgent, researchAgent },
  workflows: { weatherWorkflow, researchWorkflow },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  storage: new LibSQLStore({
    id: "libsql-storage",
    url: "file:./storage.db",
  }),
  workspace,
});
