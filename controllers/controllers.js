const jwt = require('jsonwebtoken');
const User = require('../models/user')

const _ = require('lodash');
const fs = require('fs');

exports.signup = async (req, res) => {
    console.log(req.body.name,req.body.password);
    try {
      const userExists = await User.findOne({ name: req.body.name });
      console.log('Userrr:', userExists);
  
      if (userExists) {
        return res.status(403).json({ error:true,msg: `Name is Taken!` });
      }
      const newUser = new User(req.body);
      newUser.todo='Empty'
      newUser.done='Empty'
      const savedUser = await newUser.save();
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: 432000000,
      });
      //persist token with expiry date
      console.log('Token fetched')
      //return response with user details and token
      const { _id, name } = savedUser;
      return res.json({error:false, token, user: { _id, name } });
    } catch (errorMsg) {
      res.status(500).json({ error:true, msg: errorMsg});
    }
  };
  


exports.signin = (req, res) =>{
    const { name, password } = req.body;
  console.log('1st param - ', name, ' 2- ', password);
  User.findOne({ name }, (err, user) => {
    if (err || !user)
      return res.status(401).json({
        error: 'No user with this name Exists',
      });

    console.log('reached');
    //if User is not  found
    
    if(user.password !== password){
        return res.json({error:true,msg:'Incorrect Password!'})
    }

    console.log('reached 3');
   
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 432000000,
    });
    //persist token with expiry date

    //return response with user details and token
    const { _id, name } = user;
    return res.json({error:false, token, user: { _id, name } });
  });
}

exports.getAllUsers = (req, res) =>{
    User.find((err, users) => {
        if (err) return res.json({ error: true,msg:err });
        res.json({error:false, users });
      })
        .select(
          'name todo done'
        )
        .sort({ name: 1 });
}
exports.getUser = (req, res) =>{
    User.find({_id:req.params.userId}).then((user)=>{
        if(!user){
            return res.json({error:true,msg:"NO user found"});
        }
        return res.json({error:false,user})
    })
}
exports.changeData = (req, res) =>{
    const conditions = { _id: req.params.userId };
    console.log('ID:',conditions);
    console.log('REQ Body:',req.body);
    User.findOneAndUpdate(conditions, req.body,{new:true})
    .then(user => {
      if (!user) {
        return res.status(404).json({error:true,"msg":'USER NOT FOUND!'});
      }
      return res.status(200).json({error:false,user});
    })
    .catch(err => console.log("Error while changing data:",err));
}