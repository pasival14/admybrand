"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AnimatedChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  trend?: {
    value: number
    direction: "up" | "down"
    period: string
  }
  loading?: boolean
  actions?: React.ReactNode
}

export function AnimatedChartCard({ 
  title, 
  description, 
  children, 
  className,
  trend,
  loading = false,
  actions
}: AnimatedChartCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsLoaded(true), 300)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <Card 
      className={`
        bg-white dark:bg-gray-800 border-0 shadow-sm 
        hover:shadow-lg transition-all duration-300 ease-in-out
        transform hover:scale-[1.02] hover:-translate-y-1
        ${isHovered ? 'ring-2 ring-offset-2 ring-blue-500/20' : ''}
        group relative overflow-hidden
        ${className || ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
        pointer-events-none
      `} />
      
      <CardHeader className="pb-3 md:pb-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {description}
              </CardDescription>
            )}
            {trend && (
              <div className="flex items-center space-x-2 mt-2">
                <div className={`
                  flex items-center space-x-1 text-xs font-medium px-1.5 md:px-2 py-0.5 md:py-1 rounded-full
                  transition-all duration-300 group-hover:scale-105
                  ${trend.direction === 'up' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }
                `}>
                  {trend.direction === 'up' ? (
                    <TrendingUp className="w-2.5 md:w-3 h-2.5 md:h-3 transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <TrendingDown className="w-2.5 md:w-3 h-2.5 md:h-3 transition-transform duration-300 group-hover:scale-110" />
                  )}
                  <span>{trend.value}%</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  vs {trend.period}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {actions}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="relative">
                <Activity className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart...</p>
            </div>
          </div>
        ) : (
          <div className={`
            transition-all duration-500 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            {children}
          </div>
        )}
      </CardContent>
      
      {/* Animated border on hover */}
      <div className={`
        absolute inset-0 rounded-lg border-2 border-transparent
        transition-all duration-300 pointer-events-none
        ${isHovered ? 'border-blue-500/20' : ''}
      `} />
    </Card>
  )
}

// Enhanced loading skeleton for charts
export function ChartLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        </div>
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
      <div className="flex items-center justify-center h-48">
        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  )
} 