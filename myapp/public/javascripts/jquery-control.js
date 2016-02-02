/**
 * Created by bll on 16/2/2.
 */
var $=require('jquery');
var $$;
(function(jQuery,win,doc){
    "use strict";
    $$={
        send:$("#send"),
        messageText:$("#message-text"),
        gotClone:$('#got-clone'),
        sentClone:$('#sent-clone'),
        messageBody:$(".message>.body")
    };
    $$.send.on("click",function(e){
        var text=$$.messageText.text();
        console.log(text);
        var sentClone=$$.sentClone.clone().removeClass("none");
        sentClone.find(".text").text(text);
        $$.messageBody.append(sentClone);
        $$.messageText.text("");
    });
    $(document).on("keyup",function(event){
        event.preventDefault();
        if (event.keyCode == 13)
        {
            $$.send.trigger('click');
        }else{
            return false;
        }
    });


})($,window.document);