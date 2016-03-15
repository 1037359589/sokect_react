/**
 * Created by bll on 16/3/9.
 */
//var React=require('react');
//var ReactDOM=require('react-dom');
var messageAll = [];
var Clear = React.createClass({
    displayName: "Clear",

    getInitialState: function () {
        return {
            clear: this.props.initialClear
        };
    },
    clearScreen: function () {
        var newState = !this.state.clear;
        this.setState({
            clear: newState
        });
        this.props.callbackParent(newState);
    },
    render: function () {
        //var clear=this.state.clear?"恢复记录":"清空屏幕";
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
        return {
            addPerson: this.props.initAdd
        };
    },
    handleAdd: function () {
        this.setState({
            addPerson: !this.props.initAdd
        });
        this.props.callbackParent();
    },
    render: function () {
        return React.createElement(
            "button",
            { className: "btn border-red normal hover add", "data-mousedown": "true", id: "add-person", onClick: this.handleAdd },
            "添加成员"
        );
    }
});
var DeletePerson = React.createClass({
    displayName: "DeletePerson",

    render: function () {
        return React.createElement(
            "button",
            { className: "btn border-green normal hover delete", "data-mousedown": "true", id: "delete-person" },
            "剔除成员"
        );
    }
});
var SendMessage = React.createClass({
    displayName: "SendMessage",

    getInitialState: function () {
        return {
            send: false
        };
    },
    handleSend: function () {
        this.setState({
            send: true,
            clicked: true
        });
        clicked = true;
    },
    initSendState: function () {
        this.setState({
            send: false
        });
    },
    onSendMessage: function () {
        var msg = this.props.message;
        this.props.initHandleSend();
    },
    render: function () {
        return React.createElement(
            "button",
            { className: "btn border-light normal hover send", "data-mousedown": "true", id: "send", onClick: this.onSendMessage },
            "发送"
        );
    }
});

var ControlButton = React.createClass({
    displayName: "ControlButton",

    getInitialState: function () {
        return {
            clear: this.props.initClear,
            //addPerson:false
            addPerson: this.props.modelState,
            sendClick: false
        };
    },
    onChildChanged: function (newState) {
        this.setState({
            clear: newState
        });
        this.props.callbackParent(newState);
    },
    handleAdd: function () {
        this.setState({
            addPerson: !this.props.modelState
        });
        this.props.showModel(!this.props.modelState);
    },
    componentDidUpdate: function () {
        //console.log(1);
    },
    onHandleSend: function () {
        this.setState({
            sendClick: true
        });
        this.props.onSendMessage();
    },
    render: function () {
        var messageContent = this.props.messageContent;
        return React.createElement(
            "div",
            { className: "control", id: "control" },
            React.createElement(Clear, { initialClear: this.state.clear, callbackParent: this.onChildChanged }),
            React.createElement(AddPerson, { initAdd: this.state.addPerson, callbackParent: this.handleAdd, onClick: this.handleAdd }),
            React.createElement(DeletePerson, null),
            React.createElement(SendMessage, { initHandleSend: this.onHandleSend, message: messageContent })
        );
    }
});

var MessageBody = React.createClass({
    displayName: "MessageBody",

    getInitialState: function () {
        return {
            clear: this.props.initClear,
            content: this.props.initSendMessage,
            sendBlock: []
        };
    },
    componentDidUpdate: function () {
        var click = this.props.sendState;
        if (click) {
            this.props.initSendState();
        }
        var clear = this.props.initClear;
        if (clear) {
            this.props.onInitClear();
        }
    },
    render: function () {
        var text = this.props.initSendMessage;
        var click = this.props.sendState;
        //var htm=[];
        //var htm=clear?[]:this.state.sendBlock;
        if (text != "" && click) {
            this.state.sendBlock.push(React.createElement(SendBlock, { initSendContent: text }));
        }
        var clear = this.props.initClear;
        console.log(clear);
        if (clear) {
            this.setState({
                sendBlock: []
            });
        }
        var htm = clear ? "" : this.state.sendBlock;
        return React.createElement(
            "div",
            { className: "body", id: "message-body", ref: "b" },
            htm
        );
    }
});
var SendBlock = React.createClass({
    displayName: "SendBlock",

    render: function () {
        var content = this.props.initSendContent;
        return React.createElement(
            "div",
            { className: "message-block clearfix", id: "sent-clone" },
            React.createElement(
                "div",
                { className: "sent-message clearfix" },
                React.createElement(
                    "div",
                    { className: "person fl" },
                    React.createElement("img", { src: "images/p2.jpg", alt: "" })
                ),
                React.createElement("div", { className: "triangle-right" }),
                React.createElement(
                    "div",
                    { className: "text fr" },
                    content
                )
            )
        );
    }
});
var MessageInput = React.createClass({
    displayName: "MessageInput",

    getInitialState: function () {
        return {
            content: ""
        };
    },
    componentDidUpdate: function () {},
    handleChangeMessage: function (e) {
        var message = e.target.value;
        this.setState({
            content: message
        });
        this.props.onChangeInput(message);
    },
    render: function () {
        var send = this.props.send;
        if (send) {
            this.setState({
                content: ""
            });
        }
        return React.createElement(
            "div",
            { className: "input", id: "message-input" },
            React.createElement(
                "div",
                { contenteditable: "true", className: "text", id: "message-text" },
                React.createElement("textarea", { type: "text", name: "message-input", className: "message-input",
                    onChange: this.handleChangeMessage, ref: "messageInput", value: this.state.content })
            )
        );
    }
});
var AddModel = React.createClass({
    displayName: "AddModel",

    getInitialState: function () {
        return {
            show: false
        };
    },
    handleCancel: function () {
        this.setState({
            show: !this.state.show
        });
        this.props.initChangeShow(!this.props.initShow);
    },
    render: function () {
        var cname = this.props.initShow ? "person-modal person-modal-active" : "person-modal";
        return React.createElement(
            "div",
            { className: cname, id: "person-modal" },
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
                    { className: "btn border-light normal hover cancel", "data-mousedown": "true", id: "send", onClick: this.handleCancel },
                    "取消"
                )
            )
        );
    }
});
var Message = React.createClass({
    displayName: "Message",

    getInitialState: function () {
        return {
            clear: false,
            showModel: false,
            messageContent: "",
            sendClick: false,
            sendBlock: []
        };
    },
    handleClear: function (newState) {
        this.setState({
            clear: newState
        });
    },
    handleAdd: function (newState) {
        this.setState({
            showModel: newState
        });
    },
    handleInput: function (message) {
        this.setState({
            messageContent: message
        });
    },
    handleSend: function () {
        this.setState({
            sendClick: true
        });
    },
    initClick: function () {
        this.setState({
            sendClick: false,
            clear: false
        });
    },
    initClear: function () {
        this.setState({
            clear: false
        });
    },
    initInput: function () {},
    componentDidMount: function () {},
    render: function () {
        return React.createElement(
            "div",
            { className: "message", id: "main" },
            React.createElement(MessageBody, { initClear: this.state.clear, initSendMessage: this.state.messageContent, onInitClear: this.initClear,
                initSendState: this.initClick, sendState: this.state.sendClick }),
            React.createElement(MessageInput, { onChangeInput: this.handleInput, sendState: this.state.sendClick, send: this.state.sendClick }),
            React.createElement(ControlButton, { initClear: this.state.clear, callbackParent: this.handleClear,
                showModel: this.handleAdd, modelState: this.state.showModel,
                sendClick: this.state.sendClick, onSendMessage: this.handleSend,
                messageContent: this.state.messageContent
            }),
            React.createElement(AddModel, { initShow: this.state.showModel, initChangeShow: this.handleAdd })
        );
    }
});

ReactDOM.render(React.createElement(Message, null), document.getElementById('message-content'));