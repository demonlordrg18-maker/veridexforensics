/**
 * Quick Actions Widget
 */

"use client";

import { Widget } from "./Widget";
import { Button } from "@/components/shared";
import { Upload, Plus, FileText, Zap } from "lucide-react";

export interface QuickActionsWidgetProps {
  onUpload?: () => void;
  onNewCase?: () => void;
  onAnalyze?: () => void;
  onReport?: () => void;
}

export function QuickActionsWidget({
  onUpload,
  onNewCase,
  onAnalyze,
  onReport,
}: QuickActionsWidgetProps) {
  return (
    <Widget title="Quick Actions" className="lg:col-span-2">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={onUpload}
          icon={<Upload size={16} />}
          className="w-full"
        >
          Upload Evidence
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onNewCase}
          icon={<Plus size={16} />}
          className="w-full"
        >
          New Case
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onAnalyze}
          icon={<Zap size={16} />}
          className="w-full"
        >
          Analyze
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onReport}
          icon={<FileText size={16} />}
          className="w-full"
        >
          Generate Report
        </Button>
      </div>
    </Widget>
  );
}
