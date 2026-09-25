source: https://www.youtube.com/watch?v=sb0y5B3LLUA

Introduction and Purpose of the Talk
0:00
This talk is called cursor for staff engineers. And for the most part, I think a lot of people have seen that in
0:05
the past couple of weeks, we've really been a been pushed by tech leadership to just like aggressively adopt AI. But I
0:12
think for the most part, at least what I see on Twitter or LinkedIn, a lot of it has been like fixated on vibe coding.
0:18
And this talk ideally won't be about that. It's not going to be about vi coding. Instead, it's going to be about tackling the pain points that consume
0:24
our time as senior engineers. and mostly he's going to cover how we can automate a lot of these repetitive tedious tasks
0:29
that we all dread and I'm really excited to invite Vic to speak on this. I met him through the AI consulting course and
0:37
I was really surprised to learn like how much you were crushing it through these implementation projects just just using co cursor and so before we start I just
0:44
want to ask what would be the number one thing you want people to take away from the course not from the course from this
0:50
talk. Yeah, it's it's great to meet Jason. Honestly, I he inspired me to get
0:55
into some of this along with a good friend of mine, Luke. They were both doing something similar. That's how I
1:01
got into AI consulting specifically. I think my takeaway would be that even
1:07
real engineers that are working on like real production products can use cursor. I think I see a lot of what's online is
1:15
one of two things. It's either people that are like cursor is just going to AI tools are just going to write all your
1:22
code for you. You don't need engineers anymore. Agents are just going to handle everything. Which I think is a bunch of
1:27
nonsense. And then the other side of it is people that are like, I'm perfectly content with writing all the code
1:34
myself. I think AI is I don't want to use it at all. They're like scared to use it. And what I'm trying to point out
1:39
is if you can get to a place where you find repetitive things or common workflows that you're trying to just
1:46
automate using AI a little bit more, you're still making all the decisions. That's the main thing. You're a staff
1:51
engineer for a reason. And the reason you're a staff engineer is not because you're really fast at typing code or
1:56
something. It's because you're making good decisions about system and training other engineers. That's what it's about. And I think cursor can help you with
2:03
that. So because someone from is from Klein is here. I don't know if anyone from Windsurf is here but this is not
2:09
necessarily like cursor focused. I just use cursor a lot but I think most of the
2:15
talk it's I'm not even going to show a single prompt for the entire talk that
2:20
the because you guys all know how to like prompt things. I don't think I need to teach you that. It's more about I
The New Age Developer: Embracing AI
2:28
think the new age developer, the new age staff developer, how do they need to think about the engineering process when
2:35
AI is involved? That's really how I think about this. So before I start, I'
2:40
I have a lot of friends that work in sales and one thing you do is you just objection handle immediately. So I'm
2:46
just going to go through a list of things that people tell me about why they don't want to use cursor and then
2:52
hopefully that'll clear up some things before I get into the talk. So one is I could code faster because I know the
2:58
code base like back to front because you've been working somewhere for several years or you wrote all the code
3:03
yourself and because you know all of that trying to give cursor all the context is going to make you a lot
3:08
slower than just like prompting. I think even if it's the case that you know a
3:14
codebase like super well, I would argue that actually helps you with cursor
3:19
because then you can point exactly at what you're trying to do, which files to look at, which context to give it. That
3:26
is only going to help you. And I think the other thing that people really underestimate is how long it takes for
3:32
them to type code. Like I had to I don't type code as much as I honestly very
3:37
little nowadays. And the reality is it takes a while. And it's just actually once you time yourself, I think you'd
3:44
realize that you're better off explaining in English what you want the code to say tactically than typing it
3:51
yourself. So that's one thing I would say. Another is it does too much. It makes a lot of mistakes. Uh I think that
3:58
largely has to do with what you're trying to get cursor to do for you. I
4:04
think if you're more clear about here are stepby-step things I want to
4:09
actually get done instead of just saying I need you to build this new endpoint that it has no idea how to do. That's
4:15
just not going to work very well. And mistakes I think is yeah it's inevitable that tools are going to make mistakes. I
4:22
think how I look at it is like actually use all the systems that we've built
4:28
over the last 30 years in software engineering. Use Git. get to a place where your code's in a decent state, you
4:35
can use cursor to try something and if it doesn't work, you just reject it or you can try again. So, I think if it
4:41
makes mistakes, that's fine. My take is a huge mistake I see people do is
4:47
they'll try a prompt once and then it'll fail and then they'll just go back to
4:54
writing the code. And my argument is you should try five times. like you should try five times in the same context
5:00
window, you should open a new context window and try again. And the argument is first of all it might be faster.
5:07
Second of all, the more you push yourself to do that and you believe in cursor to I know it sounds ridiculous,
5:13
but the more you believe in the system, I think you're going to get better at finding prompts and patterns and things.
5:20
It'll be in your brain to do more complex things over time. So that's very
5:26
important. And the second thing is you can as a staff engineer part of your job is to train other people. And I think
5:33
the more you can learn how to use AI, you can teach that to the rest of the
5:38
team, which is super valuable and important, especially for like more junior engineers. I'm still learning
5:44
what kind of advice to give them nowadays. So I think learning these tools is important for that. Only works
5:50
if you're working on a new codebase. This whole talk is going to talk about things that work on existing code bases
5:55
and production codebases. That's all the work I do. I usually do two or three implementation clients a month and I
6:02
have a few advisory clients as well. So these are all things that these examples are things I've done in the last month.
6:08
Takes away the joy in writing code. I have heard this argument more
6:13
recently from people. At the end we'll have 20 minutes for questions. So this is you can let me know. But I think the
6:21
people that love writing code can still love writing code. I just
6:27
don't think that's what matters when you have a job. I think in the industry the thing that's going to matter more than
6:34
ever is results. And results is often like shipping things that matter to people. So if AI can help you do that, I
6:43
would just or reorient yourself around that is what I enjoy doing. And in a
6:48
way, it's actually made me love coding ever even more than I used to, honestly. All this stuff. Last is people love
6:55
Neoim. Okay, I'm gonna go I use Neoim for 10 years. My good friend Mark is here. He was the one that kind of got me
7:01
into some of this stuff as well. But yeah, if you want to use Neoim, fine, go
7:07
for it. But I think the times are changing. I'm just like unconvinced that I know the guy like Yaine or whatever on
7:13
Twitter says he has a Neoim setup that works perfectly. I'm unconvinced. So
7:19
anyways, this is as McKenzie as this talk will get. I wanted to give you a three-step thing that I actually use.
Three-Step Framework for Using Cursor
7:26
This is not something I made up. This is how I actually think about using cursor. And I'll repeat this within the talk. So
7:33
explore is basically a phase where you want to tell cursor like what context it
7:39
needs to know about the problem you're trying to solve. What is the problem you're trying to solve? come up with options with it of what you could do,
7:46
how you could build it. Plan is mostly about let's actually pick an option and
7:52
figure out step by step how we're going to go about doing this, especially for a task that ends up like getting pretty
7:59
big. You want to do that because otherwise you're going to end up telling us to do way too much at once. That's a
8:05
very important step. Third is build. build is often times you once you plan,
8:12
hey, this is a step I want to do. You can just tell cursor, let's do one step of it, I'll review it. And you can think
8:18
of it almost like you're reviewing a PR from like an intern or something. You want to give it a small step. And when
8:25
you review it, maybe you have to make some edits. Maybe you have to prompt it a little bit. Maybe you have to go into
8:31
the code and change it yourself. Maybe you have to try again. But that is that's all like understandable and
8:37
acceptable. What I'm going to do is instead of just giving you like a highle framework, I'm going to give you examples three examples of things that I
8:45
actually do dayto-day. So these are things that I've done in the last week or two I think. So one is test room
Example 1: Test-Driven Development with Cursor
8:53
development. So how do you use cursor to write better tests? The reason why I
8:59
think this matters is one, I don't know very many engineers that love writing
9:05
tests. They're very important. If you work at a startup, I think it's typically the first thing that gets cut
9:11
is writing tests. If you work at a large company, they're very important. And I would argue that cursor can help you
9:16
write better tests. So that's really what we're going to cover. The way I look at cursor in the explore
9:24
phase is you need to share context about which files you want to actually test.
9:30
So let's say you have an SDK that you want to test. What I would do first is
9:35
I'd tell cursor, hey, here's like the folder or here's the file that I'm trying to test. Here's the entry points.
9:42
Can you look at this file and tell me which other dependencies, other things I need to look at to to basically figure
9:50
out what is the right things that we need to test? What are the types of tests that we can build? And I I'll let cursor do this on its own once, but if
9:58
it doesn't work as well as I would expect, I will tell it straight up, here are the files I need you to look at.
10:03
Here's similar tests I want you to build against. And then you can talk with the agent. You can literally be like, "Hey,
10:10
I think we should build these types of tests. Like, what are other edge cases I should consider?" It's super useful
10:16
because I almost treat talking to LLMs now like having a team of staff
10:22
engineers that all understand your codebase like reasonably well and are domain experts and like things that you
10:28
don't know about. That's largely how I use LLMs now when I'm coding. So, that's
10:34
like the first step. You just want to come up with ideas. You want to think about what are the types of things I want to test. The second thing, this is very
10:42
important, is you want to actually create a plan. And the I'll show you an
10:47
example of what the plan looks like. I I have some screenshots of what the plan looks like. But the way I look at it is
10:54
if you tell cursor, okay, cool. You figured out what we should test, how we want to test it, all good. Just go ahead
11:02
and do everything. the agent. I have yet to see that work properly. And I know
11:07
there are companies out there that are trying to like solve this problem. I think like Devon is trying to do
11:12
something. My understanding is they're doing something similar to this except in an automated way, but I yeah, I
11:19
literally like there's a question, but I don't use like an MCP for this or anything, but I'm literally just
11:27
creating a markdown file myself. I tell it, hey, create a step-by-step plan for this and save it to a markdown file and
11:35
I put like checklists on it basically so that it knows when it goes back and looks at it how far it is, what steps it
11:42
needs to do still, all of that. And the good thing about this is let's say like you, I don't know, you open a new
11:48
context window, you can just give it the markdown file and it'll generally be able to figure out like how far it is if
11:55
you like restart your computer, whatever the reason is. So here's like an example
12:00
of this. This is not the exact problem I was working on for a company recently, but let's say you need to build like a
12:05
schema validator. And the schema validator is for products. Products have
12:10
different attributes on them. And all the attributes are stored in a database table where it's essentially like the
12:18
org ID, the the attribute name, and then the type of the attribute is all saved
12:23
in one place. And you need to take all of those and create basically like a zod object or like a pideantic object that
12:30
you can use to validate the schema. And this is super relevant for especially in the LLM world where if you use something
12:36
like constructor, you need to pass in these types to get structured output back. And honestly, I think it's very
12:43
important to get good testing around these types of things otherwise it's just going to break your app. So what
12:48
I'll do is I'll I'll say hey I already have this file. I already have this
12:53
product utils file that generates these schemas for me. Can you come up with a plan for me? Let's come up with a plan.
13:00
And I'll talk back and forth. Once I talk back and forth and I'm like generally on the same page with it, I'll
13:06
tell it, okay, come up with a plan. And this is kind of like step one, right? Step one is just setting up the mocks
13:13
for it that mocks all the database utils. It mock it like puts in the dependencies it needs. It creates the
13:19
file. So that's kind of like step one. And once it's done, you'll see like little check marks on all of
13:24
it. Then this is like the second step where it says, "Hey, we need to actually create those helper functions. We need
13:31
to create the mocks. We need to do this." And it'll start doing that based on the actual type system. This is why
13:38
TypeScript is so good for for in the cursor world. Types TypeScript good linting all of these things. It just
13:44
helps it know how to build things properly. And this is an example of a step that's
13:50
not completed yet. We need to actually write tests for each of these different schema creations like booleans, numbers,
13:56
datetimes, and we'll need to test all these different edge cases. And I'm not telling you that an engineer can't like
14:03
actually go do this on their own. What I'm saying is that there's no reason for you to write all of this on like by
14:10
yourself anymore. I just don't think that there's like a good justification for it. Think about the amount of time
14:16
it might take for you to write all these tests yourself. At best, you can maybe leverage yourself by delegating it to
14:22
someone else, but I'm not like a huge fan of that. I think like in the world we're in, we're going to have to all
14:28
figure out how to be more productive like individually. So, that's how I think about it. When you apply the steps
14:36
one by one, that way you can make little adjustments. If anything's not working, you can make little changes. And the
14:43
biggest thing is you got to commit all this to git. If you just try to go through all the steps at once and then
14:49
it doesn't work. Cursor checkpoint stuff is just not good. And it's just not set
14:55
up for this type of thing. I'm a very big fan of git. I love git and I think it's no different. You should just
15:01
continue using that. I would just update the plan file as you go. Yeah, really believe in git is my number one feedback
15:08
on all this. So the takeaways here the tests actually get written like honestly if you work in
15:14
startup like tests sometimes just don't happen it even if you get interrupted you have to go back lose all the context
15:22
you don't have to rebuild all that context it lives in the plain doc and then the other thing is this is great if
15:27
you if you want to write tests before you write the code I think that's the thing that we've lost as an industry
15:32
because it's so annoying to do it but if you create all the interfaces you describe what you actually want to build
15:39
first and you create a little test for it. That's even better. I think that's great. But an alternative is let's say
15:45
you have a area of your codebase that has no testing. I think this is another way to explore. Okay, how do I figure
15:52
out what this code is doing? I think writing tests is a really great way. Okay, so another example is load
Example 2: Load Testing with Cursor
16:01
testing. So as a staff engineer, one thing that you need to be able to do is
16:08
really understand the system that you're actually working with. You need to be able to understand what are the
16:14
constraints I have, what are the performance characteristics of it, what is it that we're trying to optimize for.
16:20
And honestly, I think this is also work that's really hard to justify sometimes
16:27
like to to management and stuff like that, but it's really important and very hard to delegate. What I found is that
16:34
cursor helps me actually do this type of work very quickly. I can time box it.
16:40
Basically say, all right, I have 15 minutes. I want to understand this code base a little bit more and present an
16:45
insight to the team. So the way I look at it, this is another problem we were working on recently. So
16:51
VLM is like an inference engine. So if you're deploying a model on your own VPC
16:56
instead of using OpenAI or something, you basically need to use something like VLM to actually run inference. So in our
17:04
case because we were running this we didn't have a great understanding yet because we were new to it of what are
17:11
the performance characteristics how many requests should we be handling at once um what is like a reasonable cut off
17:18
before we need to scale up or scale down so that the users are like not getting performance degradation what is like the
17:26
tokens per second all these things that we want to understand the reality is these types of
17:32
load testing scripts are different for every system, for anything that you want to test. I've seen companies try to make
17:39
like utils and stuff for this to share some of it over time so that it can be reusable. I've never seen it work. It
17:45
ends up as scripts that are manual every single time. So that's fine because now
17:51
you can use cursor to rip these out way faster. So, one thing I would do is you
17:58
don't really need to plan that much for this because it's largely a throwaway script or it's just something that maybe
18:04
lives in the repo and you're not going to be editing that much. It's not something that's going to production
18:09
necessarily. It's working with a production system. It's not going to production. So, I wouldn't use the giant
18:15
markdown planning file for this. I don't think you need that. But I think you can still use cursor come up with things
18:22
that you might want to test about the system. I think that's what cursor can be useful for is treat it like another
18:29
staff engineer on your team that you're just like pair programming with or thinking through ideas with. I think it
18:34
can be really useful for something like that. And the actual process for building is stuff that you know how to
18:41
write code for anyways. It's really just okay we need to set up multiple threads for the system. And this is an example
18:47
that we went through. These are like seven examples of things that we added to the system over time. You need the
18:52
initial setup for the script. Here's the endpoints. You add this to the context. You say, I want to call this endpoint
18:58
with this many threads at one time. You set that up. Then you say, all right, I want to maybe call this with a
19:04
configurable number of threads at a given time to see how the performance is. Once you actually figure that out,
19:09
you need to start collecting timing data. So you need to know, hey, what's the tokens per second on on each of the
19:15
threads? you need to like start tracking that somewhere. Maybe you want to see at
19:21
any given time as it's completing you want to see that live in the CLI. Maybe you want to measure, okay, I have 10
19:28
requests. Does that does the tokens per second of the whole system increase while each thread decreases? These are
19:35
things that generally you would want to know about the system, but that you're limited by the actual time you have to
19:41
write the code and explaining it to someone else might not be like super worth it. So the way I think about it
19:48
now is you're no longer limited by writing the code. You're limited by the ideas you have that you want to test.
19:55
And secondly, it'll actually get done because I don't think you need to go
20:00
into your standup meetings anymore and be like, "Hey, I'm going to spend a day or two back and forth. I'm going to be
20:06
I'm going to be setting up a load testing script." You don't have to prove that to all the VPs and stuff anymore.
20:11
You just spend 15 minutes doing this. See if you get anywhere with it. And if you get somewhere, maybe then you can go
20:16
back to them and say, "Hey, this is this was super valuable. Maybe we should be doing this more often." Whatever it is, that kind of experimentation, I think,
20:22
is super valuable. And the other thing is as a staff engineer, you really do need to know the context on the system.
20:30
You need to know how your system works. I think this is true at the director and manager level too, but the talk isn't
20:36
really for them. As a staff engineer, you own the system ultimately. So, if
20:42
you're not doing this, who is going to be? That's my take on it. Another kind
20:47
of So far I've given you an example of something that needs to integrate directly into a system, unit testing. A
20:53
second example is working on top of an existing system. So load testing, building a script on top of it. This one
Example 3: Automating PR Comments with Cursor
20:59
is more of like a workflow. Everyone's getting PR comments. So you have PR reviews. You're you have comments being
21:05
given to you. I think most people hate getting nit comments like, "Oh, the
21:11
change the padding to five pixels or hey, can you like move this file here or
21:16
rename this or whatever?" All those little details. I've never liked dealing with that stuff. I just always hate it.
21:23
But I think most of it is relatively trivial for for some kind of co-pilot to
21:29
handle nowadays. So, my process, and you're going to think I'm crazy, but it's I'll explain why I do this. I
21:36
literally go into GitHub, I screenshot every single PR comment as an im with as an image with and I make sure that the
21:43
file name and all that is in the screenshot. Then I drag and drop all of
21:49
those and no, you can't do GitHub PR view comments because it doesn't have the line numbers and stuff. Trust me. So
21:56
I then put all of that into a single c cursor context and I say, "Hey, I need you to go ahead and just list out what I
22:04
gave you so far." and I like verify that the OCR and all that are good. Doesn't
22:11
I'll answer questions after. So the PR comments then I ask it to group all the related changes and I say just once
22:18
you've grouped everything make a planning file and I put all the file name the line number and just the
22:25
comment itself. I don't I don't do any I don't do anything of figure out how to fix this yet. This is all about just
22:30
storing the context in a single place. And the last thing is I say, "Hey, go
22:36
read the planning file and read each one by one." And the agent at this point
22:42
will be able to say, "All right, this is this line number in this file." It'll look up that file for context. It'll
22:48
find all the relevant other files that it might need. And it'll like generate that and all the small little details
22:54
are so easily fixed nowadays, like trivial to fix. and I just get commit
23:00
those and then I just update the planning docka. It's like not a big deal. But the second thing is that
23:06
larger changes you might just need to do some prompting work on your own or you might have to go in and edit yourself.
23:13
But honestly, if you're saving like 70% of your time, for me it feels like way
23:19
more than that. I did see a point that it's good to propose a solution. I think that's great. But like at this point I'm
23:25
like you should propose. I think you just if this was like automated somehow.
23:31
I think that's totally fine too. But I'm like not convinced that we're that close to being able to do it. I have heard of
23:37
other people doing things like JSON actually apparently has a way to do the git
23:43
commands in cursor itself so that it'll create stacked PRs for you based on all
23:49
the PR comments. I am not convinced that giving Git access to a cursor agent is a
23:54
good idea as maybe you saw when it deleted all of his code one day. So, I'm not there yet, but maybe we're getting
24:00
there. Yeah, the takeaway is really you want to focus on the stuff that actually matters. Everyone's going to get annoyed
24:08
about nit comments and little things, but if you don't have to think about them anymore, then it's not an issue.
24:14
Now, maybe someone in the comments has a better way to do all this with the API and MCP. If you do, you can tell me.
24:19
Trust me, I'm always willing to learn things, but I have yet to figure out how to do it. So, I literally just
24:24
screenshot things. I'm not gonna not gonna get bogged down by MCPS if I don't need
24:29
to. That is a list. Those are three things that I've done with cursor. I'm just trying to give you examples of how
24:36
you can start thinking about using this day-to-day. But here's like a giant other set of things that I've used
24:43
cursor for over the last two or three really cursor and LLMs generally. Cursor
24:49
really I've only been using for a little over a year. But this is the only reason I can do what I do as an independent
24:56
consultant. There's just no way I could continue doing implementation clients and work with me as many people I'm
25:02
working with and especially going into new code bases every single month and I have to learn them very quickly. And
25:09
what I'm showing you is what I do. I have no reason to. I have all incentive to only be honest with you. I'm trying
25:15
to be like the most honest person talking about using cursor on the internet. So that's my take. Jason, do
25:23
you want to cover from here a little bit? Yeah. So what we're probably going to do is I just I left a link in the
25:30
chat. We can probably leave some comments. We can upote them, stuff like that. And then one thing I just wanted
25:36
to call out too. I only saw this recently, but on March 27th, this article came out that kind of
25:42
blew my mind where Airbnb used AI to finish 18 months code migration in just 6 weeks. And again, it it's basically
25:49
exactly what you did with propose, make a plan, run tests, take the errors, reiterate, reiterate. And yeah, it was
25:55
mind-blowing to see how things are done. But yeah, if you have any questions, leave them in the slidoh. And another
26:02
thing that someone had asked was, do you have any demos? I know it's probably hard to share production code just because it's you have I know you have
26:08
five laptops but what would the demo be like I would share like this is what I was wondering like I
26:14
share prompts like I share like these are prompts I did or because ultimately I think I'd have to live stream myself
26:22
like writing code I think maybe what I could do is ask Jason what's a PR that needs to be written instructor and then
26:28
just sit there and live stream me doing it for an hour or something. I mean a
26:33
lot of the work instructor has been documentation these days and like reorganizing a lot of the examples to be more like educational. That has been a
26:41
huge huge lift for me. Here's all the concept documentation. Here's the API. I
26:46
want you to propose me a plan of how to organize content in a way that is educational
26:52
and then do it that way. That has been super helpful. It's something there. Honestly, it's interesting once like I
Understanding Cursor's Functionality
26:57
work in applied AI, right? So I understand how cursor works like high level. I feel like I once you understand what it's doing a little bit, it helps a
27:05
lot. Once you realize that a lot of what the agent is actually doing
27:11
is once it creates code, right? It's verifying that it works or not. And
27:17
largely it's relying on like the type system and the llinter and it's just like going back like redoing it over and
27:23
over again. And I think they figured out that people were when cursive phrase first came out, I would generate code
27:29
and then I would run it and it would crunch an error and I would hit the debug button, it would go back and do it, change code. I'd do that over and
27:36
over again until the code ran. And I think that was like the initial vibe coding attempt. And they've gotten a
27:42
little bit smarter about it. But that's what it's doing for the most part. But yeah, demos. I think that's something we
27:48
need to figure out like how can I really I was avoiding demos because I was like
27:54
saying this is a group of staff engineers these are people that have code bases and complex code bases that
28:00
they know better than me and I'd rather give them like a framework of how I think about this and examples and be
28:06
like here's one random codebase that I've worked with that's not even the real codebase because it's under
28:12
NDA I'm gonna fake it basically that was my concern with this thing yeah maybe What we can do is like next time we'll
28:18
just do a lighting lesson that is just pure live coding or something like that. I think that would be pretty useful. We'll just send an email afterward just
28:25
because yeah then we can probably do something that's a lot more let's make some contributions to a to another repo
28:31
ra or make a new like app or something. We can just set aside some time for that. But it does look like there's a
28:36
ton of people who want an exit demo and mostly what I've seen on Maven in the past has been like how should a PM learn
28:43
to use levelable or use cursor. But I think I'm very curious to see how you do these because I know you're probably a stronger developer than I am. I actually
28:49
use cursor a lot for doing data analysis and research rather than spin up an entire app from scratch. But I think we
28:56
have enough questions and up votes. So do you want to jump into some questions? Are you asking me? Let's do it. Yeah. Do
29:02
you have any suggestions for cursor rules or how we can dynamically generate some of these things? What kind of rules do you find yourself making? I don't use
29:09
any rules. This is a hot take. I don't think cursor rules matter that much. I think what matters is knowing your
29:16
codebase and providing good context and giving it tactical things to work on. I
29:21
think all this stuff around like, oh, we needed to know all of the design patterns that we have in the company and
29:27
I wanted to make sure that it formats lines this way or I know people are trying to do this stuff, but I have only
29:35
found it to drag me down. So, and I work on so many different code bases that I'm
29:40
not going to go in and make a bunch of curse rules for each one. I'd rather just rely on the LLMs getting better.
29:46
So, yeah, I don't really use cursor rules. MCPS, I think I have used some.
29:52
I've used some, but honestly, even that, call me a boomer, but I will straight up
29:57
just go to a doc site, literally copy the entire docs page, paste it into context, and be like, "Yo, here's the
30:04
here's all the API docs for I can't believe I'm saying instructor again." I use instructor literally all the time.
30:10
So, it's like a real That's how we met. This is the context setting. I I think instructor is the only AI tooling that
30:17
actually matters to me. I think all I don't use a ton of other stuff. So I just good example for me, but I had to
30:23
do something with Twilio recently, right? So I literally just copied Twilio like all the docs for a certain page and
30:29
I just said here's here you go. Can you can you do something with this? And it tends to work pretty well for me. I did
30:34
it with slidebe. Okay. So this entire presentation I wrote it in slidebe which
30:40
is like a markdown slide generator and it was because I just thought okay I'd rather for lack of a better word like
30:46
vibe prompt my way through writing the slides. Maybe you should show slide view a little bit because I say this only
30:53
because I feel like I have to make so many presentations and slides have been really valuable. But maybe we can do
30:58
this at the end. Maybe I can here I can share my screen with the Hold on. Let me stop sharing and I'll share once I get
31:03
the cursor back on with the thing on. Oh, there's way more people on here than I thought. Yeah.
31:14
Okay. Might take a second to load. Sorry guys. Yeah, I'll do a follow-up question
Using AI for Code Maintenance
31:19
which is I work with the code base and spend a lot of time maintaining code and fixing bugs and less time writing new code. How do you think of using AI in
31:26
this case? What was the question? Sorry.
31:32
How much time do you spend using AI to do like code maintenance and like bug fixes versus like writing net new code?
31:38
I think for me I most of my code is maintenance really almost none of mine is I mostly
31:43
work on new products and new features. I don't really I do have to touch a lot of
31:49
legacy code. Yeah. So I have to understand code very quickly. So it's important. By the way, do you mind zooming in on your cursor so people can
31:55
see a little bit better? Oh yeah. Sorry guys. I have tiny font sizes. So this is basically like the entire
32:02
presentation. You can make like divs and using markdown. I made all of the
32:08
diagrams like this with Yeah. So all the code examples are in here as well. It's
32:13
pretty nuts what you can do. Honestly, this is a good example. So let's see if I can show the prompts.
32:19
So is it in here? Oh my god, all the prompts are gone. See, this is the thing with cursor sometimes. All the prompts
32:25
are gone. Okay. Anyways, I think this is a really important
32:31
question actually. Can you share your practice on how you use like onboard on a new codebase?
32:36
It's a good question. So, typically the way my like applied AI stuff works is
32:42
we'll figure out some problem that we want to deliver in a month. It's usually scope to a month. So, I'll go to the
32:47
company, I'll say, uh, what is the problem we're trying to solve? And a lot of the time is spent on what is the actual problem that we're trying to
32:53
solve? what are the systems that we need to integrate with and then typically the it's like a SWAT team basically where
33:01
I'll make a shared Slack channel it's just me the CTO two staff engineers and
33:06
the like the most senior S sur at the company basically and that's all the people that are allowed to be in the channel and I'll just talk to them about
33:13
like how the system works I'll ask them questions then I'll do an exploration
33:18
with cursor I'll just say here's the director I'm looking at can you like look at the directory tree structure
33:25
basically explain what's going on in here. Tell me what relevant files I should read basically. And I'll start
33:31
even being like these are things I'm thinking about building. What files should I look at? And I'll do that for like several hours sometimes. It works
33:37
pretty well for me. But I'm still definitely relying on other people at the company that know the code bases.
33:43
I'm not claiming that I can just go into a codebase that I have no context on and just use cursor to figure it out. I
33:48
don't think that's very realistic and that's not actually a necessary expectation is my take. Make sure to
33:54
post another link one more time. There's been a lot of new questions but I just want to make sure. Hey, are you open to sharing the slides on GitHub at some
34:00
point? Oh, these uh sure why not. Cool.
Machine Learning and Data Science Workflows
34:05
I think I would love to answer this question just because it's really close to me which is any advice on doing machine learning and data science
34:12
workflows. A lot of it for me is it has been like replacing a lot of the boiler code of experimentation, right? There's
34:19
no reason you shouldn't be having like really nice plots, right? It's look at the CSV file, write the map plot lib
34:26
code. Yeah, make it really good. It'll have a legend. It'll color code things. Include the include the dot size as
34:32
another variable. It'll go do that. Great. Propose new hyperparameters. Like I I trained one model, but actually I
34:37
want you to set up the hyperparameter parameterization optimization. Those are
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
calculator. And now we have just like a data visualization tool. And it took it would have taken me the same time to make this like React app than it would
35:25
have me use pandas and make a lot of data visualizations. And that has been
35:30
like probably the highest impact thing I've been able to do with the cursor at least on the data science side which is
35:36
just more communication more data visualizations. Yeah. You mentioned you don't use that many MCPS. Are there any
35:43
tools you wish did that did exist for something like Curs? I know the client Oh, yeah. It would be great to have this GitHub comments
35:49
thing. If anyone from GitHub is here, let me know. I want to get that fixed. Oh, yeah. MCP that just pulls the file
35:56
line number and the comment. It should be a trivial fix from them. I don't think it's like a big I just I don't know anyone there. I think one thing
36:03
actually a company is anyone from Relay here? I'm working with them, but they're looking at basically connecting Figma
36:10
into cursor like a little bit better. I've been reading about it over the last few days to
36:16
see if you think like V0 and like lovable are on one side of the spectrum
36:21
and then you have like manually coding basically on the other side of the spectrum. I think and cursor is
36:27
somewhere here. I think you want something in between v 0ero and cursor where you can give it a design and say
36:35
hey here's our design system here's our components and I need you to just generate an initial setup for the UI for
36:43
this in React and I think that would be super useful honestly I just think I don't know if we're there yet I don't
36:48
know if the tools are there yet I feel like we will get there over the next couple years maybe less but that's a
36:54
thing I'm very interested in I am also very interested in better tooling around
37:00
MCPs for proxying. I think they're like not great for security. So like it's
37:06
very difficult for me to advocate for using them for like production. Oh, you know what? There is an MCP client that
37:11
inspects network logs. Oh yeah, really interesting. Yes, I think that has been useful. Or there's
37:17
an MCP that can get the Chrome console. Okay. Yeah. So you can like do like dev
37:23
tools like inside your single instance. I know windsurf for example has a browser tool that opens a browser in
37:29
windsurf and then you can select divs and then put them back into the prompt like I would love that for a slide v
37:36
thing. I think a particularly useful trivial one is like the postgress one that exists where you just connect it to
37:42
postgress and you say hey can you give me an example of something in a database that like fits this filter. That's like
37:47
super useful for building things, right? You that's something that you're going to have to go open. Oh my god, every
37:52
time I have to open the Postgress terminal, log in, query the first thing,
37:57
copy it. I'm in T-Max, so like the copying doesn't work. And then I paste it back. It's just such a pain,
38:02
honestly. Oh, this is a good question I want to ask Ashley. Yeah.
38:08
When do you choose not to use cursor? Basically, never at this point. I had to
38:14
write code manually out of one one of my projects recently. I had to be like, "Okay, cursor is not working three
38:19
times. I have to type it now and I even at this point if I have to do even like
38:24
a rename a variable in one place, I'll still use cursor for it." I just think
38:31
no, I'm insane because I just think the staying in the flow state, my text
38:36
cursor is never in the code area anymore. It's always only navigating on
38:42
the left or it's in the right side like instruction window thing. And maybe I'm like on the extreme crazy end of this,
38:49
but I just would rather believe that the LMS are only going to get better. The tools are only going to get better. So
38:56
there's almost no situation where I say I can't break down the problem enough to use cursor to do it. It like never
39:02
happens to me anymore. And I hope it doesn't sound like I'm exaggerating or something. It's just really what's going on.
39:08
Interesting. Interesting. We have 12 minutes left. If anyone has any questions, maybe you can use the Zoom
39:14
raise hand and you just pitch in anything else. I want to make sure there's a lot of comments. Oh wow, a lot
39:19
of comments. I didn't read all these. Sorry. Yeah, there's some like browser tool comments here, but yeah, if anyone
39:25
wants to say something live, feel free to just unmute or raise your hand.
39:32
Hey, and thanks for that. Really cool to hear. I was wondering if you ever run into having to deal with credentials inn
39:41
files and keeping them out because cursor has this whole thing of can
39:46
ignore doc cursor ignore and you can keep your you can keep files out of the
39:51
context but it's nondeterministic. So you don't actually have any guarantee that a bit will stay
39:58
out of going to the inference. So that definitely happened to me. Oh yeah, it's
40:04
happened to me as well. So I have a way of dealing with it, but it's I was just wondering. Okay, what's your way of dealing with it? I you can put it in
40:11
like the parent directory and then reference it like up a level, but it's a
40:18
pain. You just want it to be there. Yeah, I'll make a one comment which is I think this is something that needs to
40:24
happen within the IDE. Warp warp dev for example, which is like the AI in your terminal that it knows not to read
40:31
files. So, I think in I think in the future it'll just be solved by cursor. Like
40:37
otherwise, we can just prompt it in or have a rule, but it feels very silly.
40:42
I'm sure someone has a better suggestion than I do here, but I I really don't know. Yeah, good.
40:52
I was just We have a lot of really good smart people on this call. All this stuff has been moving so fast. I was
40:58
just curious if there are things like I've seen Taskmaster that I think is an
41:03
example of an npm repo that works fairly well for managing tasks and keeping things on task. In my mind, I feel like
41:10
I I think Vig expressed it concisely as I'm just relying on the ALMs to get better. I see that something like
41:16
Taskmaster might be really useful, but I'm hesitant to invest in those kinds of tools or MCP servers just because I feel
41:23
like it might be a temporary fix for a problem. But I know we have some folks are actually working in the space on
41:29
these tools. Does anybody either have experience with Taskmaster or see the
41:34
trajectory for those tools and is it worth investing in bringing those in as part of our workflows just generally
41:41
speaking I guess would be my question. Nick, did you want to say something?
Context Management and Task Handling
41:48
Yeah, I think yeah client like we're working a lot like context management is a challenge. It's like an ongoing
41:54
problem for a lot of these coding agents. I think there's like a number of ways of solving it. I think largely it's
42:01
the way that like what I found works the best for when we're developing client is
42:07
narrative integrity. So like every task that happens in cursor or in clin it's
42:12
basically a story might be a very boring story of a lonely code agent helping you write code but everything makes sense in
42:20
the story. It's coherent. So you have a system prompt, that's a setting for the story. Then you have the task which is
42:26
like the challenge to be overcome. And then you have the protagonist which is like the agent helping the user overcome
42:31
this problem. And as long as the story kind of makes sense, LLM are really good at predicting
42:38
the next token. So they'll be able to continue the story, which means like getting you closer to that resolution.
42:45
But you start running into problems when the story gets convoluted and it starts getting overloaded like this context
42:51
overload. So how do you manage that? One is having good hygiene around your tasks, which is creating a new task,
42:57
doing task handoffs, things like that. Unfortunately, that's still something you have to do. We're working out ways
43:04
of automating that potentially in the future, having some kind of orchestration, multi- aent potentially.
43:10
But right now, the best thing you can do is just hand off tasks when it when like some kind of discrete workflow is
43:17
finished. You want to hand off your progress over to a new task. Summarize everything that you've done so far with
43:22
like specific file names and what there is left to do. But yeah, that's actually
43:28
one of my questions. Have you guys, Unesh or Jason, have you guys been playing around with context management?
43:34
How do you guys handle that? I can go first. I try to I modify very large
43:39
files because I actually do a lot of my writing with cursor. Like what I what I really just do is once I for example
43:46
write a bunch of stuff read all these, create a style guide and then create a style guide MD file. Right? Okay.
43:53
everything that you've learned about the feedback I've given you on color coding parts of these slides. Add a like slides
44:00
guide MD file. Okay. Then I have a conversation where I'm iterating on like the speaker notes and the tone. Great.
44:06
Now write like a speaker style guide and then I'll start manually referencing them across the pages. So that's one
44:13
thing. The second thing is with the to-do lists. I basically would tell it to bas propose a sequence of PRs and
44:20
then each PR what are the requirements. and I tell it to like work on each PR, make the pull request, and continue.
44:26
What I'll notice is if the to-do lists are too long, it will still hallucinate. Right? So, if I say,
44:32
"Here's a to-do list where I need you to review 35 pages of documentation and make sure each one has the same
44:38
structure because it wasn't before." By like file 15, it's like creating new
44:45
to-do lists for files that don't exist. And so, at least with the to-do list, I guess keeping them small is also very
44:50
helpful. And I would rather have five to-do list files, one for each PR than while one file that contains six PRs
44:58
where each PR has seven tasks or something like that. So that's like some of the stuff that I've really figured
45:05
out on my end. I don't know. I think my take is you can treat it like
45:10
you're I almost treat it like this is something I'd be doing anyways. This is maybe a hot take, but I think a lot of
45:16
engineers really like tunnel vision. There's engineers that just love getting
45:21
into a dark room and sitting there for 30, 40 hours straight and getting a
45:28
problem, not being asked anything about it the entire time. They don't want to have to explain anything during that
45:33
period of time and they're just like hope and pray that we will come out at the end with what we want. And I think
45:39
that is a a way to code, but it totally does not work when you want to use AI
45:45
assisted tooling because you have to very clearly tell you like what you want it to do. It to me like a lot of people
45:52
don't have a ton of experience with pair programming. Even like pair programming, you need to be able to explain to a
45:57
person sitting next to you what's going on in your brain. And a lot of people it's very difficult to do that to
46:03
identify these are the tasks I want to do. This is the context I want to give. This is a skill to build honestly for
46:09
people. I learned a lot of this in college. I had a couple great professors that taught me these things and I still
46:14
use it now, but it's called the design recipe back then in college. But I think
46:19
that affects it. So to me, I'm like, we need to get better at that and get
46:25
better at that manually before we start trusting tools to generate a task force and hand off and all this stuff. I'm
46:30
like, why don't you figure out how to create what tasks are and then see if it's going on the right track before you
46:37
try delegating it more. That's my take on the thing, honestly.