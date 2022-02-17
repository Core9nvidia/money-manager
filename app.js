const express=require('express');
const passport = require('passport');
const session = require('express-session');
//const MongoDBSession = require('connect-mongodb-session')(session);
const appController = require("./controller/appController");
const middleware = require("./controller/middleware");
const app=express();

const mongoose = require('mongoose');

require('./auth.js');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const User=require('./models/userModel');
const Friend=require('./models/friendModel');

var url="mongodb+srv://roha:roha@nodetut.hijdw.mongodb.net/splitwise?retryWrites=true&w=majority";
url="mongodb://localhost/splitwise2";
const port=process.env.PORT || 3000;
mongoose.connect(url)
    .then((result)=>app.listen(port))
    .catch((err)=>console.log(err));

function isLoggedIn(req,res,next){
    //console.log("see middleware  :  ",req.user);
    // if(req.user){
    //   console.log("here we are");
    //   console.log(req.user.language);
    // }
    // req.user
    req.session.isAuth ? next() : res.status(401).redirect('/');
}

app.get('/',(req,res)=>{
  req.session.isAuth=false;
  req.session.email="";
  res.render('index',{response:""})
  //res.send('<a href="/auth/google">Authenticate with google</a>')
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  appController.authGoogleCallback
);


app.get('/protected',isLoggedIn,(req,res)=>{
    //res.send(`hello`);
    res.send(`hello ${req.user.displayName}`);
});

app.get('/dashboard',isLoggedIn,appController.dashboard_get);

app.get('/login',(req,res)=>{
    res.send('probably login went wrong');
});
app.get('/profile',isLoggedIn,(req,res)=>{
  res.render('profile',{name:req.session.displayName,email:req.session.email,picture:req.session.picture});
})
app.get('/ham',(req,res)=>{
  res.render('hamburger',{balance:"0",name:req.session.displayName});
})
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });

app.get('/groups',(req,res)=>{
  res.render('myGroups',{balance:"0",name:req.session.displayName});
});
app.get('/friends',isLoggedIn,appController.friends_get);

app.get('/friend/:id',(req,res)=>{
  var id=req.params.id;
  res.send("friend page");
});

app.get('/addfriend',isLoggedIn,(req,res)=>{
  res.render('addFriend',{name:req.session.displayName,response:""});
});
app.post('/addfriend',isLoggedIn,appController.addfriend_post);
