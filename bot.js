const express = require('express');
const app = express();
const http = require('http');
    app.get("/",(request, response) => {
      console.log(`pingleme işlemi başarılı başarılıysa bu yazıyı loglarda görürsün`);
      response.sendStatus(200);
    });
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const db = require('quick.db')
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////İsterseniz Aşağıdaki Komutu Silebilirsiniz///////////////////////

client.on('message', async (msg, member, guild) => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin  <a:white_check_mark:704682052133584917>** ");
  }
});

////////////////////İsterseniz Yukarıdaki Komutu Silebilirsiniz///////////////////////

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}; 
/////60gx-d30c

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
  };

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


//////////////////////////Hata Alırsanız Discorddan Bildirebilirsiniz//////////////

client.login(ayarlar.token);

//--KOMUTLAR--\\

/////OTOİSİM
client.on('guildMemberAdd', member => {
 member.setNickname('İsimYaş')////YENI GELENLERE VERILCEK ISIM
})

///OTOROL
client.on('guildMemberAdd', member => {
  
  let rol = '718411467942133790'////GELECEK KISIYE VERILCEK ROL
 member.addRole(rol)
})



///HG MESAJI 
client.on('guildMemberAdd', member => {
 member.send(`**Sunucumuza hoşgeldin, \n  \n Abone Olmayı Unutmayınız \n \n Davet linkimiz:** https://discord.gg/NP7Ar2j `);
  
}); 


//--------------------------------Hg Kanalı---------------------------------\\
client.on("guildMemberAdd", member => {  
  const kanal = "KanalİD";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = ' **__Bu Hesap Güvenilir Değil__** '
if (kurulus > 1296000000) kontrol = ' **__Bu Hesap Güvenilir Gözüküyor__** '
  moment.locale("tr");
  let kobscode = client.channels.get(kanal);
kobscode.send("**Hoşgeldin! " + member + " Seninle __\`" + member.guild.memberCount + "\`__ Kişiyiz \n\n  Sunucuya Kayıt Olmak İçin #kayıt-chat'a İsim Yaş Yazınız ! \n\n  Kayıt Sorumlusu Rolündeki yetkililer sizinle ilgilenicektir  \n\n  Hesabın Oluşturulma Tarihi:** " + moment(member.user.createdAt).format("YYYY **__DD MMMM dddd (hh:mm:ss)__**") +  "  \n\n"  + kontrol + " \n\n",  new Discord.Attachment("https://media.giphy.com/media/dayIK7bQLhb4BCFlHN/giphy.gif"
    )
  );
});

