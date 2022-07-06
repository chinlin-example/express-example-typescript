import express from "express";
import http from "http";
import compress from "compression";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "./config/config";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import myMongoDB from "./models/mongodb/connector";
import { renderFile } from "ejs";
import passport from "passport";
const port = config.server.port;
const app : express.Application = express();
myMongoDB(config);
app.use(compress());
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());

let sessionConfig = {
    ...config.server.session,
    store: MongoStore.create({
        clientPromise: mongoose.connection.asPromise().then(connection => connection.getClient()),
        dbName: config.mongodb.databaseName
    })
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
import myPassport from "./models/user/passport";
myPassport(passport);

app.engine("html", renderFile);
import routes from "./routes";
routes(app);

http.createServer(app).listen(port , function() {
    console.log(`http server is listening on port:${port}`)
});

