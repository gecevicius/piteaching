var express = require('express');
var router = express.Router();
const gpioFunctions = require("../js/gpioFunctions.js")
const gpiojs = new gpioFunctions()

/* POST set GPIO value. */
router.post('/', function(req, res, next) {
	var pin = req.body.pin
	var output = req.body.output;
	if (gpiojs.setOutput(pin,output)) {
		res.send(pin+' LED with value ' + output);
	}
	else {
		res.send(pin+' pin GPIO not supported. please check pin numbers. App must be hosted on a RaspberryPi.');
 	
}

});

router.get('/', function(req, res, next) {
	var pin = req.query.pin
	var sense = req.query.sense
	
	if(sense){
		gpiojs.senseGpio(pin)
	}
	var val = gpiojs.readVal(pin)
	if (val) {
		res.send({
			"val":val
		});
	}
	else {
		res.send(pin+' pin read failure. Please check if pin is connected.');
		}
 	

});

/* DELETE close GPIO connections. */
router.get('/close', function(req, res, next) {
	gpiojs.close();
});

   module.exports = router;
