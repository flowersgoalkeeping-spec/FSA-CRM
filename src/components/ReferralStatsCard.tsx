import { Lead } from '../types';
import { Megaphone, Award, Users, TrendingUp, HelpCircle } from 'lucide-react';

interface ReferralStatsCardProps {
  leads: Lead[];
  onSelectSourceFilter?: (source: string) => void;
}

export function ReferralStatsCard({ leads, onSelectSourceFilter }: ReferralStatsCardProps) {
  // Aggregate stats by How They Heard About Us
  const sourceCounts: Record<string, { total: number; converted: number }> = {};

  leads.forEach((lead) => {
    const sourceKey = lead.howHeardAboutUs || lead.source || 'Other';
    if (!sourceCounts[sourceKey]) {
      sourceCounts[sourceKey] = { total: 0, converted: 0 };
    }
    sourceCounts[sourceKey].total += 1;
    if (lead.currentStage === 'client_converted') {
      sourceCounts[sourceKey].converted += 1;
    }
  });

  const totalLeads = leads.length;
  const sortedSources = Object.entries(sourceCounts).sort((a, b) => b[1].total - a[1].total);

  const totalConverted = leads.filter(l => l.currentStage === 'client_converted').length;
  const overallConversionRate = totalLeads > 0 ? Math.round((totalConverted / totalLeads) * 100) : 0;

  // Specific Yard Signs stats highlight
  const yardSignCount = sourceCounts['Yard Signs']?.total || 0;
  const yardSignPercent = totalLeads > 0 ? Math.round((yardSignCount / totalLeads) * 100) : 0;

  return (
    <div 
      id="referral-stats-card"
      className="bg-black border border-zinc-900 rounded-2xl p-5 text-white shadow-2xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/15 border border-blue-600/30 text-blue-400 flex items-center justify-center">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              How Athletes Hear About Us
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                {totalLeads} Total Inquiries
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Acquisition channels & conversion tracking for Flowers Soccer Academy
            </p>
          </div>
        </div>

        {/* Quick Yard Sign Metric */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs flex items-center gap-2">
            <span className="text-[11px] text-blue-400 font-semibold">🪧 Yard Signs:</span>
            <span className="font-bold text-white">{yardSignCount} ({yardSignPercent}%)</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-blue-950/60 text-zinc-200 text-xs flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-white">{totalConverted} Enrolled</span>
            <span className="text-blue-400 font-semibold text-[11px]">({overallConversionRate}%)</span>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sortedSources.map(([source, stats]) => {
          const percent = totalLeads > 0 ? Math.round((stats.total / totalLeads) * 100) : 0;
          const isYardSign = source.toLowerCase().includes('yard sign');

          return (
            <div
              key={source}
              className={`p-3.5 rounded-xl border transition-all ${
                isYardSign 
                  ? 'bg-zinc-950 border-blue-900/50 hover:border-blue-600/70' 
                  : 'bg-zinc-950/70 border-zinc-900 hover:border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 truncate">
                  {isYardSign ? '🪧' : '📣'}
                  <span className="truncate">{source}</span>
                </div>
                <div className="text-xs font-bold text-white shrink-0">
                  {stats.total} <span className="text-[11px] font-normal text-zinc-400">({percent}%)</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isYardSign ? 'bg-blue-600' : 'bg-zinc-400'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Converted Sub-metric */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>Converted Clients:</span>
                <span className="font-semibold text-blue-400">
                  {stats.converted} {stats.converted === 1 ? 'client' : 'clients'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
