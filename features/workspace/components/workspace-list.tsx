"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getWorkspaceAbbr, getWorkspaceColor } from "@/utils/workspace";
import CreateWorkspaceDialog from "@/features/workspace/components/create-workspace-dialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

const WorkspaceList = () => {

  const {
    data: { workspaces, currentWorkspace },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());

  return (
    <TooltipProvider>
      <div className="space-y-2">
        {workspaces.map((workspace) => {
          const isActive = currentWorkspace.orgCode === workspace.id
          const abbr = getWorkspaceAbbr(workspace.name);
          const color = getWorkspaceColor(workspace.id);

          return (
            <Tooltip key={workspace.id}>
              <TooltipTrigger asChild>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold text-white ${color}`}
                >
                  {abbr}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{workspace.name} {isActive && "(Current)"}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        <CreateWorkspaceDialog />
      </div>
    </TooltipProvider>
  );
};

export default WorkspaceList;
