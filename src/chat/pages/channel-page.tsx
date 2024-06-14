import { useHotkeys } from '@mantine/hooks'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Channel,
    ChannelHeader,
    MessageInput,
    MessageList,
    useChatContext,
} from 'stream-chat-react'

export const ChannelPage = () => {
    const navigate = useNavigate()
    const { setActiveChannel, client, channel } = useChatContext()
    const { cid } = useParams()

    const empty = useCallback(() => {
        setActiveChannel()
        navigate('/')
    }, [navigate, setActiveChannel])

    useEffect(() => {
        if (!cid) return
        client.queryChannels({ cid: { $eq: cid } }).then(([channel]) => setActiveChannel(channel))
    }, [client, cid, setActiveChannel])

    useEffect(() => {
        const listener = channel?.on('channel.deleted', () => {
            if (channel.cid === cid) empty()
            listener?.unsubscribe()
        })
        return () => {
            listener?.unsubscribe()
        }
    }, [channel, cid, empty])

    useHotkeys([['Escape', empty]])

    return (
        <Channel>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
        </Channel>
    )
}
