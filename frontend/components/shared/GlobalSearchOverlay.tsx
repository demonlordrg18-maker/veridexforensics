import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Briefcase, FileSignature, BookOpen, Settings, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  type: 'case' | 'evidence' | 'report' | 'doc';
  title: string;
  subtitle: string;
}

export function GlobalSearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeType, setActiveType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      performSearch(query, activeType);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const performSearch = async (q: string, type: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&type=${type}`);
      const data = await res.json();
      if (data.results) {
        setResults(data.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    performSearch(val, activeType);
  };

  const handleTypeSelect = (type: string) => {
    setActiveType(type);
    performSearch(query, type);
  };

  const handleItemClick = (item: SearchResult) => {
    onClose();
    if (item.type === 'case') {
      router.push(`/cases?id=${item.id}`);
    } else if (item.type === 'evidence') {
      router.push(`/evidence?id=${item.id}`);
    } else if (item.type === 'report') {
      router.push(`/reports?id=${item.id}`);
    } else {
      router.push('/learn');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[10vh] px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b border-zinc-900 px-4 py-3">
          <Search className="h-5 w-5 text-zinc-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cases, evidence items, forensic reports, or methodologies..."
            value={query}
            onChange={handleQueryChange}
            className="flex-1 bg-transparent py-1 text-sm placeholder-zinc-500 focus:outline-none focus:ring-0 text-zinc-100"
          />
          <button onClick={onClose} className="rounded p-1 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex border-b border-zinc-900 bg-zinc-950/50 px-4 py-2 overflow-x-auto gap-2">
          {['all', 'case', 'evidence', 'report', 'doc'].map((t) => (
            <button
              key={t}
              onClick={() => handleTypeSelect(t)}
              className={`rounded-md px-2.5 py-1 text-[10px] font-mono font-semibold uppercase border transition-all ${
                activeType === t
                  ? 'bg-amber-500 text-black border-amber-400'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[350px] overflow-y-auto p-2 divide-y divide-zinc-900/50">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 text-xs font-mono">
              <span className="animate-pulse">Querying forensic index database...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs font-mono">
              No matching records found. Try adjusting filters or search term.
            </div>
          ) : (
            results.map((item) => {
              const Icon = item.type === 'case' ? Briefcase :
                            item.type === 'evidence' ? FileText :
                            item.type === 'report' ? FileSignature : BookOpen;
              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900/40 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 group-hover:text-amber-500 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-amber-500 transition-colors">{item.title}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 group-hover:text-amber-500 uppercase">Select</span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-zinc-900 bg-zinc-950 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>Search type filterable above</span>
          <span>Esc to Close</span>
        </div>
      </div>
    </div>
  );
}
