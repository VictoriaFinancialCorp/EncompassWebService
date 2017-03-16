/**
 * LogController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: function(req, res){
		Log.find({
			limit:50,
			sort:'createdAt DESC'
		}).exec(function(err, logs){
			if (err) return res.json(err);
			return res.view('logs', {logs});
		});

	}

};
