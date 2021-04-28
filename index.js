const fs = require('fs');
const mh = require('magic-home');
const config = require("./config.js");
const Discord = require('discord.js');

const client = new Discord.Client();
const lightdata = JSON.parse(fs.readFileSync('./lights.json'));
var lightList = "";
var lightSH = {};
var kvl = {};

lightdata.forEach(light => {
    lightList += `${light.title}: ${light.name}\n`;
    lightSH[light.name] = light.title;
    kvl[light.name] = new mh.Control(light.address, {
        cold_white_support: true
    });
});

console.log(lightSH);
client.login(config.token);

client.on('ready', () => {
    console.log('logged in as ' + client.user.tag);
});

client.on('message', async (msg) => {
    if (!msg.content.startsWith(config.prefix)) return;
    if (msg.author.bot) return;

    let args = msg.content.split(' ');
    let command = (args[0] === '💡') ? args[1] : args[0].substring(2);
    let opts = (args[0] === '💡') ? args.splice(2) : args.splice(1);

    console.log(args, opts);

    switch (command) {
        case 'pwr':
            msg.channel.send('this would turn on the light labelled ' + opts[0]);
            break;

        case 'list':
            let e = new Discord.MessageEmbed({
                author: 'by Crinfarr#3251',
                color: 0xfffffe,
                description: lightList,
                title: 'Available lights'
            });
            msg.channel.send(e);
            break;

        case 'on':
            if (kvl[opts[0]] === undefined) {
                msg.channel.send('❌ Invalid light!\nuse `💡 list` to get a list of light keys.');
                return;
            }
            kvl[opts[0]].setPower(true);
            msg.channel.send(`Turned on the '${lightSH[opts[0]]}'`);
            break;

        case 'off':
            if (kvl[opts[0]] === undefined) {
                msg.channel.send('❌ Invalid light!\nuse `💡 list` to get a list of light keys.');
                return;
            }
            kvl[opts[0]].setPower(false);
            msg.channel.send(`Turned off the '${lightSH[opts[0]]}'`);
            break;

        case 'help':
            msg.channel.send('\`\`\`\n💡on [ID]: turn on a bulb by id.\n💡off [ID]: turn off a bulb by id.\n💡list: list available bulbs and their IDs.\nAll commands work with or without a space after the 💡.\`\`\`');
            break;

        case 'color':
            if (kvl[opts[0]] === undefined) {
                msg.channel.send('❌ Invalid light!\nuse `💡 list` to get a list of light keys.');
                return;
            }
            kvl[opts[0]].setColor(
                parseInt('0x' + opts[1].substring(1, 3)),
                parseInt('0x' + opts[1].substring(3, 5)),
                parseInt('0x' + opts[1].substring(5, 7))
            );
            msg.channel.send(`Set the '${lightSH[opts[0]]}' to ${opts[1]}`);
            break;

        default:
            break;
    }
});