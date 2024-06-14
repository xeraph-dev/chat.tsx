import { z } from 'zod'

export const LoginData = z.object({
    id: z.string(),
})

export const LogoutData = z.object({
    id: z.string(),
})

export const RegisterData = z.object({
    id: z.string(),
    name: z.string(),
})

export const UserData = z.object({
    id: z.string(),
    token: z.string(),
})
