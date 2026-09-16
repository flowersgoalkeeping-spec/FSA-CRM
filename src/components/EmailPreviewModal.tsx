import { Mail, X, CheckCircle2, Clock, Ban, Send, ExternalLink } from 'lucide-react';
import { EmailLogEntry } from '../types';

interface EmailPreviewModalProps {
  email: EmailLogEntry | null;
  onClose: () => void;
  onSendViaGmail?: (email: EmailLogEntry) => void;
  isGmailConnected?: boolean;
}

export function EmailPreviewModal({ 
  email, 
  onClose,
  onSendViaGmail,
  isGmailConnected = false,
}: EmailPreviewModalProps) {
  if (!email) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        id="email-preview-modal"
        className="bg-black border border-zinc-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] text-zinc-100"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-600/30 text-blue-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Email Preview</h3>
              <p className="text-xs text-zinc-400">{email.campaignName}</p>
            </div>
          </div>
          <button
            id="close-email-preview-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Meta Bar */}
        <div className="p-6 bg-black border-b border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</span>
              {email.status === 'sent' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 
                  {email.gmailMessageId ? 'Sent via Gmail' : 'Logged in CRM'}
                </span>
              )}
              {email.status === 'cancelled' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950 text-rose-300 border border-rose-800">
                  <Ban className="w-3.5 h-3.5 text-rose-400" /> Cancelled Automatically
                </span>
              )}
              {email.status === 'scheduled' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-950 text-blue-300 border border-blue-800">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Scheduled
                </span>
              )}
            </div>
            <span className="text-xs text-zinc-400">
              {new Date(email.sentAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block mb-0.5 font-medium">From:</span>
              <span className="font-semibold text-white">Flowers Soccer Academy &lt;flowersgoalkeeping@gmail.com&gt;</span>
            </div>
            <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block mb-0.5 font-medium">To:</span>
              <span className="font-semibold text-white">{email.recipientEmail}</span>
            </div>
          </div>

          {email.reason && (
            <div className="text-xs bg-blue-950/30 text-blue-300 px-3 py-1.5 rounded-xl border border-blue-900/50">
              <span className="font-semibold">Event Trigger:</span> {email.reason}
            </div>
          )}

          <div>
            <span className="text-xs font-semibold text-zinc-400 block mb-1">Subject:</span>
            <div className="text-sm font-bold text-white bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
              {email.subject}
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-6 bg-zinc-950 overflow-y-auto flex-1 font-sans text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap selection:bg-blue-600 selection:text-white">
          {email.body}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
          >
            Close Preview
          </button>

          {onSendViaGmail && (
            <button
              onClick={() => {
                onSendViaGmail(email);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-950/40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send via Gmail</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
