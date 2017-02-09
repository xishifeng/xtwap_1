!function(e) {
    "use strict";
    var t = "";
    t = t ? t : document.scripts[document.scripts.length - 1].src.match(/[\s\S]*\//)[0];
    var n = document, i = "querySelectorAll", r = "getElementsByClassName", o = function(e) {
        return n[i](e);
    };
    document.head.appendChild(function() {
        var e = n.createElement("link");
        return e.href = t + "../css/layer.min.css", e.type = "text/css", e.rel = "styleSheet", 
        e.id = "layermcss", e;
    }());
    var a = {
        type: 0,
        shade: !0,
        shadeClose: !0,
        fixed: !0,
        anim: !0
    };
    e.ready = {
        extend: function(e) {
            var t = JSON.parse(JSON.stringify(a));
            for (var n in e) t[n] = e[n];
            return t;
        },
        timer: {},
        end: {}
    }, ready.touch = function(e, t) {
        var n;
        e.addEventListener("touchmove", function() {
            n = !0;
        }, !1), e.addEventListener("touchend", function(e) {
            e.preventDefault(), n || t.call(this, e), n = !1;
        }, !1);
    };
    var s = 0, c = [ "layermbox" ], d = function(e) {
        var t = this;
        t.config = ready.extend(e), t.view();
    };
    d.prototype.view = function() {
        var e = this, t = e.config, i = n.createElement("div");
        e.id = i.id = c[0] + s, i.setAttribute("class", c[0] + " " + c[0] + (t.type || 0)), 
        i.setAttribute("index", s);
        var a = function() {
            var e = "object" == typeof t.title;
            return t.title ? '<h3 style="' + (e ? t.title[1] : "") + '">' + (e ? t.title[0] : t.title) + '</h3><button class="layermend"></button>' : "";
        }(), d = function() {
            var e, n = (t.btn || []).length;
            return 0 !== n && t.btn ? (e = '<span type="1">' + t.btn[0] + "</span>", 2 === n && (e = '<span type="0">' + t.btn[1] + "</span>" + e), 
            '<div class="layermbtn">' + e + "</div>") : "";
        }();
        if (t.fixed || (t.top = t.hasOwnProperty("top") ? t.top : 100, t.style = t.style || "", 
        t.style += " top:" + (n.body.scrollTop + t.top)/75 + "rem"), 2 === t.type && (t.content = '<i></i><i class="laymloadtwo"></i><i></i><div>' + (t.content || "") + "</div>"), 
        i.innerHTML = (t.shade ? "<div " + ("string" == typeof t.shade ? 'style="' + t.shade + '"' : "") + ' class="laymshade"></div>' : "") + '<div class="layermmain" ' + (t.fixed ? "" : 'style="position:static;"') + '><div class="section"><div class="layermchild ' + (t.className ? t.className : "") + " " + (t.type || t.shade ? "" : "layermborder ") + (t.anim ? "layermanim" : "") + '" ' + (t.style ? 'style="' + t.style + '"' : "") + ">" + a + '<div class="layermcont">' + t.content + "</div>" + d + "</div></div></div>", 
        !t.type || 2 === t.type) {
            var y = n[r](c[0] + t.type), u = y.length;
            u >= 1 && l.close(y[0].getAttribute("index"));
        }
        document.body.appendChild(i);
        var m = e.elem = o("#" + e.id)[0];
        t.success && t.success(m), e.index = s++, e.action(t, m);
    }, d.prototype.action = function(e, t) {
        var n = this;
        if (e.time && (ready.timer[n.index] = setTimeout(function() {
            l.close(n.index);
        }, 1e3 * e.time)), e.title) {
            var i = t[r]("layermend")[0], o = function() {
                e.cancel && e.cancel(), l.close(n.index);
            };
            ready.touch(i, o), i.onclick = o;
        }
        var a = function() {
            var t = this.getAttribute("type");
            0 == t ? (e.no && e.no(), l.close(n.index)) : e.yes ? e.yes(n.index) : l.close(n.index);
        };
        if (e.btn) for (var s = t[r]("layermbtn")[0].children, c = s.length, d = 0; c > d; d++) ready.touch(s[d], a), 
        s[d].onclick = a;
        if (e.shade && e.shadeClose) {
            var y = t[r]("laymshade")[0];
            ready.touch(y, function() {
                l.close(n.index, e.end);
            }), y.onclick = function() {
                l.close(n.index, e.end);
            };
        }
        e.end && (ready.end[n.index] = e.end);
    };
    var l = {
        v: "1.6",
        index: s,
        open: function(e) {
            var t = new d(e || {});
            return t.index;
        },
        alert: function(e, t, n) {
            l.open({
                content: e,
                style: "background-color: rgba(0,0,0,.6); text-align:center; color:#fff; border:none; font-size:0.4rem; letter-spacing: 0.0533rem; line-height: 200%;max-width: 4rem",
                time: t ? t : 2
            }), n && void 0 != n && setTimeout(n, 1e3 * t);
        },
        confirm: function(e, t, n, i) {
            layer.open({
                content: '<div style="font-size: 0.4266rem; font-weight: 300; color: #4A4747; margin-top: 0.48rem; margin-bottom: 0.6233rem;">&nbsp;' + e + "</div>",
                btn: [ n ? n : "确定", i ? i : "取消" ],
                style: "min-width: 5.8666rem;min-height:3.3333rem;text-align: center;border-radius: 0.16rem;",
                shadeClose: !0,
                yes: function(e) {
                    layer.close(e), t();
                },
                no: function(e) {
                    layer.close(e);
                }
            });
        },
        close: function(e) {
            var t = o("#" + c[0] + e)[0];
            t && (t.innerHTML = "", n.body.removeChild(t), clearTimeout(ready.timer[e]), delete ready.timer[e], 
            "function" == typeof ready.end[e] && ready.end[e](), delete ready.end[e]);
        },
        closeAll: function() {
            for (var e = n[r](c[0]), t = 0, i = e.length; i > t; t++) l.close(0 | e[0].getAttribute("index"));
        }
    };
//  l.confirm();
    "function" == typeof define ? define(function() {
        return l;
    }) : e.layer = l;
}(window);