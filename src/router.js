const express = require("express");
const bodyParser = require("body-parser");
const usercontrol = require('./control/usercontrol/user')
const roomcontrol = require('./control/roomcontrol/roomcontrol');
const deviceledcontrol = require('./control/device/led');
const devicewdconstrol = require('./control/device/WD');
const devicesdconstrol = require('./control/device/SD');
const router = express.Router();
router.use(bodyParser.json()); //将数据转换成json
router.use(bodyParser.urlencoded({ extended: false })); //配置post的body模块

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});
//用户注册
router.post('/users', usercontrol.login);
//// 用户登录
// router.get('/users', usercontrol.login);
//管理所有用户查询
router.get('/musers', usercontrol.searchAll);
//管理某个用户查询
router.get('/musers/:id', usercontrol.searchid);
//管理用户修改
router.put('/muser', usercontrol.updata);
//管理用户添加
router.post('/muser', usercontrol.add);
//管理用户删除
router.delete('/muser/:id', usercontrol.delete);
//用户注册
router.put('/userregister', usercontrol.register);
//未预约房间的查询
router.get('/room/notused', roomcontrol.searchnot);
//修改房间是否预约的状态
router.put('/room/notused', roomcontrol.yystatus);
//已预约房间的查询
router.get('/room/hasused', roomcontrol.searchhas);
//取消预约房间
router.put('/room/hasused', roomcontrol.cancelyystatus);
//修改灯设备的状态
router.put('/device/led', deviceledcontrol.changestatus);
//获得房间所有设备的初始状态
router.get('/device/:roomid', deviceledcontrol.getroomstatus);
//获得某一房间的温度
router.get('/wd/:roomid', devicewdconstrol.sendwd);
//获得某一房间的湿度
router.get('/sd/:roomid', devicesdconstrol.sendsd);
//把设备状态写入数据库中
router.put('/:roomid/:deviceName', deviceledcontrol.sendStatus)
//把温度写入数据库中
router.put('/wd/:roomid/:value/:time', devicewdconstrol.getwd);
//把湿度写入数据库中
router.put('/sd/:roomid/:value/:time', devicesdconstrol.getsd);
module.exports = router;