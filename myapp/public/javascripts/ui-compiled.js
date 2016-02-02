/**
 * Created by bll on 16/1/4.
 */
var $ = require('jquery');
(function ($, win, doc) {
    $('button').on('mousedown', function (e) {
        var $this = $(this);
        //console.log($this.data('mousedown'));
        if ($this.data('mousedown') == undefined || $this.data('mousedown') !== true) {
            return;
        };
        $(".btn-mouse-down").remove();
        var xx = e.offsetX;
        var yy = e.offsetY;
        //console.log(xx,yy);

        var htm = '<span class="btn-mouse-down"  style="top:' + yy + 'px;left:' + xx + 'px;"></span>';
        $this.append(htm);
    });
})($, window.document);

//# sourceMappingURL=ui-compiled.js.map