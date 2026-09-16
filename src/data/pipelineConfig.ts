import { PipelineStageConfig, DripCampaign, Lead, PlayerType, DripEmailStep } from '../types';
import { REACHED_OUT_EMAILS } from './reachedOutCampaign';
import { COACHES_CAMPAIGN_EMAILS } from './coachesCampaign';
import { INTRO_ATTENDED_EMAILS } from './introAttendedCampaign';
import { ACTIVE_CLIENTS_FIELD_PLAYER_EMAILS, ACTIVE_CLIENTS_GOALKEEPER_EMAILS } from './activeClientsCampaign';
import { PAST_CLIENTS_EMAILS } from './pastClientsCampaign';

export const DEFAULT_LOCATIONS: string[] = [
  'Lilburn',
  'Gainesville',
  'Loganville',
];

export const DEFAULT_REFERRAL_SOURCES: string[] = [
  'Yard Signs',
  'Word of Mouth / Friend',
  'Google Search',
  'Instagram / Social Media',
  'Coach / Club Referral',
  'Other',
];

export const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    id: 'inquiry',
    order: 1,
    label: '1. Reached Out (Inquiries)',
    shortLabel: 'Reached Out',
    description: 'Prospective athletes & parents who reached out; nurtured with the 56-step academy series driving toward booking a free intro session.',
    badgeColor: 'bg-zinc-900 text-blue-400 border-blue-600/50',
    accentColor: '#3b82f6',
    hasDrip: true,
  },
  {
    id: 'intro_scheduled',
    order: 2,
    label: '2. Intro Session Scheduled',
    shortLabel: 'Intro Scheduled',
    description: 'Booked intro session; excited countdown for weeks 1-2, shifting to promotional follow-ups if lingering past 2 weeks.',
    badgeColor: 'bg-zinc-900 text-sky-300 border-sky-600/50',
    accentColor: '#38bdf8',
    hasDrip: true,
  },
  {
    id: 'intro_attended',
    order: 3,
    label: '3. Session Attended',
    shortLabel: 'Intro Attended',
    description: 'Completed evaluation trial; nurtured with 56-step sequence highlighting 10% off first month, technical growth, and company services.',
    badgeColor: 'bg-zinc-900 text-indigo-300 border-indigo-500/50',
    accentColor: '#6366f1',
    hasDrip: true,
  },
  {
    id: 'client_converted',
    order: 4,
    label: '4. Converted Clients',
    shortLabel: 'Converted Clients',
    description: 'Enrolled active academy members receiving 1-year progressive 56-step training curriculum & mastery check-ins.',
    badgeColor: 'bg-zinc-900 text-emerald-400 border-emerald-600/50',
    accentColor: '#10b981',
    hasDrip: true,
  },
  {
    id: 'inactive_client',
    order: 5,
    label: '5. Past Clients (Hoping Return)',
    shortLabel: 'Past Clients',
    description: 'Athletes who stepped away; nurtured with seasonal clinics, promotional passes & welcome-back incentives.',
    badgeColor: 'bg-zinc-900 text-zinc-300 border-zinc-700',
    accentColor: '#94a3b8',
    hasDrip: true,
  },
  {
    id: 'coaches',
    order: 6,
    label: '6. Coaches',
    shortLabel: 'Coaches',
    description: 'Club, high school, and team coaches; outreach for specialized goalkeeper & finishing clinics, team training, and player development partnerships.',
    badgeColor: 'bg-zinc-900 text-blue-300 border-blue-500/50',
    accentColor: '#2563eb',
    hasDrip: true,
  },
];

/**
 * Generates a full 1-year (56-step) drip campaign:
 * - Stage 1 (Reached Out): 100% PROMOTIONAL (Limited spots, trial discounts, academy bonuses)
 * - Stage 2 (Intro Scheduled): WEEKS 1-2 VERY EXCITED TONE -> AFTER WEEK 2 SHIFTS TO PROMOTIONAL
 * - Stage 3 (Intro Attended): TIPS BASED & ENCOURAGING THEM TO COMMIT TO GETTING BETTER
 * - Stage 4 (Converted Clients): 1-Year elite progressive curriculum
 * - Stage 5 (Past Clients): Win-back promotions & clinic invites
 */
function buildOneYearCampaign(
  stageId: PipelineStageConfig['id'],
  playerType: PlayerType,
  stageName: string
): DripCampaign {
  const isGK = playerType === 'goalkeeper';
  const roleTitle = isGK ? 'Goalkeeper' : 'Field Player';
  const positionFocus = isGK ? 'shot-stopping, footwork, and positioning' : 'first touch, 1v1 play, and tactical IQ';

  const steps: DripEmailStep[] = [];

  // Define tailored Month 1 definitions (Steps 1 through 8) based on Stage Strategy
  let month1Definitions: Array<{
    step: number;
    delayHours: number;
    delayText: string;
    cadenceNote: string;
    subject: string;
    takeaway: string;
    body: string;
  }> = [];

  // -------------------------------------------------------------
  // STAGE 1: REACHED OUT (56-Step Academy Nurture)
  // Steps 1-23: Exact emails provided by Flowers Soccer Academy (personalized with {{name}})
  // Steps 24-56: Extension series matching tone, structure & free intro session focus
  // -------------------------------------------------------------
  if (stageId === 'inquiry') {
    REACHED_OUT_EMAILS.forEach((item) => {
      const stepNumber = item.step;
      let delayHours: number;
      let delayText: string;
      let cadenceNote: string;

      if (stepNumber <= 8) {
        const m1Delays = [0, 84, 168, 252, 336, 420, 504, 588];
        delayHours = m1Delays[stepNumber - 1] ?? (stepNumber - 1) * 84;
        delayText = stepNumber === 1 ? 'Immediate (Day 0)' : `Day ${(stepNumber - 1) * 3.5} (Month 1)`;
        cadenceNote = 'Month 1: 2x/week (Promotional)';
      } else {
        const week = stepNumber - 4;
        const monthNumber = Math.floor((week - 1) / 4) + 1;
        const delayDays = 28 + (week - 5) * 7;
        delayHours = delayDays * 24;
        delayText = `Week ${week} (Month ${monthNumber})`;
        cadenceNote = 'Months 2–12: 1x/week (Free Intro Focus)';
      }

      steps.push({
        id: `${stageId}_${playerType}_step_${stepNumber}`,
        stepNumber,
        delayHours,
        delayText,
        cadenceNote,
        subject: item.subject,
        keyTakeaway: item.takeaway,
        body: item.body,
      });
    });

    return {
      id: `drip_${stageId}_${playerType}`,
      stageId,
      playerType,
      name: `${stageName} — ${roleTitle} Track (1-Year Sequence)`,
      description: `Full 1-year automated sequence of 56 emails driving prospective athletes and parents to book a free introductory session.`,
      steps,
      isActive: true,
    };
  }

  // -------------------------------------------------------------
  // STAGE 6: COACHES (Daily Professional Development Series)
  // 1 email per day cadence. Built to be continuously expanded without interrupting active flow.
  // -------------------------------------------------------------
  if (stageId === 'coaches') {
    COACHES_CAMPAIGN_EMAILS.forEach((item) => {
      const stepNumber = item.step;
      const delayHours = (stepNumber - 1) * 24;
      const delayText = stepNumber === 1 ? 'Immediate (Day 0)' : `Day ${stepNumber - 1} (24h later)`;
      const cadenceNote = 'Daily Coach Education (1/day)';

      steps.push({
        id: `${stageId}_${playerType}_step_${stepNumber}`,
        stepNumber,
        delayHours,
        delayText,
        cadenceNote,
        subject: item.subject,
        keyTakeaway: item.takeaway,
        body: item.body,
      });
    });

    return {
      id: `drip_${stageId}_${playerType}`,
      stageId,
      playerType,
      name: `FSA Coaches — Professional Development Series (Daily)`,
      description: `Daily coaching development, methodology standards, and tactical session design from Coach Flowers. Expandable daily sequence (1 email per day).`,
      steps,
      isActive: true,
    };
  }

  // -------------------------------------------------------------
  // STAGE 3: INTRO ATTENDED (56-Step Conversion & Company Promotion)
  // Steps 1-14: Exact sequence provided with 10% off first month & https://www.gwinnettsoccertraining.com/
  // Steps 15-56: Full company promotion, training environments, video analysis & progressive growth
  // -------------------------------------------------------------
  if (stageId === 'intro_attended') {
    INTRO_ATTENDED_EMAILS.forEach((item) => {
      const stepNumber = item.step;
      let delayHours: number;
      let delayText: string;
      let cadenceNote: string;

      if (stepNumber <= 8) {
        const m1Delays = [0, 72, 168, 240, 336, 408, 504, 600];
        delayHours = m1Delays[stepNumber - 1] ?? (stepNumber - 1) * 84;
        delayText = stepNumber === 1 ? 'Immediate (Day 0)' : `Day ${Math.round((stepNumber - 1) * 3.5)} (Month 1)`;
        cadenceNote = 'Month 1: 2x/week (Next Steps & 10% Off)';
      } else {
        const week = stepNumber - 4;
        const monthNumber = Math.floor((week - 1) / 4) + 1;
        const delayDays = 28 + (week - 5) * 7;
        delayHours = delayDays * 24;
        delayText = `Week ${week} (Month ${monthNumber})`;
        cadenceNote = 'Months 2–12: 1x/week (Skills & Company Promotion)';
      }

      steps.push({
        id: `${stageId}_${playerType}_step_${stepNumber}`,
        stepNumber,
        delayHours,
        delayText,
        cadenceNote,
        subject: item.subject,
        keyTakeaway: item.takeaway,
        body: item.body,
      });
    });

    return {
      id: `drip_${stageId}_${playerType}`,
      stageId,
      playerType,
      name: `${stageName} — ${roleTitle} Track (1-Year Sequence)`,
      description: `Full 1-year automated sequence of 56 emails for athletes who attended their intro session, driving enrollment with 10% off first month and consistent player development.`,
      steps,
      isActive: true,
    };
  }

  // -------------------------------------------------------------
  // STAGE 4: ACTIVE CLIENTS / CONVERTED (56-Step Soccer Insights Series)
  // Step 1: The Flowers Soccer Academy Player Profile! (Session-by-session grading, 100-pt ratings, homework)
  // Field Players: Steps 2-9 are the authentic Soccer Insights #1 to #8 from Coach Flowers + invite teammates.
  // Goalkeepers: Specialized Goalkeeper Insights #1 to #56 for keepers + invite fellow keepers & teammates.
  // Steps 10-56: Extension of tactical & technical masterclasses with referral prompts.
  // -------------------------------------------------------------
  if (stageId === 'client_converted') {
    const emailSet = isGK ? ACTIVE_CLIENTS_GOALKEEPER_EMAILS : ACTIVE_CLIENTS_FIELD_PLAYER_EMAILS;
    emailSet.forEach((item) => {
      const stepNumber = item.step;
      let delayHours: number;
      let delayText: string;
      let cadenceNote: string;

      if (stepNumber <= 8) {
        const m1Delays = [0, 84, 168, 252, 336, 420, 504, 588];
        delayHours = m1Delays[stepNumber - 1] ?? (stepNumber - 1) * 84;
        delayText = stepNumber === 1 ? 'Immediate (Day 0)' : `Day ${(stepNumber - 1) * 3.5} (Month 1)`;
        cadenceNote = stepNumber === 1 ? 'Onboarding: Player Profile' : 'Month 1: 2x/week (Soccer Insights)';
      } else {
        const week = stepNumber - 4;
        const monthNumber = Math.floor((week - 1) / 4) + 1;
        const delayDays = 28 + (week - 5) * 7;
        delayHours = delayDays * 24;
        delayText = `Week ${week} (Month ${monthNumber})`;
        cadenceNote = 'Months 2–12: 1x/week (Soccer Insights & Referral)';
      }

      steps.push({
        id: `${stageId}_${playerType}_step_${stepNumber}`,
        stepNumber,
        delayHours,
        delayText,
        cadenceNote,
        subject: item.subject,
        keyTakeaway: item.takeaway,
        body: item.body,
      });
    });

    return {
      id: `drip_${stageId}_${playerType}`,
      stageId,
      playerType,
      name: `${stageName} — ${roleTitle} Track (Player Profile & Soccer Insights)`,
      description: `Full 1-year automated sequence starting with the exclusive Player Profile onboarding email, followed by the complete 56-step Soccer Insights series with teammate referral invitations.`,
      steps,
      isActive: true,
    };
  }

  // -------------------------------------------------------------
  // STAGE 5: PAST CLIENTS / INACTIVE (56-Step Alumni Win-Back Series)
  // Steps 1-25: Exact emails provided by Coach Flowers for past client outreach.
  // Steps 26-56: Thoughtful extension series with alumni clinic passes & welcome-back perks.
  // -------------------------------------------------------------
  if (stageId === 'inactive_client') {
    PAST_CLIENTS_EMAILS.forEach((item) => {
      const stepNumber = item.step;
      let delayHours: number;
      let delayText: string;
      let cadenceNote: string;

      if (stepNumber <= 8) {
        const m1Delays = [0, 84, 168, 252, 336, 420, 504, 588];
        delayHours = m1Delays[stepNumber - 1] ?? (stepNumber - 1) * 84;
        delayText = stepNumber === 1 ? 'Immediate (Day 0)' : `Day ${(stepNumber - 1) * 3.5} (Month 1)`;
        cadenceNote = 'Month 1: 2x/week (Alumni Reconnect)';
      } else {
        const week = stepNumber - 4;
        const monthNumber = Math.floor((week - 1) / 4) + 1;
        const delayDays = 28 + (week - 5) * 7;
        delayHours = delayDays * 24;
        delayText = `Week ${week} (Month ${monthNumber})`;
        cadenceNote = 'Months 2–12: 1x/week (Alumni Win-Back)';
      }

      steps.push({
        id: `${stageId}_${playerType}_step_${stepNumber}`,
        stepNumber,
        delayHours,
        delayText,
        cadenceNote,
        subject: item.subject,
        keyTakeaway: item.takeaway,
        body: item.body,
      });
    });

    return {
      id: `drip_${stageId}_${playerType}`,
      stageId,
      playerType,
      name: `${stageName} — ${roleTitle} Track (Alumni Win-Back Series)`,
      description: `Full 1-year automated sequence of 56 emails designed to re-engage former athletes with warm check-ins, skill benefits, and return perks.`,
      steps,
      isActive: true,
    };
  }

  if (stageId === 'intro_scheduled') {
    // -------------------------------------------------------------
    // STAGE 2: INTRO SCHEDULED
    // WEEKS 1-2 (Steps 1-4): VERY EXCITED TONE!
    // AFTER 2 WEEKS (Steps 5-8+): SHIFTS TO PROMOTIONAL
    // -------------------------------------------------------------
    month1Definitions = [
      {
        step: 1,
        delayHours: 0,
        delayText: 'Immediate (Day 0)',
        cadenceNote: 'Week 1: Super Excited!',
        subject: `WE ARE SO EXCITED TO TRAIN WITH YOU, {{name}}! ⚽🔥 Your Intro Session is Set!`,
        takeaway: 'High-energy excitement welcoming the athlete to their upcoming session.',
        body: `Hi {{name}},

WE CANNOT WAIT to see you on the pitch! ⚽🔥

Coach Flowers and our entire coaching staff are genuinely thrilled to have you out for your free introductory session at Flowers Soccer Academy!

Get ready for an electric, high-intensity session designed to push your skills and give you an immediate taste of what elite ${roleTitle} development feels like.

WHAT TO BRING:
• Your cleats, shin guards, and ${isGK ? 'training/match gloves' : 'soccer ball'}
• A full water bottle or sports drink
• An unstoppable work ethic!

We're going to have an absolute blast. See you on the turf!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
      {
        step: 2,
        delayHours: 84, // Day 3.5
        delayText: 'Day 3.5 (Week 1)',
        cadenceNote: 'Week 1: Super Excited!',
        subject: `The Countdown Is ON! Coach Flowers Has Your Drills Dialed In! 🔥`,
        takeaway: 'Excited anticipation detailing the fun and energy of the upcoming workout.',
        body: `Hi {{name}},

The countdown is on and we are getting pumped for your upcoming session!

Coach Flowers has already laid out the drills specifically tailored for your ${roleTitle} track—focusing on explosive first steps, game-realistic reps, and high-energy competition.

You're going to love the atmosphere here. Our players work hard, push each other, and celebrate every breakthrough.

Lace up tight and bring your game face. We'll see you very soon!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
      {
        step: 3,
        delayHours: 168, // Day 7 (Week 2)
        delayText: 'Week 2, Day 7',
        cadenceNote: 'Week 2: High Energy & Hype!',
        subject: `Get Ready To Dominate! Session Day Is Approaching Fast! ⚡`,
        takeaway: 'Building incredible energy and reinforcing how fun the trial will be.',
        body: `Hi {{name}},

Just checking in because we are super excited for your scheduled intro session!

Our training sessions at Lilburn, Gainesville, and Loganville are built on high tempo, positive coaching, and maximum touches. You're going to walk off the field feeling sharper, faster, and more confident than ever.

If you have any questions about directions or gear before you arrive, reply right here.

We can't wait to see your talent in action!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
      {
        step: 4,
        delayHours: 252, // Day 10.5
        delayText: 'Week 2, Day 10.5',
        cadenceNote: 'Week 2: Final Countdown Hype!',
        subject: `Almost Time To Hit The Pitch! Let's Go, {{name}}! 🚀`,
        takeaway: 'High-energy final reminder before the 2-week threshold.',
        body: `Hi {{name}},

It's almost game time!

The academy coaches are ready, the cones and gear are set, and we're looking forward to an unforgettable session. 

Remember: you don't have to be perfect—just bring 100% effort and a hunger to learn. That's all we ask!

See you on the pitch!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
      // AFTER TWO WEEKS: SHIFTS TO PROMOTIONAL!
      {
        step: 5,
        delayHours: 336, // Day 14 (Week 3)
        delayText: 'Week 3, Day 14',
        cadenceNote: 'Week 3: Shifts to Promotional',
        subject: `Did Your Schedule Change? Exclusive Re-Booking Perk & Training Credit Inside!`,
        takeaway: 'Promotional shift: Offering a special incentive to reschedule and complete the intro session.',
        body: `Hi {{name}},

We noticed your scheduled intro session date may have passed or gotten delayed—life gets busy, and we completely understand!

SPECIAL RESCHEDULE PROMOTION:
Re-book your intro session this week and we'll apply a $30 Academy Training Voucher toward your first month's registration, plus a complimentary academy workout towel.

We have slots available this upcoming weekend at our Lilburn, Gainesville, and Loganville fields.

Reply to this email with your preferred day and we will lock in your spot with your promotional credit applied!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
      {
        step: 6,
        delayHours: 420, // Day 17.5
        delayText: 'Week 3, Day 17.5',
        cadenceNote: 'Week 3: Promotional Urgency',
        subject: `Special Re-Booking Offer: Complete Your Assessment & Get a Free Training Shirt!`,
        takeaway: 'Promotional incentive offering free gear upon completing rescheduled session.',
        body: `Hi {{name}},

Coach Flowers here with a quick promotional perk:

We have 3 open slots this week for rescheduled evaluations. Complete your session this week and receive an official Flowers Soccer Academy dri-fit training shirt for free!

Don't let your training momentum stall. Getting evaluated now ensures your ${roleTitle} development stays ahead of the competition.

Reply to claim your shirt and confirm your time slot!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
      {
        step: 7,
        delayHours: 504, // Day 21 (Week 4)
        delayText: 'Week 4, Day 21',
        cadenceNote: 'Week 4: Promotional Offer',
        subject: `Limited Weekend Slots: Promotional Re-Activation Pass for {{name}}`,
        takeaway: 'Exclusive promotion allowing flexible weekend booking with discount.',
        body: `Hi {{name}},

We want to make it as easy as possible for you to experience Flowers Soccer Academy.

We've opened an exclusive promotional weekend time slot for athletes who scheduled an intro but haven't made it out to the pitch yet. You'll receive our full 1-on-1 assessment plus 10% off any future clinic.

Reply to this email to grab one of these promotional weekend slots before they are released to general inquiries!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
      {
        step: 8,
        delayHours: 600, // Day 25 (Week 4)
        delayText: 'Week 4, Day 25',
        cadenceNote: 'Week 4: Final Promotional Push',
        subject: `Coach Flowers' VIP Priority Re-Booking Invitation (+ Special Bonus)`,
        takeaway: 'Final promotional incentive for Intro Scheduled athletes.',
        body: `Hi {{name}},

We know schedules can be tricky during competitive seasons, so we're keeping your priority re-booking invitation active with an added bonus:

Book any session this month and bring a training partner at 50% off!

Let's get you on the field at Lilburn, Gainesville, or Loganville so you can see firsthand the difference Flowers Soccer Academy makes.

Reply here and Coach Flowers will personally get you scheduled!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
      },
    ];
  } else {
    // -------------------------------------------------------------
    // STAGE 4 (Converted Clients) & STAGE 5 (Past Clients)
    // -------------------------------------------------------------
    month1Definitions = [
      {
        step: 1,
        delayHours: 0,
        delayText: 'Immediate (Day 0)',
        cadenceNote: 'Month 1: 2x/week',
        subject: stageId === 'client_converted' 
          ? `Welcome to the Flowers Soccer Academy Family, {{name}}! (${roleTitle} Track)`
          : `Special Welcome Back Pass from Coach Flowers! (Lilburn · Gainesville · Loganville)`,
        takeaway: stageId === 'client_converted' ? 'Official welcome & onboarding for active enrolled member.' : 'Warm welcome-back incentive for returning athletes.',
        body: stageId === 'client_converted' 
          ? `Hi {{name}},\n\nWelcome to the official Flowers Soccer Academy family!\n\nAs an enrolled ${roleTitle} in our year-round development curriculum, you have access to focused weekly masterclasses, video feedback, and individualized coach guidance across our Lilburn, Gainesville, and Loganville fields.\n\nWe're dedicated to helping you dominate your position.\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`
          : `Hi {{name}},\n\nCoach Flowers here! We miss having your energy and work ethic on the pitch at Flowers Soccer Academy.\n\nWe'd love to welcome you back with a complimentary training pass or seasonal clinic credit.\n\nReply to this email and let's get you back on the pitch!\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
      {
        step: 2,
        delayHours: 84,
        delayText: 'Day 3.5 (Week 1)',
        cadenceNote: 'Month 1: 2x/week',
        subject: `Coach's Insight: Mastering the Fundamentals of ${isGK ? 'Goalkeeping' : 'Technical Play'}`,
        takeaway: 'Actionable coaching tip highlighting foundational habits.',
        body: `Hi {{name}},\n\nQuick training tip from Flowers Soccer Academy:\n\n${isGK 
          ? "The best goalkeepers make hard saves look routine because their 'set position' and footwork are dialed in before the ball is struck. Never compromise on getting balanced on the balls of your feet."
          : "Top field players separate themselves before they even touch the ball. Constant head scanning (shoulder checks) and a positive first touch away from pressure open up every pass and shot on the pitch."}\n\nKeep this in mind for your next session!\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
      {
        step: 3,
        delayHours: 168,
        delayText: 'Week 2, Day 7',
        cadenceNote: 'Month 1: 2x/week',
        subject: `Weekly Mastery: 4 Pillars of Academy Excellence`,
        takeaway: 'Explaining our four-pillar academy assessment methodology.',
        body: `Hi {{name}},\n\nAt Flowers Soccer Academy, we hold our athletes to four key pillars:\n1. Technical Execution\n2. Tactical Awareness\n3. Athletic Conditioning\n4. Mental Resilience\n\nKeep bringing your best effort every session!\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
      {
        step: 4,
        delayHours: 252,
        delayText: 'Week 2, Day 10.5',
        cadenceNote: 'Month 1: 2x/week',
        subject: `Nutrition & Hydration Protocol For Match Readiness`,
        takeaway: 'Guidance on preparation, hydration, and nutrition.',
        body: `Hi {{name}},\n\nFueling your body properly is half the battle. Drink water consistently throughout the day and eat complex carbs 2-3 hours before training.\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
      {
        step: 5,
        delayHours: 336,
        delayText: 'Week 3, Day 14',
        cadenceNote: 'Month 1: 2x/week',
        subject: `Mid-Month Focus: Accelerating ${roleTitle} Development`,
        takeaway: 'Position-specific acceleration check-in.',
        body: `Hi {{name}},\n\nTwo weeks into this training cycle, we want to challenge you to set a personal target for ${positionFocus}.\n\nReply with your current goal!\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
      {
        step: 6,
        delayHours: 420,
        delayText: 'Week 3, Day 17.5',
        cadenceNote: 'Month 1: 2x/week',
        subject: `Home Conditioning & Core Stability Routine`,
        takeaway: '15-minute home routine to accelerate reaction speed.',
        body: `Hi {{name}},\n\nGreat players do the work when nobody is watching. Dedicate 15 minutes to core and fast footwork today!\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
      {
        step: 7,
        delayHours: 504,
        delayText: 'Week 4, Day 21',
        cadenceNote: 'Month 1: 2x/week',
        subject: `Mental Toughness & Next-Play Mentality`,
        takeaway: 'Building resilience under game pressure.',
        body: `Hi {{name}},\n\nWhenever a mistake happens on the pitch, give yourself 3 seconds to learn, flush it out of your head, and immediately reset your focus for the next ball.\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
      {
        step: 8,
        delayHours: 600,
        delayText: 'Week 4, Day 25',
        cadenceNote: 'Month 1: 2x/week',
        subject: `Advancing to Weekly Academy Masterclasses (Month 2+)`,
        takeaway: 'Transition into weekly year-round masterclass sequence.',
        body: `Hi {{name}},\n\nStarting next week, your 1-year development sequence transitions to our weekly deep-dive masterclasses every 7 days.\n\nThank you for being part of the Flowers Soccer Academy family!\n\nBest regards,\nCoach Flowers\nFlowers Soccer Academy`,
      },
    ];
  }

  month1Definitions.forEach(d => {
    steps.push({
      id: `${stageId}_${playerType}_step_${d.step}`,
      stepNumber: d.step,
      delayHours: d.delayHours,
      delayText: d.delayText,
      cadenceNote: d.cadenceNote,
      subject: d.subject,
      keyTakeaway: d.takeaway,
      body: d.body,
    });
  });

  // Months 2 through 12 (Weeks 5 to 52): 1 email per week (Steps 9 through 56)
  const weeklyTopics = [
    { topic: 'Footwork & First Step Quickness', skill: isGK ? 'Drop-step mechanics and cross-over power' : 'Explosive change of pace and body feints' },
    { topic: 'Reading the Opponent', skill: isGK ? 'Anticipating striker body shape and shooting angles' : 'Predicting defender momentum and passing lanes' },
    { topic: 'Distribution & Playing Out from the Back', skill: isGK ? 'Side-volley technique, driven ground balls, and bowling' : 'Switching play, diagonal driven passes, and wall passes' },
    { topic: '1v1 Dominance', skill: isGK ? 'Smothering angles, spread saves, and closing distance without lunging' : 'Shielding the ball, cutbacks, and attacking the defender’s front foot' },
    { topic: 'Commanding the Penalty Box', skill: isGK ? 'High catch timing, commanding calls (KEEPER!), and punch technique' : 'Target runs into the box, timing headers, and front-post runs' },
    { topic: 'Reaction Speed & Micro-Adjustments', skill: isGK ? 'Deflected shots, recovery dives, and second-effort reflex saves' : 'One-touch finishes off rebounds and reacting to deflections' },
    { topic: 'Communication & Organizing Your Unit', skill: isGK ? 'Directing center backs and setting up defensive walls' : 'Calling for the ball early and directing teammate press' },
    { topic: 'Set Piece Strategy', skill: isGK ? 'Corner kick positioning and wall placement on free kicks' : 'Corner kick delivery and organizing free-kick routines' },
    { topic: 'Speed of Play Under Pressure', skill: isGK ? 'Receiving backpasses on your weak foot and clearing safely' : 'Playing in tight midfield channels with one and two touches' },
    { topic: 'Finishing & Shot Quality', skill: isGK ? 'Handling dipping shots and wet-ball catching mechanics' : 'Striking with laces vs inside foot placement in 18-yard box' },
    { topic: 'Mid-Season Athletic Conditioning', skill: 'Core stability, hamstring strength, and injury prevention' },
    { topic: 'Game Film Analysis Habit', skill: 'Reviewing matches objectively to identify positive habits and areas for growth' },
    { topic: 'Handling Adverse Weather & Wet Pitches', skill: isGK ? 'Adjusting glove dampness and securing slippery balls' : 'Adapting pass weight and slide tackling cleanly on wet turf' },
    { topic: 'Leadership & Pitch Presence', skill: 'Setting a standard of intensity and encouraging teammates during tough matches' },
    { topic: 'Developing Your Non-Dominant Foot', skill: 'Building confidence with weak foot touches, passing, and clears' },
    { topic: 'Penalty Kick Mastery', skill: isGK ? 'Reading striker hip angles and maintaining patience on the line' : 'Picking your spot with conviction and striking with power' },
    { topic: 'Nutrition for Elite Recovery', skill: 'Pre-game complex carbs, intra-match electrolytes, and post-training protein' },
    { topic: 'Defending the Counter-Attack', skill: isGK ? 'Acting as a sweeper-keeper outside the 18-yard box' : 'Counter-pressing immediately upon losing possession' },
    { topic: 'Vision & Spatial Awareness', skill: 'Maintaining a 360-degree mental map of the field before receiving' },
    { topic: 'Tournament Preparation & Stamina', skill: 'Managing energy across multi-game tournament weekends' },
    { topic: 'Off-Season Training Blueprint', skill: 'Maintaining sharpness and athleticism during the competitive break' },
    { topic: 'College & Academy Pathway Insights', skill: 'What scouts and high-level coaches look for in standout players' },
    { topic: '1-Year Academy Anniversary Celebration', skill: 'Celebrating 12 months of commitment, progress, and mastery' },
  ];

  for (let week = 5; week <= 52; week++) {
    const stepNumber = week + 4; // Step 9 at Week 5, up to Step 56 at Week 52
    const delayDays = 28 + (week - 5) * 7;
    const delayHours = delayDays * 24;

    const topicItem = weeklyTopics[(week - 5) % weeklyTopics.length];
    const monthNumber = Math.floor((week - 1) / 4) + 1;

    let stepSubject = '';
    let stepTakeaway = '';
    let stepBody = '';

    if (stageId === 'intro_scheduled') {
      stepSubject = `Week ${week}: Still Thinking About Your Free Intro Session? (Special Incentive)`;
      stepTakeaway = `Promotional re-engagement: Reclaim your free intro session with Coach Flowers.`;
      stepBody = `Hi {{name}},

We noticed it's been a few weeks since you initially scheduled your introductory session with Flowers Soccer Academy.

Life gets busy—matches, school, and tournaments. But we don't want you to miss the opportunity to elevate your game.

SPECIAL PROMOTION:
Re-schedule your introductory session this month and we will include a complimentary Flowers Soccer Academy training shirt upon attendance.

Whether you prefer training in Lilburn, Gainesville, or Loganville, our coaching staff is ready to welcome you.

Reply to this email with your preferred day this week to claim your session!

Best regards,
Coach Flowers
Flowers Soccer Academy`;
    } else if (stageId === 'inactive_client') {
      stepSubject = `Week ${week}: We Miss Seeing You On The Pitch (Alumni Training Pass)`;
      stepTakeaway = `Win-back welcome pass & seasonal clinic invitation for returning academy players.`;
      stepBody = `Hi {{name}},

Coach Flowers checking in from Flowers Soccer Academy!

We hope your season and school are going smoothly. We miss having you in our training groups at Lilburn, Gainesville, and Loganville.

RETURNING ATHLETE WELCOME-BACK PROMO:
Whenever you are ready to tune up your skills, take advantage of our Alumni Return Pass: enjoy 25% off your next month of training or join our upcoming weekend masterclass for free.

Reply to this email anytime to jump back into training!

Best regards,
Coach Flowers
Flowers Soccer Academy`;
    } else {
      // client_converted
      stepSubject = `Week ${week}: ${topicItem.topic} (${roleTitle} Elite Mastery)`;
      stepTakeaway = `Mastering ${topicItem.skill} as part of your enrolled Flowers Soccer Academy 1-year curriculum.`;
      stepBody = `Hi {{name}},

Welcome to Week ${week} of your Flowers Soccer Academy 1-year training curriculum!

This week's technical focus: ${topicItem.topic}.

Elite Training Points:
• ${topicItem.skill}
• Consistent execution under fatigue is what separates good players from starters.
• Bring this focus to your next session at Lilburn, Gainesville, or Loganville.

Keep striving for excellence. We are proud of your dedication!

Best regards,
Coach Flowers
Flowers Soccer Academy`;
    }

    steps.push({
      id: `${stageId}_${playerType}_step_${stepNumber}`,
      stepNumber,
      delayHours,
      delayText: `Week ${week} (Month ${monthNumber})`,
      cadenceNote: 'Months 2-12: 1x/week',
      subject: stepSubject,
      keyTakeaway: stepTakeaway,
      body: stepBody,
    });
  }

  return {
    id: `drip_${stageId}_${playerType}`,
    stageId,
    playerType,
    name: `${stageName} — ${roleTitle} Track (1-Year Sequence)`,
    description: `Full 1-year automated sequence (2 emails/week in Month 1, then 1 email/week for Months 2-12) tailored specifically for ${roleTitle}s.`,
    steps,
    isActive: true,
  };
}

export const DEFAULT_DRIP_CAMPAIGNS: DripCampaign[] = [
  buildOneYearCampaign('inquiry', 'goalkeeper', 'Stage 1: Reached Out Nurture'),
  buildOneYearCampaign('inquiry', 'field_player', 'Stage 1: Reached Out Nurture'),
  buildOneYearCampaign('intro_scheduled', 'goalkeeper', 'Stage 2: Intro Scheduled Prep'),
  buildOneYearCampaign('intro_scheduled', 'field_player', 'Stage 2: Intro Scheduled Prep'),
  buildOneYearCampaign('intro_attended', 'goalkeeper', 'Stage 3: Post-Intro Conversion'),
  buildOneYearCampaign('intro_attended', 'field_player', 'Stage 3: Post-Intro Conversion'),
  buildOneYearCampaign('client_converted', 'goalkeeper', 'Stage 4: Enrolled Client 1-Year Academy'),
  buildOneYearCampaign('client_converted', 'field_player', 'Stage 4: Enrolled Client 1-Year Academy'),
  buildOneYearCampaign('inactive_client', 'goalkeeper', 'Stage 5: Past Client Win-Back'),
  buildOneYearCampaign('inactive_client', 'field_player', 'Stage 5: Past Client Win-Back'),
  buildOneYearCampaign('coaches', 'goalkeeper', 'Stage 6: Coaches Goalkeeper Clinics'),
  buildOneYearCampaign('coaches', 'field_player', 'Stage 6: Coaches Team Clinics & Partnerships'),
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '(404) 892-3114',
    playerType: 'goalkeeper',
    location: 'Lilburn',
    howHeardAboutUs: 'Yard Signs',
    source: 'Yard Signs',
    notesInterest: 'High school varsity goalkeeper seeking elite shot-stopping & diving mechanics',
    currentStage: 'inquiry',
    stageHistory: [
      { stage: 'inquiry', enteredAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    dripStatus: 'active',
    activeCampaignId: 'drip_inquiry_goalkeeper',
    currentStepNumber: 1,
    lastEmailSentAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    nextEmailScheduledAt: new Date(Date.now() + 81 * 3600 * 1000).toISOString(),
    nextStepNumber: 2,
    notes: [
      {
        id: 'note-1a',
        text: 'Parent saw our yard sign on Lawrenceville Hwy. Marcus is U16 and wants to compete for starting varsity keeper this fall.',
        createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        author: 'Coach Flowers',
      },
    ],
    emailLogs: [
      {
        id: 'log-1a',
        leadId: 'lead-1',
        campaignId: 'drip_inquiry_goalkeeper',
        campaignName: 'Stage 1: Reached Out Nurture — Goalkeeper Track (1-Year Sequence)',
        stepNumber: 1,
        subject: 'Welcome to Flowers Soccer Academy, Marcus! (Goalkeeper Track)',
        body: 'Welcome to Flowers Soccer Academy! We are thrilled you reached out regarding varsity goalkeeper development...',
        recipientEmail: 'marcus.vance@example.com',
        sentAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        status: 'sent',
        reason: 'Automated 1-Year drip launched on inquiry',
      },
    ],
  },
  {
    id: 'lead-2',
    fullName: 'Sophia Ramirez',
    email: 'ramirez.family@example.com',
    phone: '(678) 555-0198',
    playerType: 'field_player',
    location: 'Gainesville',
    howHeardAboutUs: 'Word of Mouth / Friend',
    source: 'Word of Mouth / Friend',
    notesInterest: 'U14 attacking midfielder looking to sharpen 1v1 attacking, vision & speed of play',
    currentStage: 'intro_scheduled',
    scheduledSessionDate: 'Saturday, 10:00 AM @ Gainesville Field 2',
    stageHistory: [
      { stage: 'inquiry', enteredAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString() },
      { stage: 'intro_scheduled', enteredAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    dripStatus: 'active',
    activeCampaignId: 'drip_intro_scheduled_field_player',
    currentStepNumber: 1,
    lastEmailSentAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    nextEmailScheduledAt: new Date(Date.now() + 76 * 3600 * 1000).toISOString(),
    nextStepNumber: 2,
    notes: [
      {
        id: 'note-2a',
        text: 'Referred by teammate from Gainesville club. Booked Saturday session.',
        createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
        author: 'Coach Flowers',
      },
    ],
    emailLogs: [
      {
        id: 'log-2a',
        leadId: 'lead-2',
        campaignId: 'drip_intro_scheduled_field_player',
        campaignName: 'Stage 2: Intro Scheduled Prep — Field Player Track (1-Year Sequence)',
        stepNumber: 1,
        subject: 'Intro Session Confirmed at Flowers Soccer Academy for Sophia!',
        body: 'Your free introductory session is confirmed for Saturday, 10:00 AM @ Gainesville Field 2...',
        recipientEmail: 'ramirez.family@example.com',
        sentAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
        status: 'sent',
        reason: 'Stage transition triggered',
      },
    ],
  },
  {
    id: 'lead-3',
    fullName: 'Elijah Sterling',
    email: '', // Demonstrating optional email requirement
    phone: '(470) 332-9081',
    playerType: 'goalkeeper',
    location: 'Loganville',
    howHeardAboutUs: 'Yard Signs',
    source: 'Yard Signs',
    notesInterest: 'Parent called from yard sign in Loganville; wants goalkeeper assessments for 12yo',
    currentStage: 'inquiry',
    stageHistory: [
      { stage: 'inquiry', enteredAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    dripStatus: 'no_email',
    notes: [
      {
        id: 'note-3a',
        text: 'Met parent at Loganville park near sign. Got phone number; need to request email address on next call.',
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        author: 'Coach Flowers',
      },
    ],
    emailLogs: [],
  },
  {
    id: 'lead-4',
    fullName: 'Dominic Reyes',
    email: 'dominic.reyes@example.com',
    phone: '(770) 612-4491',
    playerType: 'goalkeeper',
    location: 'Lilburn',
    howHeardAboutUs: 'Coach / Club Referral',
    source: 'Coach / Club Referral',
    notesInterest: 'Alumni goalkeeper who trained for 6 months; stepped away for high school season',
    currentStage: 'inactive_client',
    stageHistory: [
      { stage: 'inquiry', enteredAt: new Date(Date.now() - 400 * 3600 * 1000).toISOString() },
      { stage: 'intro_scheduled', enteredAt: new Date(Date.now() - 360 * 3600 * 1000).toISOString() },
      { stage: 'intro_attended', enteredAt: new Date(Date.now() - 320 * 3600 * 1000).toISOString() },
      { stage: 'client_converted', enteredAt: new Date(Date.now() - 250 * 3600 * 1000).toISOString() },
      { stage: 'inactive_client', enteredAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 400 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    dripStatus: 'active',
    activeCampaignId: 'drip_inactive_client_goalkeeper',
    currentStepNumber: 1,
    lastEmailSentAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    nextEmailScheduledAt: new Date(Date.now() + 64 * 3600 * 1000).toISOString(),
    nextStepNumber: 2,
    notes: [
      {
        id: 'note-4a',
        text: 'Dominic is focusing on high school team right now. Welcomed him back for summer goalkeeper clinic.',
        createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
        author: 'Coach Flowers',
      },
    ],
    emailLogs: [
      {
        id: 'log-4a',
        leadId: 'lead-4',
        campaignId: 'drip_inactive_client_goalkeeper',
        campaignName: 'Stage 5: Past Client Win-Back — Goalkeeper Track (1-Year Sequence)',
        stepNumber: 1,
        subject: 'Always in your corner, Dominic! (Flowers Soccer Academy)',
        body: 'Warm thank you note leaving the door open for summer drop-in clinics and private sessions...',
        recipientEmail: 'dominic.reyes@example.com',
        sentAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
        status: 'sent',
        reason: 'Win-back sequence launched on stage transition',
      },
    ],
  },
  {
    id: 'lead-5',
    fullName: 'Chloe Bennett',
    email: 'bennett.soccer@example.com',
    phone: '(404) 509-1122',
    playerType: 'field_player',
    location: 'Lilburn',
    howHeardAboutUs: 'Google Search',
    source: 'Google Search',
    notesInterest: 'Striker looking for finishing, composure in front of goal, and agility',
    currentStage: 'client_converted',
    stageHistory: [
      { stage: 'inquiry', enteredAt: new Date(Date.now() - 180 * 3600 * 1000).toISOString() },
      { stage: 'intro_scheduled', enteredAt: new Date(Date.now() - 140 * 3600 * 1000).toISOString() },
      { stage: 'intro_attended', enteredAt: new Date(Date.now() - 100 * 3600 * 1000).toISOString() },
      { stage: 'client_converted', enteredAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 180 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
    dripStatus: 'active',
    activeCampaignId: 'drip_client_converted_field_player',
    currentStepNumber: 2,
    lastEmailSentAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    nextEmailScheduledAt: new Date(Date.now() + 79 * 3600 * 1000).toISOString(),
    nextStepNumber: 3,
    notes: [
      {
        id: 'note-5a',
        text: 'Enrolled in 2x weekly private training package at Lilburn.',
        createdAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
        author: 'Coach Flowers',
      },
    ],
    emailLogs: [
      {
        id: 'log-5a',
        leadId: 'lead-5',
        campaignId: 'drip_client_converted_field_player',
        campaignName: 'Stage 4: Enrolled Client 1-Year Academy — Field Player Track',
        stepNumber: 1,
        subject: 'Welcome to the Academy Family, Chloe! (Field Player Track)',
        body: 'Welcome Chloe! Your 1-year academy development curriculum begins now...',
        recipientEmail: 'bennett.soccer@example.com',
        sentAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
        status: 'sent',
        reason: 'Converted to full client',
      },
      {
        id: 'log-5b',
        leadId: 'lead-5',
        campaignId: 'drip_client_converted_field_player',
        campaignName: 'Stage 4: Enrolled Client 1-Year Academy — Field Player Track',
        stepNumber: 2,
        subject: 'Coach Insight: First Touch Mastery & Setting Your Hips',
        body: 'Quick coaching tip from Coach Flowers regarding body shape before receiving...',
        recipientEmail: 'bennett.soccer@example.com',
        sentAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        status: 'sent',
        reason: 'Drip Step 2 executed',
      },
    ],
  },
  {
    id: 'lead-coach-1',
    fullName: 'Coach David Miller',
    email: 'david.miller@gwinnettyouthsoccer.org',
    phone: '(770) 555-0182',
    playerType: 'goalkeeper',
    location: 'Lilburn',
    howHeardAboutUs: 'Coach / Club Referral',
    source: 'Coach / Club Referral',
    notesInterest: 'Director of Coaching at Gwinnett Youth Soccer Club; interested in specialized goalkeeper clinics for U14-U17 keepers',
    currentStage: 'coaches',
    stageHistory: [
      { stage: 'coaches', enteredAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    dripStatus: 'active',
    activeCampaignId: 'drip_coaches_goalkeeper',
    currentStepNumber: 1,
    lastEmailSentAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    nextEmailScheduledAt: new Date(Date.now() + 60 * 3600 * 1000).toISOString(),
    nextStepNumber: 2,
    notes: [
      {
        id: 'note-c1',
        text: 'Met at regional tournament. Discussed running a specialized goalkeeper clinic block for club keepers in Lilburn.',
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        author: 'Coach Flowers',
      },
    ],
    emailLogs: [
      {
        id: 'log-c1',
        leadId: 'lead-coach-1',
        campaignId: 'drip_coaches_goalkeeper',
        campaignName: 'Stage 6: Coaches Goalkeeper Clinics — GK Clinics (1-Year Sequence)',
        stepNumber: 1,
        subject: 'Specialized Goalkeeper & Finishing Clinics for Your Squad',
        body: 'Hi Coach David,\n\nI hope your season is off to a strong start. At Flowers Soccer Academy, we collaborate with club coaches...',
        recipientEmail: 'david.miller@gwinnettyouthsoccer.org',
        sentAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        status: 'sent',
        reason: 'Coach clinic outreach',
      },
    ],
  },
  {
    id: 'lead-coach-2',
    fullName: 'Coach Sarah Jenkins',
    email: 'sjenkins@northatlantasoccer.edu',
    phone: '(678) 555-4921',
    playerType: 'field_player',
    location: 'Gainesville',
    howHeardAboutUs: 'Word of Mouth / Friend',
    source: 'Word of Mouth / Friend',
    notesInterest: 'Varsity High School Head Coach; interested in pre-season finishing & SAQ workshops for team forwards and midfielders',
    currentStage: 'coaches',
    stageHistory: [
      { stage: 'coaches', enteredAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    dripStatus: 'active',
    activeCampaignId: 'drip_coaches_field_player',
    currentStepNumber: 1,
    lastEmailSentAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    nextEmailScheduledAt: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    nextStepNumber: 2,
    notes: [
      {
        id: 'note-c2',
        text: 'Discussed running a 3-day finishing clinic prior to high school tryouts in January.',
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        author: 'Coach Flowers',
      },
    ],
    emailLogs: [],
  },
];
