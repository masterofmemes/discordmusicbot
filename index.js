const Discord = require("discord.js");
const bot = new Discord.Client();

const ytdl = require("ytdl-core");
const prefix = process.env.prefix;

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.api);

bot.on("ready", function() {
    console.log(`Logged In As ${bot.user.username}`);
});

function play(connection, message) {
    setTimeout(() => {
        var server = servers[message.guild.id];
        server.dispacher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
        server.dispacher.on("end", function () {
            if (!loop[message.guild.id]) {
                loop[message.guild.id] = {
                    "loop": "False",
                }
            }
            if (loop[message.guild.id].loop == "True") {
                if (server.queue[0]) play(connection, message);
                return;
            }
            server.queue.shift()
            if (server.queue[0]) play(connection, message);
            else connection.disconnect();
        })
    }, 2000)
}

var servers = {};
var loop = {};
var pause = {};

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLocaleLowerCase()) {
        case "pause":
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id]
            if (!pause[message.guild.id]) pause[message.guild.id] = {
                "paused": "False",
            }
            if (!server.dispacher) {
                message.channel.send("Im not playing anything.")
                return;
            }
            if (pause[message.guild.id].paused == "True") {
                server.dispacher.resume();
                message.reply("Resumed the player.")
                pause[message.guild.id] = {
                    "paused": "False",
                }
                return;
            }
            if (pause[message.guild.id].paused == "False") {
                server.dispacher.pause();
                message.reply("Paused the player.")
                pause[message.guild.id] = {
                    "paused": "True",
                }
                return;
            }
            message.reply("An error occured whilst performing this action.")
            break;
        case "loop":
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id]
            if (!loop[message.guild.id]) {
                loop[message.guild.id] = {
                    "loop": "True",
                }
                message.reply("Set looping to true.")
                return;
            }
            if (loop[message.guild.id].loop == "True") {
                message.reply("Set looping to false.")
                loop[message.guild.id] = {
                    "loop": "False",
                }
                return;
            }
            if (loop[message.guild.id].loop == "False") {
                message.reply("Set looping to true.")
                loop[message.guild.id] = {
                    "loop": "True",
                }
                return;
            }
            message.channel.send("An error occurred while enabling/disabling looping.")
            break;
        case "queue":
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id]
            if (!server.queue[0]) {
                message.reply("There are no songs in the queue.")
                return;
            }
            const que = new Discord.RichEmbed()
                .setTitle("Queue")
                .setThumbnail(bot.user.avatarURL)
                .setColor("#9571d3")
            await youtube.getVideo(server.queue[0])
                .then(video => {
                    let v = video.title;
                    que.addField("__Now Playing__", v)
                })
            if (server.queue[1]) {
                await youtube.getVideo(server.queue[1])
                    .then(video => {
                        let v = video.title;
                        que.addField("__Up Next__", "`1. `" + v)
                    })
            }
            if (server.queue[2]) {
                await youtube.getVideo(server.queue[2])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`2. `" + v)
                    })
            }
            if (server.queue[3]) {
                await youtube.getVideo(server.queue[3])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`3. `" + v)
                    })
            }
            if (server.queue[4]) {
                await youtube.getVideo(server.queue[4])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`4. `" + v)
                    })
            }
            if (server.queue[5]) {
                await youtube.getVideo(server.queue[5])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`5. `" + v)
                    })
            }
            if (server.queue[6]) {
                await youtube.getVideo(server.queue[6])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`6. `" + v)
                    })
            }
            if (server.queue[7]) {
                await youtube.getVideo(server.queue[7])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`7. `" + v)
                    })
            }
            if (server.queue[8]) {
                await youtube.getVideo(server.queue[8])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`8. `" + v)
                    })
            }
            if (server.queue[9]) {
                await youtube.getVideo(server.queue[9])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`9. `" + v)
                    })
            }
            if (server.queue[10]) {
                await youtube.getVideo(server.queue[10])
                    .then(video => {
                        let v = video.title;
                        que.addField("\u200b", "`10. `" + v)
                    })
            }
            message.channel.send(que)
            return;
        case "nowplaying":
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            var server = servers[message.guild.id]
            if (!server.queue[0]) {
                message.reply("There is no currently playing songs.")
                return;
            }
            var song = server.queue[0]
            youtube.getVideo(song)
                .then(video => {
                    var embed = new Discord.RichEmbed()
                        .setTitle("Music")
                        .setFooter("Bot By Toadless", bot.user.displayAvatarURL)
                        .setThumbnail(bot.user.avatarURL)
                        .setDescription(`Currently playing ${video.title}`)
                        .setColor("#9571d3")
                    message.channel.send(embed)
                })
                .catch(console.log);
            return;
        case "help":
            if (!loop[message.guild.id]) {
                loop[message.guild.id] = {
                    "loop": "False",
                }
            }
            if (!pause[message.guild.id]) pause[message.guild.id] = {
                "paused": "False",
            }
            var help = new Discord.RichEmbed()
                .setTitle("Help")
                .setThumbnail(bot.user.avatarURL)
                .addField("Play", "This can play a url or query to your channel from youtube.", true)
                .addField("Skip", "This will skip the current playing song.", true)
                .addField("Stop", "This will stop all of the playing songs.", true)
                .addField("Setvolume", "Sets the bots volume", true)
                .addField("Nowplaying", "Displayes what the bot is playing.", true)
                .addField("Queue", "Displays the first 10 songs in the queue.", true)
                .addField("Loop", "Enables or disables looping.", true)
                .addField("Pause", "This command is toggleable and it paused the player", true)
                .addBlankField()
                .addField("Looping", `${loop[message.guild.id].loop}`, true)
                .addField("Paused", `${pause[message.guild.id].paused}`, true)
                .setFooter("Toads Notes was made by Toadless.", `${bot.user.avatarURL}`)
                .setColor("#9571d3")
            message.channel.send(help)
            return;
        case "setvolume":
            if (!args[1]) {
                message.reply("Please provide a volume to set the bot to.")
                return;
            }
            if (args[1] < 1) {
                message.reply("Please provide a volume between 1 and 9")
                return;
            }
            if (args[1] > 9) {
                message.reply("Please provide a volume between 1 and 9")
                return;
            }
            var server = servers[message.guild.id]
            server.dispacher.setVolumeLogarithmic(`0.${args[1]}`)
            var volume = new Discord.RichEmbed()
                .setTitle("Music")
                .setThumbnail(bot.user.avatarURL)
                .setFooter("Bot By Toadless", bot.user.displayAvatarURL)
                .setDescription(`Set the volume to ${args[1]}`)
                .setColor("#9571d3")
            message.channel.send(volume)
            return;
        case "play":
           if (!args[1]) {
               message.reply("Please provide a url or query.");
               return;
           }
           if (!message.member.voiceChannel) {
               message.reply("You must be in a voice channel to do this.");
               return;
           }

           if (!args[1].startsWith("https://www.youtube.com/")) {
               if (!servers[message.guild.id]) servers[message.guild.id] = {
                   queue: []
               }
               var server = servers[message.guild.id];
               var song = args.slice(1).join(" ");

               youtube.searchVideos(song, 1)
                   .then(results => {
                       const musicembed = new Discord.RichEmbed()
                           .setTitle("Added A Song To The Queue")
                           .setColor("#9571d3")
                           .setDescription(`Successfully added ${results[0].title} to the queue!`)
                           .setFooter(`Requested By ${message.author.username}`, `${message.author.displayAvatarURL}`)
                           .setThumbnail(bot.user.avatarURL)
                       message.channel.send(musicembed);
                       server.queue.push(results[0].url)
                       setTimeout(() => {
                           if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                               play(connection, message);
                           });
                       }, 2000)
                   }).catch(err => {console.log(err)})
               return;
           }

           if (args[1].startsWith("https://www.youtube.com/")) {
               if (!servers[message.guild.id]) servers[message.guild.id] = {
                   queue: []
               }
               var server = servers[message.guild.id];
               server.queue.push(args[1]);
               youtube.getVideo(args[1])
                   .then(video => {
                       var music = new Discord.RichEmbed()
                           .setThumbnail(bot.user.avatarURL)
                           .setTitle("Music")
                           .setColor("#9571d3")
                           .setDescription(`I have added ${video.title} to the queue.`)
                           .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL}`)
                       message.channel.send(music)
                   })
                   .catch(console.log);
               if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                   play(connection, message);
               });
               return;
           }
           else return message.channel.send("Please provide a valid url or query.");
           break;
        case "skip":
            var server = servers[message.guild.id];
            if (server.dispacher) server.dispacher.end();
            var skip = new Discord.RichEmbed()
                .setThumbnail(bot.user.avatarURL)
                .setTitle("Music")
                .setColor("#9571d3")
                .setDescription("Ive skipped the current song if threre was one playing.")
                .setFooter("Bot By Toadless", `${bot.user.displayAvatarURL}`)
            message.channel.send(skip)
            break;
        case "stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            if (server.dispacher) server.dispacher.end();
            var stop = new Discord.RichEmbed()
                .setThumbnail(bot.user.avatarURL)
                .setTitle("Music")
                .setDescription("Ive stopped all of the songs.")
                .setFooter("Bot By Toadless", `${bot.user.displayAvatarURL}`)
            message.channel.send(stop)
            break;
    }
})

bot.login(process.env.token);