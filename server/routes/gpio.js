var express = require('express');
var router = express.Router();
const Gpio = require('onoff').Gpio; // Gpio class

/* GET users listing. */
router.post('/set-output', function(req, res, next) {
  	var pin = req.body.pin
  	var output = req.body.output;
	const led = new Gpio(pin, 'out'); 
	const iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 200);
	setTimeout(_ => {
	  clearInterval(iv); 
	  led.unexport();    
	}, 5000);
	  res.send('');
});



module.exports = router;
