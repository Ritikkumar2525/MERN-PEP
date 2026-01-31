const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

function serverHTML(res, fileName) {
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 Internal Server Error</h1>');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        serverHTML(res, 'home.html');
    } 
    else if (req.method === 'GET' && req.url === '/about') {
        serverHTML(res, 'about.html');
    } 
    else if (req.method === 'GET' && req.url === '/contact') {
        serverHTML(res, 'contact.html');
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Page Not Found</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});