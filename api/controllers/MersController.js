/**
 * MersController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home:function(req, res){
    return res.view('mers/main');
  },
	generate: function(req, res){
    var mers = require('mers-min');

    var orgID = req.param('orgID');
    var loanNum = req.param('loan_num');
    var processor = req.param('processor');
    var b_name = req.param('b_name');



    var output = mers.generate(orgID, loanNum);
    if (output == null) return res.serverError({err:"invalid input"});

    Mers.find({
      min_num: output.min
    }).exec(function(err, loans){
      if(err) {
        return res.serverError({err});
      }
      else if(loans.length > 0) {
        return res.serverError({err:"min exists"});
      }
      else {
        return res.view('mers/main', {output, processor, b_name});
      }
    })
	},
  list: function(req, res){
    var moment = require('moment');
    Mers.find().exec(function(err, loans) {
      if (err) res.serverError({err});
      return res.view('mers/list', {loans, moment})
    });
  },
  save: function(req, res){
    Mers.create({
      min_num : req.param('min_num'),
      org_id: req.param('org_id'),
      loan_num: req.param('loan_num'),
      b_name: req.param('b_name'),
      processed_by: req.param('processor')
    }).exec(function(err, loan){
      if (err) { res.serverError(err);}
      else {return res.view('mers/success', {loan});}
    });
  }

};
