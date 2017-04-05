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
    Loan.find({
      fundedDate: { '!': null} ,
      //fundedDate: {'>=': moment().subtract(90, 'days').calendar() },
      mortgageStatementLastPrinted: null,
      firstPaymentDate: { '>=': moment().subtract(90, 'days').calendar() },
      //  or: [
      //    {firstPaymentDateInvestor: { '!' : this.firstPaymentDate} },
      //    {firstPaymentDateInvestor: null}
      //  ]
      //firstPaymentDate: { '>=': moment().add(18, 'days').calendar() },
      // or: [
      //   {servicingStatus: ['Current', ' Past Due']},
      //   {purchasedDate: null },
      //   {purchasedDate: {'>=': moment().subtract(90, 'days').calendar()}}
      //
      // ]
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
