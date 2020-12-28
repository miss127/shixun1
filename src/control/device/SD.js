"use strict";
const mysqlModule = require('mysql');
var deasync = require('deasync');
var device = require('../aliyunsd');
module.exports = {
    //从思科模拟器接受
    getsd(req, resp) {
        const roomid = req.params['roomid'];
        const value = req.params['value'];
        const time = req.params['time'];
        device.device6.postProps(
            {
                CurrentHumidity: Number(value),
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
        var sql = "INSERT INTO sd(humd,roomid,time) VALUES(?,?,?)";
        db.query(sql, [value, roomid, time]);
        resp.send({ succ: true });
        resp.end();
        db.end();
    },
    //发送到客户端
    sendsd(req, resp) {
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
            var sql = "SELECT * FROM sd WHERE roomid = ?";
            db.query(sql, [roomid], function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        l.push(
                            {
                                time: res.time,
                                humd: res.humd
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
    }
}
