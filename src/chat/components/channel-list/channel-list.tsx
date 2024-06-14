import { ChannelList as StreamChannelList, useChatContext } from 'stream-chat-react'

import { ChannelListPreview } from '.'

export const ChannelList = () => {
    const { client } = useChatContext()

    return (
        <StreamChannelList
            setActiveChannelOnMount={false}
            filters={{ members: { $in: [client.userID!] } }}
            sort={{ last_message_at: -1 }}
            Preview={ChannelListPreview}
        />
    )
}
