import { useState } from 'react';
import { 
  X, Filter, Search, Mail, Send, ChevronRight, UserCheck, 
  MapPin, AlertCircle, CheckCircle2, Clock, Calendar, ArrowRight, UserPlus 
} from 'lucide-react';
import { Lead, PipelineStageId, PlayerType, DripCampaign } from '../types';
import { PIPELINE_STAGES } from '../data/pipelineConfig';

interface StageAthleteRosterModalProps {
  stageId: PipelineStageId;
  leads: Lead[];
  campaigns: DripCampaign[];
  locations: string[];
  onClose: () => void;
  onSelectLead: (lead: Lead) => void;
  onMoveStage: (lead: Lead, newStage: PipelineStageId) => void;
  onOpenSendGmail: (lead: Lead) => void;
  onChangeStageView: (stageId: PipelineStageId) => void;
  onOpenNewLeadModal: () => void;
  isGmailConnected: boolean;
}

export function StageAthleteRosterModal({
  stageId,
  leads,
  campaigns,
  locations,
  onClose,
  onSelectLead,
  onMoveStage,
  onOpenSendGmail,
  onChangeStageView,
  onOpenNewLeadModal,
  isGmailConnected,
}: StageAthleteRosterModalProps) {
  const [playerTypeFilter, setPlayerTypeFilter] = useState<'all' | PlayerType>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentStageConfig = PIPELINE_STAGES.find((s) => s.id === stageId) || PIPELINE_STAGES[0];
  
  // Filter leads belonging to this stage
  const stageLeads = leads.filter((l) => l.currentStage === stageId);

  // Apply sub-filters
  const filteredLeads = stageLeads.filter((l) => {
    if (playerTypeFilter !== 'all' && l.playerType !== playerTypeFilter) return false;
    if (locationFilter !== 'all' && l.location !== locationFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = l.fullName.toLowerCase().includes(q);
      const matchEmail = l.email.toLowerCase().includes(q);
      const matchPhone = l.phone.includes(q);
      const matchHeard = (l.howHeardAboutUs || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchHeard) return false;
    }
    return true;
  });

  const goalkeeperCount = stageLeads.filter(l => l.playerType === 'goalkeeper').length;
  const fieldPlayerCount = stageLeads.filter(l => l.playerType === 'field_player').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        id="stage-athlete-roster-modal"
        className="bg-black border border-zinc-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-zinc-100"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-600/30 flex items-center justify-center font-black text-blue-400">
              {currentStageConfig.order}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {currentStageConfig.label}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold">
                  {stageLeads.length} {stageId === 'coaches' ? (stageLeads.length === 1 ? 'Coach' : 'Coaches') : (stageLeads.length === 1 ? 'Athlete' : 'Athletes')}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {currentStageConfig.description}
              </p>
            </div>
          </div>

          <button
            id="close-stage-roster-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Selector Ribbon */}
        <div className="px-6 py-2.5 bg-zinc-950/80 border-b border-zinc-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mr-2 shrink-0">
            Switch Stage:
          </span>
          {PIPELINE_STAGES.map((s) => {
            const count = leads.filter((l) => l.currentStage === s.id).length;
            const isActive = s.id === stageId;
            return (
              <button
                key={s.id}
                onClick={() => onChangeStageView(s.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-950/40'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <span>{s.order}. {s.shortLabel}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-blue-800 text-white' : 'bg-black text-zinc-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="px-6 py-3 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Player Type Filter */}
            <div className="flex items-center bg-black p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setPlayerTypeFilter('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  playerTypeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All ({stageLeads.length})
              </button>
              <button
                onClick={() => setPlayerTypeFilter('goalkeeper')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  playerTypeFilter === 'goalkeeper' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {stageId === 'coaches' ? '🧤 GK Focus' : '⚽ Goalkeepers'} ({goalkeeperCount})
              </button>
              <button
                onClick={() => setPlayerTypeFilter('field_player')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  playerTypeFilter === 'field_player' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {stageId === 'coaches' ? '🏃 Team Focus' : '🏃 Field Players'} ({fieldPlayerCount})
              </button>
            </div>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-black border border-zinc-800 text-zinc-300 rounded-lg px-3 py-1.5 font-medium focus:outline-hidden focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  📍 {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, phone, email..."
              className="w-full text-xs pl-8.5 pr-3 py-1.5 bg-black border border-zinc-800 rounded-lg focus:outline-hidden focus:border-blue-500 text-zinc-200 placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Athletes List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
          {filteredLeads.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-zinc-200 mb-1">
                No Contacts in {currentStageConfig.shortLabel}
              </h4>
              <p className="text-xs text-zinc-400 max-w-sm mb-4">
                {searchQuery || playerTypeFilter !== 'all' || locationFilter !== 'all'
                  ? 'No contacts matched your current filters.'
                  : 'Add a new prospective contact or move an existing client into this stage.'}
              </p>
              <button
                onClick={onOpenNewLeadModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-blue-950/40"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Contact to Stage</span>
              </button>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const activeCampaign = campaigns.find((c) => c.id === lead.activeCampaignId);
              const currentStep = activeCampaign?.steps.find((s) => s.stepNumber === lead.currentStepNumber);
              const nextStep = activeCampaign?.steps.find((s) => s.stepNumber === lead.nextStepNumber);
              const hasEmail = Boolean(lead.email && lead.email.trim().length > 0);

              return (
                <div
                  key={lead.id}
                  className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4.5 transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  {/* Left: Athlete Identity & Badges */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 
                        onClick={() => onSelectLead(lead)}
                        className="text-sm font-bold text-white hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        {lead.fullName}
                      </h3>

                      {/* Player Type Badge */}
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        lead.playerType === 'goalkeeper' 
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                          : 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
                      }`}>
                        {lead.playerType === 'goalkeeper' ? '⚽ Goalkeeper' : '🏃 Field Player'}
                      </span>

                      {/* Location Badge */}
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {lead.location || 'Lilburn'}
                      </span>

                      {/* How Heard Badge */}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black text-zinc-400 border border-zinc-800">
                        📣 {lead.howHeardAboutUs || lead.source || 'Direct Outreach'}
                      </span>
                    </div>

                    {/* Contact details */}
                    <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-3">
                      {hasEmail ? (
                        <span className="text-zinc-300 font-mono text-[11px]">{lead.email}</span>
                      ) : (
                        <span className="text-amber-400 font-medium text-[11px] flex items-center gap-1">
                          ⚠️ No email on file
                        </span>
                      )}
                      {lead.phone && <span>· {lead.phone}</span>}
                      {lead.scheduledSessionDate && (
                        <span className="text-blue-300 font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {lead.scheduledSessionDate}
                        </span>
                      )}
                    </div>

                    {/* Step Information Banner */}
                    <div className="mt-2.5 p-3 rounded-xl bg-black border border-zinc-800/80 text-xs">
                      {hasEmail ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-blue-400 text-xs flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                                Step {lead.currentStepNumber || 1} of 56
                              </span>
                              <span className="text-[11px] text-zinc-400 font-medium">
                                ({currentStep?.cadenceNote || '1-Year Automated Sequence'})
                              </span>
                            </div>

                            {lead.nextStepNumber && (
                              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Next: Step {lead.nextStepNumber} cued
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] text-zinc-300 line-clamp-1">
                            <span className="text-zinc-500 font-medium mr-1.5">Current Email:</span>
                            {currentStep ? currentStep.subject : 'Flowers Soccer Academy 1-Year Drip Active'}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] text-amber-300/90">
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            Automated sequence paused (No email provided for this contact).
                          </span>
                          <button
                            onClick={() => onSelectLead(lead)}
                            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 cursor-pointer"
                          >
                            Add Email Address
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                    {hasEmail && (
                      <button
                        onClick={() => onOpenSendGmail(lead)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-950/40"
                        title="Send next scheduled drip email via Gmail"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Next via Gmail</span>
                      </button>
                    )}

                    {/* Advance Stage button */}
                    <div className="flex items-center gap-1.5">
                      <select
                        value={lead.currentStage}
                        onChange={(e) => onMoveStage(lead, e.target.value as PipelineStageId)}
                        className="bg-black border border-zinc-800 text-zinc-200 text-xs rounded-xl px-2.5 py-2 font-semibold focus:outline-hidden cursor-pointer"
                      >
                        {PIPELINE_STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            Move to: {s.shortLabel}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => onSelectLead(lead)}
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        title="View Full Profile, Notes & History"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Showing {filteredLeads.length} of {stageLeads.length} {stageId === 'coaches' ? 'coaches' : 'athletes'} in {currentStageConfig.shortLabel}</span>
          </div>

          <button
            onClick={onOpenNewLeadModal}
            className="px-3 py-1.5 bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border border-blue-800/40 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
}
