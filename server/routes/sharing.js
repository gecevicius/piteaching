var express = require('express');
var router = express.Router();
var ip = require('ip');
const storage = require('node-persist');
storage.init();
const bodyParser = require('body-parser');


router.post('/',async function(req, res, next) {
const io = req.app.get('socketio');
	var enabled;
		if(req.body.enabled){
			await storage.setItem('enabled',req.body.enabled);
			await storage.setItem('workspace',req.body.workspace);
			console.log(req.body.workspace)
			enabled = req.body.enabled;
			var url = ip.address();
			io.emit("wsSharing",{enabled:req.body.enabled,url:url,msg:"Sharing enabled!"});
			res.sendStatus(200)
		}
		else{
			enabled = await storage.getItem('enabled');
			if(enabled == true){
				io.emit("wsUpdated",{msg:"Workspace updated."});
				await storage.setItem('workspace',req.body.workspace);
				res.sendStatus(200)
			}else{
				res.sendStatus(403)
			}
		}
		
});

router.get('/',async function(req, res, next) {
const io = req.app.get('socketio');
	var enabled;

			enabled = await storage.getItem('enabled');
			if(enabled == true){
				io.emit("wsUpdated",{msg:"Workspace updated."});
				const workspace = await storage.getItem('workspace');
					console.log(workspace)
				res.send(workspace)
			}else{
				res.sendStatus(403)
			}

		
});




module.exports = router;
