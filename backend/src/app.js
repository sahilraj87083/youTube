import express, { urlencoded } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { LIMIT } from './constants.js';
const app = express()


// here we can add middlewares
// for example : cookie parser , cors , json parser etc

// cors middleware will allow us to handle cross origin requests 
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
// express.json middleware to parse json request body
app.use(express.json({ // for parsing application/json
    limit : LIMIT
}))
app.use(cookieParser())
app.use(urlencoded({ // for parsing application/x-www-form-urlencoded
    extended : true,
    limit : LIMIT
}))
app.use(express.static('public')) // for serving static files



// import routes
import userRouter from './routes/user.routes.js'
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import videoRouter from "./routes/video.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";


// router declaration

app.use('/api/v1/users', userRouter)
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);

export {app}