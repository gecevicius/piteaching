var express = require('express');
var router = express.Router();
var gpiojs = require('./js/gpioFunctions.js')

/* POST set GPIO value. */
router.post('/', function(req, res, next) {
	var pin = req.body.pin
	var output = req.body.output;
	if (Gpio.accessible) {
		gpiojs.setOutput(pin,output);
		res.send(pin+' LED with value ' + output);
	}
	else {
		res.send(pin+' pin GPIO not supported. please check pin numbers. App must be hosted on a RaspberryPi.');
 	
}

});

/* DELETE close GPIO connections. */
router.get('/close', function(req, res, next) {
	gpiojs.close();
});

//SPRENDIMO BUDAS DEL UNEXPORT :
/* i output priimti tiktai custom variables, kuris paima pin ir su kodu sukuria nauja gpio 
   kiekviena programa uzsibaigia su tu custom variables uzdarymu arba automatiskai arba reikia paciam naudotojui ideti custom end blocka
   siusti visa sita dalyka tiesiai i serveri apdorojimui.
   
   padaryti laika kuris skirtas kiekviena komandai. pvz min 0.5sec tarp komandu
   */
   module.exports = router;
