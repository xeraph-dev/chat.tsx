import { VercelRequest, VercelResponse } from '@vercel/node'
import { StreamChat } from 'stream-chat'

import { LogoutData } from '../shared/user.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).end()
    const client = new StreamChat(process.env.VITE_API_KEY!, process.env.API_SECRET!)

    const { error, data } = LogoutData.safeParse(req.body)
    if (error) return res.status(400).json(error)

    // TODO: Fix timeout
    client.revokeUserToken(data.id)
    return res.status(200).end()
}
