import { createWorkspace, workspacesList } from "@/app/router/workspace";

export const router = {
  workspace: {
    list: workspacesList,
    create: createWorkspace,
  },
};
