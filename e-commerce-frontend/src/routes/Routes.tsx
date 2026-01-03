import Frontend from "@/layout/frontend/frontend";
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
  }]);