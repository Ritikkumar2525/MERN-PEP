const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // res.end('Hello Ritik');
    fs.readFile(path.join(__dirname, '500mb.txt'), 'utf-8', (err, data) => {
        res.end(data);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    }); 