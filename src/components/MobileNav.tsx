"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { sidebarItems } from "./Sidebar"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MY</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">AdMyBrand</span>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item: any, index: number) => {
                const Icon = item.icon
                const isActive = pathname === item.path
                
                return (
                  <Button
                    key={index}
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start space-x-3"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </div>
                    )}
                  </Button>
                )
              })}
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">JD</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Jonathan Deo</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
} 