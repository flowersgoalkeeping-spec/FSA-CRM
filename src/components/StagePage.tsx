import { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Filter, Mail, Send, ChevronRight, UserCheck, 
  MapPin, AlertCircle, CheckCircle2, Clock, Calendar, ArrowRight, 
  UserPlus, Download, Sparkles, Shield, User, ArrowUpDown
} from 'lucide-react';
import { Lead, PipelineStageId, PlayerType, DripCampaign } from '../types';
import { PIPELINE_STAGES } from '../data/pipelineConfig';
import { exportLeadsToCsv, interpolateEmail } from '../services/dripEngine';

interface StagePageProps {
  stageId: PipelineStageId;
  leads: Lead[];
  campaigns: DripCampaign[];
  locations: string[];
  onBackToDashboard: () => void;
  onSelectStage: (stageId: PipelineStageId) => void;
  onSelectLead: (lead: Lead) => void;
  onMoveStage: (lead: Lead, newStage: PipelineStageId, sessionDate?: string) => void;
  onOpenSendGmail: (payload: {
    to: string;
    recipientName: string;
    subject: string;
    body: string;
    leadId?: string;
    stepNumber?: number;
    campaignName?: string;
    fromName?: string;
  }) => void;
  onOpenNewLeadModal: () => void;
  isGmailConnected: boolean;
}

type SortOption = 'step_asc' | 'step_desc' | 'name_asc' | 'name_desc' | 'date_newest' | 'date_oldest';

export function StagePage({
  stageId,
  leads,
  campaigns,
  locations,
  onBackToDashboard,
  onSelectStage,
  onSelectLead,
  onMoveStage,
  onOpenSendGmail,
  onOpenNewLeadModal,
  isGmailConnected,
}: StagePageProps) {
  const [playerTypeFilter, setPlayerTypeFilter] = useState<'all' | PlayerType>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('step_asc');
  const [stepRangeFilter, setStepRangeFilter] = useState<'all' | 'month1' | 'months2_6' | 'months7_12'>('all');

  const currentStageConfig = PIPELINE_STAGES.find((s) => s.id === stageId) || PIPELINE_STAGES[0];
  
  // All leads belonging to this stage
  const stageLeads = useMemo(() => {
    return leads.filter((l) => l.currentStage === stageId);
  }, [leads, stageId]);

  // Sub-filtered and sorted leads
  const filteredAndSortedLeads = useMemo(() => {
    let list = stageLeads.filter((l) => {
      if (playerTypeFilter !== 'all' && l.playerType !== playerTypeFilter) return false;
      if (locationFilter !== 'all' && l.location !== locationFilter) return false;
      
      if (stepRangeFilter === 'month1' && (l.currentStepNumber || 1) > 8) return false;
      if (stepRangeFilter === 'months2_6' && ((l.currentStepNumber || 1) < 9 || (l.currentStepNumber || 1) > 28)) return false;
      if (stepRangeFilter === 'months7_12' && (l.currentStepNumber || 1) < 29) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = l.fullName.toLowerCase().includes(q);
        const matchEmail = (l.email || '').toLowerCase().includes(q);
        const matchPhone = (l.phone || '').includes(q);
        const matchHeard = (l.howHeardAboutUs || l.source || '').toLowerCase().includes(q);
        const matchNotes = (l.notesInterest || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchHeard && !matchNotes) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      switch (sortBy) {
        case 'step_asc':
          return (a.currentStepNumber || 1) - (b.currentStepNumber || 1);
        case 'step_desc':
          return (b.currentStepNumber || 1) - (a.currentStepNumber || 1);
        case 'name_asc':
          return a.fullName.localeCompare(b.fullName);
        case 'name_desc':
          return b.fullName.localeCompare(a.fullName);
        case 'date_newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date_oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

    return list;
  }, [stageLeads, playerTypeFilter, locationFilter, stepRangeFilter, searchQuery, sortBy]);

  const goalkeeperCount = stageLeads.filter((l) => l.playerType === 'goalkeeper').length;
  const fieldPlayerCount = stageLeads.filter((l) => l.playerType === 'field_player').length;
  const withEmailCount = stageLeads.filter((l) => Boolean(l.email && l.email.trim())).length;

  const handleExportStageCsv = () => {
    const csvContent = exportLeadsToCsv(filteredAndSortedLeads);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `flowers-academy-${currentStageConfig.id}-clients.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleQuickSendStep = (lead: Lead) => {
    const campaign = campaigns.find((c) => c.id === lead.activeCampaignId) ||
      campaigns.find((c) => c.stageId === lead.currentStage && c.playerType === lead.playerType);

    if (!campaign || !lead.email) return;

    // Use nextStepNumber if available, else current or step 1
    const targetStepNumber = lead.nextStepNumber || lead.currentStepNumber || 1;
    const step = campaign.steps.find((s) => s.stepNumber === targetStepNumber) || campaign.steps[0];

    const subject = interpolateEmail(step.subject, lead);
    const body = interpolateEmail(step.body, lead);

    onOpenSendGmail({
      to: lead.email,
      recipientName: lead.fullName,
      subject,
      body,
      leadId: lead.id,
      stepNumber: step.stepNumber,
      campaignName: campaign.name,
      fromName: 'Flowers Soccer Academy',
    });
  };

  return (
    <div id="stage-dedicated-page" className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
        <div>
          <button
            id="back-to-pipeline-overview-btn"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white hover:underline underline-offset-4 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            <span>Back to Pipeline Dashboard</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-600/40 text-blue-400 flex items-center justify-center font-black text-sm">
              {currentStageConfig.order}
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              {currentStageConfig.label}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">
                {stageLeads.length} {stageLeads.length === 1 ? 'Client' : 'Clients'}
              </span>
            </h1>
          </div>

          <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            {currentStageConfig.description}
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="export-stage-csv-btn"
            onClick={handleExportStageCsv}
            className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Export this stage's clients to CSV file"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </button>

          <button
            id="stage-add-lead-btn"
            onClick={onOpenNewLeadModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-950/40"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{stageId === 'coaches' ? '+ Add Coach / Lead' : '+ Add Athlete to Stage'}</span>
          </button>
        </div>
      </div>

      {/* Stage Navigation Switcher Ribbon */}
      <div className="p-1.5 bg-black border border-zinc-900 rounded-2xl flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-2 shrink-0">
          Jump to Stage:
        </span>
        {PIPELINE_STAGES.map((s) => {
          const count = leads.filter((l) => l.currentStage === s.id).length;
          const isActive = s.id === stageId;
          return (
            <button
              key={s.id}
              onClick={() => onSelectStage(s.id)}
              className={`px-3 py-1.5 rounded-xl font-bold shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              <span>{s.order}. {s.shortLabel}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                isActive ? 'bg-blue-950 text-white' : 'bg-black text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Stage Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Stage Total</span>
          <div className="text-lg font-black text-white">{stageLeads.length} {stageId === 'coaches' ? 'Coaches' : 'Clients'}</div>
          <span className="text-[11px] text-zinc-400">{withEmailCount} with active email</span>
        </div>

        <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500/80">{stageId === 'coaches' ? 'GK Clinics' : 'Goalkeepers'}</span>
          <div className="text-lg font-black text-amber-400">{goalkeeperCount}</div>
          <span className="text-[11px] text-zinc-400">{stageId === 'coaches' ? 'GK outreach track' : 'GK 1-year track'}</span>
        </div>

        <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500/80">{stageId === 'coaches' ? 'Team Clinics' : 'Field Players'}</span>
          <div className="text-lg font-black text-cyan-400">{fieldPlayerCount}</div>
          <span className="text-[11px] text-zinc-400">{stageId === 'coaches' ? 'Team outreach track' : 'Field player 1-year track'}</span>
        </div>

        <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400/80">Tone Strategy</span>
          <div className="text-xs font-extrabold text-white truncate">
            {stageId === 'inquiry' && 'Promotional Offers (56 Steps)'}
            {stageId === 'intro_scheduled' && 'Excited (Wk 1-2) → Promo'}
            {stageId === 'intro_attended' && 'Tips & Encouragement (10% Off)'}
            {stageId === 'client_converted' && 'Elite Training Insights'}
            {stageId === 'inactive_client' && 'Re-engagement Promo'}
            {stageId === 'coaches' && 'Coach Clinics & Partnerships'}
          </div>
          <span className="text-[11px] text-zinc-400">Flowers Soccer Academy</span>
        </div>
      </div>

      {/* Filter, Search & Sorting Toolbar (Designed for dozens/hundreds of athletes) */}
      <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-3 text-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={stageId === 'coaches' ? "Search by coach name, school/club, email, phone..." : "Search by athlete name, email, phone, notes..."}
              className="w-full text-xs pl-9 pr-3 py-2 bg-black border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-white placeholder-zinc-500"
            />
          </div>

          {/* Player Type Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setPlayerTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                playerTypeFilter === 'all' 
                  ? 'bg-white text-black shadow-xs' 
                  : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Types ({stageLeads.length})
            </button>
            <button
              onClick={() => setPlayerTypeFilter('goalkeeper')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                playerTypeFilter === 'goalkeeper' 
                  ? 'bg-amber-400 text-black shadow-xs' 
                  : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {stageId === 'coaches' ? `🧤 GK Clinics (${goalkeeperCount})` : `⚽ Goalkeepers (${goalkeeperCount})`}
            </button>
            <button
              onClick={() => setPlayerTypeFilter('field_player')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                playerTypeFilter === 'field_player' 
                  ? 'bg-cyan-400 text-black shadow-xs' 
                  : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {stageId === 'coaches' ? `🏃 Team Clinics (${fieldPlayerCount})` : `🏃 Field Players (${fieldPlayerCount})`}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-900">
          <div className="flex flex-wrap items-center gap-2">
            {/* Location Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-bold">Location:</span>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-black border border-zinc-800 text-zinc-300 rounded-lg px-2.5 py-1.5 font-medium focus:outline-hidden focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    📍 {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Step Range Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-bold">Step:</span>
              <select
                value={stepRangeFilter}
                onChange={(e) => setStepRangeFilter(e.target.value as any)}
                className="bg-black border border-zinc-800 text-zinc-300 rounded-lg px-2.5 py-1.5 font-medium focus:outline-hidden focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All 56 Steps</option>
                <option value="month1">Month 1 (Steps 1–8: 2x/wk)</option>
                <option value="months2_6">Months 2–6 (Steps 9–28: 1x/wk)</option>
                <option value="months7_12">Months 7–12 (Steps 29–56: 1x/wk)</option>
              </select>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 font-bold flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-blue-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-black border border-zinc-800 text-zinc-300 rounded-lg px-2.5 py-1.5 font-medium focus:outline-hidden focus:border-blue-500 cursor-pointer"
            >
              <option value="step_asc">Step Number (Low to High)</option>
              <option value="step_desc">Step Number (High to Low)</option>
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
              <option value="date_newest">Date Added (Newest First)</option>
              <option value="date_oldest">Date Added (Oldest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Athlete Listing (Full Page Roster with Detailed Step Information) */}
      <div className="space-y-3">
        {filteredAndSortedLeads.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
              <AlertCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              No Athletes in {currentStageConfig.label}
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mb-4">
              {searchQuery || playerTypeFilter !== 'all' || locationFilter !== 'all' || stepRangeFilter !== 'all'
                ? 'No athletes matched your current filter criteria. Try clearing search or filters.'
                : 'Add a new athlete or move an existing client into this stage from another category.'}
            </p>
            <button
              onClick={onOpenNewLeadModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-blue-950/40"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Athlete to This Stage</span>
            </button>
          </div>
        ) : (
          filteredAndSortedLeads.map((lead) => {
            const activeCampaign = campaigns.find((c) => c.id === lead.activeCampaignId) ||
              campaigns.find((c) => c.stageId === lead.currentStage && c.playerType === lead.playerType) ||
              campaigns.find((c) => c.stageId === lead.currentStage);

            const totalSteps = activeCampaign?.steps?.length || (stageId === 'coaches' ? 22 : 56);
            const currentStepNum = lead.currentStepNumber || 1;
            const nextStepNum = lead.nextStepNumber || (currentStepNum < totalSteps ? currentStepNum + 1 : undefined);

            const currentStep = activeCampaign?.steps.find((s) => s.stepNumber === currentStepNum);
            const nextStep = nextStepNum ? activeCampaign?.steps.find((s) => s.stepNumber === nextStepNum) : null;

            const hasEmail = Boolean(lead.email && lead.email.trim().length > 0);
            const progressPercent = Math.min(100, Math.round((currentStepNum / totalSteps) * 100));

            return (
              <div
                key={lead.id}
                id={`lead-card-${lead.id}`}
                className="bg-black border border-zinc-800/80 hover:border-blue-600/40 rounded-2xl p-4.5 transition-all shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
              >
                {/* Left Section: Info & Drip Step Progression */}
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onSelectLead(lead)}
                      className="text-sm sm:text-base font-bold text-white hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                    >
                      {lead.fullName}
                    </button>

                    {/* Player Type Tag */}
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      lead.playerType === 'goalkeeper'
                        ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                        : 'bg-cyan-950/40 text-cyan-300 border-cyan-800/60'
                    }`}>
                      {lead.playerType === 'goalkeeper' ? '⚽ Goalkeeper' : '🏃 Field Player'}
                    </span>

                    {/* Location Tag */}
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {lead.location || 'Lilburn'}
                    </span>

                    {/* How Heard Source Tag */}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900/80 text-zinc-400 border border-zinc-800">
                      📣 {lead.howHeardAboutUs || lead.source || 'Yard Signs'}
                    </span>
                  </div>

                  {/* Contact Info & Scheduled Session */}
                  <div className="text-xs text-zinc-400 flex flex-wrap items-center gap-3">
                    {hasEmail ? (
                      <span className="text-zinc-200 font-mono text-[11px]">{lead.email}</span>
                    ) : (
                      <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-1">
                        ⚠️ No email on file
                      </span>
                    )}
                    {lead.phone && <span>· {lead.phone}</span>}
                    {lead.scheduledSessionDate && (
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Session: {lead.scheduledSessionDate}
                      </span>
                    )}
                    {lead.notesInterest && (
                      <span className="text-zinc-500 truncate max-w-xs">
                        · {lead.notesInterest}
                      </span>
                    )}
                  </div>

                  {/* Step Information Panel */}
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-blue-400 flex items-center gap-1 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                          Step {currentStepNum} of {totalSteps}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          ({currentStep?.cadenceNote || (currentStepNum <= 8 ? 'Month 1: 2x/wk' : 'Months 2-12: 1x/wk')})
                        </span>
                      </div>

                      {nextStep ? (
                        <div className="text-[11px] text-zinc-300 font-semibold flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-sky-400" />
                          <span>Cued Next: <strong className="text-white">Step {nextStep.stepNumber}</strong></span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-zinc-400 font-medium">
                          Sequence Completed
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    {/* Subject Line Information */}
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <div className="text-[11px] text-zinc-300 line-clamp-1">
                        <span className="text-zinc-500 mr-1.5">Current:</span>
                        {currentStep ? currentStep.subject : 'Active Sequence'}
                      </div>
                      {nextStep && (
                        <div className="text-[11px] text-zinc-400 line-clamp-1">
                          <span className="text-blue-400 font-bold mr-1.5">Up Next:</span>
                          {nextStep.subject}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Section: Interactive Action Controls */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-900">
                  {/* Immediate Action: Send Next Step Email via Gmail */}
                  {hasEmail && (
                    <button
                      id={`send-step-btn-${lead.id}`}
                      onClick={() => handleQuickSendStep(lead)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-950/40 transition-colors cursor-pointer"
                      title={`Send Step ${nextStepNum || currentStepNum} via Flowers Soccer Academy Gmail`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Step {nextStepNum || currentStepNum} (Gmail)</span>
                    </button>
                  )}

                  {/* Stage Mover Dropdown & Profile View */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={lead.currentStage}
                      onChange={(e) => onMoveStage(lead, e.target.value as PipelineStageId)}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-hidden focus:border-blue-500 cursor-pointer"
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s.id} value={s.id}>
                          Move: {s.shortLabel}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => onSelectLead(lead)}
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                      title="View Profile & Full Sequence History"
                    >
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <div>
          Showing <strong className="text-white">{filteredAndSortedLeads.length}</strong> of{' '}
          <strong className="text-white">{stageLeads.length}</strong> athletes in {currentStageConfig.label}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="text-zinc-400 hover:text-white font-semibold cursor-pointer underline underline-offset-2"
          >
            ← Back to Pipeline Dashboard
          </button>
          <button
            onClick={onOpenNewLeadModal}
            className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Add Athlete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
