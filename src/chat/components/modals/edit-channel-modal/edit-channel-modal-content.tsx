import { Button, MultiSelect, TextInput } from '@mantine/core'
import { hasLength, useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Channel, StreamChat, UserResponse } from 'stream-chat'
import { v4 as uuid } from 'uuid'

export type EditChannelModalContentProps = {
    client: StreamChat
    channel?: Channel
}

type FormState = {
    name: string
    members: string[]
}

export const EditChannelModalContent = ({ client, channel }: EditChannelModalContentProps) => {
    const membersRef = useRef<string[]>([])
    const [users, setUsers] = useState<UserResponse[]>([])

    const form = useForm<FormState>({
        mode: 'controlled',
        initialValues: {
            name: channel?.data?.name ?? '',
            members: [],
        },
        validate: {
            name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        },
    })

    const createChannel = useCallback(
        async ({ name, members }: FormState) => {
            if (channel) return
            await client
                .channel('messaging', uuid(), {
                    name,
                    members: [client.userID!].concat(members),
                })
                .create()
        },
        [client, channel],
    )

    const updateChannel = useCallback(
        async ({ name, members }: FormState) => {
            if (!channel) return
            await channel.update({ name, members })

            const newMembers = members.filter(it => !membersRef.current.includes(it))
            const deletedMembers = membersRef.current.filter(it => !members.includes(it))

            if (newMembers.length) await channel.addMembers(newMembers)
            if (deletedMembers.length) await channel.removeMembers(deletedMembers)
        },
        [channel],
    )

    useEffect(() => {
        client.queryUsers({ id: { $ne: client.userID! } }).then(data => setUsers(data.users))
    }, [client])

    useEffect(() => {
        channel
            ?.queryMembers({})
            .then(({ members }) =>
                members
                    .map(member => member.user_id ?? '')
                    .filter(id => typeof id === 'string' && id !== client.userID),
            )
            .then(members => form.setFieldValue('members', (membersRef.current = members)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel, client])

    return (
        <form
            onSubmit={form.onSubmit(async values => {
                await createChannel(values)
                await updateChannel(values)
                form.reset()
                modals.closeAll()
            })}
        >
            <TextInput
                {...form.getInputProps('name')}
                label="Channel name"
                placeholder="channel name"
                required
                data-autofocus
            />

            <MultiSelect
                {...form.getInputProps('members')}
                data={users.map(user => user.id)}
                label="Members"
                searchable
                clearable
                hidePickedOptions
            />

            <Button type="submit" mt="md" fullWidth>
                Save
            </Button>
        </form>
    )
}
