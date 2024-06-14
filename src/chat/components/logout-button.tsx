import { Icon } from '@iconify/react'
import { Button, Group } from '@mantine/core'
import { Link } from 'react-router-dom'

export const LogoutButton = () => {
    return (
        <Button component={Link} variant="default" to="/logout">
            <Group gap="xs">
                <Icon icon="tabler:logout" />
                <span>Logout</span>
            </Group>
        </Button>
    )
}
