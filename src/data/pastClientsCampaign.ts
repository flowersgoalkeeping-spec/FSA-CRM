import { CampaignStepDefinition } from './reachedOutCampaign';

/**
 * 56-Step 1-Year Automated Nurture Sequence for Stage 5: Past Clients (Alumni Win-Back).
 * 
 * STEPS 1 to 25: The exact personalized emails provided by Coach Flowers.
 * STEPS 26 to 56: Extension series continuing the supportive, inspiring, and engaging
 * tone to welcome past athletes back to Flowers Soccer Academy (Lilburn, Gainesville, Loganville).
 * 
 * All emails are personalized with {{name}} and Coach Flowers' signature.
 */
export const PAST_CLIENTS_EMAILS: CampaignStepDefinition[] = [
  {
    step: 1,
    subject: 'Remember the great times on the field?',
    takeaway: 'We Miss You on the Field: Warm reconnection reflecting on energy and fun during past sessions.',
    body: `Hi {{name}},

I just wanted to take a moment to say we’ve missed seeing you out on the field! Our training sessions were always more fun and exciting with you in the mix.

Whether it was honing skills, playing in those fast-paced small-sided games, or just having fun while improving, the energy you brought made a big difference.

If you’re thinking about jumping back in, I’d love to see you again. Training is still all about helping players grow their confidence, refine their skills, and enjoy the game to the fullest.

Feel free to reach out if you’d like to rejoin—we’d love to have you back!

Cheers,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 2,
    subject: 'Let’s pick up where we left off!',
    takeaway: 'Remember the Progress? Reminding them of breakthroughs in touch, confidence, and tactical understanding.',
    body: `Hi {{name}},

Do you remember how much progress you were making during our training sessions? Whether it was improving touch, gaining confidence, or understanding the game better, those moments on the field were something special.

Our group training format is designed to challenge players while keeping things fun and engaging. It’s the perfect mix of individual focus and team collaboration—something we always loved seeing in action when you were here.

If you’re ready to get back out there, we’re here for you. Let’s pick up right where we left off and keep building on that foundation!

Best,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 3,
    subject: 'Why group training works',
    takeaway: 'The Benefits of Group Training: Learning from peers, healthy competition, and game-like scenarios.',
    body: `Hi {{name}},

One of the things I’ve always loved about our sessions is how much players benefit from working in a group setting. There’s something about the balance of personal attention and team dynamics that creates an ideal environment for growth.

Here’s what makes it special:

• Learn from others: Watching and interacting with teammates helps spark new ideas and improve skills.
• Push each other: Healthy competition brings out the best in everyone.
• Game-like scenarios: Small-sided games and team drills help translate practice into real performance.

It’s always a joy to see players thrive in this kind of setting—especially when they’re surrounded by a supportive group that shares the same goals.

We’d love to have you back with us. Let me know if you’re ready to join a session again!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 4,
    subject: 'Let’s keep the momentum going!',
    takeaway: 'Consistency Is Key: Showing up, building weekly progress, and maintaining soccer momentum.',
    body: `Hi {{name}},

One of the things that makes a difference on the field is consistency. It’s not about being perfect every time; it’s about showing up, putting in the effort, and watching the progress build week by week.

When you were training with us, it was inspiring to see that commitment in action. Our sessions gave everyone the chance to improve and grow, no matter where they were starting from.

If you’re ready to get back into that rhythm, we’d love to see you again. Let’s keep building on the foundation you’ve already worked so hard to create!

Hope to hear from you soon,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 5,
    subject: 'Be prepared for those big moments',
    takeaway: 'Game-Day Ready: Preparing for quick decisions, teamwork, and game-changing brilliance.',
    body: `Hi {{name}},

Some of the best moments in soccer happen when everything comes together on the field—quick decisions, great teamwork, and those flashes of brilliance that change the game.

Our training sessions have always been about preparing for those moments. From small-sided games to situational drills, we focus on helping players feel confident and ready for anything.

It’s always been a joy to see players like you step up during practice and bring that same energy to games. If you’re ready to start training with us again, we’d love to see you back out there!

Best,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 6,
    subject: 'Training is better together',
    takeaway: 'The Team Atmosphere: Building connections, camaraderie, and mutual encouragement on the pitch.',
    body: `Hi {{name}},

One of the things that makes our sessions special is the team atmosphere. It’s not just about improving individual skills—it’s about building connections, learning from one another, and growing together.

Every drill, game, and skill session is designed to foster that sense of camaraderie while still giving each player the attention they need to improve. It’s always been great seeing how players encourage and challenge each other in the best way possible.

If you’re ready to get back into that environment, we’d love to have you join us again. Let’s make it happen!

Cheers,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 7,
    subject: 'Did you know this about training?',
    takeaway: 'The Impact of Extra Training: Players improve 35% faster with structured training outside team practice.',
    body: `Hi {{name}},

Here’s an interesting stat for you: Players who participate in structured, focused training sessions outside of regular team practice improve their performance by an average of 35% faster than those who don’t.

That’s because extra training helps reinforce skills, build muscle memory, and improve decision-making under pressure. It’s a chance to fine-tune your abilities in a supportive and focused environment.

When you were with us, you were putting in the kind of work that creates real results, and it showed. If you’re ready to jump back in, our sessions are here to help you continue growing as a player.

We’d love to see you on the field again!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 8,
    subject: 'Mastery takes time—and training',
    takeaway: 'The Science of Skill Mastery: Breaking down the 10,000-hour rule through targeted, accelerated practice.',
    body: `Hi {{name}},

Here’s something to think about: Research shows that it takes about 10,000 hours of practice to master a skill. While that might sound overwhelming, the key is in consistent, focused effort.

Our training sessions provide the kind of targeted practice that accelerates skill development. By breaking down techniques, practicing under realistic conditions, and receiving personalized feedback, players can see improvement faster than in traditional team settings alone.

When you were with us, it was clear how much effort you were putting into your game. Let’s keep that momentum going—there’s no better time to get back out there and keep growing.

Looking forward to hearing from you!

Cheers,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 9,
    subject: 'Practice makes progress',
    takeaway: 'The Power of Repetition: How neural pathways in the brain accelerate in-game decision making.',
    body: `Hi {{name}},

Did you know that repeating a skill multiple times creates new neural pathways in the brain, helping you perform faster and more accurately? That’s why repetition is one of the most powerful tools in training.

Our semi-private sessions are designed to give you the right kind of repetition—focused, purposeful, and game-like. It’s not just about doing the same drill over and over; it’s about practicing with intent and learning how to apply it in real situations.

The progress you made when you were training with us was fantastic. Imagine how much further you could go by getting back out there. Let’s make it happen!

All the best,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 10,
    subject: 'Stay one step ahead',
    takeaway: 'The Competitive Edge: Supplemental training delivers up to 20% technical improvement over team practice alone.',
    body: `Hi {{name}},

Players who participate in extra training sessions gain a competitive edge that translates directly to the field. Studies have shown that athletes who invest in supplemental training improve their technical skills by up to 20% more than those who rely solely on team practices.

Our sessions focus on sharpening those technical skills while also building confidence, decision-making, and fitness. It’s the kind of extra effort that can make the difference between good and great.

When you trained with us, you were already taking steps toward that next level. Let’s get you back on the field and keep moving forward!

Looking forward to hearing from you,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 11,
    subject: 'Why small group training works',
    takeaway: 'Small Groups, Big Impact: Combining high touch-volume with game-like competitive dynamics.',
    body: `Hi {{name}},

Did you know that small-group training has been shown to be one of the most effective ways to improve in sports? With smaller groups, players get more touches on the ball, more feedback, and more opportunities to practice in game-like scenarios.

Our semi-private sessions combine the best of both worlds: the individual attention you need to improve, plus the team dynamics that make soccer so much fun.

When you were part of these sessions, it was amazing to see how much progress you made. If you’re ready to return, we’d love to have you back. Let’s pick up where we left off and keep building!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 12,
    subject: 'Confidence starts here',
    takeaway: 'Confidence Through Practice: Cultivating preparation, mindset, and poise under match pressure.',
    body: `Hi {{name}},

Confidence is one of the most important factors in a player’s success—and it comes from preparation. Players who feel ready for any situation on the field perform with more focus, creativity, and poise.

That’s why our sessions focus on both skills and mindset. By creating an encouraging, supportive environment, we help players grow their abilities and their belief in themselves.

When you were with us, it was inspiring to see your confidence grow. We’d love to help you keep building on that foundation. Let’s get back to training together!

All the best,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 13,
    subject: 'Ready for what’s next?',
    takeaway: 'Prepare for the Next Level: Taking the step toward school, club, or collegiate aspirations.',
    body: `Hi {{name}},

Whether it’s stepping up to a higher level of play, making the team, or just becoming the best version of yourself as a player, preparation is the key.

Our training sessions are designed to help players like you take the next step, whatever that might be. With a mix of technical drills, tactical insights, and plenty of fun, it’s a chance to improve while staying connected to the joy of the game.

You were always striving for more when you trained with us, and we’d love to help you keep reaching your goals. Let us know if you’re ready to jump back in!

Cheers,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 14,
    subject: 'Perfect practice makes perfect play.',
    takeaway: 'Mastery Through Repetition: Moving from 20-30 touches in a game to hundreds in training.',
    body: `Hi {{name}}!

One of the biggest benefits of semi-private training is the chance to focus on repetition. In a game, players might only touch the ball 20–30 times. In a small-group training session, they’ll touch it hundreds of times.

Why does this matter? Because repetition builds:

• Confidence: Muscle memory means players instinctively know what to do.
• Precision: Repeating skills under guidance leads to technical mastery.
• Speed: Practice makes players faster and more efficient in their movements.

We’ve seen it time and again—players who train consistently perform better and feel more confident on game day. We’d love to see you back and working toward your goals!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 15,
    subject: 'One size doesn’t fit all.',
    takeaway: 'A Personalized Path to Success: Tailored feedback, skill-based groupings, and targeted focus.',
    body: `Hi {{name}}!

What makes semi-private training unique is that it allows us to tailor each session to the players in the group. We focus on individual goals while fostering collaboration and teamwork.

Here’s how we personalize the experience:

• Targeted feedback: Each player gets specific, actionable advice.
• Skill-based groupings: Players train with others at a similar level.
• Flexible focus: Whether it’s shooting, passing, or defending, we work on what matters most.

We’d love the chance to continue tailoring training to fit your needs. Let’s get back to work!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 16,
    subject: 'Success loves company.',
    takeaway: 'Why Group Training Works: Healthy competition, peer learning, and shared accountability.',
    body: `Hi {{name}}!

One of the best parts of semi-private training is the group dynamic. While individual focus is important, working with a small group creates an environment of shared learning and support.

Here’s why group training is so effective:

• Healthy competition: Players push each other to improve.
• Peer learning: Watching teammates execute a skill helps reinforce your own learning.
• Accountability: Training with others keeps players motivated.

Soccer is a team sport, and small-group sessions help build the camaraderie and skills that translate directly to the field. We’d love to see you back in the group!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 17,
    subject: 'Think faster. Play smarter.',
    takeaway: 'Building Game IQ: Game-like scenarios, positional awareness, and high-tempo decision making.',
    body: `Hi {{name}}!

Soccer isn’t just about physical skills—it’s about making smart decisions under pressure. In our semi-private sessions, we focus on developing “game IQ” by:

• Running game-like scenarios that mimic real challenges.
• Teaching positional awareness to help players understand where they fit in the game.
• Encouraging quick thinking through high-tempo drills.

Players who train with us don’t just play better—they play smarter. Come back and let’s continue building those skills together!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 18,
    subject: 'Train hard, play happy.',
    takeaway: 'Fitness Meets Fun: Mini-games, game-like situations, and room for creative experimentation.',
    body: `Hi {{name}}!

Soccer training shouldn’t feel like a chore—it should be challenging, rewarding, and fun. That’s the philosophy behind our sessions. We make training engaging by:

• Incorporating competitive mini-games.
• Offering drills that mirror real-game situations.
• Encouraging creativity and experimentation.

When players enjoy their training, they stay motivated and come to the field ready to improve. Let’s get back to having fun while working hard together!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 19,
    subject: 'What sets top players apart.',
    takeaway: 'The Competitive Edge: Fine-tuning technical abilities, extra touches, and continuous improvement.',
    body: `Hi {{name}}!

What separates good players from great ones? It’s the extra work they put in. Semi-private training offers players the chance to:

• Fine-tune their technical abilities.
• Get extra touches on the ball.
• Develop a mindset of continuous improvement.

Whether you’re aiming to dominate your next game or just love the thrill of improvement, we’re here to help you gain that edge. Come back and let’s keep pushing forward!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 20,
    subject: 'The journey isn’t over.',
    takeaway: 'Let’s Pick Up Where We Left Off: Soccer as a lifelong journey and invitation to tackle new challenges.',
    body: `Hi {{name}}!

We’ve loved working with you in the past, and we’d be thrilled to continue helping you grow as a player. Soccer is a lifelong journey, and every session is an opportunity to learn, improve, and enjoy the game.

Let’s pick up where we left off, keep building on your strengths, and tackle any new challenges that come your way.

The field is waiting—and so are we. Let’s get back out there together!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 21,
    subject: 'Confidence comes from preparation.',
    takeaway: 'Confidence Built Here: Repetitions, realistic game preparation, and positive reinforcement.',
    body: `Hi {{name}}!

What’s one thing all great players have in common? Confidence. And confidence isn’t something you’re born with—it’s built through practice, repetition, and success in training.

In our semi-private sessions, players:

• Get the reps they need to build muscle memory.
• Practice in realistic scenarios to feel prepared for game situations.
• Receive encouragement and positive reinforcement to stay motivated.

When players train consistently, they step onto the field knowing they’re ready. Let’s work together to build that confidence again—we’d love to see you back!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 22,
    subject: 'Try something new.',
    takeaway: 'A Place to Experiment: Low-pressure environment to take risks, try new moves, and build confidence.',
    body: `Hi {{name}}!

Soccer training should be a space where players feel free to take risks and try new things. In our semi-private sessions, we encourage creativity and experimentation.

Here’s why this matters:

• Players discover what works and what doesn’t in a low-pressure environment.
• Trying new skills keeps training fresh and exciting.
• Experimenting in practice makes it easier to execute confidently in games.

Whether it’s a tricky dribble move, a long-range pass, or a different position, this is the place to explore. Let’s get back to trying new things together!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 23,
    subject: 'Training together, growing together.',
    takeaway: 'Teamwork Starts Here: Improving communication, building trust, and preparing to shine on a team.',
    body: `Hi {{name}}!

Soccer is a team sport, but great teamwork starts with individual growth. In our semi-private sessions, players work together to:

• Improve communication on and off the ball.
• Build trust by learning each other’s playing styles.
• Develop a sense of accountability and shared success.

Training with others not only makes players better individually but also prepares them to shine as part of a team. We’d love to have you back in the group!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 24,
    subject: 'Build a strong soccer foundation.',
    takeaway: 'The Foundation of Success: Ball control, first touch, passing accuracy, and spatial awareness.',
    body: `Hi {{name}}!

Every great player starts with the basics. In our sessions, we emphasize foundational skills like:

• Ball control and first touch.
• Passing accuracy and timing.
• Proper positioning and spatial awareness.

These fundamentals are the building blocks of every successful player’s game. Whether you’re just starting out or looking to refine your skills, we’re here to help you keep growing. Let’s get back to building together!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 25,
    subject: 'Soccer is meant to be fun.',
    takeaway: 'The Joy of the Game: Creating a supportive environment and rediscovering the love of the sport.',
    body: `Hi {{name}}!

At its core, soccer is a game—a game that’s meant to be enjoyed. In our sessions, we focus on:

• Creating a supportive and fun environment where players can thrive.
• Mixing serious training with moments of play and creativity.
• Reminding players of why they fell in love with the game in the first place.

We’d love to help you rediscover the joy of training and playing. Let’s make soccer fun and fulfilling again. We’d love to see you back soon!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  // Extension steps 26-56 continuing the alumni win-back sequence
  ...Array.from({ length: 31 }, (_, idx) => {
    const week = idx + 26;
    const extensionTopics: Array<{ subject: string; takeaway: string; focus: string; offer: string }> = [
      {
        subject: 'Don’t let the sharpness slip away (Alumni Tune-Up Pass)',
        takeaway: 'The Muscle Memory Advantage: How a single session refreshes muscle memory and touch.',
        focus: 'High-touch technical drills and explosive footwork circuits.',
        offer: 'Take advantage of a complimentary Alumni Tune-Up session this month.',
      },
      {
        subject: 'How is your club season going, {{name}}?',
        takeaway: 'Mid-Season Check-In: Checking in on match confidence, role on the team, and areas for refinement.',
        focus: 'Addressing specific in-season challenges or positioning tweaks.',
        offer: 'Reply with how matches have been feeling—we’d love to offer tailored advice!',
      },
      {
        subject: 'Exclusive Alumni Pass: Weekend Finishing & Shot-Stopping Clinic',
        takeaway: 'Special Clinic Invitation: High-intensity weekend clinic for returning academy players.',
        focus: '18-yard box finishing, breakaway battles, and fast-paced tournament play.',
        offer: 'Alumni athletes receive 25% off our upcoming weekend clinic.',
      },
      {
        subject: 'The value of an outside perspective on your game',
        takeaway: 'Why club coaches get tunnel vision on team tactics and the power of objective skill evaluation.',
        focus: 'Unbiased technical feedback without team politics or playing time pressure.',
        offer: 'Come in for a 1-on-1 assessment and Player Profile update.',
      },
      {
        subject: 'Tryout season is closer than you think!',
        takeaway: 'Preparing for High School & Club Tryouts: Building confidence before evaluation week.',
        focus: 'Standing out with high work rate, commanding first touches, and positive presence.',
        offer: 'Join our Pre-Tryout Prep group in Lilburn, Gainesville, or Loganville.',
      },
      {
        subject: 'Speed & Agility: The secret weapon for soccer players',
        takeaway: 'Deceleration, change of direction, and first-step burst on the grass.',
        focus: 'Soccer-specific biomechanics and explosive lateral power.',
        offer: 'Drop in for an agility-focused session this week.',
      },
      {
        subject: 'Overcoming mid-season slumps',
        takeaway: 'Why every player hits a plateau and how targeted training reignites excitement.',
        focus: 'Reframing mistakes as stepping stones and enjoying the learning process.',
        offer: 'Let’s get a session on the calendar to break through any plateau.',
      },
      {
        subject: 'Alumni Guest Pass: Bring a teammate with you!',
        takeaway: 'Rejoining with a friend: Train together with your favorite club teammate.',
        focus: 'Competitive pair drills, combinations, and mutual accountability.',
        offer: 'Both you and your guest receive free session passes when you re-enroll.',
      },
      {
        subject: 'What high-level coaches actually look for in matches',
        takeaway: 'Recruitment Insights: Work ethic off the ball, communication, and body language.',
        focus: 'Developing the intangible qualities that scouts remember.',
        offer: 'We’d love to help you build those exact game-changing habits.',
      },
      {
        subject: 'Summer Skill Intensives now open for alumni',
        takeaway: 'Summer Training Schedule: Accelerating growth during the competitive off-season.',
        focus: 'Daily touch volume, tactical workshops, and video analysis.',
        offer: 'Alumni receive early-bird priority registration for all summer slots.',
      },
      {
        subject: 'Winter Training Maintenance: Stay sharp while others rest',
        takeaway: 'Off-Season Sharpness: Maintaining your edge while rival players take months off.',
        focus: 'Futsal-style small space training and core strength.',
        offer: 'Join our winter indoor/turf cohorts in Lilburn, Gainesville, and Loganville.',
      },
      {
        subject: 'Rebuilding that unstoppable game-day feeling',
        takeaway: 'The Connection Between Training Volume and Game Flow.',
        focus: 'When you have 1,000 touches a week under your belt, games feel effortless.',
        offer: 'Re-join our weekly academy group and feel the difference immediately.',
      },
      {
        subject: 'Small tweaks that lead to massive breakthroughs',
        takeaway: 'How micro-adjustments to foot angle or hip posture unlock effortless power.',
        focus: 'Personalized video feedback and coaching eye for detail.',
        offer: 'Let us take a look at your technique in a dedicated session.',
      },
      {
        subject: 'New training time slots opened in Lilburn, Gainesville & Loganville',
        takeaway: 'Expanded Academy Availability: Flexible training schedules tailored for busy families.',
        focus: 'Weeknight and weekend groups across all three academy facilities.',
        offer: 'Pick the time and location that fits your current family schedule.',
      },
      {
        subject: 'The 30-Day Technical Refresh Challenge',
        takeaway: 'A month of focused training to elevate your touch, passing, and reaction speed.',
        focus: 'Structured progression tracking with our Player Profile grading.',
        offer: 'Commit to 30 days of training with an alumni re-enrollment discount.',
      },
      {
        subject: 'Developing your non-dominant foot before next season',
        takeaway: 'Eliminating the one-footed trap that defenders feast on.',
        focus: 'High-rep weak-foot shooting, passing, and receiving drills.',
        offer: 'Let’s work on this together so you step onto the field twice as dangerous.',
      },
      {
        subject: 'The difference between good and unstoppable',
        takeaway: 'It’s the extra hours outside team practice that turn solid players into game-winners.',
        focus: 'Elite habits, dedication, and passion for mastery.',
        offer: 'We’re ready to get back to work whenever you are.',
      },
      {
        subject: 'Have you seen our upgraded Player Profiles?',
        takeaway: 'Instant Session Feedback: 1-5 grading, 100-point skill radar, and custom video homework.',
        focus: 'Detailed tracking that helps athletes see tangible progress after every practice.',
        offer: 'Reactivate your Player Profile and track your upcoming milestones.',
      },
      {
        subject: 'Tactical IQ Workshop for dedicated athletes',
        takeaway: 'Reading the pitch 2 steps ahead: third-man runs, scanning habits, and defensive triggers.',
        focus: 'Classroom and on-field tactical breakdown for competitive players.',
        offer: 'Reserve your spot in our upcoming tactical masterclass.',
      },
      {
        subject: 'Alumni Reunion Session: Train with familiar faces',
        takeaway: 'Connecting with former academy training partners on the pitch.',
        focus: 'Fast-paced rondos, small-sided tournament games, and great camaraderie.',
        offer: 'Drop in for our special alumni training evening.',
      },
      {
        subject: 'Getting ahead before pre-season begins',
        takeaway: 'Arriving at club pre-season fully conditioned and technically sharp.',
        focus: 'Match fitness, sprint endurance, and crisp ball mastery.',
        offer: 'Book a 4-week pre-season acceleration block.',
      },
      {
        subject: 'Mental toughness when the whistle blows',
        takeaway: 'Bouncing back from bad referee calls, missed chances, and tough losses.',
        focus: 'The next-play mentality and competitive composure.',
        offer: 'Let us help you build rock-solid confidence on the field.',
      },
      {
        subject: 'Soccer-specific injury prevention and conditioning',
        takeaway: 'Protecting hamstrings, groins, and ankles with functional movement training.',
        focus: 'Core stability, eccentric strength, and landing mechanics.',
        offer: 'Integrated conditioning included in all academy sessions.',
      },
      {
        subject: 'Why the world’s best players never stop training the basics',
        takeaway: 'Messi, Ronaldo, and De Bruyne still do basic passing and touch drills every single day.',
        focus: 'Relentless commitment to flawless fundamentals.',
        offer: 'Come get your touches with us this week.',
      },
      {
        subject: 'Special Returning Athlete Re-Enrollment Incentive',
        takeaway: 'Exclusive Welcome-Back Package for Flowers Soccer Academy alumni.',
        focus: 'Rejoin our weekly training groups with special returning family pricing.',
        offer: 'Enjoy 20% off your first month when you re-enroll this week.',
      },
      {
        subject: 'Setting goals for your upcoming soccer year',
        takeaway: 'Mapping out tangible benchmarks for school, club, and personal growth.',
        focus: 'Goal setting with Coach Flowers to keep you motivated and focused.',
        offer: 'Reply with your top soccer goal for this season!',
      },
      {
        subject: 'The field is always waiting for you, {{name}}',
        takeaway: 'A warm reminder that you will always be a valued member of the Flowers Soccer Academy family.',
        focus: 'Open invitation to drop into training anytime.',
        offer: 'No pressure, just great soccer and genuine encouragement.',
      },
      {
        subject: 'Looking back at how far you’ve come',
        takeaway: 'Reflecting on your growth and the limitless potential ahead of you.',
        focus: 'Believing in your talent and continuing to invest in your passion.',
        offer: 'We’d love to celebrate your next soccer milestone with you.',
      },
      {
        subject: 'Match film review: Let us break down your game touches',
        takeaway: 'Send in match clips for professional tactical and technical feedback.',
        focus: 'Personalized video critique to identify growth opportunities in live games.',
        offer: 'Complimentary video breakdown for returning alumni.',
      },
      {
        subject: 'Sharpening your skills for tournament playoffs',
        takeaway: 'Peak performance training for high-stakes post-season matches.',
        focus: 'High-pressure penalty kicks, 1v1 execution, and finishing composure.',
        offer: 'Join us for a playoff tune-up session.',
      },
      {
        subject: 'One year later: Your soccer potential is still unlimited',
        takeaway: 'Celebrating your ongoing journey as a player and person.',
        focus: 'The door is always wide open at Flowers Soccer Academy.',
        offer: 'Whenever you want to get back on the pitch, Coach Flowers is right here.',
      },
    ];

    const item = extensionTopics[idx] || extensionTopics[extensionTopics.length - 1];

    return {
      step: week,
      subject: item.subject,
      takeaway: item.takeaway,
      body: `Hi {{name}},

${item.takeaway}

A Message from Coach Flowers:
• What We Focus On: ${item.focus}
• Special Alumni Note: ${item.offer}
• Our Locations: Lilburn, Gainesville, and Loganville.

Training is always more enjoyable and rewarding when you have great coaching and a supportive atmosphere. If you’ve been thinking about getting back out on the pitch, we would love to have you back in our training groups!

Feel free to reply directly to this email or send us a text to reserve your spot.

Best regards,
Coach Flowers
Flowers Soccer Academy`,
    };
  }),
];
