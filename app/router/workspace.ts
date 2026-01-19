import { KindeOrganization, KindeUser } from '@kinde-oss/kinde-auth-nextjs'
import { os } from '@orpc/server'
import z from 'zod'
import {
    getKindeServerSession,
  } from "@kinde-oss/kinde-auth-nextjs/server";
import { requiredAuthMiddleware } from '@/app/middleware/auth';
import { requiredWorkspaceMiddleware } from '@/app/middleware/workspace';
import { base } from '@/app/middleware/base';

export const workspacesList = base
.use(requiredAuthMiddleware)
.use(requiredWorkspaceMiddleware)
.route({
    method:"GET",
    path:"/workspace",
    summary:"Get all workspaces",
    tags:["workspace"]
})

.input(z.void())
.output(z.object({
    workspaces:z.array(
        z.object({
            id:z.string(),
            name:z.string(),
            avatar:z.string(),
        })
    ),
    user:z.custom<KindeUser<Record<string,unknown>>>(),
    currentWorkspace:z.custom<KindeOrganization<unknown>>()

}))
.handler(async({ context,errors })=>{
    const { getUserOrganizations } = getKindeServerSession()

    const organizations = await getUserOrganizations()

    if(!organizations) {
        throw errors.FORBIDDEN()
    }

    return { 
        workspaces:organizations?.orgs.map((org)=>({
            id:org.code,
            name:org.name ?? "My workspace",
            avatar:org.name?.charAt(0) ?? "M"
        })),
        user:context.user,
        currentWorkspace:context.workspace
    }
})