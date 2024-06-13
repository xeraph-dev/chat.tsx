import { StreamChat } from 'stream-chat'
import type { z } from 'zod'
import { create } from 'zustand'

import type { UserData } from 'shared'

export type ClientState = {
    client?: StreamChat
    connect(user?: z.infer<typeof UserData>): Promise<void>
    disconnect(): void
}

export const useClient = create<ClientState>((set, get) => ({
    connect: async user => {
        if (!user) return
        const client = new StreamChat(import.meta.env.VITE_API_KEY)
        await client.connectUser({ id: user.id }, user.token)
        set({ client })
    },
    disconnect: async () => {
        get().client?.disconnectUser()
        set({ client: undefined })
    },
}))
