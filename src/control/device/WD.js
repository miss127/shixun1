"use strict";
const mysqlModule = require('mysql');
var deasync = require('deasync');
var device = require('../aliyunwd');
module.exports = {
    //从思科模拟器接受
    getwd(req, resp) {
        const roomid = req.params['roomid'];
        const value = req.params['value'];
        const time = req.params['time'];
        device.device5.postProps(
            {
                CurrentTemperature: Number(value),
            }, (res) => {
                console.log(res);
            }
        )
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
        var sync1 = true;
        var sql = "INSERT INTO wd(temp,roomid,time) VALUES(?,?,?)";
        db.query(sql, [value, roomid, time]);
        resp.send({ succ: true });
        resp.end();
        db.end();
    },
    //发送到客户端
    sendwd(req, resp) {
        const roomid = req.params['roomid'];
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
            var sql = "SELECT * FROM wd WHERE roomid = ?";
            db.query(sql, [roomid], function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        l.push(
                            {
                                time: res.time,
                                temp: res.temp
                            }
                        )
                    }
                    sync1 = false;
                }
            })
            while (sync1) { deasync.sleep(400) };
        }
        search();
        // for (let c of l) {
        //     console.log('c = ' + c);
        // }
        resp.send(l);
        resp.end();
        db.end();
    }
}
