import arcjet, { detectBot, shield } from "@/lib/arcjet";
import { base } from "@/app/middleware/base";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

const buildArcjetStandard = () =>
  arcjet
    .withRule(
      shield({
        mode: "LIVE",
      }),
    )
    .withRule(
      detectBot({
        mode: "LIVE",
        allow: [
          "CATEGORY:SEARCH_ENGINE",
          "CATEGORY:MONITOR",
          "CATEGORY:PREVIEW",
        ],
      }),
    );

export const standardSecurityMiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()

  .middleware(async ({ context, errors, next }) => {
    const decision =  await buildArcjetStandard().protect(context.request,{
      userId:context.user.id,

    });

    if(decision.isDenied()){
      if(decision.reason.isBot()) {
        throw errors.FORBIDDEN({
          message:"Automated traffic blocked."
        })
      }

      if(decision.reason.isShield()) {
        throw errors.FORBIDDEN({
          message:"Request blocked by security rules."
        })
      }

      throw errors.FORBIDDEN({
        message:"Request blocked"
      })
    }

    return next()
  });
