/**
 * LoanController
 *
 * @description :: Server-side logic for managing loans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	FundedLoans: function (req, res) {
		var date;
		if(!req.param('date')){
			var today = new Date();
			var mm = today.getMonth()+1;
			var dd = today.getDate();
			var yyyy = today.getFullYear();
			if(dd<10) {
			    dd='0'+dd
			}
			if(mm<10) {
			    mm='0'+mm
			}
			date = mm + "/"+ dd + "/"+ yyyy;
		}else{
			date = req.param('date');
		}

		Loan.find({
			fundedDate: date
		}).exec(function(err, results){
			//console.log(results);
			return res.view("reports/fundedLoans", {results, date} );
		});

  },
	LoansNotPurchased: function(req, res){
		var today = new Date();
		var mm = today.getMonth()+1;
		var dd = today.getDate();
		var yyyy = today.getFullYear();
		if(dd<10) {
				dd='0'+dd
		}
		if(mm<10) {
				mm='0'+mm
		}
		date = mm + "/"+ dd + "/"+ yyyy;
		Loan.find({
			fundedDate: { '!': null },
			purchasedDate:  null ,
			sort:'fundedDate ASC'
		}).exec(function(err, loans){
			//sails.log(loans);
			return res.view("reports/LoansNotPurchased", {loans, date});
		});

	},
	FundedWOInvestorLock: function(req, res){
		var today = new Date();
		var mm = today.getMonth()+1;
		var dd = today.getDate();
		var yyyy = today.getFullYear();
		if(dd<10) {
				dd='0'+dd
		}
		if(mm<10) {
				mm='0'+mm
		}
		date = mm + "/"+ dd + "/"+ yyyy;
		Loan.find({
			fundedDate: { '!': null },
			purchasedDate:  null ,
			investorLockDate: null,
			sort:'fundedDate ASC'
		}).exec(function(err, loans){
			if (err) return res.json(err);
			return res.view('reports/FundedWOInvestorLock', {loans, date});
		});
	},

	CTCNotFunded: function(req, res){
		var today = new Date();
		var mm = today.getMonth()+1;
		var dd = today.getDate();
		var yyyy = today.getFullYear();
		if(dd<10) {
				dd='0'+dd
		}
		if(mm<10) {
				mm='0'+mm
		}
		date = mm + "/"+ dd + "/"+ yyyy;
		Loan.find({
			CTCDate: { '!': null },
			fundedDate: null,
			sort:'CTCDate ASC'
		}).exec(function(err, loans){
			if (err) return res.json(err);
			return res.view('reports/CTCNotFunded', {loans, date});
		})
	},
	ProcessorActive : function(req, res){
		var today = new Date();
		var mm = today.getMonth()+1;
		var dd = today.getDate();
		var yyyy = today.getFullYear();
		if(dd<10) {
				dd='0'+dd
		}
		if(mm<10) {
				mm='0'+mm
		}
		date = mm + "/"+ dd + "/"+ yyyy;
		Loan.find({
			fundedDate: null,
			startedDate: {'>': new Date('1/1/2016') },
			sort:'startedDate'
		}).exec(function(err, loans){
			if (err) return res.json(err);
			return res.view('reports/ProcessorActive', {loans, date});
		})
	}

};
