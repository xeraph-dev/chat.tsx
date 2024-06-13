import { z } from 'zod'

export const LoginData = z.object({
    id: z.string(),
})

export const RegisterData = LoginData.extend({
    name: z.string(),
})

export const UserData = z.object({
    id: z.string(),
    token: z.string(),
})
