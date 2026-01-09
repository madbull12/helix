import WorkspaceList from "@/features/workspace/components/workspace-list";
import UserDropdown from "@/features/workspace/components/user-dropdown";

const WorkspaceSidebar = () => {
  return (
    <aside className="w-16 rounded-0 h-full border-r border-border bg-muted p-2 flex flex-col justify-between items-center space-y-2">
      <WorkspaceList />
      <UserDropdown />
    </aside>
  );
};

export default WorkspaceSidebar;
