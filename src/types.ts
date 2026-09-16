export type PipelineStageId = 
  | 'inquiry'          // 1. Persons who reach out
  | 'intro_scheduled'  // 2. Persons who schedule a free introductory session
  | 'intro_attended'   // 3. Persons who show up to the scheduled session
  | 'client_converted' // 4. Persons who become clients (with onboarding & retention drip)
  | 'inactive_client'  // 5. Clients who leave and I am hoping return (win-back drip)
  | 'coaches';         // 6. Coaches (Outreach, partnerships & team clinics)

export type PlayerType = 'goalkeeper' | 'field_player';

export interface PipelineStageConfig {
  id: PipelineStageId;
  order: number;
  label: string;
  shortLabel: string;
  description: string;
  badgeColor: string;
  accentColor: string;
  hasDrip: boolean;
  dripCampaignId?: string;
}

export interface DripEmailStep {
  id: string;
  stepNumber: number;
  delayText: string; // e.g., "Immediate (Day 0)", "Day 4", "Week 2", "Week 14"
  delayHours: number; // For scheduling logic calculation
  subject: string;
  body: string;
  keyTakeaway: string;
  cadenceNote?: string; // e.g. "Month 1: 2x/week" | "Months 2-12: 1x/week"
}

export interface DripCampaign {
  id: string;
  stageId: PipelineStageId;
  playerType: PlayerType | 'all';
  name: string;
  description: string;
  steps: DripEmailStep[];
  isActive: boolean;
}

export interface EmailLogEntry {
  id: string;
  leadId: string;
  campaignId: string;
  campaignName: string;
  stepNumber?: number;
  subject: string;
  body: string;
  recipientEmail: string;
  sentAt: string; // ISO string
  status: 'sent' | 'cancelled' | 'scheduled' | 'skipped';
  reason?: string; // e.g. "Triggered on stage transition", "Cancelled due to advance to Intro Scheduled"
  gmailMessageId?: string; // Gmail API message id when sent through Google Workspace
}

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string; // Can be empty if not provided
  phone: string;
  playerType: PlayerType; // 'goalkeeper' | 'field_player'
  location: string; // e.g. 'Lilburn', 'Gainesville', 'Loganville', or custom
  howHeardAboutUs: string; // e.g. "Yard Signs", "Word of Mouth", "Google Search", "Instagram", etc.
  source?: string; // Backwards-compatible alias for howHeardAboutUs
  notesInterest: string; // Specific training / business interest (e.g. Goalkeeper agility, private sessions)
  currentStage: PipelineStageId;
  stageHistory: {
    stage: PipelineStageId;
    enteredAt: string;
  }[];
  createdAt: string;
  updatedAt: string;

  // Drip campaign state
  dripStatus: 'active' | 'paused' | 'completed' | 'none' | 'no_email';
  activeCampaignId?: string;
  currentStepNumber?: number;
  lastEmailSentAt?: string;
  nextEmailScheduledAt?: string;
  nextStepNumber?: number;

  // History & Notes
  emailLogs: EmailLogEntry[];
  notes: LeadNote[];
  scheduledSessionDate?: string; // If intro scheduled
}

export type ViewMode = 'board' | 'list';
