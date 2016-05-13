<ptb-router>
  <yield />
  <script type="coffee">
    a = this

    a.ptb = ((b) ->
      c = {}
      d = location
      [d.pathname, d.search, d.hash].forEach (e) ->
        e = e.replace(/^(\?|#)/, "")

        f = (g) ->
          g and decodeURIComponent(g.replace(/\+/g, " "))

        h = (i) ->
          c.path = []
          i.replace /([^\/]+)/g, (j, k) ->
            c.path.push f(k)

        l = (m, n, o) ->
          o = if o then o else null
          if (p = /(.+?)\[(.+?)?\](.+)?/g.exec(n))
            q = p[1]
            r = p[2]
            s = p[3]
            if r == undefined
              if m[q] == undefined
                m[q] = []
              m[q].push o
            else
              if typeof m[q] != "object"
                m[q] = {}
              if s
                l(m[q], r + s, o)
              else
                l(m[q], r, o)
          else
            if m.hasOwnProperty(n)
              if Array.isArray(m[n])
                m[n].push o
              else
                m[n] = [].concat.apply([m[n], [o]])
            else
              m[n] = o
            return m[n]

        if e.charAt(0) == "/"
          h(e)
        else
          e.replace /([^#&;=?]+)?=?([^&;]+)?/g, (t, u, v) ->
            if u == "path"
              h(v)
            else
              u and l(c, f(u), f(v))

      w = (x, y) ->
        for z of y
          try
            if y[z].constructor == Object
              x[z] = w(x[z], y[z])
            else
              x[z] = y[z]
          catch
            x[z] = y[z]
        return x

      w(a, c)
      if b
        a.update()
    ).bind(a)

    a.on "mount", ->
      window.addEventListener "hashchange", a.ptb
      window.addEventListener "popstate", a.ptb

    a.on "unmount", ->
      window.removeEventListener "hashchange", a.ptb
      window.removeEventListener "popstate", a.ptb

    a.ptb()
  </script>
</ptb-router>
