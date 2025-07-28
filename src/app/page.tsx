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
  Code, 
  Copy, 
  Play,
  Download,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  AlertTriangle,
  Clock,
  Activity,
  Zap,
  Database,
  Globe,
  Shield,
  Key,
  Settings,
  BookOpen,
  Terminal,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Server,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Mock data
const apiData = {
  endpoints: [
    {
      id: 1,
      name: "Get Analytics Data",
      method: "GET",
      path: "/api/v1/analytics",
      description: "Retrieve analytics data for the dashboard",
      status: "active",
      requests: 12450,
      avgResponseTime: 245,
      successRate: 99.2,
      lastUsed: "2 minutes ago"
    },
    {
      id: 2,
      name: "Create Report",
      method: "POST",
      path: "/api/v1/reports",
      description: "Generate a new analytics report",
      status: "active",
      requests: 8920,
      avgResponseTime: 1200,
      successRate: 98.5,
      lastUsed: "5 minutes ago"
    },
    {
      id: 3,
      name: "Update User",
      method: "PUT",
      path: "/api/v1/users/{id}",
      description: "Update user information",
      status: "active",
      requests: 5670,
      avgResponseTime: 180,
      successRate: 99.8,
      lastUsed: "1 hour ago"
    },
    {
      id: 4,
      name: "Delete Document",
      method: "DELETE",
      path: "/api/v1/documents/{id}",
      description: "Remove a document from the system",
      status: "deprecated",
      requests: 2340,
      avgResponseTime: 320,
      successRate: 97.1,
      lastUsed: "3 hours ago"
    }
  ],
  usage: {
    totalRequests: 29480,
    avgResponseTime: 436,
    successRate: 98.9,
    activeUsers: 156,
    peakRequests: 1250
  },
  documentation: {
    baseUrl: "https://api.admyrrand.com/v1",
    authType: "Bearer Token",
    rateLimit: "1000 requests/hour",
    version: "1.2.0"
  }
};

function ApiContent() {
  const [mounted, setMounted] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [showApiInfo, setShowApiInfo] = useState(false);
  const [showTesting, setShowTesting] = useState(false);
  const { showNotification } = useNotifications();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      showNotification({
        type: "success",
        title: "API Documentation Loaded",
        message: "Your API endpoints and documentation are ready.",
        duration: 3000
      });
    }, 1000);
  }, [showNotification]);

  if (!mounted) {
    return <PageSkeleton />;
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "POST":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "PUT":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "DELETE":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "deprecated":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const filteredEndpoints = apiData.endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         endpoint.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = methodFilter === "all" || endpoint.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-3 md:p-6 space-y-4 md:space-y-6">
            {/* Header - Mobile Optimized */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="w-6 h-6 text-purple-600" />
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">API</h1>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs">
                    v{apiData.documentation.version}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 sm:hidden">
                  <MobileNav />
                  <ThemeToggle />
                </div>
              </div>
              
              {/* Mobile action buttons */}
              <div className="flex flex-col space-y-2 sm:hidden">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    SDK
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Plus className="w-4 h-4 mr-1" />
                    New
                  </Button>
                </div>
              </div>
              
              {/* Desktop action buttons */}
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download SDK
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Endpoint
                </Button>
                <ThemeToggle />
              </div>
            </div>

            {/* API Overview - Mobile Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Requests</CardTitle>
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {(apiData.usage.totalRequests / 1000).toFixed(1)}k
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Response</CardTitle>
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {apiData.usage.avgResponseTime}ms
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingDown className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">-8.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Success</CardTitle>
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {apiData.usage.successRate}%
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+0.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Users</CardTitle>
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {apiData.usage.activeUsers}
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+5.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile-first layout for main content */}
            <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
              {/* Endpoints List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Endpoints</h2>
                  <div className="flex items-center space-x-2">
                    <Select value={methodFilter} onValueChange={setMethodFilter}>
                      <SelectTrigger className="w-28 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredEndpoints.map((endpoint) => (
                    <Card 
                      key={endpoint.id} 
                      className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedEndpoint(endpoint.id)}
                    >
                      <CardContent className="p-3 md:p-4">
                        {/* Mobile layout - stacked */}
                        <div className="space-y-3 sm:space-y-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                              <Badge className={`${getMethodColor(endpoint.method)} text-xs shrink-0`}>
                                {endpoint.method}
                              </Badge>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                  {endpoint.name}
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono truncate">
                                  {endpoint.path}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 shrink-0">
                              <Badge className={`${getStatusColor(endpoint.status)} text-xs`}>
                                {endpoint.status}
                              </Badge>
                              <div className="text-right hidden sm:block">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {endpoint.requests.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  requests
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Mobile stats row */}
                          <div className="flex items-center justify-between sm:hidden">
                            <div className="text-xs text-gray-900 dark:text-white font-medium">
                              {endpoint.requests.toLocaleString()} requests
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                              <span>{endpoint.avgResponseTime}ms</span>
                              <span>{endpoint.successRate}%</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {endpoint.description}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                              <span className="hidden sm:inline">{endpoint.avgResponseTime}ms avg</span>
                              <span className="hidden sm:inline">{endpoint.successRate}% success</span>
                              <span>{endpoint.lastUsed}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                                <Play className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                                <MoreHorizontal className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* API Info - Collapsible on mobile */}
              <div className="space-y-4">
                <div className="lg:hidden">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setShowApiInfo(!showApiInfo)}
                  >
                    API Information
                    {showApiInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
                
                <div className={`space-y-4 ${showApiInfo ? 'block' : 'hidden lg:block'}`}>
                  <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                    <CardHeader className="hidden lg:block">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">API Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400 block">Base URL</span>
                          <span className="text-sm font-mono text-gray-900 dark:text-white break-all">{apiData.documentation.baseUrl}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Authentication</span>
                          <span className="text-sm text-gray-900 dark:text-white">{apiData.documentation.authType}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Rate Limit</span>
                          <span className="text-sm text-gray-900 dark:text-white">{apiData.documentation.rateLimit}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Version</span>
                          <span className="text-sm text-gray-900 dark:text-white">{apiData.documentation.version}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button className="w-full">
                          <Key className="w-4 h-4 mr-2" />
                          Generate API Key
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                    <CardHeader className="hidden lg:block">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Documentation
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Terminal className="w-4 h-4 mr-2" />
                        API Playground
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Usage Analytics
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        API Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* API Testing - Collapsible on mobile */}
            <div className="space-y-4">
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setShowTesting(!showTesting)}
                >
                  API Testing
                  {showTesting ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
              
              <Card className={`bg-white dark:bg-gray-800 border-0 shadow-sm ${showTesting ? 'block' : 'hidden lg:block'}`}>
                <CardHeader className="hidden lg:block">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">API Testing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <Select defaultValue="GET">
                        <SelectTrigger className="w-full sm:w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <input
                        type="text"
                        placeholder="Enter endpoint URL..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        defaultValue={`${apiData.documentation.baseUrl}/analytics`}
                      />
                      
                      <Button className="w-full sm:w-auto">
                        <Play className="w-4 h-4 mr-2" />
                        Test
                      </Button>
                    </div>
                    
                    <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Headers
                        </label>
                        <textarea
                          className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          placeholder="Content-Type: application/json&#10;Authorization: Bearer YOUR_API_KEY"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Response
                        </label>
                        <div className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono overflow-auto">
                          {`{
                            "status": "success",
                            "data": {
                              "message": "API response will appear here"
                            }
                          }`}
                        </div>
                      </div>
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

export default function ApiPage() {
  return (
    <NotificationProvider>
      <ApiContent />
    </NotificationProvider>
  );
}