function usersCmds(message, prefix, client, command, colorList) {

  if (command[0] === "!roles") {

      message.guild.roles.forEach(role => {
        if ((role == anarchobot) || (role == cheriOwner) || (role == newAuthBot) || (role == cheriBotTeam) || (role == quarantine) || (role == cheriUserCat) || (role == cheriUser)) {
          message.channel.send(`**${role.name}** is [SECURED]`)
        } else {
          if ((role.id == "524277446946717707") || (role.id == "1")) return
          message.channel.send(`**${role.name}**`)
        }
      })

    }
  
  if (message.content.startsWith('!say ')) {
    var args = message.content.split(" ")
    var sayMSG = ':no_entry_sign: Ne nous prend pas pour des ânes je te prie !';

    if (args[1] !== '!say') {
      let answer = args.slice(1).join(' ')
      
      if (args == null) {
        message.channel.send(`${message.author.username} vous n'avez saisi aucun argument.`)
      } else message.channel.send(answer)

    } else {
      message.author.send(sayMSG)
      message.channel.send(sayMSG).then(message => message.delete(3000))
    
    }
  
  }

  if (message.content.startsWith(prefix + "purge")) {
    
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

  if (message.content.startsWith(prefix + "color")) {
    colorList.some(r => {
      if ((command[1] != r.name) && (command[1] != undefined)) return message.channel.send("Vous devez saisir une couleur de role") && console.log(command[1] + " " + r.name)
    })
    /*
    var member = message.guild.member(message.author);
    var role = message.guild.roles.find(r => r.name == command[1])
    colorList.forEach(colorRole => {
      if (member.roles.has(colorRole.id) && (colorRole.name != command[1])) member.removeRole(colorRole.id)
        if (!member.roles.has(role.id)) member.addRole(role.id)
    })
    */
  }

}

module.exports = usersCmds;