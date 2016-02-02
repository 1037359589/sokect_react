/**
 * Created by bll on 16/2/2.
 */
var $ = require('jquery');
var socket = io.connect('/', { res: 'id=123' });
var $$;
(function (jQuery, win, doc) {
    "use strict";

    $$ = {
        send: $("#send"),
        messageText: $("#message-text"),
        gotClone: $('#got-clone'),
        sentClone: $('#sent-clone'),
        messageBody: $(".message>.body")
    };
    function getUser() {
        var uid = window.location.search;
        console.log(uid);
    }
    getUser();
    socket.on('connect', function () {
        $$.send.on("click", function (e) {
            var text = $$.messageText.text();
            var sentClone = $$.sentClone.clone().removeClass("none");
            sentClone.find(".text").text(text);
            $$.messageBody.append(sentClone);
            $$.messageText.text("");
            socket.send(text);
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
})($, window.document);

//# sourceMappingURL=jquery-control-compiled.js.map