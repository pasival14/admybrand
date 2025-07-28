"use client"

import { User, FileText, Mail, Code, Settings, ChevronDown, BarChart3, PieChart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  path: string
  badge?: number
}

export const sidebarItems: SidebarItem[] = [
  { icon: BarChart3, label: "Dashboard", path: "/" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics", badge: 3 },
  { icon: PieChart, label: "Reports", path: "/reports" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Mail, label: "Messages", path: "/messages", badge: 5 },
  { icon: Code, label: "API", path: "/api" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

export function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 md:py-6 space-y-4 md:space-y-6 relative group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Logo */}
      <div className="relative z-10">
        <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg relative group/logo">
          <span className="text-white font-bold text-sm md:text-lg tracking-wide transition-transform duration-300 group-hover/logo:scale-110">MY</span>
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-lg transform translate-x-1 translate-y-1 opacity-30 group-hover/logo:translate-x-0 group-hover/logo:translate-y-0 transition-transform duration-300" />
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col items-center space-y-3 md:space-y-4 relative z-10">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          const isHovered = hoveredItem === index
          
          return (
            <div key={index} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={`
                  w-8 md:w-10 h-8 md:h-10 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-md' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                  ${isHovered ? 'scale-110' : 'scale-100'}
                  group/item
                `}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => router.push(item.path)}
              >
                <Icon className="w-4 md:w-5 h-4 md:h-5 transition-transform duration-300 group-hover/item:scale-110" />
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full" />
                )}
                
                {/* Badge */}
                {item.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 md:w-5 h-4 md:h-5 flex items-center justify-center animate-pulse">
                    {item.badge}
                  </div>
                )}
              </Button>
              
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 animate-in slide-in-from-left-2 duration-200">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* User Profile */}
      <div className="mt-auto relative z-10">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 md:w-10 h-8 md:h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group/profile"
        >
          <div className="w-6 md:w-8 h-6 md:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/profile:scale-110">
            <span className="text-white text-xs font-medium">JD</span>
          </div>
        </Button>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-y-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
} 