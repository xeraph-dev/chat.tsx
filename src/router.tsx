import { BrowserRouter, Routes } from 'react-router-dom'

import { AuthRoutes } from './auth/auth-routes'
import { ChatRoutes } from './chat/chat-routes'

export const Router = () => (
    <BrowserRouter>
        <Routes>
            {AuthRoutes}
            {ChatRoutes}
        </Routes>
    </BrowserRouter>
)
