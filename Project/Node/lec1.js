const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    res.end(JSON.stringify(parsedUrl));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});