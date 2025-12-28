import Frontend from "@/layout/frontend/frontend";
import ErrorPage from "@/page/errorpage";
import Login from "@/page/login";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    Component: Frontend,
    path: "/",
    children:[
        {
            path: "*",
            Component: ErrorPage,
        },
        {
          path: "login",
          Component: Login,
        },
      ]
  }]);