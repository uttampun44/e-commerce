import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router";


export default function Frontend() {
    return (
        <React.Fragment>
            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
    )
}