const fs = require('fs');
const mh = require('magic-hue-controller');
const config = require("./config.js");
const Discord = require('discord.js');

const client = new Discord.Client();
const lights = JSON.parse(fs.readFileSync('./lights.json'));

const lightlist = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setTitle("Lights")
    .addFields(
    )

client.login(config.token);

client.on('ready', () => {
    config.commanddata.forEach(element => {
        if (config.debug) client.api.applications(client.user.id).guilds('527926362443350026').commands.post({ data: element });
        if (!config.debug) client.api.applications(client.user.id).commands.post({ data: element })
        console.log("pushing command \"" + element.name + "\" to server");
    });
});

client.ws.on('INTERACTION_CREATE', async interaction => {
    console.log(interaction);
    switch (interaction.data.name) {
        case 'listlights':
            client.channels.cache.get(interaction.channel_id).send("how the hell did you even call this command");
            break;
        case 'light':
            //TODO:make this command actually do something
            break;
        default:
            break;
    }
});