<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Music_Bot_0"></a>Music Bot</h1>
<h3 class="code-line" data-line-start=2 data-line-end=3 ><a id="This_is_copyright_2020_Toadless_2"></a>This is copyright 2020 Toadless.</h3>
<p class="has-line-data" data-line-start="4" data-line-end="5"><a href="https://github.com/Toadless/discordmusicbot"><img src="https://img.shields.io/badge/Music%20Bot-v2.1-brightgreen" alt="Build Status"></a> <a href="https://www.npmjs.com/package/simple-youtube-api"><img src="https://img.shields.io/badge/API-v5.2.1-red" alt="Build Status"></a> <a href="https://www.npmjs.com/package/discord.js/v/11.5.0"><img src="https://img.shields.io/badge/Discord.JS-11.5.0-blue" alt="Build Status"></a> <a href="https://www.npmjs.com/package/ytdl-core"><img src="https://img.shields.io/badge/YTDL--Core-2.1.4-green" alt="Build Status"></a> <a href="https://www.npmjs.com/package/opusscript"><img src="https://img.shields.io/badge/Opusscript-v0.0.7-yellow" alt="Build Status"></a></p>
<p class="has-line-data" data-line-start="6" data-line-end="7">Want a simple music bot? Easy to setup? No code? I got you covered.</p>
<h2 class="code-line" data-line-start=8 data-line-end=9 ><a id="Features_8"></a>Features</h2>
<ul>
<li class="has-line-data" data-line-start="10" data-line-end="11">Play</li>
<li class="has-line-data" data-line-start="11" data-line-end="12">Pause</li>
<li class="has-line-data" data-line-start="12" data-line-end="13">Stop</li>
<li class="has-line-data" data-line-start="13" data-line-end="14">Loop</li>
<li class="has-line-data" data-line-start="14" data-line-end="15">Nowplaying</li>
<li class="has-line-data" data-line-start="15" data-line-end="16">Queue</li>
<li class="has-line-data" data-line-start="16" data-line-end="18">Setvolume</li>
</ul>
<h1 class="code-line" data-line-start=18 data-line-end=19 ><a id="How_to_setup_18"></a>How to setup</h1>
<p class="has-line-data" data-line-start="20" data-line-end="29">First fork this repo.<br>
Secondly you will need an acount with heroku. Get one here -&gt; <a href="https://heroku.com/">here</a><br>
Once you have an account with heroku creat a new application and go to deploy and connect your github account<br>
find the reposorty you forked and link it with heroku and turn on automatic deploys. Then go to settings and<br>
go to build packs, paste in this link<code>https://github.com/Toadless/ffmpeg</code>. Once you have added that press config real<br>
var and add a key called token and set its value to the bot token. Add another key called prefix and set it to your bots prefix and add the last key called api and set the value to a youtube v3 data api. Dont know where to get that? Go to<br>
<code>https://console.developers.google.com/</code> and make a new project and add the youtube v3 data api extention<br>
to it. Once you have dont that go to deploy on heroku and and deploy branch master. When its complete go to resorces and<br>
keep reloading until <code>Workey node index.js</code> comes up. Then press the edit button and enable it then save the edit.</p>
<p class="has-line-data" data-line-start="30" data-line-end="31">If you have done it correctly the bot will be online ready to help.</p>
