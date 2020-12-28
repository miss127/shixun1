const iot = require('alibabacloud-iot-device-sdk');
const mysqlModule = require('mysql');

var lightStatus2 = 0;
const device2 = iot.device({
    productKey: 'a1jL36pA6hr', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'nnq2JnE8WSkGl5MD9H8i',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'a394ff6ed3a663a286ab04c5c55470cb',//将<deviceSecret>修改为实际设备的DeviceSecret
});
//----------------------------------------device2-----------------------------------


device2.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device2.subscribe('/a1jL36pA6hr/nnq2JnE8WSkGl5MD9H8i/user/get'); //subscribe表示从阿里云上接收信息
    device2.publish('/a1jL36pA6hr/nnq2JnE8WSkGl5MD9H8i/user/update', 'hello world!'); //publish表示向阿里云发送消息
});

//监听message事件
device2.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

device2.postProps({ 'LightStatus': lightStatus2 });
device2.onProps((cmd) => {
    console.log('>>>onProps', cmd);
    for (var key in cmd.params) {
        if (key == 'LightStatus') {
            console.log('set property', key);
            lightStatus2 = Number(cmd.params.LightStatus);
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
            let deviceName = 'light2';
            if (lightStatus2 == 0) {
                deviceStatus = 'off';
            }
            var sql = "UPDATE devices SET deviceStatus = ? WHERE roomid = ? and deviceName = ?";
            db.query(sql, [deviceStatus, roomid, deviceName]);
            db.end();
            device2.postProps({ 'LightStatus': lightStatus2 });

        }
    }
})
//----------------------------------------device2-----------------------------------
module.exports = {
    device2: device2,
    getLight2Status: function () {
        return lightStatus2;
    },
    setLight2Status: function (status2) {
        lightStatus2 = status2;
    }
}