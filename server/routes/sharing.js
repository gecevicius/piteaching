var express = require('express');
var router = express.Router();
var ip = require('ip');
const storage = require('node-persist');
storage.init();
const bodyParser = require('body-parser');

router.post('/',async function(req, res, next) {
	var enabled;
		if(req.body.enabled){
			await storage.setItem('enabled',req.body.enabled);
			enabled = req.body.enabled;
			io.emit("wsSharing",{enabled:req.body.enabled,url:url,msg:"Sharing enabled!"});
		}
		else{
			
			io.emit("wsUpdated",{msg:"Workspace updated."});
		}
		await storage.setItem('workspace',req.body.workspace);
		const io = req.app.get('socketio');
		var url = ip.address();
		
		res.sendStatus(200)
});




module.exports = router;
