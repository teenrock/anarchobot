const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect: true, max_cache_message: 0});
const config = require("./config.json");
const fs = require("fs-extra");
const prefix = config.conf.prefix;

let serverIsRegenerating = undefined

client.on("ready", () => {

  // GUILDS
  cherianaGuild = client.guilds.find(guild => guild.id == config.guilds.cheriana); // Server: 2019 | Cheriana | FR
  portailGuild = client.guilds.find(guild => guild.id == config.guilds.portail); // Server: 2019 | Portail Cheriana | FR
  // CHANNELS
  cheriana = cherianaGuild.channels.find(chan => chan.name == "cheriana")
  silentRoom = cherianaGuild.channels.find(chan => chan.name == "silence-room")
  cherianaVC = cherianaGuild.channels.find(chan => chan.name == "Cheriana")
  silentRoomVC = cherianaGuild.channels.find(chan => chan.name == "🔇 Silence Room")
  afkVC = cherianaGuild.channels.find(chan =>chan.name == "🚽 - Les Chiottes")
  cherianaPassInvite = portailGuild.channels.get(config.channels.cherianaPassInvite) // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-invitation
  cherianaLogs = portailGuild.channels.get(config.channels.cherianaLogs) // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-logs
  cherianactivity = portailGuild.channels.get(config.channels.cherianactivity) // Server: 2019 | Portail Cheriana | FR Channel: #cherianactivity
  // CATEGORY CHANNELS
  cheribackup = client.channels.get(config.categories.cheribackup); // Server: 2019 | Portail Cheriana | FR Channel: #CHERIBACKUP [category channel]
  newUsersChannels = client.channels.get(config.categories.newUsersChannels); // Server: 2019 | Portail Cheriana | FR Channel: #NEW USERS CHANNELS [category channel]
  oldChannels = client.channels.get(config.categories.oldChannels); // Server: 2019 | Portail Cheriana | FR Channel: #OLD CHANNELS [category channel]
  // USERS
  ownnerUser = client.users.get(config.conf.ownerID);
  // ROLES
  anarchobotRole = cherianaGuild.roles.find(role => role.id  == config.roles.anarchobot)
  // afkBotRole = cherianaGuild.roles.find(role => role.id  == "533468222603788310")
  cheriOwnerRole = cherianaGuild.roles.find(role => role.id == config.roles.cheriOwner)
  newAuthBotRole = cherianaGuild.roles.find(role => role.id == config.roles.newAuthBot)
  cheriBotTeam = cherianaGuild.roles.find(role => role.id == config.roles.cheriBotTeam)
  quarantineRole = cherianaGuild.roles.find(role => role.id == config.roles.quarantine)
  cheriUserCatRole = cherianaGuild.roles.find(role => role.id == config.roles.cheriUserCat)
  cheriUserRole = cherianaGuild.roles.find(role => role.id == config.roles.cheriUser)
  // COLOR ROLES
  color0 = cherianaGuild.roles.get(config.roles.colours.blanc)
  color5 = cherianaGuild.roles.get(config.roles.colours.gris)
  color10 = cherianaGuild.roles.get(config.roles.colours.noir)
  color20 = cherianaGuild.roles.get(config.roles.colours.jaune)
  color30 = cherianaGuild.roles.get(config.roles.colours.orange)
  color40 = cherianaGuild.roles.get(config.roles.colours.rouge)
  color50 = cherianaGuild.roles.get(config.roles.colours.rose)
  color60 = cherianaGuild.roles.get(config.roles.colours.violet)
  color70 = cherianaGuild.roles.get(config.roles.colours.bleu)
  color80 = cherianaGuild.roles.get(config.roles.colours.cyan)
  color90 = cherianaGuild.roles.get(config.roles.colours.vert)
  color100 = cherianaGuild.roles.get(config.roles.colours.marron)

  // USERS
  ownerUser = client.users.get(config.conf.ownerID);
  // OTHERS
  newuserChanName = null;
  cherianAlert = undefined;
  vocInvite = undefined;

  colorList = []
  colorList.push(color0, color5, color10, color20, color30, color40, color50, color60, color70, color80, color90, color100)

  protectedRolesList = []
  protectedRolesList.push(anarchobotRole, cheriOwnerRole, newAuthBotRole, cheriBotTeam, quarantineRole, cheriUserCatRole, cheriUserRole)
  xzdcUsersList = []

  membersCount = cherianaGuild.members.size;
  var serverCount = client.guilds.size;
  const guildNames = client.guilds.map(g => (g.name + "\n"));
  var startMsg = `\n ${client.user.username}@client [Started] ${new Date()}
 --------------------------------------\n Utilisateurs: ${membersCount}\n Serveur(s): ${serverCount}\n ${guildNames}\n --------------------------------------\n`;

  client.user.setUsername(`${client.user.username}`);
  //client.user.setActivity(``, {type: "WATCHING"});
  client.user.setStatus("online"); // online / dnd / idle / invisible
  client.user.setActivity(`${membersCount} utilisateurs`, {type: "WATCHING"});
  console.log(startMsg + '\n Detected Channels :\n');

  client.channels.forEach(chan => {
    if ((chan.guild.id == config.guilds.cheriana) && (chan.type == "text")) console.log(' ' + chan.guild.name + '             [  Textual ]     # ' + chan.name)
  })

  client.channels.forEach(chan => {
    if ((chan.guild.id == config.guilds.cheriana) && (chan.type == "voice")) console.log(' ' + chan.guild.name + '             [    Vocal ]     🔈 ' + chan.name)
  })

  client.channels.forEach(chan => {
    if ((chan.guild.id == config.guilds.portail) && (chan.type == "category")) console.log(' ' + chan.guild.name + '     [ Category ]     | ' + chan.name)
  })

  client.channels.forEach(chan => {
    if ((chan.guild.id == config.guilds.portail) && (chan.type == "text")) console.log(' ' + chan.guild.name + '     [  Textual ]     # ' + chan.name)
  })
  console.log(' ');

/*
  setInterval(function() {console.log("cheriana lastMessageID: " + cheriana.lastMessageID)}, 3 * 1000)
  setInterval(function() {console.log("Bot.user lastMessageID: " + client.user.lastMessageID)}, 3 * 1000)
*/

// console.log(newUsersChannels)

// SERVER CHANNELS AUTO RESTORE IF NOT EXISTS
if (cheriana == undefined) {
  serverIsRegenerating = true
  cherianaGuild.createChannel("cheriana").then(createdChannel => {
    cheriana = client.channels.find(chan => chan.name == createdChannel.name)
  })
}

if (silentRoom == undefined) {
  serverIsRegenerating = true
  cherianaGuild.createChannel("silence-room").then(createdChannel => {
    silentRoom = client.channels.find(chan => chan.name == createdChannel.name)
  })
}

  if (!cherianaVC) {
  serverIsRegenerating = true
  cherianaGuild.createChannel(`Cheriana`, "voice").then(createdChannel => {
    cherianaVC = client.channels.find(chan => chan.name == createdChannel.name)
  })
}

if (!silentRoomVC) {
  serverIsRegenerating = true
  cherianaGuild.createChannel("🔇 Silence Room", "voice").then(createdChannel => {
    silentRoomVC = client.channels.find(chan => chan.name == createdChannel.name)
  })
}

if (!afkVC) {
  serverIsRegenerating = true
  cherianaGuild.createChannel("🚽 - Les Chiottes", "voice").then(createdChannel => {
    afkVC = client.channels.find(chan => chan.name == createdChannel.name)
  })
}

if (cherianaGuild.name != "2019 | Cheriana | FR") cherianaGuild.setName("2019 | Cheriana | FR");

cherianaGuild.setIcon("./resources/server_icon.png")

setTimeout(function() {
  if ((cheriana == undefined) || (silentRoom == undefined) || (cherianaVC == undefined) || (silentRoomVC == undefined) || (afkVC == undefined)) {
  	serverIsRegenerating = true
  	console.log(" A Secured Channel Is : UNDEFINED [NEED A MOMENT TO REGENERATE]\n ServerIsRegenerating Status Has Been Changed to : TRUE\n")
  	setTimeout(function() {
  	  serverIsRegenerating = false
  	  console.log(" ServerIsRegenerating Status Has Been Forced to : FALSE\n")
  	}, 2 * 1000)
  } else {
  	serverIsRegenerating = false
  	console.log(" Doesn't Need To Regenerate Any Channel\n ServerIsRegenerating Status Has Been Passed to : FALSE\n")
  }
}, 3 * 1000)

/*
  setInterval(function() {
    console.log(cherianaGuild.name + " [IsRegenerating Status] = " + serverIsRegenerating)
  }, 1 * 2000)
*/

});

client.on("error", err => {
  console.log(err.type)
});

  client.on("message", message => {

    if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

    cheriana = client.channels.find(chan => chan.name == "cheriana")
    silentRoom = client.channels.find(chan => chan.name == "silence-room")
    cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
    silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
    afkVC = client.channels.find(chan =>chan.name == "🚽 - Les Chiottes")

    const portailCmds = require("./cmds/portailCmds.js")
    portailCmds(message, prefix, client, config)

  if (!message.guild) return console.log(message.author.username + " sur #" + client.user.username + `: ${message}`) 

  if ((message.guild.name == "2019 | Portail Cheriana | FR") || (message.guild.id == config.guilds.portail)) return;

  var anarchobotRole = cherianaGuild.roles.find(role => role.id  == config.roles.anarchobot)
  var cheriOwnerRole = cherianaGuild.roles.find(role => role.id == config.roles.cheriOwner)
  var newAuthBotRole = cherianaGuild.roles.find(role => role.id == config.roles.newAuthBot)
  var cheriBotTeam = cherianaGuild.roles.find(role => role.id == config.roles.cheriBotTeam)
  var quarantineRole = cherianaGuild.roles.find(role => role.id == config.roles.quarantine)
  var cheriUserCatRole = cherianaGuild.roles.find(role => role.id == config.roles.cheriUserCat)
  var cheriUserRole = cherianaGuild.roles.find(role => role.id == config.roles.cheriUser)

  var botID = client.users.get(`${client.user.id}`);
  var command = message.content.split(" ")
  var member = message.mentions.members.first();
  let replacedMention = [`${member}`];
  var msgchan = message.channel;
  var args = command;
  var thisChannel = client.channels.find(chan => chan.id === message.channel.id);
  var vChan = message.member.voiceChannel;

  newArgs = message.content;

  // SilentRoom Cmds Restrictions & auto delete cmds + log
  if (message.content.startsWith(prefix) && (message.channel != undefined)) {
    if (message.channel == silentRoom) return message.delete() && message.author.send(`Le salon ${silentRoom} n'est pas destiné à l'utilisation de commandes quelle qu'elles soient.`)
    message.delete(1000)
    console.log("\n " + message.author.username + " a tapé la commande: " + message.content)
  }

  if (message.channel == silentRoom) {

    if (!vChan) {
      return message.delete().then(del => message.author.send(`Vous devez être connecté au salon vocal **🔇 Silence Room** pour pouvoir écrire sur **${silentRoom}**`))
    } else if (vChan.name != "🔇 Silence Room") return message.delete().then(del => message.author.send(`Vous devez être connecté au salon vocal **🔇 Silence Room** pour pouvoir écrire sur **${silentRoom}**`))

  } else if ((message.channel == silentRoom) && (vChan.name == "🔇 Silence Room")) {
    silentRoom.send(MSGChan)
    console.log(MSGChanLog)
  }

  // Auto Chan SetPosition on Message
  if ((message.channel.postition != 1) && ((message.channel.name != "silence-room") && (message.channel.name != "cheriana"))) message.channel.setPosition(1)
  if ((message.channel.position != 0) && (message.channel.name == "cheriana")) message.channel.setPosition(0)

  // OWner Cmds
  if (message.author.id == config.conf.ownerID) {
    const ownerCmds = require("./cmds/ownerCmds.js")
    ownerCmds(message, prefix, client, command, config)
  }

  // Users Cmds
  const usersCmds = require("./cmds/usersCmds.js")
  usersCmds(message, prefix, client, fs, command, colorList, config)


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

    if ((!message.attachment) && (!message.content.type == "text")) { // A
      console.log("MESSAGE IS NOT A TEXT MESSAGE")
    } else {
      cherianactivity.send(MSGChan)
      console.log(MSGChanLog)
    }
    
    if (!thisChannel) {
      return
    } else {
      var toFindChan = cheribackup.guild.channels.find(chan => chan.name == thisChannel.name);

      if (!toFindChan) {
        return console.log("thisChannel is undefined - err 121")
      } else {

      	if (newArgs == undefined) return console.log("newArgs global variable is undefined - Err 110 [TOO SHORT DELAY BETEWEEN MESSAGES]")

        if (!message.author.bot) {
          var author_ = client.users.get(`${message.author.id}`);

        if (author_.avatarURL !== null) {
          avatar = author_.avatarURL.split('size=2048').join('size=64');
        } else {
          avatar = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
        }

        toFindChan.createWebhook(`${author_.username}`, `${avatar}`).then(webhook => {
          if ((message == undefined) || (message == null) || (newArgs == undefined)) return webhook.delete() && console.log(" Embed or empty message detected")
          webhook.send(`${newArgs}`), newArgs = undefined, webhook.delete()
        })

        } else if (message.author.bot) {
          var author_ = message.author;
          var avatar = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
          
          toFindChan.createWebhook(`${author_.username}`, `${avatar}`).then(webhook => {
          if ((message == undefined) || (message == null) || (newArgs == undefined)) return webhook.delete() && console.log(" Embed or empty message detected")
          webhook.send(`${newArgs}`), newArgs = undefined, webhook.delete()
        })

        }

      }
    }

});

client.on("guildMemberAdd", (member) => {

  if ((member.guild.name == "2019 | Portail Cheriana | FR") || (member.guild.id == config.guilds.portail)) {
  	
  	var toExitMember = cherianaGuild.members.find(m => m.id == member.id)

  	// Member is not present on Cheriana
    if (!toExitMember) {
      return

    // Member is already present on Cheriana
    } else return toExitMember.kick();

  }
  
  cheriOwnerRole = member.guild.roles.get(config.roles.cheriOwner);
  cheriUserRole = member.guild.roles.get(config.roles.cheriUser);
  cheriUserCatRole = member.guild.roles.get(config.roles.cheriUserCat);
  botCatRole = member.guild.roles.get(config.roles.cheriBotTeam);
  newAuthBotRole = member.guild.roles.get(config.roles.newAuthBot);
  quarantineRole = member.guild.roles.get(config.roles.quarantine);
  text = `**BIENVENUE sur 2019 | Cheriana | FR\n\nCe serveur 99% anarchique est une expérience communautaire virtuelle**\n
Comme tout nouveau membre l'intégrant vous venez de vous voir attribué(e) les pleins pouvoirs
toutefois amputés de la possibilité de rentrer vos propres bots sur le serveur
et ce tant que vous n'aurez pas fait vos preuves aux yeux de tous.\n
Libre à vous comme à chacun d'apporter votre/sa contribution tout en gardant à l'esprit
que l'intégralité du serveur peut être réduite à néant à tout instant et ce régulièrement,
par les simples mauvaises intentions du plus petit nombre.\n
Le serveur d'où vous veniez a disparu de votre liste, ne cherchez pas à revenir dessus !
Vous seriez automatiquement expulsé de ces lieux et devriez par conséquent attendre que quelqu'un vienne s'occuper de votre réintégration.\n
:warning: **Ce salon s'autodétruira de lui-même si vous ne le faites avant échéance du délai de: `;
  var addText = `est entré sur **2019 | Cheriana | FR**`;

  if (ownerUser != undefined) ownerUser.send('Un nouvel utilisateur vient d\'entrer sur **' + member.guild.name + '**.\nIl s\'agit de: **' + member.user.username + '**' );

  // Case some user try to delete a chierana protected textual/vocal by his nickname egal to chan name
  if (member.user.username == "cheriana") return member.kick();
  
  var toExitMember = portailGuild.members.find(m => m.id == member.id)

  if (!toExitMember) {
  	return
  } else toExitMember.kick();

  setTimeout(function() {
    var membersCount = cherianaGuild.members.size;
    client.user.setActivity(`${membersCount} utilisateurs`, {type: "WATCHING"});
  }, 3 * 1000)

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
    var membersCount = cherianaGuild.members.size;
    client.user.setActivity(`${membersCount} utilisateurs`, {type: "WATCHING"});
  }, 3 * 1000)

  if ((member.guild.name == "2019 | Portail Cheriana | FR") || (member.guild.id == config.guilds.portail)) return;

  var cherianaLogs = client.channels.get(config.channels.cherianaLogs) // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-logs
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

  if (ownerUser != undefined) ownerUser.send('Un utilisateur vient de quitter **' + member.guild.name + '**.\nIl s\'agit de: **' + member.user.username + '**' );

});

client.on('channelCreate', (channel) => {

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  var cheriana = client.channels.find(chan => chan.name == "cheriana")
  var silentRoom = client.channels.find(chan => chan.name == "silence-room")
  var cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  var afkVC = client.channels.find(chan =>chan.name == "🚽 - Les Chiottes")

  if (channel.guild == undefined) return;

  if ((channel.guild.name == "2019 | Portail Cheriana | FR") || (channel.guild.id == config.guilds.portail)) return;

  // Restrictions
  if ((channel.name == "cheriana") && (channel.type == "text")) return channel.setName("will-be-destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "silence-room") && (channel.type == "text")) return channel.setName("will-be-destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "Cheriana") && (channel.type == "voice")) return channel.setName("Will Be Destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "🔇 Silence Room") && (channel.type == "voice")) return channel.setName("Will Be Destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if (channel.type == "category") return channel.setName("WILL BE DESTROYED").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))

  if ((channel.name != "cheriana-resurrection") && (channel.name != "silence-room-resurrection")) {

    if (channel.type == "text") cheribackup.guild.createChannel(channel.name, "text").then(createdChannel =>  {

      createdChannel.overwritePermissions(createdChannel.guild.defaultRole, {
  	    VIEW_CHANNEL: false,
  		SEND_MESSAGES: false
	  })

      setTimeout(function() {

        if (channel.name == newuserChanName) {

          createdChannel.setParent(config.categories.newUsersChannels) // Server: 2019 | Portail Cheriana | FR Channel: #NEW USERS CHANNELS [category channel]
          console.log(" createdChan name = " + channel.name)
          console.log(" newUserChanName = " + newuserChanName)

        } else createdChannel.setParent(config.categories.cheribackup) // Server: 2019 | Portail Cheriana | FR Channel: #CHERIBACKUP [category channel]

      }, 1 * 1500)
      
      cherianaLogs.send("Le salon **#" + channel.name + "** vient d'être créé")
      cherianactivity.send("Le salon **#" + channel.name + "** vient d'être créé")
      console.log(" Le salon #" + channel.name + " vient d'être créé")
    })
  
  }

});

client.on('channelDelete', (channel, user) => {
  
  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  var cheriana = client.channels.find(chan => chan.name == "cheriana")
  var silentRoom = client.channels.find(chan => chan.name == "silence-room")
  var cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  var afkVC = client.channels.find(chan =>chan.name == "🚽 - Les Chiottes")

  if (channel.guild == undefined) return;
  if ((channel.guild.name == "2019 | Portail Cheriana | FR") || (channel.guild.id == config.guilds.portail)) return;

  if ((channel.name == "cheriana") || (channel.name == "Cheriana")) {

  // SECURED CHANNELS
  if (channel.type == "text") {
    channel.guild.createChannel(`cheriana-resurrection`, "text")
    .then(createdChan => {
      setTimeout(function() {
        if (createdChan != undefined) {
          createdChan.setPosition(0)
          createdChan.setName("cheriana").then(setName => createdChan.createInvite({maxAge: 0, maxUses: 0}).then(invite => {
            createdChan.send(invite.url)
            
            var toDelMsg = cherianactivity.lastMessageID;
            var toDelMsg2 = cherianaPassInvite.lastMessageID;
            console.log("New Cheriana Invite URL : " + invite.url)
            cherianactivity.fetchMessage(toDelMsg).then(msg => msg.delete() && console.log(msg + " [Has Been Deleted]"));
            cherianaPassInvite.fetchMessage(toDelMsg2).then(msg => msg.delete().then(del => {
              cherianaPassInvite.send("**Entrée vers Cheriana:** " + invite.url)
            }) && console.log(msg + " [Has Been Deleted]"));
          }))
        }
       }, 3 * 1000 );
       console.log(' Some user try to delete Cheriana [Master Textual Channel]\n')
    })

  } else if (channel.type == "voice") {
    channel.guild.createChannel(`Cheriana Résurrection`, "voice")
    .then(createdChan => {
      setTimeout(function() {
        if (createdChan != undefined) createdChan.setName("Cheriana")
       }, 3 * 1000 )
    })
    console.log(' Some user try to delete the Master Vocal Channel')
  }

} else if ((channel.name == "silence-room") && (channel.type == "text")) {

  channel.guild.createChannel(`silence-room-resurrection`, "text")
    .then(createdChan => {
      setTimeout(function() {
        if (createdChan != undefined) {
          createdChan.setName("silence-room")
        }
       }, 3 * 1000 );
       console.log(' Some user try to delete #silence-room')
    })

} else if (channel.name == "🔇 Silence Room") {
  channel.guild.createChannel("Silence Room Résurrection", "voice")
  .then(createdChan => {
      setTimeout(function() {
        if (createdChan != undefined) createdChan.setName("🔇 Silence Room")
       }, 3 * 1000 )
    })
    console.log(' Some user try to delete the 🔇 Silence Room [Protected Vocal Channel]')

  // NOT SECURED CHANNELS
  } else {

    var thisChannel = cheribackup.guild.channels.find(chan => chan.name === channel.name);

    if (!thisChannel) {
      return console.log("thisChannel is undefined - err 123")
    } else {
      thisChannel.send("**END OF THIS CHANNEL - [HAS BEEN DELETED]**").then(send => thisChannel.setParent(oldChannels.id))
    }

  cherianaLogs.send("Le salon **#" + channel.name + "** vient d'être supprimé")
  console.log(" Le salon #" + channel.name + " vient d'être supprimé")

  if (!newuserChanName) return
  if (channel.name == newuserChanName) {
    newuserChanName = null;
  }

  }

});

client.on('channelUpdate', (oChannel, nChannel) => {

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  var cheriana = client.channels.find(chan => chan.name == "cheriana")
  var silentRoom = client.channels.find(chan => chan.name == "silence-room")
  var cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  var afkVC = client.channels.find(chan =>chan.name == "🚽 - Les Chiottes")

  if ((oChannel.guild == undefined) || (oChannel.guild == undefined)) return

  // Created Channels Backup on 2019 | Portail Cheriana | FR
  if ((nChannel.guild.name == "2019 | Portail Cheriana | FR") || (oChannel.guild.name == "2019 | Portail Cheriana | FR")) return;
  if ((nChannel.guild.id == config.guilds.portail) || (oChannel.guild.id == config.guilds.portail)) return;

  if ((oChannel.name == "cheriana") && (nChannel.name != "cheriana")) nChannel.setName("cheriana") && nChannel.setPosition(0)
  if ((oChannel.name == "Cheriana") && (nChannel.name != "Cheriana")) nChannel.setName("Cheriana")
  if ((oChannel.name == "silence-room") && (nChannel.name != "silence-room")) nChannel.setName("silence-room")
  if ((oChannel.name == "🔇 Silence Room") && (oChannel.name != "🔇 Silence Room")) nChannel.setName("🔇 Silence Room")

  if (((oChannel.name != "cheriana") && (oChannel.name != "cheriana-resurrection")) && (nChannel.name == "cheriana") && ((oChannel.type == "text") || (nChannel.type == "text"))) nChannel.setName('poubelle').then(setName => nChannel.delete());
  if (((oChannel.name != "Cheriana") && (oChannel.name != "Cheriana Résurrection")) && (nChannel.name == "Cheriana") && ((oChannel.type == "voice") || (nChannel.type == "voice"))) nChannel.setName('Poubelle').then(setName => nChannel.delete());
  if (((oChannel.name != "silence-room") && (oChannel.name != "silence-room-resurrection")) && (nChannel.name == "silence-room") && ((oChannel.type == "text") || (nChannel.type == "text"))) nChannel.setName('poubelle').then(setName => nChannel.delete());
  if (((oChannel.name != "🔇 Silence Room") && (oChannel.name != "Silence Room Résurrection")) && (nChannel.name == "🔇 Silence Room") && ((oChannel.type == "voice") || (nChannel.type == "voice"))) nChannel.setName('Poubelle').then(setName => nChannel.delete());

  if (!cheriana == undefined) {
    if (((oChannel.name == cheriana.name) && (nChannel.name == cheriana.name)) && (nChannel.postition != 0)) return nChannel.setPosition(0)
  }

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

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  if ((newMember.guild.name == "2019 | Portail Cheriana | FR") || (newMember.guild.id == config.guilds.portail)) return;
  if (newMember == undefined) return;

  var newUserChannel = newMember.voiceChannel
  var oldUserChannel = oldMember.voiceChannel
  var cheriana = cherianaGuild.channels.find(chan => chan.name == "cheriana")
  var cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  var afkVC = client.channels.find(chan => chan.name == "🚽 - Les Chiottes")

  // New Human User
  if (!newMember.user.bot) {

    // LOGS
    if ((oldUserChannel != undefined) && (newUserChannel == undefined)) {
      cherianaLogs.send(`**${newMember.user.username}** s'est déconnecté du salon **${oldUserChannel.name}**`)
      console.log(' ' + newMember.user.username + ` s'est déconnecté du salon ` + oldUserChannel.name + "\n")
    }
    if ((oldUserChannel == undefined) && (newUserChannel != undefined)) {
      cherianaLogs.send(`**${newMember.user.username}** s'est connecté au salon **${newUserChannel.name}**`)
      console.log(' ' + newMember.user.username + ` s'est connecté au salon ` + newUserChannel.name + "\n")
    }
    if (((newUserChannel != undefined) && (oldUserChannel != undefined)) && (newUserChannel.name != oldUserChannel.name)) {
      cherianaLogs.send(`**${newMember.user.username}** s'est déplacé du salon **${oldUserChannel.name}** vers **${newUserChannel.name}**`)
      console.log(' ' + newMember.user.username + " s'est déplacé du salon " + oldUserChannel.name + " vers " + newUserChannel.name + "\n")
    }

    // ON USER LEAVE VOICE CHANNEL
    if (oldUserChannel == cherianaVC) {

        if (oldUserChannel.members.size == 0) {

          cheriana.setTopic(`Aucun utilisateur n'est connecté au vocal ${cherianaVC.name}`).catch(err => {

          	if (err) {
              var cheriana = client.channels.find(chan => chan.name == "cheriana-resurrection") || client.channels.find(chan => chan.name == "cheriana")
              if (!cheriana) {
              	return
              } else {
              	cheriana.setTopic(`Aucun utilisateur n'est connecté au vocal ${cherianaVC.name}`)
              }
            }

          })

        } else if (oldUserChannel.members.size == 1) {

          cheriana.setTopic(`${oldUserChannel.members.size} utilisateur est connecté au vocal ${cherianaVC.name}`).catch(err => {

            if (err) {
              var cheriana = client.channels.find(chan => chan.name == "cheriana-resurrection") || client.channels.find(chan => chan.name == "cheriana")
              if (!cheriana) {
                return
              } else {
                cheriana.setTopic(`${oldUserChannel.members.size} utilisateur est connecté au vocal ${cherianaVC.name}`)
              }
            }

           })

        } else cheriana.setTopic(`${oldUserChannel.members.size} utilisateurs sont connectés au vocal ${cherianaVC.name}`).catch(err => {

           if (err) {
             var cheriana = client.channels.find(chan => chan.name == "cheriana-resurrection") || client.channels.find(chan => chan.name == "cheriana")
             if (!cheriana) {
               return
             } else {
               cheriana.setTopic(`${oldUserChannel.members.size} utilisateurs sont connectés au vocal ${cherianaVC.name}`)
             }
           }

         })

      } else if (oldUserChannel == silentRoomVC) {

        if (oldUserChannel.members.size == 0) {

          silentRoom.setTopic(`Aucun utilisateur n'est connecté au vocal ${silentRoomVC.name}`).catch(err => {

            if (err) {
              var SilentRoom = client.channels.find(chan => chan.name == "silence-room-resurrection") || client.channels.find(chan => chan.name == "silence-room")
              if (!silentRoom) {
                return
              } else {
                SilentRoom.setTopic(`Aucun utilisateur n'est connecté au vocal ${silentRoomVC.name}`)
              }
            }

           })

        } else if (oldUserChannel.members.size == 1) {

          silentRoom.setTopic(`${oldUserChannel.members.size} utilisateur est connecté au vocal ${silentRoomVC.name}`).catch(err => {

            if (err) {
              var SilentRoom = client.channels.find(chan => chan.name == "silence-room-resurrection") || client.channels.find(chan => chan.name == "silence-room")
              if (!silentRoom) {
                return
              } else {
                SilentRoom.setTopic(`${oldUserChannel.members.size} utilisateur est connecté au vocal ${silentRoomVC.name}`)
              }
            }

           })

        } else silentRoom.setTopic(`${oldUserChannel.members.size} utilisateurs sont connectés au vocal ${silentRoomVC.name}`).catch(err => {

            if (err) {
              var SilentRoom = client.channels.find(chan => chan.name == "silence-room-resurrection") || client.channels.find(chan => chan.name == "silence-room")
              if (!silentRoom) {
                return
              } else {
                SilentRoom.setTopic(`${oldUserChannel.members.size} utilisateurs sont connectés au vocal ${silentRoomVC.name}`)
              }
            }

           })

      }

    if (newUserChannel == undefined) {
      
      return
    
    } else {

      // ON USER JOIN VOICE CHANNEL
      if (newUserChannel.name == cherianaVC.name) {

        if (newMember.serverMute == true) newMember.setMute(false)
        if (newMember.serverDeaf == true) newMember.setDeaf(false)
        
        if (cheriana != undefined) {

          if (newUserChannel.members.size == 1) {

            cheriana.setTopic(`${newUserChannel.members.size} utilisateur est connecté au vocal ${cherianaVC.name}`).catch(err => {

          	if (err) {
              var cheriana = client.channels.find(chan => chan.name == "cheriana-resurrection") || client.channels.find(chan => chan.name == "cheriana")
              if (!cheriana) {
              	return
              } else {
              	cheriana.setTopic(`${newUserChannel.members.size} utilisateur est connecté au vocal ${cherianaVC.name}`)
              }
            }

          })

          } else cheriana.setTopic(`${newUserChannel.members.size} utilisateurs sont connectés au vocal ${cherianaVC.name}`).catch(err => {

          	if (err) {
              var cheriana = client.channels.find(chan => chan.name == "cheriana-resurrection") || client.channels.find(chan => chan.name == "cheriana")
              if (!cheriana) {
              	return
              } else {
              	cheriana.setTopic(`${newUserChannel.members.size} utilisateurs sont connectés au vocal ${cherianaVC.name}`)
              }
            }

          })
        }

      } else if (newUserChannel.name == silentRoomVC.name) {

        if (newMember.serverMute == false) newMember.setMute(true)
        if (newMember.serverDeaf == false) newMember.setDeaf(true)

        if (silentRoom != undefined) {

          if (newUserChannel.members.size == 1) {

            silentRoom.setTopic(`${newUserChannel.members.size} utilisateur est connecté au vocal ${silentRoomVC.name}`).catch(err => {

            if (err) {
              var SilentRoom = client.channels.find(chan => chan.name == "silence-room-resurrection") || client.channels.find(chan => chan.name == "silence-room")
              if (!silentRoom) {
                return
              } else {
                SilentRoom.setTopic(`${newUserChannel.members.size} utilisateur est connecté au vocal ${silentRoomVC.name}`)
              }
            }

           })

          } else silentRoom.setTopic(`${newUserChannel.members.size} utilisateurs sont connectés au vocal ${silentRoomVC.name}`).catch(err => {

            if (err) {
              var SilentRoom = client.channels.find(chan => chan.name == "silence-room-resurrection") || client.channels.find(chan => chan.name == "silence-room")
              if (!silentRoom) {
                return
              } else {
                SilentRoom.setTopic(`${newUserChannel.members.size} utilisateurs sont connectés au vocal ${silentRoomVC.name}`)
              }
            }

           })

        }

      } else if (newUserChannel.name == afkVC.name) {

        if (newMember.serverMute == false) newMember.setMute(true)

      } else {

        if (newMember.serverMute == true) newMember.setMute(false)
        if (newMember.serverDeaf == true) newMember.setDeaf(false)

      }

  	  cherianaGuild.members.forEach(m => {

		if ((m.voiceChannel != undefined) && (m.voiceChannel == newUserChannel) && (m.id != newMember.id)) {

		  if ((newUserChannel.name == afkVC.name) || (newUserChannel.name == silentRoomVC.name)) return

		  if (cherianAlert == false) {

		  	return

		  } else {

		    cherianAlert = false

		    setTimeout(function() {
		      var alertVoc = "**L'alerte de connexion au vocal " + newUserChannel.name + " vient d'être réamorcée.**"
		      cherianAlert = true
		      cheriana.send(alertVoc)
		      cherianaLogs.send(alertVoc)
		      console.log(" L'alerte de connexion au vocal " + newUserChannel.name + " vient d'être réamorcée.\n")
		    }, 3600 * 3000)

		    newUserChannel.createInvite().then(invite => {
		      var vocInvite = invite.url

		      cherianaGuild.members.forEach(m => {

		        if (!fs.existsSync("./noAlert/" + m.id + ".js") && (m.id != "1")) m.send(`Des utilisateurs viennent de rejoindre le salon vocal **` + newUserChannel.name + `**\n
Il vous suffit de cliquer sur l'invitation afin de les y rejoindre, n'hésitez pas !\n\n${vocInvite}\n\nVous pouvez désactiver ces notifications à tout moment à l'aide de la commande: \`!noAlert\`\net les réactiver par la suivante: \`!onAlert\``)

		      })

		      cherianaLogs.send("Tous les utilisateurs du serveur dont les paramètres de notifications d'alertes sont activés, ont étés informés de la présence de multiples utilsateurs sur votre salon vocal: **" + newUserChannel.name + "**")
		      cheriana.send("Tous les utilisateurs du serveur dont les paramètres de notifications d'alertes sont activées, ont étés informés de la présence de multiples utilsateurs sur votre salon vocal.")
		      console.log(" Des utilisateurs viennent de rejoindre le salon vocal " + newUserChannel.name + "\n")

		    })

		    return 

		  } 

		}
      })

    }

  // New Bot User
  } else if (newMember.user.bot) {

    if (newUserChannel == undefined) {

      return

    } else {

      if (newUserChannel.name == silentRoomVC.name) {

        if (newMember.serverMute == false) newMember.setMute(true)
        if (newMember.serverDeaf == false) newMember.setDeaf(true)

      } else {

        if (newMember.serverMute == true) newMember.setMute(false)
        if (newMember.serverDeaf == true) newMember.setDeaf(false)

      }
    }

  }

});

client.on("guildUpdate", (oldGuild, newGuild) => {

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  if (oldGuild.id == config.guilds.portail) return;
  if (newGuild.id == config.guilds.portail) return;
  

  var cheriana = client.channels.find(chan => chan.name === 'cheriana')
  var cherianaVC = client.channels.find(chan => chan.name === 'Cheriana')
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")

  if (newGuild.name != "2019 | Cheriana | FR") return newGuild.setName("2019 | Cheriana | FR").then(setName => console.log(" Someone has tryed to change ServerName"))
  if (newGuild.defaultMessageNotifications === "ALL") return newGuild.setDefaultMessageNotifications("MENTIONS").then(setDefMsgNotif => console.log(" Someone has tryed to change Default Message Notifications ServerSettings"))
  	if ((!cherianaVC == undefined) && (!afkChannelID == undefined)) {
  	  if ((newGuild.afkChannelID == cherianaVC.id) || (newGuild.afkChannelID == silentRoomVC.id)) newGuild.createChannel("°0_0°", 'voice').then(createChan => {
        if (newGuild.afkChannelID == cherianaVC.id) console.log(" Someone has tryed to set Cheriana [Master Vocal Channel] has default **AFK Channel**")
        if (newGuild.afkChannelID == silentRoomVC.id) console.log(" Someone has tryed to set 🔇 Silence Room [Protected Vocal Channel] has default **AFK Channel**")
        newGuild.setAFKChannel(createChan).then(setAFKChannel => {
          if (createChan != undefined) setTimeout(function() {createChan.delete(), console.log(newGuild)}, 1 * 2500)
        }) 
      })
  	}
  
  if (newGuild.icon != oldGuild.icon) return newGuild.setIcon("./resources/server_icon.png") && console.log(" Someone has tryed to change ServerIcon")
  if (newGuild.region != "eu-central") newGuild.setRegion("eu-central") && console.log(" Someone has tryed to change Region ServerSettings")
  if (newGuild.verificationLevel != "0") return newGuild.setVerificationLevel("0").then(setVerificationLevel => console.log(" Someone has tryed to change verificationLevel ServerSettings"))
  if (newGuild.explicitContentFilter != "0") return newGuild.setExplicitContentFilter("0").then(setExplicitContentFilter => console.log(" Someone has tryed to change ExplicitContentFilter ServerSettings"))

});

client.on("guildMemberUpdate", (oldMember, newMember) => {

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  if ((newMember.guild.name == "2019 | Portail Cheriana | FR") || (newMember.guild.id == config.guilds.portail)) return;
  if ((oldMember.guild.name == "2019 | Portail Cheriana | FR") || (oldMember.guild.id == config.guilds.portail)) return;

  if (oldMember.roles.has(quarantineRole.id) && !oldMember.roles.has(cheriUserRole.id) && newMember.roles.has(cheriUserRole.id)) newMember.removeRole(quarantineRole.id).then(removeRole => {
    if (cheriana != undefined) return cheriana.send(`${newMember} un membre du serveur a prit la responsabilité de vous réintégrer.\nLibre à vous de trahir ou pas, la confiance qui vous est donnée.`)/*.then(msg => {
      var toDelMsg = cheriana.lastMessageID;
      var lastBotMsg = client.user.lastMessageID;
        cheriana.fetchMessage(toDelMsg).then(msg => msg.delete());
    })*/
  })

});


client.login(config.auth.token);