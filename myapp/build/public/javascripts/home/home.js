/**
 * Created by bll on 16/3/9.
 */
//var React=require('react');
//var ReactDOM=require('react-dom');
//var CommentBox = React.createClass({
//    render: function() {
//        return (
//            <div className="commentBox">
//                Hello, world! I am a CommentBox.asdas
//            </div>
//        );
//    }
//});
var Clear = React.createClass({
    displayName: "Clear",

    getInitialState: function () {
        return { clear: this.props.initialClear };
    },
    clearScreen: function () {
        var newState = !this.state.clear;
        this.setState({
            clear: newState
        });
        this.props.callbackParent(newState);
    },
    render: function () {
        return React.createElement(
            "button",
            { className: "btn border-default normal hover", "data-mousedown": "true", id: "empty", onClick: this.clearScreen },
            "清空屏幕"
        );
    }
});
var AddPerson = React.createClass({
    displayName: "AddPerson",

    getInitialState: function () {
        return { modal: false };
    },
    render: function () {
        "use strict";

        return React.createElement(
            "button",
            { className: "btn border-red normal hover add", "data-mousedown": "true", id: "add-person" },
            "添加成员"
        );
    }
});
var DeletePerson = React.createClass({
    displayName: "DeletePerson",

    render: function () {
        "use strict";

        return React.createElement(
            "button",
            { className: "btn border-green normal hover delete", "data-mousedown": "true", id: "delete-person" },
            "剔除成员"
        );
    }
});
var SendMessage = React.createClass({
    displayName: "SendMessage",

    render: function () {
        "use strict";

        return React.createElement(
            "button",
            { className: "btn border-light normal hover send", "data-mousedown": "true", id: "send" },
            "发送"
        );
    }
});

var ControlButton = React.createClass({
    displayName: "ControlButton",

    getInitialState: function () {
        return {
            clear: false
        };
    },
    //handleClick:function(){
    //    this.setState({
    //        clear:true
    //    });
    //    console.log(222);
    //},
    onChildChanged: function (newState) {
        this.setState({
            clear: newState
        });
        console.log(this.state.clear);
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "control", id: "control" },
            React.createElement(Clear, { onClick: this.handleClick.bind(this), initialClear: this.state.clear, callbackParent: this.onChildChanged }),
            React.createElement(AddPerson, null),
            React.createElement(DeletePerson, null),
            React.createElement(SendMessage, null)
        );
    }
});

var MessageBody = React.createClass({
    displayName: "MessageBody",

    getInitialState: function () {
        return {
            clear: false
        };
    },
    render: function () {
        console.log(this.props.clear);
        return React.createElement(
            "div",
            { className: "body", id: "message-body" },
            "ASAASFAF"
        );
    }
});
var MessageInput = React.createClass({
    displayName: "MessageInput",

    render: function () {
        "use strict";

        return React.createElement(
            "div",
            { className: "input", id: "message-input" },
            React.createElement("div", { contenteditable: "true", className: "text", id: "message-text" })
        );
    }
});
var Message = React.createClass({
    displayName: "Message",

    getInitialState: function () {
        return {
            clear: false
        };
    },
    render: function () {
        "use strict";

        return React.createElement(
            "div",
            { className: "message", id: "main" },
            React.createElement(MessageBody, { clear: this.state.clear }),
            React.createElement(MessageInput, null),
            React.createElement(ControlButton, null)
        );
    }
});
var AddModel = React.createClass({
    displayName: "AddModel",

    render: function () {
        return React.createElement(
            "div",
            { className: "person-modal", id: "person-modal" },
            React.createElement(
                "p",
                null,
                "添加新成员"
            ),
            React.createElement(
                "div",
                { className: "input" },
                React.createElement("input", { type: "text" })
            ),
            React.createElement(
                "div",
                { className: "btn" },
                React.createElement(
                    "button",
                    { className: "btn border-light normal hover add", "data-mousedown": "true", id: "send" },
                    "添加"
                ),
                React.createElement(
                    "button",
                    { className: "btn border-light normal hover cancel", "data-mousedown": "true", id: "send" },
                    "取消"
                )
            )
        );
    }
});
ReactDOM.render(React.createElement(Message, null), document.getElementById('message-content'));