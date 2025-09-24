import * as React from "react";
import Link from "next/link";
import { Home, Mic, BarChart2, FileText, MessageSquare, User, Sparkles, Zap, Target, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const pathname = usePathname();
  // Note: theme is available from useTheme() if needed for future enhancements
  
  const menuItems = [
    { title: "Home", icon: Home, href: "/", gradient: "from-blue-500 to-purple-500" },
    { title: "Practice Interview", icon: Mic, href: "/practice", gradient: "from-purple-500 to-pink-500" },
    { title: "Feedback Reports", icon: FileText, href: "/reports", gradient: "from-green-500 to-teal-500" },
    { title: "Progress Dashboard", icon: BarChart2, href: "/dashboard", gradient: "from-orange-500 to-red-500" },
    { title: "AI Assistant", icon: MessageSquare, href: "/assistant", gradient: "from-cyan-500 to-blue-500" },
    { title: "My Profile", icon: User, href: "/profile", gradient: "from-indigo-500 to-purple-500" },
    { title: "Settings", icon: Settings, href: "/settings", gradient: "from-gray-500 to-slate-600" },
  ];

  const [userEmail, setUserEmail] = React.useState<string>("");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("preptalk_user") || "";
      setUserEmail(email);
      // Listen for login/logout events from other components
      const onStorage = () => {
        setUserEmail(localStorage.getItem("preptalk_user") || "");
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
  }, []);

  return (
    <aside className="w-64 bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-r border-gray-200 dark:border-slate-700 min-h-screen flex flex-col relative overflow-hidden shadow-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-5 dark:opacity-10"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-100/30 dark:from-blue-600/20 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col h-full">
      <div>
        <br />
      </div>
        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.title}>
                  <Link 
                    href={item.href} 
                    className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-white/10 shadow-lg backdrop-blur-sm border border-blue-200 dark:border-white/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-white/5 hover:translate-x-1'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.gradient} rounded-r-full`}></div>
                    )}
                    
                    {/* Icon with gradient background */}
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} ${isActive ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'} transition-all duration-300`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    
                    {/* Text */}
                    <span className={`font-medium transition-colors duration-300 ${
                      isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white'
                    }`}>
                      {item.title}
                    </span>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>


        {/* Quick Stats */}
        <div className="p-4 pt-0">
          <div className="bg-blue-50 dark:bg-gradient-to-r dark:from-blue-600/20 dark:to-purple-600/20 rounded-xl p-3 border border-blue-200 dark:border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Today's Goal</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-slate-300">Complete 2 practice sessions</div>
            <div className="flex gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
