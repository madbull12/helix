import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { getWorkspaceAbbr, getWorkspaceColor } from "@/utils/workspace";
import CreateWorkspaceDialog from "@/features/workspace/components/create-workspace-dialog";
  
  const WorkspaceList = () => {
    const workspaceList = [
      { id: "41", name: "Creative Tech" },
      { id: "55", name: "Andika Pratama" },
      { id: "100", name: "Ekspedingin" },
    ];
  
    return (
      <TooltipProvider>
        <div className="space-y-2">
          {workspaceList.map((workspace) => {
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
                  <p>{workspace.name}</p>
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
  