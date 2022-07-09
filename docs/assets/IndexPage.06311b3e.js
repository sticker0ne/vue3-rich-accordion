var Y = Object.defineProperty,
  q = Object.defineProperties;
var J = Object.getOwnPropertyDescriptors;
var N = Object.getOwnPropertySymbols;
var W = Object.prototype.hasOwnProperty,
  H = Object.prototype.propertyIsEnumerable;
var V = (r, n, o) => (n in r ? Y(r, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (r[n] = o)),
  T = (r, n) => {
    for (var o in n || (n = {})) W.call(n, o) && V(r, o, n[o]);
    if (N) for (var o of N(n)) H.call(n, o) && V(r, o, n[o]);
    return r;
  },
  F = (r, n) => q(r, J(n));
import {
  d as $,
  r as p,
  c as E,
  o as M,
  a as Z,
  p as G,
  b as v,
  e as k,
  f as P,
  i as Q,
  g as X,
  w as ee,
  h as e,
  j as te,
  n as ne,
  u as z,
  k as oe,
  l as O,
  m as a,
  q as se,
  v as ie,
  F as x,
  s as L,
  t as B,
  x as le,
  y as i,
  z as U,
} from "./index.8ad0f0d7.js";
const K = "PROVIDE_INJECT_KEY_ACCORDION_LIST",
  j = $({
    name: "AccordionList",
    props: { openMultipleItems: { type: Boolean }, state: null, setClosePropertyTime: null },
    emits: ["update:state"],
    setup(r, { emit: n }) {
      const o = r,
        _ = p({}),
        m = E({
          set(l) {
            o.state ? n("update:state", l) : (_.value = l);
          },
          get() {
            return o.state ? o.state : _.value;
          },
        }),
        h = E(() => Object.values(m.value).some(l => l));
      let y = 0,
        c = null;
      const f = p();
      function C() {
        var s;
        c == null || c.disconnect(),
          (c = new ResizeObserver(t => {
            t.forEach(({ target: d, contentRect: D }) => {
              var u, S, w, A;
              d.classList.contains("accordion-item__content") &&
                ((S = (u = d.parentElement) == null ? void 0 : u.style) == null ||
                  S.setProperty("--content-height", `${D.height}px`)),
                d.tagName.toLowerCase() === "summary" &&
                  ((A = (w = d.parentElement) == null ? void 0 : w.style) == null ||
                    A.setProperty("--summary-height", `${D.height}px`));
            });
          })),
          (((s = f.value) == null ? void 0 : s.querySelectorAll(".accordion-item__content, summary")) || []).forEach(
            t => (c == null ? void 0 : c.observe(t)),
          );
      }
      function b(l) {
        !!c && C();
        const t = !h.value || !!o.openMultipleItems,
          d = l.id || (y++).toString(),
          u = (!!l.defaultOpened && t) || !!l.isOnServerOpened || m.value[d];
        return (m.value[d] = u), { id: d, isItemOpened: u };
      }
      function I(l) {
        const s = T({}, m.value),
          t = !s[l];
        o.openMultipleItems || Object.keys(s).forEach(d => (s[d] = !1)), (s[l] = t), (m.value = s);
      }
      return (
        M(C),
        Z(() => {
          !c || (c.disconnect(), (c = null));
        }),
        G(K, { init: b, trigger: I, setClosePropertyTime: o.setClosePropertyTime || 100, accordionListState: m }),
        (l, s) => (
          v(), k("div", { ref_key: "rootElementRef", ref: f, class: "accordion-list" }, [P(l.$slots, "default")], 512)
        )
      );
    },
  }),
  ae = ["open", "data-id", "data-is-on-server-opened"],
  ce = ["onClick"],
  de = { class: "accordion-item__summary-title" },
  re = { class: "accordion-item__summary-icon" },
  ue = { class: "accordion-item__content" },
  g = $({
    name: "AccordionItem",
    props: { id: null, defaultOpened: { type: Boolean }, disabled: { type: Boolean } },
    setup(r) {
      const n = r,
        { trigger: o, init: _, accordionListState: m, setClosePropertyTime: h } = Q(K) || {},
        y = E(() => (m == null ? void 0 : m.value[f.value]) || !1),
        c = p(),
        f = p(""),
        C = p(!1),
        b = p(y.value),
        I = p(!1),
        l = p("");
      X(async () => {
        if (!_) {
          console.error("no initItem function provided, please use AccordionItem only inside AccordionList");
          return;
        }
        const { id: u, isItemOpened: S } = _(T({}, n));
        (I.value = S), (l.value = u);
      }),
        M(() => {
          var w, A, R;
          if (!_) {
            console.error("no initItem function provided, please use AccordionItem only inside AccordionList");
            return;
          }
          (w = c.value) != null && w.dataset.id && (f.value = c.value.dataset.id);
          const u = ((R = (A = c.value) == null ? void 0 : A.dataset) == null ? void 0 : R.isOnServerOpened) == "true",
            { id: S } = _(F(T({}, n), { isOnServerOpened: u }));
          f.value = S;
        });
      function s() {
        !o || n.disabled || o(f.value);
      }
      const t = E(() => ({ "accordion-item--open": y.value || I.value, "accordion-item--disabled": n.disabled }));
      function d() {
        C.value = !0;
      }
      function D() {
        (C.value = !1), (b.value = y.value);
      }
      return (
        ee(y, u => {
          if (u) {
            b.value = !0;
            return;
          }
          setTimeout(() => {
            C.value || (b.value = !1);
          }, h);
        }),
        (u, S) => (
          v(),
          k(
            "details",
            {
              ref_key: "detailsRef",
              ref: c,
              class: ne(["accordion-item", z(t)]),
              open: b.value || I.value,
              "data-id": l.value,
              "data-is-on-server-opened": I.value,
              onTransitionrun: d,
              onTransitionend: D,
            },
            [
              e(
                "summary",
                { class: "accordion-item__summary", onClick: te(s, ["prevent"]) },
                [e("span", de, [P(u.$slots, "summary")]), e("span", re, [P(u.$slots, "icon")])],
                8,
                ce,
              ),
              e("div", ue, [P(u.$slots, "default")]),
            ],
            42,
            ae,
          )
        )
      );
    },
  });
const me = le(
    '<div class="adv"><div class="image">\u{1FA97}</div><ul><li>Zero dependency</li><li>SSR friendly</li><li>Block resize friendly</li><li>v-model controlled</li><li>Default-open feature</li><li>Dynamic content reaction</li><li>Dynamic items allowed</li><li>Animated (optional, controlled by css)</li><li>Exclude closed item&#39;s content from tab loop</li><li>All content is provided by slots</li><li>Css fully customizable</li><li>W3C validator passed</li></ul></div>',
    1,
  ),
  pe = { class: "sandbox" },
  _e = i(" Summary one"),
  ve = i("\u261D\uFE0F"),
  fe = e("h3", null, "Dynamic content reaction", -1),
  he = e("h3", null, "All content is provided by slots (f.g. you can nest another accordion)", -1),
  ye = i("Nested accordion item-2 is closed default"),
  Ce = i("+"),
  be = i(" Some nested content "),
  Ie = i("Nested accordion item-2 is opened default"),
  ke = i("+"),
  Se = i(" Here some text of nested item-2 "),
  Oe = i("This item is disabled you can control it via v-model"),
  ge = i(" \u{1F480}"),
  De = i(" You can control it via v-model "),
  we = i("This item is dynamically added"),
  Ae = i("D"),
  Ee = i("Last item here"),
  Te = i(" \u{1F680}"),
  xe = e(
    "div",
    null,
    [
      e("h1", null, [
        i(" Please subscribe "),
        e("a", { href: "https://www.youtube.com/channel/UCxKF1Edfy3LfvAsnveD-OVA" }, "youtube channel"),
        i(", "),
        e("a", { href: "https://t.me/developers_workshop" }, "telegram channel"),
        i("share video, stay stars and likes "),
      ]),
    ],
    -1,
  ),
  Be = { class: "v-model-rep" },
  Pe = e("h3", null, "Props", -1),
  $e = i(" Open multiple items "),
  Le = e("h3", null, "V-model representation", -1),
  Re = ["checked", "onChange"],
  Ne = e("h3", null, "Dynamic items", -1),
  Ve = e("h3", null, "Block resize", -1),
  Fe = $({
    name: "AccordionSandbox",
    setup(r) {
      const n = p({}),
        o = p([]),
        _ = p([]),
        m = p(!1),
        h = p(100);
      function y() {
        o.value.push("Date now is " + Date.now());
      }
      function c() {
        o.value.pop();
      }
      function f() {
        _.value.push("Date now is " + Date.now());
      }
      function C() {
        _.value.pop();
      }
      function b(l, s) {
        const t = !!s.target.checked || !1;
        n.value[l] = t;
      }
      const I = E(() => Object.entries(n.value));
      return (l, s) => (
        v(),
        k(
          x,
          null,
          [
            me,
            e("div", pe, [
              e(
                "div",
                { class: "accordion-block", style: oe({ width: h.value + "%" }) },
                [
                  O(
                    j,
                    {
                      state: n.value,
                      "onUpdate:state": s[0] || (s[0] = t => (n.value = t)),
                      "open-multiple-items": m.value,
                    },
                    {
                      default: a(() => [
                        O(
                          g,
                          { id: "mId1", "default-opened": "" },
                          {
                            summary: a(() => [_e]),
                            icon: a(() => [ve]),
                            default: a(() => [
                              fe,
                              e("div", null, [
                                e("button", { onClick: y }, "Add dynamic lines"),
                                e("button", { onClick: c }, "Remove dynamic lines"),
                              ]),
                              (v(!0),
                              k(
                                x,
                                null,
                                L(o.value, (t, d) => (v(), k("div", { key: d }, B(t), 1))),
                                128,
                              )),
                              he,
                              O(
                                j,
                                { "open-multiple-items": "" },
                                {
                                  default: a(() => [
                                    O(g, null, {
                                      summary: a(() => [ye]),
                                      icon: a(() => [Ce]),
                                      default: a(() => [be]),
                                      _: 1,
                                    }),
                                    O(
                                      g,
                                      { "default-opened": "" },
                                      { summary: a(() => [Ie]), icon: a(() => [ke]), default: a(() => [Se]), _: 1 },
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                            ]),
                            _: 1,
                          },
                        ),
                        O(
                          g,
                          { id: "mId2", disabled: "" },
                          { summary: a(() => [Oe]), icon: a(() => [ge]), default: a(() => [De]), _: 1 },
                        ),
                        (v(!0),
                        k(
                          x,
                          null,
                          L(
                            _.value,
                            t => (
                              v(),
                              U(
                                g,
                                { key: t },
                                {
                                  summary: a(() => [we]),
                                  icon: a(() => [Ae]),
                                  default: a(() => [i(" " + B(t), 1)]),
                                  _: 2,
                                },
                                1024,
                              )
                            ),
                          ),
                          128,
                        )),
                        O(
                          g,
                          { id: "mId3" },
                          { summary: a(() => [Ee]), icon: a(() => [Te]), default: a(() => [xe]), _: 1 },
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["state", "open-multiple-items"],
                  ),
                ],
                4,
              ),
              e("div", Be, [
                Pe,
                e("div", null, [
                  $e,
                  se(
                    e(
                      "input",
                      { "onUpdate:modelValue": s[1] || (s[1] = t => (m.value = t)), type: "checkbox" },
                      null,
                      512,
                    ),
                    [[ie, m.value]],
                  ),
                ]),
                Le,
                (v(!0),
                k(
                  x,
                  null,
                  L(
                    z(I),
                    t => (
                      v(),
                      k("div", { key: t[0] }, [
                        i(B(t[0]) + " ", 1),
                        e("input", { checked: t[1], type: "checkbox", onChange: d => b(t[0], d) }, null, 40, Re),
                      ])
                    ),
                  ),
                  128,
                )),
                Ne,
                e("button", { onClick: f }, "Add"),
                e("button", { onClick: C }, "Remove"),
                Ve,
                e("div", null, "now width is: " + B(h.value) + "%", 1),
                e("button", { onClick: s[2] || (s[2] = t => (h.value -= 20)) }, "Smaller"),
                e("button", { onClick: s[3] || (s[3] = t => (h.value += 20)) }, "Bigger"),
              ]),
            ]),
          ],
          64,
        )
      );
    },
  }),
  ze = $({
    name: "IndexPage",
    setup(r) {
      return (n, o) => (v(), U(Fe));
    },
  });
export { ze as default };
