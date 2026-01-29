import { useAuhthContext } from "@/contextapi/auth";
import React from "react";

export default function Dashboard() {

    const {token} = useAuhthContext();

    return (
        <React.Fragment>
           {token?.token ? (
            <div>
                <h1>Welcome to the Dashboard, {token?.user.email}! hy</h1>
            </div>
           ) : (
            <div>
                <h1>Please log in to access the Dashboard.</h1>
            </div>
           )}
        </React.Fragment>
    )
}