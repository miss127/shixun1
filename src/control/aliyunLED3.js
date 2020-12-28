const iot = require('alibabacloud-iot-device-sdk');
const mysqlModule = require('mysql');

var lightStatus3 = 0;
const device3 = iot.device({
    productKey: 'a1TWFfGbhvb', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'UI9jxCrW0TozLElWI9FM',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '7ac0e122904213f0b66d80cf4883e37e',//将<deviceSecret>修改为实际设备的DeviceSecret
});
//----------------------------------------device3-----------------------------------

device3.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device3.subscribe('/a1TWFfGbhvb/UI9jxCrW0TozLElWI9FM/user/get'); //subscribe表示从阿里云上接收信息
    device3.publish('/a1TWFfGbhvb/UI9jxCrW0TozLElWI9FM/user/update', 'hello world!'); //publish表示向阿里云发送消息
});

//监听message事件
device3.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

device3.postProps({ 'LightStatus': lightStatus3 });
device3.onProps((cmd) => {
    console.log('>>>onProps', cmd);
    for (var key in cmd.params) {
        if (key == 'LightStatus') {
            console.log('set property', key);
            lightStatus3 = Number(cmd.params.LightStatus);
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
            let deviceName = 'light3';
            if (lightStatus3 == 0) {
                deviceStatus = 'off';
            }
            var sql = "UPDATE devices SET deviceStatus = ? WHERE roomid = ? and deviceName = ?";
            db.query(sql, [deviceStatus, roomid, deviceName]);
            db.end();
            device3.postProps({ 'LightStatus': lightStatus3 });

        }
    }
})
//----------------------------------------device3-----------------------------------

module.exports = {
    device3: device3,
    getLight3Status: function () {
        return lightStatus3;
    },
    setLight3Status: function (status3) {
        lightStatus3 = status3;
    },
}