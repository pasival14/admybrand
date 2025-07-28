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
  Mail, 
  Send, 
  Plus, 
  Search,
  Filter,
  MoreHorizontal,
  User,
  Users,
  MessageCircle,
  Bell,
  Star,
  Archive,
  Trash2,
  Edit,
  Reply,
  Forward,
  Clock,
  Check,
  CheckCheck,
  Paperclip,
  Smile,
  Mic,
  Video,
  Phone,
  Settings,
  ArrowLeft,
  ChevronLeft
} from "lucide-react";

// Mock data
const messagesData = {
  conversations: [
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "SW",
      lastMessage: "The quarterly report is ready for review",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      status: "active"
    },
    {
      id: 2,
      name: "Marketing Team",
      avatar: "MT",
      lastMessage: "New campaign performance data uploaded",
      timestamp: "15 min ago",
      unread: 0,
      online: false,
      status: "group"
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "MJ",
      lastMessage: "Can you review the latest design mockups?",
      timestamp: "1 hour ago",
      unread: 1,
      online: true,
      status: "active"
    },
    {
      id: 4,
      name: "Development Team",
      avatar: "DT",
      lastMessage: "API integration completed successfully",
      timestamp: "2 hours ago",
      unread: 0,
      online: false,
      status: "group"
    },
    {
      id: 5,
      name: "Emily Davis",
      avatar: "ED",
      lastMessage: "Meeting scheduled for tomorrow at 10 AM",
      timestamp: "3 hours ago",
      unread: 0,
      online: false,
      status: "away"
    }
  ],
  messages: [
    {
      id: 1,
      sender: "Sarah Wilson",
      content: "Hi Jonathan! The quarterly report is ready for review. Can you take a look when you have time?",
      timestamp: "10:30 AM",
      status: "read",
      type: "received"
    },
    {
      id: 2,
      sender: "You",
      content: "Perfect! I'll review it this afternoon. Thanks for getting it done early.",
      timestamp: "10:32 AM",
      status: "read",
      type: "sent"
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      content: "Great! I've highlighted the key metrics and trends. Let me know if you need any clarification.",
      timestamp: "10:33 AM",
      status: "read",
      type: "received"
    },
    {
      id: 4,
      sender: "You",
      content: "Will do. I'll send you my feedback by end of day.",
      timestamp: "10:35 AM",
      status: "sent",
      type: "sent"
    },
    {
      id: 5,
      sender: "Sarah Wilson",
      content: "Sounds good! Looking forward to your insights.",
      timestamp: "10:36 AM",
      status: "sent",
      type: "received"
    }
  ]
};

function MessagesContent() {
  const [mounted, setMounted] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showConversations, setShowConversations] = useState(true);
  const { showNotification } = useNotifications();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      showNotification({
        type: "success",
        title: "Messages Loaded",
        message: "Your conversations are ready.",
        duration: 3000
      });
    }, 1000);
  }, [showNotification]);

  if (!mounted) {
    return <PageSkeleton />;
  }

  const currentConversation = messagesData.conversations.find(conv => conv.id === selectedConversation);
  const currentMessages = messagesData.messages;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("");
      showNotification({
        type: "success",
        title: "Message Sent",
        message: "Your message has been delivered.",
        duration: 2000
      });
    }
  };

  const handleConversationSelect = (conversationId: number) => {
    setSelectedConversation(conversationId);
    // On mobile, switch to chat view
    if (window.innerWidth < 768) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Conversations Sidebar */}
            <div className={`${
              showConversations ? 'block' : 'hidden'
              } md:block w-full md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
              {/* Header */}
              <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
                    <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Messages</h1>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                    <div className="hidden md:block">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 md:hidden">
                  <MobileNav />
                </div>
                
                {/* Search */}
                <div className="mt-3 md:mt-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {messagesData.conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 md:p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {conversation.avatar}
                        </div>
                        {conversation.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm md:text-base">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      
                      {conversation.unread > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs flex-shrink-0">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`${
              !showConversations ? 'block' : 'hidden'
              } md:block flex-1 flex flex-col`}>
              {/* Chat Header */}
              {currentConversation && (
                <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Back button for mobile */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="md:hidden p-1"
                        onClick={handleBackToConversations}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      
                      <div className="relative">
                        <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {currentConversation.avatar}
                        </div>
                        {currentConversation.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 md:w-3 h-2.5 md:h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                          {currentConversation.name}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                          {currentConversation.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="hidden sm:flex">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hidden sm:flex">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-lg ${
                      message.type === 'sent' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm md:text-base">{message.content}</p>
                      <div className={`flex items-center justify-between mt-1 text-xs ${
                        message.type === 'sent' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        <span>{message.timestamp}</span>
                        {message.type === 'sent' && (
                          <div className="flex items-center space-x-1 ml-2">
                            {message.status === 'read' ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full px-3 md:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default function MessagesPage() {
  return (
    <NotificationProvider>
      <MessagesContent />
    </NotificationProvider>
  );
}