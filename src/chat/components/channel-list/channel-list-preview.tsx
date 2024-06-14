import { Icon } from '@iconify/react'
import { Group, NavLink, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { useContextMenu } from 'mantine-contextmenu'
import { type ComponentType, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
    type ChannelPreviewUIComponentProps,
    type DefaultStreamChatGenerics,
} from 'stream-chat-react'

import { useConfirmDeleteChannelModal, useEditChannelModal } from '../modals'

export const ChannelListPreview: ComponentType<
    ChannelPreviewUIComponentProps<DefaultStreamChatGenerics>
> = ({ key, channel, Avatar, lastMessage }) => {
    const { showContextMenu } = useContextMenu()
    const onEdit = useEditChannelModal(channel)
    const onDelete = useConfirmDeleteChannelModal(channel)

    const description = useMemo(() => {
        if (!lastMessage) return 'Nothing yet'
        if (lastMessage.deleted_at) return 'Message deleted'
        return lastMessage.text
    }, [lastMessage])

    const avatar = useMemo(() => (Avatar ? <Avatar /> : null), [Avatar])

    const time = useMemo(() => {
        if (!lastMessage) return ''
        const date = dayjs(lastMessage?.updated_at)
        if (date.isToday()) return date.format('LT')
        if (date.isBetween(date.day(0), date.day(6))) return date.format('ddd')
        return date.format('L')
    }, [lastMessage])

    return (
        <NavLink
            key={key}
            component={Link}
            to={`/channel/${channel.cid}`}
            label={
                <Group justify="space-between">
                    <Title order={5}>{channel.data?.name}</Title>
                    <Text size="xs">{time}</Text>
                </Group>
            }
            description={
                <Group justify="space-between">
                    <Text size="sm">{description}</Text>
                </Group>
            }
            leftSection={avatar}
            onContextMenu={showContextMenu([
                {
                    key: 'edit',
                    icon: <Icon icon="tabler:pencil" />,
                    title: 'Edit',
                    onClick: onEdit,
                },
                {
                    key: 'delete',
                    icon: <Icon icon="tabler:trash" />,
                    title: 'Delete',
                    color: 'red',
                    onClick: onDelete,
                },
            ])}
        />
    )
}
