const lang = require("./lang/en");
const http = require("http");
const PORT = process.env.PORT || 3000;

class Server {
    constructor() {
        this.server = http.createServer((req, res) => this.createServer(req, res));
        this.port = PORT;
    }

    run() {
        this.server.listen(this.port);
        console.log(`Server is running and listening on port ${this.port}`);
    }

    createServer(req, res) {
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
        });
        res.end(`${lang.STRINGS.HELLO}`);
    }
}


function main() {
    const server = new Server(PORT);
    server.run();
}

main();