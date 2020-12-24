const fs = require('fs');
const mh = require('magic-hue-controller');
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
for (light in lightdata) {
    //console.log(lightdata[light].address);
    lights[light] = new mh(lightdata[light].address);
}

if (config.debug) console.log(lights);
client.on('ready', () => {
    config.commanddata.forEach(command => {
        if (config.fastmode) {
            client.guilds.cache.forEach(guild => {
                if (config.debug) client.api.applications(client.user.id).guilds(guild.id).commands.post({ data: command });
                console.log(`pushed command "${command.name}" to server "${guild.name}"`);
            });
        }
        client.guilds.cache.forEach(guild => {
            console.log(guild.id)
        })
        if (!config.debug && !config.fastmode) client.api.applications(client.user.id).commands.post({ data: command })
        if (!config.fastmode) console.log("pushing command \"" + command.name + "\" GLOBALLY");
    });
});

client.ws.on('INTERACTION_CREATE', async interaction => {
    if (config.debug) console.log(interaction);
    switch (interaction.data.name) {
        case 'listlights':
            client.channels.cache.get(interaction.channel_id).send("how the hell did you even call this command");
            break;
        case 'light':
            //TODO:finish this
            switch (interaction.data.options[0].name) {
                case 'on':
                    if (config.debug) console.log(lights[interaction.data.options[0].options[0].value]);
                    lights[interaction.data.options[0].options[0].value].sendPower(true);
                    break;
                case 'off':
                    if (config.debug) console.log(lights[interaction.data.options[0].options[0].value]);
                    lights[interaction.data.options[0].options[0].value].sendPower(false);
                    break;
            }
            break;
        default:
            break;
    }
});