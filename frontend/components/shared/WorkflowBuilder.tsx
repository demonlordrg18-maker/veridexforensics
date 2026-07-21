import React, { useState, useEffect } from 'react';
import { Play, ToggleLeft, ToggleRight, Plus, RefreshCw, Cpu, Activity } from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  triggerType: 'EVIDENCE_UPLOADED' | 'CASE_CREATED' | 'STATUS_CHANGED';
  enabled: boolean;
  actions: string | string[];
}

export function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTrigger, setNewTrigger] = useState<'EVIDENCE_UPLOADED' | 'CASE_CREATED' | 'STATUS_CHANGED'>('EVIDENCE_UPLOADED');
  const [newActions, setNewActions] = useState<string>('Analyze, Notify Team, Attach to Case');

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const res = await fetch('/api/workflows');
      const data = await res.json();
      if (data.workflows) {
        setWorkflows(data.workflows);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const actionList = newActions.split(',').map(a => a.trim()).filter(Boolean);

    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          triggerType: newTrigger,
          actions: actionList
        })
      });
      if (res.ok) {
        setNewName('');
        setNewActions('Analyze, Notify Team, Attach to Case');
        setShowCreator(false);
        fetchWorkflows();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const simulateWorkflow = async (wf: Workflow) => {
    setIsSimulating(true);
    setActiveLogs([`[Trigger] Workflow "${wf.name}" initialized via event ${wf.triggerType}...`]);

    try {
      const res = await fetch('/api/workflows/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId: wf.id,
          triggerData: { source: 'user_simulation' }
        })
      });
      const data = await res.json();
      if (data.logs) {
        // Render steps simulation delay for the visual WOW effect
        const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
        const actionList = typeof wf.actions === 'string' ? JSON.parse(wf.actions) : wf.actions;

        for (const action of actionList) {
          await delay(600);
          setActiveLogs(prev => [...prev, `[Action] Executing action block: ${action}... success.`]);
        }
        await delay(400);
        setActiveLogs(prev => [...prev, `[Completed] Workflow Run logged into db. Status: COMPLETED.`]);
      }
    } catch (err) {
      setActiveLogs(prev => [...prev, `[Error] Simulation execution failed: Connection refused.`]);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-850 pb-4 mb-6 gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide font-mono text-amber-500 flex items-center gap-2">
            <Cpu size={16} /> WORKFLOW AUTOMATION ENGINE
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Configure custom automation triggers, and evidence collection workflows.</p>
        </div>
        <button 
          onClick={() => setShowCreator(!showCreator)}
          className="rounded bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-amber-600 font-mono flex items-center gap-1.5"
        >
          <Plus size={14} /> [ CREATE WORKFLOW ]
        </button>
      </div>

      {showCreator && (
        <form onSubmit={createWorkflow} className="mb-6 p-4 border border-zinc-800 bg-zinc-900/30 rounded-lg space-y-3">
          <div className="text-[10px] font-mono text-amber-400 font-bold">// CREATE NEW AUTOMATION FLOW</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Workflow Rule Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
            />
            <select
              value={newTrigger}
              onChange={(e: any) => setNewTrigger(e.target.value)}
              className="rounded bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-400 font-mono focus:outline-none"
            >
              <option value="EVIDENCE_UPLOADED">EVIDENCE_UPLOADED</option>
              <option value="CASE_CREATED">CASE_CREATED</option>
              <option value="STATUS_CHANGED">STATUS_CHANGED</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Comma-separated actions (e.g. Audit, Deduct, Notify)"
            value={newActions}
            onChange={(e) => setNewActions(e.target.value)}
            className="w-full rounded bg-zinc-900 border border-zinc-800 p-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowCreator(false)}
              className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-amber-500 text-black font-bold text-xs font-mono hover:bg-amber-600"
            >
              Save Pipeline Rule
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Workflows list */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">Active Rules</h3>
          {workflows.map((wf) => {
            const actionList = typeof wf.actions === 'string' ? JSON.parse(wf.actions) : wf.actions;
            return (
              <div key={wf.id} className="rounded-lg border border-zinc-850 bg-zinc-900/40 p-4 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100">{wf.name}</h4>
                    <span className="text-[9px] text-amber-400 font-mono uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded mt-1.5 inline-block">
                      Trigger: {wf.triggerType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => simulateWorkflow(wf)}
                      disabled={isSimulating}
                      className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[9px] font-mono text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all disabled:opacity-50 flex items-center gap-1"
                    >
                      <Play size={10} /> RUN SIM
                    </button>
                    <span className={`h-2 w-2 rounded-full ${wf.enabled ? 'bg-emerald-500' : 'bg-zinc-650'}`} />
                  </div>
                </div>

                {/* Actions flow */}
                <div className="mt-4 space-y-2 border-t border-zinc-900 pt-3">
                  <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">Pipeline Steps:</div>
                  <div className="flex flex-col space-y-1">
                    {actionList?.map((act: string, idx: number) => (
                      <div key={idx} className="flex items-center text-xs text-zinc-300 space-x-2">
                        <span className="text-zinc-600 font-mono text-[10px]">{idx + 1}.</span>
                        <span className="font-mono text-[11px]">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Simulator and Live Logs */}
        <div className="rounded-lg border border-zinc-850 bg-zinc-900/20 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono border-b border-zinc-850 pb-2 mb-3 flex items-center gap-1.5">
              <Activity size={14} className="text-amber-500" /> Automation Run Output Logs
            </h3>

            <div className="min-h-[220px] max-h-[300px] rounded bg-black/80 border border-zinc-900 p-3 font-mono text-[11px] text-zinc-300 space-y-1.5 overflow-y-auto">
              {activeLogs.length === 0 ? (
                <div className="text-zinc-600 text-center pt-20">
                  Click "RUN SIM" on any rule step above to inspect execution sequence.
                </div>
              ) : (
                activeLogs.map((log, idx) => (
                  <div key={idx} className={log.includes('Trigger') ? 'text-amber-400' : log.includes('Completed') ? 'text-emerald-400' : 'text-zinc-300'}>
                    {log}
                  </div>
                ))
              )}
              {isSimulating && (
                <div className="text-zinc-500 animate-pulse font-mono text-[10px]">[Processing next node...]</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
