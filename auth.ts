import http from 'http';
import fs from 'fs';
const port = 53134;

http.createServer((req, res) => {
    let responseCode = 404;
    let content = '404 error';

    if (req.url === '/') {
        responseCode = 200;
        let content = fs.readFileSync('./index.html');
    }

    res.writeHead(responseCode, {
        'content-type':'text/html;charset=utf-8',
    });
    res.write(content);
    res.end();
}).listen(port)