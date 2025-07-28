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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dynamic imports for recharts components
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false })
const PieChart = dynamic(() => import('recharts').then(mod => ({ default: mod.PieChart })), { ssr: false })
const Pie = dynamic(() => import('recharts').then(mod => ({ default: mod.Pie })), { ssr: false })
const Cell = dynamic(() => import('recharts').then(mod => ({ default: mod.Cell })), { ssr: false })
const Label = dynamic(() => import('recharts').then(mod => ({ default: mod.Label })), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => ({ default: mod.Tooltip })), { ssr: false })

const conversionData = [
  { source: "Organic Search", value: 40, fill: "#3B82F6" },
  { source: "Paid Social", value: 30, fill: "#8B5CF6" },
  { source: "Referral", value: 20, fill: "#10B981" },
  { source: "Direct", value: 10, fill: "#F59E0B" },
]

const chartConfig = {
  "Organic Search": {
    label: "Organic Search",
    color: "#3B82F6",
  },
  "Paid Social": {
    label: "Paid Social",
    color: "#8B5CF6",
  },
  "Referral": {
    label: "Referral",
    color: "#10B981",
  },
  "Direct": {
    label: "Direct",
    color: "#F59E0B",
  },
}

export function InteractivePieChart() {
  const id = "pie-interactive"
  const [activeSource, setActiveSource] = React.useState(conversionData[0].source)
  const [hoveredIndex, setHoveredIndex] = React.useState(-1)

  const sources = React.useMemo(() => conversionData.map((item) => item.source), [])

  const activeIndex = React.useMemo(
    () => conversionData.findIndex((item) => item.source === activeSource),
    [activeSource]
  )

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    if (index !== activeIndex) return null
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card data-chart={id} className="flex flex-col bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Conversion Sources</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Traffic sources breakdown</CardDescription>
        </div>
        <Select value={activeSource} onValueChange={setActiveSource}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5 bg-gray-50 dark:bg-gray-700 border-0"
            aria-label="Select a source"
          >
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {sources.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <div className="mx-auto aspect-square w-full max-w-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={conversionData}
                dataKey="value"
                nameKey="source"
                innerRadius={60}
                outerRadius={90}
                strokeWidth={5}
                label={renderCustomLabel}
                labelLine={false}
                paddingAngle={2}
              >
                {conversionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    stroke="#ffffff"
                    strokeWidth={hoveredIndex === index ? 4 : 2}
                    style={{ 
                      cursor: 'pointer',
                      filter: hoveredIndex === index ? 'brightness(1.2)' : 'none',
                      transition: 'all 0.3s ease',
                      transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                    onClick={() => setActiveSource(conversionData[index].source)}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px'
                }}
                formatter={(value, name) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 