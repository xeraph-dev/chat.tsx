import { Icon } from '@iconify/react'
import { Button, TextInput } from '@mantine/core'
import { hasLength, useForm } from '@mantine/form'
import type { z } from 'zod'

import type { RegisterData } from 'shared'

import { useUser } from '../stores'

export const RegisterPage = () => {
    const register = useUser(state => state.register)

    const form = useForm<z.infer<typeof RegisterData>>({
        mode: 'controlled',
        initialValues: {
            id: '',
            name: '',
        },
        validate: {
            id: hasLength({ min: 3 }, 'Must be at least 3 characters'),
            name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
        },
    })

    return (
        <form onSubmit={form.onSubmit(register)}>
            <TextInput
                {...form.getInputProps('id')}
                label="Username"
                placeholder="username"
                description="Used to sign in the application"
                leftSection={<Icon icon="tabler:user" />}
                withAsterisk
            />

            <TextInput
                {...form.getInputProps('name')}
                label="Name"
                placeholder="Name"
                leftSection={<Icon icon="tabler:lock" />}
                withAsterisk
                mt="sm"
            />

            <Button type="submit" mt="lg" fullWidth>
                Sign up
            </Button>
        </form>
    )
}
