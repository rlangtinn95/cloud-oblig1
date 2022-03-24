const http = require("http");
const host = 'localhost';

function handleRequest(request, response) {
    response.status(200);
    response.send("Yooo");
}

const server = http.createServer(handleRequest);