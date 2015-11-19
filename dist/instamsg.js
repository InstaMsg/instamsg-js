/* SockJS client, version 0.3.4, http://sockjs.org, MIT License

Copyright (c) 2011-2012 VMware, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// JSON2 by Douglas Crockford (minified).
var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()

SockJS=function(){var a=document,b=window,c={},d=function(){};d.prototype.addEventListener=function(a,b){this._listeners||(this._listeners={}),a in this._listeners||(this._listeners[a]=[]);var d=this._listeners[a];c.arrIndexOf(d,b)===-1&&d.push(b);return},d.prototype.removeEventListener=function(a,b){if(!(this._listeners&&a in this._listeners))return;var d=this._listeners[a],e=c.arrIndexOf(d,b);if(e!==-1){d.length>1?this._listeners[a]=d.slice(0,e).concat(d.slice(e+1)):delete this._listeners[a];return}return},d.prototype.dispatchEvent=function(a){var b=a.type,c=Array.prototype.slice.call(arguments,0);this["on"+b]&&this["on"+b].apply(this,c);if(this._listeners&&b in this._listeners)for(var d=0;d<this._listeners[b].length;d++)this._listeners[b][d].apply(this,c)};var e=function(a,b){this.type=a;if(typeof b!="undefined")for(var c in b){if(!b.hasOwnProperty(c))continue;this[c]=b[c]}};e.prototype.toString=function(){var a=[];for(var b in this){if(!this.hasOwnProperty(b))continue;var c=this[b];typeof c=="function"&&(c="[function]"),a.push(b+"="+c)}return"SimpleEvent("+a.join(", ")+")"};var f=function(a){var b=this;b._events=a||[],b._listeners={}};f.prototype.emit=function(a){var b=this;b._verifyType(a);if(b._nuked)return;var c=Array.prototype.slice.call(arguments,1);b["on"+a]&&b["on"+a].apply(b,c);if(a in b._listeners)for(var d=0;d<b._listeners[a].length;d++)b._listeners[a][d].apply(b,c)},f.prototype.on=function(a,b){var c=this;c._verifyType(a);if(c._nuked)return;a in c._listeners||(c._listeners[a]=[]),c._listeners[a].push(b)},f.prototype._verifyType=function(a){var b=this;c.arrIndexOf(b._events,a)===-1&&c.log("Event "+JSON.stringify(a)+" not listed "+JSON.stringify(b._events)+" in "+b)},f.prototype.nuke=function(){var a=this;a._nuked=!0;for(var b=0;b<a._events.length;b++)delete a[a._events[b]];a._listeners={}};var g="abcdefghijklmnopqrstuvwxyz0123456789_";c.random_string=function(a,b){b=b||g.length;var c,d=[];for(c=0;c<a;c++)d.push(g.substr(Math.floor(Math.random()*b),1));return d.join("")},c.random_number=function(a){return Math.floor(Math.random()*a)},c.random_number_string=function(a){var b=(""+(a-1)).length,d=Array(b+1).join("0");return(d+c.random_number(a)).slice(-b)},c.getOrigin=function(a){a+="/";var b=a.split("/").slice(0,3);return b.join("/")},c.isSameOriginUrl=function(a,c){return c||(c=b.location.href),a.split("/").slice(0,3).join("/")===c.split("/").slice(0,3).join("/")},c.getParentDomain=function(a){if(/^[0-9.]*$/.test(a))return a;if(/^\[/.test(a))return a;if(!/[.]/.test(a))return a;var b=a.split(".").slice(1);return b.join(".")},c.objectExtend=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a};var h="_jp";c.polluteGlobalNamespace=function(){h in b||(b[h]={})},c.closeFrame=function(a,b){return"c"+JSON.stringify([a,b])},c.userSetCode=function(a){return a===1e3||a>=3e3&&a<=4999},c.countRTO=function(a){var b;return a>100?b=3*a:b=a+200,b},c.log=function(){b.console&&console.log&&console.log.apply&&console.log.apply(console,arguments)},c.bind=function(a,b){return a.bind?a.bind(b):function(){return a.apply(b,arguments)}},c.flatUrl=function(a){return a.indexOf("?")===-1&&a.indexOf("#")===-1},c.amendUrl=function(b){var d=a.location;if(!b)throw new Error("Wrong url for SockJS");if(!c.flatUrl(b))throw new Error("Only basic urls are supported in SockJS");return b.indexOf("//")===0&&(b=d.protocol+b),b.indexOf("/")===0&&(b=d.protocol+"//"+d.host+b),b=b.replace(/[/]+$/,""),b},c.arrIndexOf=function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},c.arrSkip=function(a,b){var d=c.arrIndexOf(a,b);if(d===-1)return a.slice();var e=a.slice(0,d);return e.concat(a.slice(d+1))},c.isArray=Array.isArray||function(a){return{}.toString.call(a).indexOf("Array")>=0},c.delay=function(a,b){return typeof a=="function"&&(b=a,a=0),setTimeout(b,a)};var i=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,j={"\0":"\\u0000","\x01":"\\u0001","\x02":"\\u0002","\x03":"\\u0003","\x04":"\\u0004","\x05":"\\u0005","\x06":"\\u0006","\x07":"\\u0007","\b":"\\b","\t":"\\t","\n":"\\n","\x0b":"\\u000b","\f":"\\f","\r":"\\r","\x0e":"\\u000e","\x0f":"\\u000f","\x10":"\\u0010","\x11":"\\u0011","\x12":"\\u0012","\x13":"\\u0013","\x14":"\\u0014","\x15":"\\u0015","\x16":"\\u0016","\x17":"\\u0017","\x18":"\\u0018","\x19":"\\u0019","\x1a":"\\u001a","\x1b":"\\u001b","\x1c":"\\u001c","\x1d":"\\u001d","\x1e":"\\u001e","\x1f":"\\u001f",'"':'\\"',"\\":"\\\\","\x7f":"\\u007f","\x80":"\\u0080","\x81":"\\u0081","\x82":"\\u0082","\x83":"\\u0083","\x84":"\\u0084","\x85":"\\u0085","\x86":"\\u0086","\x87":"\\u0087","\x88":"\\u0088","\x89":"\\u0089","\x8a":"\\u008a","\x8b":"\\u008b","\x8c":"\\u008c","\x8d":"\\u008d","\x8e":"\\u008e","\x8f":"\\u008f","\x90":"\\u0090","\x91":"\\u0091","\x92":"\\u0092","\x93":"\\u0093","\x94":"\\u0094","\x95":"\\u0095","\x96":"\\u0096","\x97":"\\u0097","\x98":"\\u0098","\x99":"\\u0099","\x9a":"\\u009a","\x9b":"\\u009b","\x9c":"\\u009c","\x9d":"\\u009d","\x9e":"\\u009e","\x9f":"\\u009f","\xad":"\\u00ad","\u0600":"\\u0600","\u0601":"\\u0601","\u0602":"\\u0602","\u0603":"\\u0603","\u0604":"\\u0604","\u070f":"\\u070f","\u17b4":"\\u17b4","\u17b5":"\\u17b5","\u200c":"\\u200c","\u200d":"\\u200d","\u200e":"\\u200e","\u200f":"\\u200f","\u2028":"\\u2028","\u2029":"\\u2029","\u202a":"\\u202a","\u202b":"\\u202b","\u202c":"\\u202c","\u202d":"\\u202d","\u202e":"\\u202e","\u202f":"\\u202f","\u2060":"\\u2060","\u2061":"\\u2061","\u2062":"\\u2062","\u2063":"\\u2063","\u2064":"\\u2064","\u2065":"\\u2065","\u2066":"\\u2066","\u2067":"\\u2067","\u2068":"\\u2068","\u2069":"\\u2069","\u206a":"\\u206a","\u206b":"\\u206b","\u206c":"\\u206c","\u206d":"\\u206d","\u206e":"\\u206e","\u206f":"\\u206f","\ufeff":"\\ufeff","\ufff0":"\\ufff0","\ufff1":"\\ufff1","\ufff2":"\\ufff2","\ufff3":"\\ufff3","\ufff4":"\\ufff4","\ufff5":"\\ufff5","\ufff6":"\\ufff6","\ufff7":"\\ufff7","\ufff8":"\\ufff8","\ufff9":"\\ufff9","\ufffa":"\\ufffa","\ufffb":"\\ufffb","\ufffc":"\\ufffc","\ufffd":"\\ufffd","\ufffe":"\\ufffe","\uffff":"\\uffff"},k=/[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,l,m=JSON&&JSON.stringify||function(a){return i.lastIndex=0,i.test(a)&&(a=a.replace(i,function(a){return j[a]})),'"'+a+'"'},n=function(a){var b,c={},d=[];for(b=0;b<65536;b++)d.push(String.fromCharCode(b));return a.lastIndex=0,d.join("").replace(a,function(a){return c[a]="\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4),""}),a.lastIndex=0,c};c.quote=function(a){var b=m(a);return k.lastIndex=0,k.test(b)?(l||(l=n(k)),b.replace(k,function(a){return l[a]})):b};var o=["websocket","xdr-streaming","xhr-streaming","iframe-eventsource","iframe-htmlfile","xdr-polling","xhr-polling","iframe-xhr-polling","jsonp-polling"];c.probeProtocols=function(){var a={};for(var b=0;b<o.length;b++){var c=o[b];a[c]=y[c]&&y[c].enabled()}return a},c.detectProtocols=function(a,b,c){var d={},e=[];b||(b=o);for(var f=0;f<b.length;f++){var g=b[f];d[g]=a[g]}var h=function(a){var b=a.shift();d[b]?e.push(b):a.length>0&&h(a)};return c.websocket!==!1&&h(["websocket"]),d["xhr-streaming"]&&!c.null_origin?e.push("xhr-streaming"):d["xdr-streaming"]&&!c.cookie_needed&&!c.null_origin?e.push("xdr-streaming"):h(["iframe-eventsource","iframe-htmlfile"]),d["xhr-polling"]&&!c.null_origin?e.push("xhr-polling"):d["xdr-polling"]&&!c.cookie_needed&&!c.null_origin?e.push("xdr-polling"):h(["iframe-xhr-polling","jsonp-polling"]),e};var p="_sockjs_global";c.createHook=function(){var a="a"+c.random_string(8);if(!(p in b)){var d={};b[p]=function(a){return a in d||(d[a]={id:a,del:function(){delete d[a]}}),d[a]}}return b[p](a)},c.attachMessage=function(a){c.attachEvent("message",a)},c.attachEvent=function(c,d){typeof b.addEventListener!="undefined"?b.addEventListener(c,d,!1):(a.attachEvent("on"+c,d),b.attachEvent("on"+c,d))},c.detachMessage=function(a){c.detachEvent("message",a)},c.detachEvent=function(c,d){typeof b.addEventListener!="undefined"?b.removeEventListener(c,d,!1):(a.detachEvent("on"+c,d),b.detachEvent("on"+c,d))};var q={},r=!1,s=function(){for(var a in q)q[a](),delete q[a]},t=function(){if(r)return;r=!0,s()};c.attachEvent("unload",t),c.unload_add=function(a){var b=c.random_string(8);return q[b]=a,r&&c.delay(s),b},c.unload_del=function(a){a in q&&delete q[a]},c.createIframe=function(b,d){var e=a.createElement("iframe"),f,g,h=function(){clearTimeout(f);try{e.onload=null}catch(a){}e.onerror=null},i=function(){e&&(h(),setTimeout(function(){e&&e.parentNode.removeChild(e),e=null},0),c.unload_del(g))},j=function(a){e&&(i(),d(a))},k=function(a,b){try{e&&e.contentWindow&&e.contentWindow.postMessage(a,b)}catch(c){}};return e.src=b,e.style.display="none",e.style.position="absolute",e.onerror=function(){j("onerror")},e.onload=function(){clearTimeout(f),f=setTimeout(function(){j("onload timeout")},2e3)},a.body.appendChild(e),f=setTimeout(function(){j("timeout")},15e3),g=c.unload_add(i),{post:k,cleanup:i,loaded:h}},c.createHtmlfile=function(a,d){var e=new ActiveXObject("htmlfile"),f,g,i,j=function(){clearTimeout(f)},k=function(){e&&(j(),c.unload_del(g),i.parentNode.removeChild(i),i=e=null,CollectGarbage())},l=function(a){e&&(k(),d(a))},m=function(a,b){try{i&&i.contentWindow&&i.contentWindow.postMessage(a,b)}catch(c){}};e.open(),e.write('<html><script>document.domain="'+document.domain+'";'+"</s"+"cript></html>"),e.close(),e.parentWindow[h]=b[h];var n=e.createElement("div");return e.body.appendChild(n),i=e.createElement("iframe"),n.appendChild(i),i.src=a,f=setTimeout(function(){l("timeout")},15e3),g=c.unload_add(k),{post:m,cleanup:k,loaded:j}};var u=function(){};u.prototype=new f(["chunk","finish"]),u.prototype._start=function(a,d,e,f){var g=this;try{g.xhr=new XMLHttpRequest}catch(h){}if(!g.xhr)try{g.xhr=new b.ActiveXObject("Microsoft.XMLHTTP")}catch(h){}if(b.ActiveXObject||b.XDomainRequest)d+=(d.indexOf("?")===-1?"?":"&")+"t="+ +(new Date);g.unload_ref=c.unload_add(function(){g._cleanup(!0)});try{g.xhr.open(a,d,!0)}catch(i){g.emit("finish",0,""),g._cleanup();return}if(!f||!f.no_credentials)g.xhr.withCredentials="true";if(f&&f.headers)for(var j in f.headers)g.xhr.setRequestHeader(j,f.headers[j]);g.xhr.onreadystatechange=function(){if(g.xhr){var a=g.xhr;switch(a.readyState){case 3:try{var b=a.status,c=a.responseText}catch(a){}b===1223&&(b=204),c&&c.length>0&&g.emit("chunk",b,c);break;case 4:var b=a.status;b===1223&&(b=204),g.emit("finish",b,a.responseText),g._cleanup(!1)}}},g.xhr.send(e)},u.prototype._cleanup=function(a){var b=this;if(!b.xhr)return;c.unload_del(b.unload_ref),b.xhr.onreadystatechange=function(){};if(a)try{b.xhr.abort()}catch(d){}b.unload_ref=b.xhr=null},u.prototype.close=function(){var a=this;a.nuke(),a._cleanup(!0)};var v=c.XHRCorsObject=function(){var a=this,b=arguments;c.delay(function(){a._start.apply(a,b)})};v.prototype=new u;var w=c.XHRLocalObject=function(a,b,d){var e=this;c.delay(function(){e._start(a,b,d,{no_credentials:!0})})};w.prototype=new u;var x=c.XDRObject=function(a,b,d){var e=this;c.delay(function(){e._start(a,b,d)})};x.prototype=new f(["chunk","finish"]),x.prototype._start=function(a,b,d){var e=this,f=new XDomainRequest;b+=(b.indexOf("?")===-1?"?":"&")+"t="+ +(new Date);var g=f.ontimeout=f.onerror=function(){e.emit("finish",0,""),e._cleanup(!1)};f.onprogress=function(){e.emit("chunk",200,f.responseText)},f.onload=function(){e.emit("finish",200,f.responseText),e._cleanup(!1)},e.xdr=f,e.unload_ref=c.unload_add(function(){e._cleanup(!0)});try{e.xdr.open(a,b),e.xdr.send(d)}catch(h){g()}},x.prototype._cleanup=function(a){var b=this;if(!b.xdr)return;c.unload_del(b.unload_ref),b.xdr.ontimeout=b.xdr.onerror=b.xdr.onprogress=b.xdr.onload=null;if(a)try{b.xdr.abort()}catch(d){}b.unload_ref=b.xdr=null},x.prototype.close=function(){var a=this;a.nuke(),a._cleanup(!0)},c.isXHRCorsCapable=function(){return b.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?1:b.XDomainRequest&&a.domain?2:L.enabled()?3:4};var y=function(a,d,e){if(this===b)return new y(a,d,e);var f=this,g;f._options={devel:!1,debug:!1,protocols_whitelist:[],info:undefined,rtt:undefined},e&&c.objectExtend(f._options,e),f._base_url=c.amendUrl(a),f._server=f._options.server||c.random_number_string(1e3),f._options.protocols_whitelist&&f._options.protocols_whitelist.length?g=f._options.protocols_whitelist:(typeof d=="string"&&d.length>0?g=[d]:c.isArray(d)?g=d:g=null,g&&f._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')),f._protocols=[],f.protocol=null,f.readyState=y.CONNECTING,f._ir=S(f._base_url),f._ir.onfinish=function(a,b){f._ir=null,a?(f._options.info&&(a=c.objectExtend(a,f._options.info)),f._options.rtt&&(b=f._options.rtt),f._applyInfo(a,b,g),f._didClose()):f._didClose(1002,"Can't connect to server",!0)}};y.prototype=new d,y.version="0.3.4",y.CONNECTING=0,y.OPEN=1,y.CLOSING=2,y.CLOSED=3,y.prototype._debug=function(){this._options.debug&&c.log.apply(c,arguments)},y.prototype._dispatchOpen=function(){var a=this;a.readyState===y.CONNECTING?(a._transport_tref&&(clearTimeout(a._transport_tref),a._transport_tref=null),a.readyState=y.OPEN,a.dispatchEvent(new e("open"))):a._didClose(1006,"Server lost session")},y.prototype._dispatchMessage=function(a){var b=this;if(b.readyState!==y.OPEN)return;b.dispatchEvent(new e("message",{data:a}))},y.prototype._dispatchHeartbeat=function(a){var b=this;if(b.readyState!==y.OPEN)return;b.dispatchEvent(new e("heartbeat",{}))},y.prototype._didClose=function(a,b,d){var f=this;if(f.readyState!==y.CONNECTING&&f.readyState!==y.OPEN&&f.readyState!==y.CLOSING)throw new Error("INVALID_STATE_ERR");f._ir&&(f._ir.nuke(),f._ir=null),f._transport&&(f._transport.doCleanup(),f._transport=null);var g=new e("close",{code:a,reason:b,wasClean:c.userSetCode(a)});if(!c.userSetCode(a)&&f.readyState===y.CONNECTING&&!d){if(f._try_next_protocol(g))return;g=new e("close",{code:2e3,reason:"All transports failed",wasClean:!1,last_event:g})}f.readyState=y.CLOSED,c.delay(function(){f.dispatchEvent(g)})},y.prototype._didMessage=function(a){var b=this,c=a.slice(0,1);switch(c){case"o":b._dispatchOpen();break;case"a":var d=JSON.parse(a.slice(1)||"[]");for(var e=0;e<d.length;e++)b._dispatchMessage(d[e]);break;case"m":var d=JSON.parse(a.slice(1)||"null");b._dispatchMessage(d);break;case"c":var d=JSON.parse(a.slice(1)||"[]");b._didClose(d[0],d[1]);break;case"h":b._dispatchHeartbeat()}},y.prototype._try_next_protocol=function(b){var d=this;d.protocol&&(d._debug("Closed transport:",d.protocol,""+b),d.protocol=null),d._transport_tref&&(clearTimeout(d._transport_tref),d._transport_tref=null);for(;;){var e=d.protocol=d._protocols.shift();if(!e)return!1;if(y[e]&&y[e].need_body===!0&&(!a.body||typeof a.readyState!="undefined"&&a.readyState!=="complete"))return d._protocols.unshift(e),d.protocol="waiting-for-load",c.attachEvent("load",function(){d._try_next_protocol()}),!0;if(!!y[e]&&!!y[e].enabled(d._options)){var f=y[e].roundTrips||1,g=(d._options.rto||0)*f||5e3;d._transport_tref=c.delay(g,function(){d.readyState===y.CONNECTING&&d._didClose(2007,"Transport timeouted")});var h=c.random_string(8),i=d._base_url+"/"+d._server+"/"+h;return d._debug("Opening transport:",e," url:"+i," RTO:"+d._options.rto),d._transport=new y[e](d,i,d._base_url),!0}d._debug("Skipping transport:",e)}},y.prototype.close=function(a,b){var d=this;if(a&&!c.userSetCode(a))throw new Error("INVALID_ACCESS_ERR");return d.readyState!==y.CONNECTING&&d.readyState!==y.OPEN?!1:(d.readyState=y.CLOSING,d._didClose(a||1e3,b||"Normal closure"),!0)},y.prototype.send=function(a){var b=this;if(b.readyState===y.CONNECTING)throw new Error("INVALID_STATE_ERR");return b.readyState===y.OPEN&&b._transport.doSend(c.quote(""+a)),!0},y.prototype._applyInfo=function(b,d,e){var f=this;f._options.info=b,f._options.rtt=d,f._options.rto=c.countRTO(d),f._options.info.null_origin=!a.domain;var g=c.probeProtocols();f._protocols=c.detectProtocols(g,e,b)};var z=y.websocket=function(a,d){var e=this,f=d+"/websocket";f.slice(0,5)==="https"?f="wss"+f.slice(5):f="ws"+f.slice(4),e.ri=a,e.url=f;var g=b.WebSocket||b.MozWebSocket;e.ws=new g(e.url),e.ws.onmessage=function(a){e.ri._didMessage(a.data)},e.unload_ref=c.unload_add(function(){e.ws.close()}),e.ws.onclose=function(){e.ri._didMessage(c.closeFrame(1006,"WebSocket connection broken"))}};z.prototype.doSend=function(a){this.ws.send("["+a+"]")},z.prototype.doCleanup=function(){var a=this,b=a.ws;b&&(b.onmessage=b.onclose=null,b.close(),c.unload_del(a.unload_ref),a.unload_ref=a.ri=a.ws=null)},z.enabled=function(){return!!b.WebSocket||!!b.MozWebSocket},z.roundTrips=2;var A=function(){};A.prototype.send_constructor=function(a){var b=this;b.send_buffer=[],b.sender=a},A.prototype.doSend=function(a){var b=this;b.send_buffer.push(a),b.send_stop||b.send_schedule()},A.prototype.send_schedule_wait=function(){var a=this,b;a.send_stop=function(){a.send_stop=null,clearTimeout(b)},b=c.delay(25,function(){a.send_stop=null,a.send_schedule()})},A.prototype.send_schedule=function(){var a=this;if(a.send_buffer.length>0){var b="["+a.send_buffer.join(",")+"]";a.send_stop=a.sender(a.trans_url,b,function(b,c){a.send_stop=null,b===!1?a.ri._didClose(1006,"Sending error "+c):a.send_schedule_wait()}),a.send_buffer=[]}},A.prototype.send_destructor=function(){var a=this;a._send_stop&&a._send_stop(),a._send_stop=null};var B=function(b,d,e){var f=this;if(!("_send_form"in f)){var g=f._send_form=a.createElement("form"),h=f._send_area=a.createElement("textarea");h.name="d",g.style.display="none",g.style.position="absolute",g.method="POST",g.enctype="application/x-www-form-urlencoded",g.acceptCharset="UTF-8",g.appendChild(h),a.body.appendChild(g)}var g=f._send_form,h=f._send_area,i="a"+c.random_string(8);g.target=i,g.action=b+"/jsonp_send?i="+i;var j;try{j=a.createElement('<iframe name="'+i+'">')}catch(k){j=a.createElement("iframe"),j.name=i}j.id=i,g.appendChild(j),j.style.display="none";try{h.value=d}catch(l){c.log("Your browser is seriously broken. Go home! "+l.message)}g.submit();var m=function(a){if(!j.onerror)return;j.onreadystatechange=j.onerror=j.onload=null,c.delay(500,function(){j.parentNode.removeChild(j),j=null}),h.value="",e(!0)};return j.onerror=j.onload=m,j.onreadystatechange=function(a){j.readyState=="complete"&&m()},m},C=function(a){return function(b,c,d){var e=new a("POST",b+"/xhr_send",c);return e.onfinish=function(a,b){d(a===200||a===204,"http status "+a)},function(a){d(!1,a)}}},D=function(b,d){var e,f=a.createElement("script"),g,h=function(a){g&&(g.parentNode.removeChild(g),g=null),f&&(clearTimeout(e),f.parentNode.removeChild(f),f.onreadystatechange=f.onerror=f.onload=f.onclick=null,f=null,d(a),d=null)},i=!1,j=null;f.id="a"+c.random_string(8),f.src=b,f.type="text/javascript",f.charset="UTF-8",f.onerror=function(a){j||(j=setTimeout(function(){i||h(c.closeFrame(1006,"JSONP script loaded abnormally (onerror)"))},1e3))},f.onload=function(a){h(c.closeFrame(1006,"JSONP script loaded abnormally (onload)"))},f.onreadystatechange=function(a){if(/loaded|closed/.test(f.readyState)){if(f&&f.htmlFor&&f.onclick){i=!0;try{f.onclick()}catch(b){}}f&&h(c.closeFrame(1006,"JSONP script loaded abnormally (onreadystatechange)"))}};if(typeof f.async=="undefined"&&a.attachEvent)if(!/opera/i.test(navigator.userAgent)){try{f.htmlFor=f.id,f.event="onclick"}catch(k){}f.async=!0}else g=a.createElement("script"),g.text="try{var a = document.getElementById('"+f.id+"'); if(a)a.onerror();}catch(x){};",f.async=g.async=!1;typeof f.async!="undefined"&&(f.async=!0),e=setTimeout(function(){h(c.closeFrame(1006,"JSONP script loaded abnormally (timeout)"))},35e3);var l=a.getElementsByTagName("head")[0];return l.insertBefore(f,l.firstChild),g&&l.insertBefore(g,l.firstChild),h},E=y["jsonp-polling"]=function(a,b){c.polluteGlobalNamespace();var d=this;d.ri=a,d.trans_url=b,d.send_constructor(B),d._schedule_recv()};E.prototype=new A,E.prototype._schedule_recv=function(){var a=this,b=function(b){a._recv_stop=null,b&&(a._is_closing||a.ri._didMessage(b)),a._is_closing||a._schedule_recv()};a._recv_stop=F(a.trans_url+"/jsonp",D,b)},E.enabled=function(){return!0},E.need_body=!0,E.prototype.doCleanup=function(){var a=this;a._is_closing=!0,a._recv_stop&&a._recv_stop(),a.ri=a._recv_stop=null,a.send_destructor()};var F=function(a,d,e){var f="a"+c.random_string(6),g=a+"?c="+escape(h+"."+f),i=0,j=function(a){switch(i){case 0:delete b[h][f],e(a);break;case 1:e(a),i=2;break;case 2:delete b[h][f]}},k=d(g,j);b[h][f]=k;var l=function(){b[h][f]&&(i=1,b[h][f](c.closeFrame(1e3,"JSONP user aborted read")))};return l},G=function(){};G.prototype=new A,G.prototype.run=function(a,b,c,d,e){var f=this;f.ri=a,f.trans_url=b,f.send_constructor(C(e)),f.poll=new $(a,d,b+c,e)},G.prototype.doCleanup=function(){var a=this;a.poll&&(a.poll.abort(),a.poll=null)};var H=y["xhr-streaming"]=function(a,b){this.run(a,b,"/xhr_streaming",bd,c.XHRCorsObject)};H.prototype=new G,H.enabled=function(){return b.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest&&!/opera/i.test(navigator.userAgent)},H.roundTrips=2,H.need_body=!0;var I=y["xdr-streaming"]=function(a,b){this.run(a,b,"/xhr_streaming",bd,c.XDRObject)};I.prototype=new G,I.enabled=function(){return!!b.XDomainRequest},I.roundTrips=2;var J=y["xhr-polling"]=function(a,b){this.run(a,b,"/xhr",bd,c.XHRCorsObject)};J.prototype=new G,J.enabled=H.enabled,J.roundTrips=2;var K=y["xdr-polling"]=function(a,b){this.run(a,b,"/xhr",bd,c.XDRObject)};K.prototype=new G,K.enabled=I.enabled,K.roundTrips=2;var L=function(){};L.prototype.i_constructor=function(a,b,d){var e=this;e.ri=a,e.origin=c.getOrigin(d),e.base_url=d,e.trans_url=b;var f=d+"/iframe.html";e.ri._options.devel&&(f+="?t="+ +(new Date)),e.window_id=c.random_string(8),f+="#"+e.window_id,e.iframeObj=c.createIframe(f,function(a){e.ri._didClose(1006,"Unable to load an iframe ("+a+")")}),e.onmessage_cb=c.bind(e.onmessage,e),c.attachMessage(e.onmessage_cb)},L.prototype.doCleanup=function(){var a=this;if(a.iframeObj){c.detachMessage(a.onmessage_cb);try{a.iframeObj.iframe.contentWindow&&a.postMessage("c")}catch(b){}a.iframeObj.cleanup(),a.iframeObj=null,a.onmessage_cb=a.iframeObj=null}},L.prototype.onmessage=function(a){var b=this;if(a.origin!==b.origin)return;var c=a.data.slice(0,8),d=a.data.slice(8,9),e=a.data.slice(9);if(c!==b.window_id)return;switch(d){case"s":b.iframeObj.loaded(),b.postMessage("s",JSON.stringify([y.version,b.protocol,b.trans_url,b.base_url]));break;case"t":b.ri._didMessage(e)}},L.prototype.postMessage=function(a,b){var c=this;c.iframeObj.post(c.window_id+a+(b||""),c.origin)},L.prototype.doSend=function(a){this.postMessage("m",a)},L.enabled=function(){var a=navigator&&navigator.userAgent&&navigator.userAgent.indexOf("Konqueror")!==-1;return(typeof b.postMessage=="function"||typeof b.postMessage=="object")&&!a};var M,N=function(a,d){parent!==b?parent.postMessage(M+a+(d||""),"*"):c.log("Can't postMessage, no parent window.",a,d)},O=function(){};O.prototype._didClose=function(a,b){N("t",c.closeFrame(a,b))},O.prototype._didMessage=function(a){N("t",a)},O.prototype._doSend=function(a){this._transport.doSend(a)},O.prototype._doCleanup=function(){this._transport.doCleanup()},c.parent_origin=undefined,y.bootstrap_iframe=function(){var d;M=a.location.hash.slice(1);var e=function(a){if(a.source!==parent)return;typeof c.parent_origin=="undefined"&&(c.parent_origin=a.origin);if(a.origin!==c.parent_origin)return;var e=a.data.slice(0,8),f=a.data.slice(8,9),g=a.data.slice(9);if(e!==M)return;switch(f){case"s":var h=JSON.parse(g),i=h[0],j=h[1],k=h[2],l=h[3];i!==y.version&&c.log('Incompatibile SockJS! Main site uses: "'+i+'", the iframe:'+' "'+y.version+'".');if(!c.flatUrl(k)||!c.flatUrl(l)){c.log("Only basic urls are supported in SockJS");return}if(!c.isSameOriginUrl(k)||!c.isSameOriginUrl(l)){c.log("Can't connect to different domain from within an iframe. ("+JSON.stringify([b.location.href,k,l])+")");return}d=new O,d._transport=new O[j](d,k,l);break;case"m":d._doSend(g);break;case"c":d&&d._doCleanup(),d=null}};c.attachMessage(e),N("s")};var P=function(a,b){var d=this;c.delay(function(){d.doXhr(a,b)})};P.prototype=new f(["finish"]),P.prototype.doXhr=function(a,b){var d=this,e=(new Date).getTime(),f=new b("GET",a+"/info"),g=c.delay(8e3,function(){f.ontimeout()});f.onfinish=function(a,b){clearTimeout(g),g=null;if(a===200){var c=(new Date).getTime()-e,f=JSON.parse(b);typeof f!="object"&&(f={}),d.emit("finish",f,c)}else d.emit("finish")},f.ontimeout=function(){f.close(),d.emit("finish")}};var Q=function(b){var d=this,e=function(){var a=new L;a.protocol="w-iframe-info-receiver";var c=function(b){if(typeof b=="string"&&b.substr(0,1)==="m"){var c=JSON.parse(b.substr(1)),e=c[0],f=c[1];d.emit("finish",e,f)}else d.emit("finish");a.doCleanup(),a=null},e={_options:{},_didClose:c,_didMessage:c};a.i_constructor(e,b,b)};a.body?e():c.attachEvent("load",e)};Q.prototype=new f(["finish"]);var R=function(){var a=this;c.delay(function(){a.emit("finish",{},2e3)})};R.prototype=new f(["finish"]);var S=function(a){if(c.isSameOriginUrl(a))return new P(a,c.XHRLocalObject);switch(c.isXHRCorsCapable()){case 1:return new P(a,c.XHRLocalObject);case 2:return new P(a,c.XDRObject);case 3:return new Q(a);default:return new R}},T=O["w-iframe-info-receiver"]=function(a,b,d){var e=new P(d,c.XHRLocalObject);e.onfinish=function(b,c){a._didMessage("m"+JSON.stringify([b,c])),a._didClose()}};T.prototype.doCleanup=function(){};var U=y["iframe-eventsource"]=function(){var a=this;a.protocol="w-iframe-eventsource",a.i_constructor.apply(a,arguments)};U.prototype=new L,U.enabled=function(){return"EventSource"in b&&L.enabled()},U.need_body=!0,U.roundTrips=3;var V=O["w-iframe-eventsource"]=function(a,b){this.run(a,b,"/eventsource",_,c.XHRLocalObject)};V.prototype=new G;var W=y["iframe-xhr-polling"]=function(){var a=this;a.protocol="w-iframe-xhr-polling",a.i_constructor.apply(a,arguments)};W.prototype=new L,W.enabled=function(){return b.XMLHttpRequest&&L.enabled()},W.need_body=!0,W.roundTrips=3;var X=O["w-iframe-xhr-polling"]=function(a,b){this.run(a,b,"/xhr",bd,c.XHRLocalObject)};X.prototype=new G;var Y=y["iframe-htmlfile"]=function(){var a=this;a.protocol="w-iframe-htmlfile",a.i_constructor.apply(a,arguments)};Y.prototype=new L,Y.enabled=function(){return L.enabled()},Y.need_body=!0,Y.roundTrips=3;var Z=O["w-iframe-htmlfile"]=function(a,b){this.run(a,b,"/htmlfile",bc,c.XHRLocalObject)};Z.prototype=new G;var $=function(a,b,c,d){var e=this;e.ri=a,e.Receiver=b,e.recv_url=c,e.AjaxObject=d,e._scheduleRecv()};$.prototype._scheduleRecv=function(){var a=this,b=a.poll=new a.Receiver(a.recv_url,a.AjaxObject),c=0;b.onmessage=function(b){c+=1,a.ri._didMessage(b.data)},b.onclose=function(c){a.poll=b=b.onmessage=b.onclose=null,a.poll_is_closing||(c.reason==="permanent"?a.ri._didClose(1006,"Polling error ("+c.reason+")"):a._scheduleRecv())}},$.prototype.abort=function(){var a=this;a.poll_is_closing=!0,a.poll&&a.poll.abort()};var _=function(a){var b=this,d=new EventSource(a);d.onmessage=function(a){b.dispatchEvent(new e("message",{data:unescape(a.data)}))},b.es_close=d.onerror=function(a,f){var g=f?"user":d.readyState!==2?"network":"permanent";b.es_close=d.onmessage=d.onerror=null,d.close(),d=null,c.delay(200,function(){b.dispatchEvent(new e("close",{reason:g}))})}};_.prototype=new d,_.prototype.abort=function(){var a=this;a.es_close&&a.es_close({},!0)};var ba,bb=function(){if(ba===undefined)if("ActiveXObject"in b)try{ba=!!(new ActiveXObject("htmlfile"))}catch(a){}else ba=!1;return ba},bc=function(a){var d=this;c.polluteGlobalNamespace(),d.id="a"+c.random_string(6,26),a+=(a.indexOf("?")===-1?"?":"&")+"c="+escape(h+"."+d.id);var f=bb()?c.createHtmlfile:c.createIframe,g;b[h][d.id]={start:function(){g.loaded()},message:function(a){d.dispatchEvent(new e("message",{data:a}))},stop:function(){d.iframe_close({},"network")}},d.iframe_close=function(a,c){g.cleanup(),d.iframe_close=g=null,delete b[h][d.id],d.dispatchEvent(new e("close",{reason:c}))},g=f(a,function(a){d.iframe_close({},"permanent")})};bc.prototype=new d,bc.prototype.abort=function(){var a=this;a.iframe_close&&a.iframe_close({},"user")};var bd=function(a,b){var c=this,d=0;c.xo=new b("POST",a,null),c.xo.onchunk=function(a,b){if(a!==200)return;for(;;){var f=b.slice(d),g=f.indexOf("\n");if(g===-1)break;d+=g+1;var h=f.slice(0,g);c.dispatchEvent(new e("message",{data:h}))}},c.xo.onfinish=function(a,b){c.xo.onchunk(a,b),c.xo=null;var d=a===200?"network":"permanent";c.dispatchEvent(new e("close",{reason:d}))}};return bd.prototype=new d,bd.prototype.abort=function(){var a=this;a.xo&&(a.xo.close(),a.dispatchEvent(new e("close",{reason:"user"})),a.xo=null)},y.getUtils=function(){return c},y.getIframeTransport=function(){return L},y}(),"_sockjs_onload"in window&&setTimeout(_sockjs_onload,1),typeof define=="function"&&define.amd&&define("sockjs",[],function(){return SockJS})

;
/*
* UUID-js: A js library to generate and parse UUIDs, TimeUUIDs and generate
* TimeUUID based on dates for range selections.
* @see http://www.ietf.org/rfc/rfc4122.txt
**/

function UUIDjs() {
}

UUIDjs.maxFromBits = function(bits) {
  return Math.pow(2, bits);
};

UUIDjs.limitUI04 = UUIDjs.maxFromBits(4);
UUIDjs.limitUI06 = UUIDjs.maxFromBits(6);
UUIDjs.limitUI08 = UUIDjs.maxFromBits(8);
UUIDjs.limitUI12 = UUIDjs.maxFromBits(12);
UUIDjs.limitUI14 = UUIDjs.maxFromBits(14);
UUIDjs.limitUI16 = UUIDjs.maxFromBits(16);
UUIDjs.limitUI32 = UUIDjs.maxFromBits(32);
UUIDjs.limitUI40 = UUIDjs.maxFromBits(40);
UUIDjs.limitUI48 = UUIDjs.maxFromBits(48);

UUIDjs.randomUI04 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI04);
};
UUIDjs.randomUI06 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI06);
};
UUIDjs.randomUI08 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI08);
};
UUIDjs.randomUI12 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI12);
};
UUIDjs.randomUI14 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI14);
};
UUIDjs.randomUI16 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI16);
};
UUIDjs.randomUI32 = function() {
  return Math.round(Math.random() * UUIDjs.limitUI32);
};
UUIDjs.randomUI40 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 40 - 30)) * (1 << 30);
};
UUIDjs.randomUI48 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 48 - 30)) * (1 << 30);
};

UUIDjs.paddedString = function(string, length, z) {
  string = String(string);
  z = (!z) ? '0' : z;
  var i = length - string.length;
  for (i; i > 0; i >>>= 1, z += z) {
    if (i & 1) {
      string = z + string;
    }
  }
  return string;
};

UUIDjs.prototype.fromParts = function(timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, clockSeqLow, node) {
  this.version = (timeHiAndVersion >> 12) & 0xF;
  this.hex = UUIDjs.paddedString(timeLow.toString(16), 8)
  + '-'
  + UUIDjs.paddedString(timeMid.toString(16), 4)
  + '-'
  + UUIDjs.paddedString(timeHiAndVersion.toString(16), 4)
  + '-'
  + UUIDjs.paddedString(clockSeqHiAndReserved.toString(16), 2)
  + UUIDjs.paddedString(clockSeqLow.toString(16), 2)
  + '-'
  + UUIDjs.paddedString(node.toString(16), 12);
  return this;
};

UUIDjs.prototype.toString = function() {
  return this.hex;
};
UUIDjs.prototype.toURN = function() {
  return 'urn:uuid:' + this.hex;
};

UUIDjs.prototype.toBytes = function() {
  var parts = this.hex.split('-');
  var ints = [];
  var intPos = 0;
  var i = 0;
  for (i; i < parts.length; i++) {
    var j = 0;
    for (j; j < parts[i].length; j+=2) {
      ints[intPos++] = parseInt(parts[i].substr(j, 2), 16);
    }
  }
  return ints;
};

UUIDjs.prototype.equals = function(uuid) {
  if (!(uuid instanceof UUID)) {
    return false;
  }
  if (this.hex !== uuid.hex) {
    return false;
  }
  return true;
};

UUIDjs.getTimeFieldValues = function(time) {
  var ts = time - Date.UTC(1582, 9, 15);
  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
  return { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
    mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
};

UUIDjs._create4 = function() {
  return new UUIDjs().fromParts(
    UUIDjs.randomUI32(),
    UUIDjs.randomUI16(),
    0x4000 | UUIDjs.randomUI12(),
    0x80   | UUIDjs.randomUI06(),
    UUIDjs.randomUI08(),
    UUIDjs.randomUI48()
  );
};

UUIDjs._create1 = function() {
  var now = new Date().getTime();
  var sequence = UUIDjs.randomUI14();
  var node = (UUIDjs.randomUI08() | 1) * 0x10000000000 + UUIDjs.randomUI40();
  var tick = UUIDjs.randomUI04();
  var timestamp = 0;
  var timestampRatio = 1/4;

  if (now !== timestamp) {
    if (now < timestamp) {
      sequence++;
    }
    timestamp = now;
    tick = UUIDjs.randomUI04();
  } else if (Math.random() < timestampRatio && tick < 9984) {
    tick += 1 + UUIDjs.randomUI04();
  } else {
    sequence++;
  }

  var tf = UUIDjs.getTimeFieldValues(timestamp);
  var tl = tf.low + tick;
  var thav = (tf.hi & 0xFFF) | 0x1000;

  sequence &= 0x3FFF;
  var cshar = (sequence >>> 8) | 0x80;
  var csl = sequence & 0xFF;

  return new UUIDjs().fromParts(tl, tf.mid, thav, cshar, csl, node);
};

UUIDjs.create = function(version) {
  version = version || 4;
  return this['_create' + version]();
};

UUIDjs.fromTime = function(time, last) {
  last = (!last) ? false : last;
  var tf = UUIDjs.getTimeFieldValues(time);
  var tl = tf.low;
  var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'
  if (last === false) {
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0, 0, 0);
  }
  return new UUIDjs().fromParts(tl, tf.mid, thav, 0x80 | UUIDjs.limitUI06, UUIDjs.limitUI08 - 1, UUIDjs.limitUI48 - 1);

};

UUIDjs.firstFromTime = function(time) {
  return UUIDjs.fromTime(time, false);
};
UUIDjs.lastFromTime = function(time) {
  return UUIDjs.fromTime(time, true);
};

UUIDjs.fromURN = function(strId) {
  var r, p = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i;
  if ((r === p.exec(strId))) {
    return new UUIDjs().fromParts(parseInt(r[1], 16), parseInt(r[2], 16),
    parseInt(r[3], 16), parseInt(r[4], 16),
    parseInt(r[5], 16), parseInt(r[6], 16));
  }
  return null;
};

UUIDjs.fromBytes = function(ints) {
  var str = '';
  var pos = 0;
  var parts = [4, 2, 2, 2, 6];
  var i = 0;

  if (ints.length < 5) {
    return null;
  }
  for (i; i < parts.length; i++) {
    var j = 0;
    for (j; j < parts[i]; j++) {
      var octet = ints[pos++].toString(16);
      if (octet.length === 1) {
        octet = '0' + octet;
      }
      str += octet;
    }
    if (parts[i] !== 6) {
      str += '-';
    }
  }
  return UUIDjs.fromURN(str);
};

UUIDjs.fromBinary = function(binary) {
  var ints = [];
  var i = 0;
  for (i; i < binary.length; i++) {
    ints[i] = binary.charCodeAt(i);
    if (ints[i] > 255 || ints[i] < 0) {
      throw new Error('Unexpected byte in binary data.');
    }
  }
  return UUIDjs.fromBytes(ints);
};

;
/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/


// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho.MQTT module
// only has a single public function, client, which returns
// a Paho.MQTT client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.MQTT.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.MQTT.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
 client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
 client.onConnectionLost = onConnectionLost;
 client.onMessageArrived = onMessageArrived;
 client.connect({onSuccess:onConnect});

 function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message); 
};
 function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
  console.log("onConnectionLost:"+responseObject.errorMessage);
};
 function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect(); 
};
 * </pre></code>
 * @namespace Paho.MQTT
 */

if (typeof Paho === "undefined") {
  Paho = {};
}

Paho.MQTT = (function (global) {

  // Private variables below, these are only visible inside the function closure
  // which is used to define the module.

  var version = "@VERSION@";
  var buildLevel = "@BUILDLEVEL@";

  /**
   * Unique message type identifiers, with associated
   * associated integer values.
   * @private
   */
  var MESSAGE_TYPE = {
    CONNECT: 1,
    CONNACK: 2,
    PUBLISH: 3,
    PUBACK: 4,
    PUBREC: 5,
    PUBREL: 6,
    PUBCOMP: 7,
    SUBSCRIBE: 8,
    SUBACK: 9,
    UNSUBSCRIBE: 10,
    UNSUBACK: 11,
    PINGREQ: 12,
    PINGRESP: 13,
    DISCONNECT: 14
  };

  // Collection of utility methods used to simplify module code
  // and promote the DRY pattern.

  /**
   * Validate an object's parameter names to ensure they
   * match a list of expected variables name for this option
   * type. Used to ensure option object passed into the API don't
   * contain erroneous parameters.
   * @param {Object} obj - User options object
   * @param {Object} keys - valid keys and types that may exist in obj.
   * @throws {Error} Invalid option parameter found.
   * @private
   */
  var validate = function(obj, keys) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (keys.hasOwnProperty(key)) {
          if (typeof obj[key] !== keys[key])
            throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
        } else {
          var errorStr = "Unknown property, " + key + ". Valid properties are:";
          for (var key in keys)
            if (keys.hasOwnProperty(key))
              errorStr = errorStr+" "+key;
          throw new Error(errorStr);
        }
      }
    }
  };

  /**
   * Return a new function which runs the user function bound
   * to a fixed scope.
   * @param {function} User function
   * @param {object} Function scope
   * @return {function} User function bound to another scope
   * @private
   */
  var scope = function (f, scope) {
    return function () {
      return f.apply(scope, arguments);
    };
  };

  /**
   * Unique message type identifiers, with associated
   * associated integer values.
   * @private
   */
  var ERROR = {
    OK: {code:0, text:"AMQJSC0000I OK."},
    CONNECT_TIMEOUT: {code:1, text:"AMQJSC0001E Connect timed out."},
    SUBSCRIBE_TIMEOUT: {code:2, text:"AMQJS0002E Subscribe timed out."},
    UNSUBSCRIBE_TIMEOUT: {code:3, text:"AMQJS0003E Unsubscribe timed out."},
    PING_TIMEOUT: {code:4, text:"AMQJS0004E Ping timed out."},
    INTERNAL_ERROR: {code:5, text:"AMQJS0005E Internal error."},
    CONNACK_RETURNCODE: {code:6, text:"AMQJS0006E Bad Connack return code:{0} {1}."},
    SOCKET_ERROR: {code:7, text:"AMQJS0007E Socket error:{0}."},
    SOCKET_CLOSE: {code:8, text:"AMQJS0008I Socket closed."},
    MALFORMED_UTF: {code:9, text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},
    UNSUPPORTED: {code:10, text:"AMQJS0010E {0} is not supported by this browser."},
    INVALID_STATE: {code:11, text:"AMQJS0011E Invalid state {0}."},
    INVALID_TYPE: {code:12, text:"AMQJS0012E Invalid type {0} for {1}."},
    INVALID_ARGUMENT: {code:13, text:"AMQJS0013E Invalid argument {0} for {1}."},
    UNSUPPORTED_OPERATION: {code:14, text:"AMQJS0014E Unsupported operation."},
    INVALID_STORED_DATA: {code:15, text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},
    INVALID_MQTT_MESSAGE_TYPE: {code:16, text:"AMQJS0016E Invalid MQTT message type {0}."},
    MALFORMED_UNICODE: {code:17, text:"AMQJS0017E Malformed Unicode string:{0} {1}."}
  };

  /** CONNACK RC Meaning. */
  var CONNACK_RC = {
    0:"Connection Accepted",
    1:"Connection Refused: unacceptable protocol version",
    2:"Connection Refused: identifier rejected",
    3:"Connection Refused: server unavailable",
    4:"Connection Refused: bad user name or password",
    5:"Connection Refused: not authorized"
  };

  /**
   * Format an error message text.
   * @private
   * @param {error} ERROR.KEY value above.
   * @param {substitutions} [array] substituted into the text.
   * @return the text with the substitutions made.
   */
  var format = function(error, substitutions) {
    var text = error.text;
    if (substitutions) {
      for (var i=0; i<substitutions.length; i++) {
        field = "{"+i+"}";
        start = text.indexOf(field);
        if(start > 0) {
          var part1 = text.substring(0,start);
          var part2 = text.substring(start+field.length);
          text = part1+substitutions[i]+part2;
        }
      }
    }
    return text;
  };

  //MQTT protocol and version          6    M    Q    I    s    d    p    3
  var MqttProtoIdentifierv3 = [0x00,0x06,0x4d,0x51,0x49,0x73,0x64,0x70,0x03];
  //MQTT proto/version for 311         4    M    Q    T    T    4
  var MqttProtoIdentifierv4 = [0x00,0x04,0x4d,0x51,0x54,0x54,0x04];

  /**
   * Construct an MQTT wire protocol message.
   * @param type MQTT packet type.
   * @param options optional wire message attributes.
   *
   * Optional properties
   *
   * messageIdentifier: message ID in the range [0..65535]
   * payloadMessage:  Application Message - PUBLISH only
   * connectStrings:  array of 0 or more Strings to be put into the CONNECT payload
   * topics:      array of strings (SUBSCRIBE, UNSUBSCRIBE)
   * requestQoS:    array of QoS values [0..2]
   *
   * "Flag" properties
   * cleanSession:  true if present / false if absent (CONNECT)
   * willMessage:   true if present / false if absent (CONNECT)
   * isRetained:    true if present / false if absent (CONNECT)
   * userName:    true if present / false if absent (CONNECT)
   * password:    true if present / false if absent (CONNECT)
   * keepAliveInterval: integer [0..65535]  (CONNECT)
   *
   * @private
   * @ignore
   */
  var WireMessage = function (type, options) {
    this.type = type;
    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
  };

  WireMessage.prototype.encode = function() {
    // Compute the first byte of the fixed header
    var first = ((this.type & 0x0f) << 4);

    /*
     * Now calculate the length of the variable header + payload by adding up the lengths
     * of all the component parts
     */

    remLength = 0;
    topicStrLength = new Array();

    // if the message contains a messageIdentifier then we need two bytes for that
    if (this.messageIdentifier != undefined)
      remLength += 2;

    switch(this.type) {
      // If this a Connect then we need to include 12 bytes for its header
      case MESSAGE_TYPE.CONNECT:
        switch(this.mqttVersion) {
          case 3:
            remLength += MqttProtoIdentifierv3.length + 3;
            break;
          case 4:
            remLength += MqttProtoIdentifierv4.length + 3;
            break;
        }

        remLength += UTF8Length(this.clientId) + 2;
        if (this.willMessage != undefined) {
          remLength += UTF8Length(this.willMessage.destinationName) + 2;
          // Will message is always a string, sent as UTF-8 characters with a preceding length.
          var willMessagePayloadBytes = this.willMessage.payloadBytes;
          if (!(willMessagePayloadBytes instanceof Uint8Array))
            willMessagePayloadBytes = new Uint8Array(payloadBytes);
          remLength += willMessagePayloadBytes.byteLength +2;
        }
        if (this.userName != undefined)
          remLength += UTF8Length(this.userName) + 2;
        if (this.password != undefined)
          remLength += UTF8Length(this.password) + 2;
        break;

      // Subscribe, Unsubscribe can both contain topic strings
      case MESSAGE_TYPE.SUBSCRIBE:
        first |= 0x02; // Qos = 1;
        for ( var i = 0; i < this.topics.length; i++) {
          topicStrLength[i] = UTF8Length(this.topics[i]);
          remLength += topicStrLength[i] + 2;
        }
        remLength += this.requestedQos.length; // 1 byte for each topic's Qos
        // QoS on Subscribe only
        break;

      case MESSAGE_TYPE.UNSUBSCRIBE:
        first |= 0x02; // Qos = 1;
        for ( var i = 0; i < this.topics.length; i++) {
          topicStrLength[i] = UTF8Length(this.topics[i]);
          remLength += topicStrLength[i] + 2;
        }
        break;

      case MESSAGE_TYPE.PUBREL:
        first |= 0x02; // Qos = 1;
        break;

      case MESSAGE_TYPE.PUBLISH:
        if (this.payloadMessage.duplicate) first |= 0x08;
        first  = first |= (this.payloadMessage.qos << 1);
        if (this.payloadMessage.retained) first |= 0x01;
        destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
        remLength += destinationNameLength + 2;
        var payloadBytes = this.payloadMessage.payloadBytes;
        remLength += payloadBytes.byteLength;
        if (payloadBytes instanceof ArrayBuffer)
          payloadBytes = new Uint8Array(payloadBytes);
        else if (!(payloadBytes instanceof Uint8Array))
          payloadBytes = new Uint8Array(payloadBytes.buffer);
        break;

      case MESSAGE_TYPE.DISCONNECT:
        break;

      default:
        ;
    }

    // Now we can allocate a buffer for the message

    var mbi = encodeMBI(remLength);  // Convert the length to MQTT MBI format
    var pos = mbi.length + 1;        // Offset of start of variable header
    var buffer = new ArrayBuffer(remLength + pos);
    var byteStream = new Uint8Array(buffer);    // view it as a sequence of bytes

    //Write the fixed header into the buffer
    byteStream[0] = first;
    byteStream.set(mbi,1);

    // If this is a PUBLISH then the variable header starts with a topic
    if (this.type == MESSAGE_TYPE.PUBLISH)
      pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
    // If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

    else if (this.type == MESSAGE_TYPE.CONNECT) {
      switch (this.mqttVersion) {
        case 3:
          byteStream.set(MqttProtoIdentifierv3, pos);
          pos += MqttProtoIdentifierv3.length;
          break;
        case 4:
          byteStream.set(MqttProtoIdentifierv4, pos);
          pos += MqttProtoIdentifierv4.length;
          break;
      }
      var connectFlags = 0;
      if (this.cleanSession)
        connectFlags = 0x02;
      if (this.willMessage != undefined ) {
        connectFlags |= 0x04;
        connectFlags |= (this.willMessage.qos<<3);
        if (this.willMessage.retained) {
          connectFlags |= 0x20;
        }
      }
      if (this.userName != undefined)
        connectFlags |= 0x80;
      if (this.password != undefined)
        connectFlags |= 0x40;
      byteStream[pos++] = connectFlags;
      pos = writeUint16 (this.keepAliveInterval, byteStream, pos);
    }

    // Output the messageIdentifier - if there is one
    if (this.messageIdentifier != undefined)
      pos = writeUint16 (this.messageIdentifier, byteStream, pos);

    switch(this.type) {
      case MESSAGE_TYPE.CONNECT:
        pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
        if (this.willMessage != undefined) {
          pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
          pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
          byteStream.set(willMessagePayloadBytes, pos);
          pos += willMessagePayloadBytes.byteLength;

        }
        if (this.userName != undefined)
          pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
        if (this.password != undefined)
          pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
        break;

      case MESSAGE_TYPE.PUBLISH:
        // PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
        byteStream.set(payloadBytes, pos);

        break;

//          case MESSAGE_TYPE.PUBREC: 
//          case MESSAGE_TYPE.PUBREL: 
//          case MESSAGE_TYPE.PUBCOMP:  
//            break;

      case MESSAGE_TYPE.SUBSCRIBE:
        // SUBSCRIBE has a list of topic strings and request QoS
        for (var i=0; i<this.topics.length; i++) {
          pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
          byteStream[pos++] = this.requestedQos[i];
        }
        break;

      case MESSAGE_TYPE.UNSUBSCRIBE:
        // UNSUBSCRIBE has a list of topic strings
        for (var i=0; i<this.topics.length; i++)
          pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
        break;

      default:
      // Do nothing.
    }

    return buffer;
  }

  function decodeMessage(input,pos) {
    var startingPos = pos;
    var first = input[pos];
    var type = first >> 4;
    var messageInfo = first &= 0x0f;
    pos += 1;


    // Decode the remaining length (MBI format)

    var digit;
    var remLength = 0;
    var multiplier = 1;
    do {
      if (pos == input.length) {
        return [null,startingPos];
      }
      digit = input[pos++];
      remLength += ((digit & 0x7F) * multiplier);
      multiplier *= 128;
    } while ((digit & 0x80) != 0);

    var endPos = pos+remLength;
    if (endPos > input.length) {
      return [null,startingPos];
    }

    var wireMessage = new WireMessage(type);
    switch(type) {
      case MESSAGE_TYPE.CONNACK:
        var connectAcknowledgeFlags = input[pos++];
        if (connectAcknowledgeFlags & 0x01)
          wireMessage.sessionPresent = true;
        wireMessage.returnCode = input[pos++];
        break;

      case MESSAGE_TYPE.PUBLISH:
        var qos = (messageInfo >> 1) & 0x03;

        var len = readUint16(input, pos);
        pos += 2;
        var topicName = parseUTF8(input, pos, len);
        pos += len;
        // If QoS 1 or 2 there will be a messageIdentifier
        if (qos > 0) {
          wireMessage.messageIdentifier = readUint16(input, pos);
          pos += 2;
        }

        var message = new Paho.MQTT.Message(input.subarray(pos, endPos));
        if ((messageInfo & 0x01) == 0x01)
          message.retained = true;
        if ((messageInfo & 0x08) == 0x08)
          message.duplicate =  true;
        message.qos = qos;
        message.destinationName = topicName;
        wireMessage.payloadMessage = message;
        break;

      case  MESSAGE_TYPE.PUBACK:
      case  MESSAGE_TYPE.PUBREC:
      case  MESSAGE_TYPE.PUBREL:
      case  MESSAGE_TYPE.PUBCOMP:
      case  MESSAGE_TYPE.UNSUBACK:
        wireMessage.messageIdentifier = readUint16(input, pos);
        break;

      case  MESSAGE_TYPE.SUBACK:
        wireMessage.messageIdentifier = readUint16(input, pos);
        pos += 2;
        wireMessage.returnCode = input.subarray(pos, endPos);
        break;

      default:
        ;
    }

    return [wireMessage,endPos];
  }

  function writeUint16(input, buffer, offset) {
    buffer[offset++] = input >> 8;      //MSB
    buffer[offset++] = input % 256;     //LSB
    return offset;
  }

  function writeString(input, utf8Length, buffer, offset) {
    offset = writeUint16(utf8Length, buffer, offset);
    stringToUTF8(input, buffer, offset);
    return offset + utf8Length;
  }

  function readUint16(buffer, offset) {
    return 256*buffer[offset] + buffer[offset+1];
  }

  /**
   * Encodes an MQTT Multi-Byte Integer
   * @private
   */
  function encodeMBI(number) {
    var output = new Array(1);
    var numBytes = 0;

    do {
      var digit = number % 128;
      number = number >> 7;
      if (number > 0) {
        digit |= 0x80;
      }
      output[numBytes++] = digit;
    } while ( (number > 0) && (numBytes<4) );

    return output;
  }

  /**
   * Takes a String and calculates its length in bytes when encoded in UTF8.
   * @private
   */
  function UTF8Length(input) {
    var output = 0;
    for (var i = 0; i<input.length; i++)
    {
      var charCode = input.charCodeAt(i);
      if (charCode > 0x7FF)
      {
        // Surrogate pair means its a 4 byte character
        if (0xD800 <= charCode && charCode <= 0xDBFF)
        {
          i++;
          output++;
        }
        output +=3;
      }
      else if (charCode > 0x7F)
        output +=2;
      else
        output++;
    }
    return output;
  }

  /**
   * Takes a String and writes it into an array as UTF8 encoded bytes.
   * @private
   */
  function stringToUTF8(input, output, start) {
    var pos = start;
    for (var i = 0; i<input.length; i++) {
      var charCode = input.charCodeAt(i);

      // Check for a surrogate pair.
      if (0xD800 <= charCode && charCode <= 0xDBFF) {
        lowCharCode = input.charCodeAt(++i);
        if (isNaN(lowCharCode)) {
          throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
        }
        charCode = ((charCode - 0xD800)<<10) + (lowCharCode - 0xDC00) + 0x10000;

      }

      if (charCode <= 0x7F) {
        output[pos++] = charCode;
      } else if (charCode <= 0x7FF) {
        output[pos++] = charCode>>6  & 0x1F | 0xC0;
        output[pos++] = charCode     & 0x3F | 0x80;
      } else if (charCode <= 0xFFFF) {
        output[pos++] = charCode>>12 & 0x0F | 0xE0;
        output[pos++] = charCode>>6  & 0x3F | 0x80;
        output[pos++] = charCode     & 0x3F | 0x80;
      } else {
        output[pos++] = charCode>>18 & 0x07 | 0xF0;
        output[pos++] = charCode>>12 & 0x3F | 0x80;
        output[pos++] = charCode>>6  & 0x3F | 0x80;
        output[pos++] = charCode     & 0x3F | 0x80;
      };
    }
    return output;
  }

  function parseUTF8(input, offset, length) {
    var output = "";
    var utf16;
    var pos = offset;

    while (pos < offset+length)
    {
      var byte1 = input[pos++];
      if (byte1 < 128)
        utf16 = byte1;
      else
      {
        var byte2 = input[pos++]-128;
        if (byte2 < 0)
          throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16),""]));
        if (byte1 < 0xE0)             // 2 byte character
          utf16 = 64*(byte1-0xC0) + byte2;
        else
        {
          var byte3 = input[pos++]-128;
          if (byte3 < 0)
            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
          if (byte1 < 0xF0)        // 3 byte character
            utf16 = 4096*(byte1-0xE0) + 64*byte2 + byte3;
          else
          {
            var byte4 = input[pos++]-128;
            if (byte4 < 0)
              throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
            if (byte1 < 0xF8)        // 4 byte character
              utf16 = 262144*(byte1-0xF0) + 4096*byte2 + 64*byte3 + byte4;
            else                     // longer encodings are not supported
              throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
          }
        }
      }

      if (utf16 > 0xFFFF)   // 4 byte character - express as a surrogate pair
      {
        utf16 -= 0x10000;
        output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
        utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
      }
      output += String.fromCharCode(utf16);
    }
    return output;
  }

  /**
   * Repeat keepalive requests, monitor responses.
   * @ignore
   */
  var Pinger = function(client, window, keepAliveInterval) {
    this._client = client;
    this._window = window;
    this._keepAliveInterval = keepAliveInterval*1000;
    this.isReset = false;

    var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

    var doTimeout = function (pinger) {
      return function () {
        return doPing.apply(pinger);
      };
    };

    /** @ignore */
    var doPing = function() {
      if (!this.isReset) {
        this._client._trace("Pinger.doPing", "Timed out");
        this._client._disconnected( ERROR.PING_TIMEOUT.code , format(ERROR.PING_TIMEOUT));
      } else {
        this.isReset = false;
        this._client._trace("Pinger.doPing", "send PINGREQ");
        this._client.socket.send(pingReq);
        this.timeout = this._window.setTimeout(doTimeout(this), this._keepAliveInterval);
      }
    }

    this.reset = function() {
      this.isReset = true;
      this._window.clearTimeout(this.timeout);
      if (this._keepAliveInterval > 0)
        this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
    }

    this.cancel = function() {
      this._window.clearTimeout(this.timeout);
    }
  };

  /**
   * Monitor request completion.
   * @ignore
   */
  var Timeout = function(client, window, timeoutSeconds, action, args) {
    this._window = window;
    if (!timeoutSeconds)
      timeoutSeconds = 30;

    var doTimeout = function (action, client, args) {
      return function () {
        return action.apply(client, args);
      };
    };
    this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

    this.cancel = function() {
      this._window.clearTimeout(this.timeout);
    }
  };

  /*
   * Internal implementation of the Websockets MQTT V3.1 client.
   *
   * @name Paho.MQTT.ClientImpl @constructor
   * @param {String} host the DNS nameof the webSocket host.
   * @param {Number} port the port number for that host.
   * @param {String} clientId the MQ client identifier.
   */
  var ClientImpl = function (uri, host, port, path, clientId) {
    // Check dependencies are satisfied in this browser.
    if (!("WebSocket" in global && global["WebSocket"] !== null)) {
      throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
    }
    if (!("localStorage" in global && global["localStorage"] !== null)) {
      throw new Error(format(ERROR.UNSUPPORTED, ["localStorage"]));
    }
    if (!("ArrayBuffer" in global && global["ArrayBuffer"] !== null)) {
      throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
    }
    this._trace("Paho.MQTT.Client", uri, host, port, path, clientId);

    this.host = host;
    this.port = port;
    this.path = path;
    this.uri = uri;
    this.clientId = clientId;

    // Local storagekeys are qualified with the following string.
    // The conditional inclusion of path in the key is for backward
    // compatibility to when the path was not configurable and assumed to
    // be /mqtt
    this._localKey=host+":"+port+(path!="/mqtt"?":"+path:"")+":"+clientId+":";

    // Create private instance-only message queue
    // Internal queue of messages to be sent, in sending order.
    this._msg_queue = [];

    // Messages we have sent and are expecting a response for, indexed by their respective message ids.
    this._sentMessages = {};

    // Messages we have received and acknowleged and are expecting a confirm message for
    // indexed by their respective message ids.
    this._receivedMessages = {};

    // Internal list of callbacks to be executed when messages
    // have been successfully sent over web socket, e.g. disconnect
    // when it doesn't have to wait for ACK, just message is dispatched.
    this._notify_msg_sent = {};

    // Unique identifier for SEND messages, incrementing
    // counter as messages are sent.
    this._message_identifier = 1;

    // Used to determine the transmission sequence of stored sent messages.
    this._sequence = 0;


    // Load the local state, if any, from the saved version, only restore state relevant to this client.
    for (var key in localStorage)
      if (   key.indexOf("Sent:"+this._localKey) == 0
        || key.indexOf("Received:"+this._localKey) == 0)
        this.restore(key);
  };

  // Messaging Client public instance members.
  ClientImpl.prototype.host;
  ClientImpl.prototype.port;
  ClientImpl.prototype.path;
  ClientImpl.prototype.uri;
  ClientImpl.prototype.clientId;

  // Messaging Client private instance members.
  ClientImpl.prototype.socket;
  /* true once we have received an acknowledgement to a CONNECT packet. */
  ClientImpl.prototype.connected = false;
  /* The largest message identifier allowed, may not be larger than 2**16 but
   * if set smaller reduces the maximum number of outbound messages allowed.
   */
  ClientImpl.prototype.maxMessageIdentifier = 65536;
  ClientImpl.prototype.connectOptions;
  ClientImpl.prototype.hostIndex;
  ClientImpl.prototype.onConnectionLost;
  ClientImpl.prototype.onMessageDelivered;
  ClientImpl.prototype.onMessageArrived;
  ClientImpl.prototype._msg_queue = null;
  ClientImpl.prototype._connectTimeout;
  /* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
  ClientImpl.prototype.sendPinger = null;
  /* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
  ClientImpl.prototype.receivePinger = null;

  ClientImpl.prototype.receiveBuffer = null;

  ClientImpl.prototype._traceBuffer = null;
  ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

  ClientImpl.prototype.connect = function (connectOptions) {
    var connectOptionsMasked = this._traceMask(connectOptions, "password");
    this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

    if (this.connected)
      throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
    if (this.socket)
      throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

    this.connectOptions = connectOptions;

    if (connectOptions.uris) {
      this.hostIndex = 0;
      this._doConnect(connectOptions.uris[0]);
    } else {
      this._doConnect(this.uri);
    }

  };

  ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
    this._trace("Client.subscribe", filter, subscribeOptions);

    if (!this.connected)
      throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

    var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
    wireMessage.topics=[filter];
    if (subscribeOptions.qos != undefined)
      wireMessage.requestedQos = [subscribeOptions.qos];
    else
      wireMessage.requestedQos = [0];

    if (subscribeOptions.onSuccess) {
      wireMessage.onSuccess = function(grantedQos) {subscribeOptions.onSuccess({invocationContext:subscribeOptions.invocationContext,grantedQos:grantedQos});};
    }

    if (subscribeOptions.onFailure) {
      wireMessage.onFailure = function(errorCode) {subscribeOptions.onFailure({invocationContext:subscribeOptions.invocationContext,errorCode:errorCode});};
    }

    if (subscribeOptions.timeout) {
      wireMessage.timeOut = new Timeout(this, window, subscribeOptions.timeout, subscribeOptions.onFailure
        , [{invocationContext:subscribeOptions.invocationContext,
          errorCode:ERROR.SUBSCRIBE_TIMEOUT.code,
          errorMessage:format(ERROR.SUBSCRIBE_TIMEOUT)}]);
    }

    // All subscriptions return a SUBACK.
    this._requires_ack(wireMessage);
    this._schedule_message(wireMessage);
  };

  /** @ignore */
  ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
    this._trace("Client.unsubscribe", filter, unsubscribeOptions);

    if (!this.connected)
      throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

    var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
    wireMessage.topics = [filter];

    if (unsubscribeOptions.onSuccess) {
      wireMessage.callback = function() {unsubscribeOptions.onSuccess({invocationContext:unsubscribeOptions.invocationContext});};
    }
    if (unsubscribeOptions.timeout) {
      wireMessage.timeOut = new Timeout(this, window, unsubscribeOptions.timeout, unsubscribeOptions.onFailure
        , [{invocationContext:unsubscribeOptions.invocationContext,
          errorCode:ERROR.UNSUBSCRIBE_TIMEOUT.code,
          errorMessage:format(ERROR.UNSUBSCRIBE_TIMEOUT)}]);
    }

    // All unsubscribes return a SUBACK.
    this._requires_ack(wireMessage);
    this._schedule_message(wireMessage);
  };

  ClientImpl.prototype.send = function (message) {
    this._trace("Client.send", message);

    if (!this.connected)
      throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

    wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
    wireMessage.payloadMessage = message;

    if (message.qos > 0)
      this._requires_ack(wireMessage);
    else if (this.onMessageDelivered)
      this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
    this._schedule_message(wireMessage);
  };

  ClientImpl.prototype.disconnect = function () {
    this._trace("Client.disconnect");

    if (!this.socket)
      throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

    wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

    // Run the disconnected call back as soon as the message has been sent,
    // in case of a failure later on in the disconnect processing.
    // as a consequence, the _disconected call back may be run several times.
    this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

    this._schedule_message(wireMessage);
  };

  ClientImpl.prototype.getTraceLog = function () {
    if ( this._traceBuffer !== null ) {
      this._trace("Client.getTraceLog", new Date());
      this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
      for (var key in this._sentMessages)
        this._trace("_sentMessages ",key, this._sentMessages[key]);
      for (var key in this._receivedMessages)
        this._trace("_receivedMessages ",key, this._receivedMessages[key]);

      return this._traceBuffer;
    }
  };

  ClientImpl.prototype.startTrace = function () {
    if ( this._traceBuffer === null ) {
      this._traceBuffer = [];
    }
    this._trace("Client.startTrace", new Date(), version);
  };

  ClientImpl.prototype.stopTrace = function () {
    delete this._traceBuffer;
  };

  ClientImpl.prototype._doConnect = function (wsurl) {
    // When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
    if (this.connectOptions.useSSL) {
      var uriParts = wsurl.split(":");
      uriParts[0] = "wss";
      wsurl = uriParts.join(":");
    }
    this.connected = false;
    this.socket = new WebSocket(wsurl, []);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = scope(this._on_socket_open, this);
    this.socket.onmessage = scope(this._on_socket_message, this);
    this.socket.onerror = scope(this._on_socket_error, this);
    this.socket.onclose = scope(this._on_socket_close, this);

    this.sendPinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);
    this.receivePinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);

    this._connectTimeout = new Timeout(this, window, this.connectOptions.timeout, this._disconnected,  [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
  };


  // Schedule a new message to be sent over the WebSockets
  // connection. CONNECT messages cause WebSocket connection
  // to be started. All other messages are queued internally
  // until this has happened. When WS connection starts, process
  // all outstanding messages.
  ClientImpl.prototype._schedule_message = function (message) {
    this._msg_queue.push(message);
    // Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
    if (this.connected) {
      this._process_queue();
    }
  };

  ClientImpl.prototype.store = function(prefix, wireMessage) {
    storedMessage = {type:wireMessage.type, messageIdentifier:wireMessage.messageIdentifier, version:1};

    switch(wireMessage.type) {
      case MESSAGE_TYPE.PUBLISH:
        if(wireMessage.pubRecReceived)
          storedMessage.pubRecReceived = true;

        // Convert the payload to a hex string.
        storedMessage.payloadMessage = {};
        var hex = "";
        var messageBytes = wireMessage.payloadMessage.payloadBytes;
        for (var i=0; i<messageBytes.length; i++) {
          if (messageBytes[i] <= 0xF)
            hex = hex+"0"+messageBytes[i].toString(16);
          else
            hex = hex+messageBytes[i].toString(16);
        }
        storedMessage.payloadMessage.payloadHex = hex;

        storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
        storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
        if (wireMessage.payloadMessage.duplicate)
          storedMessage.payloadMessage.duplicate = true;
        if (wireMessage.payloadMessage.retained)
          storedMessage.payloadMessage.retained = true;

        // Add a sequence number to sent messages.
        if ( prefix.indexOf("Sent:") == 0 ) {
          if ( wireMessage.sequence === undefined )
            wireMessage.sequence = ++this._sequence;
          storedMessage.sequence = wireMessage.sequence;
        }
        break;

      default:
        throw Error(format(ERROR.INVALID_STORED_DATA, [key, storedMessage]));
    }
    localStorage.setItem(prefix+this._localKey+wireMessage.messageIdentifier, JSON.stringify(storedMessage));
  };

  ClientImpl.prototype.restore = function(key) {
    var value = localStorage.getItem(key);
    var storedMessage = JSON.parse(value);

    var wireMessage = new WireMessage(storedMessage.type, storedMessage);

    switch(storedMessage.type) {
      case MESSAGE_TYPE.PUBLISH:
        // Replace the payload message with a Message object.
        var hex = storedMessage.payloadMessage.payloadHex;
        var buffer = new ArrayBuffer((hex.length)/2);
        var byteStream = new Uint8Array(buffer);
        var i = 0;
        while (hex.length >= 2) {
          var x = parseInt(hex.substring(0, 2), 16);
          hex = hex.substring(2, hex.length);
          byteStream[i++] = x;
        }
        var payloadMessage = new Paho.MQTT.Message(byteStream);

        payloadMessage.qos = storedMessage.payloadMessage.qos;
        payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
        if (storedMessage.payloadMessage.duplicate)
          payloadMessage.duplicate = true;
        if (storedMessage.payloadMessage.retained)
          payloadMessage.retained = true;
        wireMessage.payloadMessage = payloadMessage;

        break;

      default:
        throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
    }

    if (key.indexOf("Sent:"+this._localKey) == 0) {
      wireMessage.payloadMessage.duplicate = true;
      this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
    } else if (key.indexOf("Received:"+this._localKey) == 0) {
      this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
    }
  };

  ClientImpl.prototype._process_queue = function () {
    var message = null;
    // Process messages in order they were added
    var fifo = this._msg_queue.reverse();

    // Send all queued messages down socket connection
    while ((message = fifo.pop())) {
      this._socket_send(message);
      // Notify listeners that message was successfully sent
      if (this._notify_msg_sent[message]) {
        this._notify_msg_sent[message]();
        delete this._notify_msg_sent[message];
      }
    }
  };

  /**
   * Expect an ACK response for this message. Add message to the set of in progress
   * messages and set an unused identifier in this message.
   * @ignore
   */
  ClientImpl.prototype._requires_ack = function (wireMessage) {
    var messageCount = Object.keys(this._sentMessages).length;
    if (messageCount > this.maxMessageIdentifier)
      throw Error ("Too many messages:"+messageCount);

    while(this._sentMessages[this._message_identifier] !== undefined) {
      this._message_identifier++;
    }
    wireMessage.messageIdentifier = this._message_identifier;
    this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
    if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
      this.store("Sent:", wireMessage);
    }
    if (this._message_identifier === this.maxMessageIdentifier) {
      this._message_identifier = 1;
    }
  };

  /**
   * Called when the underlying websocket has been opened.
   * @ignore
   */
  ClientImpl.prototype._on_socket_open = function () {
    // Create the CONNECT message object.
    var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
    wireMessage.clientId = this.clientId;
    this._socket_send(wireMessage);
  };

  /**
   * Called when the underlying websocket has received a complete packet.
   * @ignore
   */
  ClientImpl.prototype._on_socket_message = function (event) {
    this._trace("Client._on_socket_message", event.data);
    // Reset the receive ping timer, we now have evidence the server is alive.
    this.receivePinger.reset();
    var messages = this._deframeMessages(event.data);
    for (var i = 0; i < messages.length; i+=1) {
      this._handleMessage(messages[i]);
    }
  }

  ClientImpl.prototype._deframeMessages = function(data) {
    var byteArray = new Uint8Array(data);
    if (this.receiveBuffer) {
      var newData = new Uint8Array(this.receiveBuffer.length+byteArray.length);
      newData.set(this.receiveBuffer);
      newData.set(byteArray,this.receiveBuffer.length);
      byteArray = newData;
      delete this.receiveBuffer;
    }
    try {
      var offset = 0;
      var messages = [];
      while(offset < byteArray.length) {
        var result = decodeMessage(byteArray,offset);
        var wireMessage = result[0];
        offset = result[1];
        if (wireMessage !== null) {
          messages.push(wireMessage);
        } else {
          break;
        }
      }
      if (offset < byteArray.length) {
        this.receiveBuffer = byteArray.subarray(offset);
      }
    } catch (error) {
      this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message]));
      return;
    }
    return messages;
  }

  ClientImpl.prototype._handleMessage = function(wireMessage) {

    this._trace("Client._handleMessage", wireMessage);

    try {
      switch(wireMessage.type) {
        case MESSAGE_TYPE.CONNACK:
          this._connectTimeout.cancel();

          // If we have started using clean session then clear up the local state.
          if (this.connectOptions.cleanSession) {
            for (var key in this._sentMessages) {
              var sentMessage = this._sentMessages[key];
              localStorage.removeItem("Sent:"+this._localKey+sentMessage.messageIdentifier);
            }
            this._sentMessages = {};

            for (var key in this._receivedMessages) {
              var receivedMessage = this._receivedMessages[key];
              localStorage.removeItem("Received:"+this._localKey+receivedMessage.messageIdentifier);
            }
            this._receivedMessages = {};
          }
          // Client connected and ready for business.
          if (wireMessage.returnCode === 0) {
            this.connected = true;
            // Jump to the end of the list of uris and stop looking for a good host.
            if (this.connectOptions.uris)
              this.hostIndex = this.connectOptions.uris.length;
          } else {
            this._disconnected(ERROR.CONNACK_RETURNCODE.code , format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
            break;
          }

          // Resend messages.
          var sequencedMessages = new Array();
          for (var msgId in this._sentMessages) {
            if (this._sentMessages.hasOwnProperty(msgId))
              sequencedMessages.push(this._sentMessages[msgId]);
          }

          // Sort sentMessages into the original sent order.
          var sequencedMessages = sequencedMessages.sort(function(a,b) {return a.sequence - b.sequence;} );
          for (var i=0, len=sequencedMessages.length; i<len; i++) {
            var sentMessage = sequencedMessages[i];
            if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
              var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:sentMessage.messageIdentifier});
              this._schedule_message(pubRelMessage);
            } else {
              this._schedule_message(sentMessage);
            };
          }

          // Execute the connectOptions.onSuccess callback if there is one.
          if (this.connectOptions.onSuccess) {
            this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});
          }

          // Process all queued messages now that the connection is established.
          this._process_queue();
          break;

        case MESSAGE_TYPE.PUBLISH:
          this._receivePublish(wireMessage);
          break;

        case MESSAGE_TYPE.PUBACK:
          var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
          // If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
          if (sentMessage) {
            delete this._sentMessages[wireMessage.messageIdentifier];
            localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
            if (this.onMessageDelivered)
              this.onMessageDelivered(sentMessage.payloadMessage);
          }
          break;

        case MESSAGE_TYPE.PUBREC:
          var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
          // If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
          if (sentMessage) {
            sentMessage.pubRecReceived = true;
            var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:wireMessage.messageIdentifier});
            this.store("Sent:", sentMessage);
            this._schedule_message(pubRelMessage);
          }
          break;

        case MESSAGE_TYPE.PUBREL:
          var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
          localStorage.removeItem("Received:"+this._localKey+wireMessage.messageIdentifier);
          // If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
          if (receivedMessage) {
            this._receiveMessage(receivedMessage);
            delete this._receivedMessages[wireMessage.messageIdentifier];
          }
          // Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
          pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {messageIdentifier:wireMessage.messageIdentifier});
          this._schedule_message(pubCompMessage);


          break;

        case MESSAGE_TYPE.PUBCOMP:
          var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
          delete this._sentMessages[wireMessage.messageIdentifier];
          localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
          if (this.onMessageDelivered)
            this.onMessageDelivered(sentMessage.payloadMessage);
          break;

        case MESSAGE_TYPE.SUBACK:
          var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
          if (sentMessage) {
            if(sentMessage.timeOut)
              sentMessage.timeOut.cancel();
            wireMessage.returnCode.indexOf = Array.prototype.indexOf;
            if (wireMessage.returnCode.indexOf(0x80) !== -1) {
              if (sentMessage.onFailure) {
                sentMessage.onFailure(wireMessage.returnCode);
              }
            } else if (sentMessage.onSuccess) {
              sentMessage.onSuccess(wireMessage.returnCode);
            }
            delete this._sentMessages[wireMessage.messageIdentifier];
          }
          break;

        case MESSAGE_TYPE.UNSUBACK:
          var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
          if (sentMessage) {
            if (sentMessage.timeOut)
              sentMessage.timeOut.cancel();
            if (sentMessage.callback) {
              sentMessage.callback();
            }
            delete this._sentMessages[wireMessage.messageIdentifier];
          }

          break;

        case MESSAGE_TYPE.PINGRESP:
          /* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
          this.sendPinger.reset();
          break;

        case MESSAGE_TYPE.DISCONNECT:
          // Clients do not expect to receive disconnect packets.
          this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
          break;

        default:
          this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
      };
    } catch (error) {
      this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message]));
      return;
    }
  };

  /** @ignore */
  ClientImpl.prototype._on_socket_error = function (error) {
    this._disconnected(ERROR.SOCKET_ERROR.code , format(ERROR.SOCKET_ERROR, [error.data]));
  };

  /** @ignore */
  ClientImpl.prototype._on_socket_close = function () {
    this._disconnected(ERROR.SOCKET_CLOSE.code , format(ERROR.SOCKET_CLOSE));
  };

  /** @ignore */
  ClientImpl.prototype._socket_send = function (wireMessage) {

    if (wireMessage.type == 1) {
      var wireMessageMasked = this._traceMask(wireMessage, "password");
      this._trace("Client._socket_send", wireMessageMasked);
    }
    else this._trace("Client._socket_send", wireMessage);

    this.socket.send(wireMessage.encode());
    /* We have proved to the server we are alive. */
    this.sendPinger.reset();
  };

  /** @ignore */
  ClientImpl.prototype._receivePublish = function (wireMessage) {
    switch(wireMessage.payloadMessage.qos) {
      case "undefined":
      case 0:
        this._receiveMessage(wireMessage);
        break;

      case 1:
        var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {messageIdentifier:wireMessage.messageIdentifier});
        this._schedule_message(pubAckMessage);
        this._receiveMessage(wireMessage);
        break;

      case 2:
        this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
        this.store("Received:", wireMessage);
        var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {messageIdentifier:wireMessage.messageIdentifier});
        this._schedule_message(pubRecMessage);

        break;

      default:
        throw Error("Invaild qos="+wireMmessage.payloadMessage.qos);
    };
  };

  /** @ignore */
  ClientImpl.prototype._receiveMessage = function (wireMessage) {
    if (this.onMessageArrived) {
      this.onMessageArrived(wireMessage.payloadMessage);
    }
  };

  /**
   * Client has disconnected either at its own request or because the server
   * or network disconnected it. Remove all non-durable state.
   * @param {errorCode} [number] the error number.
   * @param {errorText} [string] the error text.
   * @ignore
   */
  ClientImpl.prototype._disconnected = function (errorCode, errorText) {
    this._trace("Client._disconnected", errorCode, errorText);

    this.sendPinger.cancel();
    this.receivePinger.cancel();
    if (this._connectTimeout)
      this._connectTimeout.cancel();
    // Clear message buffers.
    this._msg_queue = [];
    this._notify_msg_sent = {};

    if (this.socket) {
      // Cancel all socket callbacks so that they cannot be driven again by this socket.
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onerror = null;
      this.socket.onclose = null;
      if (this.socket.readyState === 1)
        this.socket.close();
      delete this.socket;
    }

    if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length-1) {
      // Try the next host.
      this.hostIndex++;
      this._doConnect(this.connectOptions.uris[this.hostIndex]);

    } else {

      if (errorCode === undefined) {
        errorCode = ERROR.OK.code;
        errorText = format(ERROR.OK);
      }

      // Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
      if (this.connected) {
        this.connected = false;
        // Execute the connectionLostCallback if there is one, and we were connected.
        if (this.onConnectionLost)
          this.onConnectionLost({errorCode:errorCode, errorMessage:errorText});
      } else {
        // Otherwise we never had a connection, so indicate that the connect has failed.
        if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
          this._trace("Failed to connect V4, dropping back to V3")
          this.connectOptions.mqttVersion = 3;
          if (this.connectOptions.uris) {
            this.hostIndex = 0;
            this._doConnect(this.connectOptions.uris[0]);
          } else {
            this._doConnect(this.uri);
          }
        } else if(this.connectOptions.onFailure) {
          this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext, errorCode:errorCode, errorMessage:errorText});
        }
      }
    }
  };

  /** @ignore */
  ClientImpl.prototype._trace = function () {
    if ( this._traceBuffer !== null ) {
      for (var i = 0, max = arguments.length; i < max; i++) {
        if ( this._traceBuffer.length == this._MAX_TRACE_ENTRIES ) {
          this._traceBuffer.shift();
        }
        if (i === 0) this._traceBuffer.push(arguments[i]);
        else if (typeof arguments[i] === "undefined" ) this._traceBuffer.push(arguments[i]);
        else this._traceBuffer.push("  "+JSON.stringify(arguments[i]));
      };
    };
  };

  /** @ignore */
  ClientImpl.prototype._traceMask = function (traceObject, masked) {
    var traceObjectMasked = {};
    for (var attr in traceObject) {
      if (traceObject.hasOwnProperty(attr)) {
        if (attr == masked)
          traceObjectMasked[attr] = "******";
        else
          traceObjectMasked[attr] = traceObject[attr];
      }
    }
    return traceObjectMasked;
  };

  // ------------------------------------------------------------------------
  // Public Programming interface.
  // ------------------------------------------------------------------------

  /**
   * The JavaScript application communicates to the server using a {@link Paho.MQTT.Client} object.
   * <p>
   * Most applications will create just one Client object and then call its connect() method,
   * however applications can create more than one Client object if they wish.
   * In this case the combination of host, port and clientId attributes must be different for each Client object.
   * <p>
   * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
   * (even though the underlying protocol exchange might be synchronous in nature).
   * This means they signal their completion by calling back to the application,
   * via Success or Failure callback functions provided by the application on the method in question.
   * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
   * of the script that made the invocation.
   * <p>
   * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
   * that are defined on the {@link Paho.MQTT.Client} object.
   * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
   *
   * @name Paho.MQTT.Client
   *
   * @constructor
   *
   * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
   * @param {number} port - the port number to connect to - only required if host is not a URI
   * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
   * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
   *
   * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
   * @property {number} port - <i>read only</i> the server's port.
   * @property {string} path - <i>read only</i> the server's path.
   * @property {string} clientId - <i>read only</i> used when connecting to the server.
   * @property {function} onConnectionLost - called when a connection has been lost.
   *                            after a connect() method has succeeded.
   *                            Establish the call back used when a connection has been lost. The connection may be
   *                            lost because the client initiates a disconnect or because the server or network
   *                            cause the client to be disconnected. The disconnect call back may be called without
   *                            the connectionComplete call back being invoked if, for example the client fails to
   *                            connect.
   *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
   *                            <ol>
   *                            <li>errorCode
   *                            <li>errorMessage
   *                            </ol>
   * @property {function} onMessageDelivered called when a message has been delivered.
   *                            All processing that this Client will ever do has been completed. So, for example,
   *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
   *                            and the message has been removed from persistent storage before this callback is invoked.
   *                            Parameters passed to the onMessageDelivered callback are:
   *                            <ol>
   *                            <li>{@link Paho.MQTT.Message} that was delivered.
   *                            </ol>
   * @property {function} onMessageArrived called when a message has arrived in this Paho.MQTT.client.
   *                            Parameters passed to the onMessageArrived callback are:
   *                            <ol>
   *                            <li>{@link Paho.MQTT.Message} that has arrived.
   *                            </ol>
   */
  var Client = function (host, port, path, clientId) {

    var uri;

    if (typeof host !== "string")
      throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

    if (arguments.length == 2) {
      // host: must be full ws:// uri
      // port: clientId
      clientId = port;
      uri = host;
      var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
      if (match) {
        host = match[4]||match[2];
        port = parseInt(match[7]);
        path = match[8];
      } else {
        throw new Error(format(ERROR.INVALID_ARGUMENT,[host,"host"]));
      }
    } else {
      if (arguments.length == 3) {
        clientId = path;
        path = "/mqtt";
      }
      if (typeof port !== "number" || port < 0)
        throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
      if (typeof path !== "string")
        throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

      var ipv6AddSBracket = (host.indexOf(":") != -1 && host.slice(0,1) != "[" && host.slice(-1) != "]");
      uri = "ws://"+(ipv6AddSBracket?"["+host+"]":host)+":"+port+path;
    }

    var clientIdLength = 0;
    for (var i = 0; i<clientId.length; i++) {
      var charCode = clientId.charCodeAt(i);
      if (0xD800 <= charCode && charCode <= 0xDBFF)  {
        i++; // Surrogate pair.
      }
      clientIdLength++;
    }
    if (typeof clientId !== "string" || clientIdLength > 65535)
      throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

    var client = new ClientImpl(uri, host, port, path, clientId);
    this._getHost =  function() { return host; };
    this._setHost = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

    this._getPort = function() { return port; };
    this._setPort = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

    this._getPath = function() { return path; };
    this._setPath = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

    this._getURI = function() { return uri; };
    this._setURI = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

    this._getClientId = function() { return client.clientId; };
    this._setClientId = function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };

    this._getOnConnectionLost = function() { return client.onConnectionLost; };
    this._setOnConnectionLost = function(newOnConnectionLost) {
      if (typeof newOnConnectionLost === "function")
        client.onConnectionLost = newOnConnectionLost;
      else
        throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
    };

    this._getOnMessageDelivered = function() { return client.onMessageDelivered; };
    this._setOnMessageDelivered = function(newOnMessageDelivered) {
      if (typeof newOnMessageDelivered === "function")
        client.onMessageDelivered = newOnMessageDelivered;
      else
        throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
    };

    this._getOnMessageArrived = function() { return client.onMessageArrived; };
    this._setOnMessageArrived = function(newOnMessageArrived) {
      if (typeof newOnMessageArrived === "function")
        client.onMessageArrived = newOnMessageArrived;
      else
        throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
    };

    /**
     * Connect this Messaging client to its server.
     *
     * @name Paho.MQTT.Client#connect
     * @function
     * @param {Object} connectOptions - attributes used with the connection.
     * @param {number} connectOptions.timeout - If the connect has not succeeded within this
     *                    number of seconds, it is deemed to have failed.
     *                    The default is 30 seconds.
     * @param {string} connectOptions.userName - Authentication username for this connection.
     * @param {string} connectOptions.password - Authentication password for this connection.
     * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
     *                    disconnects abnormally.
     * @param {Number} connectOptions.keepAliveInterval - the server disconnects this client if
     *                    there is no activity for this number of seconds.
     *                    The default value of 60 seconds is assumed if not set.
     * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
     *                    persistent state is deleted on successful connect.
     * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
     * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
     * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
     *                    has been received from the server.
     * A single response object parameter is passed to the onSuccess callback containing the following fields:
     * <ol>
     * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
     * </ol>
     * @config {function} [onFailure] called when the connect request has failed or timed out.
     * A single response object parameter is passed to the onFailure callback containing the following fields:
     * <ol>
     * <li>invocationContext as passed in to the onFailure method in the connectOptions.
     * <li>errorCode a number indicating the nature of the error.
     * <li>errorMessage text describing the error.
     * </ol>
     * @config {Array} [hosts] If present this contains either a set of hostnames or fully qualified
     * WebSocket URIs (ws://example.com:1883/mqtt), that are tried in order in place
     * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
     * one of then succeeds.
     * @config {Array} [ports] If present the set of ports matching the hosts. If hosts contains URIs, this property
     * is not used.
     * @throws {InvalidState} if the client is not in disconnected state. The client must have received connectionLost
     * or disconnected before calling connect for a second or subsequent time.
     */
    this.connect = function (connectOptions) {
      connectOptions = connectOptions || {} ;
      validate(connectOptions,  {timeout:"number",
        userName:"string",
        password:"string",
        willMessage:"object",
        keepAliveInterval:"number",
        cleanSession:"boolean",
        useSSL:"boolean",
        invocationContext:"object",
        onSuccess:"function",
        onFailure:"function",
        hosts:"object",
        ports:"object",
        mqttVersion:"number"});

      // If no keep alive interval is set, assume 60 seconds.
      if (connectOptions.keepAliveInterval === undefined)
        connectOptions.keepAliveInterval = 60;

      if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
      }

      if (connectOptions.mqttVersion === undefined) {
        connectOptions.mqttVersionExplicit = false;
        connectOptions.mqttVersion = 4;
      } else {
        connectOptions.mqttVersionExplicit = true;
      }

      //Check that if password is set, so is username
      if (connectOptions.password === undefined && connectOptions.userName !== undefined)
        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]))

      if (connectOptions.willMessage) {
        if (!(connectOptions.willMessage instanceof Message))
          throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
        // The will message must have a payload that can be represented as a string.
        // Cause the willMessage to throw an exception if this is not the case.
        connectOptions.willMessage.stringPayload;

        if (typeof connectOptions.willMessage.destinationName === "undefined")
          throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
      }
      if (typeof connectOptions.cleanSession === "undefined")
        connectOptions.cleanSession = true;
      if (connectOptions.hosts) {

        if (!(connectOptions.hosts instanceof Array) )
          throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
        if (connectOptions.hosts.length <1 )
          throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

        var usingURIs = false;
        for (var i = 0; i<connectOptions.hosts.length; i++) {
          if (typeof connectOptions.hosts[i] !== "string")
            throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
          if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
            if (i == 0) {
              usingURIs = true;
            } else if (!usingURIs) {
              throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
            }
          } else if (usingURIs) {
            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
          }
        }

        if (!usingURIs) {
          if (!connectOptions.ports)
            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
          if (!(connectOptions.ports instanceof Array) )
            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
          if (connectOptions.hosts.length != connectOptions.ports.length)
            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

          connectOptions.uris = [];

          for (var i = 0; i<connectOptions.hosts.length; i++) {
            if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
              throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
            var host = connectOptions.hosts[i];
            var port = connectOptions.ports[i];

            var ipv6 = (host.indexOf(":") != -1);
            uri = "ws://"+(ipv6?"["+host+"]":host)+":"+port+path;
            connectOptions.uris.push(uri);
          }
        } else {
          connectOptions.uris = connectOptions.hosts;
        }
      }

      client.connect(connectOptions);
    };

    /**
     * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
     *
     * @name Paho.MQTT.Client#subscribe
     * @function
     * @param {string} filter describing the destinations to receive messages from.
     * <br>
     * @param {object} subscribeOptions - used to control the subscription
     *
     * @param {number} subscribeOptions.qos - the maiximum qos of any publications sent
     *                                  as a result of making this subscription.
     * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
     *                                  or onFailure callback.
     * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
     *                                  has been received from the server.
     *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
     *                                  <ol>
     *                                  <li>invocationContext if set in the subscribeOptions.
     *                                  </ol>
     * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
     *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
     *                                  <ol>
     *                                  <li>invocationContext - if set in the subscribeOptions.
     *                                  <li>errorCode - a number indicating the nature of the error.
     *                                  <li>errorMessage - text describing the error.
     *                                  </ol>
     * @param {number} subscribeOptions.timeout - which, if present, determines the number of
     *                                  seconds after which the onFailure calback is called.
     *                                  The presence of a timeout does not prevent the onSuccess
     *                                  callback from being called when the subscribe completes.
     * @throws {InvalidState} if the client is not in connected state.
     */
    this.subscribe = function (filter, subscribeOptions) {
      if (typeof filter !== "string")
        throw new Error("Invalid argument:"+filter);
      subscribeOptions = subscribeOptions || {} ;
      validate(subscribeOptions,  {qos:"number",
        invocationContext:"object",
        onSuccess:"function",
        onFailure:"function",
        timeout:"number"
      });
      if (subscribeOptions.timeout && !subscribeOptions.onFailure)
        throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
      if (typeof subscribeOptions.qos !== "undefined"
        && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
        throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
      client.subscribe(filter, subscribeOptions);
    };

    /**
     * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
     *
     * @name Paho.MQTT.Client#unsubscribe
     * @function
     * @param {string} filter - describing the destinations to receive messages from.
     * @param {object} unsubscribeOptions - used to control the subscription
     * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
     or onFailure callback.
     * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
     *                                    A single response object parameter is passed to the
     *                                    onSuccess callback containing the following fields:
     *                                    <ol>
     *                                    <li>invocationContext - if set in the unsubscribeOptions.
     *                                    </ol>
     * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
     *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
     *                                    <ol>
     *                                    <li>invocationContext - if set in the unsubscribeOptions.
     *                                    <li>errorCode - a number indicating the nature of the error.
     *                                    <li>errorMessage - text describing the error.
     *                                    </ol>
     * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
     *                                    after which the onFailure callback is called. The presence of
     *                                    a timeout does not prevent the onSuccess callback from being
     *                                    called when the unsubscribe completes
     * @throws {InvalidState} if the client is not in connected state.
     */
    this.unsubscribe = function (filter, unsubscribeOptions) {
      if (typeof filter !== "string")
        throw new Error("Invalid argument:"+filter);
      unsubscribeOptions = unsubscribeOptions || {} ;
      validate(unsubscribeOptions,  {invocationContext:"object",
        onSuccess:"function",
        onFailure:"function",
        timeout:"number"
      });
      if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
        throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
      client.unsubscribe(filter, unsubscribeOptions);
    };

    /**
     * Send a message to the consumers of the destination in the Message.
     *
     * @name Paho.MQTT.Client#send
     * @function
     * @param {Paho.MQTT.Message} message to send.

     * @throws {InvalidState} if the client is not connected.
     */
    this.send = function (message) {
      if (!(message instanceof Message))
        throw new Error("Invalid argument:"+typeof message);
      if (typeof message.destinationName === "undefined")
        throw new Error("Invalid parameter Message.destinationName:"+message.destinationName);

      client.send(message);
    };

    /**
     * Normal disconnect of this Messaging client from its server.
     *
     * @name Paho.MQTT.Client#disconnect
     * @function
     * @throws {InvalidState} if the client is already disconnected.
     */
    this.disconnect = function () {
      client.disconnect();
    };

    /**
     * Get the contents of the trace log.
     *
     * @name Paho.MQTT.Client#getTraceLog
     * @function
     * @return {Object[]} tracebuffer containing the time ordered trace records.
     */
    this.getTraceLog = function () {
      return client.getTraceLog();
    }

    /**
     * Start tracing.
     *
     * @name Paho.MQTT.Client#startTrace
     * @function
     */
    this.startTrace = function () {
      client.startTrace();
    };

    /**
     * Stop tracing.
     *
     * @name Paho.MQTT.Client#stopTrace
     * @function
     */
    this.stopTrace = function () {
      client.stopTrace();
    };

    this.isConnected = function() {
      return client.connected;
    };
  };

  Client.prototype = {
    get host() { return this._getHost(); },
    set host(newHost) { this._setHost(newHost); },

    get port() { return this._getPort(); },
    set port(newPort) { this._setPort(newPort); },

    get path() { return this._getPath(); },
    set path(newPath) { this._setPath(newPath); },

    get clientId() { return this._getClientId(); },
    set clientId(newClientId) { this._setClientId(newClientId); },

    get onConnectionLost() { return this._getOnConnectionLost(); },
    set onConnectionLost(newOnConnectionLost) { this._setOnConnectionLost(newOnConnectionLost); },

    get onMessageDelivered() { return this._getOnMessageDelivered(); },
    set onMessageDelivered(newOnMessageDelivered) { this._setOnMessageDelivered(newOnMessageDelivered); },

    get onMessageArrived() { return this._getOnMessageArrived(); },
    set onMessageArrived(newOnMessageArrived) { this._setOnMessageArrived(newOnMessageArrived); }
  };

  /**
   * An application message, sent or received.
   * <p>
   * All attributes may be null, which implies the default values.
   *
   * @name Paho.MQTT.Message
   * @constructor
   * @param {String|ArrayBuffer} payload The message data to be sent.
   * <p>
   * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
   * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
   * <p>
   * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
   *                    (for messages about to be sent) or the name of the destination from which the message has been received.
   *                    (for messages received by the onMessage function).
   * <p>
   * @property {number} qos The Quality of Service used to deliver the message.
   * <dl>
   *     <dt>0 Best effort (default).
   *     <dt>1 At least once.
   *     <dt>2 Exactly once.
   * </dl>
   * <p>
   * @property {Boolean} retained If true, the message is to be retained by the server and delivered
   *                     to both current and future subscriptions.
   *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
   *                     A received message has the retained boolean set to true if the message was published
   *                     with the retained boolean set to true
   *                     and the subscrption was made after the message has been published.
   * <p>
   * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
   *                     This is only set on messages received from the server.
   *
   */
  var Message = function (newPayload) {
    var payload;
    if (   typeof newPayload === "string"
      || newPayload instanceof ArrayBuffer
      || newPayload instanceof Int8Array
      || newPayload instanceof Uint8Array
      || newPayload instanceof Int16Array
      || newPayload instanceof Uint16Array
      || newPayload instanceof Int32Array
      || newPayload instanceof Uint32Array
      || newPayload instanceof Float32Array
      || newPayload instanceof Float64Array
      ) {
      payload = newPayload;
    } else {
      throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
    }

    this._getPayloadString = function () {
      if (typeof payload === "string")
        return payload;
      else
        return parseUTF8(payload, 0, payload.length);
    };

    this._getPayloadBytes = function() {
      if (typeof payload === "string") {
        var buffer = new ArrayBuffer(UTF8Length(payload));
        var byteStream = new Uint8Array(buffer);
        stringToUTF8(payload, byteStream, 0);

        return byteStream;
      } else {
        return payload;
      };
    };

    var destinationName = undefined;
    this._getDestinationName = function() { return destinationName; };
    this._setDestinationName = function(newDestinationName) {
      if (typeof newDestinationName === "string")
        destinationName = newDestinationName;
      else
        throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
    };

    var qos = 0;
    this._getQos = function() { return qos; };
    this._setQos = function(newQos) {
      if (newQos === 0 || newQos === 1 || newQos === 2 )
        qos = newQos;
      else
        throw new Error("Invalid argument:"+newQos);
    };

    var retained = false;
    this._getRetained = function() { return retained; };
    this._setRetained = function(newRetained) {
      if (typeof newRetained === "boolean")
        retained = newRetained;
      else
        throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
    };

    var duplicate = false;
    this._getDuplicate = function() { return duplicate; };
    this._setDuplicate = function(newDuplicate) { duplicate = newDuplicate; };
  };

  Message.prototype = {
    get payloadString() { return this._getPayloadString(); },
    get payloadBytes() { return this._getPayloadBytes(); },

    get destinationName() { return this._getDestinationName(); },
    set destinationName(newDestinationName) { this._setDestinationName(newDestinationName); },

    get qos() { return this._getQos(); },
    set qos(newQos) { this._setQos(newQos); },

    get retained() { return this._getRetained(); },
    set retained(newRetained) { this._setRetained(newRetained); },

    get duplicate() { return this._getDuplicate(); },
    set duplicate(newDuplicate) { this._setDuplicate(newDuplicate); }
  };

  // Module contents.
  return {
    Client: Client,
    Message: Message
  };
})(window);

;
(function(){function t(t,e){return function(o){o.keyCode===e&&(t.toggle(),o.preventDefault())}}function e(t){var e=0;return function(o){switch(o.keyCode){case 13:var n=o.target.value;t.history[0]=n,o.target.value="",n&&t.log("command",n),t.history.unshift(""),t.history.length>t.cfg.historySize&&(t.history=t.history.splice(0,t.cfg.historySize)),t.dispatch(n);break;case 38:void 0!==t.history[e+1]&&(o.target.value=t.history[++e]),e>=t.history.length&&(e=t.history.length-1),o.preventDefault();break;case 40:""!==t.history[e]&&(o.target.value=t.history[--e]),0>e&&(e=0);break;default:e=0,t.history[0]=o.target.value}}}function o(t){t&&(document.head.appendChild(a.toElement("<style>"+t+"</style>")),s=!1)}var n=this,i={hotkey:192,welcome:"",onShow:null,onHide:null,defaultHandler:null,caseSensitive:!1,historySize:256},s=".console-panel{z-index:99999;display:block;visibility:hidden;height:50%;position:fixed;top:0;left:0;width:100%;background-color:rgba(0,0,0,.8);margin-top:-50%;transition:margin-top 100ms ease-out 1ms}.console-panel.shown{visibility:visible;margin-top:0}.console-history,.console-input{margin:0;padding:2px 5px;box-sizing:border-box;position:absolute;width:100%;font:14px/20px Menlo,monospace;color:#DDD;letter-spacing:.05em}.console-history{bottom:18px}.console-history dd,.console-history dt{white-space:pre;margin:0}.console-history dt{color:#7E0}.console-input{outline:0;background-color:transparent;border:0;bottom:0;line-height:16px;padding:4px 5px}",l='<label class="console-panel"><dl class="console-history"></dl><input class="console-input"/></label>',r=null;n.Console=function(n,r){var h=a.defaults(r||{},i);h.historySize++,this.history=[],this.cfg=h,this.commands={};for(var c in n)n.hasOwnProperty(c)&&this.register(c,n[c]);this.panelEl=a.toElement(l),this.logEl=this.panelEl.firstChild,this.inputEl=this.logEl.nextSibling,h.hotkey&&(this.hotkeyListener=t(this,h.hotkey),window.addEventListener("keydown",this.hotkeyListener)),this.inputEl.addEventListener("keydown",e(this)),h.welcome&&this.log("message",h.welcome),document.body.appendChild(this.panelEl),o(s)},Console.prototype.log=function(t){var e,o=Array.prototype.slice.call(arguments,1);switch(t){case"command":e=a.toElement("<dt></dt>"),e.appendChild(document.createTextNode(o[0]));break;case"message":e=a.toElement("<dd>"+o.join(" ")+"</dd>");break;default:o.unshift(t),e=a.toElement("<dd>"+o.join(" ")+"</dd>")}this.logEl.appendChild(e)},Console.prototype.dispatch=function(t){var e,o=t.split(" "),n=this.cfg.caseSensitive===!1?o[0].toLowerCase():o[0],i=this.commands[n];if(i){for(;a.isString(i.__fn);)if(i=this.commands[i.__fn],i===n)throw new Error("Alias loop.");e=i&&i.__fn.apply(i,o.splice(1))}else a.isFunction(this.cfg.defaultHandler)&&(e=this.cfg.defaultHandler.apply(this,o));e&&this.log("message",e)},Console.prototype.toggle=function(t){"off"===t||this.isShown?(r=!1,a.removeClass(this.panelEl,"shown"),this.inputEl.blur(),this.isShown=!1,a.isFunction(this.cfg.onHide)&&this.cfg.onHide(this)):"on"!==t&&this.isShown||(r&&r.toggle("off"),r=this,a.addClass(this.panelEl,"shown"),this.inputEl.focus(),this.isShown=!0,a.isFunction(this.cfg.onShow)&&this.cfg.onShow(this))},Console.prototype.register=function(t,e,o){return this.cfg.caseSensitive===!1&&(t=t.toLowerCase()),this.commands[t]=a.defaults({__fn:e},o),this},Console.prototype.destroy=function(){this.hotkeyListener&&window.removeEventListener("keydown",this.hotkeyListener),document.body.removeChild(this.panelEl)};var a={defaults:function(t){return Array.prototype.slice.call(arguments,1).forEach(function(e){for(var o in e)void 0===t[o]&&(t[o]=e[o])}),t},toElement:function(t){var e=document.createElement("div");return e.innerHTML=t,e.firstChild},preventDefault:function(t){t.preventDefault()},hasClass:function(t,e){new RegExp("\\b"+e+"\\b").test(t.className)},removeClass:function(t,e){t.className=t.className.replace(new RegExp("\\b ?"+e+"\\b","g"),"")},addClass:function(t,e){t.className=t.className.replace(new RegExp("\\b"+e+"\\b|$")," "+e)},isFunction:function(t){return"function"==typeof t},isNumber:function(t){return"[object Number]"===toString.call(t)},isString:function(t){return"[object String]"===toString.call(t)}};"function"==typeof define&&define.amd&&define([],function(){return Console})}).call(this);
;
/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* More information about these options at jshint.com/docs/options */
/* jshint browser: true, camelcase: true, curly: true, devel: true,
   eqeqeq: true, forin: false, globalstrict: true, node: true,
   quotmark: single, undef: true, unused: strict */
/* global mozRTCIceCandidate, mozRTCPeerConnection, Promise,
mozRTCSessionDescription, webkitRTCPeerConnection, MediaStreamTrack */
/* exported trace,requestUserMedia */

'use strict';

var getUserMedia = null;
var attachMediaStream = null;
var reattachMediaStream = null;
var webrtcDetectedBrowser = null;
var webrtcDetectedVersion = null;
var webrtcMinimumVersion = null;
var webrtcUtils = {
  log: function() {
    // suppress console.log output when being included as a module.
    if (typeof module !== 'undefined' ||
        typeof require === 'function' && typeof define === 'function') {
      return;
    }
    console.log.apply(console, arguments);
  }
};

function trace(text) {
  // This function is used for logging.
  if (text[text.length - 1] === '\n') {
    text = text.substring(0, text.length - 1);
  }
  if (window.performance) {
    var now = (window.performance.now() / 1000).toFixed(3);
    webrtcUtils.log(now + ': ' + text);
  } else {
    webrtcUtils.log(text);
  }
}

if (typeof window === 'object') {
  if (window.HTMLMediaElement &&
    !('srcObject' in window.HTMLMediaElement.prototype)) {
    // Shim the srcObject property, once, when HTMLMediaElement is found.
    Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
      get: function() {
        // If prefixed srcObject property exists, return it.
        // Otherwise use the shimmed property, _srcObject
        return 'mozSrcObject' in this ? this.mozSrcObject : this._srcObject;
      },
      set: function(stream) {
        if ('mozSrcObject' in this) {
          this.mozSrcObject = stream;
        } else {
          // Use _srcObject as a private property for this shim
          this._srcObject = stream;
          // TODO: revokeObjectUrl(this.src) when !stream to release resources?
          this.src = URL.createObjectURL(stream);
        }
      }
    });
  }
  // Proxy existing globals
  getUserMedia = window.navigator && window.navigator.getUserMedia;
}

// Attach a media stream to an element.
attachMediaStream = function(element, stream) {
  element.srcObject = stream;
};

reattachMediaStream = function(to, from) {
  to.srcObject = from.srcObject;
};

if (typeof window === 'undefined' || !window.navigator) {
  webrtcUtils.log('This does not appear to be a browser');
  webrtcDetectedBrowser = 'not a browser';
} else if (navigator.mozGetUserMedia && window.mozRTCPeerConnection) {
  webrtcUtils.log('This appears to be Firefox');

  webrtcDetectedBrowser = 'firefox';

  // the detected firefox version.
  webrtcDetectedVersion =
    parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);

  // the minimum firefox version still supported by adapter.
  webrtcMinimumVersion = 31;

  // The RTCPeerConnection object.
  window.RTCPeerConnection = function(pcConfig, pcConstraints) {
    if (webrtcDetectedVersion < 38) {
      // .urls is not supported in FF < 38.
      // create RTCIceServers with a single url.
      if (pcConfig && pcConfig.iceServers) {
        var newIceServers = [];
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
          var server = pcConfig.iceServers[i];
          if (server.hasOwnProperty('urls')) {
            for (var j = 0; j < server.urls.length; j++) {
              var newServer = {
                url: server.urls[j]
              };
              if (server.urls[j].indexOf('turn') === 0) {
                newServer.username = server.username;
                newServer.credential = server.credential;
              }
              newIceServers.push(newServer);
            }
          } else {
            newIceServers.push(pcConfig.iceServers[i]);
          }
        }
        pcConfig.iceServers = newIceServers;
      }
    }
    return new mozRTCPeerConnection(pcConfig, pcConstraints); // jscs:ignore requireCapitalizedConstructors
  };

  // The RTCSessionDescription object.
  window.RTCSessionDescription = mozRTCSessionDescription;

  // The RTCIceCandidate object.
  window.RTCIceCandidate = mozRTCIceCandidate;

  // getUserMedia constraints shim.
  getUserMedia = function(constraints, onSuccess, onError) {
    var constraintsToFF37 = function(c) {
      if (typeof c !== 'object' || c.require) {
        return c;
      }
      var require = [];
      Object.keys(c).forEach(function(key) {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        var r = c[key] = (typeof c[key] === 'object') ?
            c[key] : {ideal: c[key]};
        if (r.min !== undefined ||
            r.max !== undefined || r.exact !== undefined) {
          require.push(key);
        }
        if (r.exact !== undefined) {
          if (typeof r.exact === 'number') {
            r.min = r.max = r.exact;
          } else {
            c[key] = r.exact;
          }
          delete r.exact;
        }
        if (r.ideal !== undefined) {
          c.advanced = c.advanced || [];
          var oc = {};
          if (typeof r.ideal === 'number') {
            oc[key] = {min: r.ideal, max: r.ideal};
          } else {
            oc[key] = r.ideal;
          }
          c.advanced.push(oc);
          delete r.ideal;
          if (!Object.keys(r).length) {
            delete c[key];
          }
        }
      });
      if (require.length) {
        c.require = require;
      }
      return c;
    };
    if (webrtcDetectedVersion < 38) {
      webrtcUtils.log('spec: ' + JSON.stringify(constraints));
      if (constraints.audio) {
        constraints.audio = constraintsToFF37(constraints.audio);
      }
      if (constraints.video) {
        constraints.video = constraintsToFF37(constraints.video);
      }
      webrtcUtils.log('ff37: ' + JSON.stringify(constraints));
    }
    return navigator.mozGetUserMedia(constraints, onSuccess, onError);
  };

  navigator.getUserMedia = getUserMedia;

  // Shim for mediaDevices on older versions.
  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {getUserMedia: requestUserMedia,
      addEventListener: function() { },
      removeEventListener: function() { }
    };
  }
  navigator.mediaDevices.enumerateDevices =
      navigator.mediaDevices.enumerateDevices || function() {
    return new Promise(function(resolve) {
      var infos = [
        {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
        {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
      ];
      resolve(infos);
    });
  };

  if (webrtcDetectedVersion < 41) {
    // Work around http://bugzil.la/1169665
    var orgEnumerateDevices =
        navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
    navigator.mediaDevices.enumerateDevices = function() {
      return orgEnumerateDevices().catch(function(e) {
        if (e.name === 'NotFoundError') {
          return [];
        }
        throw e;
      });
    };
  }
} else if (navigator.webkitGetUserMedia && !!window.chrome) {
  webrtcUtils.log('This appears to be Chrome');

  webrtcDetectedBrowser = 'chrome';

  // the detected chrome version.
  webrtcDetectedVersion =
    parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);

  // the minimum chrome version still supported by adapter.
  webrtcMinimumVersion = 38;

  // The RTCPeerConnection object.
  window.RTCPeerConnection = function(pcConfig, pcConstraints) {
    // Translate iceTransportPolicy to iceTransports,
    // see https://code.google.com/p/webrtc/issues/detail?id=4869
    if (pcConfig && pcConfig.iceTransportPolicy) {
      pcConfig.iceTransports = pcConfig.iceTransportPolicy;
    }

    var pc = new webkitRTCPeerConnection(pcConfig, pcConstraints); // jscs:ignore requireCapitalizedConstructors
    var origGetStats = pc.getStats.bind(pc);
    pc.getStats = function(selector, successCallback, errorCallback) { // jshint ignore: line
      var self = this;
      var args = arguments;

      // If selector is a function then we are in the old style stats so just
      // pass back the original getStats format to avoid breaking old users.
      if (arguments.length > 0 && typeof selector === 'function') {
        return origGetStats(selector, successCallback);
      }

      var fixChromeStats = function(response) {
        var standardReport = {};
        var reports = response.result();
        reports.forEach(function(report) {
          var standardStats = {
            id: report.id,
            timestamp: report.timestamp,
            type: report.type
          };
          report.names().forEach(function(name) {
            standardStats[name] = report.stat(name);
          });
          standardReport[standardStats.id] = standardStats;
        });

        return standardReport;
      };

      if (arguments.length >= 2) {
        var successCallbackWrapper = function(response) {
          args[1](fixChromeStats(response));
        };

        return origGetStats.apply(this, [successCallbackWrapper, arguments[0]]);
      }

      // promise-support
      return new Promise(function(resolve, reject) {
        if (args.length === 1 && selector === null) {
          origGetStats.apply(self, [
              function(response) {
                resolve.apply(null, [fixChromeStats(response)]);
              }, reject]);
        } else {
          origGetStats.apply(self, [resolve, reject]);
        }
      });
    };

    return pc;
  };

  // add promise support
  ['createOffer', 'createAnswer'].forEach(function(method) {
    var nativeMethod = webkitRTCPeerConnection.prototype[method];
    webkitRTCPeerConnection.prototype[method] = function() {
      var self = this;
      if (arguments.length < 1 || (arguments.length === 1 &&
          typeof(arguments[0]) === 'object')) {
        var opts = arguments.length === 1 ? arguments[0] : undefined;
        return new Promise(function(resolve, reject) {
          nativeMethod.apply(self, [resolve, reject, opts]);
        });
      } else {
        return nativeMethod.apply(this, arguments);
      }
    };
  });

  ['setLocalDescription', 'setRemoteDescription',
      'addIceCandidate'].forEach(function(method) {
    var nativeMethod = webkitRTCPeerConnection.prototype[method];
    webkitRTCPeerConnection.prototype[method] = function() {
      var args = arguments;
      var self = this;
      return new Promise(function(resolve, reject) {
        nativeMethod.apply(self, [args[0],
            function() {
              resolve();
              if (args.length >= 2) {
                args[1].apply(null, []);
              }
            },
            function(err) {
              reject(err);
              if (args.length >= 3) {
                args[2].apply(null, [err]);
              }
            }]
          );
      });
    };
  });

  // getUserMedia constraints shim.
  var constraintsToChrome = function(c) {
    if (typeof c !== 'object' || c.mandatory || c.optional) {
      return c;
    }
    var cc = {};
    Object.keys(c).forEach(function(key) {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }
      var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }
      var oldname = function(prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }
        return (name === 'deviceId') ? 'sourceId' : name;
      };
      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        var oc = {};
        if (typeof r.ideal === 'number') {
          oc[oldname('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }
      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(function(mix) {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname(mix, key)] = r[mix];
          }
        });
      }
    });
    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }
    return cc;
  };

  getUserMedia = function(constraints, onSuccess, onError) {
    if (constraints.audio) {
      constraints.audio = constraintsToChrome(constraints.audio);
    }
    if (constraints.video) {
      constraints.video = constraintsToChrome(constraints.video);
    }
    webrtcUtils.log('chrome: ' + JSON.stringify(constraints));
    return navigator.webkitGetUserMedia(constraints, onSuccess, onError);
  };
  navigator.getUserMedia = getUserMedia;

  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {getUserMedia: requestUserMedia,
                              enumerateDevices: function() {
      return new Promise(function(resolve) {
        var kinds = {audio: 'audioinput', video: 'videoinput'};
        return MediaStreamTrack.getSources(function(devices) {
          resolve(devices.map(function(device) {
            return {label: device.label,
                    kind: kinds[device.kind],
                    deviceId: device.id,
                    groupId: ''};
          }));
        });
      });
    }};
  }

  // A shim for getUserMedia method on the mediaDevices object.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (!navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      return requestUserMedia(constraints);
    };
  } else {
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
        bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(c) {
      webrtcUtils.log('spec:   ' + JSON.stringify(c)); // whitespace for alignment
      c.audio = constraintsToChrome(c.audio);
      c.video = constraintsToChrome(c.video);
      webrtcUtils.log('chrome: ' + JSON.stringify(c));
      return origGetUserMedia(c);
    };
  }

  // Dummy devicechange event methods.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
    navigator.mediaDevices.addEventListener = function() {
      webrtcUtils.log('Dummy mediaDevices.addEventListener called.');
    };
  }
  if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
    navigator.mediaDevices.removeEventListener = function() {
      webrtcUtils.log('Dummy mediaDevices.removeEventListener called.');
    };
  }

  // Attach a media stream to an element.
  attachMediaStream = function(element, stream) {
    if (webrtcDetectedVersion >= 43) {
      element.srcObject = stream;
    } else if (typeof element.src !== 'undefined') {
      element.src = URL.createObjectURL(stream);
    } else {
      webrtcUtils.log('Error attaching stream to element.');
    }
  };
  reattachMediaStream = function(to, from) {
    if (webrtcDetectedVersion >= 43) {
      to.srcObject = from.srcObject;
    } else {
      to.src = from.src;
    }
  };

} else if (navigator.mediaDevices && navigator.userAgent.match(
    /Edge\/(\d+).(\d+)$/)) {
  webrtcUtils.log('This appears to be Edge');
  webrtcDetectedBrowser = 'edge';

  webrtcDetectedVersion =
    parseInt(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)[2], 10);

  // the minimum version still supported by adapter.
  webrtcMinimumVersion = 12;
} else {
  webrtcUtils.log('Browser does not appear to be WebRTC-capable');
}

// Returns the result of getUserMedia as a Promise.
function requestUserMedia(constraints) {
  return new Promise(function(resolve, reject) {
    getUserMedia(constraints, resolve, reject);
  });
}

var webrtcTesting = {};
Object.defineProperty(webrtcTesting, 'version', {
  set: function(version) {
    webrtcDetectedVersion = version;
  }
});

if (typeof module !== 'undefined') {
  var RTCPeerConnection;
  if (typeof window !== 'undefined') {
    RTCPeerConnection = window.RTCPeerConnection;
  }
  module.exports = {
    RTCPeerConnection: RTCPeerConnection,
    getUserMedia: getUserMedia,
    attachMediaStream: attachMediaStream,
    reattachMediaStream: reattachMediaStream,
    webrtcDetectedBrowser: webrtcDetectedBrowser,
    webrtcDetectedVersion: webrtcDetectedVersion,
    webrtcMinimumVersion: webrtcMinimumVersion,
    webrtcTesting: webrtcTesting
    //requestUserMedia: not exposed on purpose.
    //trace: not exposed on purpose.
  };
} else if ((typeof require === 'function') && (typeof define === 'function')) {
  // Expose objects and functions when RequireJS is doing the loading.
  define([], function() {
    return {
      RTCPeerConnection: window.RTCPeerConnection,
      getUserMedia: getUserMedia,
      attachMediaStream: attachMediaStream,
      reattachMediaStream: reattachMediaStream,
      webrtcDetectedBrowser: webrtcDetectedBrowser,
      webrtcDetectedVersion: webrtcDetectedVersion,
      webrtcMinimumVersion: webrtcMinimumVersion,
      webrtcTesting: webrtcTesting
      //requestUserMedia: not exposed on purpose.
      //trace: not exposed on purpose.
    };
  });
}

;
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.kurentoUtils = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var freeice = require('freeice');
var inherits = require('inherits');
var UAParser = require('ua-parser-js');
var uuid = require('uuid');
var EventEmitter = require('events').EventEmitter;
var recursive = require('merge').recursive.bind(undefined, true);
try {
    (function () {
        throw new Error('Cannot find module \'kurento-browser-extensions\' from \'/var/lib/jenkins/workspace/Development/kurento_project_js_release/lib\'');
    }());
} catch (error) {
    if (typeof getScreenConstraints === 'undefined') {
        console.warn('screen sharing is not available');
        getScreenConstraints = function getScreenConstraints(sendSource, callback) {
            callback(new Error('This library is not enabled for screen sharing'));
        };
    }
}
var MEDIA_CONSTRAINTS = {
        audio: true,
        video: {
            mandatory: {
                maxWidth: 640,
                maxFrameRate: 15,
                minFrameRate: 15
            }
        }
    };
var ua = window && window.navigator ? window.navigator.userAgent : '';
var parser = new UAParser(ua);
function noop(error) {
    if (error)
        console.error(error);
}
function trackStop(track) {
    track.stop && track.stop();
}
function streamStop(stream) {
    stream.getTracks().forEach(trackStop);
}
function bufferizeCandidates(pc, onerror) {
    var candidatesQueue = [];
    pc.addEventListener('signalingstatechange', function () {
        if (this.signalingState === 'stable') {
            while (candidatesQueue.length) {
                var entry = candidatesQueue.shift();
                this.addIceCandidate(entry.candidate, entry.callback, entry.callback);
            }
        }
    });
    return function (candidate, callback) {
        callback = callback || onerror;
        switch (pc.signalingState) {
        case 'closed':
            callback(new Error('PeerConnection object is closed'));
            break;
        case 'stable':
            if (pc.remoteDescription) {
                pc.addIceCandidate(candidate, callback, callback);
                break;
            }
        default:
            candidatesQueue.push({
                candidate: candidate,
                callback: callback
            });
        }
    };
}
function WebRtcPeer(mode, options, callback) {
    if (!(this instanceof WebRtcPeer)) {
        return new WebRtcPeer(mode, options, callback);
    }
    WebRtcPeer.super_.call(this);
    if (options instanceof Function) {
        callback = options;
        options = undefined;
    }
    options = options || {};
    callback = (callback || noop).bind(this);
    var localVideo = options.localVideo;
    var remoteVideo = options.remoteVideo;
    var videoStream = options.videoStream;
    var audioStream = options.audioStream;
    var mediaConstraints = options.mediaConstraints;
    var connectionConstraints = options.connectionConstraints;
    var pc = options.peerConnection;
    var sendSource = options.sendSource || 'webcam';
    var guid = uuid.v4();
    var configuration = recursive({ iceServers: freeice() }, options.configuration);
    var onstreamended = options.onstreamended;
    if (onstreamended)
        this.on('streamended', onstreamended);
    var onicecandidate = options.onicecandidate;
    if (onicecandidate)
        this.on('icecandidate', onicecandidate);
    var oncandidategatheringdone = options.oncandidategatheringdone;
    if (oncandidategatheringdone) {
        this.on('candidategatheringdone', oncandidategatheringdone);
    }
    if (!pc)
        pc = new RTCPeerConnection(configuration);
    Object.defineProperties(this, {
        'peerConnection': {
            get: function () {
                return pc;
            }
        },
        'remoteVideo': {
            get: function () {
                return remoteVideo;
            }
        },
        'localVideo': {
            get: function () {
                return localVideo;
            }
        },
        'currentFrame': {
            get: function () {
                if (!remoteVideo)
                    return;
                if (remoteVideo.readyState < remoteVideo.HAVE_CURRENT_DATA)
                    throw new Error('No video stream data available');
                var canvas = document.createElement('canvas');
                canvas.width = remoteVideo.videoWidth;
                canvas.height = remoteVideo.videoHeight;
                canvas.getContext('2d').drawImage(remoteVideo, 0, 0);
                return canvas;
            }
        }
    });
    var self = this;
    var candidatesQueueOut = [];
    var candidategatheringdone = false;
    pc.addEventListener('icecandidate', function (event) {
        var candidate = event.candidate;
        if (EventEmitter.listenerCount(self, 'icecandidate') || EventEmitter.listenerCount(self, 'candidategatheringdone')) {
            if (candidate) {
                self.emit('icecandidate', candidate);
                candidategatheringdone = false;
            } else if (!candidategatheringdone) {
                self.emit('candidategatheringdone');
                candidategatheringdone = true;
            }
        } else if (!candidategatheringdone) {
            candidatesQueueOut.push(candidate);
            if (!candidate)
                candidategatheringdone = true;
        }
    });
    this.on('newListener', function (event, listener) {
        if (event === 'icecandidate' || event === 'candidategatheringdone') {
            while (candidatesQueueOut.length) {
                var candidate = candidatesQueueOut.shift();
                if (!candidate === (event === 'candidategatheringdone')) {
                    listener(candidate);
                }
            }
        }
    });
    var addIceCandidate = bufferizeCandidates(pc);
    this.addIceCandidate = function (iceCandidate, callback) {
        var candidate = new RTCIceCandidate(iceCandidate);
        console.log('ICE candidate received');
        callback = (callback || noop).bind(this);
        addIceCandidate(candidate, callback);
    };
    this.generateOffer = function (callback) {
        callback = callback.bind(this);
        var browser = parser.getBrowser();
        var browserDependantConstraints = browser.name === 'Firefox' && browser.version > 34 ? {
                offerToReceiveAudio: mode !== 'sendonly',
                offerToReceiveVideo: mode !== 'sendonly'
            } : {
                mandatory: {
                    OfferToReceiveAudio: mode !== 'sendonly',
                    OfferToReceiveVideo: mode !== 'sendonly'
                },
                optional: [{ DtlsSrtpKeyAgreement: true }]
            };
        var constraints = recursive(browserDependantConstraints, connectionConstraints);
        console.log('constraints: ' + JSON.stringify(constraints));
        pc.createOffer(function (offer) {
            console.log('Created SDP offer');
            pc.setLocalDescription(offer, function () {
                console.log('Local description set', offer.sdp);
                callback(null, offer.sdp, self.processAnswer.bind(self));
            }, callback);
        }, callback, constraints);
    };
    this.getLocalSessionDescriptor = function () {
        return pc.localDescription;
    };
    this.getRemoteSessionDescriptor = function () {
        return pc.remoteDescription;
    };
    function setRemoteVideo() {
        if (remoteVideo) {
            var stream = pc.getRemoteStreams()[0];
            var url = stream ? URL.createObjectURL(stream) : '';
            remoteVideo.pause();
            remoteVideo.src = url;
            remoteVideo.load();
            console.log('Remote URL:', url);
        }
    }
    this.showLocalVideo = function () {
        localVideo.src = URL.createObjectURL(videoStream);
        localVideo.muted = true;
    };
    this.processAnswer = function (sdpAnswer, callback) {
        callback = (callback || noop).bind(this);
        var answer = new RTCSessionDescription({
                type: 'answer',
                sdp: sdpAnswer
            });
        console.log('SDP answer received, setting remote description');
        if (pc.signalingState === 'closed') {
            return callback('PeerConnection is closed');
        }
        pc.setRemoteDescription(answer, function () {
            setRemoteVideo();
            callback();
        }, callback);
    };
    this.processOffer = function (sdpOffer, callback) {
        callback = callback.bind(this);
        var offer = new RTCSessionDescription({
                type: 'offer',
                sdp: sdpOffer
            });
        console.log('SDP offer received, setting remote description');
        if (pc.signalingState === 'closed') {
            return callback('PeerConnection is closed');
        }
        pc.setRemoteDescription(offer, function () {
            setRemoteVideo();
            pc.createAnswer(function (answer) {
                console.log('Created SDP answer');
                pc.setLocalDescription(answer, function () {
                    console.log('Local description set', answer.sdp);
                    callback(null, answer.sdp);
                }, callback);
            }, callback);
        }, callback);
    };
    function streamEndedListener() {
        self.emit('streamended', this);
    }
    function start() {
        if (pc.signalingState === 'closed') {
            callback('The peer connection object is in "closed" state. This is most likely due to an invocation of the dispose method before accepting in the dialogue');
        }
        if (videoStream && localVideo) {
            self.showLocalVideo();
        }
        if (videoStream) {
            videoStream.addEventListener('ended', streamEndedListener);
            pc.addStream(videoStream);
        }
        if (audioStream) {
            audioStream.addEventListener('ended', streamEndedListener);
            pc.addStream(audioStream);
        }
        var browser = parser.getBrowser();
        if (mode === 'sendonly' && (browser.name === 'Chrome' || browser.name === 'Chromium') && browser.major === 39) {
            mode = 'sendrecv';
        }
        callback();
    }
    if (mode !== 'recvonly' && !videoStream && !audioStream) {
        function getMedia(constraints) {
            constraints = Array.prototype.slice.call(arguments);
            constraints.unshift(MEDIA_CONSTRAINTS);
            getUserMedia(recursive.apply(undefined, constraints), function (stream) {
                videoStream = stream;
                start();
            }, callback);
        }
        if (sendSource === 'webcam') {
            getMedia(mediaConstraints);
        } else {
            getScreenConstraints(sendSource, function (error, constraints) {
                if (error)
                    return callback(error);
                getMedia(constraints, mediaConstraints);
            }, guid);
        }
    } else {
        setTimeout(start, 0);
    }
    this.on('_dispose', function () {
        if (localVideo) {
            localVideo.pause();
            localVideo.src = '';
            localVideo.load();
        }
        if (remoteVideo) {
            remoteVideo.pause();
            remoteVideo.src = '';
            remoteVideo.load();
        }
        self.removeAllListeners();
        if (window.cancelChooseDesktopMedia !== undefined) {
            window.cancelChooseDesktopMedia(guid);
        }
    });
}
inherits(WebRtcPeer, EventEmitter);
function createEnableDescriptor(type) {
    var method = 'get' + type + 'Tracks';
    return {
        enumerable: true,
        get: function () {
            if (!this.peerConnection)
                return;
            var streams = this.peerConnection.getLocalStreams();
            if (!streams.length)
                return;
            for (var i = 0, stream; stream = streams[i]; i++) {
                var tracks = stream[method]();
                for (var j = 0, track; track = tracks[j]; j++)
                    if (!track.enabled)
                        return false;
            }
            return true;
        },
        set: function (value) {
            function trackSetEnable(track) {
                track.enabled = value;
            }
            this.peerConnection.getLocalStreams().forEach(function (stream) {
                stream[method]().forEach(trackSetEnable);
            });
        }
    };
}
Object.defineProperties(WebRtcPeer.prototype, {
    'enabled': {
        enumerable: true,
        get: function () {
            return this.audioEnabled && this.videoEnabled;
        },
        set: function (value) {
            this.audioEnabled = this.videoEnabled = value;
        }
    },
    'audioEnabled': createEnableDescriptor('Audio'),
    'videoEnabled': createEnableDescriptor('Video')
});
WebRtcPeer.prototype.getLocalStream = function (index) {
    if (this.peerConnection) {
        return this.peerConnection.getLocalStreams()[index || 0];
    }
};
WebRtcPeer.prototype.getRemoteStream = function (index) {
    if (this.peerConnection) {
        return this.peerConnection.getRemoteStreams()[index || 0];
    }
};
WebRtcPeer.prototype.dispose = function () {
    console.log('Disposing WebRtcPeer');
    var pc = this.peerConnection;
    if (pc) {
        if (pc.signalingState === 'closed')
            return;
        pc.getLocalStreams().forEach(streamStop);
        pc.close();
    }
    this.emit('_dispose');
};
function WebRtcPeerRecvonly(options, callback) {
    if (!(this instanceof WebRtcPeerRecvonly)) {
        return new WebRtcPeerRecvonly(options, callback);
    }
    WebRtcPeerRecvonly.super_.call(this, 'recvonly', options, callback);
}
inherits(WebRtcPeerRecvonly, WebRtcPeer);
function WebRtcPeerSendonly(options, callback) {
    if (!(this instanceof WebRtcPeerSendonly)) {
        return new WebRtcPeerSendonly(options, callback);
    }
    WebRtcPeerSendonly.super_.call(this, 'sendonly', options, callback);
}
inherits(WebRtcPeerSendonly, WebRtcPeer);
function WebRtcPeerSendrecv(options, callback) {
    if (!(this instanceof WebRtcPeerSendrecv)) {
        return new WebRtcPeerSendrecv(options, callback);
    }
    WebRtcPeerSendrecv.super_.call(this, 'sendrecv', options, callback);
}
inherits(WebRtcPeerSendrecv, WebRtcPeer);
exports.bufferizeCandidates = bufferizeCandidates;
exports.WebRtcPeerRecvonly = WebRtcPeerRecvonly;
exports.WebRtcPeerSendonly = WebRtcPeerSendonly;
exports.WebRtcPeerSendrecv = WebRtcPeerSendrecv;
},{"events":4,"freeice":5,"inherits":9,"merge":10,"ua-parser-js":11,"uuid":13}],2:[function(require,module,exports){
if (window.addEventListener)
    module.exports = require('./index');
},{"./index":3}],3:[function(require,module,exports){
var WebRtcPeer = require('./WebRtcPeer');
exports.WebRtcPeer = WebRtcPeer;
},{"./WebRtcPeer":1}],4:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],5:[function(require,module,exports){
/* jshint node: true */
'use strict';

var normalice = require('normalice');

/**
  # freeice

  The `freeice` module is a simple way of getting random STUN or TURN server
  for your WebRTC application.  The list of servers (just STUN at this stage)
  were sourced from this [gist](https://gist.github.com/zziuni/3741933).

  ## Example Use

  The following demonstrates how you can use `freeice` with
  [rtc-quickconnect](https://github.com/rtc-io/rtc-quickconnect):

  <<< examples/quickconnect.js

  As the `freeice` module generates ice servers in a list compliant with the
  WebRTC spec you will be able to use it with raw `RTCPeerConnection`
  constructors and other WebRTC libraries.

  ## Hey, don't use my STUN/TURN server!

  If for some reason your free STUN or TURN server ends up in the
  list of servers ([stun](https://github.com/DamonOehlman/freeice/blob/master/stun.json) or
  [turn](https://github.com/DamonOehlman/freeice/blob/master/turn.json))
  that is used in this module, you can feel
  free to open an issue on this repository and those servers will be removed
  within 24 hours (or sooner).  This is the quickest and probably the most
  polite way to have something removed (and provides us some visibility
  if someone opens a pull request requesting that a server is added).

  ## Please add my server!

  If you have a server that you wish to add to the list, that's awesome! I'm
  sure I speak on behalf of a whole pile of WebRTC developers who say thanks.
  To get it into the list, feel free to either open a pull request or if you
  find that process a bit daunting then just create an issue requesting
  the addition of the server (make sure you provide all the details, and if
  you have a Terms of Service then including that in the PR/issue would be
  awesome).

  ## I know of a free server, can I add it?

  Sure, if you do your homework and make sure it is ok to use (I'm currently
  in the process of reviewing the terms of those STUN servers included from
  the original list).  If it's ok to go, then please see the previous entry
  for how to add it.

  ## Current List of Servers

  * current as at the time of last `README.md` file generation

  ### STUN

  <<< stun.json

  ### TURN

  <<< turn.json

**/

var freeice = module.exports = function(opts) {
  // if a list of servers has been provided, then use it instead of defaults
  var servers = {
    stun: (opts || {}).stun || require('./stun.json'),
    turn: (opts || {}).turn || require('./turn.json')
  };

  var stunCount = (opts || {}).stunCount || 2;
  var turnCount = (opts || {}).turnCount || 0;
  var selected;

  function getServers(type, count) {
    var out = [];
    var input = [].concat(servers[type]);
    var idx;

    while (input.length && out.length < count) {
      idx = (Math.random() * input.length) | 0;
      out = out.concat(input.splice(idx, 1));
    }

    return out.map(function(url) {
        //If it's a not a string, don't try to "normalice" it otherwise using type:url will screw it up
        if ((typeof url !== 'string') && (! (url instanceof String))) {
            return url;
        } else {
            return normalice(type + ':' + url);
        }
    });
  }

  // add stun servers
  selected = [].concat(getServers('stun', stunCount));

  if (turnCount) {
    selected = selected.concat(getServers('turn', turnCount));
  }

  return selected;
};

},{"./stun.json":7,"./turn.json":8,"normalice":6}],6:[function(require,module,exports){
/**
  # normalice

  Normalize an ice server configuration object (or plain old string) into a format
  that is usable in all browsers supporting WebRTC.  Primarily this module is designed
  to help with the transition of the `url` attribute of the configuration object to
  the `urls` attribute.

  ## Example Usage

  <<< examples/simple.js

**/

var protocols = [
  'stun:',
  'turn:'
];

module.exports = function(input) {
  var url = (input || {}).url || input;
  var protocol;
  var parts;
  var output = {};

  // if we don't have a string url, then allow the input to passthrough
  if (typeof url != 'string' && (! (url instanceof String))) {
    return input;
  }

  // trim the url string, and convert to an array
  url = url.trim();

  // if the protocol is not known, then passthrough
  protocol = protocols[protocols.indexOf(url.slice(0, 5))];
  if (! protocol) {
    return input;
  }

  // now let's attack the remaining url parts
  url = url.slice(5);
  parts = url.split('@');

  output.username = input.username;
  output.credential = input.credential;
  // if we have an authentication part, then set the credentials
  if (parts.length > 1) {
    url = parts[1];
    parts = parts[0].split(':');

    // add the output credential and username
    output.username = parts[0];
    output.credential = (input || {}).credential || parts[1] || '';
  }

  output.url = protocol + url;
  output.urls = [ output.url ];

  return output;
};

},{}],7:[function(require,module,exports){
module.exports=[
  "stun.l.google.com:19302",
  "stun1.l.google.com:19302",
  "stun2.l.google.com:19302",
  "stun3.l.google.com:19302",
  "stun4.l.google.com:19302",
  "stun.ekiga.net",
  "stun.ideasip.com",
  "stun.schlund.de",
  "stun.stunprotocol.org:3478",
  "stun.voiparound.com",
  "stun.voipbuster.com",
  "stun.voipstunt.com",
  "stun.voxgratia.org",
  "stun.services.mozilla.com"
]

},{}],8:[function(require,module,exports){
module.exports=[]

},{}],9:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],10:[function(require,module,exports){
/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
},{}],11:[function(require,module,exports){
/**
 * UAParser.js v0.7.9
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2015 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 & MIT
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.9',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            for (var i in extensions) {
                if ("browser cpu device engine os".indexOf(i) !== -1 && extensions[i].length % 2 === 0) {
                    regexes[i] = extensions[i].concat(regexes[i]);
                }
            }
            return regexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.split(".")[0] : undefined;
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function () {

            var result, i = 0, j, k, p, q, matches, match, args = arguments;

            // loop through all regexes maps
            while (i < args.length && !matches) {

                var regex = args[i],       // even sequence (0,2,4,..)
                    props = args[i + 1];   // odd sequence (1,3,5,..)

                // construct object barebones
                if (typeof result === UNDEF_TYPE) {
                    result = {};
                    for (p in props) {
                        q = props[p];
                        if (typeof q === OBJ_TYPE) {
                            result[q[0]] = undefined;
                        } else {
                            result[q] = undefined;
                        }
                    }
                }

                // try matching uastring with regexes
                j = k = 0;
                while (j < regex.length && !matches) {
                    matches = regex[j++].exec(this.getUA());
                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        result[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        result[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                result[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
            return result;
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80

            ], [NAME, VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]+)*/i,                                            // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium
            ], [NAME, VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge)\/((\d+)?[\w\.]+)/i                                          // Microsoft Edge
            ], [NAME, VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i
                                                                                // UCBrowser/QQBrowser
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /XiaoMi\/MiuiBrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i         // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /FBAV\/([\w\.]+);/i                                                 // Facebook App for iOS
            ], [VERSION, [NAME, 'Facebook']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]+)*/i,                                        // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]

            /* /////////////////////
            // Media players BEGIN
            ////////////////////////

            , [

            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
            /(coremedia) v((\d+)[\w\._]+)/i
            ], [NAME, VERSION], [

            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
            ], [NAME, VERSION], [

            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
            ], [NAME, VERSION], [

            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
            ], [NAME, VERSION], [
            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
            ], [NAME, VERSION], [

            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
            ], [[NAME, 'Flip Player'], VERSION], [

            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
            ], [NAME], [

            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                                // Gstreamer
            ], [NAME, VERSION], [

            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                                // Java/urllib/requests/wget/cURL
            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
            ], [NAME, VERSION], [

            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
            ], [[NAME, /_/g, ' '], VERSION], [

            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                                // MPlayer SVN
            ], [NAME, VERSION], [

            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
            ], [NAME, VERSION], [

            /(mplayer)/i,                                                       // MPlayer (no other info)
            /(yourmuze)/i,                                                      // YourMuze
            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
            ], [NAME], [

            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
            ], [NAME, VERSION], [

            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
            ], [NAME, VERSION], [

            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
            ], [NAME, VERSION], [

            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
            /(winamp)\s((\d+)[\w\.-]+)/i,
            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
            ], [NAME, VERSION], [

            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                                // inlight radio
            ], [NAME], [

            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                                // SoundTap/Totem/Stagefright/Streamium
            ], [NAME, VERSION], [

            /(smp)((\d+)[\d\.]+)/i                                              // SMP
            ], [NAME, VERSION], [

            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
            /(vlc)\/((\d+)[\w\.-]+)/i,
            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
            ], [NAME, VERSION], [

            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
            /(windows-media-player)\/((\d+)[\w\.-]+)/i
            ], [[NAME, /-/g, ' '], VERSION], [

            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                                // Windows Media Server
            ], [VERSION, [NAME, 'Windows']], [

            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
            ], [NAME, VERSION], [

            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
            ], [[NAME, 'rad.io'], VERSION]

            //////////////////////
            // Media players END
            ////////////////////*/

        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i                               // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i                  // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Phone'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[3portablevi]+)/i                                    // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w+)*/i,                                                    // ZTE
            /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
                                                                                // Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [
                
            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w+)*/i,
            /(XT\d{3,4}) build\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [
            /(samsung);smarttv/i
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
            /sie-(\w+)*/i                                                       // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]+)*/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w+)*/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+(\w+)\s+build\/hm\1/i,                                        // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,                   // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i    // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [

            /(mobile|tablet);.+rv\:.+gecko\//i                                  // Unidentifiable
            ], [[TYPE, util.lowerize], VENDOR, MODEL]

            /*//////////////////////////
            // TODO: move to string map
            ////////////////////////////

            /(C6603)/i                                                          // Sony Xperia Z C6603
            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
            /(C6903)/i                                                          // Sony Xperia Z 1
            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

            /(R1001)/i                                                          // Oppo R1001
            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [
            /(X9006)/i                                                          // Oppo Find 7a
            ], [[MODEL, 'Find 7a'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
            /(R2001)/i                                                          // Oppo YOYO R2001
            ], [[MODEL, 'Yoyo R2001'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
            /(R815)/i                                                           // Oppo Clover R815
            ], [[MODEL, 'Clover R815'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
             /(U707)/i                                                          // Oppo Find Way S
            ], [[MODEL, 'Find Way S'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [

            /(T3C)/i                                                            // Advan Vandroid T3C
            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

            /(V972M)/i                                                          // ZTE V972M
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
            
            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

            /////////////
            // END TODO
            ///////////*/

        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
            /linux;.+(sailfish);/i                                              // Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i                 // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids3portablevu]+)/i,                    // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
            /(gnu)\s?([\w\.]+)*/i                                               // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.]+\d)*/i                                           // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i                   // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i             // iOS
            ], [[NAME, 'iOS'], [VERSION, /_/g, '.']], [

            /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,                            // Solaris
            /(haiku)\s(\w+)/i,                                                  // Haiku
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
            /(unix)\s?([\w\.]+)*/i                                              // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////


    var UAParser = function (uastring, extensions) {

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var browser = mapper.rgx.apply(this, rgxmap.browser);
            browser.major = util.major(browser.version);
            return browser;
        };
        this.getCPU = function () {
            return mapper.rgx.apply(this, rgxmap.cpu);
        };
        this.getDevice = function () {
            return mapper.rgx.apply(this, rgxmap.device);
        };
        this.getEngine = function () {
            return mapper.rgx.apply(this, rgxmap.engine);
        };
        this.getOS = function () {
            return mapper.rgx.apply(this, rgxmap.os);
        };
        this.getResult = function() {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            return this;
        };
        this.setUA(ua);
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };


    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (typeof(define) === FUNC_TYPE && define.amd) {
            define(function () {
                return UAParser;
            });
        } else {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note: 
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window.jQuery || window.Zepto;
    if (typeof $ !== UNDEF_TYPE) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);

},{}],12:[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":12}]},{},[2])(2)
});
;
/**
 * Created by gsachan on 29/12/14.
 */


var instamsg = instamsg || {};

instamsg.InstaMsg = function (clientId, authKey, connectHandler, disConnectHandler, oneToOneMessageHandler, options) {

    options = options || {};
//    var self = this;
    if (clientId === null || clientId === undefined) {
        console.log('You must pass your client id when you instantiate InstaMsg.');
        throw new Error("You must pass your client id when you instantiate InstaMsg.");
        return false;
    }

    if (authKey === null || authKey === undefined) {
        console.log('You must pass your auth key when you instantiate InstaMsg.');
        throw new Error("You must pass your auth key when you instantiate InstaMsg.");
        return false;
    }
    options.clientId = clientId.substring(0, 23);
    options.userName = clientId.substring(24, 36);
    options.password = authKey;
    var logLevel = options.logLevel || false
    instamsg.version = 'beta';
    instamsg.handlersMap = {}
    instamsg.replyHandlerMap = {}
    var filesTopic = "instamsg/clients/" + clientId + "/files";
    var enableServerLoggingTopic = clientId + "/enableServerLogging";
    var serverLogsTopic = "";
    var logToServer = false
    var sendMsgReplyTopic = clientId;

    instamsg.fileHandlers = [];
    instamsg.sendMsgHandlers = [];
    instamsg.resultHandler = [];
    var onMessageArrived = function (msg) {
        var topic = msg._getDestinationName()
        if (topic === null || topic === undefined) {
            throw new Error("Invalid topic");
        }
        if (logLevel) {
            console.log("message Arrived : " + msg.payloadString);
        }
        console.log("topic is : " + topic);
        switch (topic) {
            case enableServerLoggingTopic:
                logToServer = true;
                var id = msg.payloadString.split("-")
                if (id.length != 5) {
                    throw new Error("Invalid CLient id " + msg.payloadString);
                } else {
                    serverLogsTopic = "instamsg/" + msg.payloadString + "/logs";
                }
                break;
            case filesTopic:
                try {
                    var json = JSON.parse(msg.payloadString);
                    if (instamsg.fileHandlers[topic]) {
                        var message = new instamsg.Message(json.body, {id: json.message_id, topic: json.topic, replyTopic: json.reply_to})
                        instamsg.fileHandlers[topic](message)
                    } else {
                        throw new Error("No Handler is register for " + topic);
                    }
                }
                catch (e) {
                    if (logLevel) {
                        console.log(e);
                    }
                }
                break;
            case sendMsgReplyTopic:
                try {
                    var json = JSON.parse(msg.payloadString);
                    var messageId = json.message_id;
                    var responseId = json.response_id;
                    if (responseId) {
                        if (instamsg.handlersMap[responseId]) {
                            var message = new instamsg.Message(json.body, {id: json.message_id, topic: json.topic, replyTopic: json.reply_to})
                            instamsg.replyHandlerMap[responseId](message)
                        }
                    } else {
                        if (oneToOneMessageHandler) {
                            
                            var message = new instamsg.Message(json.body, {id: json.message_id, topic: json.topic, replyTopic: json.reply_to})
                            oneToOneMessageHandler(message)
                        }
                    }
                }
                catch (e) {
                    if (instamsg.handlersMap[topic]) {
                        instamsg.handlersMap[topic](new instamsg.Message(msg.payloadString))
                    }
                }
                break;
            default:
                try {

                    if (instamsg.handlersMap[topic]) {
                        instamsg.handlersMap[topic](new instamsg.Message(msg.payloadString,{topic:topic}))
                    } else {
                        throw new Error("No Handler is register for " + topic);
                    }
                }
                catch (e) {
                    if (logLevel) {
                        console.log(e.message);
                    }
                }
                break;
        }
    };

    var netError = false
    var closeHandler = function (object) {
        try {
            if (object.hasOwnProperty('errorCode')) {
                netError = true
                connection.connect()
            } else {
                disConnectHandler(object)
            }
        } catch (e) {
            if (logToServer) console.log(e)
        }
    }
    var i = 1
    var onOpenHandler = function (obj) {
        i = i + 1
        if (i > 10)  i = 0
        if (netError) {
            if (logToServer) console.log("Disconnected, Trying to reconnect.")
            setTimeout(function () {
                connection.connect()
            }, i * 10000);
        } else {
            connectHandler(obj)
        }
    }
    var connection = instamsg.ConnectionFactory(onOpenHandler, onMessageArrived, closeHandler, options);
    connection.connect()
    instamsg.close = function () {
        connection.close();
    };

    var publishServerLogs = function (message) {
        var id = UUIDjs.create(4).toString()
        connection.publish(id, serverLogsTopic, message, 0, 0, onPublish, 100);
    };

    var onPublish = function (msg) {
        msg.payload = msg._getPayloadString()
        if (msg._getDestinationName() != serverLogsTopic) {
            if (logToServer)  publishServerLogs("message published : " + JSON.stringify(msg))
            if (logLevel) {
                console.log("message published : " + JSON.stringify(msg));
            }
            if (instamsg.resultHandler[msg.id]) {
                instamsg.resultHandler[msg.id](instamsg.Result.init(msg, true))
            }
            delete instamsg.resultHandler[msg.id];
        }
    }

    instamsg.publish = function (topic, message, qos, dup, resultHandler, timeout) {
        var id = UUIDjs.create(4).toString()
        instamsg.resultHandler[id] = resultHandler;
        connection.publish(id, topic, message, qos, dup, onPublish, timeout);
    };

    instamsg.subscribe = function (topic, qos, msgHandler, resultHandler, timeout) {
        if (topic.length < 1) {
            if (logToServer)  publishServerLogs("Topic cannot be empty")
            if (logLevel) console.log("Topic cannot be empty");

            throw new Error("Topic cannot be empty ");
        }
        if (instamsg.handlersMap[topic] !== undefined) {
            if (logToServer)  publishServerLogs("Topic cannot be empty")
            if (logLevel)  console.log('You are already subscribed to ' + topic);

        }
        var subscriptionobj = {};
        subscriptionobj.topic = topic;
        subscriptionobj.msgHandler = msgHandler;
        subscriptionobj.resultHandler = resultHandler;
        connection.subscribe(topic, subscriptionobj, qos, onSubscribeSuccess, onSubscribeFailure);
    };

    var onSubscribeSuccess = function (subscriptionobj) {
        instamsg.handlersMap[subscriptionobj.invocationContext.topic] = subscriptionobj.invocationContext.msgHandler;
        var result = "Client Subscribe to " + subscriptionobj.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result);
        }
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(result, true))
    }

    var onSubscribeFailure = function (subscriptionobj) {
        var result = "Client unable to Subscribe to " + subscriptionobj.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result);
        }
        subscriptionobj.invocationContext.resultHandler(instamsg.Result.init(subscriptionobj, false))
    }

    instamsg.unsubscribe = function (topic, msgHandler) {
        if (instamsg.handlersMap[topic] === undefined) {
            if (logToServer)  publishServerLogs('You are not subscribed to ' + topic)
            if (logLevel) {
                console.log('You are not subscribed to ' + topic);
            }
        }
        connection.unsubscribe(topic, {topic: topic, resultHandler: msgHandler}, onUnsubscribeSuccess, onUnsubscribeFailure)
    };

    var onUnsubscribeSuccess = function (object) {
        delete instamsg.handlersMap[object.invocationContext.topic];
        var result = "Client unsubscribe from " + object.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result);
        }
        object.invocationContext.resultHandler(instamsg.Result.init(result, true))
    }

    var onUnsubscribeFailure = function (object) {
        var result = "Not able to unsubscribe to " + object.invocationContext.topic
        if (logToServer)  publishServerLogs(result)
        if (logLevel) {
            console.log(result)
        }
        object.invocationContext.resultHandler(instamsg.Result.init(object, false))
    }

    instamsg.send = function (clientId, msg, qos, replyHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.replyHandlerMap[messageId] = replyHandler;
        var message = {
            message_id: messageId,
            topic: clientId,
            reply_to: sendMsgReplyTopic,
            body: msg,
            status: 1
        }
        if (logToServer)  publishServerLogs("sending one to one message " + JSON.stringify(message))
        if (logLevel) {
            console.log("sending one to one message " + JSON.stringify(message));
        }
        connection.send(clientId, message, qos, timeout);
    };

    instamsg.setFileReceiveHander = function (resultHandler, timeout) {

    };

    instamsg.deleteFile = function (clientId, fileName, resultHandler, timeout) {
        var messageId = UUIDjs.create(4).toString()
        instamsg.fileHandlers[messageId] = resultHandler;
        var message = {
            messageId: messageId,
            replyTo: filesTopic,
            method: "DELETE",
            filename: fileName
        }
        connection.send("instamsg/clients/" + clientId + "/files", message, 1, timeout);

    };

    instamsg.reply = function (content, msg, qos, replyHandler, resulthandler, timeout) {
        if (!instamsg.replyHandlerMap[msg.id()]) {
            instamsg.replyHandlerMap[msg.id()] = replyHandler;
        }
        var message = {
            message_id: msg.id(),
            response_id: msg.id(),
            topic: msg.replyTopic(),
            reply_to: msg.topic(),
            body: content,
            status: 1
        }
        if (logLevel) {
            console.log("sending reply message " + JSON.stringify(message));
        }
        if (logToServer)  publishServerLogs("sending reply message " + JSON.stringify(message))
        connection.send(msg.replyTopic(), message, qos, resulthandler, timeout);
    };
    return instamsg;
}


;
var MEDIA_MESSAGE_TYPE = {
		ERROR: "0",
	    CALL: "1",
	    CALL_REPLY: "2",
	    CALL_STOP: "3",
	    CALL_INCOMING: "4",
	    CALL_INCOMING_REPLY: "5",
	    CALL_INCOMING_START: "6",
	    BROADCAST: "7",
	    BROADCAST_REPLY: "8",
	    SUBSCRIBE: "9",
	    SUBSCRIBE_REPLY: "10",
	    RECORDING_PLAY: "11",
	    RECORDING_PLAY_REPLY: "12",
	    RECORDING_PLAY_STOP: "13",
	    RECORDING_PLAY_END: "14",
		ICE_CANDIDATE: "15",
		ICE_CANDIDATE_REPLY: "16"
	};

var instamsg = instamsg || {};

instamsg.InstaMedia = function (from, authKey, connectHandler){

	var video;
	var webRtcPeer;
	
	var instaMsg;
	var streamId;
	var to = from;

	var mediaReplyTopic = "instamsg/clients/" + from + "/mediareply";
//	var mediaReplyTopic = "bd9d8610-0509-11e5-9240-a41731f2549f/instamsg/clients/" + from + "/mediareply";
	var mediaSendTopic;
	var mediaStreamsTopic;
	
	var onSubscribeSuccess = function(result) {
		if (result.failed()) {
			console.log("unable to subscribe ");
		} else {
			console.log("subscribed to topic " + mediaReplyTopic);
		}
	}

	var handler = function(msg) {
		var responseMessage = msg.body();
		console.log("Reply msg received : " + responseMessage)
		var parsedMessage = eval("(" + responseMessage + ")");
		console.log("msg type is : " + parsedMessage.type)

		switch (parsedMessage.type) {
		case MEDIA_MESSAGE_TYPE.BROADCAST_REPLY:
			presenterResponse(parsedMessage);
			break;
		case MEDIA_MESSAGE_TYPE.SUBSCRIBE_REPLY:
			viewerResponse(parsedMessage);
			break;
		case MEDIA_MESSAGE_TYPE.ICE_CANDIDATE_REPLY:
			candidate = JSON.parse(parsedMessage.candidate)
			webRtcPeer.addIceCandidate(candidate, function(error) {
				if (error)
					return console.error('Error adding candidate: ' + error);
			});
			break;
		case MEDIA_MESSAGE_TYPE.CALL_STOP:
			dispose();
			break;
		default:
			console.error('Unrecognized message', parsedMessage);
		}
	}
	
	var streamHandler = function(msg) {
		var responseMessage = msg.body();
		console.log("Media streams msg received : " + responseMessage)
		var parsedMessage = eval("(" + responseMessage + ")");
		console.log(parsedMessage)
        var messageId = parsedMessage.message_id;
        var replyTo = parsedMessage.reply_to;
        if (replyTo) {
        	var message = {
        			response_id : messageId,
        			status : 1,
        			streams : streamId
        	}
        	sendInstaMessage(message, replyTo)
        }
	}

	if (connectHandler == undefined){
		connectHandler = function(result) {
			if (result.failed()) {
				console.log("InstaMsg not able to connect.");
			} else {
				console.log("InstaMsg socket connected.");
				instaMsg.subscribe(mediaReplyTopic, 1, handler, onSubscribeSuccess, 60)
			}
		}
	}
	
	var viewerConnectHandler = function(result) {
		if (result.failed()) {
			console.log("InstaMsg not able to connect.");
		} else {
			console.log("InstaMsg socket connected.");
		}
	}

	var disConnectHandler = function(result) {
		console.log("Connection lost with InstaMsg.")
	}

	var resultHandler = function (obj) {
		var json = JSON.parse(obj.payloadString);
		console.log("Result message is : " + json);
	}
	var timeout;

	var replyHandler = function (msg) {
		console.log("Reply message is : " + msg);
		}
	
	var oneToOneMessageHandler = function(msg) {
		console.log("One to one Media streams msg received : " + msg);
        var replyTo = msg.replyTo;
        console.log(replyTo);
        if (replyTo) {
        	var content = {
        			streams : [streamId]
        	}
        	msg.reply(replyTo, content, 1)
        }
	}
	
	var options = {
		logLevel : true,
		enableSsl : false
	}
	
	instaMsg = instamsg.InstaMsg(from, authKey, connectHandler,
			disConnectHandler, oneToOneMessageHandler, options)
			
	this.broadcast = function(strmId, elementId){
		
		streamId = strmId
		video = document.getElementById(elementId);
		console.log(from);
		mediaStreamsTopic = "instamsg/clients/" + from + "/mediastreams";
		mediaSendTopic = "instamsg/clients/" + from + "/media";
		instaMsg.subscribe(mediaStreamsTopic, 1, streamHandler, onSubscribeSuccess, 60)
		
		if (!webRtcPeer) {
			showSpinner(video);

			var options = {
				localVideo : video,
				onicecandidate : onIceCandidate
			}
			webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
					options, function(error) {
						if (error) {
							return console.error(error);
						}
						webRtcPeer.generateOffer(onOfferPresenter);
					});
		}
	};

	this.view = function(broadcasterId, strmId, elementId){
		to = broadcasterId;
		mediaSendTopic = "instamsg/clients/" + broadcasterId + "/media";
		streamId = strmId
		video = document.getElementById(elementId);
		
		if (!webRtcPeer) {
			showSpinner(video);

			var options = {
				remoteVideo : video,
				onicecandidate : onIceCandidate
			}
			webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
					options, function(error) {
						if (error) {
							return console.error(error);
						}
						this.generateOffer(onOfferViewer);
					});
		}
	};

	this.stop = function(){
		var message = {
				type : MEDIA_MESSAGE_TYPE.CALL_STOP,
				to : to,
				from : from,
				stream_id : streamId,
		}
		sendInstaMessage(message, mediaSendTopic);
		dispose();
	};
	
	this.send = function(clientId, msg, qos, replyHandler, resultHandler, timeout){
		instaMsg.send(clientId, msg, qos, replyHandler, resultHandler, timeout)
	}
	
	this.disconnect = function(){
		instaMsg.close()
	}
	var getClientId = function(){
		if(viewerClientId){
			return viewerClientId;
		}
		else{
			return ClientId;
		}
	}

	var presenterResponse = function (message) {
		if (message.response == false) {
			var errorMsg = message.message ? message.message : 'Unknow error';
			console.log('Call not accepted for the following reason: ' + errorMsg);
			dispose();
		} else {
			streamId = message.stream_id
			webRtcPeer.processAnswer(message.sdp_answer, function(error) {
				if (error)
					return console.error(error);
			});
		}
	}

	var viewerResponse = function (message) {
		if (message.response == false) {
			var errorMsg = message.message ? message.message : 'Unknow error';
			console.log('Call not accepted for the following reason: ' + errorMsg);
			dispose();
		} else {
			webRtcPeer.processAnswer(message.sdp_answer, function(error) {
				if (error)
					return console.error(error);
			});
		}
	}

	var onOfferPresenter = function (error, offerSdp) {
		console.log("onOfferPresenter");
		if (error)
			return console.error('Error generating the offer');
		var message = {
			to : to,
			sdp_offer : offerSdp,
			from : from,
			protocol : 'webrtc',
			type : MEDIA_MESSAGE_TYPE.BROADCAST,
			stream_id : streamId,
			record : true
		};
		sendInstaMessage(message, mediaSendTopic);
	}

	var onOfferViewer = function (error, offerSdp) {
		if (error)
			return console.error('Error generating the offer');
		var message = {
			to : to,
			sdp_offer : offerSdp,
			from : from,
			protocol : 'webrtc',
			type : MEDIA_MESSAGE_TYPE.SUBSCRIBE,
			stream_id : streamId,
			record : true
		};
		sendInstaMessage(message, mediaSendTopic);
	}

	var onIceCandidate = function (candidate) {
		console.log("Local candidate" + JSON.stringify(candidate));

		var message = {
			type : MEDIA_MESSAGE_TYPE.ICE_CANDIDATE,
			to : to,
			from : from,
			stream_id : streamId,
			candidate : JSON.stringify(candidate)
		};
		sendInstaMessage(message, mediaSendTopic);
	}

	var dispose = function () {
		if (webRtcPeer) {
			webRtcPeer.dispose();
			webRtcPeer = null;
		}
		hideSpinner(video);
	};

	var sendInstaMessage = function (message, topic) {
		var jsonMessage = JSON.stringify(message);
		console.log('Sending message on topic : ' + topic + ' : ' + jsonMessage);
		instaMsg.publish(topic, jsonMessage, 1, 0)
	}
	var showSpinner = function () {
		for (var i = 0; i < arguments.length; i++) {
			arguments[i].poster = './img/transparent-1px.png';
			arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
		}
	};

	var hideSpinner = function () {
		for (var i = 0; i < arguments.length; i++) {
			arguments[i].src = '';
			arguments[i].poster = './img/webrtc.png';
			arguments[i].style.background = '';
		}
	};

};

;
/**
 * Created by gsachan on 29/12/14.
 */

var instamsg = instamsg || {};

instamsg.Message = function (content,options) {

    var self = this;
    var retained = options.retain || false;
    var Qos = options.qos;
    var body = content || "";
    var isDup = options.dup || false;
    var Topic = options.topic;
    var replyTopic = options.replyTopic;
    var id = options.id;


    self.qos = function () {
        return Qos;
    };

    self.retained = function () {
        return retained;
    };

    self.id = function () {
        return id;
    };

    self.topic = function () {
        return Topic;
    };

    self.replyTopic = function () {
        return replyTopic;
    };

    self.isDublicate = function () {

        return isDup;
    };

    self.body = function () {
        return body;

    };

    self.reply = function (msg,dup, replyHandler, timeout) {

        instamsg.reply(msg, self, replyHandler, timeout)
    };

    self.error = function (errorCode, errorMsg) {

    };

    self.toString = function () {
        return '{ id=' + id + ', topic=' + Topic + ', body=' + body + ', qos=' + Qos + ', dup=' + isDup + ', replyTopic=' + replyTopic + '}';

    }

}





;
/**
 * Created by gsachan on 29/12/14.
 */
    function Handler() {

    }

    Handler.prototype.Handler = function(result) {

    };

;
/**
 * Created by gsachan on 30/12/14.
 */


var instamsg = instamsg || {};

instamsg.ConnectionFactory = function (onOpenHandler,onMessageArrived,onCloseHandler,options) {

    if (options === null || options === undefined || options.sockjs === undefined || options.sockjsEnabled !== true) {
        return instamsg.SocketConnection.connection(onOpenHandler,onMessageArrived,onCloseHandler,options)

    } else {
        return instamsg.SockjsConnection(onOpenHandler, onMessageArrived, onCloseHandler, options)
    }
}
;
/**
 * Created by gsachan on 30/12/14.
 */

var instamsg = instamsg || {};
instamsg.SocketConnection = instamsg.SocketConnection || {}
instamsg.SocketConnection.connection = function (onOpenHandler, onMsgHandler, onCloseHandler, options) {

    options = options || {};
    var self = this;
    instamsg.SocketConnection.host = 'platform.instamsg.io';
    //instamsg.SocketConnection.host = 'localhost';
    instamsg.SocketConnection.httpPort = 11883;
    instamsg.SocketConnection.httpsPort = 18883;
    instamsg.SocketConnection.port = options.enableSsl ? self.httpsPort : self.httpPort;
    instamsg.SocketConnection.client = new Paho.MQTT.Client(instamsg.SocketConnection.host, Number(instamsg.SocketConnection.port), options.clientId);

    instamsg.SocketConnection.client.onMessageArrived = onMsgHandler;

    instamsg.SocketConnection.client.onConnectionLost =onCloseHandler;

    instamsg.SocketConnection.client.onMessageDelivered;

    instamsg.SocketConnection.publish = function (id,topic,msg,qos,dup,resultHandler,timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log('InstaMsg socket is not connected.');
            return false;
        }
        var message =new Paho.MQTT.Message(msg)
        message.id =id
        message.qos =qos;
        message.dup =dup;
        message.retained = false;
        message.destinationName=topic;
        instamsg.SocketConnection.client.onMessageDelivered =resultHandler;
        instamsg.SocketConnection.client.send(message);
    }

    instamsg.SocketConnection.send = function (clientId,msg,qos,resultHandler, timeout) {
       console.log('Instamsg socket connection send.');
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log('InstaMsg socket is not connected.');
            return false;
        }
        var payload =JSON.stringify(msg)
        var message =new Paho.MQTT.Message(payload)
        if(qos == undefined){
            qos = 1
        }
        message.qos =qos    
        message.retained = true;
        message.destinationName=clientId;
        console.log("sending " + payload)
        instamsg.SocketConnection.client.onMessageDelivered =resultHandler;
        instamsg.SocketConnection.client.send(message);
    }

    instamsg.SocketConnection.close = function () {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is already disconnected.");
            throw new Error("InstaMsg socket is already disconnected.");
            return false;
        }
        instamsg.SocketConnection.client.disconnect();
    }

    instamsg.SocketConnection.onFail = function (message) {
        console.log("error: " + message.errorMessage);
    }

    var onConnect = function (result) {
        onOpenHandler(instamsg.Result.init("Connect to InstaMsg socket.", true))
    }
    var onFailure = function (result) {
        onOpenHandler(instamsg.Result.init(result.errorMessage, false))
    }


    instamsg.SocketConnection.subscribe = function (topic, invocationContext,qos,onSubscribeSuccess,onSubscribeFailure,timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is not connected.");
            throw new Error("InstaMsg socket is not connected.");
            return false;
        }
        if (topic.length < 1) {
            console.log("Topic cannot be empty.");
            throw new Error("Topic cannot be empty.");
            return false;
        }
        instamsg.SocketConnection.client.subscribe(topic, {invocationContext: invocationContext,
            qos: qos,
            onSuccess: onSubscribeSuccess,
            onFailure: onSubscribeFailure,
            timeout: timeout ? timeout : 60
        });
    };

    instamsg.SocketConnection.unsubscribe = function (topic,invocationContext,onUnsubscribeSuccess,onUnsubscribeFailure,timeout) {
        if (!instamsg.SocketConnection.client.isConnected()) {
            console.log("InstaMsg socket is not connected.");
            throw new Error("InstaMsg socket is not connected.");
            return false;
        }
        instamsg.SocketConnection.client.unsubscribe(topic, {invocationContext: invocationContext,
            onSuccess: onUnsubscribeSuccess,
            onFailure: onUnsubscribeFailure,
            timeout: timeout ? timeout : 100
        })
    };

    var Options = {
        timeout: 100,
        userName: options.userName,
        password: options.password,
        keepAliveInterval: options.keepAliveTimer || 100 ,
        cleanSession: true,
        useSSL: options.enableSsl ? true : false,
        invocationContext: instamsg,
        onSuccess: onConnect,
        onFailure: onFailure,
        mqttVersion: 3
    }

    instamsg.SocketConnection.connect =function(){
        delete Options["mqttVersionExplicit"]
        instamsg.SocketConnection.client.connect(Options);
    }
    return instamsg.SocketConnection;
}
;
/**
 * Created by gsachan on 30/12/14.
 */

var instamsg = instamsg || {};

instamsg.SockjsConnection = instamsg.SockjsConnection || {}
instamsg.SockjsConnection.connection = function (onOpenHandler, onMsgHandler, onCloseHandler,options) {

    var self = this;
   var options = options || {};
    //instamsg.SockjsConnection.host = 'sockjs.instamsg.com';
    instamsg.SockjsConnection.host = 'sockjs.instamsg.com';
    instamsg.SockjsConnection.httpPort = 80;
    instamsg.SockjsConnection.httpsPort = 443;
    instamsg.SockjsConnection.path = "/instamsg";
    instamsg.SockjsConnection.port =  options.enabledSsl ? self.httpsPort : self.httpPort;
    var sock = new SockJS(self.host+":"+self.port+"/"+self.path);

    instamsg.SockjsConnection.onopen = onOpenHandler;
    instamsg.SockjsConnection.onmessage = onMsgHandler;
    instamsg.SockjsConnection.onclose = onCloseHandler;

    instamsg.SockjsConnection.publish = function (topic,msg,qos) {
        if (state != vertx.EventBus.OPEN) {
            throw new Error('INVALID_STATE_ERR');
        }
        var message = new Paho.MQTT.Message(msg);
        message.qos =qos;
        message.retained = true;
        message.destinationName=topic;
        sock.send(message);
    }

    instamsg.SockjsConnection.send = function (clientId,msg,qos,replyHandler, timeout) {
        if (state != vertx.EventBus.OPEN) {
            throw new Error('INVALID_STATE_ERR');
        }
        var payload =JSON.stringify(msg)
        var message = new Paho.MQTT.Message(payload);
        message.qos =qos;
        message.retained = true;
        message.destinationName=topic;
        sock.send(message);
    }

    instamsg.SockjsConnection.close = function () {
        sock.close();
        onCloseHandler()
    }

}
;
/**
 * Created by gsachan on 29/12/14.
 */

var instamsg = instamsg || {};
instamsg.Result = instamsg.Result || {}
instamsg.Result.init = function (result, succeeded) {

    var self = this;
    var Result = result;
    var Succeeded = succeeded;

        instamsg.Result.cause = function () {
            return !succeeded ? result : null;
    };

        instamsg.Result.failed = function () {
            return !succeeded ? true : false;
    };

        instamsg.Result.succeeded = function() {
            return succeeded ? true : false;
    };

        instamsg.Result.result = function() {
            return succeeded ? result : null;
    };
    return instamsg.Result;
}