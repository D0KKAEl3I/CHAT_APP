//서버용
const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const app = express();
const models = require('./models');
const sequelize = require('./models').sequelize;
sequelize.sync();

//채팅
const fs = require('fs')
var http = require('http').Server(app); 
var io = require('socket.io')(http);    



app.use('/static', express.static(__dirname+'/static'));

app.get('/',function(req, res){  //2
  fs.readFile('./static/js/chat.html', function(err, data) {
    if(err) {
      res.send('에러')
    } else {
      res.sendFile(__dirname + '/static/js/chat.html')
    }
  })
});

var count=1;
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  var name = "user" + count++;                 //3-1
  io.to(socket.id).emit('change name',name);   //3-1

  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});


const myKey = "geocashgeocash"

app.use(express.json());

app.post('/join', (req, res) => {
    const { password, ...body } = req.body;
    
    if (password.length < 8) {
        res.status(500).json({ error: "비밀번호는 최소 8자 이상입니다." })
    } else {
        const salt = uuidv4();
        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
            if (err) {
                res.status(500).json(err)
            } else {
                console.log(key.toString("hex"))
                models.User.create({ hash_password: key.toString("hex"), salt, ...body }).then((r) => {
                    res.json(r)
                }).catch(e => {
                    res.status(500).json(e);
                })
            }
        })
    }
})

app.post('/login', (req, res) => {
    models.User.findOne({ where: { username: req.body.username } }).then((r) => {
        if (r) {
            if (r.hash_password == crypto.pbkdf2Sync(req.body.password, r.salt, 10000, 64, 'sha512').toString('hex')) {
                const token = jwt.sign({ username: r.username, id: r.id, last_name: r.last_name, first_name: r.first_name }, myKey, {
                    algorithm: 'HS256'
                })
                res.json({ token: token })
            } else {
                res.status(401).json({ error: "비밀번호가 올바르지 않습니다" })
            }
        } else {
            res.status(404).json({ error: "사용자를 찾을 수 없습니다." })
        }
    })
})

app.post('/check', (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, myKey, (err, decoded) => {
        if (err) {
            res.json(false);
        } else {
            res.json(decoded)
        }
    })
});

app.post('/newroom', (req, res) => {
    const { roomname, password, ...body } = req.body;
    
    models.Room.create({roomname, password}).then((r) => {
        res.json("방이 생성됐습니다.");
    })
})

app.get('/cash', (req, res) => {
    const { lon, lat } = req.query;
    
    models.Cash.findAll({
        where: sequelize.where(sequelize.fn("ST_Distance_Sphere",
        sequelize.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`),
        sequelize.col("location")
        ), '<=', parseFloat(10))
    }).then(r => {
        res.json(r);
    }).catch(e => {
        console.log(e)
        res.status(500).json({ error: e });
    })
})

app.get('/my_cash', (req, res) => {
    const token = req.headers.authorization;
    
    jwt.verify(token, myKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: "권한 없음" })
        } else {
            models.Cash.findAll({
                where: { userId: decoded.id }, attributes: ["userId", [models.sequelize.fn("count", "*"), "count"]],
                group: "userId"
            }).then(r => {
                res.json(r);
            })
        }
    })
})

app.listen(3000, () =>{
    console.log("Start main server")
})

http.listen(3000, function(){ //4
  console.log('chating server on!');
});