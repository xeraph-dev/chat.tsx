import '@mantine/core/styles.css'
import 'mantine-contextmenu/styles.css'
import 'stream-chat-react/dist/css/v2/index.css'

import './assets/global.css'
import './assets/mantine.css'
import './assets/stream.css'

import { MantineProvider, createTheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isToday from 'dayjs/plugin/isToday'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ContextMenuProvider } from 'mantine-contextmenu'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from './router'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(isBetween)
dayjs.extend(isToday)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={createTheme({})} defaultColorScheme="dark">
            <ModalsProvider>
                <ContextMenuProvider>
                    <Router />
                </ContextMenuProvider>
            </ModalsProvider>
        </MantineProvider>
    </StrictMode>,
)
