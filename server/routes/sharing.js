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
			enabled = req.body.enabled;
			var url = ip.address();
			io.emit("wsSharing",{enabled:req.body.enabled,url:url,msg:"Sharing enabled!"});
		}
		else{

			io.emit("wsUpdated",{msg:"Workspace updated."});
		}
		await storage.setItem('workspace',req.body.workspace);
		
		
		
		res.sendStatus(200)
});




module.exports = router;
