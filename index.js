const fs = require('fs');
const mh = require('magic-home');
const config = require("./config.js");
const Discord = require('discord.js');

const client = new Discord.Client();
const lightdata = JSON.parse(fs.readFileSync('./lights.json'));

/*const lightlist = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setTitle("Lights")
    .addFields()
*/

client.login(config.token);
let lights = {};
for (let light in lightdata) {
    //console.log(lightdata[light].address);
    lights[light] = new mh.Control(lightdata[light].address);
}

if (config.debug) console.log(lights);
client.on('ready', () => {
    console.log('logged in as ' + client.user.tag);
});

