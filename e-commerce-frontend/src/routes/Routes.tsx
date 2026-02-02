import Frontend from "@/layout/frontend/frontend";
import Dashboard from "@/page/dashboard";
import Products from "@/page/products";
import Orders from "@/page/orders";
import Customers from "@/page/customers";
import Settings from "@/page/settings";
import Error from "@/page/error";
import Home from "@/page/home";
import Login from "@/page/login";
import SignUp from "@/page/signup";
import AuthCallback from "@/page/auth-callback";
import ProtectRoutes from "@/routes/ProtectRoutes";
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
        },
        {
          path: "auth/callback",
          Component: AuthCallback,
        }
      ]
  },
  {
    Component: ProtectRoutes,
    children: [
      {
        path: '/dashboard',
        Component: Dashboard,
      },
      {
        path: '/products',
        Component: Products,
      },
      {
        path: '/orders',
        Component: Orders,
      },
      {
        path: '/customers',
        Component: Customers,
      },
      {
        path: '/settings',
        Component: Settings,
      }
    ]
  }
]);