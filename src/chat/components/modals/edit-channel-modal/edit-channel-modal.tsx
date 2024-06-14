import { modals } from '@mantine/modals'
import type { Channel } from 'stream-chat'
import { useChatContext } from 'stream-chat-react'

import { EditChannelModalContent } from '.'

export const useEditChannelModal = (channel?: Channel) => {
    const { client } = useChatContext()

    return () =>
        modals.open({
            title: channel ? 'Edit channel' : 'Create channel',
            centered: true,
            children: <EditChannelModalContent client={client} channel={channel} />,
        })
}
