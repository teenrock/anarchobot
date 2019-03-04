function ownerCmds(message, prefix, client, command) {

  if (command[0] === '!channelsPurge') {
      let channel = message.channel;
      message.reply('tous les salons et rôles vont être supprimés dans **5secondes** ...')

      setTimeout(function() {

        client.channels.forEach(channel => {
          if ((channel == except_chanA) || (channel == except_chanB)) return
          else channel.delete()
        })

      }, 5 * 1000)

    } else if (command[0] === "!purgeRoles") {

      message.guild.roles.forEach(role => {
        if ((role == anarchobot) || (role == cheriOwner) || (role == newAuthBot) || (role == cheriBotTeam) || (role == quarantine) || (role == cheriUserCat) || (role == cheriUser)) {
          if (role.id != "524277446946717707") message.channel.send(`**${role.name}** is [SECURED]`).then(msg => console.log(`${role.name} is [SECURED]`))
          if (role.id == "524277446946717707") message.channel.send(`**${role.name}** is [SECURED]`).then(msg => console.log(`${role.name} is [SECURED]`))
        } else {
          if ((role.id == "524277446946717707") || (role.id == "1")) return
          role.delete() && message.channel.send(`**${role.name}** a été supprimé`).then(msg => console.log(`${role.name} a été supprimé`))
        }
      })

    }

}

module.exports = ownerCmds;