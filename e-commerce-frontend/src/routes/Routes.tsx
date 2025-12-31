import Frontend from "@/layout/frontend/frontend";
import ErrorPage from "@/page/errorpage";
import Home from "@/page/home";
import Login from "@/page/login";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    Component: Frontend,
    children:[
        {
            path: "*",
            Component: ErrorPage,
        },
        {
           path: "/",
           Component: Home,
        },
        {
          path: "login",
          Component: Login,
        },
      ]
  }]);