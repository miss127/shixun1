"use strict";
const mysqlModule = require('mysql');
var deasync = require('deasync');
const USER = [
    { id: '00001', userName: 'admin', password: '123456' }
]
module.exports = {
    //用户登录
    login(req, resp) {
        const userName = req.body.userName;
        const password = req.body.password;
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "kyt"
        });
        console.log(req.body);
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        db.query("SELECT * FROM users WHERE userName = ? AND password = ?", [userName, password], function (err, data) {
            if (err) {
                console.log(err);
            }
            if (data.length == 0) {
                resp.send({ succ: false });
                console.log('查不到');
            }
            if (data.length > 0) {
                // console.log('--------------------------');
                // console.log('--------------------------');
                resp.send({ succ: true, msg: data });
                resp.end();
            }
        });
        db.end();
    },
    //用户注册
    register(req, resp) {
        const userName = req.body.userName;
        const password = req.body.password;
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "kyt"
        });
        console.log(req.body);
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        var flag = 0;
        function set() {
            let sync1 = true;
            let f = 0;
            db.query("SELECT * FROM users WHERE userName = ?", [userName], function (err, data) {
                console.log('hello');
                if (err) {
                    console.log(err);
                    console.log('--------------------------');
                }
                if (data.length == 0) {
                    f = 1;
                }
                if (data.length > 0) {
                    console.log('--------------------------');
                    resp.send({ succ: false });
                    console.log('用户名已存在');
                }
                sync1 = false;
            });
            while (sync1) { deasync.sleep(400); }
            return f;
        };
        flag = set();
        if (flag == 1) {
            let cntid = 10001;
            let sync1 = true;
            function set1() {
                let sql = "SELECT * FROM users WHERE LEFT(id,1)<>'0' ";
                db.query(sql, function (err1, data1) {
                    cntid += data1.length;
                    sync1 = false;
                })
                while (sync1) { deasync.sleep(400); }
            }
            set1();

            let sql = "INSERT INTO users(id,userName,password) VALUES(?,?,?)";
            db.query(sql, [cntid, userName, password], function (err, data) {

            })
            resp.send({ succ: true });
        }
        resp.end();
        db.end();
    },
    //查找全部用户
    searchAll(req, resp) {
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "kyt"
        });
        console.log(req.body);
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        let l = [];
        function search() {
            var sync1 = true;
            var sql = "SELECT * FROM users";
            db.query(sql, function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        l.push(
                            {
                                id: res.id,
                                userName: res.userName,
                                password: res.password
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
    //更新用户信息
    updata(req, resp) {
        var id = req.body.id;
        var userName = req.body.userName;
        var password = req.body.password;
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
        var sql = "UPDATE users SET  userName= ?, password = ? WHERE id = ?";
        db.query(sql, [userName, password, id]);
        resp.send({ succ: true });
        resp.end();
        db.end();
    },
    //添加用户
    add(req, resp) {
        const id = req.body.id;
        const userName = req.body.userName;
        const password = req.body.password;
        //mysql操作
        //1.创建数据库链接
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "kyt"
        });
        console.log(req.body);
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        var flag = 0;
        function set() {
            let sync1 = true;
            let f = 0;
            db.query("SELECT * FROM users WHERE userName = ?", [userName], function (err, data) {
                console.log('hello');
                if (err) {
                    console.log(err);
                    console.log('--------------------------');
                }
                if (data.length == 0) {
                    f = 1;
                }
                if (data.length > 0) {
                    console.log('--------------------------');
                    resp.send({ succ: false });
                    console.log('用户名已存在');
                }
                sync1 = false;
            });
            while (sync1) { deasync.sleep(400); }
            return f;
        };
        flag = set();
        if (flag == 1) {
            // let cntid = 10001;
            // let sync1 = true;
            // function set1() {
            //     let sql = "SELECT * FROM users WHERE LEFT(id,1)<>'0' ";
            //     db.query(sql, function (err1, data1) {
            //         cntid += data1.length;
            //         sync1 = false;
            //     })
            //     while (sync1) { deasync.sleep(400); }
            // }
            // set1();

            let sql = "INSERT INTO users(id,userName,password) VALUES(?,?,?)";
            db.query(sql, [id, userName, password], function (err, data) {

            })
            resp.send({ succ: true });
        }
        resp.end();
        db.end();
    },
    //删除用户
    delete(req, resp) {
        var id = req.params['id'];
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
        var sql = "delete from users where id = ?";
        db.query(sql, [id]);
        resp.send({ succ: true });
        resp.end();
        db.end();
    },
    //查询指定用户
    searchid(req, resp) {
        var id = req.params['id'];
        let db = mysqlModule.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "123456",
            database: "kyt"
        });
        console.log(req.body);
        //2.打开数据库   
        db.connect();
        //3.数据库操作
        let l = [];
        function search() {
            var sync1 = true;
            var sql = "SELECT * FROM users where id= ? ";
            db.query(sql, [id], function (err, data) {
                if (data.length > 0) {
                    for (let c of data) {
                        let res = JSON.parse(JSON.stringify(c));
                        l.push(
                            {
                                id: res.id,
                                userName: res.userName,
                                password: res.password
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