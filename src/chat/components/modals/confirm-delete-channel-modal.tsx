import { Badge, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import type { Channel } from 'stream-chat'
import { useChatContext } from 'stream-chat-react'

export const useConfirmDeleteChannelModal = (channel: Channel) => {
    const { client } = useChatContext()

    return () =>
        modals.openConfirmModal({
            title: 'Delete channel',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete the channel{' '}
                    <Badge component="span" color="red">
                        {channel.data?.name}
                    </Badge>
                    ? This action is destructive and you will have to contact support to restore
                    your data.
                </Text>
            ),
            labels: { confirm: 'Delete channel', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onConfirm: () => client.deleteChannels([channel.cid]),
        })
}
