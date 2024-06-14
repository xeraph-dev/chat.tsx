import { Center, Paper } from '@mantine/core'
import { Navigate, Outlet } from 'react-router-dom'

import { useUser } from '../stores'

export const AuthLayout = () => {
    const user = useUser(state => state.user)

    if (user) return <Navigate to="/" />
    return (
        <Center mih="100vh" style={{ overflowY: 'hidden' }}>
            <Paper miw="30ch" withBorder p="md" radius="md">
                <Outlet />
            </Paper>
        </Center>
    )
}
