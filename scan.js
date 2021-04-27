const mh = require('magic-home');
const fs = require('fs');

new mh.Discovery().scan(500).then((dev) => {
    fs.writeFileSync('./lights.json', JSON.stringify(dev));
});