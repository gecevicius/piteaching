var express = require('express');
var router = express.Router();
var ip = require('ip');
const storage = require('node-persist');
storage.init();


router.post('/', async function(req, res, next) {
	if(req.connection.remoteAddress !== "127.0.0.1"){
		await storage.setItem('enabled',req.body.enabled);
		const io = req.app.get('socketio');
		var url = ip.address();
		io.emit("wsSharing",{enabled:req.body.enabled,url:''});
		res.sendStatus(200)
	}
	else res.sendStatus(403)
});




async function setUserWorkspace(workspace,username){

}


module.exports = router;
