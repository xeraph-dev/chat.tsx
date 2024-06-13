import { AppShell, Box, Divider, Skeleton, Stack } from '@mantine/core'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Chat } from 'stream-chat-react'

import { ChannelList, CreateChannelButton, LogoutButton } from '~/components'
import { useClient, useUser } from '~/stores'

export const ChatLayout = () => {
    const client = useClient(state => state.client)
    const connect = useClient(state => state.connect)
    const disconnect = useClient(state => state.disconnect)

    const user = useUser(state => state.user)

    useEffect(() => {
        connect(user)
        return () => {
            disconnect()
        }
    }, [user, connect, disconnect])

    if (!user) return <Navigate to="/login" />
    if (!client)
        return (
            <AppShell
                navbar={{
                    width: 300,
                    breakpoint: 'xs',
                    collapsed: { mobile: true },
                }}
            >
                <AppShell.Navbar>
                    <Skeleton h="100%"></Skeleton>
                </AppShell.Navbar>
                <Skeleton>
                    <AppShell.Main></AppShell.Main>
                </Skeleton>
            </AppShell>
        )
    return (
        <Chat client={client} theme="str-chat__theme-dark">
            <AppShell
                navbar={{
                    width: 300,
                    breakpoint: 'xs',
                    collapsed: { mobile: true },
                }}
            >
                <AppShell.Navbar>
                    <ChannelList />
                    <Box flex={1} />
                    <Stack p="md" gap="md">
                        <CreateChannelButton />
                        <Divider />
                        <LogoutButton />
                    </Stack>
                </AppShell.Navbar>
                <AppShell.Main style={{ display: 'grid' }}>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </Chat>
    )
}
