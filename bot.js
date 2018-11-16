const Discord = require('discord.js');
const moment = require('moment');
const fs = require('fs');
const client = new Discord.Client();
const prefix = "$";
client.on('ready', () => {
client.channels.get("513016296976285706").join();
client.user.setStatus('dnd');
client.user.setGame("Survival", "https://twitch.tv/idk");
console.log('Elite Skill Survival Is Ready!');
});

client.on('message', function(message) {
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var hybh = new Discord.RichEmbed()
            .setColor('#FFFFFF')
            .setTimestamp()
            .setTitle('**رساله جديده في خاص البوت**')
            .setThumbnail(`${message.author.avatarURL}`)
            .setDescription(`\n\n\`\`${message.content}\`\``)
            .setFooter(`من (@${message.author.tag})`)
        client.channels.get("490165996854706217").send({ embed: hybh });
    }
});

client.on('message', message => {
    if(!message.channel.guild) return;
    if (message.author.bot) return;

    if(!message.member.hasPermission('ADMINISTRATOR')) return;
  
  if (message.content.startsWith('$srv')) {

    var mentionned = message.mentions.users.first();
    let args = message.content.split(" ").slice(1);
    let em = client.emojis.find(e => e.name === "hash~1");

    var elite;
    if(mentionned){
        var elite = mentionned;
      
    } else {
      return message.channel.send("لم يتم إرسآل الرسآلة ، بسبب خطاء ما .");
        
    }


  let say = new Discord.RichEmbed()
  .setDescription(args.join("  "))
  .setColor("FFFFFF")
  client.users.get(mentionned.id).sendEmbed(say);
  
  }
});

client.on('message', message => {
    if(message.content.startsWith(prefix + 'survival')) {
        let args = message.content.split(' ').slice(1).join(' ');
        let support = message.guild.roles.find("name","Survival.");
        let ticketsStation = message.guild.channels.find("name", "‹ Survival ›");
        if(!args) {
            return message.channel.send('قم بكتآبة \n$survival problems');
        };
                if(!support) {
                    return message.channel.send('**Please make sure that `Survival.` role exists and it\'s not duplicated.**');
                };
            if(!ticketsStation) {
                message.guild.createChannel("‹ Survival ›", "category");
            };
                message.guild.createChannel(`Name-${message.author.username}`, "text").then(ticket => {
                    message.delete()
                        message.channel.send(`**You'r Channel has been create :: ${ticket} **`);
                    ticket.setParent(ticketsStation);
                    ticketsStation.setPosition(1);
                        ticket.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                            ticket.overwritePermissions(support.id, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                                ticket.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                    let embed = new Discord.RichEmbed()
                                .setTitle('**Problems Survival**')
                                .setColor("FFFFFF")
                                .addField('تم تقديم الشكوة :', message.author)
 
                                ticket.sendEmbed(embed);
                }) .catch();
    }
    if(message.content.startsWith(prefix + 'close')) {
            if(!message.member.hasPermission("EMBED_LINKS")) return;
        if(!message.channel.name.startsWith("survival")) {
            return;
        };  
                let embed = new Discord.RichEmbed()
                    .setAuthor("اذا تم حل المشكلة بنجآح يرجى\nكتابة الامر مرة اخرى.")
                    .setColor("FFFFFF");
                    message.channel.sendEmbed(embed) .then(codes => {
 
                   
                        const filter = msg => msg.content.startsWith(prefix + 'close');
                        message.channel.awaitMessages(response => response.content === prefix + 'close', {
                            max: 1,
                            time: 20000,
                            errors: ['time']
                        })
                        .then((collect) => {
                            message.channel.delete();
                        }) .catch(() => {
                            codes.delete()
                                .then(message.channel.send('**تم الغاء التذكرة بنجآح .**')) .then((c) => {
                                    c.delete(4000);
                                })
                                   
                           
                        })
 
 
                    })
 
 
           
    }
});

client.login(process.env.BOT_TOKEN);
