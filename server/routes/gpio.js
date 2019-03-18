var express = require('express');
var router = express.Router();
const Gpio = require('../onoff').Gpio; // Gpio class

/* GET users listing. */
router.get('/set-output', function(req, res, next) {
  
const led = new Gpio(4, 'out');       // Export GPIO17 as an output
 
// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 200);
 
// Stop blinking the LED after 5 seconds
setTimeout(_ => {
  clearInterval(iv); // Stop blinking
  led.unexport();    // Unexport GPIO and free resources
}, 5000);


  res.send('GOTCHA');
});



module.exports = router;
