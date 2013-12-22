/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.2",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=st(),k=st(),E=st(),S=!1,A=function(e,t){return e===t?(S=!0,0):0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=mt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+yt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,n,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function lt(e){return e[b]=!0,e}function ut(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t){var n=e.split("|"),r=e.length;while(r--)o.attrHandle[n[r]]=t}function pt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function dt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return lt(function(t){return t=+t,lt(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.defaultView;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.attachEvent&&i!==i.top&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),r.getElementsByTagName=ut(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ut(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=K.test(n.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ut(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=K.test(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ut(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=K.test(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return pt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?pt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:lt,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=mt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?lt(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:lt(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?lt(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:lt(function(e){return function(t){return at(e,t).length>0}}),contains:lt(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:lt(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},o.pseudos.nth=o.pseudos.eq;for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=ft(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=dt(n);function gt(){}gt.prototype=o.filters=o.pseudos,o.setFilters=new gt;function mt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function yt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function vt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function bt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function wt(e,t,n,r,i,o){return r&&!r[b]&&(r=wt(r)),i&&!i[b]&&(i=wt(i,o)),lt(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||Nt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:xt(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=xt(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=xt(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function Tt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=vt(function(e){return e===t},s,!0),p=vt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[vt(bt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return wt(l>1&&bt(f),l>1&&yt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&Tt(e.slice(l,r)),i>r&&Tt(e=e.slice(r)),i>r&&yt(e))}f.push(n)}return bt(f)}function Ct(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=xt(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?lt(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=mt(e)),n=t.length;while(n--)o=Tt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Ct(i,r))}return o};function Nt(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function kt(e,t,n,i){var a,s,u,c,p,f=mt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&yt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}r.sortStable=b.split("").sort(A).join("")===b,r.detectDuplicates=S,p(),r.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(f.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||ct("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),r.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||ct("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||ct(B,function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&i.specified?i.value:e[n]===!0?n.toLowerCase():null}),x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!l||i&&!u||(t=t||[],t=[e,t.slice?t.slice():t],n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)}),n=s=l=u=r=o=null,t
}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,r=0,o=x(this),a=e.match(T)||[];while(t=a[r++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);
u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){nn(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);

/* exported CookieMonster */

var CookieMonster = {
	// Runtime variables
	version               : "v.1.038.01",
	emphasize             : true,
	tooltips              : [],
	buildingTooltips      : [],
	holdItem              : [],
	holdIs                : [],
	holdCPI               : [],
	holdTC                : [],
	goldenCookieAvailable : "",
	settings              : [],
	inStore               : new Array(0, 0, 0, 0, 0, 0),
	sellOut               : 0,
	upgradeCount          : 33,
	stsType               : new Array(
		[" M", " B", " T", " Qa", " Qi", " Sx", " Sp", " Oc", " No", " Dc"],
		[" M", " G", " T", " P", " E", " Z", " Y", " Oc", " No", " Dc"]),
	loops                 : 0,

	// Selectors
	$monsterBar           : $("#cookie_monster_bar"),
	$goldenCookie         : $("#goldenCookie"),

	// Colors
	colors: {
		yellow : 'FFFF00',
		green  : '00FF00',
		red    : 'FF0000',
		blue   : '4BB8F0',
	}
};
/**
 * Computes the total sell out value
 *
 * @return {integer}
 */
CookieMonster.sellOutValue = function () {
	var e = 0;
	var t = Game.cookies;
	var n = [];
	var r = 0;

	Game.ObjectsById.forEach(function (e, t) {
		n[t] = e.amount;
		r += e.amount;
	});

	while (t >= 15 || r > 0) {
		for (var i = n.length - 1; i >= 0; i--) {
			var s = false;
			var o = n[i];
			var u = Game.ObjectsById[i];
			for (var a = o; a > 0; a--) {
				t += Math.floor(u.basePrice * Math.pow(1.15, a) / 2);
				e += Math.floor(u.basePrice * Math.pow(1.15, a) / 2);
				n[i]--;
				r--;
			}
			while (t >= u.basePrice * Math.pow(1.15, n[i])) {
				s = true;
				t -= u.basePrice * Math.pow(1.15, n[i]);
				n[i]++;
				r++;
			}
			if (s) {
				break;
			}
		}
	}

	CookieMonster.sellOut = e;
};

/**
 * Sells out all buildings
 *
 * @return {void}
 */
CookieMonster.sellOut = function() {
	if (confirm("*** WARNING ***\nYou will have no buildings or cookies left after this.")) {
		Game.ObjectsById.forEach(function (building) {
			setTimeout(function () {
				while (building.amount > 0) {
					building.sell();
				}
			});
		});

		setTimeout(function () {
			CookieMonster.buySell();
		});
	}
};

/**
 * Buys and sells all building
 *
 * @return {void}
 */
CookieMonster.buySell = function() {
	if (Game.cookies < 1e9 && Game.BuildingsOwned < 100) {
		CookieMonster.buySellNoWait();
		return false;
	}

	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		if (t.price <= Game.cookies) {
			t.buy();
			return setTimeout(function () {
				CookieMonster.buySell();
			});
		}
		if (t.price > Game.cookies && t.amount > 0) {
			t.sell();
			return setTimeout(function () {
				CookieMonster.buySell();
			});
		}
	}

	setTimeout(function () {
		CookieMonster.buySell();
	});
};

/**
 * Buys and sells all buildings (no wait)
 *
 * @return {void}
 */
CookieMonster.buySellNoWait = function() {
	if (Game.cookies < 15) {
		return false;
	}

	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		t.sell();

		if (t.price <= Game.cookies) {
			t.buy();
			t.sell();
			CookieMonster.buySellNoWait();
			return false;
		}
	}

	CookieMonster.buySellNoWait();
};
CookieMonster.getTrueCPI =function(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	if (t === "ob") {
		n = this.secondsLeft(Game.ObjectsById[e], "ob");
		r = Game.ObjectsById[e].price;
		i = this.holdIs[e];
	}
	if (t === "up") {
		n = this.secondsLeft(Game.UpgradesById[e], "up");
		r = Game.UpgradesById[e].basePrice;
		for (var s = 0; s < this.upgradeCount; s++) {
			if (this.checkUpgrade(s, e, false)) {
				i = this.manageTooltips(s, e, false, true);
				break;
			}
		}
	}
	var o = r / i;
	Game.ObjectsById.forEach(function (s, u) {
		var a = s.price;
		var f = this.holdIs[u];
		var l = this.secondsLeft(s, "ob");
		if (l < n && (t === "up" || u !== e)) {
			var c = n - l;
			var h = f * c;
			var p = r - a + h;
			var d = p / i;
			if (d > o) {
				o = d;
			}
		}
	});

	return o;
};

CookieMonster.testTrueCPI = function(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	var s = 0;
	if (t === "ob") {
		n = this.secondsLeft(e, "ob");
		i = Game.ObjectsById[e].price;
		s = this.holdIs[e];
	}
	if (t === "up") {
		n = this.secondsLeft(e, "up");
		i = Game.UpgradesById[e].basePrice;
		for (var o = 0; o < this.upgradeCount; o++) {
			if (this.checkUpgrade(o, e, false)) {
				s = this.manageTooltips(o, e, false, true);
				break;
			}
		}
	}
	var u = this.organizeObjectList();
	var a = i;
	var f = a / s;
	var l = f;
	var c = s;
	u.forEach(function (o, f) {
		if (i > o.price && (t === "up" || o.id !== e)) {
			var h = o.price;
			var p = this.holdIs[o.id];
			var d = this.holdCPI[o.id];
			if (c === 0) {
				c = p;
			}
			if (l === 0) {
				l = d;
			}
			var v = this.secondsLeft(o.id, "ob");
			var m = 0;
			var g = u[f + 1];
			if (g.id !== u.length && (this.holdCPI[g.id] < l || g.id === e)) {
				m = this.secondsLeft(g.id, "ob");
				l = this.holdCPI[g.id];
				c = p;
			}
			if (v < n - r) {
				var y = m - v;
				r += y;
				var b = c * y;
				if (y > 0) {
					s -= c;
					a = a - h + b;
				}
			}
		}
	});
	f = a / s;

	return f;
};
/**
 * Get the current frenzy multiplier
 *
 * @return {integer}
 */
CookieMonster.getFrenzyMultiplier = function() {
	return (Game.frenzy > 0) ? Game.frenzyPower : 1;
};

CookieMonster.manageBuffs = function() {
	var e = "";
	var t = "";
	var n = 0;
	var i = 13 + 13 * Game.Has("Get lucky");
	var s = new Array(Game.goldenCookie.time, Game.goldenCookie.minTime, Game.goldenCookie.maxTime);
	var o = parseInt($("#cookie_monster_timer_bars_div").css("width"));

	switch (Game.frenzyPower) {
	case 7:
		n = 77 + 77 * Game.Has("Get lucky");
		e = "Frenzy";
		t = this.colors.yellow;
		break;
	case 666:
		n = 6 + 6 * Game.Has("Get lucky");
		e = "Blood Frenzy";
		t = CookieMonster.colors.green;
		n = 66 + 66 * Game.Has("Get lucky");
		e = "Clot";
		t = CookieMonster.colors.red;
		break;
	}

	if (Game.frenzy > 0 && CookieMonster.settings[2] === 1) {
		if ($("#cookie_monster_timer_" + t).length !== 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_' + t + '" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">' + e + "<td>" + '<td><div id="cmt_' + t + '" style="position:relative; background:#' + t + "; height:10px; width:" + Game.frenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;"><div id="cmt_time_' + t + '" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + n + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>");
		} else {
			$("#cmt_" + t).css("width", Game.frenzy / s[2] * 100 + "%");
			$("#cmt_time_" + t).text(Math.round(Game.frenzy / Game.fps));
		}

		$("#cookie_monster_timer_" + t).fadeIn(250);
		if ($("#cookie_monster_timer_"+this.colors.yellow).css("opacity") === "1" && t !== CookieMonster.colors.yellow) {
			$("#cookie_monster_timer_"+this.colors.yellow).fadeOut(250);
		}
		if ($("#cookie_monster_timer_"+this.colors.green).css("opacity") === "1" && t !== CookieMonster.colors.green) {
			$("#cookie_monster_timer_"+this.colors.green).fadeOut(250);
		}
		if ($("#cookie_monster_timer_"+this.colors.red).css("opacity") === "1" && t !== CookieMonster.colors.red) {
			$("#cookie_monster_timer_"+this.colors.red).fadeOut(250);
		}
	} else if ($("#cookie_monster_timer_" + t).length === 1 && $("#cookie_monster_timer_" + t).css("opacity") === "1") {
		$("#cookie_monster_timer_" + t).fadeOut(250);
	}

	if (Game.clickFrenzy > 0 && CookieMonster.settings[2] === 1) {
		if ($("#cookie_monster_timer_4BB8F0").length !== 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_4BB8F0" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Click Frenzy<td>' + '<td><div id="cmt_4BB8F0" style="position:relative; background:#4BB8F0; height:10px; width:' + Game.clickFrenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;"><div id="cmt_time_4BB8F0" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + i + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>");
		} else {
			$("#cmt_4BB8F0").css("width", Game.clickFrenzy / s[2] * 100 + "%");
			$("#cmt_time_4BB8F0").text(Math.round(Game.clickFrenzy / Game.fps));
		}
		$("#cookie_monster_timer_4BB8F0").fadeIn(250);
	} else if ($("#cookie_monster_timer_4BB8F0").length === 1 && $("#cookie_monster_timer_4BB8F0").css("opacity") === "1") {
		$("#cookie_monster_timer_4BB8F0").fadeOut(250);
	}

	if (s[0] > 0 && CookieMonster.$goldenCookie.css("display") === "none" && CookieMonster.settings[4] === 1) {
		if ($("#cookie_monster_timer_FF00FF").length !== 1) {
			$("#cookie_monster_timer_bars_div").append("" + '<div id="cookie_monster_timer_FF00FF" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Next Cookie<td>' + '<td><div id="cmt_FF00FF" style="position:relative; background:#aaaaaa; height:10px; width:100%; margin-left:4px; border:1px solid black;"><div id="cmt2_FF00FF" style="position:relative; background:#FF00FF; height:10px; width:100%; margin-left:0px; max-width:' + (o - 189) * 0.67 + 'px; float:right;"></div><div id="cmt_time_FF00FF" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + Math.round((s[2] - s[0]) / Game.fps) + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>");
		} else {
			$("#cmt2_FF00FF").css("max-width", (o - 189) * 0.67 + "px");
			$("#cmt_FF00FF").css("width", (s[2] - s[0]) / s[2] * 100 + "%");
			$("#cmt_time_FF00FF").text(Math.round((s[2] - s[0]) / Game.fps));
		}
		$("#cookie_monster_timer_FF00FF").fadeIn(250);
	} else if ($("#cookie_monster_timer_FF00FF").length === 1 && $("#cookie_monster_timer_FF00FF").css("opacity") === "1") {
		$("#cookie_monster_timer_FF00FF").fadeOut(250);
	}

	if ((s[2] - s[0]) / Game.fps > 0 && CookieMonster.$goldenCookie.css("display") === "none") {
		if (CookieMonster.settings[4] === 1) {
			CookieMonster.goldenCookieAvailable = "(" + Math.round((s[2] - s[0]) / Game.fps) + ") ";
		} else {
			CookieMonster.goldenCookieAvailable = "";
		}
	}

	$("#versionNumber").css("bottom", $("#cookie_monster_timer_bars_div").css("height"));
};
CookieMonster.getHeavenlyChip = function(e) {
	var t = CookieMonster.cookiesToHeavenly(Game.cookiesReset + Game.cookiesEarned);
	var n = CookieMonster.cookiesToHeavenly(Game.cookiesReset + Game.cookiesEarned + CookieMonster.sellOut);
	var r = CookieMonster.cookiesToHeavenly(Game.cookiesReset);
	var i = CookieMonster.heavenlyToCookies(t + 1) - (Game.cookiesReset + Game.cookiesEarned);
	var s = CookieMonster.heavenlyToCookies(n + 1) - (Game.cookiesReset + Game.cookiesEarned + CookieMonster.sellOut);
	if (e === "max") {
		return CookieMonster.formatNumber(t) + " <small>(" + CookieMonster.formatNumber(t * 2) + "%)</small>";
	}
	if (e === "max_sell_out") {
		return CookieMonster.formatNumber(n) + " <small>(" + CookieMonster.formatNumber(n * 2) + "%)</small>";
	}
	if (e === "cur") {
		return CookieMonster.formatNumber(r) + " <small>(" + CookieMonster.formatNumber(r * 2) + "%)</small>";
	}
	if (e === "next") {
		return CookieMonster.formatNumber(Math.round(i));
	}
	if (e === "next_sell_out") {
		return CookieMonster.formatNumber(Math.round(s));
	}
	if (e === "time") {
		return CookieMonster.formatTime(Math.round(i / Game.cookiesPs), "");
	}
};

CookieMonster.getAchievementWorth = function(e, t, n, r) {
	var i = 0;
	var s = CookieMonster.getHeavenlyMultiplier();
	if (r !== 0) {
		s = r;
	}
	var o = 0;
	var u = new Array(0, 0, 0, 0);
	var a = Game.milkProgress;
	var f = CookieMonster.getFrenzyMultiplier();

	Game.UpgradesById.forEach(function (e) {
		var r = e.desc.replace("[Research]<br>", "");
		if (e.bought && r.indexOf("Cookie production multiplier <b>+") !== -1) {
			s += r.substr(33, r.indexOf("%", 33) - 33) * 1;
		}
		if (!e.bought && r.indexOf("Cookie production multiplier <b>+") !== -1 && e.id === t) {
			o += r.substr(33, r.indexOf("%", 33) - 33) * 1;
		}
		if (e.bought && e.name === "Kitten helpers") {
			u[0] = 0.05;
		}
		if (e.bought && e.name === "Kitten workers") {
			u[1] = 0.1;
		}
		if (e.bought && e.name === "Kitten engineers") {
			u[2] = 0.2;
		}
		if (e.bought && e.name === "Kitten overseers") {
			u[3] = 0.2;
		}
	});
	var l = 100 + s;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var c = n;
	var h = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f;
	a += e * 0.04;
	l = 100 + s + o;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var p = 0;
	switch (Game.UpgradesById[t].name) {
	case "Kitten helpers":
		p = 0.05;
		break;
	case "Kitten workers":
		p = 0.1;
		break;
	case "Kitten engineers":
		p = 0.2;
		break;
	case "Kitten overseers":
		p = 0.2;
		break;
	}
	l = l * (1 + p * a);
	i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h;
	var d = CookieMonster.inc(i + h);
	if (d > 0) {
		a += d * 0.04;
		l = 100 + s + o;
		l = l * (1 + u[0] * a);
		l = l * (1 + u[1] * a);
		l = l * (1 + u[2] * a);
		l = l * (1 + u[3] * a);
		l = l * (1 + p * a);
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h;
	}
	if (r !== 0) {
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f;
	}
	if (Game.Has("Elder Covenant")) {
		i *= 0.95;
	}
	return i;
};

CookieMonster.getHeavenlyMultiplier = function() {
	var e = Game.prestige["Heavenly chips"] * 2;
	var t = 0;
	if (Game.Has("Heavenly chip secret")) {
		t += 0.05;
	}
	if (Game.Has("Heavenly cookie stand")) {
		t += 0.2;
	}
	if (Game.Has("Heavenly bakery")) {
		t += 0.25;
	}
	if (Game.Has("Heavenly confectionery")) {
		t += 0.25;
	}
	if (Game.Has("Heavenly key")) {
		t += 0.25;
	}

	return e * t;
};
CookieMonster.cookiesToHeavenly = function(e) {
	return Math.floor(Math.sqrt(2.5 * Math.pow(10, 11) + 2 * e) / Math.pow(10, 6) - 0.5);
};

CookieMonster.heavenlyToCookies = function(e) {
	return 5 * Math.pow(10, 11) * e * (e + 1);
};

CookieMonster.dhc = function(e, t, n) {
	var r = Game.UpgradesById[t];
	var i = r.desc.indexOf("<b>") + 3;
	var s = r.desc.indexOf("%");
	var o = r.desc.substr(i, s - i) * 1;
	var u = CookieMonster.getAchievementWorth(e, t, n, Game.prestige["Heavenly chips"] * 2 * (o / 100));
	return u - Game.cookiesPs;
};

CookieMonster.isHeavenlyKey = function(e) {
	return (Game.UpgradesById[e].name === "Heavenly key");
};

CookieMonster.cpc = function() {
	return Game.mouseCps() * 0.01 * usr_clk;
};

CookieMonster.lgt = function(e) {
	if (CookieMonster.checkAchievement("Elder") === 1 && Game.UpgradesById[e].name.indexOf(" grandmas") !== -1) {
		var t = [];
		var n = [];
		Game.UpgradesById.forEach(function (e, r) {
			if (e.bought && e.name.indexOf(" grandmas") !== -1) {
				t.push(r);
			} else if (!e.bought && e.name.indexOf(" grandmas") !== -1) {
				n.push(r);
			}
		});
		if (n.length === 1 && n[0] === e) {
			return true;
		}
	}
	return false;
};

CookieMonster.checkAchievement = function(e) {
	var t = 0;
	Game.AchievementsById.forEach(function (n) {
		if (!n.won && n.name === e) {
			t = 1;
		}
	});
	return t;
};

CookieMonster.gpp = function() {
	var e = 1;

	Game.UpgradesById.forEach(function (t) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			e = e * 2;
		}

		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			e = e * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * e * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

CookieMonster.gpg = function() {
	var e = 1;

	Game.UpgradesById.forEach(function (t) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			e = e * 2;
		}
		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			e = e * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * e * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

CookieMonster.mcg = function(e) {
	var t = Game.UpgradesById[e].desc;
	var n = 31;
	if (t.indexOf(" another ") !== -1) {
		n += 8;
	}
	var r = t.substr(n, t.indexOf("<", n) - n) * 1;
	return r * (Game.BuildingsOwned - Game.ObjectsById[0].amount) * Game.ObjectsById[0].amount * Game.globalCpsMult;
};

CookieMonster.bte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * Game.globalCpsMult;
};

CookieMonster.fte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * 3 * Game.globalCpsMult;
};

CookieMonster.bam = function(e, t, n) {
	var r = 1;

	Game.UpgradesById.forEach(function (t) {
		if (t.bought && t.desc.indexOf(e + " are <b>twice</b> as efficient.") !== -1) {
			r = r * 2;
		}
		if (t.bought && t.desc.indexOf(e + " are <b>4 times</b> as efficient.") !== -1) {
			r = r * 4;
		}
	});

	return t * r * Game.ObjectsById[n].amount * Game.globalCpsMult;
};

CookieMonster.inc = function(e) {
	var t = 0;

	Game.AchievementsById.forEach(function (achievement) {
		var i = achievement.desc.replace(/,/g, "");
		if (!achievement.won && i.indexOf(" per second.") !== -1) {
			if (e >= i.substr(8, i.indexOf("</b>", 8) - 8) * 1) {
				t++;
			}
		}
	});

	return t;
};

CookieMonster.baseTen = function(e) {
	if (CookieMonster.checkAchievement("Base 10") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (e) {
			t.push(e.name);
			n.push(e.amount);
		});
		t.forEach(function (t, r) {
			if (t === e) {
				n[r]++;
			}
		});
		var r = n.length * 10;
		for (var i = 0; i < n.length; i++) {
			if (n[i] < r) {
				return false;
			}
			r = r - 10;
		}
		return true;
	}
	return false;
};

CookieMonster.mathematician = function(e) {
	if (CookieMonster.checkAchievement("Mathematician") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (e) {
			t.push(e.name);
			n.push(e.amount);
		});
		t.forEach(function (t, r) {
			if (t === e) {
				n[r]++;
			}
		});
		var r = 128;
		for (var i = 0; i < n.length; i++) {
			if (i > 2) {
				r = r / 2;
			}
			if (n[i] < r) {
				return false;
			}
		}
		return true;
	}
	return false;
};

CookieMonster.oneWithEverything = function(e) {
	if (CookieMonster.checkAchievement("One with everything") === 1) {
		var t = [];
		var n = [];

		Game.ObjectsById.forEach(function (e) {
			if (e.amount > 0) {
				t.push(e.name);
			} else {
				n.push(e.name);
			}
		});
		if (n.length === 1 && n[0] === e) {
			return true;
		}
	}
	return false;
};

CookieMonster.centennial = function(e) {
	if (CookieMonster.checkAchievement("Centennial") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (e) {
			if (e.amount >= 100) {
				t.push(e.name);
			} else {
				n.push(e);
			}
		});
		if (n.length === 1 && n[0].name === e && n[0].amount === 99) {
			return true;
		}
	}
	return false;
};

CookieMonster.checkUpgrade = function(e, t, n) {
	var upgrade = Game.UpgradesById[t];
	if (upgrade.desc.indexOf("cm_up_div_") === -1 && !n) {
		return false;
	}

	switch (e) {
	case 0:
		if (!upgrade.bought && upgrade.name === "Reinforced index finger") {
			return true;
		}
		break;
	case 1:
		if (!upgrade.bought && upgrade.desc.indexOf("The mouse and cursors are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 2:
		if (!upgrade.bought && upgrade.desc.indexOf("The mouse and cursors gain") !== -1) {
			return true;
		}
		break;
	case 3:
		if (!upgrade.bought && upgrade.name === "Forwards from grandma") {
			return true;
		}
		break;
	case 4:
		if (!upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 5:
		if (!upgrade.bought && upgrade.name === "Cheap hoes") {
			return true;
		}
		break;
	case 6:
		if (!upgrade.bought && upgrade.desc.indexOf("Farms are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 7:
		if (!upgrade.bought && upgrade.name === "Sturdier conveyor belts") {
			return true;
		}
		break;
	case 8:
		if (!upgrade.bought && upgrade.desc.indexOf("Factories are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 9:
		if (!upgrade.bought && upgrade.name === "Sugar gas") {
			return true;
		}
		break;
	case 10:
		if (!upgrade.bought && upgrade.desc.indexOf("Mines are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 11:
		if (!upgrade.bought && upgrade.name === "Vanilla nebulae") {
			return true;
		}
		break;
	case 12:
		if (!upgrade.bought && upgrade.desc.indexOf("Shipments are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 13:
		if (!upgrade.bought && upgrade.name === "Antimony") {
			return true;
		}
		break;
	case 14:
		if (!upgrade.bought && upgrade.desc.indexOf("Alchemy labs are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 15:
		if (!upgrade.bought && upgrade.name === "Ancient tablet") {
			return true;
		}
		break;
	case 16:
		if (!upgrade.bought && upgrade.desc.indexOf("Portals are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 17:
		if (!upgrade.bought && upgrade.name === "Flux capacitors") {
			return true;
		}
		break;
	case 18:
		if (!upgrade.bought && upgrade.desc.indexOf("Time machines are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 19:
		if (!upgrade.bought && upgrade.desc.indexOf("the more milk you have") !== -1) {
			return true;
		}
		break;
	case 20:
		if (!upgrade.bought && upgrade.desc.indexOf("Cookie production multiplier <b>+") !== -1) {
			return true;
		}
		break;
	case 21:
		if (!upgrade.bought && upgrade.desc.indexOf("for each 50 grandmas") !== -1) {
			return true;
		}
		break;
	case 22:
		if (!upgrade.bought && upgrade.desc.indexOf("for each 20 portals") !== -1) {
			return true;
		}
		break;
	case 23:
		if (!upgrade.bought && upgrade.name === "Elder Pledge") {
			return true;
		}
		break;
	case 24:
		if (!upgrade.bought && upgrade.name === "Elder Covenant") {
			return true;
		}
		break;
	case 25:
		if (!upgrade.bought && upgrade.name === "Sacrificial rolling pins") {
			return true;
		}
		break;
	case 26:
		if (!upgrade.bought && upgrade.desc.indexOf("Golden cookie") !== -1) {
			return true;
		}
		break;
	case 27:
		if (!upgrade.bought && upgrade.desc.indexOf("Clicking gains <b>+1% of your CpS</b>.") !== -1) {
			return true;
		}
		break;
	case 28:
		if (!upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 29:
		if (!upgrade.bought && upgrade.desc.indexOf("Antimatter condensers are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 30:
		if (!upgrade.bought && upgrade.name === "Sugar bosons") {
			return true;
		}
		break;
	case 31:
		if (!upgrade.bought && upgrade.name === "Revoke Elder Covenant") {
			return true;
		}
		break;
	case 32:
		if (!upgrade.bought && upgrade.desc.indexOf("heavenly chips") !== -1) {
			return true;
		}
		break;
	}
	return false;
};

CookieMonster.isInStore = function(e) {
	if (Game.UpgradesInStore.indexOf(e) !== -1) {
		return true;
	}
	return false;
};
CookieMonster.faviconSpinner = function(e) {
	if (e > 6) {
		e = 1;
	}

	if (this.goldenCookieAvailable === "(G) ") {
		$("#cm_favicon").attr("href", "http://frozenelm.com/cookiemonster/images/cm_gc_" + e + ".png");
		e++;
		setTimeout(function () {
			this.faviconSpinner(e);
		}, 250);
	} else {
		$("#cm_favicon").attr("href", "http://orteil.dashnet.org/cookieclicker/img/favicon.ico");
	}
};

CookieMonster.toggleBar = function() {
	if (this.settings[5] === 0) {
		this.$monsterBar.css("display", "none");
		$("#game").css("bottom", "0px");
	} else {
		this.$monsterBar.css("display", "");
		$("#game").css("bottom", "57px");
	}
};

/**
 * Update the stylings of the upgrades to the selected option
 *
 * @return {void}
 */
CookieMonster.updateUpgradeDisplay = function() {
	var $upgrades = $("#upgrades");

	switch (this.settings[12] * 1) {
		case 1:
			$upgrades.css("cssText", "");
			break;

		case 2:
			$upgrades.css("cssText", "height: auto !important;");
			break;

		case 0:
			$upgrades.css("cssText", "height: 0px !important;");
			break;
	}
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.makeTable = function() {
	var e = '<th align=left width=130 style="color:#' +this.colors.yellow+ ';"> ' + this.version + "</th>";
	var n = "";
	var r = "";
	var i = "";

	Game.ObjectsById.forEach(function (t, s) {
		e += '<th align=middle id="cookie_monster_item_' + s + '" style="font-weight:bold;"></th>';
		n += '<td align=middle id="cookie_monster_is_' + s + '"></td>';
		r += '<td align=middle id="cookie_monster_cpi_' + s + '"></td>';
		i += '<td align=middle id="cookie_monster_tc_' + s + '"></td>';
	});

	CookieMonster.$monsterBar.html(
		'<table style="width:100%; table-layout:fixed; margin-top:2px;">' +
			"<tr>" + e + '</tr>'+
			'<tr>'+
				'<th align=right style="color:#4bb8f0;">Bonus Income</th>' + n +
			'</tr>' +
			'<tr>'+
				'<th align=right style="color:#4bb8f0;">Base Cost Per Income</th>' + r +
			'</tr>' +
			'<tr>' +
				'<th align=right style="color:#4bb8f0;">Time Left</th>' + i +
			'</tr>' +
		"</table>");

	CookieMonster.$monsterBar = $('#cookie_monster_bar');
};

CookieMonster.updateTable = function() {
	Game.ObjectsById.forEach(function (e, t) {
		var n = e.price;
		var r = e.amount;
		var s = e.storedCps * Game.globalCpsMult;
		if (e.name === "Grandma") {
			s = 0;
		}
		var o = Math.round((s + CookieMonster.getUpgradeBonuses(e.name, r, s)) * 100) / 100;
		var u = Math.round(n / o * 100) / 100;
		var a = e.name.replace(/([^\s]+)/, "");

		CookieMonster.holdItem[t] = e.name.replace(a, "") + ' (<span style="color:#' +CookieMonster.colors.blue+ ';">' + CookieMonster.formatNumber(r) + "</span>)";
		CookieMonster.holdIs[t] = Math.round(o * 100) / 100;
		CookieMonster.holdCPI[t] = Math.round(u * 100) / 100;
		CookieMonster.holdTC[t] = Math.round(CookieMonster.secondsLeft(t, "ob"));
	});

	Game.ObjectsById.forEach(function (e, t) {
		var i = 0;
		var n = new Array(CookieMonster.colors.yellow, CookieMonster.colors.yellow);
		var r = new Array(CookieMonster.holdCPI[t], CookieMonster.holdTC[t]);
		var s = new Array(Math.max.apply(Math, CookieMonster.holdCPI), Math.max.apply(Math, CookieMonster.holdTC));
		var o = new Array(Math.min.apply(Math, CookieMonster.holdCPI), Math.min.apply(Math, CookieMonster.holdTC));

		for (i = 0; i < n.length; i++) {
			if (r[i] === o[i]) {
				n[i] = CookieMonster.colors.green;
			} else if (r[i] === s[i]) {
				n[i] = CookieMonster.colors.red;
			} else if (s[i] - r[i] < r[i] - o[i]) {
				n[i] = "FF7F00";
			}
		}
		$("#cookie_monster_item_" + t).html(CookieMonster.holdItem[t]);
		$("#cookie_monster_is_" + t).html(CookieMonster.formatNumber(CookieMonster.holdIs[t]));
		$("#cookie_monster_cpi_" + t).html('<span style="color:#' + n[0] + ';">' + CookieMonster.formatNumber(r[0]) + "</span>");
		$("#cookie_monster_tc_" + t).html('<span style="color:#' + n[1] + ';">' + CookieMonster.formatTime(r[1], "min") + "</span>");
	});
};

CookieMonster.colorize = function(e, t, n) {
	var i = 0;
	var r = Game.UpgradesById[t];
	var s = r.basePrice;
	var o = new Array(this.colors.yellow, this.colors.yellow);
	var u = new Array(Math.round(s / e * 100) / 100, Math.round(this.secondsLeft(t, "up")));
	var a = new Array(Math.max.apply(Math, this.holdCPI), Math.max.apply(Math, this.holdTC));
	var f = new Array(Math.min.apply(Math, this.holdCPI), Math.min.apply(Math, this.holdTC));

	for (i = 0; i < o.length; i++) {
		if (u[i] < f[i]) {
			o[i] = this.colors.blue;
			if (this.isInStore(r) && i === 0) {
				this.inStore[0]++;
			}
		} else if (u[i] === f[i]) {
			o[i] = this.colors.green;
			if (this.isInStore(r) && i === 0) {
				this.inStore[1]++;
			}
		} else if (u[i] === a[i]) {
			o[i] = this.colors.red;
			if (this.isInStore(r) && i === 0) {
				this.inStore[4]++;
			}
		} else if (u[i] > a[i]) {
			o[i] = "FF00FF";
			if (this.isInStore(r) && i === 0) {
				this.inStore[5]++;
			}
		} else if (a[i] - u[i] < u[i] - f[i]) {
			o[i] = "FF7F00";
			if (this.isInStore(r) && i === 0) {
				this.inStore[3]++;
			}
		} else {
			if (this.isInStore(r) && i === 0) {
				this.inStore[2]++;
			}
		}
	}
	for (i = 0; i < this.inStore.length; i++) {
		$("#cm_up_q" + i).text(this.inStore[i]);
	}
	if (this.settings[11] && this.isInStore(r)) {
		$("#upgrade" + Game.UpgradesInStore.indexOf(r)).html('<div style="background-color:#' + o[0] + '; border:1px solid black; position:absolute; z-index:21; top:2px; left:2px; height:14px; width:14px; pointer-events:none;"></div>');
	}
	if ($("#cm_up_div_" + t).length === 1) {
		var l = new Array(this.lucky("reg", true), this.lucky("frenzy", true));
		var c = new Array("none", "none");
		var h = new Array(0, 0);
		if (Game.cookies - s < l[0]) {
			c[0] = "block";
			h[0] = l[0] - (Game.cookies - s);
		}
		if (Game.cookies - s < l[1]) {
			c[1] = "block";
			h[1] = l[1] - (Game.cookies - s);
		}
		$("#cm_up_div_" + t).css("border", "1px solid #" + o[0]);
		$("#cm_up_div_" + t).css("display", "");
		$("#cm_up_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#4bb8f0; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(Math.round(e * 100) / 100) + '</div><div style="position:absolute; top:34px; left:4px; color:#4bb8f0; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + o[0] + ';">' + this.formatNumber(u[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#4bb8f0; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + o[1] + ';">' + this.formatTime(u[1], "min") + "</div>");
		$("#cm_up_warning_amount").text("Deficit: " + this.formatNumber(h[0]));
		$("#cm_up_caution_amount").text("Deficit: " + this.formatNumber(h[1]));

		if (this.settings[10] === 1 || this.settings[10] === 2) {
			$("#cm_up_lucky_div_warning").css("display", c[0]);
			$("#cm_up_lucky_div_caution").css("display", c[1]);
		} else {
			$("#cm_up_lucky_div_warning").css("display", "none");
			$("#cm_up_lucky_div_caution").css("display", "none");
		}
		if (this.settings[10] === 1 || this.settings[10] === 3) {
			$("#cm_up_note_div_warning").css("display", c[0]);
			$("#cm_up_note_div_caution").css("display", c[1]);
		} else {
			$("#cm_up_note_div_warning").css("display", "none");
			$("#cm_up_note_div_caution").css("display", "none");
		}
	}
	if (n) {
		o = "000000";
		return '<div id="cm_up_lucky_div_' + t + '" style="position:absolute; top:-25px; left:-12px; height:32px;">' + '<div id="cm_up_lucky_div_warning" style="background:url(http://frozenelm.com/images/cookiemonster/warning.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + '<div id="cm_up_lucky_div_caution" style="background:url(http://frozenelm.com/images/cookiemonster/caution.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + "</div>" + '<div id="cm_up_div_' + t + '" style="position:relative; height:96px; background:#222222; border:1px solid #' + o + '; margin:6px -6px -6px -6px; display:none;"></div>' + '<div id="cm_up_note_div_' + t + '" style="position:absolute; left:0px; margin-top:10px; color:white;">' + '<div id="cm_up_note_div_warning" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FF0000;"><b style="color:#FF0000;">Warning:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!"</br><span id="cm_up_warning_amount"></span>' + '<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/images/cookiemonster/warning.png" height=16px width=16px></div></div>' + '<div id="cm_up_note_div_caution" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FFFF00;"><b style="color:#FFFF00;">Caution:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)</br><span id="cm_up_caution_amount"></span>' + '<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/images/cookiemonster/caution.png" height=16px width=16px></div></div>' + "</div>";
	}
};

CookieMonster.organizeObjectList = function() {
	var e = [];
	Game.ObjectsById.forEach(function (t) {
		var r = true;
		if (e.length > 0) {
			e.forEach(function (n, i) {
				if (t.price < n.price && r) {
					r = false;
					e.splice(i, 0, t);
					e.join();
				}
			});
			if (r) {
				e.push(t);
			}
		} else {
			e.push(t);
		}
	});
	return e;
};

CookieMonster.doEmphasize = function() {
	var e = $("#cookie_monster_golden_overlay");
	var t = this.$goldenCookie;
	if (t.css("display") === "none" && !this.emphasize) {
		this.emphasize = true;
		this.goldenCookieAvailable = "";
	}
	if (t.css("display") !== "none" && this.emphasize) {
		this.emphasize = false;
		if (this.settings[9] === 1) {
			this.goldenCookieAvailable = "(G) ";
			this.faviconSpinner(1);
		}
		if (this.settings[8] === 1) {
			var n = new Audio("http://frozenelm.com/cookiemonster/sounds/ba%20dink.mp3");
			n.volume = 1;
			n.play();
		}
		if (this.settings[0] === 1) {
			$("#cookie_monster_overlay").fadeIn(100);
			$("#cookie_monster_overlay").fadeOut(500);
		}
	}
	if (t.css("display") !== "none" && this.settings[1] === 1) {
		e.css("display", "block");
		e.css("opacity", t.css("opacity"));
		e.css("left", t.css("left"));
		e.css("top", t.css("top"));
		e.html('<div style="position:absolute; top:30px; width:96px; height:36px;">' + Math.round(Game.goldenCookie.life / Game.fps) + "</div>");
	} else {
		e.css("display", "none");
	}
};
CookieMonster.lucky = function(e, t) {
	var n = Game.cookiesPs;
	if (Game.frenzy > 0) {
		n = n / Game.frenzyPower;
	}
	if (e === "frenzy") {
		n = n * 7;
	}
	var r = Math.round((n * 1200 + 13) / 0.1);

	if (!t) {
		if (r <= Game.cookies) {
			r = '<span style="color:#00FF00; font-weight:bold;">' + CookieMonster.formatNumber(r) + "</span>";
		}
		else {
			r = CookieMonster.formatNumber(r);
		}
	}

	return r;
};

CookieMonster.luckyReward = function(e) {
	var t = Game.cookiesPs;
	if (Game.frenzy > 0 && e !== "cur") {
		t = t / Game.frenzyPower;
	}
	if (e === "max_frenzy") {
		t = t * 7;
	}
	var n = new Array(Math.round(t * 1200 + 13), Math.round(Game.cookies * 0.1 + 13));
	if (e === "max" || e === "max_frenzy") {
		if (Math.round((t * 1200 + 13) / 0.1) > Game.cookies) {
			return CookieMonster.formatNumber(n[0]);
		}
	}
	return CookieMonster.formatNumber(Math.min.apply(Math, n));
};
/**
 * Load a setting from localStorage
 *
 * @param {integer} key
 * @param {string}  name
 * @param {mixed}   defaultValue
 *
 * @return {void}
 */
CookieMonster.loadSetting = function(key, name, defaultValue) {
	if (localStorage[name] !== undefined) {
		this.settings[key] = parseInt(localStorage[name], 10);
	} else {
		localStorage[name] = defaultValue;
		this.settings[key] = defaultValue;
	}
};

CookieMonster.loadSettings = function() {
	CookieMonster.settings = [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1];

	if (typeof Storage !== "undefined") {
		this.loadSetting(0, 'FlashScreen', 1);
		this.loadSetting(1, 'CookieTimer', 1);
		this.loadSetting(2, 'BuffBars', 1);
		this.loadSetting(3, 'Refresh', 1e3);
		this.loadSetting(4, 'CookieCD', 1);
		this.loadSetting(5, 'CMBar', 1);
		this.loadSetting(6, 'ColoredPrices', 1);
		this.loadSetting(7, 'ShortNumbers', 1);
		this.loadSetting(8, 'CookieSound', 0);
		this.loadSetting(9, 'UpdateTitle', 1);
		this.loadSetting(10, 'LuckyAlert', 1);
		this.loadSetting(11, 'UpgradeIcons', 1);
		this.loadSetting(12, 'UpgradeDisplay', 1);
	}

	CookieMonster.toggleBar();
};

CookieMonster.saveSettings = function() {
	if (typeof Storage !== "undefined") {
		localStorage.FlashScreen    = this.settings[0];
		localStorage.CookieTimer    = this.settings[1];
		localStorage.BuffBars       = this.settings[2];
		localStorage.Refresh        = this.settings[3];
		localStorage.CookieCD       = this.settings[4];
		localStorage.CMBar          = this.settings[5];
		localStorage.ColoredPrices  = this.settings[6];
		localStorage.ShortNumbers   = this.settings[7];
		localStorage.CookieSound    = this.settings[8];
		localStorage.UpdateTitle    = this.settings[9];
		localStorage.LuckyAlert     = this.settings[10];
		localStorage.UpgradeIcons   = this.settings[11];
		localStorage.UpgradeDisplay = this.settings[12];
	}

	this.toggleBar();
};

CookieMonster.getOptionState = function(e) {
	return (this.settings[e] === 0) ? 'OFF' : 'ON';
};

CookieMonster.toggleOption = function(option) {
	var $option = $(option);

	switch ($option.text()) {
	case "Flash Screen ON":
		this.settings[0] = 0;
		$option.text("Flash Screen OFF");
		break;
	case "Flash Screen OFF":
		this.settings[0] = 1;
		$option.text("Flash Screen ON");
		break;
	case "Cookie Sound ON":
		this.settings[8] = 0;
		$option.text("Cookie Sound OFF");
		break;
	case "Cookie Sound OFF":
		this.settings[8] = 1;
		$option.text("Cookie Sound ON");
		break;
	case "Cookie Timer ON":
		this.settings[1] = 0;
		$option.text("Cookie Timer OFF");
		break;
	case "Cookie Timer OFF":
		this.settings[1] = 1;
		$option.text("Cookie Timer ON");
		break;
	case "Next Cookie Timer ON":
		this.settings[4] = 0;
		$option.text("Next Cookie Timer OFF");
		break;
	case "Next Cookie Timer OFF":
		this.settings[4] = 1;
		$option.text("Next Cookie Timer ON");
		break;
	case "Update Title ON":
		this.settings[9] = 0;
		$option.text("Update Title OFF");
		break;
	case "Update Title OFF":
		this.settings[9] = 1;
		$option.text("Update Title ON");
		break;
	case "Buff Bars ON":
		this.settings[2] = 0;
		$option.text("Buff Bars OFF");
		break;
	case "Buff Bars OFF":
		this.settings[2] = 1;
		$option.text("Buff Bars ON");
		break;
	case "Bottom Bar ON":
		this.settings[5] = 0;
		$option.text("Bottom Bar OFF");
		break;
	case "Bottom Bar OFF":
		this.settings[5] = 1;
		$option.text("Bottom Bar ON");
		break;
	case "Colored Prices ON":
		this.settings[6] = 0;
		$option.text("Colored Prices OFF");
		CookieMonster.updateTooltips("ob");
		break;
	case "Colored Prices OFF":
		this.settings[6] = 1;
		$option.text("Colored Prices ON");
		CookieMonster.updateTooltips("ob");
		break;
	case "Upgrade Icons ON":
		this.settings[11] = 0;
		$option.text("Upgrade Icons OFF");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Icons OFF":
		this.settings[11] = 1;
		$option.text("Upgrade Icons ON");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Display (All)":
		this.settings[12] = 0;
		$option.text("Upgrade Display (None)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (None)":
		this.settings[12] = 1;
		$option.text("Upgrade Display (Normal)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (Normal)":
		this.settings[12] = 2;
		$option.text("Upgrade Display (All)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Short Numbers ON (B)":
		this.settings[7] = 0;
		$option.text("Short Numbers OFF");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers OFF":
		this.settings[7] = 1;
		$option.text("Short Numbers ON (A)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers ON (A)":
		this.settings[7] = 2;
		$option.text("Short Numbers ON (B)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Lucky Alert (Both)":
		this.settings[10] = 2;
		$option.text("Lucky Alert (Icons)");
		break;
	case "Lucky Alert (Icons)":
		this.settings[10] = 3;
		$option.text("Lucky Alert (Notes)");
		break;
	case "Lucky Alert (Notes)":
		this.settings[10] = 0;
		$option.text("Lucky Alert (Off)");
		break;
	case "Lucky Alert (Off)":
		this.settings[10] = 1;
		$option.text("Lucky Alert (Both)");
		break;
	case "Refresh Rate (1 fps)":
		this.settings[3] = 500;
		$option.text("Refresh Rate (2 fps)");
		break;
	case "Refresh Rate (2 fps)":
		this.settings[3] = 250;
		$option.text("Refresh Rate (4 fps)");
		break;
	case "Refresh Rate (4 fps)":
		this.settings[3] = 100;
		$option.text("Refresh Rate (10 fps)");
		break;
	case "Refresh Rate (10 fps)":
		this.settings[3] = 33;
		$option.text("Refresh Rate (30 fps)");
		break;
	case "Refresh Rate (30 fps)":
		this.settings[3] = 1e3;
		$option.text("Refresh Rate (1 fps)");
		break;
	}

	this.saveSettings();
};

/**
 * Get a text version of the current short numbers option
 *
 * @return {string}
 */
CookieMonster.getShortNumbers = function() {
	switch (this.settings[7] * 1) {
		case 1:
			return "ON (A)";
		case 2:
			return "ON (B)";
		case 0:
			return "OFF";
		default:
			return "OFF";
	}
};

/**
 * Get a text version of the current refresh rate
 *
 * @return {string}
 */
CookieMonster.getRefreshRate = function() {
	switch (this.settings[3] * 1) {
		case 1e3:
			return "1";
		case 500:
			return "2";
		case 250:
			return "4";
		case 100:
			return "10";
		case 33:
			return "30";
		default:
			return "1";
	}
};

/**
 * Get a text version of the "Upgrade display" option
 *
 * @return {string}
 */
CookieMonster.getUpgradeDisplay = function() {
	switch (this.settings[12] * 1) {
		case 1:
			return "Normal";
		case 2:
			return "All";
		case 0:
			return "None";
		default:
			return "Normal";
	}
};

/**
 * Get a text version of the "Luck alerts" option
 *
 * @return {string}
 */
CookieMonster.getLuckyAlert = function () {
	switch (this.settings[10] * 1) {
		case 1:
			return "Both";
		case 2:
			return "Icons";
		case 3:
			return "Notes";
		case 0:
			return "Off";
		default:
			return "Both";
	}
};
CookieMonster.factorTime = function(e) {
	var t = Game.cookies - e;
	var n = Game.cookiesPs;

	if (n === 0) {
		return 1;
	}
	if (t < 0) {
		var r = e / n;
		return 1 - t * -1 / n / r;
	}

	return 1;
};

CookieMonster.secondsLeft = function(e, t) {
	var n = 0;
	if (t === "ob") {
		n = Game.ObjectsById[e].price;
	}
	if (t === "up") {
		n = Game.UpgradesById[e].basePrice;
	}
	var r = Game.cookies - n;
	var i = Game.cookiesPs;

	if (i === 0) {
		return 0;
	}
	if (r < 0) {
		var o = r * -1 / i;
		return o;
	}

	return 0;
};

CookieMonster.sts = function(e, t) {
	var n = this.settings[7];
	if (n > 0) {
		var r = 1e33;
		for (var i = this.stsType[n - 1].length - 1; i >= 0; i--) {
			var s = (e / r % 999).toFixed(3);
			if (s >= 1) {
				return s + this.stsType[n - 1][i];
			}
			r /= 1e3;
		}
	}
	if (t) {
		return Math.round(e);
	}
	return Math.round(e * 100) / 100;
};

CookieMonster.formatNumber = function(e) {
	return this.sts(e, false).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

CookieMonster.formatNumberB = function(e) {
	return this.sts(e, true).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

CookieMonster.formatTime = function(e, t) {
	e = Math.round(e);
	if (e === Infinity) {
		return "Never";
	}
	if (e === 0) {
		return "Done!";
	}
	if (e / 86400 > 1e3) {
		return "> 1,000 days";
	}
	var n = parseInt(e / 86400) % 999;
	var r = parseInt(e / 3600) % 24;
	var i = parseInt(e / 60) % 60;
	var s = e % 60;
	var o = new Array(" days, ", " hours, ", " minutes, ", " seconds");
	if (t !== "min") {
		if (n === 1) {
			o[0] = " day, ";
		}
		if (r === 1) {
			o[1] = " hour, ";
		}
		if (i === 1) {
			o[2] = " minute, ";
		}
		if (s === 1) {
			o[3] = " second";
		}
	} else {
		o = new Array("d, ", "h, ", "m, ", "s");
	}
	var u = "";
	if (n > 0) {
		u = u + n + o[0];
	}
	if (n > 0 || r > 0) {
		u = u + r + o[1];
	}
	if (n > 0 || r > 0 || i > 0) {
		u = u + i + o[2];
	}
	if (n > 0 || r > 0 || i > 0 || s > 0) {
		u = u + s + o[3];
	}
	return u;
};
CookieMonster.saveTooltips = function() {
	Game.UpgradesById.forEach(function (e, t) {
		CookieMonster.tooltips[t] = e.desc;
	});
	Game.ObjectsById.forEach(function (e, t) {
		CookieMonster.buildingTooltips[t] = e.desc;
	});
};

CookieMonster.setupTooltips = function() {
	var e = false;
	Game.UpgradesById.forEach(function (t, n) {
		for (var r = 0; r < CookieMonster.upgradeCount; r++) {
			if (CookieMonster.checkUpgrade(r, n, true)) {
				t.desc = CookieMonster.manageTooltips(r, n, true, false);
				e = true;
				break;
			}
		}
		if (t.bought && t.desc !== CookieMonster.tooltips[n]) {
			t.desc = CookieMonster.tooltips[n];
			e = true;
		}
	});
	if (e) {
		Game.RebuildUpgrades();
	}
};

CookieMonster.updateTooltips = function(e) {
	if (e === "all" || e === "up") {
		CookieMonster.inStore = new Array(0, 0, 0, 0, 0, 0);
		Game.UpgradesById.forEach(function (e, t) {
			for (var n = 0; n < CookieMonster.upgradeCount; n++) {
				if (CookieMonster.checkUpgrade(n, t, false)) {
					CookieMonster.manageTooltips(n, t, false, false);
					break;
				}
			}
		});
	}

	if (e === "all" || e === "ob") {
		Game.ObjectsById.forEach(function (e) {
			CookieMonster.manageBuildingTooltip(e);
		});
	}
};

CookieMonster.manageTooltips = function(e, t, n, r) {
	var i = 0;
	var s = 0;
	switch (e) {
	case 0:
		i = CookieMonster.bam("The mouse and cursors", 0.1, 0);
		break;
	case 1:
		i = CookieMonster.bte(0);
		break;
	case 2:
		i = CookieMonster.mcg(t);
		break;
	case 3:
		i = CookieMonster.bam("Grandmas", 0.3, 1);
		break;
	case 4:
		i = CookieMonster.bte(1);
		if (CookieMonster.lgt(t)) {
			s++;
		}
		break;
	case 5:
		i = CookieMonster.bam("Farms", 0.5, 2);
		break;
	case 6:
		i = CookieMonster.bte(2);
		break;
	case 7:
		i = CookieMonster.bam("Factories", 4, 3);
		break;
	case 8:
		i = CookieMonster.bte(3);
		break;
	case 9:
		i = CookieMonster.bam("Mines", 10, 4);
		break;
	case 10:
		i = CookieMonster.bte(4);
		break;
	case 11:
		i = CookieMonster.bam("Shipments", 30, 5);
		break;
	case 12:
		i = CookieMonster.bte(5);
		break;
	case 13:
		i = CookieMonster.bam("Alchemy labs", 100, 6);
		break;
	case 14:
		i = CookieMonster.bte(6);
		break;
	case 15:
		i = CookieMonster.bam("Portals", 1666, 7);
		break;
	case 16:
		i = CookieMonster.bte(7);
		break;
	case 17:
		i = CookieMonster.bam("Time machines", 9876, 8);
		break;
	case 18:
		i = CookieMonster.bte(8);
		break;
	case 21:
		i = CookieMonster.gpg();
		break;
	case 22:
		i = CookieMonster.gpp();
		break;
	case 23:
		s += CookieMonster.checkAchievement("Elder nap");
		if (Game.pledges === 4) {
			s += CookieMonster.checkAchievement("Elder slumber");
		}
		break;
	case 24:
		s += CookieMonster.checkAchievement("Elder calm");
		break;
	case 28:
		i = CookieMonster.fte(1);
		break;
	case 29:
		i = CookieMonster.bte(9);
		break;
	case 30:
		i = CookieMonster.bam("Antimatter condensers", 99999, 9);
		break;
	case 32:
		i = CookieMonster.dhc(s, t, i);
		if (CookieMonster.isHeavenlyKey(t)) {
			s += CookieMonster.checkAchievement("Wholesome");
		}
		break;
	}
	if (Game.UpgradesOwned === 19) {
		s += CookieMonster.checkAchievement("Enhancer");
	}
	if (Game.UpgradesOwned === 49) {
		s += CookieMonster.checkAchievement("Augmenter");
	}
	if (Game.UpgradesOwned === 99) {
		s += CookieMonster.checkAchievement("Upgrader");
	}
	i += CookieMonster.getAchievementWorth(s, t, i, 0);
	if (r) {
		return i;
	}
	return CookieMonster.tooltips[t] + CookieMonster.colorize(i, t, n);
};

CookieMonster.manageBuildingTooltip = function(e) {
	var t = e.id;
	var n = new Array(CookieMonster.lucky("reg", true), CookieMonster.lucky("frenzy", true));
	var r = new Array("none", "none");
	var o = new Array(0, 0);
	var i;

	if (Game.cookies - e.price < n[0]) {
		r[0] = "block";
		o[0] = n[0] - (Game.cookies - e.price);
	}
	if (Game.cookies - e.price < n[1]) {
		r[1] = "block";
		o[1] = n[1] - (Game.cookies - e.price);
	}

	if (e.desc === CookieMonster.buildingTooltips[e.id]) {
		e.desc += '<div id="cm_ob_div_' + t + '" style="position:relative; height:96px; background:#222222; border:1px solid #000000; margin:6px -6px -6px -6px; display:none;"></div>';
		e.desc += '<div id="cm_ob_lucky_div_' + t + '" style="position:absolute; top:-25px; left:-12px; height:32px;">' + '<div id="cm_ob_lucky_div_warning" style="background:url(http://frozenelm.com/cookiemonster/images/warning.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + '<div id="cm_ob_lucky_div_caution" style="background:url(http://frozenelm.com/cookiemonster/images/caution.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + "</div>";
		e.desc += '<div id="cm_ob_note_div_' + t + '" style="position:absolute; left:0px; margin-top:10px; color:white;">' + '<div id="cm_ob_note_div_warning" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FF0000;"><b style="color:#FF0000;">Warning:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!"</br><span id="cm_ob_warning_amount"></span>' + '<div id="cm_ob_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/cookiemonster/images/warning.png" height=16px width=16px></div></div>' + '<div id="cm_ob_note_div_caution" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FFFF00;"><b style="color:#FFFF00;">Caution:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)</br><span id="cm_ob_caution_amount"></span>' + '<div id="cm_ob_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/cookiemonster/images/caution.png" height=16px width=16px></div></div>' + "</div>";
		Game.RebuildStore();
	}

	var u = new Array(CookieMonster.colors.yellow, CookieMonster.colors.yellow);
	var a = new Array(CookieMonster.holdCPI[t], CookieMonster.holdTC[t]);
	var f = new Array(Math.max.apply(Math, CookieMonster.holdCPI), Math.max.apply(Math, CookieMonster.holdTC));
	var l = new Array(Math.min.apply(Math, CookieMonster.holdCPI), Math.min.apply(Math, CookieMonster.holdTC));
	for (i = 0; i < u.length; i++) {
		if (a[i] === l[i]) {
			u[i] = CookieMonster.colors.green;
		} else if (a[i] === f[i]) {
			u[i] = CookieMonster.colors.red;
		} else if (f[i] - a[i] < a[i] - l[i]) {
			u[i] = "FF7F00";
		}
	}

	if ($("#cm_ob_div_" + t).length === 1) {
		$("#cm_ob_div_" + t).css("border", "1px solid #" + u[0]);
		$("#cm_ob_div_" + t).css("display", "");
		$("#cm_ob_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#4bb8f0; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + CookieMonster.formatNumber(CookieMonster.holdIs[t]) + '</div><div style="position:absolute; top:34px; left:4px; color:#4bb8f0; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + u[0] + ';">' + CookieMonster.formatNumber(a[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#4bb8f0; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + u[1] + ';">' + CookieMonster.formatTime(a[1], "") + "</div>");
		$("#cm_ob_warning_amount").text("Deficit: " + CookieMonster.formatNumber(o[0]));
		$("#cm_ob_caution_amount").text("Deficit: " + CookieMonster.formatNumber(o[1]));

		if (CookieMonster.settings[10] === 1 || CookieMonster.settings[10] === 2) {
			$("#cm_ob_lucky_div_warning").css("display", r[0]);
			$("#cm_ob_lucky_div_caution").css("display", r[1]);
		} else {
			$("#cm_ob_lucky_div_warning").css("display", "none");
			$("#cm_ob_lucky_div_caution").css("display", "none");
		}

		if (CookieMonster.settings[10] === 1 || CookieMonster.settings[10] === 3) {
			$("#cm_ob_note_div_warning").css("display", r[0]);
			$("#cm_ob_note_div_caution").css("display", r[1]);
		} else {
			$("#cm_ob_note_div_warning").css("display", "none");
			$("#cm_ob_note_div_caution").css("display", "none");
		}
	}

	if (CookieMonster.settings[6] === 1) {
		$("#product" + t).find(".price").first().css("color", "#" + u[0]);
	} else {
		$("#product" + t).find(".price").first().css("color", "");
	}
};
CookieMonster.getUpgradeBonuses = function(e, t, n) {
	var r = 0;
	var i = 0;
	switch (e) {
	case "Cursor":
		if (t === 0) {
			i += this.checkAchievement("Click");
		}
		if (t === 1) {
			i += this.checkAchievement("Double-click");
		}
		if (t === 49) {
			i += this.checkAchievement("Mouse wheel");
		}
		if (t === 99) {
			i += this.checkAchievement("Of Mice and Men");
		}
		if (t === 199) {
			i += this.checkAchievement("The Digital");
		}
		break;
	case "Grandma":
		r += this.getTotalGrandmaModifiers(t) * Game.globalCpsMult;
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Grandma's Cookies");
		}
		if (t === 49) {
			i += this.checkAchievement("Sloppy kisses");
		}
		if (t === 99) {
			i += this.checkAchievement("Retirement home");
		}
		if (t === 149) {
			i += this.checkAchievement("Friend of the ancients");
		}
		if (t === 199) {
			i += this.checkAchievement("Ruler of the ancients");
		}
		break;
	case "Farm":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("My first farm");
		}
		if (t === 49) {
			i += this.checkAchievement("Reap what you sow");
		}
		if (t === 99) {
			i += this.checkAchievement("Farm ill");
		}
		break;
	case "Factory":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Production chain");
		}
		if (t === 49) {
			i += this.checkAchievement("Industrial revolution");
		}
		if (t === 99) {
			i += this.checkAchievement("Global warming");
		}
		break;
	case "Mine":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("You know the drill");
		}
		if (t === 49) {
			i += this.checkAchievement("Excavation site");
		}
		if (t === 99) {
			i += this.checkAchievement("Hollow the planet");
		}
		break;
	case "Shipment":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Expedition");
		}
		if (t === 49) {
			i += this.checkAchievement("Galactic highway");
		}
		if (t === 99) {
			i += this.checkAchievement("Far far away");
		}
		break;
	case "Alchemy lab":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Transmutation");
		}
		if (t === 49) {
			i += this.checkAchievement("Transmogrification");
		}
		if (t === 99) {
			i += this.checkAchievement("Gold member");
		}
		break;
	case "Portal":
		r += CookieMonster.getTotalPortalModifiers() * Game.globalCpsMult;
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("A whole new world");
		}
		if (t === 49) {
			i += this.checkAchievement("Now you're thinking");
		}
		if (t === 99) {
			i += this.checkAchievement("Dimensional shift");
		}
		break;
	case "Time machine":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Time warp");
		}
		if (t === 49) {
			i += this.checkAchievement("Alternate timeline");
		}
		if (t === 99) {
			i += this.checkAchievement("Rewriting history");
		}
		break;
	case "Antimatter condenser":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Antibatter");
		}
		if (t === 49) {
			i += this.checkAchievement("Quirky quarks");
		}
		if (t === 99) {
			i += this.checkAchievement("It does matter!");
		}
		break;
	}
	if (Game.BuildingsOwned === 99) {
		i += this.checkAchievement("Builder");
	}
	if (Game.BuildingsOwned === 399) {
		i += this.checkAchievement("Architect");
	}
	if (Game.BuildingsOwned === 799) {
		i += this.checkAchievement("Engineer");
	}
	if (CookieMonster.oneWithEverything(e)) {
		i++;
	}
	if (CookieMonster.mathematician(e)) {
		i++;
	}
	if (CookieMonster.baseTen(e)) {
		i++;
	}
	if (CookieMonster.centennial(e)) {
		i++;
	}
	return r + this.getAchievementWorth(i, 0, r + n, 0);
};

CookieMonster.getTotalCursorModifiers = function() {
	var e = 0;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("The mouse and cursors gain") !== -1) {
			var r = 31;
			if (upgrade.desc.indexOf(" another ") !== -1) {
				r += 8;
			}
			e += upgrade.desc.substr(r, upgrade.desc.indexOf("<", r) - r) * 1;
		}
	});

	return e * Game.ObjectsById[0].amount;
};

CookieMonster.getTotalGrandmaModifiers = function(e) {
	var t = 0.5;
	var n = 0;
	var r = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.name === "Forwards from grandma") {
			t += 0.3;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			r = r * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			r = r * 4;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for each 50 grandmas") !== -1) {
			n += (e + 1) * 0.02 * (e + 1) - e * 0.02 * e;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for each 20 portals") !== -1) {
			n += Game.ObjectsById[7].amount * 0.05;
		}
	});

	return t * r + n * r;
};

CookieMonster.getTotalPortalModifiers = function() {
	var e     = 0;
	var total = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			total = total * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			total = total * 4;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for each 20 portals") !== -1) {
			e += Game.ObjectsById[1].amount * 0.05;
		}
	});

	return e * total;
};
CookieMonster.update = function() {
	Game.Logic = new Function("", Game.Logic.toString().replace(".title=", ".title=CookieMonster.goldenCookieAvailable+").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var e = "\n\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Goodies</span></div>\'+' + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required:</b> ' + CookieMonster.lucky('reg', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required (Frenzy):</b> ' + CookieMonster.lucky('frenzy', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX):</b> ' + CookieMonster.luckyReward('max') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX) (Frenzy):</b> ' + CookieMonster.luckyReward('max_frenzy') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (CUR):</b> ' + CookieMonster.luckyReward('cur') + '</div>'+" + "'</br><div class=\"listing\"><b>Heavenly Chips (MAX):</b> ' + CookieMonster.getHeavenlyChip('max') + '</div>'+" + "'<div class=\"listing\"><b>Heavenly Chips (CUR):</b> ' + CookieMonster.getHeavenlyChip('cur') + '</div>'+" + "'<div class=\"listing\"><b>Cookies To Next Chip:</b> ' + CookieMonster.getHeavenlyChip('next') + '</div>'+" + "'<div class=\"listing\"><b>Time To Next Chip:</b> ' + CookieMonster.getHeavenlyChip('time') + '</div>'+" + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("Statistics</div>'+", "Statistics</div>'+" + e).replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var t = "\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Settings</span></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Flash Screen \' + CookieMonster.getOptionState(0) + \'</a><label>Flashes the screen when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Cookie Timer \' + CookieMonster.getOptionState(1) + \'</a><label>Displays a timer on Golden Cookies and Red Cookies</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Cookie Sound \' + CookieMonster.getOptionState(8) + \'</a><label>Plays a sound when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Next Cookie Timer \' + CookieMonster.getOptionState(4) + \'</a><label>Displays a countdown bar and updates the Title for when the next Cookie will appear</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Update Title \' + CookieMonster.getOptionState(9) + \'</a><label>Updates the Title to display if a Cookie is waiting to be clicked</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Buff Bars \' + CookieMonster.getOptionState(2) + \'</a><label>Displays a countdown bar for each effect currently active</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Bottom Bar \' + CookieMonster.getOptionState(5) + \'</a><label>Displays a bar at the bottom of the screen that shows all Building information</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Colored Prices \' + CookieMonster.getOptionState(6) + \'</a><label>Changes the colors of all Building prices to correspond with their Cost Per Income</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Upgrade Icons \' + CookieMonster.getOptionState(11) + \'</a><label>Displays a small square icon on the Upgrade to better display the Cost Per Income color value</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Short Numbers \' + CookieMonster.getShortNumbers() + \'</a><label>Formats all numbers to be shorter when displayed</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Upgrade Display (\' + CookieMonster.getUpgradeDisplay() + \')</a><label>Changes how the store displays Upgrades</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Lucky Alert (\' + CookieMonster.getLuckyAlert() + \')</a><label>Changes the tooltip to display if you would be under the number of cookies required for "Lucky!"</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Refresh Rate (\' + CookieMonster.getRefreshRate() + \' fps)</a><label>The rate at which Cookie Monster updates data (higher rates may slow the game)</label></div>\'+' + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("OFF')+'</div>'+", "OFF')+'</div>'+" + t).replace("startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);", "startDate = CookieMonster.formatTime(((new Date).getTime() - Game.startDate) / 1000, '');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var n = "\n" + "var cm_id = from.id;" + '\nif(cm_id === "") { cm_id = $(from).parents(".product").prop("id"); }' + '\nif(cm_id === "product5" || cm_id === "product6" || cm_id === "product7" || cm_id === "product8" || cm_id === "product9") { y -= 100; }' + '\nif(cm_id === "product8" || cm_id === "product9") { y -= 13; }' + '\nif(cm_id === "product9" && CookieMonster.settings[7] === 0) { y -= 13; }' + "\n";
	Game.tooltip.draw = new Function("from,text,x,y,origin", Game.tooltip.draw.toString().replace("implemented');}", "implemented');}" + n).replace("this.on=1;", "this.on=1;\nCookieMonster.updateTooltips('all');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Reset = new Function("bypass", Game.Reset.toString().replace("Game.researchT=0;", "Game.researchT=0;\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.LoadSave = new Function("data", Game.LoadSave.toString().replace("Game.Popup('Game loaded');", "Game.Popup('Game loaded');\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.RebuildStore = new Function("", Game.RebuildStore.toString().replace("l('products').innerHTML=str;", "l('products').innerHTML=str;\nCookieMonster.updateTooltips('ob');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Draw = new Function("", Game.Draw.toString().replace("Beautify(Math.round(Game.cookiesd))", "CookieMonster.formatNumberB(Game.cookiesd)").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var r = "return CookieMonster.formatNumber(what);";
	Beautify = new Function("what,floats", Beautify.toString().replace("var str='';", r + "\nvar str='';").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
};

/**
 * Setup CookieMonster
 *
 * @return {void}
 */
CookieMonster.start = function() {
	// Cancel if already loaded
	if (CookieMonster.$monsterBar.length !== 0) {
		return alert("Cookie Monster " + CookieMonster.version + "\n\nCookie Monster is already loaded, silly!");
	}

	var $topBar  = $('#topBar');
	var $toolTip = $('#tooltip');
	var $body    = $('body');
	var $cookies = $("#cookies");

	$topBar.css("display", "none");
	$toolTip.css("margin-top", "32px");
	$toolTip.css("pointer-events", "none");
	$cookies.css("background", "rgba(0,0,0,0.75)");
	$cookies.css("border-top", "1px solid black");
	$cookies.css("border-bottom", "1px solid black");
	CookieMonster.$goldenCookie.css("cssText", "z-index: 1000001 !important;");
	$("#game").css("cssText","-webkit-touch-callout: none;" + "-webkit-user-select: none;" + "-khtml-user-select: none;" + "-moz-user-select: none;" + "-ms-user-select: none;" + "-o-user-select: none;" + "user-select: none;" + "top: 0px;" + "bottom: 57px;");
	$("#storeTitle").css("cssText","font-size: 18px;" + "padding: 4px 8px 2px 8px;" + "border-bottom: 1px solid black;");
	$("#storeTitle").after('<table cellpadding=0 cellspacing=0 style="width:300px; table-layout:fixed; padding:4px; font-weight:bold; background:rgba(0,0,0,0.6); border-bottom: 1px solid black; cursor:default;"><tr>' + '<td align=center style="color:#4bb8f0; padding:2px;" id="cm_up_q0">0</td>' + '<td align=center style="color:#00ff00; padding:2px;" id="cm_up_q1">0</td>' + '<td align=center style="color:#ffff00; padding:2px;" id="cm_up_q2">0</td>' + '<td align=center style="color:#ff7f00; padding:2px;" id="cm_up_q3">0</td>' + '<td align=center style="color:#ff0000; padding:2px;" id="cm_up_q4">0</td>' + '<td align=center style="color:#ff00ff; padding:2px;" id="cm_up_q5">0</td>' + "</tr></table>");
	$body.append('<div id="cookie_monster_bar" style="z-index:1000; position:absolute; bottom:0px; left:0px; width:100%; height:56px; border-top:1px solid black; cursor:default;' + "text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;" + "background: rgb(69,72,77); /* Old browsers */" + "background: -moz-linear-gradient(top,  rgba(69,72,77,1) 0%, rgba(0,0,0,1) 100%); /* FF3.6+ */" + "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(69,72,77,1)), color-stop(100%,rgba(0,0,0,1))); /* Chrome,Safari4+ */" + "background: -webkit-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Chrome10+,Safari5.1+ */" + "background: -o-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Opera 11.10+ */" + "background: -ms-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* IE10+ */" + "background: linear-gradient(to bottom,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* W3C */" + "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 ); /* IE6-9 */" + '"></div>');
	$body.append('<div id="cookie_monster_overlay" style="position:fixed; z-index:1000000; height:100%; width:100%; background:rgba(255,255,255,1); pointer-events:none; display:none;"></div>');
	$body.append('<div id="cookie_monster_golden_overlay" style="position:fixed; z-index:1000002; height:96px; width:96px; pointer-events:none; cursor:pointer; opacity:0; display:none; text-align:center; font-family: \'Kavoon\', Georgia,serif; font-size:32px; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black !important;" onclick="Game.goldenCookie.click();"></div>');
	$("#sectionLeft").append('<div id="cookie_monster_timer_bars_div" style="position:absolute; z-index:1000; bottom:-1px; left:0px; width:100%; pointer-events:none; text-align:center; font-family: \'Kavoon\', Georgia,serif; font-size:16px; background:rgba(0,0,0,0.6); border-top:1px solid black;"></div>');

	$("link").each(function () {
		if ($(this).attr("href") === "img/favicon.ico") {
			$(this).attr("id", "cm_favicon");
		}
	});

	// Refrehs selector
	CookieMonster.$monsterBar = $('#cookie_monster_bar');

	CookieMonster.makeTable();
	CookieMonster.saveTooltips();
	CookieMonster.update();
	CookieMonster.loadSettings();
	CookieMonster.setupTooltips();
	CookieMonster.mainLoop();

	Game.Popup('<span style="color:#' +this.colors.yellow+ '; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + CookieMonster.version + " Loaded!</span>");
};

CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips("all");
	CookieMonster.doEmphasize();
	CookieMonster.manageBuffs();
	CookieMonster.loops++;

	if (CookieMonster.loops === 1) {
		Game.RebuildStore();
	}

	setTimeout(function () {
		CookieMonster.mainLoop();
	}, CookieMonster.settings[3]);
};

if (document.title.indexOf("Cookie Clicker") !== -1 && $("#game").length !== 0) {
	CookieMonster.start();
} else {
	alert("Cookie Monster " + CookieMonster.version + "\n\nThese aren't the droids you're looking for.");
}