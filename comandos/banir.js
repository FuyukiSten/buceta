var Discord = require('discord.js');
var waifu = require('snekfetch');
const moment = require("moment")
moment.locale("pt-BR")
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('Sem permissão');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        return;
    }
    // 402216351885950977

    let _m = message.mentions.members.first();
    if(!_m) {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('Mencione um membro para usar esse comando.');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        return;
    }
    let m = _m;
    if(!m.bannable) {
        let embed = new Discord.RichEmbed();
        embed.setColor(`RANDOM`);
        embed.setDescription('Eu não posso fazer isso.');
        embed.setAuthor(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        return; 
    }

    let motivo = args.slice(1).join(' ');
    if(!motivo) return motivo = 'Sem motivio definido';
    m.ban(motivo);
    message.channel.send(`✅ | O membro ${m} foi punido com sucesso !`)
    let embed = new Discord.RichEmbed();
    embed.addField('Membro banido', `${m}`);
    embed.addField('Moderador', `${message.author}`);
    embed.addField('Comando efetuado em', `${moment(message.createdAt).format('LLLL')}`)
    embed.addField('Motivo', `${motivo}`);
    client.channels.get('402216351885950977').send(embed);
}
