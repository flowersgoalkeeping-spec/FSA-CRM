import { useState } from 'react';
import { Mail, Clock, CheckCircle2, ChevronRight, Edit2, Save, X, Sparkles, AlertCircle, Eye, RefreshCw, Plus } from 'lucide-react';
import { DripCampaign, DripEmailStep, Lead, PipelineStageId, PlayerType } from '../types';
import { PIPELINE_STAGES, DEFAULT_DRIP_CAMPAIGNS } from '../data/pipelineConfig';

interface DripCampaignModalProps {
  campaigns: DripCampaign[];
  leads: Lead[];
  onClose: () => void;
  onUpdateCampaigns: (updatedCampaigns: DripCampaign[]) => void;
  onResetDefaultCampaigns: () => void;
  onPreviewEmailContent: (subject: string, body: string, campaignName: string) => void;
}

export function DripCampaignModal({
  campaigns,
  leads,
  onClose,
  onUpdateCampaigns,
  onResetDefaultCampaigns,
  onPreviewEmailContent,
}: DripCampaignModalProps) {
  const [selectedPlayerType, setSelectedPlayerType] = useState<PlayerType>('goalkeeper');
  const [selectedStageId, setSelectedStageId] = useState<PipelineStageId>('inquiry');
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');

  // Add Step State
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newTakeaway, setNewTakeaway] = useState('');
  const [newBody, setNewBody] = useState('');

  // Find the campaign matching both the selected stage and playerType
  const currentCampaign = campaigns.find(
    (c) => c.stageId === selectedStageId && (c.playerType === selectedPlayerType || !c.playerType)
  ) || campaigns[0];

  const stageConfig = PIPELINE_STAGES.find((s) => s.id === selectedStageId);

  // Active leads in this campaign
  const activeLeads = leads.filter(
    (l) => l.activeCampaignId === currentCampaign?.id && l.dripStatus === 'active'
  );

  const startEditing = (step: DripEmailStep) => {
    setEditingStepId(step.id);
    setEditSubject(step.subject);
    setEditBody(step.body);
  };

  const cancelEditing = () => {
    setEditingStepId(null);
  };

  const saveEditing = () => {
    if (!editingStepId || !currentCampaign) return;

    const updatedSteps = currentCampaign.steps.map((step) => {
      if (step.id === editingStepId) {
        return {
          ...step,
          subject: editSubject,
          body: editBody,
        };
      }
      return step;
    });

    const updatedCampaigns = campaigns.map((c) => {
      if (c.id === currentCampaign.id) {
        return { ...c, steps: updatedSteps };
      }
      return c;
    });

    onUpdateCampaigns(updatedCampaigns);
    setEditingStepId(null);
  };

  const handleAddNewStep = () => {
    if (!currentCampaign || !newSubject.trim() || !newBody.trim()) return;

    const nextStepNumber = currentCampaign.steps.length + 1;
    const isCoaches = currentCampaign.stageId === 'coaches';

    const delayHours = isCoaches
      ? (nextStepNumber - 1) * 24
      : (nextStepNumber <= 8 ? (nextStepNumber - 1) * 84 : 28 * 24 + (nextStepNumber - 5) * 7 * 24);
    const delayText = isCoaches
      ? (nextStepNumber === 1 ? 'Immediate (Day 0)' : `Day ${nextStepNumber - 1} (24h later)`)
      : `Step ${nextStepNumber}`;
    const cadenceNote = isCoaches ? 'Daily Coach Education (1/day)' : 'Weekly Automated Sequence';

    const newStep: DripEmailStep = {
      id: `${currentCampaign.stageId}_${currentCampaign.playerType}_step_${nextStepNumber}_${Date.now()}`,
      stepNumber: nextStepNumber,
      delayHours,
      delayText,
      cadenceNote,
      subject: newSubject.trim(),
      keyTakeaway: newTakeaway.trim() || undefined,
      body: newBody.trim(),
    };

    const updatedCampaigns = campaigns.map((c) => {
      if (c.id === currentCampaign.id) {
        return { ...c, steps: [...c.steps, newStep] };
      }
      return c;
    });

    onUpdateCampaigns(updatedCampaigns);
    setIsAddingStep(false);
    setNewSubject('');
    setNewTakeaway('');
    setNewBody('');
  };

  const isCoachesStage = selectedStageId === 'coaches';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div 
        id="drip-campaigns-modal"
        className="bg-black border border-zinc-800 rounded-2xl shadow-2xl max-w-5xl w-full my-6 overflow-hidden flex flex-col max-h-[92vh] text-zinc-100"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/30 text-blue-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {isCoachesStage ? 'FSA Coaches Daily Education Sequence' : 'Flowers Soccer Academy Automated Drip Sequences'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/60">
                  {currentCampaign?.steps.length || 0} Steps Total
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {isCoachesStage 
                  ? 'Cadence: 1 email per day (Daily Coach Education Series) — add new steps anytime without interrupting active progress'
                  : 'Cadence: 2 emails/week in Month 1, then weekly for Months 2–12 (Full 1-Year Automated Campaign)'}
              </p>
            </div>
          </div>

          <button
            id="close-drip-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Position Switcher & Stage Tabs */}
        <div className="bg-zinc-950/90 border-b border-zinc-800 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Position Switcher */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setSelectedPlayerType('goalkeeper')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedPlayerType === 'goalkeeper'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isCoachesStage ? '🧤 GK Coaches Track' : '⚽ Goalkeeper Sequences'}
            </button>
            <button
              onClick={() => setSelectedPlayerType('field_player')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedPlayerType === 'field_player'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isCoachesStage ? '🏃 Team Coaches Track' : '🏃 Field Player Sequences'}
            </button>
          </div>

          {/* Stage Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {PIPELINE_STAGES.map((s) => {
              const isSelected = s.id === selectedStageId;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedStageId(s.id);
                    setIsAddingStep(false);
                    setEditingStepId(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 text-white border border-blue-600/40 shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {s.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Campaign Info Bar */}
        <div className="px-6 py-3 bg-zinc-900/60 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{currentCampaign?.name}</span>
            <span className="text-zinc-400">· {currentCampaign?.steps.length || 0} Scheduled Steps</span>
            <span className="text-blue-400 font-semibold text-[11px] ml-2">
              ({activeLeads.length} active leads in sequence)
            </span>
          </div>

          <button
            id="add-step-to-sequence-btn"
            onClick={() => setIsAddingStep(!isAddingStep)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step {(currentCampaign?.steps.length || 0) + 1} to Sequence</span>
          </button>
        </div>

        {/* Steps List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {/* Add Step Card */}
          {isAddingStep && (
            <div className="bg-blue-950/20 border-2 border-blue-600/60 rounded-xl p-4.5 space-y-3 mb-4 shadow-lg animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                    {(currentCampaign?.steps.length || 0) + 1}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white">
                      Add New Step {(currentCampaign?.steps.length || 0) + 1} to {currentCampaign?.name}
                    </h3>
                    <p className="text-[11px] text-blue-300">
                      {isCoachesStage 
                        ? `Will be delivered 24 hours after Step ${currentCampaign?.steps.length || 0} (Day ${currentCampaign?.steps.length || 0})`
                        : `Will be appended to the sequence seamlessly without interrupting leads currently in progress`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddingStep(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                    Email Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Email 23 – Title of Coaching Masterclass"
                    className="w-full text-xs p-2.5 bg-black border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                    Key Takeaway / Tactical Summary
                  </label>
                  <input
                    type="text"
                    value={newTakeaway}
                    onChange={(e) => setNewTakeaway(e.target.value)}
                    placeholder="Brief 1-sentence summary of the core message or drill focus..."
                    className="w-full text-xs p-2.5 bg-black border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 mb-1">
                    Email Body <span className="text-red-400">*</span>
                    <span className="text-zinc-500 font-normal ml-2">Supports variables: {`{{name}}`}, {`{{location}}`}</span>
                  </label>
                  <textarea
                    rows={6}
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    placeholder={`Coaches,\n\nWrite your next masterclass email here...\n\n- Coach Flowers`}
                    className="w-full text-xs p-2.5 bg-black border border-zinc-700 rounded-lg text-zinc-200 font-mono focus:border-blue-500 focus:outline-hidden leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsAddingStep(false)}
                    className="px-3.5 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNewStep}
                    disabled={!newSubject.trim() || !newBody.trim()}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Append Step</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentCampaign?.steps.map((step) => {
            const isEditing = editingStepId === step.id;
            const isMonthOne = step.stepNumber <= 8;

            return (
              <div
                key={step.id}
                className="bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 rounded-xl p-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs font-black flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${
                          isCoachesStage
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                            : isMonthOne
                              ? 'bg-blue-950/60 text-blue-300 border-blue-800/60'
                              : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                        }`}>
                          {step.cadenceNote || (isCoachesStage ? 'Daily Coach Education (1/day)' : isMonthOne ? 'Month 1: 2x/week' : 'Month 2-12: Weekly')}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          Day {Math.round(step.delayHours / 24)}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">
                        {step.subject}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onPreviewEmailContent(step.subject, step.body, currentCampaign.name)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer border border-zinc-800"
                    >
                      <Eye className="w-3 h-3 text-blue-400" />
                      <span>Preview</span>
                    </button>
                    {!isEditing ? (
                      <button
                        onClick={() => startEditing(step)}
                        className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={cancelEditing}
                        className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-3 pt-2 border-t border-zinc-800">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 mb-1">Subject</label>
                      <input
                        type="text"
                        value={editSubject}
                        onChange={(e) => setEditSubject(e.target.value)}
                        className="w-full text-xs p-2 bg-black border border-zinc-700 rounded-lg text-white focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 mb-1">Body</label>
                      <textarea
                        rows={8}
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        className="w-full text-xs p-2 bg-black border border-zinc-700 rounded-lg text-zinc-200 font-mono focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEditing}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Template</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed font-sans">
                    {step.body}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <button
            onClick={onResetDefaultCampaigns}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Reset All Templates to Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
