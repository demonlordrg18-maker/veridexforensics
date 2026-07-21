import React, { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  type: 'case' | 'evidence' | 'report' | 'doc';
  title: string;
  subtitle: string;
  metadata?: string;
}

export function GlobalSearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${filterType}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch {
        // Fallback demo mock values
        const mocks: SearchResult[] = [
          { id: 'c1', type: 'case', title: 'OSINT Case: Deepfake Proliferation', subtitle: 'Priority: High • Updated 2h ago' },
          { id: 'e1', type: 'evidence', title: 'suspicious_audio_snippet.wav', subtitle: 'Modality: Audio • Size: 2.4MB' },
          { id: 'r1', type: 'report', title: 'Forensic Audit Report: Deepfake Audio', subtitle: 'Verity Index: 0.12 • Truth Score: 12.5%' },
          { id: 'd1', type: 'doc', title: 'Metadata Extraction Methodology Guide', subtitle: 'Knowledge Base • 12 references' },
        ];
        setResults(mocks.filter(r => filterType === 'all' || r.type === filterType));
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, filterType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-24 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center border-b border-zinc-850 px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
          </svg>
          <input
            type="text"
            placeholder="Search cases, evidence, reports, docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ml-3 flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400 hover:text-zinc-100 font-mono">
            ESC
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center space-x-2 bg-zinc-900/40 px-4 py-2 border-b border-zinc-850">
          {['all', 'case', 'evidence', 'report', 'doc'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`rounded px-2.5 py-0.5 text-xs uppercase tracking-wider font-mono transition-all ${
                filterType === t
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Results Pane */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {isLoading && (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono">
              Analyzing workspace directories...
            </div>
          )}

          {!isLoading && results.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono">
              {query ? 'No matching resources found.' : 'Type to search across Veridex system.'}
            </div>
          )}

          {!isLoading && results.map((res) => (
            <div
              key={res.id}
              className="flex items-center justify-between rounded-lg p-3 hover:bg-zinc-900/70 transition-colors cursor-pointer border border-transparent hover:border-zinc-800"
            >
              <div className="flex items-center space-x-3">
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase font-mono ${
                  res.type === 'case' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                  res.type === 'evidence' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  res.type === 'report' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  'bg-zinc-800 text-zinc-300'
                }`}>
                  {res.type}
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-100">{res.title}</h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{res.subtitle}</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-zinc-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
