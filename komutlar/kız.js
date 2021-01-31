const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  
 if(!message.member.roles.has('YetkiliROL')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')
  
  let member = message.mentions.members.first();
  let isim = args[1]
  let yaş = args[2]
  let al = "AlınacakROl"; ///alınacak rol idsi
  let ver = "VerilecekROL"; ///verilecek rol idsi
  if (!member) return message.channel.send("Bir Kullanıcı Etiketle");
  if (!isim) return message.channel.send("Bir İsim Girmelisin!");
  member.setNickname(`${isim}  [${yaş}]`);
  
    member.addRole(ver);
    member.removeRole(al);
  

  const kobscode = new Discord.RichEmbed()
    .setColor("BLUE")
    .setTitle("Kayıt Sistemi")
    .setThumbnail(message.author.avatarURL)
    .setDescription( `Kayıt Edilen Kullanıcı : **${member.user}** \n Kayıt Eden Yetkili : ${message.author.username} \n Kayıt Islemınde Verılen Rol : <@&${ver}> \n Alınan Rol : <@&${al}>`)
client.channels.get('LogKanalİD').send(kobscode)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız" , "Kız" , "k"],
  permLevel: 0
}
exports.help = {
  name: 'KIZ',
  description: "kız Kayıt Sıstemı",
  usage: 'Kız isim yaş'
} 