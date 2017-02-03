/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  connection: 'mongodbUserServer',
  migrate: 'safe',
  attributes: {
    id:{
      type:'integer',
      primaryKey:true,
      autoIncrement:true
    },
    login:{
      type: 'string',
      unique: true,
      required: true
    },
    password:{
      type: 'string'
    },
    f_name: {
      type: 'string'
    },
    l_name: {
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true
    },
    active: {
      type: 'boolean',
      defaultsTo: false
    },
    temp_pw:{
      type:'boolean',
      defaultsTo: true
    },
    admin:{
      type:'boolean',
      defaultsTo:false
    },
    isAdmin: function(){
      return this.admin;
    }

  }
};
