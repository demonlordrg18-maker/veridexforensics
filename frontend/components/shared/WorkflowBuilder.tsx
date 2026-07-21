import React, { useState } from 'react';

interface Workflow {
  id: string;
  name: string;
  triggerType: 'EVIDENCE_UPLOADED' | 'CASE_CREATED' | 'STATUS_CHANGED';
  enabled: boolean;
  actions: string[];
}

export function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 'w1',
      name: 'Auto-Audit Video Evidence',
      triggerType: 'EVIDENCE_UPLOADED',
      enabled: true,
      actions: ['Analyze Modality', 'Deduct Credits', 'Notify Supervisor'],
    },
    {
      id: 'w2',
      name: 'Academic Plagiarism Pre-check',
      triggerType: 'CASE_CREATED',
      enabled: false,
      actions: ['Scan PDF', 'Generate Report Draft'],
    },
  ]);

  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateWorkflow = async (wf: Workflow) => {
    setIsSimulating(true);
    setActiveLogs([`[Trigger] Workflow initialized via event ${wf.triggerType}...`]);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const action of wf.actions) {
      await delay(800);
      setActiveLogs((prev) => [...prev, `[Action] Executing: ${action}... success.`]);
    }

    await delay(500);
    setActiveLogs((prev) => [...prev, `[Completed] Workflow "${wf.name}" executed successfully.`]);
    setIsSimulating(false);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100">
      <div className="flex items-center justify-between border-b border-zinc-850 pb-4 mb-6">
        <div>
          <h2 className="text-sm font-semibold tracking-wide font-mono text-amber-500">WORKFLOW AUTOMATION ENGINE</h2>
          <p className="text-xs text-zinc-400 mt-1">Configure automated forensics pipelines and notifications.</p>
        </div>
        <button className="rounded bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-amber-600 font-mono">
          + CREATE WORKFLOW
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Workflows list */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">Active Rules</h3>
          {workflows.map((wf) => (
            <div key={wf.id} className="rounded-lg border border-zinc-850 bg-zinc-900/40 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">{wf.name}</h4>
                  <span className="text-[10px] text-amber-400 font-mono uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded mt-1.5 inline-block">
                    Trigger: {wf.triggerType}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => simulateWorkflow(wf)}
                    disabled={isSimulating}
                    className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] font-mono text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-all disabled:opacity-50"
                  >
                    RUN SIM
                  </button>
                  <span className={`h-2.5 w-2.5 rounded-full ${wf.enabled ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                </div>
              </div>

              {/* Actions flow */}
              <div className="mt-4 space-y-2">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Pipeline Steps:</div>
                <div className="flex flex-col space-y-1">
                  {wf.actions.map((act, idx) => (
                    <div key={idx} className="flex items-center text-xs text-zinc-300 space-x-2">
                      <span className="text-zinc-600 font-mono">{idx + 1}.</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Simulator and Live Logs */}
        <div className="rounded-lg border border-zinc-850 bg-zinc-900/20 p-4 flex flex-col">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono border-b border-zinc-850 pb-2 mb-3">
            Automation Run Output
          </h3>

          <div className="flex-1 min-h-[200px] rounded bg-black p-3 font-mono text-xs text-zinc-300 space-y-2 overflow-y-auto">
            {activeLogs.length === 0 ? (
              <div className="text-zinc-600 text-center pt-16">
                Click "RUN SIM" on a rule to inspect execution logs in real time.
              </div>
            ) : (
              activeLogs.map((log, idx) => (
                <div key={idx} className={log.includes('Trigger') ? 'text-amber-400' : log.includes('Completed') ? 'text-emerald-400' : 'text-zinc-300'}>
                  {log}
                </div>
              ))
            )}
            {isSimulating && (
              <div className="text-zinc-500 animate-pulse">Running automation pipeline tasks...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
