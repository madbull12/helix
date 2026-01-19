import { os } from "@orpc/server"


export const base = os.$context<{
    request:Request
}>().errors({
    RATE_LIMITED:{
        message:"Too many requests, try again later!"
    },
    FORBIDDEN:{
        message:"This request is forbidden"
    }
})