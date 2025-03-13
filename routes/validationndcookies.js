import session from "express-session"
import MongoStore from "connect-mongo"


const SESSION_S = {
      store: MongoStore.create({mongoUrl:`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ab2or.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`}),
      secret:process.env.SECRET,
      resave:false,
      saveUninitialized:true,
      cookie:{
        maxAge:60*60*2,
        secure:false,
        httpOnly:true,
}};


export default function configSession(app){
    app.set('trust proxy',1);
    app.use(session(SESSION_S));
    console.log("Session cookies started succeshilly");
}