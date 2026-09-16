import { Lead, PipelineStageId, DripCampaign } from '../types';
import { PIPELINE_STAGES } from '../data/pipelineConfig';
import { 
  Users, Mail, CheckCircle2, ChevronRight, UserPlus, 
  MapPin, Clock, Calendar, Sparkles, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface PipelineBoardProps {
  leads: Lead[];
  campaigns: DripCampaign[];
  locations: string[];
  onSelectStage: (stageId: PipelineStageId) => void;
  onOpenNewLeadModal: () => void;
}

export function PipelineBoard({
  leads,
  campaigns,
  locations,
  onSelectStage,
  onOpenNewLeadModal,
}: PipelineBoardProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Pipeline Stages & 1-Year Automated Drips
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
              Click any stage to open its dedicated page
            </span>
          </h2>
          <p className="text-xs text-zinc-400">
            Athletes are organized by stage. Select any stage to open its full page with search, filters, steps info, and Gmail dispatch.
          </p>
        </div>

        <button
          onClick={onOpenNewLeadModal}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 shadow-md shadow-blue-950/40 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add Prospective Athlete</span>
        </button>
      </div>

      {/* 6-Stage Interactive Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.currentStage === stage.id);
          const gkCount = stageLeads.filter((l) => l.playerType === 'goalkeeper').length;
          const fpCount = stageLeads.filter((l) => l.playerType === 'field_player').length;
          const isCoaches = stage.id === 'coaches';
          
          // Get unique locations in this stage
          const stageLocations = Array.from(new Set(stageLeads.map((l) => l.location).filter(Boolean)));

          return (
            <div
              key={stage.id}
              id={`stage-card-${stage.id}`}
              onClick={() => onSelectStage(stage.id)}
              className="bg-black hover:bg-zinc-950 border border-zinc-800 hover:border-blue-600/70 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-xl flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-600/40 flex items-center justify-center text-[10px] text-blue-400 font-black">
                    {stage.order}
                  </span>
                  Stage {stage.order}
                </span>

                <span className="text-xs font-extrabold text-white px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 shadow-2xs">
                  {stageLeads.length} {isCoaches ? (stageLeads.length === 1 ? 'Coach' : 'Coaches') : (stageLeads.length === 1 ? 'Athlete' : 'Athletes')}
                </span>
              </div>

              {/* Stage Title */}
              <div className="mb-3">
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {stage.shortLabel}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Athlete/Coach Breakdown & Location pills */}
              <div className="space-y-2 pt-3 border-t border-zinc-900 my-2 text-xs">
                {/* Role Counts */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">{isCoaches ? 'Focus:' : 'Position:'}</span>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className="text-amber-400">{isCoaches ? `🧤 ${gkCount} GK` : `⚽ ${gkCount} GK`}</span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-cyan-400">{isCoaches ? `🏃 ${fpCount} Team` : `🏃 ${fpCount} Field`}</span>
                  </div>
                </div>

                {/* Locations Represented */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">Locations:</span>
                  <span className="text-zinc-300 font-medium truncate max-w-[120px]" title={stageLocations.join(', ')}>
                    {stageLocations.length > 0 ? stageLocations.join(', ') : 'None yet'}
                  </span>
                </div>

                {/* 1-Year Drip Cadence Indicator */}
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>56-Step 1-Year Drip Active</span>
                </div>
              </div>

              {/* Action Button CTA */}
              <div className="pt-2 mt-2 border-t border-zinc-900 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                <span>Open Stage Page</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
