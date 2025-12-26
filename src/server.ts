import { Hono } from "hono";
import { serve } from "@hono/node-server";
import app from "./app";
// Import the http2 module
// import { createSecureServer } from "node:http2";
// import { readFileSync } from "node:fs";
 

// Read the certificate and key files
// const options = {
//   key: readFileSync("./key.pem"),
//   cert: readFileSync("./cert.pem")
// };

// Create the HTTP/2 server using node:http2's createSecureServer
const server = serve(
  {
    fetch: app.fetch,
    // createServer: createSecureServer,
    // serverOptions: options,
    port: 3000
  },
  info => {
    console.log(`Listening on HTTPS/2: http://localhost:${info.port}`);
  }
);
