var express = require('express');
var router = express.Router();
const Gpio = require('onoff').Gpio; // Gpio class

/* GET users listing. */
router.get('/set-output', function(req, res, next) {
  
	const led = new Gpio(4, 'out'); 
	const iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 200);
	setTimeout(_ => {
	  clearInterval(iv); 
	  led.unexport();    
	}, 5000);
	  res.send('GOTCHA');
});



module.exports = router;
