!(function (e, t, i) {
  var n = function (t, i) {
    var n = this;return n.$ele = t, n.nodes = { slideItemList: e(".slide-item-list"), slideItemIndex: e(".slide-item-index"), slidePrev: e(".slide-prev"), slideNext: e(".slide-next") }, n["default"] = { delay: i.delay || 500, activeIndex: 0, total: n.nodes.slideItemList.find("li").length, inter: "", timeOut: "" }, n.opt = e.extend({}, n["default"], i), n.interval = function () {
      return n.opt.inter = setInterval(function () {
        n.opt.activeIndex++, n.opt.activeIndex > n.opt.total - 1 && (n.opt.activeIndex = 0), n.show(n.opt.activeIndex, n.opt.nextEvent);
      }, n.opt.delay), this;
    }, n.opt.delayGoing = function () {
      n.opt.timeOut = setTimeout(function () {
        n.interval();
      }, n.opt.delay);
    }, n.init = function () {
      n.opt.activeIndex = 0, n.nodes.slideNext.show(), n.nodes.slideItemList.find("li").eq(n.opt.activeIndex).fadeIn(n.opt.speed), n.nodes.slideItemIndex.find("li").eq(n.opt.activeIndex).addClass("index-active"), n.interval().next(n.opt.nextEvent).prev(n.opt.prevEvent).indexClick();
    }, n.indexClick = function () {
      n.nodes.slideItemIndex.find("li").each(function (t, i) {
        var o = e(i);o.on("click", function () {
          clearInterval(n.opt.inter), clearTimeout(n.opt.timeOut), n.opt.activeIndex = t, n.opt.delayGoing(), n.show(t, n.opt.indexEvent);
        });
      });
    }, n.next = function (e) {
      return n.nodes.slideNext.on("click", function () {
        return clearInterval(n.opt.inter), clearTimeout(n.opt.timeOut), n.opt.delayGoing(), n.opt.activeIndex++, n.opt.activeIndex > n.opt.total - 1 ? (n.opt.activeIndex = n.opt.total - 1, !1) : void n.show(n.opt.activeIndex, e);
      }), this;
    }, n.prev = function (e) {
      return n.nodes.slidePrev.on("click", function () {
        return clearInterval(n.opt.inter), clearTimeout(n.opt.timeOut), n.opt.delayGoing(), n.opt.activeIndex--, n.opt.activeIndex < 0 ? (n.opt.activeIndex = 0, !1) : void n.show(n.opt.activeIndex, e);
      }), this;
    }, n.show = function (e, t) {
      n.nodes.slideItemList.find("li").hide(), n.nodes.slideItemList.find("li").eq(e).fadeIn(n.opt.speed), n.nodes.slideItemIndex.find("li").removeClass("index-active").eq(n.opt.activeIndex).addClass("index-active"), 0 == n.opt.activeIndex ? n.nodes.slidePrev.hide() : n.nodes.slidePrev.show(), n.opt.activeIndex == n.opt.total - 1 ? n.nodes.slideNext.hide() : n.nodes.slideNext.show(), "undefined" != t && "function" == typeof t && t(n.opt.activeIndex);
    }, n.init();
  };e.fn.FadeSlide = function (e) {
    return new n(this, e);
  };
})(jQuery, window, window);

//# sourceMappingURL=jquery-own-ui.min-compiled.js.map