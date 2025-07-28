"use client"

import * as React from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationProps {
  type?: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
}

const notificationVariants = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-800 dark:text-green-200",
    iconColor: "text-green-500"
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-200",
    iconColor: "text-red-500"
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-800 dark:text-yellow-200",
    iconColor: "text-yellow-500"
  },
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-500"
  }
}

// Single notification component
function NotificationToast({ 
  type = "info", 
  title, 
  message, 
  duration = 5000
}: NotificationProps) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [isClosing, setIsClosing] = React.useState(false)
  
  const variant = notificationVariants[type]
  const Icon = variant.icon

  // Auto-close timer
  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 200)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-[9999] w-96 max-w-sm",
        "transform transition-all duration-200 ease-in-out",
        isClosing 
          ? "translate-x-full opacity-0" 
          : "translate-x-0 opacity-100"
      )}
    >
      <div className={cn(
        "rounded-lg border p-4 shadow-lg",
        variant.bg,
        variant.border
      )}>
        <div className="flex items-start space-x-3">
          <div className={cn("flex-shrink-0", variant.iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("text-sm font-medium", variant.text)}>
              {title}
            </p>
            {message && (
              <p className={cn("mt-1 text-sm", variant.text)}>
                {message}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className={cn(
              "flex-shrink-0 rounded-md p-1 transition-colors",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              variant.text
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Simple context for showing notifications
const NotificationContext = React.createContext<{
  showNotification: (notification: NotificationProps) => void
}>({
  showNotification: () => {}
})

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [currentNotification, setCurrentNotification] = React.useState<NotificationProps | null>(null)

  const showNotification = (notification: NotificationProps) => {
    setCurrentNotification(notification)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {currentNotification && (
        <NotificationToast {...currentNotification} />
      )}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
} 