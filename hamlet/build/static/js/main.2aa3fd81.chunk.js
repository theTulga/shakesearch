(this.webpackJsonphamlet=this.webpackJsonphamlet||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n(0),a=n.n(s),i=n(2),r=n.n(i),l=(n(13),n(3)),j=(n(14),n(5)),u=n.p+"static/media/shakesphere.2313d00b.png",b=n(19);var h=function(){var e=Object(s.useState)(""),t=Object(l.a)(e,2),n=t[0],a=t[1],i=Object(s.useState)(!0),r=Object(l.a)(i,2),h=r[0],o=r[1],d=Object(s.useState)(!1),O=Object(l.a)(d,2),x=O[0],m=O[1],f=Object(s.useState)([]),p=Object(l.a)(f,2),g=p[0],v=p[1],N=Object(s.useRef)(null),S=Object(s.useState)(""),k=Object(l.a)(S,2),C=k[0],w=k[1],F=g.map((function(e,t){var n=e.toLowerCase().indexOf(C.toLowerCase());return x?-1==n?Object(c.jsx)("div",{className:"individual-result",children:Object(c.jsx)("pre",{children:e})},t):Object(c.jsxs)("div",{className:"individual-result",children:[Object(c.jsx)("pre",{children:e.substring(0,n)}),Object(c.jsx)("b",{children:e.substring(n,n+C.length)}),Object(c.jsx)("pre",{children:e.substring(n+C.length)})]},t):null}));return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)("div",{className:"upperleft-title",children:"Shakesearch"}),Object(c.jsxs)("div",{className:"search-section",onSubmit:function(e){e.preventDefault(),o(!1),fetch("/search?q=".concat(n)).then((function(e){e.json().then((function(e){w(n),0==e.length?v(["No results found"]):v(e),m(!0)}))}))},children:[Object(c.jsxs)("form",{className:"left-box",children:[Object(c.jsx)(j.b,{size:"40px"}),Object(c.jsx)("input",{value:n,onChange:function(e){a(e.target.value)},className:"search-bar",placeholder:"What art thee looking f'r?"}),Object(c.jsx)("button",{className:"submit-btn",children:""!==n?Object(c.jsx)(j.a,{size:"40px"}):null})]}),x?Object(c.jsx)("div",{className:"result-container",children:F}):null,Object(c.jsx)(b.a,{nodeRef:N,in:h,timeout:500,className:"shake",mountOnEnter:!0,unmountOnExit:!0,children:Object(c.jsx)("img",{src:u,alt:"Shake Sphere"})})]})]})},o=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),a(e),i(e)}))};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(h,{})}),document.getElementById("root")),o()}},[[17,1,2]]]);
//# sourceMappingURL=main.2aa3fd81.chunk.js.map