import '@fontsource/pretendard/400.css'
import '@fontsource/pretendard/500.css'
import '@fontsource/pretendard/600.css'

import { createRoot } from "react-dom/client";
import { App } from "./routes";
import {registerSW} from "virtual:pwa-register"

registerSW({immediate: true})

createRoot(document.getElementById('root')!).render(
    <App/>
)