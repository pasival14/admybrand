import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
  
  interface KeyMetricCardProps {
    title: string;
    value: string;
  description?: string;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "pink";
}

export function KeyMetricCard({ 
  title, 
  value, 
  description, 
  trend, 
  trendUp, 
  icon,
  color = "blue" 
}: KeyMetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorVariants = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/10",
      border: "border-blue-100 dark:border-blue-800/30",
      text: "text-blue-700 dark:text-blue-300",
      icon: "text-blue-600",
      hover: "hover:bg-blue-50/80 dark:hover:bg-blue-900/20"
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/10",
      border: "border-green-100 dark:border-green-800/30",
      text: "text-green-700 dark:text-green-300",
      icon: "text-green-600",
      hover: "hover:bg-green-50/80 dark:hover:bg-green-900/20"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/10",
      border: "border-purple-100 dark:border-purple-800/30",
      text: "text-purple-700 dark:text-purple-300",
      icon: "text-purple-600",
      hover: "hover:bg-purple-50/80 dark:hover:bg-purple-900/20"
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/10",
      border: "border-orange-100 dark:border-orange-800/30",
      text: "text-orange-700 dark:text-orange-300",
      icon: "text-orange-600",
      hover: "hover:bg-orange-50/80 dark:hover:bg-orange-900/20"
    },
    pink: {
      bg: "bg-pink-50 dark:bg-pink-900/10",
      border: "border-pink-100 dark:border-pink-800/30",
      text: "text-pink-700 dark:text-pink-300",
      icon: "text-pink-600",
      hover: "hover:bg-pink-50/80 dark:hover:bg-pink-900/20"
    }
  };

  const colors = colorVariants[color];

    return (
    <Card 
      className={`
        bg-white dark:bg-gray-800 border-0 shadow-sm 
        hover:shadow-lg transition-all duration-300 ease-in-out
        transform hover:scale-105 hover:-translate-y-1
        group cursor-pointer
        ${colors.hover}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2 md:pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
            {title}
          </CardTitle>
          {icon && (
            <div className={`
              p-1.5 md:p-2 rounded-lg transition-all duration-300
              ${colors.bg} ${colors.border}
              group-hover:scale-110 group-hover:rotate-3
              group-hover:shadow-md
            `}>
              <div className={colors.icon}>
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                {value}
              </div>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {description}
                </p>
              )}
            </div>
            {trend && (
              <div className={`
                flex items-center space-x-1 text-xs font-medium 
                px-1.5 md:px-2 py-0.5 md:py-1 rounded-full transition-all duration-300
                ${trendUp 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-900/40' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 group-hover:bg-red-200 dark:group-hover:bg-red-900/40'
                }
                group-hover:scale-105 group-hover:shadow-sm
              `}>
                {trendUp ? (
                  <TrendingUp className="w-2.5 md:w-3 h-2.5 md:h-3 transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <TrendingDown className="w-2.5 md:w-3 h-2.5 md:h-3 transition-transform duration-300 group-hover:scale-110" />
                )}
                <span>{trend}</span>
              </div>
            )}
          </div>
          
          {/* Animated progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
            <div 
              className={`
                h-full rounded-full transition-all duration-1000 ease-out
                ${trendUp ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-red-500'}
              `}
              style={{ 
                width: trendUp ? '75%' : '45%',
                animation: 'pulse 2s infinite'
              }}
            />
          </div>
        </div>
        </CardContent>
      </Card>
    );
  }