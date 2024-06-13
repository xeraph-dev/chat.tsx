import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthLayout, ChatLayout } from './layouts'
import { ChannelPage, EmptyPage, LoginPage, RegisterPage } from './pages'

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<ChatLayout />}>
                <Route path="/channel/:cid" element={<ChannelPage />} />
                <Route path="*" element={<EmptyPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
)
