//document.getElementById('main').innerHTML='你好世界!';
var css = require("../stylesheets/style.css");
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
if (React) {
    console.log(1);
}
if (ReactDOM) {
    console.log(2);
}

var id = window.location.search.substr(1);
console.log(id);
var socket = io.connect('/', { res: 'id=123' });
socket.on('connect', function () {
    //连接成功
    document.getElementById('main').innerHTML = '链接成功!!';
    console.log('链接成功');
});
$(document).on("click", function () {
    socket.send('你好!');
});

socket.on('connecting', function () {
    //连接成功
    console.log('正在链接.....');
});
socket.on('reconnecting', function () {
    //连接成功
    console.log('正在重连.....');
});
socket.on('reconnect', function () {
    //连接成功
    console.log('已重连.....');
});
socket.on('error', function () {
    //连接成功
    console.log('链接错误.....');
});
socket.on('message', function (data) {
    console.log('客户端已接受信息!!');
    console.log(data);
});
socket.on('disconnect', function (data) {
    //连接断开
});

//# sourceMappingURL=main-compiled.js.map