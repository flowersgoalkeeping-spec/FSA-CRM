import { CampaignStepDefinition } from './reachedOutCampaign';

/**
 * 56-Step 1-Year Automated Nurture Sequence for Stage 4: Converted Clients (Active Clients).
 * 
 * STEP 1: The Flowers Soccer Academy Player Profile! (Highlighting session-by-session grading,
 * 100-point skill ratings, coach continuity, and video homework).
 * 
 * STEPS 2 to 9: The exact "Soccer Insights" emails provided by Coach Flowers for Field Players.
 * STEPS 10 to 56: Comprehensive extension of "Soccer Insights" covering tactical intelligence,
 * first touch, decision-making, speed of play, and psychology.
 * 
 * All emails are personalized with {{name}} and Coach Flowers' signature, and actively encourage
 * clients to invite teammates and friends to join training!
 */
export const ACTIVE_CLIENTS_FIELD_PLAYER_EMAILS: CampaignStepDefinition[] = [
  {
    step: 1,
    subject: 'Welcome to the Team! Meet Your Flowers Soccer Academy Player Profile',
    takeaway: 'Introducing the exclusive Player Profile with session-by-session grading, 100-point skill scores, and homework.',
    body: `Hi {{name}},

Clubs often offer season reviews and camps will offer evaluations after a few days... I've known we should do something like that for awhile. The problem was, I never found a way to do it that I liked or, more importantly, that I thought was authentic. Thats why I created the Flowers Soccer Academy Player Profile!

In the player profiles you'll have access to:

• Player goals (we have goals for every player we work with... plus any you would like to add)
• Updated feedback after EVERY SINGLE SESSION! We grade every session on a 1-5 scale and give feedback. No more evaluations every 3-6 months. You get updates after each training session provided by the coach that led the session. This will also help streamline training with different coaches! If we have a different coach jump in to help out with your training session, they shouldnt miss a beat!
• We give each player a rating out of 100 for certain skills (Dribbling, shooting, passing etc). This is used to motivate the player, but also gives them a video game-like feel to their training and progression. The grading is very difficult however... collegiate players wouldnt even be close to a 100 grade, so no need to worry if the number seems low. Thats normal!
• Lastly, we also have a space to add in homework for each player. We can attach notes or instructional videos which will all be kept in your players profile!

We couldn't be more excited to have {{name}} in our active academy roster!

P.S. Training is always more competitive and fun with friends! If {{name}} has a teammate from club or school who wants to elevate their game and get their own Player Profile, feel free to connect us. We'd love to set them up with a session!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 2,
    subject: 'Soccer Insights #1: Receive, Pass, Move (RPM)',
    takeaway: 'Introducing RPM: The simple yet transformative foundation of movement and vision.',
    body: `Hey {{name}}!

As your child's dedicated soccer coach, I'm all-in for their success and growth. I believe consistent messaging is key, from both you and me. It's about inspiring them towards their goals and ensuring we're both on the same page. Hence, I'm launching "soccer insights", a tool to help us align our coaching.

The inaugural insight is "Receive, Pass, Move" or RPM. This impactful acronym caught my attention while coaching high school soccer in 2018. I found it delightfully simple yet incredibly powerful. It's funny to see kids so thrilled after a good pass, but then they linger a bit too long admiring their work!

Sure, moving in the wrong direction can be a mistake, but it's a stepping stone for better understanding and an opportunity for growth. This solid foundation opens the door for discussions on better movement strategies.

I'm excited about this series and I hope it supports your child's soccer journey. Let's kick-off this exciting venture together!

P.S. Group dynamics make RPM so much easier to practice. If {{name}} has a club teammate who wants to work on their movement off the ball, invite them to come train with us this week!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 3,
    subject: `Soccer Insights #2: Don't Lean Back? The Truth About Striking the Ball`,
    takeaway: 'Why leaning back is often misunderstood and the importance of striking the center of the ball.',
    body: `Hi {{name}},

Have you ever heard a soccer coach tell a player not to lean back when they kick the ball? Well, its not entirely accurate. If your player has trouble keeping the ball on the ground, this one is for you!

When a player shoots over the goal, or if a player plays a pass to a teammate at their knees instead of feet, the issue isn’t necessarily that they leaned back! The issue is that they struck the bottom half of the ball. I know… mind blowing! But, it paints the correct picture of what’s going on.

Now, the reason coaches say don’t lean back is because most of the time the shot goes over the goal, its because the player did in fact lean back and they didn’t have their weight over it. But id be happy to show you how easy it is to lean back and still keep it on the ground. As a matter of fact, just last week I was talking to a player about his finishing. He wasn’t hitting it incredibly powerful and it also was rolling slowly on the ground. His issue? He was leaning too much. He was leaning so much he was hitting the ball as his foot was swinging back up and instead of hitting too far underneath the ball, he was hitting pretty high up on the ball. This created a lot of top spin that kept the ball tamely on the ground.

While this is incredibly basic, I hope it helps paint a picture. As soccer players, we almost always want to hit the center of the ball. Ideally, we keep our weight over the ball to accomplish that but sometimes the situation just doesn’t permit that from happening.

I hope this helps! See you on the field!

P.S. Know another family whose player is struggling with skying their shots? Forward this email to them or bring them along to an upcoming session!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 4,
    subject: 'Soccer Insights #3: Winning vs. Developing',
    takeaway: 'Evaluating the true objectives of youth soccer and prioritizing long-term development over short-term club wins.',
    body: `Hi {{name}},

What’s more important between winning and developing?

In 2018, it was considered a disaster when the U.S. mens national team didn’t make the world cup. Everyone had an opinion on what was wrong with soccer in this country! While I am not smart enough to know, one question arose that really intrigued me. There was a lot of talk about this country putting too much emphasis on winning, and not enough emphasis on developing players.

This whole message would have made 16 year old me upset, but the truth of the matter is that (most) club coaches are focused on winning. Often times, it can be as simple as having the faster player on the field… kick the ball into space and let so and so run onto it and get a breakaway. Sure, you win… but do you develop?

If you are receiving this email, its because you have shown an understanding in this concept even if you have never put it into words. I have the luxury of not having to worry about winning, I can solely focus on development. Obviously, you should compete to win, but I would encourage you to evaluate what you and your players objectives are. Is it to have fun? To win? To play in college? To make friends?

It's probably a mix of all those things, but it's worth thinking about how your team's goals match up with your own. Let's work together to find the right balance between winning and helping players improve. Mistakes might decrease the likelihood of winning, but they create an opportunity to get better. Every game should be a chance for players to get better, not just about getting the win.

P.S. Many parents we talk to share this exact frustration with their club teams. If you have friends navigating this balance, invite them to check out Flowers Soccer Academy!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 5,
    subject: 'Soccer Insights #4: The Freedom to Make Mistakes',
    takeaway: 'Why practice must be a zero-consequence environment to build automatic confidence for games.',
    body: `Hi {{name}},

If you have ever been within ear shot of one of my training sessions, you have probably heard me say something along the lines of, “be more aggressive” or “faster, faster” etc. One of my biggest coaching points is trying to make players play quicker. Inevitably, this will lead to more mistakes... but at my training sessions there is no risk! There are no consequences for making a mistake!

Its worth recognizing when are good times to make mistakes and when are not so good times. This often gets played out when players are shooting at my practices. It is easy to score into an open net, but if we don’t have a goalkeeper and the shot goes down the middle, how are we improving? I constantly tell players, “I would rather you miss wide of the goal than shoot it down the middle”. My objective is to get players so good at hitting the corner of the goal that it won’t matter if there is a goalkeeper or not.

So, when are the correct times to make mistakes or not? As I have said, there are no consequences for mistakes at my training sessions. I would say that you should not be scared to make mistakes at your club practice either, BUT, it is possible that if you are not training well that it will affect your playing time. So there is a bit of a risk to that in team training. That will likely be dependent on how your club coach wants you to play and the position you play. The further up the field you play, the more risky you can be.

Additionally, games are the times where making a mistake could be the most costly. While I tell my players to aim at the corners in my sessions, I also tell them its imperative that you hit the target in the game. The message: A game isn’t the time to go all-in so to speak. Practice is when we risk it all, so that when it does come time to play a game, what was once so risky is now automatic!

One last example of this: I have worked with multiple ECNL goalkeepers who have a lot of strengths, but like all players, have some weaknesses. Both have aspirations of playing collegiately. The truth of the matter is colleges don’t care about high school soccer, so I tell them this is a perfect opportunity to work on weaknesses with minimal risk. I encourage them to use their weak foot any chance they get. I encourage them to have riskier starting positions for crosses and free kicks. I know for a fact that this mindset has led to giving up unnecessary goals, BUT i’m challenging the goalkeepers, encouraging them along the way, and [hopefully] making them better in the long run.

P.S. Does your player have a teammate who plays with too much hesitation or fear of mistakes? Bring them to our next session to help unlock their freedom on the ball!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 6,
    subject: 'Soccer Insights #5: 1 vs 1s — Space/Pace vs. Skill',
    takeaway: 'Why relying purely on speed fails against top defenders and how developing skill creates lasting advantage.',
    body: `Hi {{name}},

Over the past two to three weeks, I have really been focusing on 1 vs 1s. One thing I have been learning is that most players rely on speed instead of skill. Don’t worry, I was the same way, and still am if I ever play in the field during a game.

Regardless of the age, skill level or speed of a player, I am now realizing this is what so many players do! I can only speak from personal experience, but the reason I was this way was because I was never super comfortable on the ball… especially in a dribbling situation (being a goalkeeper, you can understand why). I have to imagine that is why most players prefer to use speed over skill. I call this the space/pace vs skill method.

There are two ways to beat a defender by dribbling:
1. Use your pace to run into the space behind them
2. Use skill to get around them

Here is why I prefer the skill method over the space/pace method. Skill can always get you out of a tight spot, but pace is dependent on the environment. If there is no space, this method won’t work. If the other player is faster, this method won’t work. If the other player is properly positioned, you’ll have to take the long way around them and what speed advantage you may have will be lost due to having to go around them.

For all of the above reasons, I think skill is a much better way to get around someone. Skill, however, needs to be trained where speed is more natural (even though it definitely can be trained).

Through these past few weeks I have learned that not all ways of beating a defender are the same. As a coach who prioritizes development, I am not doing the player any good if they are just using speed. I don’t want to discourage it, but simply develop the skill to accommodate it!

Lastly, regardless of if a player is using pace or skill, players should always be attempting to get the defender off balance. Ultimately, that is the desired goal in a 1 on 1 dribbling situation. Even if space/pace is the preferred method, getting the defender off balance before kicking it into space is a must!

Hope this helps!

P.S. We love running 1v1 battle drills in training. If {{name}} wants to bring their toughest club teammate to test their 1v1 skills, we’d love to have them join us!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 7,
    subject: 'Soccer Insights #6: Philosophies from World-Class Academies',
    takeaway: 'Lessons from Manchester United youth coaches and top trainers on creativity, failing forward, and commitment.',
    body: `Hi {{name}},

Good afternoon! Recently, I have seen many top level coaches speak of their training philosophies and I thought that these just hit home with what we want to accomplish with Flowers Soccer Academy.

1. Back in 2019, I attended a coaching conference in Chicago. There were many great coaches from around the world, but my personal favorite was a youth coach from Manchester United. This coach has been with their academy for close to two decades and has worked with dozens of English Premier League stars. He mainly works with the younger players up until around the age of 10. His coaching philosophy? “Go out and entertain me”. That has stuck with me ever since. Kids should have fun when they are playing. Soccer is a game where you can have a move named after you… it promotes creativity! This quote nailed it for me.

2. Jason Wilcox. Jason Wilcox is Manchester Uniteds technical director… but prior to this role, he worked with Manchester City’s youth. Once again, this is a player who has worked with dozens of world class players. He made Man City’s youth department one of the best in the world. I recently read an article on him that described it like this, “Wilcox created a culture where it was acceptable to fail but only if lessons were learned from and errors fixed at pace”. When I read that, I really resonated with it. This is one of the best guys at his profession, and he created a culture where failing was “acceptable”. A lot of times, I don’t feel that is true of youth clubs unfortunately.

3. Lastly, this one comes from another personal trainer in California. He made a post about an English player he use to train after she retired from international soccer. He says, “You jumped into every [session], whether it was with a 10 year old, high schooler, whatever, you didn’t care because you were getting your touches and quality training in”. This just spoke to me about the commitment this player showed. She was someone good enough to represent her country and she didnt care who she was training with or what they were training… just that they were training! Inspiring!

P.S. If you know any passionate soccer families who appreciate this kind of positive, creative development environment, please pass our name along!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 8,
    subject: 'Soccer Insights #7: What Does a Good First Touch Look Like?',
    takeaway: 'Killing the ball into a triple-threat position vs taking a progressive touch into space.',
    body: `Hi {{name}},

Good morning! Today I just wanted to speak on what a good first touch looks like.

The answer? It depends! I want to break down two options very quickly for you!

1. Sometimes a good first touch means you stop the ball right by your feet. Often times you’ll hear me refer to this as “killing” the ball. You are simply taking all the pace off the ball and its right by you ready to play. Think of this as the same thing as the “triple threat” position in basketball. You can pass, shoot or dribble quickly. Additionally, if you take a touch right besides you it invites pressure. Sometimes this is good and sometimes its bad depending on if you’re ready for it… but inviting the opponent to pressure you often times opens up space for your teammates!

2. The second option is taking a first touch into space. If you have pressure coming from one side, this can be a great, proactive, way to relieve pressure. Additionally, if you are looking to speed play up, this progressive touch naturally gets the play going.

Ultimately, which touch is better is dependent on the situation. At FSA, we are constantly working on each to ensure that you set yourself up for the best chance of success.

P.S. Seeing your teammates read your first touch makes team play so much smoother. Invite {{name}}'s favorite passing partner to train with us!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 9,
    subject: 'Soccer Insights #8: The Bellingham & Mbappé Inside-Foot Fake',
    takeaway: 'How modern superstars freeze defenders using a simple cushioned inside-foot ball stop.',
    body: `Hi {{name}},

One thing I have noticed, specifically with Jude Bellingham and Kylian Mbappe, is there ability to maintain control of the ball while fake “shooting”.

While both have the ability to run at defenders with speed and use fancier moves, both often resort to simply using the inside of their foot. What I love about this is it is something every player can do! We learn this skill as a 4 year old, they just put a slight twist on it.

As they are in possession, they often fake like they are going to shoot or hit a long pass, but instead they simply put the inside part of their foot on the far side of the ball and stop it. They are so convincing with it that it often gets the defender to raise their leg to block what they think will be a shot or pass.

The thing they do a little bit differently then what we are taught as young kids however, is they don’t push the ball away from them… they keep it cushioned right on the inside of their foot! For me, I cant help but relate this to a “triple threat” position in basketball. From here, they have the defender off balance and they can go in whichever direction they like!

We will be working on this exact movement in our upcoming sessions. Ask {{name}} to show you after practice!

P.S. Want to see this work in real game action? Have {{name}} try it with a teammate in your backyard, or invite them to come try it out with us on the field!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 10,
    subject: 'Soccer Insights #9: The Power of Scanning (Looking Before the Ball Arrives)',
    takeaway: 'Why top midfielders scan every 2-3 seconds and how knowing your next move before receiving doubles play speed.',
    body: `Hi {{name}},

Did you know that elite European midfielders like Kevin De Bruyne and Luka Modric look over their shoulder an average of 4 to 6 times in the 10 seconds before they receive the ball?

In soccer, speed of thought always beats speed of legs. When players don't scan, they have to trap the ball, look up, analyze the pressure, and then decide what to do. That takes 2 full seconds—plenty of time for a defender to close them down.

When {{name}} scans before receiving, their brain has already taken a snapshot:
• Where is the nearest defender?
• Which teammate has open space?
• Can I turn forward, or must I bounce it back with one touch?

At Flowers Soccer Academy, we constantly remind players to check their shoulders before every pass arrives. It's a habit that transforms good players into exceptional playmakers.

P.S. Group training with active defenders is the only way to genuinely test scanning. If you have teammates looking to improve their game vision, invite them to join us!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 11,
    subject: 'Soccer Insights #10: Body Shape on the Half-Turn',
    takeaway: 'How opening your hips to see both the passer and the goal unlocks 180 degrees of the pitch.',
    body: `Hi {{name}},

One of the most common habits I see with young players is receiving the ball with their back completely square to the opponent's goal.

When you face the passer directly, you can only see 50% of the field. You can't see the forward making a run behind the defense, and you can't see the defender sneaking up on your blind side!

By simply opening your hips into what coaches call the "half-turn", you can see the ball coming AND the entire attacking half of the pitch. A simple back-foot touch now carries you forward immediately.

Watch your player during their next game. Are they opening their hips before the pass arrives? We will be drilling this exact detail this week!

P.S. If you have a friend on your team who plays midfield or winger, they would benefit tremendously from this concept. Have them come along to our next session!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 12,
    subject: 'Soccer Insights #11: Disguising Passes with Your Eyes and Hips',
    takeaway: 'How great passers manipulate defenders by looking one way and passing another.',
    body: `Hi {{name}},

Defenders at higher levels read your eyes and hips before you even swing your foot. If you look directly at your teammate for two full seconds before passing, any smart defender will step in front and intercept it.

The secret to deceptive passing:
1. Shape your body as if you're passing wide to the wing
2. Keep your eyes focused on that wide player to draw the defender's momentum
3. At the last microsecond, adjust your ankle angle and slide a pass right through the center channel

It sounds fancy, but once players understand how defender momentum works, it becomes second nature.

We love teaching this in small-sided rondos. Have {{name}} practice disguising their passes with a friend this weekend!

P.S. Have a teammate who loves combination play? Bring them to our Lilburn, Gainesville, or Loganville sessions to sharpen their passing game.

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 13,
    subject: 'Soccer Insights #12: The Magic of the "Third Man Run"',
    takeaway: 'Why the third man run is virtually impossible for defenses to track and stop.',
    body: `Hi {{name}},

Pep Guardiola once famously said: "The third man is impossible to defend." But what does that actually mean?

Imagine Player A has the ball. The defender is focused on Player A and marking Player B.
Player A plays a crisp pass to Player B.
As that pass is traveling, Player C (the third man) sprints into the open space behind the defense.
Player B plays a one-touch pass directly into the running path of Player C.

Because Player C was never the immediate target, the defender's eyes were elsewhere! By the time they turn around, Player C is already in on goal.

We run this combination every single week in our advanced academy groups. It teaches players to think two steps ahead.

P.S. If your player and their best club teammate want to master combinations like this together, invite them to jump into training with us!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 14,
    subject: 'Soccer Insights #13: Timing the Blind-Side Run Behind the Defense',
    takeaway: 'How starting your run on the defender’s blind shoulder prevents offsides and guarantees breakaways.',
    body: `Hi {{name}},

Fast players often get caught offside because they start sprinting too early.

When making a run behind the defensive backline, where you start your run is just as important as how fast you run. If you stand right in front of the center back, they can see you and the ball in the same glance.

Instead, drift 2 yards onto their blind shoulder (just behind their back). Now the defender has a dilemma: if they look at you, they lose the ball. If they look at the ball, they lose you!

The moment the passer draws their leg back to strike, you explode across their blind side. They can't react in time.

Remind {{name}} to look for that blind spot in their next match!

P.S. Our training groups are growing, but we always have room for dedicated athletes who want to sharpen their tactical edge. Feel free to invite a friend!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 15,
    subject: 'Soccer Insights #14: Shooting off the Dribble — Quick Release vs Big Wind-Up',
    takeaway: 'Why a short backlift scores more goals than a massive, slow kicking motion.',
    body: `Hi {{name}},

When young strikers get into the 18-yard box, they often take a huge, exaggerated wind-up to hit the ball as hard as humanly possible.

The problem? In competitive games, you rarely get 2 seconds of open space in the box. A defender will block that big swing every single time, or the goalkeeper will set their feet.

Look at the best finishers in the world—Erling Haaland, Harry Kane, Lionel Messi. Their backlift is tiny! It’s like a golf putt with explosive ankle snap.

Quick release catches goalkeepers before they can set their feet. A ball in the bottom corner with a fast snap beats a 70mph rocket right at the keeper's chest.

We've been focusing on quick-release finishing off the dribble in {{name}}'s sessions.

P.S. If you have teammates who want to add goals to their game this season, let them know we have finishing spots open!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 16,
    subject: 'Soccer Insights #15: 1v1 Defending — Jockeying and Forcing Onto the Weak Foot',
    takeaway: 'How patient defensive posture prevents getting beaten off the dribble.',
    body: `Hi {{name}},

Every player wants to talk about attacking, but great attacking teams are built on players who can hold their own 1v1 defensively.

The number one mistake young defenders make: stabbing at the ball while charging in with square feet. A simple touch from the attacker and the defender is left in the dust.

Instead:
1. Slow down 2 yards before reaching the attacker (break your steps into small chops)
2. Turn your hips at a 45-degree angle (the surfboard stance)
3. Direct them toward their non-dominant foot or toward the sideline where help is waiting
4. Be patient! The attacker has to make a move. When they take a heavy touch, that's when you step in.

Defense isn't about winning the ball immediately; it's about making the attacker uncomfortable until they make a mistake.

P.S. The best defenders love practicing against tough attackers. Bring a club teammate to training to test each other!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 17,
    subject: 'Soccer Insights #16: Shielding the Ball with Low Center of Gravity',
    takeaway: 'Using your hips and arm bar to protect possession from aggressive defenders.',
    body: `Hi {{name}},

Small players often ask me: "Coach Flowers, how do I keep the ball against defenders who are bigger and stronger than me?"

The answer: Soccer is a game of leverage, not pure bench press strength!

When a big defender tries to push you off the ball, you don't stand upright. You sink your hips, widen your base, and get your body between the defender and the ball. Use your forearm (arm bar at hip level) as a feeler gauge to know exactly where their weight is leaning.

If they push hard to your left, you spin cleanly to your right. Their own aggression works against them!

{{name}} has been doing fantastic work with body positioning in our academy drills.

P.S. If you know any players looking to become stronger on the ball, invite them to join our small group sessions!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 18,
    subject: 'Soccer Insights #17: The Psychology of the Next 5 Seconds After a Turnover',
    takeaway: 'Why immediate counter-pressing wins matches and shows true competitive character.',
    body: `Hi {{name}},

Watch what happens when an average player loses the ball:
They throw their hands in the air, look at the referee, or jog backward with slumped shoulders.

Now watch what happens when an elite player loses the ball:
Within 0.5 seconds, they sprint directly toward the opponent who just won it, cutting off their passing lane.

This is called the 5-second rule. When an opponent first wins the ball, they are off balance and their teammates are still in defensive positions. That is the easiest time to win the ball back!

Even if you don't win the tackle, your immediate pressure forces a rushed clearance. That level of work ethic is contagious and coaches love it.

Encourage {{name}} to show that 5-second fight in their games this weekend!

P.S. We love training athletes with high work rates. If your player has hardworking teammates, send them our way!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 19,
    subject: 'Soccer Insights #18: The Art of the Driven Pass Across the Turf',
    takeaway: 'How to strike through the ball without letting it bounce to keep play fast.',
    body: `Hi {{name}},

A slow, bouncy pass is a defender's dream. It gives them time to intercept, and it forces your teammate to take an awkward first touch.

A firm, driven pass that hugs the grass like a hockey puck allows your team to play at double the tempo.

Keys to hitting a clean driven pass:
• Lock your ankle completely (toes slightly pointed up, heel down)
• Strike through the exact horizontal midline of the ball with the hard bone on the inside of your foot
• Follow through low toward your target, not high into the air

When passing becomes crisp, the entire game opens up.

Ask {{name}} about our passing accuracy challenges in our recent sessions!

P.S. If your club team could use sharper passing combinations, invite a couple of teammates to train with {{name}} this month!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 20,
    subject: 'Soccer Insights #19: Playing Out of Tight Spaces — The Futsal Touch',
    takeaway: 'Using the sole of the foot and quick rolls to escape sideline traps.',
    body: `Hi {{name}},

In tight spaces near the touchline, using just the inside and outside of the foot can sometimes be too slow.

That's where the futsal sole-of-the-foot roll comes in. By placing the studs on top of the ball and rolling it across your body, you can change direction in a fraction of a second without turning your hips.

It protects the ball from reaching defenders and opens up passing lanes that weren't there a second ago.

We've been integrating these quick sole touches into our warmups. Tell {{name}} to keep experimenting with them!

P.S. Know a player who gets trapped on the sidelines in games? Bring them to our next session to help expand their toolkit!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 21,
    subject: 'Soccer Insights #20: Communication on the Pitch — Specific Calls vs Noise',
    takeaway: 'Why yelling "ball!" helps no one and how specific positional words elevate team coordination.',
    body: `Hi {{name}},

Almost every coach yells at players to "communicate more!" But rarely do they explain what that actually means.

Yelling "ball!" or "here!" doesn't give your teammate any useful information. In fact, it often adds confusion.

Great soccer communication is specific, short, and predictive:
• "Man on!" (Tells them pressure is coming from behind)
• "Turn!" (Tells them they have open space and can drive forward)
• "Time!" (Tells them nobody is within 5 yards; relax on the ball)
• "One-two!" (Prepares them for a return wall pass)

When a player talks like this, they aren't just playing—they are directing the match.

P.S. If {{name}} and their midfield partner want to build telepathic communication on the field, bring them both to training!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 22,
    subject: 'Soccer Insights #21: Developing Your Non-Dominant Foot at Home',
    takeaway: 'A 10-minute daily wall routine that transforms weak-foot hesitation into a game weapon.',
    body: `Hi {{name}},

In competitive youth soccer, defenders will figure out within 5 minutes if a player only has one foot. They will simply shade that side, and suddenly half of the player's options disappear!

The good news? You don't need a coach or a full team to master your non-dominant foot.

All {{name}} needs is a brick wall or garage door and a ball:
• 50 one-touch passes using ONLY the weak foot
• 50 two-touch passes (receive across the body, pass back)
• 50 volleys out of the air

10 minutes a day for 3 weeks creates thousands of new neural reps. When game day comes, they won't even think about which foot to use.

Check {{name}}'s Player Profile for more custom homework drills!

P.S. Does {{name}} have a training buddy who wants to join our weekly academy challenges? Feel free to invite them along!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 23,
    subject: 'Soccer Insights #22: The "Weight" of a Pass',
    takeaway: 'Understanding that passing is a conversation: when to zip it and when to cushion it into stride.',
    body: `Hi {{name}},

Have you ever seen a player make an accurate pass, but their teammate still couldn't control it? That usually comes down to the weight of the pass.

A great pass doesn't just reach a teammate—it tells them what to do next!
• A firm, driven pass into their back foot says: "Turn and face forward!"
• A soft, cushioned pass directly to their feet says: "You have a defender on your back, play it back one-touch!"
• A weighted pass 3 yards into space says: "Sprint onto this and cross it first time!"

Passing is a language. When {{name}} learns to vary the weight of their passes, their teammates will love playing with them.

P.S. Want to see your player's club team connect better passes? Bring a few teammates to training to learn our passing curriculum together!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 24,
    subject: 'Soccer Insights #23: Crossing Technique — Driven Cutbacks vs Floating Back Post',
    takeaway: 'Why modern analytics show low driven cutbacks score 4x more goals than high floating crosses.',
    body: `Hi {{name}},

For decades, wide players were taught to run down the wing and kick a high, floating cross toward the center of the box.

Modern soccer analytics have revealed something fascinating: high floating crosses are defended easily by center backs and goalkeepers over 80% of the time!

The most dangerous cross in soccer today is the low, driven cutback:
1. Drive hard toward the endline inside the 18-yard box to force the defense to drop toward their own goal
2. Pull the ball back diagonally toward the penalty spot (12 yards out)
3. Arriving midfielders have wide open shots with their momentum facing forward!

We are drilling this pattern relentlessly with our wingers and midfielders.

P.S. If {{name}}'s club team struggles to score from wide positions, invite their wingers or strikers to train with us!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 25,
    subject: 'Soccer Insights #24: The Pre-Match Mental Routine',
    takeaway: 'How a 5-minute quiet visualization routine eliminates pre-game jitters.',
    body: `Hi {{name}},

Nerves before a big match are completely normal. In fact, having butterflies just means you care about the game!

The difference between players who freeze up and players who thrive under pressure is how they channel those nerves.

Before every match, encourage {{name}} to take 5 quiet minutes in the car or on the bench:
• Close their eyes and visualize 3 specific positive moments (making a clean tackle, executing a crisp pass, slotting a shot into the corner)
• Take 3 slow, deep belly breaths to lower their heart rate
• Remind themselves: "I've put in the training reps. Today is just about having fun and competing."

Confidence comes from preparation. {{name}} is putting in the work every week!

P.S. Soccer is always more fun when you share the journey with great friends. Invite a teammate to come experience our training environment!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  // Extension steps 26-56 continuing the high-level Soccer Insights curriculum
  ...Array.from({ length: 31 }, (_, idx) => {
    const week = idx + 26;
    const topics: Array<{ subject: string; takeaway: string; focus: string; detail: string }> = [
      {
        subject: 'Soccer Insights #25: Decoy Runs — How Moving Without the Ball Creates Goals',
        takeaway: 'Understanding that runs that don’t receive the ball are often the ones that unlock the defense.',
        focus: 'Making hard sprints into space to pull center backs out of position.',
        detail: 'Even if you don’t get the pass, your movement created the gap for your teammate to score.',
      },
      {
        subject: 'Soccer Insights #26: Dealing with Over-Aggressive Defenders',
        takeaway: 'Using quick one-touch passing and body feints to punish defenders who lunge.',
        focus: 'Letting the ball do the work against physical opponents.',
        detail: 'When a defender plays too rough, the worst thing you can do is hold the ball. Quick give-and-goes leave them chasing shadows.',
      },
      {
        subject: 'Soccer Insights #27: The Secrets of Near-Post Runs',
        takeaway: 'Why beating the center back to the near post creates the easiest tap-in goals.',
        focus: 'Darting across the face of the defender on wide deliveries.',
        detail: 'A slight change of pace right as the winger looks up gives you a 1-yard head start.',
      },
      {
        subject: 'Soccer Insights #28: Rest & Recovery — The Forgotten Half of Development',
        takeaway: 'Why muscle growth, agility, and cognitive focus require quality sleep and proper fueling.',
        focus: 'Hydration, 8+ hours of sleep, and post-session protein.',
        detail: 'Elite athletes aren’t built during training alone; they are built during how they recover between sessions.',
      },
      {
        subject: 'Soccer Insights #29: Striking with the Laces — Finding Maximum Power',
        takeaway: 'Locking the ankle completely down to create a clean, knuckleball-style strike.',
        focus: 'Kicking through the ball with the hard laces bone of your cleat.',
        detail: 'Keep your chest slightly tilted forward and let your kicking leg follow through straight toward the target.',
      },
      {
        subject: 'Soccer Insights #30: Tactical Flexibility — Adapting When the Game Plan Fails',
        takeaway: 'How high-IQ players adjust their positioning mid-game based on the opponent’s strengths.',
        focus: 'Identifying opponent tendencies in the first 10 minutes of every match.',
        detail: 'If their fullbacks push high, exploit the channels behind them immediately.',
      },
      {
        subject: 'Soccer Insights #31: Playing Through the Midfield Channel',
        takeaway: 'How central players manage 360-degree pressure with rapid two-touch rhythm.',
        focus: 'Receiving on the back foot and sliding forward passes into open gaps.',
        detail: 'The midfield is the engine room of the pitch. Every second saved on a touch is a second earned for an attack.',
      },
      {
        subject: 'Soccer Insights #32: Penalty Kick Composure — The Mindset of the Taker',
        takeaway: 'Picking your corner before the whistle and striking with pure conviction.',
        focus: 'Ignoring goalkeeper distraction tactics and sticking to your practiced routine.',
        detail: 'Step up with deep breaths, focus on striking the ball cleanly, and never change your mind mid-run-up.',
      },
      {
        subject: 'Soccer Insights #33: Defending Against the Counter-Attack',
        takeaway: 'Slowing down the ball carrier to allow your defensive unit to recover behind you.',
        focus: 'Delaying the attack rather than diving in for an all-or-nothing tackle.',
        detail: 'Buying 3 seconds of delay allows your teammates to sprint back into defensive shape.',
      },
      {
        subject: 'Soccer Insights #34: Video Self-Analysis — Finding Your Edge on Tape',
        takeaway: 'Why reviewing match footage objectively is the fastest accelerator of game intelligence.',
        focus: 'Looking at your positioning off the ball rather than just your touches.',
        detail: 'Check your Player Profile for video homework clips to see how top pros solve similar situations.',
      },
      {
        subject: 'Soccer Insights #35: Playing in Adverse Weather (Rain, Wind, and Mud)',
        takeaway: 'Adapting passing weight and shot selection to wet grass and slick turf.',
        focus: 'Shooting low with topspin on wet days to create dangerous skipping rebounds.',
        detail: 'Wet turf speeds up ground passes—adjust your touch softness accordingly.',
      },
      {
        subject: 'Soccer Insights #36: Breaking Down a Low Defensive Block',
        takeaway: 'Patience, switching play rapidly, and overloading wide areas against packed defenses.',
        focus: 'Moving the ball side-to-side until a central gap opens up.',
        detail: 'Don’t rush the killer pass. Make the opponent shift until their legs tire out.',
      },
      {
        subject: 'Soccer Insights #37: The Role of the Fullback in Modern Soccer',
        takeaway: 'How modern defenders contribute as secondary wingers and inverted midfielders.',
        focus: 'Timing overlapping sprints and understanding defensive balance.',
        detail: 'Fullbacks run more distance than almost any position on the pitch—athleticism paired with IQ makes them lethal.',
      },
      {
        subject: 'Soccer Insights #38: Curving the Ball — Using the Big Toe Bone',
        takeaway: 'Generating whip and dip on set pieces and crosses around the defensive wall.',
        focus: 'Wrapping the foot around the outside edge of the ball with an upward sweeping motion.',
        detail: 'Topspin pulls the ball down under the crossbar right when the keeper thinks it’s sailing over.',
      },
      {
        subject: 'Soccer Insights #39: Handling Bench Time & Coaching Criticism',
        takeaway: 'Transforming feedback into fuel for growth rather than personal frustration.',
        focus: 'Focusing on the controllable variables: effort, attitude, and personal training volume.',
        detail: 'Every great player faces adversity with a coach at some point. The ones who rise are the ones who put their heads down and train harder.',
      },
      {
        subject: 'Soccer Insights #40: Leadership Without Being the Loudest Voice',
        takeaway: 'Leading by example through defensive tracking, body language, and encouragement.',
        focus: 'Setting the work-rate standard for your teammates during difficult game moments.',
        detail: 'A sprint to track back in the 85th minute inspires an entire team more than any speech ever could.',
      },
      {
        subject: 'Soccer Insights #41: The College & High-Level Pathway Truth',
        takeaway: 'What scouts and collegiate coaches really look for beyond pure foot skills.',
        focus: 'Work rate off the ball, communication, coachability, and athletic resilience.',
        detail: 'Talent is everywhere, but players who are relentless competitors and great teammates get recruited.',
      },
      {
        subject: 'Soccer Insights #42: Mid-Season Skill Tune-Up',
        takeaway: 'Refreshing technical sharpness when team practices turn into tactical-only sessions.',
        focus: 'Getting 500+ focused touches a week outside of club practice.',
        detail: 'Club practices often focus on team shape. Personal and small-group training is where individual skill stays sharp.',
      },
      {
        subject: 'Soccer Insights #43: Speed of Transition (The First 3 Seconds of Defense)',
        takeaway: 'Locking down passing lanes instantly upon turnover to prevent breakaway counters.',
        focus: 'Immediate counter-pressing to win the ball back in the attacking third.',
        detail: 'Winning the ball high up the pitch leads to the highest quality scoring chances.',
      },
      {
        subject: 'Soccer Insights #44: Heading Technique and Spatial Timing',
        takeaway: 'Using your legs for elevation and striking through the ball with your forehead hairline.',
        focus: 'Attacking the ball at its highest point with conviction and safety.',
        detail: 'Directing headers downward gives goalkeepers the hardest saves to make.',
      },
      {
        subject: 'Soccer Insights #45: Playing Under Tournament Fatigue',
        takeaway: 'How to manage energy across 4-game weekend tournaments without losing technical precision.',
        focus: 'Simple one- and two-touch passing to let the ball do the running.',
        detail: 'When the legs are heavy, the brain must work twice as fast.',
      },
      {
        subject: 'Soccer Insights #46: Creating Separation as a Striker',
        takeaway: 'The double movement: checking in to explode deep or running deep to check in.',
        focus: 'Creating 2 yards of daylight against physical center backs.',
        detail: 'A striker who always runs in one direction is easy to mark. Disguise your intent.',
      },
      {
        subject: 'Soccer Insights #47: The Art of the Give-and-Go (One-Two)',
        takeaway: 'The oldest combination in soccer that still breaks down the world’s best defenses.',
        focus: 'Passing and immediately sprinting past the defender into open space.',
        detail: 'The passer must not admire their pass—the sprint after the pass is what creates the goal.',
      },
      {
        subject: 'Soccer Insights #48: Developing In-Game Spatial Radar',
        takeaway: 'Constantly building a mental map of open space before you receive possession.',
        focus: 'Checking shoulder habits even when the ball is 40 yards away.',
        detail: 'Anticipate where the ball will be in 3 passes, not just where it is right now.',
      },
      {
        subject: 'Soccer Insights #49: Nutrition Protocols for Game Days',
        takeaway: 'Pre-match complex carbs, intra-game hydration, and immediate post-match refueling.',
        focus: 'Giving your muscles the clean energy they need to sprint for 80+ minutes.',
        detail: 'Hydration starts 24 hours before kickoff, not 10 minutes before warmup.',
      },
      {
        subject: 'Soccer Insights #50: Defensive Compactness as a Team Unit',
        takeaway: 'Moving together as a cohesive block to eliminate dangerous passing corridors.',
        focus: 'Shifting with the ball and avoiding gaps wider than 10 yards between teammates.',
        detail: 'A compact team is impossible to play through centrally, forcing the opponent wide.',
      },
      {
        subject: 'Soccer Insights #51: The Power of Self-Reflection After Every Match',
        takeaway: 'Writing down 2 things that went great and 1 technical area to focus on during weekly training.',
        focus: 'Taking ownership of your own progression as an athlete.',
        detail: 'Check your Player Profile to log notes and match reviews with Coach Flowers.',
      },
      {
        subject: 'Soccer Insights #52: Preparing for Tryout Season with Confidence',
        takeaway: 'Standing out to evaluators through work ethic, positive talk, and playing to your strengths.',
        focus: 'Playing simple, impactful soccer rather than trying to do too much.',
        detail: 'Coaches look for players who make everyone around them better.',
      },
      {
        subject: 'Soccer Insights #53: Maintaining Passion & Love for the Game',
        takeaway: 'Remembering why you started playing soccer and keeping the joy alive.',
        focus: 'Celebrating small victories and enjoying the hard work with teammates.',
        detail: 'When training is fun, improvement happens naturally.',
      },
      {
        subject: 'Soccer Insights #54: Elevating Those Around You (The Teammate Test)',
        takeaway: 'Why the best players in the world are the ones who make their teammates look like superstars.',
        focus: 'Encouraging teammates after mistakes and setting them up for success.',
        detail: 'A true leader brings out the absolute best in everyone on the pitch.',
      },
      {
        subject: 'Soccer Insights #55: Year-End Technical Reflection & New Milestone Targets',
        takeaway: 'Reviewing your 1-year progress on your Player Profile and setting next season’s goals.',
        focus: 'Celebrating 12 months of commitment, dedication, and measurable growth.',
        detail: 'Compare where you started on your Player Profile ratings to where you stand today—the growth is undeniable!',
      },
      {
        subject: 'Soccer Insights #56: 1-Year Academy Anniversary — The Compounding Effect of Training',
        takeaway: 'Celebrating one full year of elite development with Flowers Soccer Academy!',
        focus: 'Honoring your dedication, character, and love for the beautiful game.',
        detail: 'One year of consistent weekly reps creates a gap between you and your competition that cannot be faked. We are so proud to coach you!',
      },
    ];

    const item = topics[idx] || topics[topics.length - 1];

    return {
      step: week,
      subject: item.subject,
      takeaway: item.takeaway,
      body: `Hi {{name}},

${item.takeaway}

Technical Breakdown from Coach Flowers:
• Focus: ${item.focus}
• Key Insight: ${item.detail}
• Session Application: We will be focusing on this concept in our upcoming training sessions in Lilburn, Gainesville, and Loganville.

Remember to log into your Flowers Soccer Academy Player Profile to check your latest session rating, coach notes, and personalized homework drills!

P.S. Soccer is always better with great friends and teammates! If you have a teammate or friend who wants to level up their game, invite them to come train with {{name}} this week!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
    };
  }),
];

/**
 * 56-Step 1-Year Automated Nurture Sequence for Stage 4: Converted Clients (GOALKEEPERS).
 * 
 * STEP 1: The Flowers Soccer Academy Goalkeeper Player Profile!
 * STEPS 2 to 56: "Goalkeeper Insights" series created specifically for goalkeepers from Coach Flowers'
 * authentic perspective, covering shot-stopping, handling, angle play, 1v1 bravery, distribution,
 * and leadership.
 * 
 * All emails are personalized with {{name}}, signed by Coach Flowers, and encourage clients to invite
 * fellow goalkeepers and teammates to training!
 */
export const ACTIVE_CLIENTS_GOALKEEPER_EMAILS: CampaignStepDefinition[] = [
  {
    step: 1,
    subject: 'Welcome to the Goalkeeper Union! Meet Your FSA Goalkeeper Profile',
    takeaway: 'Introducing the exclusive Goalkeeper Player Profile with session grading, handling/diving metrics, and video review.',
    body: `Hi {{name}},

Clubs often offer generic evaluations after a few months, but goalkeeping is a completely unique position that demands specialized feedback. That's why I created the Flowers Soccer Academy Goalkeeper Profile!

In your dedicated Goalkeeper Profile, you will have access to:

• Specialized Goalkeeper Goals: Custom targets for shot-stopping, high crosses, 1v1 bravery, and footwork distribution.
• Feedback After EVERY SINGLE SESSION: We grade every session on a 1-5 scale with detailed notes from the coach who ran the session. If another coach jumps in, they see exactly what you worked on!
• 100-Point Goalkeeper Ratings: Skill ratings for Diving, Handling, Footwork, Distribution, Positioning, and 1v1s. This gives athletes a fun, video game-like feel to track real progress. The grading is intentionally difficult—even collegiate keepers aren't near 100, so don't worry if the number seems low!
• Video Analysis & Homework: A dedicated space to review session clips, technical notes, and video homework so you keep improving between sessions.

We are thrilled to welcome {{name}} to our goalkeeper training roster!

P.S. Goalkeepers train best when pushing each other in competitive pairs! If {{name}} has a fellow goalkeeper friend or club teammate who wants to train together and get their own Goalkeeper Profile, let us know and we'll welcome them to a session!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 2,
    subject: 'Goalkeeper Insights #1: The Set Position & The Moment of Strike Stillness',
    takeaway: 'Why hopping as the shot is struck leaves you flat-footed and how stillness creates explosive dives.',
    body: `Hi {{name}},

Welcome to the inaugural edition of our "Goalkeeper Insights" series!

Today we are breaking down one of the most fundamental habits in goalkeeping: The Set Position.

Have you ever seen a keeper hop into the air right as the striker is shooting? It feels natural, but here's the secret: if your feet are in the air at the exact moment the ball is struck, you CANNOT react or dive until gravity brings your feet back to the grass! That split-second delay is why so many shots sneak into corners.

The Golden Rule of the Set Position:
At the moment of strike, your feet must be planted, shoulder-width apart, weight slightly on the balls of your feet, hands forward in your ready pocket, and your body totally still.

Stillness creates explosive reaction power. When your feet are anchored, you can launch in either direction instantly.

We will be drilling this stillness in our upcoming sessions!

P.S. If {{name}} has a goalkeeper teammate looking to eliminate easy goals and sharpen their set position, invite them to join our goalkeeper group!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 3,
    subject: 'Goalkeeper Insights #2: Handling Mastery — The "W" Catch vs Contour vs Basket',
    takeaway: 'Selecting the right hand shape based on ball height to prevent spills and second-chance rebounds.',
    body: `Hi {{name}},

Every great goalkeeper starts with safe hands. A rebound given up in the box is a goal waiting to happen.

Today we are looking at the three core catching techniques:

1. The "W" / Diamond Catch (Head and Chest Height):
Your thumbs almost touch behind the ball, fingers spread wide to cushion the impact. Your hands act like shock absorbers, bending at the elbows to absorb the pace.

2. The Contour Catch (Midriff / Ribcage Height):
Your hands mold around the sides and back of the ball like wrapping a gift. Never let the ball hit your chest first—catch it in front of your body!

3. The Basket Catch (Knee Height and Below):
Sink your hips, pinkies together, scoop the ball into your forearms, and fold your chest over it to lock it away safely.

At Flowers Soccer Academy, we test these catches under wet conditions, high pressure, and unexpected deflections.

P.S. Training with a partner makes handling reps 10x more fun. Bring a fellow keeper along to our next session in Lilburn, Gainesville, or Loganville!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 4,
    subject: 'Goalkeeper Insights #3: Angle Play & The Arc (Halving the Goal)',
    takeaway: 'Why proper positioning on the penalty box arc cuts down 80% of open goal target without diving.',
    body: `Hi {{name}},

One of the biggest misconceptions in soccer is that great goalkeepers make miraculous flying saves every match.

The truth? The best goalkeepers in the world make saving look easy because of Angle Play!

Imagine invisible lines drawn from both goalposts directly to the ball. Your job is to stand on the bisecting line, just 2 to 3 yards off your goal line on the arc.
• When you step forward onto the arc, you cut down the striker’s shooting angle drastically.
• To the striker, your body fills the entire visual frame.
• A shot that looked wide open from the striker's view hits you right in the chest!

If you stay glued to your goal line, the striker has 24 feet of open net. Step up on the arc, and you cut that target in half.

We review this positioning with our laser-guidance drills in training.

P.S. Does {{name}} have a striker friend from their club team? Bring them to practice to test their finishing against our goalkeepers!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 5,
    subject: 'Goalkeeper Insights #4: 1v1 Breakaways — Spread Save vs Smother vs Staying on Your Feet',
    takeaway: 'Mastering the 1v1 toolkit: closing down space without committing too early.',
    body: `Hi {{name}},

A 1v1 breakaway is the ultimate showdown between striker and goalkeeper. Most young keepers panic and dive at the striker’s feet from 10 yards out, making it easy for the striker to touch it around them.

Here is how we teach 1v1 dominance:
1. Close down space fast while the ball is rolling, but STOP the moment the striker looks down to touch it.
2. Stay on your feet as long as possible! The longer you stay big, the more panicked the striker becomes.
3. If they take a heavy touch, SMOTHER it aggressively with both hands.
4. If they shoot from close range, drop into the modern SPREAD SAVE (K-Block) to make a massive wall with your body.

Patience is a goalkeeper’s greatest weapon in 1v1s.

Ask {{name}} about our 1v1 gauntlet drills during our recent training!

P.S. Invite a teammate or fellow goalkeeper to join us on the pitch this week!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 6,
    subject: 'Goalkeeper Insights #5: Commanding High Balls — The "KEEPER!" Call and Knee Drive',
    takeaway: 'How a loud, decisive call and single-leg knee drive protects the goalkeeper in aerial traffic.',
    body: `Hi {{name}},

Dealing with crosses into a crowded penalty box requires courage, timing, and loud authority.

When a cross comes in, there cannot be an ounce of doubt:
1. The Voice: You must scream "KEEPER!" so loud that your defenders hear you over the crowd and back off. If you are quiet, your center back will try to head it and clash with you!
2. The Jump: Never jump off two feet. Drive off one foot and punch your other knee up toward your chest.
3. Protection & Elevation: That raised knee gives you an extra 6 inches of vertical reach, and it protects your ribs from incoming collisions.
4. Attacking the Highest Point: Catch the ball at the apex of your jump, in front of your head—never behind your shoulders.

Own your 18-yard box. It belongs to you!

P.S. If your club team's defenders and keepers need better chemistry on crosses, invite a teammate to come train with us!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 7,
    subject: 'Goalkeeper Insights #6: Distribution with the Feet — The Modern 11th Outfield Player',
    takeaway: 'How developing comfort on backpasses transforms you into an irreplaceable modern goalkeeper.',
    body: `Hi {{name}},

Gone are the days when a goalkeeper could just kick the ball as far as possible downfield and hope for the best.

In today’s game, top teams expect their goalkeeper to be the 11th outfield player. When your center backs are pressed, they need to know they can play the ball back to your feet with complete trust.

Keys to elite distribution with feet:
• Open your hips on your first touch to face the opposite wing
• Never trap the ball dead right in front of your goal line—take your first touch out of your feet at a 45-degree angle
• Master the low driven pass with both feet to break the opponent’s high press

We dedicate time in every session to footwork, backpasses, and driven distribution.

P.S. Training with other keepers and field players helps simulate real backpass pressure. Invite a friend to our next session!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 8,
    subject: 'Goalkeeper Insights #7: Hand Distribution — The Driven Side-Volley vs Bowling',
    takeaway: 'Starting immediate counter-attacks with pinpoint hand distribution.',
    body: `Hi {{name}},

When you catch a ball, the attack starts in that exact split second.

Too many goalkeepers hold the ball, wait for everyone to run upfield, and then punt it into a 50/50 header. That gives possession right back!

Great keepers use hand distribution to ignite counter-attacks:
1. The Overhand Bowl (0-15 yards): Rolled along the grass like a bowling ball directly into a midfielder’s running stride.
2. The Baseball Throw (15-30 yards): Whipped overhand with backspin to hit a winger on the chest.
3. The Low Side-Volley (30-55 yards): Driven with low trajectory so your forward can trap it with their chest or feet without waiting for it to drop out of the sky.

Fast distribution turns your saves into immediate goals at the other end.

P.S. Know a keeper who wants to add 20 yards of accuracy to their distribution? Bring them to our next session!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  {
    step: 9,
    subject: 'Goalkeeper Insights #8: The 3-Second Flush Rule (Flushing Conceded Goals)',
    takeaway: 'How elite goalkeepers mentally reset instantly after letting in a goal.',
    body: `Hi {{name}},

Here is a hard truth about goalkeeping: Every goalkeeper on earth, from youth rec to the English Premier League, will concede goals. It is the nature of the position.

The difference between good keepers and elite keepers is how they respond to conceding.

When an average keeper lets a goal in, they stay angry for the next 10 minutes. They replay the mistake in their head, their shoulders slump, and 3 minutes later they give up a second soft goal because their mind wasn't focused.

We teach the 3-Second Flush Rule:
1. Second 1: Acknowledge what happened
2. Second 2: Flush it out of your mind—it is in the past and cannot be changed
3. Second 3: Stand tall, clap your hands, organize your backline, and focus 100% on the NEXT ball

The next save you make is the most important save of your life.

P.S. We love developing mentally tough athletes. Invite a fellow goalkeeper or teammate to train with us this week!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
  },
  // Extension steps 10-56 continuing the comprehensive Goalkeeper curriculum
  ...Array.from({ length: 47 }, (_, idx) => {
    const week = idx + 10;
    const gkTopics: Array<{ subject: string; takeaway: string; focus: string; detail: string }> = [
      {
        subject: 'Goalkeeper Insights #9: Footwork Dictates Diving (The Power Step)',
        takeaway: 'Why your feet, not your arms, determine how far you can dive across the goal.',
        focus: 'Taking an explosive lateral power step before launching into an extension dive.',
        detail: 'A dive without a power step reaches 4 feet. A dive with a deep power step reaches the corner post.',
      },
      {
        subject: 'Goalkeeper Insights #10: Organizing Defensive Walls on Free Kicks',
        takeaway: 'How to position your wall to cover the near post so you can own the far post.',
        focus: 'Setting the outside wall man 1 yard wider than the post to deny the curling shot.',
        detail: 'Stand where you can sight the ball clearly past the wall. If you can’t see the ball, you can’t save it.',
      },
      {
        subject: 'Goalkeeper Insights #11: The 3 C’s of Goalkeeper Communication',
        takeaway: 'Clear, Concise, and Calm: directing center backs without causing panic.',
        focus: 'Using one-word command words: AWAY!, STEP!, KEEPER!, MAN ON!',
        detail: 'A confident, vocal goalkeeper makes the entire backline play with double the composure.',
      },
      {
        subject: 'Goalkeeper Insights #12: Wet Weather Goalkeeping & Glove Preparation',
        takeaway: 'Adjusting glove dampness, choosing parries over catches, and expecting skipped balls.',
        focus: 'Pre-dampening latex gloves before kickoff to activate optimal grip.',
        detail: 'When the pitch is slick, parry low shots wide of the post rather than risking a greasy chest spill.',
      },
      {
        subject: 'Goalkeeper Insights #13: Penalty Kick Mindset — Reading the Striker’s Approach',
        takeaway: 'Analyzing the striker’s run-up angle, planting foot, and hip rotation on penalties.',
        focus: 'Remaining patient on your line until the striker commits their kicking leg.',
        detail: 'The pressure on a penalty is 100% on the taker. Hold your ground and make them beat you.',
      },
      {
        subject: 'Goalkeeper Insights #14: Deflections & Reaction Saves — The Second-Effort Pop',
        takeaway: 'How to quickly pop up off the grass using your lead foot after making an initial parry.',
        focus: 'Never staying on your knees; spring up instantly to deny rebound tap-ins.',
        detail: 'Rebound saves win matches. The second effort is what defines elite goalkeeper character.',
      },
      {
        subject: 'Goalkeeper Insights #15: Near-Post Integrity and Closing the 5-Hole',
        takeaway: 'Why a goalkeeper should never get beaten at their near post and how to seal the gap.',
        focus: 'Dropping into a tight reverse barrier with your legs sealed together.',
        detail: 'Own the near post first; make the attacker pull off a miracle cross-goal strike to beat you.',
      },
      {
        subject: 'Goalkeeper Insights #16: The Sweeper-Keeper Role Outside the 18',
        takeaway: 'Positioning yourself high when your team attacks to clear long through balls.',
        focus: 'Maintaining a 20-yard gap behind your center backs to clean up over-the-top passes.',
        detail: 'Playing as a sweeper-keeper snuffs out breakaways before the striker can even touch the ball.',
      },
      {
        subject: 'Goalkeeper Insights #17: Core Stability and Explosive Hip Drive',
        takeaway: 'Why goalkeepers need strong obliques and hip flexors for mid-air extension.',
        focus: 'Rotational core power and lateral plyometrics.',
        detail: 'Diving height and reach come directly from explosive hip drive off the turf.',
      },
      {
        subject: 'Goalkeeper Insights #18: Dealing with Cutbacks from the Endline',
        takeaway: 'Shifting your weight as the ball reaches the endline to cover the penalty spot.',
        focus: 'Not over-committing to the near post when the attacker looks to cut it back.',
        detail: 'Anticipate the backward pass and set your feet for a shot from the 12-yard mark.',
      },
      {
        subject: 'Goalkeeper Insights #19: Punching with Purpose — Two Hands vs One Hand',
        takeaway: 'When to punch crosses clear instead of attempting high catches in traffic.',
        focus: 'Punching through the bottom half of the ball with locked wrists toward the touchlines.',
        detail: 'Never punch a ball back into the central danger zone—direct it high and wide.',
      },
      {
        subject: 'Goalkeeper Insights #20: Parrying to Safety (Pushing Wide)',
        takeaway: 'Using strong wrists to redirect heavy shots outside the post rather than in front.',
        focus: 'Palm angling and wrist deflection technique on 70mph shots.',
        detail: 'A parry that goes out for a corner kick is a fantastic outcome compared to a central rebound.',
      },
      {
        subject: 'Goalkeeper Insights #21: Tipping Over the Crossbar on Dipping Shots',
        takeaway: 'Using the top hand on cross-body dipping shots to tip over the bar safely.',
        focus: 'The crossover step and lead hand deflection mechanics.',
        detail: 'Use the top hand for height and leverage when reaching backward toward your crossbar.',
      },
      {
        subject: 'Goalkeeper Insights #22: Body Language and Presence Between the Sticks',
        takeaway: 'How projecting tall, fearless posture intimidates oncoming strikers.',
        focus: 'Chest up, arms relaxed in the ready pocket, eyes locked on the ball.',
        detail: 'Strikers sense fear. When you look calm and massive, they rush their shots.',
      },
      {
        subject: 'Goalkeeper Insights #23: Defending Corner Kicks (Starting Position)',
        takeaway: 'Positioning two-thirds of the way toward the back post to see the entire ball flight.',
        focus: 'Facing open to the field so you can attack in-swingers and out-swingers with forward momentum.',
        detail: 'It is 100x easier to run forward to attack a cross than to backpedal toward your line.',
      },
      {
        subject: 'Goalkeeper Insights #24: The Psychology of a Clean Sheet',
        takeaway: 'Celebrating the collective defensive effort and maintaining focus when up by 3 goals.',
        focus: 'Treating the 85th minute with the same intensity as the 1st minute.',
        detail: 'Great goalkeepers take immense pride in zero goals conceded, regardless of the scoreline.',
      },
      {
        subject: 'Goalkeeper Insights #25: Pre-Match Goalkeeper Warmup Blueprint',
        takeaway: 'Progressive warmup structure: footwork, handling, volleys, crosses, and angle reps.',
        focus: 'Building hand confidence and rhythm before the first whistle blows.',
        detail: 'Never rush your pre-game warmup. You want 100 clean catches under your belt before kickoff.',
      },
      {
        subject: 'Goalkeeper Insights #26: Handling Low Driven Shots (The Front Smother)',
        takeaway: 'Diving forward through the ball to smother grass-cutters cleanly.',
        focus: 'Getting your body behind the ball with hands extended out in front.',
        detail: 'Do not let the ball get under your chest—attack the catch in front of your body.',
      },
      {
        subject: 'Goalkeeper Insights #27: Communicating with Center Backs Under High Press',
        takeaway: 'Giving passing options and directing teammate body angles.',
        focus: 'Calling "RESET!", "DROP!", or "SWITCH!" early so your defenders have clear exits.',
        detail: 'You have the best view of the entire field—be the vocal GPS for your defense.',
      },
      {
        subject: 'Goalkeeper Insights #28: Low Trajectory Side Volleys for Distance',
        takeaway: 'Mastering the horizontal drop and side-strike to hit wingers 50 yards away.',
        focus: 'Dropping the ball at waist level and sweeping through with a low, driving arc.',
        detail: 'A flat trajectory reaches your forward before the opposing defense can drop back.',
      },
      {
        subject: 'Goalkeeper Insights #29: Screened Vision & Defending Crowded Boxes',
        takeaway: 'Peeking around defender screens and maintaining set position discipline.',
        focus: 'Never guessing where the shot is going; wait until the ball clears the screen.',
        detail: 'Move your head laterally to keep the ball in your sight line until the moment of strike.',
      },
      {
        subject: 'Goalkeeper Insights #30: Goalkeeper Agility (Micro-Steps in the Box)',
        takeaway: 'Using rapid chop steps rather than long strides to adjust to deflected passes.',
        focus: 'Keeping your center of gravity low and feet close to the ground.',
        detail: 'If your feet are wide when a deflection happens, you get stuck. Quick small steps keep you agile.',
      },
      {
        subject: 'Goalkeeper Insights #31: Video Review for Goalkeepers',
        takeaway: 'Spotting 1-yard positioning errors on film that prevent conceding goals.',
        focus: 'Reviewing starting positions before shots are taken.',
        detail: 'Check your Goalkeeper Profile for video clips and analysis notes from Coach Flowers.',
      },
      {
        subject: 'Goalkeeper Insights #32: Staying Focused When Your Team Dominates',
        takeaway: 'How to stay mentally sharp when you haven’t touched the ball for 20 minutes.',
        focus: 'Talking constantly to your backline and moving with the play to maintain muscle warmth.',
        detail: 'The hardest saves happen after 25 minutes of doing nothing. Mental stamina is everything.',
      },
      {
        subject: 'Goalkeeper Insights #33: Reading Striker Hip Cues in 1v1 Situations',
        takeaway: 'How the plant foot and hip angle reveal the shot direction before the strike.',
        focus: 'Watching the striker’s chest and hips, not their fancy ball feints.',
        detail: 'The ball cannot go where the hips cannot point. Read the hips to anticipate the shot.',
      },
      {
        subject: 'Goalkeeper Insights #34: In-Swinging vs Out-Swinging Deliveries',
        takeaway: 'Adjusting your starting depth on corner kicks based on delivery spin.',
        focus: 'Starting closer to your goal line on in-swingers, and higher on out-swingers.',
        detail: 'In-swingers bend toward your net—protect your goal line. Out-swingers drift away—attack them.',
      },
      {
        subject: 'Goalkeeper Insights #35: Recovery Runs When Caught Off Your Line',
        takeaway: 'Backpedaling and drop-stepping without tripping over your own feet.',
        focus: 'Turning your hips into a lateral sprint rather than backpedaling flat-footed.',
        detail: 'Sprint back to your goal line, re-set your feet, and make the leaping save.',
      },
      {
        subject: 'Goalkeeper Insights #36: Bouncing Balls on Hard Pitches and Turf',
        takeaway: 'Catching the ball right as it hits the bounce or after it reaches peak height.',
        focus: 'Never letting the ball hit your chest at mid-bounce.',
        detail: 'Smother the ball on the rise or let it settle into your contour grip.',
      },
      {
        subject: 'Goalkeeper Insights #37: The Goalkeeper Union (Why Training in Groups Wins)',
        takeaway: 'How training alongside fellow goalkeepers fosters healthy competition and mutual respect.',
        focus: 'Pushing each other on high-tempo diving and footwork circuits.',
        detail: 'Nobody understands the pressure of goalkeeping like another keeper. We train as a brotherhood and sisterhood.',
      },
      {
        subject: 'Goalkeeper Insights #38: Managing Quad and Hip Soreness During Tournaments',
        takeaway: 'Foam rolling, cold therapy, and mobility routines between tournament matches.',
        focus: 'Restoring explosive leg drive after 2 games on Saturday.',
        detail: 'Proper recovery ensures your diving power on Sunday is just as explosive as Friday.',
      },
      {
        subject: 'Goalkeeper Insights #39: Protecting Yourself in Aerial Collisions',
        takeaway: 'Leading with the knee and catching with elbows firm to absorb impact cleanly.',
        focus: 'Courage paired with smart body armor mechanics.',
        detail: 'When you jump with authority, oncoming strikers bounce off you safely.',
      },
      {
        subject: 'Goalkeeper Insights #40: Tactical Awareness on Goal Kicks',
        takeaway: 'Reading opponent press traps and choosing short buildup vs midfield restarts.',
        focus: 'Scanning the opponent’s high press formation before placing the ball.',
        detail: 'A smart goal kick bypasses 4 defenders and puts your team immediately on the attack.',
      },
      {
        subject: 'Goalkeeper Insights #41: Defending Late Match Set Pieces with a Lead',
        takeaway: 'Setting up defensive walls and commanding the box in the 90th minute.',
        focus: 'Absolute focus, demanding urgency from your markers, and securing the clean sheet.',
        detail: 'Great goalkeepers preserve victories in stoppage time with vocal authority.',
      },
      {
        subject: 'Goalkeeper Insights #42: What College Coaches Look for in Goalkeeper Recruits',
        takeaway: 'Distribution with feet, physical presence on crosses, vocal leadership, and character.',
        focus: 'Demonstrating complete command over the penalty area during recruitment matches.',
        detail: 'Shot stopping gets you noticed; distribution and communication get you signed.',
      },
      {
        subject: 'Goalkeeper Insights #43: Symmetry: Equal Comfort on Left & Right Dives',
        takeaway: 'Eliminating weak-side diving hesitation through dedicated non-dominant reps.',
        focus: 'Equalizing collapse and extension dive mechanics on both sides of the body.',
        detail: 'Strikers will test your weaker side if they see you hesitate. Make both sides impenetrable.',
      },
      {
        subject: 'Goalkeeper Insights #44: Hand-Eye Coordination & Reaction Tennis Ball Drills',
        takeaway: 'Simple home drills using reaction balls to sharpen optic nerve reflex speed.',
        focus: '10 minutes of wall bouncing and peripheral vision catching at home.',
        detail: 'Fast eyes lead to fast hands. Train your reaction speed between academy sessions.',
      },
      {
        subject: 'Goalkeeper Insights #45: Mental Stamina in Shootouts',
        takeaway: 'Winning the psychological battle during penalty shootouts.',
        focus: 'Remaining massive, smiling, taking your time, and making one heroic stop.',
        detail: 'In a shootout, all the pressure is on the kicker. Embrace the spotlight!',
      },
      {
        subject: 'Goalkeeper Insights #46: Finding Gratitude in the Toughest Position',
        takeaway: 'Embracing the unique honor and pressure of being the last line of defense.',
        focus: 'Loving the challenge, the diving, and the thrill of a fingertip save.',
        detail: 'Goalkeepers are special athletes. Wear your gloves with immense pride every day.',
      },
      {
        subject: 'Goalkeeper Insights #47: Inspiring Your Teammates with Steady Confidence',
        takeaway: 'How your calm, steady demeanor reassures the entire team in tight matches.',
        focus: 'Never showing negative body language or frustration on the field.',
        detail: 'When your teammates see a calm, focused keeper behind them, they play with complete freedom.',
      },
      {
        subject: 'Goalkeeper Insights #48: Tactical Command of the Back Four',
        takeaway: 'Directing center backs to push up or drop back based on opposing midfield pressure.',
        focus: 'Anticipating long balls before they are struck and organizing your backline depth.',
        detail: 'Positioning your defense properly prevents shots before they can even be taken.',
      },
      {
        subject: 'Goalkeeper Insights #49: Dealing with Breakaways: The Fake Slide',
        takeaway: 'Feigning an early slide to force the striker into taking a heavy touch.',
        focus: 'Baiting the attacker into making their move early so you can smother cleanly.',
        detail: 'Goalkeeping is chess at 100 miles per hour. Outthink the striker.',
      },
      {
        subject: 'Goalkeeper Insights #50: Year-End Goalkeeper Profile Review',
        takeaway: 'Reviewing 12 months of handling, diving, and distribution growth on your Goalkeeper Profile.',
        focus: 'Comparing your initial evaluation scores to your current mastery metrics.',
        detail: 'Look at how far your shot-stopping and footwork have come—the proof is in the grading!',
      },
      {
        subject: 'Goalkeeper Insights #51: Setting New Goalkeeping Horizons for Next Season',
        takeaway: 'Targeting specific technical benchmarks for the upcoming club and school seasons.',
        focus: 'Refining high ball dominance, distribution range, and vocal leadership.',
        detail: 'Never settle for good enough. Elite goalkeepers are always chasing mastery.',
      },
      {
        subject: 'Goalkeeper Insights #52: The Compounding Effect of Weekly Goalkeeper Reps',
        takeaway: 'Why hundreds of weekly saves build an unbreakable foundation of muscle memory.',
        focus: 'Honoring the sweat, turf burns, and dedication that got you here.',
        detail: 'There are no shortcuts between the goalposts. Your weekly training has built something truly special.',
      },
      {
        subject: 'Goalkeeper Insights #53: The Goalkeeper Code: Integrity, Courage, and Resilience',
        takeaway: 'Carrying the lessons learned in the penalty box into school, life, and character.',
        focus: 'Standing tall in the face of pressure and leading with integrity.',
        detail: 'The mental resilience you develop as a goalkeeper will serve you for the rest of your life.',
      },
      {
        subject: 'Goalkeeper Insights #54: Thank You from Coach Flowers',
        takeaway: 'A personal thank you for your commitment to the Flowers Soccer Academy family.',
        focus: 'Celebrating your athletic and personal growth over the past year.',
        detail: 'It is an absolute honor to coach you and watch your goalkeeper journey unfold.',
      },
      {
        subject: 'Goalkeeper Insights #55: Preparing for Championship Moments',
        takeaway: 'Stepping up when trophies and tournament titles are on the line.',
        focus: 'Trusting your training, staying in the moment, and loving the big pressure.',
        detail: 'Championships are won by goalkeepers who rise in the final 5 minutes.',
      },
      {
        subject: 'Goalkeeper Insights #56: 1-Year Goalkeeper Anniversary — Elite Mastery Achieved',
        takeaway: 'Celebrating one full year of elite goalkeeper training with Flowers Soccer Academy!',
        focus: 'Honoring 56 weeks of dedication, shot-stopping, and excellence.',
        detail: 'You are a completely transformed goalkeeper compared to day one. Hold your head high and keep owning your box!',
      },
    ];

    const item = gkTopics[idx] || gkTopics[gkTopics.length - 1];

    return {
      step: week,
      subject: item.subject,
      takeaway: item.takeaway,
      body: `Hi {{name}},

${item.takeaway}

Coach Flowers Breakdown:
• Position Focus: ${item.focus}
• Key Insight: ${item.detail}
• Academy Execution: We will be working on this exact goalkeeper technique during our upcoming sessions in Lilburn, Gainesville, and Loganville.

Check your Flowers Soccer Academy Goalkeeper Profile to review your session grading, coach comments, and video homework!

P.S. Great goalkeepers push each other to new heights. If you have a fellow goalkeeper friend or club teammate who would love to join our goalkeeper union, invite them to come train with {{name}} this week!

Best regards,
Coach Flowers
Flowers Soccer Academy`,
    };
  }),
];
