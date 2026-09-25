source: https://www.youtube.com/watch?v=WZ8g6deOyAk


Search in video
Intro
0:00
﻿This app, this app, and this app were all  built without writing a single line of code  
0:04
themselves. But what if I told you that you  could build your own $10,000 app in just a  
0:09
few hours using AI? And to prove it I’m going  to build an app together with you specifically  
0:13
for this video. I’ll show you exactly how you  can use Cursor to build the app, how to use  
What I will cover in this video
0:26
Supabase for the database and the backend,  and how to set up DeepSeek’s API as the main  
0:30
feature of the app. And at the end of this  video I’ll show you how to ACTUALLY upload  
0:33
your app to both the AppStore and Google  PlayStore. I’ve never seen anybody else  
0:36
show the entire process of building apps with  AI here on YouTube, so this video is the ONLY  
0:41
video you will need to get started. Step 1: How to actually find a viral app idea  
How to find a viral app idea
0:46
This is by far the most important step,  and finding a viral app idea is all about  
0:50
solving a real problem in a simple way. But  to do this your idea MUST meet these three  
0:55
criteria and don’t worry though, it’s easier than  it sounds because once you understand these you’ll  
0:57
start seeing opportunities EVERYWHERE! 1. So first of all you need to Identify a  
1:01
Common Problem: find a problem that is extremely  frustrating or emotional, because people download  
1:06
apps to solve their pain points. And remember to  always write down your app-ideas immediately when  
1:10
you come up with them, because if you don’t you’ll  just forget them. And once you have an idea,  
1:14
you can actually chat with ChatGPT and ask  him if he thinks the idea is good or not.  
1:19
2. Keep the App Simple: Your app’s core  functionality should be explainable in 3  
1:24
words or less. Here is a video of Blake  Anderson explaining this very well…  
1:27
3. Make It Shareable: your app  should be so Helpful to the  
1:46
pain point that the users just HAVE to share it. So here’s the app I’m building in this video:  
1:51
After working 20-hour days I realized how  unproductive multitasking actually is.  
1:55
Distractions like emails constantly break my  focus, which means I'm no longer in a flow of  
1:59
deep work. So that’s why I’m creating this  all-in-one productivity tool that helps you:  
2:04
1. 1. Sort and prioritize tasks. 2. 2. Deep work on one task at a time.  
2:08
3. and 3. Chat with an AI to easily  add tasks from the chat.  
Finding App-designs
2:12
Step 2: Find design to copy Let me show you EXACTLY how we're  
2:14
going to structure our app, because this  is where most people Usually Mess up. And  
2:15
we're going to use Mobbin (which also  happened to be the sponsor of this video).  
2:18
So right now I'm in Mobbin, and what you're  seeing is literally a goldmine of 100,000+  
2:22
screenshots from apps like Duolingo, Spotify,  Netflix and alot more. And here's exactly what  
2:28
we're going to do - we're going to steal  their proven designs and User experience,  
2:31
and let Cursor AI turn them into code for us. Because there is literally no reason to try to  
2:36
reinvent the wheel when we have access  to proven app-flows from big companies.  
2:40
[Shows search function] This is exactly what we need.  
2:41
Now pay attention, because this is the exact  process I use to find the designs for my apps:  
2:45
Click on the search bar and go to "App  Categories." Here, you can choose the category  
2:49
that best fits your app. Since I'm creating a  productivity app, I'll select that category.  
2:54
Now, from all these designs, I'm going to pick one  that best fits my app idea and I think this one is  
2:59
the perfect choice. And we're not just going to  admire these designs. We are actually going to  
3:03
steal them, but of course not in a shady way. So now let's click the "Copy" button in the  
3:07
bottom right to grab the entire flow of the app.  Then, if we click the "Download plugin" button,  
3:12
it will take us over to Figma, where we can  open a new file and click on "Run." And now  
3:16
if we click inside this box and press Ctrl + V, it  will paste the entire flow of the app in Figma.  
3:22
And then we can clean up our Figma file by  deleting all the pages we're not going to use.  
3:27
Alright, so now we're going to do something  SUPER important that is going to save you  
3:30
HOURS of frustration later on. We need to create  what I call the "brain" of our app. And this part  
3:36
is absolutely crucial - I've literally wasted  weeks of work by skipping this step before.  
Creating the Structure of the App
3:54
Here's exactly what we need to do. We're going to  create five important files that will tell Cursor  
3:58
AI exactly what to build. Because here's the  thing - GPT4 and Claude are like SUPER efficient  
4:01
workers, but they need crystal clear instructions  to work optimally. If you don't give them a proper  
4:02
plan for the app, they'll try to think on their  own, and that's when things will start to break.  
4:02
So let me show you EXACTLY what  files we need to create, and do NOT  
4:03
skip this part or you’ll just waste time! And the first file we need to create is the  
4:05
Context File. This is literally  the most important file we'll  
4:07
make, because it tells the AI EVERYTHING  
4:08
about our app. Here's exactly what I do: Head over to ChatGPT, and here I will write down  
4:12
all my thoughts about how the app should work, and  be very specific here. Just think about the entire  
4:17
flow of the app and write down all the pages  from when you first open the app to the very end,  
4:20
like how I’ve done here. And then let’s ask  ChatGPT to optimize this to be more structured  
4:25
and easier for the AI to understand by writing: “I am building a productivity app that helps users  
4:28
focus on one task at a time. I need a detailed  and structured explanation of the app's flow  
4:28
and features, written as a Markdown file, so that  it is easy for an app developer to understand and  
4:28
implement. Use the Context over to write this." I’ll leave the prompt I just wrote in the  
4:29
description of the video so you  can just rewrite it for your own  
4:32
app. And then just copy the context here. Now if you haven't downloaded Cursor yet,  
Build the App with Cursor AI
4:39
head over to cursor.com real quick  and grab it. It's completely free and  
4:42
they even give you a 2-week trial of the  Pro version if you want to try it out.  
4:46
Open Cursor and open the folder for  your project. I’ve already created  
4:49
one and named it “Deepwork AI”. Inside that, create another folder  
4:53
called "docs". Then create a New  file called Context.md. If we now  
4:57
press "Ctrl L" - this opens up Cursor's  AI chat, which is like ChatGPT but WAY  
5:02
better because it can Actually see your  project files by simply tagging them.  
5:06
So if we now paste in the context we got from  ChatGPT and ask him to write this better for a  
5:10
markdown file, he will set up the file  better. So now press “Apply” to add it  
5:13
in the context-file. And just quickly go through  the file to make sure it includes what you want.  
5:21
And I know how much time it can take to figure  out the right tech stack. That’s why I’ve left  
5:25
the exact one I use in the description so you can  just copy it exactly as it is because I've already  
5:30
gone through all that pain so you don't have to.  Then just paste it in the context-file as well.  
5:34
So now let’s write this in the Cursor interface: “Give me the full database schema and the optimal  
5:39
folder structure of the app and  add this in the context-file”  
5:43
Then - and this is super important - tag your  Context file by typing @ and selecting Files  
5:48
by pressing enter, and then select the  file. This tells Cursor AI to use your  
5:53
Context file as reference. And now just add the text  
5:56
to your Context.md file. Alright, let me show you how to  
5:57
actually build this app because this is where most  people get stuck. But don't worry - it's super  
5:58
simple when you know exactly what to do. First, open your terminal and type this command:  
6:00
“npx create-expo-app@latest -e with-router”  
6:03
Then give your project a name - I'll call  mine "DeepworkAI". When it’s done loading,  
6:08
let's drag the docs folder we created  right into our new project folder.  
6:11
Then type “cd” and your project name  to navigate into its folder.  
6:15
If you now type “ls” you will see  your current file-location.  
6:18
So let’s run the app! Write “npx expo  start” and it will initialize the app.  
6:23
Then you'll see a QR code pop up. So just grab  your phone, download the Expo Go app and scan  
6:28
this code in your phone camera. And just like  that, your app is running on your phone!  
6:32
I know it looks pretty basic right now, but isn’t  it fun to see it working? Let's keep going!  
6:36
Now press “Ctrl i” to open the Cursor  Composer. And the Composer is the  
6:40
feature where it writes code FOR you  just by writing in plain English.  
6:43
So let’s ask it to build the app  step-by-step by focusing on one task  
6:47
at a time, and then tag the Context-file. Now he just made the Development plan which the  
6:51
AI will use to know exactly what to build. So now let’s ask him to start  
6:55
with the first task. Press “accept” and let’s press R  
6:58
in the terminal to reload the app. Whenever you get an error like I just  
6:59
got right now, it will always show in the  terminal where you’re running the app.  
6:59
So what I like to do then is to copy the error  and paste in the Cursor chat and just ask him  
6:59
to fix it, but now I see the problem is just  that the UI library is not installed.  
6:59
So I’ll just copy the installation command and  press “Ctrl Shift `” to open a new terminal.  
7:04
Then use “ls” to list files, and then  let’s again use cd to open the project  
7:08
folder. And here we’ll execute the command  to install the required UI library.  
7:12
When it’s done installing, head back to  the terminal which is hosting the app,  
7:16
click inside the terminal and press R  to reload the app on your phone.  
7:19
Alright, now let’s continue building the app.  Just write “continue” in the Composer.  
Setup the Database & Backend
7:23
Now he will set up the configuration with  Supabase for the database and authentication.  
7:28
So when he is done, let’s accept and head over  to Supabase.com. Quickly make an account and then  
7:33
let’s create a new project. I’ll call it DeepworkAI.  
7:36
Now copy the public anonymous Token, head back  to Cursor and navigate to the .env file. Remember  
7:42
to keep this token private! And in this file we’ll need to  
7:45
paste in the token in the Anon key. Then go back to Supabase and copy the  
7:48
URL. And paste this in the URL as well. If we now write “continue” in the Composer one  
7:53
more time, he will continue building  the log-in and sign-up pages.  
7:57
So let’s accept, and click inside the  terminal and press “R” to reload the app.  
8:01
And the same as before; when you have  an error - copy it, paste it in the  
8:04
Composer and prompt him to fix it. So we need to install a library. Just  
8:07
copy the command and head back to the other  terminal, paste it in and run it there.  
8:11
When it’s done, head back to the terminal  that is running the app and press “R”.  
8:15
[Show the showcase1 video of the app] Nice! Now this is how the app is looking.  
8:17
We’ve sat up the entire user authentication  flow with both sign-in and sign-up pages.  
8:21
And since we use Supabase it even  sends out a verification email.  
8:24
So if we now log out and try to  log into the account we just made,  
8:28
you’ll see it works as well! And if we go to Supabase now,  
8:30
under Authentication and Users - we can see  the account I just made in the app!  
The App I built
8:34
Quick tip when building: I recommend  checking out the app for each part the  
8:34
Cursor Composer adds to the code so that you  have errors and such under control.  
8:34
________________ Alright, so I spent the  
8:35
last 30 minutes continuing to build the app,  and this is what it looks like right now:  
8:39
We can create new tasks, give it a  title, set the priority of the task,  
8:42
give it a description, and set a deadline  for when the task should be done.  
8:46
And now if we click on the task, we can start  the Focus timer - which then counts how much  
8:50
time you’ve spent on this specific task. And we can also mark it as complete.  
8:54
As you can see, the app does NOT look good  yet. So now, let’s improve the UI.  
Improving the UI of the App
8:58
Head back to Mobbin, and let’s go through the  designs we want to use for our app. When you find  
9:02
pages you’d like to take inspiration from - press  ctrl c to copy them, head back to Cursor and paste  
9:07
in the pictures in the Composer chat. And continue doing this for  
9:10
all the inspiration pages. When you’re done - let’s ask the Composer this:  
9:14
“Use these pictures as inspiration  for my app design in the entire” and  
9:17
then let’s tag the Codebase - this will have  Cursor look through the ENTIRE project.  
9:22
and when it’s done click accept - and now  let’s have a look at the app again.  
9:25
Wow! Just like that, the app looks 100  times better. By simply copying an app  
9:30
that’s already invested a ton of money in  optimizing their design and user flow.  
9:34
If you want to use Mobbin yourself, I put the  link to their website in the description.  
DeepSeek API
9:38
Now for setting up the AI-chat using DeepSeek  API, let’s write this in the Cursor Composer:  
9:42
“build the AI-chat feature  from @DEVELOPMENT_PLAN.md”  
9:46
Nice! Now just accept it, and let’s  navigate over to the env-file.  
9:49
Now we need to copy the DeepSeek API  key-placeholders here into the env-file.  
9:53
________________ And then we need the  
9:54
DeepSeek API key from platform.deepseek.com,  and paste it here - in the env-file.  
10:00
And remember; if you are confused about  anything, you can just ask the Cursor  
10:04
Chat. You open it by pressing “control L”. Now let’s reload the app again by pressing R in  
10:09
the terminal and let's check out if it works! Here we can see the new AI-chat,  
10:13
and if I now write: “I need to buy a new toothbrush  
10:15
and tidy my bedroom” And submit…  
10:17
Great! The AI-feature adds  tasks on the first try!  
Upload to AppStore & PlayStore
10:20
So now for the moment you’ve  all been waiting for.  
10:22
To be able to upload this app on  both iOS and Android, we need to do  
10:26
this - and I’ll show this quickly for you: Let’s ask the Cursor chat: “how do I upload my  
10:30
expo app to appstore and playstore? And keep in mind you need to buy an Apple  
10:34
Developer account for $99 annually, and a Google  Play Developer account for $25 one-time fee.  
10:41
Then, let’s open a new terminal and type in the  command “npm install -g eas-cli” - which stands  
10:47
for Expo Application Services. And when it’s done installing,  
10:50
type in “eas login”. This will ask us for  your username and password - so head to  
10:54
your web browser and search for expo.dev. Quickly create an account, and then head back to  
10:59
Cursor where we’ll login with the same username  and password we just created on expo.dev.  
11:04
Perfect! Now let’s run this  command “eas build:configure”.  
11:07
Then press “y” to continue. And select “All” if you want to  
11:10
upload the app to both iOS and Android. If we now head back to expo.dev - you’ll see  
11:15
that the project is now connected! So now, to upload your app to the AppStore  
11:16
or Google PlayStore, I recommend just watching  Expo’s tutorial for that. And I've turned this  
11:17
entire video into an article on my  website if you want it written down,  
11:21
so you can find the link in the description below