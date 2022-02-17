const User=require('../models/userModel');
const Friend=require('../models/friendModel');
const req = require('express/lib/request');

exports.dashboard_get=(req,res)=>{
    //console.log(req.session);
    //console.log("before login ",req.session.totalYouPaid);
    res.render('dashboard',{
      totalYouPaid:req.session.totalYouPaid,
      totalYourShare:req.session.totalYourShare,
      totalYouAreOwed:req.session.totalYouAreOwed,
      totalYouOwe:req.session.totalYouOwe,
      name:req.session.displayName});
};
exports.authGoogleCallback=function(req, res) {
    // Successful authentication, redirect home.
    //console.log(res);
    req.session.isAuth=true;
    req.session.displayName=req.user.displayName;
    req.session.given_name=req.user.given_name;
    req.session.family_name=req.user.family_name;
    req.session.email=req.user.email;
    req.session.picture=req.user.picture;
    // save user to database
    User.findOne({email:req.user.email})
      .then((result)=>{
        //console.log("here is result ::::: ",result);
        
        //console.log("result got :",req.session);
        if(!result){
          // new user
          req.session.totalYouPaid="0.0";
          req.session.totalYourShare="0.0";
          req.session.totalYouAreOwed="0.0";
          req.session.totalYouOwe="0.0";

          const user={name:req.user.displayName,email:req.user.email,totalYouPaid:0.0,
            totalYourShare:0.0,totalYouOwe:0.0,totalYouAreOwed:0.0,friendList:[]};
          const newuser= new User(user);
          newuser.save()
            .then((result)=>{
              //console.log("user saved : name is ",req.user.displayName);
              res.redirect('/dashboard');
            })
            .catch(err=>console.log(err));
        }else{
          // user exists
          req.session.totalYouPaid=result.totalYouPaid.toString();
          req.session.totalYourShare=result.totalYourShare.toString();
          req.session.totalYouAreOwed=result.totalYouAreOwed.toString();
          req.session.totalYouOwe=result.totalYouOwe.toString();
          //console.log("user exists name : ",req.user.displayName);
          //console.log("user data paid : ",req.session.totalYouPaid);
          //console.log(req.session);
          res.redirect('/dashboard');
        }
      }).catch(err=>console.log(err));
      
    //res.redirect('/dashboard');
};



function case2_addfriend_get(){
  User.findOne({email:req.body.email})
    .then((result)=>{
      console.log("email of friend ",req.body.email);
          if(!result){
              console.log("no usr with this id");
          }else{
              const newFriend=new Friend({name:result.name,email:req.body.email});
              newFriend.save()
                  .then((result2)=>{
                      console.log("new friend created with mail ",result2);
                      // add to friend list in user model
                      
                      User.findOne({email:req.session.email})
                        .then((result3)=>{
                          result3.friendList.push(newFriend);
                          result3.save();
                          res.redirect('/dashboard');
                        })
                        .catch(err=>console.log(err));
                  })
                  .catch(err=>console.log(err));
          }
      }).catch(err=>console.log(err));
}


exports.addfriend_post=(req,res)=>{
  console.log(req.body);

  // case 1 : user exist in friend model and is already a friend
  Friend.findOne({email:req.body.email})
    .then((result)=>{
      console.log("tried to find friend in friend model ",result);
      if(result){
        console.log("user exists in friend model ",result);
        User.findOne({email:req.session.email})
          .then((result3)=>{
            var isInArray = result3.friendList.some(function (friend) {
                return friend.equals(result._id);
            });
            if(isInArray){
              res.render('addFriend',{name:req.session.displayName,response:"User with this email is already your friend"});
            }else{
                // case 2 : add user as friend
              case2_addfriend_get();
            }
          })
          .catch(err=>console.log(err));
      }else{
        // case 2 : add user as friend
        case2_addfriend_get();
      }
    }).catch(err=>console.log(err));
};

exports.friends_get=(req,res)=>{
  User.findOne({email:req.session.email})
    .then((result)=>{

      // var myPromise=new Promise((resolve,reject)=>{
      //   var obj=[];
      //   console.log(result.friendList.length);
      //   for(var i=0;i<result.friendList.length;i++){
      //     Friend.findOne({_id:result.friendList[i].toString()})
      //       .then((result2)=>{
      //         console.log("rr " ,result2);
      //         obj.push(result2);
      //         //console.log("see obj ",obj);
      //         if(i+1 == result.friendList.length){
      //           console.log("see we returned",obj);
      //           resolve(obj);
      //         }
      //       })
      //       .catch(err=>console.log(err));
      //   }
      //   //console.log("see firll obj ",obj);
      //   //return obj;
      //   resolve(obj);
      //   reject("obj not returned");
      // });
      // console.log("see if reaches");
      // myPromise.then((obj)=>{
      //   console.log("hello");
      //   console.log("see obj here");
      //   console.log("dd ",obj);
      //   res.render('friendList',{name:req.session.displayName,email:req.session.email,friendList:obj});
      // }).catch(err=>console.log(err));

      var arrayPromises=[];
      for(var i=0;i<result.friendList.length;i++){
        arrayPromises.push(
          new Promise((resolve,reject)=>{
            Friend.findOne({_id:result.friendList[i].toString()})
              .then((result2)=>{
                resolve(result2);
              })
              .catch(err=>{console.log(err);reject("object not returned from i = ",i)});
          })
        )
      }
      Promise.all(arrayPromises).then((arrayObj)=>{
        //console.log("see array of obj here : ",arrayObj);
        // res.render('friendList',{name:req.session.displayName,email:req.session.email,friendList:arrayObj});
        var myobj=[{
          'name':'rohit',
          'balance':[],
          'email':'1923rohit@gmail.com',
          'objectId':'12sdssddk14n123412'
        },
        {
          'name':'rohit2',
          'balance':[],
          'email':'1923rohit2@gmail.com',
          'objectId':'12sdssddk14n123412'
        }];
        res.render('friendList',{name:req.session.displayName,email:req.session.email,friendList:arrayObj});
      })
      
    })
    .catch(err=>console.log(err));
};