module.exports = {

  create : function(options, done){

    Log.create({
			event_name: options.name,
			message: options.msg
		}).exec(function(err, result){
			done(err, result)
		});

  }

};
