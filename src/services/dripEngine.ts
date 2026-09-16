import { DripCampaign, EmailLogEntry, Lead, PipelineStageId, PlayerType, DripEmailStep } from '../types';
import { PIPELINE_STAGES, DEFAULT_DRIP_CAMPAIGNS, INITIAL_LEADS } from '../data/pipelineConfig';

export const PRIMARY_STORAGE_KEY_LEADS = 'flowers_soccer_academy_clients_db';
const BACKUP_STORAGE_KEY_LEADS = 'flowers_soccer_academy_leads_v3';
const STORAGE_KEY_CAMPAIGNS = 'flowers_soccer_academy_campaigns_v7';

const CANDIDATE_LEADS_KEYS = [
  PRIMARY_STORAGE_KEY_LEADS,
  BACKUP_STORAGE_KEY_LEADS,
  'flowers_soccer_academy_leads_v2',
  'flowers_soccer_academy_leads_v1',
  'flowers_soccer_academy_leads',
  'prospect_flow_crm_leads_v2',
  'prospect_flow_crm_leads',
];

/**
 * Loads leads with multi-version failover so user client records are NEVER lost during app updates.
 */
export function loadLeadsFromStorage(): Lead[] {
  try {
    for (const key of CANDIDATE_LEADS_KEYS) {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed: Lead[] = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If the existing database does not yet have coaches, append sample coach leads
          if (!parsed.some(l => l.currentStage === 'coaches')) {
            const coachLeads = INITIAL_LEADS.filter(l => l.currentStage === 'coaches');
            if (coachLeads.length > 0) {
              parsed.push(...coachLeads);
            }
          }
          // Immediately ensure saved to primary permanent key
          saveLeadsToStorage(parsed);
          return parsed;
        }
      }
    }
  } catch (e) {
    console.error('Failed to load leads from storage:', e);
  }
  return INITIAL_LEADS;
}

export function saveLeadsToStorage(leads: Lead[]): void {
  try {
    const payload = JSON.stringify(leads);
    localStorage.setItem(PRIMARY_STORAGE_KEY_LEADS, payload);
    localStorage.setItem(BACKUP_STORAGE_KEY_LEADS, payload);
  } catch (e) {
    console.error('Failed to save leads to storage:', e);
  }
}

export function exportClientsToJSON(leads: Lead[]): string {
  return JSON.stringify(leads, null, 2);
}

export function exportClientsToCSV(leads: Lead[]): string {
  const headers = [
    'ID', 'Full Name', 'Player Type', 'Location', 'Current Stage',
    'Email', 'Phone', 'How Heard About Us', 'Drip Status', 'Current Step',
    'Next Step', 'Notes & Interest', 'Created At'
  ];

  const escapeCSV = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((l) => [
    escapeCSV(l.id),
    escapeCSV(l.fullName),
    escapeCSV(l.playerType === 'goalkeeper' ? 'Goalkeeper' : 'Field Player'),
    escapeCSV(l.location),
    escapeCSV(l.currentStage),
    escapeCSV(l.email),
    escapeCSV(l.phone),
    escapeCSV(l.howHeardAboutUs || l.source),
    escapeCSV(l.dripStatus),
    escapeCSV(l.currentStepNumber || ''),
    escapeCSV(l.nextStepNumber || ''),
    escapeCSV(l.notesInterest),
    escapeCSV(l.createdAt),
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function importClientsFromJSON(jsonString: string): { success: boolean; count: number; leads?: Lead[]; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, count: 0, error: 'File does not contain an array of client records.' };
    }
    // Basic validation
    const validLeads: Lead[] = parsed.filter(
      (item) => item && typeof item === 'object' && item.id && item.fullName
    );
    if (validLeads.length === 0) {
      return { success: false, count: 0, error: 'No valid client objects found in import file.' };
    }
    return { success: true, count: validLeads.length, leads: validLeads };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message || 'Invalid JSON format' };
  }
}

export function loadCampaignsFromStorage(): DripCampaign[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CAMPAIGNS);
    if (data) {
      const parsed: DripCampaign[] = JSON.parse(data);
      const merged = [...parsed];
      DEFAULT_DRIP_CAMPAIGNS.forEach((defaultCamp) => {
        const existingIdx = merged.findIndex((c) => c.id === defaultCamp.id);
        if (existingIdx === -1) {
          merged.push(defaultCamp);
        }
      });
      return merged;
    }
  } catch (e) {
    console.error('Failed to load campaigns from localStorage', e);
  }
  return DEFAULT_DRIP_CAMPAIGNS;
}

export function saveCampaignsToStorage(campaigns: DripCampaign[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(campaigns));
  } catch (e) {
    console.error('Failed to save campaigns to localStorage', e);
  }
}

export function interpolateEmail(template: string, lead: Lead): string {
  const firstName = lead.fullName.split(' ')[0] || lead.fullName;
  const roleName = lead.playerType === 'goalkeeper' ? 'Goalkeeper' : 'Field Player';
  const locationName = lead.location || 'Lilburn';

  return template
    .replace(/\{\{name\}\}/g, firstName)
    .replace(/\{\{full_name\}\}/g, lead.fullName)
    .replace(/\{\{email\}\}/g, lead.email || '')
    .replace(/\{\{phone\}\}/g, lead.phone || 'N/A')
    .replace(/\{\{player_type\}\}/g, roleName)
    .replace(/\{\{location\}\}/g, locationName)
    .replace(/\{\{interest\}\}/g, lead.notesInterest || `${roleName} training at ${locationName}`)
    .replace(/\{\{source\}\}/g, lead.howHeardAboutUs || lead.source || 'Yard Signs')
    .replace(/\{\{how_heard\}\}/g, lead.howHeardAboutUs || lead.source || 'Yard Signs')
    .replace(/\{\{business_name\}\}/g, 'Flowers Soccer Academy')
    .replace(/\{\{scheduled_date\}\}/g, lead.scheduledSessionDate || 'Upcoming session');
}

/**
 * Returns the active campaign and the currently cued DripEmailStep for a lead.
 */
export function getLeadCuedStep(lead: Lead, campaigns: DripCampaign[]): {
  campaign: DripCampaign | null;
  step: DripEmailStep | null;
  stepNumber: number;
  totalSteps: number;
} {
  const targetCampaign = campaigns.find(
    c => c.stageId === lead.currentStage && c.isActive && (c.playerType === lead.playerType || c.playerType === 'all')
  ) || campaigns.find(c => c.stageId === lead.currentStage && c.isActive) || campaigns[0];

  if (!targetCampaign || targetCampaign.steps.length === 0) {
    return { campaign: null, step: null, stepNumber: 1, totalSteps: 0 };
  }

  const targetStepNumber = lead.nextStepNumber || (lead.currentStepNumber ? lead.currentStepNumber + 1 : 1);
  const step = targetCampaign.steps.find(s => s.stepNumber === targetStepNumber) || targetCampaign.steps[0];

  return {
    campaign: targetCampaign,
    step,
    stepNumber: step?.stepNumber || 1,
    totalSteps: targetCampaign.steps.length,
  };
}

/**
 * Seamlessly advances a lead to a new step upon sending an email (via Gmail or manual dispatch).
 * Dynamically cues the next step so the UI continuously offers the subsequent email.
 */
export function advanceLeadStepAfterSend(
  lead: Lead,
  sentStepNumber: number,
  campaigns: DripCampaign[],
  gmailMessageId?: string,
  customSubject?: string,
  customBody?: string
): Lead {
  const now = new Date().toISOString();
  const targetCampaign = campaigns.find(
    c => c.id === lead.activeCampaignId
  ) || campaigns.find(
    c => c.stageId === lead.currentStage && c.isActive && (c.playerType === lead.playerType || c.playerType === 'all')
  ) || campaigns[0];

  const totalSteps = targetCampaign?.steps?.length || 22;
  const nextStep = sentStepNumber < totalSteps ? sentStepNumber + 1 : undefined;

  let nextScheduledAt: string | undefined = undefined;
  if (nextStep && targetCampaign) {
    const nextStepObj = targetCampaign.steps.find(s => s.stepNumber === nextStep);
    const currentStepObj = targetCampaign.steps.find(s => s.stepNumber === sentStepNumber);
    const intervalHours = (nextStepObj && currentStepObj && nextStepObj.delayHours > currentStepObj.delayHours)
      ? (nextStepObj.delayHours - currentStepObj.delayHours)
      : (targetCampaign.stageId === 'coaches' ? 24 : 168);
    nextScheduledAt = new Date(Date.now() + intervalHours * 3600 * 1000).toISOString();
  }

  // Create or update log entry
  const stepObj = targetCampaign?.steps?.find(s => s.stepNumber === sentStepNumber);
  const subject = customSubject || (stepObj ? interpolateEmail(stepObj.subject, lead) : `Flowers Soccer Academy - Step ${sentStepNumber}`);
  const body = customBody || (stepObj ? interpolateEmail(stepObj.body, lead) : '');

  const newLog: EmailLogEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    leadId: lead.id,
    campaignId: targetCampaign?.id || 'manual',
    campaignName: targetCampaign?.name || 'Flowers Soccer Academy Sequence',
    stepNumber: sentStepNumber,
    subject,
    body,
    recipientEmail: lead.email || '',
    sentAt: now,
    status: 'sent',
    reason: gmailMessageId 
      ? `Dispatched via Flowers Soccer Academy Gmail (ID: ${gmailMessageId.slice(0, 10)}...)` 
      : `Step ${sentStepNumber} dispatched to ${lead.fullName}`,
    gmailMessageId,
  };

  return {
    ...lead,
    currentStepNumber: sentStepNumber,
    nextStepNumber: nextStep,
    lastEmailSentAt: now,
    nextEmailScheduledAt: nextScheduledAt,
    dripStatus: nextStep ? 'active' : 'completed',
    activeCampaignId: targetCampaign?.id || lead.activeCampaignId,
    emailLogs: [newLog, ...lead.emailLogs],
    updatedAt: now,
  };
}

/**
 * Moves a lead to a new stage in the prospective pipeline.
 * - Cancels remaining emails from previous stage drip campaign
 * - Selects the tailored 1-Year campaign matching (stageId + playerType)
 * - If lead has no email on file, marks dripStatus as 'no_email' and pauses sending
 * - If email exists, immediately dispatches Step 1 of the new stage
 */
export function transitionLeadStage(
  lead: Lead,
  newStage: PipelineStageId,
  campaigns: DripCampaign[],
  customSessionDate?: string
): { updatedLead: Lead; notificationMsg: string } {
  const oldStageConfig = PIPELINE_STAGES.find(s => s.id === lead.currentStage);
  const newStageConfig = PIPELINE_STAGES.find(s => s.id === newStage);

  const now = new Date().toISOString();
  const updatedLogs: EmailLogEntry[] = [...lead.emailLogs];

  // 1. Cancel remaining emails from previous drip campaign
  if (lead.activeCampaignId && lead.dripStatus === 'active') {
    const prevCampaign = campaigns.find(c => c.id === lead.activeCampaignId);
    const prevName = prevCampaign ? prevCampaign.name : oldStageConfig?.label || 'Previous Stage';
    
    updatedLogs.unshift({
      id: `log-cancel-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      leadId: lead.id,
      campaignId: lead.activeCampaignId,
      campaignName: prevName,
      subject: `Cancelled previous sequence for ${oldStageConfig?.shortLabel || 'stage'}`,
      body: `Stage transition triggered: lead advanced from "${oldStageConfig?.shortLabel}" to "${newStageConfig?.shortLabel}". Previous stage automated sequence terminated.`,
      recipientEmail: lead.email || 'No email on file',
      sentAt: now,
      status: 'cancelled',
      reason: `Cancelled: Advanced to ${newStageConfig?.shortLabel}`,
    });
  }

  // Find campaign matching newStage AND lead's playerType ('goalkeeper' or 'field_player')
  const targetCampaign = campaigns.find(
    c => c.stageId === newStage && c.isActive && (c.playerType === lead.playerType || c.playerType === 'all')
  ) || campaigns.find(c => c.stageId === newStage && c.isActive);

  let newDripStatus: Lead['dripStatus'] = 'none';
  let newActiveCampaignId: string | undefined = undefined;
  let newCurrentStep: number | undefined = undefined;
  let newNextStep: number | undefined = undefined;
  let newLastSentAt: string | undefined = lead.lastEmailSentAt;
  let newNextScheduledAt: string | undefined = undefined;
  let notificationMsg = '';

  const hasEmail = Boolean(lead.email && lead.email.trim().length > 0);

  if (targetCampaign && targetCampaign.steps.length > 0) {
    newActiveCampaignId = targetCampaign.id;

    if (!hasEmail) {
      // User did not provide email: do not attempt to send email
      newDripStatus = 'no_email';
      notificationMsg = `✓ Moved ${lead.fullName} to ${newStageConfig?.shortLabel}. (No email on file; automated sequence paused until email added)`;
    } else {
      // Instantly begin new 1-year drip campaign
      newDripStatus = 'active';
      newCurrentStep = 1;

      // Step 1 email is sent immediately!
      const step1 = targetCampaign.steps[0];
      const renderedSubject = interpolateEmail(step1.subject, {
        ...lead,
        currentStage: newStage,
        scheduledSessionDate: customSessionDate || lead.scheduledSessionDate,
      });
      const renderedBody = interpolateEmail(step1.body, {
        ...lead,
        currentStage: newStage,
        scheduledSessionDate: customSessionDate || lead.scheduledSessionDate,
      });

      updatedLogs.unshift({
        id: `log-send-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        leadId: lead.id,
        campaignId: targetCampaign.id,
        campaignName: targetCampaign.name,
        stepNumber: 1,
        subject: renderedSubject,
        body: renderedBody,
        recipientEmail: lead.email,
        sentAt: now,
        status: 'sent',
        reason: `Automated 1-Year sequence (Step 1) initialized for ${lead.playerType === 'goalkeeper' ? 'Goalkeeper' : 'Field Player'} on transition to ${newStageConfig?.shortLabel}`,
      });

      newLastSentAt = now;

      // Schedule Step 2 (For coaches: 1 day / 24 hours; for prospects: 3.5 days / 84 hours)
      if (targetCampaign.steps.length > 1) {
        const step1 = targetCampaign.steps[0];
        const step2 = targetCampaign.steps[1];
        newNextStep = 2;
        const intervalHours = (step2.delayHours > step1.delayHours)
          ? (step2.delayHours - step1.delayHours)
          : (targetCampaign.stageId === 'coaches' ? 24 : 84);
        newNextScheduledAt = new Date(Date.now() + intervalHours * 3600 * 1000).toISOString();
      }

      notificationMsg = `✓ Moved ${lead.fullName} to ${newStageConfig?.shortLabel}. Initialized "${targetCampaign.name}" (Step 1 queued/sent, Step 2 cued next).`;
    }
  } else {
    newDripStatus = hasEmail ? 'none' : 'no_email';
    notificationMsg = `✓ Moved ${lead.fullName} to ${newStageConfig?.shortLabel}.`;
  }

  const updatedLead: Lead = {
    ...lead,
    currentStage: newStage,
    scheduledSessionDate: customSessionDate !== undefined ? customSessionDate : lead.scheduledSessionDate,
    stageHistory: [
      ...lead.stageHistory,
      { stage: newStage, enteredAt: now },
    ],
    updatedAt: now,
    dripStatus: newDripStatus,
    activeCampaignId: newActiveCampaignId,
    currentStepNumber: newCurrentStep,
    nextStepNumber: newNextStep,
    lastEmailSentAt: newLastSentAt,
    nextEmailScheduledAt: newNextScheduledAt,
    emailLogs: updatedLogs,
  };

  return { updatedLead, notificationMsg };
}

/**
 * Triggers the next scheduled email in the lead's current drip campaign immediately.
 */
export function triggerNextDripEmail(lead: Lead, campaigns: DripCampaign[]): { updatedLead: Lead; message: string } {
  if (!lead.email || lead.email.trim() === '') {
    return { updatedLead: lead, message: 'Cannot send email: No email address on file for this athlete.' };
  }

  const targetStepNumber = lead.nextStepNumber || (lead.currentStepNumber ? lead.currentStepNumber + 1 : 1);
  const campaign = campaigns.find(c => c.id === lead.activeCampaignId) || campaigns.find(
    c => c.stageId === lead.currentStage && c.isActive && (c.playerType === lead.playerType || c.playerType === 'all')
  );

  if (!campaign) {
    return { updatedLead: lead, message: 'Active campaign not found for this athlete.' };
  }

  const step = campaign.steps.find(s => s.stepNumber === targetStepNumber) || campaign.steps[0];
  if (!step) {
    return { updatedLead: lead, message: 'Scheduled step not found.' };
  }

  const now = new Date().toISOString();
  const renderedSubject = interpolateEmail(step.subject, lead);
  const renderedBody = interpolateEmail(step.body, lead);

  const nextStepIndex = campaign.steps.findIndex(s => s.stepNumber === step.stepNumber) + 1;
  let subsequentStepNumber: number | undefined = undefined;
  let nextScheduledAt: string | undefined = undefined;

  if (nextStepIndex < campaign.steps.length) {
    const nextStep = campaign.steps[nextStepIndex];
    subsequentStepNumber = nextStep.stepNumber;
    const intervalHours = (nextStep.delayHours > step.delayHours)
      ? (nextStep.delayHours - step.delayHours)
      : (campaign.stageId === 'coaches' ? 24 : 168);
    const delayMs = intervalHours * 3600 * 1000;
    nextScheduledAt = new Date(Date.now() + delayMs).toISOString();
  }

  const updatedLogs: EmailLogEntry[] = [
    {
      id: `log-manual-${Date.now()}`,
      leadId: lead.id,
      campaignId: campaign.id,
      campaignName: campaign.name,
      stepNumber: step.stepNumber,
      subject: renderedSubject,
      body: renderedBody,
      recipientEmail: lead.email,
      sentAt: now,
      status: 'sent',
      reason: `Step ${step.stepNumber} of ${campaign.steps.length} dispatched (${step.cadenceNote || 'Automated Sequence'})`,
    },
    ...lead.emailLogs,
  ];

  const updatedLead: Lead = {
    ...lead,
    activeCampaignId: campaign.id,
    currentStepNumber: step.stepNumber,
    nextStepNumber: subsequentStepNumber,
    lastEmailSentAt: now,
    nextEmailScheduledAt: nextScheduledAt,
    dripStatus: subsequentStepNumber ? 'active' : 'completed',
    emailLogs: updatedLogs,
    updatedAt: now,
  };

  const statusMsg = subsequentStepNumber 
    ? `Step ${step.stepNumber} of ${campaign.steps.length} logged for ${lead.fullName}. Step ${subsequentStepNumber} cued next.`
    : `Step ${step.stepNumber} of ${campaign.steps.length} logged. Sequence now completed for this stage.`;

  return { updatedLead, message: statusMsg };
}

/**
 * Creates a brand new lead and immediately enrolls them into the Stage 1 Drip Campaign.
 */
export function createNewLead(
  input: {
    fullName: string;
    email?: string;
    phone: string;
    playerType: PlayerType;
    location: string;
    howHeardAboutUs: string;
    source?: string;
    notesInterest: string;
    initialStage?: PipelineStageId;
  },
  campaigns: DripCampaign[]
): { newLead: Lead; notificationMsg: string } {
  const stage = input.initialStage || 'inquiry';
  const now = new Date().toISOString();
  const howHeard = input.howHeardAboutUs || input.source || 'Yard Signs';

  const emptyLead: Lead = {
    id: `lead-${Date.now()}`,
    fullName: input.fullName.trim(),
    email: (input.email || '').trim(),
    phone: input.phone.trim(),
    playerType: input.playerType || 'goalkeeper',
    location: input.location || 'Lilburn',
    howHeardAboutUs: howHeard,
    source: howHeard,
    notesInterest: input.notesInterest.trim() || `${input.playerType === 'goalkeeper' ? 'Goalkeeper' : 'Field Player'} training at ${input.location || 'Lilburn'}`,
    currentStage: stage,
    stageHistory: [{ stage, enteredAt: now }],
    createdAt: now,
    updatedAt: now,
    dripStatus: 'none',
    emailLogs: [],
    notes: [],
  };

  const { updatedLead, notificationMsg } = transitionLeadStage(emptyLead, stage, campaigns);
  return {
    newLead: updatedLead,
    notificationMsg: `Athlete "${input.fullName}" (${input.playerType === 'goalkeeper' ? 'Goalkeeper' : 'Field Player'}, ${input.location}) added. ${notificationMsg}`,
  };
}

/**
 * Exports leads to CSV format for safe download and backup
 */
export function exportLeadsToCsv(leads: Lead[]): string {
  const headers = [
    'ID',
    'Full Name',
    'Email',
    'Phone',
    'Player Type',
    'Location',
    'How Heard About Us',
    'Current Stage',
    'Current Step',
    'Next Step',
    'Drip Status',
    'Notes',
    'Created At',
  ];

  const rows = leads.map((l) => [
    l.id,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    l.playerType,
    `"${(l.location || '').replace(/"/g, '""')}"`,
    `"${(l.howHeardAboutUs || l.source || '').replace(/"/g, '""')}"`,
    l.currentStage,
    l.currentStepNumber || 1,
    l.nextStepNumber || '',
    l.dripStatus,
    `"${(l.notesInterest || '').replace(/"/g, '""')}"`,
    l.createdAt,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

