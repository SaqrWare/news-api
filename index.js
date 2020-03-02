"use strict";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {DATABASE} from "./config/db";

//init database
mongoose.connect(DATABASE.connection);
mongoose.set("debug", DATABASE.debug);

//init app
const app = express();
app.use(bodyParser.json({}));

//init router
import routes from "./http/routes";
import {PORT} from "./config/host";

app.use("/", routes);

//Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send({error: err.message || "SERVER_ERROR"});
});

//init server
const server = http.createServer(app);
const port = PORT;
server.listen(port);
console.log(`Started listening: ${port}`);
