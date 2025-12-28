import { RouterProvider } from "react-router";
import { routes } from "@/routes/Routes";

export function AppRoutes() {
    return (
           <RouterProvider router={routes} />
    )
}