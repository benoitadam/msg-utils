"use strict";var mt=Object.create;var B=Object.defineProperty;var ct=Object.getOwnPropertyDescriptor;var Tt=Object.getOwnPropertyNames;var yt=Object.getPrototypeOf,ht=Object.prototype.hasOwnProperty;var gt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),xt=(e,t)=>{for(var r in t)B(e,r,{get:t[r],enumerable:!0})},he=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Tt(t))!ht.call(e,s)&&s!==r&&B(e,s,{get:()=>t[s],enumerable:!(o=ct(t,s))||o.enumerable});return e};var Rt=(e,t,r)=>(r=e!=null?mt(yt(e)):{},he(t||!e||!e.__esModule?B(r,"default",{value:e,enumerable:!0}):r,e)),bt=e=>he(B({},"__esModule",{value:!0}),e);var Re=gt(xe=>{var ge=require("url"),Et=require("child_process").spawn,A=require("fs");xe.XMLHttpRequest=function(){"use strict";var e=this,t=require("http"),r=require("https"),o,s,i={},a=!1,f={"User-Agent":"node-XMLHttpRequest",Accept:"*/*"},u={},p={},le=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","content-transfer-encoding","cookie","cookie2","date","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","via"],st=["TRACE","TRACK","CONNECT"],E=!1,S=!1,x={};this.UNSENT=0,this.OPENED=1,this.HEADERS_RECEIVED=2,this.LOADING=3,this.DONE=4,this.readyState=this.UNSENT,this.onreadystatechange=null,this.responseText="",this.responseXML="",this.status=null,this.statusText=null,this.withCredentials=!1;var nt=function(n){return a||n&&le.indexOf(n.toLowerCase())===-1},at=function(n){return n&&st.indexOf(n)===-1};this.open=function(n,l,b,T,w){if(this.abort(),S=!1,!at(n))throw new Error("SecurityError: Request method not allowed");i={method:n,url:l.toString(),async:typeof b!="boolean"?!0:b,user:T||null,password:w||null},R(this.OPENED)},this.setDisableHeaderCheck=function(n){a=n},this.setRequestHeader=function(n,l){if(this.readyState!==this.OPENED)throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");if(!nt(n)){console.warn('Refused to set unsafe header "'+n+'"');return}if(E)throw new Error("INVALID_STATE_ERR: send flag is true");n=p[n.toLowerCase()]||n,p[n.toLowerCase()]=n,u[n]=u[n]?u[n]+", "+l:l},this.getResponseHeader=function(n){return typeof n=="string"&&this.readyState>this.OPENED&&s&&s.headers&&s.headers[n.toLowerCase()]&&!S?s.headers[n.toLowerCase()]:null},this.getAllResponseHeaders=function(){if(this.readyState<this.HEADERS_RECEIVED||S)return"";var n="";for(var l in s.headers)l!=="set-cookie"&&l!=="set-cookie2"&&(n+=l+": "+s.headers[l]+`\r
`);return n.substr(0,n.length-2)},this.getRequestHeader=function(n){return typeof n=="string"&&p[n.toLowerCase()]?u[p[n.toLowerCase()]]:""},this.send=function(n){if(this.readyState!==this.OPENED)throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");if(E)throw new Error("INVALID_STATE_ERR: send has already been called");var l=!1,b=!1,T=ge.parse(i.url),w;switch(T.protocol){case"https:":l=!0;case"http:":w=T.hostname;break;case"file:":b=!0;break;case void 0:case null:case"":w="localhost";break;default:throw new Error("Protocol not supported.")}if(b){if(i.method!=="GET")throw new Error("XMLHttpRequest: Only GET method is supported");if(i.async)A.readFile(T.pathname,"utf8",function(N,q){N?e.handleError(N):(e.status=200,e.responseText=q,R(e.DONE))});else try{this.responseText=A.readFileSync(T.pathname,"utf8"),this.status=200,R(e.DONE)}catch(N){this.handleError(N)}return}var de=T.port||(l?443:80),it=T.pathname+(T.search?T.search:"");for(var pe in f)p[pe.toLowerCase()]||(u[pe]=f[pe]);if(u.Host=w,l&&de===443||de===80||(u.Host+=":"+T.port),i.user){typeof i.password>"u"&&(i.password="");var ft=new Buffer(i.user+":"+i.password);u.Authorization="Basic "+ft.toString("base64")}i.method==="GET"||i.method==="HEAD"?n=null:n?(u["Content-Length"]=Buffer.isBuffer(n)?n.length:Buffer.byteLength(n),u["Content-Type"]||(u["Content-Type"]="text/plain;charset=UTF-8")):i.method==="POST"&&(u["Content-Length"]=0);var ce={host:w,port:de,path:it,method:i.method,headers:u,agent:!1,withCredentials:e.withCredentials};if(S=!1,i.async){var Te=l?r.request:t.request;E=!0,e.dispatchEvent("readystatechange");var ut=function N(q){if(s=q,s.statusCode===301||s.statusCode===302||s.statusCode===303||s.statusCode===307){i.url=s.headers.location;var j=ge.parse(i.url);w=j.hostname;var pt={hostname:j.hostname,port:j.port,path:j.path,method:s.statusCode===303?"GET":i.method,headers:u,withCredentials:e.withCredentials};o=Te(pt,N).on("error",ye),o.end();return}s.setEncoding("utf8"),R(e.HEADERS_RECEIVED),e.status=s.statusCode,s.on("data",function(K){K&&(e.responseText+=K),E&&R(e.LOADING)}),s.on("end",function(){E&&(R(e.DONE),E=!1)}),s.on("error",function(K){e.handleError(K)})},ye=function(q){e.handleError(q)};o=Te(ce,ut).on("error",ye),n&&o.write(n),o.end(),e.dispatchEvent("loadstart")}else{var k=".node-xmlhttprequest-content-"+process.pid,M=".node-xmlhttprequest-sync-"+process.pid;A.writeFileSync(M,"","utf8");for(var lt="var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http"+(l?"s":"")+".request;var options = "+JSON.stringify(ce)+";var responseText = '';var req = doRequest(options, function(response) {response.setEncoding('utf8');response.on('data', function(chunk) {  responseText += chunk;});response.on('end', function() {fs.writeFileSync('"+k+"', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');fs.unlinkSync('"+M+"');});response.on('error', function(error) {fs.writeFileSync('"+k+"', JSON.stringify({err: error}), 'utf8');fs.unlinkSync('"+M+"');});}).on('error', function(error) {fs.writeFileSync('"+k+"', JSON.stringify({err: error}), 'utf8');fs.unlinkSync('"+M+"');});"+(n?"req.write('"+JSON.stringify(n).slice(1,-1).replace(/'/g,"\\'")+"');":"")+"req.end();",dt=Et(process.argv[0],["-e",lt]);A.existsSync(M););var H=JSON.parse(A.readFileSync(k,"utf8"));dt.stdin.end(),A.unlinkSync(k),H.err?e.handleError(H.err):(s=H.data,e.status=H.data.statusCode,e.responseText=H.data.text,R(e.DONE))}},this.handleError=function(n){this.status=0,this.statusText=n,this.responseText=n.stack,S=!0,R(this.DONE),this.dispatchEvent("error")},this.abort=function(){o&&(o.abort(),o=null),u=f,this.status=0,this.responseText="",this.responseXML="",S=!0,this.readyState!==this.UNSENT&&(this.readyState!==this.OPENED||E)&&this.readyState!==this.DONE&&(E=!1,R(this.DONE)),this.readyState=this.UNSENT,this.dispatchEvent("abort")},this.addEventListener=function(n,l){n in x||(x[n]=[]),x[n].push(l)},this.removeEventListener=function(n,l){n in x&&(x[n]=x[n].filter(function(b){return b!==l}))},this.dispatchEvent=function(n){if(typeof e["on"+n]=="function"&&e["on"+n](),n in x)for(var l=0,b=x[n].length;l<b;l++)x[n][l].call(e)};var R=function(n){(n==e.LOADING||e.readyState!==n)&&(e.readyState=n,(i.async||e.readyState<e.OPENED||e.readyState===e.DONE)&&e.dispatchEvent("readystatechange"),e.readyState===e.DONE&&!S&&(e.dispatchEvent("load"),e.dispatchEvent("loadend")))}}});var Dt={};xt(Dt,{Msg:()=>J,Rest:()=>I,RestError:()=>U,TimeoutError:()=>D,VERSION:()=>Ot,arr:()=>Ae,bool:()=>Ce,bounds:()=>Be,camel:()=>et,clean:()=>ae,cloneJson:()=>Ke,compact:()=>be,copy:()=>Je,debounce:()=>te,deleteKey:()=>Qe,diff:()=>_e,firstLower:()=>se,firstUpper:()=>ne,getJson:()=>m,getStored:()=>O,groupBy:()=>We,isArray:()=>h,isDate:()=>z,isEmpty:()=>Ne,isEquals:()=>Oe,isFunction:()=>c,isNil:()=>d,isNotNull:()=>Z,isRecord:()=>g,isString:()=>y,isUuid:()=>De,last:()=>Ee,me:()=>Le,moveIndex:()=>_,moveItem:()=>ve,nbr:()=>ke,parseJson:()=>v,pascal:()=>fe,paste:()=>je,rand:()=>Fe,range:()=>we,rec:()=>Me,removeItem:()=>F,rest:()=>Nt,retry:()=>Xe,round:()=>Ge,setStored:()=>L,sleep:()=>ze,sort:()=>Ue,sortKey:()=>Ye,srt:()=>X,throttle:()=>re,toArray:()=>W,toBoolean:()=>Y,toDate:()=>He,toError:()=>qe,toNull:()=>Pe,toNumber:()=>$,toRecord:()=>ee,toString:()=>G,toVoid:()=>Ve,tryCatch:()=>C,uniq:()=>Ie,uuid:()=>tt,valueBy:()=>Q,withTimeout:()=>Ze,words:()=>ie,xhrRest:()=>oe});module.exports=bt(Dt);var P=class{get length(){return Object.keys(this).length}save(){}clear(){for(let t in this)delete this[t];this.save()}getItem(t){return this[t]||null}key(t){return Object.keys(this)[t]||null}removeItem(t){delete this[t],this.save()}setItem(t,r){this[t]=r,this.save()}};var rt=Rt(Re()),ot=require("crypto");var be=e=>e.filter(Boolean);var Ee=e=>e[e.length-1];var _=(e,t,r)=>{if(t===r)return e;let o=e.splice(t,1);return e.splice(r,0,o[0]),e};var ve=(e,t,r)=>{let o=e.indexOf(t);if(o===-1)return e;let s=(o+r)%5;return s<0&&(s+=e.length),_(e,o,s)};var d=e=>e==null;var Se=(e,t)=>d(t)?Array.from(Array(e).keys()):Se(t-e+1).map(r=>r+e),we=Se;var F=(e,t)=>{let r=e.indexOf(t);return r===-1||e.splice(r,1),e};var G=(e,t="")=>d(e)?t:String(e);var X=e=>G(e);var h=Array.isArray;var z=e=>e instanceof Date;var Ne=e=>!e||(h(e)?e:Object.keys(e)).length===0;var C=(e,t)=>{try{return e()}catch{return t}};var m=(e,t,r)=>C(()=>JSON.stringify(e,null,r?2:0),t);var g=e=>e instanceof Object&&!Array.isArray(e);var me=(e,t)=>{if(e===t)return!0;if(typeof e!=typeof t)return!1;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let r=0,o=e.length;r<o;r++)if(!me(e[r],t[r]))return!1;return!0}if(e instanceof Object){if(!g(t)||Object.keys(e).length!==Object.keys(t).length)return!1;for(let r in e)if(!me(e[r],t[r]))return!1;return!0}return m(e)===m(t)},Oe=me;var c=e=>e instanceof Function;var Z=e=>e!=null;var y=e=>typeof e=="string";var De=e=>{let t=String(e).replace(/[a-zA-Z0-9]+/g,r=>""+r.length);return t==="8-4-4-4-12"||t==="32"};var Ue=(e,t=X)=>e.sort((r,o)=>{let s=t(r),i=t(o);return y(s)||y(i)?String(s).localeCompare(String(i)):Number(s)-Number(i)});var Q=(e,t,r)=>{let o={},s=c(t)?t:d(t)?(a,f)=>f:a=>a[t],i=c(r)?r:d(r)?a=>a:a=>a[r];return h(e)&&e.forEach((a,f)=>{o[s(a,f)]=i(a,f)}),g(e)&&Object.entries(e).forEach(a=>{let f=a[0],u=a[1];o[s(u,f)]=i(u,f)}),o};var Ie=e=>Object.values(Q(e,t=>m(t)));var W=(e,t=[])=>d(e)?t:h(e)?e:[e];var Ae=e=>W(e);var Y=(e,t)=>y(e)?["true","ok","on","1"].indexOf(String(e).toLowerCase())!==-1:d(e)?t:!!e;var Ce=e=>Y(e);var Le=e=>e;var $=(e,t)=>{let r=y(e)?e.replace(/,/g,".").replace(/[^0-9\-\.]/g,""):String(e),o=r!==""?Number(r):Number.NaN;return Number.isNaN(o)?t:o};var ke=e=>$(e,0);var ee=(e,t={})=>g(e)?e:t;var Me=e=>ee(e);var V=e=>typeof e=="number";var He=(e,t)=>z(e)?e:y(e)||V(e)?new Date(e):d(e)?new Date:t;var qe=e=>e instanceof Error?e:new Error(String(e));var Pe=()=>null;var Ve=()=>{};var L=(e,t)=>{let r=d(t)?void 0:m(t);d(r)?localStorage.removeItem(e):localStorage.setItem(e,r)};var Je=e=>(L("__clipboard",e),navigator&&navigator.clipboard?navigator.clipboard.writeText(m(e,"")):Promise.resolve());var v=(e,t)=>C(()=>JSON.parse(e),t);var O=(e,t)=>v(localStorage.getItem(e),t);var je=()=>navigator&&navigator.clipboard?navigator.clipboard.readText().then(e=>v(e,e)).catch(()=>O("__clipboard")):Promise.resolve(O("__clipboard"));var Ke=(e,t)=>v(m(e),t);var te=(e,t)=>{let r,o,s=()=>{r=null,e(o)};return i=>{o=i,r&&clearTimeout(r),r=setTimeout(s,t)}};var re=(e,t)=>{let r=0,o,s,i=()=>{s=null,e(o),r=Date.now()};return a=>{o=a,s&&clearTimeout(s);let f=Math.max(t-(Date.now()-r),0);f===0?i():s=setTimeout(i,f)}};var J=class e{static byKey={};static get(t,r,o){let s=this.byKey[t];return s||(s=new e(r,t),o&&(s.set(O(t,r)),s.on(i=>L(t,i))),this.byKey[t]=s,s)}k;v;h=[];s;sO;sH;constructor(t,r){this.v=t,r&&(this.k=r)}get val(){return this.get()}get value(){return this.get()}get key(){return this.k}get(){return this.v}set(t){if(t!==this.v){let r=this.v;this.v=t,this.h.forEach(o=>o(this.v,r))}return this}next(t){return this.set(c(t)?t(this.v):t)}subscribe(t){return{unsubscribe:this.on(t)}}pipe(t){return t.set(this.v),this.on(r=>t.set(r))}on(t){return this.h.push(t),!this.sO&&this.s&&this.sH&&(this.sO=this.s.on(this.sH)),()=>this.off(t)}off(t){F(this.h,t),this.sO&&this.h.length===0&&(this.sO(),delete this.sO)}map(t,r){let o=this,s=new e(t(o.v));return s.s=o,s.sH=r?r(s):()=>s.set(t(o.v)),s}debounce(t){return this.map(()=>this.v,r=>te(o=>r.set(o),t))}throttle(t){return this.map(()=>this.v,r=>re(o=>r.set(o),t))}toPromise(t=Z){return new Promise(r=>{if(t(this.v))return r(this.v);let o=this.on(s=>{t(s)&&(o(),r(s))})})}};var Be=(e,t,r)=>V(t)&&e<t?t:V(r)&&e>r?r:e;var _e=(e,t)=>Math.abs(e-t);var Fe=(e,t)=>Math.random()*(t-e)+e;var Ge=(e,t)=>{let r=Math.pow(10,t||0);return Math.round(e*r)/r};var Xe=async(e,t=2)=>{let r;for(let o=0;o<t;o++)try{return await e()}catch(s){r=s}throw r};var ze=e=>new Promise(t=>setTimeout(t,e));var D=class extends Error{constructor(t){super(t),this.name="TimeoutError"}};var Ze=(e,t=5e3)=>new Promise((r,o)=>{let s=setTimeout(()=>o(new D),t);e.then(r).catch(o).finally(()=>clearTimeout(s))});var Qe=(e,...t)=>{for(let r of t)delete e[r];return e};var We=(e,t,r)=>{let o={},s=c(t)?t:d(t)?(a,f)=>f:a=>a[t],i=c(r)?r:d(r)?a=>a:a=>a[r];return h(e)&&e.forEach((a,f)=>{let u=s(a,f);(o[u]||(o[u]=[])).push(i(a,f))}),g(e)&&Object.entries(e).forEach(a=>{let f=a[0],u=a[1],p=s(u,f);(o[p]||(o[p]=[])).push(i(u,f))}),o};var Ye=e=>Object.fromEntries(Object.entries(e).sort((t,r)=>t[0].localeCompare(r[0])));var vt=e=>String(e&&e.message||e),St=e=>String(e&&e.code),U=class extends Error{constructor(r){super(vt(r.response)||r.statusText);this.xhr=r;this.code=St(r.response)||String(r.status)}code};var $e="application/json; charset=utf-8",wt={json:$e,text:"text/*; charset=utf-8",blob:"*/*",document:"text/html, application/xhtml+xml, application/xml; q=0.9; charset=utf-8",arraybuffer:"*/*"},oe=(e,t,r={})=>new Promise((o,s)=>{if(r.onInit&&r.onInit(e),e.timeout=r.timeout||2e4,e.responseType=r.responseType||"json",r.params||r.baseUrl){let a=new URL(t,r.baseUrl);r.params&&Object.entries(r.params).forEach(f=>{let u=f[0],p=f[1];if(Array.isArray(p)){a.searchParams.delete(u),Object.values(p).forEach(le=>a.searchParams.append(u,String(le)));return}if(typeof p=="object"){a.searchParams.set(u,JSON.stringify(p));return}a.searchParams.set(u,String(p))}),t=a}if(e.open((r.method||"POST").toUpperCase(),t),r.data&&e.setRequestHeader("Content-Type","application/json; charset=utf-8"),e.setRequestHeader("Accept",wt[e.responseType]||$e),r.headers){let a=c(r.headers)?r.headers():r.headers;Object.entries(a).forEach(f=>e.setRequestHeader(f[0],f[1]))}if(r.onProgress){let a=r.onProgress;e.addEventListener("progress",f=>a(f,f.loaded/f.total))}let i=r.data?JSON.stringify(r.data):r.formData;e.onload=()=>{if(e.status>=400)throw e.status;r.onSuccess&&r.onSuccess(e.response,e),o(e.response)},e.onerror=()=>{let a=new U(e);r.onError&&r.onError(a,e),s(a)},r.send?r.send(e,i):e.send(i)});var I=class e{constructor(t){this.options=t}new(t){return new e(t)}newXhr(){return new XMLHttpRequest}send(t,r={}){let o=this.newXhr();return oe(o,t,this.options?{...this.options,...r}:r)}get(t,r={}){return this.send(t,{method:"GET",...r})}delete(t,r={}){return this.send(t,{method:"DELETE",...r})}post(t,r,o={}){return this.send(t,{method:"POST",data:r,...o})}patch(t,r,o={}){return this.send(t,{method:"PATCH",data:r,...o})}put(t,r,o={}){return this.send(t,{method:"PUT",data:r,...o})}upload(t,r,o,s,i={}){let a=new FormData;return a.append(r,o,s||o.name),this.send(t,{method:"POST",formData:a,...i})}};var Nt=new I;var se=e=>e&&e[0].toLowerCase()+e.substring(1);var ne=e=>e&&e[0].toUpperCase()+e.substring(1);var ae=e=>e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\w]/g," ").trim();var ie=e=>ae(e).replace(/[a-z0-9][A-Z]/g,t=>t[0]+" "+t[1].toLowerCase()).toLowerCase().trim().split(" ").filter(t=>t);var fe=e=>ie(e).map(ne).join("");var et=e=>se(fe(e));var ue=globalThis.crypto||{},tt=(()=>ue.randomUUID?ue.randomUUID:ue.getRandomValues?()=>{var e=new Uint16Array(8);ue.getRandomValues(e);let t=r=>e[r].toString(16).padStart(4,"0");return t(0)+t(1)+"-"+t(2)+"-"+t(3)+"-"+t(4)+"-"+t(5)+t(6)+t(7)}:()=>{let e="0123456789abcdef",t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",r="",o=0,s=Math.random()*4294967295|0;for(;o++<36;){var i=t[o-1],a=s&15,f=i=="x"?a:a&3|8;r+=i=="-"||i=="4"?i:e[f],s=o%8==0?Math.random()*4294967295|0:s>>4}return r})();globalThis.localStorage=new P;globalThis.XMLHttpRequest=rt.XMLHttpRequest;globalThis.crypto=ot.webcrypto;var Ot="0.0.106";0&&(module.exports={Msg,Rest,RestError,TimeoutError,VERSION,arr,bool,bounds,camel,clean,cloneJson,compact,copy,debounce,deleteKey,diff,firstLower,firstUpper,getJson,getStored,groupBy,isArray,isDate,isEmpty,isEquals,isFunction,isNil,isNotNull,isRecord,isString,isUuid,last,me,moveIndex,moveItem,nbr,parseJson,pascal,paste,rand,range,rec,removeItem,rest,retry,round,setStored,sleep,sort,sortKey,srt,throttle,toArray,toBoolean,toDate,toError,toNull,toNumber,toRecord,toString,toVoid,tryCatch,uniq,uuid,valueBy,withTimeout,words,xhrRest});
/*! Bundled license information:

xmlhttprequest/lib/XMLHttpRequest.js:
  (**
   * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
   *
   * This can be used with JS designed for browsers to improve reuse of code and
   * allow the use of existing libraries.
   *
   * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
   *
   * @author Dan DeFelippi <dan@driverdan.com>
   * @contributor David Ellis <d.f.ellis@ieee.org>
   * @license MIT
   *)
*/
