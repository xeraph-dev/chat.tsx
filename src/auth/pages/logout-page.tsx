import { Center, Loader } from '@mantine/core'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../stores'

export const LogoutPage = () => {
    const navigate = useNavigate()
    const logout = useUser(state => state.logout)

    useEffect(() => {
        logout().then(() => navigate('/'))
    }, [logout, navigate])

    return (
        <Center mih="100vh" style={{ overflow: 'hidden' }}>
            <Loader />
        </Center>
    )
}
