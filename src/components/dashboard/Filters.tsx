"use client"

import * as React from "react"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface FiltersProps {
  onFiltersChange?: (filters: FilterState) => void
  className?: string
}

interface FilterState {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  status: string[]
  category: string[]
  amountRange: {
    min: number | undefined
    max: number | undefined
  }
}

const statusOptions = [
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
]

const categoryOptions = [
  { value: "marketing", label: "Marketing" },
  { value: "development", label: "Development" },
  { value: "consulting", label: "Consulting" },
  { value: "design", label: "Design" },
]

export function Filters({ onFiltersChange, className }: FiltersProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    status: [],
    category: [],
    amountRange: {
      min: undefined,
      max: undefined,
    },
  })

  const [isOpen, setIsOpen] = React.useState(false)

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange?.(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      dateRange: { from: undefined, to: undefined },
      status: [],
      category: [],
      amountRange: { min: undefined, max: undefined },
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  const hasActiveFilters = 
    filters.dateRange.from || 
    filters.dateRange.to || 
    filters.status.length > 0 || 
    filters.category.length > 0 ||
    filters.amountRange.min ||
    filters.amountRange.max

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-9 px-3",
              hasActiveFilters && "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            )}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {[
                  filters.dateRange.from && 1,
                  filters.dateRange.to && 1,
                  filters.status.length,
                  filters.category.length,
                  filters.amountRange.min && 1,
                  filters.amountRange.max && 1,
                ].filter(Boolean).reduce((a, b) => (a || 0) + (b || 0), 0)}
              </Badge>
            )}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 px-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                        {format(filters.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange.from}
                  selected={{
                    from: filters.dateRange.from,
                    to: filters.dateRange.to,
                  }}
                  onSelect={(range) =>
                    updateFilters({
                      dateRange: {
                        from: range?.from,
                        to: range?.to,
                      },
                    })
                  }
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <Select
              value={filters.status.join(",")}
              onValueChange={(value) =>
                updateFilters({
                  status: value ? value.split(",") : [],
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <Select
              value={filters.category.join(",")}
              onValueChange={(value) =>
                updateFilters({
                  category: value ? value.split(",") : [],
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.amountRange.min || ""}
                onChange={(e) =>
                  updateFilters({
                    amountRange: {
                      ...filters.amountRange,
                      min: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.amountRange.max || ""}
                onChange={(e) =>
                  updateFilters({
                    amountRange: {
                      ...filters.amountRange,
                      max: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 