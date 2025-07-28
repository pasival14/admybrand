"use client"

import * as React from "react"
import dynamic from 'next/dynamic'

// Dynamic imports for recharts components
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false })
const PieChart = dynamic(() => import('recharts').then(mod => ({ default: mod.PieChart })), { ssr: false })
const Pie = dynamic(() => import('recharts').then(mod => ({ default: mod.Pie })), { ssr: false })
const Cell = dynamic(() => import('recharts').then(mod => ({ default: mod.Cell })), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => ({ default: mod.Tooltip })), { ssr: false })

const productData = [
  { name: "Modernize", value: 36, color: "#3B82F6" },
  { name: "Ample", value: 22, color: "#8B5CF6" },
  { name: "Spike", value: 17, color: "#10B981" },
  { name: "MaterialM", value: 31, color: "#EF4444" },
]

interface DonutChartProps {
  className?: string
}

export function DonutChart({ className }: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState(-1)

  return (
    <div className={`relative ${className || ''}`}>
      <div className="relative flex items-center justify-center h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                stroke="#ffffff"
                strokeWidth={2}
              >
                {productData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{ 
                      cursor: 'pointer',
                      filter: hoveredIndex === index ? 'brightness(1.2)' : 'none',
                      transition: 'all 0.3s ease',
                      transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
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
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">8364</div>
            <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              Best Seller
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {productData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-sm">
              <div className="font-medium">{item.value}% {item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 