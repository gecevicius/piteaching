var express = require('express');
var router = express.Router();
var ip = require('ip');
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
	var url = ip.address() + "/workspace?id="+ req.body.workspace.id
	io.emit("wsenable",{enabled:true,username:username,url:url});
	res.sendStatus(200)
});

router.get('/', async function(req, res, next) {	
	var connectionUsername = req.query.username;
	var id = req.query.id;
	const ws = await storage.getItem('worksapce');
	const username = await storage.getItem('username');
	if(id == ws.id && connectionUsername){
		res.send({
			worksapce:ws,
			username:username
		})
		io.emit("wsConnection",{username:connectionUsername});
		res.sendStatus(200)
	}
	else res.send("User does not exist or sharing is disabled.")
	
});



async function setUserWorkspace(workspace,username){

}


module.exports = router;
