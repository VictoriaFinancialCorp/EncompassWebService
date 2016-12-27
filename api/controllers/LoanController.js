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
			date = "12/21/2016";
		}else{
			date = req.param('date');
		}

		Loan.find({
			fundedDate: date
		}).exec(function(err, results){
			//console.log(results);
			return res.view("reports/fundedLoans", {results, date} );
		});

  }

};
