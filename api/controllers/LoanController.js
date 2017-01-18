/**
 * LoanController
 *
 * @description :: Server-side logic for managing loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	FundedLoans: function (req, res) {
		var moment = require('moment');
		var date;
		if(!req.param('date')){
			date = moment(new Date()).format('MM/DD/YYYY');
		}else{
			date = req.param('date');
		}

		Loan.find({
			fundedDate: date,
			currentStatus: [" Active Loan", " Loan Originated"]
		}).exec(function(err, results){
			//console.log(results);
			return res.view("reports/fundedLoans", {results, date} );
		});

  },
	LoansNotPurchased: function(req, res){
		var moment = require('moment');
		var date = moment(new Date()).format('MM/DD/YYYY');
		Loan.find({
			fundedDate: { '!': null },
			purchasedDate:  null ,
			currentStatus: [" Active Loan", " Loan Originated"],
			sort:'fundedDate ASC'
		}).exec(function(err, loans){
			//sails.log(loans);
			return res.view("reports/LoansNotPurchased", {loans, date});
		});

	},
	FundedWOInvestorLock: function(req, res){
		var moment = require('moment');
		var date = moment(new Date()).format('MM/DD/YYYY');
		Loan.find({
			fundedDate: { '!': null },
			purchasedDate:  null ,
			investorLockDate: null,
			currentStatus: [" Active Loan", " Loan Originated"],
			sort:'fundedDate ASC'
		}).exec(function(err, loans){
			if (err) return res.json(err);
			return res.view('reports/FundedWOInvestorLock', {loans, date});
		});
	},

	CTCNotFunded: function(req, res){
		var moment = require('moment');
		var date = moment(new Date()).format('MM/DD/YYYY');
		Loan.find({
			CTCDate: { '!': null },
			fundedDate: null,
			currentStatus: [" Active Loan", " Loan Originated"],
			sort:'CTCDate ASC'
		}).exec(function(err, loans){
			if (err) return res.json(err);
			return res.view('reports/CTCNotFunded', {loans, date});
		})
	},
	ProcessorActive : function(req, res){
		var moment = require('moment');
		date = moment(new Date()).format('MM/DD/YYYY');

		var tempDate = new Date();
		tempDate.setDate(tempDate.getDate()-180);
		filterDate = moment(tempDate).format('MM/DD/YYYY');
		//console.log(filterDate);
		Loan.find({
			fundedDate: null,
			startedDate: {'>': filterDate },
			currentStatus: [" Active Loan", " Loan Originated", null],
			sort:'startedDate'
		}).exec(function(err, loans){
			if (err) return res.serverError(err);
			return res.view('reports/ProcessorActive', {loans, date, filterDate, moment});
		})
	},
	docsDrawn : function(req, res){
		var numeral = require('numeral');
		var moment = require('moment');
		Loan.find({
			docsDrawnDate: {'!': null},
			fundedDate: null,
			currentStatus: [" Active Loan", " Loan Originated", null],
			sort:'docsDrawnDate'
		}).exec(function(err, loans){
			if (err) return res.serverError(err);
			return res.view('reports/docsDrawn', {loans, moment, numeral});
		});
	},
	servicingCollect: function(req, res){
		var moment = require('moment');
		Loan.find({
			fundedDate: { '!': null}
		}).exec(function(err, loans){
			if(err) res.serverError(err);
			return res.view('reports/servicingCollect', {loans, moment});
		});

	}

};
