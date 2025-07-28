"use client"

import * as React from "react"
import dynamic from 'next/dynamic'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Dynamic imports for recharts components
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false })
const BarChart = dynamic(() => import('recharts').then(mod => ({ default: mod.BarChart })), { ssr: false })
const Bar = dynamic(() => import('recharts').then(mod => ({ default: mod.Bar })), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.XAxis })), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.YAxis })), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => ({ default: mod.Tooltip })), { ssr: false })
const CartesianGrid = dynamic(() => import('recharts').then(mod => ({ default: mod.CartesianGrid })), { ssr: false })

const campaignData = [
  { name: "Facebook Ads", revenue: 45000, spend: 12000, roi: 275 },
  { name: "Google Ads", revenue: 38000, spend: 15000, roi: 153 },
  { name: "Instagram", revenue: 32000, spend: 8000, roi: 300 },
  { name: "LinkedIn", revenue: 28000, spend: 10000, roi: 180 },
  { name: "TikTok", revenue: 22000, spend: 6000, roi: 267 },
  { name: "Twitter", revenue: 18000, spend: 5000, roi: 260 },
]

interface BarChartProps {
  title?: string
  description?: string
  className?: string
}

export function CampaignBarChart({ 
  title = "Campaign Performance", 
  description = "Revenue vs Spend by Channel",
  className 
}: BarChartProps) {
  return (
    <Card className={`bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow ${className || ''}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px'
                }}
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`, 
                  name === 'revenue' ? 'Revenue' : name === 'spend' ? 'Spend' : 'ROI'
                ]}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
              <Bar 
                dataKey="spend" 
                fill="#8B5CF6" 
                radius={[4, 4, 0, 0]}
                name="Spend"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 