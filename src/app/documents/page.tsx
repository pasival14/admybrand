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
  Upload,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Share2,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive,
  Star,
  Clock,
  User,
  MoreHorizontal
} from "lucide-react";

// Mock data
const documentsData = {
  categories: [
    { id: 1, name: "All Documents", count: 156, icon: FileText },
    { id: 2, name: "Reports", count: 23, icon: FileText },
    { id: 3, name: "Images", count: 45, icon: Image },
    { id: 4, name: "Videos", count: 12, icon: Video },
    { id: 5, name: "Archives", count: 8, icon: Archive },
    { id: 6, name: "Favorites", count: 15, icon: Star }
  ],
  documents: [
    {
      id: 1,
      name: "Q4 Financial Report.pdf",
      type: "pdf",
      size: "2.4 MB",
      category: "Reports",
      uploadedBy: "Jonathan Deo",
      uploadedAt: "2024-01-15T10:30:00",
      lastModified: "2024-01-15T10:30:00",
      downloads: 12,
      starred: true
    },
    {
      id: 2,
      name: "Marketing Strategy.docx",
      type: "docx",
      size: "1.8 MB",
      category: "Reports",
      uploadedBy: "Sarah Wilson",
      uploadedAt: "2024-01-14T14:20:00",
      lastModified: "2024-01-14T16:45:00",
      downloads: 8,
      starred: false
    },
    {
      id: 3,
      name: "Product Screenshots.png",
      type: "png",
      size: "3.1 MB",
      category: "Images",
      uploadedBy: "Mike Johnson",
      uploadedAt: "2024-01-15T09:15:00",
      lastModified: "2024-01-15T09:15:00",
      downloads: 5,
      starred: true
    },
    {
      id: 4,
      name: "Company Logo.svg",
      type: "svg",
      size: "156 KB",
      category: "Images",
      uploadedBy: "Design Team",
      uploadedAt: "2024-01-13T16:45:00",
      lastModified: "2024-01-13T16:45:00",
      downloads: 23,
      starred: false
    },
    {
      id: 5,
      name: "Product Demo.mp4",
      type: "mp4",
      size: "15.2 MB",
      category: "Videos",
      uploadedBy: "Video Team",
      uploadedAt: "2024-01-12T11:30:00",
      lastModified: "2024-01-12T11:30:00",
      downloads: 18,
      starred: false
    },
    {
      id: 6,
      name: "Backup Data.zip",
      type: "zip",
      size: "45.6 MB",
      category: "Archives",
      uploadedBy: "IT Team",
      uploadedAt: "2024-01-11T08:00:00",
      lastModified: "2024-01-11T08:00:00",
      downloads: 3,
      starred: false
    }
  ]
};

function DocumentsContent() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { showNotification } = useNotifications();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      showNotification({
        type: "success",
        title: "Documents Loaded",
        message: "Your documents are ready for viewing and management.",
        duration: 3000
      });
    }, 1000);
  }, [showNotification]);

  if (!mounted) {
    return <PageSkeleton />;
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "docx":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "png":
      case "jpg":
      case "svg":
        return <Image className="w-5 h-5 text-green-500" />;
      case "mp4":
      case "avi":
        return <Video className="w-5 h-5 text-purple-500" />;
      case "zip":
      case "rar":
        return <Archive className="w-5 h-5 text-orange-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredDocuments = documentsData.documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
                  <FileText className="w-6 md:w-8 h-6 md:h-8 text-green-600" />
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  {documentsData.documents.length} Files
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <MobileNav />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Folder
                </Button>
                <ThemeToggle />
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  <SelectItem value="Reports">Reports</SelectItem>
                  <SelectItem value="Images">Images</SelectItem>
                  <SelectItem value="Videos">Videos</SelectItem>
                  <SelectItem value="Archives">Archives</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="w-full sm:w-auto"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </Button>

              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {documentsData.categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.id} 
                    className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {category.count} files
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {filteredDocuments.length} Documents
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow group">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              {getFileIcon(doc.type)}
                            </div>
                            <div className="flex items-center space-x-1">
                              {doc.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {doc.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {doc.size} • {doc.category}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(doc.uploadedAt)}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {doc.downloads} downloads
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              {getFileIcon(doc.type)}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {doc.name}
                                </h3>
                                {doc.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>{doc.size}</span>
                                <span>{doc.category}</span>
                                <span>By {doc.uploadedBy}</span>
                                <span>{formatDate(doc.uploadedAt)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {doc.downloads} downloads
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
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Upload Files</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Drag and drop or click to upload</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Folder className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Create Folder</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Organize your documents</p>
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
                      <h3 className="font-medium text-gray-900 dark:text-white">Share Documents</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Collaborate with your team</p>
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

export default function DocumentsPage() {
  return (
    <NotificationProvider>
      <DocumentsContent />
    </NotificationProvider>
  );
} 