const http = require("http");
const host = 'localhost';
const port = process.env.PORT || 80

function handleRequest(request, response) {
    response.writeHead(200);
    response.end("Yooo");
}

const server = http.createServer(handleRequest);
server.listen(port);