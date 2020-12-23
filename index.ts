const mhcon = require('magic-hue-controller');
const mh = require('magic-home');
const fs = require('fs');
const s = require("./setup.ts");
const config = require("./config.ts");
const Discord = require('discord.js');

const finder = new mh.Discovery();
const client = new Discord.Client();


if (!fs.existsSync('./lightdata.json')) {
    fs.writeFileSync("lightdata.json", JSON.stringify({}));
}

client.login(config.token);

client.on('ready', () => {
    if (!config.setup) {
        finder.scan().then(devices => {
            if (config.debug) console.log(devices);
            fs.writeFileSync("./lightdata.json", JSON.stringify(devices));
        });
        config.commanddata.forEach(element => {
            client.api.applications(client.user.id).guilds('527926362443350026').commands.post({ data: element });
            console.log("pushing command: "+element.name+" to server");
        });
    }
});