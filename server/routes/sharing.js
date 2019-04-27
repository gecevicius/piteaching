var express = require('express');
var router = express.Router();
var ip = require('ip');
const storage = require('node-persist');
storage.init();
const bodyParser = require('body-parser');


router.post('/',async function(req, res, next) {
	const io = req.app.get('socketio');
	const workspace = await storage.getItem('workspace');
	if(workspace == undefined){
		await storage.setItem('workspace',req.body.workspace);
		console.log(req.body.workspace)
		var url = ip.address();
		res.sendStatus(200)
		io.emit("wsSharing",{url:url,msg:"Workspace shared!"});
	}
	else{
		io.emit("wsUpdated",{msg:"Workspace updated.",workspace:workspace});
		await storage.setItem('workspace',req.body.workspace);
		res.sendStatus(200)
	}

});

router.get('/',async function(req, res, next) {
	const io = req.app.get('socketio');
	const workspace = await storage.getItem('workspace');
	if(workspace != undefined){
		io.emit("wsConnection",{msg:"A person just connected to your workspace."});

		console.log(workspace)
		res.send(workspace)
	}else{
		res.send(false)
	}


});






module.exports = router;
