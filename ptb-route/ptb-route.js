riot.tag2('ptb-route', '<yield></yield>', 'ptb-route,[data-is="ptb-route"]{display:inline-block}', 'class="{c}" if="{s||i||o}"', function (opts) {
  var a, b, c, d, n, p;

  a = this;

  a.param = {};

  b = a.parent;

  c = a.root;

  d = function (e) {
    var f, g, j, k, l, m;
    f = [];
    g = b.path;
    e.replace(/([^\/]+)/g, function (h, i) {
      f.push(i);
    });
    j = 0;
    k = f.length;
    l = f[k - 1] === "*";
    m = g.length;
    if ((k === m) || l) {
      while (j < k) {
        if (f[j] === "*") {
          if (j === (k - 1)) {
            return true;
          } else {
            j++;
            continue;
          }
        } else if (/^:/.test(f[j])) {
          a.param[f[j].replace(/^:/, "")] = g[j];
        } else if (f[j] !== g[j]) {
          return false;
        }
        j++;
      }
      return true;
    } else {
      return false;
    }
  };

  n = function (o) {
    o.target.trigger("cleanup");
  };

  p = function (q) {
    a.d = q.target.getAttribute("rel");
    q.preventDefault();
    history.pushState(null, null, q.target.getAttribute("href"));
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  a.on("mount", function () {
    c.trigger = a.trigger;
  });

  a.on("update", function () {
    a.a = b.anim || a.param.anim || a.opts.dataAnim || b.opts.dataAnim;
    a.i = a.i;
    a.o = a.s;
    a.s = d(opts.dataPath || "");
    a.i = a.s && (a.i != null);
    a.c = [a.a, a.d, a.i ? "in" : void 0, a.o ? "out" : void 0].filter(function (r) {
      return r !== void 0;
    }).join(" ");
    if (a.s && a.redirect) {
      if (/^http/.test(a.redirect)) {
        location.href = a.redirect;
      } else {
        if (history.pushState) {
          history.pushState(null, null, a.redirect);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        } else {
          location.hash = "path=" + a.redirect;
        }
      }
    }
  });

  a.on("updated", function () {
    c.addEventListener("animationstart", function s() {
      c.removeEventListener("animationstart", s)
      c.addEventListener("animationend", n)
    });
    if (history.pushState) {
      Array.prototype.slice.call(c.getElementsByTagName("a")).forEach(function (t) {
        t.addEventListener("click", p);
      });
    }
  });

  a.on("cleanup", function () {
    c.classList.remove("in");
    c.classList.remove("out");
    c.classList.remove(a.a);
    c.classList.remove(a.d);
    c.removeEventListener("animationend", n);
    a.o && a.update();
  });
});
