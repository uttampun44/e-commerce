import Backend from "@/layout/backend/backend";
import Frontend from "@/layout/frontend/frontend";
import Dashboard from "@/page/dashboard";
import Error from "@/page/error";
import Home from "@/page/home";
import Login from "@/page/login";
import SignUp from "@/page/signup";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    Component: Frontend,
    children:[
        {
            path: "*",
            Component: Error,
        },
        {
           path: "/",
           Component: Home,
        },
        {
          path: "login",
          Component: Login,
        },
        {
          path: "Signup",
          Component: SignUp,
        }
      ]
  },
  {
    Component: Backend,
    children: [
      {
        path: '/dashboard',
        Component: Dashboard
      }
    ]
  }
]);