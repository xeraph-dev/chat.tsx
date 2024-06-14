import { Route } from 'react-router-dom'

import { AuthLayout } from './layouts'
import { LoginPage, RegisterPage } from './pages'
import { LogoutPage } from './pages/logout-page'

export const AuthRoutes = (
    <>
        <Route element={<AuthLayout />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/logout" element={<LogoutPage />} />
    </>
)
