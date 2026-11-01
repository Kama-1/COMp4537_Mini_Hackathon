const lang = require("./lang/en");
const http = require("http");
const SecretVerifier = require("./SecretVerifier");
const PORT = process.env.PORT || 3000;

class Server {
  constructor() {
    this.server = http.createServer((req, res) => this.createServer(req, res));
    this.port = PORT;
    this.secretVerifier = new SecretVerifier(
      "purple clouds carry tiny bicycles"
    );
  }

  run() {
    this.server.listen(this.port);
    console.log(`Server is running and listening on port ${this.port}`);
  }

  handleVerification(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let result;

      try {
        const data = JSON.parse(body);
        result = this.secretVerifier.verify(data.guess);
      } catch {
        result = { verify: "Incorrect" };
      }

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });

      res.end(JSON.stringify(result));
    });
  }

  createServer(req, res) {
    const pathname = new URL(req.url, "http://localhost").pathname;

    if (pathname === "/verify" && req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      res.end();
      return;
    }

    if (pathname === "/verify" && req.method === "POST") {
      this.handleVerification(req, res);
      return;
    }
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
