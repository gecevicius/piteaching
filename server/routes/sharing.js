var express = require('express');
var router = express.Router();
var ip = require('ip');
const storage = require('node-persist');
storage.init();
const bodyParser = require('body-parser');

router.post('/',async function(req, res, next) {
	if(req.connection.remoteAddress === "127.0.0.1"){
		await storage.setItem('enabled',req.body.enabled);
		await storage.setItem('workspace',req.body.workspace);
		const io = req.app.get('socketio');
		var url = ip.address();
		io.emit("wsSharing",{enabled:req.body.enabled,url:url});
		res.sendStatus(200)
	}
	else res.sendStatus(403)
});




module.exports = router;
