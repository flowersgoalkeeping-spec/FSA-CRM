import { useState, type FormEvent } from 'react';
import { X, UserPlus, Mail, Phone, Tag, Sparkles, CheckCircle2, MapPin, AlertCircle } from 'lucide-react';
import { PipelineStageId, PlayerType } from '../types';
import { PIPELINE_STAGES, DEFAULT_REFERRAL_SOURCES, DEFAULT_LOCATIONS } from '../data/pipelineConfig';

interface NewLeadModalProps {
  locations: string[];
  onAddLocation: (loc: string) => void;
  onClose: () => void;
  onSubmit: (data: {
    fullName: string;
    email: string;
    phone: string;
    playerType: PlayerType;
    location: string;
    howHeardAboutUs: string;
    source: string;
    notesInterest: string;
    initialStage: PipelineStageId;
  }) => void;
}

export function NewLeadModal({ 
  locations, 
  onAddLocation, 
  onClose, 
  onSubmit 
}: NewLeadModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [playerType, setPlayerType] = useState<PlayerType>('goalkeeper');
  const [selectedLocation, setSelectedLocation] = useState(locations[0] || 'Lilburn');
  const [customLocation, setCustomLocation] = useState('');
  const [isAddingNewLocation, setIsAddingNewLocation] = useState(false);
  const [howHeardAboutUs, setHowHeardAboutUs] = useState(DEFAULT_REFERRAL_SOURCES[0] || 'Yard Signs');
  const [notesInterest, setNotesInterest] = useState('');
  const [initialStage, setInitialStage] = useState<PipelineStageId>('inquiry');

  const handleLocationChange = (val: string) => {
    if (val === '__add_new__') {
      setIsAddingNewLocation(true);
      setCustomLocation('');
    } else {
      setIsAddingNewLocation(false);
      setSelectedLocation(val);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    let finalLocation = selectedLocation;
    if (isAddingNewLocation && customLocation.trim()) {
      finalLocation = customLocation.trim();
      onAddLocation(finalLocation);
    }

    onSubmit({
      fullName: fullName.trim(),
      email: email.trim(), // Can be empty string (optional!)
      phone: phone.trim(),
      playerType,
      location: finalLocation,
      howHeardAboutUs,
      source: howHeardAboutUs,
      notesInterest: notesInterest.trim(),
      initialStage,
    });
  };

  const selectedStageConfig = PIPELINE_STAGES.find((s) => s.id === initialStage);
  const hasEmail = Boolean(email.trim().length > 0);

  const isCoaches = initialStage === 'coaches';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        id="new-lead-modal"
        className="bg-black rounded-2xl shadow-2xl border border-zinc-800 max-w-lg w-full overflow-hidden text-zinc-100 flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isCoaches ? 'Add Coach / Partner Contact' : 'Add Prospective Athlete'}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {isCoaches 
                  ? 'Enroll coach into Flowers Soccer Academy Coach Outreach Sequence'
                  : 'Enroll athlete into Flowers Soccer Academy 1-Year Pipeline'}
              </p>
            </div>
          </div>
          <button
            id="close-new-lead-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Athlete / Coach Name */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">
              {isCoaches ? 'Coach Full Name' : 'Athlete Full Name'} <span className="text-blue-500">*</span>
            </label>
            <input
              id="new-lead-fullname"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isCoaches ? "e.g. Coach David Miller" : "e.g. Cameron Bennett"}
              className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 placeholder-zinc-500"
            />
          </div>

          {/* Player Type (Goalkeeper vs Field Player) & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Player Type */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                {isCoaches ? 'Clinic Focus' : 'Player Focus / Position'} <span className="text-blue-500">*</span>
              </label>
              <select
                id="new-lead-player-type"
                value={playerType}
                onChange={(e) => setPlayerType(e.target.value as PlayerType)}
                className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 font-semibold cursor-pointer"
              >
                <option value="goalkeeper">{isCoaches ? '🧤 Goalkeeper Clinics' : '⚽ Goalkeeper'}</option>
                <option value="field_player">{isCoaches ? '🏃 Team Clinics / Finishing' : '🏃 Field Player'}</option>
              </select>
              <p className="text-[10px] text-zinc-400 mt-1">
                Auto-assigns tailored {playerType === 'goalkeeper' ? 'Goalkeeper' : 'Field Player'} sequence.
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                {isCoaches ? 'Primary Club/School Area' : 'Training Location'} <span className="text-blue-500">*</span>
              </label>
              {!isAddingNewLocation ? (
                <select
                  id="new-lead-location"
                  value={selectedLocation}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 font-semibold cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      📍 {loc}
                    </option>
                  ))}
                  <option value="__add_new__">+ Add New Location...</option>
                </select>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="Enter location name..."
                      className="w-full text-xs p-2.5 bg-zinc-950 border border-blue-500 rounded-xl text-zinc-100 placeholder-zinc-500"
                    />
                    <button
                      type="button"
                      onClick={() => setIsAddingNewLocation(false)}
                      className="px-2 py-2 text-[11px] text-zinc-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Email (OPTIONAL) & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email Address - Not Mandatory */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-zinc-300">
                  Email Address
                </label>
                <span className="text-[10px] font-semibold text-zinc-400">
                  (Optional)
                </span>
              </div>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                <input
                  id="new-lead-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isCoaches ? "coach@club.org" : "athlete@example.com"}
                  className="w-full text-xs p-2.5 pl-8.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 placeholder-zinc-500"
                />
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">
                {hasEmail 
                  ? '✓ Email on file. Automated 56-step drip will be active.' 
                  : 'Leave blank if not obtained yet. Emails will pause until added.'}
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                <input
                  id="new-lead-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full text-xs p-2.5 pl-8.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 placeholder-zinc-500"
                />
              </div>
            </div>
          </div>

          {/* How They Heard About Us & Pipeline Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* How they heard about us */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                {isCoaches ? 'Relationship / Source' : 'How they heard about us'}
              </label>
              <select
                id="new-lead-how-heard"
                value={howHeardAboutUs}
                onChange={(e) => setHowHeardAboutUs(e.target.value)}
                className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 font-semibold cursor-pointer"
              >
                {DEFAULT_REFERRAL_SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {source === 'Yard Signs' ? '🪧 Yard Signs' : `📣 ${source}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Stage */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">
                Initial Pipeline Stage
              </label>
              <select
                id="new-lead-initial-stage"
                value={initialStage}
                onChange={(e) => setInitialStage(e.target.value as PipelineStageId)}
                className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 font-semibold cursor-pointer"
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Goals / Notes */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">
              {isCoaches ? 'Coach Background & Team Needs' : 'Goals & Development Focus'}
            </label>
            <textarea
              id="new-lead-interest"
              value={notesInterest}
              onChange={(e) => setNotesInterest(e.target.value)}
              placeholder={isCoaches ? "e.g., Head Coach at Duluth High School; looking for finishing clinics in pre-season..." : `e.g., ${playerType === 'goalkeeper' ? 'Varsity keeper needing diving mechanics and shot stopping...' : 'Forward needing speed of play, finishing, and tactical 1v1 movement...'}`}
              rows={2}
              className="w-full text-xs p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-hidden focus:border-blue-500 text-zinc-100 placeholder-zinc-500"
            />
          </div>

          {/* Automation Callout Notice */}
          <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-start gap-2.5 text-xs">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-zinc-200 block">
                1-Year {playerType === 'goalkeeper' ? 'Goalkeeper' : 'Field Player'} Sequence:
              </span>
              <span className="text-zinc-400 text-[11px] leading-relaxed">
                {hasEmail
                  ? `Upon adding, contact will be enrolled in the Flowers Soccer Academy 56-step sequence. Step 1 will be cued and ready to dispatch via Gmail.`
                  : `No email entered. Contact will be safely saved and automated sending will pause until an email is added.`}
              </span>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-new-lead-btn"
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-950/40 transition-colors cursor-pointer"
            >
              {hasEmail ? (isCoaches ? 'Add Coach & Cue Outreach Drip' : 'Add Athlete & Launch 1-Year Drip') : (isCoaches ? 'Add Coach Contact' : 'Add Athlete to Pipeline')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
