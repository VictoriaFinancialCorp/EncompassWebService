/**
 * Mers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'mers',
  connection: 'mySqlMERS',
  migrate: 'safe',
  attributes: {
    id:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    org_id:{
      type:'string',
      required: true
    },
    loan_num:{
      type:'string',
      required: true
    },
    min_num: {
      type:'string',
      required: true,
      unique: true
    },
    b_name: {
      type:'string'
    },
    processed_by: {
      type:'string',
      required: true
    }
  }
};
