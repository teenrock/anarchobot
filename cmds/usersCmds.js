function usersCmds(message, prefix, client, command) {

  if (command[0] === "!roles") {

      message.guild.roles.forEach(role => {
        if ((role == anarchobotRole) || (role == chouchouneRole) || (role == cheriOwnerRole) || (role == newAuthBotRole) || (role == cheriBotTeam) || (role == quarantineRole) || (role == cheriUserCatRole) || (role == cheriUserRole)) {
          message.channel.send(`**${role.name}** is [SECURED]`)
        } else {
          if ((role.id == "524277446946717707") || (role.id == "1")) return
          message.channel.send(`**${role.name}**`)
        }
      })

    }
  
  if (message.content.startsWith('!say ')) {
    var args = message.content.split(' ');
    var sayMSG = ':no_entry_sign: Ne nous prend pas pour des ânes je te prie !';

    if (args[1] !== '!say') {
      let answer = args.slice(1).join(' ');
      
      if (args == null) {
        message.channel.send(`${message.author.username} vous n'avez saisi aucun argument.`)
      } else message.channel.send(answer);

    } else {
      message.author.send(sayMSG);
      message.channel.send(sayMSG).then(message => message.delete(3000));
    
    }
  
  }

}

module.exports = usersCmds;