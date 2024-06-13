import { Icon } from '@iconify/react'
import { Button, Group } from '@mantine/core'

import { useUser } from '~/stores'

export const LogoutButton = () => {
    const logout = useUser(state => state.logout)

    return (
        <Button variant="default" onClick={logout}>
            <Group gap="xs">
                <Icon icon="tabler:logout" />
                <span>Logout</span>
            </Group>
        </Button>
    )
}
