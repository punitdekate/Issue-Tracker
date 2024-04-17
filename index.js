import express, { urlencoded } from "express";
import expressLayout from 'express-ejs-layouts'
import path from 'path';
import session from "express-session";
import cookieParser from "cookie-parser";
import { userRouter } from "./src/routes/user/user.routes.js";
import dotenv from 'dotenv';
import cors from 'cors';

const configEnvPath = path.resolve('config', '.env');
dotenv.config({ path: configEnvPath });

const server = express();

server.use(cookieParser());
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


// Setup view engine 
server.use(express.static("public")); //Provide public access to the public folder
server.set('view engine', 'ejs') //setup ejs view engine
server.set('views', path.join(path.resolve(), 'src', 'view')) //setup path where is our views
server.use(expressLayout); //Use the engine setup

server.use(express.urlencoded({ 'extended': false }));

//User Router

server.use('/', userRouter);

export { server };