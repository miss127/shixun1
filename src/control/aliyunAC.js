const iot = require('alibabacloud-iot-device-sdk');
const mysqlModule = require('mysql');

var lightStatus4 = 0;

const device4 = iot.device({
    productKey: 'a1eHnc6wxpv', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'jAiAAPaAUxbSdpadnabF',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'b71e219b5998595b51202c5434fe7464',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//----------------------------------------device4-----------------------------------

device4.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device4.subscribe('/a1eHnc6wxpv/b71e219b5998595b51202c5434fe7464/user/get'); //subscribe表示从阿里云上接收信息
    device4.publish('/a1eHnc6wxpv/b71e219b5998595b51202c5434fe7464/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
//监听message事件
device4.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});
device4.postProps({ 'PowerSwitch': lightStatus4 });
device4.onProps((cmd) => {
    console.log('>>>onProps', cmd);
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') {
            console.log('set property', key);
            lightStatus4 = Number(cmd.params.LightStatus);
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
            let deviceName = 'AC';
            console.log(lightStatus4);
            if (lightStatus4 == 0) {
                deviceStatus = 'off';
            }
            var sql = "UPDATE devices SET deviceStatus = ? WHERE roomid = ? and deviceName = ?";
            db.query(sql, [deviceStatus, roomid, deviceName]);
            db.end();
            device4.postProps({ 'PowerSwitch': lightStatus4 });

        }
    }
})
//----------------------------------------device4-----------------------------------
module.exports = {
    device4: device4,
    getLight4Status: function () {
        return lightStatus4;
    },
    setLight4Status: function (status4) {
        lightStatus4 = status4;
    }
}