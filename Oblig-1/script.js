const http = require("http");
const host = 'localhost';
const port = 8000;

const requestListener = function(req, res){
    res.writehead(200);
    res.end("my first server");
}

const server = http.createServer(requestListener);

server.listen(port, host() => {
    console.log(`Server is running on http://${host}, ${port}`)
});