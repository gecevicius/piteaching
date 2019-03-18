var express = require('express');
var router = express.Router();
const Gpio = require('onoff').Gpio; // Gpio class

/* POST set GPIO value. */
router.post('/', function(req, res, next) {
  	var pin = req.body.pin
  	var output = req.body.output;
	const led = new Gpio(pin, 'out'); 
	led.writeSync(1)
	led.unexport()
	  res.send(pin+' LED with value ' + output);
});



module.exports = router;
