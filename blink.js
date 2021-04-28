const args = process.argv.slice(2);

const mh = require('magic-home');
if (!args[0].match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g)) {
    console.error('invalid IP address');
    process.exit(1);
}
else {
    ip = args[0];
    l = new mh.Control(ip);
    state = true;

    setInterval(() => {
        l.setPower(state).then(() => {
            process.stdout.write(`turned ${ip} ${(state) ? "on " : "off"}\r`);
            state = !state;
        });
    }, 1000);
}