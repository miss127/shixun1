"use strict";
const mysqlModule = require('mysql');
var deasync = require('deasync');
const device = require('../aliyunLED1');
const device2 = require('../aliyunLED2');
const device3 = require('../aliyunLED3');
const device4 = require('../aliyunAC');
module.exports = {
    //更新设备状态
    changestatus(req, resp) {
        var roomid = req.body.roomid;
        var deviceName = req.body.deviceName;
        var deviceStatus = req.body.deviceStatus;
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
        var sql = "UPDATE devices SET deviceStatus = ? WHERE roomid = ? and deviceName = ?";
        db.query(sql, [deviceStatus, roomid, deviceName]);
        resp.send({ succ: true });
        resp.end();
        db.end();
    },
    //获取设备状态
    getroomstatus(req, resp) {
        var roomid = req.params['roomid'];
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
        let l = [];
        function search() {
            var sync1 = true;
            var sql = "SELECT * FROM devices WHERE roomid = ?";
            db.query(sql, [roomid], function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        l.push(
                            {
                                deviceName: res.deviceName,
                                deviceStatus: res.deviceStatus
                            }
                        )
                    }
                    sync1 = false;
                }
            })
            while (sync1) { deasync.sleep(400) };
        }
        search();
        resp.send(l);
        resp.end();
        db.end();
    },
    sendStatus(req, resp) {
        const roomid = req.params['roomid'];
        const deviceName = req.params['deviceName'];
        let deviceStatus = "on";
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "kyt"
        });
        function search() {
            var sync1 = true;
            var sql = "SELECT * FROM devices WHERE roomid = ? and deviceName = ?";
            db.query(sql, [roomid, deviceName], function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        deviceStatus = res.deviceStatus;
                    }
                    sync1 = false;
                }
            })
            while (sync1) { deasync.sleep(400) };
        }
        search();
        const obj = {
            success: true,
            status: deviceStatus
        }
        var sled = 0;
        if (deviceStatus == 'on') {
            sled = 1;
        }
        if (deviceName == 'light1') {
            device.device.postProps({
                LightStatus: Number(sled)
            }, (res) => {
                console.log(res);
            });
            device.getLight1Status();
            device.setLight1Status(sled);
        }
        else if (deviceName == 'light2') {
            device2.device2.postProps({
                LightStatus: Number(sled)
            }, (res) => {
                console.log(res);
            });
            device2.getLight2Status();
            device2.setLight2Status(sled);
        }
        else if (deviceName == 'light3') {
            device3.device3.postProps({
                LightStatus: Number(sled)
            }, (res) => {
                console.log(res);
            });
            device3.getLight3Status();
            device3.setLight3Status(sled);
        }
        else if (deviceName == 'AC') {
            device4.device4.postProps({
                PowerSwitch: Number(sled)
            }, (res) => {
                console.log(res);
            });
            device4.getLight4Status();
            device4.setLight4Status(sled);
        }
        resp.write(JSON.stringify(obj));
        resp.end();
    }
}