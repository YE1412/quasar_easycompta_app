(function() {
  var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));
  function g(a) {
    var b = aa.has(a);
    a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
    return !b && a;
  }
  function l(a) {
    var b = a.isConnected;
    if (void 0 !== b)
      return b;
    for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
      a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
    return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function n(a, b) {
    for (; b && b !== a && !b.nextSibling; )
      b = b.parentNode;
    return b && b !== a ? b.nextSibling : null;
  }
  function p(a, b, d) {
    d = void 0 === d ? /* @__PURE__ */ new Set() : d;
    for (var c = a; c; ) {
      if (c.nodeType === Node.ELEMENT_NODE) {
        var e = c;
        b(e);
        var f = e.localName;
        if ("link" === f && "import" === e.getAttribute("rel")) {
          c = e.import;
          if (c instanceof Node && !d.has(c))
            for (d.add(c), c = c.firstChild; c; c = c.nextSibling)
              p(c, b, d);
          c = n(a, e);
          continue;
        } else if ("template" === f) {
          c = n(a, e);
          continue;
        }
        if (e = e.__CE_shadowRoot)
          for (e = e.firstChild; e; e = e.nextSibling)
            p(e, b, d);
      }
      c = c.firstChild ? c.firstChild : n(a, c);
    }
  }
  function r(a, b, d) {
    a[b] = d;
  }
  function u() {
    this.a = /* @__PURE__ */ new Map();
    this.g = /* @__PURE__ */ new Map();
    this.c = [];
    this.f = [];
    this.b = false;
  }
  function ba(a, b, d) {
    a.a.set(b, d);
    a.g.set(d.constructorFunction, d);
  }
  function ca(a, b) {
    a.b = true;
    a.c.push(b);
  }
  function da(a, b) {
    a.b = true;
    a.f.push(b);
  }
  function v(a, b) {
    a.b && p(b, function(b2) {
      return w(a, b2);
    });
  }
  function w(a, b) {
    if (a.b && !b.__CE_patched) {
      b.__CE_patched = true;
      for (var d = 0; d < a.c.length; d++)
        a.c[d](b);
      for (d = 0; d < a.f.length; d++)
        a.f[d](b);
    }
  }
  function x(a, b) {
    var d = [];
    p(b, function(b2) {
      return d.push(b2);
    });
    for (b = 0; b < d.length; b++) {
      var c = d[b];
      1 === c.__CE_state ? a.connectedCallback(c) : y(a, c);
    }
  }
  function z(a, b) {
    var d = [];
    p(b, function(b2) {
      return d.push(b2);
    });
    for (b = 0; b < d.length; b++) {
      var c = d[b];
      1 === c.__CE_state && a.disconnectedCallback(c);
    }
  }
  function A(a, b, d) {
    d = void 0 === d ? {} : d;
    var c = d.u || /* @__PURE__ */ new Set(), e = d.i || function(b2) {
      return y(a, b2);
    }, f = [];
    p(b, function(b2) {
      if ("link" === b2.localName && "import" === b2.getAttribute("rel")) {
        var d2 = b2.import;
        d2 instanceof Node && (d2.__CE_isImportDocument = true, d2.__CE_hasRegistry = true);
        d2 && "complete" === d2.readyState ? d2.__CE_documentLoadHandled = true : b2.addEventListener("load", function() {
          var d3 = b2.import;
          if (!d3.__CE_documentLoadHandled) {
            d3.__CE_documentLoadHandled = true;
            var f2 = new Set(c);
            f2.delete(d3);
            A(a, d3, { u: f2, i: e });
          }
        });
      } else
        f.push(b2);
    }, c);
    if (a.b)
      for (b = 0; b < f.length; b++)
        w(a, f[b]);
    for (b = 0; b < f.length; b++)
      e(f[b]);
  }
  function y(a, b) {
    if (void 0 === b.__CE_state) {
      var d = b.ownerDocument;
      if (d.defaultView || d.__CE_isImportDocument && d.__CE_hasRegistry) {
        if (d = a.a.get(b.localName)) {
          d.constructionStack.push(b);
          var c = d.constructorFunction;
          try {
            try {
              if (new c() !== b)
                throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              d.constructionStack.pop();
            }
          } catch (t) {
            throw b.__CE_state = 2, t;
          }
          b.__CE_state = 1;
          b.__CE_definition = d;
          if (d.attributeChangedCallback)
            for (d = d.observedAttributes, c = 0; c < d.length; c++) {
              var e = d[c], f = b.getAttribute(e);
              null !== f && a.attributeChangedCallback(b, e, null, f, null);
            }
          l(b) && a.connectedCallback(b);
        }
      }
    }
  }
  u.prototype.connectedCallback = function(a) {
    var b = a.__CE_definition;
    b.connectedCallback && b.connectedCallback.call(a);
  };
  u.prototype.disconnectedCallback = function(a) {
    var b = a.__CE_definition;
    b.disconnectedCallback && b.disconnectedCallback.call(a);
  };
  u.prototype.attributeChangedCallback = function(a, b, d, c, e) {
    var f = a.__CE_definition;
    f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, d, c, e);
  };
  function B(a) {
    var b = document;
    this.c = a;
    this.a = b;
    this.b = void 0;
    A(this.c, this.a);
    "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: true, subtree: true }));
  }
  function C(a) {
    a.b && a.b.disconnect();
  }
  B.prototype.f = function(a) {
    var b = this.a.readyState;
    "interactive" !== b && "complete" !== b || C(this);
    for (b = 0; b < a.length; b++)
      for (var d = a[b].addedNodes, c = 0; c < d.length; c++)
        A(this.c, d[c]);
  };
  function ea() {
    var a = this;
    this.b = this.a = void 0;
    this.c = new Promise(function(b) {
      a.b = b;
      a.a && b(a.a);
    });
  }
  function D(a) {
    if (a.a)
      throw Error("Already resolved.");
    a.a = void 0;
    a.b && a.b(void 0);
  }
  function E(a) {
    this.c = false;
    this.a = a;
    this.j = /* @__PURE__ */ new Map();
    this.f = function(b) {
      return b();
    };
    this.b = false;
    this.g = [];
    this.o = new B(a);
  }
  E.prototype.l = function(a, b) {
    var d = this;
    if (!(b instanceof Function))
      throw new TypeError("Custom element constructors must be functions.");
    if (!g(a))
      throw new SyntaxError("The element name '" + a + "' is not valid.");
    if (this.a.a.get(a))
      throw Error("A custom element with name '" + a + "' has already been defined.");
    if (this.c)
      throw Error("A custom element is already being defined.");
    this.c = true;
    try {
      var c = function(b2) {
        var a2 = e[b2];
        if (void 0 !== a2 && !(a2 instanceof Function))
          throw Error("The '" + b2 + "' callback must be a function.");
        return a2;
      }, e = b.prototype;
      if (!(e instanceof Object))
        throw new TypeError("The custom element constructor's prototype is not an object.");
      var f = c("connectedCallback");
      var t = c("disconnectedCallback");
      var k = c("adoptedCallback");
      var h = c("attributeChangedCallback");
      var m = b.observedAttributes || [];
    } catch (q) {
      return;
    } finally {
      this.c = false;
    }
    b = { localName: a, constructorFunction: b, connectedCallback: f, disconnectedCallback: t, adoptedCallback: k, attributeChangedCallback: h, observedAttributes: m, constructionStack: [] };
    ba(
      this.a,
      a,
      b
    );
    this.g.push(b);
    this.b || (this.b = true, this.f(function() {
      return fa(d);
    }));
  };
  E.prototype.i = function(a) {
    A(this.a, a);
  };
  function fa(a) {
    if (false !== a.b) {
      a.b = false;
      for (var b = a.g, d = [], c = /* @__PURE__ */ new Map(), e = 0; e < b.length; e++)
        c.set(b[e].localName, []);
      A(a.a, document, { i: function(b2) {
        if (void 0 === b2.__CE_state) {
          var e2 = b2.localName, f2 = c.get(e2);
          f2 ? f2.push(b2) : a.a.a.get(e2) && d.push(b2);
        }
      } });
      for (e = 0; e < d.length; e++)
        y(a.a, d[e]);
      for (; 0 < b.length; ) {
        var f = b.shift();
        e = f.localName;
        f = c.get(f.localName);
        for (var t = 0; t < f.length; t++)
          y(a.a, f[t]);
        (e = a.j.get(e)) && D(e);
      }
    }
  }
  E.prototype.get = function(a) {
    if (a = this.a.a.get(a))
      return a.constructorFunction;
  };
  E.prototype.m = function(a) {
    if (!g(a))
      return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
    var b = this.j.get(a);
    if (b)
      return b.c;
    b = new ea();
    this.j.set(a, b);
    this.a.a.get(a) && !this.g.some(function(b2) {
      return b2.localName === a;
    }) && D(b);
    return b.c;
  };
  E.prototype.s = function(a) {
    C(this.o);
    var b = this.f;
    this.f = function(d) {
      return a(function() {
        return b(d);
      });
    };
  };
  window.CustomElementRegistry = E;
  E.prototype.define = E.prototype.l;
  E.prototype.upgrade = E.prototype.i;
  E.prototype.get = E.prototype.get;
  E.prototype.whenDefined = E.prototype.m;
  E.prototype.polyfillWrapFlushCallback = E.prototype.s;
  var F = window.Document.prototype.createElement, G = window.Document.prototype.createElementNS, ha = window.Document.prototype.importNode, ia = window.Document.prototype.prepend, ja = window.Document.prototype.append, ka = window.DocumentFragment.prototype.prepend, la = window.DocumentFragment.prototype.append, H = window.Node.prototype.cloneNode, I = window.Node.prototype.appendChild, J = window.Node.prototype.insertBefore, K = window.Node.prototype.removeChild, L = window.Node.prototype.replaceChild, M = Object.getOwnPropertyDescriptor(
    window.Node.prototype,
    "textContent"
  ), N = window.Element.prototype.attachShadow, O = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), P = window.Element.prototype.getAttribute, Q = window.Element.prototype.setAttribute, R = window.Element.prototype.removeAttribute, S = window.Element.prototype.getAttributeNS, T = window.Element.prototype.setAttributeNS, U = window.Element.prototype.removeAttributeNS, ma = window.Element.prototype.insertAdjacentElement, na = window.Element.prototype.insertAdjacentHTML, oa = window.Element.prototype.prepend, pa = window.Element.prototype.append, V = window.Element.prototype.before, qa = window.Element.prototype.after, ra = window.Element.prototype.replaceWith, sa = window.Element.prototype.remove, ta = window.HTMLElement, W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), ua = window.HTMLElement.prototype.insertAdjacentElement, va = window.HTMLElement.prototype.insertAdjacentHTML;
  var wa = new function() {
  }();
  function xa() {
    var a = X;
    window.HTMLElement = function() {
      function b() {
        var b2 = this.constructor, c = a.g.get(b2);
        if (!c)
          throw Error("The custom element being constructed was not registered with `customElements`.");
        var e = c.constructionStack;
        if (0 === e.length)
          return e = F.call(document, c.localName), Object.setPrototypeOf(e, b2.prototype), e.__CE_state = 1, e.__CE_definition = c, w(a, e), e;
        c = e.length - 1;
        var f = e[c];
        if (f === wa)
          throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
        e[c] = wa;
        Object.setPrototypeOf(f, b2.prototype);
        w(a, f);
        return f;
      }
      b.prototype = ta.prototype;
      Object.defineProperty(b.prototype, "constructor", { writable: true, configurable: true, enumerable: false, value: b });
      return b;
    }();
  }
  function Y(a, b, d) {
    function c(b2) {
      return function(d2) {
        for (var e = [], c2 = 0; c2 < arguments.length; ++c2)
          e[c2] = arguments[c2];
        c2 = [];
        for (var f = [], m = 0; m < e.length; m++) {
          var q = e[m];
          q instanceof Element && l(q) && f.push(q);
          if (q instanceof DocumentFragment)
            for (q = q.firstChild; q; q = q.nextSibling)
              c2.push(q);
          else
            c2.push(q);
        }
        b2.apply(this, e);
        for (e = 0; e < f.length; e++)
          z(a, f[e]);
        if (l(this))
          for (e = 0; e < c2.length; e++)
            f = c2[e], f instanceof Element && x(a, f);
      };
    }
    void 0 !== d.h && (b.prepend = c(d.h));
    void 0 !== d.append && (b.append = c(d.append));
  }
  function ya() {
    var a = X;
    r(Document.prototype, "createElement", function(b) {
      if (this.__CE_hasRegistry) {
        var d = a.a.get(b);
        if (d)
          return new d.constructorFunction();
      }
      b = F.call(this, b);
      w(a, b);
      return b;
    });
    r(Document.prototype, "importNode", function(b, d) {
      b = ha.call(this, b, !!d);
      this.__CE_hasRegistry ? A(a, b) : v(a, b);
      return b;
    });
    r(Document.prototype, "createElementNS", function(b, d) {
      if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
        var c = a.a.get(d);
        if (c)
          return new c.constructorFunction();
      }
      b = G.call(
        this,
        b,
        d
      );
      w(a, b);
      return b;
    });
    Y(a, Document.prototype, { h: ia, append: ja });
  }
  function za() {
    function a(a2, c) {
      Object.defineProperty(a2, "textContent", { enumerable: c.enumerable, configurable: true, get: c.get, set: function(a3) {
        if (this.nodeType === Node.TEXT_NODE)
          c.set.call(this, a3);
        else {
          var d = void 0;
          if (this.firstChild) {
            var e = this.childNodes, k = e.length;
            if (0 < k && l(this)) {
              d = Array(k);
              for (var h = 0; h < k; h++)
                d[h] = e[h];
            }
          }
          c.set.call(this, a3);
          if (d)
            for (a3 = 0; a3 < d.length; a3++)
              z(b, d[a3]);
        }
      } });
    }
    var b = X;
    r(Node.prototype, "insertBefore", function(a2, c) {
      if (a2 instanceof DocumentFragment) {
        var e = Array.prototype.slice.apply(a2.childNodes);
        a2 = J.call(this, a2, c);
        if (l(this))
          for (c = 0; c < e.length; c++)
            x(b, e[c]);
        return a2;
      }
      e = l(a2);
      c = J.call(this, a2, c);
      e && z(b, a2);
      l(this) && x(b, a2);
      return c;
    });
    r(Node.prototype, "appendChild", function(a2) {
      if (a2 instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a2.childNodes);
        a2 = I.call(this, a2);
        if (l(this))
          for (var e = 0; e < c.length; e++)
            x(b, c[e]);
        return a2;
      }
      c = l(a2);
      e = I.call(this, a2);
      c && z(b, a2);
      l(this) && x(b, a2);
      return e;
    });
    r(Node.prototype, "cloneNode", function(a2) {
      a2 = H.call(this, !!a2);
      this.ownerDocument.__CE_hasRegistry ? A(b, a2) : v(
        b,
        a2
      );
      return a2;
    });
    r(Node.prototype, "removeChild", function(a2) {
      var c = l(a2), e = K.call(this, a2);
      c && z(b, a2);
      return e;
    });
    r(Node.prototype, "replaceChild", function(a2, c) {
      if (a2 instanceof DocumentFragment) {
        var e = Array.prototype.slice.apply(a2.childNodes);
        a2 = L.call(this, a2, c);
        if (l(this))
          for (z(b, c), c = 0; c < e.length; c++)
            x(b, e[c]);
        return a2;
      }
      e = l(a2);
      var f = L.call(this, a2, c), d = l(this);
      d && z(b, c);
      e && z(b, a2);
      d && x(b, a2);
      return f;
    });
    M && M.get ? a(Node.prototype, M) : ca(b, function(b2) {
      a(b2, { enumerable: true, configurable: true, get: function() {
        for (var a2 = [], b3 = 0; b3 < this.childNodes.length; b3++) {
          var f = this.childNodes[b3];
          f.nodeType !== Node.COMMENT_NODE && a2.push(f.textContent);
        }
        return a2.join("");
      }, set: function(a2) {
        for (; this.firstChild; )
          K.call(this, this.firstChild);
        null != a2 && "" !== a2 && I.call(this, document.createTextNode(a2));
      } });
    });
  }
  function Aa(a) {
    function b(b2) {
      return function(e) {
        for (var c = [], d2 = 0; d2 < arguments.length; ++d2)
          c[d2] = arguments[d2];
        d2 = [];
        for (var k = [], h = 0; h < c.length; h++) {
          var m = c[h];
          m instanceof Element && l(m) && k.push(m);
          if (m instanceof DocumentFragment)
            for (m = m.firstChild; m; m = m.nextSibling)
              d2.push(m);
          else
            d2.push(m);
        }
        b2.apply(this, c);
        for (c = 0; c < k.length; c++)
          z(a, k[c]);
        if (l(this))
          for (c = 0; c < d2.length; c++)
            k = d2[c], k instanceof Element && x(a, k);
      };
    }
    var d = Element.prototype;
    void 0 !== V && (d.before = b(V));
    void 0 !== V && (d.after = b(qa));
    void 0 !== ra && r(d, "replaceWith", function(b2) {
      for (var e = [], c = 0; c < arguments.length; ++c)
        e[c] = arguments[c];
      c = [];
      for (var d2 = [], k = 0; k < e.length; k++) {
        var h = e[k];
        h instanceof Element && l(h) && d2.push(h);
        if (h instanceof DocumentFragment)
          for (h = h.firstChild; h; h = h.nextSibling)
            c.push(h);
        else
          c.push(h);
      }
      k = l(this);
      ra.apply(this, e);
      for (e = 0; e < d2.length; e++)
        z(a, d2[e]);
      if (k)
        for (z(a, this), e = 0; e < c.length; e++)
          d2 = c[e], d2 instanceof Element && x(a, d2);
    });
    void 0 !== sa && r(d, "remove", function() {
      var b2 = l(this);
      sa.call(this);
      b2 && z(a, this);
    });
  }
  function Ba() {
    function a(a2, b2) {
      Object.defineProperty(a2, "innerHTML", { enumerable: b2.enumerable, configurable: true, get: b2.get, set: function(a3) {
        var e = this, d2 = void 0;
        l(this) && (d2 = [], p(this, function(a4) {
          a4 !== e && d2.push(a4);
        }));
        b2.set.call(this, a3);
        if (d2)
          for (var f = 0; f < d2.length; f++) {
            var t = d2[f];
            1 === t.__CE_state && c.disconnectedCallback(t);
          }
        this.ownerDocument.__CE_hasRegistry ? A(c, this) : v(c, this);
        return a3;
      } });
    }
    function b(a2, b2) {
      r(a2, "insertAdjacentElement", function(a3, e) {
        var d2 = l(e);
        a3 = b2.call(this, a3, e);
        d2 && z(c, e);
        l(a3) && x(c, e);
        return a3;
      });
    }
    function d(a2, b2) {
      function e(a3, b3) {
        for (var e2 = []; a3 !== b3; a3 = a3.nextSibling)
          e2.push(a3);
        for (b3 = 0; b3 < e2.length; b3++)
          A(c, e2[b3]);
      }
      r(a2, "insertAdjacentHTML", function(a3, c2) {
        a3 = a3.toLowerCase();
        if ("beforebegin" === a3) {
          var d2 = this.previousSibling;
          b2.call(this, a3, c2);
          e(d2 || this.parentNode.firstChild, this);
        } else if ("afterbegin" === a3)
          d2 = this.firstChild, b2.call(this, a3, c2), e(this.firstChild, d2);
        else if ("beforeend" === a3)
          d2 = this.lastChild, b2.call(this, a3, c2), e(d2 || this.firstChild, null);
        else if ("afterend" === a3)
          d2 = this.nextSibling, b2.call(this, a3, c2), e(
            this.nextSibling,
            d2
          );
        else
          throw new SyntaxError("The value provided (" + String(a3) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      });
    }
    var c = X;
    N && r(Element.prototype, "attachShadow", function(a2) {
      a2 = N.call(this, a2);
      var b2 = c;
      if (b2.b && !a2.__CE_patched) {
        a2.__CE_patched = true;
        for (var e = 0; e < b2.c.length; e++)
          b2.c[e](a2);
      }
      return this.__CE_shadowRoot = a2;
    });
    O && O.get ? a(Element.prototype, O) : W && W.get ? a(HTMLElement.prototype, W) : da(c, function(b2) {
      a(b2, {
        enumerable: true,
        configurable: true,
        get: function() {
          return H.call(this, true).innerHTML;
        },
        set: function(a2) {
          var b3 = "template" === this.localName, c2 = b3 ? this.content : this, e = G.call(document, this.namespaceURI, this.localName);
          for (e.innerHTML = a2; 0 < c2.childNodes.length; )
            K.call(c2, c2.childNodes[0]);
          for (a2 = b3 ? e.content : e; 0 < a2.childNodes.length; )
            I.call(c2, a2.childNodes[0]);
        }
      });
    });
    r(Element.prototype, "setAttribute", function(a2, b2) {
      if (1 !== this.__CE_state)
        return Q.call(this, a2, b2);
      var e = P.call(this, a2);
      Q.call(this, a2, b2);
      b2 = P.call(this, a2);
      c.attributeChangedCallback(this, a2, e, b2, null);
    });
    r(Element.prototype, "setAttributeNS", function(a2, b2, d2) {
      if (1 !== this.__CE_state)
        return T.call(this, a2, b2, d2);
      var e = S.call(this, a2, b2);
      T.call(this, a2, b2, d2);
      d2 = S.call(this, a2, b2);
      c.attributeChangedCallback(this, b2, e, d2, a2);
    });
    r(Element.prototype, "removeAttribute", function(a2) {
      if (1 !== this.__CE_state)
        return R.call(this, a2);
      var b2 = P.call(this, a2);
      R.call(this, a2);
      null !== b2 && c.attributeChangedCallback(this, a2, b2, null, null);
    });
    r(Element.prototype, "removeAttributeNS", function(a2, b2) {
      if (1 !== this.__CE_state)
        return U.call(this, a2, b2);
      var d2 = S.call(this, a2, b2);
      U.call(this, a2, b2);
      var e = S.call(
        this,
        a2,
        b2
      );
      d2 !== e && c.attributeChangedCallback(this, b2, d2, e, a2);
    });
    ua ? b(HTMLElement.prototype, ua) : ma ? b(Element.prototype, ma) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
    va ? d(HTMLElement.prototype, va) : na ? d(Element.prototype, na) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
    Y(c, Element.prototype, { h: oa, append: pa });
    Aa(c);
  }
  var Z = window.customElements;
  if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
    var X = new u();
    xa();
    ya();
    Y(X, DocumentFragment.prototype, { h: ka, append: la });
    za();
    Ba();
    document.__CE_hasRegistry = true;
    var customElements = new E(X);
    Object.defineProperty(window, "customElements", { configurable: true, enumerable: true, value: customElements });
  }
}).call(self);
"string" !== typeof document.baseURI && Object.defineProperty(Document.prototype, "baseURI", { enumerable: true, configurable: true, get: function() {
  var a = document.querySelector("base");
  return a && a.href ? a.href : document.URL;
} });
"function" !== typeof window.CustomEvent && (window.CustomEvent = function(c, a) {
  a = a || { bubbles: false, cancelable: false, detail: void 0 };
  var b = document.createEvent("CustomEvent");
  b.initCustomEvent(c, a.bubbles, a.cancelable, a.detail);
  return b;
}, window.CustomEvent.prototype = window.Event.prototype);
(function(b, c, d) {
  b.composedPath || (b.composedPath = function() {
    if (this.path)
      return this.path;
    var a = this.target;
    for (this.path = []; null !== a.parentNode; )
      this.path.push(a), a = a.parentNode;
    this.path.push(c, d);
    return this.path;
  });
})(Event.prototype, document, window);
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
(function(a) {
  "function" !== typeof a.matches && (a.matches = a.msMatchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || function(a2) {
    a2 = (this.document || this.ownerDocument).querySelectorAll(a2);
    for (var b = 0; a2[b] && a2[b] !== this; )
      ++b;
    return !!a2[b];
  });
  "function" !== typeof a.closest && (a.closest = function(a2) {
    for (var b = this; b && 1 === b.nodeType; ) {
      if (b.matches(a2))
        return b;
      b = b.parentNode;
    }
    return null;
  });
})(window.Element.prototype);
/*!
Element.getRootNode()
*/
(function(c) {
  function d(a) {
    a = b(a);
    return a && 11 === a.nodeType ? d(a.host) : a;
  }
  function b(a) {
    return a && a.parentNode ? b(a.parentNode) : a;
  }
  "function" !== typeof c.getRootNode && (c.getRootNode = function(a) {
    return a && a.composed ? d(this) : b(this);
  });
})(Element.prototype);
/*!
Element.isConnected()
*/
(function(a) {
  "isConnected" in a || Object.defineProperty(a, "isConnected", { configurable: true, enumerable: true, get: function() {
    var a2 = this.getRootNode({ composed: true });
    return a2 && 9 === a2.nodeType;
  } });
})(Element.prototype);
/*!
Element.remove()
*/
(function(b) {
  b.forEach(function(a) {
    a.hasOwnProperty("remove") || Object.defineProperty(a, "remove", { configurable: true, enumerable: true, writable: true, value: function() {
      null !== this.parentNode && this.parentNode.removeChild(this);
    } });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
/*!
Element.classList
*/
!function(e) {
  "classList" in e || Object.defineProperty(e, "classList", { get: function() {
    var e2 = this, t = (e2.getAttribute("class") || "").replace(/^\s+|\s$/g, "").split(/\s+/g);
    function n() {
      t.length > 0 ? e2.setAttribute("class", t.join(" ")) : e2.removeAttribute("class");
    }
    return "" === t[0] && t.splice(0, 1), t.toggle = function(e3, i) {
      void 0 !== i ? i ? t.add(e3) : t.remove(e3) : -1 !== t.indexOf(e3) ? t.splice(t.indexOf(e3), 1) : t.push(e3), n();
    }, t.add = function() {
      for (var e3 = [].slice.call(arguments), i = 0, s = e3.length; i < s; i++)
        -1 === t.indexOf(e3[i]) && t.push(e3[i]);
      n();
    }, t.remove = function() {
      for (var e3 = [].slice.call(arguments), i = 0, s = e3.length; i < s; i++)
        -1 !== t.indexOf(e3[i]) && t.splice(t.indexOf(e3[i]), 1);
      n();
    }, t.item = function(e3) {
      return t[e3];
    }, t.contains = function(e3) {
      return -1 !== t.indexOf(e3);
    }, t.replace = function(e3, i) {
      -1 !== t.indexOf(e3) && t.splice(t.indexOf(e3), 1, i), n();
    }, t.value = e2.getAttribute("class") || "", t;
  } });
}(Element.prototype);
/*!
DOMTokenList
*/
(function(b) {
  try {
    document.body.classList.add();
  } catch (e) {
    var c = b.add, d = b.remove;
    b.add = function() {
      for (var a = 0; a < arguments.length; a++)
        c.call(this, arguments[a]);
    };
    b.remove = function() {
      for (var a = 0; a < arguments.length; a++)
        d.call(this, arguments[a]);
    };
  }
})(DOMTokenList.prototype);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvamVlcC1zcWxpdGUvZGlzdC9lc20vcG9seWZpbGxzL2RvbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcbiAgLypcbiAgICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAgICBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICAgIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICAgIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gICAgc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAgKi9cbiAgJ3VzZSBzdHJpY3QnO3ZhciBhYT1uZXcgU2V0KFwiYW5ub3RhdGlvbi14bWwgY29sb3ItcHJvZmlsZSBmb250LWZhY2UgZm9udC1mYWNlLXNyYyBmb250LWZhY2UtdXJpIGZvbnQtZmFjZS1mb3JtYXQgZm9udC1mYWNlLW5hbWUgbWlzc2luZy1nbHlwaFwiLnNwbGl0KFwiIFwiKSk7ZnVuY3Rpb24gZyhhKXt2YXIgYj1hYS5oYXMoYSk7YT0vXlthLXpdWy4wLTlfYS16XSotW1xcLS4wLTlfYS16XSokLy50ZXN0KGEpO3JldHVybiFiJiZhfWZ1bmN0aW9uIGwoYSl7dmFyIGI9YS5pc0Nvbm5lY3RlZDtpZih2b2lkIDAhPT1iKXJldHVybiBiO2Zvcig7YSYmIShhLl9fQ0VfaXNJbXBvcnREb2N1bWVudHx8YSBpbnN0YW5jZW9mIERvY3VtZW50KTspYT1hLnBhcmVudE5vZGV8fCh3aW5kb3cuU2hhZG93Um9vdCYmYSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q/YS5ob3N0OnZvaWQgMCk7cmV0dXJuISghYXx8IShhLl9fQ0VfaXNJbXBvcnREb2N1bWVudHx8YSBpbnN0YW5jZW9mIERvY3VtZW50KSl9XG4gIGZ1bmN0aW9uIG4oYSxiKXtmb3IoO2ImJmIhPT1hJiYhYi5uZXh0U2libGluZzspYj1iLnBhcmVudE5vZGU7cmV0dXJuIGImJmIhPT1hP2IubmV4dFNpYmxpbmc6bnVsbH1cbiAgZnVuY3Rpb24gcChhLGIsZCl7ZD12b2lkIDA9PT1kP25ldyBTZXQ6ZDtmb3IodmFyIGM9YTtjOyl7aWYoYy5ub2RlVHlwZT09PU5vZGUuRUxFTUVOVF9OT0RFKXt2YXIgZT1jO2IoZSk7dmFyIGY9ZS5sb2NhbE5hbWU7aWYoXCJsaW5rXCI9PT1mJiZcImltcG9ydFwiPT09ZS5nZXRBdHRyaWJ1dGUoXCJyZWxcIikpe2M9ZS5pbXBvcnQ7aWYoYyBpbnN0YW5jZW9mIE5vZGUmJiFkLmhhcyhjKSlmb3IoZC5hZGQoYyksYz1jLmZpcnN0Q2hpbGQ7YztjPWMubmV4dFNpYmxpbmcpcChjLGIsZCk7Yz1uKGEsZSk7Y29udGludWV9ZWxzZSBpZihcInRlbXBsYXRlXCI9PT1mKXtjPW4oYSxlKTtjb250aW51ZX1pZihlPWUuX19DRV9zaGFkb3dSb290KWZvcihlPWUuZmlyc3RDaGlsZDtlO2U9ZS5uZXh0U2libGluZylwKGUsYixkKX1jPWMuZmlyc3RDaGlsZD9jLmZpcnN0Q2hpbGQ6bihhLGMpfX1mdW5jdGlvbiByKGEsYixkKXthW2JdPWR9O2Z1bmN0aW9uIHUoKXt0aGlzLmE9bmV3IE1hcDt0aGlzLmc9bmV3IE1hcDt0aGlzLmM9W107dGhpcy5mPVtdO3RoaXMuYj0hMX1mdW5jdGlvbiBiYShhLGIsZCl7YS5hLnNldChiLGQpO2EuZy5zZXQoZC5jb25zdHJ1Y3RvckZ1bmN0aW9uLGQpfWZ1bmN0aW9uIGNhKGEsYil7YS5iPSEwO2EuYy5wdXNoKGIpfWZ1bmN0aW9uIGRhKGEsYil7YS5iPSEwO2EuZi5wdXNoKGIpfWZ1bmN0aW9uIHYoYSxiKXthLmImJnAoYixmdW5jdGlvbihiKXtyZXR1cm4gdyhhLGIpfSl9ZnVuY3Rpb24gdyhhLGIpe2lmKGEuYiYmIWIuX19DRV9wYXRjaGVkKXtiLl9fQ0VfcGF0Y2hlZD0hMDtmb3IodmFyIGQ9MDtkPGEuYy5sZW5ndGg7ZCsrKWEuY1tkXShiKTtmb3IoZD0wO2Q8YS5mLmxlbmd0aDtkKyspYS5mW2RdKGIpfX1cbiAgZnVuY3Rpb24geChhLGIpe3ZhciBkPVtdO3AoYixmdW5jdGlvbihiKXtyZXR1cm4gZC5wdXNoKGIpfSk7Zm9yKGI9MDtiPGQubGVuZ3RoO2IrKyl7dmFyIGM9ZFtiXTsxPT09Yy5fX0NFX3N0YXRlP2EuY29ubmVjdGVkQ2FsbGJhY2soYyk6eShhLGMpfX1mdW5jdGlvbiB6KGEsYil7dmFyIGQ9W107cChiLGZ1bmN0aW9uKGIpe3JldHVybiBkLnB1c2goYil9KTtmb3IoYj0wO2I8ZC5sZW5ndGg7YisrKXt2YXIgYz1kW2JdOzE9PT1jLl9fQ0Vfc3RhdGUmJmEuZGlzY29ubmVjdGVkQ2FsbGJhY2soYyl9fVxuICBmdW5jdGlvbiBBKGEsYixkKXtkPXZvaWQgMD09PWQ/e306ZDt2YXIgYz1kLnV8fG5ldyBTZXQsZT1kLml8fGZ1bmN0aW9uKGIpe3JldHVybiB5KGEsYil9LGY9W107cChiLGZ1bmN0aW9uKGIpe2lmKFwibGlua1wiPT09Yi5sb2NhbE5hbWUmJlwiaW1wb3J0XCI9PT1iLmdldEF0dHJpYnV0ZShcInJlbFwiKSl7dmFyIGQ9Yi5pbXBvcnQ7ZCBpbnN0YW5jZW9mIE5vZGUmJihkLl9fQ0VfaXNJbXBvcnREb2N1bWVudD0hMCxkLl9fQ0VfaGFzUmVnaXN0cnk9ITApO2QmJlwiY29tcGxldGVcIj09PWQucmVhZHlTdGF0ZT9kLl9fQ0VfZG9jdW1lbnRMb2FkSGFuZGxlZD0hMDpiLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXt2YXIgZD1iLmltcG9ydDtpZighZC5fX0NFX2RvY3VtZW50TG9hZEhhbmRsZWQpe2QuX19DRV9kb2N1bWVudExvYWRIYW5kbGVkPSEwO3ZhciBmPW5ldyBTZXQoYyk7Zi5kZWxldGUoZCk7QShhLGQse3U6ZixpOmV9KX19KX1lbHNlIGYucHVzaChiKX0sYyk7aWYoYS5iKWZvcihiPVxuICAwO2I8Zi5sZW5ndGg7YisrKXcoYSxmW2JdKTtmb3IoYj0wO2I8Zi5sZW5ndGg7YisrKWUoZltiXSl9XG4gIGZ1bmN0aW9uIHkoYSxiKXtpZih2b2lkIDA9PT1iLl9fQ0Vfc3RhdGUpe3ZhciBkPWIub3duZXJEb2N1bWVudDtpZihkLmRlZmF1bHRWaWV3fHxkLl9fQ0VfaXNJbXBvcnREb2N1bWVudCYmZC5fX0NFX2hhc1JlZ2lzdHJ5KWlmKGQ9YS5hLmdldChiLmxvY2FsTmFtZSkpe2QuY29uc3RydWN0aW9uU3RhY2sucHVzaChiKTt2YXIgYz1kLmNvbnN0cnVjdG9yRnVuY3Rpb247dHJ5e3RyeXtpZihuZXcgYyE9PWIpdGhyb3cgRXJyb3IoXCJUaGUgY3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3IgZGlkIG5vdCBwcm9kdWNlIHRoZSBlbGVtZW50IGJlaW5nIHVwZ3JhZGVkLlwiKTt9ZmluYWxseXtkLmNvbnN0cnVjdGlvblN0YWNrLnBvcCgpfX1jYXRjaCh0KXt0aHJvdyBiLl9fQ0Vfc3RhdGU9Mix0O31iLl9fQ0Vfc3RhdGU9MTtiLl9fQ0VfZGVmaW5pdGlvbj1kO2lmKGQuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKWZvcihkPWQub2JzZXJ2ZWRBdHRyaWJ1dGVzLGM9MDtjPGQubGVuZ3RoO2MrKyl7dmFyIGU9XG4gIGRbY10sZj1iLmdldEF0dHJpYnV0ZShlKTtudWxsIT09ZiYmYS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYixlLG51bGwsZixudWxsKX1sKGIpJiZhLmNvbm5lY3RlZENhbGxiYWNrKGIpfX19dS5wcm90b3R5cGUuY29ubmVjdGVkQ2FsbGJhY2s9ZnVuY3Rpb24oYSl7dmFyIGI9YS5fX0NFX2RlZmluaXRpb247Yi5jb25uZWN0ZWRDYWxsYmFjayYmYi5jb25uZWN0ZWRDYWxsYmFjay5jYWxsKGEpfTt1LnByb3RvdHlwZS5kaXNjb25uZWN0ZWRDYWxsYmFjaz1mdW5jdGlvbihhKXt2YXIgYj1hLl9fQ0VfZGVmaW5pdGlvbjtiLmRpc2Nvbm5lY3RlZENhbGxiYWNrJiZiLmRpc2Nvbm5lY3RlZENhbGxiYWNrLmNhbGwoYSl9O1xuICB1LnByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2s9ZnVuY3Rpb24oYSxiLGQsYyxlKXt2YXIgZj1hLl9fQ0VfZGVmaW5pdGlvbjtmLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayYmLTE8Zi5vYnNlcnZlZEF0dHJpYnV0ZXMuaW5kZXhPZihiKSYmZi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suY2FsbChhLGIsZCxjLGUpfTtmdW5jdGlvbiBCKGEpe3ZhciBiPWRvY3VtZW50O3RoaXMuYz1hO3RoaXMuYT1iO3RoaXMuYj12b2lkIDA7QSh0aGlzLmMsdGhpcy5hKTtcImxvYWRpbmdcIj09PXRoaXMuYS5yZWFkeVN0YXRlJiYodGhpcy5iPW5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuZi5iaW5kKHRoaXMpKSx0aGlzLmIub2JzZXJ2ZSh0aGlzLmEse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSkpfWZ1bmN0aW9uIEMoYSl7YS5iJiZhLmIuZGlzY29ubmVjdCgpfUIucHJvdG90eXBlLmY9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5hLnJlYWR5U3RhdGU7XCJpbnRlcmFjdGl2ZVwiIT09YiYmXCJjb21wbGV0ZVwiIT09Ynx8Qyh0aGlzKTtmb3IoYj0wO2I8YS5sZW5ndGg7YisrKWZvcih2YXIgZD1hW2JdLmFkZGVkTm9kZXMsYz0wO2M8ZC5sZW5ndGg7YysrKUEodGhpcy5jLGRbY10pfTtmdW5jdGlvbiBlYSgpe3ZhciBhPXRoaXM7dGhpcy5iPXRoaXMuYT12b2lkIDA7dGhpcy5jPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGIpe2EuYj1iO2EuYSYmYihhLmEpfSl9ZnVuY3Rpb24gRChhKXtpZihhLmEpdGhyb3cgRXJyb3IoXCJBbHJlYWR5IHJlc29sdmVkLlwiKTthLmE9dm9pZCAwO2EuYiYmYS5iKHZvaWQgMCl9O2Z1bmN0aW9uIEUoYSl7dGhpcy5jPSExO3RoaXMuYT1hO3RoaXMuaj1uZXcgTWFwO3RoaXMuZj1mdW5jdGlvbihiKXtyZXR1cm4gYigpfTt0aGlzLmI9ITE7dGhpcy5nPVtdO3RoaXMubz1uZXcgQihhKX1cbiAgRS5wcm90b3R5cGUubD1mdW5jdGlvbihhLGIpe3ZhciBkPXRoaXM7aWYoIShiIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvcnMgbXVzdCBiZSBmdW5jdGlvbnMuXCIpO2lmKCFnKGEpKXRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSBlbGVtZW50IG5hbWUgJ1wiK2ErXCInIGlzIG5vdCB2YWxpZC5cIik7aWYodGhpcy5hLmEuZ2V0KGEpKXRocm93IEVycm9yKFwiQSBjdXN0b20gZWxlbWVudCB3aXRoIG5hbWUgJ1wiK2ErXCInIGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZC5cIik7aWYodGhpcy5jKXRocm93IEVycm9yKFwiQSBjdXN0b20gZWxlbWVudCBpcyBhbHJlYWR5IGJlaW5nIGRlZmluZWQuXCIpO3RoaXMuYz0hMDt0cnl7dmFyIGM9ZnVuY3Rpb24oYil7dmFyIGE9ZVtiXTtpZih2b2lkIDAhPT1hJiYhKGEgaW5zdGFuY2VvZiBGdW5jdGlvbikpdGhyb3cgRXJyb3IoXCJUaGUgJ1wiK2IrXCInIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7XG4gIHJldHVybiBhfSxlPWIucHJvdG90eXBlO2lmKCEoZSBpbnN0YW5jZW9mIE9iamVjdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoZSBjdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvcidzIHByb3RvdHlwZSBpcyBub3QgYW4gb2JqZWN0LlwiKTt2YXIgZj1jKFwiY29ubmVjdGVkQ2FsbGJhY2tcIik7dmFyIHQ9YyhcImRpc2Nvbm5lY3RlZENhbGxiYWNrXCIpO3ZhciBrPWMoXCJhZG9wdGVkQ2FsbGJhY2tcIik7dmFyIGg9YyhcImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja1wiKTt2YXIgbT1iLm9ic2VydmVkQXR0cmlidXRlc3x8W119Y2F0Y2gocSl7cmV0dXJufWZpbmFsbHl7dGhpcy5jPSExfWI9e2xvY2FsTmFtZTphLGNvbnN0cnVjdG9yRnVuY3Rpb246Yixjb25uZWN0ZWRDYWxsYmFjazpmLGRpc2Nvbm5lY3RlZENhbGxiYWNrOnQsYWRvcHRlZENhbGxiYWNrOmssYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrOmgsb2JzZXJ2ZWRBdHRyaWJ1dGVzOm0sY29uc3RydWN0aW9uU3RhY2s6W119O2JhKHRoaXMuYSxcbiAgYSxiKTt0aGlzLmcucHVzaChiKTt0aGlzLmJ8fCh0aGlzLmI9ITAsdGhpcy5mKGZ1bmN0aW9uKCl7cmV0dXJuIGZhKGQpfSkpfTtFLnByb3RvdHlwZS5pPWZ1bmN0aW9uKGEpe0EodGhpcy5hLGEpfTtcbiAgZnVuY3Rpb24gZmEoYSl7aWYoITEhPT1hLmIpe2EuYj0hMTtmb3IodmFyIGI9YS5nLGQ9W10sYz1uZXcgTWFwLGU9MDtlPGIubGVuZ3RoO2UrKyljLnNldChiW2VdLmxvY2FsTmFtZSxbXSk7QShhLmEsZG9jdW1lbnQse2k6ZnVuY3Rpb24oYil7aWYodm9pZCAwPT09Yi5fX0NFX3N0YXRlKXt2YXIgZT1iLmxvY2FsTmFtZSxmPWMuZ2V0KGUpO2Y/Zi5wdXNoKGIpOmEuYS5hLmdldChlKSYmZC5wdXNoKGIpfX19KTtmb3IoZT0wO2U8ZC5sZW5ndGg7ZSsrKXkoYS5hLGRbZV0pO2Zvcig7MDxiLmxlbmd0aDspe3ZhciBmPWIuc2hpZnQoKTtlPWYubG9jYWxOYW1lO2Y9Yy5nZXQoZi5sb2NhbE5hbWUpO2Zvcih2YXIgdD0wO3Q8Zi5sZW5ndGg7dCsrKXkoYS5hLGZbdF0pOyhlPWEuai5nZXQoZSkpJiZEKGUpfX19RS5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGEpe2lmKGE9dGhpcy5hLmEuZ2V0KGEpKXJldHVybiBhLmNvbnN0cnVjdG9yRnVuY3Rpb259O1xuICBFLnByb3RvdHlwZS5tPWZ1bmN0aW9uKGEpe2lmKCFnKGEpKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgU3ludGF4RXJyb3IoXCInXCIrYStcIicgaXMgbm90IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgbmFtZS5cIikpO3ZhciBiPXRoaXMuai5nZXQoYSk7aWYoYilyZXR1cm4gYi5jO2I9bmV3IGVhO3RoaXMuai5zZXQoYSxiKTt0aGlzLmEuYS5nZXQoYSkmJiF0aGlzLmcuc29tZShmdW5jdGlvbihiKXtyZXR1cm4gYi5sb2NhbE5hbWU9PT1hfSkmJkQoYik7cmV0dXJuIGIuY307RS5wcm90b3R5cGUucz1mdW5jdGlvbihhKXtDKHRoaXMubyk7dmFyIGI9dGhpcy5mO3RoaXMuZj1mdW5jdGlvbihkKXtyZXR1cm4gYShmdW5jdGlvbigpe3JldHVybiBiKGQpfSl9fTt3aW5kb3cuQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5PUU7RS5wcm90b3R5cGUuZGVmaW5lPUUucHJvdG90eXBlLmw7RS5wcm90b3R5cGUudXBncmFkZT1FLnByb3RvdHlwZS5pO0UucHJvdG90eXBlLmdldD1FLnByb3RvdHlwZS5nZXQ7XG4gIEUucHJvdG90eXBlLndoZW5EZWZpbmVkPUUucHJvdG90eXBlLm07RS5wcm90b3R5cGUucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjaz1FLnByb3RvdHlwZS5zO3ZhciBGPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCxHPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudE5TLGhhPXdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuaW1wb3J0Tm9kZSxpYT13aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLnByZXBlbmQsamE9d2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5hcHBlbmQsa2E9d2luZG93LkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLnByZXBlbmQsbGE9d2luZG93LkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmFwcGVuZCxIPXdpbmRvdy5Ob2RlLnByb3RvdHlwZS5jbG9uZU5vZGUsST13aW5kb3cuTm9kZS5wcm90b3R5cGUuYXBwZW5kQ2hpbGQsSj13aW5kb3cuTm9kZS5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlLEs9d2luZG93Lk5vZGUucHJvdG90eXBlLnJlbW92ZUNoaWxkLEw9d2luZG93Lk5vZGUucHJvdG90eXBlLnJlcGxhY2VDaGlsZCxNPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93Lk5vZGUucHJvdG90eXBlLFxuICBcInRleHRDb250ZW50XCIpLE49d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdyxPPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkVsZW1lbnQucHJvdG90eXBlLFwiaW5uZXJIVE1MXCIpLFA9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZSxRPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUsUj13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlLFM9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZU5TLFQ9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZU5TLFU9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5TLG1hPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5pbnNlcnRBZGphY2VudEVsZW1lbnQsbmE9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmluc2VydEFkamFjZW50SFRNTCxvYT13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucHJlcGVuZCxcbiAgcGE9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmFwcGVuZCxWPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5iZWZvcmUscWE9d2luZG93LkVsZW1lbnQucHJvdG90eXBlLmFmdGVyLHJhPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5yZXBsYWNlV2l0aCxzYT13aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlLHRhPXdpbmRvdy5IVE1MRWxlbWVudCxXPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZSxcImlubmVySFRNTFwiKSx1YT13aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLmluc2VydEFkamFjZW50RWxlbWVudCx2YT13aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLmluc2VydEFkamFjZW50SFRNTDt2YXIgd2E9bmV3IGZ1bmN0aW9uKCl7fTtmdW5jdGlvbiB4YSgpe3ZhciBhPVg7d2luZG93LkhUTUxFbGVtZW50PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYigpe3ZhciBiPXRoaXMuY29uc3RydWN0b3IsYz1hLmcuZ2V0KGIpO2lmKCFjKXRocm93IEVycm9yKFwiVGhlIGN1c3RvbSBlbGVtZW50IGJlaW5nIGNvbnN0cnVjdGVkIHdhcyBub3QgcmVnaXN0ZXJlZCB3aXRoIGBjdXN0b21FbGVtZW50c2AuXCIpO3ZhciBlPWMuY29uc3RydWN0aW9uU3RhY2s7aWYoMD09PWUubGVuZ3RoKXJldHVybiBlPUYuY2FsbChkb2N1bWVudCxjLmxvY2FsTmFtZSksT2JqZWN0LnNldFByb3RvdHlwZU9mKGUsYi5wcm90b3R5cGUpLGUuX19DRV9zdGF0ZT0xLGUuX19DRV9kZWZpbml0aW9uPWMsdyhhLGUpLGU7Yz1lLmxlbmd0aC0xO3ZhciBmPWVbY107aWYoZj09PXdhKXRocm93IEVycm9yKFwiVGhlIEhUTUxFbGVtZW50IGNvbnN0cnVjdG9yIHdhcyBlaXRoZXIgY2FsbGVkIHJlZW50cmFudGx5IGZvciB0aGlzIGNvbnN0cnVjdG9yIG9yIGNhbGxlZCBtdWx0aXBsZSB0aW1lcy5cIik7XG4gIGVbY109d2E7T2JqZWN0LnNldFByb3RvdHlwZU9mKGYsYi5wcm90b3R5cGUpO3coYSxmKTtyZXR1cm4gZn1iLnByb3RvdHlwZT10YS5wcm90b3R5cGU7T2JqZWN0LmRlZmluZVByb3BlcnR5KGIucHJvdG90eXBlLFwiY29uc3RydWN0b3JcIix7d3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITEsdmFsdWU6Yn0pO3JldHVybiBifSgpfTtmdW5jdGlvbiBZKGEsYixkKXtmdW5jdGlvbiBjKGIpe3JldHVybiBmdW5jdGlvbihkKXtmb3IodmFyIGU9W10sYz0wO2M8YXJndW1lbnRzLmxlbmd0aDsrK2MpZVtjXT1hcmd1bWVudHNbY107Yz1bXTtmb3IodmFyIGY9W10sbT0wO208ZS5sZW5ndGg7bSsrKXt2YXIgcT1lW21dO3EgaW5zdGFuY2VvZiBFbGVtZW50JiZsKHEpJiZmLnB1c2gocSk7aWYocSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKHE9cS5maXJzdENoaWxkO3E7cT1xLm5leHRTaWJsaW5nKWMucHVzaChxKTtlbHNlIGMucHVzaChxKX1iLmFwcGx5KHRoaXMsZSk7Zm9yKGU9MDtlPGYubGVuZ3RoO2UrKyl6KGEsZltlXSk7aWYobCh0aGlzKSlmb3IoZT0wO2U8Yy5sZW5ndGg7ZSsrKWY9Y1tlXSxmIGluc3RhbmNlb2YgRWxlbWVudCYmeChhLGYpfX12b2lkIDAhPT1kLmgmJihiLnByZXBlbmQ9YyhkLmgpKTt2b2lkIDAhPT1kLmFwcGVuZCYmKGIuYXBwZW5kPWMoZC5hcHBlbmQpKX07ZnVuY3Rpb24geWEoKXt2YXIgYT1YO3IoRG9jdW1lbnQucHJvdG90eXBlLFwiY3JlYXRlRWxlbWVudFwiLGZ1bmN0aW9uKGIpe2lmKHRoaXMuX19DRV9oYXNSZWdpc3RyeSl7dmFyIGQ9YS5hLmdldChiKTtpZihkKXJldHVybiBuZXcgZC5jb25zdHJ1Y3RvckZ1bmN0aW9ufWI9Ri5jYWxsKHRoaXMsYik7dyhhLGIpO3JldHVybiBifSk7cihEb2N1bWVudC5wcm90b3R5cGUsXCJpbXBvcnROb2RlXCIsZnVuY3Rpb24oYixkKXtiPWhhLmNhbGwodGhpcyxiLCEhZCk7dGhpcy5fX0NFX2hhc1JlZ2lzdHJ5P0EoYSxiKTp2KGEsYik7cmV0dXJuIGJ9KTtyKERvY3VtZW50LnByb3RvdHlwZSxcImNyZWF0ZUVsZW1lbnROU1wiLGZ1bmN0aW9uKGIsZCl7aWYodGhpcy5fX0NFX2hhc1JlZ2lzdHJ5JiYobnVsbD09PWJ8fFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPT09Yikpe3ZhciBjPWEuYS5nZXQoZCk7aWYoYylyZXR1cm4gbmV3IGMuY29uc3RydWN0b3JGdW5jdGlvbn1iPUcuY2FsbCh0aGlzLGIsXG4gIGQpO3coYSxiKTtyZXR1cm4gYn0pO1koYSxEb2N1bWVudC5wcm90b3R5cGUse2g6aWEsYXBwZW5kOmphfSl9O2Z1bmN0aW9uIHphKCl7ZnVuY3Rpb24gYShhLGMpe09iamVjdC5kZWZpbmVQcm9wZXJ0eShhLFwidGV4dENvbnRlbnRcIix7ZW51bWVyYWJsZTpjLmVudW1lcmFibGUsY29uZmlndXJhYmxlOiEwLGdldDpjLmdldCxzZXQ6ZnVuY3Rpb24oYSl7aWYodGhpcy5ub2RlVHlwZT09PU5vZGUuVEVYVF9OT0RFKWMuc2V0LmNhbGwodGhpcyxhKTtlbHNle3ZhciBkPXZvaWQgMDtpZih0aGlzLmZpcnN0Q2hpbGQpe3ZhciBlPXRoaXMuY2hpbGROb2RlcyxrPWUubGVuZ3RoO2lmKDA8ayYmbCh0aGlzKSl7ZD1BcnJheShrKTtmb3IodmFyIGg9MDtoPGs7aCsrKWRbaF09ZVtoXX19Yy5zZXQuY2FsbCh0aGlzLGEpO2lmKGQpZm9yKGE9MDthPGQubGVuZ3RoO2ErKyl6KGIsZFthXSl9fX0pfXZhciBiPVg7cihOb2RlLnByb3RvdHlwZSxcImluc2VydEJlZm9yZVwiLGZ1bmN0aW9uKGEsYyl7aWYoYSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpe3ZhciBlPUFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhLmNoaWxkTm9kZXMpO1xuICBhPUouY2FsbCh0aGlzLGEsYyk7aWYobCh0aGlzKSlmb3IoYz0wO2M8ZS5sZW5ndGg7YysrKXgoYixlW2NdKTtyZXR1cm4gYX1lPWwoYSk7Yz1KLmNhbGwodGhpcyxhLGMpO2UmJnooYixhKTtsKHRoaXMpJiZ4KGIsYSk7cmV0dXJuIGN9KTtyKE5vZGUucHJvdG90eXBlLFwiYXBwZW5kQ2hpbGRcIixmdW5jdGlvbihhKXtpZihhIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGEuY2hpbGROb2Rlcyk7YT1JLmNhbGwodGhpcyxhKTtpZihsKHRoaXMpKWZvcih2YXIgZT0wO2U8Yy5sZW5ndGg7ZSsrKXgoYixjW2VdKTtyZXR1cm4gYX1jPWwoYSk7ZT1JLmNhbGwodGhpcyxhKTtjJiZ6KGIsYSk7bCh0aGlzKSYmeChiLGEpO3JldHVybiBlfSk7cihOb2RlLnByb3RvdHlwZSxcImNsb25lTm9kZVwiLGZ1bmN0aW9uKGEpe2E9SC5jYWxsKHRoaXMsISFhKTt0aGlzLm93bmVyRG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT9BKGIsYSk6dihiLFxuICBhKTtyZXR1cm4gYX0pO3IoTm9kZS5wcm90b3R5cGUsXCJyZW1vdmVDaGlsZFwiLGZ1bmN0aW9uKGEpe3ZhciBjPWwoYSksZT1LLmNhbGwodGhpcyxhKTtjJiZ6KGIsYSk7cmV0dXJuIGV9KTtyKE5vZGUucHJvdG90eXBlLFwicmVwbGFjZUNoaWxkXCIsZnVuY3Rpb24oYSxjKXtpZihhIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGEuY2hpbGROb2Rlcyk7YT1MLmNhbGwodGhpcyxhLGMpO2lmKGwodGhpcykpZm9yKHooYixjKSxjPTA7YzxlLmxlbmd0aDtjKyspeChiLGVbY10pO3JldHVybiBhfWU9bChhKTt2YXIgZj1MLmNhbGwodGhpcyxhLGMpLGQ9bCh0aGlzKTtkJiZ6KGIsYyk7ZSYmeihiLGEpO2QmJngoYixhKTtyZXR1cm4gZn0pO00mJk0uZ2V0P2EoTm9kZS5wcm90b3R5cGUsTSk6Y2EoYixmdW5jdGlvbihiKXthKGIse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxcbiAgYj0wO2I8dGhpcy5jaGlsZE5vZGVzLmxlbmd0aDtiKyspe3ZhciBmPXRoaXMuY2hpbGROb2Rlc1tiXTtmLm5vZGVUeXBlIT09Tm9kZS5DT01NRU5UX05PREUmJmEucHVzaChmLnRleHRDb250ZW50KX1yZXR1cm4gYS5qb2luKFwiXCIpfSxzZXQ6ZnVuY3Rpb24oYSl7Zm9yKDt0aGlzLmZpcnN0Q2hpbGQ7KUsuY2FsbCh0aGlzLHRoaXMuZmlyc3RDaGlsZCk7bnVsbCE9YSYmXCJcIiE9PWEmJkkuY2FsbCh0aGlzLGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGEpKX19KX0pfTtmdW5jdGlvbiBBYShhKXtmdW5jdGlvbiBiKGIpe3JldHVybiBmdW5jdGlvbihlKXtmb3IodmFyIGM9W10sZD0wO2Q8YXJndW1lbnRzLmxlbmd0aDsrK2QpY1tkXT1hcmd1bWVudHNbZF07ZD1bXTtmb3IodmFyIGs9W10saD0wO2g8Yy5sZW5ndGg7aCsrKXt2YXIgbT1jW2hdO20gaW5zdGFuY2VvZiBFbGVtZW50JiZsKG0pJiZrLnB1c2gobSk7aWYobSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKG09bS5maXJzdENoaWxkO207bT1tLm5leHRTaWJsaW5nKWQucHVzaChtKTtlbHNlIGQucHVzaChtKX1iLmFwcGx5KHRoaXMsYyk7Zm9yKGM9MDtjPGsubGVuZ3RoO2MrKyl6KGEsa1tjXSk7aWYobCh0aGlzKSlmb3IoYz0wO2M8ZC5sZW5ndGg7YysrKWs9ZFtjXSxrIGluc3RhbmNlb2YgRWxlbWVudCYmeChhLGspfX12YXIgZD1FbGVtZW50LnByb3RvdHlwZTt2b2lkIDAhPT1WJiYoZC5iZWZvcmU9YihWKSk7dm9pZCAwIT09ViYmKGQuYWZ0ZXI9YihxYSkpO3ZvaWQgMCE9PXJhJiZcbiAgcihkLFwicmVwbGFjZVdpdGhcIixmdW5jdGlvbihiKXtmb3IodmFyIGU9W10sYz0wO2M8YXJndW1lbnRzLmxlbmd0aDsrK2MpZVtjXT1hcmd1bWVudHNbY107Yz1bXTtmb3IodmFyIGQ9W10saz0wO2s8ZS5sZW5ndGg7aysrKXt2YXIgaD1lW2tdO2ggaW5zdGFuY2VvZiBFbGVtZW50JiZsKGgpJiZkLnB1c2goaCk7aWYoaCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpZm9yKGg9aC5maXJzdENoaWxkO2g7aD1oLm5leHRTaWJsaW5nKWMucHVzaChoKTtlbHNlIGMucHVzaChoKX1rPWwodGhpcyk7cmEuYXBwbHkodGhpcyxlKTtmb3IoZT0wO2U8ZC5sZW5ndGg7ZSsrKXooYSxkW2VdKTtpZihrKWZvcih6KGEsdGhpcyksZT0wO2U8Yy5sZW5ndGg7ZSsrKWQ9Y1tlXSxkIGluc3RhbmNlb2YgRWxlbWVudCYmeChhLGQpfSk7dm9pZCAwIT09c2EmJnIoZCxcInJlbW92ZVwiLGZ1bmN0aW9uKCl7dmFyIGI9bCh0aGlzKTtzYS5jYWxsKHRoaXMpO2ImJnooYSx0aGlzKX0pfTtmdW5jdGlvbiBCYSgpe2Z1bmN0aW9uIGEoYSxiKXtPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcImlubmVySFRNTFwiLHtlbnVtZXJhYmxlOmIuZW51bWVyYWJsZSxjb25maWd1cmFibGU6ITAsZ2V0OmIuZ2V0LHNldDpmdW5jdGlvbihhKXt2YXIgZT10aGlzLGQ9dm9pZCAwO2wodGhpcykmJihkPVtdLHAodGhpcyxmdW5jdGlvbihhKXthIT09ZSYmZC5wdXNoKGEpfSkpO2Iuc2V0LmNhbGwodGhpcyxhKTtpZihkKWZvcih2YXIgZj0wO2Y8ZC5sZW5ndGg7ZisrKXt2YXIgdD1kW2ZdOzE9PT10Ll9fQ0Vfc3RhdGUmJmMuZGlzY29ubmVjdGVkQ2FsbGJhY2sodCl9dGhpcy5vd25lckRvY3VtZW50Ll9fQ0VfaGFzUmVnaXN0cnk/QShjLHRoaXMpOnYoYyx0aGlzKTtyZXR1cm4gYX19KX1mdW5jdGlvbiBiKGEsYil7cihhLFwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50XCIsZnVuY3Rpb24oYSxlKXt2YXIgZD1sKGUpO2E9Yi5jYWxsKHRoaXMsYSxlKTtkJiZ6KGMsZSk7bChhKSYmeChjLGUpO3JldHVybiBhfSl9XG4gIGZ1bmN0aW9uIGQoYSxiKXtmdW5jdGlvbiBlKGEsYil7Zm9yKHZhciBlPVtdO2EhPT1iO2E9YS5uZXh0U2libGluZyllLnB1c2goYSk7Zm9yKGI9MDtiPGUubGVuZ3RoO2IrKylBKGMsZVtiXSl9cihhLFwiaW5zZXJ0QWRqYWNlbnRIVE1MXCIsZnVuY3Rpb24oYSxjKXthPWEudG9Mb3dlckNhc2UoKTtpZihcImJlZm9yZWJlZ2luXCI9PT1hKXt2YXIgZD10aGlzLnByZXZpb3VzU2libGluZztiLmNhbGwodGhpcyxhLGMpO2UoZHx8dGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQsdGhpcyl9ZWxzZSBpZihcImFmdGVyYmVnaW5cIj09PWEpZD10aGlzLmZpcnN0Q2hpbGQsYi5jYWxsKHRoaXMsYSxjKSxlKHRoaXMuZmlyc3RDaGlsZCxkKTtlbHNlIGlmKFwiYmVmb3JlZW5kXCI9PT1hKWQ9dGhpcy5sYXN0Q2hpbGQsYi5jYWxsKHRoaXMsYSxjKSxlKGR8fHRoaXMuZmlyc3RDaGlsZCxudWxsKTtlbHNlIGlmKFwiYWZ0ZXJlbmRcIj09PWEpZD10aGlzLm5leHRTaWJsaW5nLGIuY2FsbCh0aGlzLGEsYyksZSh0aGlzLm5leHRTaWJsaW5nLFxuICBkKTtlbHNlIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRoZSB2YWx1ZSBwcm92aWRlZCAoXCIrU3RyaW5nKGEpK1wiKSBpcyBub3Qgb25lIG9mICdiZWZvcmViZWdpbicsICdhZnRlcmJlZ2luJywgJ2JlZm9yZWVuZCcsIG9yICdhZnRlcmVuZCcuXCIpO30pfXZhciBjPVg7TiYmcihFbGVtZW50LnByb3RvdHlwZSxcImF0dGFjaFNoYWRvd1wiLGZ1bmN0aW9uKGEpe2E9Ti5jYWxsKHRoaXMsYSk7dmFyIGI9YztpZihiLmImJiFhLl9fQ0VfcGF0Y2hlZCl7YS5fX0NFX3BhdGNoZWQ9ITA7Zm9yKHZhciBlPTA7ZTxiLmMubGVuZ3RoO2UrKyliLmNbZV0oYSl9cmV0dXJuIHRoaXMuX19DRV9zaGFkb3dSb290PWF9KTtPJiZPLmdldD9hKEVsZW1lbnQucHJvdG90eXBlLE8pOlcmJlcuZ2V0P2EoSFRNTEVsZW1lbnQucHJvdG90eXBlLFcpOmRhKGMsZnVuY3Rpb24oYil7YShiLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gSC5jYWxsKHRoaXMsITApLmlubmVySFRNTH0sXG4gIHNldDpmdW5jdGlvbihhKXt2YXIgYj1cInRlbXBsYXRlXCI9PT10aGlzLmxvY2FsTmFtZSxjPWI/dGhpcy5jb250ZW50OnRoaXMsZT1HLmNhbGwoZG9jdW1lbnQsdGhpcy5uYW1lc3BhY2VVUkksdGhpcy5sb2NhbE5hbWUpO2ZvcihlLmlubmVySFRNTD1hOzA8Yy5jaGlsZE5vZGVzLmxlbmd0aDspSy5jYWxsKGMsYy5jaGlsZE5vZGVzWzBdKTtmb3IoYT1iP2UuY29udGVudDplOzA8YS5jaGlsZE5vZGVzLmxlbmd0aDspSS5jYWxsKGMsYS5jaGlsZE5vZGVzWzBdKX19KX0pO3IoRWxlbWVudC5wcm90b3R5cGUsXCJzZXRBdHRyaWJ1dGVcIixmdW5jdGlvbihhLGIpe2lmKDEhPT10aGlzLl9fQ0Vfc3RhdGUpcmV0dXJuIFEuY2FsbCh0aGlzLGEsYik7dmFyIGU9UC5jYWxsKHRoaXMsYSk7US5jYWxsKHRoaXMsYSxiKTtiPVAuY2FsbCh0aGlzLGEpO2MuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsYSxlLGIsbnVsbCl9KTtyKEVsZW1lbnQucHJvdG90eXBlLFwic2V0QXR0cmlidXRlTlNcIixmdW5jdGlvbihhLFxuICBiLGQpe2lmKDEhPT10aGlzLl9fQ0Vfc3RhdGUpcmV0dXJuIFQuY2FsbCh0aGlzLGEsYixkKTt2YXIgZT1TLmNhbGwodGhpcyxhLGIpO1QuY2FsbCh0aGlzLGEsYixkKTtkPVMuY2FsbCh0aGlzLGEsYik7Yy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodGhpcyxiLGUsZCxhKX0pO3IoRWxlbWVudC5wcm90b3R5cGUsXCJyZW1vdmVBdHRyaWJ1dGVcIixmdW5jdGlvbihhKXtpZigxIT09dGhpcy5fX0NFX3N0YXRlKXJldHVybiBSLmNhbGwodGhpcyxhKTt2YXIgYj1QLmNhbGwodGhpcyxhKTtSLmNhbGwodGhpcyxhKTtudWxsIT09YiYmYy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sodGhpcyxhLGIsbnVsbCxudWxsKX0pO3IoRWxlbWVudC5wcm90b3R5cGUsXCJyZW1vdmVBdHRyaWJ1dGVOU1wiLGZ1bmN0aW9uKGEsYil7aWYoMSE9PXRoaXMuX19DRV9zdGF0ZSlyZXR1cm4gVS5jYWxsKHRoaXMsYSxiKTt2YXIgZD1TLmNhbGwodGhpcyxhLGIpO1UuY2FsbCh0aGlzLGEsYik7dmFyIGU9Uy5jYWxsKHRoaXMsXG4gIGEsYik7ZCE9PWUmJmMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsYixkLGUsYSl9KTt1YT9iKEhUTUxFbGVtZW50LnByb3RvdHlwZSx1YSk6bWE/YihFbGVtZW50LnByb3RvdHlwZSxtYSk6Y29uc29sZS53YXJuKFwiQ3VzdG9tIEVsZW1lbnRzOiBgRWxlbWVudCNpbnNlcnRBZGphY2VudEVsZW1lbnRgIHdhcyBub3QgcGF0Y2hlZC5cIik7dmE/ZChIVE1MRWxlbWVudC5wcm90b3R5cGUsdmEpOm5hP2QoRWxlbWVudC5wcm90b3R5cGUsbmEpOmNvbnNvbGUud2FybihcIkN1c3RvbSBFbGVtZW50czogYEVsZW1lbnQjaW5zZXJ0QWRqYWNlbnRIVE1MYCB3YXMgbm90IHBhdGNoZWQuXCIpO1koYyxFbGVtZW50LnByb3RvdHlwZSx7aDpvYSxhcHBlbmQ6cGF9KTtBYShjKX07dmFyIFo9d2luZG93LmN1c3RvbUVsZW1lbnRzO2lmKCFafHxaLmZvcmNlUG9seWZpbGx8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIFouZGVmaW5lfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBaLmdldCl7dmFyIFg9bmV3IHU7eGEoKTt5YSgpO1koWCxEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZSx7aDprYSxhcHBlbmQ6bGF9KTt6YSgpO0JhKCk7ZG9jdW1lbnQuX19DRV9oYXNSZWdpc3RyeT0hMDt2YXIgY3VzdG9tRWxlbWVudHM9bmV3IEUoWCk7T2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdyxcImN1c3RvbUVsZW1lbnRzXCIse2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLHZhbHVlOmN1c3RvbUVsZW1lbnRzfSl9O1xufSkuY2FsbChzZWxmKTtcblxuLy8gUG9seWZpbGwgZG9jdW1lbnQuYmFzZVVSSVxuXCJzdHJpbmdcIiE9PXR5cGVvZiBkb2N1bWVudC5iYXNlVVJJJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoRG9jdW1lbnQucHJvdG90eXBlLFwiYmFzZVVSSVwiLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXt2YXIgYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYmFzZVwiKTtyZXR1cm4gYSYmYS5ocmVmP2EuaHJlZjpkb2N1bWVudC5VUkx9fSk7XG5cbi8vIFBvbHlmaWxsIEN1c3RvbUV2ZW50XG5cImZ1bmN0aW9uXCIhPT10eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50JiYod2luZG93LkN1c3RvbUV2ZW50PWZ1bmN0aW9uKGMsYSl7YT1hfHx7YnViYmxlczohMSxjYW5jZWxhYmxlOiExLGRldGFpbDp2b2lkIDB9O3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7Yi5pbml0Q3VzdG9tRXZlbnQoYyxhLmJ1YmJsZXMsYS5jYW5jZWxhYmxlLGEuZGV0YWlsKTtyZXR1cm4gYn0sd2luZG93LkN1c3RvbUV2ZW50LnByb3RvdHlwZT13aW5kb3cuRXZlbnQucHJvdG90eXBlKTtcblxuLy8gRXZlbnQuY29tcG9zZWRQYXRoXG4oZnVuY3Rpb24oYixjLGQpe2IuY29tcG9zZWRQYXRofHwoYi5jb21wb3NlZFBhdGg9ZnVuY3Rpb24oKXtpZih0aGlzLnBhdGgpcmV0dXJuIHRoaXMucGF0aDt2YXIgYT10aGlzLnRhcmdldDtmb3IodGhpcy5wYXRoPVtdO251bGwhPT1hLnBhcmVudE5vZGU7KXRoaXMucGF0aC5wdXNoKGEpLGE9YS5wYXJlbnROb2RlO3RoaXMucGF0aC5wdXNoKGMsZCk7cmV0dXJuIHRoaXMucGF0aH0pfSkoRXZlbnQucHJvdG90eXBlLGRvY3VtZW50LHdpbmRvdyk7XG5cbi8qIVxuRWxlbWVudC5jbG9zZXN0IGFuZCBFbGVtZW50Lm1hdGNoZXNcbmh0dHBzOi8vZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcbkNyZWF0aXZlIENvbW1vbnMgWmVybyB2MS4wIFVuaXZlcnNhbFxuKi9cbihmdW5jdGlvbihhKXtcImZ1bmN0aW9uXCIhPT10eXBlb2YgYS5tYXRjaGVzJiYoYS5tYXRjaGVzPWEubXNNYXRjaGVzU2VsZWN0b3J8fGEubW96TWF0Y2hlc1NlbGVjdG9yfHxhLndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8ZnVuY3Rpb24oYSl7YT0odGhpcy5kb2N1bWVudHx8dGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKGEpO2Zvcih2YXIgYj0wO2FbYl0mJmFbYl0hPT10aGlzOykrK2I7cmV0dXJuISFhW2JdfSk7XCJmdW5jdGlvblwiIT09dHlwZW9mIGEuY2xvc2VzdCYmKGEuY2xvc2VzdD1mdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcztiJiYxPT09Yi5ub2RlVHlwZTspe2lmKGIubWF0Y2hlcyhhKSlyZXR1cm4gYjtiPWIucGFyZW50Tm9kZX1yZXR1cm4gbnVsbH0pfSkod2luZG93LkVsZW1lbnQucHJvdG90eXBlKTtcblxuLyohXG5FbGVtZW50LmdldFJvb3ROb2RlKClcbiovXG4oZnVuY3Rpb24oYyl7ZnVuY3Rpb24gZChhKXthPWIoYSk7cmV0dXJuIGEmJjExPT09YS5ub2RlVHlwZT9kKGEuaG9zdCk6YX1mdW5jdGlvbiBiKGEpe3JldHVybiBhJiZhLnBhcmVudE5vZGU/YihhLnBhcmVudE5vZGUpOmF9XCJmdW5jdGlvblwiIT09dHlwZW9mIGMuZ2V0Um9vdE5vZGUmJihjLmdldFJvb3ROb2RlPWZ1bmN0aW9uKGEpe3JldHVybiBhJiZhLmNvbXBvc2VkP2QodGhpcyk6Yih0aGlzKX0pfSkoRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKiFcbkVsZW1lbnQuaXNDb25uZWN0ZWQoKVxuKi9cbihmdW5jdGlvbihhKXtcImlzQ29ubmVjdGVkXCJpbiBhfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcImlzQ29ubmVjdGVkXCIse2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2V0Um9vdE5vZGUoe2NvbXBvc2VkOiEwfSk7cmV0dXJuIGEmJjk9PT1hLm5vZGVUeXBlfX0pfSkoRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKiFcbkVsZW1lbnQucmVtb3ZlKClcbiovXG4oZnVuY3Rpb24oYil7Yi5mb3JFYWNoKGZ1bmN0aW9uKGEpe2EuaGFzT3duUHJvcGVydHkoXCJyZW1vdmVcIil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLFwicmVtb3ZlXCIse2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmZ1bmN0aW9uKCl7bnVsbCE9PXRoaXMucGFyZW50Tm9kZSYmdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpfX0pfSl9KShbRWxlbWVudC5wcm90b3R5cGUsQ2hhcmFjdGVyRGF0YS5wcm90b3R5cGUsRG9jdW1lbnRUeXBlLnByb3RvdHlwZV0pO1xuXG4vKiFcbkVsZW1lbnQuY2xhc3NMaXN0XG4qL1xuIWZ1bmN0aW9uKGUpeydjbGFzc0xpc3QnaW4gZXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJjbGFzc0xpc3RcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PShlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKS5yZXBsYWNlKC9eXFxzK3xcXHMkL2csXCJcIikuc3BsaXQoL1xccysvZyk7ZnVuY3Rpb24gbigpe3QubGVuZ3RoPjA/ZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLHQuam9pbihcIiBcIikpOmUucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIil9cmV0dXJuXCJcIj09PXRbMF0mJnQuc3BsaWNlKDAsMSksdC50b2dnbGU9ZnVuY3Rpb24oZSxpKXt2b2lkIDAhPT1pP2k/dC5hZGQoZSk6dC5yZW1vdmUoZSk6LTEhPT10LmluZGV4T2YoZSk/dC5zcGxpY2UodC5pbmRleE9mKGUpLDEpOnQucHVzaChlKSxuKCl9LHQuYWRkPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxpPTAscz1lLmxlbmd0aDtpPHM7aSsrKS0xPT09dC5pbmRleE9mKGVbaV0pJiZ0LnB1c2goZVtpXSk7bigpfSx0LnJlbW92ZT1mdW5jdGlvbigpe2Zvcih2YXIgZT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cyksaT0wLHM9ZS5sZW5ndGg7aTxzO2krKyktMSE9PXQuaW5kZXhPZihlW2ldKSYmdC5zcGxpY2UodC5pbmRleE9mKGVbaV0pLDEpO24oKX0sdC5pdGVtPWZ1bmN0aW9uKGUpe3JldHVybiB0W2VdfSx0LmNvbnRhaW5zPWZ1bmN0aW9uKGUpe3JldHVybi0xIT09dC5pbmRleE9mKGUpfSx0LnJlcGxhY2U9ZnVuY3Rpb24oZSxpKXstMSE9PXQuaW5kZXhPZihlKSYmdC5zcGxpY2UodC5pbmRleE9mKGUpLDEsaSksbigpfSx0LnZhbHVlPWUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCIsdH19KX0oRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKiFcbkRPTVRva2VuTGlzdFxuKi9cbihmdW5jdGlvbihiKXt0cnl7ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCl9Y2F0Y2goZSl7dmFyIGM9Yi5hZGQsZD1iLnJlbW92ZTtiLmFkZD1mdW5jdGlvbigpe2Zvcih2YXIgYT0wO2E8YXJndW1lbnRzLmxlbmd0aDthKyspYy5jYWxsKHRoaXMsYXJndW1lbnRzW2FdKX07Yi5yZW1vdmU9ZnVuY3Rpb24oKXtmb3IodmFyIGE9MDthPGFyZ3VtZW50cy5sZW5ndGg7YSsrKWQuY2FsbCh0aGlzLGFyZ3VtZW50c1thXSl9fX0pKERPTVRva2VuTGlzdC5wcm90b3R5cGUpO1xuIl0sIm5hbWVzIjpbImIiLCJkIiwiZiIsImEiLCJlIiwiYyJdLCJtYXBwaW5ncyI6IkNBQUMsV0FBVTtBQVNJLE1BQUksS0FBRyxJQUFJLElBQUksbUhBQW1ILE1BQU0sR0FBRyxDQUFDO0FBQUUsV0FBUyxFQUFFLEdBQUU7QUFBQyxRQUFJLElBQUUsR0FBRyxJQUFJLENBQUM7QUFBRSxRQUFFLG1DQUFtQyxLQUFLLENBQUM7QUFBRSxXQUFNLENBQUMsS0FBRztBQUFBLEVBQUM7QUFBQyxXQUFTLEVBQUUsR0FBRTtBQUFDLFFBQUksSUFBRSxFQUFFO0FBQVksUUFBRyxXQUFTO0FBQUUsYUFBTztBQUFFLFdBQUssS0FBRyxFQUFFLEVBQUUseUJBQXVCLGFBQWE7QUFBVyxVQUFFLEVBQUUsZUFBYSxPQUFPLGNBQVksYUFBYSxhQUFXLEVBQUUsT0FBSztBQUFRLFdBQU0sRUFBRSxDQUFDLEtBQUcsRUFBRSxFQUFFLHlCQUF1QixhQUFhO0FBQUEsRUFBVTtBQUMvZSxXQUFTLEVBQUUsR0FBRSxHQUFFO0FBQUMsV0FBSyxLQUFHLE1BQUksS0FBRyxDQUFDLEVBQUU7QUFBYSxVQUFFLEVBQUU7QUFBVyxXQUFPLEtBQUcsTUFBSSxJQUFFLEVBQUUsY0FBWTtBQUFBLEVBQUk7QUFDaEcsV0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsUUFBRSxXQUFTLElBQUUsb0JBQUksUUFBSTtBQUFFLGFBQVEsSUFBRSxHQUFFLEtBQUc7QUFBQyxVQUFHLEVBQUUsYUFBVyxLQUFLLGNBQWE7QUFBQyxZQUFJLElBQUU7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsRUFBRTtBQUFVLFlBQUcsV0FBUyxLQUFHLGFBQVcsRUFBRSxhQUFhLEtBQUssR0FBRTtBQUFDLGNBQUUsRUFBRTtBQUFPLGNBQUcsYUFBYSxRQUFNLENBQUMsRUFBRSxJQUFJLENBQUM7QUFBRSxpQkFBSSxFQUFFLElBQUksQ0FBQyxHQUFFLElBQUUsRUFBRSxZQUFXLEdBQUUsSUFBRSxFQUFFO0FBQVksZ0JBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxjQUFFLEVBQUUsR0FBRSxDQUFDO0FBQUU7QUFBQSxRQUFRLFdBQVMsZUFBYSxHQUFFO0FBQUMsY0FBRSxFQUFFLEdBQUUsQ0FBQztBQUFFO0FBQUEsUUFBUTtBQUFDLFlBQUcsSUFBRSxFQUFFO0FBQWdCLGVBQUksSUFBRSxFQUFFLFlBQVcsR0FBRSxJQUFFLEVBQUU7QUFBWSxjQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsTUFBQztBQUFDLFVBQUUsRUFBRSxhQUFXLEVBQUUsYUFBVyxFQUFFLEdBQUUsQ0FBQztBQUFBLElBQUM7QUFBQSxFQUFDO0FBQUMsV0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsTUFBRSxLQUFHO0FBQUEsRUFBQztBQUFFLFdBQVMsSUFBRztBQUFDLFNBQUssSUFBRSxvQkFBSTtBQUFJLFNBQUssSUFBRSxvQkFBSTtBQUFJLFNBQUssSUFBRSxDQUFFO0FBQUMsU0FBSyxJQUFFLENBQUE7QUFBRyxTQUFLLElBQUU7QUFBQSxFQUFFO0FBQUMsV0FBUyxHQUFHLEdBQUUsR0FBRSxHQUFFO0FBQUMsTUFBRSxFQUFFLElBQUksR0FBRSxDQUFDO0FBQUUsTUFBRSxFQUFFLElBQUksRUFBRSxxQkFBb0IsQ0FBQztBQUFBLEVBQUM7QUFBQyxXQUFTLEdBQUcsR0FBRSxHQUFFO0FBQUMsTUFBRSxJQUFFO0FBQUcsTUFBRSxFQUFFLEtBQUssQ0FBQztBQUFBLEVBQUM7QUFBQyxXQUFTLEdBQUcsR0FBRSxHQUFFO0FBQUMsTUFBRSxJQUFFO0FBQUcsTUFBRSxFQUFFLEtBQUssQ0FBQztBQUFBLEVBQUM7QUFBQyxXQUFTLEVBQUUsR0FBRSxHQUFFO0FBQUMsTUFBRSxLQUFHLEVBQUUsR0FBRSxTQUFTQSxJQUFFO0FBQUMsYUFBTyxFQUFFLEdBQUVBLEVBQUM7QUFBQSxJQUFDLENBQUM7QUFBQSxFQUFD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LEVBQUcsTUFBTSxLQUFLLFNBQVMsR0FBRSxJQUFFLEdBQUUsSUFBRUEsR0FBRSxRQUFPLElBQUUsR0FBRTtBQUFJLGVBQUssRUFBRSxRQUFRQSxHQUFFLEVBQUUsS0FBRyxFQUFFLEtBQUtBLEdBQUUsRUFBRTtBQUFFLFFBQUM7QUFBQSxJQUFFLEdBQUUsRUFBRSxTQUFPLFdBQVU7QUFBQyxlQUFRQSxLQUFFLEdBQUcsTUFBTSxLQUFLLFNBQVMsR0FBRSxJQUFFLEdBQUUsSUFBRUEsR0FBRSxRQUFPLElBQUUsR0FBRTtBQUFJLGVBQUssRUFBRSxRQUFRQSxHQUFFLEVBQUUsS0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRQSxHQUFFLEVBQUUsR0FBRSxDQUFDO0FBQUUsUUFBQztBQUFBLElBQUUsR0FBRSxFQUFFLE9BQUssU0FBU0EsSUFBRTtBQUFDLGFBQU8sRUFBRUE7QUFBQSxJQUFFLEdBQUUsRUFBRSxXQUFTLFNBQVNBLElBQUU7QUFBQyxhQUFNLE9BQUssRUFBRSxRQUFRQSxFQUFDO0FBQUEsSUFBQyxHQUFFLEVBQUUsVUFBUSxTQUFTQSxJQUFFLEdBQUU7QUFBQyxhQUFLLEVBQUUsUUFBUUEsRUFBQyxLQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVFBLEVBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxFQUFDO0FBQUEsSUFBRSxHQUFFLEVBQUUsUUFBTUEsR0FBRSxhQUFhLE9BQU8sS0FBRyxJQUFHO0FBQUEsRUFBQyxFQUFDLENBQUM7QUFBQyxFQUFFLFFBQVEsU0FBUztBQUUxMUI7QUFBQTtBQUFBO0FBQUEsQ0FHQyxTQUFTLEdBQUU7QUFBQyxNQUFHO0FBQUMsYUFBUyxLQUFLLFVBQVUsSUFBRztBQUFBLEVBQUUsU0FBTyxHQUFOO0FBQVMsUUFBSSxJQUFFLEVBQUUsS0FBSSxJQUFFLEVBQUU7QUFBTyxNQUFFLE1BQUksV0FBVTtBQUFDLGVBQVEsSUFBRSxHQUFFLElBQUUsVUFBVSxRQUFPO0FBQUksVUFBRSxLQUFLLE1BQUssVUFBVSxFQUFFO0FBQUEsSUFBQztBQUFFLE1BQUUsU0FBTyxXQUFVO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxVQUFVLFFBQU87QUFBSSxVQUFFLEtBQUssTUFBSyxVQUFVLEVBQUU7QUFBQSxJQUFDO0FBQUEsRUFBQztBQUFDLEdBQUcsYUFBYSxTQUFTOyJ9
