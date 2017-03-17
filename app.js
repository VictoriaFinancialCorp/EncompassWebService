/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);

// Attempt to import `sails`.
var sails;
try {
  sails = require('sails');
} catch (e) {
  console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
  console.error('To do that, run `npm install sails`');
  console.error('');
  console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
  console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
  console.error('but if it doesn\'t, the app will run with the global sails instead!');
  return;
}

// --•
// Try to get `rc` dependency (for loading `.sailsrc` files).
var rc;
try {
  rc = require('rc');
} catch (e0) {
  try {
    rc = require('sails/node_modules/rc');
  } catch (e1) {
    console.error('Could not find dependency: `rc`.');
    console.error('Your `.sailsrc` file(s) will be ignored.');
    console.error('To resolve this, run:');
    console.error('npm install rc --save');
    rc = function () { return {}; };
  }
}


// Start server
sails.lift(rc('sails'));

//task scheduler
var schedule = require('node-schedule');

var j = schedule.scheduleJob({
  hour: 20,
  minute: 0,
  second: 5,
  dayOfWeek: [new schedule.Range(1, 5)]
}, function(){
  //console.log(Date.now() +'run backup');
  var mySqlBackup = require('./api/controllers/BackupController').mySqlBackup;
  var options = {
    db: 'mers',
    login: sails.config.connections.mySql.user,
    pw: sails.config.connections.mySql.password
  }
  mySqlBackup( options,  function(err, output){
    if(err) console.error(err);
    LogService.create({
      name:'backup',
      msg:output.stdout
    }, function(err, result){
      if(err) console.error(err);
      console.log(result)
    });
  });
   console.log('backed up');


});
sails.log.info('Task Scheduler Ready in app.js');
//end scheduler
