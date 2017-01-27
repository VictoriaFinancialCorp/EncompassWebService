/**
 * ServicingController
 *
 * @description :: Server-side logic for managing loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  collect: function(req, res){
    var numeral = require('numeral');
    var moment = require('moment');
    Loan.find({
      fundedDate: { '!': null},
      mortgageStatementLastPrinted: {'!': null},
      servicingStatus: [' Current', ' Past Due']
    }).exec(function(err, loans){
      if(err) res.serverError(err);
      return res.view('reports/servicingCollect', {loans, moment, numeral});
    });

  },
  statements: function(req, res){
    var numeral = require('numeral');
    var moment = require('moment');
    var range = moment().subtract(90, 'days').calendar()
    Loan.find({
      fundedDate: { '!': null},
      mortgageStatementLastPrinted: null,
      firstPaymentDate: { '>=': range }
    }).exec(function(err, loans){
      if(err) res.serverError(err);
      return res.view('reports/servicingStatements', {loans, moment, numeral});
    })

  },
  collected: function(req, res){
    var numeral = require('numeral');
    var moment = require('moment');
    Loan.find({
      fundedDate: { '!': null},
      paymentsCollected: { '>' : 0 }
    }).exec(function(err, loans){
      if(err) res.serverError(err);
      return res.view('reports/servicingCollected', {loans, moment, numeral});
    });

  }

}
