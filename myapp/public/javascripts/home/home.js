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
var Clear=React.createClass({
    getInitialState: function() {
        return {clear: this.props.initialClear};
    },
    clearScreen:function(){
        var newState=!this.state.clear;
        this.setState({
            clear:newState
        });
        this.props.callbackParent(newState);
    },
    render:function(){
        return (
            <button className="btn border-default normal hover" data-mousedown="true" id="empty" onClick={this.clearScreen}>
                清空屏幕
            </button>
        )
    }
});
var AddPerson=React.createClass({
    getInitialState: function() {
        return {
            addPerson: this.props.initAdd
        };
    },
    handleAdd:function(){
        this.setState({
            addPerson:!this.props.initAdd
        });
        this.props.callbackParent();
    },
    render:function(){
        return (
            <button className="btn border-red normal hover add" data-mousedown="true" id="add-person" onClick={this.handleAdd}>
                添加成员
            </button>
        )
    }
});
var DeletePerson=React.createClass({
    render:function(){
        return (
            <button className="btn border-green normal hover delete" data-mousedown="true" id="delete-person">
                剔除成员
            </button>
        )
    }
});
var SendMessage=React.createClass({
    render:function(){
        return (
            <button className="btn border-light normal hover send" data-mousedown="true" id="send">
                发送
            </button>
        )
    }
});

var ControlButton=React.createClass({
    getInitialState:function(){
        return {
            clear:this.props.initClear,
            //addPerson:false
            addPerson:this.props.modelState
        }
    },
    onChildChanged:function(newState){
        this.setState({
            clear:newState
        });
        this.props.callbackParent(newState);
    },
    handleAdd:function(){
        this.setState({
            addPerson:!this.props.modelState
        });
        this.props.showModel(!this.props.modelState);
    },
    render:function(){
        return (
            <div className="control" id="control">
                <Clear initialClear={this.state.clear} callbackParent={this.onChildChanged}/>
                <AddPerson initAdd={this.state.addPerson} callbackParent={this.handleAdd} onClick={this.handleAdd}/>
                <DeletePerson/>
                <SendMessage/>
            </div>
        )
    }
});

var MessageBody=React.createClass({
    getInitialState:function(){
        return {
            clear:this.props.initClear
        }
    },
    render:function(){
        var clear=this.props.initClear;
        var htm=clear?"":"dasdasda";
        return (
            <div className="body" id="message-body" ref="b">
                {htm}
            </div>
        )
    }
});
var MessageInput=React.createClass({
    render:function(){
        return (
            <div className="input" id="message-input">
                <div contenteditable="true" className="text" id="message-text">
                </div>
            </div>
        )
    }
});
var AddModel=React.createClass({
    getInitialState:function(){
        return {
            show:false,
        }
    },
    handleCancel:function(){
        this.setState({
            show:!this.state.show
        });
        this.props.initChangeShow(!this.props.initShow);
    },
    render:function(){
        var cname=this.props.initShow?"person-modal person-modal-active":"person-modal";
        return (
            <div className={cname} id="person-modal">
                <p>添加新成员</p>
                <div className="input">
                    <input type="text"/>
                </div>
                <div className="btn">
                    <button className="btn border-light normal hover add" data-mousedown="true" id="send">
                        添加
                    </button>
                    <button className="btn border-light normal hover cancel" data-mousedown="true" id="send" onClick={this.handleCancel}>
                        取消
                    </button>
                </div>
            </div>
        )
    }
});
var Message=React.createClass({
    getInitialState:function(){
        return {
            clear:"",
            showModel:false
        }
    },
    handleClear:function(newState){
        this.setState({
            clear:newState
        });
    },
    handleAdd:function(newState){
        this.setState({
            showModel:newState
        });
    },
    render:function(){
        return (
            <div className="message" id="main">
                <MessageBody initClear={this.state.clear}/>
                <MessageInput/>
                <ControlButton initClear={this.state.clear}  callbackParent={this.handleClear}
                               showModel={this.handleAdd} modelState={this.state.showModel}/>
                <AddModel initShow={this.state.showModel} initChangeShow={this.handleAdd}/>
            </div>
        )
    }
});

ReactDOM.render(
    <Message />,
    document.getElementById('message-content')
);