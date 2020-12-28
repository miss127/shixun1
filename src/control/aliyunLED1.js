const iot = require('alibabacloud-iot-device-sdk');
const mysqlModule = require('mysql');

// 云服务器想要确定的设备状态 
var lightStatus1 = 0;
//创建iot.device对象将会发起到阿里云IoT的连接
const device = iot.device({
    productKey: 'a13BBpfgg8z', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'Cb4tc3pjDMCVA5nAhtcQ',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'f606bdb2271a3db8416d965a3f2cb8e9',//将<deviceSecret>修改为实际设备的DeviceSecret
});
//----------------------------------------device1-----------------------------------
//监听connect事件
device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a13BBpfgg8z/Cb4tc3pjDMCVA5nAhtcQ/user/get'); //subscribe表示从阿里云上接收信息
    device.publish('/a13BBpfgg8z/Cb4tc3pjDMCVA5nAhtcQ/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});
device.postProps({ 'LightStatus': lightStatus1 });
device.onProps((cmd) => {
    console.log('>>>onProps', cmd);
    for (var key in cmd.params) {
        if (key == 'LightStatus') {
            console.log('set property', key);
            lightStatus1 = Number(cmd.params.LightStatus);
            let db = mysqlModule.createConnection({
                host: "localhost",
                port: "3306",
                user: "root",
                password: "123456",
                database: "kyt"
            });
            //2.打开数据库   
            db.connect();
            //3.数据库操作
            let deviceStatus = 'on';
            let roomid = 509;
            let deviceName = 'light1';
            if (lightStatus1 == 0) {
                deviceStatus = 'off';
            }
            var sql = "UPDATE devices SET deviceStatus = ? WHERE roomid = ? and deviceName = ?";
            db.query(sql, [deviceStatus, roomid, deviceName]);
            db.end();
            device.postProps({ 'LightStatus': lightStatus1 });
        }
    }
})



//----------------------------------------device1-----------------------------------
module.exports = {
    device: device,
    getLight1Status: function () {
        return lightStatus1;
    },
    setLight1Status: function (status1) {
        lightStatus1 = status1;
    },
};