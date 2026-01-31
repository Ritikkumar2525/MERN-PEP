// const http = require('http');
// const server = http.createServer((req, res) => {
//     if(req.method === 'GET'){
//         res.end("This is a GET request");
//     }
//     if(req.method === 'POST'){
//         res.end("This is a POST request");
//     }
//     });
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
//     }); 








const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end("Home page");
    }else if(req.url === '/about'){
        res.end("About page");
    }else{
        res.end("Error")
    }
    });
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    }); 
