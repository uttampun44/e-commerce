import AppSidebar from "@/components/app-sidebar";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

type BackendProps = {
  children?: React.ReactNode;
};

export default function Backend({ children }: BackendProps) {
  return (
    <React.Fragment>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Topbar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </React.Fragment>
  );
}
