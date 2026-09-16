import { useState, type DragEvent } from 'react';
import { Mail, Clock, CheckCircle2, ChevronRight, Phone, Send, ArrowRight, UserCheck, Calendar } from 'lucide-react';
import { Lead, PipelineStageId } from '../types';
import { PIPELINE_STAGES } from '../data/pipelineConfig';

interface LeadCardProps {
  key?: string;
  lead: Lead;
  onSelect: (lead: Lead) => void;
  onMoveStage: (lead: Lead, targetStage: PipelineStageId) => void;
  onDragStart: (e: DragEvent, lead: Lead) => void;
}

export function LeadCard({ lead, onSelect, onMoveStage, onDragStart }: LeadCardProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const currentStageConfig = PIPELINE_STAGES.find(s => s.id === lead.currentStage);
  const nextStageIndex = PIPELINE_STAGES.findIndex(s => s.id === lead.currentStage) + 1;
  const nextStageConfig = nextStageIndex < PIPELINE_STAGES.length ? PIPELINE_STAGES[nextStageIndex] : null;

  // Calculate days in stage
  const currentStageHistory = [...lead.stageHistory].reverse().find(h => h.stage === lead.currentStage);
  const daysInStage = currentStageHistory 
    ? Math.max(0, Math.floor((Date.now() - new Date(currentStageHistory.enteredAt).getTime()) / (1000 * 3600 * 24)))
    : 0;

  return (
    <div
      id={`lead-card-${lead.id}`}
      draggable
      onDragStart={(e) => onDragStart(e, lead)}
      onClick={() => onSelect(lead)}
      className="group bg-zinc-950 rounded-xl border border-zinc-800 hover:border-blue-600/70 p-4 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer relative text-zinc-100"
    >
      {/* Top row: Name & Source Tag */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
            {lead.fullName}
            {lead.currentStage === 'client_converted' && (
              <span title="Converted Active Client" className="text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-950" />
              </span>
            )}
            {lead.currentStage === 'inactive_client' && (
              <span title="Past Client (Win-Back Drip Active)" className="text-zinc-400">
                <Clock className="w-3.5 h-3.5" />
              </span>
            )}
          </h4>
          <span className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
            <Mail className="w-3 h-3 text-zinc-500" />
            <span className="truncate max-w-[170px]">{lead.email}</span>
          </span>
        </div>

        <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800 shrink-0">
          {lead.source}
        </span>
      </div>

      {/* Prospective Interest / Note snippet */}
      {lead.notesInterest && (
        <p className="text-xs text-zinc-300 line-clamp-2 mb-3 bg-black p-2 rounded-lg border border-zinc-800/80">
          {lead.notesInterest}
        </p>
      )}

      {/* Scheduled Session Notice if in stage 2 */}
      {lead.currentStage === 'intro_scheduled' && lead.scheduledSessionDate && (
        <div className="mb-3 flex items-center gap-1.5 text-xs text-sky-300 bg-sky-950/30 border border-sky-900/60 px-2.5 py-1.5 rounded-lg font-medium">
          <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>Session: {lead.scheduledSessionDate}</span>
        </div>
      )}

      {/* Drip Campaign Status Bar */}
      <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
        {lead.currentStage === 'client_converted' ? (
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client (Prospective Drips Ended)</span>
          </div>
        ) : lead.dripStatus === 'active' ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="font-medium text-zinc-200">
              Drip Step {lead.currentStepNumber || 1}
            </span>
            {lead.nextStepNumber && (
              <span className="text-[11px] text-zinc-400 font-normal">
                • Next: #{lead.nextStepNumber}
              </span>
            )}
          </div>
        ) : lead.dripStatus === 'paused' ? (
          <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
            <Clock className="w-3 h-3" />
            <span>Drip Paused</span>
          </div>
        ) : (
          <div className="text-zinc-500 text-xs">
            Drip Complete
          </div>
        )}

        <div className="text-[11px] text-zinc-400">
          {daysInStage === 0 ? 'Today' : `${daysInStage}d in stage`}
        </div>
      </div>

      {/* Quick Move Action Footnote */}
      <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between gap-1">
        {nextStageConfig ? (
          <button
            id={`quick-advance-btn-${lead.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onMoveStage(lead, nextStageConfig.id);
            }}
            className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 px-2.5 rounded-lg bg-zinc-900 hover:bg-blue-600 hover:text-white text-zinc-300 transition-all border border-zinc-800"
            title={`Advance to ${nextStageConfig.label}`}
          >
            <span>Advance to {nextStageConfig.shortLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Past Client
          </span>
        )}

        {/* Change Stage dropdown trigger */}
        <div className="relative">
          <button
            id={`stage-menu-btn-${lead.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowMoveMenu(!showMoveMenu);
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            title="Move to specific stage"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {showMoveMenu && (
            <div 
              className="absolute right-0 bottom-full mb-1 w-52 bg-black rounded-xl shadow-2xl border border-zinc-800 py-1.5 z-30 animate-in fade-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-zinc-500 border-b border-zinc-900">
                Move Stage (Trigger Drip)
              </div>
              {PIPELINE_STAGES.map((s) => (
                <button
                  key={s.id}
                  id={`move-stage-option-${lead.id}-${s.id}`}
                  disabled={s.id === lead.currentStage}
                  onClick={() => {
                    setShowMoveMenu(false);
                    onMoveStage(lead, s.id);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                    s.id === lead.currentStage 
                      ? 'bg-zinc-900 text-zinc-500 cursor-default font-medium' 
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-blue-400'
                  }`}
                >
                  <span>{s.label}</span>
                  {s.id === lead.currentStage && <span className="text-[10px] text-blue-500 font-bold">Current</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
