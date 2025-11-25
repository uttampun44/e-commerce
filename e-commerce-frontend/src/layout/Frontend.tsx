import TopNav from "@/components/topnav"

type FrontendProps = {
    children: React.ReactNode
}

export default function Frontend({ children }: FrontendProps) {
    return (
       <div>
        <TopNav />
        {children}
       </div>
    )
}