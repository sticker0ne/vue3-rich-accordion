(function(c,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(c=typeof globalThis!="undefined"?globalThis:c||self,e(c.MyComponentLib={},c.Vue))})(this,function(c,e){"use strict";const v="PROVIDE_INJECT_KEY_ACCORDION_LIST",T=e.defineComponent({__name:"AccordionList",props:{openMultipleItems:{type:Boolean},state:null,setClosePropertyTime:null},emits:["update:state"],setup(p,{emit:f}){const a=p,d=e.ref({}),r=e.computed({set(t){!!a.state?f("update:state",t):d.value=t},get(){return a.state?a.state:d.value}}),C=e.computed(()=>Object.values(r.value).some(t=>t));let _=0,n=null;const m=e.ref();function y(){var s;n==null||n.disconnect(),n=new ResizeObserver(l=>{l.forEach(({target:i,contentRect:O})=>{var o,u,S,E;i.classList.contains("accordion-item__content")&&((u=(o=i.parentElement)==null?void 0:o.style)==null||u.setProperty("--content-height",`${O.height}px`)),i.tagName.toLowerCase()==="summary"&&((E=(S=i.parentElement)==null?void 0:S.style)==null||E.setProperty("--summary-height",`${O.height}px`))})}),(((s=m.value)==null?void 0:s.querySelectorAll(".accordion-item__content, summary"))||[]).forEach(l=>n==null?void 0:n.observe(l))}function I(t){!!n&&y();const l=!C.value||!!a.openMultipleItems,i=t.id||(_++).toString(),o=!!t.defaultOpened&&l||!!t.isOnServerOpened||r.value[i];return r.value[i]=o,{id:i,isItemOpened:o}}function h(t){const s={...r.value},l=!s[t];a.openMultipleItems||Object.keys(s).forEach(i=>s[i]=!1),s[t]=l,r.value=s}return e.onMounted(y),e.onBeforeUnmount(()=>{!n||(n.disconnect(),n=null)}),e.provide(v,{init:I,trigger:h,setClosePropertyTime:a.setClosePropertyTime||100,accordionListState:r}),(t,s)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"rootElementRef",ref:m,class:"accordion-list"},[e.renderSlot(t.$slots,"default")],512))}}),B=["open","data-id","data-is-on-server-opened"],P=["onClick"],g={class:"accordion-item__summary-title"},b={key:0,class:"accordion-item__summary-icon"},L={key:1,class:"accordion-item__summary-icon accordion-item__summary-icon--default"},M={class:"accordion-item__content"},k=e.defineComponent({__name:"AccordionItem",props:{id:null,defaultOpened:{type:Boolean},disabled:{type:Boolean}},setup(p){const f=p,{trigger:a,init:d,accordionListState:r,setClosePropertyTime:C}=e.inject(v)||{},_=e.computed(()=>(r==null?void 0:r.value[m.value])||!1),n=e.ref(),m=e.ref(""),y=e.ref(!1),I=e.ref(_.value),h=e.ref(!1),t=e.ref("");e.onServerPrefetch(async()=>{if(!d){console.error("no initItem function provided, please use AccordionItem only inside AccordionList");return}const{id:o,isItemOpened:u}=d({...f});h.value=u,t.value=o}),e.onMounted(()=>{var S,E,A;if(!d){console.error("no initItem function provided, please use AccordionItem only inside AccordionList");return}(S=n.value)!=null&&S.dataset.id&&(m.value=n.value.dataset.id);const o=((A=(E=n.value)==null?void 0:E.dataset)==null?void 0:A.isOnServerOpened)=="true",{id:u}=d({...f,isOnServerOpened:o});m.value=u});function s(){!a||f.disabled||a(m.value)}const l=e.computed(()=>({"accordion-item--open":_.value||h.value,"accordion-item--disabled":f.disabled}));function i(){y.value=!0}function O(){y.value=!1,I.value=_.value}return e.watch(_,o=>{if(o){I.value=!0;return}setTimeout(()=>{y.value||(I.value=!1)},C)}),(o,u)=>(e.openBlock(),e.createElementBlock("details",{ref_key:"detailsRef",ref:n,class:e.normalizeClass(["accordion-item",e.unref(l)]),open:I.value||h.value,"data-id":t.value,"data-is-on-server-opened":h.value,onTransitionrun:i,onTransitionend:O},[e.createElementVNode("summary",{class:"accordion-item__summary",onClick:e.withModifiers(s,["prevent"])},[e.createElementVNode("span",g,[e.renderSlot(o.$slots,"summary")]),o.$slots.icon?(e.openBlock(),e.createElementBlock("span",b,[e.renderSlot(o.$slots,"icon")])):(e.openBlock(),e.createElementBlock("span",L))],8,P),e.createElementVNode("div",M,[e.renderSlot(o.$slots,"default")])],42,B))}}),R={install:function(p){p.component("AccordionList",T),p.component("AccordionItem",k)}};c.AccordionItem=k,c.AccordionList=T,c.useAccordion=R,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});