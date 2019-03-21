var express = require('express');
var router = express.Router();
const gpioFunctions = require("./js/gpioFunctions.js")
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
	var pin = req.body.pin
	var val = gpiojs.readVal(pin)
	if (val) {
		res.send({
			"pin":pin,
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

//SPRENDIMO BUDAS DEL UNEXPORT :
/* i output priimti tiktai custom variables, kuris paima pin ir su kodu sukuria nauja gpio 
   kiekviena programa uzsibaigia su tu custom variables uzdarymu arba automatiskai arba reikia paciam naudotojui ideti custom end blocka
   siusti visa sita dalyka tiesiai i serveri apdorojimui.
   
   padaryti laika kuris skirtas kiekviena komandai. pvz min 0.5sec tarp komandu
   */
   module.exports = router;
