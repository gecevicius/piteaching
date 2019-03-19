var express = require('express');
var router = express.Router();
const Gpio = require('onoff').Gpio; // Gpio class
var gpioArray = []

/* POST set GPIO value. */
router.post('/', function(req, res, next) {
	var pin = req.body.pin
	var output = req.body.output;
	
	if(!gpioArray.includes(pin)){
		const gpio = new Gpio(pin, 'out'); 
		gpioArray.add(gpio)
	}
	gpio.writeSync(1)
	setTimeout(_ => gpio.unexport() = true, 5000);
	res.send(pin+' LED with value ' + output);

});

/* DELETE close GPIO connections. */
router.delete('/', function(req, res, next) {
	for each(var i in gpioArray){
		i.unexport();
	}
	gpioArray = []
});

//SPRENDIMO BUDAS DEL UNEXPORT :
/* i output priimti tiktai custom variables, kuris paima pin ir su kodu sukuria nauja gpio 
   kiekviena programa uzsibaigia su tu custom variables uzdarymu arba automatiskai arba reikia paciam naudotojui ideti custom end blocka
   siusti visa sita dalyka tiesiai i serveri apdorojimui.
   
   padaryti laika kuris skirtas kiekviena komandai. pvz min 0.5sec tarp komandu
   */
   module.exports = router;
