const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect: true, max_cache_message: 0});
const config = require("./config.json");
const fs = require("fs-extra");
const prefix = config.prefix;
const masterChanID = config.MCID;
const masterVocID = config.MVID;
const testID = config.testID;

client.on("ready", () => {
  // CHANNELS
  cheriana = client.channels.find(chan => chan.name == "cheriana")
  cherianaVC = client.channels.find(chan => {((chan.name == "Cheriana") && (chan.type == "voice"))})
  silentRoom = client.channels.find(chan => chan.name == "silence-room")
  silentRoomVC = client.channels.find(chan => {((chan.name == "🔇 Silence Room") && (chan.type == "voice"))})
  afkVC = client.channels.find(chan => {((chan.name == "🚽 - Les Chiottes") && (chan.type == "voice"))})
  cherianaPassInvite = client.channels.get("525363757359038482") // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-invitation
  cherianaLogs = client.channels.get("525714829571260459") // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-logs
  cherianactivity = client.channels.get("527823396864786433"); // Server: 2019 | Portail Cheriana | FR Channel: #cherianactivity
  // CATEGORY CHANNELS
  cheribackup = client.channels.get("527920710631555073"); // Server: 2019 | Portail Cheriana | FR Channel: #CHERIBACKUP [category channel]
  newUsersChannels = client.channels.get("528051676343435304"); // Server: 2019 | Portail Cheriana | FR Channel: #NEW USERS CHANNELS [category channel]
  // ROLES
  ownnerUser = client.users.get('524266873412648980'); // Le Createur
  anarchobotRole = cheriana.guild.roles.find(role => role.id  == "524322827797528591")
  chouchouneRole = cheriana.guild.roles.find(role => role.id  == "525375457873494026")
  cheriOwnerRole = cheriana.guild.roles.find(role => role.id == "524282758160449556")
  newAuthBotRole = cheriana.guild.roles.find(role => role.id == "524341728489111568")
  cheriBotTeam = cheriana.guild.roles.find(role => role.id == "524342298117668864")
  quarantineRole = cheriana.guild.roles.find(role => role.id == "524579534725447687")
  cheriUserCatRole = cheriana.guild.roles.find(role => role.id == "524343443405930507")
  cheriUserRole = cheriana.guild.roles.find(role => role.id == "524279902007066632")
  // OTHERS
  newuserChanName = null;

  protectedRolesList = []
  protectedRolesList.push(anarchobotRole, chouchouneRole, cheriOwnerRole, newAuthBotRole, cheriBotTeam, quarantineRole, cheriUserCatRole, cheriUserRole)

  membersCount = client.users.size;
  var serverCount = client.guilds.size;
  const guildNames = client.guilds.map(g => (g.name + "\n"))
  var startMsg = `\n ${client.user.username}@client [Started] ${new Date()}
 --------------------------------------\n Utilisateurs: ${membersCount}\n Serveur(s): ${serverCount}\n ${guildNames}\n --------------------------------------\n`;

  client.user.setUsername(`${client.user.username}`);
  //client.user.setActivity(``, {type: "WATCHING"});
  client.user.setStatus("online"); // online / dnd / idle / invisible
  client.user.setActivity(`${membersCount} utilisateurs`, {type: "WATCHING"});
  console.log(startMsg + '\n Detected Channels :\n');

  client.channels.forEach(chan => {
    if (chan.guild.id == "524277446946717707") console.log(' ' + chan.guild.name + '             #' + chan.name)
    if (chan.guild.id == "525363756704858115") console.log(' ' + chan.guild.name + '     #' + chan.name)
  })
/*
  setInterval(function() {console.log("cheriana lastMessageID: " + cheriana.lastMessageID)}, 3 * 1000)
  setInterval(function() {console.log("Bot.user lastMessageID: " + client.user.lastMessageID)}, 3 * 1000)
*/

// console.log(newUsersChannels)

});

client.on("message", message => {

  if (!message.guild) return console.log(message.author.username + " sur #" + client.user.username + `: ${message}`) 
  if ((message.guild.name == "2019 | Portail Cheriana | FR") || (message.guild.id == "525363756704858115")) return;

  var anarchobotRole = cheriana.guild.roles.find(role => role.id  == "524273043124649989")
  var chouchouneRole = cheriana.guild.roles.find(role => role.id  == "525375457873494026")
  var cheriOwnerRole = cheriana.guild.roles.find(role => role.id == "524282758160449556")
  var newAuthBotRole = cheriana.guild.roles.find(role => role.id == "524341728489111568")
  var cheriBotTeam = cheriana.guild.roles.find(role => role.id == "524342298117668864")
  var quarantineRole = cheriana.guild.roles.find(role => role.id == "524579534725447687")
  var cheriUserCatRole = cheriana.guild.roles.find(role => role.id == "524343443405930507")
  var cheriUserRole = cheriana.guild.roles.find(role => role.id == "524279902007066632")

  var botID = client.users.get(`${client.user.id}`);
  var except_chanA = client.channels.find(chan => chan.name === 'cheriana');
  var except_chanB = client.channels.find(chan => chan.name === 'Cheriana');
  var command = message.content.split(" ")
  var member = message.mentions.members.first();
  let replacedMention = [`${member}`];
  var msgchan = message.channel;
  var args = command;
  var thisChannel = client.channels.find(chan => chan.id === message.channel.id);
  var vChan = message.member.voiceChannel;
  newArgs = message.content

  if (message.content.startsWith(prefix) && (message.channel != undefined)) {
    cherianactivity.send(`**${message.author.username}** sur ${message.channel} : \`${message.content}\``)
    message.delete(1000)
    console.log("\n " + message.author.username + " a tapé la commande: " + message.content)
  }

  if (message.author.id == "524266873412648980") { // Owner User: Le Createur
    const ownerCmds = require("./cmds/ownerCmds.js")
    ownerCmds(message, prefix, client, command)
  }

  const usersCmds = require("./cmds/usersCmds.js")
  usersCmds(message, prefix, client, command)

if (message.attachments) {

      message.attachments.forEach(att => {
        if (!message.content) {
          newArgs = ` ${att.url}`;
        } else if (message.content) {

          if (message.content.includes(member)) {
            argsBefore = message.content.replace(member, `**${member.user.username}**`);
            newArgs = `${argsBefore}\n${att.url}`
          } else {
            newArgs = message.content + '\n' + att.url;
          }
        }
      })
    } else {
      if (message.content.includes(member)) {
        newArgs = message.content.replace(member, `**${member.user.username}**`);
      } else {
        newArgs = message.content
      }
    }

    var MSGChan = `**${message.author.username}** sur **#${msgchan.name}** : ${newArgs}`;
    var MSGChanLog = ` ${new Date()} sur #${msgchan.name}\n ${message.author.username} : ${newArgs}\n UserID : ${message.author.id}\n ChannelID : ${msgchan.id}\n`;

    if (message.channel == silentRoom) {

      if (!vChan) {
        return message.delete().then(del => message.author.send(`Vous devez être connecté au salon vocal **🔇 Silence Room** pour pouvoir écrire sur **${silentRoom}**`))
      } else if (vChan.name != "🔇 Silence Room") return message.delete().then(del => message.author.send(`Vous devez être connecté au salon vocal **🔇 Silence Room** pour pouvoir écrire sur **${silentRoom}**`))

    } else if ((message.channel == silentRoom) && (vChan.name == "🔇 Silence Room")) {
      silentRoom.send(MSGChan)
      console.log(MSGChanLog)
    }

    cherianactivity.send(MSGChan)
    console.log(MSGChanLog)

    if (!thisChannel) {
      return
    } else {
      var toFindChan = cheribackup.guild.channels.find(chan => chan.name == thisChannel.name);

      if (!toFindChan) {
        return
      } else {
        var authorID = client.users.get(`${message.author.id}`);
        if (authorID.avatarURL !== null) {
          avatarURL64 = authorID.avatarURL.split('size=2048').join('size=64');
        } else {
          avatarURL64 = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
        }
        toFindChan.createWebhook(`${message.author.username}`, `${avatarURL64}`).then(webhook => {
          webhook.send(`${newArgs}`).then(wb => webhook.delete()) 
        })

      }
    }

});

client.on("guildMemberAdd", (member) => {

  setTimeout(function() {
    var membersCount = client.users.size;
    client.user.setActivity(`${membersCount} utilisateurs`, {type: "WATCHING"});
  }, 3 * 1000)

  if ((member.guild.name == "2019 | Portail Cheriana | FR") || (member.guild.id == "525363756704858115")) return;
  
  cherianaOwnersRole = member.guild.roles.get("524282758160449556");
  cheriUserRole = member.guild.roles.get("524279902007066632");
  cheriUserCatRole = member.guild.roles.get("524343443405930507");
  botCatRole = member.guild.roles.get("524342298117668864");
  newAuthBotRole = member.guild.roles.get("524341728489111568");
  quarantineRole = member.guild.roles.get("524579534725447687");
  text = `**BIENVENUE sur 2019 | Cheriana | FR\n\nCe serveur 99% anarchique est une expérience communautaire virtuelle**\n
Comme tout nouveau membre l'intégrant vous venez de vous voir attribué(e) les pleins pouvoirs
toutefois amputés de la possibilité de rentrer vos propres bots sur le serveur
et ce tant que vous n'aurez pas fait vos preuves aux yeux de tous.\n
Néanmoins... si lors de votre premier anniversaire célébrant vos **6 mois d'ancienneté**
vous vous êtes montré(e) relativement bienveillant(e) envers l'ensemble de cette communauté,
et que vous n'avez bien évidemment pas été banni(e) entre temps par un(e) tout(e) puissant(e)
provoquant de fait une remise à zéro de votre **compteur de sagesse** ...
Vous obtiendrez alors la possibilité d'intégrer votre propre bot au serveur, vous offrant ainsi
une totale liberté de création, couplée à une totale capacité de contrôle et d'autorité
que vous saurez bien évidemment (cela va d'soit!) honorer ^^\n
Libre à vous comme à chacun d'apporter votre/sa contribution tout en gardant à l'esprit
que l'intégralité du serveur peut être réduite à néant à tout instant et ce régulièrement,
par les simples mauvaises intentions du plus petit nombre.\n
:warning: **Ce salon s'autodétruira de lui-même si vous ne le faites avant échéance du délai de: `;
  var addText = `est entré sur **2019 | Cheriana | FR**`;
  var membersCount = client.users.size;

  // Case some user try to delete a chierana protected textual/vocal by his nickname egal to chan name
  if (member.user.username == "cheriana") return member.kick();

  // NEW USER IS NOT A BOT
  if (!member.user.bot) {
    var birthFile = "./birthdays/" + member.id + ".js"
    var quarantineFile = "./quarantine/" + member.id + ".js"
    var data = `function birth_${member.id}() {
  birth_${member.id} = ${new Date()}
}

module.exports = birth_${member.id}`;

    // KNOWN USER ID
  	if (fs.existsSync(birthFile) || fs.existsSync(quarantineFile)) {

      if (fs.existsSync(birthFile)) fs.unlinkSync(birthFile)
  	  if (!fs.existsSync(quarantineFile)) fs.createFileSync(quarantineFile)

      member.addRole(quarantineRole.id) && member.addRole(cheriUserCatRole.id)

      member.guild.createChannel(`${member.user.username}`,'text').then(createChan => {

      var userChan = member.guild.channels.find(chan => chan.id == `${createChan.id}`)
      newuserChanName = userChan.name

      userChan.overwritePermissions(member.id, {
  VIEW_CHANNEL: true,
  SEND_MESSAGES: true,
  READ_MESSAGE_HISTORY: true,
  ATTACH_FILES: false
});
      setTimeout(function() {
      	userChan.send(`Vous êtes déjà venu(e) sur **${member.guild.name}**\n
Afin de préserver ces lieux de la potentielle obscurité qui sommeille en chacun de nous,\nvous avez été mis(e) à l'écart en attendant qu'un autre membre vienne s'occupe de vous.

Ce salon est à votre disposition pour vous permettre de discuter avec l'ensemble des membres du serveur d'ici là ${member}`)
      }, 2 * 1000);

      client.on("guildMemberRemove", (member) => {
        var chan = member.guild.channels.find(chan => chan.id == `${createChan.id}`)
        
      	if (chan != undefined) {
          chan.delete()
          console.log(" chan name : " + chan.name)
          console.log(" member name : " + member.user.username)
        }
      })
  })

  	} else member.addRole(cheriUserCatRole.id) && member.addRole(cheriUserRole.id).then(addRole =>  {

  	member.guild.createChannel(`${member.user.username}`, "text").then(createChan => {
      
      var userChan = member.guild.channels.find(chan => chan.id == `${createChan.id}`)
      newuserChanName = userChan.name

      fs.createFile(birthFile).then(writeFileSync => {
      	fs.writeFileSync(birthFile, data)
      })

      //CHANNEL MSG + AUTODELETE COUNT
  	  if (createChan != undefined) createChan.send(text + `\`1 minute et 30 secondes\`**` + `\n\n${member}`).then(msg => {

  	  	const timerDelChan = require("./functions/timerDelChan.js")
        timerDelChan()

  	  	// CHANNEL DELETE TIMER
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 10 * 1000)
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 20 * 1000)
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 30 * 1000)
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 40 * 1000)
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 50 * 1000)
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 60 * 1000)
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 70 * 1000)
  	    setTimeout(function() {
  	      if (msg != undefined) msg.edit(text + leftTime + `\n\n${member}`)
  	    }, 80 * 1000)

  	    // CHAN DELETE TIMEOUT
        setTimeout(function() {
          if (createChan != undefined) return createChan.delete()
  	    }, 90 * 1000)

  	  })
  	})
  })
  cherianaLogs.send(`**${member.user.username} [USER]** ` + addText + `\nSon identifiant est: **${member.id}**`) && console.log(member.user.username + ' ' + addText)

  // NEW USER IS A BOT
  } else {
    member.addRole(newAuthBotRole.id);
    cherianaLogs.send(`**${member.user.username} [BOT]** ` + addText) && console.log(member.user.username + ' ' + addText);
  }

});

client.on("guildMemberRemove", (member) => {

  setTimeout(function() {
    var membersCount = client.users.size;
    client.user.setActivity(`${membersCount} utilisateurs`, {type: "WATCHING"});
  }, 3 * 1000)

  if ((member.guild.name == "2019 | Portail Cheriana | FR") || (member.guild.id == "525363756704858115")) return;

  var cherianaLogs = client.channels.get("525714829571260459") // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-logs
  var quitText = `a quitté **2019 | Cheriana | FR**`;
  var birthFile = "./birthdays/" + member.id + ".js"
  var quarantineFile = "./quarantine/" + member.id + ".js"
  
  if (fs.existsSync(birthFile)) fs.unlinkSync(birthFile)
  fs.createFile(quarantineFile)

  var chan = member.guild.channels.find(chan => chan.name == `${member.user.username}` && chan.type == "text")

  if (chan != undefined) {
    member.guild.deleteChannel(`${member.user.username}`, "text")
    console.log(" chan name : " + chan.name)
    console.log(" member name : " + member.user.username)
  }

  if (!member.user.bot) cherianaLogs.send(`**${member.user.username} [USER]** ` + quitText + `\nSon identifiant est: **${member.id}**`) && console.log(member.user.username + ' ' + quitText)
  if (member.user.bot) cherianaLogs.send(`**${member.user.username} [BOT]** ` + quitText) && console.log(member.user.username + ' ' + quitText)

});

client.on('channelCreate', (channel) => {

  if (channel.guild == undefined) return;

  if ((channel.guild.name == "2019 | Portail Cheriana | FR") || (channel.guild.id == "525363756704858115")) return;

  // Restrictions
  if ((channel.name == "cheriana") && (channel.type == "text")) return channel.setName("will-be-destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "silence-room") && (channel.type == "text")) return channel.setName("will-be-destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "Cheriana") && (channel.type == "voice")) return channel.setName("Will Be Destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "🔇 Silence Room") && (channel.type == "voice")) return channel.setName("Will Be Destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if (channel.type == "category") return channel.setName("WILL BE DESTROYED").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))

  if ((channel.name != "cheriana-resurrection") || (channel.name != "silence-room-resurrection")) {

    if (channel.type == "text") cheribackup.guild.createChannel(channel.name, "text").then(createdChannel =>  {

      setTimeout(function() {

        if (channel.name == newuserChanName) {

          createdChannel.setParent("528051676343435304") // Server: 2019 | Portail Cheriana | FR Channel: #NEW USERS CHANNELS [category channel]
          console.log(" createdChan name = " + channel.name)
          console.log(" newUserChanName = " + newuserChanName)

        } else {
          createdChannel.setParent("527920710631555073") // Server: 2019 | Portail Cheriana | FR Channel: #CHERIBACKUP [category channel]

        }

      }, 1 * 1500)
      
      cherianaLogs.send("Le salon **#" + channel.name + "** vient d'être créé")
      cherianactivity.send("Le salon **#" + channel.name + "** vient d'être créé")
      console.log("Le salon #" + channel.name + " vient d'être créé")
    })
  
  }
  
});

client.on('channelDelete', (channel, user) => {

  if (channel.guild == undefined) return;
  if ((channel.guild.name == "2019 | Portail Cheriana | FR") || (channel.guild.id == "525363756704858115")) return;

  if ((channel.name == "cheriana") || (channel.name == "Cheriana")) {

  if (channel.type == "text") {
  	channel.guild.createChannel(`cheriana-resurrection`, "text")
  	.then(createChan => {
  	  setTimeout(function() {
        if (createChan != undefined) {
          createChan.setName("cheriana").then(setName => createChan.createInvite({maxAge: 0, maxUses: 0}).then(invite => {
            createChan.send(invite.url)
            cherianaPassInvite.send(invite.url)
            var toDelMsg = cherianaLogs.lastMessageID;
            cherianaLogs.fetchMessage(toDelMsg).then(msg => msg.delete());
            console.log(invite.url)
          }))
        }
  	   }, 3 * 1000 );
  	   console.log(' Some user try to delete Cheriana [Master Textual Channel]')
    })

  } else if (channel.type == "voice") {
  	channel.guild.createChannel(`Cheriana Résurrection`, "voice")
    .then(createChan => {
      setTimeout(function() {
        if (createChan != undefined) createChan.setName("Cheriana")
       }, 3 * 1000 )
    })
  	console.log(' Some user try to delete the Master Vocal Channel')
  }

} else if ((channel.name == "silence-room") && (channel.type == "text")) {

  channel.guild.createChannel(`silence-room-resurrection`, "text")
    .then(createChan => {
      setTimeout(function() {
        if (createChan != undefined) {
          createChan.setName("silence-room")
        }
       }, 3 * 1000 );
       console.log(' Some user try to delete #silence-room')
    })

} else if (channel.name == "🔇 Silence Room") {
  channel.guild.createChannel("Silence Room Résurrection", "voice")
  .then(createChan => {
      setTimeout(function() {
        if (createChan != undefined) createChan.setName("🔇 Silence Room")
       }, 3 * 1000 )
    })
    console.log(' Some user try to delete the 🔇 Silence Room [Protected Vocal Channel]')

  } else {

    var thisChannel = cheribackup.guild.channels.find(chan => chan.name === channel.name);

    if (!thisChannel) {
      return console.log("thisChannel is undefined - err 123")
    } else {
      thisChannel.send("**END OF THIS CHANNEL - [HAS BEEN DELETED]**")
    }

  cherianaLogs.send("Le salon **#" + channel.name + "** vient d'être supprimé")
  console.log("Le salon #" + channel.name + " vient d'être supprimé")

  if (!newuserChanName) return
  if (channel.name == newuserChanName) {
    newuserChanName = null;
  }

  }

});

client.on('channelUpdate', (oChannel, nChannel) => {

  if ((oChannel.guild == undefined) || (oChannel.guild == undefined))return

  // Created Channels Backup on 2019 | Portail Cheriana | FR
  if ((nChannel.guild.name == "2019 | Portail Cheriana | FR") || (oChannel.guild.name == "2019 | Portail Cheriana | FR")) return;
  if ((nChannel.guild.id == "525363756704858115") || (oChannel.guild.id == "525363756704858115")) return;

  if ((oChannel.name == "cheriana") && (nChannel.name != "cheriana")) nChannel.setName("cheriana")
  if ((oChannel.name == "Cheriana") && (nChannel.name != "Cheriana")) nChannel.setName("Cheriana")
  if ((oChannel.name == "silence-room") && (nChannel.name != "silence-room")) nChannel.setName("silence-room")
  if ((oChannel.name == "🔇 Silence Room") && (oChannel.name != "🔇 Silence Room")) nChannel.setName("🔇 Silence Room")

  if (((oChannel.name != "cheriana") && (oChannel.name != "cheriana-resurrection")) && (nChannel.name == "cheriana") && ((oChannel.type == "text") || (nChannel.type == "text"))) nChannel.setName('poubelle').then(setName => nChannel.delete());
  if (((oChannel.name != "Cheriana") && (oChannel.name != "Cheriana Résurrection")) && (nChannel.name == "Cheriana") && ((oChannel.type == "voice") || (nChannel.type == "voice"))) nChannel.setName('Poubelle').then(setName => nChannel.delete());
  if (((oChannel.name != "silence-room") && (oChannel.name != "silence-room-resurrection")) && (nChannel.name == "silence-room") && ((oChannel.type == "text") || (nChannel.type == "text"))) nChannel.setName('poubelle').then(setName => nChannel.delete());
  if (((oChannel.name != "🔇 Silence Room") && (oChannel.name != "Silence Room Résurrection")) && (nChannel.name == "🔇 Silence Room") && ((oChannel.type == "voice") || (nChannel.type == "voice"))) nChannel.setName('Poubelle').then(setName => nChannel.delete());

  if (((oChannel.name == cheriana.name) && (nChannel.name == cheriana.name)) && (nChannel.postition != 0)) return nChannel.setPosition(0)

    var thisChannel = client.channels.find(chan => nChannel.id === oChannel.id);

    if (!thisChannel) {
      return console.log("thisChannel is undefined. No Channel Updated. Maybe has been deleted ?")

    } else {
      var toFindChan = cheribackup.guild.channels.find(chan => chan.name == oChannel.name);

      if (!toFindChan) {
        return 
      } else {
        toFindChan.setName(`${nChannel.name}`)
        setTimeout(function() {
          if ((nChannel.name == oChannel.name) && (nChannel.postition != oChannel.postition)) {
            cherianaLogs.send("Le salon **#" + oChannel.name + "** a été déplacé") && console.log(" #" + oChannel.name + " has been moved")
          } else if ((nChannel.name != oChannel.name) && (nChannel.postition == oChannel.postition)) {
            cherianaLogs.send(`Le salon **#${oChannel.name}** a été renommé en **${nChannel.name}**`) && console.log(oChannel.name + " has been renamed as " + nChannel.name)
          }
      }, 1 * 1000)
      }
    }

});

//////////////////////////////////////////////////////////////////////////////////////////
//  VOICE STATE UPDATE
//////////////////////////////////////////////////////////////////////////////////////////

client.on('voiceStateUpdate', (oldMember, newMember) => {

  if ((newMember.guild.name == "2019 | Portail Cheriana | FR") || (newMember.guild.id == "525363756704858115")) return;
  if (newMember == undefined) return;

  var newUserChannel = newMember.voiceChannel
  var oldUserChannel = oldMember.voiceChannel
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  var afkVC = client.channels.find(chan => chan.name == "🚽 - Les Chiottes")

  if ((oldUserChannel != undefined) && (newUserChannel == undefined)) {
    cherianaLogs.send(`**${newMember.user.username}** s'est déconnecté du salon **${oldUserChannel.name}**`)
    console.log(' ' + newMember.user.username + ` s'est déconnecté du salon ` + oldUserChannel.name)
  }
  if ((oldUserChannel == undefined) && (newUserChannel != undefined)) {
    cherianaLogs.send(`**${newMember.user.username}** s'est connecté au salon **${newUserChannel.name}**`)
    console.log(' ' + newMember.user.username + ` s'est connecté au salon ` + newUserChannel.name)
  }
  if (((newUserChannel != undefined) && (oldUserChannel != undefined)) && (newUserChannel.name != oldUserChannel.name)) {
    cherianaLogs.send(`**${newMember.user.username}** s'est déplacé du salon **${oldUserChannel.name}** vers **${newUserChannel.name}**`)
    console.log(' ' + newMember.user.username + " s'est déplacé du salon " + oldUserChannel.name + " vers " + newUserChannel.name)
  }

  if (newUserChannel == undefined) return;

  // New Human User
  if (!newMember.user.bot) {

    if (newUserChannel.name == silentRoomVC.name) {
      if (newMember.serverMute == false) newMember.setMute(true) && console.log(" Someone has tryed to Mute " + newMember.user.username)
      if (newMember.serverDeaf == false) newMember.setDeaf(true) && console.log(" Someone has tryed to Deaf " + newMember.user.username)
    } else if (newUserChannel.name == afkVC.name) {
      if (newMember.serverMute == false) newMember.setMute(true) && console.log(" Someone has tryed to Mute " + newMember.user.username)
    } else {
      if (newMember.serverMute == true) newMember.setMute(false) && console.log(" Someone has tryed to Mute " + newMember.user.username)
      if (newMember.serverDeaf == true) newMember.setDeaf(false) && console.log(" Someone has tryed to Deaf " + newMember.user.username)
    }

  // New Bot User
  } else if (newMember.user.bot) {
    
    if (newUserChannel.name == silentRoomVC.name) {
      if (newMember.serverMute == false) newMember.setMute(true)
      if (newMember.serverDeaf == false) newMember.setDeaf(true)
    } else {
      if (newMember.serverMute == true) newMember.setMute(false)
      if (newMember.serverDeaf == true) newMember.setDeaf(false)
    }

  }

});

client.on("guildUpdate", (oldGuild, newGuild) => {

  if (oldGuild.id == "525363756704858115") return;
  if (newGuild.id == "525363756704858115") return;

  var cherianaVC = client.channels.find(chan => chan.name === 'Cheriana')
  var cheriana = client.channels.find(chan => chan.name === 'Cheriana')
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")

  if (newGuild.name != "2019 | Cheriana | FR") return newGuild.setName("2019 | Cheriana | FR").then(setName => console.log(" Someone has tryed to change ServerName"))
  if (newGuild.defaultMessageNotifications === "ALL") return newGuild.setDefaultMessageNotifications("MENTIONS").then(setDefMsgNotif => console.log(" Someone has tryed to change Default Message Notifications ServerSettings"))
  if ((newGuild.afkChannelID == cherianaVC.id) || (newGuild.afkChannelID == silentRoomVC.id)) newGuild.createChannel("°0_0°", 'voice').then(createChan => {
    if (newGuild.afkChannelID == cherianaVC.id) console.log(" Someone has tryed to set Cheriana [Master Vocal Channel] has default **AFK Channel**")
    if (newGuild.afkChannelID == silentRoomVC.id) console.log(" Someone has tryed to set 🔇 Silence Room [Protected Vocal Channel] has default **AFK Channel**")
      newGuild.setAFKChannel(createChan).then(setAFKChannel => {
        if (createChan != undefined) setTimeout(function() {createChan.delete(), console.log(newGuild)}, 1 * 2500)
      }) 
  })
  if (newGuild.icon != oldGuild.icon) return newGuild.setIcon("./resources/server_icon.png") && console.log(" Someone has tryed to change ServerIcon")
  if (newGuild.region != "eu-central") newGuild.setRegion("eu-central") && console.log(" Someone has tryed to change Region ServerSettings")
  if (newGuild.verificationLevel != "0") return newGuild.setVerificationLevel("0").then(setVerificationLevel => console.log(" Someone has tryed to change verificationLevel ServerSettings"))
  if (newGuild.explicitContentFilter != "0") return newGuild.setExplicitContentFilter("0").then(setExplicitContentFilter => console.log(" Someone has tryed to change ExplicitContentFilter ServerSettings"))
});

client.on("guildMemberUpdate", (oldMember, newMember) => {

  if ((newMember.guild.name == "2019 | Portail Cheriana | FR") || (newMember.guild.id == "525363756704858115")) return;
  if ((oldMember.guild.name == "2019 | Portail Cheriana | FR") || (oldMember.guild.id == "525363756704858115")) return;

  if (oldMember.roles.has(quarantineRole.id) && newMember.roles.has(cheriUserRole.id)) newMember.removeRole(quarantineRole.id).then(removeRole => {
    if (cheriana != undefined) return cheriana.send(`${newMember} un membre du serveur a prit la responsabilité de vous réintégrer.\nLibre à vous de trahir, ou pas, la confiance qu'il et qu'on **VOUS** accorde.`)/*.then(msg => {
      var toDelMsg = cheriana.lastMessageID;
      var lastBotMsg = client.user.lastMessageID;
        cheriana.fetchMessage(toDelMsg).then(msg => msg.delete());
    })*/
  })
});

client.login(config.token);