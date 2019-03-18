var express = require('express');
var router = express.Router();
const Gpio = require('onoff').Gpio; // Gpio class

/* GET users listing. */
router.post('/', function(req, res, next) {
  	var pin = req.body.pin
  	var output = req.body.output;
	const led = new Gpio(pin, 'out'); 
	led.writeSync(output)
	led.unexport()
	  res.send('');
});



module.exports = router;
