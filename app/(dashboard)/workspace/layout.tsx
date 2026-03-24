import WorkspaceSidebar from "@/features/workspace/components/workspace-sidebar";
import { orpc } from "@/lib/orpc";
import { getQueryClient, HydrateClient } from "@/lib/query/hyradion";
import React from "react";


const WorkspaceLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.workspace.list.queryOptions());
  return (
    <main className="h-screen bg-background flex ">
      <HydrateClient client={queryClient}>
        <WorkspaceSidebar />
      </HydrateClient>
      {children}
    </main>
  );
};

export default WorkspaceLayout;
