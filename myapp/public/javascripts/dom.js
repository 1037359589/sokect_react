/**
 * Created by bll on 16/1/28.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var messageBody=React.createClass({
    render: function(){
        //return (
        //    <div data-reactid="">
        //        <div className="contents" data-reactwebpacid="" >终于链接成功啦!!!</div>
        //    </div>
        //)
    }
});
var ContentMode = React.createClass({
    render: function(){
        return (
            <div data-reactid="">
                <div className="contents" data-reactwebpacid="" >终于链接成功啦!!!</div>
            </div>
        )
    }
});
module.exports=ContentMode;