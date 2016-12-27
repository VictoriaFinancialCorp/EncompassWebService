/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'users',
  attributes: {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    login:{
      type: 'string',
      required: true,
      unique: true
    },
    password:{
      type: 'string',
      required: true
    },
    email:{
      type: 'string',
      required: true,
      unique: true
    }


  }
};
