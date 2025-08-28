'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

interface ChatInterfaceProps {
  className?: string
  onToggle?: (isOpen: boolean) => void
}

export function ChatInterface({ className, onToggle }: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Odyssey AI assistant. I can help you with API integration, troubleshooting, and best practices. How can I assist you today?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (input: string): string => {
    const responses = [
      "I can help you with that! Let me provide some guidance on integrating with the Odyssey API.",
      "That's a great question about spatial computing. Here's what I recommend...",
      "For asset management, you'll want to use our Asset Manager API. Here are the key endpoints you'll need:",
      "I see you're working with 3D content. Our Content Delivery service can help optimize your assets for better performance.",
      "Let me walk you through the authentication process for the Odyssey platform.",
      "That error typically occurs when the API key isn't properly configured. Try checking your environment variables."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
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

  return (
    <div className={cn(
      "h-full z-40 transition-all duration-300 ease-out",
      isMinimized ? "w-80" : "w-[640px]",
      className
    )}>
      <Card className="h-full border-l border-0 border-l-[#7A7A7C] rounded-none flex flex-col bg-background/95 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#7A7A7C]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Odyssey Assistant</h3>
              <p className="text-xs text-muted-foreground">AI-powered help</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggle(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === 'assistant' && (
                      <div className="p-2 rounded-lg bg-primary/10 self-start">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={cn(
                        "text-xs mt-1 opacity-70",
                        message.sender === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="p-2 rounded-lg bg-muted self-start">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2">
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
            <div className="p-4 border-t border-[#7A7A7C]">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about APIs, integration, or troubleshooting..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  Press Enter to send, Shift+Enter for new line
                </p>
                <Badge variant="secondary" className="text-xs">
                  AI Assistant
                </Badge>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Chat minimized</p>
            <p className="text-xs text-muted-foreground mt-1">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
