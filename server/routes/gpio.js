var express = require('express');
var router = express.Router();
const Gpio = require('onoff').Gpio; // Gpio class
var gpioArray = []

/* POST set GPIO value. */
router.post('/', function(req, res, next) {
	var pin = req.body.pin
	var output = req.body.output;
	
	if(!gpioPinsArray.includes(pin)){
		const gpio = new Gpio(pin, 'out'); 

		gpioArray.push({
			gpio:gpio,
			pin:pin
		})
	}
	else {
		gpio = gpioArray.filter(obj => {
  		return obj.pin === pin
	})

	}
	if (Gpio.accessible) {
		gpio.writeSync(output)
		res.send(pin+' LED with value ' + output);
	}
	else {
		res.send(pin+' pin GPIO not supported. please check pin numbers. App must be hosted on a RaspberryPi.');
 	 /*gpio = {
    writeSync: (value) => {
      res.send(pin+' LED with value ' + output);
    }
  };*/
}
});

/* DELETE close GPIO connections. */
router.delete('/', function(req, res, next) {
	gpioArray.forEach(function(i){
		i.unexport()
	})
	gpioArray = []
});

//SPRENDIMO BUDAS DEL UNEXPORT :
/* i output priimti tiktai custom variables, kuris paima pin ir su kodu sukuria nauja gpio 
   kiekviena programa uzsibaigia su tu custom variables uzdarymu arba automatiskai arba reikia paciam naudotojui ideti custom end blocka
   siusti visa sita dalyka tiesiai i serveri apdorojimui.
   
   padaryti laika kuris skirtas kiekviena komandai. pvz min 0.5sec tarp komandu
   */
   module.exports = router;
