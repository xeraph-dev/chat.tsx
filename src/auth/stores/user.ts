import ky from 'ky'
import type { z } from 'zod'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { type LoginData, type RegisterData, UserData } from 'shared'

export type UserState = {
    user?: z.infer<typeof UserData>
    login(data: z.infer<typeof LoginData>): Promise<void>
    register(data: z.infer<typeof RegisterData>): Promise<void>
    logout(): Promise<void>
}

export const useUser = create(
    persist<UserState>(
        (set, get) => ({
            login: async json => {
                return ky
                    .post('/api/login', { json })
                    .json()
                    .then(user => set({ user: UserData.parse(user) }))
            },
            register: async json => {
                return ky
                    .post('/api/register', { json })
                    .json()
                    .then(user => set({ user: UserData.parse(user) }))
            },
            logout: async () => {
                const id = get().user?.id
                if (!id) return
                return ky.post('/api/logout', { json: { id } }).then(() => set({ user: undefined }))
            },
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
