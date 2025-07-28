"use client"

import * as React from "react"
import { Activity, Wifi, WifiOff, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RealTimeUpdatesProps {
  className?: string
}

interface UpdateData {
  id: string
  type: "revenue" | "users" | "conversion" | "campaign"
  value: number
  change: number
  timestamp: Date
  isNew?: boolean
}

export function RealTimeUpdates({ className }: RealTimeUpdatesProps) {
  const [isConnected, setIsConnected] = React.useState(true)
  const [updates, setUpdates] = React.useState<UpdateData[]>([])
  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date())
  const [isUpdating, setIsUpdating] = React.useState(false)

  // Simulate real-time updates with smooth transitions
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        // Show loading state
        setIsUpdating(true)
        
        // Simulate network delay
        setTimeout(() => {
          const newUpdate: UpdateData = {
            id: Math.random().toString(36).substr(2, 9),
            type: ["revenue", "users", "conversion", "campaign"][Math.floor(Math.random() * 4)] as any,
            value: Math.floor(Math.random() * 1000) + 100,
            change: Math.floor(Math.random() * 20) - 10,
            timestamp: new Date(),
            isNew: true
          }

          setUpdates(prev => [newUpdate, ...prev.slice(0, 4)])
          setLastUpdate(new Date())
          setIsUpdating(false)
          
          // Remove the "new" flag after animation
          setTimeout(() => {
            setUpdates(prev => 
              prev.map(update => ({ ...update, isNew: false }))
            )
          }, 500)
        }, 800) // Simulate 800ms network delay
      }
    }, 4000) // Update every 4 seconds

    return () => clearInterval(interval)
  }, [isConnected])

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "revenue":
        return "💰"
      case "users":
        return "👥"
      case "conversion":
        return "📈"
      case "campaign":
        return "🎯"
      default:
        return "📊"
    }
  }

  const getUpdateColor = (change: number) => {
    return change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className={`bg-white dark:bg-gray-800 border-0 shadow-sm rounded-lg p-4 ${className || ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Real-time Updates
            </span>
            {/* Loading Circle Animation */}
            {isConnected && (
              <div className="relative">
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                ) : (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            )}
          </div>
          <Badge variant="secondary" className="text-xs">
            {isConnected ? "Live" : "Offline"}
          </Badge>
        </div>
        <button
          onClick={() => setIsConnected(!isConnected)}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>

      <div className="space-y-2">
        {updates.length > 0 ? (
          updates.map((update, index) => (
            <div
              key={update.id}
              className={`
                flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md
                transition-all duration-500 ease-out
                ${update.isNew 
                  ? 'transform translate-x-0 opacity-100 scale-100 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                  : 'transform translate-x-0 opacity-100 scale-100'
                }
                ${index === 0 && update.isNew ? 'animate-pulse' : ''}
              `}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg transition-transform duration-300 hover:scale-110">
                  {getUpdateIcon(update.type)}
                </span>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {update.type}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(update.timestamp)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white transition-all duration-300">
                  {update.value.toLocaleString()}
                </div>
                <div className={`text-xs font-medium transition-all duration-300 ${getUpdateColor(update.change)}`}>
                  {update.change > 0 ? "+" : ""}{update.change}%
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Activity className="h-8 w-8 mx-auto mb-3 opacity-50 animate-pulse" />
            <p className="text-sm">Waiting for updates...</p>
            {isConnected && (
              <div className="mt-2 flex items-center justify-center space-x-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <span>Last update: {formatTime(lastUpdate)}</span>
            {isUpdating && <Loader2 className="h-3 w-3 animate-spin" />}
          </span>
          <span className="flex items-center space-x-1">
            <span>{updates.length} recent updates</span>
            {isConnected && (
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </span>
        </div>
      </div>
    </div>
  )
} 