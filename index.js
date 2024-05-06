import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import expressEjsLayouts from "express-ejs-layouts";
import ejs from "ejs";
import path from "path";
import userRouter from "./src/routes/user.routes.js";
import performanceRouter from "./src/routes/performance.routes.js";
import { auth } from "./src/middleware/auth.middleware.js";
import cors from 'cors';
import bodyParser from 'body-parser'


const server = express();
server.use(cors());
server.use(bodyParser.json())
server.use(cookieParser());
server.use(
    session({
        secret: "Keypad Cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Setup view engine
server.use(express.static("public"));
server.set("view engine", "ejs"); //setup chich engine we are using
server.set("views", path.join(path.resolve(), "src", "view")); //setup path where is our views
server.use(expressEjsLayouts);
server.use(express.urlencoded({ extended: false }));

server.get('/logout', (req, res, next) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie('connect.sid');
            res.redirect('/employee_login');
        }
    });
})
server.use('/feedback', auth, performanceRouter);
server.use('/main_page/view_performance', auth, performanceRouter)
server.use('/', userRouter)

export default server;