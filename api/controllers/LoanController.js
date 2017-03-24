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
		var numeral = require('numeral');
		var moment = require('moment');
		var date = moment(new Date()).format('MM/DD/YYYY');
		Loan.find({
			fundedDate: { '!': null },
			purchasedDate:  null ,
			currentStatus: [" Active Loan", " Loan Originated"],
			loanFolder: "My Pipeline",
			sort:'fundedDate ASC'
		}).exec(function(err, loans){
			//sails.log(loans);
			return res.view("reports/LoansNotPurchased", {numeral, loans, date});
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
			loanFolder: "My Pipeline",
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
			loanFolder: "My Pipeline",
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
			loanFolder: "My Pipeline",
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
	lockedFiles: function(req, res){
		var numeral = require('numeral');
		var moment = require('moment');
		var dateFrom = (req.param('dateFrom') != null) ? req.param('dateFrom') : moment().add(-15, "days").format('MM/DD/YYYY');
		var dateTo = (req.param('dateTo') != null) ? req.param('dateTo') : moment().format('MM/DD/YYYY');

		Loan.find({
			investorLockDate: {'>=' : dateFrom, '<=' : dateTo }
		}, {
			select: ['investor', 'investorNum', 'loanNum', 'loanAmt', 'investorLockDate', 'investorLockExpDate', 'totalAdj', 'netYSP', 'netSRP', 'fundedDate', 'processor', 'loanOfficer', 'investorLockType', 'b1_fname', 'b1_lname']
		}).exec(function(err, loans){
			if (err) return res.serverError(err);
			return res.view("reports/lockedFiles", {loans, moment, numeral, dateFrom, dateTo});
			//return res.json({loans });
		})
	},
	emailLockedFiles: function(req, res){
		var numeral = require('numeral');
		var moment = require('moment');
		var dateFrom = moment().add(-15, "days").format('MM/DD/YYYY');
		var dateTo = moment().format('MM/DD/YYYY');

		Loan.find({
			investorLockDate: {'>=' : dateFrom, '<=' : dateTo }
		}, {
			select: ['investor', 'investorNum', 'loanNum', 'loanAmt', 'investorLockDate', 'investorLockExpDate', 'totalAdj', 'netYSP', 'netSRP', 'fundedDate', 'processor', 'loanOfficer', 'investorLockType', 'b1_fname', 'b1_lname']
		}).sort('investorLockDate DESC').exec(function(err, loans){
			if (err) return res.serverError(err);

			//format email text
			var body = `<head><style>`+
					`table{border-collapse:collapse;border:1px solid #808080;}`+
					`td, th{border:1px solid #808080;padding-left:.5em;padding-right:.5em;font-size:x-small;text-align:center;}`+
				`</style></head>`;
			body += `<p>${loans.length} Locked Files from ${moment(dateFrom).format('MM/DD/YY')} to ${moment(dateTo).format('MM/DD/YY')}</p>`
			body += '<table>';
			body += '<tr>'+
				'<th>Investor</th>' +
				'<th>Investor#</th>' +
				'<th>Loan#</th>' +
				'<th>Borrower Name</th>' +
				'<th>Loan Amount</th>' +
				'<th>Inv. Lock Date</th>' +
				'<th>Inv. Lock Exp</th>' +
				'<th>Lock Type</th>' +
				'<th>Rebate</th>' +
				'<th>Processor</th>' +
				'<th>Loan Officer</th>' +
				'<th>Funded Date</th>' +
				'</tr>';
			loans.forEach(function(loan){
				body += `<tr>`+
					`<td>${loan.investor}</td>`+
					`<td>${loan.investorNum}</td>`+
					`<td>${loan.loanNum}</td>`+
					`<td>${loan.b1_lname}, ${loan.b1_fname}</td>`+
					`<td>${numeral(loan.loanAmt).format('$0,0.00')}</td>`+
					`<td>${moment(loan.investorLockDate).format('MM/DD/YY')}</td>`+
					`<td>${moment(loan.investorLockExpDate).format('MM/DD/YY')}</td>`+
					`<td>${loan.investorLockType}</td>`+
					`<td>${numeral(loan.rebate).add(loan.totalAdj).add(loan.netYSP).add(loan.netSRP).value()}</td>`+
					`<td>${loan.processor}</td>`+
					`<td>${loan.loanOfficer}</td>`+
					`<td>${(loan.fundedDate) ? moment(loan.fundedDate).format('MM/DD/YY') : ''}</td>`+
					`</tr>`;
			});

			body += '</table>';

			EmailService.sendEmail({
				'from' : sails.config.emailLockedFiles.from,
				'to' : sails.config.emailLockedFiles.to,
				'subject' : '[Server Report] Locked Files',
				'html' : body
			}, function(err){
				if (err) return res.serverError(err);
				//sails.log.info(loans);
				LogService.create({
		      name:'email',
		      msg:'locked report emailed'
		    }, function(err, result){
		      if(err) console.error(err);
		      console.log('report emailed');
					return body;
		    });

			});


			//return res.json({loans });
		})
	}

};
