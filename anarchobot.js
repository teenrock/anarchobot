const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect: true, max_cache_message: 0});
const config = require("./config.json");
const fs = require("fs-extra");
const prefix = config.prefix;
const masterChanID = config.MCID;
const masterVocID = config.MVID;
const testID = config.testID;

let serverIsRegenerating = undefined

client.on("ready", () => {

  // GUILDS
  cherianaGuild = client.guilds.find(guild => guild.id == "524277446946717707"); // Server: 2019 | Cheriana | FR
  portailGuild = client.guilds.find(guild => guild.id == "525363756704858115"); // Server: 2019 | Cheriana | FR
  // CHANNELS
  cheriana = client.channels.find(chan => chan.name == "cheriana")
  silentRoom = client.channels.find(chan => chan.name == "silence-room")
  cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
  silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  afkVC = client.channels.find(chan =>chan.name == "🚽 - Les Chiottes")
  cherianaPassInvite = client.channels.get("525363757359038482") // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-invitation
  cherianaLogs = client.channels.get("525714829571260459") // Server: 2019 | Portail Cheriana | FR Channel: #cheriana-logs
  cherianactivity = client.channels.get("527823396864786433"); // Server: 2019 | Portail Cheriana | FR Channel: #cherianactivity
  // CATEGORY CHANNELS
  cheribackup = client.channels.get("527920710631555073"); // Server: 2019 | Portail Cheriana | FR Channel: #CHERIBACKUP [category channel]
  newUsersChannels = client.channels.get("528051676343435304"); // Server: 2019 | Portail Cheriana | FR Channel: #NEW USERS CHANNELS [category channel]
  oldChannels = client.channels.get("528400619602706443"); // Server: 2019 | Portail Cheriana | FR Channel: #OLD CHANNELS [category channel]
  // ROLES
  ownnerUser = client.users.get('524266873412648980'); // Le Createur
  anarchobotRole = cherianaGuild.roles.find(role => role.id  == "524322827797528591")
  afkBotRole = cherianaGuild.roles.find(role => role.id  == "533468222603788310")
  chouchouneRole = cherianaGuild.roles.find(role => role.id  == "525375457873494026")
  cheriOwnerRole = cherianaGuild.roles.find(role => role.id == "524282758160449556")
  newAuthBotRole = cherianaGuild.roles.find(role => role.id == "524341728489111568")
  cheriBotTeam = cherianaGuild.roles.find(role => role.id == "524342298117668864")
  quarantineRole = cherianaGuild.roles.find(role => role.id == "524579534725447687")
  cheriUserCatRole = cherianaGuild.roles.find(role => role.id == "524343443405930507")
  cheriUserRole = cherianaGuild.roles.find(role => role.id == "524279902007066632")
  // COLOR ROLES
  color0 = cherianaGuild.roles.get("535022049291141120") // Blanc
  color10 = cherianaGuild.roles.get("535022041406111744") // Bleu
  color20 = cherianaGuild.roles.get("535024564703461377") // Bleu Ciel
  color30 = cherianaGuild.roles.get("535024789031747584") // Bleu Roi
  color40 = cherianaGuild.roles.get("535022046372167686") // Violet
  color50 = cherianaGuild.roles.get("535023658918215681") // Cyan
  color60 = cherianaGuild.roles.get("535021815228006400") // Jaune
  color70 = cherianaGuild.roles.get("535022015183060992") // Orange
  color80 = cherianaGuild.roles.get("535022045520461824") // Rouge
  color90 = cherianaGuild.roles.get("526204018003935241") // Vert
  color100 = cherianaGuild.roles.get("535022044555902980") // Rose
  color110 = cherianaGuild.roles.get("535022047521275904") // Marron
  color120 = cherianaGuild.roles.get("535021997231439902") // Gris
  color130 = cherianaGuild.roles.get("535022048544817163") // Noir
  // USERS
  xzdc = client.users.get("399094992338944012"); // xzdc
  // OTHERS
  newuserChanName = null;

  colorList = []
  colorList.push(color0, color10, color20, color30, color40, color50, color60, color70, color80, color90, color100, color110, color120, color130)
  protectedRolesList = []
  protectedRolesList.push(anarchobotRole, chouchouneRole, cheriOwnerRole, newAuthBotRole, cheriBotTeam, quarantineRole, cheriUserCatRole, cheriUserRole)
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
    if ((chan.guild.id == "524277446946717707") && (chan.type == "text")) console.log(' ' + chan.guild.name + '             [  Textual ]     # ' + chan.name)
  })

  client.channels.forEach(chan => {
    if ((chan.guild.id == "524277446946717707") && (chan.type == "voice")) console.log(' ' + chan.guild.name + '             [    Vocal ]     🔈 ' + chan.name)
  })

  client.channels.forEach(chan => {
    if ((chan.guild.id == "525363756704858115") && (chan.type == "category")) console.log(' ' + chan.guild.name + '     [ Category ]     | ' + chan.name)
  })

  client.channels.forEach(chan => {
    if ((chan.guild.id == "525363756704858115") && (chan.type == "text")) console.log(' ' + chan.guild.name + '     [  Textual ]     # ' + chan.name)
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

serverIsRegenerating = false
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

    var cheriana = client.channels.find(chan => chan.name == "cheriana")
    var silentRoom = client.channels.find(chan => chan.name == "silence-room")
    var cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
    var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
    var afkVC = client.channels.find(chan =>chan.name == "🚽 - Les Chiottes")

    if (message.content.startsWith(prefix + "purge") && ((message.guild.name == "2019 | Portail Cheriana | FR") || (message.guild.id == "525363756704858115"))) {
      if (message.author.bot) return
      if (message.channel.type === "dm") return
    
      if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `manage-guild` dans ce serveur**").catch(console.error)

      const user = message.mentions.users.first()
      const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]) 
    
      if (!amount) return message.reply('**:x: Veuillez spécifier une limite de message**')
    
      if (!amount && !user) 
    
      return message.reply('**:x: Veuillez spécifier une limite de message**')
    
      if (!user){
        if(isNaN(message.content.split(' ')[1]) || parseInt(message.content.split(' ')[1]) < 2 || parseInt(message.content.split(' ')[1]) > 100){
          message.channel.send('**:x: Veuillez spécifier une limite de message comprise entre 2 et 100**')
        }
      }

      if(message.content.split(' ')[2]){
        if(isNaN(message.content.split(' ')[2]) || parseInt(message.content.split(' ')[2]) < 2 || parseInt(message.content.split(' ')[2]) > 100){
          message.channel.send('**:x: Veuillez spécifier une limite de message comprise entre 2 et 100**')
        }
      }

      message.channel.fetchMessages({ limit: amount, }).then((messages) => {
        if (user) {
          const filterBy = user ? user.id : Client.user.id;
          messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount)
        }

        message.channel.bulkDelete(messages).catch(error => console.log(error.stack))
        message.channel.send(":wastebasket: | `" + amount + "` messages supprimés")
      })
    }

  if (!message.guild) return console.log(message.author.username + " sur #" + client.user.username + `: ${message}`) 

  if ((message.guild.name == "2019 | Portail Cheriana | FR") || (message.guild.id == "525363756704858115")) return;

  var anarchobotRole = cherianaGuild.roles.find(role => role.id  == "524273043124649989")
  var chouchouneRole = cherianaGuild.roles.find(role => role.id  == "525375457873494026")
  var cheriOwnerRole = cherianaGuild.roles.find(role => role.id == "524282758160449556")
  var newAuthBotRole = cherianaGuild.roles.find(role => role.id == "524341728489111568")
  var cheriBotTeam = cherianaGuild.roles.find(role => role.id == "524342298117668864")
  var quarantineRole = cherianaGuild.roles.find(role => role.id == "524579534725447687")
  var cheriUserCatRole = cherianaGuild.roles.find(role => role.id == "524343443405930507")
  var cheriUserRole = cherianaGuild.roles.find(role => role.id == "524279902007066632")

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

  // OWner Cmds
  if (message.author.id == "524266873412648980") { // Owner User: Le Createur
    const ownerCmds = require("./cmds/ownerCmds.js")
    ownerCmds(message, prefix, client, command)
  }

  // Users Cmds
  const usersCmds = require("./cmds/usersCmds.js")
  usersCmds(message, prefix, client, command, colorList)


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
        return
      } else {

        if (!message.author.bot) {
          var author_ = client.users.get(`${message.author.id}`);

        if (author_.avatarURL !== null) {
          avatar = author_.avatarURL.split('size=2048').join('size=64');
        } else {
          avatar = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
        }

        toFindChan.createWebhook(`${author_.username}`, `${avatar}`).then(webhook => {
          if ((message == undefined) || (message == null)) return webhook.delete() && console.log(" Embed or empty message detected")
          webhook.send(`${newArgs}`), webhook.delete()
        })

        } else if (message.author.bot) {
          var author_ = message.author;
          var avatar = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
          
          toFindChan.createWebhook(`${author_.username}`, `${avatar}`).then(webhook => {
          if ((message == undefined) || (message == null)) return webhook.delete() && console.log(" Embed or empty message detected")
          webhook.send(`${newArgs}`), webhook.delete()
        })

        }

      }
    }

});

client.on("guildMemberAdd", (member) => {

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

  if (xzdc != undefined) xzdc.send('Un nouvel utilisateur vient d\'entrer sur **' + member.guild.name + '**.\nIl s\'agit de: **' + member.user.username + '**' );

  // Case some user try to delete a chierana protected textual/vocal by his nickname egal to chan name
  if (member.user.username == "cheriana") return member.kick();
  
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

  if (xzdc != undefined) xzdc.send('Un utilisateur vient de quitter **' + member.guild.name + '**.\nIl s\'agit de: **' + member.user.username + '**' );

});

client.on('channelCreate', (channel) => {

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  var cheriana = client.channels.find(chan => chan.name == "cheriana")
  var silentRoom = client.channels.find(chan => chan.name == "silence-room")
  var cherianaVC = client.channels.find(chan => chan.name == "Cheriana")
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  var afkVC = client.channels.find(chan =>chan.name == "🚽 - Les Chiottes")

  if (channel.guild == undefined) return;

  if ((channel.guild.name == "2019 | Portail Cheriana | FR") || (channel.guild.id == "525363756704858115")) return;

  // Restrictions
  if ((channel.name == "cheriana") && (channel.type == "text")) return channel.setName("will-be-destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "silence-room") && (channel.type == "text")) return channel.setName("will-be-destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "Cheriana") && (channel.type == "voice")) return channel.setName("Will Be Destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if ((channel.name == "🔇 Silence Room") && (channel.type == "voice")) return channel.setName("Will Be Destroyed").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))
  if (channel.type == "category") return channel.setName("WILL BE DESTROYED").then(editChan => setTimeout(function() {editChan.delete()}, 3 * 1000))

  if ((channel.name != "cheriana-resurrection") && (channel.name != "silence-room-resurrection")) {

    if (channel.type == "text") cheribackup.guild.createChannel(channel.name, "text").then(createdChannel =>  {

      setTimeout(function() {

        if (channel.name == newuserChanName) {

          createdChannel.setParent("528051676343435304") // Server: 2019 | Portail Cheriana | FR Channel: #NEW USERS CHANNELS [category channel]
          console.log(" createdChan name = " + channel.name)
          console.log(" newUserChanName = " + newuserChanName)

        } else {
          createdChannel.setParent(cheribackup.id) // Server: 2019 | Portail Cheriana | FR Channel: #CHERIBACKUP [category channel]

        }

      }, 1 * 1500)
      
      cherianaLogs.send("Le salon **#" + channel.name + "** vient d'être créé")
      cherianactivity.send("Le salon **#" + channel.name + "** vient d'être créé")
      console.log("Le salon #" + channel.name + " vient d'être créé")
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
  if ((channel.guild.name == "2019 | Portail Cheriana | FR") || (channel.guild.id == "525363756704858115")) return;

  if ((channel.name == "cheriana") || (channel.name == "Cheriana")) {

  // SECURED CHANNELS
  if (channel.type == "text") {
    channel.guild.createChannel(`cheriana-resurrection`, "text")
    .then(createdChan => {
      setTimeout(function() {
        if (createdChan != undefined) {
          createdChan.setName("cheriana").then(setName => createdChan.createInvite({maxAge: 0, maxUses: 0}).then(invite => {
            createdChan.send(invite.url)
            cherianaPassInvite.send("**Entrée vers Cheriana:** " + invite.url)
            var toDelMsg = cherianaLogs.lastMessageID;
            cherianaLogs.fetchMessage(toDelMsg).then(msg => msg.delete() && console.log(msg + " [Has Been Deleted]"));
            console.log(invite.url)
          }))
        }
       }, 3 * 1000 );
       console.log(' Some user try to delete Cheriana [Master Textual Channel]')
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
  console.log("Le salon #" + channel.name + " vient d'être supprimé")

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

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

  if ((newMember.guild.name == "2019 | Portail Cheriana | FR") || (newMember.guild.id == "525363756704858115")) return;
  if (newMember == undefined) return;

  var newUserChannel = newMember.voiceChannel
  var oldUserChannel = oldMember.voiceChannel
  var silentRoomVC = client.channels.find(chan => chan.name == "🔇 Silence Room")
  var afkVC = client.channels.find(chan => chan.name == "🚽 - Les Chiottes")

  // New Human User
  if (!newMember.user.bot) {

    // LOGS
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

    if (oldUserChannel == cherianaVC) {

        if (oldUserChannel.members.size == 0) {
          cheriana.setTopic(`Aucun utilisateur n'est connecté au vocal ${cherianaVC.name}`)
        } else if (oldUserChannel.members.size == 1) {
          cheriana.setTopic(`${oldUserChannel.members.size} utilisateur est connecté au vocal ${cherianaVC.name}`)
        } else cheriana.setTopic(`${oldUserChannel.members.size} utilisateurs sont connectés au vocal ${cherianaVC.name}`)

      } else if (oldUserChannel == silentRoomVC) {

        if (oldUserChannel.members.size == 0) {
          silentRoom.setTopic(`Aucun utilisateur n'est connecté au vocal ${silentRoomVC.name}`)
        } else if (oldUserChannel.members.size == 1) {
          silentRoom.setTopic(`${oldUserChannel.members.size} utilisateur est connecté au vocal ${silentRoomVC.name}`)
        } else silentRoom.setTopic(`${oldUserChannel.members.size} utilisateurs sont connectés au vocal ${silentRoomVC.name}`)

      }

    if (newUserChannel == undefined) {
      
      return

    } else {

      // NEW USER ACTIONS ON JOIN
       if (newUserChannel.name == cherianaVC.name) {

        if (newMember.serverMute == true) newMember.setMute(false)
        if (newMember.serverDeaf == true) newMember.setDeaf(false)
        
        if (cheriana != undefined) {
          if (newUserChannel.members.size == 1) {
            cheriana.setTopic(`${newUserChannel.members.size} utilisateur est connecté au vocal ${cherianaVC.name}`)
          } else cheriana.setTopic(`${newUserChannel.members.size} utilisateurs sont connectés au vocal ${cherianaVC.name}`)
        }

      } else if (newUserChannel.name == silentRoomVC.name) {

        if (newMember.serverMute == false) newMember.setMute(true)
        if (newMember.serverDeaf == false) newMember.setDeaf(true)

        if (silentRoom != undefined) {
          if (newUserChannel.members.size == 1) {
            silentRoom.setTopic(`${newUserChannel.members.size} utilisateur est connecté au vocal ${silentRoomVC.name}`)
          } else silentRoom.setTopic(`${newUserChannel.members.size} utilisateurs sont connectés au vocal ${silentRoomVC.name}`)
        }

      } else if (newUserChannel.name == afkVC.name) {

        if (newMember.serverMute == false) newMember.setMute(true)

      } else {

        if (newMember.serverMute == true) newMember.setMute(false)
        if (newMember.serverDeaf == true) newMember.setDeaf(false)

      }

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

  if (oldGuild.id == "525363756704858115") return;
  if (newGuild.id == "525363756704858115") return;
  

  var cheriana = client.channels.find(chan => chan.name === 'cheriana')
  var cherianaVC = client.channels.find(chan => chan.name === 'Cheriana')
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

  if ((serverIsRegenerating == true) || (serverIsRegenerating == undefined)) return

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
