"use client";

import { KeyMetricCard } from "@/components/KeyMetricCard";
import { ChartCard } from "@/components/ChartCard";
import { keyMetrics, revenueData, conversionSourceData } from "@/data/mock-data";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { payments } from "@/data/mock-table-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Sidebar } from "@/components/Sidebar";
import { InteractivePieChart } from "@/components/InteractivePieChart";
import { CampaignBarChart } from "@/components/charts/BarChart";
import { UserEngagementAreaChart } from "@/components/charts/AreaChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { AdvancedDataTable } from "@/components/dashboard/AdvancedDataTable";
import { RealTimeUpdates } from "@/components/dashboard/RealTimeUpdates";
import { Filters } from "@/components/dashboard/Filters";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { AnimatedChartCard } from "@/components/charts/AnimatedChartCard";
import { NotificationProvider, useNotifications } from "@/components/ui/notification";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Users, Target, Megaphone, TrendingDown, Menu } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { useEffect, useState } from "react";

// Import components from the recharts library
import dynamic from 'next/dynamic'

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false })
const LineChart = dynamic(() => import('recharts').then(mod => ({ default: mod.LineChart })), { ssr: false })
const Line = dynamic(() => import('recharts').then(mod => ({ default: mod.Line })), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.XAxis })), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(mod => ({ default: mod.YAxis })), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(mod => ({ default: mod.Tooltip })), { ssr: false })

function DashboardContent() {
  const [mounted, setMounted] = useState(false);
  const { showNotification } = useNotifications();

  useEffect(() => {
    setMounted(true);
    
    // Show welcome notification - automatically closes after 5 seconds
    setTimeout(() => {
      showNotification({
        type: "success",
        title: "Welcome to Admyrrand Analytics!",
        message: "Your dashboard is ready with real-time data and insights.",
        duration: 5000
      });
    }, 1000);
  }, [showNotification]);

  if (!mounted) {
    return <DashboardSkeleton />;
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Dashboard Analytics</h1>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <MobileNav />
                  <ExportButton data={payments} filename="dashboard-transactions" />
                </div>
                <ThemeToggle />
              </div>
            </div>

            {/* Top Section - Welcome Card and Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Welcome Card - Large Blue Card */}
              <div className="md:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 md:p-6 text-white shadow-lg relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 bg-white rounded-full -translate-y-8 md:-translate-y-16 translate-x-8 md:translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-12 md:w-24 h-12 md:h-24 bg-white rounded-full translate-y-6 md:translate-y-12 -translate-x-6 md:-translate-x-12"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 md:mb-6 space-y-4 sm:space-y-0">
                    <div className="space-y-2">
                      <h2 className="text-xl md:text-2xl font-bold">Welcome Jonathan Deo</h2>
                      <p className="text-blue-100 text-sm">Here's what's happening with your business today</p>
                    </div>
                    <div className="relative">
                      <div className="w-16 md:w-20 h-16 md:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Megaphone className="w-8 md:w-10 h-8 md:h-10 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 md:w-6 h-4 md:h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <div className="w-1 md:w-2 h-1 md:h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                    <div className="bg-white/20 rounded-lg p-3 md:p-4 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-blue-100 text-xs font-medium">New Leads</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-lg md:text-2xl font-bold">573</div>
                      <div className="text-blue-100 text-xs">+12% from last week</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 md:p-4 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-blue-100 text-xs font-medium">Conversion Rate</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-lg md:text-2xl font-bold">87%</div>
                      <div className="text-blue-100 text-xs">+5% from last month</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-blue-100">System Status: All Good</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-xs text-blue-100">Active Campaigns</div>
                        <div className="font-semibold">12</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-blue-100">Today's Revenue</div>
                        <div className="font-semibold">$8,432</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="space-y-4">
        <KeyMetricCard
                  title="Sales"
                  value="2358"
                  description="Total sales this month"
                  trend="+23%"
                  trendUp={true}
                  icon={<TrendingUp className="w-4 h-4" />}
                  color="pink"
        />
        <KeyMetricCard
                  title="Refunds"
                  value="434"
                  description="Total refunds processed"
                  trend="-12%"
                  trendUp={false}
                  icon={<TrendingDown className="w-4 h-4" />}
                  color="purple"
                />
              </div>

              <div className="space-y-4">
        <KeyMetricCard
                  title="Earnings"
                  value="$245k"
                  description="Total earnings this month"
                  trend="+8%"
                  trendUp={true}
                  icon={<DollarSign className="w-4 h-4" />}
                  color="green"
                />
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Quick Stats</div>
                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
                      <span className="font-semibold text-gray-900 dark:text-white">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Session</span>
                      <span className="font-semibold text-gray-900 dark:text-white">4m 32s</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Performance</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-600 dark:text-green-400">Good</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Sales Profit Chart */}
              <AnimatedChartCard 
                title="Sales Profit" 
                description="Monthly profit and expenses overview"
                trend={{ value: 8.5, direction: "up", period: "last month" }}
              >
                <div className="space-y-4">
                  {/* Chart Toggle Buttons */}
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
                      Profit
                    </button>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-medium">
                      Expenses
                    </button>
                  </div>
                  
                  {/* Chart */}
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `${value}`} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        fill="#3B82F6"
                        fillOpacity={0.1}
                        activeDot={{ r: 6, fill: "#3B82F6" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#9CA3AF" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        activeDot={{ r: 4, fill: "#9CA3AF" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  {/* Summary Stats */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">$63,489.50 +8%</div>
                        <div className="text-xs text-gray-500">Profit this year</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium">$38,496.00</div>
                        <div className="text-xs text-gray-500">Profit last year</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* View Details Button */}
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </AnimatedChartCard>

              {/* Product Sales Chart */}
              <AnimatedChartCard 
                title="Product Sales" 
                description="This is overview of the sales happened this month for the material website"
                trend={{ value: 12.3, direction: "up", period: "last month" }}
              >
                <DonutChart />
              </AnimatedChartCard>
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <AnimatedChartCard 
                title="User Engagement" 
                description="Monthly user activity trends"
                trend={{ value: 15.3, direction: "up", period: "last month" }}
              >
                <UserEngagementAreaChart />
              </AnimatedChartCard>

              <AnimatedChartCard 
                title="Campaign Performance" 
                description="Revenue vs Spend by Channel"
                trend={{ value: 6.7, direction: "up", period: "last quarter" }}
              >
                <CampaignBarChart />
              </AnimatedChartCard>

              <AnimatedChartCard 
                title="Conversion Sources" 
                description="Traffic sources breakdown"
                trend={{ value: 8.2, direction: "up", period: "last week" }}
              >
                <InteractivePieChart />
              </AnimatedChartCard>
            </div>

            {/* Filters and Data Table Section */}
            <div className="space-y-4">
              <Filters />
              <AdvancedDataTable />
            </div>

            {/* Real-time Updates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <RealTimeUpdates />
              <div className="bg-white dark:bg-gray-800 border-0 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button 
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    onClick={() => showNotification({
                      type: "info",
                      title: "Report Generation",
                      message: "Your comprehensive analytics report is being generated...",
                      duration: 3000
                    })}
                  >
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      Generate Report
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                      Create a comprehensive analytics report
                    </div>
                  </button>
                  <button 
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    onClick={() => showNotification({
                      type: "success",
                      title: "Export Scheduled",
                      message: "Daily data export has been scheduled successfully.",
                      duration: 3000
                    })}
                  >
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      Schedule Export
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                      Set up automated data exports
                    </div>
                  </button>
                  <button 
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    onClick={() => showNotification({
                      type: "warning",
                      title: "Share Dashboard",
                      message: "Dashboard sharing feature is coming soon!",
                      duration: 3000
                    })}
                  >
                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      Share Dashboard
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                      Share this dashboard with your team
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default function Home() {
  return (
    <NotificationProvider>
      <DashboardContent />
    </NotificationProvider>
  );
}