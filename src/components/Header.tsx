import { 
  Users, UserPlus, Mail, Search, RotateCcw, Sparkles, LogOut, ShieldCheck 
} from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { User } from 'firebase/auth';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewLeadModal: () => void;
  onOpenDripModal: () => void;
  onResetSampleData: () => void;
  currentUser: User | null;
  onSignInGoogle: () => void;
  onSignOutGoogle: () => void;
  isSigningInGoogle?: boolean;
}

export function Header({
  searchQuery,
  onSearchChange,
  onOpenNewLeadModal,
  onOpenDripModal,
  onResetSampleData,
  currentUser,
  onSignInGoogle,
  onSignOutGoogle,
  isSigningInGoogle = false,
}: HeaderProps) {
  return (
    <header className="bg-black/95 border-b border-zinc-900 sticky top-0 z-30 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding & Action Bar */}
        <div className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Logo & Academy Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-lg border border-blue-900/60 bg-black shrink-0 flex items-center justify-center p-0.5 group ring-1 ring-white/10">
              <img 
                src="/logo.jpg" 
                alt="Flowers Soccer Academy Crest" 
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                  Flowers Soccer Academy
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/60 shadow-xs">
                    1-Year Drip CRM
                  </span>
                </h1>
              </div>
              <p className="text-xs text-zinc-400">
                Goalkeeper & Field Player Training · Lilburn · Gainesville · Loganville
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search athlete quickly */}
            <div className="relative w-44 sm:w-56">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search athletes..."
                className="w-full text-xs pl-8.5 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-hidden focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Google / Gmail Status */}
            {currentUser ? (
              <div 
                id="gmail-connected-pill"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-zinc-200 shadow-xs"
                title={`Connected as ${currentUser.email} - Sending emails as Flowers Soccer Academy via Gmail`}
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[11px] text-blue-400 leading-tight">
                    Gmail Connected
                  </span>
                  <span className="text-[10px] text-zinc-400 max-w-[120px] truncate leading-tight">
                    {currentUser.email}
                  </span>
                </div>
                <button
                  onClick={onSignOutGoogle}
                  className="ml-1 p-1 text-zinc-500 hover:text-blue-400 rounded-md transition-colors cursor-pointer"
                  title="Disconnect Google Account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <GoogleSignInButton
                onClick={onSignInGoogle}
                isLoading={isSigningInGoogle}
                label="Connect Gmail"
              />
            )}

            {/* View 1-Year Drip Sequences Button */}
            <button
              id="open-drip-campaigns-btn"
              onClick={onOpenDripModal}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-blue-800/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Inspect 1-Year (56-step) Drip Email Sequences for Goalkeepers and Field Players"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">1-Year Sequences (56 Steps)</span>
              <span className="sm:hidden">Drips</span>
            </button>

            {/* Add Prospective Athlete Button */}
            <button
              id="add-new-lead-top-btn"
              onClick={onOpenNewLeadModal}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Athlete</span>
            </button>

            {/* Reset demo data */}
            <button
              onClick={onResetSampleData}
              className="p-2 text-zinc-600 hover:text-zinc-300 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer"
              title="Reset to sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
