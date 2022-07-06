import session from "express-session";

interface IMongoDBConfig {
    databaseName: string;
    hosts: string[];
    ports: number[];
    user: string;
    password: string;
}


interface IServerConfig {
    host: string;
    port: number;
    session: session.SessionOptions
}

interface IGlobalConfig {
    mongodb: IMongoDBConfig;
    server: IServerConfig;
}


export const config: IGlobalConfig = {
    mongodb: {
        databaseName: "",
        hosts: [],
        ports: [],
        user: "",
        password: ""
    },
    server: {
        host: "",
        port: 8081,
        session: {
            secret: "secret",
            resave: true,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            }
        }
    }
};