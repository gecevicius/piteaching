var express = require('express');
var router = express.Router();

const storage = require('node-persist');
storage.init();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/', async function(req, res, next) {
  	
	await storage.setItem('username',req.body.username);
  	await storage.setItem('workspace',req.body.workspace);
  	const username = await storage.getItem('username');
  	const io = req.app.get('socketio');

  	io.emit("wsenable",{enabled:true,username:username});
	res.sendStatus(200)
});

router.get('/', async function(req, res, next) {
  
	await storage.setItem('username',req.body.username);
  	await storage.setItem('workspace',req.body.workspace);
  	const username = await storage.getItem('username');

	res.sendStatus(200)
});



async function setUserWorkspace(workspace,username){

}


module.exports = router;
