/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  // User.create({
  //   name:'calvin',
  //   login:'calvin',
  //   password:'asdf',
  //   email:'calvin@victoriafinancial.net'
  // }).exec(function(err, result){
  //   if(err) console.log(err);
  //   else console.log(result);
  // })
  // var processor = 1;
  //
  // console.log(processor);
  // Loan.create({
  //   guid: 'asdf1',
  //   processor: processor
  // }).exec(function(err, result){
  //   if(err) console.log(err);
  //   else console.log(result);
  // });
  // Loan.create({
  //   guid: 'asdf123',
  //   processor: processor
  // }).exec(function(err, result){
  //   if(err) console.log(err);
  //   else console.log(result);
  // });
  // Loan.create({
  //   guid: 'asdf124',
  //   processor: processor
  // }).exec(function(err, result){
  //   if(err) console.log(err);
  //   else console.log(result);
  // });


	var bcrypt = require('bcrypt-nodejs');
  User.find({
		login:'admin'
	}).exec(function(err, user){
		if (err) sails.log.error(err);
		if (user.length == 0){ //if admin doesn't exist, create and add roles
			User.create({
	      login:'admin',
	      email:'admin@localhost',
	      password:bcrypt.hashSync("admin"),
	      f_name:'admin',
	      l_name:'',
	      active: true,
	      temp_pw: false
	    }).exec(function(err, user){
	      if (err) sails.log.error(err);
        else sails.log.info("default admin login created");

	    });
		}
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
