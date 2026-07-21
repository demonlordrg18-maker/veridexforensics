import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  contextUsed?: any;
  createdAt: string;
}

interface AIPrompt {
  id: string;
  name: string;
  description: string;
  promptText: string;
  category: string;
}

export function AIAssistantDrawer({ activeContext }: { activeContext?: { type: string; id: string; title: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to the Veridex AI Forensic Assistant. Select a prompt below or ask questions about the cases, evidence audits, or report summaries in your active workspace.',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pinnedPrompts, setPinnedPrompts] = useState<AIPrompt[]>([
    {
      id: 'p1',
      name: 'Summarize Investigation',
      description: 'Generates a condensed breakdown of facts.',
      promptText: 'Summarize the investigation findings and flag contradictions.',
      category: 'summarization',
    },
    {
      id: 'p2',
      name: 'Identify Contradictions',
      description: 'Locates missing evidence and discrepancies.',
      promptText: 'Find gaps in evidence items and point out logical discrepancies.',
      category: 'triage',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setIsLoading(true);

    const userMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: text,
      contextUsed: activeContext,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          context: activeContext,
          history: messages,
        }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'assistant',
          content: data.reply || 'No response from assistant.',
          contextUsed: data.contextUsed,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'assistant',
          content: 'Error: Failed to process assistant request. Verify your database and server connectivity.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Collapsed floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg hover:bg-amber-600 transition-all border border-amber-400 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
          </svg>
        </button>
      )}

      {/* Floating Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-96 flex-col rounded-xl border border-zinc-800 bg-zinc-950/95 text-zinc-100 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-semibold tracking-wide text-zinc-100 text-sm font-mono">VERIDEX AI ASSISTANT</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Context banner */}
          {activeContext && (
            <div className="flex items-center space-x-2 bg-amber-500/10 border-b border-amber-500/25 px-4 py-2 text-xs text-amber-400">
              <span className="font-mono uppercase font-semibold">Active Context:</span>
              <span>{activeContext.type} ({activeContext.title})</span>
            </div>
          )}

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1 ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`rounded-lg p-3 text-xs leading-relaxed max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-black font-medium'
                      : 'bg-zinc-900 border border-zinc-850 text-zinc-300'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.contextUsed && (
                  <span className="text-[10px] text-zinc-500 font-mono">
                    using context: {msg.contextUsed.title}
                  </span>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-zinc-500 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                <span>Assistant is drafting response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-3 border-t border-zinc-900 bg-zinc-950 flex flex-wrap gap-2">
            {pinnedPrompts.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSendMessage(p.promptText)}
                className="rounded border border-zinc-800 bg-zinc-900/50 px-2 py-1 text-[10px] text-zinc-400 hover:border-amber-500/40 hover:text-amber-400 transition-all font-mono"
              >
                + {p.name}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex border-t border-zinc-900 p-3 bg-zinc-950"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Veridex AI..."
              className="flex-1 rounded-l bg-zinc-900 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 border border-zinc-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-r bg-amber-500 px-4 text-xs font-semibold text-black hover:bg-amber-600 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
