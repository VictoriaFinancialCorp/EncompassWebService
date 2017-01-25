module.exports = {
	1098: function (req, res) {
		var moment = require('moment');
    var numeral = require('numeral');

    var jsonfile = require('jsonfile')
    var file = '././assets/json/2016-1098.json'
    jsonfile.readFile(file, function(err, obj) {
      if(err) return res.serverError(err);
      // console.dir(obj);
      return res.view("1098/2016", {numeral,moment,obj} );
    });

  }
}
