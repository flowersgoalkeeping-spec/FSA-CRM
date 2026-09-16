import { useState, useEffect } from 'react';
import { 
  DripCampaign, Lead, PipelineStageId, ViewMode, EmailLogEntry, PlayerType 
} from './types';
import { 
  DEFAULT_DRIP_CAMPAIGNS, INITIAL_LEADS, PIPELINE_STAGES, DEFAULT_LOCATIONS 
} from './data/pipelineConfig';
import { 
  loadLeadsFromStorage, saveLeadsToStorage, 
  loadCampaignsFromStorage, saveCampaignsToStorage, 
  transitionLeadStage, triggerNextDripEmail, createNewLead,
  advanceLeadStepAfterSend
} from './services/dripEngine';
import { initAuth, googleSignIn, logout } from './services/googleAuth';
import { User } from 'firebase/auth';
import { Header } from './components/Header';
import { PipelineMetrics } from './components/PipelineMetrics';
import { PipelineBoard } from './components/PipelineBoard';
import { StagePage } from './components/StagePage';
import { ReferralStatsCard } from './components/ReferralStatsCard';
import { LeadDetailModal } from './components/LeadDetailModal';
import { DripCampaignModal } from './components/DripCampaignModal';
import { NewLeadModal } from './components/NewLeadModal';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { GmailConfirmSendModal, GmailSendPayload } from './components/GmailConfirmSendModal';
import { CheckCircle2, AlertCircle, X, Sparkles, Send, Mail } from 'lucide-react';

export default function App() {
  const [leads, setLeads] = useState<Lead[]>(() => loadLeadsFromStorage());
  const [campaigns, setCampaigns] = useState<DripCampaign[]>(() => loadCampaignsFromStorage());
  const [locations, setLocations] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('flowers_academy_locations');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_LOCATIONS;
  });

  // Google Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSigningInGoogle, setIsSigningInGoogle] = useState(false);

  // Gmail Send Modal State
  const [gmailSendPayload, setGmailSendPayload] = useState<GmailSendPayload | null>(null);

  // Navigation / Search / Stage Page State (Dedicated Stage Pages)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStagePage, setActiveStagePage] = useState<PipelineStageId | null>(null);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [previewEmail, setPreviewEmail] = useState<EmailLogEntry | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isDripModalOpen, setIsDripModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save locations
  useEffect(() => {
    try {
      localStorage.setItem('flowers_academy_locations', JSON.stringify(locations));
    } catch (e) {}
  }, [locations]);

  // Initialize Firebase Auth listener for Google account
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
      },
      () => {
        setCurrentUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    saveLeadsToStorage(leads);
  }, [leads]);

  useEffect(() => {
    saveCampaignsToStorage(campaigns);
  }, [campaigns]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 6000);
  };

  const handleSignInGoogle = async () => {
    try {
      setIsSigningInGoogle(true);
      const { user } = await googleSignIn();
      setCurrentUser(user);
      showToast(`Connected to Gmail as ${user.email}! Real email sending enabled for Flowers Soccer Academy.`);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      showToast(`Sign in error: ${err.message || 'Please check popup settings and try again.'}`);
    } finally {
      setIsSigningInGoogle(false);
    }
  };

  const handleSignOutGoogle = async () => {
    try {
      await logout();
      setCurrentUser(null);
      showToast('Google account disconnected.');
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const handleOpenSendGmail = (payload: GmailSendPayload) => {
    setGmailSendPayload({
      ...payload,
      fromName: payload.fromName || 'Flowers Soccer Academy',
    });
  };

  const handleGmailSendSuccess = (result: { messageId: string; payload: GmailSendPayload }) => {
    const { messageId, payload } = result;
    
    if (payload.leadId) {
      setLeads((prev) =>
        prev.map((lead) => {
          if (lead.id !== payload.leadId) return lead;

          const stepToAdvance = payload.stepNumber || lead.nextStepNumber || lead.currentStepNumber || 1;
          const updatedLead = advanceLeadStepAfterSend(
            lead,
            stepToAdvance,
            campaigns,
            messageId,
            payload.subject,
            payload.body
          );

          if (selectedLead && selectedLead.id === lead.id) {
            setSelectedLead(updatedLead);
          }
          return updatedLead;
        })
      );
    }

    const nextStepNotice = payload.stepNumber ? ` Step ${payload.stepNumber + 1} is cued next.` : '';
    showToast(`✓ Real email dispatched from Flowers Soccer Academy to ${payload.to}!${nextStepNotice}`);
  };

  const handleSendTestEmailToMyself = () => {
    const targetEmail = currentUser?.email || 'flowersgoalkeeping@gmail.com';
    handleOpenSendGmail({
      to: targetEmail,
      recipientName: 'Coach Flowers',
      subject: 'Flowers Soccer Academy - 1-Year Drip Integration Test',
      body: `Hi Coach Flowers,\n\nThis is a live test email confirming that Flowers Soccer Academy CRM is connected to your Gmail account (${targetEmail}) via the Google Workspace Gmail API!\n\nAutomated 1-Year drip campaigns (Goalkeeper & Field Player) will dispatch under the sender name "Flowers Soccer Academy".\n\nBest regards,\nFlowers Soccer Academy\nLilburn · Gainesville · Loganville`,
      campaignName: 'Flowers Soccer Academy Verification',
      fromName: 'Flowers Soccer Academy',
    });
  };

  // Move a lead down/across the funnel
  const handleMoveStage = (lead: Lead, targetStage: PipelineStageId, sessionDate?: string) => {
    const { updatedLead, notificationMsg } = transitionLeadStage(lead, targetStage, campaigns, sessionDate);
    
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
    
    if (selectedLead && selectedLead.id === updatedLead.id) {
      setSelectedLead(updatedLead);
    }

    showToast(notificationMsg);

    // If target stage triggered a Step 1 email and lead has email, offer to dispatch via Gmail
    if (updatedLead.email && updatedLead.email.trim().length > 0) {
      const step1Log = updatedLead.emailLogs.find(
        (log) => log.stepNumber === 1 && log.status === 'sent' && !log.gmailMessageId
      );
      if (step1Log) {
        handleOpenSendGmail({
          to: updatedLead.email,
          recipientName: updatedLead.fullName,
          subject: step1Log.subject,
          body: step1Log.body,
          leadId: updatedLead.id,
          stepNumber: 1,
          campaignName: step1Log.campaignName,
          fromName: 'Flowers Soccer Academy',
        });
      }
    }
  };

  // Trigger next scheduled email in the current drip sequence
  const handleTriggerNextEmail = (lead: Lead) => {
    const { updatedLead, message } = triggerNextDripEmail(lead, campaigns);
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
    if (selectedLead && selectedLead.id === updatedLead.id) {
      setSelectedLead(updatedLead);
    }
    showToast(message);
  };

  // Pause / Resume lead's drip campaign
  const handleTogglePauseDrip = (lead: Lead) => {
    const nextStatus = lead.dripStatus === 'paused' ? 'active' : 'paused';
    const updatedLead: Lead = {
      ...lead,
      dripStatus: nextStatus,
      updatedAt: new Date().toISOString(),
    };
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
    if (selectedLead && selectedLead.id === updatedLead.id) {
      setSelectedLead(updatedLead);
    }
    showToast(`Drip emails for ${lead.fullName} are now ${nextStatus}.`);
  };

  // Update lead (e.g. adding email or changing fields)
  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
    if (selectedLead && selectedLead.id === updatedLead.id) {
      setSelectedLead(updatedLead);
    }
    showToast(`Updated profile for ${updatedLead.fullName}.`);
  };

  // Add internal note
  const handleAddNote = (leadId: string, text: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const updated: Lead = {
            ...l,
            notes: [
              ...l.notes,
              {
                id: `note-${Date.now()}`,
                text,
                createdAt: new Date().toISOString(),
                author: 'Coach Flowers',
              },
            ],
            updatedAt: new Date().toISOString(),
          };
          if (selectedLead && selectedLead.id === leadId) {
            setSelectedLead(updated);
          }
          return updated;
        }
        return l;
      })
    );
  };

  // Create new prospective lead
  const handleCreateLead = (data: {
    fullName: string;
    email: string;
    phone: string;
    playerType: PlayerType;
    location: string;
    howHeardAboutUs: string;
    source: string;
    notesInterest: string;
    initialStage: PipelineStageId;
  }) => {
    const { newLead, notificationMsg } = createNewLead(data, campaigns);
    setLeads((prev) => [newLead, ...prev]);
    setIsNewLeadModalOpen(false);
    showToast(notificationMsg);

    // Prompt to send Step 1 email via Gmail if athlete has an email
    if (newLead.email && newLead.emailLogs.length > 0) {
      const firstEmail = newLead.emailLogs[0];
      handleOpenSendGmail({
        to: newLead.email,
        recipientName: newLead.fullName,
        subject: firstEmail.subject,
        body: firstEmail.body,
        leadId: newLead.id,
        stepNumber: 1,
        campaignName: firstEmail.campaignName,
        fromName: 'Flowers Soccer Academy',
      });
    }
  };

  // Add location to dropdown
  const handleAddLocation = (newLoc: string) => {
    if (!locations.includes(newLoc)) {
      setLocations((prev) => [...prev, newLoc]);
      showToast(`Added new training location: ${newLoc}`);
    }
  };

  // Delete lead
  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(null);
    }
    showToast('Athlete removed from pipeline.');
  };

  // Update campaign templates
  const handleUpdateCampaigns = (updatedCampaigns: DripCampaign[]) => {
    setCampaigns(updatedCampaigns);
    showToast('1-Year Drip sequence templates updated successfully.');
  };

  // Reset demo data
  const handleResetSampleData = () => {
    setLeads(INITIAL_LEADS);
    setCampaigns(DEFAULT_DRIP_CAMPAIGNS);
    setLocations(DEFAULT_LOCATIONS);
    localStorage.removeItem('prospect_flow_crm_leads_v2');
    localStorage.removeItem('prospect_flow_crm_campaigns_v2');
    localStorage.removeItem('flowers_academy_locations');
    showToast('Reset to demo athletes and default 1-year sequences.');
  };

  // Search filter
  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      lead.fullName.toLowerCase().includes(q) ||
      (lead.email || '').toLowerCase().includes(q) ||
      (lead.notesInterest || '').toLowerCase().includes(q) ||
      (lead.howHeardAboutUs || '').toLowerCase().includes(q) ||
      (lead.location || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div 
          id="crm-toast-banner"
          className="fixed bottom-5 right-5 z-50 max-w-md bg-zinc-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <div className="text-xs font-medium leading-relaxed flex-1 text-zinc-200">
            {toastMessage}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-zinc-400 hover:text-white p-0.5 rounded-sm cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
        onOpenDripModal={() => setIsDripModalOpen(true)}
        onResetSampleData={handleResetSampleData}
        currentUser={currentUser}
        onSignInGoogle={handleSignInGoogle}
        onSignOutGoogle={handleSignOutGoogle}
        isSigningInGoogle={isSigningInGoogle}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* If user clicked into a stage, render the Dedicated Stage Page */}
        {activeStagePage ? (
          <StagePage
            stageId={activeStagePage}
            leads={leads}
            campaigns={campaigns}
            locations={locations}
            onBackToDashboard={() => setActiveStagePage(null)}
            onSelectStage={(newStage) => setActiveStagePage(newStage)}
            onSelectLead={(lead) => setSelectedLead(lead)}
            onMoveStage={handleMoveStage}
            onOpenSendGmail={handleOpenSendGmail}
            onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
            isGmailConnected={!!currentUser}
          />
        ) : (
          <>
            {/* Pipeline Metrics and Funnel Progression */}
            <PipelineMetrics 
              leads={leads} 
              onSelectStage={(stageId) => setActiveStagePage(stageId)} 
            />

            {/* Informational Guidance Banner with Gmail Integration */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-xl bg-blue-600/15 border border-blue-600/30 text-blue-400">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="font-bold text-white">Flowers Soccer Academy Email Dispatch:</span>
                  <span className="text-zinc-400 ml-1">
                    {currentUser ? (
                      <>Sending live sequence emails under <strong>Flowers Soccer Academy</strong> via <strong>{currentUser.email}</strong>.</>
                    ) : (
                      <>Connect Gmail above to dispatch live 1-year sequences to athletes & parents.</>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {currentUser ? (
                  <button
                    id="send-test-email-banner-btn"
                    onClick={handleSendTestEmailToMyself}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Send a quick test email to verify sender name and Gmail connectivity"
                  >
                    <Send className="w-3 h-3 text-blue-400" />
                    <span>Send Test Email to My Gmail</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSignInGoogle}
                    disabled={isSigningInGoogle}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-xs"
                  >
                    Connect Gmail
                  </button>
                )}
                <button
                  onClick={() => setIsDripModalOpen(true)}
                  className="text-blue-400 hover:text-blue-300 font-semibold whitespace-nowrap underline underline-offset-2 shrink-0 ml-1 cursor-pointer"
                >
                  1-Year Sequences (56 Steps) →
                </button>
              </div>
            </div>

            {/* 5-Stage Interactive Overview (Clean, No Clutter - Click to open Stage Page) */}
            <PipelineBoard
              leads={filteredLeads}
              campaigns={campaigns}
              locations={locations}
              onSelectStage={(stageId) => setActiveStagePage(stageId)}
              onOpenNewLeadModal={() => setIsNewLeadModalOpen(true)}
            />

            {/* Referral Acquisition Stats Card (How They Heard About Us) */}
            <ReferralStatsCard leads={leads} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-5 px-6 text-center text-xs text-zinc-500">
        Flowers Soccer Academy • Goalkeeper & Field Player 1-Year Pipeline (56 Steps) • Lilburn · Gainesville · Loganville
      </footer>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          campaigns={campaigns}
          onClose={() => setSelectedLead(null)}
          onMoveStage={handleMoveStage}
          onTriggerNextEmail={handleTriggerNextEmail}
          onTogglePauseDrip={handleTogglePauseDrip}
          onAddNote={handleAddNote}
          onPreviewEmail={(email) => setPreviewEmail(email)}
          onDeleteLead={handleDeleteLead}
          onSendGmail={handleOpenSendGmail}
          onUpdateLead={handleUpdateLead}
        />
      )}

      {/* 1-Year Drip Sequences Modal */}
      {isDripModalOpen && (
        <DripCampaignModal
          campaigns={campaigns}
          leads={leads}
          onClose={() => setIsDripModalOpen(false)}
          onUpdateCampaigns={handleUpdateCampaigns}
          onResetDefaultCampaigns={() => {
            setCampaigns(DEFAULT_DRIP_CAMPAIGNS);
            saveCampaignsToStorage(DEFAULT_DRIP_CAMPAIGNS);
            showToast('1-Year Drip sequences restored to default.');
          }}
          onPreviewEmailContent={(subject, body, campaignName) => {
            setPreviewEmail({
              id: 'preview-draft',
              leadId: 'preview',
              campaignId: 'preview',
              campaignName,
              subject,
              body,
              recipientEmail: currentUser?.email || 'flowersgoalkeeping@gmail.com',
              sentAt: new Date().toISOString(),
              status: 'scheduled',
              reason: '1-Year template preview for Flowers Soccer Academy',
            });
          }}
        />
      )}

      {/* New Lead Modal */}
      {isNewLeadModalOpen && (
        <NewLeadModal
          locations={locations}
          onAddLocation={handleAddLocation}
          onClose={() => setIsNewLeadModalOpen(false)}
          onSubmit={handleCreateLead}
        />
      )}

      {/* Email Preview Modal */}
      {previewEmail && (
        <EmailPreviewModal
          email={previewEmail}
          onClose={() => setPreviewEmail(null)}
          onSendViaGmail={(email) =>
            handleOpenSendGmail({
              to: email.recipientEmail,
              recipientName: selectedLead?.fullName || 'Athlete',
              subject: email.subject,
              body: email.body,
              leadId: email.leadId !== 'preview' ? email.leadId : undefined,
              stepNumber: email.stepNumber,
              campaignName: email.campaignName,
              fromName: 'Flowers Soccer Academy',
            })
          }
          isGmailConnected={!!currentUser}
        />
      )}

      {/* Gmail Confirmation & Dispatch Modal */}
      {gmailSendPayload && (
        <GmailConfirmSendModal
          payload={gmailSendPayload}
          currentUser={currentUser}
          onClose={() => setGmailSendPayload(null)}
          onSuccess={handleGmailSendSuccess}
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            showToast(`Connected to Gmail as ${user.email}!`);
          }}
        />
      )}
    </div>
  );
}
