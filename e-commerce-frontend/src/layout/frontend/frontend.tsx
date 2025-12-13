import Footer from "@/component/footer";
import Header from "@/component/header";
import React from "react";

type FrontendLayoutProps = {
    children: React.ReactNode;
};

export default function Frontend({ children }: FrontendLayoutProps) {
    return (
        <React.Fragment>
         <Header />
            {children}
            <Footer />
        </React.Fragment>
    )
}