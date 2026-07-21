import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Pin, 
  Plus, 
  Search, 
  MessageSquare, 
  History, 
  FolderPlus,
  HelpCircle,
  X
} from 'lucide-react';

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
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to the Veridex AI Forensic Assistant. Choose a prompt template or ask custom verification questions about your active case, evidence, or reports.',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pinnedPrompts, setPinnedPrompts] = useState<AIPrompt[]>([]);
  const [showPromptCreator, setShowPromptCreator] = useState(false);
  const [newPromptName, setNewPromptName] = useState('');
  const [newPromptText, setNewPromptText] = useState('');
  const [newPromptCat, setNewPromptCat] = useState('triage');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchPrompts();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchPrompts = async () => {
    try {
      const res = await fetch('/api/ai/prompts');
      const data = await res.json();
      if (data.templates) {
        setPinnedPrompts(data.templates);
      }
    } catch (err) {
      console.error('Failed to load prompt templates', err);
    }
  };

  const handleCreatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromptName.trim() || !newPromptText.trim()) return;

    try {
      const res = await fetch('/api/ai/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPromptName,
          promptText: newPromptText,
          category: newPromptCat,
          description: 'Custom user-saved template.'
        })
      });
      if (res.ok) {
        setNewPromptName('');
        setNewPromptText('');
        setShowPromptCreator(false);
        fetchPrompts();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          conversationId: conversationId || undefined,
        }),
      });
      const data = await response.json();

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: data.id || Math.random().toString(),
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

  const startNewSession = () => {
    setConversationId(null);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Started new investigation session. Workspace context is locked and active.',
        createdAt: new Date().toISOString(),
      }
    ]);
  };

  return (
    <>
      {/* Collapsed floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-2xl hover:bg-amber-600 transition-all border border-amber-400 focus:outline-none hover:scale-105"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Floating Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[620px] w-[400px] flex-col rounded-xl border border-zinc-800 bg-zinc-950/95 text-zinc-100 shadow-2xl backdrop-blur-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-semibold tracking-wide text-zinc-100 text-xs font-mono uppercase">VERIDEX OS AI ASSISTANT</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={startNewSession}
                title="New Session"
                className="rounded p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-amber-500 font-mono text-[10px]"
              >
                [ NEW SESSION ]
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context banner */}
          {activeContext && (
            <div className="flex items-center justify-between bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-[10px] text-amber-400 font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold">ACTIVE CONTEXT:</span>
                <span>{activeContext.type} ({activeContext.title})</span>
              </div>
              <span className="text-[9px] px-1 bg-amber-500/20 rounded font-semibold uppercase text-amber-500">Locked</span>
            </div>
          )}

          {/* Prompt Creator Overlap */}
          {showPromptCreator ? (
            <form onSubmit={handleCreatePrompt} className="p-4 border-b border-zinc-900 bg-zinc-900/40 space-y-3">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">// SAVE NEW PROMPT TEMPLATE</div>
              <input
                type="text"
                placeholder="Template name (e.g. Audit Metadata)"
                value={newPromptName}
                onChange={(e) => setNewPromptName(e.target.value)}
                className="w-full rounded bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
              />
              <textarea
                placeholder="Template prompt text..."
                value={newPromptText}
                onChange={(e) => setNewPromptText(e.target.value)}
                rows={3}
                className="w-full rounded bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
              />
              <div className="flex justify-between items-center">
                <select
                  value={newPromptCat}
                  onChange={(e) => setNewPromptCat(e.target.value)}
                  className="rounded bg-zinc-900 border border-zinc-800 p-1 text-[10px] text-zinc-400 font-mono"
                >
                  <option value="triage">Triage</option>
                  <option value="summarization">Summary</option>
                  <option value="reporting">Report</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowPromptCreator(false)}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono text-zinc-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded bg-amber-500 text-black font-bold text-[10px] font-mono hover:bg-amber-600"
                  >
                    Save Template
                  </button>
                </div>
              </div>
            </form>
          ) : null}

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
                  className={`rounded-lg p-3 text-xs leading-relaxed max-w-[85%] font-sans ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-black font-semibold'
                      : 'bg-zinc-900 border border-zinc-850 text-zinc-300'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.contextUsed && (
                  <span className="text-[9px] text-zinc-500 font-mono">
                    context attached: {typeof msg.contextUsed === 'string' ? JSON.parse(msg.contextUsed).title : msg.contextUsed.title}
                  </span>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-zinc-500 text-xs font-mono">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                <span>AI Assistant is assembling context...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-3 border-t border-zinc-900 bg-zinc-950 flex flex-col space-y-2">
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
              <span>SELECT PROMPT TEMPLATE</span>
              <button 
                onClick={() => setShowPromptCreator(true)}
                className="text-amber-500 hover:underline flex items-center gap-1"
              >
                <Plus size={10} /> ADD CUSTOM
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {pinnedPrompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSendMessage(p.promptText)}
                  className="flex-shrink-0 rounded border border-zinc-800 bg-zinc-900/50 px-2 py-1 text-[10px] text-zinc-400 hover:border-amber-500/40 hover:text-amber-400 transition-all font-mono"
                >
                  + {p.name}
                </button>
              ))}
            </div>
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
              placeholder="Ask Veridex AI assistant..."
              className="flex-1 rounded-l bg-zinc-900 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 border border-zinc-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-r bg-amber-500 px-4 text-xs font-semibold text-black hover:bg-amber-600 focus:outline-none flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
