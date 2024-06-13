import { VercelRequest, VercelResponse } from '@vercel/node'
import { StreamChat } from 'stream-chat'

import { RegisterData } from '../shared/user.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).end()
    const client = new StreamChat(process.env.VITE_API_KEY!, process.env.API_SECRET!)

    const { error, data } = RegisterData.safeParse(req.body)
    if (error) return res.status(400).json(error)
    const { id, name } = data

    await client.upsertUser({ id, name })
    const token = client.createToken(id)

    return res.status(200).json({ id, token })
}
