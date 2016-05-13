<ptb-route class="{c}" if="{s||i||o}">
  <yield />

  <style scoped>
    :scope {
      display: inline-block }
  </style>

  <script type="coffee">
    a = this
    a.param = {}
    b = a.parent
    c = a.root

    d = (e) ->
      f = []
      g = b.path
      e.replace /([^\/]+)/g, (h, i) ->
        f.push i
      j = 0
      k = f.length
      l = f[k - 1] is "*"
      m = g.length
      if (k is m) or l
        while j < k
          if f[j] is "*"
            if j is (k - 1)
              return true
            else
              j++
              continue
          else if /^:/.test(f[j])
            a.param[f[j].replace(/^:/, "")] = g[j]
          else if f[j] != g[j]
            return false
          j++
        return true
      else
        return false

    n = (o) ->
      o.target.trigger "cleanup"

    p = (q) ->
      a.d = q.target.getAttribute("rel")
      q.preventDefault()
      history.pushState(null, null, q.target.getAttribute("href"))
      window.dispatchEvent(new HashChangeEvent("hashchange"))

    a.on "mount", ->
      c.trigger = a.trigger

    a.on "update", ->
      a.a = b.anim or a.param.anim or a.opts.dataAnim or b.opts.dataAnim
      a.i = a.i
      a.o = a.s
      a.s = d(opts.dataPath or "")
      a.i = a.s and a.i?
      a.c = [
        a.a
        a.d
        if a.i then "in" else undefined
        if a.o then "out" else undefined
      ].filter((r) -> return r != undefined).join(" ")
      if a.s and a.redirect
        if /^http/.test(a.redirect)
          location.href = a.redirect
        else
          if history.pushState
            history.pushState(null, null, a.redirect)
            window.dispatchEvent(new HashChangeEvent("hashchange"))
          else
            location.hash = "path=" + a.redirect

    a.on "updated", ->
      `c.addEventListener("animationstart", function s() {
        c.removeEventListener("animationstart", s)
        c.addEventListener("animationend", n)
      })`
      if history.pushState
        Array::slice.call(c.getElementsByTagName("a")).forEach (t) ->
          t.addEventListener "click", p

    a.on "cleanup", ->
      c.classList.remove("in")
      c.classList.remove("out")
      c.classList.remove(a.a)
      c.classList.remove(a.d)
      c.removeEventListener("animationend", n)
      a.o and a.update()
  </script>
</ptb-route>
