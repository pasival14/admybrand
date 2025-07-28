"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, Filter, MoreHorizontal, Search } from "lucide-react"

const transactionData = [
  {
    id: "1",
    customer: "John Smith",
    email: "john@example.com",
    amount: 1250.00,
    status: "completed",
    date: "2024-01-15",
    method: "Credit Card",
    category: "Marketing",
  },
  {
    id: "2",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    amount: 850.50,
    status: "pending",
    date: "2024-01-14",
    method: "PayPal",
    category: "Development",
  },
  {
    id: "3",
    customer: "Mike Davis",
    email: "mike@example.com",
    amount: 2100.00,
    status: "completed",
    date: "2024-01-13",
    method: "Bank Transfer",
    category: "Consulting",
  },
  {
    id: "4",
    customer: "Emily Wilson",
    email: "emily@example.com",
    amount: 750.25,
    status: "failed",
    date: "2024-01-12",
    method: "Credit Card",
    category: "Marketing",
  },
  {
    id: "5",
    customer: "David Brown",
    email: "david@example.com",
    amount: 1800.00,
    status: "completed",
    date: "2024-01-11",
    method: "PayPal",
    category: "Development",
  },
  {
    id: "6",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    amount: 950.75,
    status: "pending",
    date: "2024-01-10",
    method: "Bank Transfer",
    category: "Consulting",
  },
  {
    id: "7",
    customer: "Tom Martinez",
    email: "tom@example.com",
    amount: 3200.00,
    status: "completed",
    date: "2024-01-09",
    method: "Credit Card",
    category: "Marketing",
  },
  {
    id: "8",
    customer: "Anna Garcia",
    email: "anna@example.com",
    amount: 1400.50,
    status: "completed",
    date: "2024-01-08",
    method: "PayPal",
    category: "Development",
  },
]

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <div className="font-medium">{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-gray-600">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === "completed" ? "bg-green-100 text-green-800" :
          status === "pending" ? "bg-yellow-100 text-yellow-800" :
          "bg-red-100 text-red-800"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="text-gray-600">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "method",
    header: "Payment Method",
    cell: ({ row }) => <div className="text-gray-600">{row.getValue("method")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="text-gray-600">{row.getValue("category")}</div>,
  },
]

interface AdvancedDataTableProps {
  title?: string
  description?: string
  className?: string
}

export function AdvancedDataTable({ 
  title = "Recent Transactions", 
  description = "Detailed transaction history with advanced filtering",
  className 
}: AdvancedDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: transactionData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const exportToCSV = () => {
    const headers = columns.map(col => col.header).join(',')
    const rows = transactionData.map(row => 
      Object.values(row).join(',')
    ).join('\n')
    const csv = `${headers}\n${rows}`
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className={`bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow ${className || ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {description}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="h-8 px-3"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search transactions..."
                value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("customer")?.setFilterValue(event.target.value)
                }
                className="pl-8 bg-gray-50 dark:bg-gray-700 border-0"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 px-3">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="overflow-auto max-h-96">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-gray-200 dark:border-gray-700">
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="text-gray-900 dark:text-white">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-gray-500 dark:text-gray-400"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {table.getFilteredRowModel().rows.length} of {transactionData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 