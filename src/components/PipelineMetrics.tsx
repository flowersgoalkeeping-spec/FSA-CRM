import { Users, Mail, CheckCircle2, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { Lead, PipelineStageId } from '../types';
import { PIPELINE_STAGES } from '../data/pipelineConfig';

interface PipelineMetricsProps {
  leads: Lead[];
  onSelectStage?: (stageId: PipelineStageId) => void;
}

export function PipelineMetrics({ leads, onSelectStage }: PipelineMetricsProps) {
  const stageCounts = PIPELINE_STAGES.map((stage) => {
    return {
      ...stage,
      count: leads.filter((l) => l.currentStage === stage.id).length,
    };
  });

  const totalLeads = leads.length;
  const activeInDrips = leads.filter((l) => l.dripStatus === 'active').length;
  const noEmailCount = leads.filter((l) => !l.email || l.dripStatus === 'no_email').length;
  const convertedCount = leads.filter((l) => l.currentStage === 'client_converted').length;
  const overallConversionRate = totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0;

  return (
    <div className="bg-black border border-zinc-900 rounded-2xl p-5 shadow-2xl mb-6 space-y-4">
      {/* Top summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Athletes */}
        <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900">
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Athletes</span>
            <Users className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalLeads}</div>
          <span className="text-[11px] text-zinc-400">In 1-Year Pipeline</span>
        </div>

        {/* Active Drips */}
        <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900">
          <div className="flex items-center justify-between text-blue-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active 1-Yr Drips</span>
            <Mail className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{activeInDrips}</div>
          <span className="text-[11px] text-zinc-400">
            {noEmailCount > 0 ? `${noEmailCount} paused (no email)` : '56-step sequences cued'}
          </span>
        </div>

        {/* In Evaluation / Sessions */}
        <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-900">
          <div className="flex items-center justify-between text-zinc-300 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Intro Sessions</span>
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {stageCounts[1].count + stageCounts[2].count}
          </div>
          <span className="text-[11px] text-zinc-400">Scheduled or attended</span>
        </div>

        {/* Converted Clients */}
        <div className="bg-zinc-950 p-3.5 rounded-xl border border-blue-950/60">
          <div className="flex items-center justify-between text-blue-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Converted Clients</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white flex items-baseline gap-2">
            <span>{convertedCount}</span>
            <span className="text-xs font-semibold text-emerald-400">({overallConversionRate}%)</span>
          </div>
          <span className="text-[11px] text-zinc-400">Active academy roster</span>
        </div>
      </div>

      {/* 6-Stage Quick Funnel Bar */}
      <div className="pt-2 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            6-Stage Pipeline Progress
          </span>
          <span className="text-[11px] text-zinc-400 hidden sm:inline">
            Click any stage to open its dedicated athlete roster & steps page
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stageCounts.map((stage) => {
            const pctOfTotal = totalLeads > 0 ? Math.round((stage.count / totalLeads) * 100) : 0;

            return (
              <button
                key={stage.id}
                id={`metric-stage-btn-${stage.id}`}
                onClick={() => onSelectStage && onSelectStage(stage.id)}
                className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 hover:border-blue-600/50 text-left transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold text-zinc-400">
                    STAGE {stage.order}
                  </span>
                  <span className="text-xs font-black text-white bg-zinc-900 group-hover:bg-blue-600 px-2 py-0.5 rounded-md border border-zinc-800 transition-colors">
                    {stage.count}
                  </span>
                </div>

                <div className="text-xs font-bold text-zinc-200 group-hover:text-white line-clamp-1 mb-1" title={stage.label}>
                  {stage.shortLabel}
                </div>

                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${pctOfTotal}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
