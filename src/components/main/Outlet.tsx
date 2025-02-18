import { Outlet } from "react-router-dom";
import { CookieBanner } from "../legal/CookiesBanner";

export const EmptyLayout = () => (
    <>
        <Outlet />
        <CookieBanner />
    </>
)
