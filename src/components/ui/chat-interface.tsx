'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2, Plus, ChevronDown, Settings, Zap, Brain, Sparkles, MessageSquare, Palette, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
  model?: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  lastActivity: Date
  model: string
}

const AVAILABLE_MODELS = [
  { id: 'claude-3.5-sonnet', name: 'Claude Sonnet 3.5', icon: Brain, description: 'Advanced reasoning' },
  { id: 'gpt-4', name: 'GPT-4', icon: Sparkles, description: 'Creative and versatile' },
  { id: 'gemini-pro', name: 'Gemini Pro', icon: MessageSquare, description: 'Google\'s latest' }
]

const AVAILABLE_MODES = [
  { id: 'code', name: 'Code', icon: Zap, description: 'Coding assistance' },
  { id: 'chat', name: 'Chat', icon: MessageSquare, description: 'General conversation' },
  { id: 'design', name: 'Design', icon: Palette, description: 'Design guidance' }
]

interface ChatInterfaceProps {
  className?: string
  onToggle?: (isOpen: boolean) => void
}

export function ChatInterface({ className, onToggle }: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState('')
  const [selectedModel, setSelectedModel] = useState('claude-3.5-sonnet')
  const [selectedMode, setSelectedMode] = useState('code')
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showConversations, setShowConversations] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId)
  const messages = activeConversation?.messages || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeConversation) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      model: selectedModel
    }

    setConversations(prev => prev.map(conv => 
      conv.id === activeConversationId 
        ? { ...conv, messages: [...conv.messages, userMessage], lastActivity: new Date() }
        : conv
    ))
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue, selectedModel),
        sender: 'assistant',
        timestamp: new Date(),
        model: selectedModel
      }
      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, messages: [...conv.messages, assistantMessage], lastActivity: new Date() }
          : conv
      ))
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (input: string, model: string): string => {
    const modelResponses = {
      'claude-3.5-sonnet': [
        "I'll analyze this systematically. Based on your query about spatial computing, here's my detailed assessment...",
        "Let me break down this complex problem into manageable components and provide a comprehensive solution.",
        "This is an interesting challenge in 3D development. I'll provide both the theoretical background and practical implementation."
      ],
      'gpt-4': [
        "Great question! I love helping with creative spatial computing projects. Here's an innovative approach...",
        "That's a fascinating use case! Let me suggest some creative solutions that might work well for your project.",
        "I can see several interesting possibilities here. Let me walk you through some creative approaches."
      ],
      'gemini-pro': [
        "I can assist with that spatial computing challenge. Let me provide a comprehensive analysis with multiple perspectives...",
        "That's an excellent question about 3D development. Here's what Google's research suggests as best practices...",
        "Based on the latest developments in spatial computing, here's what I recommend..."
      ]
    }
    const responses = modelResponses[model as keyof typeof modelResponses] || modelResponses['claude-3.5-sonnet']
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `New Chat ${conversations.length + 1}`,
      model: selectedModel,
      lastActivity: new Date(),
      messages: []
    }
    setConversations(prev => [newConversation, ...prev])
    setActiveConversationId(newConversation.id)
    setShowConversations(false)
  }

  const switchConversation = (conversationId: string) => {
    setActiveConversationId(conversationId)
    setShowConversations(false)
  }

  const getModelInfo = (modelId: string) => {
    return AVAILABLE_MODELS.find(m => m.id === modelId) || AVAILABLE_MODELS[0]
  }

  const getModeInfo = (modeId: string) => {
    return AVAILABLE_MODES.find(m => m.id === modeId) || AVAILABLE_MODES[0]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const handleToggle = (newIsOpen: boolean) => {
    setIsOpen(newIsOpen)
    if (newIsOpen && !hasInteracted) {
      setHasInteracted(true)
    }
    onToggle?.(newIsOpen)
  }

  if (!isOpen) {
    return (
      <div
        onClick={() => handleToggle(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 cursor-pointer group",
          className
        )}
      >
        <div className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 flex items-center space-x-2 min-w-fit border border-primary/20">
          <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
          <span className="text-xs font-medium whitespace-nowrap">
            {hasInteracted ? "Odyssey Studio" : "Try Odyssey Studio"}
          </span>
        </div>
      </div>
    )
  }

  // Empty state - Simple splash screen with input
  if (!activeConversation || messages.length === 0) {
    return (
      <div className={cn(
        "h-full z-40 transition-all duration-300 ease-out w-[640px]",
        className
      )}>
        <Card className="h-full border-l border-0 border-l-border rounded-none flex flex-col bg-card">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3 flex-1">
              {/* Conversations dropdown - moved to top left */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConversations(!showConversations)}
                className="h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Conversations
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggle(false)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Conversation Switcher */}
          {showConversations && (
            <div className="border-b border-border bg-muted/20">
              <ScrollArea className="max-h-48">
                <div className="p-2 space-y-1">
                  {conversations.map((conversation) => (
                    <Button
                      key={conversation.id}
                      variant={conversation.id === activeConversationId ? "secondary" : "ghost"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => switchConversation(conversation.id)}
                    >
                      <div className="flex items-center space-x-2 w-full">
                        <div className="p-1 rounded bg-primary/10">
                          {React.createElement(getModelInfo(conversation.model).icon, { className: "h-3 w-3 text-primary" })}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium truncate">{conversation.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {conversation.messages.length} messages • {getModelInfo(conversation.model).name}
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Main Content - Centered Splash */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
            <div className="text-center space-y-6 max-w-lg relative z-10">
              <div className="mx-auto w-20 h-20 flex items-center justify-center">
                <img src="/odyssey-studio-logo.svg" alt="Odyssey Studio" className="w-20 h-20" />
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-foreground">Odyssey Studio</h1>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Start a new project or work across<br />your entire integrated development platform.
                </p>
              </div>
            </div>
          </div>

          {/* Input Section - Always Present */}
          <div className="p-4 bg-white dark:bg-card relative z-20">
            <div className="relative mb-3">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    if (!activeConversation) {
                      createNewConversation()
                    }
                    handleSendMessage()
                  }
                }}
                placeholder="Ask anything (⌘L), @ to mention code blocks"
                className="w-full h-24 bg-input border-border text-foreground placeholder:text-muted-foreground resize-none rounded-md px-3 py-2 pr-12 pb-10 text-sm focus:outline-none"
                disabled={isTyping}
              />
              <div className="absolute left-3 bottom-3 flex items-center space-x-2">
                <Select value={selectedMode} onValueChange={setSelectedMode}>
                  <SelectTrigger className="w-16 h-6 text-xs bg-transparent border-none text-muted-foreground p-0">
                    <div className="flex items-center space-x-1">
                      {React.createElement(getModeInfo(selectedMode).icon, { className: "h-3 w-3" })}
                      <span>{getModeInfo(selectedMode).name}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {AVAILABLE_MODES.map((mode) => (
                      <SelectItem key={mode.id} value={mode.id} className="text-foreground">
                        <div className="flex items-center space-x-2">
                          <mode.icon className="h-3 w-3" />
                          <span className="text-xs">{mode.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-24 h-6 text-xs bg-transparent border-none text-muted-foreground p-0">
                    <span>{getModelInfo(selectedModel).name}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {AVAILABLE_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="text-foreground">
                        <span className="text-xs">{model.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={() => {
                  if (!activeConversation) {
                    createNewConversation()
                  }
                  handleSendMessage()
                }}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="absolute right-3 bottom-3 w-6 h-6 p-0 rounded-full"
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn(
      "h-full z-40 transition-all duration-300 ease-out",
      isMinimized ? "w-80" : "w-[640px]",
      className
    )}>
      <Card className="h-full border-l border-0 border-l-border rounded-none flex flex-col bg-background">
          {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3 flex-1">
            {/* Conversations dropdown - moved to top left */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConversations(!showConversations)}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              {activeConversation?.title || 'New Chat'}
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={createNewConversation}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggle(false)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Conversation Switcher */}
        {showConversations && !isMinimized && (
          <div className="border-b border-border bg-muted/20">
            <ScrollArea className="max-h-48">
              <div className="p-2 space-y-1">
                {conversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant={conversation.id === activeConversationId ? "secondary" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => switchConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-2 w-full">
                      <div className="p-1 rounded bg-primary/10">
                        {React.createElement(getModelInfo(conversation.model).icon, { className: "h-3 w-3 text-primary" })}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium truncate">{conversation.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.messages.length} messages • {getModelInfo(conversation.model).name}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}


        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="mb-6"
                  >
                    <div className="space-y-2">
                      {message.sender === 'user' ? (
                        <div className="flex justify-end">
                          <div className="bg-muted/30 px-4 py-3 rounded-lg text-sm text-foreground max-w-[80%]">
                            {message.content}
                          </div>
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-muted-foreground prose-li:text-foreground">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({children}) => <h1 className="text-xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>,
                              h2: ({children}) => <h2 className="text-lg font-semibold mb-3 mt-5 first:mt-0">{children}</h2>,
                              h3: ({children}) => <h3 className="text-base font-medium mb-2 mt-4 first:mt-0">{children}</h3>,
                              p: ({children}) => <p className="mb-3 leading-relaxed">{children}</p>,
                              ul: ({children}) => <ul className="mb-3 ml-4 space-y-1">{children}</ul>,
                              ol: ({children}) => <ol className="mb-3 ml-4 space-y-1">{children}</ol>,
                              li: ({children}) => <li className="text-sm">{children}</li>,
                              code: ({children, ...props}) => {
                                const isInline = !props.className?.includes('language-')
                                return isInline ? 
                                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{children}</code> :
                                  <code className="block bg-muted p-3 rounded-md text-xs font-mono overflow-x-auto">{children}</code>
                              },
                              pre: ({children}) => <pre className="bg-muted p-3 rounded-md overflow-x-auto mb-3">{children}</pre>,
                              blockquote: ({children}) => <blockquote className="border-l-4 border-muted-foreground/20 pl-4 italic text-muted-foreground mb-3">{children}</blockquote>,
                              strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ask anything (⌘L), @ to mention code blocks"
                  className="w-full h-40 bg-input border-border text-foreground placeholder:text-muted-foreground resize-none rounded-md px-3 py-2 pr-12 pb-10 text-sm focus:outline-none"
                  disabled={isTyping}
                />
                <div className="absolute left-3 bottom-3 flex items-center space-x-2">
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger className="w-16 h-6 text-xs bg-transparent border-none text-muted-foreground p-0">
                      <div className="flex items-center space-x-1">
                        {React.createElement(getModeInfo(selectedMode).icon, { className: "h-3 w-3" })}
                        <span>{getModeInfo(selectedMode).name}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {AVAILABLE_MODES.map((mode) => (
                        <SelectItem key={mode.id} value={mode.id} className="text-foreground">
                          <div className="flex items-center space-x-2">
                            <mode.icon className="h-3 w-3" />
                            <span className="text-xs">{mode.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-24 h-6 text-xs bg-transparent border-none text-muted-foreground p-0">
                      <span>{getModelInfo(selectedModel).name}</span>
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {AVAILABLE_MODELS.map((model) => (
                        <SelectItem key={model.id} value={model.id} className="text-foreground">
                          <span className="text-xs">{model.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="absolute right-3 bottom-3 w-6 h-6 p-0 rounded-full"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 px-4">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          </>
        )}
      </Card>
    </div>
  )
}
