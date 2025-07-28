"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sidebar } from "@/components/Sidebar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NotificationProvider, useNotifications } from "@/components/ui/notification";
import { DashboardSkeleton, PageSkeleton } from "@/components/ui/loading-skeleton";
import { MobileNav } from "@/components/MobileNav";
import { 
  FileText, 
  Download, 
  Plus, 
  Calendar,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";

// Mock data
const reportsData = {
  templates: [
    {
      id: 1,
      name: "Monthly Revenue Report",
      description: "Comprehensive monthly revenue analysis with trends and insights",
      category: "Revenue",
      lastUsed: "2024-01-15",
      usage: 24,
      icon: DollarSign
    },
    {
      id: 2,
      name: "User Growth Analysis",
      description: "Detailed user acquisition and retention metrics",
      category: "Users",
      lastUsed: "2024-01-10",
      usage: 18,
      icon: Users
    },
    {
      id: 3,
      name: "Campaign Performance",
      description: "Marketing campaign effectiveness and ROI analysis",
      category: "Marketing",
      lastUsed: "2024-01-12",
      usage: 31,
      icon: TrendingUp
    },
    {
      id: 4,
      name: "Conversion Funnel",
      description: "Step-by-step conversion analysis and optimization",
      category: "Analytics",
      lastUsed: "2024-01-08",
      usage: 15,
      icon: BarChart3
    }
  ],
  recentReports: [
    {
      id: 1,
      name: "Q4 2023 Revenue Report",
      status: "completed",
      generatedAt: "2024-01-15T10:30:00",
      size: "2.4 MB",
      format: "PDF",
      downloads: 12
    },
    {
      id: 2,
      name: "December User Analytics",
      status: "completed",
      generatedAt: "2024-01-14T14:20:00",
      size: "1.8 MB",
      format: "PDF",
      downloads: 8
    },
    {
      id: 3,
      name: "Holiday Campaign Report",
      status: "processing",
      generatedAt: "2024-01-15T09:15:00",
      size: "3.1 MB",
      format: "PDF",
      downloads: 0
    },
    {
      id: 4,
      name: "Annual Performance Summary",
      status: "failed",
      generatedAt: "2024-01-13T16:45:00",
      size: "0 MB",
      format: "PDF",
      downloads: 0
    }
  ]
};

function ReportsContent() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { showNotification } = useNotifications();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      showNotification({
        type: "success",
        title: "Reports Ready",
        message: "Your report templates and recent reports are loaded.",
        duration: 3000
      });
    }, 1000);
  }, [showNotification]);

  if (!mounted) {
    return <PageSkeleton />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-6 md:w-8 h-6 md:h-8 text-purple-600" />
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  {reportsData.recentReports.length} Reports
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <MobileNav />
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Report
                </Button>
                <ThemeToggle />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Revenue">Revenue</SelectItem>
                  <SelectItem value="Users">Users</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Report Templates */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Report Templates</h2>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportsData.templates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card key={template.id} className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-purple-600" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {template.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Used {template.usage} times</span>
                            <span>{template.lastUsed}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recent Reports */}
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {reportsData.recentReports.map((report) => (
                      <div key={report.id} className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {report.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>{formatDate(report.generatedAt)}</span>
                                <span>{report.size}</span>
                                <span>{report.format}</span>
                                <span>{report.downloads} downloads</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(report.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(report.status)}
                                <span className="capitalize">{report.status}</span>
                              </div>
                            </Badge>
                            
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Layout */}
                        <div className="md:hidden space-y-3">
                          {/* Header row with icon, name, and status */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                  {report.name}
                                </h3>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(report.status)} flex-shrink-0 ml-2`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(report.status)}
                                <span className="capitalize text-xs">{report.status}</span>
                              </div>
                            </Badge>
                          </div>
                          
                          {/* Details row */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 ml-13">
                            <span>{formatDate(report.generatedAt).split(',')[0]}</span>
                            <span>•</span>
                            <span>{report.size}</span>
                            <span>•</span>
                            <span>{report.format}</span>
                            <span>•</span>
                            <span>{report.downloads} downloads</span>
                          </div>
                          
                          {/* Actions row */}
                          <div className="flex items-center justify-end space-x-1 ml-13">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Schedule Report</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Set up automated reports</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Download raw data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Share Reports</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Collaborate with team</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default function ReportsPage() {
  return (
    <NotificationProvider>
      <ReportsContent />
    </NotificationProvider>
  );
} 