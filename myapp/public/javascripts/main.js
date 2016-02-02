//document.getElementById('main').innerHTML='你好世界!';
var css=require("../stylesheets/style.css");
var own_ui=require("../stylesheets/own-ui.min.css");
//var ContentMode=require("./dom.js");
var $=require('jquery');
var React=require('react');
var ReactDOM=require('react-dom');
var ui=require("./ui.js");
var $control=require("./jquery-control.js");
if(React){
 console.log(1);
}
if(ReactDOM){
    console.log(2)
}
var id=window.location.search.substr(1);
console.log(id);
var socket = io.connect('/',{res:'id=123'});
socket.on('connecting',function(){
    //正在连接...
    console.log('正在链接.....');
});
socket.on('reconnecting',function(){
    //正在重连
    console.log('正在重连.....');
});
socket.on('reconnect',function(){
    //已重连成功
    console.log('已重连成功!!');
});
socket.on('error',function(){
    //连接错误
    console.log('链接发生未知错误!!');
});
//socket.on('disconnect',function(data){
//    //连接断开
//    alert("客户端已断开!!");
//    socket.send('客户端已断开!!');
//});
//socket.on('DisconnectReq', function() { socket.disconnect(); });
