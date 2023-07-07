# Internship Project: Data Ingestion and Processing for a Static Website

VERSION 0.7

**GENERAL**\
[NOTE: the term "Latinx" is used as specified by the University of California, a key customer].

My backend code updates key files for a static website, REDACTED.com, which aggregates Instagram posts from student clubs across the University of California. I can provide the real website domain upon request; it's REDACTED for this public repo.

REDACTED.com is actually two twin websites at subdomains: black.REDACTED.com and latinx.REDACTED.com.

black.REDACTED.com focuses on Black student clubs, and groups all the Instagram posts together as well as allowing the user to slice the posts by individual campus (e.g., Berkeley, UCLA, etc). The same applies for latinx.REDACTED.com.

**GOALS AND CONSTRAINTS**\
Main audiences of the website are:
1. High School Students: Provide role models to and illustrate college life for aspiring college applicants by aggregating Instagram posts into a super simple website.
2. University of California: Be a new, scalable tool in the outreach efforts of the University of California.

Key Constraints
- Technical: Minimize server and operating costs (e.g., keep website hosting cost at ~free and without a database).
- Technical: Do not change the front-end files (out of my project scope), except for the vars in the js files that store the IDs of the Instagram posts the website displays.

**DESIGN**\
Data Source:
- Separately from this repo, we have made apify.com our source for Instagram posts. 
- We have set Apify to run once a day.
- Each Apify run produces a single json file of Instagram posts (includes all posts for all Black and Latinx student organizations across all campuses).
- NOTE: We could have setup Apify to conduct multiple different runs to produce segmented json files. But for control purposes and minimizing dependencies/lockin, we want Apify to produce one simple file, which we would parse and apply logic to on our own.

Data Ingestion:
- The json data we retrieve from Apify is "all" Instagram posts, NOT just the new posts since Apify's last run. Apify does not have the ability to differentiate between new vs old posts.
- My code ingests Apify run data via the Apify API.

Data Processing (parse data; update lists):
- The first main task in processing the Apify json data is separating the posts into those originally from the Black student clubs and those originally from the Latinx student clubs. This is accomplished by looping through all the posts from the latest run and checking if the posts' usernames belong to Black or Latinx student clubs.
- The second main task is looking at each new post and updating the correct campus-level lists (e.g. Berkeley, UCLA, etc.) for the Black student clubs. This is accomplished by looping through all the posts from Black student clubs (that were separated earlier).
- We repeat the above processing for the Latinx student clubs' posts.

File Updating:
- With the updated lists, my code then writes to and updates the js files. These files are part of our front-end and are used to actually store our data (no database, as per earlier in the document).
- In the js files, my code only touches the vars that store data (Instagram posts); I do not touch the js code/logic, which I was instructed to keep as is.

**INSTALLATION**
- The ingest-process-output.py script requires the installation of the ApifyClient package.
- Installing the package in a virtual environment is strongly recommended.
- To make a virtual environment and install ApifyClient, run the following lines of code in the project directory terminal:
    - `python3 -m venv .venv`
    - `source .venv/bin/activate`
    - `pip install apify-client`
- Deactivate the virtual environment by running `deactivate` in the same project directory terminal.

**USAGE**
- In order to run ingest-process-output.py correctly, the following starter files must be in the same directory as ingest-process-output.py:
    - config.py
    - contentcore_bl.js
    - contentcore_lat.js
    - contentpick_bl.js
    - contentpick_lat.js
    - ingest-process-output.py
    - README.md
- Similarly as to above, running ingest-process-output.py in a virtual environment is highly recommended. See the second line of code in INSTALLATION to activate the virtual environment.
- Replace clientKey and actorName in config.py as needed. clientKey should be the user's Apify API key. actorName should be the name of the saved task on Apify.
- NOTE: when the script ingest-process-output.py is running, the code will output to the console basic reporting (e.g., latest run start date/time, number of new post IDs/shortcodes, etc.)

Separate cron jobs:\
[Out of scope] Cron job to automatically run ingest-process-output.py
[Out of scope] Cron job to automatically push updated files (js files) to production.

**SOME LEARNINGS/THOUGHTS**
- The very first proof-of-concept was super rough and quick to code-- one website/domain that featured (and did not separate) all the posts mixed together from all the UCs and Black/Latinx clubs. Like with many things in coding, the very "simple and quick" idea of then segmenting by Black/Latinx and by UC campus necessitated code that, well, wasn't hard, but definitely was not "simple and quick" :)
- Cloudflare R2 is excellent for static websites, especially ones that are mainly text files like this project. No egress fees and the text files so far have been too small to register any monthly cost. A (future) limitation is that access controls are bare bones as of this writing.
- Apify.com overall seems pretty reliable.
- My code overall is fairly generalized/modularized in some spots, and less so in others. Specs and requests were coming fast, so we didn't want to prematurely optimize. We can optimize as the pace of change requests slows down.
- My internship was remote, which was pretty easy logistically since my files were minimal in number and size and my project boundaries were defined. Specific features/functionality did entail a good deal of real-time text/discussion. Timewise, about 10 hrs/week in Summer '22, and generally 10 hrs/month in Fall '22 and Spring '23.
- [Out of scope] The consumer front-end/UI is pretty basic, but works well for users.
- [Out of scope] Seemingly at random times and mainly with the Safari browser, Instagram doesn't return the proper code in their embed.js, and thus the embeds do not render. 