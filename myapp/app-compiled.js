//var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//

//
//var app = express();
//
//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//
//// uncomment after placing your favicon in /public
////app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'views')));
//app.use('/static',express.static(path.join(__dirname, 'public')));
//
//app.use('/', routes);
//app.use('/users', users);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktraces
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});
//
//
//module.exports = app;
//

var express = require('express');
var morgan = require('morgan');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//app.set('port'.process.env.PORT||3000);
var router = express.Router();
app.use(morgan());
/*静态路由*/
app.use(express.static('public'));
app.use('/static', express.static('dist'));
app.use('/js', express.static('dist'));

//app.get('/', function (req, res) {
//  res.status(200).send('欢迎来到汇智网学习！');
//});
app.get('/index', function (req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});
//app.get('/common.js',function(req,res){
//  res.sendFile('common.js',{root:__dirname});
//});
//io.on('connection',function(socket){
//  //连接成功...
//  socket.send('客户端接受!!');
//  socket.on('message',function(data){
//    //收到消息
//    console.log('服务端已接受信息!!');
//    console.log(data);
//  });
//
//});
io.on('connection', function (socket) {
  //socket.broadcast.to('chat').emit('DATA',"发送信息!!");
  socket.on('message', function (data) {
    socket.broadcast.emit('message', data);
  });
  socket.on('disconnect', function () {
    //用户已经离开...
    socket.send('用户已离开!!');
  });
  io.use(function (socket, next) {
    //console.log('中间件使用!!',socket.request);
    if (socket.request.headers.cookie) return next();
    next(new Error('Authentication error'));
  });
});

server.listen(3000);
/*后端路由*/
//router.get('/add', function (req, res) {
//  console.log(req,res);
//  res.send('Hello World!');
//  res.end("router /add\n");
//});
//router.get('/list', function (req, res, next) {
//  console.log(req,res);
//  console.log('Accessing the secret section ...');
//  res.end("router /list\n");
//});
//app.use('/websocket',router);

/*带参数的路由*/
//app.param('newId',function(req,res,next,newsId){
//  req.newsId=newsId;
//  next();
//});
//app.get("/news/:newId",function(req,res){
//  console.log(req.newsId);
//  res.end('newsId:'+req.newsId);
//});
app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
});
app.use(function (req, res, next) {
  console.log('每次请求都会执行该方法!!');
  //res.end('hello\n');
  //next();
});
//
//var server = app.listen(3000, function () {
//  var host = server.address().address;
//  var port = server.address().port;
//  console.log('Example app listening at http://%s:%s', host, port);
//});
module.exports = app;
module.exports = router;
//var routes = require('./routes/index');

//# sourceMappingURL=app-compiled.js.map