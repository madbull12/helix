import { base } from "@/app/middleware/base";
import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const requiredWorkspaceMiddleware = base
  .$context<{
    workspace?: KindeOrganization<null | unknown>;
  }>()
  .middleware(async ({ context: ctx, next,errors }) => {
    const workspace = ctx.workspace ?? ((await getWorkspace()).workspace);

    if (!workspace) {
      throw errors.FORBIDDEN()
    }

    return next({
      context: {
        workspace,
      
      },
    });
  });

const getWorkspace = async () => {
  const { getOrganization } = getKindeServerSession();
  const workspace = await getOrganization();

  return {
    workspace,
  };
};
