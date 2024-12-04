function phoneMask(n) {
  n.forEach(n => {
      let t = 4
        , i = 1;
      n.addEventListener("input", () => {
          const f = n.value
            , u = [];
          for (let n = 0; n < f.length; n++)
              (Number(f[n]) || f[n] === "0") && u.push(f[n]);
          if (u.length <= 1) {
              n.value = "+7 (";
              t = 4;
              i = 1;
              return
          }
          if (t + 1 === f.length && (u[0] !== "7" && u.push(u.shift()),
          u[1] === "7" || u[1] === "8")) {
              n.value = "+7 (";
              t = 4;
              i = 1;
              return
          }
          (i + 11 === u.length || i === 1) && (u[1] === "7" || u[1] === "8") && u.splice(0, 2, "7");
          let r = ""
            , e = 1;
          for (let n = 1; n <= 18; n++)
              if (u[e])
                  switch (n) {
                  case 1:
                      r += "+";
                      break;
                  case 2:
                      r += "7";
                      break;
                  case 3:
                  case 9:
                      r += " ";
                      break;
                  case 4:
                      r += "(";
                      break;
                  case 8:
                      r += ")";
                      break;
                  case 13:
                  case 16:
                      r += "-";
                      break;
                  default:
                      r += u[e++]
                  }
          if (t < f.length)
              switch (r.length) {
              case 7:
                  r += ") ";
                  break;
              case 12:
              case 15:
                  r += "-"
              }
          if (t > f.length)
              switch (f.length) {
              case 8:
                  r = r.substr(0, r.length - 1);
                  break;
              case 12:
              case 15:
                  r = r.substr(0, r.length - 1)
              }
          i = u.length;
          t = r.length;
          n.value = r
      }
      );
      n.addEventListener("focus", () => {
          n.value.length <= 4 && (n.value = "+7 (")
      }
      );
      n.addEventListener("focusout", () => {
          n.value.length <= 4 && (n.value = "")
      }
      )
  }
  )
}
function apiRequest(n, t="GET", i, r, u, f, e=false) {
  try {
      const o = new XMLHttpRequest;
      o.open(t, n);
      f ? Object.entries(f).forEach( ([n,t]) => {
          o.setRequestHeader(n, t.toString())
      }
      ) : o.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      e && o.setRequestHeader("Authorization", "bearer " + localStorage.getItem("token"));
      o.addEventListener("load", () => {
          if (Math.floor(o.status / 100) !== 2) {
              let n = null;
              if (o.responseText)
                  try {
                      n = JSON.parse(o.responseText);
                      u(o.statusText, n)
                  } catch (n) {
                      u(o.statusText, n)
                  }
              else
                  u(o.statusText, null);
              return
          }
          r(o.responseText ? JSON.parse(o.responseText) : null)
      }
      );
      o.addEventListener("error", () => {
          u(null, o.responseText ? JSON.parse(o.responseText) : null)
      }
      );
      o.send(i ? JSON.stringify(i) : null)
  } catch (o) {
      u(o)
  }
}
function showLoader() {
  const n = document.getElementById("loader");
  n.classList.add("show")
}
function hideLoader() {
  const n = document.getElementById("loader");
  n.classList.remove("show")
}
function modalsInit() {
  const n = document.querySelectorAll(`.m-trigger`);
  n.forEach(n => {
      n.addEventListener("click", t => {
          t.preventDefault(),
          showModal(document.getElementById(`${n.dataset.modalId}`), n)
      }
      )
  }
  );
  const t = document.querySelectorAll(".overlay");
  t.forEach(n => {
      n.addEventListener("mousedown", t => {
          (t.target.classList.contains("close-m") || t.target.classList.contains("overlay")) && hideModals(n)
      }
      )
  }
  )
}
function showModal(n) {
  const t = n.parentElement;
  hideModals(t);
  document.body.classList.add("no-scroll");
  t.classList.add("show");
  t.scrollTo(0, 0);
  n.classList.add("show")
}
function hideModals(n) {
  const t = n.querySelectorAll(`.modal`);
  t.forEach(function(n) {
      n.classList.remove("show")
  });
  n.classList.remove("show");
  document.body.classList.remove("no-scroll")
}
function getCookie(n) {
  let t = document.cookie.match(new RegExp("(?:^|; )" + n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return t ? decodeURIComponent(t[1]) : undefined
}
function setCookie(n, t, i={}) {
  i.path || (i.path = "/");
  i.expires instanceof Date && (i.expires = i.expires.toUTCString());
  let r = encodeURIComponent(n) + "=" + encodeURIComponent(t);
  for (let n in i) {
      r += "; " + n;
      let t = i[n];
      t !== !0 && (r += "=" + t)
  }
  document.cookie = r
}
function deleteCookie(n) {
  setCookie(n, "", {
      "max-age": -1
  })
}
function getParameterByName(n, t=window.location.href) {
  n = n.replace(/[\[\]]/g, "\\$&");
  const r = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)")
    , i = r.exec(t);
  return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
}
function redirectToReturnUrl() {
  const n = getParameterByName("ReturnUrl", window.location.href);
  return n ? (window.location.href = n,
  !0) : !1
}
function convertJsonDateToDateTimeString(n) {
  const t = new Date(n);
  return ("0" + t.getDate()).slice(-2) + "." + ("0" + (t.getMonth() + 1)).slice(-2) + "." + t.getFullYear().toString().slice(-2) + "&nbspг.&nbsp" + ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2)
}
function convertJsonDateToDateString(n) {
  const t = new Date(n);
  return ("0" + t.getDate()).slice(-2) + "." + ("0" + (t.getMonth() + 1)).slice(-2) + "." + t.getFullYear().toString().slice(-2) + "&nbspг."
}
function convertJsonDateToDateStringFullYear(n) {
  const t = new Date(n);
  return ("0" + t.getDate()).slice(-2) + "." + ("0" + (t.getMonth() + 1)).slice(-2) + "." + t.getFullYear().toString() + "&nbspг."
}
function formRequest(n, t, i, r, u) {
  n.forEach(n => {
      n.addEventListener("submit", f => {
          f.preventDefault();
          const s = [];
          u.forEach(t => {
              n.elements[t] && s.push(n.elements[t])
          }
          );
          const e = n.querySelector(".validation");
          e && (e.classList.remove("show"),
          e.textContent = "");
          const o = {};
          s.forEach(n => {
              o[n.name] = n.value
          }
          );
          const h = getCookie("utm_info");
          o.utmInfo = h ? h : "";
          const c = document.title;
          o.sitePage = c ? c : "";
          apiRequest(t, "POST", o, () => {
              setTimeout( () => {
                  hideLoader(),
                  showModal(i),
                  n.reset(),
                  document.getElementById("development-mode") || ym(99102642, "reachGoal", "form_sended")
              }
              , 400)
          }
          , (n, t) => {
              setTimeout( () => {
                  if (hideLoader(),
                  t && t.errors) {
                      const n = Object.values(t.errors).reduce( (n, t) => n + " " + t.reduce( (n, t) => n + " " + t, ""), "");
                      e.textContent = n.toString();
                      e.classList.add("show")
                  } else
                      showModal(r)
              }
              , 400)
          }
          );
          showLoader()
      }
      )
  }
  )
}
var Swiper = function() {
  "use strict";
  function bt(n) {
      return null !== n && "object" == typeof n && "constructor"in n && n.constructor === Object
  }
  function ut(n, t) {
      void 0 === n && (n = {});
      void 0 === t && (t = {});
      Object.keys(t).forEach(i => {
          void 0 === n[i] ? n[i] = t[i] : bt(t[i]) && bt(n[i]) && Object.keys(t[i]).length > 0 && ut(n[i], t[i])
      }
      )
  }
  function i() {
      const n = "undefined" != typeof document ? document : {};
      return ut(n, kt),
      n
  }
  function t() {
      const n = "undefined" != typeof window ? window : {};
      return ut(n, li),
      n
  }
  function h(n) {
      return void 0 === n && (n = ""),
      n.trim().split(" ").filter(n => !!n.trim())
  }
  function l(n, t) {
      return void 0 === t && (t = 0),
      setTimeout(n, t)
  }
  function e() {
      return Date.now()
  }
  function ft(n, i) {
      void 0 === i && (i = "x");
      const o = t();
      let f, r, e;
      const u = function(n) {
          const r = t();
          let i;
          return r.getComputedStyle && (i = r.getComputedStyle(n, null)),
          !i && n.currentStyle && (i = n.currentStyle),
          i || (i = n.style),
          i
      }(n);
      return o.WebKitCSSMatrix ? (r = u.transform || u.webkitTransform,
      r.split(",").length > 6 && (r = r.split(", ").map(n => n.replace(",", ".")).join(", ")),
      e = new o.WebKitCSSMatrix("none" === r ? "" : r)) : (e = u.MozTransform || u.OTransform || u.MsTransform || u.msTransform || u.transform || u.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
      f = e.toString().split(",")),
      "x" === i && (r = o.WebKitCSSMatrix ? e.m41 : 16 === f.length ? parseFloat(f[12]) : parseFloat(f[4])),
      "y" === i && (r = o.WebKitCSSMatrix ? e.m42 : 16 === f.length ? parseFloat(f[13]) : parseFloat(f[5])),
      r || 0
  }
  function w(n) {
      return "object" == typeof n && null !== n && n.constructor && "Object" === Object.prototype.toString.call(n).slice(8, -1)
  }
  function u() {
      const n = Object(arguments.length <= 0 ? void 0 : arguments[0])
        , i = ["__proto__", "constructor", "prototype"];
      for (let r = 1; r < arguments.length; r += 1) {
          const f = r < 0 || arguments.length <= r ? void 0 : arguments[r];
          if (null != f && (t = f,
          !("undefined" != typeof window && void 0 !== window.HTMLElement ? t instanceof HTMLElement : t && (1 === t.nodeType || 11 === t.nodeType)))) {
              const t = Object.keys(Object(f)).filter(n => i.indexOf(n) < 0);
              for (let i = 0, r = t.length; i < r; i += 1) {
                  const r = t[i]
                    , e = Object.getOwnPropertyDescriptor(f, r);
                  void 0 !== e && e.enumerable && (w(n[r]) && w(f[r]) ? f[r].__swiper__ ? n[r] = f[r] : u(n[r], f[r]) : !w(n[r]) && w(f[r]) ? (n[r] = {},
                  f[r].__swiper__ ? n[r] = f[r] : u(n[r], f[r])) : n[r] = f[r])
              }
          }
      }
      var t;
      return n
  }
  function b(n, t, i) {
      n.style.setProperty(t, i)
  }
  function dt(n) {
      let {swiper: i, targetPosition: r, side: s} = n;
      const u = t()
        , f = -i.translate;
      let e, o = null;
      const a = i.params.speed;
      i.wrapperEl.style.scrollSnapType = "none";
      u.cancelAnimationFrame(i.cssModeFrameID);
      const h = r > f ? "next" : "prev"
        , c = (n, t) => "next" === h && n >= t || "prev" === h && n <= t
        , l = () => {
          e = (new Date).getTime();
          null === o && (o = e);
          const t = Math.max(Math.min((e - o) / a, 1), 0)
            , h = .5 - Math.cos(t * Math.PI) / 2;
          let n = f + h * (r - f);
          if (c(n, r) && (n = r),
          i.wrapperEl.scrollTo({
              [s]: n
          }),
          c(n, r))
              return i.wrapperEl.style.overflow = "hidden",
              i.wrapperEl.style.scrollSnapType = "",
              setTimeout( () => {
                  i.wrapperEl.style.overflow = "",
                  i.wrapperEl.scrollTo({
                      [s]: n
                  })
              }
              ),
              void u.cancelAnimationFrame(i.cssModeFrameID);
          i.cssModeFrameID = u.requestAnimationFrame(l)
      }
      ;
      l()
  }
  function a(n) {
      return n.querySelector(".swiper-slide-transform") || n.shadowRoot && n.shadowRoot.querySelector(".swiper-slide-transform") || n
  }
  function r(n, t) {
      return void 0 === t && (t = ""),
      [...n.children].filter(n => n.matches(t))
  }
  function nt(n) {
      try {
          return void console.warn(n)
      } catch (n) {}
  }
  function f(n, t) {
      void 0 === t && (t = []);
      const i = document.createElement(n);
      return i.classList.add(...Array.isArray(t) ? t : h(t)),
      i
  }
  function tt(n) {
      const r = t()
        , e = i()
        , u = n.getBoundingClientRect()
        , f = e.body
        , o = n.clientTop || f.clientTop || 0
        , s = n.clientLeft || f.clientLeft || 0
        , h = n === r ? r.scrollY : n.scrollTop
        , c = n === r ? r.scrollX : n.scrollLeft;
      return {
          top: u.top + h - o,
          left: u.left + c - s
      }
  }
  function c(n, i) {
      return t().getComputedStyle(n, null).getPropertyValue(i)
  }
  function k(n) {
      let i, t = n;
      if (t) {
          for (i = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (i += 1);
          return i
      }
  }
  function v(n, t) {
      const r = [];
      let i = n.parentElement;
      for (; i; )
          t ? i.matches(t) && r.push(i) : r.push(i),
          i = i.parentElement;
      return r
  }
  function d(n, t) {
      t && n.addEventListener("transitionend", function i(r) {
          r.target === n && (t.call(n, r),
          n.removeEventListener("transitionend", i))
      })
  }
  function et(n, i, r) {
      const u = t();
      return r ? n["width" === i ? "offsetWidth" : "offsetHeight"] + parseFloat(u.getComputedStyle(n, null).getPropertyValue("width" === i ? "margin-right" : "margin-top")) + parseFloat(u.getComputedStyle(n, null).getPropertyValue("width" === i ? "margin-left" : "margin-bottom")) : n.offsetWidth
  }
  function n(n) {
      return (Array.isArray(n) ? n : [n]).filter(n => !!n)
  }
  function gt() {
      return ot || (ot = function() {
          const r = t()
            , n = i();
          return {
              smoothScroll: n.documentElement && n.documentElement.style && "scrollBehavior"in n.documentElement.style,
              touch: !!("ontouchstart"in r || r.DocumentTouch && n instanceof r.DocumentTouch)
          }
      }()),
      ot
  }
  function ni(n) {
      return void 0 === n && (n = {}),
      st || (st = function(n) {
          let {userAgent: s} = void 0 === n ? {} : n;
          const h = gt()
            , f = t()
            , e = f.navigator.platform
            , r = s || f.navigator.userAgent
            , u = {
              ios: !1,
              android: !1
          }
            , c = f.screen.width
            , l = f.screen.height
            , a = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let i = r.match(/(iPad).*OS\s([\d_]+)/);
          const v = r.match(/(iPod)(.*OS\s([\d_]+))?/)
            , y = !i && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
            , p = "Win32" === e;
          let o = "MacIntel" === e;
          return !i && o && h.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${c}x${l}`) >= 0 && (i = r.match(/(Version)\/([\d.]+)/),
          i || (i = [0, 1, "13_0_0"]),
          o = !1),
          a && !p && (u.os = "android",
          u.android = !0),
          (i || y || v) && (u.os = "ios",
          u.ios = !0),
          u
      }(n)),
      st
  }
  function ai() {
      return ht || (ht = function() {
          function r() {
              const t = n.navigator.userAgent.toLowerCase();
              return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
          }
          const n = t()
            , e = ni();
          let i = !1;
          if (r()) {
              const t = String(n.navigator.userAgent);
              if (t.includes("Version/")) {
                  const [n,r] = t.split("Version/")[1].split(" ")[0].split(".").map(n => Number(n));
                  i = n < 16 || 16 === n && r < 2
              }
          }
          const u = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(n.navigator.userAgent)
            , f = r();
          return {
              isSafari: i || f,
              needPerspectiveFix: i,
              need3dFix: f || u && e.ios,
              isWebView: u
          }
      }()),
      ht
  }
  function ui(n) {
      let {swiper: t, runCallbacks: e, direction: o, step: i} = n;
      const {activeIndex: u, previousIndex: f} = t;
      let r = o;
      if (r || (r = u > f ? "next" : u < f ? "prev" : "reset"),
      t.emit(`transition${i}`),
      e && u !== f) {
          if ("reset" === r)
              return void t.emit(`slideResetTransition${i}`);
          t.emit(`slideChangeTransition${i}`);
          "next" === r ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`)
      }
  }
  function oi(n, i, r) {
      const o = t()
        , {params: u} = n
        , f = u.edgeSwipeDetection
        , e = u.edgeSwipeThreshold;
      return !f || !(r <= e || r >= o.innerWidth - e) || "prevent" === f && (i.preventDefault(),
      !0)
  }
  function vi(n) {
      const f = this
        , c = i();
      let r = n;
      r.originalEvent && (r = r.originalEvent);
      const o = f.touchEventsData;
      if ("pointerdown" === r.type) {
          if (null !== o.pointerId && o.pointerId !== r.pointerId)
              return;
          o.pointerId = r.pointerId
      } else
          "touchstart" === r.type && 1 === r.targetTouches.length && (o.touchId = r.targetTouches[0].identifier);
      if ("touchstart" === r.type)
          return void oi(f, r, r.targetTouches[0].pageX);
      const {params: u, touches: h, enabled: p} = f;
      if (p && (u.simulateTouch || "mouse" !== r.pointerType) && (!f.animating || !u.preventInteractionOnTransition)) {
          !f.animating && u.cssMode && u.loop && f.loopFix();
          let s = r.target;
          if (("wrapper" !== u.touchEventsTarget || f.wrapperEl.contains(s)) && (!("which"in r) || 3 !== r.which) && (!("button"in r) || !(r.button > 0)) && (!o.isTouched || !o.isMoved)) {
              const w = !!u.noSwipingClass && "" !== u.noSwipingClass
                , l = r.composedPath ? r.composedPath() : r.path;
              w && r.target && r.target.shadowRoot && l && (s = l[0]);
              const a = u.noSwipingSelector ? u.noSwipingSelector : `.${u.noSwipingClass}`
                , b = !(!r.target || !r.target.shadowRoot);
              if (u.noSwiping && (b ? function(n, r) {
                  return void 0 === r && (r = this),
                  function r(u) {
                      if (!u || u === i() || u === t())
                          return null;
                      u.assignedSlot && (u = u.assignedSlot);
                      const f = u.closest(n);
                      return f || u.getRootNode ? f || r(u.getRootNode().host) : null
                  }(r)
              }(a, s) : s.closest(a)))
                  return void (f.allowClick = !0);
              if (!u.swipeHandler || s.closest(u.swipeHandler)) {
                  h.currentX = r.pageX;
                  h.currentY = r.pageY;
                  const v = h.currentX
                    , k = h.currentY;
                  if (oi(f, r, v)) {
                      Object.assign(o, {
                          isTouched: !0,
                          isMoved: !1,
                          allowTouchCallbacks: !0,
                          isScrolling: void 0,
                          startMoving: void 0
                      });
                      h.startX = v;
                      h.startY = k;
                      o.touchStartTime = e();
                      f.allowClick = !0;
                      f.updateSize();
                      f.swipeDirection = void 0;
                      u.threshold > 0 && (o.allowThresholdMove = !1);
                      let y = !0;
                      s.matches(o.focusableElements) && (y = !1,
                      "SELECT" === s.nodeName && (o.isTouched = !1));
                      c.activeElement && c.activeElement.matches(o.focusableElements) && c.activeElement !== s && c.activeElement.blur();
                      const d = y && f.allowTouchMove && u.touchStartPreventDefault;
                      (u.touchStartForcePreventDefault || d) && !s.isContentEditable && r.preventDefault();
                      u.freeMode && u.freeMode.enabled && f.freeMode && f.animating && !u.cssMode && f.freeMode.onTouchStart();
                      f.emit("touchStart", r)
                  }
              }
          }
      }
  }
  function yi(n) {
      const g = i()
        , t = this
        , r = t.touchEventsData
        , {params: f, touches: u, rtlTranslate: b, enabled: nt} = t;
      if (nt && (f.simulateTouch || "mouse" !== n.pointerType)) {
          let l, o = n;
          if (o.originalEvent && (o = o.originalEvent),
          "pointermove" === o.type) {
              if (null !== r.touchId)
                  return;
              if (o.pointerId !== r.pointerId)
                  return
          }
          if ("touchmove" === o.type) {
              if (l = [...o.changedTouches].filter(n => n.identifier === r.touchId)[0],
              !l || l.identifier !== r.touchId)
                  return
          } else
              l = o;
          if (!r.isTouched)
              return void (r.startMoving && r.isScrolling && t.emit("touchMoveOpposite", o));
          const h = l.pageX
            , c = l.pageY;
          if (o.preventedByNestedSwiper)
              return u.startX = h,
              void (u.startY = c);
          if (!t.allowTouchMove)
              return o.target.matches(r.focusableElements) || (t.allowClick = !1),
              void (r.isTouched && (Object.assign(u, {
                  startX: h,
                  startY: c,
                  currentX: h,
                  currentY: c
              }),
              r.touchStartTime = e()));
          if (f.touchReleaseOnEdges && !f.loop)
              if (t.isVertical()) {
                  if (c < u.startY && t.translate <= t.maxTranslate() || c > u.startY && t.translate >= t.minTranslate())
                      return r.isTouched = !1,
                      void (r.isMoved = !1)
              } else if (h < u.startX && t.translate <= t.maxTranslate() || h > u.startX && t.translate >= t.minTranslate())
                  return;
          if (g.activeElement && o.target === g.activeElement && o.target.matches(r.focusableElements))
              return r.isMoved = !0,
              void (t.allowClick = !1);
          r.allowTouchCallbacks && t.emit("touchMove", o);
          u.previousX = u.currentX;
          u.previousY = u.currentY;
          u.currentX = h;
          u.currentY = c;
          const a = u.currentX - u.startX
            , v = u.currentY - u.startY;
          if (!t.params.threshold || !(Math.sqrt(a ** 2 + v ** 2) < t.params.threshold)) {
              if (void 0 === r.isScrolling) {
                  let n;
                  t.isHorizontal() && u.currentY === u.startY || t.isVertical() && u.currentX === u.startX ? r.isScrolling = !1 : a * a + v * v >= 25 && (n = 180 * Math.atan2(Math.abs(v), Math.abs(a)) / Math.PI,
                  r.isScrolling = t.isHorizontal() ? n > f.touchAngle : 90 - n > f.touchAngle)
              }
              if (r.isScrolling && t.emit("touchMoveOpposite", o),
              void 0 === r.startMoving && (u.currentX === u.startX && u.currentY === u.startY || (r.startMoving = !0)),
              r.isScrolling || "touchmove" === o.type && r.preventTouchMoveFromPointerMove)
                  return void (r.isTouched = !1);
              if (r.startMoving) {
                  t.allowClick = !1;
                  !f.cssMode && o.cancelable && o.preventDefault();
                  f.touchMoveStopPropagation && !f.nested && o.stopPropagation();
                  let s = t.isHorizontal() ? a : v
                    , y = t.isHorizontal() ? u.currentX - u.previousX : u.currentY - u.previousY;
                  f.oneWayMovement && (s = Math.abs(s) * (b ? 1 : -1),
                  y = Math.abs(y) * (b ? 1 : -1));
                  u.diff = s;
                  s *= f.touchRatio;
                  b && (s = -s,
                  y = -y);
                  const tt = t.touchesDirection;
                  t.swipeDirection = s > 0 ? "prev" : "next";
                  t.touchesDirection = y > 0 ? "prev" : "next";
                  const p = t.params.loop && !f.cssMode
                    , w = "next" === t.touchesDirection && t.allowSlideNext || "prev" === t.touchesDirection && t.allowSlidePrev;
                  if (!r.isMoved) {
                      if (p && w && t.loopFix({
                          direction: t.swipeDirection
                      }),
                      r.startTranslate = t.getTranslate(),
                      t.setTransition(0),
                      t.animating) {
                          const n = new window.CustomEvent("transitionend",{
                              bubbles: !0,
                              cancelable: !0
                          });
                          t.wrapperEl.dispatchEvent(n)
                      }
                      r.allowMomentumBounce = !1;
                      !f.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0);
                      t.emit("sliderFirstMove", o)
                  }
                  if ((new Date).getTime(),
                  r.isMoved && r.allowThresholdMove && tt !== t.touchesDirection && p && w && Math.abs(s) >= 1)
                      return Object.assign(u, {
                          startX: h,
                          startY: c,
                          currentX: h,
                          currentY: c,
                          startTranslate: r.currentTranslate
                      }),
                      r.loopSwapReset = !0,
                      void (r.startTranslate = r.currentTranslate);
                  t.emit("sliderMove", o);
                  r.isMoved = !0;
                  r.currentTranslate = s + r.startTranslate;
                  let k = !0
                    , d = f.resistanceRatio;
                  if (f.touchReleaseOnEdges && (d = 0),
                  s > 0 ? (p && w && r.allowThresholdMove && r.currentTranslate > (f.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] : t.minTranslate()) && t.loopFix({
                      direction: "prev",
                      setTranslate: !0,
                      activeSlideIndex: 0
                  }),
                  r.currentTranslate > t.minTranslate() && (k = !1,
                  f.resistance && (r.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + r.startTranslate + s) ** d))) : s < 0 && (p && w && r.allowThresholdMove && r.currentTranslate < (f.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] : t.maxTranslate()) && t.loopFix({
                      direction: "next",
                      setTranslate: !0,
                      activeSlideIndex: t.slides.length - ("auto" === f.slidesPerView ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(f.slidesPerView, 10)))
                  }),
                  r.currentTranslate < t.maxTranslate() && (k = !1,
                  f.resistance && (r.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - r.startTranslate - s) ** d))),
                  k && (o.preventedByNestedSwiper = !0),
                  !t.allowSlideNext && "next" === t.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate),
                  !t.allowSlidePrev && "prev" === t.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate),
                  t.allowSlidePrev || t.allowSlideNext || (r.currentTranslate = r.startTranslate),
                  f.threshold > 0) {
                      if (!(Math.abs(s) > f.threshold || r.allowThresholdMove))
                          return void (r.currentTranslate = r.startTranslate);
                      if (!r.allowThresholdMove)
                          return r.allowThresholdMove = !0,
                          u.startX = u.currentX,
                          u.startY = u.currentY,
                          r.currentTranslate = r.startTranslate,
                          void (u.diff = t.isHorizontal() ? u.currentX - u.startX : u.currentY - u.startY)
                  }
                  f.followFinger && !f.cssMode && ((f.freeMode && f.freeMode.enabled && t.freeMode || f.watchSlidesProgress) && (t.updateActiveIndex(),
                  t.updateSlidesClasses()),
                  f.freeMode && f.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
                  t.updateProgress(r.currentTranslate),
                  t.setTranslate(r.currentTranslate))
              }
          }
      }
  }
  function pi(n) {
      const t = this
        , i = t.touchEventsData;
      let c, u = n;
      if (u.originalEvent && (u = u.originalEvent),
      "touchend" === u.type || "touchcancel" === u.type) {
          if (c = [...u.changedTouches].filter(n => n.identifier === i.touchId)[0],
          !c || c.identifier !== i.touchId)
              return
      } else {
          if (null !== i.touchId)
              return;
          if (u.pointerId !== i.pointerId)
              return;
          c = u
      }
      if (!["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(u.type) || ["pointercancel", "contextmenu"].includes(u.type) && (t.browser.isSafari || t.browser.isWebView)) {
          i.pointerId = null;
          i.touchId = null;
          const {params: r, touches: d, rtlTranslate: g, slidesGrid: f, enabled: nt} = t;
          if (nt && (r.simulateTouch || "mouse" !== u.pointerType)) {
              if (i.allowTouchCallbacks && t.emit("touchEnd", u),
              i.allowTouchCallbacks = !1,
              !i.isTouched)
                  return i.isMoved && r.grabCursor && t.setGrabCursor(!1),
                  i.isMoved = !1,
                  void (i.startMoving = !1);
              r.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
              const w = e()
                , b = w - i.touchStartTime;
              if (t.allowClick) {
                  const n = u.path || u.composedPath && u.composedPath();
                  t.updateClickedSlide(n && n[0] || u.target, n);
                  t.emit("tap click", u);
                  b < 300 && w - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", u)
              }
              if (i.lastClickTime = e(),
              l( () => {
                  t.destroyed || (t.allowClick = !0)
              }
              ),
              !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === d.diff && !i.loopSwapReset || i.currentTranslate === i.startTranslate && !i.loopSwapReset)
                  return i.isTouched = !1,
                  i.isMoved = !1,
                  void (i.startMoving = !1);
              let s;
              if (i.isTouched = !1,
              i.isMoved = !1,
              i.startMoving = !1,
              s = r.followFinger ? g ? t.translate : -t.translate : -i.currentTranslate,
              !r.cssMode) {
                  if (r.freeMode && r.freeMode.enabled)
                      return void t.freeMode.onTouchEnd({
                          currentPos: s
                      });
                  const k = s >= -t.maxTranslate() && !t.params.loop;
                  let o = 0
                    , p = t.slidesSizesGrid[0];
                  for (let n = 0; n < f.length; n += n < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
                      const t = n < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
                      void 0 !== f[n + t] ? (k || s >= f[n] && s < f[n + t]) && (o = n,
                      p = f[n + t] - f[n]) : (k || s >= f[n]) && (o = n,
                      p = f[f.length - 1] - f[f.length - 2])
                  }
                  let a = null
                    , h = null;
                  r.rewind && (t.isBeginning ? h = r.virtual && r.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (a = 0));
                  const v = (s - f[o]) / p
                    , y = o < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
                  if (b > r.longSwipesMs) {
                      if (!r.longSwipes)
                          return void t.slideTo(t.activeIndex);
                      "next" === t.swipeDirection && (v >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? a : o + y) : t.slideTo(o));
                      "prev" === t.swipeDirection && (v > 1 - r.longSwipesRatio ? t.slideTo(o + y) : null !== h && v < 0 && Math.abs(v) > r.longSwipesRatio ? t.slideTo(h) : t.slideTo(o))
                  } else {
                      if (!r.shortSwipes)
                          return void t.slideTo(t.activeIndex);
                      t.navigation && (u.target === t.navigation.nextEl || u.target === t.navigation.prevEl) ? u.target === t.navigation.nextEl ? t.slideTo(o + y) : t.slideTo(o) : ("next" === t.swipeDirection && t.slideTo(null !== a ? a : o + y),
                      "prev" === t.swipeDirection && t.slideTo(null !== h ? h : o))
                  }
              }
          }
      }
  }
  function si() {
      const n = this
        , {params: t, el: i} = n;
      if (!i || 0 !== i.offsetWidth) {
          t.breakpoints && n.setBreakpoint();
          const {allowSlideNext: u, allowSlidePrev: f, snapGrid: e} = n
            , r = n.virtual && n.params.virtual.enabled;
          n.allowSlideNext = !0;
          n.allowSlidePrev = !0;
          n.updateSize();
          n.updateSlides();
          n.updateSlidesClasses();
          const o = r && t.loop;
          !("auto" === t.slidesPerView || t.slidesPerView > 1) || !n.isEnd || n.isBeginning || n.params.centeredSlides || o ? n.params.loop && !r ? n.slideToLoop(n.realIndex, 0, !1, !0) : n.slideTo(n.activeIndex, 0, !1, !0) : n.slideTo(n.slides.length - 1, 0, !1, !0);
          n.autoplay && n.autoplay.running && n.autoplay.paused && (clearTimeout(n.autoplay.resizeTimeout),
          n.autoplay.resizeTimeout = setTimeout( () => {
              n.autoplay && n.autoplay.running && n.autoplay.paused && n.autoplay.resume()
          }
          , 500));
          n.allowSlidePrev = f;
          n.allowSlideNext = u;
          n.params.watchOverflow && e !== n.snapGrid && n.checkOverflow()
      }
  }
  function wi(n) {
      const t = this;
      t.enabled && (t.allowClick || (t.params.preventClicks && n.preventDefault(),
      t.params.preventClicksPropagation && t.animating && (n.stopPropagation(),
      n.stopImmediatePropagation())))
  }
  function bi() {
      const n = this
        , {wrapperEl: t, rtlTranslate: u, enabled: f} = n;
      if (f) {
          let i;
          n.previousTranslate = n.translate;
          n.translate = n.isHorizontal() ? -t.scrollLeft : -t.scrollTop;
          0 === n.translate && (n.translate = 0);
          n.updateActiveIndex();
          n.updateSlidesClasses();
          const r = n.maxTranslate() - n.minTranslate();
          i = 0 === r ? 0 : (n.translate - n.minTranslate()) / r;
          i !== n.progress && n.updateProgress(u ? -n.translate : n.translate);
          n.emit("setTranslate", n.translate, !1)
      }
  }
  function ki(n) {
      const t = this;
      it(t, n.target);
      t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
  }
  function di() {
      const n = this;
      n.documentTouchHandlerProceeded || (n.documentTouchHandlerProceeded = !0,
      n.params.touchReleaseOnEdges && (n.el.style.touchAction = "auto"))
  }
  function gi(n, t) {
      return function(i) {
          void 0 === i && (i = {});
          const r = Object.keys(i)[0]
            , f = i[r];
          "object" == typeof f && null !== f ? (!0 === n[r] && (n[r] = {
              enabled: !0
          }),
          "navigation" === r && n[r] && n[r].enabled && !n[r].prevEl && !n[r].nextEl && (n[r].auto = !0),
          ["pagination", "scrollbar"].indexOf(r) >= 0 && n[r] && n[r].enabled && !n[r].el && (n[r].auto = !0),
          r in n && "enabled"in f ? ("object" != typeof n[r] || "enabled"in n[r] || (n[r].enabled = !0),
          n[r] || (n[r] = {
              enabled: !1
          }),
          u(t, i)) : u(t, i)) : u(t, i)
      }
  }
  function wt(n, t, i, u) {
      return n.params.createElements && Object.keys(u).forEach(e => {
          if (!i[e] && !0 === i.auto) {
              let o = r(n.el, `.${u[e]}`)[0];
              o || (o = f("div", u[e]),
              o.className = u[e],
              n.el.append(o));
              i[e] = o;
              t[e] = o
          }
      }
      ),
      i
  }
  function s(n) {
      return void 0 === n && (n = ""),
      `.${n.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`
  }
  function nr(n) {
      const t = this
        , {params: i, slidesEl: r} = t;
      i.loop && t.loopDestroy();
      const u = n => {
          if ("string" == typeof n) {
              const t = document.createElement("div");
              t.innerHTML = n;
              r.append(t.children[0]);
              t.innerHTML = ""
          } else
              r.append(n)
      }
      ;
      if ("object" == typeof n && "length"in n)
          for (let t = 0; t < n.length; t += 1)
              n[t] && u(n[t]);
      else
          u(n);
      t.recalcSlides();
      i.loop && t.loopCreate();
      i.observer && !t.isElement || t.update()
  }
  function tr(n) {
      const t = this
        , {params: i, activeIndex: r, slidesEl: u} = t;
      i.loop && t.loopDestroy();
      let f = r + 1;
      const e = n => {
          if ("string" == typeof n) {
              const t = document.createElement("div");
              t.innerHTML = n;
              u.prepend(t.children[0]);
              t.innerHTML = ""
          } else
              u.prepend(n)
      }
      ;
      if ("object" == typeof n && "length"in n) {
          for (let t = 0; t < n.length; t += 1)
              n[t] && e(n[t]);
          f = r + n.length
      } else
          e(n);
      t.recalcSlides();
      i.loop && t.loopCreate();
      i.observer && !t.isElement || t.update();
      t.slideTo(f, 0, !1)
  }
  function ir(n, t) {
      const i = this
        , {params: u, activeIndex: h, slidesEl: f} = i;
      let r = h;
      u.loop && (r -= i.loopedSlides,
      i.loopDestroy(),
      i.recalcSlides());
      const s = i.slides.length;
      if (n <= 0)
          return void i.prependSlide(t);
      if (n >= s)
          return void i.appendSlide(t);
      let e = r > n ? r + 1 : r;
      const o = [];
      for (let t = s - 1; t >= n; t -= 1) {
          const n = i.slides[t];
          n.remove();
          o.unshift(n)
      }
      if ("object" == typeof t && "length"in t) {
          for (let n = 0; n < t.length; n += 1)
              t[n] && f.append(t[n]);
          e = r > n ? r + t.length : r
      } else
          f.append(t);
      for (let n = 0; n < o.length; n += 1)
          f.append(o[n]);
      i.recalcSlides();
      u.loop && i.loopCreate();
      u.observer && !i.isElement || i.update();
      u.loop ? i.slideTo(e + i.loopedSlides, 0, !1) : i.slideTo(e, 0, !1)
  }
  function rr(n) {
      const t = this
        , {params: u, activeIndex: e} = t;
      let f = e;
      u.loop && (f -= t.loopedSlides,
      t.loopDestroy());
      let r, i = f;
      if ("object" == typeof n && "length"in n) {
          for (let u = 0; u < n.length; u += 1)
              r = n[u],
              t.slides[r] && t.slides[r].remove(),
              r < i && (i -= 1);
          i = Math.max(i, 0)
      } else
          r = n,
          t.slides[r] && t.slides[r].remove(),
          r < i && (i -= 1),
          i = Math.max(i, 0);
      t.recalcSlides();
      u.loop && t.loopCreate();
      u.observer && !t.isElement || t.update();
      u.loop ? t.slideTo(i + t.loopedSlides, 0, !1) : t.slideTo(i, 0, !1)
  }
  function ur() {
      const n = this
        , t = [];
      for (let i = 0; i < n.slides.length; i += 1)
          t.push(i);
      n.removeSlide(t)
  }
  function y(n) {
      const {effect: i, swiper: t, on: r, setTranslate: f, setTransition: c, overwriteParams: e, perspective: o, recreateShadows: s, getEffectParams: h} = n;
      let u;
      r("beforeInit", () => {
          if (t.params.effect === i) {
              t.classNames.push(`${t.params.containerModifierClass}${i}`);
              o && o() && t.classNames.push(`${t.params.containerModifierClass}3d`);
              const n = e ? e() : {};
              Object.assign(t.params, n);
              Object.assign(t.originalParams, n)
          }
      }
      );
      r("setTranslate", () => {
          t.params.effect === i && f()
      }
      );
      r("setTransition", (n, r) => {
          t.params.effect === i && c(r)
      }
      );
      r("transitionEnd", () => {
          if (t.params.effect === i && s) {
              if (!h || !h().slideShadows)
                  return;
              t.slides.forEach(n => {
                  n.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(n => n.remove())
              }
              );
              s()
          }
      }
      );
      r("virtualUpdate", () => {
          t.params.effect === i && (t.slides.length || (u = !0),
          requestAnimationFrame( () => {
              u && t.slides && t.slides.length && (f(),
              u = !1)
          }
          ))
      }
      )
  }
  function g(n, t) {
      const i = a(t);
      return i !== t && (i.style.backfaceVisibility = "hidden",
      i.style["-webkit-backface-visibility"] = "hidden"),
      i
  }
  function rt(n) {
      let {swiper: t, duration: r, transformElements: i, allSlides: u} = n;
      const {activeIndex: f} = t;
      if (t.params.virtualTranslate && 0 !== r) {
          let n, r = !1;
          n = u ? i : i.filter(n => {
              const i = n.classList.contains("swiper-slide-transform") ? (n => n.parentElement ? n.parentElement : t.slides.filter(t => t.shadowRoot && t.shadowRoot === n.parentNode)[0])(n) : n;
              return t.getSlideIndex(i) === f
          }
          );
          n.forEach(n => {
              d(n, () => {
                  if (!r && t && !t.destroyed) {
                      r = !0;
                      t.animating = !1;
                      const n = new window.CustomEvent("transitionend",{
                          bubbles: !0,
                          cancelable: !0
                      });
                      t.wrapperEl.dispatchEvent(n)
                  }
              }
              )
          }
          )
      }
  }
  function p(n, t, i) {
      const u = `swiper-slide-shadow${i ? `-${i}` : ""}${n ? ` swiper-slide-shadow-${n}` : ""}`
        , e = a(t);
      let r = e.querySelector(`.${u.split(" ").join(".")}`);
      return r || (r = f("div", u.split(" ")),
      e.append(r)),
      r
  }
  var ti, ii, ri, fi, ei, vt;
  const kt = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: {
          blur() {},
          nodeName: ""
      },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({
          initEvent() {}
      }),
      createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => []
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: ""
      }
  };
  const li = {
      document: kt,
      navigator: {
          userAgent: ""
      },
      location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: ""
      },
      history: {
          replaceState() {},
          pushState() {},
          go() {},
          back() {}
      },
      CustomEvent: function() {
          return this
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({
          getPropertyValue: () => ""
      }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: n => "undefined" == typeof setTimeout ? (n(),
      null) : setTimeout(n, 0),
      cancelAnimationFrame(n) {
          "undefined" != typeof setTimeout && clearTimeout(n)
      }
  };
  let ot, st, ht;
  ti = {
      on(n, t, i) {
          const r = this;
          if (!r.eventsListeners || r.destroyed || "function" != typeof t)
              return r;
          const u = i ? "unshift" : "push";
          return n.split(" ").forEach(n => {
              r.eventsListeners[n] || (r.eventsListeners[n] = []),
              r.eventsListeners[n][u](t)
          }
          ),
          r
      },
      once(n, t, i) {
          function u() {
              r.off(n, u);
              u.__emitterProxy && delete u.__emitterProxy;
              for (var f = arguments.length, e = new Array(f), i = 0; i < f; i++)
                  e[i] = arguments[i];
              t.apply(r, e)
          }
          const r = this;
          return !r.eventsListeners || r.destroyed ? r : "function" != typeof t ? r : (u.__emitterProxy = t,
          r.on(n, u, i))
      },
      onAny(n, t) {
          const i = this;
          if (!i.eventsListeners || i.destroyed || "function" != typeof n)
              return i;
          const r = t ? "unshift" : "push";
          return i.eventsAnyListeners.indexOf(n) < 0 && i.eventsAnyListeners[r](n),
          i
      },
      offAny(n) {
          const t = this;
          if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners)
              return t;
          const i = t.eventsAnyListeners.indexOf(n);
          return i >= 0 && t.eventsAnyListeners.splice(i, 1),
          t
      },
      off(n, t) {
          const i = this;
          return !i.eventsListeners || i.destroyed ? i : i.eventsListeners ? (n.split(" ").forEach(n => {
              void 0 === t ? i.eventsListeners[n] = [] : i.eventsListeners[n] && i.eventsListeners[n].forEach( (r, u) => {
                  (r === t || r.__emitterProxy && r.__emitterProxy === t) && i.eventsListeners[n].splice(u, 1)
              }
              )
          }
          ),
          i) : i
      },
      emit() {
          const n = this;
          if (!n.eventsListeners || n.destroyed || !n.eventsListeners)
              return n;
          let i, r, u;
          for (var e = arguments.length, t = new Array(e), f = 0; f < e; f++)
              t[f] = arguments[f];
          return "string" == typeof t[0] || Array.isArray(t[0]) ? (i = t[0],
          r = t.slice(1, t.length),
          u = n) : (i = t[0].events,
          r = t[0].data,
          u = t[0].context || n),
          r.unshift(u),
          (Array.isArray(i) ? i : i.split(" ")).forEach(t => {
              n.eventsAnyListeners && n.eventsAnyListeners.length && n.eventsAnyListeners.forEach(n => {
                  n.apply(u, [t, ...r])
              }
              ),
              n.eventsListeners && n.eventsListeners[t] && n.eventsListeners[t].forEach(n => {
                  n.apply(u, r)
              }
              )
          }
          ),
          n
      }
  };
  const ct = (n, t, i) => {
      t && !n.classList.contains(i) ? n.classList.add(i) : !t && n.classList.contains(i) && n.classList.remove(i)
  }
    , it = (n, t) => {
      if (n && !n.destroyed && n.params) {
          const i = t.closest(n.isElement ? "swiper-slide" : `.${n.params.slideClass}`);
          if (i) {
              let t = i.querySelector(`.${n.params.lazyPreloaderClass}`);
              !t && n.isElement && (i.shadowRoot ? t = i.shadowRoot.querySelector(`.${n.params.lazyPreloaderClass}`) : requestAnimationFrame( () => {
                  i.shadowRoot && (t = i.shadowRoot.querySelector(`.${n.params.lazyPreloaderClass}`),
                  t && t.remove())
              }
              ));
              t && t.remove()
          }
      }
  }
    , lt = (n, t) => {
      if (n.slides[t]) {
          const i = n.slides[t].querySelector('[loading="lazy"]');
          i && i.removeAttribute("loading")
      }
  }
    , at = n => {
      if (n && !n.destroyed && n.params) {
          let t = n.params.lazyPreloadPrevNext;
          const r = n.slides.length;
          if (r && t && !(t < 0)) {
              t = Math.min(t, r);
              const f = "auto" === n.params.slidesPerView ? n.slidesPerViewDynamic() : Math.ceil(n.params.slidesPerView)
                , i = n.activeIndex;
              if (n.params.grid && n.params.grid.rows > 1) {
                  const r = i
                    , u = [r - t];
                  return u.push(...Array.from({
                      length: t
                  }).map( (n, t) => r + f + t)),
                  void n.slides.forEach( (t, i) => {
                      u.includes(t.column) && lt(n, i)
                  }
                  )
              }
              const u = i + f - 1;
              if (n.params.rewind || n.params.loop)
                  for (let f = i - t; f <= u + t; f += 1) {
                      const t = (f % r + r) % r;
                      (t < i || t > u) && lt(n, t)
                  }
              else
                  for (let f = Math.max(i - t, 0); f <= Math.min(u + t, r - 1); f += 1)
                      f !== i && (f > u || f < i) && lt(n, f)
          }
      }
  }
  ;
  ii = {
      updateSize: function() {
          const n = this;
          let t, i;
          const r = n.el;
          t = void 0 !== n.params.width && null !== n.params.width ? n.params.width : r.clientWidth;
          i = void 0 !== n.params.height && null !== n.params.height ? n.params.height : r.clientHeight;
          0 === t && n.isHorizontal() || 0 === i && n.isVertical() || (t = t - parseInt(c(r, "padding-left") || 0, 10) - parseInt(c(r, "padding-right") || 0, 10),
          i = i - parseInt(c(r, "padding-top") || 0, 10) - parseInt(c(r, "padding-bottom") || 0, 10),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(i) && (i = 0),
          Object.assign(n, {
              width: t,
              height: i,
              size: n.isHorizontal() ? t : i
          }))
      },
      updateSlides: function() {
          function v(t, i) {
              return parseFloat(t.getPropertyValue(n.getDirectionLabel(i)) || 0)
          }
          const n = this;
          const t = n.params
            , {wrapperEl: a, slidesEl: it, size: s, rtlTranslate: d, wrongRTL: rt} = n
            , y = n.virtual && t.virtual.enabled
            , ut = y ? n.virtual.slides.length : n.slides.length
            , o = r(it, `.${n.params.slideClass}, swiper-slide`)
            , g = y ? n.virtual.slides.length : o.length;
          let i = [];
          const h = []
            , l = [];
          let p = t.slidesOffsetBefore;
          "function" == typeof p && (p = t.slidesOffsetBefore.call(n));
          let w = t.slidesOffsetAfter;
          "function" == typeof w && (w = t.slidesOffsetAfter.call(n));
          const ft = n.snapGrid.length
            , ot = n.slidesGrid.length;
          let u = t.spaceBetween
            , f = -p
            , nt = 0
            , k = 0;
          if (void 0 !== s) {
              "string" == typeof u && u.indexOf("%") >= 0 ? u = parseFloat(u.replace("%", "")) / 100 * s : "string" == typeof u && (u = parseFloat(u));
              n.virtualSize = -u;
              o.forEach(n => {
                  d ? n.style.marginLeft = "" : n.style.marginRight = "",
                  n.style.marginBottom = "",
                  n.style.marginTop = ""
              }
              );
              t.centeredSlides && t.cssMode && (b(a, "--swiper-centered-offset-before", ""),
              b(a, "--swiper-centered-offset-after", ""));
              const tt = t.grid && t.grid.rows > 1 && n.grid;
              let e;
              tt ? n.grid.initSlides(o) : n.grid && n.grid.unsetSlides();
              const st = "auto" === t.slidesPerView && t.breakpoints && Object.keys(t.breakpoints).filter(n => void 0 !== t.breakpoints[n].slidesPerView).length > 0;
              for (let r = 0; r < g; r += 1) {
                  let a;
                  if (e = 0,
                  o[r] && (a = o[r]),
                  tt && n.grid.updateSlide(r, a, o),
                  !o[r] || "none" !== c(a, "display")) {
                      if ("auto" === t.slidesPerView) {
                          st && (o[r].style[n.getDirectionLabel("width")] = "");
                          const i = getComputedStyle(a)
                            , u = a.style.transform
                            , f = a.style.webkitTransform;
                          if (u && (a.style.transform = "none"),
                          f && (a.style.webkitTransform = "none"),
                          t.roundLengths)
                              e = n.isHorizontal() ? et(a, "width", !0) : et(a, "height", !0);
                          else {
                              const n = v(i, "width")
                                , f = v(i, "padding-left")
                                , o = v(i, "padding-right")
                                , t = v(i, "margin-left")
                                , r = v(i, "margin-right")
                                , u = i.getPropertyValue("box-sizing");
                              if (u && "border-box" === u)
                                  e = n + t + r;
                              else {
                                  const {clientWidth: i, offsetWidth: u} = a;
                                  e = n + f + o + t + r + (u - i)
                              }
                          }
                          u && (a.style.transform = u);
                          f && (a.style.webkitTransform = f);
                          t.roundLengths && (e = Math.floor(e))
                      } else
                          e = (s - (t.slidesPerView - 1) * u) / t.slidesPerView,
                          t.roundLengths && (e = Math.floor(e)),
                          o[r] && (o[r].style[n.getDirectionLabel("width")] = `${e}px`);
                      o[r] && (o[r].swiperSlideSize = e);
                      l.push(e);
                      t.centeredSlides ? (f = f + e / 2 + nt / 2 + u,
                      0 === nt && 0 !== r && (f = f - s / 2 - u),
                      0 === r && (f = f - s / 2 - u),
                      Math.abs(f) < .001 && (f = 0),
                      t.roundLengths && (f = Math.floor(f)),
                      k % t.slidesPerGroup == 0 && i.push(f),
                      h.push(f)) : (t.roundLengths && (f = Math.floor(f)),
                      (k - Math.min(n.params.slidesPerGroupSkip, k)) % n.params.slidesPerGroup == 0 && i.push(f),
                      h.push(f),
                      f = f + e + u);
                      n.virtualSize += e + u;
                      nt = e;
                      k += 1
                  }
              }
              if (n.virtualSize = Math.max(n.virtualSize, s) + w,
              d && rt && ("slide" === t.effect || "coverflow" === t.effect) && (a.style.width = `${n.virtualSize + u}px`),
              t.setWrapperSize && (a.style[n.getDirectionLabel("width")] = `${n.virtualSize + u}px`),
              tt && n.grid.updateWrapperSize(e, i),
              !t.centeredSlides) {
                  const r = [];
                  for (let u = 0; u < i.length; u += 1) {
                      let f = i[u];
                      t.roundLengths && (f = Math.floor(f));
                      i[u] <= n.virtualSize - s && r.push(f)
                  }
                  i = r;
                  Math.floor(n.virtualSize - s) - Math.floor(i[i.length - 1]) > 1 && i.push(n.virtualSize - s)
              }
              if (y && t.loop) {
                  const r = l[0] + u;
                  if (t.slidesPerGroup > 1) {
                      const u = Math.ceil((n.virtual.slidesBefore + n.virtual.slidesAfter) / t.slidesPerGroup)
                        , f = r * t.slidesPerGroup;
                      for (let n = 0; n < u; n += 1)
                          i.push(i[i.length - 1] + f)
                  }
                  for (let u = 0; u < n.virtual.slidesBefore + n.virtual.slidesAfter; u += 1)
                      1 === t.slidesPerGroup && i.push(i[i.length - 1] + r),
                      h.push(h[h.length - 1] + r),
                      n.virtualSize += r
              }
              if (0 === i.length && (i = [0]),
              0 !== u) {
                  const i = n.isHorizontal() && d ? "marginLeft" : n.getDirectionLabel("marginRight");
                  o.filter( (n, i) => !(t.cssMode && !t.loop) || i !== o.length - 1).forEach(n => {
                      n.style[i] = `${u}px`
                  }
                  )
              }
              if (t.centeredSlides && t.centeredSlidesBounds) {
                  let n = 0;
                  l.forEach(t => {
                      n += t + (u || 0)
                  }
                  );
                  n -= u;
                  const t = n - s;
                  i = i.map(n => n <= 0 ? -p : n > t ? t + w : n)
              }
              if (t.centerInsufficientSlides) {
                  let n = 0;
                  if (l.forEach(t => {
                      n += t + (u || 0)
                  }
                  ),
                  n -= u,
                  n < s) {
                      const t = (s - n) / 2;
                      i.forEach( (n, r) => {
                          i[r] = n - t
                      }
                      );
                      h.forEach( (n, i) => {
                          h[i] = n + t
                      }
                      )
                  }
              }
              if (Object.assign(n, {
                  slides: o,
                  snapGrid: i,
                  slidesGrid: h,
                  slidesSizesGrid: l
              }),
              t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
                  b(a, "--swiper-centered-offset-before", -i[0] + "px");
                  b(a, "--swiper-centered-offset-after", n.size / 2 - l[l.length - 1] / 2 + "px");
                  const t = -n.snapGrid[0]
                    , r = -n.slidesGrid[0];
                  n.snapGrid = n.snapGrid.map(n => n + t);
                  n.slidesGrid = n.slidesGrid.map(n => n + r)
              }
              if (g !== ut && n.emit("slidesLengthChange"),
              i.length !== ft && (n.params.watchOverflow && n.checkOverflow(),
              n.emit("snapGridLengthChange")),
              h.length !== ot && n.emit("slidesGridLengthChange"),
              t.watchSlidesProgress && n.updateSlidesOffset(),
              n.emit("slidesUpdated"),
              !(y || t.cssMode || "slide" !== t.effect && "fade" !== t.effect)) {
                  const i = `${t.containerModifierClass}backface-hidden`
                    , r = n.el.classList.contains(i);
                  g <= t.maxBackfaceHiddenSlides ? r || n.el.classList.add(i) : r && n.el.classList.remove(i)
              }
          }
      },
      updateAutoHeight: function(n) {
          const t = this
            , r = []
            , f = t.virtual && t.params.virtual.enabled;
          let i, u = 0;
          "number" == typeof n ? t.setTransition(n) : !0 === n && t.setTransition(t.params.speed);
          const e = n => f ? t.slides[t.getSlideIndexByData(n)] : t.slides[n];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
              if (t.params.centeredSlides)
                  (t.visibleSlides || []).forEach(n => {
                      r.push(n)
                  }
                  );
              else
                  for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                      const n = t.activeIndex + i;
                      if (n > t.slides.length && !f)
                          break;
                      r.push(e(n))
                  }
          else
              r.push(e(t.activeIndex));
          for (i = 0; i < r.length; i += 1)
              if (void 0 !== r[i]) {
                  const n = r[i].offsetHeight;
                  u = n > u ? n : u
              }
          (u || 0 === u) && (t.wrapperEl.style.height = `${u}px`)
      },
      updateSlidesOffset: function() {
          const n = this
            , t = n.slides
            , i = n.isElement ? n.isHorizontal() ? n.wrapperEl.offsetLeft : n.wrapperEl.offsetTop : 0;
          for (let r = 0; r < t.length; r += 1)
              t[r].swiperSlideOffset = (n.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) - i - n.cssOverflowAdjustment()
      },
      updateSlidesProgress: function(n) {
          void 0 === n && (n = this && this.translate || 0);
          const t = this
            , i = t.params
            , {slides: u, rtlTranslate: e, snapGrid: o} = t;
          if (0 !== u.length) {
              void 0 === u[0].swiperSlideOffset && t.updateSlidesOffset();
              let f = -n;
              e && (f = n);
              u.forEach(n => {
                  n.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass)
              }
              );
              t.visibleSlidesIndexes = [];
              t.visibleSlides = [];
              let r = i.spaceBetween;
              "string" == typeof r && r.indexOf("%") >= 0 ? r = parseFloat(r.replace("%", "")) / 100 * t.size : "string" == typeof r && (r = parseFloat(r));
              for (let n = 0; n < u.length; n += 1) {
                  const s = u[n];
                  let c = s.swiperSlideOffset;
                  i.cssMode && i.centeredSlides && (c -= u[0].swiperSlideOffset);
                  const a = (f + (i.centeredSlides ? t.minTranslate() : 0) - c) / (s.swiperSlideSize + r)
                    , v = (f - o[0] + (i.centeredSlides ? t.minTranslate() : 0) - c) / (s.swiperSlideSize + r)
                    , h = -(f - c)
                    , l = h + t.slidesSizesGrid[n]
                    , y = h >= 0 && h <= t.size - t.slidesSizesGrid[n];
                  (h >= 0 && h < t.size - 1 || l > 1 && l <= t.size || h <= 0 && l >= t.size) && (t.visibleSlides.push(s),
                  t.visibleSlidesIndexes.push(n),
                  u[n].classList.add(i.slideVisibleClass));
                  y && u[n].classList.add(i.slideFullyVisibleClass);
                  s.progress = e ? -a : a;
                  s.originalProgress = e ? -v : v
              }
          }
      },
      updateProgress: function(n) {
          const t = this;
          if (void 0 === n) {
              const i = t.rtlTranslate ? -1 : 1;
              n = t && t.translate && t.translate * i || 0
          }
          const f = t.params
            , o = t.maxTranslate() - t.minTranslate();
          let {progress: i, isBeginning: r, isEnd: u, progressLoop: e} = t;
          const s = r
            , h = u;
          if (0 === o)
              i = 0,
              r = !0,
              u = !0;
          else {
              i = (n - t.minTranslate()) / o;
              const f = Math.abs(n - t.minTranslate()) < 1
                , e = Math.abs(n - t.maxTranslate()) < 1;
              r = f || i <= 0;
              u = e || i >= 1;
              f && (i = 0);
              e && (i = 1)
          }
          if (f.loop) {
              const f = t.getSlideIndexByData(0)
                , o = t.getSlideIndexByData(t.slides.length - 1)
                , u = t.slidesGrid[f]
                , s = t.slidesGrid[o]
                , i = t.slidesGrid[t.slidesGrid.length - 1]
                , r = Math.abs(n);
              e = r >= u ? (r - u) / i : (r + i - s) / i;
              e > 1 && (e -= 1)
          }
          Object.assign(t, {
              progress: i,
              progressLoop: e,
              isBeginning: r,
              isEnd: u
          });
          (f.watchSlidesProgress || f.centeredSlides && f.autoHeight) && t.updateSlidesProgress(n);
          r && !s && t.emit("reachBeginning toEdge");
          u && !h && t.emit("reachEnd toEdge");
          (s && !r || h && !u) && t.emit("fromEdge");
          t.emit("progress", i)
      },
      updateSlidesClasses: function() {
          const t = this
            , {slides: i, params: n, slidesEl: c, activeIndex: f} = t
            , l = t.virtual && n.virtual.enabled
            , s = t.grid && n.grid && n.grid.rows > 1
            , h = t => r(c, `.${n.slideClass}${t}, swiper-slide${t}`)[0];
          let u, o, e;
          if (l)
              if (n.loop) {
                  let n = f - t.virtual.slidesBefore;
                  n < 0 && (n = t.virtual.slides.length + n);
                  n >= t.virtual.slides.length && (n -= t.virtual.slides.length);
                  u = h(`[data-swiper-slide-index="${n}"]`)
              } else
                  u = h(`[data-swiper-slide-index="${f}"]`);
          else
              s ? (u = i.filter(n => n.column === f)[0],
              e = i.filter(n => n.column === f + 1)[0],
              o = i.filter(n => n.column === f - 1)[0]) : u = i[f];
          u && (s || (e = function(n, t) {
              const i = [];
              for (; n.nextElementSibling; ) {
                  const r = n.nextElementSibling;
                  t ? r.matches(t) && i.push(r) : i.push(r);
                  n = r
              }
              return i
          }(u, `.${n.slideClass}, swiper-slide`)[0],
          n.loop && !e && (e = i[0]),
          o = function(n, t) {
              const i = [];
              for (; n.previousElementSibling; ) {
                  const r = n.previousElementSibling;
                  t ? r.matches(t) && i.push(r) : i.push(r);
                  n = r
              }
              return i
          }(u, `.${n.slideClass}, swiper-slide`)[0],
          n.loop && !1 && (o = i[i.length - 1])));
          i.forEach(t => {
              ct(t, t === u, n.slideActiveClass),
              ct(t, t === e, n.slideNextClass),
              ct(t, t === o, n.slidePrevClass)
          }
          );
          t.emitSlidesClasses()
      },
      updateActiveIndex: function(n) {
          const t = this
            , s = t.rtlTranslate ? t.translate : -t.translate
            , {snapGrid: e, params: r, activeIndex: o, realIndex: h, snapIndex: c} = t;
          let u, i = n;
          const l = n => {
              let i = n - t.virtual.slidesBefore;
              return i < 0 && (i = t.virtual.slides.length + i),
              i >= t.virtual.slides.length && (i -= t.virtual.slides.length),
              i
          }
          ;
          if (void 0 === i && (i = function(n) {
              const {slidesGrid: t, params: u} = n
                , r = n.rtlTranslate ? n.translate : -n.translate;
              let i;
              for (let n = 0; n < t.length; n += 1)
                  void 0 !== t[n + 1] ? r >= t[n] && r < t[n + 1] - (t[n + 1] - t[n]) / 2 ? i = n : r >= t[n] && r < t[n + 1] && (i = n + 1) : r >= t[n] && (i = n);
              return u.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0),
              i
          }(t)),
          e.indexOf(s) >= 0)
              u = e.indexOf(s);
          else {
              const n = Math.min(r.slidesPerGroupSkip, i);
              u = n + Math.floor((i - n) / r.slidesPerGroup)
          }
          if (u >= e.length && (u = e.length - 1),
          i === o && !t.params.loop)
              return void (u !== c && (t.snapIndex = u,
              t.emit("snapIndexChange")));
          if (i === o && t.params.loop && t.virtual && t.params.virtual.enabled)
              return void (t.realIndex = l(i));
          const a = t.grid && r.grid && r.grid.rows > 1;
          let f;
          if (t.virtual && r.virtual.enabled && r.loop)
              f = l(i);
          else if (a) {
              const u = t.slides.filter(n => n.column === i)[0];
              let n = parseInt(u.getAttribute("data-swiper-slide-index"), 10);
              Number.isNaN(n) && (n = Math.max(t.slides.indexOf(u), 0));
              f = Math.floor(n / r.grid.rows)
          } else if (t.slides[i]) {
              const n = t.slides[i].getAttribute("data-swiper-slide-index");
              f = n ? parseInt(n, 10) : i
          } else
              f = i;
          Object.assign(t, {
              previousSnapIndex: c,
              snapIndex: u,
              previousRealIndex: h,
              realIndex: f,
              previousIndex: o,
              activeIndex: i
          });
          t.initialized && at(t);
          t.emit("activeIndexChange");
          t.emit("snapIndexChange");
          (t.initialized || t.params.runCallbacksOnInit) && (h !== f && t.emit("realIndexChange"),
          t.emit("slideChange"))
      },
      updateClickedSlide: function(n, t) {
          const i = this
            , u = i.params;
          let r = n.closest(`.${u.slideClass}, swiper-slide`);
          !r && i.isElement && t && t.length > 1 && t.includes(n) && [...t.slice(t.indexOf(n) + 1, t.length)].forEach(n => {
              !r && n.matches && n.matches(`.${u.slideClass}, swiper-slide`) && (r = n)
          }
          );
          let f, e = !1;
          if (r)
              for (let n = 0; n < i.slides.length; n += 1)
                  if (i.slides[n] === r) {
                      e = !0;
                      f = n;
                      break
                  }
          if (!r || !e)
              return i.clickedSlide = void 0,
              void (i.clickedIndex = void 0);
          i.clickedSlide = r;
          i.clickedIndex = i.virtual && i.params.virtual.enabled ? parseInt(r.getAttribute("data-swiper-slide-index"), 10) : f;
          u.slideToClickedSlide && void 0 !== i.clickedIndex && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide()
      }
  };
  ri = {
      getTranslate: function(n) {
          void 0 === n && (n = this.isHorizontal() ? "x" : "y");
          const {params: r, rtlTranslate: u, translate: i, wrapperEl: f} = this;
          if (r.virtualTranslate)
              return u ? -i : i;
          if (r.cssMode)
              return i;
          let t = ft(f, n);
          return t += this.cssOverflowAdjustment(),
          u && (t = -t),
          t || 0
      },
      setTranslate: function(n, t) {
          const i = this
            , {rtlTranslate: h, params: f, wrapperEl: e, progress: c} = i;
          let o, r = 0, u = 0;
          i.isHorizontal() ? r = h ? -n : n : u = n;
          f.roundLengths && (r = Math.floor(r),
          u = Math.floor(u));
          i.previousTranslate = i.translate;
          i.translate = i.isHorizontal() ? r : u;
          f.cssMode ? e[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -r : -u : f.virtualTranslate || (i.isHorizontal() ? r -= i.cssOverflowAdjustment() : u -= i.cssOverflowAdjustment(),
          e.style.transform = `translate3d(${r}px, ${u}px, 0px)`);
          const s = i.maxTranslate() - i.minTranslate();
          o = 0 === s ? 0 : (n - i.minTranslate()) / s;
          o !== c && i.updateProgress(n);
          i.emit("setTranslate", i.translate, t)
      },
      minTranslate: function() {
          return -this.snapGrid[0]
      },
      maxTranslate: function() {
          return -this.snapGrid[this.snapGrid.length - 1]
      },
      translateTo: function(n, t, i, r, u) {
          void 0 === n && (n = 0);
          void 0 === t && (t = this.params.speed);
          void 0 === i && (i = !0);
          void 0 === r && (r = !0);
          const f = this
            , {params: o, wrapperEl: s} = f;
          if (f.animating && o.preventInteractionOnTransition)
              return !1;
          const h = f.minTranslate()
            , c = f.maxTranslate();
          let e;
          if (e = r && n > h ? h : r && n < c ? c : n,
          f.updateProgress(e),
          o.cssMode) {
              const n = f.isHorizontal();
              if (0 === t)
                  s[n ? "scrollLeft" : "scrollTop"] = -e;
              else {
                  if (!f.support.smoothScroll)
                      return dt({
                          swiper: f,
                          targetPosition: -e,
                          side: n ? "left" : "top"
                      }),
                      !0;
                  s.scrollTo({
                      [n ? "left" : "top"]: -e,
                      behavior: "smooth"
                  })
              }
              return !0
          }
          return 0 === t ? (f.setTransition(0),
          f.setTranslate(e),
          i && (f.emit("beforeTransitionStart", t, u),
          f.emit("transitionEnd"))) : (f.setTransition(t),
          f.setTranslate(e),
          i && (f.emit("beforeTransitionStart", t, u),
          f.emit("transitionStart")),
          f.animating || (f.animating = !0,
          f.onTranslateToWrapperTransitionEnd || (f.onTranslateToWrapperTransitionEnd = function(n) {
              f && !f.destroyed && n.target === this && (f.wrapperEl.removeEventListener("transitionend", f.onTranslateToWrapperTransitionEnd),
              f.onTranslateToWrapperTransitionEnd = null,
              delete f.onTranslateToWrapperTransitionEnd,
              f.animating = !1,
              i && f.emit("transitionEnd"))
          }
          ),
          f.wrapperEl.addEventListener("transitionend", f.onTranslateToWrapperTransitionEnd))),
          !0
      }
  };
  fi = {
      slideTo: function(n, t, i, r, u) {
          void 0 === n && (n = 0);
          void 0 === i && (i = !0);
          "string" == typeof n && (n = parseInt(n, 10));
          const f = this;
          let e = n;
          e < 0 && (e = 0);
          const {params: h, snapGrid: v, slidesGrid: c, previousIndex: b, activeIndex: l, rtlTranslate: a, wrapperEl: y, enabled: k} = f;
          if (!k && !r && !u || f.destroyed || f.animating && h.preventInteractionOnTransition)
              return !1;
          void 0 === t && (t = f.params.speed);
          const w = Math.min(f.params.slidesPerGroupSkip, e);
          let p = w + Math.floor((e - w) / f.params.slidesPerGroup);
          p >= v.length && (p = v.length - 1);
          const o = -v[p];
          if (h.normalizeSlideIndex)
              for (let n = 0; n < c.length; n += 1) {
                  const t = -Math.floor(100 * o)
                    , i = Math.floor(100 * c[n])
                    , r = Math.floor(100 * c[n + 1]);
                  void 0 !== c[n + 1] ? t >= i && t < r - (r - i) / 2 ? e = n : t >= i && t < r && (e = n + 1) : t >= i && (e = n)
              }
          if (f.initialized && e !== l && (!f.allowSlideNext && (a ? o > f.translate && o > f.minTranslate() : o < f.translate && o < f.minTranslate()) || !f.allowSlidePrev && o > f.translate && o > f.maxTranslate() && (l || 0) !== e))
              return !1;
          let s;
          if (e !== (b || 0) && i && f.emit("beforeSlideChangeStart"),
          f.updateProgress(o),
          s = e > l ? "next" : e < l ? "prev" : "reset",
          a && -o === f.translate || !a && o === f.translate)
              return f.updateActiveIndex(e),
              h.autoHeight && f.updateAutoHeight(),
              f.updateSlidesClasses(),
              "slide" !== h.effect && f.setTranslate(o),
              "reset" !== s && (f.transitionStart(i, s),
              f.transitionEnd(i, s)),
              !1;
          if (h.cssMode) {
              const n = f.isHorizontal()
                , i = a ? o : -o;
              if (0 === t) {
                  const t = f.virtual && f.params.virtual.enabled;
                  t && (f.wrapperEl.style.scrollSnapType = "none",
                  f._immediateVirtual = !0);
                  t && !f._cssModeVirtualInitialSet && f.params.initialSlide > 0 ? (f._cssModeVirtualInitialSet = !0,
                  requestAnimationFrame( () => {
                      y[n ? "scrollLeft" : "scrollTop"] = i
                  }
                  )) : y[n ? "scrollLeft" : "scrollTop"] = i;
                  t && requestAnimationFrame( () => {
                      f.wrapperEl.style.scrollSnapType = "",
                      f._immediateVirtual = !1
                  }
                  )
              } else {
                  if (!f.support.smoothScroll)
                      return dt({
                          swiper: f,
                          targetPosition: i,
                          side: n ? "left" : "top"
                      }),
                      !0;
                  y.scrollTo({
                      [n ? "left" : "top"]: i,
                      behavior: "smooth"
                  })
              }
              return !0
          }
          return f.setTransition(t),
          f.setTranslate(o),
          f.updateActiveIndex(e),
          f.updateSlidesClasses(),
          f.emit("beforeTransitionStart", t, r),
          f.transitionStart(i, s),
          0 === t ? f.transitionEnd(i, s) : f.animating || (f.animating = !0,
          f.onSlideToWrapperTransitionEnd || (f.onSlideToWrapperTransitionEnd = function(n) {
              f && !f.destroyed && n.target === this && (f.wrapperEl.removeEventListener("transitionend", f.onSlideToWrapperTransitionEnd),
              f.onSlideToWrapperTransitionEnd = null,
              delete f.onSlideToWrapperTransitionEnd,
              f.transitionEnd(i, s))
          }
          ),
          f.wrapperEl.addEventListener("transitionend", f.onSlideToWrapperTransitionEnd)),
          !0
      },
      slideToLoop: function(n, t, i, r) {
          (void 0 === n && (n = 0),
          void 0 === i && (i = !0),
          "string" == typeof n) && (n = parseInt(n, 10));
          const u = this;
          if (!u.destroyed) {
              void 0 === t && (t = u.params.speed);
              const e = u.grid && u.params.grid && u.params.grid.rows > 1;
              let f = n;
              if (u.params.loop)
                  if (u.virtual && u.params.virtual.enabled)
                      f += u.virtual.slidesBefore;
                  else {
                      let n;
                      if (e) {
                          const t = f * u.params.grid.rows;
                          n = u.slides.filter(n => 1 * n.getAttribute("data-swiper-slide-index") === t)[0].column
                      } else
                          n = u.getSlideIndexByData(f);
                      const s = e ? Math.ceil(u.slides.length / u.params.grid.rows) : u.slides.length
                        , {centeredSlides: i} = u.params;
                      let t = u.params.slidesPerView;
                      "auto" === t ? t = u.slidesPerViewDynamic() : (t = Math.ceil(parseFloat(u.params.slidesPerView, 10)),
                      i && t % 2 == 0 && (t += 1));
                      let o = s - n < t;
                      if (i && (o = o || n < Math.ceil(t / 2)),
                      r && i && "auto" !== u.params.slidesPerView && !e && (o = !1),
                      o) {
                          const t = i ? n < u.activeIndex ? "prev" : "next" : n - u.activeIndex - 1 < u.params.slidesPerView ? "next" : "prev";
                          u.loopFix({
                              direction: t,
                              slideTo: !0,
                              activeSlideIndex: "next" === t ? n + 1 : n - s + 1,
                              slideRealIndex: "next" === t ? u.realIndex : void 0
                          })
                      }
                      if (e) {
                          const n = f * u.params.grid.rows;
                          f = u.slides.filter(t => 1 * t.getAttribute("data-swiper-slide-index") === n)[0].column
                      } else
                          f = u.getSlideIndexByData(f)
                  }
              return requestAnimationFrame( () => {
                  u.slideTo(f, t, i, r)
              }
              ),
              u
          }
      },
      slideNext: function(n, t, i) {
          void 0 === t && (t = !0);
          const r = this
            , {enabled: o, params: u, animating: s} = r;
          if (!o || r.destroyed)
              return r;
          void 0 === n && (n = r.params.speed);
          let f = u.slidesPerGroup;
          "auto" === u.slidesPerView && 1 === u.slidesPerGroup && u.slidesPerGroupAuto && (f = Math.max(r.slidesPerViewDynamic("current", !0), 1));
          const e = r.activeIndex < u.slidesPerGroupSkip ? 1 : f
            , h = r.virtual && u.virtual.enabled;
          if (u.loop) {
              if (s && !h && u.loopPreventsSliding)
                  return !1;
              if (r.loopFix({
                  direction: "next"
              }),
              r._clientLeft = r.wrapperEl.clientLeft,
              r.activeIndex === r.slides.length - 1 && u.cssMode)
                  return requestAnimationFrame( () => {
                      r.slideTo(r.activeIndex + e, n, t, i)
                  }
                  ),
                  !0
          }
          return u.rewind && r.isEnd ? r.slideTo(0, n, t, i) : r.slideTo(r.activeIndex + e, n, t, i)
      },
      slidePrev: function(n, t, i) {
          function s(n) {
              return n < 0 ? -Math.floor(Math.abs(n)) : Math.floor(n)
          }
          void 0 === t && (t = !0);
          const r = this
            , {params: u, snapGrid: e, slidesGrid: c, rtlTranslate: l, enabled: a, animating: v} = r;
          if (!a || r.destroyed)
              return r;
          void 0 === n && (n = r.params.speed);
          const y = r.virtual && u.virtual.enabled;
          if (u.loop) {
              if (v && !y && u.loopPreventsSliding)
                  return !1;
              r.loopFix({
                  direction: "prev"
              });
              r._clientLeft = r.wrapperEl.clientLeft
          }
          const h = s(l ? r.translate : -r.translate)
            , p = e.map(n => s(n));
          let o = e[p.indexOf(h) - 1];
          if (void 0 === o && u.cssMode) {
              let n;
              e.forEach( (t, i) => {
                  h >= t && (n = i)
              }
              );
              void 0 !== n && (o = e[n > 0 ? n - 1 : n])
          }
          let f = 0;
          if (void 0 !== o && (f = c.indexOf(o),
          f < 0 && (f = r.activeIndex - 1),
          "auto" === u.slidesPerView && 1 === u.slidesPerGroup && u.slidesPerGroupAuto && (f = f - r.slidesPerViewDynamic("previous", !0) + 1,
          f = Math.max(f, 0))),
          u.rewind && r.isBeginning) {
              const u = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1;
              return r.slideTo(u, n, t, i)
          }
          return u.loop && 0 === r.activeIndex && u.cssMode ? (requestAnimationFrame( () => {
              r.slideTo(f, n, t, i)
          }
          ),
          !0) : r.slideTo(f, n, t, i)
      },
      slideReset: function(n, t, i) {
          void 0 === t && (t = !0);
          const r = this;
          if (!r.destroyed)
              return void 0 === n && (n = r.params.speed),
              r.slideTo(r.activeIndex, n, t, i)
      },
      slideToClosest: function(n, t, i, r) {
          void 0 === t && (t = !0);
          void 0 === r && (r = .5);
          const u = this;
          if (!u.destroyed) {
              void 0 === n && (n = u.params.speed);
              let f = u.activeIndex;
              const s = Math.min(u.params.slidesPerGroupSkip, f)
                , e = s + Math.floor((f - s) / u.params.slidesPerGroup)
                , o = u.rtlTranslate ? u.translate : -u.translate;
              if (o >= u.snapGrid[e]) {
                  const n = u.snapGrid[e];
                  o - n > (u.snapGrid[e + 1] - n) * r && (f += u.params.slidesPerGroup)
              } else {
                  const n = u.snapGrid[e - 1];
                  o - n <= (u.snapGrid[e] - n) * r && (f -= u.params.slidesPerGroup)
              }
              return f = Math.max(f, 0),
              f = Math.min(f, u.slidesGrid.length - 1),
              u.slideTo(f, n, t, i)
          }
      },
      slideToClickedSlide: function() {
          const n = this;
          if (!n.destroyed) {
              const {params: i, slidesEl: e} = n
                , u = "auto" === i.slidesPerView ? n.slidesPerViewDynamic() : i.slidesPerView;
              let f, t = n.clickedIndex;
              const o = n.isElement ? "swiper-slide" : `.${i.slideClass}`;
              if (i.loop) {
                  if (n.animating)
                      return;
                  f = parseInt(n.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
                  i.centeredSlides ? t < n.loopedSlides - u / 2 || t > n.slides.length - n.loopedSlides + u / 2 ? (n.loopFix(),
                  t = n.getSlideIndex(r(e, `${o}[data-swiper-slide-index="${f}"]`)[0]),
                  l( () => {
                      n.slideTo(t)
                  }
                  )) : n.slideTo(t) : t > n.slides.length - u ? (n.loopFix(),
                  t = n.getSlideIndex(r(e, `${o}[data-swiper-slide-index="${f}"]`)[0]),
                  l( () => {
                      n.slideTo(t)
                  }
                  )) : n.slideTo(t)
              } else
                  n.slideTo(t)
          }
      }
  };
  ei = {
      loopCreate: function(n) {
          const t = this
            , {params: i, slidesEl: h} = t;
          if (i.loop && (!t.virtual || !t.params.virtual.enabled)) {
              const u = () => {
                  r(h, `.${i.slideClass}, swiper-slide`).forEach( (n, t) => {
                      n.setAttribute("data-swiper-slide-index", t)
                  }
                  )
              }
                , o = t.grid && i.grid && i.grid.rows > 1
                , e = i.slidesPerGroup * (o ? i.grid.rows : 1)
                , c = t.slides.length % e != 0
                , l = o && t.slides.length % i.grid.rows != 0
                , s = n => {
                  for (let r = 0; r < n; r += 1) {
                      const n = t.isElement ? f("swiper-slide", [i.slideBlankClass]) : f("div", [i.slideClass, i.slideBlankClass]);
                      t.slidesEl.append(n)
                  }
              }
              ;
              c ? (i.loopAddBlankSlides ? (s(e - t.slides.length % e),
              t.recalcSlides(),
              t.updateSlides()) : nt("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"),
              u()) : l ? (i.loopAddBlankSlides ? (s(i.grid.rows - t.slides.length % i.grid.rows),
              t.recalcSlides(),
              t.updateSlides()) : nt("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"),
              u()) : u();
              t.loopFix({
                  slideRealIndex: n,
                  direction: i.centeredSlides ? void 0 : "next"
              })
          }
      },
      loopFix: function(n) {
          let {slideRealIndex: k, slideTo: w=!0, direction: v, setTranslate: y, activeSlideIndex: l, byController: ot, byMousewheel: it} = void 0 === n ? {} : n;
          const t = this;
          if (t.params.loop) {
              t.emit("beforeLoopFix");
              const {slides: r, allowSlidePrev: rt, allowSlideNext: ut, slidesEl: ft, params: i} = t
                , {centeredSlides: et} = i;
              if (t.allowSlidePrev = !0,
              t.allowSlideNext = !0,
              t.virtual && i.virtual.enabled)
                  return w && (i.centeredSlides || 0 !== t.snapIndex ? i.centeredSlides && t.snapIndex < i.slidesPerView ? t.slideTo(t.virtual.slides.length + t.snapIndex, 0, !1, !0) : t.snapIndex === t.snapGrid.length - 1 && t.slideTo(t.virtual.slidesBefore, 0, !1, !0) : t.slideTo(t.virtual.slides.length, 0, !1, !0)),
                  t.allowSlidePrev = rt,
                  t.allowSlideNext = ut,
                  void t.emit("loopFix");
              let f = i.slidesPerView;
              "auto" === f ? f = t.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(i.slidesPerView, 10)),
              et && f % 2 == 0 && (f += 1));
              const a = i.slidesPerGroupAuto ? f : i.slidesPerGroup;
              let u = a;
              u % a != 0 && (u += a - u % a);
              u += i.loopAdditionalSlides;
              t.loopedSlides = u;
              const e = t.grid && i.grid && i.grid.rows > 1;
              r.length < f + u ? nt("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : e && "row" === i.grid.fill && nt("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
              const s = []
                , h = [];
              let c = t.activeIndex;
              void 0 === l ? l = t.getSlideIndex(r.filter(n => n.classList.contains(i.slideActiveClass))[0]) : c = l;
              const d = "next" === v || !v
                , g = "prev" === v || !v;
              let tt = 0
                , b = 0;
              const o = e ? Math.ceil(r.length / i.grid.rows) : r.length
                , p = (e ? r[l].column : l) + (et && void 0 === y ? -f / 2 + .5 : 0);
              if (p < u) {
                  tt = Math.max(u - p, a);
                  for (let n = 0; n < u - p; n += 1) {
                      const t = n - Math.floor(n / o) * o;
                      if (e) {
                          const n = o - t - 1;
                          for (let t = r.length - 1; t >= 0; t -= 1)
                              r[t].column === n && s.push(t)
                      } else
                          s.push(o - t - 1)
                  }
              } else if (p + f > o - u) {
                  b = Math.max(p - (o - 2 * u), a);
                  for (let n = 0; n < b; n += 1) {
                      const t = n - Math.floor(n / o) * o;
                      e ? r.forEach( (n, i) => {
                          n.column === t && h.push(i)
                      }
                      ) : h.push(t)
                  }
              }
              if (t.__preventObserver__ = !0,
              requestAnimationFrame( () => {
                  t.__preventObserver__ = !1
              }
              ),
              g && s.forEach(n => {
                  r[n].swiperLoopMoveDOM = !0,
                  ft.prepend(r[n]),
                  r[n].swiperLoopMoveDOM = !1
              }
              ),
              d && h.forEach(n => {
                  r[n].swiperLoopMoveDOM = !0,
                  ft.append(r[n]),
                  r[n].swiperLoopMoveDOM = !1
              }
              ),
              t.recalcSlides(),
              "auto" === i.slidesPerView ? t.updateSlides() : e && (s.length > 0 && g || h.length > 0 && d) && t.slides.forEach( (n, i) => {
                  t.grid.updateSlide(i, n, t.slides)
              }
              ),
              i.watchSlidesProgress && t.updateSlidesOffset(),
              w)
                  if (s.length > 0 && g) {
                      if (void 0 === k) {
                          const i = t.slidesGrid[c]
                            , n = t.slidesGrid[c + tt] - i;
                          it ? t.setTranslate(t.translate - n) : (t.slideTo(c + Math.ceil(tt), 0, !1, !0),
                          y && (t.touchEventsData.startTranslate = t.touchEventsData.startTranslate - n,
                          t.touchEventsData.currentTranslate = t.touchEventsData.currentTranslate - n))
                      } else if (y) {
                          const n = e ? s.length / i.grid.rows : s.length;
                          t.slideTo(t.activeIndex + n, 0, !1, !0);
                          t.touchEventsData.currentTranslate = t.translate
                      }
                  } else if (h.length > 0 && d)
                      if (void 0 === k) {
                          const i = t.slidesGrid[c]
                            , n = t.slidesGrid[c - b] - i;
                          it ? t.setTranslate(t.translate - n) : (t.slideTo(c - b, 0, !1, !0),
                          y && (t.touchEventsData.startTranslate = t.touchEventsData.startTranslate - n,
                          t.touchEventsData.currentTranslate = t.touchEventsData.currentTranslate - n))
                      } else {
                          const n = e ? h.length / i.grid.rows : h.length;
                          t.slideTo(t.activeIndex - n, 0, !1, !0)
                      }
              if (t.allowSlidePrev = rt,
              t.allowSlideNext = ut,
              t.controller && t.controller.control && !ot) {
                  const n = {
                      slideRealIndex: k,
                      direction: v,
                      setTranslate: y,
                      activeSlideIndex: l,
                      byController: !0
                  };
                  Array.isArray(t.controller.control) ? t.controller.control.forEach(t => {
                      !t.destroyed && t.params.loop && t.loopFix({
                          ...n,
                          slideTo: t.params.slidesPerView === i.slidesPerView && w
                      })
                  }
                  ) : t.controller.control instanceof t.constructor && t.controller.control.params.loop && t.controller.control.loopFix({
                      ...n,
                      slideTo: t.controller.control.params.slidesPerView === i.slidesPerView && w
                  })
              }
              t.emit("loopFix")
          }
      },
      loopDestroy: function() {
          const n = this
            , {params: i, slidesEl: r} = n;
          if (i.loop && (!n.virtual || !n.params.virtual.enabled)) {
              n.recalcSlides();
              const t = [];
              n.slides.forEach(n => {
                  const i = void 0 === n.swiperSlideIndex ? 1 * n.getAttribute("data-swiper-slide-index") : n.swiperSlideIndex;
                  t[i] = n
              }
              );
              n.slides.forEach(n => {
                  n.removeAttribute("data-swiper-slide-index")
              }
              );
              t.forEach(n => {
                  r.append(n)
              }
              );
              n.recalcSlides();
              n.slideTo(n.realIndex, 0)
          }
      }
  };
  const hi = (n, t) => {
      const u = i()
        , {params: f, el: e, wrapperEl: c, device: s} = n
        , o = !!f.nested
        , r = "on" === t ? "addEventListener" : "removeEventListener"
        , h = t;
      u[r]("touchstart", n.onDocumentTouchStart, {
          passive: !1,
          capture: o
      });
      e[r]("touchstart", n.onTouchStart, {
          passive: !1
      });
      e[r]("pointerdown", n.onTouchStart, {
          passive: !1
      });
      u[r]("touchmove", n.onTouchMove, {
          passive: !1,
          capture: o
      });
      u[r]("pointermove", n.onTouchMove, {
          passive: !1,
          capture: o
      });
      u[r]("touchend", n.onTouchEnd, {
          passive: !0
      });
      u[r]("pointerup", n.onTouchEnd, {
          passive: !0
      });
      u[r]("pointercancel", n.onTouchEnd, {
          passive: !0
      });
      u[r]("touchcancel", n.onTouchEnd, {
          passive: !0
      });
      u[r]("pointerout", n.onTouchEnd, {
          passive: !0
      });
      u[r]("pointerleave", n.onTouchEnd, {
          passive: !0
      });
      u[r]("contextmenu", n.onTouchEnd, {
          passive: !0
      });
      (f.preventClicks || f.preventClicksPropagation) && e[r]("click", n.onClick, !0);
      f.cssMode && c[r]("scroll", n.onScroll);
      f.updateOnWindowResize ? n[h](s.ios || s.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", si, !0) : n[h]("observerUpdate", si, !0);
      e[r]("load", n.onLoad, {
          capture: !0
      })
  }
    , ci = (n, t) => n.grid && t.grid && t.grid.rows > 1;
  vt = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      eventsPrefix: "swiper",
      enabled: !0,
      focusableElements: "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopAddBlankSlides: !0,
      loopAdditionalSlides: 0,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1
  };
  const yt = {
      eventsEmitter: ti,
      update: ii,
      translate: ri,
      transition: {
          setTransition: function(n, t) {
              const i = this;
              i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${n}ms`,
              i.wrapperEl.style.transitionDelay = 0 === n ? "0ms" : "");
              i.emit("setTransition", n, t)
          },
          transitionStart: function(n, t) {
              void 0 === n && (n = !0);
              const i = this
                , {params: r} = i;
              r.cssMode || (r.autoHeight && i.updateAutoHeight(),
              ui({
                  swiper: i,
                  runCallbacks: n,
                  direction: t,
                  step: "Start"
              }))
          },
          transitionEnd: function(n, t) {
              void 0 === n && (n = !0);
              const i = this
                , {params: r} = i;
              i.animating = !1;
              r.cssMode || (i.setTransition(0),
              ui({
                  swiper: i,
                  runCallbacks: n,
                  direction: t,
                  step: "End"
              }))
          }
      },
      slide: fi,
      loop: ei,
      grabCursor: {
          setGrabCursor: function(n) {
              const t = this;
              if (t.params.simulateTouch && (!t.params.watchOverflow || !t.isLocked) && !t.params.cssMode) {
                  const i = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                  t.isElement && (t.__preventObserver__ = !0);
                  i.style.cursor = "move";
                  i.style.cursor = n ? "grabbing" : "grab";
                  t.isElement && requestAnimationFrame( () => {
                      t.__preventObserver__ = !1
                  }
                  )
              }
          },
          unsetGrabCursor: function() {
              const n = this;
              n.params.watchOverflow && n.isLocked || n.params.cssMode || (n.isElement && (n.__preventObserver__ = !0),
              n["container" === n.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
              n.isElement && requestAnimationFrame( () => {
                  n.__preventObserver__ = !1
              }
              ))
          }
      },
      events: {
          attachEvents: function() {
              const n = this
                , {params: t} = n;
              n.onTouchStart = vi.bind(n);
              n.onTouchMove = yi.bind(n);
              n.onTouchEnd = pi.bind(n);
              n.onDocumentTouchStart = di.bind(n);
              t.cssMode && (n.onScroll = bi.bind(n));
              n.onClick = wi.bind(n);
              n.onLoad = ki.bind(n);
              hi(n, "on")
          },
          detachEvents: function() {
              hi(this, "off")
          }
      },
      breakpoints: {
          setBreakpoint: function() {
              const n = this
                , {realIndex: o, initialized: s, params: t, el: e} = n
                , r = t.breakpoints;
              if (r && (!r || 0 !== Object.keys(r).length)) {
                  const f = n.getBreakpoint(r, n.params.breakpointsBase, n.el);
                  if (f && n.currentBreakpoint !== f) {
                      const i = (f in r ? r[f] : void 0) || n.originalParams
                        , h = ci(n, t)
                        , c = ci(n, i)
                        , l = n.params.grabCursor
                        , a = i.grabCursor
                        , v = t.enabled;
                      h && !c ? (e.classList.remove(`${t.containerModifierClass}grid`, `${t.containerModifierClass}grid-column`),
                      n.emitContainerClasses()) : !h && c && (e.classList.add(`${t.containerModifierClass}grid`),
                      (i.grid.fill && "column" === i.grid.fill || !i.grid.fill && "column" === t.grid.fill) && e.classList.add(`${t.containerModifierClass}grid-column`),
                      n.emitContainerClasses());
                      l && !a ? n.unsetGrabCursor() : !l && a && n.setGrabCursor();
                      ["navigation", "pagination", "scrollbar"].forEach(r => {
                          if (void 0 !== i[r]) {
                              const u = t[r] && t[r].enabled
                                , f = i[r] && i[r].enabled;
                              u && !f && n[r].disable();
                              !u && f && n[r].enable()
                          }
                      }
                      );
                      const y = i.direction && i.direction !== t.direction
                        , k = t.loop && (i.slidesPerView !== t.slidesPerView || y)
                        , p = t.loop;
                      y && s && n.changeDirection();
                      u(n.params, i);
                      const w = n.params.enabled
                        , b = n.params.loop;
                      Object.assign(n, {
                          allowTouchMove: n.params.allowTouchMove,
                          allowSlideNext: n.params.allowSlideNext,
                          allowSlidePrev: n.params.allowSlidePrev
                      });
                      v && !w ? n.disable() : !v && w && n.enable();
                      n.currentBreakpoint = f;
                      n.emit("_beforeBreakpoint", i);
                      s && (k ? (n.loopDestroy(),
                      n.loopCreate(o),
                      n.updateSlides()) : !p && b ? (n.loopCreate(o),
                      n.updateSlides()) : p && !b && n.loopDestroy());
                      n.emit("breakpoint", i)
                  }
              }
          },
          getBreakpoint: function(n, i, r) {
              if (void 0 === i && (i = "window"),
              n && ("container" !== i || r)) {
                  let u = !1;
                  const e = t()
                    , o = "window" === i ? e.innerHeight : r.clientHeight
                    , f = Object.keys(n).map(n => {
                      if ("string" == typeof n && 0 === n.indexOf("@")) {
                          const t = parseFloat(n.substr(1));
                          return {
                              value: o * t,
                              point: n
                          }
                      }
                      return {
                          value: n,
                          point: n
                      }
                  }
                  );
                  f.sort( (n, t) => parseInt(n.value, 10) - parseInt(t.value, 10));
                  for (let n = 0; n < f.length; n += 1) {
                      const {point: t, value: o} = f[n];
                      "window" === i ? e.matchMedia(`(min-width: ${o}px)`).matches && (u = t) : o <= r.clientWidth && (u = t)
                  }
                  return u || "max"
              }
          }
      },
      checkOverflow: {
          checkOverflow: function() {
              const n = this
                , {isLocked: t, params: i} = n
                , {slidesOffsetBefore: r} = i;
              if (r) {
                  const t = n.slides.length - 1
                    , i = n.slidesGrid[t] + n.slidesSizesGrid[t] + 2 * r;
                  n.isLocked = n.size > i
              } else
                  n.isLocked = 1 === n.snapGrid.length;
              !0 === i.allowSlideNext && (n.allowSlideNext = !n.isLocked);
              !0 === i.allowSlidePrev && (n.allowSlidePrev = !n.isLocked);
              t && t !== n.isLocked && (n.isEnd = !1);
              t !== n.isLocked && n.emit(n.isLocked ? "lock" : "unlock")
          }
      },
      classes: {
          addClasses: function() {
              const t = this
                , {classNames: i, params: n, rtl: u, el: f, device: r} = t
                , e = function(n, t) {
                  const i = [];
                  return n.forEach(n => {
                      "object" == typeof n ? Object.keys(n).forEach(r => {
                          n[r] && i.push(t + r)
                      }
                      ) : "string" == typeof n && i.push(t + n)
                  }
                  ),
                  i
              }(["initialized", n.direction, {
                  "free-mode": t.params.freeMode && n.freeMode.enabled
              }, {
                  autoheight: n.autoHeight
              }, {
                  rtl: u
              }, {
                  grid: n.grid && n.grid.rows > 1
              }, {
                  "grid-column": n.grid && n.grid.rows > 1 && "column" === n.grid.fill
              }, {
                  android: r.android
              }, {
                  ios: r.ios
              }, {
                  "css-mode": n.cssMode
              }, {
                  centered: n.cssMode && n.centeredSlides
              }, {
                  "watch-progress": n.watchSlidesProgress
              }], n.containerModifierClass);
              i.push(...e);
              f.classList.add(...i);
              t.emitContainerClasses()
          },
          removeClasses: function() {
              const {el: n, classNames: t} = this;
              n.classList.remove(...t);
              this.emitContainerClasses()
          }
      }
  }
    , pt = {};
  class o {
      constructor() {
          let f, t;
          for (var s = arguments.length, r = new Array(s), e = 0; e < s; e++)
              r[e] = arguments[e];
          1 === r.length && r[0].constructor && "Object" === Object.prototype.toString.call(r[0]).slice(8, -1) ? t = r[0] : [f,t] = r;
          t || (t = {});
          t = u({}, t);
          f && !t.el && (t.el = f);
          const h = i();
          if (t.el && "string" == typeof t.el && h.querySelectorAll(t.el).length > 1) {
              const n = [];
              return h.querySelectorAll(t.el).forEach(i => {
                  const r = u({}, t, {
                      el: i
                  });
                  n.push(new o(r))
              }
              ),
              n
          }
          const n = this;
          n.__swiper__ = !0;
          n.support = gt();
          n.device = ni({
              userAgent: t.userAgent
          });
          n.browser = ai();
          n.eventsListeners = {};
          n.eventsAnyListeners = [];
          n.modules = [...n.__modules__];
          t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
          const c = {};
          n.modules.forEach(i => {
              i({
                  params: t,
                  swiper: n,
                  extendParams: gi(t, c),
                  on: n.on.bind(n),
                  once: n.once.bind(n),
                  off: n.off.bind(n),
                  emit: n.emit.bind(n)
              })
          }
          );
          const l = u({}, vt, c);
          return n.params = u({}, l, pt, t),
          n.originalParams = u({}, n.params),
          n.passedParams = u({}, t),
          n.params && n.params.on && Object.keys(n.params.on).forEach(t => {
              n.on(t, n.params.on[t])
          }
          ),
          n.params && n.params.onAny && n.onAny(n.params.onAny),
          Object.assign(n, {
              enabled: n.params.enabled,
              el: f,
              classNames: [],
              slides: [],
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === n.params.direction,
              isVertical: () => "vertical" === n.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              cssOverflowAdjustment() {
                  return Math.trunc(this.translate / 8388608) * 8388608
              },
              allowSlideNext: n.params.allowSlideNext,
              allowSlidePrev: n.params.allowSlidePrev,
              touchEventsData: {
                  isTouched: void 0,
                  isMoved: void 0,
                  allowTouchCallbacks: void 0,
                  touchStartTime: void 0,
                  isScrolling: void 0,
                  currentTranslate: void 0,
                  startTranslate: void 0,
                  allowThresholdMove: void 0,
                  focusableElements: n.params.focusableElements,
                  lastClickTime: 0,
                  clickTimeout: void 0,
                  velocities: [],
                  allowMomentumBounce: void 0,
                  startMoving: void 0,
                  pointerId: null,
                  touchId: null
              },
              allowClick: !0,
              allowTouchMove: n.params.allowTouchMove,
              touches: {
                  startX: 0,
                  startY: 0,
                  currentX: 0,
                  currentY: 0,
                  diff: 0
              },
              imagesToLoad: [],
              imagesLoaded: 0
          }),
          n.emit("_swiper"),
          n.params.init && n.init(),
          n
      }
      getDirectionLabel(n) {
          return this.isHorizontal() ? n : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom"
          }[n]
      }
      getSlideIndex(n) {
          const {slidesEl: t, params: i} = this
            , u = k(r(t, `.${i.slideClass}, swiper-slide`)[0]);
          return k(n) - u
      }
      getSlideIndexByData(n) {
          return this.getSlideIndex(this.slides.filter(t => 1 * t.getAttribute("data-swiper-slide-index") === n)[0])
      }
      recalcSlides() {
          const {slidesEl: n, params: t} = this;
          this.slides = r(n, `.${t.slideClass}, swiper-slide`)
      }
      enable() {
          const n = this;
          n.enabled || (n.enabled = !0,
          n.params.grabCursor && n.setGrabCursor(),
          n.emit("enable"))
      }
      disable() {
          const n = this;
          n.enabled && (n.enabled = !1,
          n.params.grabCursor && n.unsetGrabCursor(),
          n.emit("disable"))
      }
      setProgress(n, t) {
          const i = this;
          n = Math.min(Math.max(n, 0), 1);
          const r = i.minTranslate()
            , u = (i.maxTranslate() - r) * n + r;
          i.translateTo(u, void 0 === t ? 0 : t);
          i.updateActiveIndex();
          i.updateSlidesClasses()
      }
      emitContainerClasses() {
          const n = this;
          if (n.params._emitClasses && n.el) {
              const t = n.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(n.params.containerModifierClass));
              n.emit("_containerClasses", t.join(" "))
          }
      }
      getSlideClasses(n) {
          const t = this;
          return t.destroyed ? "" : n.className.split(" ").filter(n => 0 === n.indexOf("swiper-slide") || 0 === n.indexOf(t.params.slideClass)).join(" ")
      }
      emitSlidesClasses() {
          const n = this;
          if (n.params._emitClasses && n.el) {
              const t = [];
              n.slides.forEach(i => {
                  const r = n.getSlideClasses(i);
                  t.push({
                      slideEl: i,
                      classNames: r
                  });
                  n.emit("_slideClass", i, r)
              }
              );
              n.emit("_slideClasses", t)
          }
      }
      slidesPerViewDynamic(n, t) {
          void 0 === n && (n = "current");
          void 0 === t && (t = !1);
          const {params: o, slides: r, slidesGrid: u, slidesSizesGrid: s, size: f, activeIndex: i} = this;
          let e = 1;
          if ("number" == typeof o.slidesPerView)
              return o.slidesPerView;
          if (o.centeredSlides) {
              let n, t = r[i] ? Math.ceil(r[i].swiperSlideSize) : 0;
              for (let u = i + 1; u < r.length; u += 1)
                  r[u] && !n && (t += Math.ceil(r[u].swiperSlideSize),
                  e += 1,
                  t > f && (n = !0));
              for (let u = i - 1; u >= 0; u -= 1)
                  r[u] && !n && (t += r[u].swiperSlideSize,
                  e += 1,
                  t > f && (n = !0))
          } else if ("current" === n)
              for (let n = i + 1; n < r.length; n += 1)
                  (t ? u[n] + s[n] - u[i] < f : u[n] - u[i] < f) && (e += 1);
          else
              for (let n = i - 1; n >= 0; n -= 1)
                  u[i] - u[n] < f && (e += 1);
          return e
      }
      update() {
          function r() {
              const t = n.rtlTranslate ? -1 * n.translate : n.translate
                , i = Math.min(Math.max(t, n.maxTranslate()), n.minTranslate());
              n.setTranslate(i);
              n.updateActiveIndex();
              n.updateSlidesClasses()
          }
          const n = this;
          if (n && !n.destroyed) {
              const {snapGrid: u, params: t} = n;
              let i;
              if (t.breakpoints && n.setBreakpoint(),
              [...n.el.querySelectorAll('[loading="lazy"]')].forEach(t => {
                  t.complete && it(n, t)
              }
              ),
              n.updateSize(),
              n.updateSlides(),
              n.updateProgress(),
              n.updateSlidesClasses(),
              t.freeMode && t.freeMode.enabled && !t.cssMode)
                  r(),
                  t.autoHeight && n.updateAutoHeight();
              else {
                  if (("auto" === t.slidesPerView || t.slidesPerView > 1) && n.isEnd && !t.centeredSlides) {
                      const r = n.virtual && t.virtual.enabled ? n.virtual.slides : n.slides;
                      i = n.slideTo(r.length - 1, 0, !1, !0)
                  } else
                      i = n.slideTo(n.activeIndex, 0, !1, !0);
                  i || r()
              }
              t.watchOverflow && u !== n.snapGrid && n.checkOverflow();
              n.emit("update")
          }
      }
      changeDirection(n, t) {
          void 0 === t && (t = !0);
          const i = this
            , r = i.params.direction;
          return n || (n = "horizontal" === r ? "vertical" : "horizontal"),
          n === r || "horizontal" !== n && "vertical" !== n || (i.el.classList.remove(`${i.params.containerModifierClass}${r}`),
          i.el.classList.add(`${i.params.containerModifierClass}${n}`),
          i.emitContainerClasses(),
          i.params.direction = n,
          i.slides.forEach(t => {
              "vertical" === n ? t.style.width = "" : t.style.height = ""
          }
          ),
          i.emit("changeDirection"),
          t && i.update()),
          i
      }
      changeLanguageDirection(n) {
          const t = this;
          t.rtl && "rtl" === n || !t.rtl && "ltr" === n || (t.rtl = "rtl" === n,
          t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
          t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
          t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
          t.el.dir = "ltr"),
          t.update())
      }
      mount(n) {
          const i = this;
          if (i.mounted)
              return !0;
          let t = n || i.params.el;
          if ("string" == typeof t && (t = document.querySelector(t)),
          !t)
              return !1;
          t.swiper = i;
          t.parentNode && t.parentNode.host && t.parentNode.host.nodeName === i.params.swiperElementNodeName.toUpperCase() && (i.isElement = !0);
          const e = () => `.${(i.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let u = ( () => t && t.shadowRoot && t.shadowRoot.querySelector ? t.shadowRoot.querySelector(e()) : r(t, e())[0])();
          return !u && i.params.createElements && (u = f("div", i.params.wrapperClass),
          t.append(u),
          r(t, `.${i.params.slideClass}`).forEach(n => {
              u.append(n)
          }
          )),
          Object.assign(i, {
              el: t,
              wrapperEl: u,
              slidesEl: i.isElement && !t.parentNode.host.slideSlots ? t.parentNode.host : u,
              hostEl: i.isElement ? t.parentNode.host : t,
              mounted: !0,
              rtl: "rtl" === t.dir.toLowerCase() || "rtl" === c(t, "direction"),
              rtlTranslate: "horizontal" === i.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === c(t, "direction")),
              wrongRTL: "-webkit-box" === c(u, "display")
          }),
          !0
      }
      init(n) {
          const t = this;
          if (t.initialized || !1 === t.mount(n))
              return t;
          t.emit("beforeInit");
          t.params.breakpoints && t.setBreakpoint();
          t.addClasses();
          t.updateSize();
          t.updateSlides();
          t.params.watchOverflow && t.checkOverflow();
          t.params.grabCursor && t.enabled && t.setGrabCursor();
          t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0);
          t.params.loop && t.loopCreate();
          t.attachEvents();
          const i = [...t.el.querySelectorAll('[loading="lazy"]')];
          return t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
          i.forEach(n => {
              n.complete ? it(t, n) : n.addEventListener("load", n => {
                  it(t, n.target)
              }
              )
          }
          ),
          at(t),
          t.initialized = !0,
          at(t),
          t.emit("init"),
          t.emit("afterInit"),
          t
      }
      destroy(n, t) {
          void 0 === n && (n = !0);
          void 0 === t && (t = !0);
          const i = this
            , {params: r, el: f, wrapperEl: e, slides: u} = i;
          return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"),
          i.initialized = !1,
          i.detachEvents(),
          r.loop && i.loopDestroy(),
          t && (i.removeClasses(),
          f.removeAttribute("style"),
          e.removeAttribute("style"),
          u && u.length && u.forEach(n => {
              n.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass),
              n.removeAttribute("style"),
              n.removeAttribute("data-swiper-slide-index")
          }
          )),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach(n => {
              i.off(n)
          }
          ),
          !1 !== n && (i.el.swiper = null,
          function(n) {
              const t = n;
              Object.keys(t).forEach(n => {
                  try {
                      t[n] = null
                  } catch (n) {}
                  try {
                      delete t[n]
                  } catch (n) {}
              }
              )
          }(i)),
          i.destroyed = !0),
          null
      }
      static extendDefaults(n) {
          u(pt, n)
      }
      static get extendedDefaults() {
          return pt
      }
      static get defaults() {
          return vt
      }
      static installModule(n) {
          o.prototype.__modules__ || (o.prototype.__modules__ = []);
          const t = o.prototype.__modules__;
          "function" == typeof n && t.indexOf(n) < 0 && t.push(n)
      }
      static use(n) {
          return Array.isArray(n) ? (n.forEach(n => o.installModule(n)),
          o) : (o.installModule(n),
          o)
      }
  }
  Object.keys(yt).forEach(n => {
      Object.keys(yt[n]).forEach(t => {
          o.prototype[t] = yt[n][t]
      }
      )
  }
  );
  o.use([function(n) {
      let {swiper: i, on: s, emit: f} = n;
      const r = t();
      let u = null
        , e = null;
      const o = () => {
          i && !i.destroyed && i.initialized && (f("beforeResize"),
          f("resize"))
      }
        , h = () => {
          i && !i.destroyed && i.initialized && f("orientationchange")
      }
      ;
      s("init", () => {
          i.params.resizeObserver && void 0 !== r.ResizeObserver ? i && !i.destroyed && i.initialized && (u = new ResizeObserver(n => {
              e = r.requestAnimationFrame( () => {
                  const {width: t, height: r} = i;
                  let u = t
                    , f = r;
                  n.forEach(n => {
                      let {contentBoxSize: t, contentRect: r, target: e} = n;
                      e && e !== i.el || (u = r ? r.width : (t[0] || t).inlineSize,
                      f = r ? r.height : (t[0] || t).blockSize)
                  }
                  );
                  u === t && f === r || o()
              }
              )
          }
          ),
          u.observe(i.el)) : (r.addEventListener("resize", o),
          r.addEventListener("orientationchange", h))
      }
      );
      s("destroy", () => {
          e && r.cancelAnimationFrame(e),
          u && u.unobserve && i.el && (u.unobserve(i.el),
          u = null),
          r.removeEventListener("resize", o),
          r.removeEventListener("orientationchange", h)
      }
      )
  }
  , function(n) {
      let {swiper: i, extendParams: s, on: e, emit: o} = n;
      const u = []
        , r = t()
        , f = function(n, t) {
          void 0 === t && (t = {});
          const f = new (r.MutationObserver || r.WebkitMutationObserver)(n => {
              if (!i.__preventObserver__) {
                  if (1 === n.length)
                      return void o("observerUpdate", n[0]);
                  const t = function() {
                      o("observerUpdate", n[0])
                  };
                  r.requestAnimationFrame ? r.requestAnimationFrame(t) : r.setTimeout(t, 0)
              }
          }
          );
          f.observe(n, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData
          });
          u.push(f)
      };
      s({
          observer: !1,
          observeParents: !1,
          observeSlideChildren: !1
      });
      e("init", () => {
          if (i.params.observer) {
              if (i.params.observeParents) {
                  const n = v(i.hostEl);
                  for (let t = 0; t < n.length; t += 1)
                      f(n[t])
              }
              f(i.hostEl, {
                  childList: i.params.observeSlideChildren
              });
              f(i.wrapperEl, {
                  attributes: !1
              })
          }
      }
      );
      e("destroy", () => {
          u.forEach(n => {
              n.disconnect()
          }
          ),
          u.splice(0, u.length)
      }
      )
  }
  ]);
  const fr = [function(n) {
      function s(n, i) {
          const u = t.params.virtual;
          if (u.cache && t.virtual.cache[i])
              return t.virtual.cache[i];
          let r;
          return u.renderSlide ? (r = u.renderSlide.call(t, n, i),
          "string" == typeof r && (c.innerHTML = r,
          r = c.children[0])) : r = t.isElement ? f("swiper-slide") : f("div", t.params.slideClass),
          r.setAttribute("data-swiper-slide-index", i),
          u.renderSlide || (r.innerHTML = n),
          u.cache && (t.virtual.cache[i] = r),
          r
      }
      function u(n, i) {
          function rt() {
              t.updateSlides();
              t.updateProgress();
              t.updateSlidesClasses();
              o("virtualUpdate")
          }
          const {slidesPerView: v, slidesPerGroup: y, centeredSlides: k, loop: e, initialSlide: ft} = t.params;
          if (!i || e || !(ft > 0)) {
              const {addSlidesBefore: tt, addSlidesAfter: it} = t.params.virtual
                , {from: d, to: p, slides: u, slidesGrid: et, offset: ot} = t.virtual;
              t.params.cssMode || t.updateActiveIndex();
              const w = t.activeIndex || 0;
              let g, b, h;
              g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top";
              k ? (b = Math.floor(v / 2) + y + it,
              h = Math.floor(v / 2) + y + tt) : (b = v + (y - 1) + it,
              h = (e ? v : y) + tt);
              let f = w - h
                , c = w + b;
              e || (f = Math.max(f, 0),
              c = Math.min(c, u.length - 1));
              let l = (t.slidesGrid[f] || 0) - (t.slidesGrid[0] || 0);
              if (e && w >= h ? (f -= h,
              k || (l += t.slidesGrid[0])) : e && w < h && (f = -h,
              k && (l += t.slidesGrid[0])),
              Object.assign(t.virtual, {
                  from: f,
                  to: c,
                  offset: l,
                  slidesGrid: t.slidesGrid,
                  slidesBefore: h,
                  slidesAfter: b
              }),
              d === f && p === c && !n)
                  return t.slidesGrid !== et && l !== ot && t.slides.forEach(n => {
                      n.style[g] = l - Math.abs(t.cssOverflowAdjustment()) + "px"
                  }
                  ),
                  t.updateProgress(),
                  void o("virtualUpdate");
              if (t.params.virtual.renderExternal)
                  return t.params.virtual.renderExternal.call(t, {
                      offset: l,
                      from: f,
                      to: c,
                      slides: function() {
                          const n = [];
                          for (let t = f; t <= c; t += 1)
                              n.push(u[t]);
                          return n
                      }()
                  }),
                  void (t.params.virtual.renderExternalUpdate ? rt() : o("virtualUpdate"));
              const a = []
                , nt = []
                , ut = n => {
                  let t = n;
                  return n < 0 ? t = u.length + n : t >= u.length && (t -= u.length),
                  t
              }
              ;
              if (n)
                  t.slides.filter(n => n.matches(`.${t.params.slideClass}, swiper-slide`)).forEach(n => {
                      n.remove()
                  }
                  );
              else
                  for (let n = d; n <= p; n += 1)
                      if (n < f || n > c) {
                          const i = ut(n);
                          t.slides.filter(n => n.matches(`.${t.params.slideClass}[data-swiper-slide-index="${i}"], swiper-slide[data-swiper-slide-index="${i}"]`)).forEach(n => {
                              n.remove()
                          }
                          )
                      }
              const st = e ? -u.length : 0
                , ht = e ? 2 * u.length : u.length;
              for (let t = st; t < ht; t += 1)
                  if (t >= f && t <= c) {
                      const i = ut(t);
                      void 0 === p || n ? nt.push(i) : (t > p && nt.push(i),
                      t < d && a.push(i))
                  }
              if (nt.forEach(n => {
                  t.slidesEl.append(s(u[n], n))
              }
              ),
              e)
                  for (let n = a.length - 1; n >= 0; n -= 1) {
                      const i = a[n];
                      t.slidesEl.prepend(s(u[i], i))
                  }
              else
                  a.sort( (n, t) => t - n),
                  a.forEach(n => {
                      t.slidesEl.prepend(s(u[n], n))
                  }
                  );
              r(t.slidesEl, ".swiper-slide, swiper-slide").forEach(n => {
                  n.style[g] = l - Math.abs(t.cssOverflowAdjustment()) + "px"
              }
              );
              rt()
          }
      }
      let h, {swiper: t, extendParams: l, on: e, emit: o} = n;
      l({
          virtual: {
              enabled: !1,
              slides: [],
              cache: !0,
              renderSlide: null,
              renderExternal: null,
              renderExternalUpdate: !0,
              addSlidesBefore: 0,
              addSlidesAfter: 0
          }
      });
      const a = i();
      t.virtual = {
          cache: {},
          from: void 0,
          to: void 0,
          slides: [],
          offset: 0,
          slidesGrid: []
      };
      const c = a.createElement("div");
      e("beforeInit", () => {
          if (t.params.virtual.enabled) {
              let n;
              if (void 0 === t.passedParams.virtual.slides) {
                  const i = [...t.slidesEl.children].filter(n => n.matches(`.${t.params.slideClass}, swiper-slide`));
                  i && i.length && (t.virtual.slides = [...i],
                  n = !0,
                  i.forEach( (n, i) => {
                      n.setAttribute("data-swiper-slide-index", i),
                      t.virtual.cache[i] = n,
                      n.remove()
                  }
                  ))
              }
              n || (t.virtual.slides = t.params.virtual.slides);
              t.classNames.push(`${t.params.containerModifierClass}virtual`);
              t.params.watchSlidesProgress = !0;
              t.originalParams.watchSlidesProgress = !0;
              u(!1, !0)
          }
      }
      );
      e("setTranslate", () => {
          t.params.virtual.enabled && (t.params.cssMode && !t._immediateVirtual ? (clearTimeout(h),
          h = setTimeout( () => {
              u()
          }
          , 100)) : u())
      }
      );
      e("init update resize", () => {
          t.params.virtual.enabled && t.params.cssMode && b(t.wrapperEl, "--swiper-virtual-size", `${t.virtualSize}px`)
      }
      );
      Object.assign(t.virtual, {
          appendSlide: function(n) {
              if ("object" == typeof n && "length"in n)
                  for (let i = 0; i < n.length; i += 1)
                      n[i] && t.virtual.slides.push(n[i]);
              else
                  t.virtual.slides.push(n);
              u(!0)
          },
          prependSlide: function(n) {
              const r = t.activeIndex;
              let f = r + 1
                , i = 1;
              if (Array.isArray(n)) {
                  for (let i = 0; i < n.length; i += 1)
                      n[i] && t.virtual.slides.unshift(n[i]);
                  f = r + n.length;
                  i = n.length
              } else
                  t.virtual.slides.unshift(n);
              if (t.params.virtual.cache) {
                  const n = t.virtual.cache
                    , r = {};
                  Object.keys(n).forEach(t => {
                      const u = n[t]
                        , f = u.getAttribute("data-swiper-slide-index");
                      f && u.setAttribute("data-swiper-slide-index", parseInt(f, 10) + i);
                      r[parseInt(t, 10) + i] = u
                  }
                  );
                  t.virtual.cache = r
              }
              u(!0);
              t.slideTo(f, 0)
          },
          removeSlide: function(n) {
              if (null != n) {
                  let i = t.activeIndex;
                  if (Array.isArray(n))
                      for (let r = n.length - 1; r >= 0; r -= 1)
                          t.params.virtual.cache && (delete t.virtual.cache[n[r]],
                          Object.keys(t.virtual.cache).forEach(i => {
                              i > n && (t.virtual.cache[i - 1] = t.virtual.cache[i],
                              t.virtual.cache[i - 1].setAttribute("data-swiper-slide-index", i - 1),
                              delete t.virtual.cache[i])
                          }
                          )),
                          t.virtual.slides.splice(n[r], 1),
                          n[r] < i && (i -= 1),
                          i = Math.max(i, 0);
                  else
                      t.params.virtual.cache && (delete t.virtual.cache[n],
                      Object.keys(t.virtual.cache).forEach(i => {
                          i > n && (t.virtual.cache[i - 1] = t.virtual.cache[i],
                          t.virtual.cache[i - 1].setAttribute("data-swiper-slide-index", i - 1),
                          delete t.virtual.cache[i])
                      }
                      )),
                      t.virtual.slides.splice(n, 1),
                      n < i && (i -= 1),
                      i = Math.max(i, 0);
                  u(!0);
                  t.slideTo(i, 0)
              }
          },
          removeAllSlides: function() {
              t.virtual.slides = [];
              t.params.virtual.cache && (t.virtual.cache = {});
              u(!0);
              t.slideTo(0, 0)
          },
          update: u
      })
  }
  , function(n) {
      function o(n) {
          if (r.enabled) {
              const {rtlTranslate: s} = r;
              let t = n;
              t.originalEvent && (t = t.originalEvent);
              const i = t.keyCode || t.charCode
                , p = r.params.keyboard.pageUpDown
                , f = p && 33 === i
                , o = p && 34 === i
                , h = 37 === i
                , c = 39 === i
                , a = 38 === i
                , y = 40 === i;
              if (!r.allowSlideNext && (r.isHorizontal() && c || r.isVertical() && y || o) || !r.allowSlidePrev && (r.isHorizontal() && h || r.isVertical() && a || f))
                  return !1;
              if (!(t.shiftKey || t.altKey || t.ctrlKey || t.metaKey || u.activeElement && u.activeElement.nodeName && ("input" === u.activeElement.nodeName.toLowerCase() || "textarea" === u.activeElement.nodeName.toLowerCase()))) {
                  if (r.params.keyboard.onlyInViewport && (f || o || h || c || a || y)) {
                      let i = !1;
                      if (v(r.el, `.${r.params.slideClass}, swiper-slide`).length > 0 && 0 === v(r.el, `.${r.params.slideActiveClass}`).length)
                          return;
                      const t = r.el
                        , u = t.clientWidth
                        , f = t.clientHeight
                        , h = e.innerWidth
                        , c = e.innerHeight
                        , n = tt(t);
                      s && (n.left -= t.scrollLeft);
                      const o = [[n.left, n.top], [n.left + u, n.top], [n.left, n.top + f], [n.left + u, n.top + f]];
                      for (let n = 0; n < o.length; n += 1) {
                          const t = o[n];
                          if (t[0] >= 0 && t[0] <= h && t[1] >= 0 && t[1] <= c) {
                              if (0 === t[0] && 0 === t[1])
                                  continue;
                              i = !0
                          }
                      }
                      if (!i)
                          return
                  }
                  r.isHorizontal() ? ((f || o || h || c) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1),
                  ((o || c) && !s || (f || h) && s) && r.slideNext(),
                  ((f || h) && !s || (o || c) && s) && r.slidePrev()) : ((f || o || a || y) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1),
                  (o || y) && r.slideNext(),
                  (f || a) && r.slidePrev());
                  l("keyPress", i)
              }
          }
      }
      function s() {
          r.keyboard.enabled || (u.addEventListener("keydown", o),
          r.keyboard.enabled = !0)
      }
      function h() {
          r.keyboard.enabled && (u.removeEventListener("keydown", o),
          r.keyboard.enabled = !1)
      }
      let {swiper: r, extendParams: c, on: f, emit: l} = n;
      const u = i()
        , e = t();
      r.keyboard = {
          enabled: !1
      };
      c({
          keyboard: {
              enabled: !1,
              onlyInViewport: !0,
              pageUpDown: !0
          }
      });
      f("init", () => {
          r.params.keyboard.enabled && s()
      }
      );
      f("destroy", () => {
          r.keyboard.enabled && h()
      }
      );
      Object.assign(r.keyboard, {
          enable: s,
          disable: h
      })
  }
  , function(n) {
      function k() {
          i.enabled && (i.mouseEntered = !0)
      }
      function d() {
          i.enabled && (i.mouseEntered = !1)
      }
      function y(n) {
          return !(i.params.mousewheel.thresholdDelta && n.delta < i.params.mousewheel.thresholdDelta) && !(i.params.mousewheel.thresholdTime && e() - s < i.params.mousewheel.thresholdTime) && (n.delta >= 6 && e() - s < 60 || (n.direction < 0 ? i.isEnd && !i.params.loop || i.animating || (i.slideNext(),
          o("scroll", n.raw)) : i.isBeginning && !i.params.loop || i.animating || (i.slidePrev(),
          o("scroll", n.raw)),
          s = (new b.Date).getTime(),
          !1))
      }
      function h(n) {
          let s = n
            , p = !0;
          if (i.enabled && !n.target.closest(`.${i.params.mousewheel.noMousewheelClass}`)) {
              const c = i.params.mousewheel;
              i.params.cssMode && s.preventDefault();
              let v = i.el;
              "container" !== i.params.mousewheel.eventsTarget && (v = document.querySelector(i.params.mousewheel.eventsTarget));
              const b = v && v.contains(s.target);
              if (!i.mouseEntered && !b && !c.releaseOnEdges)
                  return !0;
              s.originalEvent && (s = s.originalEvent);
              let t = 0;
              const w = i.rtlTranslate ? -1 : 1
                , h = function(n) {
                  let u = 0
                    , r = 0
                    , t = 0
                    , i = 0;
                  return "detail"in n && (r = n.detail),
                  "wheelDelta"in n && (r = -n.wheelDelta / 120),
                  "wheelDeltaY"in n && (r = -n.wheelDeltaY / 120),
                  "wheelDeltaX"in n && (u = -n.wheelDeltaX / 120),
                  "axis"in n && n.axis === n.HORIZONTAL_AXIS && (u = r,
                  r = 0),
                  t = 10 * u,
                  i = 10 * r,
                  "deltaY"in n && (i = n.deltaY),
                  "deltaX"in n && (t = n.deltaX),
                  n.shiftKey && !t && (t = i,
                  i = 0),
                  (t || i) && n.deltaMode && (1 === n.deltaMode ? (t *= 40,
                  i *= 40) : (t *= 800,
                  i *= 800)),
                  t && !u && (u = t < 1 ? -1 : 1),
                  i && !r && (r = i < 1 ? -1 : 1),
                  {
                      spinX: u,
                      spinY: r,
                      pixelX: t,
                      pixelY: i
                  }
              }(s);
              if (c.forceToAxis)
                  if (i.isHorizontal()) {
                      if (!(Math.abs(h.pixelX) > Math.abs(h.pixelY)))
                          return !0;
                      t = -h.pixelX * w
                  } else {
                      if (!(Math.abs(h.pixelY) > Math.abs(h.pixelX)))
                          return !0;
                      t = -h.pixelY
                  }
              else
                  t = Math.abs(h.pixelX) > Math.abs(h.pixelY) ? -h.pixelX * w : -h.pixelY;
              if (0 === t)
                  return !0;
              c.invert && (t = -t);
              let a = i.getTranslate() + t * c.sensitivity;
              if (a >= i.minTranslate() && (a = i.minTranslate()),
              a <= i.maxTranslate() && (a = i.maxTranslate()),
              p = !!i.params.loop || !(a === i.minTranslate() || a === i.maxTranslate()),
              p && i.params.nested && s.stopPropagation(),
              i.params.freeMode && i.params.freeMode.enabled) {
                  const n = {
                      time: e(),
                      delta: Math.abs(t),
                      direction: Math.sign(t)
                  }
                    , h = u && n.time < u.time + 500 && n.delta <= u.delta && n.direction === u.direction;
                  if (!h) {
                      u = void 0;
                      let e = i.getTranslate() + t * c.sensitivity;
                      const a = i.isBeginning
                        , v = i.isEnd;
                      if (e >= i.minTranslate() && (e = i.minTranslate()),
                      e <= i.maxTranslate() && (e = i.maxTranslate()),
                      i.setTransition(0),
                      i.setTranslate(e),
                      i.updateProgress(),
                      i.updateActiveIndex(),
                      i.updateSlidesClasses(),
                      (!a && i.isBeginning || !v && i.isEnd) && i.updateSlidesClasses(),
                      i.params.loop && i.loopFix({
                          direction: n.direction < 0 ? "next" : "prev",
                          byMousewheel: !0
                      }),
                      i.params.freeMode.sticky) {
                          clearTimeout(f);
                          f = void 0;
                          r.length >= 15 && r.shift();
                          const e = r.length ? r[r.length - 1] : void 0
                            , o = r[0];
                          if (r.push(n),
                          e && (n.delta > e.delta || n.direction !== e.direction))
                              r.splice(0);
                          else if (r.length >= 15 && n.time - o.time < 500 && o.delta - n.delta >= 1 && n.delta <= 6) {
                              const e = t > 0 ? .8 : .2;
                              u = n;
                              r.splice(0);
                              f = l( () => {
                                  i.slideToClosest(i.params.speed, !0, void 0, e)
                              }
                              , 0)
                          }
                          f || (f = l( () => {
                              u = n,
                              r.splice(0),
                              i.slideToClosest(i.params.speed, !0, void 0, .5)
                          }
                          , 500))
                      }
                      if (h || o("scroll", s),
                      i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(),
                      c.releaseOnEdges && (e === i.minTranslate() || e === i.maxTranslate()))
                          return !0
                  }
              } else {
                  const u = {
                      time: e(),
                      delta: Math.abs(t),
                      direction: Math.sign(t),
                      raw: n
                  };
                  r.length >= 2 && r.shift();
                  const f = r.length ? r[r.length - 1] : void 0;
                  if (r.push(u),
                  f ? (u.direction !== f.direction || u.delta > f.delta || u.time > f.time + 150) && y(u) : y(u),
                  function(n) {
                      const t = i.params.mousewheel;
                      if (n.direction < 0) {
                          if (i.isEnd && !i.params.loop && t.releaseOnEdges)
                              return !0
                      } else if (i.isBeginning && !i.params.loop && t.releaseOnEdges)
                          return !0;
                      return !1
                  }(u))
                      return !0
              }
              return s.preventDefault ? s.preventDefault() : s.returnValue = !1,
              !1
          }
      }
      function p(n) {
          let t = i.el;
          "container" !== i.params.mousewheel.eventsTarget && (t = document.querySelector(i.params.mousewheel.eventsTarget));
          t[n]("mouseenter", k);
          t[n]("mouseleave", d);
          t[n]("wheel", h)
      }
      function c() {
          return i.params.cssMode ? (i.wrapperEl.removeEventListener("wheel", h),
          !0) : !i.mousewheel.enabled && (p("addEventListener"),
          i.mousewheel.enabled = !0,
          !0)
      }
      function a() {
          return i.params.cssMode ? (i.wrapperEl.addEventListener(event, h),
          !0) : !!i.mousewheel.enabled && (p("removeEventListener"),
          i.mousewheel.enabled = !1,
          !0)
      }
      let {swiper: i, extendParams: w, on: v, emit: o} = n;
      const b = t();
      let f;
      w({
          mousewheel: {
              enabled: !1,
              releaseOnEdges: !1,
              invert: !1,
              forceToAxis: !1,
              sensitivity: 1,
              eventsTarget: "container",
              thresholdDelta: null,
              thresholdTime: null,
              noMousewheelClass: "swiper-no-mousewheel"
          }
      });
      i.mousewheel = {
          enabled: !1
      };
      let u, s = e();
      const r = [];
      v("init", () => {
          !i.params.mousewheel.enabled && i.params.cssMode && a(),
          i.params.mousewheel.enabled && c()
      }
      );
      v("destroy", () => {
          i.params.cssMode && c(),
          i.mousewheel.enabled && a()
      }
      );
      Object.assign(i.mousewheel, {
          enable: c,
          disable: a
      })
  }
  , function(t) {
      function h(n) {
          let t;
          return n && "string" == typeof n && i.isElement && (t = i.el.querySelector(n),
          t) ? t : (n && ("string" == typeof n && (t = [...document.querySelectorAll(n)]),
          i.params.uniqueNavElements && "string" == typeof n && t && t.length > 1 && 1 === i.el.querySelectorAll(n).length ? t = i.el.querySelector(n) : t && 1 === t.length && (t = t[0])),
          n && !t ? n : t)
      }
      function f(t, r) {
          const u = i.params.navigation;
          (t = n(t)).forEach(n => {
              n && (n.classList[r ? "add" : "remove"](...u.disabledClass.split(" ")),
              "BUTTON" === n.tagName && (n.disabled = r),
              i.params.watchOverflow && i.enabled && n.classList[i.isLocked ? "add" : "remove"](u.lockClass))
          }
          )
      }
      function u() {
          const {nextEl: n, prevEl: t} = i.navigation;
          if (i.params.loop)
              return f(t, !1),
              void f(n, !1);
          f(t, i.isBeginning && !i.params.rewind);
          f(n, i.isEnd && !i.params.rewind)
      }
      function c(n) {
          n.preventDefault();
          (!i.isBeginning || i.params.loop || i.params.rewind) && (i.slidePrev(),
          e("navigationPrev"))
      }
      function l(n) {
          n.preventDefault();
          (!i.isEnd || i.params.loop || i.params.rewind) && (i.slideNext(),
          e("navigationNext"))
      }
      function o() {
          const t = i.params.navigation;
          if (i.params.navigation = wt(i, i.originalParams.navigation, i.params.navigation, {
              nextEl: "swiper-button-next",
              prevEl: "swiper-button-prev"
          }),
          t.nextEl || t.prevEl) {
              let r = h(t.nextEl)
                , u = h(t.prevEl);
              Object.assign(i.navigation, {
                  nextEl: r,
                  prevEl: u
              });
              r = n(r);
              u = n(u);
              const f = (n, r) => {
                  n && n.addEventListener("click", "next" === r ? l : c),
                  !i.enabled && n && n.classList.add(...t.lockClass.split(" "))
              }
              ;
              r.forEach(n => f(n, "next"));
              u.forEach(n => f(n, "prev"))
          }
      }
      function s() {
          let {nextEl: t, prevEl: r} = i.navigation;
          t = n(t);
          r = n(r);
          const u = (n, t) => {
              n.removeEventListener("click", "next" === t ? l : c),
              n.classList.remove(...i.params.navigation.disabledClass.split(" "))
          }
          ;
          t.forEach(n => u(n, "next"));
          r.forEach(n => u(n, "prev"))
      }
      let {swiper: i, extendParams: v, on: r, emit: e} = t;
      v({
          navigation: {
              nextEl: null,
              prevEl: null,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
              navigationDisabledClass: "swiper-navigation-disabled"
          }
      });
      i.navigation = {
          nextEl: null,
          prevEl: null
      };
      r("init", () => {
          !1 === i.params.navigation.enabled ? a() : (o(),
          u())
      }
      );
      r("toEdge fromEdge lock unlock", () => {
          u()
      }
      );
      r("destroy", () => {
          s()
      }
      );
      r("enable disable", () => {
          let {nextEl: t, prevEl: r} = i.navigation;
          t = n(t);
          r = n(r);
          i.enabled ? u() : [...t, ...r].filter(n => !!n).forEach(n => n.classList.add(i.params.navigation.lockClass))
      }
      );
      r("click", (t, r) => {
          let {nextEl: u, prevEl: f} = i.navigation;
          u = n(u);
          f = n(f);
          const o = r.target;
          if (i.params.navigation.hideOnClick && !f.includes(o) && !u.includes(o)) {
              if (i.pagination && i.params.pagination && i.params.pagination.clickable && (i.pagination.el === o || i.pagination.el.contains(o)))
                  return;
              let n;
              u.length ? n = u[0].classList.contains(i.params.navigation.hiddenClass) : f.length && (n = f[0].classList.contains(i.params.navigation.hiddenClass));
              e(!0 === n ? "navigationShow" : "navigationHide");
              [...u, ...f].filter(n => !!n).forEach(n => n.classList.toggle(i.params.navigation.hiddenClass))
          }
      }
      );
      const a = () => {
          i.el.classList.add(...i.params.navigation.navigationDisabledClass.split(" ")),
          s()
      }
      ;
      Object.assign(i.navigation, {
          enable: () => {
              i.el.classList.remove(...i.params.navigation.navigationDisabledClass.split(" ")),
              o(),
              u()
          }
          ,
          disable: a,
          update: u,
          init: o,
          destroy: s
      })
  }
  , function(t) {
      function a() {
          return !i.params.pagination.el || !i.pagination.el || Array.isArray(i.pagination.el) && 0 === i.pagination.el.length
      }
      function c(n, t) {
          const {bulletActiveClass: r} = i.params.pagination;
          n && (n = n[("prev" === t ? "previous" : "next") + "ElementSibling"]) && (n.classList.add(`${r}-${t}`),
          (n = n[("prev" === t ? "previous" : "next") + "ElementSibling"]) && n.classList.add(`${r}-${t}-${t}`))
      }
      function w(n) {
          const r = n.target.closest(s(i.params.pagination.bulletClass));
          if (r) {
              n.preventDefault();
              const t = k(r) * i.params.slidesPerGroup;
              if (i.params.loop) {
                  if (i.realIndex === t)
                      return;
                  i.slideToLoop(t)
              } else
                  i.slideTo(t)
          }
      }
      function e() {
          const v = i.rtl
            , t = i.params.pagination;
          if (!a()) {
              let r, u, e = i.pagination.el;
              e = n(e);
              const y = i.virtual && i.params.virtual.enabled ? i.virtual.slides.length : i.slides.length
                , l = i.params.loop ? Math.ceil(y / i.params.slidesPerGroup) : i.snapGrid.length;
              if (i.params.loop ? (u = i.previousRealIndex || 0,
              r = i.params.slidesPerGroup > 1 ? Math.floor(i.realIndex / i.params.slidesPerGroup) : i.realIndex) : void 0 !== i.snapIndex ? (r = i.snapIndex,
              u = i.previousSnapIndex) : (u = i.previousIndex || 0,
              r = i.activeIndex || 0),
              "bullets" === t.type && i.pagination.bullets && i.pagination.bullets.length > 0) {
                  const n = i.pagination.bullets;
                  let o, s, l;
                  if (t.dynamicBullets && (h = et(n[0], i.isHorizontal() ? "width" : "height", !0),
                  e.forEach(n => {
                      n.style[i.isHorizontal() ? "width" : "height"] = h * (t.dynamicMainBullets + 4) + "px"
                  }
                  ),
                  t.dynamicMainBullets > 1 && void 0 !== u && (f += r - (u || 0),
                  f > t.dynamicMainBullets - 1 ? f = t.dynamicMainBullets - 1 : f < 0 && (f = 0)),
                  o = Math.max(r - f, 0),
                  s = o + (Math.min(n.length, t.dynamicMainBullets) - 1),
                  l = (s + o) / 2),
                  n.forEach(n => {
                      const i = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(n => `${t.bulletActiveClass}${n}`)].map(n => "string" == typeof n && n.includes(" ") ? n.split(" ") : n).flat();
                      n.classList.remove(...i)
                  }
                  ),
                  e.length > 1)
                      n.forEach(n => {
                          const u = k(n);
                          u === r ? n.classList.add(...t.bulletActiveClass.split(" ")) : i.isElement && n.setAttribute("part", "bullet");
                          t.dynamicBullets && (u >= o && u <= s && n.classList.add(...`${t.bulletActiveClass}-main`.split(" ")),
                          u === o && c(n, "prev"),
                          u === s && c(n, "next"))
                      }
                      );
                  else {
                      const u = n[r];
                      if (u && u.classList.add(...t.bulletActiveClass.split(" ")),
                      i.isElement && n.forEach( (n, t) => {
                          n.setAttribute("part", t === r ? "bullet-active" : "bullet")
                      }
                      ),
                      t.dynamicBullets) {
                          const i = n[o]
                            , r = n[s];
                          for (let i = o; i <= s; i += 1)
                              n[i] && n[i].classList.add(...`${t.bulletActiveClass}-main`.split(" "));
                          c(i, "prev");
                          c(r, "next")
                      }
                  }
                  if (t.dynamicBullets) {
                      const r = Math.min(n.length, t.dynamicMainBullets + 4)
                        , u = (h * r - h) / 2 - l * h
                        , f = v ? "right" : "left";
                      n.forEach(n => {
                          n.style[i.isHorizontal() ? f : "top"] = `${u}px`
                      }
                      )
                  }
              }
              e.forEach( (n, u) => {
                  if ("fraction" === t.type && (n.querySelectorAll(s(t.currentClass)).forEach(n => {
                      n.textContent = t.formatFractionCurrent(r + 1)
                  }
                  ),
                  n.querySelectorAll(s(t.totalClass)).forEach(n => {
                      n.textContent = t.formatFractionTotal(l)
                  }
                  )),
                  "progressbar" === t.type) {
                      let u;
                      u = t.progressbarOpposite ? i.isHorizontal() ? "vertical" : "horizontal" : i.isHorizontal() ? "horizontal" : "vertical";
                      const f = (r + 1) / l;
                      let e = 1
                        , o = 1;
                      "horizontal" === u ? e = f : o = f;
                      n.querySelectorAll(s(t.progressbarFillClass)).forEach(n => {
                          n.style.transform = `translate3d(0,0,0) scaleX(${e}) scaleY(${o})`,
                          n.style.transitionDuration = `${i.params.speed}ms`
                      }
                      )
                  }
                  "custom" === t.type && t.renderCustom ? (n.innerHTML = t.renderCustom(i, r + 1, l),
                  0 === u && o("paginationRender", n)) : (0 === u && o("paginationRender", n),
                  o("paginationUpdate", n));
                  i.params.watchOverflow && i.enabled && n.classList[i.isLocked ? "add" : "remove"](t.lockClass)
              }
              )
          }
      }
      function l() {
          const t = i.params.pagination;
          if (!a()) {
              const f = i.virtual && i.params.virtual.enabled ? i.virtual.slides.length : i.grid && i.params.grid.rows > 1 ? i.slides.length / Math.ceil(i.params.grid.rows) : i.slides.length;
              let u = i.pagination.el;
              u = n(u);
              let r = "";
              if ("bullets" === t.type) {
                  let n = i.params.loop ? Math.ceil(f / i.params.slidesPerGroup) : i.snapGrid.length;
                  i.params.freeMode && i.params.freeMode.enabled && n > f && (n = f);
                  for (let u = 0; u < n; u += 1)
                      r += t.renderBullet ? t.renderBullet.call(i, u, t.bulletClass) : `<${t.bulletElement} ${i.isElement ? 'part="bullet"' : ""} class="${t.bulletClass}"></${t.bulletElement}>`
              }
              "fraction" === t.type && (r = t.renderFraction ? t.renderFraction.call(i, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`);
              "progressbar" === t.type && (r = t.renderProgressbar ? t.renderProgressbar.call(i, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`);
              i.pagination.bullets = [];
              u.forEach(n => {
                  "custom" !== t.type && (n.innerHTML = r || ""),
                  "bullets" === t.type && i.pagination.bullets.push(...n.querySelectorAll(s(t.bulletClass)))
              }
              );
              "custom" !== t.type && o("paginationRender", u[0])
          }
      }
      function y() {
          i.params.pagination = wt(i, i.originalParams.pagination, i.params.pagination, {
              el: "swiper-pagination"
          });
          const t = i.params.pagination;
          if (t.el) {
              let r;
              "string" == typeof t.el && i.isElement && (r = i.el.querySelector(t.el));
              r || "string" != typeof t.el || (r = [...document.querySelectorAll(t.el)]);
              r || (r = t.el);
              r && 0 !== r.length && (i.params.uniqueNavElements && "string" == typeof t.el && Array.isArray(r) && r.length > 1 && (r = [...i.el.querySelectorAll(t.el)],
              r.length > 1 && (r = r.filter(n => v(n, ".swiper")[0] === i.el)[0])),
              Array.isArray(r) && 1 === r.length && (r = r[0]),
              Object.assign(i.pagination, {
                  el: r
              }),
              r = n(r),
              r.forEach(n => {
                  "bullets" === t.type && t.clickable && n.classList.add(...(t.clickableClass || "").split(" ")),
                  n.classList.add(t.modifierClass + t.type),
                  n.classList.add(i.isHorizontal() ? t.horizontalClass : t.verticalClass),
                  "bullets" === t.type && t.dynamicBullets && (n.classList.add(`${t.modifierClass}${t.type}-dynamic`),
                  f = 0,
                  t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                  "progressbar" === t.type && t.progressbarOpposite && n.classList.add(t.progressbarOppositeClass),
                  t.clickable && n.addEventListener("click", w),
                  i.enabled || n.classList.add(t.lockClass)
              }
              ))
          }
      }
      function p() {
          const t = i.params.pagination;
          if (!a()) {
              let r = i.pagination.el;
              r && (r = n(r),
              r.forEach(n => {
                  n.classList.remove(t.hiddenClass),
                  n.classList.remove(t.modifierClass + t.type),
                  n.classList.remove(i.isHorizontal() ? t.horizontalClass : t.verticalClass),
                  t.clickable && (n.classList.remove(...(t.clickableClass || "").split(" ")),
                  n.removeEventListener("click", w))
              }
              ));
              i.pagination.bullets && i.pagination.bullets.forEach(n => n.classList.remove(...t.bulletActiveClass.split(" ")))
          }
      }
      let {swiper: i, extendParams: d, on: u, emit: o} = t;
      const r = "swiper-pagination";
      let h;
      d({
          pagination: {
              el: null,
              bulletElement: "span",
              clickable: !1,
              hideOnClick: !1,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: !1,
              type: "bullets",
              dynamicBullets: !1,
              dynamicMainBullets: 1,
              formatFractionCurrent: n => n,
              formatFractionTotal: n => n,
              bulletClass: `${r}-bullet`,
              bulletActiveClass: `${r}-bullet-active`,
              modifierClass: `${r}-`,
              currentClass: `${r}-current`,
              totalClass: `${r}-total`,
              hiddenClass: `${r}-hidden`,
              progressbarFillClass: `${r}-progressbar-fill`,
              progressbarOppositeClass: `${r}-progressbar-opposite`,
              clickableClass: `${r}-clickable`,
              lockClass: `${r}-lock`,
              horizontalClass: `${r}-horizontal`,
              verticalClass: `${r}-vertical`,
              paginationDisabledClass: `${r}-disabled`
          }
      });
      i.pagination = {
          el: null,
          bullets: []
      };
      let f = 0;
      u("changeDirection", () => {
          if (i.pagination && i.pagination.el) {
              const t = i.params.pagination;
              let {el: r} = i.pagination;
              r = n(r);
              r.forEach(n => {
                  n.classList.remove(t.horizontalClass, t.verticalClass),
                  n.classList.add(i.isHorizontal() ? t.horizontalClass : t.verticalClass)
              }
              )
          }
      }
      );
      u("init", () => {
          !1 === i.params.pagination.enabled ? b() : (y(),
          l(),
          e())
      }
      );
      u("activeIndexChange", () => {
          void 0 === i.snapIndex && e()
      }
      );
      u("snapIndexChange", () => {
          e()
      }
      );
      u("snapGridLengthChange", () => {
          l(),
          e()
      }
      );
      u("destroy", () => {
          p()
      }
      );
      u("enable disable", () => {
          let {el: t} = i.pagination;
          t && (t = n(t),
          t.forEach(n => n.classList[i.enabled ? "remove" : "add"](i.params.pagination.lockClass)))
      }
      );
      u("lock unlock", () => {
          e()
      }
      );
      u("click", (t, r) => {
          const f = r.target
            , u = n(i.pagination.el);
          if (i.params.pagination.el && i.params.pagination.hideOnClick && u && u.length > 0 && !f.classList.contains(i.params.pagination.bulletClass)) {
              if (i.navigation && (i.navigation.nextEl && f === i.navigation.nextEl || i.navigation.prevEl && f === i.navigation.prevEl))
                  return;
              const n = u[0].classList.contains(i.params.pagination.hiddenClass);
              o(!0 === n ? "paginationShow" : "paginationHide");
              u.forEach(n => n.classList.toggle(i.params.pagination.hiddenClass))
          }
      }
      );
      const b = () => {
          i.el.classList.add(i.params.pagination.paginationDisabledClass);
          let {el: t} = i.pagination;
          t && (t = n(t),
          t.forEach(n => n.classList.add(i.params.pagination.paginationDisabledClass)));
          p()
      }
      ;
      Object.assign(i.pagination, {
          enable: () => {
              i.el.classList.remove(i.params.pagination.paginationDisabledClass);
              let {el: t} = i.pagination;
              t && (t = n(t),
              t.forEach(n => n.classList.remove(i.params.pagination.paginationDisabledClass)));
              y();
              l();
              e()
          }
          ,
          disable: b,
          render: l,
          update: e,
          init: y,
          destroy: p
      })
  }
  , function(t) {
      function a() {
          if (r.params.scrollbar.el && r.scrollbar.el) {
              const {scrollbar: o, rtlTranslate: s} = r
                , {dragEl: i, el: f} = o
                , h = r.params.scrollbar
                , c = r.params.loop ? r.progressLoop : r.progress;
              let t = u
                , n = (e - u) * c;
              s ? (n = -n,
              n > 0 ? (t = u - n,
              n = 0) : -n + u > e && (t = e + n)) : n < 0 ? (t = u + n,
              n = 0) : n + u > e && (t = e - n);
              r.isHorizontal() ? (i.style.transform = `translate3d(${n}px, 0, 0)`,
              i.style.width = `${t}px`) : (i.style.transform = `translate3d(0px, ${n}px, 0)`,
              i.style.height = `${t}px`);
              h.hide && (clearTimeout(nt),
              f.style.opacity = 1,
              nt = setTimeout( () => {
                  f.style.opacity = 0,
                  f.style.transitionDuration = "400ms"
              }
              , 1e3))
          }
      }
      function v() {
          if (r.params.scrollbar.el && r.scrollbar.el) {
              const {scrollbar: i} = r
                , {dragEl: n, el: t} = i;
              n.style.width = "";
              n.style.height = "";
              e = r.isHorizontal() ? t.offsetWidth : t.offsetHeight;
              b = r.size / (r.virtualSize + r.params.slidesOffsetBefore - (r.params.centeredSlides ? r.snapGrid[0] : 0));
              u = "auto" === r.params.scrollbar.dragSize ? e * b : parseInt(r.params.scrollbar.dragSize, 10);
              r.isHorizontal() ? n.style.width = `${u}px` : n.style.height = `${u}px`;
              t.style.display = b >= 1 ? "none" : "";
              r.params.scrollbar.hide && (t.style.opacity = 0);
              r.params.watchOverflow && r.enabled && i.el.classList[r.isLocked ? "add" : "remove"](r.params.scrollbar.lockClass)
          }
      }
      function it(n) {
          return r.isHorizontal() ? n.clientX : n.clientY
      }
      function rt(n) {
          const {scrollbar: f, rtlTranslate: o} = r
            , {el: s} = f;
          let t;
          t = (it(n) - tt(s)[r.isHorizontal() ? "left" : "top"] - (null !== w ? w : u / 2)) / (e - u);
          t = Math.max(Math.min(t, 1), 0);
          o && (t = 1 - t);
          const i = r.minTranslate() + (r.maxTranslate() - r.minTranslate()) * t;
          r.updateProgress(i);
          r.setTranslate(i);
          r.updateActiveIndex();
          r.updateSlidesClasses()
      }
      function ot(n) {
          const u = r.params.scrollbar
            , {scrollbar: f, wrapperEl: e} = r
            , {el: t, dragEl: i} = f;
          c = !0;
          w = n.target === i ? it(n) - n.target.getBoundingClientRect()[r.isHorizontal() ? "left" : "top"] : null;
          n.preventDefault();
          n.stopPropagation();
          e.style.transitionDuration = "100ms";
          i.style.transitionDuration = "100ms";
          rt(n);
          clearTimeout(k);
          t.style.transitionDuration = "0ms";
          u.hide && (t.style.opacity = 1);
          r.params.cssMode && (r.wrapperEl.style["scroll-snap-type"] = "none");
          y("scrollbarDragStart", n)
      }
      function st(n) {
          const {scrollbar: t, wrapperEl: i} = r
            , {el: u, dragEl: f} = t;
          c && (n.preventDefault && n.cancelable ? n.preventDefault() : n.returnValue = !1,
          rt(n),
          i.style.transitionDuration = "0ms",
          u.style.transitionDuration = "0ms",
          f.style.transitionDuration = "0ms",
          y("scrollbarDragMove", n))
      }
      function ht(n) {
          const t = r.params.scrollbar
            , {scrollbar: u, wrapperEl: f} = r
            , {el: i} = u;
          c && (c = !1,
          r.params.cssMode && (r.wrapperEl.style["scroll-snap-type"] = "",
          f.style.transitionDuration = ""),
          t.hide && (clearTimeout(k),
          k = l( () => {
              i.style.opacity = 0,
              i.style.transitionDuration = "400ms"
          }
          , 1e3)),
          y("scrollbarDragEnd", n),
          t.snapOnRelease && r.slideToClosest())
      }
      function ut(n) {
          const {scrollbar: o, params: i} = r
            , u = o.el;
          if (u) {
              const f = u
                , e = !!i.passiveListeners && {
                  passive: !1,
                  capture: !1
              }
                , s = !!i.passiveListeners && {
                  passive: !0,
                  capture: !1
              };
              if (f) {
                  const t = "on" === n ? "addEventListener" : "removeEventListener";
                  f[t]("pointerdown", ot, e);
                  p[t]("pointermove", st, e);
                  p[t]("pointerup", ht, s)
              }
          }
      }
      function d() {
          const {scrollbar: e, el: u} = r;
          r.params.scrollbar = wt(r, r.originalParams.scrollbar, r.params.scrollbar, {
              el: "swiper-scrollbar"
          });
          const t = r.params.scrollbar;
          if (t.el) {
              let n, i;
              if ("string" == typeof t.el && r.isElement && (n = r.el.querySelector(t.el)),
              n || "string" != typeof t.el)
                  n || (n = t.el);
              else if (n = p.querySelectorAll(t.el),
              !n.length)
                  return;
              r.params.uniqueNavElements && "string" == typeof t.el && n.length > 1 && 1 === u.querySelectorAll(t.el).length && (n = u.querySelector(t.el));
              n.length > 0 && (n = n[0]);
              n.classList.add(r.isHorizontal() ? t.horizontalClass : t.verticalClass);
              n && (i = n.querySelector(s(r.params.scrollbar.dragClass)),
              i || (i = f("div", r.params.scrollbar.dragClass),
              n.append(i)));
              Object.assign(e, {
                  el: n,
                  dragEl: i
              });
              t.draggable && r.params.scrollbar.el && r.scrollbar.el && ut("on");
              n && n.classList[r.enabled ? "remove" : "add"](...h(r.params.scrollbar.lockClass))
          }
      }
      function g() {
          const n = r.params.scrollbar
            , t = r.scrollbar.el;
          t && t.classList.remove(...h(r.isHorizontal() ? n.horizontalClass : n.verticalClass));
          r.params.scrollbar.el && r.scrollbar.el && ut("off")
      }
      let {swiper: r, extendParams: et, on: o, emit: y} = t;
      const p = i();
      let w, u, e, b, c = !1, nt = null, k = null;
      et({
          scrollbar: {
              el: null,
              dragSize: "auto",
              hide: !1,
              draggable: !1,
              snapOnRelease: !0,
              lockClass: "swiper-scrollbar-lock",
              dragClass: "swiper-scrollbar-drag",
              scrollbarDisabledClass: "swiper-scrollbar-disabled",
              horizontalClass: "swiper-scrollbar-horizontal",
              verticalClass: "swiper-scrollbar-vertical"
          }
      });
      r.scrollbar = {
          el: null,
          dragEl: null
      };
      o("changeDirection", () => {
          if (r.scrollbar && r.scrollbar.el) {
              const t = r.params.scrollbar;
              let {el: i} = r.scrollbar;
              i = n(i);
              i.forEach(n => {
                  n.classList.remove(t.horizontalClass, t.verticalClass),
                  n.classList.add(r.isHorizontal() ? t.horizontalClass : t.verticalClass)
              }
              )
          }
      }
      );
      o("init", () => {
          !1 === r.params.scrollbar.enabled ? ft() : (d(),
          v(),
          a())
      }
      );
      o("update resize observerUpdate lock unlock changeDirection", () => {
          v()
      }
      );
      o("setTranslate", () => {
          a()
      }
      );
      o("setTransition", (n, t) => {
          !function(n) {
              r.params.scrollbar.el && r.scrollbar.el && (r.scrollbar.dragEl.style.transitionDuration = `${n}ms`)
          }(t)
      }
      );
      o("enable disable", () => {
          const {el: n} = r.scrollbar;
          n && n.classList[r.enabled ? "remove" : "add"](...h(r.params.scrollbar.lockClass))
      }
      );
      o("destroy", () => {
          g()
      }
      );
      const ft = () => {
          r.el.classList.add(...h(r.params.scrollbar.scrollbarDisabledClass)),
          r.scrollbar.el && r.scrollbar.el.classList.add(...h(r.params.scrollbar.scrollbarDisabledClass)),
          g()
      }
      ;
      Object.assign(r.scrollbar, {
          enable: () => {
              r.el.classList.remove(...h(r.params.scrollbar.scrollbarDisabledClass)),
              r.scrollbar.el && r.scrollbar.el.classList.remove(...h(r.params.scrollbar.scrollbarDisabledClass)),
              d(),
              v(),
              a()
          }
          ,
          disable: ft,
          updateSize: v,
          setTranslate: a,
          init: d,
          destroy: g
      })
  }
  , function(n) {
      let {swiper: t, extendParams: o, on: u} = n;
      o({
          parallax: {
              enabled: !1
          }
      });
      const i = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
        , f = (n, i) => {
          const {rtl: l} = t
            , h = l ? -1 : 1
            , c = n.getAttribute("data-swiper-parallax") || "0";
          let r = n.getAttribute("data-swiper-parallax-x")
            , u = n.getAttribute("data-swiper-parallax-y");
          const f = n.getAttribute("data-swiper-parallax-scale")
            , e = n.getAttribute("data-swiper-parallax-opacity")
            , o = n.getAttribute("data-swiper-parallax-rotate");
          if (r || u ? (r = r || "0",
          u = u || "0") : t.isHorizontal() ? (r = c,
          u = "0") : (u = c,
          r = "0"),
          r = r.indexOf("%") >= 0 ? parseInt(r, 10) * i * h + "%" : r * i * h + "px",
          u = u.indexOf("%") >= 0 ? parseInt(u, 10) * i + "%" : u * i + "px",
          null != e) {
              const t = e - (e - 1) * (1 - Math.abs(i));
              n.style.opacity = t
          }
          let s = `translate3d(${r}, ${u}, 0px)`;
          null != f && (s += ` scale(${f - (f - 1) * (1 - Math.abs(i))})`);
          o && null != o && (s += ` rotate(${o * i * -1}deg)`);
          n.style.transform = s
      }
        , e = () => {
          const {el: e, slides: o, progress: n, snapGrid: s} = t
            , u = r(e, i);
          t.isElement && u.push(...r(t.hostEl, i));
          u.forEach(t => {
              f(t, n)
          }
          );
          o.forEach( (r, u) => {
              let e = r.progress;
              t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (e += Math.ceil(u / 2) - n * (s.length - 1));
              e = Math.min(Math.max(e, -1), 1);
              r.querySelectorAll(`${i}, [data-swiper-parallax-rotate]`).forEach(n => {
                  f(n, e)
              }
              )
          }
          )
      }
      ;
      u("beforeInit", () => {
          t.params.parallax.enabled && (t.params.watchSlidesProgress = !0,
          t.originalParams.watchSlidesProgress = !0)
      }
      );
      u("init", () => {
          t.params.parallax.enabled && e()
      }
      );
      u("setTranslate", () => {
          t.params.parallax.enabled && e()
      }
      );
      u("setTransition", (n, r) => {
          t.params.parallax.enabled && function(n) {
              void 0 === n && (n = t.params.speed);
              const {el: u, hostEl: f} = t
                , r = [...u.querySelectorAll(i)];
              t.isElement && r.push(...f.querySelectorAll(i));
              r.forEach(t => {
                  let i = parseInt(t.getAttribute("data-swiper-parallax-duration"), 10) || n;
                  0 === n && (i = 0);
                  t.style.transitionDuration = `${i}ms`
              }
              )
          }(r)
      }
      )
  }
  , function(n) {
      function d() {
          if (e.length < 2)
              return 1;
          const n = e[0].pageX
            , t = e[0].pageY
            , i = e[1].pageX
            , r = e[1].pageY;
          return Math.sqrt((i - n) ** 2 + (r - t) ** 2)
      }
      function g() {
          const n = f.params.zoom
            , t = i.imageWrapEl.getAttribute("data-swiper-zoom") || n.maxRatio;
          if (n.limitToOriginalSize && i.imageEl && i.imageEl.naturalWidth) {
              const n = i.imageEl.naturalWidth / i.imageEl.offsetWidth;
              return Math.min(n, t)
          }
          return t
      }
      function y(n) {
          const t = f.isElement ? "swiper-slide" : `.${f.params.slideClass}`;
          return !!n.target.matches(t) || f.slides.filter(t => t.contains(n.target)).length > 0
      }
      function nt(n) {
          if ("mouse" === n.pointerType && e.splice(0, e.length),
          y(n)) {
              const t = f.params.zoom;
              if (l = !1,
              a = !1,
              e.push(n),
              !(e.length < 2)) {
                  if (l = !0,
                  i.scaleStart = d(),
                  !i.slideEl) {
                      i.slideEl = n.target.closest(`.${f.params.slideClass}, swiper-slide`);
                      i.slideEl || (i.slideEl = f.slides[f.activeIndex]);
                      let r = i.slideEl.querySelector(`.${t.containerClass}`);
                      if (r && (r = r.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                      i.imageEl = r,
                      i.imageWrapEl = r ? v(i.imageEl, `.${t.containerClass}`)[0] : void 0,
                      !i.imageWrapEl)
                          return void (i.imageEl = void 0);
                      i.maxRatio = g()
                  }
                  if (i.imageEl) {
                      const [n,t] = function() {
                          if (e.length < 2)
                              return {
                                  x: null,
                                  y: null
                              };
                          const n = i.imageEl.getBoundingClientRect();
                          return [(e[0].pageX + (e[1].pageX - e[0].pageX) / 2 - n.x - c.scrollX) / s, (e[0].pageY + (e[1].pageY - e[0].pageY) / 2 - n.y - c.scrollY) / s]
                      }();
                      i.originX = n;
                      i.originY = t;
                      i.imageEl.style.transitionDuration = "0ms"
                  }
                  w = !0
              }
          }
      }
      function it(n) {
          if (y(n)) {
              const r = f.params.zoom
                , t = f.zoom
                , u = e.findIndex(t => t.pointerId === n.pointerId);
              u >= 0 && (e[u] = n);
              e.length < 2 || (a = !0,
              i.scaleMove = d(),
              i.imageEl && (t.scale = i.scaleMove / i.scaleStart * s,
              t.scale > i.maxRatio && (t.scale = i.maxRatio - 1 + (t.scale - i.maxRatio + 1) ** .5),
              t.scale < r.minRatio && (t.scale = r.minRatio + 1 - (r.minRatio - t.scale + 1) ** .5),
              i.imageEl.style.transform = `translate3d(0,0,0) scale(${t.scale})`))
          }
      }
      function rt(n) {
          if (y(n) && ("mouse" !== n.pointerType || "pointerout" !== n.type)) {
              const r = f.params.zoom
                , t = f.zoom
                , u = e.findIndex(t => t.pointerId === n.pointerId);
              u >= 0 && e.splice(u, 1);
              l && a && (l = !1,
              a = !1,
              i.imageEl && (t.scale = Math.max(Math.min(t.scale, i.maxRatio), r.minRatio),
              i.imageEl.style.transitionDuration = `${f.params.speed}ms`,
              i.imageEl.style.transform = `translate3d(0,0,0) scale(${t.scale})`,
              s = t.scale,
              w = !1,
              t.scale > 1 && i.slideEl ? i.slideEl.classList.add(`${r.zoomedSlideClass}`) : t.scale <= 1 && i.slideEl && i.slideEl.classList.remove(`${r.zoomedSlideClass}`),
              1 === t.scale && (i.originX = 0,
              i.originY = 0,
              i.slideEl = void 0)))
          }
      }
      function p() {
          f.touchEventsData.preventTouchMoveFromPointerMove = !1
      }
      function ut(n) {
          if (y(n) && function(n) {
              const t = `.${f.params.zoom.containerClass}`;
              return !!n.target.matches(t) || [...f.hostEl.querySelectorAll(t)].filter(t => t.contains(n.target)).length > 0
          }(n)) {
              const t = f.zoom;
              if (i.imageEl && u.isTouched && i.slideEl) {
                  u.isMoved || (u.width = i.imageEl.offsetWidth || i.imageEl.clientWidth,
                  u.height = i.imageEl.offsetHeight || i.imageEl.clientHeight,
                  u.startX = ft(i.imageWrapEl, "x") || 0,
                  u.startY = ft(i.imageWrapEl, "y") || 0,
                  i.slideWidth = i.slideEl.offsetWidth,
                  i.slideHeight = i.slideEl.offsetHeight,
                  i.imageWrapEl.style.transitionDuration = "0ms");
                  const r = u.width * t.scale
                    , h = u.height * t.scale;
                  if (r < i.slideWidth && h < i.slideHeight)
                      return void p();
                  if (u.minX = Math.min(i.slideWidth / 2 - r / 2, 0),
                  u.maxX = -u.minX,
                  u.minY = Math.min(i.slideHeight / 2 - h / 2, 0),
                  u.maxY = -u.minY,
                  u.touchesCurrent.x = e.length > 0 ? e[0].pageX : n.pageX,
                  u.touchesCurrent.y = e.length > 0 ? e[0].pageY : n.pageY,
                  (Math.max(Math.abs(u.touchesCurrent.x - u.touchesStart.x), Math.abs(u.touchesCurrent.y - u.touchesStart.y)) > 5 && (f.allowClick = !1),
                  !u.isMoved && !w) && (f.isHorizontal() && (Math.floor(u.minX) === Math.floor(u.startX) && u.touchesCurrent.x < u.touchesStart.x || Math.floor(u.maxX) === Math.floor(u.startX) && u.touchesCurrent.x > u.touchesStart.x) || !f.isHorizontal() && (Math.floor(u.minY) === Math.floor(u.startY) && u.touchesCurrent.y < u.touchesStart.y || Math.floor(u.maxY) === Math.floor(u.startY) && u.touchesCurrent.y > u.touchesStart.y)))
                      return u.isTouched = !1,
                      void p();
                  n.cancelable && n.preventDefault();
                  n.stopPropagation();
                  clearTimeout(k);
                  f.touchEventsData.preventTouchMoveFromPointerMove = !0;
                  k = setTimeout( () => {
                      p()
                  }
                  );
                  u.isMoved = !0;
                  const c = (t.scale - s) / (i.maxRatio - f.params.zoom.minRatio)
                    , {originX: l, originY: a} = i;
                  u.currentX = u.touchesCurrent.x - u.touchesStart.x + u.startX + c * (u.width - 2 * l);
                  u.currentY = u.touchesCurrent.y - u.touchesStart.y + u.startY + c * (u.height - 2 * a);
                  u.currentX < u.minX && (u.currentX = u.minX + 1 - (u.minX - u.currentX + 1) ** .8);
                  u.currentX > u.maxX && (u.currentX = u.maxX - 1 + (u.currentX - u.maxX + 1) ** .8);
                  u.currentY < u.minY && (u.currentY = u.minY + 1 - (u.minY - u.currentY + 1) ** .8);
                  u.currentY > u.maxY && (u.currentY = u.maxY - 1 + (u.currentY - u.maxY + 1) ** .8);
                  o.prevPositionX || (o.prevPositionX = u.touchesCurrent.x);
                  o.prevPositionY || (o.prevPositionY = u.touchesCurrent.y);
                  o.prevTime || (o.prevTime = Date.now());
                  o.x = (u.touchesCurrent.x - o.prevPositionX) / (Date.now() - o.prevTime) / 2;
                  o.y = (u.touchesCurrent.y - o.prevPositionY) / (Date.now() - o.prevTime) / 2;
                  Math.abs(u.touchesCurrent.x - o.prevPositionX) < 2 && (o.x = 0);
                  Math.abs(u.touchesCurrent.y - o.prevPositionY) < 2 && (o.y = 0);
                  o.prevPositionX = u.touchesCurrent.x;
                  o.prevPositionY = u.touchesCurrent.y;
                  o.prevTime = Date.now();
                  i.imageWrapEl.style.transform = `translate3d(${u.currentX}px, ${u.currentY}px,0)`
              }
          }
      }
      function et() {
          const n = f.zoom;
          i.slideEl && f.activeIndex !== f.slides.indexOf(i.slideEl) && (i.imageEl && (i.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
          i.imageWrapEl && (i.imageWrapEl.style.transform = "translate3d(0,0,0)"),
          i.slideEl.classList.remove(`${f.params.zoom.zoomedSlideClass}`),
          n.scale = 1,
          s = 1,
          i.slideEl = void 0,
          i.imageEl = void 0,
          i.imageWrapEl = void 0,
          i.originX = 0,
          i.originY = 0)
      }
      function ot(n) {
          const t = f.zoom
            , w = f.params.zoom;
          if (!i.slideEl) {
              n && n.target && (i.slideEl = n.target.closest(`.${f.params.slideClass}, swiper-slide`));
              i.slideEl || (i.slideEl = f.params.virtual && f.params.virtual.enabled && f.virtual ? r(f.slidesEl, `.${f.params.slideActiveClass}`)[0] : f.slides[f.activeIndex]);
              let t = i.slideEl.querySelector(`.${w.containerClass}`);
              t && (t = t.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]);
              i.imageEl = t;
              i.imageWrapEl = t ? v(i.imageEl, `.${w.containerClass}`)[0] : void 0
          }
          if (i.imageEl && i.imageWrapEl) {
              let l, a, it, rt, ut, ft, e, o, et, ot, st, ht, y, p, b, k, d, nt;
              f.params.cssMode && (f.wrapperEl.style.overflow = "hidden",
              f.wrapperEl.style.touchAction = "none");
              i.slideEl.classList.add(`${w.zoomedSlideClass}`);
              void 0 === u.touchesStart.x && n ? (l = n.pageX,
              a = n.pageY) : (l = u.touchesStart.x,
              a = u.touchesStart.y);
              const h = "number" == typeof n ? n : null;
              1 === s && h && (l = void 0,
              a = void 0);
              const ct = g();
              t.scale = h || ct;
              s = h || ct;
              !n || 1 === s && h ? (e = 0,
              o = 0) : (d = i.slideEl.offsetWidth,
              nt = i.slideEl.offsetHeight,
              it = tt(i.slideEl).left + c.scrollX,
              rt = tt(i.slideEl).top + c.scrollY,
              ut = it + d / 2 - l,
              ft = rt + nt / 2 - a,
              et = i.imageEl.offsetWidth || i.imageEl.clientWidth,
              ot = i.imageEl.offsetHeight || i.imageEl.clientHeight,
              st = et * t.scale,
              ht = ot * t.scale,
              y = Math.min(d / 2 - st / 2, 0),
              p = Math.min(nt / 2 - ht / 2, 0),
              b = -y,
              k = -p,
              e = ut * t.scale,
              o = ft * t.scale,
              e < y && (e = y),
              e > b && (e = b),
              o < p && (o = p),
              o > k && (o = k));
              h && 1 === t.scale && (i.originX = 0,
              i.originY = 0);
              i.imageWrapEl.style.transitionDuration = "300ms";
              i.imageWrapEl.style.transform = `translate3d(${e}px, ${o}px,0)`;
              i.imageEl.style.transitionDuration = "300ms";
              i.imageEl.style.transform = `translate3d(0,0,0) scale(${t.scale})`
          }
      }
      function st() {
          const t = f.zoom
            , n = f.params.zoom;
          if (!i.slideEl) {
              i.slideEl = f.params.virtual && f.params.virtual.enabled && f.virtual ? r(f.slidesEl, `.${f.params.slideActiveClass}`)[0] : f.slides[f.activeIndex];
              let t = i.slideEl.querySelector(`.${n.containerClass}`);
              t && (t = t.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]);
              i.imageEl = t;
              i.imageWrapEl = t ? v(i.imageEl, `.${n.containerClass}`)[0] : void 0
          }
          i.imageEl && i.imageWrapEl && (f.params.cssMode && (f.wrapperEl.style.overflow = "",
          f.wrapperEl.style.touchAction = ""),
          t.scale = 1,
          s = 1,
          i.imageWrapEl.style.transitionDuration = "300ms",
          i.imageWrapEl.style.transform = "translate3d(0,0,0)",
          i.imageEl.style.transitionDuration = "300ms",
          i.imageEl.style.transform = "translate3d(0,0,0) scale(1)",
          i.slideEl.classList.remove(`${n.zoomedSlideClass}`),
          i.slideEl = void 0,
          i.originX = 0,
          i.originY = 0)
      }
      function ht(n) {
          const t = f.zoom;
          t.scale && 1 !== t.scale ? st() : ot(n)
      }
      function ct() {
          return {
              passiveListener: !!f.params.passiveListeners && {
                  passive: !0,
                  capture: !1
              },
              activeListenerWithCapture: !f.params.passiveListeners || {
                  passive: !1,
                  capture: !0
              }
          }
      }
      function lt() {
          const n = f.zoom;
          if (!n.enabled) {
              n.enabled = !0;
              const {passiveListener: t, activeListenerWithCapture: i} = ct();
              f.wrapperEl.addEventListener("pointerdown", nt, t);
              f.wrapperEl.addEventListener("pointermove", it, i);
              ["pointerup", "pointercancel", "pointerout"].forEach(n => {
                  f.wrapperEl.addEventListener(n, rt, t)
              }
              );
              f.wrapperEl.addEventListener("pointermove", ut, i)
          }
      }
      function at() {
          const n = f.zoom;
          if (n.enabled) {
              n.enabled = !1;
              const {passiveListener: t, activeListenerWithCapture: i} = ct();
              f.wrapperEl.removeEventListener("pointerdown", nt, t);
              f.wrapperEl.removeEventListener("pointermove", it, i);
              ["pointerup", "pointercancel", "pointerout"].forEach(n => {
                  f.wrapperEl.removeEventListener(n, rt, t)
              }
              );
              f.wrapperEl.removeEventListener("pointermove", ut, i)
          }
      }
      let {swiper: f, extendParams: vt, on: h, emit: yt} = n;
      const c = t();
      vt({
          zoom: {
              enabled: !1,
              limitToOriginalSize: !1,
              maxRatio: 3,
              minRatio: 1,
              toggle: !0,
              containerClass: "swiper-zoom-container",
              zoomedSlideClass: "swiper-slide-zoomed"
          }
      });
      f.zoom = {
          enabled: !1
      };
      let l, a, s = 1, w = !1;
      const e = []
        , i = {
          originX: 0,
          originY: 0,
          slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          imageEl: void 0,
          imageWrapEl: void 0,
          maxRatio: 3
      }
        , u = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {}
      }
        , o = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0
      };
      let k, b = 1;
      Object.defineProperty(f.zoom, "scale", {
          get: () => b,
          set(n) {
              if (b !== n) {
                  const t = i.imageEl
                    , r = i.slideEl;
                  yt("zoomChange", n, t, r)
              }
              b = n
          }
      });
      h("init", () => {
          f.params.zoom.enabled && lt()
      }
      );
      h("destroy", () => {
          at()
      }
      );
      h("touchStart", (n, t) => {
          f.zoom.enabled && function(n) {
              const r = f.device;
              if (i.imageEl && !u.isTouched) {
                  r.android && n.cancelable && n.preventDefault();
                  u.isTouched = !0;
                  const t = e.length > 0 ? e[0] : n;
                  u.touchesStart.x = t.pageX;
                  u.touchesStart.y = t.pageY
              }
          }(t)
      }
      );
      h("touchEnd", () => {
          f.zoom.enabled && function() {
              const r = f.zoom;
              if (i.imageEl) {
                  if (!u.isTouched || !u.isMoved)
                      return u.isTouched = !1,
                      void (u.isMoved = !1);
                  u.isTouched = !1;
                  u.isMoved = !1;
                  let n = 300
                    , t = 300;
                  const h = o.x * n
                    , e = u.currentX + h
                    , c = o.y * t
                    , s = u.currentY + c;
                  0 !== o.x && (n = Math.abs((e - u.currentX) / o.x));
                  0 !== o.y && (t = Math.abs((s - u.currentY) / o.y));
                  const l = Math.max(n, t);
                  u.currentX = e;
                  u.currentY = s;
                  const a = u.width * r.scale
                    , v = u.height * r.scale;
                  u.minX = Math.min(i.slideWidth / 2 - a / 2, 0);
                  u.maxX = -u.minX;
                  u.minY = Math.min(i.slideHeight / 2 - v / 2, 0);
                  u.maxY = -u.minY;
                  u.currentX = Math.max(Math.min(u.currentX, u.maxX), u.minX);
                  u.currentY = Math.max(Math.min(u.currentY, u.maxY), u.minY);
                  i.imageWrapEl.style.transitionDuration = `${l}ms`;
                  i.imageWrapEl.style.transform = `translate3d(${u.currentX}px, ${u.currentY}px,0)`
              }
          }()
      }
      );
      h("doubleTap", (n, t) => {
          !f.animating && f.params.zoom.enabled && f.zoom.enabled && f.params.zoom.toggle && ht(t)
      }
      );
      h("transitionEnd", () => {
          f.zoom.enabled && f.params.zoom.enabled && et()
      }
      );
      h("slideChange", () => {
          f.zoom.enabled && f.params.zoom.enabled && f.params.cssMode && et()
      }
      );
      Object.assign(f.zoom, {
          enable: lt,
          disable: at,
          "in": ot,
          out: st,
          toggle: ht
      })
  }
  , function(n) {
      function u(n, t) {
          const u = function() {
              let n, t, i;
              return (r, u) => {
                  for (t = -1,
                  n = r.length; n - t > 1; )
                      i = n + t >> 1,
                      r[i] <= u ? t = i : n = i;
                  return n
              }
          }();
          let i, r;
          return this.x = n,
          this.y = t,
          this.lastIndex = n.length - 1,
          this.interpolate = function(n) {
              return n ? (r = u(this.x, n),
              i = r - 1,
              (n - this.x[i]) * (this.y[r] - this.y[i]) / (this.x[r] - this.x[i]) + this.y[i]) : 0
          }
          ,
          this
      }
      function r() {
          t.controller.control && t.controller.spline && (t.controller.spline = void 0,
          delete t.controller.spline)
      }
      let {swiper: t, extendParams: f, on: i} = n;
      f({
          controller: {
              control: void 0,
              inverse: !1,
              by: "slide"
          }
      });
      t.controller = {
          control: void 0
      };
      i("beforeInit", () => {
          if ("undefined" != typeof window && ("string" == typeof t.params.controller.control || t.params.controller.control instanceof HTMLElement)) {
              const n = document.querySelector(t.params.controller.control);
              if (n && n.swiper)
                  t.controller.control = n.swiper;
              else if (n) {
                  const i = r => {
                      t.controller.control = r.detail[0],
                      t.update(),
                      n.removeEventListener("init", i)
                  }
                  ;
                  n.addEventListener("init", i)
              }
          } else
              t.controller.control = t.params.controller.control
      }
      );
      i("update", () => {
          r()
      }
      );
      i("resize", () => {
          r()
      }
      );
      i("observerUpdate", () => {
          r()
      }
      );
      i("setTranslate", (n, i, r) => {
          t.controller.control && !t.controller.control.destroyed && t.controller.setTranslate(i, r)
      }
      );
      i("setTransition", (n, i, r) => {
          t.controller.control && !t.controller.control.destroyed && t.controller.setTransition(i, r)
      }
      );
      Object.assign(t.controller, {
          setTranslate: function(n, i) {
              function s(n) {
                  if (!n.destroyed) {
                      const i = t.rtlTranslate ? -t.translate : t.translate;
                      "slide" === t.params.controller.by && (!function(n) {
                          t.controller.spline = t.params.loop ? new u(t.slidesGrid,n.slidesGrid) : new u(t.snapGrid,n.snapGrid)
                      }(n),
                      f = -t.controller.spline.interpolate(-i));
                      f && "container" !== t.params.controller.by || (e = (n.maxTranslate() - n.minTranslate()) / (t.maxTranslate() - t.minTranslate()),
                      !Number.isNaN(e) && Number.isFinite(e) || (e = 1),
                      f = (i - t.minTranslate()) * e + n.minTranslate());
                      t.params.controller.inverse && (f = n.maxTranslate() - f);
                      n.updateProgress(f);
                      n.setTranslate(f, t);
                      n.updateActiveIndex();
                      n.updateSlidesClasses()
                  }
              }
              const r = t.controller.control;
              let e, f;
              const o = t.constructor;
              if (Array.isArray(r))
                  for (let n = 0; n < r.length; n += 1)
                      r[n] !== i && r[n]instanceof o && s(r[n]);
              else
                  r instanceof o && i !== r && s(r)
          },
          setTransition: function(n, i) {
              function e(i) {
                  i.destroyed || (i.setTransition(n, t),
                  0 !== n && (i.transitionStart(),
                  i.params.autoHeight && l( () => {
                      i.updateAutoHeight()
                  }
                  ),
                  d(i.wrapperEl, () => {
                      r && i.transitionEnd()
                  }
                  )))
              }
              const f = t.constructor
                , r = t.controller.control;
              let u;
              if (Array.isArray(r))
                  for (u = 0; u < r.length; u += 1)
                      r[u] !== i && r[u]instanceof f && e(r[u]);
              else
                  r instanceof f && i !== r && e(r)
          }
      })
  }
  , function(t) {
      function l(n) {
          const t = u;
          0 !== t.length && (t.innerHTML = "",
          t.innerHTML = n)
      }
      function a(t) {
          (t = n(t)).forEach(n => {
              n.setAttribute("tabIndex", "0")
          }
          )
      }
      function b(t) {
          (t = n(t)).forEach(n => {
              n.setAttribute("tabIndex", "-1")
          }
          )
      }
      function y(t, i) {
          (t = n(t)).forEach(n => {
              n.setAttribute("role", i)
          }
          )
      }
      function d(t, i) {
          (t = n(t)).forEach(n => {
              n.setAttribute("aria-roledescription", i)
          }
          )
      }
      function v(t, i) {
          (t = n(t)).forEach(n => {
              n.setAttribute("aria-label", i)
          }
          )
      }
      function g(t) {
          (t = n(t)).forEach(n => {
              n.setAttribute("aria-disabled", !0)
          }
          )
      }
      function nt(t) {
          (t = n(t)).forEach(n => {
              n.setAttribute("aria-disabled", !1)
          }
          )
      }
      function o(t) {
          if (13 === t.keyCode || 32 === t.keyCode) {
              const u = r.params.a11y
                , i = t.target;
              if (!r.pagination || !r.pagination.el || i !== r.pagination.el && !r.pagination.el.contains(t.target) || t.target.matches(s(r.params.pagination.bulletClass))) {
                  if (r.navigation && r.navigation.prevEl && r.navigation.nextEl) {
                      const t = n(r.navigation.prevEl);
                      n(r.navigation.nextEl).includes(i) && (r.isEnd && !r.params.loop || r.slideNext(),
                      r.isEnd ? l(u.lastSlideMessage) : l(u.nextSlideMessage));
                      t.includes(i) && (r.isBeginning && !r.params.loop || r.slidePrev(),
                      r.isBeginning ? l(u.firstSlideMessage) : l(u.prevSlideMessage))
                  }
                  r.pagination && i.matches(s(r.params.pagination.bulletClass)) && i.click()
              }
          }
      }
      function tt() {
          return r.pagination && r.pagination.bullets && r.pagination.bullets.length
      }
      function it() {
          return tt() && r.params.pagination.clickable
      }
      let {swiper: r, extendParams: st, on: e} = t;
      st({
          a11y: {
              enabled: !0,
              notificationClass: "swiper-notification",
              prevSlideMessage: "Previous slide",
              nextSlideMessage: "Next slide",
              firstSlideMessage: "This is the first slide",
              lastSlideMessage: "This is the last slide",
              paginationBulletMessage: "Go to slide {{index}}",
              slideLabelMessage: "{{index}} / {{slidesLength}}",
              containerMessage: null,
              containerRoleDescriptionMessage: null,
              itemRoleDescriptionMessage: null,
              slideRole: "group",
              id: null
          }
      });
      r.a11y = {
          clicked: !1
      };
      let h, c, u = null, w = (new Date).getTime();
      const rt = (t, i, r) => {
          a(t),
          "BUTTON" !== t.tagName && (y(t, "button"),
          t.addEventListener("keydown", o)),
          v(t, r),
          function(t, i) {
              (t = n(t)).forEach(n => {
                  n.setAttribute("aria-controls", i)
              }
              )
          }(t, i)
      }
        , ut = n => {
          c && c !== n.target && !c.contains(n.target) && (h = !0),
          r.a11y.clicked = !0
      }
        , ft = () => {
          h = !1,
          requestAnimationFrame( () => {
              requestAnimationFrame( () => {
                  r.destroyed || (r.a11y.clicked = !1)
              }
              )
          }
          )
      }
        , et = () => {
          w = (new Date).getTime()
      }
        , p = n => {
          if (!r.a11y.clicked && !((new Date).getTime() - w < 100)) {
              const t = n.target.closest(`.${r.params.slideClass}, swiper-slide`);
              if (t && r.slides.includes(t)) {
                  c = t;
                  const i = r.slides.indexOf(t) === r.activeIndex
                    , u = r.params.watchSlidesProgress && r.visibleSlides && r.visibleSlides.includes(t);
                  i || u || n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents || (r.isHorizontal() ? r.el.scrollLeft = 0 : r.el.scrollTop = 0,
                  requestAnimationFrame( () => {
                      h || (r.slideTo(r.slides.indexOf(t), 0),
                      h = !1)
                  }
                  ))
              }
          }
      }
        , ot = () => {
          const n = r.params.a11y;
          n.itemRoleDescriptionMessage && d(r.slides, n.itemRoleDescriptionMessage);
          n.slideRole && y(r.slides, n.slideRole);
          const t = r.slides.length;
          n.slideLabelMessage && r.slides.forEach( (i, u) => {
              const f = r.params.loop ? parseInt(i.getAttribute("data-swiper-slide-index"), 10) : u;
              v(i, n.slideLabelMessage.replace(/\{\{index\}\}/, f + 1).replace(/\{\{slidesLength\}\}/, t))
          }
          )
      }
        , ht = () => {
          var f, a;
          const t = r.params.a11y;
          r.el.append(u);
          const l = r.el;
          t.containerRoleDescriptionMessage && d(l, t.containerRoleDescriptionMessage);
          t.containerMessage && v(l, t.containerMessage);
          const h = r.wrapperEl
            , c = t.id || h.getAttribute("id") || `swiper-wrapper-${f = 16,
          void 0 === f && (f = 16),
          "x".repeat(f).replace(/x/g, () => Math.round(16 * Math.random()).toString(16))}`;
          const y = r.params.autoplay && r.params.autoplay.enabled ? "off" : "polite";
          a = c;
          n(h).forEach(n => {
              n.setAttribute("id", a)
          }
          ),
          function(t, i) {
              (t = n(t)).forEach(n => {
                  n.setAttribute("aria-live", i)
              }
              )
          }(h, y);
          ot();
          let {nextEl: e, prevEl: s} = r.navigation ? r.navigation : {};
          (e = n(e),
          s = n(s),
          e && e.forEach(n => rt(n, c, t.nextSlideMessage)),
          s && s.forEach(n => rt(n, c, t.prevSlideMessage)),
          it()) && n(r.pagination.el).forEach(n => {
              n.addEventListener("keydown", o)
          }
          );
          i().addEventListener("visibilitychange", et);
          r.el.addEventListener("focus", p, !0);
          r.el.addEventListener("focus", p, !0);
          r.el.addEventListener("pointerdown", ut, !0);
          r.el.addEventListener("pointerup", ft, !0)
      }
      ;
      e("beforeInit", () => {
          u = f("span", r.params.a11y.notificationClass),
          u.setAttribute("aria-live", "assertive"),
          u.setAttribute("aria-atomic", "true")
      }
      );
      e("afterInit", () => {
          r.params.a11y.enabled && ht()
      }
      );
      e("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
          r.params.a11y.enabled && ot()
      }
      );
      e("fromEdge toEdge afterInit lock unlock", () => {
          r.params.a11y.enabled && function() {
              if (!r.params.loop && !r.params.rewind && r.navigation) {
                  const {nextEl: n, prevEl: t} = r.navigation;
                  t && (r.isBeginning ? (g(t),
                  b(t)) : (nt(t),
                  a(t)));
                  n && (r.isEnd ? (g(n),
                  b(n)) : (nt(n),
                  a(n)))
              }
          }()
      }
      );
      e("paginationUpdate", () => {
          r.params.a11y.enabled && function() {
              const n = r.params.a11y;
              tt() && r.pagination.bullets.forEach(t => {
                  r.params.pagination.clickable && (a(t),
                  r.params.pagination.renderBullet || (y(t, "button"),
                  v(t, n.paginationBulletMessage.replace(/\{\{index\}\}/, k(t) + 1)))),
                  t.matches(s(r.params.pagination.bulletActiveClass)) ? t.setAttribute("aria-current", "true") : t.removeAttribute("aria-current")
              }
              )
          }()
      }
      );
      e("destroy", () => {
          r.params.a11y.enabled && function() {
              u && u.remove();
              let {nextEl: t, prevEl: f} = r.navigation ? r.navigation : {};
              t = n(t);
              f = n(f);
              t && t.forEach(n => n.removeEventListener("keydown", o));
              f && f.forEach(n => n.removeEventListener("keydown", o));
              it() && n(r.pagination.el).forEach(n => {
                  n.removeEventListener("keydown", o)
              }
              );
              i().removeEventListener("visibilitychange", et);
              r.el.removeEventListener("focus", p, !0);
              r.el.removeEventListener("pointerdown", ut, !0);
              r.el.removeEventListener("pointerup", ft, !0)
          }()
      }
      )
  }
  , function(n) {
      let {swiper: i, extendParams: l, on: u} = n;
      l({
          history: {
              enabled: !1,
              root: "",
              replaceState: !1,
              key: "slides",
              keepQuery: !1
          }
      });
      let f = !1
        , r = {};
      const o = n => n.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        , s = n => {
          const f = t();
          let r;
          r = n ? new URL(n) : f.location;
          const i = r.pathname.slice(1).split("/").filter(n => "" !== n)
            , u = i.length;
          return {
              key: i[u - 2],
              value: i[u - 1]
          }
      }
        , h = (n, r) => {
          const e = t();
          if (f && i.params.history.enabled) {
              let s;
              s = i.params.url ? new URL(i.params.url) : e.location;
              const c = i.virtual && i.params.virtual.enabled ? i.slidesEl.querySelector(`[data-swiper-slide-index="${r}"]`) : i.slides[r];
              let u = o(c.getAttribute("data-history"));
              if (i.params.history.root.length > 0) {
                  let t = i.params.history.root;
                  "/" === t[t.length - 1] && (t = t.slice(0, t.length - 1));
                  u = `${t}/${n ? `${n}/` : ""}${u}`
              } else
                  s.pathname.includes(n) || (u = `${n ? `${n}/` : ""}${u}`);
              i.params.history.keepQuery && (u += s.search);
              const h = e.history.state;
              h && h.value === u || (i.params.history.replaceState ? e.history.replaceState({
                  value: u
              }, null, u) : e.history.pushState({
                  value: u
              }, null, u))
          }
      }
        , c = (n, t, r) => {
          if (t)
              for (let u = 0, f = i.slides.length; u < f; u += 1) {
                  const f = i.slides[u];
                  if (o(f.getAttribute("data-history")) === t) {
                      const t = i.getSlideIndex(f);
                      i.slideTo(t, n, r)
                  }
              }
          else
              i.slideTo(0, n, r)
      }
        , e = () => {
          r = s(i.params.url),
          c(i.params.speed, r.value, !1)
      }
      ;
      u("init", () => {
          i.params.history.enabled && ( () => {
              const n = t();
              if (i.params.history) {
                  if (!n.history || !n.history.pushState)
                      return i.params.history.enabled = !1,
                      void (i.params.hashNavigation.enabled = !0);
                  f = !0;
                  r = s(i.params.url);
                  r.key || r.value ? (c(0, r.value, i.params.runCallbacksOnInit),
                  i.params.history.replaceState || n.addEventListener("popstate", e)) : i.params.history.replaceState || n.addEventListener("popstate", e)
              }
          }
          )()
      }
      );
      u("destroy", () => {
          i.params.history.enabled && ( () => {
              const n = t();
              i.params.history.replaceState || n.removeEventListener("popstate", e)
          }
          )()
      }
      );
      u("transitionEnd _freeModeNoMomentumRelease", () => {
          f && h(i.params.history.key, i.activeIndex)
      }
      );
      u("slideChange", () => {
          f && i.params.cssMode && h(i.params.history.key, i.activeIndex)
      }
      )
  }
  , function(n) {
      let {swiper: u, extendParams: a, emit: s, on: e} = n
        , o = !1;
      const h = i()
        , f = t();
      a({
          hashNavigation: {
              enabled: !1,
              replaceState: !1,
              watchState: !1,
              getSlideIndex(n, t) {
                  if (u.virtual && u.params.virtual.enabled) {
                      const n = u.slides.filter(n => n.getAttribute("data-hash") === t)[0];
                      return n ? parseInt(n.getAttribute("data-swiper-slide-index"), 10) : 0
                  }
                  return u.getSlideIndex(r(u.slidesEl, `.${u.params.slideClass}[data-hash="${t}"], swiper-slide[data-hash="${t}"]`)[0])
              }
          }
      });
      const c = () => {
          s("hashChange");
          const n = h.location.hash.replace("#", "")
            , t = u.virtual && u.params.virtual.enabled ? u.slidesEl.querySelector(`[data-swiper-slide-index="${u.activeIndex}"]`) : u.slides[u.activeIndex];
          if (n !== (t ? t.getAttribute("data-hash") : "")) {
              const t = u.params.hashNavigation.getSlideIndex(u, n);
              if (void 0 === t || Number.isNaN(t))
                  return;
              u.slideTo(t)
          }
      }
        , l = () => {
          if (o && u.params.hashNavigation.enabled) {
              const n = u.virtual && u.params.virtual.enabled ? u.slidesEl.querySelector(`[data-swiper-slide-index="${u.activeIndex}"]`) : u.slides[u.activeIndex]
                , t = n ? n.getAttribute("data-hash") || n.getAttribute("data-history") : "";
              u.params.hashNavigation.replaceState && f.history && f.history.replaceState ? (f.history.replaceState(null, null, `#${t}` || ""),
              s("hashSet")) : (h.location.hash = t || "",
              s("hashSet"))
          }
      }
      ;
      e("init", () => {
          u.params.hashNavigation.enabled && ( () => {
              if (u.params.hashNavigation.enabled && (!u.params.history || !u.params.history.enabled)) {
                  o = !0;
                  const n = h.location.hash.replace("#", "");
                  if (n) {
                      const t = u.params.hashNavigation.getSlideIndex(u, n);
                      u.slideTo(t || 0, 0, u.params.runCallbacksOnInit, !0)
                  }
                  u.params.hashNavigation.watchState && f.addEventListener("hashchange", c)
              }
          }
          )()
      }
      );
      e("destroy", () => {
          u.params.hashNavigation.enabled && u.params.hashNavigation.watchState && f.removeEventListener("hashchange", c)
      }
      );
      e("transitionEnd _freeModeNoMomentumRelease", () => {
          o && l()
      }
      );
      e("slideChange", () => {
          o && u.params.cssMode && l()
      }
      )
  }
  , function(n) {
      function it(n) {
          t && !t.destroyed && t.wrapperEl && n.target === t.wrapperEl && (t.wrapperEl.removeEventListener("transitionend", it),
          g || o())
      }
      let l, b, {swiper: t, extendParams: st, on: f, emit: u, params: s} = n;
      t.autoplay = {
          running: !1,
          paused: !1,
          timeLeft: 0
      };
      st({
          autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !1,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1
          }
      });
      let r, k, y, h, tt, d, e, g, nt = s && s.autoplay ? s.autoplay.delay : 3e3, p = s && s.autoplay ? s.autoplay.delay : 3e3, a = (new Date).getTime();
      const rt = () => {
          if (!t.destroyed && t.autoplay.running) {
              t.autoplay.paused ? k = !0 : k && (p = r,
              k = !1);
              const n = t.autoplay.paused ? r : a + p - (new Date).getTime();
              t.autoplay.timeLeft = n;
              u("autoplayTimeLeft", n, n / nt);
              b = requestAnimationFrame( () => {
                  rt()
              }
              )
          }
      }
        , w = n => {
          if (!t.destroyed && t.autoplay.running) {
              cancelAnimationFrame(b);
              rt();
              let i = void 0 === n ? t.params.autoplay.delay : n;
              nt = t.params.autoplay.delay;
              p = t.params.autoplay.delay;
              const f = ( () => {
                  let n;
                  if (n = t.virtual && t.params.virtual.enabled ? t.slides.filter(n => n.classList.contains("swiper-slide-active"))[0] : t.slides[t.activeIndex],
                  n)
                      return parseInt(n.getAttribute("data-swiper-autoplay"), 10)
              }
              )();
              !Number.isNaN(f) && f > 0 && void 0 === n && (i = f,
              nt = f,
              p = f);
              r = i;
              const e = t.params.speed
                , o = () => {
                  t && !t.destroyed && (t.params.autoplay.reverseDirection ? !t.isBeginning || t.params.loop || t.params.rewind ? (t.slidePrev(e, !0, !0),
                  u("autoplay")) : t.params.autoplay.stopOnLastSlide || (t.slideTo(t.slides.length - 1, e, !0, !0),
                  u("autoplay")) : !t.isEnd || t.params.loop || t.params.rewind ? (t.slideNext(e, !0, !0),
                  u("autoplay")) : t.params.autoplay.stopOnLastSlide || (t.slideTo(0, e, !0, !0),
                  u("autoplay")),
                  t.params.cssMode && (a = (new Date).getTime(),
                  requestAnimationFrame( () => {
                      w()
                  }
                  )))
              }
              ;
              return i > 0 ? (clearTimeout(l),
              l = setTimeout( () => {
                  o()
              }
              , i)) : requestAnimationFrame( () => {
                  o()
              }
              ),
              i
          }
      }
        , ut = () => {
          a = (new Date).getTime(),
          t.autoplay.running = !0,
          w(),
          u("autoplayStart")
      }
        , v = () => {
          t.autoplay.running = !1,
          clearTimeout(l),
          cancelAnimationFrame(b),
          u("autoplayStop")
      }
        , c = (n, i) => {
          if (!t.destroyed && t.autoplay.running) {
              clearTimeout(l);
              n || (e = !0);
              const f = () => {
                  u("autoplayPause"),
                  t.params.autoplay.waitForTransition ? t.wrapperEl.addEventListener("transitionend", it) : o()
              }
              ;
              if (t.autoplay.paused = !0,
              i)
                  return d && (r = t.params.autoplay.delay),
                  d = !1,
                  void f();
              const s = r || t.params.autoplay.delay;
              r = s - ((new Date).getTime() - a);
              t.isEnd && r < 0 && !t.params.loop || (r < 0 && (r = 0),
              f())
          }
      }
        , o = () => {
          t.isEnd && r < 0 && !t.params.loop || t.destroyed || !t.autoplay.running || (a = (new Date).getTime(),
          e ? (e = !1,
          w(r)) : w(),
          t.autoplay.paused = !1,
          u("autoplayResume"))
      }
        , ft = () => {
          if (!t.destroyed && t.autoplay.running) {
              const n = i();
              "hidden" === n.visibilityState && (e = !0,
              c(!0));
              "visible" === n.visibilityState && o()
          }
      }
        , et = n => {
          "mouse" === n.pointerType && (e = !0,
          g = !0,
          t.animating || t.autoplay.paused || c(!0))
      }
        , ot = n => {
          "mouse" === n.pointerType && (g = !1,
          t.autoplay.paused && o())
      }
      ;
      f("init", () => {
          t.params.autoplay.enabled && (t.params.autoplay.pauseOnMouseEnter && (t.el.addEventListener("pointerenter", et),
          t.el.addEventListener("pointerleave", ot)),
          i().addEventListener("visibilitychange", ft),
          ut())
      }
      );
      f("destroy", () => {
          t.el.removeEventListener("pointerenter", et),
          t.el.removeEventListener("pointerleave", ot),
          i().removeEventListener("visibilitychange", ft),
          t.autoplay.running && v()
      }
      );
      f("_freeModeStaticRelease", () => {
          (h || e) && o()
      }
      );
      f("_freeModeNoMomentumRelease", () => {
          t.params.autoplay.disableOnInteraction ? v() : c(!0, !0)
      }
      );
      f("beforeTransitionStart", (n, i, r) => {
          !t.destroyed && t.autoplay.running && (r || !t.params.autoplay.disableOnInteraction ? c(!0, !0) : v())
      }
      );
      f("sliderFirstMove", () => {
          !t.destroyed && t.autoplay.running && (t.params.autoplay.disableOnInteraction ? v() : (y = !0,
          h = !1,
          e = !1,
          tt = setTimeout( () => {
              e = !0,
              h = !0,
              c(!0)
          }
          , 200)))
      }
      );
      f("touchEnd", () => {
          if (!t.destroyed && t.autoplay.running && y) {
              if (clearTimeout(tt),
              clearTimeout(l),
              t.params.autoplay.disableOnInteraction)
                  return h = !1,
                  void (y = !1);
              h && t.params.cssMode && o();
              h = !1;
              y = !1
          }
      }
      );
      f("slideChange", () => {
          !t.destroyed && t.autoplay.running && (d = !0)
      }
      );
      Object.assign(t.autoplay, {
          start: ut,
          stop: v,
          pause: c,
          resume: o
      })
  }
  , function(n) {
      function c() {
          const n = t.thumbs.swiper;
          if (n && !n.destroyed) {
              const r = n.clickedIndex
                , u = n.clickedSlide;
              if ((!u || !u.classList.contains(t.params.thumbs.slideThumbActiveClass)) && null != r) {
                  let i;
                  i = n.params.loop ? parseInt(n.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : r;
                  t.params.loop ? t.slideToLoop(i) : t.slideTo(i)
              }
          }
      }
      function e() {
          const {thumbs: n} = t.params;
          if (o)
              return !1;
          o = !0;
          const i = t.constructor;
          if (n.swiper instanceof i)
              t.thumbs.swiper = n.swiper,
              Object.assign(t.thumbs.swiper.originalParams, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1
              }),
              Object.assign(t.thumbs.swiper.params, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1
              }),
              t.thumbs.swiper.update();
          else if (w(n.swiper)) {
              const r = Object.assign({}, n.swiper);
              Object.assign(r, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1
              });
              t.thumbs.swiper = new i(r);
              s = !0
          }
          return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass),
          t.thumbs.swiper.on("tap", c),
          !0
      }
      function u(n) {
          const i = t.thumbs.swiper;
          if (i && !i.destroyed) {
              const o = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView;
              let u = 1;
              const f = t.params.thumbs.slideThumbActiveClass;
              if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (u = t.params.slidesPerView),
              t.params.thumbs.multipleActiveThumbs || (u = 1),
              u = Math.floor(u),
              i.slides.forEach(n => n.classList.remove(f)),
              i.params.loop || i.params.virtual && i.params.virtual.enabled)
                  for (let n = 0; n < u; n += 1)
                      r(i.slidesEl, `[data-swiper-slide-index="${t.realIndex + n}"]`).forEach(n => {
                          n.classList.add(f)
                      }
                      );
              else
                  for (let n = 0; n < u; n += 1)
                      i.slides[t.realIndex + n] && i.slides[t.realIndex + n].classList.add(f);
              const e = t.params.thumbs.autoScrollOffset
                , s = e && !i.params.loop;
              if (t.realIndex !== i.realIndex || s) {
                  const f = i.activeIndex;
                  let r, u;
                  if (i.params.loop) {
                      const n = i.slides.filter(n => n.getAttribute("data-swiper-slide-index") === `${t.realIndex}`)[0];
                      r = i.slides.indexOf(n);
                      u = t.activeIndex > t.previousIndex ? "next" : "prev"
                  } else
                      r = t.realIndex,
                      u = r > t.previousIndex ? "next" : "prev";
                  s && (r += "next" === u ? e : -1 * e);
                  i.visibleSlidesIndexes && i.visibleSlidesIndexes.indexOf(r) < 0 && (i.params.centeredSlides ? r = r > f ? r - Math.floor(o / 2) + 1 : r + Math.floor(o / 2) - 1 : r > f && i.params.slidesPerGroup,
                  i.slideTo(r, n ? 0 : void 0))
              }
          }
      }
      let {swiper: t, extendParams: h, on: f} = n;
      h({
          thumbs: {
              swiper: null,
              multipleActiveThumbs: !0,
              autoScrollOffset: 0,
              slideThumbActiveClass: "swiper-slide-thumb-active",
              thumbsContainerClass: "swiper-thumbs"
          }
      });
      let o = !1
        , s = !1;
      t.thumbs = {
          swiper: null
      };
      f("beforeInit", () => {
          const {thumbs: n} = t.params;
          if (n && n.swiper)
              if ("string" == typeof n.swiper || n.swiper instanceof HTMLElement) {
                  const f = i()
                    , o = () => {
                      const i = "string" == typeof n.swiper ? f.querySelector(n.swiper) : n.swiper;
                      if (i && i.swiper)
                          n.swiper = i.swiper,
                          e(),
                          u(!0);
                      else if (i) {
                          const r = f => {
                              n.swiper = f.detail[0],
                              i.removeEventListener("init", r),
                              e(),
                              u(!0),
                              n.swiper.update(),
                              t.update()
                          }
                          ;
                          i.addEventListener("init", r)
                      }
                      return i
                  }
                    , r = () => {
                      t.destroyed || o() || requestAnimationFrame(r)
                  }
                  ;
                  requestAnimationFrame(r)
              } else
                  e(),
                  u(!0)
      }
      );
      f("slideChange update resize observerUpdate", () => {
          u()
      }
      );
      f("setTransition", (n, i) => {
          const r = t.thumbs.swiper;
          r && !r.destroyed && r.setTransition(i)
      }
      );
      f("beforeDestroy", () => {
          const n = t.thumbs.swiper;
          n && !n.destroyed && s && n.destroy()
      }
      );
      Object.assign(t.thumbs, {
          init: e,
          update: u
      })
  }
  , function(n) {
      let {swiper: t, extendParams: r, emit: i, once: u} = n;
      r({
          freeMode: {
              enabled: !1,
              momentum: !0,
              momentumRatio: 1,
              momentumBounce: !0,
              momentumBounceRatio: 1,
              momentumVelocityRatio: 1,
              sticky: !1,
              minimumVelocity: .02
          }
      });
      Object.assign(t, {
          freeMode: {
              onTouchStart: function() {
                  if (!t.params.cssMode) {
                      const n = t.getTranslate();
                      t.setTranslate(n);
                      t.setTransition(0);
                      t.touchEventsData.velocities.length = 0;
                      t.freeMode.onTouchEnd({
                          currentPos: t.rtl ? t.translate : -t.translate
                      })
                  }
              },
              onTouchMove: function() {
                  if (!t.params.cssMode) {
                      const {touchEventsData: n, touches: i} = t;
                      0 === n.velocities.length && n.velocities.push({
                          position: i[t.isHorizontal() ? "startX" : "startY"],
                          time: n.touchStartTime
                      });
                      n.velocities.push({
                          position: i[t.isHorizontal() ? "currentX" : "currentY"],
                          time: e()
                      })
                  }
              },
              onTouchEnd: function(n) {
                  let {currentPos: c} = n;
                  if (!t.params.cssMode) {
                      const {params: r, wrapperEl: s, rtlTranslate: h, snapGrid: f, touchEventsData: o} = t
                        , l = e() - o.touchStartTime;
                      if (c < -t.minTranslate())
                          t.slideTo(t.activeIndex);
                      else if (c > -t.maxTranslate())
                          t.slides.length < f.length ? t.slideTo(f.length - 1) : t.slideTo(t.slides.length - 1);
                      else {
                          if (r.freeMode.momentum) {
                              if (o.velocities.length > 1) {
                                  const n = o.velocities.pop()
                                    , i = o.velocities.pop()
                                    , f = n.position - i.position
                                    , u = n.time - i.time;
                                  t.velocity = f / u;
                                  t.velocity /= 2;
                                  Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0);
                                  (u > 150 || e() - n.time > 300) && (t.velocity = 0)
                              } else
                                  t.velocity = 0;
                              t.velocity *= r.freeMode.momentumVelocityRatio;
                              o.velocities.length = 0;
                              let c = 1e3 * r.freeMode.momentumRatio;
                              const p = t.velocity * c;
                              let n = t.translate + p;
                              h && (n = -n);
                              let l, v = !1;
                              const a = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                              let y;
                              if (n < t.maxTranslate())
                                  r.freeMode.momentumBounce ? (n + t.maxTranslate() < -a && (n = t.maxTranslate() - a),
                                  l = t.maxTranslate(),
                                  v = !0,
                                  o.allowMomentumBounce = !0) : n = t.maxTranslate(),
                                  r.loop && r.centeredSlides && (y = !0);
                              else if (n > t.minTranslate())
                                  r.freeMode.momentumBounce ? (n - t.minTranslate() > a && (n = t.minTranslate() + a),
                                  l = t.minTranslate(),
                                  v = !0,
                                  o.allowMomentumBounce = !0) : n = t.minTranslate(),
                                  r.loop && r.centeredSlides && (y = !0);
                              else if (r.freeMode.sticky) {
                                  let i;
                                  for (let t = 0; t < f.length; t += 1)
                                      if (f[t] > -n) {
                                          i = t;
                                          break
                                      }
                                  n = Math.abs(f[i] - n) < Math.abs(f[i - 1] - n) || "next" === t.swipeDirection ? f[i] : f[i - 1];
                                  n = -n
                              }
                              if (y && u("transitionEnd", () => {
                                  t.loopFix()
                              }
                              ),
                              0 !== t.velocity) {
                                  if (c = h ? Math.abs((-n - t.translate) / t.velocity) : Math.abs((n - t.translate) / t.velocity),
                                  r.freeMode.sticky) {
                                      const i = Math.abs((h ? -n : n) - t.translate)
                                        , u = t.slidesSizesGrid[t.activeIndex];
                                      c = i < u ? r.speed : i < 2 * u ? 1.5 * r.speed : 2.5 * r.speed
                                  }
                              } else if (r.freeMode.sticky)
                                  return void t.slideToClosest();
                              r.freeMode.momentumBounce && v ? (t.updateProgress(l),
                              t.setTransition(c),
                              t.setTranslate(n),
                              t.transitionStart(!0, t.swipeDirection),
                              t.animating = !0,
                              d(s, () => {
                                  t && !t.destroyed && o.allowMomentumBounce && (i("momentumBounce"),
                                  t.setTransition(r.speed),
                                  setTimeout( () => {
                                      t.setTranslate(l),
                                      d(s, () => {
                                          t && !t.destroyed && t.transitionEnd()
                                      }
                                      )
                                  }
                                  , 0))
                              }
                              )) : t.velocity ? (i("_freeModeNoMomentumRelease"),
                              t.updateProgress(n),
                              t.setTransition(c),
                              t.setTranslate(n),
                              t.transitionStart(!0, t.swipeDirection),
                              t.animating || (t.animating = !0,
                              d(s, () => {
                                  t && !t.destroyed && t.transitionEnd()
                              }
                              ))) : t.updateProgress(n);
                              t.updateActiveIndex();
                              t.updateSlidesClasses()
                          } else {
                              if (r.freeMode.sticky)
                                  return void t.slideToClosest();
                              r.freeMode && i("_freeModeNoMomentumRelease")
                          }
                          (!r.freeMode.momentum || l >= r.longSwipesMs) && (i("_freeModeStaticRelease"),
                          t.updateProgress(),
                          t.updateActiveIndex(),
                          t.updateSlidesClasses())
                      }
                  }
              }
          }
      })
  }
  , function(n) {
      let i, f, r, u, {swiper: t, extendParams: s, on: e} = n;
      s({
          grid: {
              rows: 1,
              fill: "column"
          }
      });
      const o = () => {
          let n = t.params.spaceBetween;
          return "string" == typeof n && n.indexOf("%") >= 0 ? n = parseFloat(n.replace("%", "")) / 100 * t.size : "string" == typeof n && (n = parseFloat(n)),
          n
      }
      ;
      e("init", () => {
          u = t.params.grid && t.params.grid.rows > 1
      }
      );
      e("update", () => {
          const {params: n, el: i} = t
            , f = n.grid && n.grid.rows > 1;
          u && !f ? (i.classList.remove(`${n.containerModifierClass}grid`, `${n.containerModifierClass}grid-column`),
          r = 1,
          t.emitContainerClasses()) : !u && f && (i.classList.add(`${n.containerModifierClass}grid`),
          "column" === n.grid.fill && i.classList.add(`${n.containerModifierClass}grid-column`),
          t.emitContainerClasses());
          u = f
      }
      );
      t.grid = {
          initSlides: n => {
              const {slidesPerView: o} = t.params
                , {rows: u, fill: s} = t.params.grid
                , e = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : n.length;
              r = Math.floor(e / u);
              i = Math.floor(e / u) === e / u ? e : Math.ceil(e / u) * u;
              "auto" !== o && "row" === s && (i = Math.max(i, o * u));
              f = i / u
          }
          ,
          unsetSlides: () => {
              t.slides && t.slides.forEach(n => {
                  n.swiperSlideGridSet && (n.style.height = "",
                  n.style[t.getDirectionLabel("margin-top")] = "")
              }
              )
          }
          ,
          updateSlide: (n, u, e) => {
              const {slidesPerGroup: l} = t.params
                , a = o()
                , {rows: h, fill: v} = t.params.grid
                , p = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : e.length;
              let y, c, s;
              if ("row" === v && l > 1) {
                  const t = Math.floor(n / (l * h))
                    , r = n - h * l * t
                    , f = 0 === t ? l : Math.min(Math.ceil((p - t * h * l) / h), l);
                  s = Math.floor(r / f);
                  c = r - s * f + t * l;
                  y = c + s * i / h;
                  u.style.order = y
              } else
                  "column" === v ? (c = Math.floor(n / h),
                  s = n - c * h,
                  (c > r || c === r && s === h - 1) && (s += 1,
                  s >= h && (s = 0,
                  c += 1))) : (s = Math.floor(n / f),
                  c = n - s * f);
              u.row = s;
              u.column = c;
              u.style.height = `calc((100% - ${(h - 1) * a}px) / ${h})`;
              u.style[t.getDirectionLabel("margin-top")] = 0 !== s ? a && `${a}px` : "";
              u.swiperSlideGridSet = !0
          }
          ,
          updateWrapperSize: (n, r) => {
              const {centeredSlides: f, roundLengths: e} = t.params
                , u = o()
                , {rows: s} = t.params.grid;
              if (t.virtualSize = (n + u) * i,
              t.virtualSize = Math.ceil(t.virtualSize / s) - u,
              t.params.cssMode || (t.wrapperEl.style[t.getDirectionLabel("width")] = `${t.virtualSize + u}px`),
              f) {
                  const n = [];
                  for (let i = 0; i < r.length; i += 1) {
                      let u = r[i];
                      e && (u = Math.floor(u));
                      r[i] < t.virtualSize + r[0] && n.push(u)
                  }
                  r.splice(0, r.length);
                  r.push(...n)
              }
          }
      }
  }
  , function(n) {
      let {swiper: t} = n;
      Object.assign(t, {
          appendSlide: nr.bind(t),
          prependSlide: tr.bind(t),
          addSlide: ir.bind(t),
          removeSlide: rr.bind(t),
          removeAllSlides: ur.bind(t)
      })
  }
  , function(n) {
      let {swiper: t, extendParams: i, on: r} = n;
      i({
          fadeEffect: {
              crossFade: !1
          }
      });
      y({
          effect: "fade",
          swiper: t,
          on: r,
          setTranslate: () => {
              const {slides: n} = t;
              t.params.fadeEffect;
              for (let i = 0; i < n.length; i += 1) {
                  const n = t.slides[i];
                  let r = -n.swiperSlideOffset;
                  t.params.virtualTranslate || (r -= t.translate);
                  let u = 0;
                  t.isHorizontal() || (u = r,
                  r = 0);
                  const e = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(n.progress), 0) : 1 + Math.min(Math.max(n.progress, -1), 0)
                    , f = g(0, n);
                  f.style.opacity = e;
                  f.style.transform = `translate3d(${r}px, ${u}px, 0px)`
              }
          }
          ,
          setTransition: n => {
              const i = t.slides.map(n => a(n));
              i.forEach(t => {
                  t.style.transitionDuration = `${n}ms`
              }
              );
              rt({
                  swiper: t,
                  duration: n,
                  transformElements: i,
                  allSlides: !0
              })
          }
          ,
          overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !t.params.cssMode
          })
      })
  }
  , function(n) {
      let {swiper: t, extendParams: r, on: u} = n;
      r({
          cubeEffect: {
              slideShadows: !0,
              shadow: !0,
              shadowOffset: 20,
              shadowScale: .94
          }
      });
      const i = (n, t, i) => {
          let r = i ? n.querySelector(".swiper-slide-shadow-left") : n.querySelector(".swiper-slide-shadow-top")
            , u = i ? n.querySelector(".swiper-slide-shadow-right") : n.querySelector(".swiper-slide-shadow-bottom");
          r || (r = f("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (i ? "left" : "top")).split(" ")),
          n.append(r));
          u || (u = f("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (i ? "right" : "bottom")).split(" ")),
          n.append(u));
          r && (r.style.opacity = Math.max(-t, 0));
          u && (u.style.opacity = Math.max(t, 0))
      }
      ;
      y({
          effect: "cube",
          swiper: t,
          on: u,
          setTranslate: () => {
              const {el: a, wrapperEl: s, slides: v, width: h, height: y, rtlTranslate: c, size: n, browser: l} = t
                , u = t.params.cubeEffect
                , o = t.isHorizontal()
                , w = t.virtual && t.params.virtual.enabled;
              let r, e = 0;
              u.shadow && (o ? (r = t.wrapperEl.querySelector(".swiper-cube-shadow"),
              r || (r = f("div", "swiper-cube-shadow"),
              t.wrapperEl.append(r)),
              r.style.height = `${h}px`) : (r = a.querySelector(".swiper-cube-shadow"),
              r || (r = f("div", "swiper-cube-shadow"),
              a.append(r))));
              for (let r = 0; r < v.length; r += 1) {
                  const p = v[r];
                  let s = r;
                  w && (s = parseInt(p.getAttribute("data-swiper-slide-index"), 10));
                  let h = 90 * s
                    , l = Math.floor(h / 360);
                  c && (h = -h,
                  l = Math.floor(-h / 360));
                  const a = Math.max(Math.min(p.progress, 1), -1);
                  let f = 0
                    , b = 0
                    , y = 0;
                  s % 4 == 0 ? (f = 4 * -l * n,
                  y = 0) : (s - 1) % 4 == 0 ? (f = 0,
                  y = 4 * -l * n) : (s - 2) % 4 == 0 ? (f = n + 4 * l * n,
                  y = n) : (s - 3) % 4 == 0 && (f = -n,
                  y = 3 * n + 4 * n * l);
                  c && (f = -f);
                  o || (b = f,
                  f = 0);
                  const k = `rotateX(${o ? 0 : -h}deg) rotateY(${o ? h : 0}deg) translate3d(${f}px, ${b}px, ${y}px)`;
                  a <= 1 && a > -1 && (e = 90 * s + 90 * a,
                  c && (e = 90 * -s - 90 * a),
                  t.browser && t.browser.need3dFix && Math.abs(e) / 90 % 2 == 1 && (e += .001));
                  p.style.transform = k;
                  u.slideShadows && i(p, a, o)
              }
              if (s.style.transformOrigin = `50% 50% -${n / 2}px`,
              s.style["-webkit-transform-origin"] = `50% 50% -${n / 2}px`,
              u.shadow)
                  if (o)
                      r.style.transform = `translate3d(0px, ${h / 2 + u.shadowOffset}px, ${-h / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${u.shadowScale})`;
                  else {
                      const n = Math.abs(e) - 90 * Math.floor(Math.abs(e) / 90)
                        , i = 1.5 - (Math.sin(2 * n * Math.PI / 360) / 2 + Math.cos(2 * n * Math.PI / 360) / 2)
                        , f = u.shadowScale
                        , t = u.shadowScale / i
                        , o = u.shadowOffset;
                      r.style.transform = `scale3d(${f}, 1, ${t}) translate3d(0px, ${y / 2 + o}px, ${-y / 2 / t}px) rotateX(-89.99deg)`
                  }
              const p = (l.isSafari || l.isWebView) && l.needPerspectiveFix ? -n / 2 : 0;
              s.style.transform = `translate3d(0px,0,${p}px) rotateX(${t.isHorizontal() ? 0 : e}deg) rotateY(${t.isHorizontal() ? -e : 0}deg)`;
              s.style.setProperty("--swiper-cube-translate-z", `${p}px`)
          }
          ,
          setTransition: n => {
              const {el: i, slides: r} = t;
              if (r.forEach(t => {
                  t.style.transitionDuration = `${n}ms`,
                  t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(t => {
                      t.style.transitionDuration = `${n}ms`
                  }
                  )
              }
              ),
              t.params.cubeEffect.shadow && !t.isHorizontal()) {
                  const t = i.querySelector(".swiper-cube-shadow");
                  t && (t.style.transitionDuration = `${n}ms`)
              }
          }
          ,
          recreateShadows: () => {
              const n = t.isHorizontal();
              t.slides.forEach(t => {
                  const r = Math.max(Math.min(t.progress, 1), -1);
                  i(t, r, n)
              }
              )
          }
          ,
          getEffectParams: () => t.params.cubeEffect,
          perspective: () => !0,
          overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0
          })
      })
  }
  , function(n) {
      let {swiper: t, extendParams: r, on: u} = n;
      r({
          flipEffect: {
              slideShadows: !0,
              limitRotation: !0
          }
      });
      const i = (n, i) => {
          let r = t.isHorizontal() ? n.querySelector(".swiper-slide-shadow-left") : n.querySelector(".swiper-slide-shadow-top")
            , u = t.isHorizontal() ? n.querySelector(".swiper-slide-shadow-right") : n.querySelector(".swiper-slide-shadow-bottom");
          r || (r = p("flip", n, t.isHorizontal() ? "left" : "top"));
          u || (u = p("flip", n, t.isHorizontal() ? "right" : "bottom"));
          r && (r.style.opacity = Math.max(-i, 0));
          u && (u.style.opacity = Math.max(i, 0))
      }
      ;
      y({
          effect: "flip",
          swiper: t,
          on: u,
          setTranslate: () => {
              const {slides: n, rtlTranslate: r} = t
                , u = t.params.flipEffect;
              for (let f = 0; f < n.length; f += 1) {
                  const o = n[f];
                  let s = o.progress;
                  t.params.flipEffect.limitRotation && (s = Math.max(Math.min(o.progress, 1), -1));
                  const l = o.swiperSlideOffset;
                  let e = -180 * s
                    , h = 0
                    , c = t.params.cssMode ? -l - t.translate : -l
                    , a = 0;
                  t.isHorizontal() ? r && (e = -e) : (a = c,
                  c = 0,
                  h = -e,
                  e = 0);
                  t.browser && t.browser.need3dFix && (Math.abs(e) / 90 % 2 == 1 && (e += .001),
                  Math.abs(h) / 90 % 2 == 1 && (h += .001));
                  o.style.zIndex = -Math.abs(Math.round(s)) + n.length;
                  u.slideShadows && i(o, s);
                  const v = `translate3d(${c}px, ${a}px, 0px) rotateX(${h}deg) rotateY(${e}deg)`;
                  g(0, o).style.transform = v
              }
          }
          ,
          setTransition: n => {
              const i = t.slides.map(n => a(n));
              i.forEach(t => {
                  t.style.transitionDuration = `${n}ms`,
                  t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(t => {
                      t.style.transitionDuration = `${n}ms`
                  }
                  )
              }
              );
              rt({
                  swiper: t,
                  duration: n,
                  transformElements: i
              })
          }
          ,
          recreateShadows: () => {
              t.params.flipEffect,
              t.slides.forEach(n => {
                  let r = n.progress;
                  t.params.flipEffect.limitRotation && (r = Math.max(Math.min(n.progress, 1), -1));
                  i(n, r)
              }
              )
          }
          ,
          getEffectParams: () => t.params.flipEffect,
          perspective: () => !0,
          overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !t.params.cssMode
          })
      })
  }
  , function(n) {
      let {swiper: t, extendParams: i, on: r} = n;
      i({
          coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              scale: 1,
              modifier: 1,
              slideShadows: !0
          }
      });
      y({
          effect: "coverflow",
          swiper: t,
          on: r,
          setTranslate: () => {
              const {width: e, height: o, slides: r, slidesSizesGrid: s} = t
                , n = t.params.coverflowEffect
                , i = t.isHorizontal()
                , u = t.translate
                , h = i ? e / 2 - u : o / 2 - u
                , f = i ? n.rotate : -n.rotate
                , c = n.depth;
              for (let u = 0, e = r.length; u < e; u += 1) {
                  const e = r[u]
                    , y = s[u]
                    , nt = (h - e.swiperSlideOffset - y / 2) / y
                    , o = "function" == typeof n.modifier ? n.modifier(nt) : nt * n.modifier;
                  let l = i ? f * o : 0
                    , a = i ? 0 : f * o
                    , w = -c * Math.abs(o)
                    , v = n.stretch;
                  "string" == typeof v && -1 !== v.indexOf("%") && (v = parseFloat(n.stretch) / 100 * y);
                  let b = i ? 0 : v * o
                    , k = i ? v * o : 0
                    , d = 1 - (1 - n.scale) * Math.abs(o);
                  Math.abs(k) < .001 && (k = 0);
                  Math.abs(b) < .001 && (b = 0);
                  Math.abs(w) < .001 && (w = 0);
                  Math.abs(l) < .001 && (l = 0);
                  Math.abs(a) < .001 && (a = 0);
                  Math.abs(d) < .001 && (d = 0);
                  t.browser && t.browser.need3dFix && (Math.abs(l) / 90 % 2 == 1 && (l += .001),
                  Math.abs(a) / 90 % 2 == 1 && (a += .001));
                  const tt = `translate3d(${k}px,${b}px,${w}px)  rotateX(${a}deg) rotateY(${l}deg) scale(${d})`;
                  if (g(0, e).style.transform = tt,
                  e.style.zIndex = 1 - Math.abs(Math.round(o)),
                  n.slideShadows) {
                      let n = i ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top")
                        , t = i ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
                      n || (n = p("coverflow", e, i ? "left" : "top"));
                      t || (t = p("coverflow", e, i ? "right" : "bottom"));
                      n && (n.style.opacity = o > 0 ? o : 0);
                      t && (t.style.opacity = -o > 0 ? -o : 0)
                  }
              }
          }
          ,
          setTransition: n => {
              t.slides.map(n => a(n)).forEach(t => {
                  t.style.transitionDuration = `${n}ms`,
                  t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(t => {
                      t.style.transitionDuration = `${n}ms`
                  }
                  )
              }
              )
          }
          ,
          perspective: () => !0,
          overwriteParams: () => ({
              watchSlidesProgress: !0
          })
      })
  }
  , function(n) {
      let {swiper: t, extendParams: i, on: r} = n;
      i({
          creativeEffect: {
              limitProgress: 1,
              shadowPerProgress: !1,
              progressMultiplier: 1,
              perspective: !0,
              prev: {
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                  opacity: 1,
                  scale: 1
              },
              next: {
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                  opacity: 1,
                  scale: 1
              }
          }
      });
      const u = n => "string" == typeof n ? n : `${n}px`;
      y({
          effect: "creative",
          swiper: t,
          on: r,
          setTranslate: () => {
              const {slides: r, wrapperEl: e, slidesSizesGrid: o} = t
                , n = t.params.creativeEffect
                , {progressMultiplier: i} = n
                , f = t.params.centeredSlides;
              if (f) {
                  const n = o[0] / 2 - t.params.slidesOffsetBefore || 0;
                  e.style.transform = `translateX(calc(50% - ${n}px))`
              }
              for (let e = 0; e < r.length; e += 1) {
                  const s = r[e]
                    , b = s.progress
                    , h = Math.min(Math.max(s.progress, -n.limitProgress), n.limitProgress);
                  let c = h;
                  f || (c = Math.min(Math.max(s.originalProgress, -n.limitProgress), n.limitProgress));
                  const w = s.swiperSlideOffset
                    , l = [t.params.cssMode ? -w - t.translate : -w, 0, 0]
                    , a = [0, 0, 0];
                  let v = !1;
                  t.isHorizontal() || (l[1] = l[0],
                  l[0] = 0);
                  let o = {
                      translate: [0, 0, 0],
                      rotate: [0, 0, 0],
                      scale: 1,
                      opacity: 1
                  };
                  h < 0 ? (o = n.next,
                  v = !0) : h > 0 && (o = n.prev,
                  v = !0);
                  l.forEach( (n, t) => {
                      l[t] = `calc(${n}px + (${u(o.translate[t])} * ${Math.abs(h * i)}))`
                  }
                  );
                  a.forEach( (n, r) => {
                      let u = o.rotate[r] * Math.abs(h * i);
                      t.browser && t.browser.need3dFix && Math.abs(u) / 90 % 2 == 1 && (u += .001);
                      a[r] = u
                  }
                  );
                  s.style.zIndex = -Math.abs(Math.round(b)) + r.length;
                  const k = l.join(", ")
                    , d = `rotateX(${a[0]}deg) rotateY(${a[1]}deg) rotateZ(${a[2]}deg)`
                    , nt = c < 0 ? `scale(${1 + (1 - o.scale) * c * i})` : `scale(${1 - (1 - o.scale) * c * i})`
                    , tt = c < 0 ? 1 + (1 - o.opacity) * c * i : 1 - (1 - o.opacity) * c * i
                    , it = `translate3d(${k}) ${d} ${nt}`;
                  if (v && o.shadow || !v) {
                      let t = s.querySelector(".swiper-slide-shadow");
                      if (!t && o.shadow && (t = p("creative", s)),
                      t) {
                          const i = n.shadowPerProgress ? h * (1 / n.limitProgress) : h;
                          t.style.opacity = Math.min(Math.max(Math.abs(i), 0), 1)
                      }
                  }
                  const y = g(0, s);
                  y.style.transform = it;
                  y.style.opacity = tt;
                  o.origin && (y.style.transformOrigin = o.origin)
              }
          }
          ,
          setTransition: n => {
              const i = t.slides.map(n => a(n));
              i.forEach(t => {
                  t.style.transitionDuration = `${n}ms`,
                  t.querySelectorAll(".swiper-slide-shadow").forEach(t => {
                      t.style.transitionDuration = `${n}ms`
                  }
                  )
              }
              );
              rt({
                  swiper: t,
                  duration: n,
                  transformElements: i,
                  allSlides: !0
              })
          }
          ,
          perspective: () => t.params.creativeEffect.perspective,
          overwriteParams: () => ({
              watchSlidesProgress: !0,
              virtualTranslate: !t.params.cssMode
          })
      })
  }
  , function(n) {
      let {swiper: t, extendParams: i, on: r} = n;
      i({
          cardsEffect: {
              slideShadows: !0,
              rotate: !0,
              perSlideRotate: 2,
              perSlideOffset: 8
          }
      });
      y({
          effect: "cards",
          swiper: t,
          on: r,
          setTranslate: () => {
              const {slides: n, activeIndex: i, rtlTranslate: r} = t
                , u = t.params.cardsEffect
                , {startTranslate: f, isTouched: e} = t.touchEventsData
                , o = r ? -t.translate : t.translate;
              for (let s = 0; s < n.length; s += 1) {
                  const l = n[s]
                    , d = l.progress
                    , h = Math.min(Math.max(d, -4), 4);
                  let y = l.swiperSlideOffset;
                  t.params.centeredSlides && !t.params.cssMode && (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`);
                  t.params.centeredSlides && t.params.cssMode && (y -= n[0].swiperSlideOffset);
                  let c = t.params.cssMode ? -y - t.translate : -y
                    , a = 0;
                  const nt = -100 * Math.abs(h);
                  let w = 1
                    , b = -u.perSlideRotate * h
                    , k = u.perSlideOffset - .75 * Math.abs(h);
                  const v = t.virtual && t.params.virtual.enabled ? t.virtual.from + s : s
                    , tt = (v === i || v === i - 1) && h > 0 && h < 1 && (e || t.params.cssMode) && o < f
                    , it = (v === i || v === i + 1) && h < 0 && h > -1 && (e || t.params.cssMode) && o > f;
                  if (tt || it) {
                      const n = (1 - Math.abs((Math.abs(h) - .5) / .5)) ** .5;
                      b += -28 * h * n;
                      w += -.5 * n;
                      k += 96 * n;
                      a = -25 * n * Math.abs(h) + "%"
                  }
                  if (c = h < 0 ? `calc(${c}px ${r ? "-" : "+"} (${k * Math.abs(h)}%))` : h > 0 ? `calc(${c}px ${r ? "-" : "+"} (-${k * Math.abs(h)}%))` : `${c}px`,
                  !t.isHorizontal()) {
                      const n = a;
                      a = c;
                      c = n
                  }
                  const rt = h < 0 ? "" + (1 + (1 - w) * h) : "" + (1 - (1 - w) * h)
                    , ut = `
      translate3d(${c}, ${a}, ${nt}px)
      rotateZ(${u.rotate ? r ? -b : b : 0}deg)
      scale(${rt})
    `;
                  if (u.slideShadows) {
                      let n = l.querySelector(".swiper-slide-shadow");
                      n || (n = p("cards", l));
                      n && (n.style.opacity = Math.min(Math.max((Math.abs(h) - .5) / .5, 0), 1))
                  }
                  l.style.zIndex = -Math.abs(Math.round(d)) + n.length;
                  g(0, l).style.transform = ut
              }
          }
          ,
          setTransition: n => {
              const i = t.slides.map(n => a(n));
              i.forEach(t => {
                  t.style.transitionDuration = `${n}ms`,
                  t.querySelectorAll(".swiper-slide-shadow").forEach(t => {
                      t.style.transitionDuration = `${n}ms`
                  }
                  )
              }
              );
              rt({
                  swiper: t,
                  duration: n,
                  transformElements: i
              })
          }
          ,
          perspective: () => !0,
          overwriteParams: () => ({
              watchSlidesProgress: !0,
              virtualTranslate: !t.params.cssMode
          })
      })
  }
  ];
  return o.use(fr),
  o
}();
document.addEventListener("DOMContentLoaded", () => {
  const r = document.querySelectorAll("input[type=tel]");
  phoneMask(r);
  modalsInit();
  const u = document.querySelectorAll("form.application-form")
    , f = document.getElementById("application-success")
    , e = document.getElementById("application-error");
  formRequest(u, "/api/application/send", f, e, ["tin", "company", "position", "phone", "name", "email", "comments"]);
  const o = document.querySelectorAll("form.review-form")
    , s = document.getElementById("review-success")
    , h = document.getElementById("review-error");
  formRequest(o, "/api/review/send", s, h, ["name", "phone", "email", "text", "rate"]);
  const c = document.querySelector(".hamburger")
    , l = document.querySelector("header");
  c.addEventListener("click", function() {
      l.classList.toggle("active-header")
  });
  const t = window.location.pathname
    , a = document.querySelectorAll(".global-navigation a");
  a.forEach(function(n) {
      if (n.getAttribute("href") === t) {
          n.parentNode.classList.add("active-li");
          switch (t) {
          case "/":
              document.querySelector(".hamburger .home").classList.add("hamburger-line-active");
              break;
          case "/home/VideoSurveillance":
              document.querySelector(".hamburger .VideoSurveillance").classList.add("hamburger-line-active");
              break;
          case "/home/ExplosionProof":
              document.querySelector(".hamburger .ExplosionProof").classList.add("hamburger-line-active");
              break;
          default:
              console.log("Path not recognized")
          }
      }
  });
  const v = document.querySelectorAll("section")
    , y = document.querySelectorAll(".fixed-menu a")
    , p = new IntersectionObserver(n => {
      n.forEach(n => {
          if (n.isIntersecting) {
              const t = `#${n.target.id}`;
              y.forEach(n => {
                  n.parentElement.classList.remove("active"),
                  n.getAttribute("href") === t && n.parentElement.classList.add("active")
              }
              )
          }
      }
      )
  }
  ,{
      root: null,
      rootMargin: "0px 0px -1% 0px",
      threshold: .1
  });
  v.forEach(n => {
      p.observe(n)
  }
  );
  const i = document.querySelector(".fixed-menu");
  let n = 0;
  window.addEventListener("scroll", () => {
      let t = window.pageYOffset || document.documentElement.scrollTop;
      t > n && t > 180 ? i.classList.remove("fixed-menu-hide") : t < n && t < 180 && i.classList.add("fixed-menu-hide");
      n = t <= 0 ? 0 : t
  }
  );
  const w = document.querySelector(".arrow-click");
  w.addEventListener("click", () => {
      const n = document.getElementById("about-us");
      if (n) {
          n.scrollIntoView({
              behavior: "smooth",
              block: "start"
          });
          return
      }
      const t = document.getElementById("section-video-surveillance");
      if (t) {
          t.scrollIntoView({
              behavior: "smooth",
              block: "start"
          });
          return
      }
      const i = document.getElementById("section-video-surveillance");
      i && i.scrollIntoView({
          behavior: "smooth",
          block: "start"
      })
  }
  )
}
)
