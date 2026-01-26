import { Skeleton } from "@/components/ui/skeleton";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function LoadingSkeleton() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-6">
        <SidebarTrigger />
        
        <div className="space-y-6 mt-4">
          {/* Header Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2 p-4 border rounded-lg">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-20" />
            </div>
            
            {/* Table Header */}
            <div className="flex gap-4 pb-4 border-b">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1" />
              ))}
            </div>

            {/* Table Rows */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-4 flex-1" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
