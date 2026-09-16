import { useState, useEffect } from 'react';
import { Mail, Send, X, AlertCircle, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';
import { sendGmailEmail } from '../services/gmailService';
import { GoogleSignInButton } from './GoogleSignInButton';
import { googleSignIn } from '../services/googleAuth';
import { User } from 'firebase/auth';

export interface GmailSendPayload {
  to: string;
  recipientName: string;
  subject: string;
  body: string;
  leadId?: string;
  stepNumber?: number;
  campaignName?: string;
  fromName?: string;
}

interface GmailConfirmSendModalProps {
  payload: GmailSendPayload;
  currentUser: User | null;
  onClose: () => void;
  onSuccess: (result: { messageId: string; payload: GmailSendPayload }) => void;
  onAuthSuccess?: (user: User) => void;
}

export function GmailConfirmSendModal({
  payload,
  currentUser,
  onClose,
  onSuccess,
  onAuthSuccess,
}: GmailConfirmSendModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Allow custom edits before sending
  const [subject, setSubject] = useState(payload.subject);
  const [body, setBody] = useState(payload.body);

  const handleSignIn = async () => {
    try {
      setIsAuthorizing(true);
      setErrorMessage(null);
      const { user } = await googleSignIn();
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setErrorMessage(err.message || 'Failed to authorize with Google.');
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleConfirmSend = async () => {
    setIsSending(true);
    setErrorMessage(null);

    try {
      const result = await sendGmailEmail({
        to: payload.to,
        subject,
        body,
        fromName: payload.fromName || 'Flowers Soccer Academy',
      });

      onSuccess({ messageId: result.id, payload: { ...payload, subject, body } });
      onClose();
    } catch (err: any) {
      console.error('Failed to send Gmail email:', err);
      setErrorMessage(err.message || 'Failed to send email via Gmail.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        id="gmail-confirm-send-modal"
        className="bg-black border border-zinc-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col text-zinc-100"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-600/30 text-blue-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Send Drip via Gmail
                <span className="text-[10px] bg-zinc-900 text-blue-400 border border-blue-900/60 px-1.5 py-0.2 rounded font-medium">
                  Flowers Soccer Academy
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Dispatches directly from your authenticated Google Workspace inbox
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSending}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Details & Compose Form */}
        <div className="p-5 space-y-3.5 overflow-y-auto max-h-[75vh]">
          {/* Sender & Recipient bar */}
          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1 text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>From Name:</span>
              <span className="font-semibold text-white">Flowers Soccer Academy</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>From Email:</span>
              <span className="font-mono text-emerald-400 text-[11px]">{currentUser?.email || 'flowersgoalkeeping@gmail.com'}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400 pt-1 border-t border-zinc-800">
              <span>Recipient:</span>
              <span className="font-semibold text-white">{payload.recipientName} ({payload.to})</span>
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Body Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">
              Message Body (Customizable before send)
            </label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-hidden focus:border-blue-500 font-sans leading-relaxed"
            />
          </div>

          {/* Error notice if send fails */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/80 rounded-xl flex items-start gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Delivery Error:</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={onClose}
            disabled={isSending}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
          >
            Cancel
          </button>

          {!currentUser ? (
            <GoogleSignInButton
              onClick={handleSignIn}
              isLoading={isAuthorizing}
              label="Authorize Gmail to Send"
            />
          ) : (
            <button
              onClick={handleConfirmSend}
              disabled={isSending}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-950/40"
            >
              {isSending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending via Gmail...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Gmail</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
