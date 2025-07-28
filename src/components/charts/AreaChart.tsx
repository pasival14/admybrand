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
const AreaChart = dynamic(() => import('recharts').then(mod => ({ default: mod.AreaChart })), { ssr: false })
const Area = dynamic(() => import('recharts').then(mod => ({ default: mod.Area })), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.XAxis })), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.YAxis })), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => ({ default: mod.Tooltip })), { ssr: false })
const CartesianGrid = dynamic(() => import('recharts').then(mod => ({ default: mod.CartesianGrid })), { ssr: false })

const engagementData = [
  { date: "Jan", users: 1200, sessions: 3400, bounceRate: 45 },
  { date: "Feb", users: 1400, sessions: 3800, bounceRate: 42 },
  { date: "Mar", users: 1600, sessions: 4200, bounceRate: 40 },
  { date: "Apr", users: 1800, sessions: 4600, bounceRate: 38 },
  { date: "May", users: 2000, sessions: 5000, bounceRate: 35 },
  { date: "Jun", users: 2200, sessions: 5400, bounceRate: 32 },
  { date: "Jul", users: 2400, sessions: 5800, bounceRate: 30 },
  { date: "Aug", users: 2600, sessions: 6200, bounceRate: 28 },
]

interface AreaChartProps {
  title?: string
  description?: string
  className?: string
}

export function UserEngagementAreaChart({ 
  title = "User Engagement", 
  description = "Monthly user activity trends",
  className 
}: AreaChartProps) {
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
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
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
                tickFormatter={(value) => `${value / 1000}k`}
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
                  Number(value).toLocaleString(), 
                  name === 'users' ? 'Users' : name === 'sessions' ? 'Sessions' : 'Bounce Rate'
                ]}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Area 
                type="monotone"
                dataKey="users" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorUsers)"
                strokeWidth={2}
                name="Users"
              />
              <Area 
                type="monotone"
                dataKey="sessions" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorSessions)"
                strokeWidth={2}
                name="Sessions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 