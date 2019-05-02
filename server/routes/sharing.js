var express = require('express');
var router = express.Router();
var ip = require('ip');
const storage = require('node-persist');
storage.init();
const bodyParser = require('body-parser');


//post route. check if workspace is already tracked on server, if not, initiate a new item to store
router.post('/',async function(req, res, next) {
	const io = req.app.get('socketio');
	var url = ip.address();
	var workspace = req.body.workspace
	await storage.setItem('workspace',workspace).then(response =>{
		io.emit("wsUpdated",{msg:"Workspace updated.",workspace:workspace,url:url});
	}).catch(error =>{
		io.emit('printMessage',{type:'ERROR ',message:"Error updating workspace. Let your supervisor know! " + error.message});
	});
	res.sendStatus(200)
});

router.get('/',async function(req, res, next) {
	const io = req.app.get('socketio');
	const workspace = await storage.getItem('workspace');
	var url = "http://" + ip.address();
	io.emit("wsConnection",{msg:"A person just connected to your workspace.",url:url});
	if(workspace != undefined){
		res.send(workspace)
	}else{
		res.send(false)
	}


});

router.delete('/',async function(req, res, next) {
	const io = req.app.get('socketio');
	const workspace = await storage.setItem('workspace',undefined);
	io.emit("wsUpdated",{msg:"Workspace cleared",workspace:""});
	res.send(workspace)

});






module.exports = router;
