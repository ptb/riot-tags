riot.tag2('ptb-router', '<yield></yield>', '', '', function (opts) {
  var a;

  a = this;

  a.ptb = (function (b) {
    var c, d, w;
    c = {};
    d = location;
    [d.pathname, d.search, d.hash].forEach(function (e) {
      var f, h, l;
      e = e.replace(/^(\?|#)/, "");
      f = function (g) {
        return g && decodeURIComponent(g.replace(/\+/g, " "));
      };
      h = function (i) {
        c.path = [];
        i.replace(/([^\/]+)/g, function (j, k) {
          c.path.push(f(k));
        });
      };
      l = function (m, n, o) {
        var p, q, r, s;
        o = o ? o : null;
        if ((p = /(.+?)\[(.+?)?\](.+)?/g.exec(n))) {
          q = p[1];
          r = p[2];
          s = p[3];
          if (r === void 0) {
            if (m[q] === void 0) {
              m[q] = [];
            }
            m[q].push(o);
          } else {
            if (typeof m[q] !== "object") {
              m[q] = {};
            }
            if (s) {
              l(m[q], r + s, o);
            } else {
              l(m[q], r, o);
            }
          }
        } else {
          if (m.hasOwnProperty(n)) {
            if (Array.isArray(m[n])) {
              m[n].push(o);
            } else {
              m[n] = [].concat.apply([m[n],
                [o]
              ]);
            }
          } else {
            m[n] = o;
          }
          return m[n];
        }
      };
      if (e.charAt(0) === "/") {
        h(e);
      } else {
        e.replace(/([^#&;=?]+)?=?([^&;]+)?/g, function (t, u, v) {
          if (u === "path") {
            h(v);
          } else {
            u && l(c, f(u), f(v));
          }
        });
      }
    });
    w = function (x, y) {
      var error, z;
      for (z in y) {
        try {
          if (y[z].constructor === Object) {
            x[z] = w(x[z], y[z]);
          } else {
            x[z] = y[z];
          }
        } catch (error) {
          x[z] = y[z];
        }
      }
      return x;
    };
    w(a, c);
    if (b) {
      a.update();
    }
  }).bind(a);

  a.on("mount", function () {
    window.addEventListener("hashchange", a.ptb);
    window.addEventListener("popstate", a.ptb);
  });

  a.on("unmount", function () {
    window.removeEventListener("hashchange", a.ptb);
    window.removeEventListener("popstate", a.ptb);
  });

  a.ptb();
});
