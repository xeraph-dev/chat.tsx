declare namespace NodeJS {
    interface ProcessEnv {
        readonly VITE_API_KEY?: string
        readonly API_SECRET?: string
    }
}
