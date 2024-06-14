import { Box, Button, Skeleton } from '@mantine/core'
import { useChatContext } from 'stream-chat-react'

import { useEditChannelModal } from './modals'

export const CreateChannelButton = () => {
    const { client } = useChatContext()
    const handleClick = useEditChannelModal()

    if (!client)
        return (
            <Box p="md">
                <Skeleton>
                    <Button></Button>
                </Skeleton>
            </Box>
        )
    return <Button onClick={handleClick}>Crate Channel</Button>
}
