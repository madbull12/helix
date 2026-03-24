import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, {
    error: "Name shouldn't be empty",
  }),
});