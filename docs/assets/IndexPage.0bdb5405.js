import{d as B,r as u,c as E,o as N,a as M,p as z,b as _,e as v,f as x,i as U,g as K,w as Y,h as t,j as q,n as J,u as V,k as W,l as S,m as i,q as H,v as Z,F as T,s as P,t as $,x as G,y as s,z as F}from"./index.381e495c.js";const j="PROVIDE_INJECT_KEY_ACCORDION_LIST",R=B({__name:"AccordionList",props:{openMultipleItems:{type:Boolean},state:null,setClosePropertyTime:null},emits:["update:state"],setup(g,{emit:m}){const d=g,p=u({}),r=E({set(o){!!d.state?m("update:state",o):p.value=o},get(){return d.state?d.state:p.value}}),h=E(()=>Object.values(r.value).some(o=>o));let y=0,a=null;const f=u();function C(){var n;a==null||a.disconnect(),a=new ResizeObserver(e=>{e.forEach(({target:l,contentRect:w})=>{var c,I,D,A;l.classList.contains("accordion-item__content")&&((I=(c=l.parentElement)==null?void 0:c.style)==null||I.setProperty("--content-height",`${w.height}px`)),l.tagName.toLowerCase()==="summary"&&((A=(D=l.parentElement)==null?void 0:D.style)==null||A.setProperty("--summary-height",`${w.height}px`))})}),(((n=f.value)==null?void 0:n.querySelectorAll(".accordion-item__content, summary"))||[]).forEach(e=>a==null?void 0:a.observe(e))}function b(o){!!a&&C();const e=!h.value||!!d.openMultipleItems,l=o.id||(y++).toString(),c=!!o.defaultOpened&&e||!!o.isOnServerOpened||r.value[l];return r.value[l]=c,{id:l,isItemOpened:c}}function k(o){const n={...r.value},e=!n[o];d.openMultipleItems||Object.keys(n).forEach(l=>n[l]=!1),n[o]=e,r.value=n}return N(C),M(()=>{!a||(a.disconnect(),a=null)}),z(j,{init:b,trigger:k,setClosePropertyTime:d.setClosePropertyTime||100,accordionListState:r}),(o,n)=>(_(),v("div",{ref_key:"rootElementRef",ref:f,class:"accordion-list"},[x(o.$slots,"default")],512))}}),Q=["open","data-id","data-is-on-server-opened"],X=["onClick"],ee={class:"accordion-item__summary-title"},te={key:0,class:"accordion-item__summary-icon"},ne={key:1,class:"accordion-item__summary-icon accordion-item__summary-icon--default"},oe={class:"accordion-item__content"},O=B({__name:"AccordionItem",props:{id:null,defaultOpened:{type:Boolean},disabled:{type:Boolean}},setup(g){const m=g,{trigger:d,init:p,accordionListState:r,setClosePropertyTime:h}=U(j)||{},y=E(()=>(r==null?void 0:r.value[f.value])||!1),a=u(),f=u(""),C=u(!1),b=u(y.value),k=u(!1),o=u("");K(async()=>{if(!p){console.error("no initItem function provided, please use AccordionItem only inside AccordionList");return}const{id:c,isItemOpened:I}=p({...m});k.value=I,o.value=c}),N(()=>{var D,A,L;if(!p){console.error("no initItem function provided, please use AccordionItem only inside AccordionList");return}(D=a.value)!=null&&D.dataset.id&&(f.value=a.value.dataset.id);const c=((L=(A=a.value)==null?void 0:A.dataset)==null?void 0:L.isOnServerOpened)=="true",{id:I}=p({...m,isOnServerOpened:c});f.value=I});function n(){!d||m.disabled||d(f.value)}const e=E(()=>({"accordion-item--open":y.value||k.value,"accordion-item--disabled":m.disabled}));function l(){C.value=!0}function w(){C.value=!1,b.value=y.value}return Y(y,c=>{if(c){b.value=!0;return}setTimeout(()=>{C.value||(b.value=!1)},h)}),(c,I)=>(_(),v("details",{ref_key:"detailsRef",ref:a,class:J(["accordion-item",V(e)]),open:b.value||k.value,"data-id":o.value,"data-is-on-server-opened":k.value,onTransitionrun:l,onTransitionend:w},[t("summary",{class:"accordion-item__summary",onClick:q(n,["prevent"])},[t("span",ee,[x(c.$slots,"summary")]),c.$slots.icon?(_(),v("span",te,[x(c.$slots,"icon")])):(_(),v("span",ne))],8,X),t("div",oe,[x(c.$slots,"default")])],42,Q))}});const se=G('<div class="adv"><div class="adv__image">\u{1FA97}</div><ul><li>Zero dependency</li><li>SSR friendly</li><li>Block resize friendly</li><li>v-model controlled</li><li>Default-open feature</li><li>Dynamic content reaction</li><li>Dynamic items allowed</li><li>Animated (optional, controlled by css)</li><li>Exclude closed item&#39;s content from tab loop</li><li>All content is provided by slots</li><li>Css fully customizable</li><li>W3C validator passed</li></ul></div>',1),ie={class:"sandbox"},ae=s(" Summary one"),le=s("\u261D\uFE0F"),ce=t("h3",null,"Dynamic content reaction",-1),de=t("h3",null,"All content is provided by slots (f.g. you can nest another accordion)",-1),re=s("Nested accordion item-2 is closed default"),ue=s("+"),me=s(" Some nested content "),_e=s("Nested accordion item-2 is opened default"),pe=s("+"),ve=s(" Here some text of nested item-2 "),fe=s("This item is disabled you can control it via v-model"),he=s(" \u{1F480}"),ye=s(" You can control it via v-model "),Ce=s("This item is dynamically added"),be=s("D"),ke=s("Last item (with default icon) here"),Ie=t("div",null,[t("h1",null,[s(" Please subscribe "),t("a",{href:"https://www.youtube.com/channel/UCxKF1Edfy3LfvAsnveD-OVA"},"youtube channel"),s(", "),t("a",{href:"https://t.me/developers_workshop"},"telegram channel"),s(", share video, stay stars and likes ")])],-1),Se={class:"v-model-rep"},Oe=t("h3",null,"Props",-1),ge=s(" Open multiple items "),we=t("h3",null,"V-model representation",-1),De=["checked","onChange"],Ae=t("h3",null,"Dynamic items",-1),Ee=t("h3",null,"Block resize",-1),Te=B({__name:"AccordionSandbox",setup(g){const m=u({}),d=u([]),p=u([]),r=u(!1),h=u(100);function y(){d.value.push("Date now is "+Date.now())}function a(){d.value.pop()}function f(){p.value.push("Date now is "+Date.now())}function C(){p.value.pop()}function b(o,n){const e=!!n.target.checked||!1;m.value[o]=e}const k=E(()=>Object.entries(m.value));return(o,n)=>(_(),v(T,null,[se,t("div",ie,[t("div",{class:"sandbox__accordion-block",style:W({width:h.value+"%"})},[S(R,{state:m.value,"onUpdate:state":n[0]||(n[0]=e=>m.value=e),"open-multiple-items":r.value},{default:i(()=>[S(O,{id:"mId1","default-opened":""},{summary:i(()=>[ae]),icon:i(()=>[le]),default:i(()=>[ce,t("div",null,[t("button",{onClick:y},"Add dynamic lines"),t("button",{onClick:a},"Remove dynamic lines")]),(_(!0),v(T,null,P(d.value,(e,l)=>(_(),v("div",{key:l},$(e),1))),128)),de,S(R,{"open-multiple-items":""},{default:i(()=>[S(O,null,{summary:i(()=>[re]),icon:i(()=>[ue]),default:i(()=>[me]),_:1}),S(O,{"default-opened":""},{summary:i(()=>[_e]),icon:i(()=>[pe]),default:i(()=>[ve]),_:1})]),_:1})]),_:1}),S(O,{id:"mId2",disabled:""},{summary:i(()=>[fe]),icon:i(()=>[he]),default:i(()=>[ye]),_:1}),(_(!0),v(T,null,P(p.value,e=>(_(),F(O,{key:e},{summary:i(()=>[Ce]),icon:i(()=>[be]),default:i(()=>[s(" "+$(e),1)]),_:2},1024))),128)),S(O,{id:"mId3"},{summary:i(()=>[ke]),default:i(()=>[Ie]),_:1})]),_:1},8,["state","open-multiple-items"])],4),t("div",Se,[Oe,t("div",null,[ge,H(t("input",{"onUpdate:modelValue":n[1]||(n[1]=e=>r.value=e),type:"checkbox"},null,512),[[Z,r.value]])]),we,(_(!0),v(T,null,P(V(k),e=>(_(),v("div",{key:e[0]},[s($(e[0])+" ",1),t("input",{checked:e[1],type:"checkbox",onChange:l=>b(e[0],l)},null,40,De)]))),128)),Ae,t("button",{onClick:f},"Add"),t("button",{onClick:C},"Remove"),Ee,t("p",null,"now width is: "+$(h.value)+"%",1),t("button",{onClick:n[2]||(n[2]=e=>h.value-=20)},"Smaller"),t("button",{onClick:n[3]||(n[3]=e=>h.value+=20)},"Bigger")])])],64))}}),xe=B({__name:"IndexPage",setup(g){return(m,d)=>(_(),F(Te))}});export{xe as default};
