module.exports = {
	backup: function (req, res) {
		var action = req.param('action');
		if(action == 'mers'){
			if(sails.config.connections.mySql.password == ''){
				return res.serverError("db password required for login");
			}
			mySqlBackup('mers',sails.config.connections.mySql.user, sails.config.connections.mySql.password);

			return res.ok('done');
		}else{
			return res.json({msg:'no backup for that request'});
		}
  }
}

//backup mysql db
function mySqlBackup(db, login, pw){
	var moment = require('moment');
	const exec = require('child_process').exec;
	var mysqldump = sails.config.connections.mySql.path + "mysqldump.exe";
	var fileName =  db + "_bk" + moment().format('YYYYMMDD-HHmmss') + '.sql';
	var query = mysqldump + ' -u '+ login + ' -p' + pw + ' ' + db + ' > backup\\' + fileName ;
	//console.log(query);
	exec(query, (error, stdout, stderr) => {
	  if (error) {
	    console.error(`exec error: ${error}`);
	    return;
	  }

	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
	});
	console.log('[Backup]: completed')
}
