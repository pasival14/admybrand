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
  Settings, 
  User, 
  Shield, 
  Bell, 
  Globe,
  Palette,
  Database,
  Key,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
  Check,
  AlertTriangle,
  Clock,
  Activity,
  Zap,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Smartphone,
  Monitor,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileText
} from "lucide-react";

// Mock data
const settingsData = {
  profile: {
    name: "Jonathan Deo",
    email: "jonathan.deo@admyrrand.com",
    role: "Administrator",
    avatar: "JD",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    language: "English",
    currency: "USD"
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "2024-01-10",
    lastLogin: "2024-01-15T10:30:00",
    loginHistory: [
      { date: "2024-01-15T10:30:00", device: "Chrome on MacBook Pro", location: "San Francisco, CA" },
      { date: "2024-01-14T15:20:00", device: "Safari on iPhone", location: "San Francisco, CA" },
      { date: "2024-01-13T09:15:00", device: "Chrome on Windows", location: "New York, NY" }
    ]
  },
  preferences: {
    theme: "system",
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    dashboard: {
      defaultView: "analytics",
      refreshInterval: 30,
      showRealTimeUpdates: true
    }
  }
};

function SettingsContent() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const { showNotification } = useNotifications();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      showNotification({
        type: "success",
        title: "Settings Loaded",
        message: "Your settings and preferences are ready.",
        duration: 3000
      });
    }, 1000);
  }, [showNotification]);

  if (!mounted) {
    return <PageSkeleton />;
  }

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "preferences", name: "Preferences", icon: Palette },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "integrations", name: "Integrations", icon: Zap }
  ];

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
                  <Settings className="w-6 md:w-8 h-6 md:h-8 text-gray-600" />
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                  {settingsData.profile.role}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <MobileNav />
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <ThemeToggle />
              </div>
            </div>

            {/* Settings Tabs */}
            <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 md:w-4 h-3 md:h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingProfile(!editingProfile)}
                      >
                        {editingProfile ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                        {editingProfile ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {settingsData.profile.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {settingsData.profile.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{settingsData.profile.role}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{settingsData.profile.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={settingsData.profile.name}
                            disabled={!editingProfile}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            defaultValue={settingsData.profile.email}
                            disabled={!editingProfile}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            defaultValue={settingsData.profile.phone}
                            disabled={!editingProfile}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            defaultValue={settingsData.profile.location}
                            disabled={!editingProfile}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Timezone
                          </label>
                          <Select defaultValue={settingsData.profile.timezone} disabled={!editingProfile}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                              <SelectItem value="America/New_York">Eastern Time</SelectItem>
                              <SelectItem value="Europe/London">London</SelectItem>
                              <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language
                          </label>
                          <Select defaultValue={settingsData.profile.language} disabled={!editingProfile}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                              <SelectItem value="German">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {editingProfile && (
                      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="outline" onClick={() => setEditingProfile(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          setEditingProfile(false);
                          showNotification({
                            type: "success",
                            title: "Profile Updated",
                            message: "Your profile information has been saved.",
                            duration: 3000
                          });
                        }}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Enabled
                          </Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Key className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Change Password</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Last changed {formatDate(settingsData.security.lastPasswordChange)}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Login History</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">View recent login activity</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">App Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Theme
                        </label>
                        <Select defaultValue={settingsData.preferences.theme}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Default Dashboard View
                        </label>
                        <Select defaultValue={settingsData.preferences.dashboard.defaultView}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="analytics">Analytics</SelectItem>
                            <SelectItem value="reports">Reports</SelectItem>
                            <SelectItem value="documents">Documents</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Data Refresh Interval (seconds)
                        </label>
                        <Select defaultValue={settingsData.preferences.dashboard.refreshInterval.toString()}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">1 minute</SelectItem>
                            <SelectItem value="300">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Real-time Updates</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Show live data updates on dashboard</p>
                        </div>
                        <Button 
                          variant={settingsData.preferences.dashboard.showRealTimeUpdates ? "default" : "outline"}
                          size="sm"
                        >
                          {settingsData.preferences.dashboard.showRealTimeUpdates ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
                          </div>
                        </div>
                        <Button 
                          variant={settingsData.preferences.notifications.email ? "default" : "outline"}
                          size="sm"
                        >
                          {settingsData.preferences.notifications.email ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-green-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive browser notifications</p>
                          </div>
                        </div>
                        <Button 
                          variant={settingsData.preferences.notifications.push ? "default" : "outline"}
                          size="sm"
                        >
                          {settingsData.preferences.notifications.push ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-purple-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via SMS</p>
                          </div>
                        </div>
                        <Button 
                          variant={settingsData.preferences.notifications.sms ? "default" : "outline"}
                          size="sm"
                        >
                          {settingsData.preferences.notifications.sms ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Current Plan</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Professional Plan - $99/month</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Next Billing Date</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">February 15, 2024</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Invoice
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-purple-600" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Payment Method</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Visa ending in 4242</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Integrations Settings */}
            {activeTab === "integrations" && (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Connected Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Database className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Google Analytics</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Connected for data insights</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <Globe className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Slack</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Send notifications to Slack</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Mailchimp</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email marketing integration</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default function SettingsPage() {
  return (
    <NotificationProvider>
      <SettingsContent />
    </NotificationProvider>
  );
} 