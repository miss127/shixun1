const iot = require('alibabacloud-iot-device-sdk');
const device5 = iot.device({
    productKey: 'a1eC6kX5YpJ', //将<productKey>修改为实际产品的ProductKey
    deviceName: '6WlG8sbWmnAsIRoBSJ8M',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '44e16a4240933b700e7b32cc656ee0d9',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//----------------------------------------device4-----------------------------------

device5.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device5.subscribe('/a1eC6kX5YpJ/6WlG8sbWmnAsIRoBSJ8M/user/get'); //subscribe表示从阿里云上接收信息
    device5.publish('/a1eC6kX5YpJ/6WlG8sbWmnAsIRoBSJ8M/user/update', 'hello world!'); //publish表示向阿里云发送消息
});

//监听message事件
device5.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});


//----------------------------------------device4-----------------------------------

module.exports = {
    device5: device5
};