class w{constructor(e){this.properties=e??[]}get(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const r=this.get(e);if(r!==void 0){if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}getType(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const $="https://unpkg.com/@workadventure/scripting-api-extra@1.9.1/dist";class re{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new w(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function O(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite($+"/configuration.html"+e,!0)}async function oe(t,e){const n=await WA.room.getTiledMap(),r=new Map;return J(n.layers,r,t,e),r}function J(t,e,n,r){for(const o of t)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(n&&o.name!==n||r&&!r.includes(s.name))continue;e.set(s.name,new re(s))}}else o.type==="group"&&J(o.layers,e,n,r)}let x;async function L(){return x===void 0&&(x=se()),x}async function se(){return ae(await WA.room.getTiledMap())}function ae(t){const e=new Map;return X(t.layers,"",e),e}function X(t,e,n){for(const r of t)r.type==="group"?X(r.layers,e+r.name+"/",n):(r.name=e+r.name,n.set(r.name,r))}async function Y(){const t=await L(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const r of n.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ie(t){let e=1/0,n=1/0,r=0,o=0;const s=t.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<t.height;a++)for(let i=0;i<t.width;i++)s[i+a*t.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),n=Math.min(n,a),r=Math.max(r,a));return{top:n,left:e,right:o+1,bottom:r+1}}function Q(t){let e=1/0,n=1/0,r=0,o=0;for(const s of t){const a=ie(s);a.left<e&&(e=a.left),a.top<n&&(n=a.top),a.right>o&&(o=a.right),a.bottom>r&&(r=a.bottom)}return{top:n,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var le=Object.prototype.toString,S=Array.isArray||function(e){return le.call(e)==="[object Array]"};function G(t){return typeof t=="function"}function ce(t){return S(t)?"array":typeof t}function j(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function U(t,e){return t!=null&&typeof t=="object"&&e in t}function ue(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var fe=RegExp.prototype.test;function pe(t,e){return fe.call(t,e)}var ge=/\S/;function he(t){return!pe(ge,t)}var de={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function ye(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return de[n]})}var me=/\s*/,Ae=/\s+/,_=/\s*=/,be=/\s*\}/,ve=/#|\^|\/|>|\{|&|=|!/;function we(t,e){if(!t)return[];var n=!1,r=[],o=[],s=[],a=!1,i=!1,l="",u=0;function p(){if(a&&!i)for(;s.length;)delete o[s.pop()];else s=[];a=!1,i=!1}var d,m,k;function E(b){if(typeof b=="string"&&(b=b.split(Ae,2)),!S(b)||b.length!==2)throw new Error("Invalid tags: "+b);d=new RegExp(j(b[0])+"\\s*"),m=new RegExp("\\s*"+j(b[1])),k=new RegExp("\\s*"+j("}"+b[1]))}E(e||h.tags);for(var f=new M(t),A,c,y,P,T,v;!f.eos();){if(A=f.pos,y=f.scanUntil(d),y)for(var R=0,ne=y.length;R<ne;++R)P=y.charAt(R),he(P)?(s.push(o.length),l+=P):(i=!0,n=!0,l+=" "),o.push(["text",P,A,A+1]),A+=1,P===`
`&&(p(),l="",u=0,n=!1);if(!f.scan(d))break;if(a=!0,c=f.scan(ve)||"name",f.scan(me),c==="="?(y=f.scanUntil(_),f.scan(_),f.scanUntil(m)):c==="{"?(y=f.scanUntil(k),f.scan(be),f.scanUntil(m),c="&"):y=f.scanUntil(m),!f.scan(m))throw new Error("Unclosed tag at "+f.pos);if(c==">"?T=[c,y,A,f.pos,l,u,n]:T=[c,y,A,f.pos],u++,o.push(T),c==="#"||c==="^")r.push(T);else if(c==="/"){if(v=r.pop(),!v)throw new Error('Unopened section "'+y+'" at '+A);if(v[1]!==y)throw new Error('Unclosed section "'+v[1]+'" at '+A)}else c==="name"||c==="{"||c==="&"?i=!0:c==="="&&E(y)}if(p(),v=r.pop(),v)throw new Error('Unclosed section "'+v[1]+'" at '+f.pos);return Se(We(o))}function We(t){for(var e=[],n,r,o=0,s=t.length;o<s;++o)n=t[o],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(e.push(n),r=n));return e}function Se(t){for(var e=[],n=e,r=[],o,s,a=0,i=t.length;a<i;++a)switch(o=t[a],o[0]){case"#":case"^":n.push(o),r.push(o),n=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],n=r.length>0?r[r.length-1][4]:e;break;default:n.push(o)}return e}function M(t){this.string=t,this.tail=t,this.pos=0}M.prototype.eos=function(){return this.tail===""};M.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};M.prototype.scanUntil=function(e){var n=this.tail.search(e),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function W(t,e){this.view=t,this.cache={".":this.view},this.parent=e}W.prototype.push=function(e){return new W(e,this)};W.prototype.lookup=function(e){var n=this.cache,r;if(n.hasOwnProperty(e))r=n[e];else{for(var o=this,s,a,i,l=!1;o;){if(e.indexOf(".")>0)for(s=o.view,a=e.split("."),i=0;s!=null&&i<a.length;)i===a.length-1&&(l=U(s,a[i])||ue(s,a[i])),s=s[a[i++]];else s=o.view[e],l=U(o.view,e);if(l){r=s;break}o=o.parent}n[e]=r}return G(r)&&(r=r.call(this.view)),r};function g(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};g.prototype.parse=function(e,n){var r=this.templateCache,o=e+":"+(n||h.tags).join(":"),s=typeof r<"u",a=s?r.get(o):void 0;return a==null&&(a=we(e,n),s&&r.set(o,a)),a};g.prototype.render=function(e,n,r,o){var s=this.getConfigTags(o),a=this.parse(e,s),i=n instanceof W?n:new W(n,void 0);return this.renderTokens(a,i,r,e,o)};g.prototype.renderTokens=function(e,n,r,o,s){for(var a="",i,l,u,p=0,d=e.length;p<d;++p)u=void 0,i=e[p],l=i[0],l==="#"?u=this.renderSection(i,n,r,o,s):l==="^"?u=this.renderInverted(i,n,r,o,s):l===">"?u=this.renderPartial(i,n,r,s):l==="&"?u=this.unescapedValue(i,n):l==="name"?u=this.escapedValue(i,n,s):l==="text"&&(u=this.rawValue(i)),u!==void 0&&(a+=u);return a};g.prototype.renderSection=function(e,n,r,o,s){var a=this,i="",l=n.lookup(e[1]);function u(m){return a.render(m,n,r,s)}if(l){if(S(l))for(var p=0,d=l.length;p<d;++p)i+=this.renderTokens(e[4],n.push(l[p]),r,o,s);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],n.push(l),r,o,s);else if(G(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(n.view,o.slice(e[3],e[5]),u),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],n,r,o,s);return i}};g.prototype.renderInverted=function(e,n,r,o,s){var a=n.lookup(e[1]);if(!a||S(a)&&a.length===0)return this.renderTokens(e[4],n,r,o,s)};g.prototype.indentPartial=function(e,n,r){for(var o=n.replace(/[^ \t]/g,""),s=e.split(`
`),a=0;a<s.length;a++)s[a].length&&(a>0||!r)&&(s[a]=o+s[a]);return s.join(`
`)};g.prototype.renderPartial=function(e,n,r,o){if(r){var s=this.getConfigTags(o),a=G(r)?r(e[1]):r[e[1]];if(a!=null){var i=e[6],l=e[5],u=e[4],p=a;l==0&&u&&(p=this.indentPartial(a,u,i));var d=this.parse(p,s);return this.renderTokens(d,n,r,p,o)}}};g.prototype.unescapedValue=function(e,n){var r=n.lookup(e[1]);if(r!=null)return r};g.prototype.escapedValue=function(e,n,r){var o=this.getConfigEscape(r)||h.escape,s=n.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===h.escape?String(s):o(s)};g.prototype.rawValue=function(e){return e[1]};g.prototype.getConfigTags=function(e){return S(e)?e:e&&typeof e=="object"?e.tags:void 0};g.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!S(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){C.templateCache=t},get templateCache(){return C.templateCache}},C=new g;h.clearCache=function(){return C.clearCache()};h.parse=function(e,n){return C.parse(e,n)};h.render=function(e,n,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+ce(e)+'" was given as the first argument for mustache#render(template, view, partials)');return C.render(e,n,r,o)};h.escape=ye;h.Scanner=M;h.Context=W;h.Writer=g;class Z{constructor(e,n){this.template=e,this.state=n,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const r of this.getUsedVariables().values())n.push(this.state.onVariableChange(r).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of n)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const r of e){const o=r[0],s=r[1],a=r[4];["name","&","#","^"].includes(o)&&n.add(s),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,n)}}}async function Ee(){var t;const e=await Y();for(const n of e){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new Z(o.value,WA.state);if(s.isPureString())continue;const a=s.getValue();await F(n.name,o.name,a),s.onChange(async i=>{await F(n.name,o.name,i)})}}}async function Pe(){var t;const e=await L();for(const[n,r]of e.entries())if(r.type!=="objectgroup"){const o=(t=r.properties)!==null&&t!==void 0?t:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const a=new Z(s.value,WA.state);if(a.isPureString())continue;const i=a.getValue();H(n,s.name,i),a.onChange(l=>{H(n,s.name,l)})}}}async function F(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function H(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}const Ce="https://admin.workadventu.re/html";let V,I=0,D=0;function N(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function Le(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=te(t.properties.mustGetString("openLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function Me(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=te(t.properties.mustGetString("closeLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function ee(t){return t.map(e=>V.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function te(t){const e=ee(t),n=Q(e),r=((n.right-n.left)/2+n.left)*32,o=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow(I-r,2)+Math.pow(D-o,2))}function ke(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Le(t):Me(t),N(t)}),N(t)}function q(t,e,n,r){const o=t.name;let s,a,i=!1;const l=n.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const p=!!l;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function k(){let c;if(t.type==="tilelayer")c=Q(ee(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);c={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}a=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function E(){a&&(WA.room.website.delete(a.name),a=void 0)}function f(){if(i=!0,n.getBoolean("autoOpen")&&u){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!u||!p)&&(n.getString("code")||n.getString("codeVariable"))){k();return}u&&(WA.state[e.name]?d():m())}function A(){i=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),E()}t.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(f),WA.room.onLeaveLayer(o).subscribe(A)):(WA.room.area.onEnter(o).subscribe(f),WA.room.area.onLeave(o).subscribe(A)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),a&&WA.state[e.name]===!0&&E(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function Te(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=Math.sqrt(Math.pow(t.x-I,2)+Math.pow(t.y-D,2));if(o>n)return;r=1-o/n}WA.sound.loadSound(e).play({volume:r})}function Be(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Te(t)})}function z(t,e,n){let r;const o=e.getString("bellPopup");if(n.type==="tilelayer"){const s=n.name;WA.room.onEnterLayer(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(s).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const s=n.name;WA.room.area.onEnter(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(s).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function Re(t){t=t??Ce;const e=await oe();V=await L();for(const n of e.values())n.properties.get("door")&&ke(n),n.properties.get("bell")&&Be(n);for(const n of V.values()){const r=new w(n.properties),o=r.getString("doorVariable");if(o&&n.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+n.name+'"');q(n,a,r,t)}const s=r.getString("bellVariable");s&&n.type==="tilelayer"&&z(s,r,n)}for(const n of await Y()){const r=new w(n.properties),o=r.getString("doorVariable");if(o){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+n.name+'"');q(n,a,r,t)}const s=r.getString("bellVariable");s&&z(s,r,n)}WA.player.onPlayerMove(n=>{I=n.x,D=n.y})}function xe(t,e){const n=t.getString("bindVariable");if(n){const r=t.get("enterValue"),o=t.get("leaveValue"),s=t.getString("triggerMessage"),a=t.getString("tag");je(n,e,r,o,s,a)}}function je(t,e,n,r,o,s){s&&!WA.player.tags.includes(s)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=n)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=r}))}async function Ve(){const t=await L();for(const e of t.values()){const n=new w(e.properties);xe(n,e.name)}}let K;async function Ge(t){const e=await WA.room.getTiledMap();t=t??$,K=await L();const n=e.layers.find(r=>r.name==="configuration");if(n){const o=new w(n.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const s of K.values()){const a=new w(s.properties),i=a.getString("openConfig");i&&s.type==="tilelayer"&&Ie(i.split(","),s.name,a)}}}function Ie(t,e,n){let r;const o=n.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function a(){var l;r&&r.remove(),r=WA.ui.displayActionMessage({message:(l=n.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>O(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=n.getString("openConfigTrigger");s&&(l&&l==="onaction"?a():O(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),i()})}function De(){return WA.onInit().then(()=>{Re().catch(t=>console.error(t)),Ve().catch(t=>console.error(t)),Ge().catch(t=>console.error(t)),Pe().catch(t=>console.error(t)),Ee().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");let B;function Oe(){B!==void 0&&(B.close(),B=void 0)}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.area.onEnter("clock").subscribe(()=>{const t=new Date,e=t.getHours()+":"+t.getMinutes();B=WA.ui.openPopup("clockPopup","It's "+e,[])}),WA.room.area.onLeave("clock").subscribe(Oe),WA.room.onEnterLayer("terminalAktion").subscribe(async()=>{console.log("Entering terminalAktion layer"),WA.ui.modal.openModal({title:"Hauptmenue",src:"./menue.html",allow:"fullscreen",allowApi:!0,position:"center"})}),WA.room.onEnterLayer("buecherAktion").subscribe(async()=>{console.log("Entering buecherAktion layer"),WA.ui.modal.openModal({title:"Bibliothek",src:"./bibliothek.html",allow:"fullscreen",allowApi:!0,position:"center"})}),WA.room.onEnterLayer("aktionFlyer").subscribe(async()=>{console.log("Entering aktionFlyer layer"),WA.room.showLayer("magentaFlyer")}),WA.room.onLeaveLayer("aktionFlyer").subscribe(async()=>{console.log("Leaving aktionFlyer layer"),WA.room.hideLayer("magentaFlyer")}),WA.room.area.onEnter("feldTasteFlyer").subscribe(()=>{const t=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um den Flyer zu sehen",callback:()=>{WA.ui.modal.openModal({title:"Flyer",src:"./flyer_party.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("feldTasteFlyer").subscribe(()=>{t.remove()})}),WA.room.area.onEnter("feldTasteApi").subscribe(()=>{const t=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Oracle Java API zu öffnen",callback:()=>{WA.ui.modal.openModal({title:"Oracle Java API",src:"https://docs.oracle.com/en/java/javase/11/docs/api/",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("feldTasteApi").subscribe(()=>{t.remove()})}),WA.room.area.onEnter("feldTasteHin").subscribe(()=>{const t=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Hinweise zu öffnen",callback:()=>{WA.ui.modal.openModal({title:"Hinweis",src:"./hinweise.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("feldTasteHin").subscribe(()=>{t.remove()})}),WA.room.area.onEnter("feldTastePong").subscribe(()=>{const t=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um PingPong zu spielen",callback:()=>{WA.ui.modal.openModal({title:"PingPong",src:"http://de.pong-2.com/",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("feldTastePong").subscribe(()=>{t.remove()})}),WA.room.area.onEnter("feldAktionEingabe").subscribe(()=>{const t=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Tür zu öffnen",callback:()=>{WA.ui.modal.openModal({title:"Passwort Eingabe",src:"./eingabeTest.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("feldAktionEingabe").subscribe(()=>{t.remove()})}),De().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(t=>console.error(t));
//# sourceMappingURL=main-d7f921bf.js.map
