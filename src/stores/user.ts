import ky from 'ky'
import { type LoginData, type RegisterData, UserData } from 'shared'
import type { z } from 'zod'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type UserState = {
    // client: StreamChat
    // connected: boolean
    user?: z.infer<typeof UserData>
    login(data: z.infer<typeof LoginData>): Promise<void>
    register(data: z.infer<typeof RegisterData>): Promise<void>
    logout(): void
}

export const useUser = create(
    persist<UserState>(
        set => ({
            login: async json => {
                const user = await ky.post('/api/login', { json }).json().then(UserData.parse)
                set({ user })
            },
            register: async json => {
                const user = await ky.post('/api/register', { json }).json().then(UserData.parse)
                set({ user })
            },
            logout: async () => {
                set({ user: undefined })
            },
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
