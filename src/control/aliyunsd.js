const iot = require('alibabacloud-iot-device-sdk');

const device6 = iot.device({
    productKey: 'a1IzijjaDar', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'mA5lbBwcMwRjhaxsMEAR',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'dc1b241018ec2ecbc9fd3f210b6e8ab8',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//----------------------------------------device6-----------------------------------

device6.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device6.subscribe('/a1IzijjaDar/mA5lbBwcMwRjhaxsMEAR/user/get'); //subscribe表示从阿里云上接收信息
    device6.publish('/a1IzijjaDar/mA5lbBwcMwRjhaxsMEAR/user/update', 'hello world!'); //publish表示向阿里云发送消息
});

//监听message事件
device6.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

//----------------------------------------device6-----------------------------------

module.exports = {
    device6: device6,
}