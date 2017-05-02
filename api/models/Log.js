/**
 * Log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'logs',
  attributes: {
    id:{
      type: 'integer',
      primaryKey: true,
    autoIncrement: true
    },
    event_name:{
      type:'string',
      required: true
    },
    message: {
      type:'string',
      required: true
    }
  }
};
