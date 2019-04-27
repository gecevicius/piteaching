var express = require('express');
var router = express.Router();

const storage = require('node-persist');
await storage.init( /* options ... */ );

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  	await storage.setItem('username',req.body.username);
  	await storage.setItem('workspace',req.body.workspace);



	console.log(await storage.getItem('username'));
	
	res.sendStatus(200)
});



module.exports = router;
