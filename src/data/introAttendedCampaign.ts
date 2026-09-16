import { CampaignStepDefinition } from './reachedOutCampaign';

/**
 * 56-Step 1-Year Automated Nurture Sequence for Stage 3: Intro Attended.
 * Steps 1-14: The exact sequence provided by Flowers Soccer Academy, with all 15% offers
 * updated to 10% off first month as requested, linking to https://www.gwinnettsoccertraining.com/.
 * Steps 15-56: Extension series continuing the company promotion, highlighting technical development,
 * multiple coaches, 1-on-1 and small group dynamics, video analysis, progress tracking, flexible scheduling,
 * and monthly packages.
 */
export const INTRO_ATTENDED_EMAILS: CampaignStepDefinition[] = [
  {
    step: 1,
    subject: 'I hope you enjoyed your introductory soccer session! (Next Steps & 10% Off)',
    takeaway: 'Thank you for attending intro session, FSA mission, what we offer, pricing options, and 10% off first month.',
    body: `Hey {{name}}!

I hope you enjoyed your introductory soccer session and found it both fun and insightful! It was a pleasure working with yall and seeing your child's passion to get better firsthand. 

About Us 

At Flowers Soccer Academy, our mission is to help soccer players of all skill levels unlock their full potential. Whether it's improving technical skills, boosting confidence on the field, or building a strategic mindset, we tailor every session to meet the unique needs of each player.

What We Offer
Here’s what you can expect when you train with us:
• Customized Training Plans: Designed to focus on individual goals.
• Multiple Coaches: Benefit from diverse perspectives and coaching styles to maximize development.
• Flexible Scheduling: Sessions are available Monday through Saturday to fit around your busy life.
• Varied Training Environments: We offer one on one sessions as well as group sessions. As soccer is a team game, training in a small group environment allows us to train in a way we couldn't in a one on one environment.
• Progress Tracking (Added feature): Regular updates on skills development.
• Video Analysis (Added feature): For a deeper understanding of technique and strategy.

What’s Next?
If you’re ready to take the next step, I’d be thrilled to set up a personalized training plan for yall! Our session packages range from training one time a week to five times a week! The more you train the less it is per session and the quicker you will achieve your goals! Packages are set up on a reoccurring auto pay so we can focus on our training at the field. If/when you are looking to take a break, just let coach Evan know and the service will be suspended.

You can find more details about our services, pricing, and availability here:
https://www.gwinnettsoccertraining.com/

Special Offer
As a thank you for trying our introductory session, I’m happy to offer a bonus offer of 10% off for your first month if you book before the end of today!

Feel free to reply to this email with any questions or to schedule your next session. I look forward to helping your child achieve their soccer goals!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 2,
    subject: 'Unlock Your Player’s Full Potential',
    takeaway: 'Personalized growth: Turning potential into performance with monthly packages + 10% off first month.',
    body: `Hey {{name}}!

It was great seeing your player in action during the free session. They’ve got the drive and potential to achieve incredible things on the soccer field!

At Flowers Soccer Academy, we specialize in turning potential into performance. With our personalized training plans, your child will:

• Master technical skills faster.
• Build the confidence to shine during games.
• Develop a deeper understanding of soccer strategy.

Consistency is the secret to real growth—and our monthly packages are designed to provide just that.

Remember, there’s still time to take advantage of our 10% off special for your first month if you sign up today.

Click below to learn more and secure your spot:
https://www.gwinnettsoccertraining.com/

Let’s keep the momentum going!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 3,
    subject: 'Ready for the Next Level?',
    takeaway: 'Why consistency is key: Weekly packages, video analysis, progress tracking + 10% off first month.',
    body: `Hey {{name}}!

Training consistently is the difference-maker when it comes to player development. With our monthly packages, your player gets the structured support they need to grow faster and play better.

Our packages include:

• Weekly sessions tailored to their goals.
• Progress tracking to measure improvements.
• Advanced techniques like video analysis to refine their skills.

Plus, the more frequently they train, the faster they’ll see results—and the less it costs per session.

Sign up today and enjoy 10% off your first month! This special offer ends soon, so don’t miss out.

https://www.gwinnettsoccertraining.com/

Let’s turn their potential into performance—one session at a time!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 4,
    subject: 'Real Results, Real Confidence',
    takeaway: 'What our players and parents are saying: Testimonials on confidence and video analysis + 10% off first month.',
    body: `Hey {{name}}!

Still considering whether Flowers Soccer Academy is the right fit? Here’s what some of our players and parents have said:

"My child’s confidence on the field has skyrocketed since training with Coach Evan. The personalized approach makes all the difference!"

"The progress reports and video analysis help us see how much our player is improving—it’s amazing!"

"The coaches are so encouraging and make every session fun. My player looks forward to it every week."

We’d love to help your player achieve their own success story. Don’t forget, you can lock in 10% off your first month if you sign up now:

https://www.gwinnettsoccertraining.com/

Let’s keep building on the skills they’ve already shown!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 5,
    subject: 'The First Step Was Just the Beginning',
    takeaway: 'Progress takes commitment: Sharper skills, fitness, confidence to dominate + 10% off first month.',
    body: `Hey {{name}}!

The free intro session was just the start of your player’s soccer journey. Now it’s time to build on that foundation and see real progress.

Here’s what your player can achieve with our monthly packages:

• Sharper technical skills.
• Improved fitness and endurance.
• Confidence to dominate on the field.

Consistency is how great players are made. Let’s create a plan that fits your schedule and helps your player reach their goals faster.

Sign up today to save 10% on your first month! This offer ends soon, so act now:
https://www.gwinnettsoccertraining.com/

I’m excited to continue working with your player and seeing their progress!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 6,
    subject: 'There’s Still Time to Save!',
    takeaway: 'Don’t let this opportunity pass: Tailored plans, flexible scheduling, unbeatable value + 10% off first month.',
    body: `Hey {{name}}!

I wanted to remind you that our special 10% off your first month offer is still available—but only for a little longer.

Training at Flowers Soccer Academy means:

• Tailored plans for faster skill development.
• Flexible scheduling to fit your life.
• Real results that build confidence and game-day performance.

This is the perfect chance to lock in consistent training at an unbeatable value.

https://www.gwinnettsoccertraining.com/

Let’s take the next step in your player’s soccer journey together!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 7,
    subject: 'The Journey to Greatness Starts Here',
    takeaway: 'Let’s build their soccer future: Experienced coaches, video analysis, options 1 to 5 times per week.',
    body: `Hey {{name}}!

Soccer is more than a game—it’s a journey of growth, confidence, and achievement. At Flowers Soccer Academy, we’re here to guide your player every step of the way.

With our monthly packages, your player will:

• Train consistently with experienced coaches.
• See measurable progress through video analysis and progress tracking.
• Build skills that last a lifetime.

The best part? Our sessions are designed to fit your schedule, with options from one to five times per week.

Ready to start? Click below to secure your spot today:
https://www.gwinnettsoccertraining.com/

Let’s create a plan for your player’s success together!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 8,
    subject: 'Progress Begins with Commitment',
    takeaway: 'Small steps, big improvements: Manageable week-by-week drills, regular feedback + 10% off first month.',
    body: `Hey {{name}}!

Soccer development doesn’t happen overnight, but every step brings your player closer to their goals. At Flowers Soccer Academy, we break the journey into manageable steps:

• Week-by-week training sessions.
• Skill-building drills tailored to their needs.
• Regular feedback to guide their growth.

By committing to consistent, personalized training, your player can achieve more than they ever imagined.

Take the next step today and enjoy 10% off your first month when you sign up now:
https://www.gwinnettsoccertraining.com/

Big improvements start with small commitments. Let’s make it happen!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 9,
    subject: 'Partnering with Parents for Success',
    takeaway: 'The advantage of a team effort: Progress reports, outside training goals, flexible schedule + 10% off.',
    body: `Hey {{name}}!

Behind every great player is a strong support system. At Flowers Soccer Academy, we believe teamwork includes parents, too! Here’s how we help:

• Progress reports to keep you informed.
• Fitness and skill goals to work on outside of training.
• Flexible schedules that fit your family’s life.

When we work together, your player’s growth becomes unstoppable.

Join our monthly training program today and save 10% on your first month:
https://www.gwinnettsoccertraining.com/

Together, we can take your player’s game to the next level.

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 10,
    subject: 'Building Skills and Belief in Every Session',
    takeaway: 'Confidence starts here: Technical control, fitness, soccer IQ, and 10% off first month.',
    body: `Hey {{name}}!

Confidence on the field comes from preparation, and preparation starts with consistent training. At Flowers Soccer Academy, we give players the tools to believe in themselves:

• Mastering technical skills for better control.
• Building fitness to outperform the competition.
• Developing soccer IQ to think faster during games.

Confidence grows with every session—and your player’s journey can continue today.

Don’t forget: 10% off your first month is still available, but only for a limited time:
https://www.gwinnettsoccertraining.com/

Let’s help your player step onto the field with pride and confidence!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 11,
    subject: 'Watch Your Player’s Skills Transform',
    takeaway: 'Results you can see: Sharper decisions, progress updates, video analysis + 10% off first month.',
    body: `Hey {{name}}!

When you invest in consistent training, the results are undeniable:

• Stronger, sharper skills.
• Faster decision-making on the field.
• Confidence that shines in every game.

At Flowers Soccer Academy, we track and celebrate these transformations with progress updates and video analysis so you can see the improvement for yourself.

Ready to see results? Sign up for a monthly package and save 10% on your first month when you act now:
https://www.gwinnettsoccertraining.com/

We’re here to help your player achieve greatness—one session at a time.

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 12,
    subject: 'The Next Step Awaits!',
    takeaway: 'Let’s keep the momentum going: Customized plans, expert coaches, progress tracking + 10% off.',
    body: `Hey {{name}}!

Your player has already taken an important first step by attending the free intro session. Let’s keep the momentum going with consistent training!

With our monthly packages, they’ll get:

• Customized plans for rapid improvement.
• Access to expert coaches who know how to motivate and guide.
• Progress tracking to stay on course toward their goals.

Consistency is the secret to success, and there’s no better time to start than now.

Click below to sign up and lock in 10% off your first month before it’s too late:
https://www.gwinnettsoccertraining.com/

Let’s build on the great start they’ve already made!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 13,
    subject: 'Special Offer Ends Soon!',
    takeaway: 'Don’t miss out: Weekly sessions, fitness & skill development, progress tracking + 10% off first month.',
    body: `Hey {{name}}!

I wanted to remind you that our special 10% off your first month offer is ending soon. Don’t miss this chance to give your player the training they need at an incredible value!

Our monthly packages offer:

• Weekly sessions tailored to their unique goals.
• Fitness and skills training for all-around development.
• Progress reports to track their growth.

Sign up today to take advantage of this limited-time offer:
https://www.gwinnettsoccertraining.com/

Opportunities like this don’t come often. Let’s keep your player moving forward!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 14,
    subject: 'Let’s Take the Next Step Together',
    takeaway: 'The path to greatness starts here: Structured plan, dedicated coaches, video analysis + 10% off.',
    body: `Hey {{name}}!

Soccer isn’t just about skill—it’s about commitment, growth, and confidence. At Flowers Soccer Academy, we’re here to support your player every step of the way.

By enrolling in a monthly package, they’ll benefit from:

• A structured plan for consistent improvement.
• A team of coaches who are invested in their success.
• Tools like video analysis and progress tracking to maximize their growth.

Let’s continue the journey we’ve started together. Click below to secure your spot and claim 10% off your first month before it’s too late!
https://www.gwinnettsoccertraining.com/

Your player’s future is waiting. Let’s help them reach their potential!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 15,
    subject: 'Why Small Group Training Elevates Game-Day Performance',
    takeaway: 'Why small group training mirrors game realism: Pressure, passing lanes, and competitive instinct.',
    body: `Hey {{name}}!

Soccer is a team game—which is why varied training environments are a core pillar of Flowers Soccer Academy.

While 1-on-1 sessions allow us to isolate and perfect micro-mechanics, training in a small group environment allows us to train in a way we simply couldn't in a solo setting:

• Live defensive pressure on every first touch.
• Developing peripheral vision and split-second passing decisions.
• Competing against high-level peers who push your player to run faster and think quicker.

Our athletes get the best of both worlds: individual attention from our coaching staff and the game-speed realism of small group drills.

See how our varied training environments bring out the best in your player:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 16,
    subject: 'How Video Analysis Accelerates Player Growth',
    takeaway: 'Video analysis feature: Spotting body positioning, angles, and decision-making frame-by-frame.',
    body: `Hey {{name}}!

Have you ever tried explaining a technique mistake to a player, but they couldn't feel what they were doing wrong?

That’s why we integrated Video Analysis into Flowers Soccer Academy.

When an athlete sees their own foot angle on a strike, or sees where they were looking before receiving a pass, a lightbulb turns on instantly. Visual feedback bridges the gap between what players think they are doing and what is actually happening on the pitch.

With regular video analysis, your player will:
• Correct shooting and passing mechanics twice as fast.
• Understand defensive positioning and space management.
• Gain visual confidence in their own progression.

Ready to see how video analysis transforms skill development?
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 17,
    subject: 'The Power of Multiple Coaches in Your Corner',
    takeaway: 'Benefit from diverse perspectives and coaching styles to maximize overall development.',
    body: `Hey {{name}}!

Every soccer player is unique—and so is every coach.

At Flowers Soccer Academy, one of our biggest advantages is having multiple experienced coaches working with our athletes. 

When your player trains with us, they benefit from:
• Diverse coaching perspectives that unlock new ways to understand the game.
• Specialized expertise across shooting, defensive footwork, and tactical positioning.
• Coaches who know how to motivate, challenge, and build genuine confidence in each athlete.

Our coaches communicate constantly about each player's progress so every session builds seamlessly upon the last.

Discover what our coaching team can do for your player:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 18,
    subject: 'Training That Fits Your Busy Family Life',
    takeaway: 'Flexible scheduling Monday through Saturday across Lilburn, Gainesville, and Loganville.',
    body: `Hey {{name}}!

Between school, homework, team practices, and family commitments, youth sports schedules can be overwhelming.

That’s why Flowers Soccer Academy offers flexible scheduling Monday through Saturday.

Whether your family prefers weekday after-school training or convenient Saturday morning sessions, our schedule is designed to adapt to your life:
• Sessions available Monday through Saturday.
• Training locations across Lilburn, Gainesville, and Loganville.
• Seamless recurring auto-pay with no hidden contracts—if you need to take a break, just let Coach Evan know and service is paused.

Consistent training shouldn't create stress for parents. We make it easy to keep your player developing every single week.

Check our current availability and reserve your ideal training days:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 19,
    subject: 'The Secret to Game-Day Composure: The First Touch',
    takeaway: 'Technical insight: Why high-repetition first touch mastery eliminates panicked turnovers.',
    body: `Hey {{name}}!

Why do some players look hurried and panicked in games, while others seem to have all the time in the world?

It all comes down to the first touch.

If a player takes two or three touches just to get the ball under control, defenders close down space instantly. But when an athlete cushions the ball directly into space on touch one, the whole field opens up.

At Flowers Soccer Academy, we run high-repetition touch drills from every angle—ground balls, bouncing passes, driven balls, and aerial serves. In our sessions, players get more quality touches in one hour than in an entire week of standard team practice.

Let’s turn your player’s first touch into an elite weapon:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 20,
    subject: 'How Our Progress Tracking Keeps Goals on Course',
    takeaway: 'Progress tracking feature: Measurable milestones, skill benchmarks, and clear parent communication.',
    body: `Hey {{name}}!

"Are we actually getting better?"

It’s the question every parent asks. At Flowers Soccer Academy, you never have to guess.

Through our structured Progress Tracking, we document your player’s milestones across technical control, fitness benchmarks, and game IQ. You’ll receive clear updates so you can celebrate their breakthroughs together.

When players see concrete evidence of their hard work paying off, their motivation skyrockets.

Ready to see how measurable progress accelerates athletic confidence?
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 21,
    subject: '1x a Week vs. 3x a Week: Finding the Right Rhythm',
    takeaway: 'Session package breakdown: 1 to 5 times per week, lower cost per session, faster goal achievement.',
    body: `Hey {{name}}!

One of the questions parents often ask Coach Evan is: "How many times a week should my player train?"

Our session packages range from 1 to 5 times per week to match your player’s goals and family schedule:
• 1x per week: Great for consistent maintenance and sharpening core technical habits.
• 2x to 3x per week: The sweet spot for rapid skill acceleration and noticeable game-day breakthroughs.
• 4x to 5x per week: Elite immersion for players preparing for high school varsity or competitive club tryouts.

The best part? The more you train, the less it costs per session—and the quicker your player achieves their soccer dreams.

Explore our monthly packages and find the right fit:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 22,
    subject: 'Turning Practice Instinct into Game-Day Swagger',
    takeaway: 'Mental performance: Bridging the gap between backyard drills and confident match play.',
    body: `Hey {{name}}!

Does your player look brilliant in practice, but sometimes hold back or play timidly during actual club matches?

This is the most common hurdle for young athletes. The root cause isn't a lack of desire—it’s confidence under live match pressure.

At Flowers Soccer Academy, our coaches create high-intensity, positive training environments where mistakes are treated as stepping stones. When players realize they can execute moves under pressure in our small group sessions, that hesitation vanishes on game day.

Give your player the confidence they deserve:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 23,
    subject: 'Convenience at Its Best: Recurring Auto-Pay & Zero Hassle',
    takeaway: 'Hassle-free training: Auto-pay convenience, focus on the field, pause anytime with Coach Evan.',
    body: `Hey {{name}}!

We want your experience with Flowers Soccer Academy to be smooth both on and off the field.

That’s why all our training packages are set up on simple recurring auto-pay:
• No invoicing hassles or scrambling with cash at the pitch.
• Your spot is locked in every week.
• Complete peace of mind: if you ever need to take a break for vacation or off-season rest, just let Coach Evan know and your service is suspended immediately.

We handle the details so you and your player can focus purely on having fun and getting better.

Join our academy family today:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 24,
    subject: 'Speed of Thought: Developing True Soccer IQ',
    takeaway: 'Tactical mindset: Reading the game, anticipation, and decision-making before the ball arrives.',
    body: `Hey {{name}}!

The fastest player on the pitch isn’t the one with the fastest sprint—it’s the player who reads the game half a second before everyone else.

At Flowers Soccer Academy, developing a strategic mindset is part of every session:
• Body orientation before receiving passes.
• Anticipating defensive movement and exploiting weak spots.
• Decision-making under time constraints.

When technical skill pairs with soccer IQ, your player becomes impossible to defend.

Start developing their tactical edge today:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 25,
    subject: 'Where Could Your Player Be in 6 Months?',
    takeaway: 'Long-term development: Projecting player growth with 6 months of dedicated academy coaching.',
    body: `Hey {{name}}!

Imagine watching your player take the field six months from today:
• Confident first touch under physical contact.
• Clean, crisp striking with both left and right feet.
• High soccer IQ, directing teammates and finding open passing lanes.
• A genuine smile because they know they are prepared.

That transformation doesn't happen by accident—it happens through structured weekly repetition at Flowers Soccer Academy.

Every week you delay is another week of missed touches. Let’s get started today:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 26,
    subject: 'Clinical Shooting: Turning Half-Chances into Goals',
    takeaway: 'Finishing technique: Plant foot positioning, ankle lock, and composure inside the penalty box.',
    body: `Hey {{name}}!

Scoring goals in soccer is about precision, not just kicking the ball as hard as possible.

In our finishing clinics at Flowers Soccer Academy, we break down:
• Plant foot placement for accuracy and power.
• Locking the ankle on instep strikes.
• Keeping the chest over the ball to prevent skies.
• Slotting low into the side netting where goalkeepers can’t reach.

Whether your player is a winger, midfielder, or striker, scoring goals builds unmatched confidence.

Let’s dial in their shooting mechanics:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 27,
    subject: 'The Importance of Both Feet: Unlocking the Entire Pitch',
    takeaway: 'Weak-foot mastery: Why one-footed players get shut down and how FSA builds dual-footed confidence.',
    body: `Hey {{name}}!

If a player can only use their right foot, a smart defender only has to take away one side.

At Flowers Soccer Academy, we dedicate serious focus to weak-foot development. Through repetitive isolated touches and small-sided games, we make passing and shooting with the weaker foot feel as natural as breathing.

A two-footed player is twice as dangerous, twice as confident, and infinitely harder to stop.

Build true versatility into your player’s game:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 28,
    subject: 'Mid-Season Check-In: Don’t Let Skills Fade',
    takeaway: 'Maintaining sharpness: Why team practice alone leaves individual skills behind during the season.',
    body: `Hey {{name}}!

During the middle of a competitive soccer season, team coaches must spend most of practice on formations, set pieces, and team tactics. Individual technique often takes a backseat.

That’s why supplemental training with Flowers Soccer Academy is critical during the season:
• 100+ individual touches per drill.
• Fine-tuning technical sharpness so players feel fresh on match days.
• Addressing personal weaknesses that team practices don’t have time to fix.

Keep your player at the top of their game all season long:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 29,
    subject: 'Goalkeeping Excellence: Specialized Training at FSA',
    takeaway: 'Specialized goalkeeping track: Handling, diving mechanics, distribution, and commanding the box.',
    body: `Hey {{name}}!

Goalkeepers have the most demanding position in all of sports—yet most team practices give them zero specialized coaching.

At Flowers Soccer Academy, we take goalkeeping seriously. Our dedicated goalkeeper development covers:
• Clean hand contour and catching technique to eliminate rebounds.
• Explosive footwork and angle management along the goal line.
• Safe diving mechanics and recovery speed.
• Distribution with both feet to launch quick counter-attacks.

Give your keeper the coaching and respect the position requires:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 30,
    subject: 'Agility, Balance, and Foot Speed Without the Ball',
    takeaway: 'Physical literacy: Ladder drills, deceleration, and explosive change of direction for soccer athletes.',
    body: `Hey {{name}}!

Soccer players run an average of 4 to 6 miles per match—mostly in short, explosive 5-to-15 yard bursts with rapid changes of direction.

At Flowers Soccer Academy, we integrate soccer-specific speed and agility work into every session:
• Quick-foot ladder patterns to enhance coordination.
• Deceleration mechanics that protect knees and ankles.
• Explosive first-step acceleration to beat defenders to 50/50 balls.

Fast feet combined with sharp technical skills make an unstoppable combination.

Experience our comprehensive training approach:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 31,
    subject: 'Home Training Drills: What to Do Between Sessions',
    takeaway: 'Academy homework: 15-minute daily wall-ball and juggling routines to compound academy coaching.',
    body: `Hey {{name}}!

Great players love the ball—not just during training, but in the backyard, garage, and living room.

When your player trains with Flowers Soccer Academy, we provide simple, high-impact "at-home drills" (like our 15-minute wall-ball routine) that reinforce everything we teach on the pitch.

When home habits combine with weekly academy coaching, development happens twice as fast.

Let’s give your player the roadmap to greatness:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 32,
    subject: 'Developing On-Field Communication & Leadership',
    takeaway: 'Vocal leadership: Helping shy players speak up, direct teammates, and play with commanding presence.',
    body: `Hey {{name}}!

Soccer is a communication sport. The loudest, most organized teams almost always dominate the pitch.

Yet so many young players are shy or afraid of saying the wrong thing during games.

At Flowers Soccer Academy, we build communication directly into our drills:
• Demanding clear, vocal calls on every pass ("Turn!", "Man on!", "Drop!").
• Teaching players how to direct teammates and organize defensive shapes.
• Building self-assurance so they play with true presence.

Watching an athlete grow into a confident leader on the field is one of the most rewarding parts of our job.

Start their leadership journey with us:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 33,
    subject: 'Why the Off-Season Is Where Champions Are Built',
    takeaway: 'Off-season momentum: Why taking 3 months off costs players a whole year of skill development.',
    body: `Hey {{name}}!

When the club season ends, most players hang up their cleats for months.

When they return for next season's tryouts, their touch is rusty, their fitness is down, and they have to spend weeks rebuilding basic stamina.

Players who train consistently with Flowers Soccer Academy through the breaks enter tryouts sharp, fit, and in peak form. They don’t just make teams—they dominate the starting lineup.

Keep the momentum going year-round:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 34,
    subject: 'How Coach Evan Personalizes Every Training Plan',
    takeaway: 'Inside FSA: How Coach Evan tailors session goals to each athlete’s strengths and growth areas.',
    body: `Hey {{name}}!

No two soccer players are identical.

A 10-year-old winger needs different coaching than a 14-year-old central midfielder or an aspiring varsity goalkeeper. That’s why Coach Evan and our coaching staff sit down before every week of sessions to review player notes:
• What specific technique does this athlete need to master next?
• Are they ready to move from isolated drills into live small-sided pressure?
• How can we challenge them while keeping the session fun and engaging?

Your child isn’t just another body in a drill at Flowers Soccer Academy—they have a customized development plan.

See the personalized difference firsthand:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 35,
    subject: 'Fueling Young Athletes: Nutrition & Hydration Tips',
    takeaway: 'Youth sports wellness: Simple pre-training meal ideas and hydration habits to prevent mid-session fatigue.',
    body: `Hey {{name}}!

Ever noticed your player running on empty in the last 20 minutes of a session or game?

Often, the culprit isn’t stamina—it’s nutrition and hydration.

Quick tips from our coaching staff:
• Pre-training snack: Complex carbs with light protein 60 minutes before sessions (e.g., banana with peanut butter or whole grain toast).
• Hydration: Water throughout the day, not just 5 minutes before stepping onto the turf.
• Recovery: Protein and fluids within 30 minutes after training to rebuild muscles and prevent soreness.

We care about the whole athlete—mind, body, and character.

Join our academy community today:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 36,
    subject: 'Mastering 1v1 Battles: Offensive Feints and Defensive Stances',
    takeaway: '1v1 mastery: Drop-of-the-shoulder, body feints, and low jockeying stances that win duels.',
    body: `Hey {{name}}!

At its core, soccer is a series of 1v1 battles all over the pitch. The team that wins the majority of those individual duels wins the game.

In our academy sessions, we teach players both sides of the 1v1 duel:
• Attacking: Sharp changes of pace, drop of the shoulder, and executing moves at speed.
• Defending: Patience, low center of gravity, and timing the tackle instead of stabbing.

When a player knows they can beat any defender 1v1, their game transforms completely.

Let’s build that 1v1 swagger in your player:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 37,
    subject: 'How to Handle Game-Day Mistakes Like a Pro',
    takeaway: 'Mental resilience: The 3-second rule for shaking off turnovers and staying engaged in the play.',
    body: `Hey {{name}}!

Even the world’s best professional players give away passes and miss open shots.

The difference between elite athletes and struggling athletes is what happens in the 3 seconds immediately after the mistake.

At Flowers Soccer Academy, we teach the "Next Play" mentality:
• No hanging heads or looking at the bench.
• Immediate defensive transition to win the ball back.
• Trusting their preparation and stepping into the next opportunity without fear.

When players learn to handle mistakes with maturity, they become fearless on the field.

Help your child develop champion mental resilience:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 38,
    subject: 'Preparing for High School and Club Tryouts',
    takeaway: 'Tryout preparation: What coaches look for in fitness, coachability, and tactical awareness.',
    body: `Hey {{name}}!

Tryout season can be nerve-wracking for players and parents alike. Coaches evaluate dozens of athletes in just a couple of hours.

What makes an athlete stand out?
• Confident first touch that doesn't bounce away.
• Crisp passing with proper weight and pace.
• High coachability—listening with eye contact and hustling on every whistle.
• Positional versatility and relentless defensive effort.

At Flowers Soccer Academy, our training directly prepares players to shine in tryout environments so they make the team they’ve worked so hard for.

Prepare your player for tryout success:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 39,
    subject: 'The Value of Flexible Monday–Saturday Scheduling',
    takeaway: 'Parent convenience: Booking across Lilburn, Gainesville, and Loganville to fit your week.',
    body: `Hey {{name}}!

A quick reminder for our soccer families:

Flowers Soccer Academy sessions run Monday through Saturday across our Lilburn, Gainesville, and Loganville locations.

Whether you need afternoon sessions during the week or weekend morning training, we have time slots tailored to fit your schedule:
• 1 to 5 sessions per week packages.
• Dedicated coaches who adapt to your player’s pace.
• Easy pause and resume options whenever family schedules shift.

Consistency is simple when the training fits your lifestyle.

Reserve your preferred weekly slots:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 40,
    subject: 'Playing Under Pressure: How to Beat the High Press',
    takeaway: 'Tactical breakdown: Composure when opponents swarm and finding the third-man pass.',
    body: `Hey {{name}}!

Modern soccer is defined by the "High Press"—aggressive opponents rushing forward to cause turnovers in your defensive half.

If players panic, they boot the ball aimlessly downfield.

At Flowers Soccer Academy, we teach players how to solve the press with poise:
• Scanning passing angles before the ball reaches their feet.
• Shielding and using body weight to protect possession.
• Finding the open third-man runner to break through the opponent's lines.

Give your player the calm composure of a midfield maestro:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 41,
    subject: 'Juggling and Ball Mastery: Developing Soft Touch',
    takeaway: 'Technical milestone: How juggling improves reaction time, ankle cushion, and aerial control.',
    body: `Hey {{name}}!

Juggling isn’t just a trick—it’s the single best indicator of a player’s relationship with the ball.

When an athlete can juggle consistently, they develop:
• Soft, cushioned foot control on high bouncing balls.
• Precise ankle adjustments under split-second pressure.
• Unconscious muscle memory that frees up their eyes to look across the field.

In our academy sessions, we integrate juggling benchmarks into our progress tracking so players see continuous improvement.

Watch your player master the ball:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 42,
    subject: 'Building Soccer IQ: The Art of Scanning',
    takeaway: 'Head-check habit: Why Premier League players scan 4–6 times every 10 seconds and how we teach it.',
    body: `Hey {{name}}!

Research shows that top professional midfielders scan their surroundings 4 to 6 times every 10 seconds when not in possession of the ball.

Most young players only look at the ball.

At Flowers Soccer Academy, we embed the "head-check" habit into every passing drill. By checking over their shoulder before receiving, players know exactly where their teammates and defenders are before the ball arrives.

It’s the simplest habit that yields the biggest jump in game-day performance.

Train their vision and game awareness:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 43,
    subject: 'Preventing Burnout: Keeping the Passion Alive',
    takeaway: 'Player longevity: Balancing intense training with genuine joy and love for the beautiful game.',
    body: `Hey {{name}}!

Nothing breaks our hearts more than seeing a talented young soccer player get burnt out and quit the sport at 13 or 14 years old.

At Flowers Soccer Academy, we believe elite development and high energy fun go hand-in-hand:
• Encouraging coaches who celebrate effort and creative risks.
• Competitive mini-games that bring laughter and team bonding.
• Respecting the player’s individual pace so they leave every session excited for the next one.

We don’t just build soccer players—we nurture a lifelong love for the game.

Experience our positive coaching philosophy:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 44,
    subject: 'Goalkeeper Distribution: The First Line of Attack',
    takeaway: 'Modern goalkeeping: Punts, side-volleys, driven throws, and passing out from the back.',
    body: `Hey {{name}}!

In the modern game, the goalkeeper is the 11th outfield player.

A keeper who can distribute accurately with hands and feet creates scoring opportunities before the opponent can set up defensively.

In our Flowers Soccer Academy goalkeeper program, we drill:
• Driven side-volley distribution to target wingers.
• Baseball and sling throws that hit sprinting midfielders in stride.
• Calm back-pass receiving under high striker pressure.

Elevate your goalkeeper’s total game:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 45,
    subject: 'Striker Composure: Winning 1v1s Against the Goalkeeper',
    takeaway: 'Finishing clinical edge: Reading the keeper’s momentum, taking them wide, or chipping with finesse.',
    body: `Hey {{name}}!

Nothing gets the adrenaline pumping like a breakaway 1v1 with the opposing goalkeeper.

Too often, young strikers freeze up, close their eyes, and blast the ball directly into the keeper’s chest.

At Flowers Soccer Academy, we replicate breakaways hundreds of times against live academy goalkeepers:
• Reading the keeper’s balance and momentum.
• Rounding the keeper with a sharp lateral touch.
• Calmly slotting into the corners with deceptive eye contact.

Turn breakaways into guaranteed goals:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 46,
    subject: 'The Power of Consistency: 1 Year in Review',
    takeaway: 'Compound growth: How 12 months of consistent weekly training creates a completely different athlete.',
    body: `Hey {{name}}!

Skill development in soccer follows the law of compound interest.

One single session gives a player a tip.
One month of training builds a habit.
One year of consistent training transforms an athlete into an unstoppable force.

The players who train week-in and week-out at Flowers Soccer Academy don't just improve—they leapfrog peers who relied solely on team practices.

Give your player the gift of consistency:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 47,
    subject: 'Why Parents Love Our Direct Communication',
    takeaway: 'Family support: Coach Evan’s open-door policy for feedback, progress reviews, and schedule updates.',
    body: `Hey {{name}}!

At Flowers Soccer Academy, we treat our soccer parents as true partners in player development.

Whether you have a question about upcoming high school tryouts, want an update on your player’s progress tracking, or need to adjust your weekly schedule, Coach Evan and our staff are always just a phone call, text, or email away.

Clear communication, professional coaching, and genuine care for your child’s goals.

Join our academy family today:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 48,
    subject: 'Mastering Defensive Positioning: Jockeying & Channeling',
    takeaway: 'Defensive craft: Guiding attackers away from goal without committing costly fouls or getting beaten.',
    body: `Hey {{name}}!

Every great team is built on solid defensive fundamentals.

Yet so many young players dive into tackles, get nutmegged, or commit fouls in dangerous areas.

At Flowers Soccer Academy, we teach the art of defensive patience:
• Side-on stance that allows explosive recovery.
• Channeling attackers toward the sideline where help defenders wait.
• Winning the ball cleanly with body positioning rather than dangerous slide tackles.

Develop rock-solid defensive IQ in your player:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 49,
    subject: 'Seasonal Clinics & Masterclasses at Flowers Soccer Academy',
    takeaway: 'Intensive immersion: Holiday, summer, and specialized camps to accelerate player breakthroughs.',
    body: `Hey {{name}}!

Looking for an intensive boost during school holidays or summer break?

Flowers Soccer Academy hosts specialized seasonal clinics and masterclasses across Lilburn, Gainesville, and Loganville:
• Striker & Finishing Bootcamps.
• Goalkeeper Glove Masterclasses.
• High-Intensity Speed, Agility & Quickness (SAQ) workshops.

Our clinic attendees get high-repetition coaching in an electric, fun environment with top local talent.

Learn about our upcoming clinics and academy packages:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 50,
    subject: 'Athletic Character: Building Lessons That Last Beyond Soccer',
    takeaway: 'Character building: Discipline, respect, work ethic, and resilience that carry into school and life.',
    body: `Hey {{name}}!

Trophies collect dust, and seasons come and go.

What truly matters is who your child becomes through the process of dedicating themselves to a craft.

At Flowers Soccer Academy, we coach character on every whistle:
• Showing up on time with gear ready.
• Looking coaches in the eye when receiving instruction.
• Shaking hands, supporting teammates, and respecting the referee.
• Working relentlessly even when drills get tough.

The habits they build on our turf will serve them in the classroom, college, and their future careers.

Invest in your child’s total growth:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 51,
    subject: 'Looking Back at How Far Your Player Has Come',
    takeaway: 'Reflecting on growth: Remembering the intro session and celebrating the drive to improve.',
    body: `Hey {{name}}!

Think back to the day of your player’s introductory session.

The excitement, the nervousness, the first time they stepped onto our pitch to train with Coach Evan and our staff.

That spark you saw in your child’s eyes that day is still there—waiting to be cultivated into true mastery.

We’re here whenever your family is ready to take the next step:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 52,
    subject: 'Your Spot on the Pitch Is Waiting',
    takeaway: 'Priority invitation: Re-engaging with Coach Evan and locking in weekly academy development.',
    body: `Hey {{name}}!

Coach Evan here with a quick personal note:

Our coaching staff frequently reviews our evaluation notes, and your player’s name came up in our coaches' meeting this week. We all saw the raw talent and hunger your child showed during their intro session.

We have an open slot in our weekly development roster that would be a fantastic fit for your player’s skill level and age group.

Let’s get them back out on the field where they belong:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 53,
    subject: 'Flexible Training Packages: Pick Your Schedule for Next Month',
    takeaway: 'Monthly packages: 1x to 5x weekly sessions, auto-pay convenience, zero hassle.',
    body: `Hey {{name}}!

As you plan out your family’s schedule for the coming month, remember that Flowers Soccer Academy is built around flexibility:
• 1 to 5 training sessions per week.
• Locations in Lilburn, Gainesville, and Loganville.
• Sessions available Monday through Saturday.
• Easy auto-pay with no cancellation penalties.

Give your player the structured training they need to shine on match day.

Enroll in your preferred package today:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 54,
    subject: 'The Flowers Soccer Academy Promise: We’re Invested in Your Child',
    takeaway: 'Our commitment: Dedicated coaching, progress tracking, and genuine passion for every player’s journey.',
    body: `Hey {{name}}!

When you join Flowers Soccer Academy, you aren’t just signing up for soccer drills.

You are partnering with coaches who genuinely care about your child’s goals:
• We celebrate their school team selections.
• We review their game clips when you send them over.
• We push them when they need encouragement, and praise them when they achieve breakthroughs.

Our mission is to help your player unlock their full potential—both as an athlete and as a confident young person.

We’d love to have your family as part of our academy:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 55,
    subject: 'One Year Later: The Game Never Stops',
    takeaway: 'Annual milestone: Celebrating a passion for soccer and an open invitation to return to FSA.',
    body: `Hey {{name}}!

Can you believe it’s been nearly a year since your player attended their introductory session with us?

Time flies, but the desire to improve never fades. Whether your player is currently playing club, school, or recreational soccer, the door at Flowers Soccer Academy is always open.

Whenever you want to fine-tune their mechanics, prepare for tryouts, or boost their confidence, Coach Evan and our staff are here for you.

Check our current session offerings:
https://www.gwinnettsoccertraining.com/

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
  {
    step: 56,
    subject: 'Welcome Back to the Pitch: Let’s Reach New Heights Together',
    takeaway: 'Final 1-year sequence email: Warm welcome to step back onto the pitch and achieve their soccer goals.',
    body: `Hey {{name}}!

No matter where your player’s soccer journey takes them, our mission remains the same: to help players of all skill levels unlock their full potential.

From customized training plans and video analysis to flexible Monday through Saturday scheduling across Lilburn, Gainesville, and Loganville—we are ready whenever you are.

Reply to this email or visit our website to get your player back on the pitch:
https://www.gwinnettsoccertraining.com/

Here’s to their bright soccer future!

Best regards,
Coach Evan & The Flowers Soccer Academy Team`,
  },
];
