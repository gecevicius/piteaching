var express = require('express');
var router = express.Router();
const gpioFunctions = require("../js/gpioFunctions.js")
const gpiojs = new gpioFunctions()


/* POST set GPIO value. */
router.post('/', function(req, res, next) {
	var pin = req.body.pin
	var output = req.body.output;
	var type = req.body.type;
	const io = req.app.get('socketio');
	console.log(req.body)
	if (gpiojs.setOutput(pin,output,type,io)) {
		res.send(pin+' LED with value ' + output);
	}
	else {
		res.send(pin+' pin GPIO not supported. please check pin numbers. App must be hosted on a RaspberryPi.');
 	
}

});

router.get('/', function(req, res, next) {
	var pin = req.query.pin
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

router.post('/sensor', function(req, res, next) {
	var pin = req.body.pin
	var type = req.body.type
	const io = req.app.get('socketio');
	gpiojs.senseGpio(pin,type,io);
	res.send("sensing gpio at pin " + pin);
		
});

/* DELETE close GPIO connections. */
router.get('/close', function(req, res, next) {
	if(req.query.pin >= 0){
		var pin = req.query.pin
		res.send(gpiojs.close(pin));
	}
	else res.send(gpiojs.close());
});

   module.exports = router;
