module.exports = {
	backup: function (req, res) {
		var action = req.param('action');
		if(action == 'mers'){
			if(sails.config.connections.mySql.password == ''){
				return res.serverError("db password required for login");
			}
			var options = {
				db: 'mers',
				login: sails.config.connections.mySql.user,
				pw: sails.config.connections.mySql.password
			}
			var mySqlBackup = require('./BackupController').mySqlBackup;
			mySqlBackup( options,  function(err, output){
				if(err) return res.serverError(err);
				LogService.create({
					name:'backup',
					msg:output.stdout
				}, function(err, result){
					if (err) return res.serverError(err);
					return res.ok({output});
				});
			});

		}else{
			return res.json({msg:'no backup for that request'});
		}
  },
	mySqlBackup: function (options, cb){
		var moment = require('moment');
		const exec = require('child_process').exec;
		var mysqldump = sails.config.connections.mySql.path + "mysqldump.exe";
		var fileName =  options.db + "_bk" + moment().format('YYYYMMDD-HHmmss') + '.sql';
		var query = mysqldump + ' -u '+ options.login + ' -p' + options.pw + ' ' + options.db + ' > backup\\' + fileName ;
		//console.log(query);
		exec(query, (error, stdout, stderr) => {
		  if (error) {
		    console.error(`exec error: ${error}`);
		    return cb(error, null);
		  }
			stdout = (stdout == '') ? options.db + ' db backup successful' : stdout ;

		  console.log(`stdout: ${stdout}`);
		  console.log(`stderr: ${stderr}`);
			cb(null, {stderr, stdout});
		});

	}

}
