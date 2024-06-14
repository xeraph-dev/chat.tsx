import { Icon } from '@iconify/react'
import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { z } from 'zod'

import { LoginData } from 'shared'

import { useUser } from '../stores'

export const LoginPage = () => {
    const login = useUser(state => state.login)

    const form = useForm<z.infer<typeof LoginData>>({
        mode: 'controlled',
        initialValues: {
            id: '',
        },
    })

    return (
        <form onSubmit={form.onSubmit(login)}>
            <TextInput
                {...form.getInputProps('id')}
                label="Username"
                placeholder="username"
                leftSection={<Icon icon="tabler:user" />}
                withAsterisk
            />

            <Button type="submit" mt="lg" fullWidth>
                Sign in
            </Button>
        </form>
    )
}
