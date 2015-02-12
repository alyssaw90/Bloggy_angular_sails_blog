/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    firstName: {
      type:'string'
    },
    lastName: {
      type:'string'
    },
    email: {
      type:'email',
      required:true,
      unique:true
    },
    password:{
      type:'string',
      required:true
    },
    toJSON:function(){
      var userObject = this.toObject();
      delete userObject.password;
      return userObject;
    }
  },
  //Model.beforeCreate(value,function(err,data){ ... })
  beforeCreate:function(value,cb){
    bcrypt.hash(value.password, 10, function(err,hash){
      if(err) return cb(err);
      value.password = hash;
      cb();
    })
  }
};

