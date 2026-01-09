import WorkspaceSidebar from '@/features/workspace/components/workspace-sidebar'
import React from 'react'

const WorkspaceLayout = ({ children }: { children:React.ReactNode}) => {
  return (
    <main className="h-screen bg-background flex ">
        <WorkspaceSidebar />
        {children}
    </main>
  )
}

export default WorkspaceLayout