import { useState, type FormEvent } from 'react';
import { 
  X, Mail, Phone, Calendar, ArrowRight, CheckCircle2, Clock, 
  Ban, Send, Pause, Play, Edit3, Trash2, Plus, Sparkles, UserCheck, AlertCircle, MapPin 
} from 'lucide-react';
import { Lead, PipelineStageId, DripCampaign, EmailLogEntry, PlayerType } from '../types';
import { PIPELINE_STAGES } from '../data/pipelineConfig';
import { GmailSendPayload } from './GmailConfirmSendModal';
import { interpolateEmail } from '../services/dripEngine';

interface LeadDetailModalProps {
  lead: Lead | null;
  campaigns: DripCampaign[];
  onClose: () => void;
  onMoveStage: (lead: Lead, targetStage: PipelineStageId, sessionDate?: string) => void;
  onTriggerNextEmail: (lead: Lead) => void;
  onTogglePauseDrip: (lead: Lead) => void;
  onAddNote: (leadId: string, text: string) => void;
  onPreviewEmail: (email: EmailLogEntry) => void;
  onDeleteLead: (leadId: string) => void;
  onSendGmail?: (payload: GmailSendPayload) => void;
  onUpdateLead?: (lead: Lead) => void;
}

export function LeadDetailModal({
  lead,
  campaigns,
  onClose,
  onMoveStage,
  onTriggerNextEmail,
  onTogglePauseDrip,
  onAddNote,
  onPreviewEmail,
  onDeleteLead,
  onSendGmail,
  onUpdateLead,
}: LeadDetailModalProps) {
  const [newNoteText, setNewNoteText] = useState('');
  const [targetStageToConfirm, setTargetStageToConfirm] = useState<PipelineStageId | null>(null);
  const [introSessionDateInput, setIntroSessionDateInput] = useState('');
  const [activeTab, setActiveTab] = useState<'emails' | 'notes' | 'info'>('emails');
  
  // Inline add email state if lead currently has no email
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  if (!lead) return null;

  const currentStageConfig = PIPELINE_STAGES.find((s) => s.id === lead.currentStage);
  const activeCampaign = campaigns.find((c) => c.id === lead.activeCampaignId) ||
    campaigns.find((c) => c.stageId === lead.currentStage && c.playerType === lead.playerType) ||
    campaigns.find((c) => c.stageId === lead.currentStage);
  const totalSteps = activeCampaign?.steps?.length || (lead.currentStage === 'coaches' ? 22 : 56);
  const currentStep = activeCampaign?.steps.find((s) => s.stepNumber === lead.currentStepNumber);
  const nextStep = activeCampaign?.steps.find((s) => s.stepNumber === lead.nextStepNumber);
  const hasEmail = Boolean(lead.email && lead.email.trim().length > 0);

  const handleSendNextStepGmail = () => {
    if (!activeCampaign || !lead.nextStepNumber || !onSendGmail || !hasEmail) return;
    const step = activeCampaign.steps.find((s) => s.stepNumber === lead.nextStepNumber);
    if (!step) return;
    const subject = interpolateEmail(step.subject, lead);
    const body = interpolateEmail(step.body, lead);
    onSendGmail({
      to: lead.email,
      recipientName: lead.fullName,
      subject,
      body,
      leadId: lead.id,
      stepNumber: step.stepNumber,
      campaignName: activeCampaign.name,
      fromName: 'Flowers Soccer Academy',
    });
  };

  const handleSendLogViaGmail = (log: EmailLogEntry) => {
    if (!onSendGmail || !hasEmail) return;
    onSendGmail({
      to: log.recipientEmail,
      recipientName: lead.fullName,
      subject: log.subject,
      body: log.body,
      leadId: lead.id,
      stepNumber: log.stepNumber,
      campaignName: log.campaignName,
      fromName: 'Flowers Soccer Academy',
    });
  };

  const handleStageSelect = (stageId: PipelineStageId) => {
    if (stageId === lead.currentStage) return;
    if (stageId === 'intro_scheduled') {
      setTargetStageToConfirm('intro_scheduled');
      const tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
      setIntroSessionDateInput(tomorrow.toISOString().split('T')[0] + ' 17:30');
    } else {
      onMoveStage(lead, stageId);
    }
  };

  const handleConfirmScheduledDate = () => {
    if (targetStageToConfirm) {
      onMoveStage(lead, targetStageToConfirm, introSessionDateInput);
      setTargetStageToConfirm(null);
    }
  };

  const handleAddNoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(lead.id, newNoteText.trim());
    setNewNoteText('');
  };

  const handleSaveEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !onUpdateLead) return;

    const trimmed = emailInput.trim();
    const updatedLead: Lead = {
      ...lead,
      email: trimmed,
      dripStatus: 'active', // Activate drips once email is provided!
      currentStepNumber: lead.currentStepNumber || 1,
      nextStepNumber: lead.nextStepNumber || 2,
      updatedAt: new Date().toISOString(),
    };
    onUpdateLead(updatedLead);
    setIsEditingEmail(false);
  };

  const isCoach = lead.currentStage === 'coaches';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="lead-detail-modal"
        className="bg-black border border-zinc-800 rounded-2xl shadow-2xl max-w-4xl w-full my-6 overflow-hidden flex flex-col max-h-[92vh] text-zinc-100"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-lg font-bold text-white tracking-tight">{lead.fullName}</h2>
              
              {/* Player / Coach Type Badge */}
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                lead.playerType === 'goalkeeper' 
                  ? 'bg-amber-950/60 text-amber-300 border-amber-800/60' 
                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
              }`}>
                {isCoach 
                  ? (lead.playerType === 'goalkeeper' ? '🧤 GK Clinics' : '🏃 Team Clinics')
                  : (lead.playerType === 'goalkeeper' ? '⚽ Goalkeeper' : '🏃 Field Player')}
              </span>

              {/* Location Badge */}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-400" />
                {lead.location || 'Lilburn'}
              </span>

              {/* Current Funnel Stage Badge */}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/60">
                {currentStageConfig?.label}
              </span>
            </div>

            {/* Sub-bar: Email, Phone, Referral Source */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              {hasEmail ? (
                <span className="flex items-center gap-1 text-zinc-300 font-mono">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  {lead.email}
                </span>
              ) : (
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  ⚠️ No email on file
                </span>
              )}

              {lead.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  {lead.phone}
                </span>
              )}

              <span className="text-zinc-400">
                Source: <strong className="text-zinc-200">{lead.howHeardAboutUs || lead.source || 'Referral'}</strong>
              </span>

              <span className="text-zinc-400">
                Added {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            id="close-lead-detail-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pipeline Stage Progression Selector */}
        <div className="bg-zinc-950/90 border-b border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Pipeline Stage (Click to move & trigger automated drip)
            </span>
            <span className="text-xs text-blue-400 font-medium hidden sm:inline">
              Flowers Soccer Academy Automation Engine
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PIPELINE_STAGES.map((s, index) => {
              const isCurrent = s.id === lead.currentStage;
              return (
                <button
                  key={s.id}
                  id={`funnel-stage-btn-${s.id}`}
                  onClick={() => handleStageSelect(s.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all relative cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-950/60 border-blue-600 shadow-md ring-1 ring-blue-600/30 text-white'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-zinc-400">STAGE {s.order}</span>
                    {isCurrent && (
                      <span className="text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.2 rounded-md">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold line-clamp-1">{s.shortLabel}</div>
                  <div className="text-[10px] text-zinc-400 mt-1">
                    56-Step Drip
                  </div>
                </button>
              );
            })}
          </div>

          {/* Schedule Session Prompt */}
          {targetStageToConfirm === 'intro_scheduled' && (
            <div className="mt-3 p-3 bg-blue-950/40 border border-blue-800/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-blue-200 block">
                    Intro Session Date & Time
                  </span>
                  <span className="text-[11px] text-blue-300">
                    Will be included in the automated confirmation email.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={introSessionDateInput}
                  onChange={(e) => setIntroSessionDateInput(e.target.value)}
                  placeholder="e.g., Tomorrow at 5:30 PM"
                  className="px-3 py-1.5 text-xs bg-black border border-blue-500/50 rounded-lg text-white w-full sm:w-56 focus:outline-hidden"
                />
                <button
                  onClick={handleConfirmScheduledDate}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Confirm & Move
                </button>
                <button
                  onClick={() => setTargetStageToConfirm(null)}
                  className="px-2 py-1.5 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Middle: Step Progress & Cadence Box */}
        <div className="p-5 border-b border-zinc-800 bg-black">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-600/10 border border-blue-600/30 text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">
                      {lead.currentStage === 'coaches'
                        ? 'Daily Coaching Development (1 email/day)'
                        : '1-Year Drip Cadence (Month 1: 2x/wk · Months 2-12: 1x/wk)'}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {activeCampaign ? activeCampaign.name : 'Flowers Soccer Academy Campaign'}
                    </h3>
                  </div>
                </div>

                <div className="text-xs text-zinc-400 pl-8">
                  {hasEmail ? (
                    lead.dripStatus === 'active' ? (
                      <div>
                        <span className="font-extrabold text-blue-400">
                          🎯 Step {lead.currentStepNumber || 1} of {totalSteps}
                        </span>{' '}
                        — {currentStep ? currentStep.subject : 'Active'}.{' '}
                        {nextStep ? (
                          <span className="text-emerald-400 font-semibold">
                            Next: <strong>Step {nextStep.stepNumber}</strong> ({nextStep.cadenceNote || nextStep.delayText})
                          </span>
                        ) : (
                          <span className="text-zinc-400">Sequence completed for this stage.</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-amber-400 font-medium">
                        Drip sequence is currently paused for this contact.
                      </span>
                    )
                  ) : (
                    <div className="text-amber-300 font-medium">
                      ⚠️ No email on file. Automated emails are paused. Add an email address to activate their 1-year sequence.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 pl-8 md:pl-0">
                {hasEmail && lead.nextStepNumber && onSendGmail && (
                  <button
                    id="send-next-email-gmail-btn"
                    onClick={handleSendNextStepGmail}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-950/40 transition-colors cursor-pointer"
                    title="Dispatch email via Flowers Soccer Academy Gmail"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Step {lead.nextStepNumber} via Gmail</span>
                  </button>
                )}

                {hasEmail && lead.nextStepNumber && (
                  <button
                    id="trigger-next-email-btn"
                    onClick={() => onTriggerNextEmail(lead)}
                    className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-zinc-800 transition-colors cursor-pointer"
                    title="Advance to next step in CRM log"
                  >
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Log Step {lead.nextStepNumber}</span>
                  </button>
                )}

                {hasEmail && (
                  <button
                    id="pause-resume-drip-btn"
                    onClick={() => onTogglePauseDrip(lead)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
                  >
                    {lead.dripStatus === 'paused' ? (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Resume Drip</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Pause Drip</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* If no email, show inline add email form */}
            {!hasEmail && (
              <div className="pt-2 border-t border-zinc-800">
                {!isEditingEmail ? (
                  <button
                    onClick={() => {
                      setIsEditingEmail(true);
                      setEmailInput('');
                    }}
                    className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Email Address to Start 1-Year Drip</span>
                  </button>
                ) : (
                  <form onSubmit={handleSaveEmail} className="flex items-center gap-2">
                    <input
                      type="email"
                      required
                      autoFocus
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="athlete@example.com"
                      className="text-xs px-3 py-1.5 bg-zinc-900 border border-blue-500 rounded-lg text-white w-64 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Save & Activate Drip
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingEmail(false)}
                      className="px-2 py-1.5 text-zinc-400 hover:text-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 px-6 bg-zinc-950">
          <button
            id="tab-emails-btn"
            onClick={() => setActiveTab('emails')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'emails'
                ? 'border-blue-600 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email History ({lead.emailLogs.length})</span>
          </button>
          <button
            id="tab-notes-btn"
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'notes'
                ? 'border-blue-600 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Coach Notes ({lead.notes.length})</span>
          </button>
          <button
            id="tab-info-btn"
            onClick={() => setActiveTab('info')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'info'
                ? 'border-blue-600 text-blue-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isCoach ? 'Coach Profile' : 'Athlete Profile'}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 max-h-[360px] bg-black">
          {activeTab === 'emails' && (
            <div className="space-y-3">
              {lead.emailLogs.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs">
                  {hasEmail 
                    ? 'No automated emails sent yet. Ready to dispatch Step 1.' 
                    : 'No email address on file. Add an email above to launch automated emails.'}
                </div>
              ) : (
                lead.emailLogs.map((log) => (
                  <div
                    key={log.id}
                    id={`log-item-${log.id}`}
                    onClick={() => onPreviewEmail(log)}
                    className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-zinc-700 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {log.status === 'sent' && (
                          <span className="p-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800/60 block" title="Sent">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                        {log.status === 'cancelled' && (
                          <span className="p-1 rounded-md bg-rose-950 text-rose-400 border border-rose-800/60 block" title="Cancelled on Stage Transition">
                            <Ban className="w-4 h-4" />
                          </span>
                        )}
                        {log.status === 'scheduled' && (
                          <span className="p-1 rounded-md bg-blue-950 text-blue-400 border border-blue-800/60 block" title="Scheduled">
                            <Clock className="w-4 h-4" />
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">
                            {log.subject}
                          </span>
                          {log.stepNumber && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                              Step {log.stepNumber}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-zinc-400 line-clamp-1 font-mono">
                          {log.body}
                        </div>

                        {log.reason && (
                          <div className="text-[11px] text-amber-400 font-medium">
                            ↳ {log.reason}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <span className="text-[11px] text-zinc-400 block">
                        {new Date(log.sentAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                      {log.gmailMessageId ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                          <CheckCircle2 className="w-3 h-3" /> Gmail Sent
                        </span>
                      ) : onSendGmail && log.status !== 'cancelled' && hasEmail ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendLogViaGmail(log);
                          }}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-950/40 hover:bg-blue-900/60 px-2 py-0.5 rounded border border-blue-800/60 transition-colors cursor-pointer"
                        >
                          <Send className="w-2.5 h-2.5" /> Send via Gmail
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <form onSubmit={handleAddNoteSubmit} className="space-y-2">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add coach evaluation, parent notes, or clinic observations..."
                  className="w-full text-xs p-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-white placeholder-zinc-500"
                  rows={2}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-md shadow-blue-950/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </div>
              </form>

              <div className="space-y-2 pt-2">
                {lead.notes.length === 0 ? (
                  <div className="text-center py-6 text-zinc-400 text-xs">
                    No notes recorded yet. Add a note above.
                  </div>
                ) : (
                  lead.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
                      <div className="flex justify-between items-center mb-1 text-zinc-400">
                        <span className="font-semibold text-blue-400">{note.author}</span>
                        <span className="text-[11px]">{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-zinc-200 leading-relaxed">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">
                  {isCoach ? 'Coach & Program Details' : 'Athlete Details'}
                </h4>
                <div>
                  <span className="text-zinc-400 block">Full Name</span>
                  <span className="font-medium text-white">{lead.fullName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">{isCoach ? 'Clinic Focus' : 'Position / Focus'}</span>
                  <span className="font-medium text-amber-300">
                    {isCoach 
                      ? (lead.playerType === 'goalkeeper' ? '🧤 Goalkeeper Clinics' : '🏃 Team Clinics')
                      : (lead.playerType === 'goalkeeper' ? '⚽ Goalkeeper' : '🏃 Field Player')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block">{isCoach ? 'Club / School Area' : 'Training Location'}</span>
                  <span className="font-medium text-zinc-200">📍 {lead.location || 'Lilburn'}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Email Address</span>
                  <span className="font-medium text-white">{lead.email || 'None on file'}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Phone</span>
                  <span className="font-medium text-white">{lead.phone || 'None provided'}</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">Acquisition & Focus</h4>
                <div>
                  <span className="text-zinc-400 block">How They Heard / Connection</span>
                  <span className="font-semibold text-emerald-400">
                    {lead.howHeardAboutUs || lead.source || 'Referral'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block">{isCoach ? 'Clinic Needs & Notes' : 'Development Goals'}</span>
                  <p className="font-medium text-zinc-200 mt-0.5">{lead.notesInterest || 'General skill development'}</p>
                </div>
                {lead.scheduledSessionDate && (
                  <div>
                    <span className="text-zinc-400 block">Introductory Session</span>
                    <p className="font-medium text-sky-400 mt-0.5">{lead.scheduledSessionDate}</p>
                  </div>
                )}
                <div>
                  <span className="text-zinc-400 block">Contact ID</span>
                  <span className="font-mono text-[10px] text-zinc-500">{lead.id}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <button
            id="delete-lead-btn"
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove ${lead.fullName}?`)) {
                onDeleteLead(lead.id);
                onClose();
              }
            }}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isCoach ? 'Remove Coach' : 'Remove Athlete'}</span>
          </button>

          <button
            id="close-lead-bottom-btn"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
