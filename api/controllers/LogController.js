/**
 * LogController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: function(req, res){
		const fs = require('fs');
		var path = sails.config.appPath + "/assets/logs/myLog.log";

		//server log file if exists
		if(fs.existsSync(path)){
			var lineReader = require('readline').createInterface({
				input: fs.createReadStream(path)
			});

			var output ="<pre>";
			lineReader.on('line', function (line) {
				output += line +"\n" ;
			});

			lineReader.on('close', function(){
				output +="</pre>";
				return res.ok(output);
			})
		}
		//else show logs from db
		else{
			Log.find({
				limit:50,
				sort:'createdAt DESC'
			}).exec(function(err, logs){
				if (err) return res.json(err);
				return res.view('logs', {logs});
			});
		}



	},

	admin: function(req, res){
		const fs = require('fs');
		var path = sails.config.appPath + "/assets/logs/updates.log";

		if(fs.existsSync(path)){
			var lineReader = require('readline').createInterface({
				input: fs.createReadStream(path)
			});

			var output ="<pre>";
			lineReader.on('line', function (line) {
				output += line +"\n" ;
			});

			lineReader.on('close', function(){
				output +="</pre>";
				return res.ok(output);
			})
		}else{
			return res.serverError("`updates.log` file not found");
		}
	}

};
