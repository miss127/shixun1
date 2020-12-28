"use strict";
const mysqlModule = require('mysql');
var deasync = require('deasync');
const USER = [
    { id: '00001', userName: 'admin', password: '123456' }
]
module.exports = {
    //查询未预约房间
    searchnot(req, resp) {
        var l = [];
        var aa = [];
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
        function search() {
            var sync1 = true;
            var sql = "SELECT * FROM rooms WHERE status=0";
            db.query(sql, function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        l.push(res.roomid);
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
    searchhas(req, resp) {
        var l = [];
        var aa = [];
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
        function search() {
            var sync1 = true;
            var sql = "SELECT * FROM rooms WHERE status = 1";
            db.query(sql, function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        l.push(
                            {
                                roomid: res.roomid,
                                starttime: res.starttime,
                                user: res.user
                            }
                        );
                    }
                    sync1 = false;
                }
            })
            while (sync1) { deasync.sleep(400) };
        }
        search();
        console.log("hello-----------------------------------------------------------------------");
        console.log(l);
        console.log("hello-----------------------------------------------------------------------");
        resp.send(l);
        resp.end();
        db.end();
    },
    yystatus(req, resp) {
        console.log("hello");
        var roomid = req.body.roomid;
        var starttime = req.body.starttime;
        var user = req.body.user;
        console.log(roomid + "  " + starttime);
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
        var sql = "UPDATE rooms SET status = ?,user = ?,starttime = ?  WHERE roomid = ?";
        db.query(sql, [1, user, starttime, roomid])
        resp.send({ succ: true });
        resp.end();
        db.end();
    },
    cancelyystatus(req, resp) {
        console.log("hello");
        var roomid = req.body.roomid;
        var starttime = req.body.starttime;
        var user = req.body.user;
        console.log(roomid + "  " + starttime + " " + user);
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "kyt"
        });
        //2.打开数据库   
        db.connect();
        let f = 0;
        function search() {
            var sync1 = true;
            var sql = "SELECT * FROM rooms WHERE roomid = ?";
            db.query(sql, [roomid], function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        if (res.user == user) {
                            console.log('true');
                            f = 1;
                        }
                        else {
                            console.log('false');
                            f = 0;
                        }
                    }
                    sync1 = false;
                }
            })
            while (sync1) { deasync.sleep(400) };
        }
        search();
        if (f == 1) {
            //3.数据库操作
            var sql = "UPDATE rooms SET status = ?,user = ?,starttime = ?  WHERE roomid = ?";
            db.query(sql, [0, null, starttime, roomid]);
            resp.send({ succ: true });
        }
        else {
            resp.send({ succ: false });
        }
        resp.end();
        db.end();
    }
}