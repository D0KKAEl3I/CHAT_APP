//기본
const fs = require('fs')
const express = require('express');
const app = express();
//챗
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1
//계정
var bodyParser = require('body-parser');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const models = require('./models');
const sequelize = require('./models').sequelize;
sequelize.sync();
//세션유지
const session = require('express-session');
const sharedsession = require('express-socket.io-session');
// const FileStore = require('session-file-store')(session);

const sessionForSharing = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
  // store: new FileStore()
});


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/static', express.static(__dirname+'/static'));
app.use(sessionForSharing);

io.use(sharedsession(sessionForSharing, { autoSave: true}));

// const myKey = "geocashgeocash"

//사이트 접속
app.get('/',function(req, res){ 
  if(req.session.logined){
    //파일 찾기, 없으면 에러 출력, 있으면 설정한 페이지 전송
    fs.readFile('./static/js/chat.html', function(err, data) {
      if(err) {
        res.send('에러')
      } else {
        res.sendFile(__dirname + '/static/js/chat.html')
      }
    })
  } else {
    res.redirect('/first_time')
  }
});

app.get('/first_time', function(req, res){
  fs.readFile('./static/js/mainpage.html', function(err, data) {
    if(err) {
      res.send('에러')
    } else {
      res.sendFile(__dirname + '/static/js/mainpage.html')
    }
  })
})

//위와 마찬가지로 로그인 주소 접속
app.get('/login',function(req, res){  //2
  fs.readFile('./static/js/login.html', function(err, data) {
    if(err) {
      res.send('에러')
    } else {
      res.sendFile(__dirname + '/static/js/login.html')
    }
  })
});

//회원가입 주소 접속
app.get('/signup',function(req, res){  //2
  fs.readFile('./static/js/signup.html', function(err, data) {
    if(err) {
      res.send('에러')
    } else {
      res.sendFile(__dirname + '/static/js/signup.html')
    }
  })
});

//튜토리얼 주소 접속
app.get('/tuto',function(req, res){  //2
  fs.readFile('./static/js/tutorial.html', function(err, data) {
    if(err) {
      res.send('에러')
    } else {
      res.sendFile(__dirname + '/static/js/tutorial.html')
    }
  })
});

//챗관련 파트
io.on('connection', function(socket){ //3

  console.log('user connected: ', socket.id);  //3-1
  var name = socket.handshake.session.username//3-1
  io.to(socket.id).emit('change name',name);   //3-1

  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text){ //3-3
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    if(text != null){
      var msg = name + ' : ' + text;
      console.log(msg);
      io.emit('receive message', msg);
    }
  });
});

//회원가입
app.post('/signup', (req, res) => {
  const { password, ...body } = req.body;
  
  if (password.length < 8) {
      res.status(500).json({ error: "비밀번호는 최소 8자 이상이어야 합니다." })
  } else {
      const salt = uuidv4();
      crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
          if (err) {
            res.status(500).json(err)
          } else {
              console.log(key.toString("hex"))
              models.User.create({ hash_password: key.toString("hex"), salt, ...body }).then((r) => {
                // alert("회원가입이 정상적으로 처리되었습니다.");
                res.redirect('/login')
              }).catch(e => {
                  res.status(500).json(e);
              })
          }
      })
  }
})

const myKey = "geocashgeocash"
//포스트 방식으로 login 요청시
app.post('/login', (req, res) => {
  
  //데이터베이스에서 요청의 바디 내용속 username 의 값과 같은걸 데이터베이스의 username 테이블에서 찾음
  models.User.findOne({ where: { username: req.body.username } }).then((r) => {
    
    //있을경우  
    if (r) {
      // 조회된 username이 가진 암호화된 비밀번호가 당시와 같은 방법으로 암호화를 돌릴시 일치하는지 판정
          if (r.hash_password == crypto.pbkdf2Sync(req.body.password, r.salt, 10000, 64, 'sha512').toString('hex')) { 
            //비밀번호 맞으면
            req.session.logined = true;
            req.session.username = req.body.username;
            res.redirect('/');
          } else {
              //비밀번호 틀릴시
              res.status(401).json({ error: "비밀번호가 올바르지 않습니다" })
          }
      } else {
        //아이디가 틀릴시
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


// app.listen(3000, () =>{
//   console.log("Start main server")
// })
//챗 서버
http.listen(3000, function(){ //4
  console.log('chating server on!');
});