import { Route } from 'react-router-dom'

import { ChatLayout } from './layouts'
import { ChannelPage, EmptyPage } from './pages'

export const ChatRoutes = (
    <Route element={<ChatLayout />}>
        <Route path="/channel/:cid" element={<ChannelPage />} />
        <Route path="*" element={<EmptyPage />} />
    </Route>
)
