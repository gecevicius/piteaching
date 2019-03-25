var express = require('express');
var router = express.Router();
const gpioFunctions = require("../js/gpioFunctions.js")
const gpiojs = new gpioFunctions()

/* POST set GPIO value. */
router.post('/', function(req, res, next) {
	var pin = req.body.pin
	var output = req.body.output;
	const io = req.app.get('socketio');
	if (gpiojs.setOutput(pin,output,io)) {
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
		const io = req.app.get('socketio');
		gpiojs.senseGpio(pin,io)
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
