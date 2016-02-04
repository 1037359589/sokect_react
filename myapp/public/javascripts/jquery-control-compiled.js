/**
 * Created by bll on 16/2/2.
 */
var $ = require('jquery');
var socket = io.connect('/', { res: 'id=123' });
(function (jQuery, win, doc) {
    //"use strict";
    var okRequest = ['id', 'name'],
        //符合的参数
    searchRequest,
        //请求参数字符串
    $$,
        //node节点
    chatLocal,
        //本地存贮
    idAll = [],
        //所有Id
    existId = ['2'];
    $$ = {
        send: $("#send"),
        main: $("#main > .body"),
        messageText: $("#message-text"),
        gotClone: $('#got-clone'),
        sentClone: $('#sent-clone'),
        messageBody: $(".message>.body"),
        empty: $("#empty"),
        addPerson: $("#add-person"),
        personModal: $("#person-modal"),
        cancel: $(".cancel")
    };
    //聊天框,初始化
    function init() {
        chatLocal = localStorage.getItem('chat');
        var search = window.location.search;
        searchRequest = getUrlRequest(search.substr(1));
        var getId = getUserId();
        if (!searchRequest || !isSetId()) {
            alert('id不存在或者参数不正确!!');
            $('body').html("");
            return false;
        }
        showAllMessage();
        //getExistId();
    }
    //function getExistId(){
    //
    //
    //}
    //function setExistId(){
    //
    //    localStorage.setItem('id',);
    //
    //}
    //显示聊天的所有信息
    function getAllMessage() {
        var messageData = chatLocal.split(";");
        var messageArr = [];
        messageData.forEach(function (v, k) {
            var json = new Function("return " + v)();
            messageArr.push(json);
        });
        return messageArr;
    }
    function showAllMessage() {
        var message = getAllMessage();
        var currentId = getUserId();
        var html = "";
        message.forEach(function (v, k) {
            var htm;
            if (v == undefined) return;
            if (v.id == currentId) {
                var sentClone = $$.sentClone.clone().removeClass("none");
                sentClone.find(".text").text(v.text);
                htm = sentClone.prop("outerHTML");
            } else {
                var gotClone = $$.gotClone.clone().removeClass("none");
                gotClone.find(".text").text(v.text);
                gotClone.html();
                htm = gotClone.prop("outerHTML");
            }
            html += htm;
        });
        $$.messageBody.append(html);
    }
    //判断是否存在该id
    function isSetId() {
        var chatArr = chatLocal.split(";");
        var pass = false;
        var isStr = '\"id\"' + ':\"' + getUserId() + '\"';
        chatArr.forEach(function (v, k) {
            if (v.indexOf(isStr) > -1) {
                pass = true;
            }
        });
        return pass;
    }
    //获取用户的id
    function getUserId() {
        var getId;
        for (var k in searchRequest) {
            if (searchRequest[k].indexOf('id') > -1) {
                getId = searchRequest[k];
                break;
            }
        }
        return getId.split("=")[1];
    }
    //更新localstorage
    function updateLocalChat(id, text, time) {
        chatLocal = localStorage.getItem('chat');
        var chat = { id: id, text: text, time: time };
        var chatStr = JSON.stringify(chat);
        var getLocal = chatLocal == null ? "" : chatLocal;
        chatStr = getLocal + chatStr + ";";
        localStorage.setItem('chat', chatStr);
    }
    //时间转化为时间戳
    function timeToString(obj) {
        var year = obj.getFullYear(),
            //当前年份
        month = obj.getMonth() + 1,
            //当前月份
        day = obj.getDate(),
            //当前日
        hour = obj.getHours(),
            //获取当前小时数(0-23)
        min = obj.getMinutes(),
            //获取当前分钟数(0-59)
        sec = obj.getSeconds(); //获取当前秒数(0-59)
        return {
            year: year, month: month, day: day, hour: hour, minute: min, second: sec
        };
    }
    //获取合法参数
    function getUrlRequest(search) {
        var splitStr = search.indexOf('&') > -1 ? '&' : " ";
        var sea = search.split(splitStr);
        var pass = true;
        for (var k in sea) {
            var da = sea[k].split("=");
            pass = filterRequest(da[0]);
            if (!pass) break;
        }
        if (!pass) {
            alert('参数不对');$('body').html("");return false;
        }
        return sea;
    }
    //过滤参数
    function filterRequest(ke) {
        var pass;
        pass = $.inArray(ke, okRequest);
        if (pass == -1) {
            return false;
        } else {
            return true;
        }
    }
    //getUser();
    socket.on('connect', function () {
        init();
        $$.send.on("click", function (e) {
            var text = $$.messageText.text();
            var getId;
            if (text == "") return false;
            var sentClone = $$.sentClone.clone().removeClass("none");
            sentClone.find(".text").text(text);
            //发送信息
            $$.messageBody.append(sentClone);
            $$.messageText.text("");
            socket.send(text);
            var myDate = new Date();
            var timeObj = timeToString(myDate);
            var time = timeObj.year + "-" + timeObj.month + "-" + timeObj.day + " " + timeObj.hour + ":" + timeObj.minute + ":" + timeObj.second;
            //获取id
            var id = getUserId();
            updateLocalChat(id, text, time);
        });
        $$.addPerson.on("click", function () {
            $$.personModal.addClass('person-modal-active');
        });
        $$.cancel.on("click", function () {
            $$.personModal.removeClass('person-modal-active');
        });
    });
    $(document).on("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            $$.send.trigger('click');
        } else {
            return false;
        }
    });
    socket.on('message', function (data) {
        var gotClone = $$.gotClone.clone().removeClass("none");
        gotClone.find(".text").text(data);
        $$.messageBody.append(gotClone);
    });
    $$.empty.on("click", function () {
        $$.main.html("");
    });
})($, window.document);

//# sourceMappingURL=jquery-control-compiled.js.map