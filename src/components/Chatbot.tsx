import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import ContactForm from "./ContactForm";

interface Message {
  role: "user" | "model";
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleContactSuccess = () => {
    setIsContactOpen(false);
    const followUp: Message = {
      role: "model",
      text: "We will verify your requirement and will contact soon."
    };
    setMessages((prev) => [...prev, followUp]);
  };

  const handleContactError = (error: string) => {
    setIsContactOpen(false);
    const errorMsg: Message = {
      role: "model",
      text: `There was an error with your submission: ${error}. Please try again.`
    };
    setMessages((prev) => [...prev, errorMsg]);
  };

  const checkContactIntent = (text: string) => {
    const keywords = ["contact", "reach out", "email you", "call you", "get in touch", "talk to a human"];
    const lowerText = text.toLowerCase();
    return keywords.some(k => lowerText.includes(k));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const hasContactIntent = checkContactIntent(input);
    const currentInput = input;
    setInput("");

    if (hasContactIntent) {
      // Immediate response for contact intent
      const promptMsg: Message = {
        role: "model",
        text: "I'm opening the contact form for you now. Please fill in your details so we can assist you better."
      };
      setMessages((prev) => [...prev, promptMsg]);
      setIsContactOpen(true);
      return; // Stop here, don't call the AI API
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          history: messages.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      const botMessage: Message = { role: "model", text: data.text };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, I'm having trouble connecting right now." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[450px] glass border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Get in Touch
            </DialogTitle>
            <DialogDescription>
              Please fill out the form below and we'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <ContactForm onSuccess={handleContactSuccess} onError={handleContactError} />
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4"
            >
              <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col shadow-2xl border-white/10 glass">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                          <p className="text-sm">Hello! How can I help you today?</p>
                        </div>
                      )}
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-muted text-foreground rounded-tl-none border border-white/5"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted text-foreground rounded-2xl rounded-tl-none px-4 py-2 border border-white/5">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </div>
                        </div>
                      )}
                      <div ref={scrollRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t border-white/10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex w-full items-center space-x-2"
                  >
                    <Input
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                      className="flex-1 bg-white/5 border-white/10 focus-visible:ring-primary"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 ${
            isOpen ? "bg-destructive hover:bg-destructive" : "bg-primary"
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>
    </>
  );
};
