
Search in video
Introduction and Purpose of the Talk
0:00
this talk is called cursor for staff engineers and for the most part I think a lot of people have seen that in the
0:05
past couple of weeks we've really been a been pushed by tech leadership to just like aggressively adopt AI but I think
0:12
for the most part at least what I see on Twitter or LinkedIn a lot of it has been like fixated on vibe coding and this
0:18
talk ideally won't be about that it's not going to be about vi coding instead it's going to be about tackling the pain points that consume our time as senior
0:25
engineers and mostly he's going to cover how we can automate a lot of these repetitive tedious tasks that we all dread and I'm really excited to invite
0:32
Vic to speak on this i met him through the AI consulting course and I was
0:38
really surprised to learn like how much you were crushing it through these implementation projects just just using co cursor and so before we start I just
0:44
want to ask what would be the number one thing you want people to take away from the course not from the course from this
0:50
talk yeah it's it's great to meet Jason honestly I he inspired me to get into
0:56
some of this along with a good friend of mine Luke they were both doing something similar that's how I got into AI
1:02
consulting specifically i think my takeaway would be that even real
1:08
engineers that are working on like real production products can use cursor i think I see a lot of what's online is
1:15
one of two things it's either people that are like cursor is just going to AI tools are just going to write all your
1:22
code for you you don't need engineers anymore agents are just going to handle everything which I think is a bunch of
1:27
nonsense and then the other side of it is people that are like I'm perfectly content with writing all the code myself
1:34
i think AI is I don't want to use it at all they're like scared to use it and what I'm trying to point out is if you
1:40
can get to a place where you find repetitive things or common workflows that you're trying to just automate
1:46
using AI a little bit more you're still making all the decisions that's the main thing you're a staff engineer for a
1:52
reason and the reason you're a staff engineer is not because you're really fast at typing code or something it's because you're making good decisions
1:58
about system and training other engineers that's what it's about and I think cursor can help you with that so
2:04
because someone from is from Klein is here i don't know if anyone from Windsurf is here but this is not
2:09
necessarily like cursor focused i just use cursor a lot but I think most of the
2:15
talk it's I'm not even going to show a single prompt for the entire talk that
2:20
the because you guys all know how to like prompt things i don't think I need to teach you that it's more about I
The New Age Developer: Embracing AI
2:28
think the new age developer the new age staff developer how do they need to think about the engineering process when
2:35
AI is involved that's really how I think about this so before I start I' I have a
2:41
lot of friends that work in sales and one thing you do is you just objection handle immediately so I'm just going to
2:47
go through a list of things that people tell me about why they don't want to use cursor and then hopefully that'll clear
2:52
up some things before I get into the talk so one is I could code faster because I know the code base like back
2:59
to front because you've been working somewhere for several years or you wrote all the code yourself and because you
3:05
know all of that trying to give cursor all the context is going to make you a lot slower than just like prompting i
3:11
think even if it's the case that you know a codebase like super well I would argue that actually helps you with
3:18
cursor because then you can point exactly at what you're trying to do which files to look at which context to
3:24
give it that is only going to help you and I think the other thing that people
3:29
really underestimate is how long it takes for them to type code like I had
3:34
to I don't type code as much as I honestly very little nowadays and the reality is it takes a while and it's
3:41
just actually once you time yourself I think you'd realize that you're better off explaining in English what you want
3:48
the code to say tactically than typing it yourself so that's one thing I would say another is it does too much it makes
3:55
a lot of mistakes uh I think that largely has to do with what you're
4:00
trying to get cursor to do for you i think if you're more clear about here
4:07
are stepby-step things I want to actually get done instead of just saying I need you to build this new endpoint
4:13
that it has no idea how to do that's just not going to work very well and mistakes I think is yeah it's inevitable
4:19
that tools are going to make mistakes i think how I look at it is like actually
4:26
use all the systems that we've built over the last 30 years in software engineering use Git get to a place where
4:32
your code's in a decent state you can use cursor to try something and if it doesn't work you just reject it or you
4:38
can try again so I think if it makes mistakes that's fine my take is a huge
4:46
mistake I see people do is they'll try a prompt once and then it'll fail and then
4:53
they'll just go back to writing the code and my argument is you should try five times like you should try five times in
5:00
the same context window you should open a new context window and try again and the argument is first of all it might be
5:06
faster second of all the more you push yourself to do that and you believe in
5:12
cursor to I know it sounds ridiculous but the more you believe in the system I think you're going to get better at
5:18
finding prompts and patterns and things it'll be in your brain to do more
5:23
complex things over time so that's very important and the second thing is you can as a staff engineer part of your job
5:30
is to train other people and I think the more you can learn how to use AI you can
5:37
teach that to the rest of the team which is super valuable and important especially for like more junior
5:43
engineers i'm still learning what kind of advice to give them nowadays so I think learning these tools is important
5:49
for that only works if you're working on a new codebase this whole talk is going to talk about things that work on
5:54
existing code bases and production codebases that's all the work I do i usually do two or three implementation
6:01
clients a month and I have a few advisory clients as well so these are all things that these examples are
6:06
things I've done in the last month takes away the joy in writing code i have heard this argument more
6:13
recently from people at the end we'll have 20 minutes for questions so this is you can let me know but I think the
6:21
people that love writing code can still love writing code i just
6:27
don't think that's what matters when you have a job i think in the industry the thing that's going to matter more than
6:34
ever is results and results is often like shipping things that matter to people so if AI can help you do that I
6:43
would just or reorient yourself around that is what I enjoy doing and in a way
6:48
it's actually made me love coding ever even more than I used to honestly all this stuff last is people love Neoim
6:56
okay I'm gonna go I use Neoim for 10 years my good friend Mark is here he was the one that kind of got me into some of
7:02
this stuff as well but yeah if you want to use Neoim fine go for it but I think
7:08
the times are changing i'm just like unconvinced that I know the guy like Yaine or whatever on Twitter says he has
7:14
a Neoim setup that works perfectly i'm unconvinced so anyways this is as McKenzie as this talk
Three-Step Framework for Using Cursor
7:22
will get i wanted to give you a three-step thing that I actually use this is not something I made up this is
7:28
how I actually think about using cursor and I'll repeat this within the talk so
7:33
explore is basically a phase where you want to tell cursor like what context it
7:39
needs to know about the problem you're trying to solve what is the problem you're trying to solve come up with options with it of what you could do how
7:46
you could build it plan is mostly about let's actually pick an option and figure
7:52
out step by step how we're going to go about doing this especially for a task that ends up like getting pretty big you
8:00
want to do that because otherwise you're going to end up telling us to do way too much at once that's a very important
8:05
step third is build build is often times
8:11
you once you plan hey this is a step I want to do you can just tell cursor let's do one step of it I'll review it
8:18
and you can think of it almost like you're reviewing a PR from like an intern or something you want to give it
8:23
a small step and when you review it maybe you have to make some edits maybe
8:29
you have to prompt it a little bit maybe you have to go into the code and change it yourself maybe you have to try again but that is that's all like
8:36
understandable and acceptable what I'm going to do is instead of just giving you like a highle framework I'm going to
8:42
give you examples three examples of things that I actually do dayto-day so
8:47
these are things that I've done in the last week or two I think so one is test
Example 1: Test-Driven Development with Cursor
8:53
room development so how do you use cursor to write better tests the reason
8:58
why I think this matters is one I don't know very many engineers that love
9:04
writing tests they're very important if you work at a startup I think it's typically the first thing that gets cut
9:11
is writing tests if you work at a large company they're very important and I would argue that cursor can help you
9:16
write better tests so that's really what we're going to cover the way I look at cursor in the explore
9:24
phase is you need to share context about which files you want to actually test so
9:30
let's say you have an SDK that you want to test what I would do first is I'd tell cursor hey here's like the folder
9:38
or here's the file that I'm trying to test here's the entry points can you look at this file and tell me which
9:45
other dependencies other things I need to look at to to basically figure out
9:50
what is the right things that we need to test what are the types of tests that we can build and I I'll let cursor do this
9:55
on its own once but if it doesn't work as well as I would expect I will tell it
10:01
straight up here are the files I need you to look at here's similar tests I want you to build against and then you
10:07
can talk with the agent you can literally be like "Hey I think we should build these types of tests like what are
10:12
other edge cases I should consider?" It's super useful because I almost treat
10:19
talking to LLMs now like having a team of staff engineers that all understand
10:24
your codebase like reasonably well and are domain experts and like things that you don't know about that's largely how
10:31
I use LLMs now when I'm coding so that's like the first step you just want to come up with ideas you want to think
10:37
about what are the types of things I want to test the second thing this is very important is you want to actually create
10:45
a plan and the I'll show you an example of what the plan looks like i I have some screenshots of what the plan looks
10:51
like but the way I look at it is if you tell cursor okay cool you figured out
10:57
what we should test how we want to test it all good just go ahead and do
11:02
everything the agent i have yet to see that work properly and I know there are companies out there that are trying to
11:09
like solve this problem i think like Devon is trying to do something my understanding is they're doing something
11:15
similar to this except in an automated way but I yeah I literally like there's
11:20
a question but I don't use like an MCP for this or anything but I'm literally
11:26
just creating a markdown file myself i tell it hey create a step-by-step plan
11:31
for this and save it to a markdown file and I put like checklists on it
11:36
basically so that it knows when it goes back and looks at it how far it is what
11:42
steps it needs to do still all of that and the good thing about this is let's say like you I don't know you open a new
11:48
context window you can just give it the markdown file and it'll generally be able to figure out like how far it is if
11:55
you like restart your computer whatever the reason is so here's like an example
12:00
of this this is not the exact problem I was working on for a company recently but let's say you need to build like a
12:05
schema validator and the schema validator is for products products have
12:10
different attributes on them and all the attributes are stored in a database table where it's essentially like the
12:18
org ID the the attribute name and then the type of the attribute is all saved
12:23
in one place and you need to take all of those and create basically like a zod object or like a pideantic object that
12:30
you can use to validate the schema and this is super relevant for especially in the LLM world where if you use something
12:36
like constructor you need to pass in these types to get structured output back and honestly I think it's very
12:43
important to get good testing around these types of things otherwise it's just going to break your app so what
12:48
I'll do is I'll I'll say hey I already have this file i already have this
12:53
product utils file that generates these schemas for me can you come up with a plan for me let's come up with a plan
13:00
and I'll talk back and forth once I talk back and forth and I'm like generally on the same page with it I'll tell it okay
13:07
come up with a plan and this is kind of like step one right step one is just setting up the mocks for it that mocks
13:14
all the database utils it mock it like puts in the dependencies it needs it creates the file so that's kind of like
13:20
step one and once it's done you'll see like little check marks on all of it then this is like the second step
13:27
where it says "Hey we need to actually create those helper functions we need to create the mocks we need to do this."
13:33
And it'll start doing that based on the actual type system this is why TypeScript is so good for for in the
13:40
cursor world types TypeScript good linting all of these things it just helps it know how to build things
13:46
properly and this is an example of a step that's not completed yet we need to actually
13:52
write tests for each of these different schema creations like booleans numbers datetimes and we'll need to test all
13:58
these different edge cases and I'm not telling you that an engineer can't like
14:03
actually go do this on their own what I'm saying is that there's no reason for you to write all of this on like by
14:10
yourself anymore i just don't think that there's like a good justification for it think about the amount of time it might
14:16
take for you to write all these tests yourself at best you can maybe leverage yourself by delegating it to someone
14:22
else but I'm not like a huge fan of that i think like in the world we're in we're
14:28
going to have to all figure out how to be more productive like individually so that's how I think about it when you
14:34
apply the steps one by one that way you can make little adjustments if anything's not working you can make
14:41
little changes and the biggest thing is you got to commit all this to git if you just try to go through all the steps at
14:48
once and then it doesn't work cursor checkpoint stuff is just not good and
14:54
it's just not set up for this type of thing i'm a very big fan of git i love git and I think it's no different you
15:01
should just continue using that i would just update the plan file as you go yeah really believe in git is my number one
15:08
feedback on all this so the takeaways here the tests actually get written like honestly if you work in
15:14
startup like tests sometimes just don't happen it even if you get interrupted you have to go back lose all the context
15:22
you don't have to rebuild all that context it lives in the plain doc and then the other thing is this is great if
15:27
you if you want to write tests before you write the code I think that's the thing that we've lost as an industry
15:32
because it's so annoying to do it but if you create all the interfaces you describe what you actually want to build
15:39
first and you create a little test for it that's even better i think that's great but an alternative is let's say
15:45
you have a area of your codebase that has no testing i think this is another way to explore okay how do I figure out
15:52
what this code is doing i think writing tests is a really great way okay so another example is load
Example 2: Load Testing with Cursor
16:01
testing so as a staff engineer one thing that you need to be able to do is really
16:08
understand the system that you're actually working with you need to be able to understand what are the
16:14
constraints I have what are the performance characteristics of it what is it that we're trying to optimize for
16:20
and honestly I think this is also work that's really hard to justify sometimes
16:27
like to to management and stuff like that but it's really important and very hard to delegate what I found is that
16:34
cursor helps me actually do this type of work very quickly i can time box it
16:40
basically say all right I have 15 minutes i want to understand this code base a little bit more and present an
16:45
insight to the team so the way I look at it this is another problem we were working on recently so
16:51
VLM is like an inference engine so if you're deploying a model on your own VPC
16:56
instead of using OpenAI or something you basically need to use something like VLM to actually run inference so in our case
17:04
because we were running this we didn't have a great understanding yet because we were new to it of what are the
17:11
performance characteristics how many requests should we be handling at once um what is like a reasonable cut off
17:18
before we need to scale up or scale down so that the users are like not getting performance degradation what is like the
17:26
tokens per second all these things that we want to understand the reality is these types of
17:32
load testing scripts are different for every system for anything that you want to test i've seen companies try to make
17:39
like utils and stuff for this to share some of it over time so that it can be reusable i've never seen it work it ends
17:46
up as scripts that are manual every single time so that's fine because now
17:51
you can use cursor to rip these out way faster so one thing I would do is you
17:58
don't really need to plan that much for this because it's largely a throwaway script or it's just something that maybe
18:04
lives in the repo and you're not going to be editing that much it's not something that's going to production
18:09
necessarily it's working with a production system it's not going to production so I wouldn't use the giant
18:15
markdown planning file for this i don't think you need that but I think you can still use cursor come up with things
18:22
that you might want to test about the system i think that's what cursor can be useful for is treat it like another
18:29
staff engineer on your team that you're just like pair programming with or thinking through ideas with i think it
18:34
can be really useful for something like that and the actual process for building
18:40
is stuff that you know how to write code for anyways it's really just okay we need to set up multiple threads for the
18:46
system and this is an example that we went through these are like seven examples of things that we added to the system over time you need the initial
18:53
setup for the script here's the endpoints you add this to the context you say I want to call this endpoint
18:58
with this many threads at one time you set that up then you say all right I want to maybe call this with a
19:04
configurable number of threads at a given time to see how the performance is once you actually figure that out you
19:09
need to start collecting timing data so you need to know hey what's the tokens per second on on each of the threads you
19:16
need to like start tracking that somewhere maybe you want to see at any
19:21
given time as it's completing you want to see that live in the CLI maybe you want to measure okay I have 10 requests
19:29
does that does the tokens per second of the whole system increase while each thread decreases these are things that
19:36
generally you would want to know about the system but that you're limited by the actual time you have to write the
19:41
code and explaining it to someone else might not be like super worth it so the
19:47
way I think about it now is you're no longer limited by writing the code you're limited by the ideas you have
19:53
that you want to test and secondly it'll actually get done because
19:59
I don't think you need to go into your standup meetings anymore and be like "Hey I'm going to spend a day or two
20:04
back and forth i'm going to be I'm going to be setting up a load testing script." You don't have to prove that to all the
20:10
VPs and stuff anymore you just spend 15 minutes doing this see if you get anywhere with it and if you get somewhere maybe then you can go back to
20:16
them and say "Hey this is this was super valuable maybe we should be doing this more often." Whatever it is that kind of
20:21
experimentation I think is super valuable and the other thing is as a staff engineer you really do need to
20:27
know the context on the system you need to know how your system works i think
20:32
this is true at the director and manager level too but the talk isn't really for them as a staff engineer you own the
20:39
system ultimately so if you're not doing this who is going to be that's my take on it another kind of So far I've given
20:48
you an example of something that needs to integrate directly into a system unit testing a second example is working on
20:55
top of an existing system so load testing building a script on top of it this one is more of like a workflow
Example 3: Automating PR Comments with Cursor
21:01
everyone's getting PR comments so you have PR reviews you're you have comments being given to you i think most people
21:08
hate getting nit comments like "Oh the change the padding to five pixels or hey
21:14
can you like move this file here or rename this or whatever?" All those little details i've never liked dealing
21:20
with that stuff i just always hate it but I think most of it is relatively
21:26
trivial for for some kind of co-pilot to handle nowadays so my process and you're
21:33
going to think I'm crazy but it's I'll explain why I do this i literally go into GitHub I screenshot every single PR
21:39
comment as an im with as an image with and I make sure that the file name and all that is in the
21:45
screenshot then I drag and drop all of those and no you can't do GitHub PR view
21:52
comments because it doesn't have the line numbers and stuff trust me so I then put all of that into a single c
21:59
cursor context and I say "Hey I need you to go ahead and just list out what I
22:04
gave you so far." and I like verify that the OCR and all that are good doesn't
22:11
I'll answer questions after so the PR comments then I ask it to group all the related changes and I say just once
22:18
you've grouped everything make a planning file and I put all the file name the line number and just the
22:25
comment itself i don't I don't do any I don't do anything of figure out how to fix this yet this is all about just
22:30
storing the context in a single place and the last thing is I say "Hey go read
22:36
the planning file and read each one by one." And the agent at this point will
22:42
be able to say "All right this is this line number in this file." It'll look up that file for context it'll find all the
22:49
relevant other files that it might need and it'll like generate that and all the small little details are so easily fixed
22:56
nowadays like trivial to fix and I just get commit those and then I just update
23:01
the planning docka it's like not a big deal but the second thing is that larger
23:07
changes you might just need to do some prompting work on your own or you might have to go in and edit yourself but
23:14
honestly if you're saving like 70% of your time for me it feels like way more than that i did see a point that it's
23:21
good to propose a solution i think that's great but like at this point I'm like you should propose i think you just
23:29
if this was like automated somehow i think that's totally fine too but I'm like not convinced that we're that close
23:34
to being able to do it i have heard of other people doing things like JSON actually apparently has a way to do the
23:42
git commands in cursor itself so that it'll
23:47
create stacked PRs for you based on all the PR comments i am not convinced that giving Git access to a cursor agent is a
23:54
good idea as maybe you saw when it deleted all of his code one day so I'm not there yet but maybe we're getting
24:00
there yeah the takeaway is really you want to focus on the stuff that actually matters everyone's going to get annoyed
24:08
about nit comments and little things but if you don't have to think about them anymore then it's not an issue now maybe
24:14
someone in the comments has a better way to do all this with the API and MCP if you do you can tell me trust me I'm always willing to learn things but I
24:21
have yet to figure out how to do it so I literally just screenshot things i'm not gonna not gonna get bogged down by MCPS
24:28
if I don't need to that is a list those are three things that I've done with cursor i'm just
24:34
trying to give you examples of how you can start thinking about using this day-to-day but here's like a giant other
24:42
set of things that I've used cursor for over the last two or three really cursor
24:47
and LLMs generally cursor really I've only been using for a little over a year but this is the only reason I can do
24:54
what I do as an independent consultant there's just no way I could continue doing implementation clients and work
25:01
with me as many people I'm working with and especially going into new code bases
25:06
every single month and I have to learn them very quickly and what I'm showing you is what I do i have no reason to i
25:13
have all incentive to only be honest with you i'm trying to be like the most honest person talking about using cursor
25:18
on the internet so that's my take jason do you want to cover from here a little
25:24
bit yeah so what we're probably going to do is I just I left a link in the
25:30
chat we can probably leave some comments we can upote them stuff like that and then one thing I just wanted to call out
25:36
too i only saw this recently but on March 27th this article came out that kind of
25:42
blew my mind where Airbnb used AI to finish 18 months code migration in just 6 weeks and again it it's basically
25:49
exactly what you did with propose make a plan run tests take the errors reiterate reiterate and yeah it was mind-blowing
25:55
to see how things are done but yeah if you have any questions leave them in the slidoh and another thing that someone
26:02
had asked was do you have any demos i know it's probably hard to share production code just because it's you have I know you have five laptops but
26:09
what would the demo be like I would share like this is what I was wondering like I
26:14
share prompts like I share like these are prompts I did or because ultimately I think I'd have to live stream myself
26:22
like writing code I think maybe what I could do is ask Jason what's a PR that needs to be written instructor and then
26:28
just sit there and live stream me doing it for an hour or something i mean a lot
26:34
of the work instructor has been documentation these days and like reorganizing a lot of the examples to be more like educational that has been a
26:41
huge huge lift for me here's all the concept documentation here's the API i
26:46
want you to propose me a plan of how to organize content in a way that is educational
26:52
and then do it that way that has been super helpful it's something there honestly it's interesting once like I
Understanding Cursor's Functionality
26:57
work in applied AI right so I understand how cursor works like high level i feel like I once you understand what it's
27:03
doing a little bit it helps a lot once you realize that a lot of what the agent
27:08
is actually doing is once it creates code right it's
27:14
verifying that it works or not and largely it's relying on like the type system and the llinter and it's just
27:21
like going back like redoing it over and over again and I think they figured out that people were when cursive phrase
27:26
first came out I would generate code and then I would run it and it would crunch an error and I would hit the debug
27:33
button it would go back and do it change code i'd do that over and over again until the code ran and I think that was
27:39
like the initial vibe coding attempt and they've gotten a little bit smarter about it but that's what it's doing for
27:45
the most part but yeah demos i think that's something we need to figure out like how can I really I was avoiding
27:52
demos because I was like saying this is a group of staff engineers these are people that have code bases and complex
27:59
code bases that they know better than me and I'd rather give them like a framework of how I think about this and
28:05
examples and be like here's one random codebase that I've worked with that's not even the real codebase because it's
28:10
under NDA I'm gonna fake it basically that was my concern with this thing yeah maybe
28:16
What we can do is like next time we'll just do a lighting lesson that is just pure live coding or something like that
28:22
i think that would be pretty useful we'll just send an email afterward just because yeah then we can probably do something that's a lot more let's make
28:29
some contributions to a to another repo ra or make a new like app or something we can just set aside some time for that
28:35
but it does look like there's a ton of people who want an exit demo and mostly what I've seen on Maven in the past has
28:41
been like how should a PM learn to use levelable or use cursor but I think I'm very curious to see how you do these
28:47
because I know you're probably a stronger developer than I am i actually use cursor a lot for doing data analysis and research rather than spin up an
28:54
entire app from scratch but I think we have enough questions and up votes so do you want to jump into some questions
29:00
are you asking me let's do it yeah do you have any suggestions for cursor rules or how we can dynamically generate
29:05
some of these things what kind of rules do you find yourself making i don't use any rules this is a hot take i don't
29:11
think cursor rules matter that much i think what matters is knowing your codebase and providing good context and
29:18
giving it tactical things to work on i think all this stuff around like oh we needed to know all of the design
29:25
patterns that we have in the company and I wanted to make sure that it formats lines this way or I know people are
29:32
trying to do this stuff but I have only found it to drag me down so and I work
29:38
on so many different code bases that I'm not going to go in and make a bunch of curse rules for each one i'd rather just
29:43
rely on the LLMs getting better so yeah I don't really use cursor rules mcps I
29:49
think I have used some i've used some but honestly even that call me a boomer
29:56
but I will straight up just go to a doc site literally copy the entire docs page
30:01
paste it into context and be like "Yo here's the here's all the API docs for I
30:07
can't believe I'm saying instructor again." I use instructor literally all the time so it's like a real That's how we met this is the context setting i I
30:13
think instructor is the only AI tooling that actually matters to me i think all
30:18
I don't use a ton of other stuff so I just good example for me but I had to do something with Twilio recently right so
30:25
I literally just copied Twilio like all the docs for a certain page and I just said here's here you go can you can you
30:31
do something with this and it tends to work pretty well for me i did it with slidebe okay so this entire presentation
30:38
I wrote it in slidebe which is like a markdown slide generator and it was
30:43
because I just thought okay I'd rather for lack of a better word like vibe prompt my way through writing the slides
30:50
maybe you should show slide view a little bit because I say this only because I feel like I have to make so many presentations and slides have been
30:57
really valuable but maybe we can do this at the end maybe I can here I can share my screen with the Hold on let me stop
31:02
sharing and I'll share once I get the cursor back on with the thing on oh there's way more people on here than I thought
31:14
okay might take a second to load sorry guys yeah I'll do a follow-up question
Using AI for Code Maintenance
31:19
which is I work with the code base and spend a lot of time maintaining code and fixing bugs and less time writing new code how do you think of using AI in
31:26
this case what was the question sorry
31:32
how much time do you spend using AI to do like code maintenance and like bug fixes versus like writing net new code i
31:38
think for me I most of my code is maintenance really almost none of mine is I mostly
31:43
work on new products and new features i don't really I do have to touch a lot of
31:49
legacy code so I have to understand code very quickly so it's important by the way do you mind zooming in on your
31:54
cursor so people can see a little bit better oh yeah sorry guys i have tiny font sizes
32:00
so this is basically like the entire presentation you can make like divs and
32:05
using markdown i made all of the diagrams like this with Yeah so all the
32:10
code examples are in here as well it's pretty nuts what you can do honestly this is a good example so let's see if I
32:16
can show the prompts so is it in here oh my god all the
32:22
prompts are gone see this is the thing with cursor sometimes all the prompts are gone okay anyways
32:29
I think this is a really important question actually can you share your practice on how you use like onboard on a new codebase
32:36
it's a good question so typically the way my like applied AI stuff works is
32:42
we'll figure out some problem that we want to deliver in a month it's usually scope to a month so I'll go to the
32:47
company I'll say uh what is the problem we're trying to solve and a lot of the time is spent on what is the actual
32:53
problem that we're trying to solve what are the systems that we need to integrate with and then typically the
32:58
it's like a SWAT team basically where I'll make a shared Slack channel it's
33:03
just me the CTO two staff engineers and the like the most senior S sur at the
33:08
company basically and that's all the people that are allowed to be in the channel and I'll just talk to them about like how the system works I'll ask them
33:16
questions then I'll do an exploration with cursor I'll just say here's the director I'm looking at can you like
33:23
look at the directory tree structure basically explain what's going on in here tell me what relevant files I
33:29
should read basically and I'll start even being like these are things I'm thinking about building what files should I look at and I'll do that for
33:35
like several hours sometimes it works pretty well for me but I'm still definitely relying on other people at
33:41
the company that know the code bases i'm not claiming that I can just go into a codebase that I have no context on and
33:47
just use cursor to figure it out i don't think that's very realistic and that's not actually a necessary expectation is
33:53
my take make sure to post another link one more time there's been a lot of new questions but I just want to make sure hey are you open to sharing the slides
33:59
on GitHub at some point oh these uh sure why not cool i think I would love to
Machine Learning and Data Science Workflows
34:06
answer this question just because it's really close to me which is any advice on doing machine learning and data
34:12
science workflows a lot of it for me is it has been like replacing a lot of the boiler code of experimentation right
34:19
there's no reason you shouldn't be having like really nice plots right it's look at the CSV file write the map plot
34:26
lib code yeah make it really good it'll have a legend it'll color code things include the include the dot size as
34:32
another variable it'll go do that great propose new hyperparameters like I I trained one model but actually I want
34:37
you to set up the hyperparameter parameterization optimization those are
34:42
small things whereas code I wouldn't want to do maybe I write the code in a for loop and then now there's too many things great use multi threading go and
34:50
it will really help a lot of the processing but a lot of it at least for the data science of machine learning is just the fact that you really have no
34:56
excuse not to have really good data visualizations at this point in Python I would have a map plot lib thing but now
35:04
if it's really important like I had a client of mine that we realized we could do some kind of like revenue calculation historically I would have
35:10
shown them a plot But instead he just said make a small React app that is this like pricing
35:18
calculator and now we have just like a data visualization tool and it took it would have taken me the same time to make this like React app than it would
35:25
have me use pandas and make a lot of data visualizations and that has been
35:30
like probably the highest impact thing I've been able to do with the cursor at least on the data science side which is
35:36
just more communication more data visualizations yeah you mentioned you don't use that many MCPS are there any
35:43
tools you wish did that did exist for something like Curs i know the client Oh yeah it would be great to have this GitHub comments
35:49
thing if anyone from GitHub is here let me know i want to get that fixed oh yeah
35:54
mcp that just pulls the file line number and the comment it should be a trivial fix from them i don't think it's like a
36:00
big I just I don't know anyone there i think one thing actually a company is anyone from Relay here i'm working with
36:06
them but they're looking at basically connecting Figma into cursor like a
36:12
little bit better i've been reading about it over the last few days to see if you think like V0 and like
36:19
lovable are on one side of the spectrum and then you have like manually coding basically on the other side of the
36:25
spectrum i think and cursor is somewhere here i think you want something in
36:30
between v 0ero and cursor where you can give it a design and say hey here's our
36:36
design system here's our components and I need you to just generate an initial
36:42
setup for the UI for this in React and I think that would be super useful honestly I just think I don't know if
36:47
we're there yet I don't know if the tools are there yet I feel like we will get there over the next couple years maybe less but that's a thing I'm very
36:55
interested in I am also very interested in better tooling around MCPs for
37:02
proxying i think they're like not great for security so like it's very difficult for me to advocate for using them for
37:08
like production oh you know what there is an MCP client that inspects network logs
37:13
oh yeah really interesting yes I think that has been useful or there's an MCP that can get the Chrome console
37:21
okay yeah so you can like do like dev tools like inside your single instance i know windsurf for example has a browser
37:27
tool that opens a browser in windsurf and then you can select divs and then put them back into the prompt like I
37:34
would love that for a slide v thing i think a particularly useful trivial one is like the postgress one that exists
37:41
where you just connect it to postgress and you say hey can you give me an example of something in a database that like fits this filter that's like super
37:47
useful for building things right you that's something that you're going to have to go open oh my god every time I
37:52
have to open the Postgress terminal log in query the first thing copy it i'm in
37:58
T-Max so like the copying doesn't work and then I paste it back it's just such a pain honestly oh this is a good
38:04
question I want to ask Ashley when do you choose not to use cursor
38:12
basically never at this point i had to write code manually out of one one of my projects recently i had to be like "Okay
38:18
cursor is not working three times i have to type it now and I even at this point
38:23
if I have to do even like a rename a variable in one place I'll still use cursor for it." I just think
38:31
no I'm insane because I just think the staying in the flow state my text cursor
38:37
is never in the code area anymore it's always only navigating on the left or
38:43
it's in the right side like instruction window thing and maybe I'm like on the extreme crazy end of this but I just
38:50
would rather believe that the LMS are only going to get better the tools are only going to get better so there's
38:56
almost no situation where I say I can't break down the problem enough to use cursor to do it it like never happens to
39:02
me anymore and I hope it doesn't sound like I'm exaggerating or something it's just really what's going on
39:08
interesting interesting we have 12 minutes left if anyone has any questions maybe you can use the Zoom raise hand
39:14
and you just pitch in anything else i want to make sure there's a lot of comments oh wow a lot of comments i
39:20
didn't read all these sorry yeah there's some like browser tool comments here but yeah if anyone wants to say something
39:26
live feel free to just unmute or raise your hand
39:32
hey and thanks for that really cool to hear i was wondering if you ever run into having to deal with credentials inn
39:41
files and keeping them out because cursor has this whole thing of can
39:46
ignore doc cursor ignore and you can keep your you can keep files out of the
39:51
context but it's nondeterministic so you don't actually have any guarantee that a bit will stay
39:58
out of going to the inference so that definitely happened to me oh yeah it's
40:04
happened to me as well so I have a way of dealing with it but it's I was just wondering okay what's your way of dealing with it i you can put it in like
40:11
the parent directory and then reference it like up a level but it's a pain you
40:18
just want it to be there yeah I'll make a one comment which is I think this is something that needs to happen within
40:24
the IDE warp warp dev for example which is like the AI in your terminal that it knows not to read files
40:34
so I think in I think in the future it'll just be solved by cursor like otherwise we can just prompt it in or have a rule but it feels very silly
40:42
i'm sure someone has a better suggestion than I do here but I I really don't know yeah good
40:52
i was just We have a lot of really good smart people on this call all this stuff has been moving so fast i was just
40:58
curious if there are things like I've seen Taskmaster that I think is an
41:03
example of an npm repo that works fairly well for managing tasks and keeping things on task in my mind I feel like I
41:10
I think Vig expressed it concisely as I'm just relying on the ALMs to get better i see that something like
41:16
Taskmaster might be really useful but I'm hesitant to invest in those kinds of tools or MCP servers just because I feel
41:23
like it might be a temporary fix for a problem but I know we have some folks are actually working in the space on
41:29
these tools does anybody either have experience with Taskmaster or see the
41:34
trajectory for those tools and is it worth investing in bringing those in as part of our workflows just generally
41:41
speaking I guess would be my question nick did you want to say something
Context Management and Task Handling
41:48
yeah I think yeah client like we're working a lot like context management is a challenge it's like an ongoing problem
41:54
for a lot of these coding agents i think there's like a number of ways of solving it i think largely it's the way that
42:02
like what I found works the best for when we're developing client is
42:07
narrative integrity so like every task that happens in cursor or in clin it's
42:12
basically a story might be a very boring story of a lonely code agent helping you write code but everything makes sense in
42:20
the story it's coherent so you have a system prompt that's a setting for the story then you have the task which is
42:26
like the challenge to be overcome and then you have the protagonist which is like the agent helping the user overcome
42:31
this problem and as long as the story kind of makes sense LLM are really good at predicting
42:38
the next token so they'll be able to continue the story which means like getting you closer to that resolution
42:45
but you start running into problems when the story gets convoluted and it starts getting overloaded like this context
42:51
overload so how do you manage that one is having good hygiene around your tasks
42:56
which is creating a new task doing task handoffs things like that unfortunately that's still something you have to do
43:03
we're working out ways of automating that potentially in the future having some kind of orchestration multi- aent
43:09
potentially but right now the best thing you can do is just hand off tasks when
43:15
it when like some kind of discrete workflow is finished you want to hand off your progress over to a new task
43:20
summarize everything that you've done so far with like specific file names and what there is left to do but yeah that's
43:27
actually one of my questions have you guys Unesh or Jason have you guys been
43:32
playing around with context management how do you guys handle that i can go first i try to I modify very large files
43:40
because I actually do a lot of my writing with cursor like what I what I really just do is once I for example
43:46
write a bunch of stuff read all these create a style guide and then create a style guide MD file right okay
43:53
everything that you've learned about the feedback I've given you on color coding parts of these slides add a like slides
44:00
guide MD file okay then I have a conversation where I'm iterating on like the speaker notes and the tone great now
44:06
write like a speaker style guide and then I'll start manually referencing them across the pages so that's one
44:13
thing the second thing is with the to-do lists i basically would tell it to bas
44:18
propose a sequence of PRs and then each PR what are the requirements and I tell it to like work on each PR make the pull
44:24
request and continue what I'll notice is if the to-do lists are too long it will still
44:30
hallucinate right so if I say "Here's a to-do list where I need you to review 35 pages of documentation and make sure
44:37
each one has the same structure because it wasn't before." By like file 15 it's
44:43
like creating new to-do lists for files that don't exist and so at least with the to-do list I guess keeping them
44:50
small is also very helpful and I would rather have five to-do list files one for each PR than while one file that
44:57
contains six PRs where each PR has seven tasks or something like that so that's
45:02
like some of the stuff that I've really figured out on my end i don't know i
45:07
think my take is you can treat it like you're I almost treat it like this is
45:12
something I'd be doing anyways this is maybe a hot take but I think a lot of engineers really like tunnel vision
45:19
there's engineers that just love getting into a dark room and sitting there for
45:24
30 40 hours straight and getting a problem not being asked anything about
45:29
it the entire time they don't want to have to explain anything during that period of time and they're just like
45:35
hope and pray that we will come out at the end with what we want and I think that is a a way to code but it totally
45:43
does not work when you want to use AI assisted tooling because you have to very clearly tell you like what you want
45:49
it to do it to me like a lot of people don't have a ton of experience with pair programming even like pair programming
45:56
you need to be able to explain to a person sitting next to you what's going on in your brain and a lot of people it's very difficult to do that to
46:03
identify these are the tasks I want to do this is the context I want to give this is a skill to build honestly for
46:09
people i learned a lot of this in college i had a couple great professors that taught me these things and I still
46:14
use it now but it's called the design recipe back then in college but I think
46:19
that affects it so to me I'm like we need to get better at that and get
46:25
better at that manually before we start trusting tools to generate a task force and hand off and all this stuff i'm like
46:31
why don't you figure out how to create what tasks are and then see if it's going on the right track before you try
46:37
delegating it more that's my take on the thing honestly

