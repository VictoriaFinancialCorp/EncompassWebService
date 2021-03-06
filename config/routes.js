/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'reports/main' },
  '/reports' : { view: 'reports/main' },

  'get /login' : { view: 'user/login'},
  'post /login' : 'UserController.login',
  '/logout' : 'UserController.logout',
  '/forgotPassword': {view: 'user/forgotPassword'},
  '/addUser' : 'UserController.addUser',
  '/listUsers' : 'UserController.listUsers',
  '/emailPass': 'UserController.emailPassword',
  '/changePass' : 'UserController.changePass',

  '/fundedLoans' : 'LoanController.fundedLoans',
  '/fundedLoans/show/:date' : 'LoanController.fundedLoans',
  '/fundedLoans/:json' : 'LoanController.fundedLoans',
  '/LoansNotPurchased' : 'LoanController.LoansNotPurchased',
  '/LoansNotPurchased/:json' : 'LoanController.LoansNotPurchased',
  '/FundedWOInvestorLock' : 'LoanController.FundedWOInvestorLock',
  '/CTCNotFunded' : 'LoanController.CTCNotFunded',
  '/ProcessorActive' : 'LoanController.ProcessorActive',
  '/docsDrawn' : 'LoanController.docsDrawn',
  '/LockedFiles' : 'LoanController.lockedFiles',

  '/logs' : 'LogController.show',
  '/logs/show' : 'LogController.show',
  '/logs/admin' : 'LogController.admin',

  '/servicing-collect': 'ServicingController.collect',
  '/servicing-statements': 'ServicingController.statements',
  '/servicing-collected': 'ServicingController.collected',

  '/mers-home': 'MersController.home',
  'get /mers-generate': 'MersController.home',
  'post /mers-generate': 'MersController.generate',
  'post /mers-save': 'MersController.save',
  '/mers-list': 'MersController.list',
  '/mers-search': 'MersController.search',
  'get /mers-validate': {view: 'mers/validate'},
  'post /mers-validate': 'MersController.validate',
  '/mers-full-search': 'MersController.fullSearch',


  //API for backups
  '/backup/:action': 'BackupController.backup',

  '/2016-1098': '1098Controller.1098'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
