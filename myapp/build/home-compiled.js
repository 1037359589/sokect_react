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
        return React.createElement("button", { className: "btn border-default normal hover", "data-mousedown": "true", id: "empty", onClick: this.clearScreen }, "清空屏幕");
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
        //this.props.callbackParent(!this.state.addPerson);
        this.props.callbackParent();
    },
    render: function () {
        console.log(this.state.addPerson, 11);
        return React.createElement("button", { className: "btn border-red normal hover add", "data-mousedown": "true", id: "add-person", onClick: this.handleAdd }, "添加成员");
    }
});
var DeletePerson = React.createClass({
    displayName: "DeletePerson",

    render: function () {
        return React.createElement("button", { className: "btn border-green normal hover delete", "data-mousedown": "true", id: "delete-person" }, "剔除成员");
    }
});
var SendMessage = React.createClass({
    displayName: "SendMessage",

    render: function () {
        return React.createElement("button", { className: "btn border-light normal hover send", "data-mousedown": "true", id: "send" }, "发送");
    }
});

var ControlButton = React.createClass({
    displayName: "ControlButton",

    getInitialState: function () {
        return {
            clear: this.props.initClear,
            //addPerson:false
            addPerson: this.props.modelState
        };
    },
    onChildChanged: function (newState) {
        this.setState({
            clear: newState
        });
        this.props.callbackParent(newState);
    },
    handleAdd: function (newAdd) {
        this.setState({
            addPerson: !this.props.modelState
        });
        this.props.showModel(!this.props.modelState);
    },
    render: function () {
        console.log(this.state.addPerson, 3);
        return React.createElement("div", { className: "control", id: "control" }, React.createElement(Clear, { initialClear: this.state.clear, callbackParent: this.onChildChanged }), React.createElement(AddPerson, { initAdd: this.state.addPerson, callbackParent: this.handleAdd, onClick: this.handleAdd }), React.createElement(DeletePerson, null), React.createElement(SendMessage, null));
    }
});

var MessageBody = React.createClass({
    displayName: "MessageBody",

    getInitialState: function () {
        return {
            clear: this.props.initClear
        };
    },
    //changeClearState:function(){
    //    this.setState({
    //        clear:!this.state.clear
    //    });
    //    console.log(this.state.clear,222);
    //},
    render: function () {
        var clear = this.props.initClear;
        var htm = clear ? "" : "dasdasda";
        return React.createElement("div", { className: "body", id: "message-body", ref: "b" }, htm);
    }
});
var MessageInput = React.createClass({
    displayName: "MessageInput",

    render: function () {
        return React.createElement("div", { className: "input", id: "message-input" }, React.createElement("div", { contenteditable: "true", className: "text", id: "message-text" }));
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
        return React.createElement("div", { className: cname, id: "person-modal" }, React.createElement("p", null, "添加新成员"), React.createElement("div", { className: "input" }, React.createElement("input", { type: "text" })), React.createElement("div", { className: "btn" }, React.createElement("button", { className: "btn border-light normal hover add", "data-mousedown": "true", id: "send" }, "添加"), React.createElement("button", { className: "btn border-light normal hover cancel", "data-mousedown": "true", id: "send", onClick: this.handleCancel }, "取消")));
    }
});
var Message = React.createClass({
    displayName: "Message",

    getInitialState: function () {
        return {
            clear: "",
            showModel: false
        };
    },
    handleClear: function (newState) {
        this.setState({
            clear: newState
        });
    },
    handleAdd: function (newState) {
        //console.log(newState);
        this.setState({
            showModel: newState
        });
    },
    render: function () {
        console.log(this.state.showModel, 2);
        return React.createElement("div", { className: "message", id: "main" }, React.createElement(MessageBody, { initClear: this.state.clear }), React.createElement(MessageInput, null), React.createElement(ControlButton, { initClear: this.state.clear, callbackParent: this.handleClear,
            showModel: this.handleAdd, modelState: this.state.showModel }), React.createElement(AddModel, { initShow: this.state.showModel, initChangeShow: this.handleAdd }));
    }
});

ReactDOM.render(React.createElement(Message, null), document.getElementById('message-content'));

//# sourceMappingURL=home-compiled.js.map