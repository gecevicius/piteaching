var express = require('express');
var router = express.Router();
import find from 'local-devices'

/* GET home page. */
router.get('/users', function(req, res, next) {
	find().then(devices => {
  		res.send(devices); 
	})
   	
});
	

module.exports = router;
