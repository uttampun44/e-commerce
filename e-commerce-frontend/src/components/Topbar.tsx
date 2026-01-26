import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, LogOut } from "lucide-react";
import { useAuhthContext } from "@/contextapi/auth";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Topbar() {
  const { token, setToken } = useAuhthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between w-full h-16 px-6 border-b bg-white shadow-sm">
      {/* Left Side - Sidebar Trigger */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right Side - Search, Notifications, User */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg w-64">
          <Search size={18} className="text-gray-500" />
          <Input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-0 outline-none text-sm w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{token?.user.name}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
            {token?.user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}
