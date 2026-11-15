var qp=Object.create;var Hl=Object.defineProperty;var $p=Object.getOwnPropertyDescriptor;var Yp=Object.getOwnPropertyNames;var Zp=Object.getPrototypeOf,Jp=Object.prototype.hasOwnProperty;var jp=(i,t,e)=>t in i?Hl(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Kp=(i,t,e)=>()=>{if(e)throw e[0];try{return i&&(t=i(i=0)),t}catch(n){throw e=[n],n}};var Wl=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Qp=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Yp(t))!Jp.call(i,s)&&s!==e&&Hl(i,s,{get:()=>t[s],enumerable:!(n=$p(t,s))||n.enumerable});return i};var tm=(i,t,e)=>(e=i!=null?qp(Zp(i)):{},Qp(t||!i||!i.__esModule?Hl(e,"default",{value:i,enumerable:!0}):e,i));var Q=(i,t,e)=>jp(i,typeof t!="symbol"?t+"":t,e);var _u=Wl(Co=>{"use strict";Nt();Co.byteLength=nm;Co.toByteArray=sm;Co.fromByteArray=am;var kn=[],yn=[],em=typeof Uint8Array<"u"?Uint8Array:Array,Xl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(Gi=0,xu=Xl.length;Gi<xu;++Gi)kn[Gi]=Xl[Gi],yn[Xl.charCodeAt(Gi)]=Gi;var Gi,xu;yn[45]=62;yn[95]=63;function yu(i){var t=i.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=i.indexOf("=");e===-1&&(e=t);var n=e===t?0:4-e%4;return[e,n]}function nm(i){var t=yu(i),e=t[0],n=t[1];return(e+n)*3/4-n}function im(i,t,e){return(t+e)*3/4-e}function sm(i){var t,e=yu(i),n=e[0],s=e[1],r=new em(im(i,n,s)),o=0,a=s>0?n-4:n,l;for(l=0;l<a;l+=4)t=yn[i.charCodeAt(l)]<<18|yn[i.charCodeAt(l+1)]<<12|yn[i.charCodeAt(l+2)]<<6|yn[i.charCodeAt(l+3)],r[o++]=t>>16&255,r[o++]=t>>8&255,r[o++]=t&255;return s===2&&(t=yn[i.charCodeAt(l)]<<2|yn[i.charCodeAt(l+1)]>>4,r[o++]=t&255),s===1&&(t=yn[i.charCodeAt(l)]<<10|yn[i.charCodeAt(l+1)]<<4|yn[i.charCodeAt(l+2)]>>2,r[o++]=t>>8&255,r[o++]=t&255),r}function rm(i){return kn[i>>18&63]+kn[i>>12&63]+kn[i>>6&63]+kn[i&63]}function om(i,t,e){for(var n,s=[],r=t;r<e;r+=3)n=(i[r]<<16&16711680)+(i[r+1]<<8&65280)+(i[r+2]&255),s.push(rm(n));return s.join("")}function am(i){for(var t,e=i.length,n=e%3,s=[],r=16383,o=0,a=e-n;o<a;o+=r)s.push(om(i,o,o+r>a?a:o+r));return n===1?(t=i[e-1],s.push(kn[t>>2]+kn[t<<4&63]+"==")):n===2&&(t=(i[e-2]<<8)+i[e-1],s.push(kn[t>>10]+kn[t>>4&63]+kn[t<<2&63]+"=")),s.join("")}});var vu=Wl(ql=>{Nt();ql.read=function(i,t,e,n,s){var r,o,a=s*8-n-1,l=(1<<a)-1,c=l>>1,h=-7,u=e?s-1:0,f=e?-1:1,d=i[t+u];for(u+=f,r=d&(1<<-h)-1,d>>=-h,h+=a;h>0;r=r*256+i[t+u],u+=f,h-=8);for(o=r&(1<<-h)-1,r>>=-h,h+=n;h>0;o=o*256+i[t+u],u+=f,h-=8);if(r===0)r=1-c;else{if(r===l)return o?NaN:(d?-1:1)*(1/0);o=o+Math.pow(2,n),r=r-c}return(d?-1:1)*o*Math.pow(2,r-n)};ql.write=function(i,t,e,n,s,r){var o,a,l,c=r*8-s-1,h=(1<<c)-1,u=h>>1,f=s===23?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:r-1,p=n?1:-1,y=t<0||t===0&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,o=h):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),o+u>=1?t+=f/l:t+=f*Math.pow(2,1-u),t*l>=2&&(o++,l/=2),o+u>=h?(a=0,o=h):o+u>=1?(a=(t*l-1)*Math.pow(2,s),o=o+u):(a=t*Math.pow(2,u-1)*Math.pow(2,s),o=0));s>=8;i[e+d]=a&255,d+=p,a/=256,s-=8);for(o=o<<s|a,c+=s;c>0;i[e+d]=o&255,d+=p,o/=256,c-=8);i[e+d-p]|=y*128}});var Ou=Wl(gs=>{"use strict";Nt();var $l=_u(),ps=vu(),Su=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;gs.Buffer=Y;gs.SlowBuffer=dm;gs.INSPECT_MAX_BYTES=50;var Io=2147483647;gs.kMaxLength=Io;Y.TYPED_ARRAY_SUPPORT=lm();!Y.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function lm(){try{let i=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(i,t),i.foo()===42}catch{return!1}}Object.defineProperty(Y.prototype,"parent",{enumerable:!0,get:function(){if(Y.isBuffer(this))return this.buffer}});Object.defineProperty(Y.prototype,"offset",{enumerable:!0,get:function(){if(Y.isBuffer(this))return this.byteOffset}});function jn(i){if(i>Io)throw new RangeError('The value "'+i+'" is invalid for option "size"');let t=new Uint8Array(i);return Object.setPrototypeOf(t,Y.prototype),t}function Y(i,t,e){if(typeof i=="number"){if(typeof t=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return jl(i)}return Eu(i,t,e)}Y.poolSize=8192;function Eu(i,t,e){if(typeof i=="string")return hm(i,t);if(ArrayBuffer.isView(i))return um(i);if(i==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i);if(zn(i,ArrayBuffer)||i&&zn(i.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(zn(i,SharedArrayBuffer)||i&&zn(i.buffer,SharedArrayBuffer)))return Zl(i,t,e);if(typeof i=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let n=i.valueOf&&i.valueOf();if(n!=null&&n!==i)return Y.from(n,t,e);let s=fm(i);if(s)return s;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof i[Symbol.toPrimitive]=="function")return Y.from(i[Symbol.toPrimitive]("string"),t,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i)}Y.from=function(i,t,e){return Eu(i,t,e)};Object.setPrototypeOf(Y.prototype,Uint8Array.prototype);Object.setPrototypeOf(Y,Uint8Array);function Tu(i){if(typeof i!="number")throw new TypeError('"size" argument must be of type number');if(i<0)throw new RangeError('The value "'+i+'" is invalid for option "size"')}function cm(i,t,e){return Tu(i),i<=0?jn(i):t!==void 0?typeof e=="string"?jn(i).fill(t,e):jn(i).fill(t):jn(i)}Y.alloc=function(i,t,e){return cm(i,t,e)};function jl(i){return Tu(i),jn(i<0?0:Kl(i)|0)}Y.allocUnsafe=function(i){return jl(i)};Y.allocUnsafeSlow=function(i){return jl(i)};function hm(i,t){if((typeof t!="string"||t==="")&&(t="utf8"),!Y.isEncoding(t))throw new TypeError("Unknown encoding: "+t);let e=Au(i,t)|0,n=jn(e),s=n.write(i,t);return s!==e&&(n=n.slice(0,s)),n}function Yl(i){let t=i.length<0?0:Kl(i.length)|0,e=jn(t);for(let n=0;n<t;n+=1)e[n]=i[n]&255;return e}function um(i){if(zn(i,Uint8Array)){let t=new Uint8Array(i);return Zl(t.buffer,t.byteOffset,t.byteLength)}return Yl(i)}function Zl(i,t,e){if(t<0||i.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(i.byteLength<t+(e||0))throw new RangeError('"length" is outside of buffer bounds');let n;return t===void 0&&e===void 0?n=new Uint8Array(i):e===void 0?n=new Uint8Array(i,t):n=new Uint8Array(i,t,e),Object.setPrototypeOf(n,Y.prototype),n}function fm(i){if(Y.isBuffer(i)){let t=Kl(i.length)|0,e=jn(t);return e.length===0||i.copy(e,0,0,t),e}if(i.length!==void 0)return typeof i.length!="number"||tc(i.length)?jn(0):Yl(i);if(i.type==="Buffer"&&Array.isArray(i.data))return Yl(i.data)}function Kl(i){if(i>=Io)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Io.toString(16)+" bytes");return i|0}function dm(i){return+i!=i&&(i=0),Y.alloc(+i)}Y.isBuffer=function(t){return t!=null&&t._isBuffer===!0&&t!==Y.prototype};Y.compare=function(t,e){if(zn(t,Uint8Array)&&(t=Y.from(t,t.offset,t.byteLength)),zn(e,Uint8Array)&&(e=Y.from(e,e.offset,e.byteLength)),!Y.isBuffer(t)||!Y.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let n=t.length,s=e.length;for(let r=0,o=Math.min(n,s);r<o;++r)if(t[r]!==e[r]){n=t[r],s=e[r];break}return n<s?-1:s<n?1:0};Y.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};Y.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return Y.alloc(0);let n;if(e===void 0)for(e=0,n=0;n<t.length;++n)e+=t[n].length;let s=Y.allocUnsafe(e),r=0;for(n=0;n<t.length;++n){let o=t[n];if(zn(o,Uint8Array))r+o.length>s.length?(Y.isBuffer(o)||(o=Y.from(o)),o.copy(s,r)):Uint8Array.prototype.set.call(s,o,r);else if(Y.isBuffer(o))o.copy(s,r);else throw new TypeError('"list" argument must be an Array of Buffers');r+=o.length}return s};function Au(i,t){if(Y.isBuffer(i))return i.length;if(ArrayBuffer.isView(i)||zn(i,ArrayBuffer))return i.byteLength;if(typeof i!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof i);let e=i.length,n=arguments.length>2&&arguments[2]===!0;if(!n&&e===0)return 0;let s=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return Jl(i).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return e*2;case"hex":return e>>>1;case"base64":return Uu(i).length;default:if(s)return n?-1:Jl(i).length;t=(""+t).toLowerCase(),s=!0}}Y.byteLength=Au;function pm(i,t,e){let n=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((e===void 0||e>this.length)&&(e=this.length),e<=0)||(e>>>=0,t>>>=0,e<=t))return"";for(i||(i="utf8");;)switch(i){case"hex":return wm(this,t,e);case"utf8":case"utf-8":return Cu(this,t,e);case"ascii":return Mm(this,t,e);case"latin1":case"binary":return bm(this,t,e);case"base64":return vm(this,t,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Em(this,t,e);default:if(n)throw new TypeError("Unknown encoding: "+i);i=(i+"").toLowerCase(),n=!0}}Y.prototype._isBuffer=!0;function Hi(i,t,e){let n=i[t];i[t]=i[e],i[e]=n}Y.prototype.swap16=function(){let t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)Hi(this,e,e+1);return this};Y.prototype.swap32=function(){let t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)Hi(this,e,e+3),Hi(this,e+1,e+2);return this};Y.prototype.swap64=function(){let t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)Hi(this,e,e+7),Hi(this,e+1,e+6),Hi(this,e+2,e+5),Hi(this,e+3,e+4);return this};Y.prototype.toString=function(){let t=this.length;return t===0?"":arguments.length===0?Cu(this,0,t):pm.apply(this,arguments)};Y.prototype.toLocaleString=Y.prototype.toString;Y.prototype.equals=function(t){if(!Y.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:Y.compare(this,t)===0};Y.prototype.inspect=function(){let t="",e=gs.INSPECT_MAX_BYTES;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"};Su&&(Y.prototype[Su]=Y.prototype.inspect);Y.prototype.compare=function(t,e,n,s,r){if(zn(t,Uint8Array)&&(t=Y.from(t,t.offset,t.byteLength)),!Y.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(e===void 0&&(e=0),n===void 0&&(n=t?t.length:0),s===void 0&&(s=0),r===void 0&&(r=this.length),e<0||n>t.length||s<0||r>this.length)throw new RangeError("out of range index");if(s>=r&&e>=n)return 0;if(s>=r)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,s>>>=0,r>>>=0,this===t)return 0;let o=r-s,a=n-e,l=Math.min(o,a),c=this.slice(s,r),h=t.slice(e,n);for(let u=0;u<l;++u)if(c[u]!==h[u]){o=c[u],a=h[u];break}return o<a?-1:a<o?1:0};function Ru(i,t,e,n,s){if(i.length===0)return-1;if(typeof e=="string"?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,tc(e)&&(e=s?0:i.length-1),e<0&&(e=i.length+e),e>=i.length){if(s)return-1;e=i.length-1}else if(e<0)if(s)e=0;else return-1;if(typeof t=="string"&&(t=Y.from(t,n)),Y.isBuffer(t))return t.length===0?-1:Mu(i,t,e,n,s);if(typeof t=="number")return t=t&255,typeof Uint8Array.prototype.indexOf=="function"?s?Uint8Array.prototype.indexOf.call(i,t,e):Uint8Array.prototype.lastIndexOf.call(i,t,e):Mu(i,[t],e,n,s);throw new TypeError("val must be string, number or Buffer")}function Mu(i,t,e,n,s){let r=1,o=i.length,a=t.length;if(n!==void 0&&(n=String(n).toLowerCase(),n==="ucs2"||n==="ucs-2"||n==="utf16le"||n==="utf-16le")){if(i.length<2||t.length<2)return-1;r=2,o/=2,a/=2,e/=2}function l(h,u){return r===1?h[u]:h.readUInt16BE(u*r)}let c;if(s){let h=-1;for(c=e;c<o;c++)if(l(i,c)===l(t,h===-1?0:c-h)){if(h===-1&&(h=c),c-h+1===a)return h*r}else h!==-1&&(c-=c-h),h=-1}else for(e+a>o&&(e=o-a),c=e;c>=0;c--){let h=!0;for(let u=0;u<a;u++)if(l(i,c+u)!==l(t,u)){h=!1;break}if(h)return c}return-1}Y.prototype.includes=function(t,e,n){return this.indexOf(t,e,n)!==-1};Y.prototype.indexOf=function(t,e,n){return Ru(this,t,e,n,!0)};Y.prototype.lastIndexOf=function(t,e,n){return Ru(this,t,e,n,!1)};function mm(i,t,e,n){e=Number(e)||0;let s=i.length-e;n?(n=Number(n),n>s&&(n=s)):n=s;let r=t.length;n>r/2&&(n=r/2);let o;for(o=0;o<n;++o){let a=parseInt(t.substr(o*2,2),16);if(tc(a))return o;i[e+o]=a}return o}function gm(i,t,e,n){return Po(Jl(t,i.length-e),i,e,n)}function xm(i,t,e,n){return Po(Cm(t),i,e,n)}function ym(i,t,e,n){return Po(Uu(t),i,e,n)}function _m(i,t,e,n){return Po(Im(t,i.length-e),i,e,n)}Y.prototype.write=function(t,e,n,s){if(e===void 0)s="utf8",n=this.length,e=0;else if(n===void 0&&typeof e=="string")s=e,n=this.length,e=0;else if(isFinite(e))e=e>>>0,isFinite(n)?(n=n>>>0,s===void 0&&(s="utf8")):(s=n,n=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let r=this.length-e;if((n===void 0||n>r)&&(n=r),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");s||(s="utf8");let o=!1;for(;;)switch(s){case"hex":return mm(this,t,e,n);case"utf8":case"utf-8":return gm(this,t,e,n);case"ascii":case"latin1":case"binary":return xm(this,t,e,n);case"base64":return ym(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return _m(this,t,e,n);default:if(o)throw new TypeError("Unknown encoding: "+s);s=(""+s).toLowerCase(),o=!0}};Y.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function vm(i,t,e){return t===0&&e===i.length?$l.fromByteArray(i):$l.fromByteArray(i.slice(t,e))}function Cu(i,t,e){e=Math.min(i.length,e);let n=[],s=t;for(;s<e;){let r=i[s],o=null,a=r>239?4:r>223?3:r>191?2:1;if(s+a<=e){let l,c,h,u;switch(a){case 1:r<128&&(o=r);break;case 2:l=i[s+1],(l&192)===128&&(u=(r&31)<<6|l&63,u>127&&(o=u));break;case 3:l=i[s+1],c=i[s+2],(l&192)===128&&(c&192)===128&&(u=(r&15)<<12|(l&63)<<6|c&63,u>2047&&(u<55296||u>57343)&&(o=u));break;case 4:l=i[s+1],c=i[s+2],h=i[s+3],(l&192)===128&&(c&192)===128&&(h&192)===128&&(u=(r&15)<<18|(l&63)<<12|(c&63)<<6|h&63,u>65535&&u<1114112&&(o=u))}}o===null?(o=65533,a=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|o&1023),n.push(o),s+=a}return Sm(n)}var bu=4096;function Sm(i){let t=i.length;if(t<=bu)return String.fromCharCode.apply(String,i);let e="",n=0;for(;n<t;)e+=String.fromCharCode.apply(String,i.slice(n,n+=bu));return e}function Mm(i,t,e){let n="";e=Math.min(i.length,e);for(let s=t;s<e;++s)n+=String.fromCharCode(i[s]&127);return n}function bm(i,t,e){let n="";e=Math.min(i.length,e);for(let s=t;s<e;++s)n+=String.fromCharCode(i[s]);return n}function wm(i,t,e){let n=i.length;(!t||t<0)&&(t=0),(!e||e<0||e>n)&&(e=n);let s="";for(let r=t;r<e;++r)s+=Pm[i[r]];return s}function Em(i,t,e){let n=i.slice(t,e),s="";for(let r=0;r<n.length-1;r+=2)s+=String.fromCharCode(n[r]+n[r+1]*256);return s}Y.prototype.slice=function(t,e){let n=this.length;t=~~t,e=e===void 0?n:~~e,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),e<t&&(e=t);let s=this.subarray(t,e);return Object.setPrototypeOf(s,Y.prototype),s};function Ue(i,t,e){if(i%1!==0||i<0)throw new RangeError("offset is not uint");if(i+t>e)throw new RangeError("Trying to access beyond buffer length")}Y.prototype.readUintLE=Y.prototype.readUIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||Ue(t,e,this.length);let s=this[t],r=1,o=0;for(;++o<e&&(r*=256);)s+=this[t+o]*r;return s};Y.prototype.readUintBE=Y.prototype.readUIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||Ue(t,e,this.length);let s=this[t+--e],r=1;for(;e>0&&(r*=256);)s+=this[t+--e]*r;return s};Y.prototype.readUint8=Y.prototype.readUInt8=function(t,e){return t=t>>>0,e||Ue(t,1,this.length),this[t]};Y.prototype.readUint16LE=Y.prototype.readUInt16LE=function(t,e){return t=t>>>0,e||Ue(t,2,this.length),this[t]|this[t+1]<<8};Y.prototype.readUint16BE=Y.prototype.readUInt16BE=function(t,e){return t=t>>>0,e||Ue(t,2,this.length),this[t]<<8|this[t+1]};Y.prototype.readUint32LE=Y.prototype.readUInt32LE=function(t,e){return t=t>>>0,e||Ue(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216};Y.prototype.readUint32BE=Y.prototype.readUInt32BE=function(t,e){return t=t>>>0,e||Ue(t,4,this.length),this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])};Y.prototype.readBigUInt64LE=yi(function(t){t=t>>>0,ms(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&cr(t,this.length-8);let s=e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24,r=this[++t]+this[++t]*2**8+this[++t]*2**16+n*2**24;return BigInt(s)+(BigInt(r)<<BigInt(32))});Y.prototype.readBigUInt64BE=yi(function(t){t=t>>>0,ms(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&cr(t,this.length-8);let s=e*2**24+this[++t]*2**16+this[++t]*2**8+this[++t],r=this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n;return(BigInt(s)<<BigInt(32))+BigInt(r)});Y.prototype.readIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||Ue(t,e,this.length);let s=this[t],r=1,o=0;for(;++o<e&&(r*=256);)s+=this[t+o]*r;return r*=128,s>=r&&(s-=Math.pow(2,8*e)),s};Y.prototype.readIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||Ue(t,e,this.length);let s=e,r=1,o=this[t+--s];for(;s>0&&(r*=256);)o+=this[t+--s]*r;return r*=128,o>=r&&(o-=Math.pow(2,8*e)),o};Y.prototype.readInt8=function(t,e){return t=t>>>0,e||Ue(t,1,this.length),this[t]&128?(255-this[t]+1)*-1:this[t]};Y.prototype.readInt16LE=function(t,e){t=t>>>0,e||Ue(t,2,this.length);let n=this[t]|this[t+1]<<8;return n&32768?n|4294901760:n};Y.prototype.readInt16BE=function(t,e){t=t>>>0,e||Ue(t,2,this.length);let n=this[t+1]|this[t]<<8;return n&32768?n|4294901760:n};Y.prototype.readInt32LE=function(t,e){return t=t>>>0,e||Ue(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24};Y.prototype.readInt32BE=function(t,e){return t=t>>>0,e||Ue(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]};Y.prototype.readBigInt64LE=yi(function(t){t=t>>>0,ms(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&cr(t,this.length-8);let s=this[t+4]+this[t+5]*2**8+this[t+6]*2**16+(n<<24);return(BigInt(s)<<BigInt(32))+BigInt(e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24)});Y.prototype.readBigInt64BE=yi(function(t){t=t>>>0,ms(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&cr(t,this.length-8);let s=(e<<24)+this[++t]*2**16+this[++t]*2**8+this[++t];return(BigInt(s)<<BigInt(32))+BigInt(this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n)});Y.prototype.readFloatLE=function(t,e){return t=t>>>0,e||Ue(t,4,this.length),ps.read(this,t,!0,23,4)};Y.prototype.readFloatBE=function(t,e){return t=t>>>0,e||Ue(t,4,this.length),ps.read(this,t,!1,23,4)};Y.prototype.readDoubleLE=function(t,e){return t=t>>>0,e||Ue(t,8,this.length),ps.read(this,t,!0,52,8)};Y.prototype.readDoubleBE=function(t,e){return t=t>>>0,e||Ue(t,8,this.length),ps.read(this,t,!1,52,8)};function sn(i,t,e,n,s,r){if(!Y.isBuffer(i))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>s||t<r)throw new RangeError('"value" argument is out of bounds');if(e+n>i.length)throw new RangeError("Index out of range")}Y.prototype.writeUintLE=Y.prototype.writeUIntLE=function(t,e,n,s){if(t=+t,e=e>>>0,n=n>>>0,!s){let a=Math.pow(2,8*n)-1;sn(this,t,e,n,a,0)}let r=1,o=0;for(this[e]=t&255;++o<n&&(r*=256);)this[e+o]=t/r&255;return e+n};Y.prototype.writeUintBE=Y.prototype.writeUIntBE=function(t,e,n,s){if(t=+t,e=e>>>0,n=n>>>0,!s){let a=Math.pow(2,8*n)-1;sn(this,t,e,n,a,0)}let r=n-1,o=1;for(this[e+r]=t&255;--r>=0&&(o*=256);)this[e+r]=t/o&255;return e+n};Y.prototype.writeUint8=Y.prototype.writeUInt8=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,1,255,0),this[e]=t&255,e+1};Y.prototype.writeUint16LE=Y.prototype.writeUInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,2,65535,0),this[e]=t&255,this[e+1]=t>>>8,e+2};Y.prototype.writeUint16BE=Y.prototype.writeUInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=t&255,e+2};Y.prototype.writeUint32LE=Y.prototype.writeUInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=t&255,e+4};Y.prototype.writeUint32BE=Y.prototype.writeUInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4};function Iu(i,t,e,n,s){Nu(t,n,s,i,e,7);let r=Number(t&BigInt(4294967295));i[e++]=r,r=r>>8,i[e++]=r,r=r>>8,i[e++]=r,r=r>>8,i[e++]=r;let o=Number(t>>BigInt(32)&BigInt(4294967295));return i[e++]=o,o=o>>8,i[e++]=o,o=o>>8,i[e++]=o,o=o>>8,i[e++]=o,e}function Pu(i,t,e,n,s){Nu(t,n,s,i,e,7);let r=Number(t&BigInt(4294967295));i[e+7]=r,r=r>>8,i[e+6]=r,r=r>>8,i[e+5]=r,r=r>>8,i[e+4]=r;let o=Number(t>>BigInt(32)&BigInt(4294967295));return i[e+3]=o,o=o>>8,i[e+2]=o,o=o>>8,i[e+1]=o,o=o>>8,i[e]=o,e+8}Y.prototype.writeBigUInt64LE=yi(function(t,e=0){return Iu(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))});Y.prototype.writeBigUInt64BE=yi(function(t,e=0){return Pu(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))});Y.prototype.writeIntLE=function(t,e,n,s){if(t=+t,e=e>>>0,!s){let l=Math.pow(2,8*n-1);sn(this,t,e,n,l-1,-l)}let r=0,o=1,a=0;for(this[e]=t&255;++r<n&&(o*=256);)t<0&&a===0&&this[e+r-1]!==0&&(a=1),this[e+r]=(t/o>>0)-a&255;return e+n};Y.prototype.writeIntBE=function(t,e,n,s){if(t=+t,e=e>>>0,!s){let l=Math.pow(2,8*n-1);sn(this,t,e,n,l-1,-l)}let r=n-1,o=1,a=0;for(this[e+r]=t&255;--r>=0&&(o*=256);)t<0&&a===0&&this[e+r+1]!==0&&(a=1),this[e+r]=(t/o>>0)-a&255;return e+n};Y.prototype.writeInt8=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=t&255,e+1};Y.prototype.writeInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,2,32767,-32768),this[e]=t&255,this[e+1]=t>>>8,e+2};Y.prototype.writeInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=t&255,e+2};Y.prototype.writeInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,4,2147483647,-2147483648),this[e]=t&255,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4};Y.prototype.writeInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||sn(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4};Y.prototype.writeBigInt64LE=yi(function(t,e=0){return Iu(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});Y.prototype.writeBigInt64BE=yi(function(t,e=0){return Pu(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function Lu(i,t,e,n,s,r){if(e+n>i.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function Du(i,t,e,n,s){return t=+t,e=e>>>0,s||Lu(i,t,e,4,34028234663852886e22,-34028234663852886e22),ps.write(i,t,e,n,23,4),e+4}Y.prototype.writeFloatLE=function(t,e,n){return Du(this,t,e,!0,n)};Y.prototype.writeFloatBE=function(t,e,n){return Du(this,t,e,!1,n)};function Fu(i,t,e,n,s){return t=+t,e=e>>>0,s||Lu(i,t,e,8,17976931348623157e292,-17976931348623157e292),ps.write(i,t,e,n,52,8),e+8}Y.prototype.writeDoubleLE=function(t,e,n){return Fu(this,t,e,!0,n)};Y.prototype.writeDoubleBE=function(t,e,n){return Fu(this,t,e,!1,n)};Y.prototype.copy=function(t,e,n,s){if(!Y.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),!s&&s!==0&&(s=this.length),e>=t.length&&(e=t.length),e||(e=0),s>0&&s<n&&(s=n),s===n||t.length===0||this.length===0)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(s<0)throw new RangeError("sourceEnd out of bounds");s>this.length&&(s=this.length),t.length-e<s-n&&(s=t.length-e+n);let r=s-n;return this===t&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(e,n,s):Uint8Array.prototype.set.call(t,this.subarray(n,s),e),r};Y.prototype.fill=function(t,e,n,s){if(typeof t=="string"){if(typeof e=="string"?(s=e,e=0,n=this.length):typeof n=="string"&&(s=n,n=this.length),s!==void 0&&typeof s!="string")throw new TypeError("encoding must be a string");if(typeof s=="string"&&!Y.isEncoding(s))throw new TypeError("Unknown encoding: "+s);if(t.length===1){let o=t.charCodeAt(0);(s==="utf8"&&o<128||s==="latin1")&&(t=o)}}else typeof t=="number"?t=t&255:typeof t=="boolean"&&(t=Number(t));if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e=e>>>0,n=n===void 0?this.length:n>>>0,t||(t=0);let r;if(typeof t=="number")for(r=e;r<n;++r)this[r]=t;else{let o=Y.isBuffer(t)?t:Y.from(t,s),a=o.length;if(a===0)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(r=0;r<n-e;++r)this[r+e]=o[r%a]}return this};var ds={};function Ql(i,t,e){ds[i]=class extends e{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${i}]`,this.stack,delete this.name}get code(){return i}set code(s){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:s,writable:!0})}toString(){return`${this.name} [${i}]: ${this.message}`}}}Ql("ERR_BUFFER_OUT_OF_BOUNDS",function(i){return i?`${i} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);Ql("ERR_INVALID_ARG_TYPE",function(i,t){return`The "${i}" argument must be of type number. Received type ${typeof t}`},TypeError);Ql("ERR_OUT_OF_RANGE",function(i,t,e){let n=`The value of "${i}" is out of range.`,s=e;return Number.isInteger(e)&&Math.abs(e)>2**32?s=wu(String(e)):typeof e=="bigint"&&(s=String(e),(e>BigInt(2)**BigInt(32)||e<-(BigInt(2)**BigInt(32)))&&(s=wu(s)),s+="n"),n+=` It must be ${t}. Received ${s}`,n},RangeError);function wu(i){let t="",e=i.length,n=i[0]==="-"?1:0;for(;e>=n+4;e-=3)t=`_${i.slice(e-3,e)}${t}`;return`${i.slice(0,e)}${t}`}function Tm(i,t,e){ms(t,"offset"),(i[t]===void 0||i[t+e]===void 0)&&cr(t,i.length-(e+1))}function Nu(i,t,e,n,s,r){if(i>e||i<t){let o=typeof t=="bigint"?"n":"",a;throw r>3?t===0||t===BigInt(0)?a=`>= 0${o} and < 2${o} ** ${(r+1)*8}${o}`:a=`>= -(2${o} ** ${(r+1)*8-1}${o}) and < 2 ** ${(r+1)*8-1}${o}`:a=`>= ${t}${o} and <= ${e}${o}`,new ds.ERR_OUT_OF_RANGE("value",a,i)}Tm(n,s,r)}function ms(i,t){if(typeof i!="number")throw new ds.ERR_INVALID_ARG_TYPE(t,"number",i)}function cr(i,t,e){throw Math.floor(i)!==i?(ms(i,e),new ds.ERR_OUT_OF_RANGE(e||"offset","an integer",i)):t<0?new ds.ERR_BUFFER_OUT_OF_BOUNDS:new ds.ERR_OUT_OF_RANGE(e||"offset",`>= ${e?1:0} and <= ${t}`,i)}var Am=/[^+/0-9A-Za-z-_]/g;function Rm(i){if(i=i.split("=")[0],i=i.trim().replace(Am,""),i.length<2)return"";for(;i.length%4!==0;)i=i+"=";return i}function Jl(i,t){t=t||1/0;let e,n=i.length,s=null,r=[];for(let o=0;o<n;++o){if(e=i.charCodeAt(o),e>55295&&e<57344){if(!s){if(e>56319){(t-=3)>-1&&r.push(239,191,189);continue}else if(o+1===n){(t-=3)>-1&&r.push(239,191,189);continue}s=e;continue}if(e<56320){(t-=3)>-1&&r.push(239,191,189),s=e;continue}e=(s-55296<<10|e-56320)+65536}else s&&(t-=3)>-1&&r.push(239,191,189);if(s=null,e<128){if((t-=1)<0)break;r.push(e)}else if(e<2048){if((t-=2)<0)break;r.push(e>>6|192,e&63|128)}else if(e<65536){if((t-=3)<0)break;r.push(e>>12|224,e>>6&63|128,e&63|128)}else if(e<1114112){if((t-=4)<0)break;r.push(e>>18|240,e>>12&63|128,e>>6&63|128,e&63|128)}else throw new Error("Invalid code point")}return r}function Cm(i){let t=[];for(let e=0;e<i.length;++e)t.push(i.charCodeAt(e)&255);return t}function Im(i,t){let e,n,s,r=[];for(let o=0;o<i.length&&!((t-=2)<0);++o)e=i.charCodeAt(o),n=e>>8,s=e%256,r.push(s),r.push(n);return r}function Uu(i){return $l.toByteArray(Rm(i))}function Po(i,t,e,n){let s;for(s=0;s<n&&!(s+e>=t.length||s>=i.length);++s)t[s+e]=i[s];return s}function zn(i,t){return i instanceof t||i!=null&&i.constructor!=null&&i.constructor.name!=null&&i.constructor.name===t.name}function tc(i){return i!==i}var Pm=(function(){let i="0123456789abcdef",t=new Array(256);for(let e=0;e<16;++e){let n=e*16;for(let s=0;s<16;++s)t[n+s]=i[e]+i[s]}return t})();function yi(i){return typeof BigInt>"u"?Lm:i}function Lm(){throw new Error("BigInt not supported")}});var Bu,Nt=Kp(()=>{Bu=tm(Ou());globalThis.Buffer=globalThis.Buffer||Bu.Buffer});Nt();Nt();Nt();var Mf=0,Bc=1,bf=2;var jr=1,wf=2,Xs=3,Fi=0,en=1,Sn=2,rs=0,qs=1,kc=2,zc=3,Vc=4,Ef=5;var os=100,Tf=101,Af=102,Rf=103,Cf=104,If=200,Pf=201,Lf=202,Df=203,Gc=204,Hc=205,Ff=206,Nf=207,Uf=208,Of=209,Bf=210,kf=211,zf=212,Vf=213,Gf=214,sa=0,ra=1,oa=2,Ls=3,aa=4,la=5,ca=6,ha=7,Kr=0,Hf=1,Wf=2,qn=0,Wc=1,Xc=2,qc=3,$c=4,Yc=5,Zc=6,Jc=7,wc="attached",Xf="detached",jc=300,as=301,$s=302,Ys=303,Pa=304,Yi=1e3,fn=1001,ua=1002,Be=1003,qf=1004;var Qr=1005;var Qe=1006,La=1007;var ui=1008;var on=1009,Kc=1010,Qc=1011,Zs=1012,Da=1013,Dn=1014,Mn=1015,Fn=1016,Fa=1017,Na=1018,ls=1020,th=35902,eh=35899,nh=1021,ih=1022,bn=1023,ri=1026,fi=1027,sh=1028,Ua=1029,Ni=1030,Oa=1031;var Ba=1033,to=33776,eo=33777,no=33778,io=33779,ka=35840,za=35841,Va=35842,Ga=35843,Ha=36196,Wa=37492,Xa=37496,qa=37488,$a=37489,so=37490,Ya=37491,Za=37808,Ja=37809,ja=37810,Ka=37811,Qa=37812,tl=37813,el=37814,nl=37815,il=37816,sl=37817,rl=37818,ol=37819,al=37820,ll=37821,cl=36492,hl=36494,ul=36495,fl=36283,dl=36284,ro=36285,pl=36286;var Sr=2300,fa=2301,na=2302,Ec=2303,Tc=2400,Ac=2401,Rc=2402,$f=2500;var Yf=3200;var Js=0,Zf=1,di="",ne="srgb",Mr="srgb-linear",br="linear",oe="srgb";var ia=7680;var Jf=519,jf=512,Kf=513,Qf=514,rh=515,td=516,ed=517,oh=518,ah=519,nd=35044;var lh="300 es",vn=2e3,Ds=2001;function Dm(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Fm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function id(){let i=Fs("canvas");return i.style.display="block",i}var ku={},Ns=null;function ch(...i){let t="THREE."+i.shift();Ns?Ns("log",t,...i):console.log(t,...i)}function sd(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Rt(...i){i=sd(i);let t="THREE."+i.shift();if(Ns)Ns("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ot(...i){i=sd(i);let t="THREE."+i.shift();if(Ns)Ns("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function yr(...i){let t=i.join(" ");t in ku||(ku[t]=!0,Rt(...i))}function rd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var od={[sa]:sa,[oa]:ca,[aa]:aa,[Ls]:la,[ra]:ra,[ca]:oa,[ha]:ha,[la]:Ls},Hn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zu=1234567,_r=Math.PI/180,Zi=180/Math.PI;function Ui(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function hh(i,t){return(i%t+t)%t}function Nm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Um(i,t,e){return i!==t?(e-i)/(t-i):0}function vr(i,t,e){return(1-e)*i+e*t}function Om(i,t,e,n){return vr(i,t,1-Math.exp(-e*n))}function Bm(i,t=1){return t-Math.abs(hh(i,t*2)-t)}function km(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function zm(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Vm(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Gm(i,t){return i+Math.random()*(t-i)}function Hm(i){return i*(.5-Math.random())}function Wm(i){i!==void 0&&(zu=i);let t=zu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Xm(i){return i*_r}function qm(i){return i*Zi}function $m(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ym(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function uh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Zm(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),p=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*p,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*p,a*c);break;case"ZYZ":i.set(l*p,l*d,a*h,a*c);break;default:Rt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function fh(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ad(i,t){if(t.constructor===Float32Array)return i;let e=fh(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function ld(i,t){if(t.constructor===Float32Array)return i;let e=fh(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var We={DEG2RAD:_r,RAD2DEG:Zi,generateUUID:Ui,clamp:$t,euclideanModulo:hh,mapLinear:Nm,inverseLerp:Um,lerp:vr,damp:Om,pingpong:Bm,smoothstep:km,smootherstep:zm,randInt:Vm,randFloat:Gm,randFloatSpread:Hm,seededRandom:Wm,degToRad:Xm,radToDeg:qm,isPowerOfTwo:$m,ceilPowerOfTwo:Ym,floorPowerOfTwo:uh,setQuaternionFromProperEuler:Zm,normalize:ld,denormalize:ad},xh=class xh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};xh.prototype.isVector2=!0;var Wt=xh,ye=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],p=r[o+2],y=r[o+3];if(u!==y||l!==f||c!==d||h!==p){let m=l*f+c*d+h*p+u*y;m<0&&(f=-f,d=-d,p=-p,y=-y,m=-m);let g=1-a;if(m<.9995){let v=Math.acos(m),w=Math.sin(v);g=Math.sin(g*v)/w,a=Math.sin(a*v)/w,l=l*g+f*a,c=c*g+d*a,h=h*g+p*a,u=u*g+y*a}else{l=l*g+f*a,c=c*g+d*a,h=h*g+p*a,u=u*g+y*a;let v=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=v,c*=v,h*=v,u*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+h*u+l*d-c*f,t[e+1]=l*p+h*f+c*u-a*d,t[e+2]=c*p+h*d+a*f-l*u,t[e+3]=h*p-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"YZX":this._x=f*h*u+c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u-f*d*p;break;case"XZY":this._x=f*h*u-c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u+f*d*p;break;default:Rt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},yh=class yh{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ec.copy(this).projectOnVector(t),this.sub(ec)}reflect(t){return this.sub(ec.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};yh.prototype.isVector3=!0;var F=yh,ec=new F,Vu=new ye,_h=class _h{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],y=s[0],m=s[3],g=s[6],v=s[1],w=s[4],M=s[7],A=s[2],E=s[5],x=s[8];return r[0]=o*y+a*v+l*A,r[3]=o*m+a*w+l*E,r[6]=o*g+a*M+l*x,r[1]=c*y+h*v+u*A,r[4]=c*m+h*w+u*E,r[7]=c*g+h*M+u*x,r[2]=f*y+d*v+p*A,r[5]=f*m+d*w+p*E,r[8]=f*g+d*M+p*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,p=e*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return t[0]=u*y,t[1]=(s*c-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-a*e)*y,t[6]=d*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return yr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nc.makeScale(t,e)),this}rotate(t){return yr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nc.makeRotation(-t)),this}translate(t,e){return yr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};_h.prototype.isMatrix3=!0;var Ut=_h,nc=new Ut,Gu=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hu=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Jm(){let i={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===oe&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===oe&&(s.r=Is(s.r),s.g=Is(s.g),s.b=Is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?br:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Mr]:{primaries:t,whitePoint:n,transfer:br,toXYZ:Gu,fromXYZ:Hu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ne},outputColorSpaceConfig:{drawingBufferColorSpace:ne}},[ne]:{primaries:t,whitePoint:n,transfer:oe,toXYZ:Gu,fromXYZ:Hu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ne}}}),i}var zt=Jm();function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var xs,da=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{xs===void 0&&(xs=Fs("canvas")),xs.width=t.width,xs.height=t.height;let s=xs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=xs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Fs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return Rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},jm=0,Us=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Ui(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ic(s[o].image)):r.push(ic(s[o]))}else r=ic(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ic(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?da.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Rt("Texture: Unable to serialize Texture."),{})}var Km=0,sc=new F,ke=class i extends Hn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=fn,s=fn,r=Qe,o=ui,a=bn,l=on,c=i.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=Ui(),this.name="",this.source=new Us(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(sc).x}get height(){return this.source.getSize(sc).y}get depth(){return this.source.getSize(sc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Rt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yi:t.x=t.x-Math.floor(t.x);break;case fn:t.x=t.x<0?0:1;break;case ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yi:t.y=t.y-Math.floor(t.y);break;case fn:t.y=t.y<0?0:1;break;case ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=jc;ke.DEFAULT_ANISOTROPY=1;var vh=class vh{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],p=l[9],y=l[2],m=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,M=(d+1)/2,A=(g+1)/2,E=(h+f)/4,x=(u+y)/4,b=(p+m)/4;return w>M&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=E/n,r=x/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=E/s,r=b/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=x/r,s=b/r),this.set(n,s,r,e),this}let v=Math.sqrt((m-p)*(m-p)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-p)/v,this.y=(u-y)/v,this.z=(f-h)/v,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};vh.prototype.isVector4=!0;var Zt=vh,pa=class extends Hn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Zt(0,0,t,e),this.scissorTest=!1,this.viewport=new Zt(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new ke({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Us(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},dn=class extends pa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},wr=class extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ma=class extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ia=class Ia{constructor(t,e,n,s,r,o,a,l,c,h,u,f,d,p,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,d,p,y,m)}set(t,e,n,s,r,o,a,l,c,h,u,f,d,p,y,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=y,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ia().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/ys.setFromMatrixColumn(t,0).length(),r=1/ys.setFromMatrixColumn(t,1).length(),o=1/ys.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,p=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+p*c,e[5]=f-y*c,e[9]=-a*l,e[2]=y-f*c,e[6]=p+d*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,p=c*h,y=c*u;e[0]=f+y*a,e[4]=p*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-p,e[6]=y+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,p=c*h,y=c*u;e[0]=f-y*a,e[4]=-o*u,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*h,e[9]=y-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,d=o*u,p=a*h,y=a*u;e[0]=l*h,e[4]=p*c-d,e[8]=f*c+y,e[1]=l*u,e[5]=y*c+f,e[9]=d*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,d=o*c,p=a*l,y=a*c;e[0]=l*h,e[4]=y-f*u,e[8]=p*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+p,e[10]=f-y*u}else if(t.order==="XZY"){let f=o*l,d=o*c,p=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+y,e[5]=o*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=a*h,e[10]=y*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qm,t,tg)}lookAt(t,e,n){let s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),_i.crossVectors(n,hn),_i.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),_i.crossVectors(n,hn)),_i.normalize(),Lo.crossVectors(hn,_i),s[0]=_i.x,s[4]=Lo.x,s[8]=hn.x,s[1]=_i.y,s[5]=Lo.y,s[9]=hn.y,s[2]=_i.z,s[6]=Lo.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],y=n[6],m=n[10],g=n[14],v=n[3],w=n[7],M=n[11],A=n[15],E=s[0],x=s[4],b=s[8],I=s[12],R=s[1],L=s[5],U=s[9],z=s[13],P=s[2],H=s[6],X=s[10],G=s[14],nt=s[3],W=s[7],tt=s[11],et=s[15];return r[0]=o*E+a*R+l*P+c*nt,r[4]=o*x+a*L+l*H+c*W,r[8]=o*b+a*U+l*X+c*tt,r[12]=o*I+a*z+l*G+c*et,r[1]=h*E+u*R+f*P+d*nt,r[5]=h*x+u*L+f*H+d*W,r[9]=h*b+u*U+f*X+d*tt,r[13]=h*I+u*z+f*G+d*et,r[2]=p*E+y*R+m*P+g*nt,r[6]=p*x+y*L+m*H+g*W,r[10]=p*b+y*U+m*X+g*tt,r[14]=p*I+y*z+m*G+g*et,r[3]=v*E+w*R+M*P+A*nt,r[7]=v*x+w*L+M*H+A*W,r[11]=v*b+w*U+M*X+A*tt,r[15]=v*I+w*z+M*G+A*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],y=t[7],m=t[11],g=t[15],v=l*d-c*f,w=a*d-c*u,M=a*f-l*u,A=o*d-c*h,E=o*f-l*h,x=o*u-a*h;return e*(y*v-m*w+g*M)-n*(p*v-m*A+g*E)+s*(p*w-y*A+g*x)-r*(p*M-y*E+m*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],y=t[13],m=t[14],g=t[15],v=e*a-n*o,w=e*l-s*o,M=e*c-r*o,A=n*l-s*a,E=n*c-r*a,x=s*c-r*l,b=h*y-u*p,I=h*m-f*p,R=h*g-d*p,L=u*m-f*y,U=u*g-d*y,z=f*g-d*m,P=v*z-w*U+M*L+A*R-E*I+x*b;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/P;return t[0]=(a*z-l*U+c*L)*H,t[1]=(s*U-n*z-r*L)*H,t[2]=(y*x-m*E+g*A)*H,t[3]=(f*E-u*x-d*A)*H,t[4]=(l*R-o*z-c*I)*H,t[5]=(e*z-s*R+r*I)*H,t[6]=(m*M-p*x-g*w)*H,t[7]=(h*x-f*M+d*w)*H,t[8]=(o*U-a*R+c*b)*H,t[9]=(n*R-e*U-r*b)*H,t[10]=(p*E-y*M+g*v)*H,t[11]=(u*M-h*E-d*v)*H,t[12]=(a*I-o*L-l*b)*H,t[13]=(e*L-n*I+s*b)*H,t[14]=(y*w-p*A-m*v)*H,t[15]=(h*A-u*w+f*v)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,p=r*u,y=o*h,m=o*u,g=a*u,v=l*c,w=l*h,M=l*u,A=n.x,E=n.y,x=n.z;return s[0]=(1-(y+g))*A,s[1]=(d+M)*A,s[2]=(p-w)*A,s[3]=0,s[4]=(d-M)*E,s[5]=(1-(f+g))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(p+w)*x,s[9]=(m-v)*x,s[10]=(1-(f+y))*x,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=ys.set(s[0],s[1],s[2]).length(),a=ys.set(s[4],s[5],s[6]).length(),l=ys.set(s[8],s[9],s[10]).length();r<0&&(o=-o),An.copy(this);let c=1/o,h=1/a,u=1/l;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,e.setFromRotationMatrix(An),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=vn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),p,y;if(l)p=r/(o-r),y=o*r/(o-r);else if(a===vn)p=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ds)p=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=vn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),p,y;if(l)p=1/(o-r),y=o/(o-r);else if(a===vn)p=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ds)p=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ia.prototype.isMatrix4=!0;var wt=Ia,ys=new F,An=new wt,Qm=new F(0,0,0),tg=new F(1,1,1),_i=new F,Lo=new F,hn=new F,Wu=new wt,Xu=new ye,Ae=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin($t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-$t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Wu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xu.setFromEuler(this),this.setFromQuaternion(Xu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ae.DEFAULT_ORDER="XYZ";var Er=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},eg=0,qu=new F,_s=new ye,Kn=new wt,Do=new F,hr=new F,ng=new F,ig=new ye,$u=new F(1,0,0),Yu=new F(0,1,0),Zu=new F(0,0,1),Ju={type:"added"},sg={type:"removed"},vs={type:"childadded",child:null},rc={type:"childremoved",child:null},fe=class i extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eg++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new Ae,n=new ye,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new wt},normalMatrix:{value:new Ut}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Er,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.multiply(_s),this}rotateOnWorldAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.premultiply(_s),this}rotateX(t){return this.rotateOnAxis($u,t)}rotateY(t){return this.rotateOnAxis(Yu,t)}rotateZ(t){return this.rotateOnAxis(Zu,t)}translateOnAxis(t,e){return qu.copy(t).applyQuaternion(this.quaternion),this.position.add(qu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($u,t)}translateY(t){return this.translateOnAxis(Yu,t)}translateZ(t){return this.translateOnAxis(Zu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Do.copy(t):Do.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),hr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(hr,Do,this.up):Kn.lookAt(Do,hr,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),_s.setFromRotationMatrix(Kn),this.quaternion.premultiply(_s.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ju),vs.child=t,this.dispatchEvent(vs),vs.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sg),rc.child=t,this.dispatchEvent(rc),rc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ju),vs.child=t,this.dispatchEvent(vs),vs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,t,ng),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,ig,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};fe.DEFAULT_UP=new F(0,1,0);fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ke=class extends fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},rg={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,n),g=this._getHandJoint(c,y);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Fo={h:0,s:0,l:0};function oc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var It=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ne){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,zt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,zt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=zt.workingColorSpace){if(t=hh(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=oc(o,r,t+1/3),this.g=oc(o,r,t),this.b=oc(o,r,t-1/3)}return zt.colorSpaceToWorking(this,s),this}setStyle(t,e=ne){function n(r){r!==void 0&&parseFloat(r)<1&&Rt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Rt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Rt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ne){let n=cd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Rt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=Is(t.r),this.g=Is(t.g),this.b=Is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ne){return zt.workingToColorSpace(Ze.copy(this),t),Math.round($t(Ze.r*255,0,255))*65536+Math.round($t(Ze.g*255,0,255))*256+Math.round($t(Ze.b*255,0,255))}getHexString(t=ne){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=zt.workingColorSpace){zt.workingToColorSpace(Ze.copy(this),e);let n=Ze.r,s=Ze.g,r=Ze.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=zt.workingColorSpace){return zt.workingToColorSpace(Ze.copy(this),e),t.r=Ze.r,t.g=Ze.g,t.b=Ze.b,t}getStyle(t=ne){zt.workingToColorSpace(Ze.copy(this),t);let e=Ze.r,n=Ze.g,s=Ze.b;return t!==ne?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(vi),this.setHSL(vi.h+t,vi.s+e,vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(vi),t.getHSL(Fo);let n=vr(vi.h,Fo.h,e),s=vr(vi.s,Fo.s,e),r=vr(vi.l,Fo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ze=new It;It.NAMES=cd;var Tr=class extends fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ae,this.environmentIntensity=1,this.environmentRotation=new Ae,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Rn=new F,Qn=new F,ac=new F,ti=new F,Ss=new F,Ms=new F,ju=new F,lc=new F,cc=new F,hc=new F,uc=new Zt,fc=new Zt,dc=new Zt,Ei=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Rn.subVectors(t,e),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Rn.subVectors(s,e),Qn.subVectors(n,e),ac.subVectors(t,e);let o=Rn.dot(Rn),a=Rn.dot(Qn),l=Rn.dot(ac),c=Qn.dot(Qn),h=Qn.dot(ac),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,p=(o*h-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(o,ti.y),l.addScaledVector(a,ti.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return uc.setScalar(0),fc.setScalar(0),dc.setScalar(0),uc.fromBufferAttribute(t,e),fc.fromBufferAttribute(t,n),dc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(uc,r.x),o.addScaledVector(fc,r.y),o.addScaledVector(dc,r.z),o}static isFrontFacing(t,e,n,s){return Rn.subVectors(n,e),Qn.subVectors(t,e),Rn.cross(Qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Rn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Rn.cross(Qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ss.subVectors(s,n),Ms.subVectors(r,n),lc.subVectors(t,n);let l=Ss.dot(lc),c=Ms.dot(lc);if(l<=0&&c<=0)return e.copy(n);cc.subVectors(t,s);let h=Ss.dot(cc),u=Ms.dot(cc);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),e.copy(n).addScaledVector(Ss,o);hc.subVectors(t,r);let d=Ss.dot(hc),p=Ms.dot(hc);if(p>=0&&d<=p)return e.copy(r);let y=d*c-l*p;if(y<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Ms,a);let m=h*p-d*u;if(m<=0&&u-h>=0&&d-p>=0)return ju.subVectors(r,s),a=(u-h)/(u-h+(d-p)),e.copy(s).addScaledVector(ju,a);let g=1/(m+y+f);return o=y*g,a=f*g,e.copy(n).addScaledVector(Ss,o).addScaledVector(Ms,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},tn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Cn):Cn.fromBufferAttribute(r,o),Cn.applyMatrix4(t.matrixWorld),this.expandByPoint(Cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),No.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),No.copy(n.boundingBox)),No.applyMatrix4(t.matrixWorld),this.union(No)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Cn),Cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ur),Uo.subVectors(this.max,ur),bs.subVectors(t.a,ur),ws.subVectors(t.b,ur),Es.subVectors(t.c,ur),Si.subVectors(ws,bs),Mi.subVectors(Es,ws),Wi.subVectors(bs,Es);let e=[0,-Si.z,Si.y,0,-Mi.z,Mi.y,0,-Wi.z,Wi.y,Si.z,0,-Si.x,Mi.z,0,-Mi.x,Wi.z,0,-Wi.x,-Si.y,Si.x,0,-Mi.y,Mi.x,0,-Wi.y,Wi.x,0];return!pc(e,bs,ws,Es,Uo)||(e=[1,0,0,0,1,0,0,0,1],!pc(e,bs,ws,Es,Uo))?!1:(Oo.crossVectors(Si,Mi),e=[Oo.x,Oo.y,Oo.z],pc(e,bs,ws,Es,Uo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ei=[new F,new F,new F,new F,new F,new F,new F,new F],Cn=new F,No=new tn,bs=new F,ws=new F,Es=new F,Si=new F,Mi=new F,Wi=new F,ur=new F,Uo=new F,Oo=new F,Xi=new F;function pc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Xi.fromArray(i,r);let a=s.x*Math.abs(Xi.x)+s.y*Math.abs(Xi.y)+s.z*Math.abs(Xi.z),l=t.dot(Xi),c=e.dot(Xi),h=n.dot(Xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var be=new F,Bo=new Wt,og=0,Gn=class extends Hn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:og++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=nd,this.updateRanges=[],this.gpuType=Mn,this.version=0,this._normalizationScale=t!==void 0?fh(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Bo.fromBufferAttribute(this,e),Bo.applyMatrix3(t),this.setXY(e,Bo.x,Bo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):ad(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):ld(t,this.array)}};var Ji=class extends Gn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ar=class extends Gn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ce=class extends Gn{constructor(t,e,n){super(new Float32Array(t),e,n)}},ag=new tn,fr=new F,mc=new F,oi=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ag.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fr.subVectors(t,this.center);let e=fr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(fr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(mc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fr.copy(t.center).add(mc)),this.expandByPoint(fr.copy(t.center).sub(mc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},lg=0,_n=new wt,gc=new fe,Ts=new F,un=new tn,dr=new tn,Oe=new F,ze=class i extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dm(t)?Ar:Ji)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,n){return _n.makeTranslation(t,e,n),this.applyMatrix4(_n),this}scale(t,e,n){return _n.makeScale(t,e,n),this.applyMatrix4(_n),this}lookAt(t){return gc.lookAt(t),gc.updateMatrix(),this.applyMatrix4(gc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ce(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];dr.setFromBufferAttribute(a),this.morphTargetsRelative?(Oe.addVectors(un.min,dr.min),un.expandByPoint(Oe),Oe.addVectors(un.max,dr.max),un.expandByPoint(Oe)):(un.expandByPoint(dr.min),un.expandByPoint(dr.max))}un.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Oe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Oe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Oe.fromBufferAttribute(a,c),l&&(Ts.fromBufferAttribute(t,c),Oe.add(Ts)),s=Math.max(s,n.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Gn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let I=0;I<n.count;I++)a[I]=new F,l[I]=new F;let h=new F,u=new F,f=new F,d=new Wt,p=new Wt,y=new Wt,m=new F,g=new F;function v(I,R,L){c[I]=c[R]=c[L]=1,h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,R),f.fromBufferAttribute(n,L),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,R),y.fromBufferAttribute(r,L),u.sub(h),f.sub(h),p.sub(d),y.sub(d);let U=1/(p.x*y.y-y.x*p.y);isFinite(U)&&(m.copy(u).multiplyScalar(y.y).addScaledVector(f,-p.y).multiplyScalar(U),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-y.x).multiplyScalar(U),a[I].add(m),a[R].add(m),a[L].add(m),l[I].add(g),l[R].add(g),l[L].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let I=0,R=w.length;I<R;++I){let L=w[I],U=L.start,z=L.count;for(let P=U,H=U+z;P<H;P+=3)v(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let M=new F,A=new F,E=new F,x=new F;function b(I){E.fromBufferAttribute(s,I),x.copy(E);let R=a[I];M.copy(R),M.sub(E.multiplyScalar(E.dot(R))).normalize(),A.crossVectors(x,R);let U=A.dot(l[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,U)}for(let I=0,R=n.count;I<R;++I)c[I]&&b(I);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Gn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,u=new F;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Oe.fromBufferAttribute(t,e),Oe.normalize(),t.setXYZ(e,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,p=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?d=l[y]*a.data.stride+a.offset:d=l[y]*h;for(let g=0;g<h;g++)f[p++]=c[d++]}return new Gn(f,h,u)}if(this.index===null)return Rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var xc=new F,cg=new F,hg=new Ut,In=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=xc.subVectors(n,e).cross(cg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(xc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||hg.getNormalMatrix(t),s=this.coplanarPoint(xc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},ug=0,Pn=class extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=qs,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gc,this.blendDst=Hc,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ia,this.stencilZFail=ia,this.stencilZPass=ia,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Rt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Rt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new It().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new In().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Wt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Wt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ni=new F,yc=new F,ko=new F,zo=new F,Bs=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ni)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ni.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ni.copy(this.origin).addScaledVector(this.direction,e),ni.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){yc.copy(t).add(e).multiplyScalar(.5),ko.copy(e).sub(t).normalize(),zo.copy(this.origin).sub(yc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ko),a=zo.dot(this.direction),l=-zo.dot(ko),c=zo.lengthSq(),h=Math.abs(1-o*o),u,f,d,p;if(h>0)if(u=o*l-a,f=o*a-l,p=r*h,u>=0)if(f>=-p)if(f<=p){let y=1/h;u*=y,f*=y,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(yc).addScaledVector(ko,f),d}intersectSphere(t,e){if(t.radius<0)return null;ni.subVectors(t.center,this.origin);let n=ni.dot(this.direction),s=ni.dot(ni)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ni)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,f=t.y-o.y,d=t.z-o.z,p=e.x-o.x,y=e.y-o.y,m=e.z-o.z,g=n.x-o.x,v=n.y-o.y,w=n.z-o.z,M=Math.abs(l),A=Math.abs(c),E=Math.abs(h),x,b,I,R,L,U,z,P,H,X,G,nt;if(M>=A&&M>=E?(I=l,U=u,H=p,nt=g,l>=0?(x=c,b=h,R=f,L=d,z=y,P=m,X=v,G=w):(x=h,b=c,R=d,L=f,z=m,P=y,X=w,G=v)):A>=E?(I=c,U=f,H=y,nt=v,c>=0?(x=h,b=l,R=d,L=u,z=m,P=p,X=w,G=g):(x=l,b=h,R=u,L=d,z=p,P=m,X=g,G=w)):(I=h,U=d,H=m,nt=w,h>=0?(x=l,b=c,R=u,L=f,z=p,P=y,X=g,G=v):(x=c,b=l,R=f,L=u,z=y,P=p,X=v,G=g)),I===0)return null;let W=x/I,tt=b/I,et=1/I,vt=R-W*U,Dt=L-tt*U,Z=z-W*H,dt=P-tt*H,_t=X-W*nt,Ct=G-tt*nt,mt=_t*dt-Ct*Z,Bt=vt*Ct-Dt*_t,ve=Z*Dt-dt*vt;if(s){if(mt<0||Bt<0||ve<0)return null}else if((mt<0||Bt<0||ve<0)&&(mt>0||Bt>0||ve>0))return null;let Lt=mt+Bt+ve;if(Lt===0)return null;let te=et*(mt*U+Bt*H+ve*nt);return(Lt>0?te<0:te>0)?null:this.at(te/Lt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ji=class extends Pn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ae,this.combine=Kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ku=new wt,qi=new Bs,Vo=new oi,Qu=new F,Go=new F,Ho=new F,Wo=new F,_c=new F,Xo=new F,tf=new F,qo=new F,Re=class extends fe{constructor(t=new ze,e=new ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Xo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(_c.fromBufferAttribute(u,t),o?Xo.addScaledVector(_c,h):Xo.addScaledVector(_c.sub(e),h))}e.add(Xo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(r),qi.copy(t.ray).recast(t.near),!(Vo.containsPoint(qi.origin)===!1&&(qi.intersectSphere(Vo,Qu)===null||qi.origin.distanceToSquared(Qu)>(t.far-t.near)**2))&&(Ku.copy(r).invert(),qi.copy(t.ray).applyMatrix4(Ku),!(n.boundingBox!==null&&qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,y=f.length;p<y;p++){let m=f[p],g=o[m.materialIndex],v=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=v,A=w;M<A;M+=3){let E=a.getX(M),x=a.getX(M+1),b=a.getX(M+2);s=$o(this,g,t,n,c,h,u,E,x,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let m=p,g=y;m<g;m+=3){let v=a.getX(m),w=a.getX(m+1),M=a.getX(m+2);s=$o(this,o,t,n,c,h,u,v,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,y=f.length;p<y;p++){let m=f[p],g=o[m.materialIndex],v=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=v,A=w;M<A;M+=3){let E=M,x=M+1,b=M+2;s=$o(this,g,t,n,c,h,u,E,x,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let m=p,g=y;m<g;m+=3){let v=m,w=m+1,M=m+2;s=$o(this,o,t,n,c,h,u,v,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function fg(i,t,e,n,s,r,o,a){let l;if(t.side===en?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Fi,a),l===null)return null;qo.copy(a),qo.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(qo);return c<e.near||c>e.far?null:{distance:c,point:qo.clone(),object:i}}function $o(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Go),i.getVertexPosition(l,Ho),i.getVertexPosition(c,Wo);let h=fg(i,t,e,n,Go,Ho,Wo,tf);if(h){let u=new F;Ei.getBarycoord(tf,Go,Ho,Wo,u),s&&(h.uv=Ei.getInterpolatedAttribute(s,a,l,c,u,new Wt)),r&&(h.uv1=Ei.getInterpolatedAttribute(r,a,l,c,u,new Wt)),o&&(h.normal=Ei.getInterpolatedAttribute(o,a,l,c,u,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new F,materialIndex:0};Ei.getNormal(Go,Ho,Wo,f.normal),h.face=f,h.barycoord=u}return h}var pr=new Zt,ef=new Zt,nf=new Zt,dg=new Zt,sf=new wt,Yo=new F,vc=new oi,rf=new wt,Sc=new Bs,Rr=class extends Re{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=wc,this.bindMatrix=new wt,this.bindMatrixInverse=new wt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new tn),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Yo),this.boundingBox.expandByPoint(Yo)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new oi),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Yo),this.boundingSphere.expandByPoint(Yo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vc.copy(this.boundingSphere),vc.applyMatrix4(s),t.ray.intersectsSphere(vc)!==!1&&(rf.copy(s).invert(),Sc.copy(t.ray).applyMatrix4(rf),!(this.boundingBox!==null&&Sc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Sc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new Zt,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===wc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Xf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Rt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;ef.fromBufferAttribute(s.attributes.skinIndex,t),nf.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(pr.copy(e),e.set(0,0,0,0)):(pr.set(e.x,e.y,e.z,1),e.set(0,0,0)),pr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=nf.getComponent(r);if(o!==0){let a=ef.getComponent(r);sf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(dg.copy(pr).applyMatrix4(sf),o)}}return e.isVector4&&(e.w=pr.w),e.applyMatrix4(this.bindMatrixInverse)}},Ki=class extends fe{constructor(){super(),this.isBone=!0,this.type="Bone"}},Cr=class extends ke{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Be,h=Be,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},of=new wt,pg=new wt,Ir=class i{constructor(t=[],e=[]){this.uuid=Ui(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Rt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new wt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new wt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:pg;of.multiplyMatrices(a,e[r]),of.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Cr(e,t,t,bn,Mn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(Rt("Skeleton: No bone found with UUID:",r),o=new Ki),this.bones.push(o),this.boneInverses.push(new wt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}};var $i=new oi,mg=new Wt(.5,.5),Zo=new F,Ti=class{constructor(t=new In,e=new In,n=new In,s=new In,r=new In,o=new In){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],y=r[9],m=r[10],g=r[11],v=r[12],w=r[13],M=r[14],A=r[15];if(s[0].setComponents(c-o,d-h,g-p,A-v).normalize(),s[1].setComponents(c+o,d+h,g+p,A+v).normalize(),s[2].setComponents(c+a,d+u,g+y,A+w).normalize(),s[3].setComponents(c-a,d-u,g-y,A-w).normalize(),n)s[4].setComponents(l,f,m,M).normalize(),s[5].setComponents(c-l,d-f,g-m,A-M).normalize();else if(s[4].setComponents(c-l,d-f,g-m,A-M).normalize(),e===vn)s[5].setComponents(c+l,d+f,g+m,A+M).normalize();else if(e===Ds)s[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){$i.center.set(0,0,0);let e=mg.distanceTo(t.center);return $i.radius=.7071067811865476+e,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Zo.x=s.normal.x>0?t.max.x:t.min.x,Zo.y=s.normal.y>0?t.max.y:t.min.y,Zo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},af=new wt,ga=class i{constructor(){this.coordinateSystem=vn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];af.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ti),n[s].setFromProjectionMatrix(af,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Ti),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var Ai=class extends Pn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},xa=new F,ya=new F,lf=new wt,mr=new Bs,Jo=new oi,Mc=new F,cf=new F,Qi=class extends fe{constructor(t=new ze,e=new Ai){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)xa.fromBufferAttribute(e,s-1),ya.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=xa.distanceTo(ya);t.setAttribute("lineDistance",new ce(n,1))}else Rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(s),Jo.radius+=r,t.ray.intersectsSphere(Jo)===!1)return;lf.copy(s).invert(),mr.copy(t.ray).applyMatrix4(lf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let y=d,m=p-1;y<m;y+=c){let g=h.getX(y),v=h.getX(y+1),w=jo(this,t,mr,l,g,v,y);w&&e.push(w)}if(this.isLineLoop){let y=h.getX(p-1),m=h.getX(d),g=jo(this,t,mr,l,y,m,p-1);g&&e.push(g)}}else{let d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let y=d,m=p-1;y<m;y+=c){let g=jo(this,t,mr,l,y,y+1,y);g&&e.push(g)}if(this.isLineLoop){let y=jo(this,t,mr,l,p-1,d,p-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function jo(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(xa.fromBufferAttribute(a,s),ya.fromBufferAttribute(a,r),e.distanceSqToSegment(xa,ya,Mc,cf)>n)return;Mc.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Mc);if(!(c<t.near||c>t.far))return{distance:c,point:cf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Pr=class extends ke{constructor(t=[],e=as,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ks=class extends ke{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ai=class extends ke{constructor(t,e,n=Dn,s,r,o,a=Be,l=Be,c,h=ri,u=1){if(h!==ri&&h!==fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Us(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Lr=class extends ai{constructor(t,e=Dn,n=as,s,r,o=Be,a=Be,l,c=ri){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Dr=class extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ri=class i extends ze{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2));function p(y,m,g,v,w,M,A,E,x,b,I){let R=M/x,L=A/b,U=M/2,z=A/2,P=E/2,H=x+1,X=b+1,G=0,nt=0,W=new F;for(let tt=0;tt<X;tt++){let et=tt*L-z;for(let vt=0;vt<H;vt++){let Dt=vt*R-U;W[y]=Dt*v,W[m]=et*w,W[g]=P,c.push(W.x,W.y,W.z),W[y]=0,W[m]=0,W[g]=E>0?1:-1,h.push(W.x,W.y,W.z),u.push(vt/x),u.push(1-tt/b),G+=1}}for(let tt=0;tt<b;tt++)for(let et=0;et<x;et++){let vt=f+et+H*tt,Dt=f+et+H*(tt+1),Z=f+(et+1)+H*(tt+1),dt=f+(et+1)+H*tt;l.push(vt,Dt,dt),l.push(Dt,Z,dt),nt+=6}a.addGroup(d,nt,I),d+=nt,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ts=class i extends ze{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,u=Math.PI/2*t,f=e,d=2*u+f,p=n*2+r,y=s+1,m=new F,g=new F;for(let v=0;v<=p;v++){let w=0,M=0,A=0,E=0;if(v<=n){let I=v/n,R=I*Math.PI/2;M=-h-t*Math.cos(R),A=t*Math.sin(R),E=-t*Math.cos(R),w=I*u}else if(v<=n+r){let I=(v-n)/r;M=-h+I*e,A=t,E=0,w=u+I*f}else{let I=(v-n-r)/n,R=I*Math.PI/2;M=h+t*Math.sin(R),A=t*Math.cos(R),E=t*Math.sin(R),w=u+f+I*u}let x=Math.max(0,Math.min(1,w/d)),b=0;v===0?b=.5/s:v===p&&(b=-.5/s);for(let I=0;I<=s;I++){let R=I/s,L=R*Math.PI*2,U=Math.sin(L),z=Math.cos(L);g.x=-A*z,g.y=M,g.z=A*U,a.push(g.x,g.y,g.z),m.set(-A*z,E,A*U),m.normalize(),l.push(m.x,m.y,m.z),c.push(R+b,x)}if(v>0){let I=(v-1)*y;for(let R=0;R<s;R++){let L=I+R,U=I+R+1,z=v*y+R,P=v*y+R+1;o.push(L,U,z),o.push(U,P,z)}}}this.setIndex(o),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(l,3)),this.setAttribute("uv",new ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var _a=class i extends ze{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],p=0,y=[],m=n/2,g=0;v(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new ce(u,3)),this.setAttribute("normal",new ce(f,3)),this.setAttribute("uv",new ce(d,2));function v(){let M=new F,A=new F,E=0,x=(e-t)/n;for(let b=0;b<=r;b++){let I=[],R=b/r,L=R*(e-t)+t;for(let U=0;U<=s;U++){let z=U/s,P=z*l+a,H=Math.sin(P),X=Math.cos(P);A.x=L*H,A.y=-R*n+m,A.z=L*X,u.push(A.x,A.y,A.z),M.set(H,x,X).normalize(),f.push(M.x,M.y,M.z),d.push(z,1-R),I.push(p++)}y.push(I)}for(let b=0;b<s;b++)for(let I=0;I<r;I++){let R=y[I][b],L=y[I+1][b],U=y[I+1][b+1],z=y[I][b+1];(t>0||I!==0)&&(h.push(R,L,z),E+=3),(e>0||I!==r-1)&&(h.push(L,U,z),E+=3)}c.addGroup(g,E,0),g+=E}function w(M){let A=p,E=new Wt,x=new F,b=0,I=M===!0?t:e,R=M===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),p++;let L=p;for(let U=0;U<=s;U++){let P=U/s*l+a,H=Math.cos(P),X=Math.sin(P);x.x=I*X,x.y=m*R,x.z=I*H,u.push(x.x,x.y,x.z),f.push(0,R,0),E.x=H*.5+.5,E.y=X*.5*R+.5,d.push(E.x,E.y),p++}for(let U=0;U<s;U++){let z=A+U,P=L+U;M===!0?h.push(P,P+1,z):h.push(P+1,P,z),b+=3}c.addGroup(g,b,M===!0?1:2),g+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fr=class i extends _a{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Nr=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Rt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Wt:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new F,s=[],r=[],o=[],a=new F,l=new wt;for(let d=0;d<=t;d++){let p=d/t;s[d]=this.getTangentAt(p,new F)}r[0]=new F,o[0]=new F;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos($t(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos($t(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}};function gg(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=hd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Sg(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,u=l;for(let f=e;f<s;f+=e){let d=i[f],p=i[f+1];d<a&&(a=d),p<l&&(l=p),d>h&&(h=d),p>u&&(u=p)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Ur(r,o,e,a,l,c,0),o}function hd(i,t,e,n,s){let r;if(s===Lg(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=hf(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=hf(o/n|0,i[o],i[o+1],r);return r&&zs(r,r.next)&&(Br(r),r=r.next),r}function es(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(zs(e,e.next)||xe(e.prev,e,e.next)===0)){if(Br(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ur(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Tg(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?yg(i,n,s,r):xg(i)){t.push(l.i,i.i,c.i),Br(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=_g(es(i),t),Ur(i,t,e,n,s,r,2)):o===2&&vg(i,t,e,n,s,r):Ur(es(i),t,e,n,s,r,1);break}}}function xg(i){let t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&gr(s,a,r,l,o,c,p.x,p.y)&&xe(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function yg(i,t,e,n){let s=i.prev,r=i,o=i.next;if(xe(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,l,c),p=Math.min(h,u,f),y=Math.max(a,l,c),m=Math.max(h,u,f),g=Cc(d,p,t,e,n),v=Cc(y,m,t,e,n),w=i.prevZ,M=i.nextZ;for(;w&&w.z>=g&&M&&M.z<=v;){if(w.x>=d&&w.x<=y&&w.y>=p&&w.y<=m&&w!==s&&w!==o&&gr(a,h,l,u,c,f,w.x,w.y)&&xe(w.prev,w,w.next)>=0||(w=w.prevZ,M.x>=d&&M.x<=y&&M.y>=p&&M.y<=m&&M!==s&&M!==o&&gr(a,h,l,u,c,f,M.x,M.y)&&xe(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;w&&w.z>=g;){if(w.x>=d&&w.x<=y&&w.y>=p&&w.y<=m&&w!==s&&w!==o&&gr(a,h,l,u,c,f,w.x,w.y)&&xe(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;M&&M.z<=v;){if(M.x>=d&&M.x<=y&&M.y>=p&&M.y<=m&&M!==s&&M!==o&&gr(a,h,l,u,c,f,M.x,M.y)&&xe(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function _g(i,t){let e=i;do{let n=e.prev,s=e.next.next;!zs(n,s)&&fd(n,e,e.next,s)&&Or(n,s)&&Or(s,n)&&(t.push(n.i,e.i,s.i),Br(e),Br(e.next),e=i=s),e=e.next}while(e!==i);return es(e)}function vg(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Cg(o,a)){let l=dd(o,a);o=es(o,o.next),l=es(l,l.next),Ur(o,t,e,n,s,r,0),Ur(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Sg(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=hd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Rg(c))}s.sort(Mg);for(let r=0;r<s.length;r++)e=bg(s[r],e);return e}function Mg(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function bg(i,t){let e=wg(i,t);if(!e)return t;let n=dd(e,i);return es(n,n.next),es(e,e.next)}function wg(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(zs(i,e))return e;do{if(zs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&ud(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);Or(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Eg(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function Eg(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function Tg(i,t,e,n){let s=i;do s.z===0&&(s.z=Cc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Ag(s)}function Ag(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Cc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Rg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ud(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function gr(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&ud(i,t,e,n,s,r,o,a)}function Cg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Ig(i,t)&&(Or(i,t)&&Or(t,i)&&Pg(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||zs(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function zs(i,t){return i.x===t.x&&i.y===t.y}function fd(i,t,e,n){let s=Qo(xe(i,t,e)),r=Qo(xe(i,t,n)),o=Qo(xe(e,n,i)),a=Qo(xe(e,n,t));return!!(s!==r&&o!==a||s===0&&Ko(i,e,t)||r===0&&Ko(i,n,t)||o===0&&Ko(e,i,n)||a===0&&Ko(e,t,n))}function Ko(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Qo(i){return i>0?1:i<0?-1:0}function Ig(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&fd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Or(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function Pg(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function dd(i,t){let e=Ic(i.i,i.x,i.y),n=Ic(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function hf(i,t,e,n){let s=Ic(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Br(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ic(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Lg(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Pc=class{static triangulate(t,e,n=2){return gg(t,e,n)}},kr=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];uf(t),ff(n,t);let o=t.length;e.forEach(uf);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,ff(n,e[l]);let a=Pc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function uf(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ff(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var li=class i extends ze{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,d=[],p=[],y=[],m=[];for(let g=0;g<h;g++){let v=g*f-o;for(let w=0;w<c;w++){let M=w*u-r;p.push(M,-v,0),y.push(0,0,1),m.push(w/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<a;v++){let w=v+c*g,M=v+c*(g+1),A=v+1+c*(g+1),E=v+1+c*g;d.push(w,M,E),d.push(M,A,E)}this.setIndex(d),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(y,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var zr=class i extends ze{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new F,f=new F,d=[],p=[],y=[],m=[];for(let g=0;g<=n;g++){let v=[],w=g/n,M=o+w*a,A=t*Math.cos(M),E=Math.sqrt(t*t-A*A),x=0;g===0&&o===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let b=0;b<=e;b++){let I=b/e,R=s+I*r;u.x=-E*Math.cos(R),u.y=A,u.z=E*Math.sin(R),p.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),m.push(I+x,1-w),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<e;v++){let w=h[g][v+1],M=h[g][v],A=h[g+1][v],E=h[g+1][v+1];(g!==0||o>0)&&d.push(w,M,E),(g!==n-1||l<Math.PI)&&d.push(M,A,E)}this.setIndex(d),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(y,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function cs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(df(s))s.isRenderTargetTexture?(Rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(df(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Je(i){let t={};for(let e=0;e<i.length;e++){let n=cs(i[e]);for(let s in n)t[s]=n[s]}return t}function df(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Dg(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function dh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:zt.workingColorSpace}var pd={clone:cs,merge:Je},Fg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ng=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wn=class extends Pn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fg,this.fragmentShader=Ng,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=cs(t.uniforms),this.uniformsGroups=Dg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new It().setHex(s.value);break;case"v2":this.uniforms[n].value=new Wt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ut().fromArray(s.value);break;case"m4":this.uniforms[n].value=new wt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},va=class extends Wn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Xn=class extends Pn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ae,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ci=class extends Pn{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new It(16777215),this.specular=new It(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ae,this.combine=Kr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Vr=class extends Pn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ae,this.combine=Kr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Sa=class extends Pn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ma=class extends Pn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function wi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function xr(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function Ug(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function pf(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let l=0;l!==t;++l)s[o++]=i[a+l]}return s}function Og(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}var Ii=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ba=class extends Ii{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tc,endingEnd:Tc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ac:r=t,a=2*e-n;break;case Rc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ac:o=t,l=2*n-e;break;case Rc:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-e)/(s-e),y=p*p,m=y*p,g=-f*m+2*f*y-f*p,v=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*p+1,w=(-1-d)*m+(1.5+d)*y+.5*p,M=d*m-d*y;for(let A=0;A!==a;++A)r[A]=g*o[h+A]+v*o[c+A]+w*o[l+A]+M*o[u+A];return r}},wa=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},Ea=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ta=class extends Ii{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-e)/(s-e),y=1-p;for(let m=0;m!==a;++m)r[m]=o[c+m]*y+o[l+m]*p;return r}let f=a*2,d=t-1;for(let p=0;p!==a;++p){let y=o[c+p],m=o[l+p],g=d*f+p*2,v=u[g],w=u[g+1],M=t*f+p*2,A=h[M],E=h[M+1],x=kg(n,e,v,A,s);r[p]=md(x,y,w,E,m)}return r}};function md(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Bg(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function kg(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=md(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Bg(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var rn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wi(e,this.TimeBufferType),this.values=wi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:wi(t.times,Array),values:wi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),xr(t.settings)&&(n.settings={inTangents:wi(t.settings.inTangents,Array),outTangents:wi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ea(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new wa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ba(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ta(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Sr:e=this.InterpolantFactoryMethodDiscrete;break;case fa:e=this.InterpolantFactoryMethodLinear;break;case na:e=this.InterpolantFactoryMethodSmooth;break;case Ec:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Rt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sr;case this.InterpolantFactoryMethodLinear:return fa;case this.InterpolantFactoryMethodSmooth:return na;case this.InterpolantFactoryMethodBezier:return Ec}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;xr(this.settings)&&(mf(this.settings.inTangents,t),mf(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;xr(this.settings)&&(gf(this.settings.inTangents,t),gf(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Ot("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Ot("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Fm(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Ot("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===na,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){let y=e[u+p];if(y!==e[f+p]||y!==e[d+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,xr(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function mf(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function gf(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}rn.prototype.ValueTypeName="";rn.prototype.TimeBufferType=Float32Array;rn.prototype.ValueBufferType=Float32Array;rn.prototype.DefaultInterpolation=fa;var ci=class extends rn{constructor(t,e,n){super(t,e,n)}};ci.prototype.ValueTypeName="bool";ci.prototype.ValueBufferType=Array;ci.prototype.DefaultInterpolation=Sr;ci.prototype.InterpolantFactoryMethodLinear=void 0;ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Gr=class extends rn{constructor(t,e,n,s){super(t,e,n,s)}};Gr.prototype.ValueTypeName="color";var Pi=class extends rn{constructor(t,e,n,s){super(t,e,n,s)}};Pi.prototype.ValueTypeName="number";var Aa=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)ye.slerpFlat(r,0,o,c-a,o,c,l);return r}},Li=class extends rn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Aa(this.times,this.values,this.getValueSize(),t)}};Li.prototype.ValueTypeName="quaternion";Li.prototype.InterpolantFactoryMethodSmooth=void 0;var hi=class extends rn{constructor(t,e,n){super(t,e,n)}};hi.prototype.ValueTypeName="string";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=Sr;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends rn{constructor(t,e,n,s){super(t,e,n,s)}};ns.prototype.ValueTypeName="vector";var Hr=class{constructor(t="",e=-1,n=[],s=$f){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Ui(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(Vg(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(rn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=Ug(l);l=pf(l,1,h),c=pf(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Pi(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};function zg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Pi;case"vector":case"vector2":case"vector3":case"vector4":return ns;case"color":return Gr;case"quaternion":return Li;case"bool":case"boolean":return ci;case"string":return hi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Vg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=zg(i.type);if(i.times===void 0){let n=[],s=[];Og(i.keys,n,s,"value"),i.times=n,i.values=s}let e;return t.parse!==void 0?e=t.parse(i):e=new t(i.name,i.times,i.values,i.interpolation),xr(i.settings)&&(e.settings={inTangents:wi(i.settings.inTangents,Float32Array),outTangents:wi(i.settings.outTangents,Float32Array)}),e}var Ps={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(xf(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!xf(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function xf(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Vs=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],p=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},gd=new Vs,Ln=class{constructor(t){this.manager=t!==void 0?t:gd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Ln.DEFAULT_MATERIAL_NAME="__DEFAULT";var ii={},Lc=class extends Error{constructor(t,e){super(t),this.response=e}},Wr=class extends Ln{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=Ps.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(ii[t]!==void 0){ii[t].push({onLoad:e,onProgress:n,onError:s});return}ii[t]=[],ii[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Rt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ii[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0,y=0,m=new ReadableStream({start(g){v();function v(){u.read().then(({done:w,value:M})=>{if(w)g.close();else{y+=M.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:y,total:d});for(let E=0,x=h.length;E<x;E++){let b=h[E];b.onProgress&&b.onProgress(A)}g.enqueue(M),v()}},w=>{g.error(w)})}}});return new Response(m)}else throw new Lc(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Ps.add(`file:${t}`,c);let h=ii[t];delete ii[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=ii[t];if(h===void 0)throw this.manager.itemError(t),c;delete ii[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var As=new WeakMap,Ra=class extends Ln{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Ps.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=As.get(o);u===void 0&&(u=[],As.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=Fs("img");function l(){h(),e&&e(this);let u=As.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}As.delete(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),Ps.remove(`image:${t}`);let f=As.get(this)||[];for(let d=0;d<f.length;d++){let p=f[d];p.onError&&p.onError(u)}As.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ps.add(`image:${t}`,a),r.manager.itemStart(t),a.fetchPriority=this.priority,a.src=t,a}};var is=class extends Ln{constructor(t){super(t)}load(t,e,n,s){let r=new ke,o=new Ra(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Di=class extends fe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Xr=class extends Di{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},bc=new wt,yf=new F,_f=new F,Gs=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ti,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;yf.setFromMatrixPosition(t.matrixWorld),e.position.copy(yf),_f.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(_f),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){bc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(bc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Ds||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(bc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ta=new F,ea=new ye,Vn=new F,qr=class extends fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ta,ea,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ta,ea,Vn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ta,ea,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ta,ea,Vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},bi=new F,vf=new Wt,Sf=new Wt,Te=class extends qr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(_r*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(_r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,vf,Sf),e.subVectors(Sf,vf)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(_r*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Dc=class extends Gs{constructor(){super(new Te(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Zi*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},$r=class extends Di{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.target=new fe,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Dc}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},Fc=class extends Gs{constructor(){super(new Te(90,1,.5,500)),this.isPointLightShadow=!0}},Hs=class extends Di{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Fc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Yr=class extends qr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Nc=class extends Gs{constructor(){super(new Yr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ss=class extends Di{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(fe.DEFAULT_UP),this.updateMatrix(),this.target=new fe,this.shadow=new Nc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Zr=class extends Di{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Jr=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}};var Rs=-90,Cs=1,Ws=class extends fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Te(Rs,Cs,t,e);s.layers=this.layers,this.add(s);let r=new Te(Rs,Cs,t,e);r.layers=this.layers,this.add(r);let o=new Te(Rs,Cs,t,e);o.layers=this.layers,this.add(o);let a=new Te(Rs,Cs,t,e);a.layers=this.layers,this.add(a);let l=new Te(Rs,Cs,t,e);l.layers=this.layers,this.add(l);let c=new Te(Rs,Cs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=y,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ca=class extends Te{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var ph="\\[\\]\\.:\\/",Gg=new RegExp("["+ph+"]","g"),mh="[^"+ph+"]",Hg="[^"+ph.replace("\\.","")+"]",Wg=/((?:WC+[\/:])*)/.source.replace("WC",mh),Xg=/(WCOD+)?/.source.replace("WCOD",Hg),qg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mh),$g=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mh),Yg=new RegExp("^"+Wg+Xg+qg+$g+"$"),Zg=["material","materials","bones","map"],Uc=class{constructor(t,e,n){let s=n||re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},re=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Gg,"")}static parseTrackName(t){let e=Yg.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Zg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Ot("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};re.Composite=Uc;re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};re.prototype.GetterByBindingType=[re.prototype._getValue_direct,re.prototype._getValue_array,re.prototype._getValue_arrayElement,re.prototype._getValue_toArray];re.prototype.SetterByBindingTypeAndVersioning=[[re.prototype._setValue_direct,re.prototype._setValue_direct_setNeedsUpdate,re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[re.prototype._setValue_array,re.prototype._setValue_array_setNeedsUpdate,re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[re.prototype._setValue_arrayElement,re.prototype._setValue_arrayElement_setNeedsUpdate,re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[re.prototype._setValue_fromArray,re.prototype._setValue_fromArray_setNeedsUpdate,re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var YS=new Float32Array(1);var Sh=class Sh{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Sh.prototype.isMatrix2=!0;var Oc=Sh;function gh(i,t,e,n){let s=Jg(n);switch(e){case nh:return i*t;case sh:return i*t/s.components*s.byteLength;case Ua:return i*t/s.components*s.byteLength;case Ni:return i*t*2/s.components*s.byteLength;case Oa:return i*t*2/s.components*s.byteLength;case ih:return i*t*3/s.components*s.byteLength;case bn:return i*t*4/s.components*s.byteLength;case Ba:return i*t*4/s.components*s.byteLength;case to:case eo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case no:case io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case za:case Ga:return Math.max(i,16)*Math.max(t,8)/4;case ka:case Va:return Math.max(i,8)*Math.max(t,8)/2;case Ha:case Wa:case qa:case $a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Xa:case so:case Ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Za:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ja:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ja:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Qa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case tl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case el:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case nl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case il:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case sl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case rl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ol:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case al:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ll:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case cl:case hl:case ul:return Math.ceil(i/4)*Math.ceil(t/4)*16;case fl:case dl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ro:case pl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jg(i){switch(i){case on:case Kc:return{byteLength:1,components:1};case Zs:case Qc:case Fn:return{byteLength:2,components:1};case Fa:case Na:return{byteLength:2,components:4};case Dn:case Da:case Mn:return{byteLength:4,components:1};case th:case eh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Bd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Kg(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],y=u[d];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let y=u[d];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Qg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,t0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,e0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,n0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,i0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,s0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,r0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,o0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,a0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,l0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,c0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,h0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,f0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,d0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,p0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,m0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,g0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,v0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,S0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,M0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,b0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,w0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,E0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,T0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,A0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,R0="gl_FragColor = linearToOutputTexel( gl_FragColor );",C0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,I0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,P0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,L0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,D0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,F0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,N0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,U0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,O0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,B0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,k0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,z0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,V0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,G0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,H0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,W0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,X0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,q0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Y0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Z0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,J0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,j0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Q0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tx=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ix=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ox=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ax=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ux=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fx=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,px=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Sx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ex=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ax=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Rx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Nx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ux=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ox=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$x=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Kx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ty=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ey=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ry=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,oy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ay=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,py=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,my=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_y=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,My=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,by=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ey=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ty=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ay=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ry=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Py=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:Qg,alphahash_pars_fragment:t0,alphamap_fragment:e0,alphamap_pars_fragment:n0,alphatest_fragment:i0,alphatest_pars_fragment:s0,aomap_fragment:r0,aomap_pars_fragment:o0,batching_pars_vertex:a0,batching_vertex:l0,begin_vertex:c0,beginnormal_vertex:h0,bsdfs:u0,iridescence_fragment:f0,bumpmap_pars_fragment:d0,clipping_planes_fragment:p0,clipping_planes_pars_fragment:m0,clipping_planes_pars_vertex:g0,clipping_planes_vertex:x0,color_fragment:y0,color_pars_fragment:_0,color_pars_vertex:v0,color_vertex:S0,common:M0,defaultnormal_vertex:b0,displacementmap_pars_vertex:w0,displacementmap_vertex:E0,emissivemap_fragment:T0,emissivemap_pars_fragment:A0,colorspace_fragment:R0,colorspace_pars_fragment:C0,envmap_fragment:I0,envmap_common_pars_fragment:P0,envmap_pars_fragment:L0,envmap_pars_vertex:D0,envmap_physical_pars_fragment:W0,envmap_vertex:F0,fog_vertex:N0,fog_pars_vertex:U0,fog_fragment:O0,fog_pars_fragment:B0,gradientmap_pars_fragment:k0,lightmap_pars_fragment:z0,lights_lambert_fragment:V0,lights_lambert_pars_fragment:G0,lights_pars_begin:H0,lights_toon_fragment:X0,lights_toon_pars_fragment:q0,lights_phong_fragment:$0,lights_phong_pars_fragment:Y0,lights_physical_fragment:Z0,lights_physical_pars_fragment:J0,lights_fragment_begin:j0,lights_fragment_maps:K0,lights_fragment_end:Q0,lightprobes_pars_fragment:tx,logdepthbuf_fragment:ex,logdepthbuf_pars_fragment:nx,logdepthbuf_pars_vertex:ix,logdepthbuf_vertex:sx,map_fragment:rx,map_pars_fragment:ox,map_particle_fragment:ax,map_particle_pars_fragment:lx,metalnessmap_fragment:cx,metalnessmap_pars_fragment:hx,morphinstance_vertex:ux,morphcolor_vertex:fx,morphnormal_vertex:dx,morphtarget_pars_vertex:px,morphtarget_vertex:mx,normal_fragment_begin:gx,normal_fragment_maps:xx,normal_pars_fragment:yx,normal_pars_vertex:_x,normal_vertex:vx,normalmap_pars_fragment:Sx,clearcoat_normal_fragment_begin:Mx,clearcoat_normal_fragment_maps:bx,clearcoat_pars_fragment:wx,iridescence_pars_fragment:Ex,opaque_fragment:Tx,packing:Ax,premultiplied_alpha_fragment:Rx,project_vertex:Cx,dithering_fragment:Ix,dithering_pars_fragment:Px,roughnessmap_fragment:Lx,roughnessmap_pars_fragment:Dx,shadowmap_pars_fragment:Fx,shadowmap_pars_vertex:Nx,shadowmap_vertex:Ux,shadowmask_pars_fragment:Ox,skinbase_vertex:Bx,skinning_pars_vertex:kx,skinning_vertex:zx,skinnormal_vertex:Vx,specularmap_fragment:Gx,specularmap_pars_fragment:Hx,tonemapping_fragment:Wx,tonemapping_pars_fragment:Xx,transmission_fragment:qx,transmission_pars_fragment:$x,uv_pars_fragment:Yx,uv_pars_vertex:Zx,uv_vertex:Jx,worldpos_vertex:jx,background_vert:Kx,background_frag:Qx,backgroundCube_vert:ty,backgroundCube_frag:ey,cube_vert:ny,cube_frag:iy,depth_vert:sy,depth_frag:ry,distance_vert:oy,distance_frag:ay,equirect_vert:ly,equirect_frag:cy,linedashed_vert:hy,linedashed_frag:uy,meshbasic_vert:fy,meshbasic_frag:dy,meshlambert_vert:py,meshlambert_frag:my,meshmatcap_vert:gy,meshmatcap_frag:xy,meshnormal_vert:yy,meshnormal_frag:_y,meshphong_vert:vy,meshphong_frag:Sy,meshphysical_vert:My,meshphysical_frag:by,meshtoon_vert:wy,meshtoon_frag:Ey,points_vert:Ty,points_frag:Ay,shadow_vert:Ry,shadow_frag:Cy,sprite_vert:Iy,sprite_frag:Py},xt={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},Yn={basic:{uniforms:Je([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Je([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new It(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Je([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Je([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Je([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new It(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Je([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Je([xt.points,xt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Je([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Je([xt.common,xt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Je([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Je([xt.sprite,xt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:Je([xt.common,xt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:Je([xt.lights,xt.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Yn.physical={uniforms:Je([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var ml={r:0,b:0,g:0},Ly=new wt,kd=new Ut;kd.set(-1,0,0,0,1,0,0,0,1);function Dy(i,t,e,n,s,r){let o=new It(0),a=s===!0?0:1,l,c,h=null,u=0,f=null;function d(v){let w=v.isScene===!0?v.background:null;if(w&&w.isTexture){let M=v.backgroundBlurriness>0;w=t.get(w,M)}return w}function p(v){let w=!1,M=d(v);M===null?m(o,a):M&&M.isColor&&(m(M,1),w=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(v,w){let M=d(w);M&&M.isCubeTexture?(c===void 0&&(c=new Re(new Ri(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:cs(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,E,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ly.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(kd),c.material.toneMapped=zt.getTransfer(M.colorSpace)!==oe,(h!==M||u!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Re(new li(2,2),new Wn({name:"BackgroundMaterial",uniforms:cs(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=zt.getTransfer(M.colorSpace)!==oe,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,w){v.getRGB(ml,dh(i)),e.buffers.color.setClear(ml.r,ml.g,ml.b,w,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,w=1){o.set(v),a=w,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:p,addToRenderList:y,dispose:g}}function Fy(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(L,U,z,P,H){let X=!1,G=u(L,P,z,U);r!==G&&(r=G,c(r.object)),X=d(L,P,z,H),X&&p(L,P,z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,M(L,U,z,P),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function u(L,U,z,P){let H=P.wireframe===!0,X=n[U.id];X===void 0&&(X={},n[U.id]=X);let G=L.isInstancedMesh===!0?L.id:0,nt=X[G];nt===void 0&&(nt={},X[G]=nt);let W=nt[z.id];W===void 0&&(W={},nt[z.id]=W);let tt=W[H];return tt===void 0&&(tt=f(l()),W[H]=tt),tt}function f(L){let U=[],z=[],P=[];for(let H=0;H<e;H++)U[H]=0,z[H]=0,P[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:P,object:L,attributes:{},index:null}}function d(L,U,z,P){let H=r.attributes,X=U.attributes,G=0,nt=z.getAttributes();for(let W in nt)if(nt[W].location>=0){let et=H[W],vt=X[W];if(vt===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(vt=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(vt=L.instanceColor)),et===void 0||et.attribute!==vt||vt&&et.data!==vt.data)return!0;G++}return r.attributesNum!==G||r.index!==P}function p(L,U,z,P){let H={},X=U.attributes,G=0,nt=z.getAttributes();for(let W in nt)if(nt[W].location>=0){let et=X[W];et===void 0&&(W==="instanceMatrix"&&L.instanceMatrix&&(et=L.instanceMatrix),W==="instanceColor"&&L.instanceColor&&(et=L.instanceColor));let vt={};vt.attribute=et,et&&et.data&&(vt.data=et.data),H[W]=vt,G++}r.attributes=H,r.attributesNum=G,r.index=P}function y(){let L=r.newAttributes;for(let U=0,z=L.length;U<z;U++)L[U]=0}function m(L){g(L,0)}function g(L,U){let z=r.newAttributes,P=r.enabledAttributes,H=r.attributeDivisors;z[L]=1,P[L]===0&&(i.enableVertexAttribArray(L),P[L]=1),H[L]!==U&&(i.vertexAttribDivisor(L,U),H[L]=U)}function v(){let L=r.newAttributes,U=r.enabledAttributes;for(let z=0,P=U.length;z<P;z++)U[z]!==L[z]&&(i.disableVertexAttribArray(z),U[z]=0)}function w(L,U,z,P,H,X,G){G===!0?i.vertexAttribIPointer(L,U,z,H,X):i.vertexAttribPointer(L,U,z,P,H,X)}function M(L,U,z,P){y();let H=P.attributes,X=z.getAttributes(),G=U.defaultAttributeValues;for(let nt in X){let W=X[nt];if(W.location>=0){let tt=H[nt];if(tt===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor)),tt!==void 0){let et=tt.normalized,vt=tt.itemSize,Dt=t.get(tt);if(Dt===void 0)continue;let Z=Dt.buffer,dt=Dt.type,_t=Dt.bytesPerElement,Ct=dt===i.INT||dt===i.UNSIGNED_INT||tt.gpuType===Da;if(tt.isInterleavedBufferAttribute){let mt=tt.data,Bt=mt.isInterleavedBuffer===!0?mt.stride:mt.itemSize,ve=tt.offset;if(mt.isInstancedInterleavedBuffer||mt.isInstancedBufferAttribute){for(let Lt=0;Lt<W.locationSize;Lt++)g(W.location+Lt,mt.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Lt=0;Lt<W.locationSize;Lt++)m(W.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let Lt=0;Lt<W.locationSize;Lt++)w(W.location+Lt,vt/W.locationSize,dt,et,Bt*_t,(ve+vt/W.locationSize*Lt)*_t,Ct)}else{if(tt.isInstancedBufferAttribute){for(let mt=0;mt<W.locationSize;mt++)g(W.location+mt,tt.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let mt=0;mt<W.locationSize;mt++)m(W.location+mt);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let mt=0;mt<W.locationSize;mt++)w(W.location+mt,vt/W.locationSize,dt,et,vt*_t,vt/W.locationSize*mt*_t,Ct)}}else if(G!==void 0){let et=G[nt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(W.location,et);break;case 3:i.vertexAttrib3fv(W.location,et);break;case 4:i.vertexAttrib4fv(W.location,et);break;default:i.vertexAttrib1fv(W.location,et)}}}}v()}function A(){I();for(let L in n){let U=n[L];for(let z in U){let P=U[z];for(let H in P){let X=P[H];for(let G in X)h(X[G].object),delete X[G];delete P[H]}}delete n[L]}}function E(L){if(n[L.id]===void 0)return;let U=n[L.id];for(let z in U){let P=U[z];for(let H in P){let X=P[H];for(let G in X)h(X[G].object),delete X[G];delete P[H]}}delete n[L.id]}function x(L){for(let U in n){let z=n[U];for(let P in z){let H=z[P];if(H[L.id]===void 0)continue;let X=H[L.id];for(let G in X)h(X[G].object),delete X[G];delete H[L.id]}}}function b(L){for(let U in n){let z=n[U],P=L.isInstancedMesh===!0?L.id:0,H=z[P];if(H!==void 0){for(let X in H){let G=H[X];for(let nt in G)h(G[nt].object),delete G[nt];delete H[X]}delete z[P],Object.keys(z).length===0&&delete n[U]}}}function I(){R(),o=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfObject:b,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function Ny(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Uy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(x){return!(x!==bn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let b=x===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==on&&x!==Mn&&!b&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Rt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:M,maxSamples:A,samples:E}}function Oy(i){let t=this,e=null,n=0,s=!1,r=!1,o=new In,a=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{let v=r?0:n,w=v*4,M=g.clippingState||null;l.value=M,M=h(p,f,w,d);for(let A=0;A!==w;++A)M[A]=e[A];g.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,p){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=l.value,p!==!0||m===null){let g=d+y*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let w=0,M=d;w!==y;++w,M+=4)o.copy(u[w]).applyMatrix4(v,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}var lo=class extends dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Pr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ri(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:rs});r.uniforms.tEquirect.value=e;let o=new Re(s,r),a=e.minFilter;return e.minFilter===ui&&(e.minFilter=Qe),new Ws(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},xd=256,By=3,ky=20,zd=256,Vd=16,zy=3,Vy=new F,Gy=new It,xl=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ws(1,10,null),this._boxMesh=new Re(new Ri(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Vy}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,p=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(Gy));let m=new Ws(n,s,h);return m.position.copy(a),m.update(l,t),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=p,t.background=y,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(xd,uh(t))}_fromTexture(t,e){t.mapping===as||t.mapping===$s?this._setSize(t.image.length===0?xd:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=yd(t,!1,!1),n=Math.log2(t)-By;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=yd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===as||t.mapping===$s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vd()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=_d()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Hy(),this._integrationMaterial=Wy());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Vd);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-zy)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let l=a>0?Math.log2(e)+.5*Math.log2(6/(zd*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Xy());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function yd(i,t,e){return new lo(i,{minFilter:ui,generateMipmaps:t,type:Fn,colorSpace:Mr,depthBuffer:e})}function co(i,t,e){return new Wn({name:i,uniforms:t,vertexShader:qt.cube_vert,fragmentShader:e,side:en,blending:rs,depthTest:!1,depthWrite:!1})}function Hy(){return co("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${zd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Wy(){return co("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Vd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Xy(){return co("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${ky}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function _d(){return co("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function vd(){return co("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function qy(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===Ys||d===Pa)if(t.has(f)){let p=t.get(f).texture;return a(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let y=new lo(p.height);return y.fromEquirectangularTexture(i,f),t.set(f,y),f.addEventListener("dispose",c),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,p=d===Ys||d===Pa,y=d===as||d===$s;if(p||y){let m=e.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new xl(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{let v=f.image;return p&&v&&v.height>0||y&&v&&l(v)?(n===null&&(n=new xl(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function a(f,d){return d===Ys?f.mapping=as:d===Pa&&(f.mapping=$s),f}function l(f){let d=0,p=6;for(let y=0;y<p;y++)f[y]!==void 0&&d++;return d===p}function c(f){let d=f.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function $y(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&yr("WebGLRenderer: "+n+" extension not supported."),s}}}function Yy(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(p=>delete s[p]);function a(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete s[p.id],o.unregister(p);let y=r.get(p);y&&(t.remove(y),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,y){return s[y.id]!==void 0||(y.addEventListener("dispose",a),s[y.id]=new WeakRef(y),o.register(y,y.id,y),e.memory.geometries++),y}function h(p){let y=p.attributes;for(let m in y)t.update(y[m],i.ARRAY_BUFFER)}function u(p){let y=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let v=y!==null?y.array.length:m.array.length/3-1,w=m.count>=65535?Ar:Ji,M=new w(Math.ceil(v/3)*6,1),A=M.array;if(y!==null){let x=y.array;g=y.version;for(let b=0,I=0;b<v;b+=3){let R=x[b+0],L=x[b+1],U=x[b+2];A[I++]=R,A[I++]=L,A[I++]=L,A[I++]=U,A[I++]=U,A[I++]=R}}else{g=m.version;for(let x=0,b=0;x<v;x+=3){let I=x+0,R=x+1,L=x+2;A[b++]=I,A[b++]=R,A[b++]=R,A[b++]=L,A[b++]=L,A[b++]=I}}M.version=g;let E=r.get(p);E&&t.remove(E),r.set(p,M)}function f(p){let y=r.get(p);if(y){let m=p.index;m!==null&&y.version<m.version&&u(p)}else u(p);return r.get(p)}function d(){for(let p in s){let y=s[p].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:f,dispose:d}}function Zy(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let y=0;for(let m=0;m<d;m++)y+=f[m];e.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Jy(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Ot("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function jy(i,t,e){let n=new WeakMap,s=new Zt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let I=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",I)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],w=0;d===!0&&(w=1),p===!0&&(w=2),y===!0&&(w=3);let M=a.attributes.position.count*w,A=1;M>t.maxTextureSize&&(A=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let E=new Float32Array(M*A*4*u),x=new wr(E,M,A,u);x.type=Mn,x.needsUpdate=!0;let b=w*4;for(let R=0;R<u;R++){let L=m[R],U=g[R],z=v[R],P=M*A*4*R;for(let H=0;H<L.count;H++){let X=H*b;d===!0&&(s.fromBufferAttribute(L,H),E[P+X+0]=s.x,E[P+X+1]=s.y,E[P+X+2]=s.z,E[P+X+3]=0),p===!0&&(s.fromBufferAttribute(U,H),E[P+X+4]=s.x,E[P+X+5]=s.y,E[P+X+6]=s.z,E[P+X+7]=0),y===!0&&(s.fromBufferAttribute(z,H),E[P+X+8]=s.x,E[P+X+9]=s.y,E[P+X+10]=s.z,E[P+X+11]=z.itemSize===4?s.w:1)}}f={count:u,texture:x,size:new Wt(M,A)},n.set(a,f),a.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ky(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var Qy={[Wc]:"LINEAR_TONE_MAPPING",[Xc]:"REINHARD_TONE_MAPPING",[qc]:"CINEON_TONE_MAPPING",[$c]:"ACES_FILMIC_TONE_MAPPING",[Zc]:"AGX_TONE_MAPPING",[Jc]:"NEUTRAL_TONE_MAPPING",[Yc]:"CUSTOM_TONE_MAPPING"};function t_(i,t,e,n,s,r){let o=new dn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new ze;h.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ce([0,2,0,0,2,0],2));let u=new va({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Re(h,u),d=new Yr(-1,1,1,-1,0,1),p=null,y=null,m=!1,g,v=null,w=[],M=!1;this.setSize=function(A,E){o.setSize(A,E),a!==null&&a.setSize(A,E),l!==null&&l.setSize(A,E);for(let x=0;x<w.length;x++){let b=w[x];b.setSize&&b.setSize(A,E)}},this.setEffects=function(A){w=A,M=w.length>0&&w[0].isRenderPass===!0;let E=o.width,x=o.height;w.length>0&&a===null&&(a=new dn(E,x,{type:Fn,depthBuffer:!1,stencilBuffer:!1}),l=new dn(E,x,{type:Fn,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&w.some(I=>I.needsDepthTexture===!0);b!==(o.depthTexture!==null)&&(b===!0&&c===null&&(c=new ai(E,x),r===!0&&(c.format=fi,c.type=ls)),o.dispose(),o.depthTexture=b?c:null,o.resolveDepthBuffer=b,o.storeMultisampledDepthBuffer=b);for(let I=0;I<w.length;I++){let R=w[I];R.setSize&&R.setSize(E,x),b&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(A,E){if(m||A.toneMapping===qn&&w.length===0)return!1;if(v=E,E!==null){let x=E.width,b=E.height;(o.width!==x||o.height!==b)&&this.setSize(x,b)}return M===!1&&A.setRenderTarget(o),g=A.toneMapping,A.toneMapping=qn,!0},this.hasRenderPass=function(){return M},this.end=function(A,E){A.toneMapping=g,m=!0;let x=o,b=a;for(let I=0;I<w.length;I++){let R=w[I];R.enabled!==!1&&(R.render(A,b,x,E),R.needsSwap!==!1&&(x=b,b=b===a?l:a))}if(p!==A.outputColorSpace||y!==A.toneMapping){p=A.outputColorSpace,y=A.toneMapping,u.defines={},zt.getTransfer(p)===oe&&(u.defines.SRGB_TRANSFER="");let I=Qy[y];I&&(u.defines[I]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,A.setRenderTarget(v),A.render(f,d),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var Gd=new ke,Hd=new ai(1,1),Wd=new Lr(1),Xd=new wr,qd=new ma,$d=new Pr,Sd=[],Md=[],bd=new Float32Array(16),wd=new Float32Array(9),Ed=new Float32Array(4);function Ks(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Sd[s];if(r===void 0&&(r=new Float32Array(s),Sd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ie(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function _l(i,t){let e=Md[t];e===void 0&&(e=new Int32Array(t),Md[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function e_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function n_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Ie(e,t)}}function i_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Ie(e,t)}}function s_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Ie(e,t)}}function r_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;Ed.set(n),i.uniformMatrix2fv(this.addr,!1,Ed),Ie(e,n)}}function o_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;wd.set(n),i.uniformMatrix3fv(this.addr,!1,wd),Ie(e,n)}}function a_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Ce(e,n))return;bd.set(n),i.uniformMatrix4fv(this.addr,!1,bd),Ie(e,n)}}function l_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function c_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Ie(e,t)}}function h_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Ie(e,t)}}function u_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Ie(e,t)}}function f_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function d_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Ie(e,t)}}function p_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Ie(e,t)}}function m_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Ie(e,t)}}function vl(i){return i.version===0&&(i.compareFunction=ah,i.needsUpdate=!0),i}function g_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=vl(Hd):r=Gd,e.setTexture2D(t||r,s)}function x_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||qd,s)}function y_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=vl(Wd):r=$d,e.setTextureCube(t||r,s)}function __(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Xd,s)}function v_(i){switch(i){case 5126:return e_;case 35664:return n_;case 35665:return i_;case 35666:return s_;case 35674:return r_;case 35675:return o_;case 35676:return a_;case 5124:case 35670:return l_;case 35667:case 35671:return c_;case 35668:case 35672:return h_;case 35669:case 35673:return u_;case 5125:return f_;case 36294:return d_;case 36295:return p_;case 36296:return m_;case 35678:case 36198:case 36298:case 36306:case 35682:return g_;case 35679:case 36299:case 36307:return x_;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return __}}function S_(i,t){i.uniform1fv(this.addr,t)}function M_(i,t){let e=Ks(t,this.size,2);i.uniform2fv(this.addr,e)}function b_(i,t){let e=Ks(t,this.size,3);i.uniform3fv(this.addr,e)}function w_(i,t){let e=Ks(t,this.size,4);i.uniform4fv(this.addr,e)}function E_(i,t){let e=Ks(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function T_(i,t){let e=Ks(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function A_(i,t){let e=Ks(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function R_(i,t){i.uniform1iv(this.addr,t)}function C_(i,t){i.uniform2iv(this.addr,t)}function I_(i,t){i.uniform3iv(this.addr,t)}function P_(i,t){i.uniform4iv(this.addr,t)}function L_(i,t){i.uniform1uiv(this.addr,t)}function D_(i,t){i.uniform2uiv(this.addr,t)}function F_(i,t){i.uniform3uiv(this.addr,t)}function N_(i,t){i.uniform4uiv(this.addr,t)}function U_(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=vl(Hd):o=Gd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function O_(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||qd,r[o])}function B_(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=vl(Wd):o=$d;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function k_(i,t,e){let n=this.cache,s=t.length,r=_l(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Xd,r[o])}function z_(i){switch(i){case 5126:return S_;case 35664:return M_;case 35665:return b_;case 35666:return w_;case 35674:return E_;case 35675:return T_;case 35676:return A_;case 5124:case 35670:return R_;case 35667:case 35671:return C_;case 35668:case 35672:return I_;case 35669:case 35673:return P_;case 5125:return L_;case 36294:return D_;case 36295:return F_;case 36296:return N_;case 35678:case 36198:case 36298:case 36306:case 35682:return U_;case 35679:case 36299:case 36307:return O_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return k_}}var wh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=v_(e.type)}},Eh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=z_(e.type)}},Th=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Mh=/(\w+)(\])?(\[|\.)?/g;function Td(i,t){i.seq.push(t),i.map[t.id]=t}function V_(i,t,e){let n=i.name,s=n.length;for(Mh.lastIndex=0;;){let r=Mh.exec(n),o=Mh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Td(e,c===void 0?new wh(a,i,t):new Eh(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Th(a),Td(e,u)),e=u}}}var js=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);V_(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Ad(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var G_=37297,H_=0;function W_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Rd=new Ut;function X_(i){zt._getMatrix(Rd,zt.workingColorSpace,i);let t=`mat3( ${Rd.elements.map(e=>e.toFixed(4))} )`;switch(zt.getTransfer(i)){case br:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Rt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Cd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+W_(i.getShaderSource(t),a)}else return r}function q_(i,t){let e=X_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var $_={[Wc]:"Linear",[Xc]:"Reinhard",[qc]:"Cineon",[$c]:"ACESFilmic",[Zc]:"AgX",[Jc]:"Neutral",[Yc]:"Custom"};function Y_(i,t){let e=$_[t];return e===void 0?(Rt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var gl=new F;function Z_(){zt.getLuminanceCoefficients(gl);let i=gl.x.toFixed(4),t=gl.y.toFixed(4),e=gl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ao).join(`
`)}function j_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function K_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ao(i){return i!==""}function Id(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Pd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ah(i){return i.replace(Q_,tv)}function tv(i,t){let e=qt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Ah(e)}var ev=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ld(i){return i.replace(ev,nv)}function nv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var iv={[jr]:"SHADOWMAP_TYPE_PCF",[Xs]:"SHADOWMAP_TYPE_VSM"};function sv(i){return iv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var rv={[$s]:"ENVMAP_MODE_REFRACTION"};function ov(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":rv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var av={[Kr]:"ENVMAP_BLENDING_MULTIPLY",[Hf]:"ENVMAP_BLENDING_MIX",[Wf]:"ENVMAP_BLENDING_ADD"};function lv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":av[i.combine]||"ENVMAP_BLENDING_NONE"}function cv(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=sv(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=ov(e),u=lv(e),f=J_(e),d=j_(r),p=s.createProgram(),y,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(ao).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(ao).join(`
`),m.length>0&&(m+=`
`)):(y=[Dd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ao).join(`
`),m=[Dd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qn?"#define TONE_MAPPING":"",e.toneMapping!==qn?qt.tonemapping_pars_fragment:"",e.toneMapping!==qn?Y_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,q_("linearToOutputTexel",e.outputColorSpace),Z_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ao).join(`
`)),o=Ah(o),o=Id(o,e),o=Pd(o,e),a=Ah(a),a=Id(a,e),a=Pd(a,e),o=Ld(o),a=Ld(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",e.glslVersion===lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=g+y+o,w=g+m+a,M=Ad(s,s.VERTEX_SHADER,v),A=Ad(s,s.FRAGMENT_SHADER,w);s.attachShader(p,M),s.attachShader(p,A),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function E(R){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(p)||"",U=s.getShaderInfoLog(M)||"",z=s.getShaderInfoLog(A)||"",P=L.trim(),H=U.trim(),X=z.trim(),G=!0,nt=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,M,A);else{let W=Cd(s,M,"vertex"),tt=Cd(s,A,"fragment");Ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+P+`
`+W+`
`+tt)}else P!==""?Rt("WebGLProgram: Program Info Log:",P):(H===""||X==="")&&(nt=!1);nt&&(R.diagnostics={runnable:G,programLog:P,vertexShader:{log:H,prefix:y},fragmentShader:{log:X,prefix:m}})}s.deleteShader(M),s.deleteShader(A),x=new js(s,p),b=K_(s,p)}let x;this.getUniforms=function(){return x===void 0&&E(this),x};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(p,G_)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=H_++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=A,this}var hv=0,Rh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ch(t),e.set(t,n)),n}},Ch=class{constructor(t){this.id=hv++,this.code=t,this.usedTimes=0}};function uv(i){return i===Ni||i===so||i===ro}function fv(i,t,e,n,s,r){let o=new Er,a=new Rh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,b,I,R,L,U){let z=R.fog,P=L.geometry,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=t.get(x.envMap||H,X),nt=f[x.type],W=n.precision;x.precision!==null&&(W=n.getMaxPrecision(x.precision),W!==x.precision&&Rt("WebGLProgram.getParameters:",x.precision,"not supported, using",W,"instead."));let tt=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,et=tt!==void 0?tt.length:0,vt=0;P.morphAttributes.position!==void 0&&(vt=1),P.morphAttributes.normal!==void 0&&(vt=2),P.morphAttributes.color!==void 0&&(vt=3);let Dt,Z,dt,_t;if(nt){let gt=Yn[nt];Dt=gt.vertexShader,Z=gt.fragmentShader}else{Dt=x.vertexShader,Z=x.fragmentShader;let gt=a.getVertexShaderStage(x),le=a.getFragmentShaderStage(x);a.update(x,gt,le),dt=gt.id,_t=le.id}let Ct=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Bt=L.isInstancedMesh===!0,ve=L.isBatchedMesh===!0,Lt=!!x.map,te=!!x.matcap,se=!!G,Jt=se&&G.isPMREMTexture===!0,Ge=!!x.aoMap,we=!!x.lightMap,nn=!!x.bumpMap&&x.wireframe===!1,me=!!x.normalMap,Bn=!!x.displacementMap,De=!!x.emissiveMap,pn=!!x.metalnessMap,mn=!!x.roughnessMap,gn=x.anisotropy>0,N=x.clearcoat>0,xn=x.diffuseRoughness>0,de=x.dispersion>0,pe=x.retroreflectivity>0,pt=x.iridescence>0,Ee=x.sheen>0,Ft=x.transmission>0,kt=gn&&!!x.anisotropyMap,T=N&&!!x.clearcoatMap,_=N&&!!x.clearcoatNormalMap,B=N&&!!x.clearcoatRoughnessMap,it=xn&&!!x.diffuseRoughnessMap,K=pt&&!!x.iridescenceMap,ot=pt&&!!x.iridescenceThicknessMap,ut=Ee&&!!x.sheenColorMap,$=Ee&&!!x.sheenRoughnessMap,J=!!x.specularMap,lt=!!x.specularColorMap,C=!!x.specularIntensityMap,j=Ft&&!!x.transmissionMap,q=Ft&&!!x.thicknessMap,ct=!!x.gradientMap,rt=!!x.alphaMap,at=x.alphaTest>0,At=!!x.alphaHash,Xt=!!x.extensions,st=qn;x.toneMapped&&(Ct===null||Ct.isXRRenderTarget===!0)&&(st=i.toneMapping);let Pt=Jt?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,Ht={shaderID:nt,shaderType:x.type,shaderName:x.name,vertexShader:Dt,fragmentShader:Z,defines:x.defines,customVertexShaderID:dt,customFragmentShaderID:_t,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:W,batching:ve,batchingColor:ve&&L._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&L.instanceColor!==null,instancingMorph:Bt&&L.morphTexture!==null,outputColorSpace:Ct===null?i.outputColorSpace:Ct.isXRRenderTarget===!0?Ct.texture.colorSpace:zt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Lt,matcap:te,envMap:se,envMapMode:se&&G.mapping,envMapPMREM:Jt,envMapMaxLod:Jt?Pt.length-1:null,envMapSize:Jt?Pt[0].width:null,aoMap:Ge,lightMap:we,bumpMap:nn,normalMap:me,displacementMap:Bn,emissiveMap:De,normalMapObjectSpace:me&&x.normalMapType===Zf,normalMapTangentSpace:me&&x.normalMapType===Js,packedNormalMap:me&&x.normalMapType===Js&&uv(x.normalMap.format),metalnessMap:pn,roughnessMap:mn,anisotropy:gn,anisotropyMap:kt,clearcoat:N,clearcoatMap:T,clearcoatNormalMap:_,clearcoatRoughnessMap:B,diffuseRoughness:xn,diffuseRoughnessMap:it,dispersion:de,retroreflection:pe,iridescence:pt,iridescenceMap:K,iridescenceThicknessMap:ot,sheen:Ee,sheenColorMap:ut,sheenRoughnessMap:$,specularMap:J,specularColorMap:lt,specularIntensityMap:C,transmission:Ft,transmissionMap:j,thicknessMap:q,gradientMap:ct,opaque:x.transparent===!1&&x.blending===qs&&x.alphaToCoverage===!1,alphaMap:rt,alphaTest:at,alphaHash:At,combine:x.combine,mapUv:Lt&&d(x.map.channel),aoMapUv:Ge&&d(x.aoMap.channel),lightMapUv:we&&d(x.lightMap.channel),bumpMapUv:nn&&d(x.bumpMap.channel),normalMapUv:me&&d(x.normalMap.channel),displacementMapUv:Bn&&d(x.displacementMap.channel),emissiveMapUv:De&&d(x.emissiveMap.channel),metalnessMapUv:pn&&d(x.metalnessMap.channel),roughnessMapUv:mn&&d(x.roughnessMap.channel),anisotropyMapUv:kt&&d(x.anisotropyMap.channel),clearcoatMapUv:T&&d(x.clearcoatMap.channel),clearcoatNormalMapUv:_&&d(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&d(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:it&&d(x.diffuseRoughnessMap.channel),iridescenceMapUv:K&&d(x.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&d(x.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&d(x.sheenColorMap.channel),sheenRoughnessMapUv:$&&d(x.sheenRoughnessMap.channel),specularMapUv:J&&d(x.specularMap.channel),specularColorMapUv:lt&&d(x.specularColorMap.channel),specularIntensityMapUv:C&&d(x.specularIntensityMap.channel),transmissionMapUv:j&&d(x.transmissionMap.channel),thicknessMapUv:q&&d(x.thicknessMap.channel),alphaMapUv:rt&&d(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(me||gn),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!P.attributes.uv&&(Lt||rt),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&me===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:mt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:vt,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:U.filter(gt=>gt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:Lt&&x.map.isVideoTexture===!0&&zt.getTransfer(x.map.colorSpace)===oe,decodeVideoTextureEmissive:De&&x.emissiveMap.isVideoTexture===!0&&zt.getTransfer(x.emissiveMap.colorSpace)===oe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Sn,flipSided:x.side===en,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Xt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&x.extensions.multiDraw===!0||ve)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ht.vertexUv1s=l.has(1),Ht.vertexUv2s=l.has(2),Ht.vertexUv3s=l.has(3),l.clear(),Ht}function y(x){let b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)b.push(I),b.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(m(b,x),g(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function m(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapPMREM),x.push(b.envMapMaxLod),x.push(b.envMapSize),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.diffuseRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.numSunLights),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numSunLightShadows),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.numLightProbeGrids),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function g(x,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.diffuseRoughness&&o.enable(25),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function v(x){let b=f[x.type],I;if(b){let R=Yn[b];I=pd.clone(R.uniforms)}else I=x.uniforms;return I}function w(x,b){let I=h.get(b);return I!==void 0?++I.usedTimes:(I=new cv(i,b,x,s),c.push(I),h.set(b,I)),I}function M(x){if(--x.usedTimes===0){let b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function A(x){a.remove(x)}function E(){a.dispose()}return{getParameters:p,getProgramCacheKey:y,getUniforms:v,acquireProgram:w,releaseProgram:M,releaseShaderCache:A,programs:c,dispose:E}}function dv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function pv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Fd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Nd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,p,y,m,g){let v=i[t];return v===void 0?(v={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:m,group:g},i[t]=v):(v.id=f.id,v.object=f,v.geometry=d,v.material=p,v.materialVariant=o(f),v.groupOrder=y,v.renderOrder=f.renderOrder,v.z=m,v.group=g),t++,v}function l(f,d,p,y,m,g,v){v.reversedDepth===!0&&(m=-m);let w=a(f,d,p,y,m,g);p.transmission>0?n.push(w):p.transparent===!0?s.push(w):e.push(w)}function c(f,d,p,y,m,g){let v=a(f,d,p,y,m,g);p.transmission>0?n.unshift(v):p.transparent===!0?s.unshift(v):e.unshift(v)}function h(f,d){e.length>1&&e.sort(f||pv),n.length>1&&n.sort(d||Fd),s.length>1&&s.sort(d||Fd)}function u(){for(let f=t,d=i.length;f<d;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function mv(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Nd,i.set(n,[o])):s>=r.length?(o=new Nd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function gv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new F,color:new It};break;case"SpotLight":e={position:new F,direction:new F,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function xv(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var yv=0;function _v(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function vv(i){let t=new gv,e=xv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);let s=new F,r=new wt,o=new wt;function a(c){let h=0,u=0,f=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let d=0,p=0,y=0,m=0,g=0,v=0,w=0,M=0,A=0,E=0,x=0,b=0,I=0,R=0;c.sort(_v);for(let U=0,z=c.length;U<z;U++){let P=c[U],H=P.color,X=P.intensity,G=P.distance,nt=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ni?nt=P.shadow.map.texture:nt=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=H.r*X,u+=H.g*X,f+=H.b*X;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],X);R++}else if(P.isSunLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let tt=P.shadow,et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[p]=et,n.sunShadowMap[p]=nt;let vt=tt.getViewportCount();for(let Dt=0;Dt<vt;Dt++)n.sunShadowMatrix[y+Dt]=tt.getMatrix(Dt),n.sunShadowCascade[y+Dt]=tt._cascadeData[Dt];y+=vt,p++}n.sun[d]=W,d++}else if(P.isDirectionalLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let tt=P.shadow,et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,n.directionalShadow[m]=et,n.directionalShadowMap[m]=nt,n.directionalShadowMatrix[m]=P.shadow.matrix,A++}n.directional[m]=W,m++}else if(P.isSpotLight){let W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(H).multiplyScalar(X),W.distance=G,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;let tt=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,tt.updateMatrices(P),P.castShadow&&I++),n.spotLightMatrix[v]=tt.matrix,P.castShadow){let et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,n.spotShadow[v]=et,n.spotShadowMap[v]=nt,x++}v++}else if(P.isRectAreaLight){let W=t.get(P);W.color.copy(H).multiplyScalar(X),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[w]=W,w++}else if(P.isPointLight){let W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let tt=P.shadow,et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,et.shadowCameraNear=tt.camera.near,et.shadowCameraFar=tt.camera.far,n.pointShadow[g]=et,n.pointShadowMap[g]=nt,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=W,g++}else if(P.isHemisphereLight){let W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(X),W.groundColor.copy(P.groundColor).multiplyScalar(X),n.hemi[M]=W,M++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let L=n.hash;(L.sunLength!==d||L.directionalLength!==m||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==w||L.hemiLength!==M||L.numSunShadows!==p||L.numDirectionalShadows!==A||L.numPointShadows!==E||L.numSpotShadows!==x||L.numSpotMaps!==b||L.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=m,n.spot.length=v,n.rectArea.length=w,n.point.length=g,n.hemi.length=M,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+b-I,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=R,L.sunLength=d,L.directionalLength=m,L.pointLength=g,L.spotLength=v,L.rectAreaLength=w,L.hemiLength=M,L.numSunShadows=p,L.numDirectionalShadows=A,L.numPointShadows=E,L.numSpotShadows=x,L.numSpotMaps=b,L.numLightProbes=R,n.version=yv++)}function l(c,h){let u=0,f=0,d=0,p=0,y=0,m=0,g=h.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){let M=c[v];if(M.isSunLight){let A=n.sun[u];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),u++}else if(M.isDirectionalLight){let A=n.directional[f];A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),f++}else if(M.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),p++}else if(M.isRectAreaLight){let A=n.rectArea[y];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),o.identity(),r.copy(M.matrixWorld),r.premultiply(g),o.extractRotation(r),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),y++}else if(M.isPointLight){let A=n.point[d];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){let A=n.hemi[m];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function Ud(i){let t=new vv(i),e=[],n=[],s=[];function r(u){h.camera=u,e.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):e.push(u)}function a(u){n.push(u)}function l(){t.setup(e),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Sv(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Ud(i),t.set(s,[a])):r>=o.length?(a=new Ud(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Mv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,wv=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Ev=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Od=new wt,oo=new F,bh=new F;function Tv(i,t,e){let n=new Ti,s=new Wt,r=new Wt,o=new Zt,a=new Sa,l=new Ma,c={},h=e.maxTextureSize,u={[Fi]:en,[en]:Fi,[Sn]:Sn},f=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:Mv,fragmentShader:bv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new ze;p.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Re(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jr;let g=this.type;this.render=function(E,x,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===wf&&(Rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=jr);let I=i.getRenderTarget(),R=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(rs),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let z=g!==this.type;z&&x.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(H=>H.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,H=E.length;P<H;P++){let X=E[P],G=X.shadow;if(G===void 0){Rt("WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let nt=G.getFrameExtents();s.multiply(nt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,G.mapSize.y=r.y));let W=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=W,G.map===null||z===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Xs){if(X.isPointLight){Rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new dn(s.x,s.y,{format:Ni,type:Fn,minFilter:Qe,magFilter:Qe,generateMipmaps:!1}),G.map.texture.name=X.name+".shadowMap",G.map.depthTexture=new ai(s.x,s.y,Mn),G.map.depthTexture.name=X.name+".shadowMapDepth",G.map.depthTexture.format=ri,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Be,G.map.depthTexture.magFilter=Be}else X.isPointLight?(G.map=new lo(s.x),G.map.depthTexture=new Lr(s.x,Dn)):(G.map=new dn(s.x,s.y),G.map.depthTexture=new ai(s.x,s.y,Dn)),G.map.depthTexture.name=X.name+".shadowMap",G.map.depthTexture.format=ri,this.type===jr?(G.map.depthTexture.compareFunction=W?oh:rh,G.map.depthTexture.minFilter=Qe,G.map.depthTexture.magFilter=Qe):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Be,G.map.depthTexture.magFilter=Be);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);let tt=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();X.isPointLight!==!0&&G.updateMatrices(X,b);let et=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:b.layers;for(let vt=0;vt<tt;vt++){let Dt=G.getCamera(vt);if(X.isPointLight){let Z=G.camera,dt=G.matrix,_t=X.distance||Z.far;_t!==Z.far&&(Z.far=_t,Z.updateProjectionMatrix()),oo.setFromMatrixPosition(X.matrixWorld),Z.position.copy(oo),bh.copy(Z.position),bh.add(wv[vt]),Z.up.copy(Ev[vt]),Z.lookAt(bh),Z.updateMatrixWorld(),dt.makeTranslation(-oo.x,-oo.y,-oo.z),Od.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Od,Z.coordinateSystem,Z.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,vt),i.clear();else{vt===0&&(i.setRenderTarget(G.map),i.clear());let Z=G.getViewport(vt);o.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),U.viewport(o)}n=G.getFrustum(vt),M(x,b,Dt,X,et,this.type)}G.isPointLightShadow!==!0&&this.type===Xs&&v(G,b),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(I,R,L)};function v(E,x){let b=t.update(y);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new dn(s.x,s.y,{format:Ni,type:Fn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(x,null,b,f,y,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(x,null,b,d,y,null)}function w(E,x,b,I){let R=null,L=b.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)R=L;else if(R=b.isPointLight===!0?l:a,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let U=R.uuid,z=x.uuid,P=c[U];P===void 0&&(P={},c[U]=P);let H=P[z];H===void 0&&(H=R.clone(),P[z]=H,x.addEventListener("dispose",A)),R=H}if(R.visible=x.visible,R.wireframe=x.wireframe,I===Xs?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:u[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let U=i.properties.get(R);U.light=b}return R}function M(E,x,b,I,R,L){if(E.visible===!1)return;if(E.layers.test(R)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===Xs)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,E.matrixWorld);let P=t.update(E),H=E.material;if(Array.isArray(H)){let X=P.groups;for(let G=0,nt=X.length;G<nt;G++){let W=X[G],tt=H[W.materialIndex];if(tt&&tt.visible){let et=w(E,tt,I,L);E.onBeforeShadow(i,E,x,b,P,et,W),i.renderBufferDirect(b,null,P,et,E,W),E.onAfterShadow(i,E,x,b,P,et,W)}}}else if(H.visible){let X=w(E,H,I,L);E.onBeforeShadow(i,E,x,b,P,X,null),i.renderBufferDirect(b,null,P,X,E,null),E.onAfterShadow(i,E,x,b,P,X,null)}}let z=E.children;for(let P=0,H=z.length;P<H;P++)M(z[P],x,b,I,R,L)}function A(E){E.target.removeEventListener("dispose",A);for(let b in c){let I=c[b],R=E.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function Av(i,t){function e(){let C=!1,j=new Zt,q=null,ct=new Zt(0,0,0,0);return{setMask:function(rt){q!==rt&&!C&&(i.colorMask(rt,rt,rt,rt),q=rt)},setLocked:function(rt){C=rt},setClear:function(rt,at,At,Xt,st){st===!0&&(rt*=Xt,at*=Xt,At*=Xt),j.set(rt,at,At,Xt),ct.equals(j)===!1&&(i.clearColor(rt,at,At,Xt),ct.copy(j))},reset:function(){C=!1,q=null,ct.set(-1,0,0,0)}}}function n(){let C=!1,j=!1,q=null,ct=null,rt=null;return{setReversed:function(at){if(j!==at){let At=t.get("EXT_clip_control");at?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),j=at;let Xt=rt;rt=null,this.setClear(Xt)}},getReversed:function(){return j},setTest:function(at){at?mt(i.DEPTH_TEST):Bt(i.DEPTH_TEST)},setMask:function(at){q!==at&&!C&&(i.depthMask(at),q=at)},setFunc:function(at){if(j&&(at=od[at]),ct!==at){switch(at){case sa:i.depthFunc(i.NEVER);break;case ra:i.depthFunc(i.ALWAYS);break;case oa:i.depthFunc(i.LESS);break;case Ls:i.depthFunc(i.LEQUAL);break;case aa:i.depthFunc(i.EQUAL);break;case la:i.depthFunc(i.GEQUAL);break;case ca:i.depthFunc(i.GREATER);break;case ha:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=at}},setLocked:function(at){C=at},setClear:function(at){rt!==at&&(rt=at,j&&(at=1-at),i.clearDepth(at))},reset:function(){C=!1,q=null,ct=null,rt=null,j=!1}}}function s(){let C=!1,j=null,q=null,ct=null,rt=null,at=null,At=null,Xt=null,st=null;return{setTest:function(Pt){C||(Pt?mt(i.STENCIL_TEST):Bt(i.STENCIL_TEST))},setMask:function(Pt){j!==Pt&&!C&&(i.stencilMask(Pt),j=Pt)},setFunc:function(Pt,Ht,gt){(q!==Pt||ct!==Ht||rt!==gt)&&(i.stencilFunc(Pt,Ht,gt),q=Pt,ct=Ht,rt=gt)},setOp:function(Pt,Ht,gt){(at!==Pt||At!==Ht||Xt!==gt)&&(i.stencilOp(Pt,Ht,gt),at=Pt,At=Ht,Xt=gt)},setLocked:function(Pt){C=Pt},setClear:function(Pt){st!==Pt&&(i.clearStencil(Pt),st=Pt)},reset:function(){C=!1,j=null,q=null,ct=null,rt=null,at=null,At=null,Xt=null,st=null}}}let r=new e,o=new n,a=new s,l={},c=new WeakMap,h={},u={},f={},d=new WeakMap,p=[],y=null,m=!1,g=null,v=null,w=null,M=null,A=null,E=null,x=null,b=new It(0,0,0),I=0,R=!1,L=null,U=null,z=null,P=null,H=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,nt=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=nt>=1):W.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=nt>=2);let tt=null,et={},vt=i.getParameter(i.SCISSOR_BOX),Dt=i.getParameter(i.VIEWPORT),Z=new Zt().fromArray(vt),dt=new Zt().fromArray(Dt);function _t(C,j,q,ct){let rt=new Uint8Array(4),at=i.createTexture();i.bindTexture(C,at),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let At=0;At<q;At++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(j,0,i.RGBA,1,1,ct,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(j+At,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return at}let Ct={};Ct[i.TEXTURE_2D]=_t(i.TEXTURE_2D,i.TEXTURE_2D,1),Ct[i.TEXTURE_CUBE_MAP]=_t(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ct[i.TEXTURE_2D_ARRAY]=_t(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ct[i.TEXTURE_3D]=_t(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),mt(i.DEPTH_TEST),o.setFunc(Ls),nn(!1),me(Bc),mt(i.CULL_FACE),Ge(rs);function mt(C){h[C]!==!0&&(i.enable(C),h[C]=!0)}function Bt(C){h[C]!==!1&&(i.disable(C),h[C]=!1)}function ve(C,j){return f[C]!==j?(i.bindFramebuffer(C,j),f[C]=j,C===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=j),C===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=j),!0):!1}function Lt(C,j){let q=p,ct=!1;if(C){q=d.get(j),q===void 0&&(q=[],d.set(j,q));let rt=C.textures;if(q.length!==rt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let at=0,At=rt.length;at<At;at++)q[at]=i.COLOR_ATTACHMENT0+at;q.length=rt.length,ct=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,ct=!0);ct&&i.drawBuffers(q)}function te(C){return y!==C?(i.useProgram(C),y=C,!0):!1}let se={[os]:i.FUNC_ADD,[Tf]:i.FUNC_SUBTRACT,[Af]:i.FUNC_REVERSE_SUBTRACT};se[Rf]=i.MIN,se[Cf]=i.MAX;let Jt={[If]:i.ZERO,[Pf]:i.ONE,[Lf]:i.SRC_COLOR,[Gc]:i.SRC_ALPHA,[Bf]:i.SRC_ALPHA_SATURATE,[Uf]:i.DST_COLOR,[Ff]:i.DST_ALPHA,[Df]:i.ONE_MINUS_SRC_COLOR,[Hc]:i.ONE_MINUS_SRC_ALPHA,[Of]:i.ONE_MINUS_DST_COLOR,[Nf]:i.ONE_MINUS_DST_ALPHA,[kf]:i.CONSTANT_COLOR,[zf]:i.ONE_MINUS_CONSTANT_COLOR,[Vf]:i.CONSTANT_ALPHA,[Gf]:i.ONE_MINUS_CONSTANT_ALPHA};function Ge(C,j,q,ct,rt,at,At,Xt,st,Pt){if(C===rs){m===!0&&(Bt(i.BLEND),m=!1);return}if(m===!1&&(mt(i.BLEND),m=!0),C!==Ef){if(C!==g||Pt!==R){if((v!==os||A!==os)&&(i.blendEquation(i.FUNC_ADD),v=os,A=os),Pt)switch(C){case qs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kc:i.blendFunc(i.ONE,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ot("WebGLState: Invalid blending: ",C);break}else switch(C){case qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zc:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vc:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",C);break}w=null,M=null,E=null,x=null,b.set(0,0,0),I=0,g=C,R=Pt}return}rt=rt||j,at=at||q,At=At||ct,(j!==v||rt!==A)&&(i.blendEquationSeparate(se[j],se[rt]),v=j,A=rt),(q!==w||ct!==M||at!==E||At!==x)&&(i.blendFuncSeparate(Jt[q],Jt[ct],Jt[at],Jt[At]),w=q,M=ct,E=at,x=At),(Xt.equals(b)===!1||st!==I)&&(i.blendColor(Xt.r,Xt.g,Xt.b,st),b.copy(Xt),I=st),g=C,R=!1}function we(C,j){C.side===Sn?Bt(i.CULL_FACE):mt(i.CULL_FACE);let q=C.side===en;j&&(q=!q),nn(q),C.blending===qs&&C.transparent===!1?Ge(rs):Ge(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),o.setFunc(C.depthFunc),o.setTest(C.depthTest),o.setMask(C.depthWrite),r.setMask(C.colorWrite);let ct=C.stencilWrite;a.setTest(ct),ct&&(a.setMask(C.stencilWriteMask),a.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),a.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),De(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?mt(i.SAMPLE_ALPHA_TO_COVERAGE):Bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function nn(C){L!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),L=C)}function me(C){C!==Mf?(mt(i.CULL_FACE),C!==U&&(C===Bc?i.cullFace(i.BACK):C===bf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Bt(i.CULL_FACE),U=C}function Bn(C){C!==z&&(G&&i.lineWidth(C),z=C)}function De(C,j,q){C?(mt(i.POLYGON_OFFSET_FILL),(P!==j||H!==q)&&(P=j,H=q,o.getReversed()&&(j=-j,q=-q),i.polygonOffset(j,q))):Bt(i.POLYGON_OFFSET_FILL)}function pn(C){C?mt(i.SCISSOR_TEST):Bt(i.SCISSOR_TEST)}function mn(C){C===void 0&&(C=i.TEXTURE0+X-1),tt!==C&&(i.activeTexture(C),tt=C)}function gn(C,j,q){q===void 0&&(tt===null?q=i.TEXTURE0+X-1:q=tt);let ct=et[q];ct===void 0&&(ct={type:void 0,texture:void 0},et[q]=ct),(ct.type!==C||ct.texture!==j)&&(tt!==q&&(i.activeTexture(q),tt=q),i.bindTexture(C,j||Ct[C]),ct.type=C,ct.texture=j)}function N(){let C=et[tt];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function xn(){try{i.compressedTexImage2D(...arguments)}catch(C){Ot("WebGLState:",C)}}function de(){try{i.compressedTexImage3D(...arguments)}catch(C){Ot("WebGLState:",C)}}function pe(){try{i.texSubImage2D(...arguments)}catch(C){Ot("WebGLState:",C)}}function pt(){try{i.texSubImage3D(...arguments)}catch(C){Ot("WebGLState:",C)}}function Ee(){try{i.compressedTexSubImage2D(...arguments)}catch(C){Ot("WebGLState:",C)}}function Ft(){try{i.compressedTexSubImage3D(...arguments)}catch(C){Ot("WebGLState:",C)}}function kt(){try{i.texStorage2D(...arguments)}catch(C){Ot("WebGLState:",C)}}function T(){try{i.texStorage3D(...arguments)}catch(C){Ot("WebGLState:",C)}}function _(){try{i.texImage2D(...arguments)}catch(C){Ot("WebGLState:",C)}}function B(){try{i.texImage3D(...arguments)}catch(C){Ot("WebGLState:",C)}}function it(C){return u[C]!==void 0?u[C]:i.getParameter(C)}function K(C,j){u[C]!==j&&(i.pixelStorei(C,j),u[C]=j)}function ot(C){Z.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),Z.copy(C))}function ut(C){dt.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),dt.copy(C))}function $(C,j){let q=c.get(j);q===void 0&&(q=new WeakMap,c.set(j,q));let ct=q.get(C);ct===void 0&&(ct=i.getUniformBlockIndex(j,C.name),i.uniformBlockBinding(j,ct,ct),q.set(C,ct))}function J(C,j,q){let rt=c.get(j).get(C);l[rt]!==q&&(i.bindBufferBase(i.UNIFORM_BUFFER,rt,q),l[rt]=q)}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},tt=null,et={},f={},l={},d=new WeakMap,p=[],y=null,m=!1,g=null,v=null,w=null,M=null,A=null,E=null,x=null,b=new It(0,0,0),I=0,R=!1,L=null,U=null,z=null,P=null,H=null,Z.set(0,0,i.canvas.width,i.canvas.height),dt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:mt,disable:Bt,bindFramebuffer:ve,drawBuffers:Lt,useProgram:te,setBlending:Ge,setMaterial:we,setFlipSided:nn,setCullFace:me,setLineWidth:Bn,setPolygonOffset:De,setScissorTest:pn,activeTexture:mn,bindTexture:gn,unbindTexture:N,compressedTexImage2D:xn,compressedTexImage3D:de,texImage2D:_,texImage3D:B,pixelStorei:K,getParameter:it,updateUBOMapping:$,uniformBlockBinding:J,texStorage2D:kt,texStorage3D:T,texSubImage2D:pe,texSubImage3D:pt,compressedTexSubImage2D:Ee,compressedTexSubImage3D:Ft,scissor:ot,viewport:ut,reset:lt}}function Rv(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap,u=new Set,f,d=new WeakMap,p=new Set,y=new FinalizationRegistry(T=>p.delete(T)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return m?new OffscreenCanvas(T,_):Fs("canvas")}function v(T,_,B){let it=1,K=kt(T);if((K.width>B||K.height>B)&&(it=B/Math.max(K.width,K.height)),it<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ot=Math.floor(it*K.width),ut=Math.floor(it*K.height);f===void 0&&(f=g(ot,ut));let $=_?g(ot,ut):f;return $.width=ot,$.height=ut,$.getContext("2d").drawImage(T,0,0,ot,ut),Rt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ot+"x"+ut+")."),$}else return"data"in T&&Rt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function w(T){return T.generateMipmaps}function M(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,_,B,it,K,ot=!1){if(T!==null){if(i[T]!==void 0)return i[T];Rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ut;it&&(ut=t.get("EXT_texture_norm16"),ut||Rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===i.RED&&(B===i.FLOAT&&($=i.R32F),B===i.HALF_FLOAT&&($=i.R16F),B===i.UNSIGNED_BYTE&&($=i.R8),B===i.UNSIGNED_SHORT&&ut&&($=ut.R16_EXT),B===i.SHORT&&ut&&($=ut.R16_SNORM_EXT)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.R8UI),B===i.UNSIGNED_SHORT&&($=i.R16UI),B===i.UNSIGNED_INT&&($=i.R32UI),B===i.BYTE&&($=i.R8I),B===i.SHORT&&($=i.R16I),B===i.INT&&($=i.R32I)),_===i.RG&&(B===i.FLOAT&&($=i.RG32F),B===i.HALF_FLOAT&&($=i.RG16F),B===i.UNSIGNED_BYTE&&($=i.RG8),B===i.UNSIGNED_SHORT&&ut&&($=ut.RG16_EXT),B===i.SHORT&&ut&&($=ut.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RG8UI),B===i.UNSIGNED_SHORT&&($=i.RG16UI),B===i.UNSIGNED_INT&&($=i.RG32UI),B===i.BYTE&&($=i.RG8I),B===i.SHORT&&($=i.RG16I),B===i.INT&&($=i.RG32I)),_===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGB8UI),B===i.UNSIGNED_SHORT&&($=i.RGB16UI),B===i.UNSIGNED_INT&&($=i.RGB32UI),B===i.BYTE&&($=i.RGB8I),B===i.SHORT&&($=i.RGB16I),B===i.INT&&($=i.RGB32I)),_===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGBA8UI),B===i.UNSIGNED_SHORT&&($=i.RGBA16UI),B===i.UNSIGNED_INT&&($=i.RGBA32UI),B===i.BYTE&&($=i.RGBA8I),B===i.SHORT&&($=i.RGBA16I),B===i.INT&&($=i.RGBA32I)),_===i.RGB&&(B===i.UNSIGNED_SHORT&&ut&&($=ut.RGB16_EXT),B===i.SHORT&&ut&&($=ut.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),_===i.RGBA){let J=ot?br:zt.getTransfer(K);B===i.FLOAT&&($=i.RGBA32F),B===i.HALF_FLOAT&&($=i.RGBA16F),B===i.UNSIGNED_BYTE&&($=J===oe?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ut&&($=ut.RGBA16_EXT),B===i.SHORT&&ut&&($=ut.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(T,_){let B;return T?_===null||_===Dn||_===ls?B=i.DEPTH24_STENCIL8:_===Mn?B=i.DEPTH32F_STENCIL8:_===Zs&&(B=i.DEPTH24_STENCIL8,Rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Dn||_===ls?B=i.DEPTH_COMPONENT24:_===Mn?B=i.DEPTH_COMPONENT32F:_===Zs&&(B=i.DEPTH_COMPONENT16),B}function b(T,_){return w(T)===!0||T.isFramebufferTexture&&T.minFilter!==Be&&T.minFilter!==Qe?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function I(T){let _=new WeakRef(T);n.get(T).__ref=_,p.add(_),y.register(T,_,_)}function R(T){let _=n.get(T).__ref;_!==void 0&&(p.delete(_),y.unregister(_))}function L(T){z(T.target)}function U(T){P(T.target)}function z(T){T.removeEventListener("dispose",L),R(T),X(T),T.isVideoTexture&&h.delete(T),T.isHTMLTexture&&u.delete(T)}function P(T){T.removeEventListener("dispose",U),R(T),nt(T)}function H(){for(let T of p){let _=T.deref();_!==void 0&&(_.isRenderTarget===!0?P(_):z(_))}p.clear(),u.clear()}function X(T){let _=n.get(T);if(_.__webglInit===void 0)return;let B=T.source,it=d.get(B);if(it){let K=it[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&G(T),Object.keys(it).length===0&&d.delete(B)}n.remove(T)}function G(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let B=T.source,it=d.get(B);delete it[_.__cacheKey],o.memory.textures--}function nt(T){let _=n.get(T);_.__depthDisposeCallback&&_.__depthDisposeCallback();let B=T.depthTexture;if(B&&B.renderTarget===T&&z(B),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(_.__webglFramebuffer[K]))for(let ot=0;ot<_.__webglFramebuffer[K].length;ot++)i.deleteFramebuffer(_.__webglFramebuffer[K][ot]);else i.deleteFramebuffer(_.__webglFramebuffer[K]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[K])}else{if(Array.isArray(_.__webglFramebuffer))for(let K=0;K<_.__webglFramebuffer.length;K++)i.deleteFramebuffer(_.__webglFramebuffer[K]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let K=0;K<_.__webglColorRenderbuffer.length;K++)_.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[K]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let it=T.textures;for(let K=0,ot=it.length;K<ot;K++){let ut=n.get(it[K]);ut.__webglTexture&&(i.deleteTexture(ut.__webglTexture),o.memory.textures--),n.remove(it[K])}n.remove(T)}let W=0;function tt(){W=0}function et(){return W}function vt(T){W=T}function Dt(){let T=W;return T>=s.maxTextures&&Rt("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),W+=1,T}function Z(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.mipmapsAutoUpdate),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function dt(T,_){let B=n.get(T);if(T.isVideoTexture&&Ee(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let it=T.image;if(it===null)Rt("WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)Rt("WebGLRenderer: Texture marked for update but image is incomplete");else{we(B,T,_);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function _t(T,_){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){we(B,T,_);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function Ct(T,_){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){we(B,T,_);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function mt(T,_){let B=n.get(T);if(T.version>0&&B.__version!==T.version){nn(B,T,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}let Bt={[Yi]:i.REPEAT,[fn]:i.CLAMP_TO_EDGE,[ua]:i.MIRRORED_REPEAT},ve={[Be]:i.NEAREST,[qf]:i.NEAREST_MIPMAP_NEAREST,[Qr]:i.NEAREST_MIPMAP_LINEAR,[Qe]:i.LINEAR,[La]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},Lt={[jf]:i.NEVER,[ah]:i.ALWAYS,[Kf]:i.LESS,[rh]:i.LEQUAL,[Qf]:i.EQUAL,[oh]:i.GEQUAL,[td]:i.GREATER,[ed]:i.NOTEQUAL};function te(T,_){if(_.type===Mn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Qe||_.magFilter===La||_.magFilter===Qr||_.magFilter===ui||_.minFilter===Qe||_.minFilter===La||_.minFilter===Qr||_.minFilter===ui)&&Rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Bt[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Bt[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Bt[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ve[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ve[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Lt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Be||_.minFilter!==Qr&&_.minFilter!==ui||_.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function se(T,_){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",L),I(_));let it=_.source,K=d.get(it);K===void 0&&(K={},d.set(it,K));let ot=Z(_);if(ot!==T.__cacheKey){K[ot]===void 0&&(K[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),K[ot].usedTimes++;let ut=K[T.__cacheKey];ut!==void 0&&(K[T.__cacheKey].usedTimes--,ut.usedTimes===0&&G(_)),T.__cacheKey=ot,T.__webglTexture=K[ot].texture}return B}function Jt(T,_,B){return Math.floor(Math.floor(T/B)/_)}function Ge(T,_,B,it){let ot=T.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,B,it,_.data);else{ot.sort((C,j)=>C.start-j.start);let ut=0;for(let C=1;C<ot.length;C++){let j=ot[ut],q=ot[C],ct=j.start+j.count,rt=Jt(q.start,_.width,4),at=Jt(j.start,_.width,4);q.start<=ct+1&&rt===at&&Jt(q.start+q.count-1,_.width,4)===rt?j.count=Math.max(j.count,q.start+q.count-j.start):(++ut,ot[ut]=q)}ot.length=ut+1;let $=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let C=0,j=ot.length;C<j;C++){let q=ot[C],ct=Math.floor(q.start/4),rt=Math.ceil(q.count/4),at=ct%_.width,At=Math.floor(ct/_.width),Xt=rt,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,at),e.pixelStorei(i.UNPACK_SKIP_ROWS,At),e.texSubImage2D(i.TEXTURE_2D,0,at,At,Xt,st,B,it,_.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,$),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function we(T,_,B){let it=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(it=i.TEXTURE_3D);let K=se(T,_),ot=_.source;e.bindTexture(it,T.__webglTexture,i.TEXTURE0+B);let ut=n.get(ot);if(ot.version!==ut.__version||K===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let st=zt.getPrimaries(zt.workingColorSpace),Pt=_.colorSpace===di?null:zt.getPrimaries(_.colorSpace),Ht=_.colorSpace===di||st===Pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let J=v(_.image,!1,s.maxTextureSize);J=Ft(_,J);let lt=r.convert(_.format,_.colorSpace),C=r.convert(_.type),j=E(_.internalFormat,lt,C,_.normalized,_.colorSpace,_.isVideoTexture);te(it,_);let q,ct=_.mipmaps,rt=_.isVideoTexture!==!0,at=ut.__version===void 0||K===!0,At=ot.dataReady,Xt=b(_,J);if(_.isDepthTexture)j=x(_.format===fi,_.type),at&&(rt?e.texStorage2D(i.TEXTURE_2D,1,j,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,j,J.width,J.height,0,lt,C,null));else if(_.isDataTexture)if(ct.length>0){rt&&at&&e.texStorage2D(i.TEXTURE_2D,Xt,j,ct[0].width,ct[0].height);for(let st=0,Pt=ct.length;st<Pt;st++)q=ct[st],rt?At&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,lt,C,q.data):e.texImage2D(i.TEXTURE_2D,st,j,q.width,q.height,0,lt,C,q.data);_.generateMipmaps=!1}else rt?(at&&e.texStorage2D(i.TEXTURE_2D,Xt,j,J.width,J.height),At&&Ge(_,J,lt,C)):e.texImage2D(i.TEXTURE_2D,0,j,J.width,J.height,0,lt,C,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){rt&&at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Xt,j,ct[0].width,ct[0].height,J.depth);for(let st=0,Pt=ct.length;st<Pt;st++)if(q=ct[st],_.format!==bn)if(lt!==null)if(rt){if(At)if(_.layerUpdates.size>0){let Ht=gh(q.width,q.height,_.format,_.type);for(let gt of _.layerUpdates){let le=q.data.subarray(gt*Ht/q.data.BYTES_PER_ELEMENT,(gt+1)*Ht/q.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,gt,q.width,q.height,1,lt,le)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,q.width,q.height,J.depth,lt,q.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,j,q.width,q.height,J.depth,0,q.data,0,0);else Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?At&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,q.width,q.height,J.depth,lt,C,q.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,j,q.width,q.height,J.depth,0,lt,C,q.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{rt&&at&&e.texStorage2D(i.TEXTURE_2D,Xt,j,ct[0].width,ct[0].height);for(let st=0,Pt=ct.length;st<Pt;st++)q=ct[st],_.format!==bn?lt!==null?rt?At&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,lt,q.data):e.compressedTexImage2D(i.TEXTURE_2D,st,j,q.width,q.height,0,q.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?At&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,lt,C,q.data):e.texImage2D(i.TEXTURE_2D,st,j,q.width,q.height,0,lt,C,q.data)}else if(_.isDataArrayTexture)if(rt){if(at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Xt,j,J.width,J.height,J.depth),At)if(_.layerUpdates.size>0){let st=gh(J.width,J.height,_.format,_.type);for(let Pt of _.layerUpdates){let Ht=J.data.subarray(Pt*st/J.data.BYTES_PER_ELEMENT,(Pt+1)*st/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Pt,J.width,J.height,1,lt,C,Ht)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,lt,C,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,j,J.width,J.height,J.depth,0,lt,C,J.data);else if(_.isData3DTexture)rt?(at&&e.texStorage3D(i.TEXTURE_3D,Xt,j,J.width,J.height,J.depth),At&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,lt,C,J.data)):e.texImage3D(i.TEXTURE_3D,0,j,J.width,J.height,J.depth,0,lt,C,J.data);else if(_.isFramebufferTexture){if(at)if(rt)e.texStorage2D(i.TEXTURE_2D,Xt,j,J.width,J.height);else{let st=J.width,Pt=J.height;for(let Ht=0;Ht<Xt;Ht++)e.texImage2D(i.TEXTURE_2D,Ht,j,st,Pt,0,lt,C,null),st>>=1,Pt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),J.parentNode!==st){st.appendChild(J),u.add(_),st.onpaint=Pt=>{let Ht=Pt.changedElements;for(let gt of u)Ht.includes(gt.image)&&(gt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{let Ht=i.RGBA,gt=i.RGBA,le=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ht,gt,le,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ct.length>0){if(rt&&at){let st=kt(ct[0]);e.texStorage2D(i.TEXTURE_2D,Xt,j,st.width,st.height)}for(let st=0,Pt=ct.length;st<Pt;st++)q=ct[st],rt?At&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,lt,C,q):e.texImage2D(i.TEXTURE_2D,st,j,lt,C,q);_.generateMipmaps=!1}else if(rt){if(at){let st=kt(J);e.texStorage2D(i.TEXTURE_2D,Xt,j,st.width,st.height)}At&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,C,J)}else e.texImage2D(i.TEXTURE_2D,0,j,lt,C,J);w(_)&&_.mipmapsAutoUpdate===!0&&M(it),ut.__version=ot.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function nn(T,_,B){if(_.image.length!==6)return;let it=se(T,_),K=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let ot=n.get(K);if(K.version!==ot.__version||it===!0){e.activeTexture(i.TEXTURE0+B);let ut=zt.getPrimaries(zt.workingColorSpace),$=_.colorSpace===di?null:zt.getPrimaries(_.colorSpace),J=_.colorSpace===di||ut===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let lt=_.isCompressedTexture||_.image[0].isCompressedTexture,C=_.image[0]&&_.image[0].isDataTexture,j=[];for(let gt=0;gt<6;gt++)!lt&&!C?j[gt]=v(_.image[gt],!0,s.maxCubemapSize):j[gt]=C?_.image[gt].image:_.image[gt],j[gt]=Ft(_,j[gt]);let q=j[0],ct=r.convert(_.format,_.colorSpace),rt=r.convert(_.type),at=E(_.internalFormat,ct,rt,_.normalized,_.colorSpace),At=_.isVideoTexture!==!0,Xt=ot.__version===void 0||it===!0,st=K.dataReady,Pt=b(_,q);te(i.TEXTURE_CUBE_MAP,_);let Ht;if(_.isDepthTexture){if(at=x(_.format===fi,_.type),Xt)if(At)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,at,q.width,q.height);else for(let gt=0;gt<6;gt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,at,q.width,q.height,0,ct,rt,null)}else if(lt){At&&Xt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Pt,at,q.width,q.height);for(let gt=0;gt<6;gt++){Ht=j[gt].mipmaps;for(let le=0;le<Ht.length;le++){let Fe=Ht[le];_.format!==bn?ct!==null?At?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,0,0,Fe.width,Fe.height,ct,Fe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,at,Fe.width,Fe.height,0,Fe.data):Rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,0,0,Fe.width,Fe.height,ct,rt,Fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,at,Fe.width,Fe.height,0,ct,rt,Fe.data)}}}else{if(Ht=_.mipmaps,At&&Xt){Ht.length>0&&Pt++;let gt=kt(j[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Pt,at,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(C){At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,j[gt].width,j[gt].height,ct,rt,j[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,at,j[gt].width,j[gt].height,0,ct,rt,j[gt].data);for(let le=0;le<Ht.length;le++){let gi=Ht[le].image[gt].image;At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,0,0,gi.width,gi.height,ct,rt,gi.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,at,gi.width,gi.height,0,ct,rt,gi.data)}}else{At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,ct,rt,j[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,at,ct,rt,j[gt]);for(let le=0;le<Ht.length;le++){let Fe=Ht[le];At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,0,0,ct,rt,Fe.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,at,ct,rt,Fe.image[gt])}}}w(_)&&_.mipmapsAutoUpdate===!0&&M(i.TEXTURE_CUBE_MAP),ot.__version=K.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function me(T,_,B,it,K,ot){let ut=r.convert(B.format,B.colorSpace),$=r.convert(B.type),J=E(B.internalFormat,ut,$,B.normalized,B.colorSpace),lt=n.get(_),C=n.get(B);if(C.__renderTarget=_,!lt.__hasExternalTextures){let j=Math.max(1,_.width>>ot),q=Math.max(1,_.height>>ot);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,ot,J,j,q,_.depth,0,ut,$,null):e.texImage2D(K,ot,J,j,q,0,ut,$,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),pt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,K,C.__webglTexture,0,pe(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,K,C.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bn(T,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let it=_.depthTexture,K=it&&it.isDepthTexture?it.type:null,ot=x(_.stencilBuffer,K),ut=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe(_),ot,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe(_),ot,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ot,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,T)}else{let it=_.textures;for(let K=0;K<it.length;K++){let ot=it[K],ut=r.convert(ot.format,ot.colorSpace),$=r.convert(ot.type),J=E(ot.internalFormat,ut,$,ot.normalized,ot.colorSpace);pt(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe(_),J,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe(_),J,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,J,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(T,_,B){let it=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=n.get(_.depthTexture);K.__renderTarget=_;let ot=it?_.depthTexture.image[0]:_.depthTexture.image;(!K.__webglTexture||ot.width!==_.width||ot.height!==_.height)&&(ot.width=_.width,ot.height=_.height,_.depthTexture.needsUpdate=!0),it?mt(_.depthTexture,0):dt(_.depthTexture,0);let ut=K.__webglTexture,$=pe(_),J=it?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,lt=_.depthTexture.format===fi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===ri)pt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,J,ut,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,lt,J,ut,0);else if(_.depthTexture.format===fi)pt(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,J,ut,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,lt,J,ut,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function pn(T){let _=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let it=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),it){let K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,it.removeEventListener("dispose",K)};it.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=it}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let it=0;it<6;it++)De(_.__webglFramebuffer[it],T,it);else T.texture.mipmaps.length>0?De(_.__webglFramebuffer[0],T,0):De(_.__webglFramebuffer,T,0);else if(B){_.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[it]),_.__webglDepthbuffer[it]===void 0)_.__webglDepthbuffer[it]=i.createRenderbuffer(),Bn(_.__webglDepthbuffer[it],T,!1);else{let K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ot)}}else if(T.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Bn(_.__webglDepthbuffer,T,!1);else{let K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ot)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function mn(T,_,B){let it=n.get(T);_!==void 0&&me(it.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&pn(T)}function gn(T){let _=T.texture,B=n.get(T),it=n.get(_);T.addEventListener("dispose",U),I(T);let K=T.textures,ot=T.isWebGLCubeRenderTarget===!0,ut=K.length>1;if(ut||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=_.version,o.memory.textures++),ot){B.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps.length>0){B.__webglFramebuffer[$]=[];for(let J=0;J<_.mipmaps.length;J++)B.__webglFramebuffer[$][J]=i.createFramebuffer()}else B.__webglFramebuffer[$]=i.createFramebuffer()}else{if(_.mipmaps.length>0){B.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)B.__webglFramebuffer[$]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ut)for(let $=0,J=K.length;$<J;$++){let lt=n.get(K[$]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&pt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let $=0;$<K.length;$++){let J=K[$];B.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[$]);let lt=r.convert(J.format,J.colorSpace),C=r.convert(J.type),j=E(J.internalFormat,lt,C,J.normalized,J.colorSpace,T.isXRRenderTarget===!0),q=pe(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,q,j,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,B.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Bn(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),te(i.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)me(B.__webglFramebuffer[$][J],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,J);else me(B.__webglFramebuffer[$],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);w(_)?M(i.TEXTURE_CUBE_MAP):_.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),e.unbindTexture()}else if(ut){for(let $=0,J=K.length;$<J;$++){let lt=K[$],C=n.get(lt),j=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(j=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,C.__webglTexture),te(j,lt),me(B.__webglFramebuffer,T,lt,i.COLOR_ATTACHMENT0+$,j,0),w(lt)&&M(j)}e.unbindTexture()}else{let $=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,it.__webglTexture),te($,_),_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)me(B.__webglFramebuffer[J],T,_,i.COLOR_ATTACHMENT0,$,J);else me(B.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,$,0);w(_)?M($):_.mipmaps.length>0&&i.texParameteri($,i.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),e.unbindTexture()}T.depthBuffer&&pn(T)}function N(T){let _=T.textures;for(let B=0,it=_.length;B<it;B++){let K=_[B];if(w(K)&&K.mipmapsAutoUpdate===!0){let ot=A(T),ut=n.get(K).__webglTexture;e.bindTexture(ot,ut),M(ot),e.unbindTexture()}}}let xn=[];function de(T){if(T.samples>0){if(pt(T)===!1){let _=T.textures,B=T.width,it=T.height,K=i.COLOR_BUFFER_BIT,ot=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=n.get(T),$=_.length>1;if($)for(let lt=0;lt<_.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let lt=0;lt<_.length;lt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ut.__webglColorRenderbuffer[lt]);let C=n.get(_[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,B,it,0,0,B,it,K,i.NEAREST),l===!0&&(xn.length=0,xn.push(i.COLOR_ATTACHMENT0+lt),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&xn.push(ot),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,xn))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let lt=0;lt<_.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,ut.__webglColorRenderbuffer[lt]);let C=n.get(_[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,C,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function pe(T){return Math.min(s.maxSamples,T.samples)}function pt(T){let _=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ee(T){let _=o.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function Ft(T,_){let B=T.colorSpace,it=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Mr&&B!==di&&(zt.getTransfer(B)===oe?(it!==bn||K!==on)&&Rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",B)),_}function kt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=Dt,this.resetTextureUnits=tt,this.getTextureUnits=et,this.setTextureUnits=vt,this.setTexture2D=dt,this.setTexture2DArray=_t,this.setTexture3D=Ct,this.setTextureCube=mt,this.rebindTextures=mn,this.setupRenderTarget=gn,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=pn,this.setupFrameBufferTexture=me,this.useMultisampledRTT=pt,this.dispose=H}function Cv(i,t){function e(n,s=di){let r,o=zt.getTransfer(s);if(n===on)return i.UNSIGNED_BYTE;if(n===Fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Na)return i.UNSIGNED_SHORT_5_5_5_1;if(n===th)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===eh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kc)return i.BYTE;if(n===Qc)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===Da)return i.INT;if(n===Dn)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===Fn)return i.HALF_FLOAT;if(n===nh)return i.ALPHA;if(n===ih)return i.RGB;if(n===bn)return i.RGBA;if(n===ri)return i.DEPTH_COMPONENT;if(n===fi)return i.DEPTH_STENCIL;if(n===sh)return i.RED;if(n===Ua)return i.RED_INTEGER;if(n===Ni)return i.RG;if(n===Oa)return i.RG_INTEGER;if(n===Ba)return i.RGBA_INTEGER;if(n===to||n===eo||n===no||n===io)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===to)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===to)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===io)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===za||n===Va||n===Ga)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ga)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ha||n===Wa||n===Xa||n===qa||n===$a||n===so||n===Ya)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ha||n===Wa)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Xa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===qa)return r.COMPRESSED_R11_EAC;if(n===$a)return r.COMPRESSED_SIGNED_R11_EAC;if(n===so)return r.COMPRESSED_RG11_EAC;if(n===Ya)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Za||n===Ja||n===ja||n===Ka||n===Qa||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Za)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ja)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ja)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ka)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tl)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===el)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nl)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===il)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sl)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rl)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ol)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===al)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ll)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cl||n===hl||n===ul)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===cl)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ul)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fl||n===dl||n===ro||n===pl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===fl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ro)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ls?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Iv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ih=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Dr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Wn({vertexShader:Iv,fragmentShader:Pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Re(new li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ph=class extends Hn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,p=null,y=typeof XRWebGLBinding<"u",m=new Ih,g={},v=e.getContextAttributes(),w=null,M=null,A=[],E=[],x=new Wt,b=null,I=null,R=new Te;R.viewport=new Zt;let L=new Te;L.viewport=new Zt;let U=[R,L],z=new Ca,P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let dt=A[Z];return dt===void 0&&(dt=new Os,A[Z]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(Z){let dt=A[Z];return dt===void 0&&(dt=new Os,A[Z]=dt),dt.getGripSpace()},this.getHand=function(Z){let dt=A[Z];return dt===void 0&&(dt=new Os,A[Z]=dt),dt.getHandSpace()};function X(Z){let dt=E.indexOf(Z.inputSource);if(dt===-1)return;let _t=A[dt];_t!==void 0&&(_t.update(Z.inputSource,Z.frame,c||o),_t.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",nt);for(let Z=0;Z<A.length;Z++){let dt=E[Z];dt!==null&&(E[Z]=null,A[Z].disconnect(dt))}P=null,H=null,m.reset();for(let Z in g)delete g[Z];if(t.setRenderTarget(w),d=null,f=null,u=null,s=null,M=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(x.width,x.height,!1),I!==null){let Z=I.camera;Z.fov=I.fov,Z.zoom=I.zoom,Z.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&Rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",G),s.addEventListener("inputsourceschange",nt),v.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Ct=null,mt=null;v.depth&&(mt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=v.stencil?fi:ri,Ct=v.stencil?ls:Dn);let Bt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new dn(f.textureWidth,f.textureHeight,{format:bn,type:on,depthTexture:new ai(f.textureWidth,f.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let _t={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new dn(d.framebufferWidth,d.framebufferHeight,{format:bn,type:on,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Dt.setContext(s),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(Z){for(let dt=0;dt<Z.removed.length;dt++){let _t=Z.removed[dt],Ct=E.indexOf(_t);Ct>=0&&(E[Ct]=null,A[Ct].disconnect(_t))}for(let dt=0;dt<Z.added.length;dt++){let _t=Z.added[dt],Ct=E.indexOf(_t);if(Ct===-1){for(let Bt=0;Bt<A.length;Bt++)if(Bt>=E.length){E.push(_t),Ct=Bt;break}else if(E[Bt]===null){E[Bt]=_t,Ct=Bt;break}if(Ct===-1)break}let mt=A[Ct];mt&&mt.connect(_t)}}function W(Z,dt){dt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(dt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let dt=Z.near,_t=Z.far;m.texture!==null&&(m.depthNear>0&&(dt=m.depthNear),m.depthFar>0&&(_t=m.depthFar)),z.near=L.near=R.near=dt,z.far=L.far=R.far=_t,(P!==z.near||H!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),P=z.near,H=z.far),z.layers.mask=Z.layers.mask|6,R.layers.mask=z.layers.mask&-5,L.layers.mask=z.layers.mask&-3;let Ct=Z.parent,mt=z.cameras;W(z,Ct);for(let Bt=0;Bt<mt.length;Bt++)W(mt[Bt],Ct);z.projectionMatrix.copy(R.projectionMatrix),z.projectionMatrixInverse.copy(R.projectionMatrixInverse),I===null&&Z.isPerspectiveCamera&&(I={camera:Z,fov:Z.fov,zoom:Z.zoom}),tt(Z,z,Ct)};function tt(Z,dt,_t){_t===null?Z.matrix.copy(dt.matrixWorld):(Z.matrix.copy(_t.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(dt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(dt.projectionMatrix),Z.projectionMatrixInverse.copy(dt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Zi*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(Z){return g[Z]};let et=null;function vt(Z,dt){if(h=dt.getViewerPose(c||o),p=dt,h!==null){let _t=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let Ct=!1;_t.length!==z.cameras.length&&(z.cameras.length=0,Ct=!0);for(let Lt=0;Lt<_t.length;Lt++){let te=_t[Lt],se=null;if(d!==null)se=d.getViewport(te);else{let Ge=u.getViewSubImage(f,te);se=Ge.viewport,Lt===0&&(t.setRenderTargetTextures(M,Ge.colorTexture,Ge.depthStencilTexture),t.setRenderTarget(M))}let Jt=U[Lt];Jt===void 0&&(Jt=new Te,Jt.layers.enable(Lt),Jt.viewport=new Zt,U[Lt]=Jt),Jt.matrix.fromArray(te.transform.matrix),Jt.matrix.decompose(Jt.position,Jt.quaternion,Jt.scale),Jt.projectionMatrix.fromArray(te.projectionMatrix),Jt.projectionMatrixInverse.copy(Jt.projectionMatrix).invert(),Jt.viewport.set(se.x,se.y,se.width,se.height),Lt===0&&(z.matrix.copy(Jt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ct===!0&&z.cameras.push(Jt)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let Lt=u.getDepthInformation(_t[0]);Lt&&Lt.isValid&&Lt.texture&&m.init(Lt,s.renderState)}if(mt&&mt.includes("camera-access")&&y){t.state.unbindTexture(),u=n.getBinding();for(let Lt=0;Lt<_t.length;Lt++){let te=_t[Lt].camera;if(te){let se=g[te];se||(se=new Dr,g[te]=se);let Jt=u.getCameraImage(te);se.sourceTexture=Jt}}}}for(let _t=0;_t<A.length;_t++){let Ct=E[_t],mt=A[_t];Ct!==null&&mt!==void 0&&mt.update(Ct,dt,c||o)}et&&et(Z,dt),dt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:dt}),p=null}let Dt=new Bd;Dt.setAnimationLoop(vt),this.setAnimationLoop=function(Z){et=Z},this.dispose=function(){}}},Lv=new wt,Yd=new Ut;Yd.set(-1,0,0,0,1,0,0,0,1);function Dv(i,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,dh(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,v,w,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,M)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),y(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,v,w):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===en&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===en&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let v=t.get(g),w=v.envMap,M=v.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(Lv.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Yd),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,v,w){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=w*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,v){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===en&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function y(m,g){let v=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Fv(i,t,e,n){let s={},r={};function o(v,w){let M=w.program;n.uniformBlockBinding(v,M,s[v.id])}function a(v,w){let M=s[v.id];M===void 0&&(p(v),M=l(v),s[v.id]=M,v.addEventListener("dispose",m));let A=w.program;n.updateUBOMapping(v,A);let E=t.render.frame;r[v.id]!==E&&(c(v),r[v.id]=E)}function l(v){let w=i.createBuffer(),M=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,M,A),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(v){let w=s[v.id],M=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let E=0,x=M.length;E<x;E++){let b=M[E];if(Array.isArray(b))for(let I=0,R=b.length;I<R;I++)h(b[I],E,I,A);else h(b,E,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(v,w,M,A){if(f(v,w,M,A)===!0){let E=v.__offset,x=v.value;if(Array.isArray(x)){let b=0;for(let I=0;I<x.length;I++){let R=x[I],L=y(R,!0);u(R,v.__data,b),b+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,v.__data)}}function u(v,w,M){typeof v=="number"||typeof v=="boolean"?w[M]=v:v.isMatrix3?(w[M]=v.elements[0],w[M+1]=v.elements[1],w[M+2]=v.elements[2],w[M+3]=0,w[M+4]=v.elements[3],w[M+5]=v.elements[4],w[M+6]=v.elements[5],w[M+7]=0,w[M+8]=v.elements[6],w[M+9]=v.elements[7],w[M+10]=v.elements[8],w[M+11]=0):ArrayBuffer.isView(v)?w.set(v.subarray(0,w.length-M),M):v.toArray(w,M)}function f(v,w,M,A){let E=v.value,x=w+"_"+M;if(Array.isArray(E)){A[x]===void 0&&(A[x]=[]);let b=A[x],I=!1;for(let R=0;R<E.length;R++)d(E[R],b,R)===!0&&(I=!0);return I}return d(E,A,x)}function d(v,w,M){if(w[M]===void 0)return typeof v=="number"||typeof v=="boolean"?w[M]=v:ArrayBuffer.isView(v)?w[M]=v.slice():w[M]=v.clone(),!0;{let A=w[M];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return w[M]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function p(v){let w=v.uniforms,M=0,A=16;for(let x=0,b=w.length;x<b;x++){let I=Array.isArray(w[x])?w[x]:[w[x]];for(let R=0,L=I.length;R<L;R++){let U=I[R],z=Array.isArray(U.value)?U.value:[U.value],P=Array.isArray(w[x])||Array.isArray(U.value),H=M;for(let G=0,nt=z.length;G<nt;G++){let W=z[G],tt=y(W,P),et=M%A,vt=et%tt.boundary,Dt=et+vt;M+=vt,Dt!==0&&A-Dt<tt.storage&&(M+=A-Dt),G===0&&(H=M),M+=tt.storage}let X=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new X((M-H)/Float32Array.BYTES_PER_ELEMENT),U.__offset=H}}let E=M%A;return E>0&&(M+=A-E),v.__size=M,v.__cache={},this}function y(v,w){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=16,M.storage=48):v.isMatrix4?(M.boundary=16,M.storage=64):v.isTexture?Rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Rt("WebGLRenderer: Unsupported uniform value type.",v),w===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function m(v){let w=v.target;w.removeEventListener("dispose",m),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function g(){for(let v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:o,update:a,dispose:g}}var Nv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$n=null;function Uv(){return $n===null&&($n=new Cr(Nv,16,16,Ni,Fn),$n.name="DFG_LUT",$n.minFilter=Qe,$n.magFilter=Qe,$n.wrapS=fn,$n.wrapT=fn,$n.generateMipmaps=!1,$n.needsUpdate=!0),$n}var yl=class{constructor(t={}){let{canvas:e=id(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=on}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let y=d,m=new Set([Ba,Oa,Ua]),g=new Set([on,Dn,Zs,ls,Fa,Na]),v=new Uint32Array(4),w=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},A=null,E=null,x=[],b=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,U=null,z=null,P=null,H=null;this._outputColorSpace=ne;let X=0,G=0,nt=null,W=-1,tt=null,et=new Zt,vt=new Zt,Dt=null,Z=new It(0),dt=0,_t=e.width,Ct=e.height,mt=1,Bt=null,ve=null,Lt=new Zt(0,0,_t,Ct),te=new Zt(0,0,_t,Ct),se=!1,Jt=new Ti,Ge=new ga,we=!1,nn=!1,me=new wt,Bn=new F,De=new Zt,pn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mn=!1;function gn(){return nt===null?mt:1}let N=n;function xn(S,D){return e.getContext(S,D)}let de,pe,pt,Ee,Ft,kt,T,_,B,it,K,ot,ut,$,J,lt,C,j,q,ct,rt,at,At;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Pt,!1),e.addEventListener("webglcontextrestored",Ht,!1),e.addEventListener("webglcontextcreationerror",gt,!1),N===null){let D="webgl2";if(N=xn(D,S),N===null)throw xn(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Xt()}catch(S){throw e.removeEventListener("webglcontextlost",Pt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Ot("WebGLRenderer: "+S.message),S}function Xt(){de=new $y(N),de.init(),rt=new Cv(N,de),pe=new Uy(N,de,t,rt),pt=new Av(N,de),pe.reversedDepthBuffer&&f&&pt.buffers.depth.setReversed(!0),z=N.createFramebuffer(),P=N.createFramebuffer(),H=N.createFramebuffer(),Ee=new Jy(N),Ft=new dv,kt=new Rv(N,de,pt,Ft,pe,rt,Ee),T=new qy(R),_=new Kg(N),at=new Fy(N,_),B=new Yy(N,_,Ee,at),it=new Ky(N,B,_,at,Ee),j=new jy(N,pe,kt),J=new Oy(Ft),K=new fv(R,T,de,pe,at,J),ot=new Dv(R,Ft),ut=new mv,$=new Sv(de),C=new Dy(R,T,pt,it,p,l),lt=new Tv(R,it,pe),At=new Fv(N,Ee,pe,pt),q=new Ny(N,de,Ee),ct=new Zy(N,de,Ee),Ee.programs=K.programs,R.capabilities=pe,R.extensions=de,R.properties=Ft,R.renderLists=ut,R.shadowMap=lt,R.state=pt,R.info=Ee}y!==on&&(I=new t_(y,e.width,e.height,a,s,r));let st=new Ph(R,N);this.xr=st,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let S=de.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=de.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(S){S!==void 0&&(mt=S,this.setSize(_t,Ct,!1))},this.getSize=function(S){return S.set(_t,Ct)},this.setSize=function(S,D,V=!0){if(st.isPresenting){Rt("WebGLRenderer: Can't change size while VR device is presenting.");return}_t=S,Ct=D,e.width=Math.floor(S*mt),e.height=Math.floor(D*mt),V===!0&&(e.style.width=S+"px",e.style.height=D+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(_t*mt,Ct*mt).floor()},this.setDrawingBufferSize=function(S,D,V){_t=S,Ct=D,mt=V,e.width=Math.floor(S*V),e.height=Math.floor(D*V),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(y===on){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){Rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(et)},this.getViewport=function(S){return S.copy(Lt)},this.setViewport=function(S,D,V,O){S.isVector4?Lt.set(S.x,S.y,S.z,S.w):Lt.set(S,D,V,O),pt.viewport(et.copy(Lt).multiplyScalar(gn()).round())},this.getScissor=function(S){return S.copy(te)},this.setScissor=function(S,D,V,O){S.isVector4?te.set(S.x,S.y,S.z,S.w):te.set(S,D,V,O),pt.scissor(vt.copy(te).multiplyScalar(gn()).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(S){pt.setScissorTest(se=S)},this.setOpaqueSort=function(S){Bt=S},this.setTransparentSort=function(S){ve=S},this.getClearColor=function(S){return S.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,V=!0){let O=0;if(S){let k=!1;if(nt!==null){let ft=nt.texture.format;k=m.has(ft)}if(k){let ft=nt.texture.type,St=g.has(ft),ht=C.getClearColor(),yt=C.getClearAlpha(),Et=ht.r,Vt=ht.g,jt=ht.b;St?(v[0]=Et,v[1]=Vt,v[2]=jt,v[3]=yt,N.clearBufferuiv(N.COLOR,0,v)):(w[0]=Et,w[1]=Vt,w[2]=jt,w[3]=yt,N.clearBufferiv(N.COLOR,0,w))}else O|=N.COLOR_BUFFER_BIT}D&&(O|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(O|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&N.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){e.removeEventListener("webglcontextlost",Pt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),C.dispose(),ut.dispose(),$.dispose(),kt.dispose(),Ft.dispose(),T.dispose(),it.dispose(),B.dispose(),at.dispose(),At.dispose(),K.dispose(),st.dispose(),st.removeEventListener("sessionstart",au),st.removeEventListener("sessionend",lu),ki.stop()};function Pt(S){S.preventDefault(),ch("WebGLRenderer: Context Lost."),L=!0}function Ht(){ch("WebGLRenderer: Context Restored."),L=!1;let S=Ee.autoReset,D=lt.enabled,V=lt.autoUpdate,O=lt.needsUpdate,k=lt.type;Xt(),Ee.autoReset=S,lt.enabled=D,lt.autoUpdate=V,lt.needsUpdate=O,lt.type=k}function gt(S){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function le(S){let D=S.target;D.removeEventListener("dispose",le),Fe(D)}function Fe(S){gi(S),Ft.remove(S)}function gi(S){let D=Ft.get(S).programs;D!==void 0&&(D.forEach(function(V){K.releaseProgram(V)}),S.isShaderMaterial&&K.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,V,O,k,ft){D===null&&(D=pn);let St=k.isMesh&&k.matrixWorld.determinantAffine()<0,ht=Hp(S,D,V,O,k);pt.setMaterial(O,St);let yt=V.index,Et=1;if(O.wireframe===!0){if(yt=B.getWireframeAttribute(V),yt===void 0)return;Et=2}let Vt=V.drawRange,jt=V.attributes.position,Mt=Vt.start*Et,Kt=(Vt.start+Vt.count)*Et;ft!==null&&(Mt=Math.max(Mt,ft.start*Et),Kt=Math.min(Kt,(ft.start+ft.count)*Et)),yt!==null?(Mt=Math.max(Mt,0),Kt=Math.min(Kt,yt.count)):jt!=null&&(Mt=Math.max(Mt,0),Kt=Math.min(Kt,jt.count));let Me=Kt-Mt;if(Me<0||Me===1/0)return;at.setup(k,O,ht,V,yt);let ue,he=q;if(yt!==null&&(ue=_.get(yt),he=ct,he.setIndex(ue)),k.isMesh)O.wireframe===!0?(pt.setLineWidth(O.wireframeLinewidth*gn()),he.setMode(N.LINES)):he.setMode(N.TRIANGLES);else if(k.isLine){let qe=O.linewidth;qe===void 0&&(qe=1),pt.setLineWidth(qe*gn()),k.isLineSegments?he.setMode(N.LINES):k.isLineLoop?he.setMode(N.LINE_LOOP):he.setMode(N.LINE_STRIP)}else k.isPoints?he.setMode(N.POINTS):k.isSprite&&he.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(de.get("WEBGL_multi_draw"))he.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let qe=k._multiDrawStarts,bt=k._multiDrawCounts,je=k._multiDrawCount,ee=yt?_.get(yt).bytesPerElement:1,zi=Ft.get(O).currentProgram.getUniforms();for(let $e=0;$e<je;$e++)zi.setValue(N,"_gl_DrawID",$e),he.render(qe[$e]/ee,bt[$e])}else if(k.isInstancedMesh)he.renderInstances(Mt,Me,k.count);else if(V.isInstancedBufferGeometry){let qe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,bt=Math.min(V.instanceCount,qe);he.renderInstances(Mt,Me,bt)}else he.render(Mt,Me)};function ou(S,D,V,O){U!==null&&S.isNodeMaterial&&U.setObject(O,S),we===!0&&J.setState(S,V,!1),S.transparent===!0&&S.side===Sn&&S.forceSinglePass===!1?(S.side=en,S.needsUpdate=!0,lr(S,D,O),S.side=Fi,S.needsUpdate=!0,lr(S,D,O),S.side=Sn):lr(S,D,O)}this.compile=function(S,D,V=null){V===null&&(V=S),U!==null&&U.renderStart(S,D,V),E=$.get(V),E.init(D),b.push(E),V.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),S!==V&&S.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),E.setupLights(),U!==null&&U.updateLights(E.state.lightsArray),nn=this.localClippingEnabled,we=J.init(this.clippingPlanes,nn),we===!0&&J.setGlobalState(this.clippingPlanes,D),U!==null&&lt.render(E.state.shadowsArray,V,D);let O=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let St=0;St<ft.length;St++){let ht=ft[St];ou(ht,V,D,k),O.add(ht)}else ou(ft,V,D,k),O.add(ft)}),E=b.pop(),U!==null&&U.renderEnd(),O},this.compileAsync=function(S,D,V=null){let O=this.compile(S,D,V);return new Promise(k=>{function ft(){if(O.forEach(function(St){let yt=Ft.get(St).currentProgram;(yt===void 0||yt.isReady())&&O.delete(St)}),O.size===0){k(S);return}setTimeout(ft,10)}de.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let Vl=null;function Vp(S){Vl&&Vl(S)}function au(){ki.stop()}function lu(){ki.start()}let ki=new Bd;ki.setAnimationLoop(Vp),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(S){Vl=S,st.setAnimationLoop(S),S===null?ki.stop():ki.start()},st.addEventListener("sessionstart",au),st.addEventListener("sessionend",lu),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;U!==null&&U.renderStart(S,D);let V=st.enabled===!0&&st.isPresenting===!0,O=I!==null&&(nt===null||V)&&I.begin(R,nt);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(D),D=st.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,D,nt),E=$.get(S,b.length),E.init(D),E.state.textureUnits=kt.getTextureUnits(),b.push(E),me.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?Ge.setFromArrayCamera(D):Jt.setFromProjectionMatrix(me,vn,D.reversedDepth),nn=this.localClippingEnabled,we=J.init(this.clippingPlanes,nn),A=ut.get(S,x.length),A.init(),x.push(A),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){let St=R.xr.getDepthSensingMesh();St!==null&&Gl(St,D,-1/0,R.sortObjects)}Gl(S,D,0,R.sortObjects),A.finish(),U!==null&&U.updateLights(E.state.lightsArray),R.sortObjects===!0&&A.sort(Bt,ve),mn=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,mn&&C.addToRenderList(A,S),this.info.autoReset===!0&&this.info.reset(),we===!0&&J.beginShadows();let k=E.state.shadowsArray;if(lt.render(k,S,D),we===!0&&J.endShadows(),(O&&I.hasRenderPass())===!1){let St=A.opaque,ht=A.transmissive;if(E.setupLights(),D.isArrayCamera){let yt=D.cameras;if(ht.length>0)for(let Et=0,Vt=yt.length;Et<Vt;Et++){let jt=yt[Et];hu(St,ht,S,jt)}mn&&C.render(S);for(let Et=0,Vt=yt.length;Et<Vt;Et++){let jt=yt[Et];cu(A,S,jt,jt.viewport)}}else ht.length>0&&hu(St,ht,S,D),mn&&C.render(S),cu(A,S,D)}nt!==null&&G===0&&(kt.updateMultisampleRenderTarget(nt),kt.updateRenderTargetMipmap(nt)),O&&I.end(R),S.isScene===!0&&S.onAfterRender(R,S,D),at.resetDefaultState(),W=-1,tt=null,b.pop(),b.length>0?(E=b[b.length-1],kt.setTextureUnits(E.state.textureUnits),we===!0&&J.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,x.pop(),x.length>0?A=x[x.length-1]:A=null,U!==null&&U.renderEnd()};function Gl(S,D,V,O){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){let St=D.isArrayCamera?Ge:Jt;if(!S.frustumCulled||S.intersectsFrustum(St)){O&&De.setFromMatrixPosition(S.matrixWorld).applyMatrix4(me);let ht=it.update(S),yt=S.material;yt.visible&&A.push(S,ht,yt,V,De.z,null,D)}}else if(S.isMesh||S.isLine||S.isPoints){let St=D.isArrayCamera?Ge:Jt;if(!S.frustumCulled||S.intersectsFrustum(St)){let ht=it.update(S),yt=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),De.copy(S.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),De.copy(ht.boundingSphere.center)),De.applyMatrix4(S.matrixWorld).applyMatrix4(me)),Array.isArray(yt)){let Et=ht.groups;for(let Vt=0,jt=Et.length;Vt<jt;Vt++){let Mt=Et[Vt],Kt=yt[Mt.materialIndex];Kt&&Kt.visible&&A.push(S,ht,Kt,V,De.z,Mt,D)}}else yt.visible&&A.push(S,ht,yt,V,De.z,null,D)}}}let ft=S.children;for(let St=0,ht=ft.length;St<ht;St++)Gl(ft[St],D,V,O)}function cu(S,D,V,O){let{opaque:k,transmissive:ft,transparent:St}=S;E.setupLightsView(V),we===!0&&J.setGlobalState(R.clippingPlanes,V),O&&pt.viewport(et.copy(O)),k.length>0&&Ao(k,D,V),ft.length>0&&Ao(ft,D,V),St.length>0&&Ao(St,D,V),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function hu(S,D,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[O.id]===void 0){let Mt=de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[O.id]=new dn(1,1,{generateMipmaps:!0,type:Mt?Fn:on,minFilter:ui,samples:Math.max(4,pe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:zt.workingColorSpace})}let ft=E.state.transmissionRenderTarget[O.id],St=O.viewport||et;ft.setSize(St.z*R.transmissionResolutionScale,St.w*R.transmissionResolutionScale);let ht=R.getRenderTarget(),yt=R.getActiveCubeFace(),Et=R.getActiveMipmapLevel();R.setRenderTarget(ft),R.getClearColor(Z),dt=R.getClearAlpha(),dt<1&&R.setClearColor(16777215,.5),R.clear(),mn&&C.render(V);let Vt=R.toneMapping;R.toneMapping=qn;let jt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),E.setupLightsView(O),we===!0&&J.setGlobalState(R.clippingPlanes,O),Ao(S,V,O),kt.updateMultisampleRenderTarget(ft),kt.updateRenderTargetMipmap(ft),de.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let Kt=0,Me=D.length;Kt<Me;Kt++){let ue=D[Kt],{object:he,geometry:qe,material:bt,group:je}=ue;if(bt.side===Sn&&he.layers.test(O.layers)){let ee=bt.side;bt.side=en,bt.needsUpdate=!0,uu(he,V,O,qe,bt,je),bt.side=ee,bt.needsUpdate=!0,Mt=!0}}Mt===!0&&(kt.updateMultisampleRenderTarget(ft),kt.updateRenderTargetMipmap(ft))}R.setRenderTarget(ht,yt,Et),R.setClearColor(Z,dt),jt!==void 0&&(O.viewport=jt),R.toneMapping=Vt}function Ao(S,D,V){let O=D.isScene===!0?D.overrideMaterial:null;for(let k=0,ft=S.length;k<ft;k++){let St=S[k],{object:ht,geometry:yt,group:Et}=St,Vt=St.material;Vt.allowOverride===!0&&O!==null&&(Vt=O),ht.layers.test(V.layers)&&uu(ht,D,V,yt,Vt,Et)}}function uu(S,D,V,O,k,ft){U!==null&&k.isNodeMaterial&&U.setObject(S,k),S.onBeforeRender(R,D,V,O,k,ft),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(R,D,V,O,S,ft),k.transparent===!0&&k.side===Sn&&k.forceSinglePass===!1?(k.side=en,k.needsUpdate=!0,R.renderBufferDirect(V,D,O,k,S,ft),k.side=Fi,k.needsUpdate=!0,R.renderBufferDirect(V,D,O,k,S,ft),k.side=Sn):R.renderBufferDirect(V,D,O,k,S,ft),S.onAfterRender(R,D,V,O,k,ft)}function fu(S){let D=0;for(let V of S)V.texture!==null&&D++;return D}function lr(S,D,V){D.isScene!==!0&&(D=pn);let O=Ft.get(S),k=E.state.lights,ft=E.state.shadowsArray,St=k.state.version,ht=K.getParameters(S,k.state,ft,D,V,E.state.lightProbeGridArray),yt=K.getProgramCacheKey(ht),Et=O.programs;O.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;let Vt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;O.envMap=T.get(S.envMap||O.environment,Vt),O.envMapRotation=O.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Et===void 0&&(S.addEventListener("dispose",le),Et=new Map,O.programs=Et,O.programVariants=new Map);let jt=Et.get(yt);if(jt!==void 0){if(O.currentProgram===jt&&O.lightsStateVersion===St)return pu(S,ht),jt}else ht.uniforms=K.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,V,ht),S.onBeforeCompile(ht,R),jt=K.acquireProgram(ht,yt),Et.set(yt,jt),O.uniforms=ht.uniforms;let Mt=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Mt.clippingPlanes=J.uniform),pu(S,ht),O.needsLights=Xp(S),O.lightsStateVersion=St,O.needsLights&&(Mt.ambientLightColor.value=k.state.ambient,Mt.lightProbe.value=k.state.probe,Mt.sunLights.value=k.state.sun,Mt.sunLightShadows.value=k.state.sunShadow,Mt.directionalLights.value=k.state.directional,Mt.directionalLightShadows.value=k.state.directionalShadow,Mt.spotLights.value=k.state.spot,Mt.spotLightShadows.value=k.state.spotShadow,Mt.rectAreaLights.value=k.state.rectArea,Mt.ltc_1.value=k.state.rectAreaLTC1,Mt.ltc_2.value=k.state.rectAreaLTC2,Mt.pointLights.value=k.state.point,Mt.pointLightShadows.value=k.state.pointShadow,Mt.hemisphereLights.value=k.state.hemi,Mt.sunShadowMatrix.value=k.state.sunShadowMatrix,Mt.sunShadowCascade.value=k.state.sunShadowCascade,Mt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Mt.spotLightMatrix.value=k.state.spotLightMatrix,Mt.spotLightMap.value=k.state.spotLightMap,Mt.pointShadowMatrix.value=k.state.pointShadowMatrix),O.numLightProbeGrids=fu(E.state.lightProbeGridArray),O.currentProgram=jt,O.uniformsList=null,jt}function Gp(S,D,V,O,k){let ft=Ft.get(S),St=ft.currentProgram.id+","+O+","+k,ht=ft.programVariants.get(St);return ht===void 0?(ht=lr(S,D,V),ft.programVariants.set(St,ht)):(ft.currentProgram=ht,ft.uniformsList=null,ft.outputColorSpace=O,ft.toneMapping=k),ht}function du(S){if(S.uniformsList===null){let D=S.currentProgram.getUniforms();S.uniformsList=js.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function pu(S,D){let V=Ft.get(S);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function Hp(S,D,V,O,k){D.isScene!==!0&&(D=pn),kt.resetTextureUnits();let ft=D.fog,St=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,ht=nt===null?R.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:zt.workingColorSpace,yt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Et=T.get(O.envMap||St,yt),Vt=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,jt=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Mt=!!V.morphAttributes.position,Kt=!!V.morphAttributes.normal,Me=!!V.morphAttributes.color,ue=qn;O.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ue=R.toneMapping);let he=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,qe=he!==void 0?he.length:0,bt=Ft.get(O),je=E.state.lights;if(we===!0&&(nn===!0||S!==tt)){let ge=S===tt&&O.id===W;J.setState(O,S,ge)}let ee=!1,zi=!1;O.version===bt.__version?bt.needsLights&&bt.lightsStateVersion!==je.state.version||k.isBatchedMesh&&bt.batching===!1||!k.isBatchedMesh&&bt.batching===!0||k.isBatchedMesh&&bt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&bt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&bt.instancing===!1||!k.isInstancedMesh&&bt.instancing===!0||k.isSkinnedMesh&&bt.skinning===!1||!k.isSkinnedMesh&&bt.skinning===!0||k.isInstancedMesh&&bt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&bt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&bt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&bt.instancingMorph===!1&&k.morphTexture!==null||bt.envMap!==Et||O.fog===!0&&bt.fog!==ft||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==J.numPlanes||bt.numIntersection!==J.numIntersection)||bt.vertexAlphas!==Vt||bt.vertexTangents!==jt||bt.morphTargets!==Mt||bt.morphNormals!==Kt||bt.morphColors!==Me||bt.morphTargetsCount!==qe||bt.numLightProbeGrids!==fu(E.state.lightProbeGridArray)?ee=!0:(bt.outputColorSpace!==ht||bt.toneMapping!==ue)&&(zi=!0):(ee=!0,bt.__version=O.version);let $e=bt.currentProgram;(ee===!0||zi===!0)&&($e=zi===!0?Gp(O,D,k,ht,ue):lr(O,D,k),U&&O.isNodeMaterial&&U.onUpdateProgram(O,$e,bt));let Ro=!1,xi=!1,Vi=!1,Qt=$e.getUniforms(),He=bt.uniforms;if(pt.useProgram($e.program)&&(Ro=!0,xi=!0,Vi=!0),O.id!==W&&(W=O.id,xi=!0),Ro||tt!==S){pt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Qt.setValue(N,"projectionMatrix",S.projectionMatrix),Qt.setValue(N,"viewMatrix",S.matrixWorldInverse);let Ne=Qt.map.cameraPosition;Ne!==void 0&&Ne.setValue(N,Bn.setFromMatrixPosition(S.matrixWorld)),pe.logarithmicDepthBuffer&&Qt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Qt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),tt!==S&&(tt=S,xi=!0,Vi=!0)}if(bt.needsLights&&(je.state.sunShadowMap.length>0&&Qt.setValue(N,"sunShadowMap",je.state.sunShadowMap,kt),je.state.directionalShadowMap.length>0&&Qt.setValue(N,"directionalShadowMap",je.state.directionalShadowMap,kt),je.state.spotShadowMap.length>0&&Qt.setValue(N,"spotShadowMap",je.state.spotShadowMap,kt),je.state.pointShadowMap.length>0&&Qt.setValue(N,"pointShadowMap",je.state.pointShadowMap,kt)),k.isSkinnedMesh){Qt.setOptional(N,k,"bindMatrix"),Qt.setOptional(N,k,"bindMatrixInverse");let ge=k.skeleton;ge&&(ge.boneTexture===null&&ge.computeBoneTexture(),Qt.setValue(N,"boneTexture",ge.boneTexture,kt))}k.isBatchedMesh&&(Qt.setOptional(N,k,"batchingTexture"),Qt.setValue(N,"batchingTexture",k._matricesTexture,kt),Qt.setOptional(N,k,"batchingIdTexture"),Qt.setValue(N,"batchingIdTexture",k._indirectTexture,kt),Qt.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&Qt.setValue(N,"batchingColorTexture",k._colorsTexture,kt));let Tn=V.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&j.update(k,V,$e),(xi||bt.receiveShadow!==k.receiveShadow)&&(bt.receiveShadow=k.receiveShadow,Qt.setValue(N,"receiveShadow",k.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(He.envMapIntensity.value=D.environmentIntensity),He.dfgLUT!==void 0&&(He.dfgLUT.value=Uv()),xi){if(Qt.setValue(N,"toneMappingExposure",R.toneMappingExposure),bt.needsLights&&Wp(He,Vi),ft&&O.fog===!0&&ot.refreshFogUniforms(He,ft),ot.refreshMaterialUniforms(He,O,mt,Ct,E.state.transmissionRenderTarget[S.id]),bt.needsLights&&bt.numLightProbeGrids>0){let ge=M,Ne=0;for(let Jn of E.state.lightProbeGridArray)Jn.texture!==null&&(ge.textures[Ne]=Jn.texture,ge.min[Ne]=Jn.boundingBox.min,ge.max[Ne]=Jn.boundingBox.max,ge.resolution[Ne]=Jn.resolution,Ne++);for(let Jn in ge)ge[Jn].length=Ne;He.probesSH.value=ge.textures,He.probesMin.value=ge.min,He.probesMax.value=ge.max,He.probesResolution.value=ge.resolution}js.upload(N,du(bt),He,kt)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(js.upload(N,du(bt),He,kt),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Qt.setValue(N,"center",k.center),Qt.setValue(N,"modelViewMatrix",k.modelViewMatrix),Qt.setValue(N,"normalMatrix",k.normalMatrix),Qt.setValue(N,"modelMatrix",k.matrixWorld),O.uniformsGroups!==void 0){let ge=O.uniformsGroups;for(let Ne=0,Jn=ge.length;Ne<Jn;Ne++){let gu=ge[Ne];At.update(gu,$e),At.bind(gu,$e)}}return $e}function Wp(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.sunLights.needsUpdate=D,S.sunLightShadows.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Xp(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(S,D,V){let O=Ft.get(S);O.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),Ft.get(S.texture).__webglTexture=D,Ft.get(S.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){let V=Ft.get(S);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,V=0){nt=S,X=D,G=V;let O=null,k=!1,ft=!1;if(S){let ht=Ft.get(S);if(ht.__useDefaultFramebuffer!==void 0){pt.bindFramebuffer(N.FRAMEBUFFER,ht.__webglFramebuffer),et.copy(S.viewport),vt.copy(S.scissor),Dt=S.scissorTest,pt.viewport(et),pt.scissor(vt),pt.setScissorTest(Dt),W=-1;return}else if(ht.__webglFramebuffer===void 0)kt.setupRenderTarget(S);else if(ht.__hasExternalTextures)kt.rebindTextures(S,Ft.get(S.texture).__webglTexture,Ft.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Vt=S.depthTexture;if(ht.__boundDepthTexture!==Vt){if(Vt!==null&&Ft.has(Vt)&&(S.width!==Vt.image.width||S.height!==Vt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(S)}}let yt=S.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(ft=!0);let Et=Ft.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Et[D])?O=Et[D][V]:O=Et[D],k=!0):S.samples>0&&kt.useMultisampledRTT(S)===!1?O=Ft.get(S).__webglMultisampledFramebuffer:Array.isArray(Et)?O=Et[V]:O=Et,et.copy(S.viewport),vt.copy(S.scissor),Dt=S.scissorTest}else et.copy(Lt).multiplyScalar(mt).floor(),vt.copy(te).multiplyScalar(mt).floor(),Dt=se;if(V!==0&&(O=z),pt.bindFramebuffer(N.FRAMEBUFFER,O)&&pt.drawBuffers(S,O),pt.viewport(et),pt.scissor(vt),pt.setScissorTest(Dt),k){let ht=Ft.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht.__webglTexture,V)}else if(ft){let ht=D;for(let yt=0;yt<S.textures.length;yt++){let Et=Ft.get(S.textures[yt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+yt,Et.__webglTexture,V,ht)}}else if(S!==null&&V!==0){let ht=Ft.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ht.__webglTexture,V)}W=-1};function mu(S){let D=Ft.get(S);return(D.__readFormat!==S.format||D.__readType!==S.type)&&(D.__readFormat=S.format,D.__readType=S.type,D.__formatReadable=pe.textureFormatReadable(S.format),D.__typeReadable=pe.textureTypeReadable(S.type)),D}this.readRenderTargetPixels=function(S,D,V,O,k,ft,St,ht=0){if(!(S&&S.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=Ft.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(yt=yt[St],Array.isArray(yt)&&(yt=yt[0])),yt){pt.bindFramebuffer(N.FRAMEBUFFER,yt);try{let Et=S.textures[ht],Vt=Et.format,jt=Et.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht);let Mt=mu(Et);if(Mt.__formatReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-O&&V>=0&&V<=S.height-k&&N.readPixels(D,V,O,k,rt.convert(Vt),rt.convert(jt),ft)}finally{let Et=nt!==null?Ft.get(nt).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(S,D,V,O,k,ft,St,ht=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=Ft.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(yt=yt[St],Array.isArray(yt)&&(yt=yt[0])),yt)if(D>=0&&D<=S.width-O&&V>=0&&V<=S.height-k){pt.bindFramebuffer(N.FRAMEBUFFER,yt);let Et=S.textures[ht],Vt=Et.format,jt=Et.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht);let Mt=mu(Et);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Kt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Kt),N.bufferData(N.PIXEL_PACK_BUFFER,ft.byteLength,N.STREAM_READ),N.readPixels(D,V,O,k,rt.convert(Vt),rt.convert(jt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let Me=nt!==null?Ft.get(nt).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,Me);let ue=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await rd(N,ue,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Kt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ft),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(Kt),N.deleteSync(ue),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,V=0){let O=Math.pow(2,-V),k=Math.floor(S.image.width*O),ft=Math.floor(S.image.height*O),St=D!==null?D.x:0,ht=D!==null?D.y:0;kt.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,St,ht,k,ft),pt.unbindTexture()},this.copyTextureToTexture=function(S,D,V=null,O=null,k=0,ft=0){let St,ht,yt,Et,Vt,jt,Mt,Kt,Me,ue=S.isCompressedTexture?S.mipmaps[ft]:S.image;if(V!==null)St=V.max.x-V.min.x,ht=V.max.y-V.min.y,yt=V.isBox3?V.max.z-V.min.z:1,Et=V.min.x,Vt=V.min.y,jt=V.isBox3?V.min.z:0;else{let Qt=Math.pow(2,-k);St=Math.floor(ue.width*Qt),ht=Math.floor(ue.height*Qt),S.isDataArrayTexture?yt=ue.depth:S.isData3DTexture?yt=Math.floor(ue.depth*Qt):yt=1,Et=0,Vt=0,jt=0}O!==null?(Mt=O.x,Kt=O.y,Me=O.z):(Mt=0,Kt=0,Me=0);let he=rt.convert(D.format),qe=rt.convert(D.type),bt;D.isData3DTexture?(kt.setTexture3D(D,0),bt=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(kt.setTexture2DArray(D,0),bt=N.TEXTURE_2D_ARRAY):(kt.setTexture2D(D,0),bt=N.TEXTURE_2D),pt.activeTexture(N.TEXTURE0),pt.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),pt.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),pt.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);let je=pt.getParameter(N.UNPACK_ROW_LENGTH),ee=pt.getParameter(N.UNPACK_IMAGE_HEIGHT),zi=pt.getParameter(N.UNPACK_SKIP_PIXELS),$e=pt.getParameter(N.UNPACK_SKIP_ROWS),Ro=pt.getParameter(N.UNPACK_SKIP_IMAGES);pt.pixelStorei(N.UNPACK_ROW_LENGTH,ue.width),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ue.height),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,Et),pt.pixelStorei(N.UNPACK_SKIP_ROWS,Vt),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,jt);let xi=S.isDataArrayTexture||S.isData3DTexture,Vi=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){let Qt=Ft.get(S),He=Ft.get(D),Tn=Ft.get(Qt.__renderTarget),ge=Ft.get(He.__renderTarget);pt.bindFramebuffer(N.READ_FRAMEBUFFER,Tn.__webglFramebuffer),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Ne=0;Ne<yt;Ne++)xi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ft.get(S).__webglTexture,k,jt+Ne),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ft.get(D).__webglTexture,ft,Me+Ne)),N.blitFramebuffer(Et,Vt,Et+St,Vt+ht,Mt,Kt,Mt+St,Kt+ht,N.DEPTH_BUFFER_BIT,N.NEAREST);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||Ft.has(S)){let Qt=Ft.get(S),He=Ft.get(D);pt.bindFramebuffer(N.READ_FRAMEBUFFER,P),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,H);for(let Tn=0;Tn<yt;Tn++)xi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Qt.__webglTexture,k,jt+Tn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Qt.__webglTexture,k),Vi?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,He.__webglTexture,ft,Me+Tn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,He.__webglTexture,ft),k!==0?N.blitFramebuffer(Et,Vt,Et+St,Vt+ht,Mt,Kt,Mt+St,Kt+ht,N.COLOR_BUFFER_BIT,N.NEAREST):Vi?N.copyTexSubImage3D(bt,ft,Mt,Kt,Me+Tn,Et,Vt,St,ht):N.copyTexSubImage2D(bt,ft,Mt,Kt,Et,Vt,St,ht);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Vi?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(bt,ft,Mt,Kt,Me,St,ht,yt,he,qe,ue.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,ft,Mt,Kt,Me,St,ht,yt,he,ue.data):N.texSubImage3D(bt,ft,Mt,Kt,Me,St,ht,yt,he,qe,ue):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ft,Mt,Kt,St,ht,he,qe,ue.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ft,Mt,Kt,ue.width,ue.height,he,ue.data):N.texSubImage2D(N.TEXTURE_2D,ft,Mt,Kt,St,ht,he,qe,ue);pt.pixelStorei(N.UNPACK_ROW_LENGTH,je),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ee),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,zi),pt.pixelStorei(N.UNPACK_SKIP_ROWS,$e),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,Ro),ft===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&N.generateMipmap(bt),pt.unbindTexture()},this.initRenderTarget=function(S){Ft.get(S).__webglFramebuffer===void 0&&kt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?kt.setTextureCube(S,0):S.isData3DTexture?kt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?kt.setTexture2DArray(S,0):kt.setTexture2D(S,0),pt.unbindTexture()},this.resetState=function(){X=0,G=0,nt=null,pt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=zt._getUnpackColorSpace()}};Nt();Nt();var wn=Uint8Array,Qs=Uint16Array,Bv=Int32Array,Zd=new wn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Jd=new wn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),kv=new wn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),jd=function(i,t){for(var e=new Qs(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new Bv(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return{b:e,r:s}},Kd=jd(Zd,2),Qd=Kd.b,zv=Kd.r;Qd[28]=258,zv[258]=28;var tp=jd(Jd,0),Vv=tp.b,l1=tp.r,Fh=new Qs(32768);for(ie=0;ie<32768;++ie)pi=(ie&43690)>>1|(ie&21845)<<1,pi=(pi&52428)>>2|(pi&13107)<<2,pi=(pi&61680)>>4|(pi&3855)<<4,Fh[ie]=((pi&65280)>>8|(pi&255)<<8)>>1;var pi,ie,ho=(function(i,t,e){for(var n=i.length,s=0,r=new Qs(t);s<n;++s)i[s]&&++r[i[s]-1];var o=new Qs(t);for(s=1;s<t;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(e){a=new Qs(1<<t);var l=15-t;for(s=0;s<n;++s)if(i[s])for(var c=s<<4|i[s],h=t-i[s],u=o[i[s]-1]++<<h,f=u|(1<<h)-1;u<=f;++u)a[Fh[u]>>l]=c}else for(a=new Qs(n),s=0;s<n;++s)i[s]&&(a[s]=Fh[o[i[s]-1]++]>>15-i[s]);return a}),uo=new wn(288);for(ie=0;ie<144;++ie)uo[ie]=8;var ie;for(ie=144;ie<256;++ie)uo[ie]=9;var ie;for(ie=256;ie<280;++ie)uo[ie]=7;var ie;for(ie=280;ie<288;++ie)uo[ie]=8;var ie,ep=new wn(32);for(ie=0;ie<32;++ie)ep[ie]=5;var ie;var Gv=ho(uo,9,1);var Hv=ho(ep,5,1),Lh=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},Nn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},Dh=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},Wv=function(i){return(i+7)/8|0},Xv=function(i,t,e){return(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length),new wn(i.subarray(t,e))};var qv=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Un=function(i,t,e){var n=new Error(t||qv[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Un),!e)throw n;return n},$v=function(i,t,e,n){var s=i.length,r=n?n.length:0;if(!s||t.f&&!t.l)return e||new wn(0);var o=!e,a=o||t.i!=2,l=t.i;o&&(e=new wn(s*3));var c=function(Lt){var te=e.length;if(Lt>te){var se=new wn(Math.max(te*2,Lt));se.set(e),e=se}},h=t.f||0,u=t.p||0,f=t.b||0,d=t.l,p=t.d,y=t.m,m=t.n,g=s*8;do{if(!d){h=Nn(i,u,1);var v=Nn(i,u+1,3);if(u+=3,v)if(v==1)d=Gv,p=Hv,y=9,m=5;else if(v==2){var E=Nn(i,u,31)+257,x=Nn(i,u+10,15)+4,b=E+Nn(i,u+5,31)+1;u+=14;for(var I=new wn(b),R=new wn(19),L=0;L<x;++L)R[kv[L]]=Nn(i,u+L*3,7);u+=x*3;for(var U=Lh(R),z=(1<<U)-1,P=ho(R,U,1),L=0;L<b;){var H=P[Nn(i,u,z)];u+=H&15;var w=H>>4;if(w<16)I[L++]=w;else{var X=0,G=0;for(w==16?(G=3+Nn(i,u,3),u+=2,X=I[L-1]):w==17?(G=3+Nn(i,u,7),u+=3):w==18&&(G=11+Nn(i,u,127),u+=7);G--;)I[L++]=X}}var nt=I.subarray(0,E),W=I.subarray(E);y=Lh(nt),m=Lh(W),d=ho(nt,y,1),p=ho(W,m,1)}else Un(1);else{var w=Wv(u)+4,M=i[w-4]|i[w-3]<<8,A=w+M;if(A>s){l&&Un(0);break}a&&c(f+M),e.set(i.subarray(w,A),f),t.b=f+=M,t.p=u=A*8,t.f=h;continue}if(u>g){l&&Un(0);break}}a&&c(f+131072);for(var tt=(1<<y)-1,et=(1<<m)-1,vt=u;;vt=u){var X=d[Dh(i,u)&tt],Dt=X>>4;if(u+=X&15,u>g){l&&Un(0);break}if(X||Un(2),Dt<256)e[f++]=Dt;else if(Dt==256){vt=u,d=null;break}else{var Z=Dt-254;if(Dt>264){var L=Dt-257,dt=Zd[L];Z=Nn(i,u,(1<<dt)-1)+Qd[L],u+=dt}var _t=p[Dh(i,u)&et],Ct=_t>>4;_t||Un(3),u+=_t&15;var W=Vv[Ct];if(Ct>3){var dt=Jd[Ct];W+=Dh(i,u)&(1<<dt)-1,u+=dt}if(u>g){l&&Un(0);break}a&&c(f+131072);var mt=f+Z;if(f<W){var Bt=r-W,ve=Math.min(W,mt);for(Bt+f<0&&Un(3);f<ve;++f)e[f]=n[Bt+f]}for(;f<mt;++f)e[f]=e[f-W]}}t.l=d,t.p=vt,t.b=f,t.f=h,d&&(h=1,t.m=y,t.d=p,t.n=m)}while(!h);return f!=e.length&&o?Xv(e,0,f):e.subarray(0,f)};var Yv=new wn(0);var Zv=function(i,t){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&Un(6,"invalid zlib data"),(i[1]>>5&1)==+!t&&Un(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function np(i,t){return $v(i.subarray(Zv(i,t&&t.dictionary),-4),{i:2},t&&t.out,t&&t.dictionary)}var Jv=typeof TextDecoder<"u"&&new TextDecoder,jv=0;try{Jv.decode(Yv,{stream:!0}),jv=1}catch{}Nt();Nt();function ip(i,t,e){let n=e.length-i-1;if(t>=e[n])return n-1;if(t<=e[i])return i;let s=i,r=n,o=Math.floor((s+r)/2);for(;t<e[o]||t>=e[o+1];)t<e[o]?r=o:s=o,o=Math.floor((s+r)/2);return o}function Kv(i,t,e,n){let s=[],r=[],o=[];s[0]=1;for(let a=1;a<=e;++a){r[a]=t-n[i+1-a],o[a]=n[i+a]-t;let l=0;for(let c=0;c<a;++c){let h=o[c+1],u=r[a-c],f=s[c]/(h+u);s[c]=l+h*f,l=u*f}s[a]=l}return s}function sp(i,t,e,n){let s=ip(i,n,t),r=Kv(s,n,i,t),o=new Zt(0,0,0,0);for(let a=0;a<=i;++a){let l=e[s-i+a],c=r[a],h=l.w*c;o.x+=l.x*h,o.y+=l.y*h,o.z+=l.z*h,o.w+=l.w*c}return o}function Qv(i,t,e,n,s){let r=[];for(let u=0;u<=e;++u)r[u]=0;let o=[];for(let u=0;u<=n;++u)o[u]=r.slice(0);let a=[];for(let u=0;u<=e;++u)a[u]=r.slice(0);a[0][0]=1;let l=r.slice(0),c=r.slice(0);for(let u=1;u<=e;++u){l[u]=t-s[i+1-u],c[u]=s[i+u]-t;let f=0;for(let d=0;d<u;++d){let p=c[d+1],y=l[u-d];a[u][d]=p+y;let m=a[d][u-1]/a[u][d];a[d][u]=f+p*m,f=y*m}a[u][u]=f}for(let u=0;u<=e;++u)o[0][u]=a[u][e];for(let u=0;u<=e;++u){let f=0,d=1,p=[];for(let y=0;y<=e;++y)p[y]=r.slice(0);p[0][0]=1;for(let y=1;y<=n;++y){let m=0,g=u-y,v=e-y;u>=y&&(p[d][0]=p[f][0]/a[v+1][g],m=p[d][0]*a[g][v]);let w=g>=-1?1:-g,M=u-1<=v?y-1:e-u;for(let E=w;E<=M;++E)p[d][E]=(p[f][E]-p[f][E-1])/a[v+1][g+E],m+=p[d][E]*a[g+E][v];u<=v&&(p[d][y]=-p[f][y-1]/a[v+1][u],m+=p[d][y]*a[u][v]),o[y][u]=m;let A=f;f=d,d=A}}let h=e;for(let u=1;u<=n;++u){for(let f=0;f<=e;++f)o[u][f]*=h;h*=e-u}return o}function tS(i,t,e,n,s){let r=s<i?s:i,o=[],a=ip(i,n,t),l=Qv(a,n,i,r,t),c=[];for(let h=0;h<e.length;++h){let u=e[h].clone(),f=u.w;u.x*=f,u.y*=f,u.z*=f,c[h]=u}for(let h=0;h<=r;++h){let u=c[a-i].clone().multiplyScalar(l[h][0]);for(let f=1;f<=i;++f)u.add(c[a-i+f].clone().multiplyScalar(l[h][f]));o[h]=u}for(let h=r+1;h<=s+1;++h)o[h]=new Zt(0,0,0);return o}function eS(i,t){let e=1;for(let s=2;s<=i;++s)e*=s;let n=1;for(let s=2;s<=t;++s)n*=s;for(let s=2;s<=i-t;++s)n*=s;return e/n}function nS(i){let t=i.length,e=[],n=[];for(let r=0;r<t;++r){let o=i[r];e[r]=new F(o.x,o.y,o.z),n[r]=o.w}let s=[];for(let r=0;r<t;++r){let o=e[r].clone();for(let a=1;a<=r;++a)o.sub(s[r-a].clone().multiplyScalar(eS(r,a)*n[a]));s[r]=o.divideScalar(n[0])}return s}function rp(i,t,e,n,s){let r=tS(i,t,e,n,s);return nS(r)}var Sl=class extends Nr{constructor(t,e,n,s,r){super();let o=e?e.length-1:0,a=n?n.length:0;this.degree=t,this.knots=e,this.controlPoints=[],this.startKnot=s||0,this.endKnot=r||o;for(let l=0;l<a;++l){let c=n[l];this.controlPoints[l]=new Zt(c.x,c.y,c.z,c.w)}}getPoint(t,e=new F){let n=e,s=this.knots[this.startKnot]+t*(this.knots[this.endKnot]-this.knots[this.startKnot]),r=sp(this.degree,this.knots,this.controlPoints,s);return r.w!==1&&r.divideScalar(r.w),n.set(r.x,r.y,r.z)}getTangent(t,e=new F){let n=e,s=this.knots[0]+t*(this.knots[this.knots.length-1]-this.knots[0]),r=rp(this.degree,this.knots,this.controlPoints,s,1);return n.copy(r[1]).normalize(),n}copy(t){return super.copy(t),this.degree=t.degree,this.knots=[...t.knots],this.controlPoints=t.controlPoints.map(e=>e.clone()),this.startKnot=t.startKnot,this.endKnot=t.endKnot,this}toJSON(){let t=super.toJSON();return t.degree=this.degree,t.knots=[...this.knots],t.controlPoints=this.controlPoints.map(e=>e.toArray()),t.startKnot=this.startKnot,t.endKnot=this.endKnot,t}fromJSON(t){return super.fromJSON(t),this.degree=t.degree,this.knots=[...t.knots],this.controlPoints=t.controlPoints.map(e=>new Zt(e[0],e[1],e[2],e[3])),this.startKnot=t.startKnot,this.endKnot=t.endKnot,this}};var Gt,Se,Pe,bl=class extends Ln{constructor(t){super(t),this.trimAnimationClips=!1}load(t,e,n,s){let r=this,o=r.path===""?Jr.extractUrlBase(t):r.path,a=new Wr(this.manager);a.setPriority(this.priority),a.setCache(this.cache),a.setPath(r.path),a.setResponseType("arraybuffer"),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(l){try{e(r.parse(l,o))}catch(c){s?s(c):console.error(c),r.manager.itemError(t)}},n,s)}parse(t,e){if(sS(t))Gt=new Gh().parse(t);else{let s=lp(t);if(!rS(s))throw new Error("THREE.FBXLoader: Unknown format.");if(op(s)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+op(s));Gt=new Vh().parse(s)}let n=new is(this.manager).setPath(this.resourcePath||e).setCrossOrigin(this.crossOrigin);return n.setPriority(this.priority),n.setCache(this.cache),new Bh(n,this.manager,this.trimAnimationClips).parse(Gt)}},Bh=class{constructor(t,e,n){this.textureLoader=t,this.manager=e,this.trimAnimationClips=n}parse(){Se=this.parseConnections();let t=this.parseImages(),e=this.parseTextures(t),n=this.parseMaterials(e),s=this.parseDeformers(),r=new kh().parse(s);return this.parseScene(s,r,n),Pe}parseConnections(){let t=new Map;return"Connections"in Gt&&Gt.Connections.connections.forEach(function(n){let s=n[0],r=n[1],o=n[2];t.has(s)||t.set(s,{parents:[],children:[]});let a={ID:r,relationship:o};t.get(s).parents.push(a),t.has(r)||t.set(r,{parents:[],children:[]});let l={ID:s,relationship:o};t.get(r).children.push(l)}),t}parseImages(){let t={},e={};if("Video"in Gt.Objects){let n=Gt.Objects.Video;for(let s in n){let r=n[s],o=parseInt(s);if(t[o]=r.RelativeFilename||r.Filename,"Content"in r){let a=r.Content instanceof ArrayBuffer&&r.Content.byteLength>0,l=typeof r.Content=="string"&&r.Content!=="";if(a||l){let c=this.parseImage(n[s]);e[r.RelativeFilename||r.Filename]=c}}}}for(let n in t){let s=t[n];e[s]!==void 0?t[n]=e[s]:t[n]=t[n].split("\\").pop()}return t}parseImage(t){let e=t.Content,n=t.RelativeFilename||t.Filename,s=n.slice(n.lastIndexOf(".")+1).toLowerCase(),r;switch(s){case"bmp":r="image/bmp";break;case"jpg":case"jpeg":r="image/jpeg";break;case"png":r="image/png";break;case"tif":r="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),r="image/tga";break;case"webp":r="image/webp";break;default:console.warn('FBXLoader: Image type "'+s+'" is not supported.');return}if(typeof e=="string")return"data:"+r+";base64,"+e;{let o=new Uint8Array(e);return URL.createObjectURL(new Blob([o],{type:r}))}}parseTextures(t){let e=new Map;if("Texture"in Gt.Objects){let n=Gt.Objects.Texture;for(let s in n){let r=this.parseTexture(n[s],t);e.set(parseInt(s),r)}}return e}parseTexture(t,e){let n=this.loadTexture(t,e);n.ID=t.id,n.name=t.attrName;let s=t.WrapModeU,r=t.WrapModeV,o=s!==void 0?s.value:0,a=r!==void 0?r.value:0;if(n.wrapS=o===0?Yi:fn,n.wrapT=a===0?Yi:fn,"Scaling"in t){let l=t.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in t){let l=t.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(t,e){let n=t.FileName.split(".").pop().toLowerCase(),s=this.manager.getHandler(`.${n}`);s===null&&(s=this.textureLoader);let r=s.path;r||s.setPath(this.textureLoader.path);let o=Se.get(t.id).children,a;if(o!==void 0&&o.length>0&&e[o[0].ID]!==void 0&&(a=e[o[0].ID],(a.indexOf("blob:")===0||a.indexOf("data:")===0)&&s.setPath(void 0)),a===void 0)return console.warn("FBXLoader: Undefined filename, creating placeholder texture."),new ke;let l=s.load(a);return s.setPath(r),l}parseMaterials(t){let e=new Map;if("Material"in Gt.Objects){let n=Gt.Objects.Material;for(let s in n){let r=this.parseMaterial(n[s],t);r!==null&&e.set(parseInt(s),r)}}return e}parseMaterial(t,e){let n=t.id,s=t.attrName,r=t.ShadingModel;if(typeof r=="object"&&(r=r.value),!Se.has(n))return null;let o=this.parseParameters(t,e,n),a;switch(r.toLowerCase()){case"phong":a=new Ci;break;case"lambert":a=new Vr;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',r),a=new Ci;break}return a.setValues(o),a.name=s,a}parseParameters(t,e,n){let s={};t.BumpFactor&&(s.bumpScale=t.BumpFactor.value),t.Diffuse?s.color=zt.colorSpaceToWorking(new It().fromArray(t.Diffuse.value),ne):t.DiffuseColor&&(t.DiffuseColor.type==="Color"||t.DiffuseColor.type==="ColorRGB")&&(s.color=zt.colorSpaceToWorking(new It().fromArray(t.DiffuseColor.value),ne)),t.DisplacementFactor&&(s.displacementScale=t.DisplacementFactor.value),t.Emissive?s.emissive=zt.colorSpaceToWorking(new It().fromArray(t.Emissive.value),ne):t.EmissiveColor&&(t.EmissiveColor.type==="Color"||t.EmissiveColor.type==="ColorRGB")&&(s.emissive=zt.colorSpaceToWorking(new It().fromArray(t.EmissiveColor.value),ne)),t.EmissiveFactor&&(s.emissiveIntensity=parseFloat(t.EmissiveFactor.value)),s.opacity=1-(t.TransparencyFactor?parseFloat(t.TransparencyFactor.value):0),(s.opacity===1||s.opacity===0)&&(s.opacity=t.Opacity?parseFloat(t.Opacity.value):null,s.opacity===null&&(s.opacity=1)),s.opacity<1&&(s.transparent=!0),t.ReflectionFactor&&(s.reflectivity=t.ReflectionFactor.value),t.Shininess&&(s.shininess=t.Shininess.value),t.Specular?s.specular=zt.colorSpaceToWorking(new It().fromArray(t.Specular.value),ne):t.SpecularColor&&t.SpecularColor.type==="Color"&&(s.specular=zt.colorSpaceToWorking(new It().fromArray(t.SpecularColor.value),ne));let r=this;return Se.get(n).children.forEach(function(o){let a=o.relationship;switch(a){case"Bump":s.bumpMap=r.getTexture(e,o.ID);break;case"Maya|TEX_ao_map":s.aoMap=r.getTexture(e,o.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":s.map=r.getTexture(e,o.ID),s.map!==void 0&&(s.map.colorSpace=ne);break;case"DisplacementColor":s.displacementMap=r.getTexture(e,o.ID);break;case"EmissiveColor":s.emissiveMap=r.getTexture(e,o.ID),s.emissiveMap!==void 0&&(s.emissiveMap.colorSpace=ne);break;case"NormalMap":case"Maya|TEX_normal_map":s.normalMap=r.getTexture(e,o.ID);break;case"ReflectionColor":s.envMap=r.getTexture(e,o.ID),s.envMap!==void 0&&(s.envMap.mapping=Ys,s.envMap.colorSpace=ne);break;case"SpecularColor":s.specularMap=r.getTexture(e,o.ID),s.specularMap!==void 0&&(s.specularMap.colorSpace=ne);break;case"TransparentColor":case"TransparencyFactor":s.alphaMap=r.getTexture(e,o.ID),s.transparent=!0;break;default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),s}getTexture(t,e){return"LayeredTexture"in Gt.Objects&&e in Gt.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),e=Se.get(e).children[0].ID),t.get(e)}parseDeformers(){let t={},e={};if("Deformer"in Gt.Objects){let n=Gt.Objects.Deformer;for(let s in n){let r=n[s],o=Se.get(parseInt(s));if(r.attrType==="Skin"){let a=this.parseSkeleton(o,n);a.ID=s,o.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=o.parents[0].ID,t[s]=a}else if(r.attrType==="BlendShape"){let a={id:s};a.rawTargets=this.parseMorphTargets(o,n),a.id=s,o.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),e[s]=a}}}return{skeletons:t,morphTargets:e}}parseSkeleton(t,e){let n=[];return t.children.forEach(function(s){let r=e[s.ID];if(r.attrType!=="Cluster")return;let o={ID:s.ID,indices:[],weights:[],transformLink:new wt().fromArray(r.TransformLink.a)};"Indexes"in r&&(o.indices=r.Indexes.a,o.weights=r.Weights.a),n.push(o)}),{rawBones:n,bones:[]}}parseMorphTargets(t,e){let n=[];for(let s=0;s<t.children.length;s++){let r=t.children[s],o=e[r.ID],a={name:o.attrName,initialWeight:o.DeformPercent,id:o.id,fullWeights:o.FullWeights.a};if(o.attrType!=="BlendShapeChannel")return;a.geoID=Se.get(parseInt(r.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(t,e,n){Pe=new Ke;let s=this.parseModels(t.skeletons,e,n),r=Gt.Objects.Model,o=this;s.forEach(function(u){let f=r[u.ID];o.setLookAtProperties(u,f),Se.get(u.ID).parents.forEach(function(p){let y=s.get(p.ID);y!==void 0&&y.add(u)}),u.parent===null&&Pe.add(u)}),this.addGlobalSceneSettings(),Pe.traverse(function(u){if(u.userData.transformData){u.parent&&(u.userData.transformData.parentMatrix=u.parent.matrix,u.userData.transformData.parentMatrixWorld=u.parent.matrixWorld);let f=ap(u.userData.transformData);u.applyMatrix4(f),u.updateWorldMatrix()}});let a=this.parsePoseNodes(),l=new Set;for(let u in t.skeletons)t.skeletons[u].rawBones.forEach(function(f,d){let p=t.skeletons[u].bones[d];p&&l.add(p.ID)});let c=new wt;Pe.traverse(function(u){if(u.isBone&&u.ID!==void 0&&!l.has(u.ID)){let f=a[u.ID];f!==void 0&&(u.parent?(c.copy(u.parent.matrixWorld).invert(),c.multiply(f)):c.copy(f),c.decompose(u.position,u.quaternion,u.scale),u.updateMatrix(),u.matrixWorld.copy(f))}}),this.bindSkeleton(t.skeletons,e,s);let h=new zh(this.trimAnimationClips).parse();Pe.children.length===1&&Pe.children[0].isGroup&&(Pe.children[0].animations=h,Object.assign(Pe.children[0].userData,Pe.userData),Pe=Pe.children[0]),Pe.animations=h,"GlobalSettings"in Gt&&"UpAxis"in Gt.GlobalSettings&&Gt.GlobalSettings.UpAxis.value===2&&(console.warn("THREE.FBXLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted."),Pe.rotation.set(-Math.PI/2,0,0))}parseModels(t,e,n){let s=new Map,r=Gt.Objects.Model;for(let o in r){let a=parseInt(o),l=r[o],c=Se.get(a),h=this.buildSkeleton(c,t,a,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,e,n);break;case"NurbsCurve":h=this.createCurve(c,e);break;case"LimbNode":case"Root":h=new Ki;break;default:h=new Ke;break}h.name=l.attrName?re.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=a}this.getTransformData(h,l),s.set(a,h)}return s}buildSkeleton(t,e,n,s){let r=null;return t.parents.forEach(function(o){for(let a in e){let l=e[a];l.rawBones.forEach(function(c,h){if(c.ID===o.ID){let u=r;r=new Ki,r.matrixWorld.copy(c.transformLink),r.name=s?re.sanitizeNodeName(s):"",r.userData.originalName=s,r.ID=n,l.bones[h]=r,u!==null&&r.add(u)}})}}),r}createCamera(t){let e,n;if(t.children.forEach(function(s){let r=Gt.Objects.NodeAttribute[s.ID];r!==void 0&&(n=r)}),n===void 0)e=new fe;else{let s=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(s=1);let r=1;n.NearPlane!==void 0&&(r=n.NearPlane.value/1e3);let o=1e3;n.FarPlane!==void 0&&(o=n.FarPlane.value/1e3);let a=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,l=n.AspectHeight.value);let c=a/l,h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);let u=n.FocalLength?n.FocalLength.value:null;switch(s){case 0:e=new Te(h,c,r,o),u!==null&&e.setFocalLength(u);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),e=new fe;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+s+"."),e=new fe;break}}return e}createLight(t){let e,n;if(t.children.forEach(function(s){let r=Gt.Objects.NodeAttribute[s.ID];r!==void 0&&(n=r)}),n===void 0)e=new fe;else{let s;n.LightType===void 0?s=0:s=n.LightType.value;let r=16777215;n.Color!==void 0&&(r=zt.colorSpaceToWorking(new It().fromArray(n.Color.value),ne));let o=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(o=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);let l=1;switch(s){case 0:e=new Hs(r,o,a,l);break;case 1:e=new ss(r,o);break;case 2:let c=Math.PI/3,h=0;n.OuterAngle!==void 0?(c=We.degToRad(n.OuterAngle.value),n.InnerAngle!==void 0&&(h=1-n.InnerAngle.value/n.OuterAngle.value,h=Math.max(0,h))):n.InnerAngle!==void 0&&(c=We.degToRad(n.InnerAngle.value)),e=new $r(r,o,a,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),e=new Hs(r,o);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(e.castShadow=!0)}return e}createMesh(t,e,n){let s,r=null,o=null,a=[];if(t.children.forEach(function(l){e.has(l.ID)&&(r=e.get(l.ID)),n.has(l.ID)&&a.push(n.get(l.ID))}),a.length>1?o=a:a.length>0?o=a[0]:(o=new Ci({name:Ln.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(o)),"color"in r.attributes&&a.forEach(function(l){l.vertexColors=!0}),r.groups.length>0){let l=!1;for(let c=0,h=r.groups.length;c<h;c++){let u=r.groups[c];(u.materialIndex<0||u.materialIndex>=a.length)&&(u.materialIndex=a.length,l=!0)}if(l){let c=new Ci;a.push(c)}}return r.FBX_Deformer?(s=new Rr(r,o),s.normalizeSkinWeights()):s=new Re(r,o),s}createCurve(t,e){let n=t.children.reduce(function(r,o){return e.has(o.ID)&&(r=e.get(o.ID)),r},null),s=new Ai({name:Ln.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new Qi(n,s)}getTransformData(t,e){let n={};"InheritType"in e&&(n.inheritType=parseInt(e.InheritType.value)),"RotationOrder"in e?n.eulerOrder=fo(e.RotationOrder.value):n.eulerOrder=fo(0),"Lcl_Translation"in e&&(n.translation=e.Lcl_Translation.value),"PreRotation"in e&&(n.preRotation=e.PreRotation.value),"Lcl_Rotation"in e&&(n.rotation=e.Lcl_Rotation.value),"PostRotation"in e&&(n.postRotation=e.PostRotation.value),"Lcl_Scaling"in e&&(n.scale=e.Lcl_Scaling.value),"ScalingOffset"in e&&(n.scalingOffset=e.ScalingOffset.value),"ScalingPivot"in e&&(n.scalingPivot=e.ScalingPivot.value),"RotationOffset"in e&&(n.rotationOffset=e.RotationOffset.value),"RotationPivot"in e&&(n.rotationPivot=e.RotationPivot.value),t.userData.transformData=n}setLookAtProperties(t,e){"LookAtProperty"in e&&Se.get(t.ID).children.forEach(function(s){if(s.relationship==="LookAtProperty"){let r=Gt.Objects.Model[s.ID];if("Lcl_Translation"in r){let o=r.Lcl_Translation.value;t.target!==void 0?(t.target.position.fromArray(o),Pe.add(t.target)):t.lookAt(new F().fromArray(o))}}})}bindSkeleton(t,e,n){for(let s in t){let r=t[s],o=[];for(let l=0,c=r.bones.length;l<c;l++){let h=new wt;r.bones[l]&&r.rawBones[l]&&h.copy(r.rawBones[l].transformLink).invert(),o.push(h)}Se.get(parseInt(r.ID)).parents.forEach(function(l){if(e.has(l.ID)){let c=l.ID;Se.get(c).parents.forEach(function(u){if(n.has(u.ID)){let f=n.get(u.ID);f.updateMatrixWorld(!0),f.bind(new Ir(r.bones,o),f.matrixWorld)}})}})}}parsePoseNodes(){let t={};if("Pose"in Gt.Objects){let e=Gt.Objects.Pose;for(let n in e)if(e[n].attrType==="BindPose"&&e[n].NbPoseNodes>0){let s=e[n].PoseNode;Array.isArray(s)?s.forEach(function(r){t[r.Node]=new wt().fromArray(r.Matrix.a)}):t[s.Node]=new wt().fromArray(s.Matrix.a)}}return t}addGlobalSceneSettings(){if("GlobalSettings"in Gt){if("AmbientColor"in Gt.GlobalSettings){let t=Gt.GlobalSettings.AmbientColor.value,e=t[0],n=t[1],s=t[2];if(e!==0||n!==0||s!==0){let r=new It().setRGB(e,n,s,ne);Pe.add(new Zr(r,1))}}"UnitScaleFactor"in Gt.GlobalSettings&&(Pe.userData.unitScaleFactor=Gt.GlobalSettings.UnitScaleFactor.value)}}},kh=class{constructor(){this.negativeMaterialIndices=!1}parse(t){let e=new Map;if("Geometry"in Gt.Objects){let n=Gt.Objects.Geometry;for(let s in n){let r=Se.get(parseInt(s)),o=this.parseGeometry(r,n[s],t);e.set(parseInt(s),o)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),e}parseGeometry(t,e,n){switch(e.attrType){case"Mesh":return this.parseMeshGeometry(t,e,n);case"NurbsCurve":return this.parseNurbsGeometry(e)}}parseMeshGeometry(t,e,n){let s=n.skeletons,r=[],o=t.parents.map(function(u){return Gt.Objects.Model[u.ID]});if(o.length===0)return;let a=t.children.reduce(function(u,f){return s[f.ID]!==void 0&&(u=s[f.ID]),u},null);t.children.forEach(function(u){n.morphTargets[u.ID]!==void 0&&r.push(n.morphTargets[u.ID])});let l=o[0],c={};"RotationOrder"in l&&(c.eulerOrder=fo(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);let h=ap(c);return this.genGeometry(e,a,r,h)}genGeometry(t,e,n,s){let r=new ze;t.attrName&&(r.name=t.attrName);let o=this.parseGeoNode(t,e),a=this.genBuffers(o),l=new ce(a.vertex,3);if(l.applyMatrix4(s),r.setAttribute("position",l),a.colors.length>0&&r.setAttribute("color",new ce(a.colors,3)),e&&(r.setAttribute("skinIndex",new Ji(a.weightsIndices,4)),r.setAttribute("skinWeight",new ce(a.vertexWeights,4)),r.FBX_Deformer=e),a.normal.length>0){let c=new Ut().getNormalMatrix(s),h=new ce(a.normal,3);h.applyNormalMatrix(c),r.setAttribute("normal",h)}if(a.uvs.forEach(function(c,h){let u=h===0?"uv":`uv${h}`;r.setAttribute(u,new ce(a.uvs[h],2))}),o.material&&o.material.mappingType!=="AllSame"){let c=a.materialIndex[0],h=0;if(a.materialIndex.forEach(function(u,f){u!==c&&(r.addGroup(h,f-h,c),c=u,h=f)}),r.groups.length>0){let u=r.groups[r.groups.length-1],f=u.start+u.count;f!==a.materialIndex.length&&r.addGroup(f,a.materialIndex.length-f,c)}r.groups.length===0&&r.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(r,t,n,s),r}parseGeoNode(t,e){let n={};if(n.vertexPositions=t.Vertices!==void 0?t.Vertices.a:[],n.vertexIndices=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],t.LayerElementColor&&t.LayerElementColor[0].Colors&&(n.color=this.parseVertexColors(t.LayerElementColor[0])),t.LayerElementMaterial&&(n.material=this.parseMaterialIndices(t.LayerElementMaterial[0])),t.LayerElementNormal&&(n.normal=this.parseNormals(t.LayerElementNormal[0])),t.LayerElementUV){n.uv=[];let s=0;for(;t.LayerElementUV[s];)t.LayerElementUV[s].UV&&n.uv.push(this.parseUVs(t.LayerElementUV[s])),s++}return n.weightTable={},e!==null&&(n.skeleton=e,e.rawBones.forEach(function(s,r){s.indices.forEach(function(o,a){n.weightTable[o]===void 0&&(n.weightTable[o]=[]),n.weightTable[o].push({id:r,weight:s.weights[a]})})})),n}genBuffers(t){let e={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]},n=0,s=0,r=!1,o=[],a=[],l=[],c=[],h=[],u=[],f=this;return t.vertexIndices.forEach(function(d,p){let y,m=!1;d<0&&(d=d^-1,m=!0);let g=[],v=[];if(o.push(d*3,d*3+1,d*3+2),t.color){let w=Ml(p,n,d,t.color);l.push(w[0],w[1],w[2])}if(t.skeleton){if(t.weightTable[d]!==void 0&&t.weightTable[d].forEach(function(w){v.push(w.weight),g.push(w.id)}),v.length>4){r||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),r=!0);let w=[0,0,0,0],M=[0,0,0,0];v.forEach(function(A,E){let x=A,b=g[E];M.forEach(function(I,R,L){if(x>I){L[R]=x,x=I;let U=w[R];w[R]=b,b=U}})}),g=w,v=M}for(;v.length<4;)v.push(0),g.push(0);for(let w=0;w<4;++w)h.push(v[w]),u.push(g[w])}if(t.normal){let w=Ml(p,n,d,t.normal);a.push(w[0],w[1],w[2])}t.material&&t.material.mappingType!=="AllSame"&&(y=Ml(p,n,d,t.material)[0],y<0&&(f.negativeMaterialIndices=!0,y=0)),t.uv&&t.uv.forEach(function(w,M){let A=Ml(p,n,d,w);c[M]===void 0&&(c[M]=[]),c[M].push(A[0]),c[M].push(A[1])}),s++,m&&(f.genFace(e,t,o,y,a,l,c,h,u,s),n++,s=0,o=[],a=[],l=[],c=[],h=[],u=[])}),e}getNormalNewell(t){let e=new F(0,0,0);for(let n=0;n<t.length;n++){let s=t[n],r=t[(n+1)%t.length];e.x+=(s.y-r.y)*(s.z+r.z),e.y+=(s.z-r.z)*(s.x+r.x),e.z+=(s.x-r.x)*(s.y+r.y)}return e.normalize(),e}getNormalTangentAndBitangent(t){let e=this.getNormalNewell(t),s=(Math.abs(e.z)>.5?new F(0,1,0):new F(0,0,1)).cross(e).normalize(),r=e.clone().cross(s).normalize();return{normal:e,tangent:s,bitangent:r}}flattenVertex(t,e,n){return new Wt(t.dot(e),t.dot(n))}genFace(t,e,n,s,r,o,a,l,c,h){let u;if(h>3){let f=[],d=e.baseVertexPositions||e.vertexPositions;for(let g=0;g<n.length;g+=3)f.push(new F(d[n[g]],d[n[g+1]],d[n[g+2]]));let{tangent:p,bitangent:y}=this.getNormalTangentAndBitangent(f),m=[];for(let g of f)m.push(this.flattenVertex(g,p,y));u=kr.triangulateShape(m,[])}else u=[[0,1,2]];for(let[f,d,p]of u)t.vertex.push(e.vertexPositions[n[f*3]]),t.vertex.push(e.vertexPositions[n[f*3+1]]),t.vertex.push(e.vertexPositions[n[f*3+2]]),t.vertex.push(e.vertexPositions[n[d*3]]),t.vertex.push(e.vertexPositions[n[d*3+1]]),t.vertex.push(e.vertexPositions[n[d*3+2]]),t.vertex.push(e.vertexPositions[n[p*3]]),t.vertex.push(e.vertexPositions[n[p*3+1]]),t.vertex.push(e.vertexPositions[n[p*3+2]]),e.skeleton&&(t.vertexWeights.push(l[f*4]),t.vertexWeights.push(l[f*4+1]),t.vertexWeights.push(l[f*4+2]),t.vertexWeights.push(l[f*4+3]),t.vertexWeights.push(l[d*4]),t.vertexWeights.push(l[d*4+1]),t.vertexWeights.push(l[d*4+2]),t.vertexWeights.push(l[d*4+3]),t.vertexWeights.push(l[p*4]),t.vertexWeights.push(l[p*4+1]),t.vertexWeights.push(l[p*4+2]),t.vertexWeights.push(l[p*4+3]),t.weightsIndices.push(c[f*4]),t.weightsIndices.push(c[f*4+1]),t.weightsIndices.push(c[f*4+2]),t.weightsIndices.push(c[f*4+3]),t.weightsIndices.push(c[d*4]),t.weightsIndices.push(c[d*4+1]),t.weightsIndices.push(c[d*4+2]),t.weightsIndices.push(c[d*4+3]),t.weightsIndices.push(c[p*4]),t.weightsIndices.push(c[p*4+1]),t.weightsIndices.push(c[p*4+2]),t.weightsIndices.push(c[p*4+3])),e.color&&(t.colors.push(o[f*3]),t.colors.push(o[f*3+1]),t.colors.push(o[f*3+2]),t.colors.push(o[d*3]),t.colors.push(o[d*3+1]),t.colors.push(o[d*3+2]),t.colors.push(o[p*3]),t.colors.push(o[p*3+1]),t.colors.push(o[p*3+2])),e.material&&e.material.mappingType!=="AllSame"&&(t.materialIndex.push(s),t.materialIndex.push(s),t.materialIndex.push(s)),e.normal&&(t.normal.push(r[f*3]),t.normal.push(r[f*3+1]),t.normal.push(r[f*3+2]),t.normal.push(r[d*3]),t.normal.push(r[d*3+1]),t.normal.push(r[d*3+2]),t.normal.push(r[p*3]),t.normal.push(r[p*3+1]),t.normal.push(r[p*3+2])),e.uv&&e.uv.forEach(function(y,m){t.uvs[m]===void 0&&(t.uvs[m]=[]),t.uvs[m].push(a[m][f*2]),t.uvs[m].push(a[m][f*2+1]),t.uvs[m].push(a[m][d*2]),t.uvs[m].push(a[m][d*2+1]),t.uvs[m].push(a[m][p*2]),t.uvs[m].push(a[m][p*2+1])})}addMorphTargets(t,e,n,s){if(n.length===0)return;t.morphTargetsRelative=!0,t.morphAttributes.position=[];let r=s.clone().setPosition(0,0,0),o=this;n.forEach(function(a){a.rawTargets.forEach(function(l){let c=Gt.Objects.Geometry[l.geoID];c!==void 0&&o.genMorphGeometry(t,e,c,r,l.name)})})}genMorphGeometry(t,e,n,s,r){let o=e.Vertices!==void 0?e.Vertices.a:[],a=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=t.attributes.position.count*3,u=new Float32Array(h);for(let y=0;y<c.length;y++){let m=c[y]*3;u[m]=l[y*3],u[m+1]=l[y*3+1],u[m+2]=l[y*3+2]}let f={vertexIndices:a,vertexPositions:u,baseVertexPositions:o},d=this.genBuffers(f),p=new ce(d.vertex,3);p.name=r||n.attrName,p.applyMatrix4(s),t.morphAttributes.position.push(p)}parseNormals(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,s=t.Normals.a,r=[];return n==="IndexToDirect"&&("NormalIndex"in t?r=t.NormalIndex.a:"NormalsIndex"in t&&(r=t.NormalsIndex.a)),{dataSize:3,buffer:s,indices:r,mappingType:e,referenceType:n}}parseUVs(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,s=t.UV.a,r=[];return n==="IndexToDirect"&&(r=t.UVIndex.a),{dataSize:2,buffer:s,indices:r,mappingType:e,referenceType:n}}parseVertexColors(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,s=t.Colors.a,r=[];n==="IndexToDirect"&&(r=t.ColorIndex.a);for(let o=0,a=new It;o<s.length;o+=4)a.fromArray(s,o),zt.colorSpaceToWorking(a,ne),a.toArray(s,o);return{dataSize:4,buffer:s,indices:r,mappingType:e,referenceType:n}}parseMaterialIndices(t){let e=t.MappingInformationType,n=t.ReferenceInformationType;if(e==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};let s=t.Materials.a,r=[];for(let o=0;o<s.length;++o)r.push(o);return{dataSize:1,buffer:s,indices:r,mappingType:e,referenceType:n}}parseNurbsGeometry(t){let e=parseInt(t.Order);if(isNaN(e))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",t.Order,t.id),new ze;let n=e-1,s=t.KnotVector.a,r=[],o=t.Points.a;for(let u=0,f=o.length;u<f;u+=4)r.push(new Zt().fromArray(o,u));let a,l;if(t.Form==="Closed")r.push(r[0]);else if(t.Form==="Periodic"){a=n,l=s.length-1-a;for(let u=0;u<n;++u)r.push(r[u])}let h=new Sl(n,s,r,a,l).getPoints(r.length*12);return new ze().setFromPoints(h)}},zh=class{constructor(t){this.trimAnimationClips=t}parse(){let t=[],e=this.parseClips();if(e!==void 0)for(let n in e){let s=e[n],r=this.addClip(s);t.push(r)}return t}parseClips(){if(Gt.Objects.AnimationCurve===void 0)return;let t=this.parseAnimationCurveNodes();this.parseAnimationCurves(t);let e=this.parseAnimationLayers(t);return this.parseAnimStacks(e)}parseAnimationCurveNodes(){let t=Gt.Objects.AnimationCurveNode,e=new Map;for(let n in t){let s=t[n];if(s.attrName.match(/S|R|T|DeformPercent/)!==null){let r={id:s.id,attr:s.attrName,curves:{}};e.set(r.id,r)}}return e}parseAnimationCurves(t){let e=Gt.Objects.AnimationCurve;for(let n in e){let s={id:e[n].id,times:e[n].KeyTime.a.map(Nh),values:e[n].KeyValueFloat.a},r=Se.get(s.id);if(r!==void 0){let o=r.parents[0].ID,a=r.parents[0].relationship;a.match(/X/)?t.get(o).curves.x=s:a.match(/Y/)?t.get(o).curves.y=s:a.match(/Z/)?t.get(o).curves.z=s:a.match(/DeformPercent/)&&t.has(o)&&(t.get(o).curves.morph=s)}}}parseAnimationLayers(t){let e=Gt.Objects.AnimationLayer,n=new Map;for(let s in e){let r=[],o=Se.get(parseInt(s));o!==void 0&&(o.children.forEach(function(l,c){if(t.has(l.ID)){let h=t.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(r[c]===void 0){let u=Se.get(l.ID).parents.filter(function(d){return d.relationship!==void 0});if(u.length===0)return;let f=u[0].ID;if(f!==void 0){let d=Gt.Objects.Model[f.toString()];if(d===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}let p={modelName:d.attrName?re.sanitizeNodeName(d.attrName):"",ID:d.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};Pe.traverse(function(y){y.ID===d.id&&(p.transform=y.matrix,y.userData.transformData&&(p.eulerOrder=y.userData.transformData.eulerOrder,y.userData.transformData.rotation&&(p.initialRotation=y.userData.transformData.rotation)))}),p.transform||(p.transform=new wt),"PreRotation"in d&&(p.preRotation=d.PreRotation.value),"PostRotation"in d&&(p.postRotation=d.PostRotation.value),r[c]=p}}r[c]&&(r[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(r[c]===void 0){let u=Se.get(l.ID).parents.filter(function(v){return v.relationship!==void 0});if(u.length===0)return;let f=u[0].ID,d=Se.get(f).parents[0].ID,p=Se.get(d).parents[0].ID,y=Se.get(p).parents[0].ID,m=Gt.Objects.Model[y],g={modelName:m.attrName?re.sanitizeNodeName(m.attrName):"",morphName:Gt.Objects.Deformer[f].attrName};r[c]=g}r[c][h.attr]=h}}}),n.set(parseInt(s),r))}return n}parseAnimStacks(t){let e=Gt.Objects.AnimationStack,n={};for(let s in e){let r=Se.get(parseInt(s)).children;r.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");let o=t.get(r[0].ID),a=e[s];n[s]={name:a.attrName,layer:o,localStart:a.LocalStart!==void 0?Nh(Number(a.LocalStart.value)):0,localStop:a.LocalStop!==void 0?Nh(Number(a.LocalStop.value)):0}}return n}addClip(t){let e=[],n=this;return t.layer.forEach(function(s){e=e.concat(n.generateTracks(s))}),this.trimAnimationClips===!0&&t.localStop>t.localStart&&(e=this.trimTracks(e,t.localStart,t.localStop)),new Hr(t.name,-1,e)}trimTracks(t,e,n){let s=Math.fround(e),r=Math.fround(n),o=[];for(let a=0;a<t.length;a++){let l=t[a],c=l.getValueSize(),h=[],u=[];for(let f=0;f<l.times.length;f++){let d=l.times[f];if(!(d<s||d>r)){h.push(d-s);for(let p=0;p<c;p++)u.push(l.values[f*c+p])}}h.length!==0&&(l.times=new Float32Array(h),l.values=new Float32Array(u),o.push(l))}return o}generateTracks(t){let e=[],n=new F,s=new F;if(t.transform&&t.transform.decompose(n,new ye,s),n=n.toArray(),s=s.toArray(),t.T!==void 0&&Object.keys(t.T.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.T.curves,n,"position");r!==void 0&&e.push(r)}if(t.R!==void 0&&Object.keys(t.R.curves).length>0){let r=this.generateRotationTrack(t.modelName,t.R.curves,t.preRotation,t.postRotation,t.eulerOrder,t.initialRotation);r!==void 0&&e.push(r)}if(t.S!==void 0&&Object.keys(t.S.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.S.curves,s,"scale");r!==void 0&&e.push(r)}if(t.DeformPercent!==void 0){let r=this.generateMorphTrack(t);r!==void 0&&e.push(r)}return e}generateVectorTrack(t,e,n,s){let r=this.getTimesForAllAxes(e),o=this.getKeyframeTrackValues(r,e,n);return new ns(t+"."+s,r,o)}generateRotationTrack(t,e,n,s,r,o){let a,l;if(e.x!==void 0||e.y!==void 0||e.z!==void 0){let d=this.getTimesForAllAxes(e);if(d.length>0){let p=o||[0,0,0],y=this.synchronizeCurve(e.x,d,p[0]),m=this.synchronizeCurve(e.y,d,p[1]),g=this.synchronizeCurve(e.z,d,p[2]),v=this.interpolateRotations(y,m,g,r);a=v[0],l=v[1]}}let c=fo(0);n!==void 0&&(n=n.map(We.degToRad),n.push(c),n=new Ae().fromArray(n),n=new ye().setFromEuler(n)),s!==void 0&&(s=s.map(We.degToRad),s.push(c),s=new Ae().fromArray(s),s=new ye().setFromEuler(s).invert());let h=new ye,u=new Ae,f=[];if(!(!l||!a)){for(let d=0;d<l.length;d+=3)u.set(l[d],l[d+1],l[d+2],r),h.setFromEuler(u),n!==void 0&&h.premultiply(n),s!==void 0&&h.multiply(s),d>2&&new ye().fromArray(f,(d-3)/3*4).dot(h)<0&&h.set(-h.x,-h.y,-h.z,-h.w),h.toArray(f,d/3*4);return new Li(t+".quaternion",a,f)}}generateMorphTrack(t){let e=t.DeformPercent.curves.morph,n=e.values.map(function(r){return r/100}),s=Pe.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];return new Pi(t.modelName+".morphTargetInfluences["+s+"]",e.times,n)}getTimesForAllAxes(t){let e=[];if(t.x!==void 0&&(e=e.concat(t.x.times)),t.y!==void 0&&(e=e.concat(t.y.times)),t.z!==void 0&&(e=e.concat(t.z.times)),e=e.sort(function(n,s){return n-s}),e.length>1){let n=1,s=e[0];for(let r=1;r<e.length;r++){let o=e[r];o!==s&&(e[n]=o,s=o,n++)}e=e.slice(0,n)}return e}getKeyframeTrackValues(t,e,n){let s=n,r=[],o=-1,a=-1,l=-1;return t.forEach(function(c){if(e.x&&(o=e.x.times.indexOf(c)),e.y&&(a=e.y.times.indexOf(c)),e.z&&(l=e.z.times.indexOf(c)),o!==-1){let h=e.x.values[o];r.push(h),s[0]=h}else r.push(s[0]);if(a!==-1){let h=e.y.values[a];r.push(h),s[1]=h}else r.push(s[1]);if(l!==-1){let h=e.z.values[l];r.push(h),s[2]=h}else r.push(s[2])}),r}synchronizeCurve(t,e,n){if(t===void 0)return{times:e,values:e.map(()=>n)};if(t.times.length===e.length)return t;let s=[];for(let r=0;r<e.length;r++)s.push(this.sampleCurveValue(t,e[r],n));return{times:e,values:s}}sampleCurveValue(t,e,n){let s=t.times,r=t.values;if(e<=s[0])return r[0];if(e>=s[s.length-1])return r[r.length-1];for(let o=0;o<s.length-1;o++)if(e>=s[o]&&e<=s[o+1]){if(s[o]===e)return r[o];let a=(e-s[o])/(s[o+1]-s[o]);return r[o]*(1-a)+r[o+1]*a}return n}interpolateRotations(t,e,n,s){let r=[],o=[];r.push(t.times[0]),o.push(We.degToRad(t.values[0])),o.push(We.degToRad(e.values[0])),o.push(We.degToRad(n.values[0]));for(let a=1;a<t.values.length;a++){let l=[t.values[a-1],e.values[a-1],n.values[a-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;let c=l.map(We.degToRad),h=[t.values[a],e.values[a],n.values[a]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;let u=h.map(We.degToRad),f=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],d=[Math.abs(f[0]),Math.abs(f[1]),Math.abs(f[2])];if(d[0]>=180||d[1]>=180||d[2]>=180){let y=Math.max(...d)/180,m=new Ae(...c,s),g=new Ae(...u,s),v=new ye().setFromEuler(m),w=new ye().setFromEuler(g);v.dot(w)<0&&w.set(-w.x,-w.y,-w.z,-w.w);let M=t.times[a-1],A=t.times[a]-M,E=new ye,x=new Ae;for(let b=0;b<1;b+=1/y)E.copy(v.clone().slerp(w.clone(),b)),r.push(M+b*A),x.setFromQuaternion(E,s),o.push(x.x),o.push(x.y),o.push(x.z)}else r.push(t.times[a]),o.push(We.degToRad(t.values[a])),o.push(We.degToRad(e.values[a])),o.push(We.degToRad(n.values[a]))}return[r,o]}},Vh=class{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(t){this.nodeStack.push(t),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(t,e){this.currentProp=t,this.currentPropName=e}parse(t){this.currentIndent=0,this.allNodes=new El,this.nodeStack=[],this.currentProp=[],this.currentPropName="";let e=this,n=t.split(/[\r\n]+/);return n.forEach(function(s,r){let o=s.match(/^[\s\t]*;/),a=s.match(/^[\s\t]*$/);if(o||a)return;let l=s.match("^\\t{"+e.currentIndent+"}(\\w+):(.*){",""),c=s.match("^\\t{"+e.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=s.match("^\\t{"+(e.currentIndent-1)+"}}");l?e.parseNodeBegin(s,l):c?e.parseNodeProperty(s,c,n[++r]):h?e.popStack():s.match(/^[^\s\t}]/)&&e.parseNodePropertyContinued(s)}),this.allNodes}parseNodeBegin(t,e){let n=e[1].trim().replace(/^"/,"").replace(/"$/,""),s=e[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),r={name:n},o=this.parseNodeAttr(s),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,r):n in a?(n==="PoseNode"?a.PoseNode.push(r):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),o.id!==""&&(a[n][o.id]=r)):typeof o.id=="number"?(a[n]={},a[n][o.id]=r):n!=="Properties70"&&(n==="PoseNode"?a[n]=[r]:a[n]=r),typeof o.id=="number"&&(r.id=o.id),o.name!==""&&(r.attrName=o.name),o.type!==""&&(r.attrType=o.type),this.pushStack(r)}parseNodeAttr(t){let e=t[0];t[0]!==""&&(e=parseInt(t[0]),isNaN(e)&&(e=t[0]));let n="",s="";return t.length>1&&(n=t[1].replace(/^(\w+)::/,""),s=t[2]),{id:e,name:n,type:s}}parseNodeProperty(t,e,n){let s=e[1].replace(/^"/,"").replace(/"$/,"").trim(),r=e[2].replace(/^"/,"").replace(/"$/,"").trim();s==="Content"&&r===","&&(r=n.replace(/"/g,"").replace(/,$/,"").trim());let o=this.getCurrentNode();if(o.name==="Properties70"){this.parseNodeSpecialProperty(t,s,r);return}if(s==="C"){let l=r.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]),u=r.split(",").slice(3);u=u.map(function(f){return f.trim().replace(/^"/,"")}),s="connections",r=[c,h],aS(r,u),o[s]===void 0&&(o[s]=[])}s==="Node"&&(o.id=r),s in o&&Array.isArray(o[s])?o[s].push(r):s!=="a"?o[s]=r:o.a=r,this.setCurrentProp(o,s),s==="a"&&r.slice(-1)!==","&&(o.a=Oh(r))}parseNodePropertyContinued(t){let e=this.getCurrentNode();e.a+=t,t.slice(-1)!==","&&(e.a=Oh(e.a))}parseNodeSpecialProperty(t,e,n){let s=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),r=s[0],o=s[1],a=s[2],l=s[3],c=s[4];switch(o){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=Oh(c);break}this.getPrevNode()[r]={type:o,type2:a,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),r)}},Gh=class{parse(t){let e=new wl(t);e.skip(23);let n=e.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);let s=new El;for(;!this.endOfContent(e);){let r=this.parseNode(e,n);r!==null&&s.add(r.name,r)}return s}endOfContent(t){return t.size()%16===0?(t.getOffset()+160+16&-16)>=t.size():t.getOffset()+160+16>=t.size()}parseNode(t,e){let n={},s=e>=7500?t.getUint64():t.getUint32(),r=e>=7500?t.getUint64():t.getUint32();e>=7500?t.getUint64():t.getUint32();let o=t.getUint8(),a=t.getString(o);if(s===0)return null;let l=[];for(let f=0;f<r;f++)l.push(this.parseProperty(t));let c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",u=l.length>2?l[2]:"";for(n.singleProperty=r===1&&t.getOffset()===s;s>t.getOffset();){let f=this.parseNode(t,e);f!==null&&this.parseSubNode(a,n,f)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),u!==""&&(n.attrType=u),a!==""&&(n.name=a),n}parseSubNode(t,e,n){if(n.singleProperty===!0){let s=n.propertyList[0];Array.isArray(s)?(e[n.name]=n,n.a=s):e[n.name]=s}else if(t==="Connections"&&n.name==="C"){let s=[];n.propertyList.forEach(function(r,o){o!==0&&s.push(r)}),e.connections===void 0&&(e.connections=[]),e.connections.push(s)}else if(n.name==="Properties70")Object.keys(n).forEach(function(r){e[r]=n[r]});else if(t==="Properties70"&&n.name==="P"){let s=n.propertyList[0],r=n.propertyList[1],o=n.propertyList[2],a=n.propertyList[3],l;s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),r==="Color"||r==="ColorRGB"||r==="Vector"||r==="Vector3D"||r.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],e[s]={type:r,type2:o,flag:a,value:l}}else e[n.name]===void 0?typeof n.id=="number"?(e[n.name]={},e[n.name][n.id]=n):e[n.name]=n:n.name==="PoseNode"?(Array.isArray(e[n.name])||(e[n.name]=[e[n.name]]),e[n.name].push(n)):e[n.name][n.id]===void 0&&(e[n.name][n.id]=n)}parseProperty(t){let e=t.getString(1),n;switch(e){case"C":return t.getBoolean();case"D":return t.getFloat64();case"F":return t.getFloat32();case"I":return t.getInt32();case"L":return t.getInt64();case"R":return n=t.getUint32(),t.getArrayBuffer(n);case"S":return n=t.getUint32(),t.getString(n);case"Y":return t.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":let s=t.getUint32(),r=t.getUint32(),o=t.getUint32();if(r===0)switch(e){case"b":case"c":return t.getBooleanArray(s);case"d":return t.getFloat64Array(s);case"f":return t.getFloat32Array(s);case"i":return t.getInt32Array(s);case"l":return t.getInt64Array(s)}let a=np(new Uint8Array(t.getArrayBuffer(o))),l=new wl(a.buffer);switch(e){case"b":case"c":return l.getBooleanArray(s);case"d":return l.getFloat64Array(s);case"f":return l.getFloat32Array(s);case"i":return l.getInt32Array(s);case"l":return l.getInt64Array(s)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+e)}}},wl=class{constructor(t,e){this.dv=new DataView(t),this.offset=0,this.littleEndian=e!==void 0?e:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(t){this.offset+=t}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(t){let e=[];for(let n=0;n<t;n++)e.push(this.getBoolean());return e}getUint8(){let t=this.dv.getUint8(this.offset);return this.offset+=1,t}getInt16(){let t=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}getInt32(){let t=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}getInt32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt32());return e}getUint32(){let t=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}getInt64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e&2147483648?(e=~e&4294967295,t=~t&4294967295,t===4294967295&&(e=e+1&4294967295),t=t+1&4294967295,-(e*4294967296+t)):e*4294967296+t}getInt64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt64());return e}getUint64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e*4294967296+t}getFloat32(){let t=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}getFloat32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat32());return e}getFloat64(){let t=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}getFloat64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat64());return e}getArrayBuffer(t){let e=this.dv.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e}getString(t){let e=this.offset,n=new Uint8Array(this.dv.buffer,e,t);this.skip(t);let s=n.indexOf(0);return s>=0&&(n=new Uint8Array(this.dv.buffer,e,s)),this._textDecoder.decode(n)}},El=class{add(t,e){this[t]=e}};function sS(i){let t="Kaydara FBX Binary  \0";return i.byteLength>=t.length&&t===lp(i,0,t.length)}function rS(i){let t=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"],e=0;function n(s){let r=i[s-1];return i=i.slice(e+s),e++,r}for(let s=0;s<t.length;++s)if(n(1)===t[s])return!1;return!0}function op(i){let t=/FBXVersion: (\d+)/,e=i.match(t);if(e)return parseInt(e[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function Nh(i){return i/46186158e3}var oS=[];function Ml(i,t,e,n){let s;switch(n.mappingType){case"ByPolygonVertex":s=i;break;case"ByPolygon":s=t;break;case"ByVertice":s=e;break;case"AllSame":s=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(s=n.indices[s]);let r=s*n.dataSize,o=r+n.dataSize;return lS(oS,n.buffer,r,o)}var Uh=new Ae,tr=new F;function ap(i){let t=new wt,e=new wt,n=new wt,s=new wt,r=new wt,o=new wt,a=new wt,l=new wt,c=new wt,h=new wt,u=new wt,f=new wt,d=i.inheritType?i.inheritType:0;i.translation&&t.setPosition(tr.fromArray(i.translation));let p=fo(0);if(i.preRotation){let L=i.preRotation.map(We.degToRad);L.push(p),e.makeRotationFromEuler(Uh.fromArray(L))}if(i.rotation){let L=i.rotation.map(We.degToRad);L.push(i.eulerOrder||p),n.makeRotationFromEuler(Uh.fromArray(L))}if(i.postRotation){let L=i.postRotation.map(We.degToRad);L.push(p),s.makeRotationFromEuler(Uh.fromArray(L)),s.invert()}i.scale&&r.scale(tr.fromArray(i.scale)),i.scalingOffset&&a.setPosition(tr.fromArray(i.scalingOffset)),i.scalingPivot&&o.setPosition(tr.fromArray(i.scalingPivot)),i.rotationOffset&&l.setPosition(tr.fromArray(i.rotationOffset)),i.rotationPivot&&c.setPosition(tr.fromArray(i.rotationPivot)),i.parentMatrixWorld&&(u.copy(i.parentMatrix),h.copy(i.parentMatrixWorld));let y=e.clone().multiply(n).multiply(s),m=new wt;m.extractRotation(h);let g=new wt;g.copyPosition(h);let v=g.clone().invert().multiply(h),w=m.clone().invert().multiply(v),M=r,A=new wt;if(d===0)A.copy(m).multiply(y).multiply(w).multiply(M);else if(d===1)A.copy(m).multiply(w).multiply(y).multiply(M);else{let U=new wt().scale(new F().setFromMatrixScale(u)).clone().invert(),z=w.clone().multiply(U);A.copy(m).multiply(y).multiply(z).multiply(M)}let E=c.clone().invert(),x=o.clone().invert(),b=t.clone().multiply(l).multiply(c).multiply(e).multiply(n).multiply(s).multiply(E).multiply(a).multiply(o).multiply(r).multiply(x),I=new wt().copyPosition(b),R=h.clone().multiply(I);return f.copyPosition(R),b=f.clone().multiply(A),b.premultiply(h.invert()),b}function fo(i){i=i||0;let t=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return i===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),t[0]):t[i]}function Oh(i){return i.split(",").map(function(e){return parseFloat(e)})}function lp(i,t,e){return t===void 0&&(t=0),e===void 0&&(e=i.byteLength),new TextDecoder().decode(new Uint8Array(i,t,e))}function aS(i,t){for(let e=0,n=i.length,s=t.length;e<s;e++,n++)i[n]=t[e]}function lS(i,t,e,n){for(let s=e,r=0;s<n;s++,r++)i[r]=t[s];return i}Nt();function nr(i,t,e){return{x:i,y:t,z:-e}}function cp(i){return{x:i.x,y:i.y,z:-i.z}}var po="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function cS(i,t){let e="",n=t*2,s=r=>{let o=i[r>>1]&65535;return(r&1)===0?o&255:o>>8};for(let r=0;r<n;r+=3){let o=s(r),a=r+1<n?s(r+1):0,l=r+2<n?s(r+2):0;e+=po.charAt(o>>2)+po.charAt((o&3)<<4|a>>4),e+=r+1<n?po.charAt((a&15)<<2|l>>6):"=",e+=r+2<n?po.charAt(l&63):"="}return e}function hS(i){let t=i.length;for(;t>0&&i.charAt(t-1)==="=";)t--;let e=Math.floor(t*3/4),n=new Int16Array(e>>1),s=0,r=0,o=0,a=0;for(let l=0;l<t;l++){let c=po.indexOf(i.charAt(l));if(!(c<0)&&(s=s<<6|c,r+=6,r>=8)){r-=8;let h=s>>r&255;if((o&1)===0)a=h;else{let u=a|h<<8;n[o>>1]=u>=32768?u-65536:u}o++}}return n}var Ve=(i,t)=>Math.sqrt((i.x-t.x)*(i.x-t.x)+(i.z-t.z)*(i.z-t.z)),er=class er{constructor(t,e){Q(this,"host",t);Q(this,"deviceName",e);Q(this,"walkSpeed",.9);Q(this,"turnSpeed",3.5);Q(this,"userDistance",1.2);Q(this,"micMuted",!1);Q(this,"wander",!1);Q(this,"idleFor",0);Q(this,"wanderAfter",6);Q(this,"wanderOut",!0);Q(this,"objects",[]);Q(this,"avatar",{pos:{x:0,y:0,z:0},yaw:0,state:"idle",speed01:0,gesture:""});Q(this,"connected",!1);Q(this,"brain","-");Q(this,"lastAction","");Q(this,"lastTranscript","");Q(this,"lastError","");Q(this,"speakingFor",0);Q(this,"placed",!1);Q(this,"clock",0);Q(this,"nextWorld",0);Q(this,"counters",{});Q(this,"goal",null);Q(this,"face",null);Q(this,"goalTarget","");Q(this,"pendingGesture","");Q(this,"route",[]);Q(this,"planned",[]);Q(this,"following",!1);Q(this,"done",null);Q(this,"stuckFor",0);Q(this,"bestDistance",0);Q(this,"sideBias",0);Q(this,"sideBiasFor",0);Q(this,"mic",new Int16Array(er.AUDIO_RATE/1e3*60));Q(this,"micCount",0);Q(this,"micPos",0)}onOpen(){this.connected=!0,this.lastError="",this.sendJson({type:"hello",protocol:1,device:this.deviceName,capabilities:{vision:!1,navmesh:!1}}),this.nextWorld=0}onClose(){this.connected=!1,this.brain="-"}onMessage(t){let e;try{e=JSON.parse(t)}catch{return}switch(e.type){case"ready":this.brain=String(e.brain);break;case"audio":{let n=hS(String(e.pcm16));this.speakingFor+=n.length/er.AUDIO_RATE,this.host.playAudio(n);break}case"audio_stop":this.speakingFor=0,this.host.stopAudio();break;case"action":this.handleAction(e);break;case"state":e.status==="listening"&&this.attend(),e.status!=="idle"&&(this.idleFor=0);break;case"transcript":this.lastTranscript=(e.role==="user"?"You: ":"Sim: ")+String(e.text);break;case"log":this.lastError=String(e.message),this.host.log("[backend "+e.level+"] "+e.message);break}}sendJson(t){this.connected&&this.host.send(JSON.stringify(t))}interrupt(){this.speakingFor=0,this.host.stopAudio(),this.sendJson({type:"interrupt"})}pushMic(t,e,n){let s=n/er.AUDIO_RATE;for(;this.micPos<e;){let r=Math.floor(this.micPos),o=t[r],a=r+1<e?t[r+1]:o,l=o+(a-o)*(this.micPos-r);this.micMuted&&(l=0),l=l<-1?-1:l>1?1:l,this.mic[this.micCount++]=Math.round(l*32767),this.micCount===this.mic.length&&(this.sendJson({type:"audio",pcm16:cS(this.mic,this.micCount)}),this.micCount=0),this.micPos+=s}this.micPos-=e}find(t){let e=String(t||"").toLowerCase();for(let n=0;n<this.objects.length;n++)if(this.objects[n].id.toLowerCase()===e)return this.objects[n];return null}register(t,e,n){t=String(t||"object").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"object";for(let r=0;r<this.objects.length;r++){let o=this.objects[r];if(o.label===t&&Ve(o.pos,e)<.75)return o.seenAt=this.clock,o}this.counters[t]=(this.counters[t]||0)+1;let s={id:t+"_"+this.counters[t],label:t,pos:e,size:{x:.5,y:.5,z:.5},source:n,confidence:1,seenAt:this.clock};return this.objects.push(s),s}upsert(t,e,n,s,r){let o=this.find(t);return o||(o={id:t,label:e,pos:n,size:s,source:r,confidence:1,seenAt:this.clock},this.objects.push(o)),o.label=e,o.pos=n,o.size=s,o.seenAt=this.clock,o}prune(t,e){for(let n=this.objects.length-1;n>=0;n--)this.objects[n].source===t&&e.indexOf(this.objects[n].id)<0&&this.objects.splice(n,1)}sendText(t){this.sendJson({type:"text",text:t})}placeInFrontOfUser(t){let e=this.host.floorY();if(e===null)return!1;let n=this.host.headPosition(),s=this.host.headForward(),r=Math.sqrt(s.x*s.x+s.z*s.z)||1,o=Math.atan2(s.x/r,s.z/r),a={x:n.x,y:e,z:n.z},l=[t,t*.75,t*1.3,1];for(let c=0;c<l.length;c++)for(let h=0;h<9;h++){let u=o+Math.ceil(h/2)*.44*(h%2===0?-1:1),f={x:a.x+Math.sin(u)*l[c],y:e,z:a.z+Math.cos(u)*l[c]};if(!(!this.host.isFloor(f)||!this.clearLine(a,f)))return this.avatar.pos=f,this.avatar.yaw=Math.atan2(a.x-f.x,a.z-f.z),this.placed=!0,!0}return!1}userFloor(){let t=this.host.headPosition(),e=this.host.floorY();return{x:t.x,y:e===null?this.avatar.pos.y:e,z:t.z}}clearLine(t,e){let n=Math.max(1,Math.ceil(Ve(t,e)/.25));for(let s=1;s<=n;s++){let r=s/n;if(!this.host.isFloor({x:t.x+(e.x-t.x)*r,y:t.y,z:t.z+(e.z-t.z)*r}))return!1}return!0}planPath(t,e){if(this.clearLine(t,e))return[e];let n=.2,s=60,r=(E,x)=>(E+s)*(2*s+1)+(x+s),o=(E,x)=>({x:t.x+E*n,y:t.y,z:t.z+x*n}),a=Math.round((e.x-t.x)/n),l=Math.round((e.z-t.z)/n);if(Math.abs(a)>s||Math.abs(l)>s)return null;let c={},h=(E,x)=>{if(Math.abs(E)>s||Math.abs(x)>s)return!1;let b=r(E,x);return c[b]===void 0&&(c[b]=E===0&&x===0||this.host.isFloor(o(E,x))),c[b]};if(!h(a,l))return null;let u=[[0,0,0,0]],f={},d={};f[r(0,0)]=0;let p=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],y=!1;for(let E=0;E<6e3&&u.length>0;E++){let x=0;for(let I=1;I<u.length;I++)u[I][3]<u[x][3]&&(x=I);let b=u.splice(x,1)[0];if(b[0]===a&&b[1]===l){y=!0;break}if(!(b[2]>f[r(b[0],b[1])]))for(let I=0;I<p.length;I++){let R=b[0]+p[I][0],L=b[1]+p[I][1];if(!h(R,L)||p[I][0]!==0&&p[I][1]!==0&&(!h(b[0]+p[I][0],b[1])||!h(b[0],b[1]+p[I][1])))continue;let U=b[2]+(p[I][0]!==0&&p[I][1]!==0?1.414:1),z=r(R,L);if(f[z]!==void 0&&f[z]<=U)continue;f[z]=U,d[z]=[b[0],b[1]];let P=Math.abs(a-R),H=Math.abs(l-L);u.push([R,L,U,U+Math.max(P,H)+.414*Math.min(P,H)])}}if(!y)return null;let m=[],g=a,v=l;for(;!(g===0&&v===0);){m.unshift(o(g,v));let E=d[r(g,v)];g=E[0],v=E[1]}m[m.length-1]=e;let w=[],M=t,A=0;for(;A<m.length;){let E=A;for(let x=m.length-1;x>A;x--)if(this.clearLine(M,m[x])){E=x;break}w.push(m[E]),M=m[E],A=E+1}return w}standPoint(t,e){let n=this.avatar.pos,s=Math.atan2(n.x-t.x,n.z-t.z),r=[e,e+.3,e+.7];for(let o=0;o<r.length;o++)for(let a=0;a<12;a++){let l=s+Math.ceil(a/2)*(Math.PI/6)*(a%2===0?-1:1),c={x:t.x+Math.sin(l)*r[o],y:n.y,z:t.z+Math.cos(l)*r[o]};if(!this.host.isFloor(c))continue;let h=this.planPath(n,c);if(h!==null)return this.planned=h,c}return null}resolve(t){if(String(t).toLowerCase()==="user")return{pos:this.userFloor(),standOff:this.userDistance};let e=this.find(t);if(!e)return null;let n=Math.max(e.size.x,e.size.z)/2+.45;return{pos:e.pos,standOff:Math.min(2,Math.max(.6,n))}}attend(){this.done||this.following||!this.placed||(this.goal=this.avatar.pos,this.route=[],this.face=this.userFloor(),this.goalTarget="",this.idleFor=0)}startStroll(){this.idleFor=0,this.wanderAfter=6+Math.random()*8;let t=this.userFloor(),e=this.avatar.pos,n=null,s=t;if(this.wanderOut){let r=[];for(let o=0;o<this.objects.length;o++)Ve(this.objects[o].pos,t)<3.5&&Ve(this.objects[o].pos,e)>1.2&&r.push(this.objects[o]);if(r.length>0&&Math.random()<.7){let o=r[Math.floor(Math.random()*r.length)],a=this.resolve(o.id);a&&(n=this.standPoint(a.pos,a.standOff)),n&&(s=o.pos)}for(let o=0;!n&&o<6;o++){let a=Math.random()*Math.PI*2,l=1.5+Math.random()*1.3,c={x:t.x+Math.sin(a)*l,y:e.y,z:t.z+Math.cos(a)*l};if(Ve(c,e)<.8||!this.host.isFloor(c))continue;let h=this.planPath(e,c);h&&(this.planned=h,n=c)}}else Ve(e,t)>this.userDistance+.8&&(n=this.standPoint(t,this.userDistance+.3));this.wanderOut=!this.wanderOut,n&&(this.goal=this.planned[0],this.route=this.planned.slice(1),this.face=s,this.goalTarget="",this.stuckFor=0,this.bestDistance=Ve(e,this.goal),this.sideBias=0)}finish(t,e){let n=this.done;this.goal=null,this.route=[],this.face=null,this.done=null,this.goalTarget="",this.avatar.state=this.following?"following":"idle",n&&n(t,e)}handleAction(t){let e=String(t.id),n=String(t.action||""),s=n==="approach_user"?"user":String(t.target_id||""),r=(a,l,c)=>{this.lastAction=n+(s?" "+s:"")+(a?" ok":" FAILED: "+l);let h={type:"action_result",id:e,status:a?"succeeded":"failed"};!a&&l&&(h.reason=l),c&&(h.data=c),this.sendJson(h)},o=a=>this.sendJson({type:"event",name:"action_started",data:{id:e,plan_ms:0,path_m:Math.round(a*10)/10}});if(this.lastAction=n+(s?" "+s:"")+" ...",n==="walk_to"||n==="inspect_object"||n==="approach_user"){if(!this.placed)return r(!1,"the floor has not been found yet; ask the user to look at the floor");let a=this.resolve(s);if(!a)return r(!1,"unknown target '"+s+"'");this.done&&this.finish(!1,"superseded by a newer action"),this.following=!1;let l=Ve(this.avatar.pos,a.pos)<=a.standOff+.25,c=l?this.avatar.pos:this.standPoint(a.pos,a.standOff);if(!c)return r(!1,"there is no reachable floor next to "+s);this.route=l?[]:this.planned.slice(1),this.goal=l?c:this.planned[0],this.face=a.pos,this.goalTarget=s,this.stuckFor=0,this.bestDistance=Ve(this.avatar.pos,c),this.sideBias=0,this.avatar.state="turning",o(Ve(this.avatar.pos,c)),this.done=(h,u)=>r(h,u,{metres_from_target:Math.round(Ve(this.avatar.pos,this.resolveOr(s,a.pos))*10)/10});return}if(n==="look_at"){let a=this.resolve(s);if(!a)return r(!1,"unknown target '"+s+"'");this.done&&this.finish(!1,"superseded by a newer action"),this.goal=this.avatar.pos,this.route=[],this.face=a.pos,this.avatar.state="turning",this.done=(l,c)=>r(l,c);return}if(n==="follow_user")return this.placed?(this.done&&this.finish(!1,"superseded by a newer action"),this.following=!0,this.avatar.state="following",o(0),r(!0,"",{following:!0})):r(!1,"the floor has not been found yet");if(n==="stop")return this.following=!1,this.done&&this.finish(!1,"stopped"),this.avatar.state="idle",r(!0,"");if(n==="gesture"){let a=String(t.params&&t.params.type||"");return["wave","nod","shake_head","shrug"].indexOf(a)<0?r(!1,"unknown gesture '"+a+"'"):(this.pendingGesture=a,r(!0,""))}if(n==="register_marker"){let a=String(t.params&&t.params.label||"");if(!a)return r(!1,"a label is required");let l=this.host.pointerHit();if(!l)return r(!1,"could not tell where the user is looking; ask them to look at the object or the floor beside it");let c=this.register(a,l,"manual");return this.nextWorld=0,r(!0,"",{id:c.id,label:c.label,origin:"registered by the user, not camera-detected"})}if(n==="scan_surroundings")return r(!1,"camera object detection is not available on this device; ask the user to look at things and name them");r(!1,"this device does not implement action '"+n+"'")}resolveOr(t,e){let n=this.resolve(t);return n?n.pos:e}turnToward(t,e){let n=Math.atan2(t.x-this.avatar.pos.x,t.z-this.avatar.pos.z),s=Math.atan2(Math.sin(n-this.avatar.yaw),Math.cos(n-this.avatar.yaw)),r=Math.min(Math.abs(s),this.turnSpeed*e);return this.avatar.yaw+=s<0?-r:r,s=Math.atan2(Math.sin(n-this.avatar.yaw),Math.cos(n-this.avatar.yaw)),Math.abs(s)}stepToward(t,e,n){let s=Math.atan2(t.x-this.avatar.pos.x,t.z-this.avatar.pos.z);this.sideBiasFor=Math.max(0,this.sideBiasFor-n),this.sideBiasFor===0&&(this.sideBias=0);let r=this.sideBias>0?[0,.6,1.2,1.6]:this.sideBias<0?[0,-.6,-1.2,-1.6]:[0,.6,-.6,1.2,-1.2,1.6,-1.6];for(let o=0;o<r.length;o++){let a=s+r[o],l={x:this.avatar.pos.x+Math.sin(a)*.3,y:this.avatar.pos.y,z:this.avatar.pos.z+Math.cos(a)*.3},c={x:this.avatar.pos.x+Math.sin(a)*e,y:this.avatar.pos.y,z:this.avatar.pos.z+Math.cos(a)*e};if(!this.host.isFloor(c)||!this.host.isFloor(l))continue;r[o]!==0&&(this.sideBias=r[o]>0?1:-1,this.sideBiasFor=1.5);let h=Math.atan2(Math.sin(a-this.avatar.yaw),Math.cos(a-this.avatar.yaw)),u=Math.min(Math.abs(h),this.turnSpeed*n);return this.avatar.yaw+=h<0?-u:u,this.avatar.pos=c,e}return 0}update(t){this.clock+=t,this.avatar.gesture=this.pendingGesture,this.pendingGesture="",this.speakingFor>0&&(this.speakingFor=Math.max(0,this.speakingFor-t));let e=0,n=this.host.floorY();if(n!==null&&this.placed&&(this.avatar.pos.y=n),this.goal&&this.face){if(this.goalTarget==="user"){let r=this.userFloor();if(Ve(r,this.face)>.3){this.face=r;let o=Ve(this.avatar.pos,r)<=this.userDistance+.25?this.avatar.pos:this.standPoint(r,this.userDistance);o===this.avatar.pos?(this.goal=o,this.route=[]):o&&(this.goal=this.planned[0],this.route=this.planned.slice(1),this.bestDistance=Ve(this.avatar.pos,this.goal))}}let s=Ve(this.avatar.pos,this.goal);if(s>.04){let r=Math.atan2(this.goal.x-this.avatar.pos.x,this.goal.z-this.avatar.pos.z),o=Math.abs(Math.atan2(Math.sin(r-this.avatar.yaw),Math.cos(r-this.avatar.yaw)));if(this.avatar.state!=="walking"&&o>.4&&this.sideBias===0)this.turnToward(this.goal,t),this.avatar.state="turning";else{e=this.stepToward(this.goal,Math.min(s,this.walkSpeed*t),t),this.avatar.state="walking";let a=Ve(this.avatar.pos,this.goal);a<this.bestDistance-.05?(this.bestDistance=a,this.stuckFor=0):(this.stuckFor+=t,this.stuckFor>(e>0?4:1)&&this.finish(!1,"the way became blocked"))}}else this.route.length>0?(this.goal=this.route.shift(),this.bestDistance=Ve(this.avatar.pos,this.goal),this.stuckFor=0,this.sideBias=0):this.turnToward(this.face,t)<.06?this.finish(!0,""):this.avatar.state="turning"}else if(this.following){let s=this.userFloor(),r=Ve(this.avatar.pos,s),o=r>this.userDistance+.5?0:this.turnToward(s,t);r>this.userDistance+.5&&(e=this.stepToward(s,Math.min(r-this.userDistance,this.walkSpeed*t),t)),this.avatar.state="following"}this.avatar.speed01=t>0?Math.min(1,e/t/this.walkSpeed):0,this.wander&&this.placed&&!this.goal&&!this.following&&this.speakingFor<=0?(this.idleFor+=t,this.idleFor>this.wanderAfter&&this.startStroll()):(this.done||this.following||this.speakingFor>0)&&(this.idleFor=0),this.connected&&this.clock>=this.nextWorld&&(this.nextWorld=this.clock+.4,this.sendWorld())}sendWorld(){let t=o=>[Math.round(o.x*1e3)/1e3,Math.round(o.y*1e3)/1e3,Math.round(o.z*1e3)/1e3],e=this.host.floorY(),n=this.host.roomInfo?this.host.roomInfo():null,s=[];for(let o=0;o<this.objects.length;o++){let a=this.objects[o];s.push({id:a.id,label:a.label,pos:t(a.pos),size:t(a.size),source:a.source,confidence:a.confidence,lastSeen:Math.round((this.clock-a.seenAt)*10)/10,reachable:!0})}let r=this.avatar.state==="idle"&&this.speakingFor>0?"speaking":this.avatar.state;this.sendJson({type:"world",world:{user:{pos:t(this.host.headPosition()),fwd:t(this.host.headForward())},avatar:{pos:t(this.avatar.pos),fwd:t({x:Math.sin(this.avatar.yaw),y:0,z:Math.cos(this.avatar.yaw)}),state:r},objects:s,room:{source:e===null?"unknown":n?n.source:"surface_hit_test",floorY:e===null?0:Math.round(e*1e3)/1e3,obstacles:n?n.obstacles:0,navmesh:!1}}})}};Q(er,"AUDIO_RATE",24e3);var mo=er;Nt();Nt();Nt();var Hh=i=>"simulacra.file:"+i;function hp(i){try{return localStorage.getItem(Hh(i))!==null}catch{return!1}}function up(i){let t=localStorage.getItem(Hh(i));if(t===null)throw new Error("not found: "+i);return t}function fp(i,t){try{localStorage.setItem(Hh(i),String(t))}catch{}}Nt();function dp(i){let t=String(i).lastIndexOf("/");return t<0?".":i.slice(0,t)}var pp=()=>({objectNotes:{},skillStats:{},learnedSkills:{},episodes:[]}),Tl=class{constructor(t){Q(this,"path",t);Q(this,"data",pp());if(t&&hp(t))try{this.data={...pp(),...JSON.parse(up(t,"utf8"))}}catch(e){console.warn(`[memory] could not read ${t}, starting empty:`,e)}}save(){if(this.path)try{dp(this.path),fp(this.path,JSON.stringify(this.data,null,2))}catch(t){console.warn("[memory] save failed:",t)}}recordOutcome(t,e,n,s){var o;let r=(o=this.data.skillStats)[t]??(o[t]={ok:0,fail:0});n==="succeeded"?r.ok++:(r.fail++,r.lastFailReason=s),this.data.episodes.push({t:new Date().toISOString(),skill:t,target:e,status:n,reason:s}),this.data.episodes.length>200&&this.data.episodes.splice(0,this.data.episodes.length-200),this.save()}rememberObject(t,e,n){var r;let s=(r=this.data.objectNotes)[t]??(r[t]={label:e,notes:[],updatedAt:""});s.label=e,n&&!s.notes.includes(n)&&s.notes.push(n),s.notes.length>8&&s.notes.shift(),s.updatedAt=new Date().toISOString(),this.save()}notesFor(t){return this.data.objectNotes[t]?.notes??[]}saveSkill(t){let e=this.data.learnedSkills[t.name];this.data.learnedSkills[t.name]={...t,createdAt:e?.createdAt??new Date().toISOString(),uses:e?.uses??0,successes:e?.successes??0},this.save()}skillUsed(t,e){let n=this.data.learnedSkills[t];n&&(n.uses++,e&&n.successes++,this.save())}summary(){let t=[],e=Object.values(this.data.learnedSkills);if(e.length){t.push("Skills you composed earlier (call with run_skill):");for(let o of e)t.push(`- ${o.name}: ${o.description} [${o.steps.map(a=>`${a.skill}(${a.target??""})`).join(" -> ")}] worked ${o.successes}/${o.uses} times`)}let n=Object.entries(this.data.skillStats).filter(([,o])=>o.fail>0);if(n.length){t.push("Past failures to learn from:");for(let[o,a]of n)t.push(`- ${o}: failed ${a.fail}x (ok ${a.ok}x), last reason: ${a.lastFailReason??"unknown"}`)}let s=Object.entries(this.data.objectNotes).filter(([,o])=>o.notes.length);if(s.length){t.push("Notes you saved about things (ids may differ between sessions, match by label):");for(let[o,a]of s)t.push(`- ${o} (${a.label}): ${a.notes.join("; ")}`)}let r=this.data.episodes.slice(-5);if(r.length){t.push("Most recent actions:");for(let o of r)t.push(`- ${o.skill}(${o.target??""}) ${o.status}${o.reason?`: ${o.reason}`:""}`)}return t.length?t.join(`
`):"Nothing remembered yet."}};Nt();Nt();var mp=new Set(["walk_to","approach_user","follow_user","inspect_object","look_at","gesture","scan_surroundings","run_sequence","run_skill","stop_moving","register_marker"]),Wh=`You are Sim, an embodied AI companion. You have a human body standing on the floor of the user's real room, seen through their AR headset. You hear the user by voice and you can walk around their room.

# How you act
You are the mind; a separate local controller is the body. You decide WHAT to do and name a target. The body plans the path, avoids obstacles, animates and replans by itself, and tells you how it went. You never plan steps of a walk, never check on a walk in progress and never ask for confirmation before a simple movement.

- Whatever you write as plain text is spoken aloud. Keep it to one or two short, natural sentences. No lists, no markup, no stage directions, never mention tools, ids or that you are an AI model.
- To act, call a skill. When a skill has a "say" field, put your spoken line there and write no other text in that reply: the line is spoken the instant the body starts, with no extra delay.
- Call at most one movement skill per reply. For a multi-step request use run_sequence (or run_skill for a sequence you saved before); the body runs all the steps without coming back to you in between.
- Movement skills return "started" at once. Do not wait, do not call anything to check. When the body finishes you receive a message beginning [action_result]. React with at most one short sentence, or with the next skill if the user's request is not finished. If it failed, say so plainly and offer an alternative; never claim to have arrived when you did not.
- Targets are object ids from the context, or "user". You cannot pass coordinates. If something the user means is not listed, ask them to look at it and say what it is, then call register_marker (or scan_surroundings if the room data says camera vision is available).

# What you know
Every message starts with a [context] block: where you and the user are, what the user is looking toward, every known object with its id, how it is known, and distances, plus your long-term memory. It is always current, so trust it over anything earlier in the conversation. "Here", "come here", "over here" and "to me" always mean the user: use approach_user. "That", "this" and "over there" usually mean what the user is looking toward.
Be truthful about how you know things: only objects marked "seen by the headset camera" may be described as something you see. Objects from the room scan or registered by the user are things you were told about.

# Events
Messages are not always the user speaking. [action_result] reports how an action ended. [world_event] reports a change in the room. [note] is information only. If an event needs no words and no action, reply with exactly <silent> and nothing else.

# Learning
When a sequence of steps would be useful again, pass save_as to run_sequence; if it works it is remembered. Prefer run_skill (with a target_id) for things you already learned. Use remember_object for facts worth keeping about a thing.

Stay at a comfortable distance and never walk into the user.`;function gp(i,t){if(typeof t!="object"||t===null||Array.isArray(t))return"input must be a JSON object";for(let e of i.required??[])if(!(e in t))return`missing required field "${e}"`;for(let[e,n]of Object.entries(t)){let s=i.properties?.[e];if(s){if(s.type==="string"&&typeof n!="string")return`field "${e}" must be a string`;if(s.type==="array"&&!Array.isArray(n))return`field "${e}" must be an array`;if(s.enum&&!s.enum.includes(n))return`field "${e}" must be one of ${s.enum.join(", ")}`}}return null}Nt();var an=(i={},t=[])=>({type:"object",properties:i,required:t,additionalProperties:!1}),xp={type:"string",description:'An object id from the world state (like "chair_1"), or "user".'},go=[{type:"function",name:"get_world_state",description:"Fresh snapshot of the room: where you and the user are, what the user is looking toward, and every known object with its id, origin and distance. Call before answering questions about the surroundings.",parameters:an()},{type:"function",name:"look_at",description:"Turn your body to face an object or the user.",parameters:an({target_id:xp},["target_id"])},{type:"function",name:"walk_to",description:"Walk across the real floor to stand next to an object or the user. Returns immediately; the outcome arrives later as an [action_result].",parameters:an({target_id:xp},["target_id"])},{type:"function",name:"approach_user",description:"Walk over to the user and stop at a comfortable conversational distance, facing them. Outcome arrives later as an [action_result].",parameters:an()},{type:"function",name:"inspect_object",description:"Walk up to an object, face it, and get everything known about it including your saved notes. Outcome arrives later as an [action_result].",parameters:an({id:{type:"string",description:"Object id from the world state."}},["id"])},{type:"function",name:"remember_object",description:"Save a short note about an object to long-term memory (kept across sessions).",parameters:an({id:{type:"string"},note:{type:"string",description:"One short factual sentence."}},["id","note"])},{type:"function",name:"scan_surroundings",description:"Look through the headset camera (the user's current view) and detect real objects. New objects appear in the world state. Outcome arrives later as an [action_result].",parameters:an()},{type:"function",name:"register_marker",description:'Register the spot the user is pointing or looking at as a named object, when the user tells you what something is ("this is my desk"). It is stored as registered-by-user, never as camera-detected.',parameters:an({label:{type:"string",description:'Lowercase singular noun, e.g. "chair".'}},["label"])},{type:"function",name:"follow_user",description:"Keep following the user around at a comfortable distance until told to stop or given another movement. The body handles the walking by itself.",parameters:an()},{type:"function",name:"gesture",description:"Make a body gesture.",parameters:an({type:{type:"string",enum:["wave","nod","shake_head","shrug"]}},["type"])},{type:"function",name:"stop_moving",description:"Stop walking or following immediately.",parameters:an()},{type:"function",name:"run_sequence",description:'Run several primitive skills one after another in a single go, without checking back in between (use this for multi-step requests such as "go to the table, then come back"). If save_as is given and every step succeeds, the sequence is stored as a reusable skill; when all its steps concern one object, it is stored generically and can later be run on any object with run_skill. Outcome arrives later as an [action_result].',parameters:an({steps:{type:"array",items:an({skill:{type:"string",enum:["walk_to","look_at","approach_user","inspect_object","scan_surroundings","gesture"]},target:{type:"string",description:'Object id, "user", or for gesture the gesture type.'}},["skill"])},save_as:{type:"string",description:"Optional snake_case name to remember this sequence under if it works."}},["steps"])},{type:"function",name:"run_skill",description:"Run a skill you saved earlier (run_sequence with save_as). Outcome arrives later as an [action_result].",parameters:an({name:{type:"string"},target_id:{type:"string",description:'Replaces "$target" in the skill steps.'}},["name"])}],uS=45e3,Al=8e3,yp=new Set(["walk_to","look_at","approach_user","inspect_object","scan_surroundings","gesture"]),_p=new Set(["wave","nod","shake_head","shrug"]),Rl=class{constructor(t,e,n){Q(this,"device",t);Q(this,"world",e);Q(this,"memory",n);Q(this,"onFeedback",()=>{});Q(this,"runToken",0);Q(this,"recentFailures",new Map)}async execute(t,e){if(e){e={...e};for(let n of["target_id","id"])typeof e[n]=="string"&&(e[n]=this.world.resolveId(e[n])??e[n])}try{switch(t){case"get_world_state":return{status:"ok",...this.world.describe()};case"look_at":return await this.runPrimitive("look_at",e.target_id);case"walk_to":case"approach_user":case"inspect_object":case"scan_surroundings":{let n=t==="inspect_object"?e.id:t==="walk_to"?e.target_id:void 0,s=this.validate(t,n);return s?this.fail(t,n,s):(this.background(t,n,()=>this.runPrimitive(t,n)),{status:"started",note:"In progress. Say a brief acknowledgement now; the outcome will arrive as an [action_result]."})}case"remember_object":{let n=this.world.find(e.id);return n?(this.memory.rememberObject(n.id,n.label,String(e.note??"")),{status:"succeeded",remembered:{id:n.id,note:e.note}}):this.fail(t,e.id,this.unknownTarget(e.id))}case"register_marker":{let n=String(e.label??"").trim().toLowerCase();if(!n)return{status:"failed",reason:"label is required"};let s=await this.device.request("register_marker",void 0,{label:n},Al);return this.memory.recordOutcome(t,n,s.status,s.reason),{status:s.status,reason:s.reason,...s.data}}case"follow_user":{if(!this.world.snapshot)return this.fail(t,void 0,"The headset has not sent any world data yet.");this.runToken++;let n=await this.device.request("follow_user",void 0,void 0,Al);return this.memory.recordOutcome(t,void 0,n.status,n.reason),{status:n.status,skill:t,reason:n.reason,...n.data}}case"gesture":return await this.runPrimitive("gesture",String(e.type??""));case"run_sequence":return this.runSequence(e);case"stop_moving":{this.runToken++;let n=await this.device.request("stop",void 0,void 0,Al);return{status:n.status,reason:n.reason}}case"run_skill":return this.runSkill(e);default:return{status:"failed",reason:`Unknown skill "${t}". Available: ${go.map(n=>n.name).join(", ")}`}}}catch(n){return this.fail(t,e?.target_id??e?.id,`internal error: ${n?.message??n}`)}}unknownTarget(t){let e=this.world.objects.map(n=>n.id);return`No object with id "${t}". Known ids: ${e.length?e.join(", "):"(none yet)"}, or "user". Try scan_surroundings or ask the user to point at it and use register_marker.`}record(t,e,n,s){let r=`${t}:${e??""}`;if(n==="succeeded")this.recentFailures.delete(r);else{let o=this.recentFailures.get(r),a=o&&Date.now()-o.at<3e4;this.recentFailures.set(r,{count:a?o.count+1:1,at:Date.now(),reason:s})}this.memory.recordOutcome(t,e,n,s)}validate(t,e){let n=this.recentFailures.get(`${t}:${e??""}`);return n&&n.count>=2&&Date.now()-n.at<3e4?`This exact action has just failed ${n.count} times in a row (${n.reason??"no reason given"}). Do not try it again now; tell the user and suggest something else.`:this.world.snapshot?t==="scan_surroundings"?this.device.capabilities.vision?null:"This headset has no camera access for object detection. Ask the user to point at things and use register_marker instead.":t==="approach_user"?null:t==="gesture"?e&&_p.has(e)?null:`Unknown gesture "${e}". Available: ${[..._p].join(", ")}.`:e?e==="user"?t==="inspect_object"?"inspect_object needs an object id, not the user.":null:this.world.find(e)?null:this.unknownTarget(e):"A target id is required.":"The headset has not sent any world data yet."}fail(t,e,n){return this.memory.recordOutcome(t,e,"failed",n),{status:"failed",skill:t,target_id:e,reason:n}}async runPrimitive(t,e){let n=this.validate(t,e);if(n)return this.fail(t,e,n);let s=t,r=t==="look_at"||t==="gesture"?Al:uS,o=t==="gesture"?await this.device.request(s,void 0,{type:e},r):await this.device.request(s,e,void 0,r);this.record(t,e,o.status,o.reason);let a={status:o.status,skill:t,target_id:e,reason:o.reason,...o.data};if(t==="inspect_object"&&o.status==="succeeded"){let l=this.world.find(e);l&&(a.object=this.world.describeObject(l),a.your_notes=this.memory.notesFor(l.id))}return a}background(t,e,n){let s=++this.runToken;n().catch(r=>({status:"failed",skill:t,target_id:e,reason:String(r?.message??r)})).then(r=>{s!==this.runToken&&r.status==="failed"||this.onFeedback(r)})}runSkill(t){let e=String(t.name??"").trim().toLowerCase(),n=this.memory.data.learnedSkills[e];if(!n)return{status:"failed",reason:`No saved skill "${e}". Saved: ${Object.keys(this.memory.data.learnedSkills).join(", ")||"(none)"}`};let s=t.target_id;return n.steps.some(r=>r.target==="$target")&&!s?{status:"failed",reason:`Skill "${e}" needs a target_id.`}:(this.runSteps(e,n.steps,s,r=>this.memory.skillUsed(e,r)),{status:"started",note:`Running ${n.steps.length} steps. The outcome will arrive as an [action_result].`})}runSequence(t){let e=Array.isArray(t.steps)?t.steps.map(r=>({skill:String(r?.skill),target:r?.target})):[];if(e.length===0||e.length>6)return{status:"failed",reason:"A sequence needs 1 to 6 steps."};let n=e.find(r=>!yp.has(r.skill));if(n)return{status:"failed",reason:`Step skill "${n.skill}" is not a primitive. Allowed: ${[...yp].join(", ")}`};for(let r of e){let o=this.validate(r.skill,r.target);if(o)return this.fail("run_sequence",r.target,`step ${r.skill}: ${o}`)}let s=String(t.save_as??"").trim().toLowerCase().replace(/[^a-z0-9_]+/g,"_");return this.runSteps("run_sequence",e,void 0,r=>{if(r&&s&&!go.some(o=>o.name===s)){let o=new Set(e.filter(l=>l.skill!=="gesture"&&l.target&&l.target!=="user").map(l=>l.target)),a=o.size===1?e.map(l=>l.skill!=="gesture"&&o.has(l.target)?{...l,target:"$target"}:l):e;this.memory.saveSkill({name:s,description:`Sequence that worked: ${a.map(l=>`${l.skill}(${l.target??""})`).join(" -> ")}`,steps:a}),this.memory.skillUsed(s,!0)}}),{status:"started",note:`Running ${e.length} steps. The outcome will arrive as an [action_result].`}}runSteps(t,e,n,s){let r=this.runToken+1;this.background(t,n,async()=>{let o=[];for(let a of e){if(this.runToken!==r)return{status:"failed",skill:t,reason:"interrupted by a newer action",steps:o};let l=a.target==="$target"?n:a.target,c=await this.runPrimitive(a.skill,l);if(o.push(c),c.status!=="succeeded")return s(!1),{status:"failed",skill:t,target_id:n,reason:`step ${o.length} (${a.skill}) failed: ${c.reason}`,steps:o}}return s(!0),{status:"succeeded",skill:t,target_id:n,steps:o}})}};Nt();Nt();var hs=class{constructor(){throw new Error("this mind needs the backend; it cannot run inside the browser")}};Q(hs,"OPEN",1);Nt();var sr=class i{constructor(t,e){Q(this,"opts",t);Q(this,"log",e);Q(this,"onSpeechStart",()=>{});Q(this,"onSpeechEnd",()=>{});Q(this,"onTranscript",()=>{});Q(this,"onSpeechConfirmed",()=>{});Q(this,"onUtterance",null);Q(this,"onEarly",null);Q(this,"onResumed",()=>{});Q(this,"ws",null);Q(this,"closed",!1);Q(this,"retries",0);Q(this,"mode","stream");Q(this,"vad",{noise:.004,speaking:!1,confirmed:!1,early:!1,voicedMs:0,silentMs:0,chunks:[],pre:[],ms:0})}async start(){if(this.opts.mode==="http"){this.mode="http";return}try{await this.connect()}catch(t){this.mode="http",this.log("warn",`Live speech-to-text is unreachable (${t?.message??t}); hearing through plain HTTPS instead.`)}}connect(){return new Promise((t,e)=>{let n=this.opts.url??`wss://api.openai.com/v1/realtime?model=${encodeURIComponent(this.opts.model)}`,s=new hs(n,{headers:{Authorization:`Bearer ${this.opts.apiKey}`}});this.ws=s;let r=!1;s.on("open",()=>{r=!0,this.retries=0,s.send(JSON.stringify({type:"session.update",session:{type:"realtime",output_modalities:["text"],audio:{input:{format:{type:"audio/pcm",rate:24e3},transcription:{model:this.opts.transcribeModel},turn_detection:{type:"server_vad",threshold:.6,silence_duration_ms:400,create_response:!1,interrupt_response:!1}}}}})),t()}),s.on("message",o=>{let a;try{a=JSON.parse(o.toString())}catch{return}if(a.type==="input_audio_buffer.speech_started")this.onSpeechStart();else if(a.type==="input_audio_buffer.speech_stopped")this.onSpeechEnd();else if(a.type==="conversation.item.input_audio_transcription.completed"){let l=String(a.transcript??"").trim();l&&this.onTranscript(l)}else a.type==="error"&&this.log("error",`speech-to-text error: ${a.error?.message??JSON.stringify(a)}`)}),s.on("error",o=>{this.log("error",`speech-to-text socket error: ${o.message}`),r||e(o)}),s.on("close",()=>{if(this.closed||!r)return;let o=Math.min(8e3,500*2**this.retries++);setTimeout(()=>!this.closed&&this.connect().catch(()=>{}),o)})})}audio(t){this.mode==="http"?this.detect(Buffer.from(t,"base64")):this.ws?.readyState===hs.OPEN&&this.ws.send(JSON.stringify({type:"input_audio_buffer.append",audio:t}))}detect(t){let e=this.vad,n=t.length>>1;if(n===0)return;let s=0;for(let l=0;l<n;l++){let c=t.readInt16LE(l*2)/32768;s+=c*c}let r=Math.sqrt(s/n),o=n/24e3*1e3,a=r>Math.max(.012,e.noise*3.5);if(a||(e.noise+=(r-e.noise)*.05),!e.speaking){e.pre.push(t),e.pre.length>6&&e.pre.shift(),e.voicedMs=a?e.voicedMs+o:0,e.voicedMs>=120&&(e.speaking=!0,e.confirmed=!1,e.chunks=e.pre.splice(0),e.silentMs=0,e.ms=e.voicedMs,this.onSpeechStart());return}if(e.chunks.push(t),e.ms+=o,a&&(e.voicedMs+=o),!e.confirmed&&e.voicedMs>=300&&(e.confirmed=!0,this.onSpeechConfirmed()),e.silentMs=a?0:e.silentMs+o,a&&e.early?(e.early=!1,this.onResumed()):!e.early&&this.onEarly&&e.silentMs>=120&&e.voicedMs>=250&&(e.early=!0,this.onEarly(Buffer.concat(e.chunks))),e.silentMs>=(this.opts.silenceMs??350)||e.ms>=2e4){let l=Buffer.concat(e.chunks),c=e.voicedMs;e.speaking=!1,e.early=!1,e.chunks=[],e.voicedMs=0,this.onSpeechEnd(),c>=250&&(this.onUtterance?this.onUtterance(l):this.transcribe(l).then(h=>h&&!this.closed&&this.onTranscript(h)))}}static wav(t){let e=Buffer.alloc(44);return e.write("RIFF",0),e.writeUInt32LE(36+t.length,4),e.write("WAVEfmt ",8),e.writeUInt32LE(16,16),e.writeUInt16LE(1,20),e.writeUInt16LE(1,22),e.writeUInt32LE(24e3,24),e.writeUInt32LE(24e3*2,28),e.writeUInt16LE(2,32),e.writeUInt16LE(16,34),e.write("data",36),e.writeUInt32LE(t.length,40),Buffer.concat([e,t])}async transcribe(t){let e=new FormData;e.append("model",this.opts.transcribeModel),e.append("file",new Blob([new Uint8Array(i.wav(t))],{type:"audio/wav"}),"speech.wav");try{let n=await fetch(`${this.opts.httpBaseUrl??"https://api.openai.com/v1"}/audio/transcriptions`,{method:"POST",headers:{authorization:`Bearer ${this.opts.apiKey}`},body:e,signal:AbortSignal.timeout(15e3)});return n.ok?String((await n.json()).text??"").trim():(this.log("error",`speech-to-text failed (${n.status}): ${(await n.text()).slice(0,200)}`),"")}catch(n){return this.log("error",`speech-to-text failed: ${n?.message??n}`),""}}close(){this.closed=!0,this.ws?.close()}},Cl=class{constructor(t,e){Q(this,"opts",t);Q(this,"log",e);Q(this,"onAudio",()=>{});Q(this,"onFirstAudio",()=>{});Q(this,"generation",0);Q(this,"tail",Promise.resolve());Q(this,"aborter",new AbortController)}say(t){if(t=t.trim(),!t)return;let e=this.generation,n=this.aborter.signal,s=fetch(`${this.opts.baseUrl??"https://api.openai.com/v1"}/audio/speech`,{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${this.opts.apiKey}`},body:JSON.stringify({model:this.opts.model,voice:this.opts.voice,input:t,response_format:"pcm",...this.opts.instructions?{instructions:this.opts.instructions}:{}}),signal:n});s.catch(()=>{}),this.tail=this.tail.then(async()=>{if(e===this.generation)try{let r=await s;if(!r.ok||!r.body)throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0,200)}`);let o=Buffer.alloc(0);for await(let a of r.body){if(e!==this.generation)return;let l=o.length?Buffer.concat([o,a]):Buffer.from(a),c=l.length-l.length%2;o=l.subarray(c),l=l.subarray(0,c),l.length&&(this.onFirstAudio(),this.onAudio(l.toString("base64")))}}catch(r){e===this.generation&&r?.name!=="AbortError"&&this.log("error",`text-to-speech failed: ${r?.message??r}`)}})}cancel(){this.generation++,this.aborter.abort(),this.aborter=new AbortController,this.tail=Promise.resolve()}},Il=class{constructor(t){Q(this,"emit",t);Q(this,"buf","")}push(t){for(this.buf+=t;;){let e=this.buf.match(/^([\s\S]*?[.!?…]+["')\]]*)(\s+|$)/);if(!e||e[2]===""&&!/[.!?…]["')\]]*$/.test(this.buf)||e[2]==="")break;this.emit(e[1].trim()),this.buf=this.buf.slice(e[0].length)}}flush(){let t=this.buf.trim();this.buf="",t&&this.emit(t)}};var vp=new Map,fS=go.filter(i=>i.name!=="get_world_state").map(i=>{let t=structuredClone(i.parameters);return mp.has(i.name)&&(t.properties={...t.properties,say:{type:"string",description:'One short natural sentence to say out loud the instant this starts, e.g. "Sure, on my way." Put your spoken reply here rather than in text when you call this tool.'}}),vp.set(i.name,t),{type:"function",function:{name:i.name,description:i.description,parameters:t}}}),dS=go.filter(i=>i.name!=="get_world_state").map(i=>({type:"function",function:{name:i.name,description:i.description,parameters:i.parameters}})),pS=`

# Voice
You hear the user's own voice and you answer out loud in yours; there is no "say" field. Speak the way people talk: one short sentence, a few words when that is enough. When the user asks you to move or look, call the skill AND say a few words ("On my way.") in the same reply. If you cannot make out what was said, ask them to say it again.
When an [action_result] arrives, say a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`,mS=[{re:/^(come( on)?( over| back)?( here| to me)|get over here|over here|come here( now)?)$/,skill:"approach_user"},{re:/^(follow me|come with me|come along|walk with me)$/,skill:"follow_user"},{re:/^(stop|wait|hold on|freeze|halt|stop moving|stay there|stay)$/,skill:"stop_moving"}],gS=new Set(["walk_to","approach_user","follow_user","inspect_object","look_at"]);function xS(i,t=()=>{}){let e=r=>r.split(" ").length<=3?t(r):void 0,n=i.toLowerCase().replace(/[^a-z0-9' ]+/g," ").replace(/\b(hey|hi|ok|okay|sim|please|now|can you|could you|will you|would you|just|yeah|yes|sure|and)\b/g," ").replace(/\s+/g," ").trim();for(let r of mS)if(r.re.test(n))return{skill:r.skill,args:{}};let s=/^(?:go|walk|head|move|run|come|get)(?: over| back| on over)? (?:to|towards?|next to|up to|by) (.+)$/.exec(n);if(s){let r=e(s[1]);if(r==="user")return{skill:"approach_user",args:{}};if(r)return{skill:"walk_to",args:{target_id:r}}}if(s=/^(?:go )?(?:check out|inspect|examine|take a look at|have a look at|go look at|go see) (.+)$/.exec(n),s){let r=e(s[1]);if(r&&r!=="user")return{skill:"inspect_object",args:{id:r}}}if(s=/^(?:look at|face|turn to|turn towards?) (.+)$/.exec(n),s){let r=e(s[1]);if(r)return{skill:"look_at",args:{target_id:r}}}return null}var Pl=class{constructor(t,e){Q(this,"ctx",t);Q(this,"opts",e);Q(this,"name");Q(this,"utterances",0);Q(this,"heardAs",new Map);Q(this,"reflex",{skill:"",at:-1e9});Q(this,"early",null);Q(this,"history",[]);Q(this,"inbox",[]);Q(this,"running",!1);Q(this,"abort",null);Q(this,"closed",!1);Q(this,"speechEndAt",0);Q(this,"lastCallAt",0);Q(this,"worldEventTimer",null);e.mouth&&(e.mouth.onAudio=n=>this.ctx.send({type:"audio",pcm16:n}),e.mouth.onFirstAudio=()=>this.ctx.timer.mark("first_audio")),this.name=e.audioModel?"audio":"gpt",e.ears&&(e.ears.onSpeechStart=()=>this.ctx.send({type:"state",status:"listening"}),e.ears.onSpeechEnd=()=>this.speechEndAt=performance.now(),e.ears.onTranscript=n=>this.heard(n,"voice"),e.audioModel&&(e.ears.onSpeechConfirmed=()=>this.cutOff(),e.ears.onEarly=n=>this.heardAudio(n,!0),e.ears.onResumed=()=>this.discardEarly(),e.ears.onUtterance=n=>this.early?this.confirmEarly():this.heardAudio(n,!1)))}async start(){if(this.opts.ears)try{await this.opts.ears.start()}catch(t){this.ctx.log("error",`Hearing is unavailable (${t?.message??t}): the character cannot hear the microphone. Typed input still works.`),this.opts.ears=null}this.opts.mouth||this.ctx.log("warn","No text-to-speech configured: replies are text only.")}onAudio(t){this.opts.ears?.audio(t)}onText(t){this.heard(t,"text")}interrupt(){this.cutOff(),this.ctx.send({type:"state",status:"idle"})}onFeedback(t){this.inbox.push({kind:"event",text:`[action_result] ${JSON.stringify(t)}`}),this.pump()}onWorldEvent(t,e){if(this.inbox.push({kind:"note",text:`[world_event] ${t}`}),!e){this.inbox.filter(s=>s.kind==="note").length>12&&this.inbox.splice(this.inbox.findIndex(s=>s.kind==="note"),1);return}if(this.worldEventTimer)return;let n=Math.max(1500,this.opts.worldEventMinGapMs-(performance.now()-this.lastCallAt));this.worldEventTimer=setTimeout(()=>{this.worldEventTimer=null;for(let s of this.inbox)s.kind==="note"&&s.text.startsWith("[world_event]")&&(s.kind="event");this.pump()},n)}refreshContext(){}close(){this.closed=!0,this.cutOff(),this.worldEventTimer&&clearTimeout(this.worldEventTimer),this.opts.ears?.close()}heard(t,e){/\p{L}{2,}/u.test(t)&&(this.cutOff(),this.ctx.send({type:"transcript",role:"user",text:t}),this.ctx.timer.begin(e,t,e==="voice"&&this.speechEndAt?this.speechEndAt:performance.now()),e==="voice"&&this.ctx.timer.mark("transcript"),this.obey(t)&&this.inbox.push({kind:"note",text:`[note] The body already obeyed this by reflex (${this.reflex.skill}); do not call a movement skill for it, just say a few words.`}),this.inbox.push({kind:"user",text:`[user said] ${t}`}),this.pump())}heardAudio(t,e){let{ctx:n,opts:s}=this;if(e&&(this.running||this.early))return;e||this.cutOff();let r=++this.utterances,o={};this.heardAs.set(r,o),this.heardAs.size>8&&this.heardAs.delete(this.heardAs.keys().next().value);let a=()=>n.timer.begin("voice","(speech)",performance.now());if(e){let l=()=>{},c=new Promise(h=>l=h);this.early={release:l,gate:c,cancelled:!1,id:r,begin:a}}else a();this.inbox.push({kind:"user",text:"[the user said the attached audio]",audio:sr.wav(t).toString("base64"),utterance:r}),this.pump(),s.ears.transcribe(t).then(async l=>{this.closed||!l||!this.heardAs.has(r)||(this.early?.id===r&&await this.early.gate,this.heardAs.has(r)&&(o.text=l,n.timer.note({input:l.slice(0,80)}),n.send({type:"transcript",role:"user",text:l}),o.message&&(o.message.content=`${o.context}
[user said] ${l}`),this.obey(l)))})}obey(t){let e=xS(t,n=>this.ctx.world.resolveId(n));return!e||this.reflex.skill===e.skill&&performance.now()-this.reflex.at<4e3?!1:(this.reflex={skill:e.skill,at:performance.now()},this.ctx.log("info",`reflex ${e.skill}(${JSON.stringify(e.args)}) for "${t}"`),this.ctx.skills.execute(e.skill,e.args),!0)}confirmEarly(){let t=this.early;this.early=null,this.opts.mouth?.cancel(),this.ctx.send({type:"audio_stop"}),t.begin(),t.release()}discardEarly(){let t=this.early;t&&(t.cancelled=!0,this.early=null,this.heardAs.delete(t.id),this.inbox=this.inbox.filter(e=>e.utterance!==t.id),this.abort?.abort(),t.release())}cutOff(){this.opts.mouth?.cancel(),this.ctx.send({type:"audio_stop"}),this.abort?.abort()}async pump(){if(!(this.running||this.closed)&&this.inbox.some(t=>t.kind!=="note")){this.running=!0;try{for(;!this.closed&&this.inbox.some(t=>t.kind!=="note");){let t=this.inbox.splice(0);!t.some(l=>l.kind==="user")&&t.some(l=>l.kind==="event")&&this.ctx.timer.begin("event",t.find(l=>l.kind==="event").text);let e=`[context]
${this.ctx.world.contextText()}
memory:
${this.ctx.memory.summary()}
[/context]`,n=t.filter(l=>l.audio),s=n[n.length-1],r=`${e}
${t.filter(l=>!l.audio||l===s).map(l=>l.text).join(`
`)}`;for(let l of this.history)l.role==="user"&&Array.isArray(l.content)&&(l.content=String(l.content[0]?.text??"").replace("[the user said the attached audio]","[user said something that was not transcribed]"));let o={role:"user",content:s?[{type:"text",text:r},{type:"input_audio",input_audio:{data:s.audio,format:"wav"}}]:r};if(s){let l=this.heardAs.get(s.utterance);l&&(l.message=o,l.context=e,l.text&&(o.content=`${e}
[user said] ${l.text}`))}this.history.push(o);let a=s&&this.early?.id===s.utterance?this.early:null;this.trimHistory();for(let l=0;l<4&&await this.callOnce(l===0?a:null);l++);if(a?.cancelled){let l=this.history.indexOf(o);l>=0&&this.history.splice(l),this.inbox=this.inbox.filter(c=>!c.text.startsWith("[note] You were interrupted"))}}}catch(t){this.ctx.log("error",`OpenAI brain error: ${t?.message??t}`)}finally{this.running=!1,this.ctx.send({type:"state",status:"idle"})}}}async callOnce(t=null){let{ctx:e,opts:n}=this,s=this.abort=new AbortController,r=setTimeout(()=>s.abort(),2e4);this.lastCallAt=performance.now(),e.timer.mark("llm_request"),e.timer.countLlmCall(),e.send({type:"state",status:"thinking"});let o=[],a=new Map,l=[],c=Promise.resolve(),h="",u=!0,f=!1,d=new Il(y=>this.speak(y)),p=y=>{if(a.has(y)||!o[y])return;let m=c.then(()=>this.runTool(o[y],l));c=m.catch(()=>{}),a.set(y,m)};try{let y=await fetch(`${n.baseUrl??"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${n.apiKey}`,"content-type":"application/json"},body:JSON.stringify(n.audioModel?{model:n.audioModel,stream:!0,modalities:["text","audio"],audio:{voice:n.voice??"alloy",format:"pcm16"},messages:[{role:"system",content:Wh+pS},...this.history],tools:dS}:{model:n.model,stream:!0,messages:[{role:"system",content:Wh},...this.history],tools:fS,...n.effort?{reasoning_effort:n.effort}:{}}),signal:s.signal});if(!y.ok||!y.body){let M=(await y.text().catch(()=>"")).slice(0,300);throw y.status===401?new Error("OpenAI rejected the key. Check it at /setup."):new Error(`OpenAI API error ${y.status}: ${M}. Check OPENAI_PLANNER_MODEL / OPENAI_PLANNER_EFFORT for this account.`)}let m=new TextDecoder,g="";for await(let M of y.body){g+=m.decode(M,{stream:!0});let A;for(;(A=g.indexOf(`
`))>=0;){let E=g.slice(0,A).trim();if(g=g.slice(A+1),!E.startsWith("data:")||E==="data: [DONE]")continue;let x;try{x=JSON.parse(E.slice(5)).choices?.[0]?.delta}catch{continue}if(x){if(t&&(await t.gate,t.cancelled))throw new Error("discarded");u&&(u=!1,e.timer.mark("llm_first_token")),x.audio?.data&&(f||(f=!0,e.timer.mark("speech_text"),e.timer.mark("first_audio"),e.send({type:"state",status:"speaking"})),e.send({type:"audio",pcm16:x.audio.data})),x.audio?.transcript&&(h+=x.audio.transcript),typeof x.content=="string"&&x.content&&(h+=x.content,d.push(x.content));for(let b of x.tool_calls??[]){let I=b.index??0;o[I]||(o[I]={id:b.id??`call_${I}`,name:"",json:""},I>0&&p(I-1)),b.id&&(o[I].id=b.id),b.function?.name&&(o[I].name+=b.function.name),b.function?.arguments&&(o[I].json+=b.function.arguments)}}}}if(clearTimeout(r),this.abort=null,t&&(await t.gate,t.cancelled))return!1;d.flush();for(let M=0;M<o.length;M++)p(M);let v=h.trim();v&&!/^<silent>$/i.test(v)&&e.send({type:"transcript",role:"assistant",text:v}),this.history.push({role:"assistant",content:v||null,...o.length?{tool_calls:o.map(M=>({id:M.id,type:"function",function:{name:M.name,arguments:M.json||"{}"}}))}:{}});let w=!1;for(let M=0;M<o.length;M++){let A=await a.get(M);this.history.push({role:"tool",tool_call_id:o[M].id,content:A.content}),A.failed&&(w=!0)}return w}catch(y){if(clearTimeout(r),this.abort=null,t?.cancelled)return!1;if(s.signal.aborted){await c;let m=[h.trim()?`you had begun saying: "${h.trim().slice(0,200)}"`:"",l.length?`you had already started: ${l.join("; ")}`:""].filter(Boolean);return m.length&&this.inbox.unshift({kind:"note",text:`[note] You were interrupted mid-reply; ${m.join(" and ")}.`}),!1}throw y}}async runTool(t,e){let n=u=>({failed:!0,content:u}),s;try{s=t.json.trim()?JSON.parse(t.json):{}}catch{return n(JSON.stringify({INVALID_JSON:t.json.slice(0,500)}))}let r=vp.get(t.name);if(!r)return n(`Unknown skill "${t.name}".`);let o=gp(r,s);if(o)return n(`Invalid input: ${o}`);let{say:a,...l}=s;if(performance.now()-this.reflex.at<4e3&&(t.name===this.reflex.skill||this.reflex.skill!=="stop_moving"&&gS.has(t.name)))return typeof a=="string"&&a.trim()&&(this.speak(a),this.ctx.send({type:"transcript",role:"assistant",text:a.trim()})),e.push(`${t.name}()`),{failed:!1,content:JSON.stringify({status:"started",note:`The body had already obeyed the user by reflex (${this.reflex.skill}); this call was not needed and was not run.`})};this.ctx.log("info",`skill ${t.name}(${JSON.stringify(l)})`);let c=await this.ctx.skills.execute(t.name,l);this.ctx.log("info",`  -> ${JSON.stringify(c).slice(0,300)}`);let h=c.status==="failed";return!h&&typeof a=="string"&&a.trim()&&(this.speak(a),this.ctx.send({type:"transcript",role:"assistant",text:a.trim()})),h||e.push(`${t.name}(${JSON.stringify(l)})`),{failed:h,content:JSON.stringify(h&&a?{...c,note:'Your "say" line was NOT spoken because this failed.'}:c)}}speak(t){/^<silent>$/i.test(t.trim())||(this.ctx.timer.mark("speech_text"),this.ctx.send({type:"state",status:"speaking"}),this.opts.mouth?.say(t))}trimHistory(){if(!(this.history.length<=60)){for(let t=this.history.length-30;t<this.history.length;t++)if(this.history[t].role==="user"){this.history.splice(0,t);return}}}};Nt();Nt();var Ll=class{constructor(){Q(this,"history",[]);Q(this,"onRecord",()=>{});Q(this,"current",null);Q(this,"t0",0);Q(this,"flushTimer",null)}begin(t,e,n=performance.now()){this.flush(),this.t0=n,this.current={at:new Date().toISOString(),trigger:t,input:e.slice(0,80),ms:{},llm_calls:0},this.flushTimer=setTimeout(()=>this.flush(),8e3)}mark(t){!this.current||t in this.current.ms||(this.current.ms[t]=Math.round(performance.now()-this.t0))}note(t){this.current&&Object.assign(this.current,t)}countLlmCall(){this.current&&this.current.llm_calls++}flush(){this.flushTimer&&clearTimeout(this.flushTimer),this.flushTimer=null;let t=this.current;this.current=null,!(!t||Object.keys(t.ms).length===0)&&(this.history.push(t),this.history.length>200&&this.history.shift(),this.onRecord(t))}static summarize(t){let e={};for(let s of t){for(let[r,o]of Object.entries(s.ms))(e[r]??(e[r]=[])).push(o);s.plan_ms!==void 0&&(e.plan_ms??(e.plan_ms=[])).push(s.plan_ms)}let n={};for(let[s,r]of Object.entries(e))r.sort((o,a)=>o-a),n[s]={n:r.length,p50:r[Math.floor((r.length-1)*.5)],p90:r[Math.floor((r.length-1)*.9)]};return n}};Nt();var yS={type:"object",additionalProperties:!1,required:["objects"],properties:{objects:{type:"array",items:{type:"object",additionalProperties:!1,required:["label","x","y","confidence"],properties:{label:{type:"string",description:'lowercase singular noun, e.g. "chair"'},x:{type:"number",description:"horizontal centre of the object, 0 (left edge) to 1 (right edge)"},y:{type:"number",description:"vertical centre of the object, 0 (top edge) to 1 (bottom edge)"},confidence:{type:"number",description:"0 to 1"}}}}}},_S="This is one frame from a mixed-reality headset camera in a room. List up to 8 distinct physical objects a person could walk up to or point at (furniture, appliances, bags, plants, laptops, bottles and so on). Skip walls, floor, ceiling, people and anything you are unsure about. For each give a lowercase singular label and the centre point of the object's visible body in normalised image coordinates.";async function Sp(i,t){let e=await fetch(`${t.baseUrl??"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${t.apiKey}`},body:JSON.stringify({model:t.model,messages:[{role:"user",content:[{type:"text",text:_S},{type:"image_url",image_url:{url:`data:image/jpeg;base64,${i}`}}]}],response_format:{type:"json_schema",json_schema:{name:"detections",strict:!0,schema:yS}}}),signal:AbortSignal.timeout(2e4)});if(!e.ok)throw new Error(`vision HTTP ${e.status}: ${(await e.text()).slice(0,300)}`);let n=await e.json(),s=JSON.parse(n.choices?.[0]?.message?.content??'{"objects":[]}'),r=o=>Math.max(0,Math.min(1,Number(o)||0));return s.objects.map(o=>({label:String(o.label).toLowerCase().trim().replace(/\s+/g,"_"),x:r(o.x),y:r(o.y),confidence:r(o.confidence)})).filter(o=>o.label&&o.confidence>=.4)}Nt();var Mp=(i,t)=>[i[0]-t[0],i[1]-t[1],i[2]-t[2]],rr=(i,t)=>Math.hypot(i[0]-t[0],i[2]-t[2]),Xh={detected:"seen by the headset camera",room_scan:"from the user's room setup scan (not camera detection)",manual:"registered by the user pointing at it (not camera detection)",simulated:"simulated test object"},Dl=class i{constructor(){Q(this,"snapshot",null);Q(this,"updatedAt",0)}update(t){this.snapshot=t,this.updatedAt=Date.now()}get objects(){return this.snapshot?.objects??[]}find(t){if(!t)return;let e=t.trim().toLowerCase();return this.objects.find(n=>n.id.toLowerCase()===e)}resolveId(t){if(!t)return;let e=t.trim().toLowerCase().replace(/[^a-z0-9_ ]+/g,"").replace(/^(the|that|this|my|a|an) /,"").trim();if(!e)return;if(["user","me","myself","you"].includes(e))return"user";let n=this.find(e);if(n)return n.id;let s=e.replace(/_/g," "),r=this.objects.filter(o=>{let a=o.label.toLowerCase().replace(/_/g," ");return a===s||new RegExp(`\\b${a.replace(/[^a-z0-9 ]/g,"")}s?\\b`).test(s)});return r.length===1?r[0].id:void 0}signature(){return this.objects.map(t=>`${t.id}:${t.label}:${t.source}:${t.reachable??""}`).sort().join("|")}static bearing(t,e){let n=Mp(e,t.pos),s=t.fwd[0],r=t.fwd[2],o=Math.atan2(r*n[0]-s*n[2],s*n[0]+r*n[2])*180/Math.PI,a=Math.abs(o),l=o>0?"right":"left";return a<20?"straight ahead":a<70?`ahead-${l}`:a<110?`to the ${l}`:a<160?`behind-${l}`:"behind"}gazeTarget(t=25){let e=this.snapshot;if(!e)return;let n,s=t;for(let r of e.objects){let o=Mp(r.pos,e.user.pos),a=Math.hypot(o[0],o[2]),l=Math.hypot(e.user.fwd[0],e.user.fwd[2]);if(a<.2||l<.1)continue;let c=(o[0]*e.user.fwd[0]+o[2]*e.user.fwd[2])/(a*l),h=Math.acos(Math.max(-1,Math.min(1,c)))*180/Math.PI;h<s&&(s=h,n=r)}return n}describeObject(t){let e=this.snapshot;return{id:t.id,label:t.label,origin:Xh[t.source]??t.source,confidence:Number(t.confidence.toFixed(2)),metres_from_you:Number(rr(t.pos,e.avatar.pos).toFixed(1)),metres_from_user:Number(rr(t.pos,e.user.pos).toFixed(1)),direction_for_user:i.bearing(e.user,t.pos),seconds_since_observed:Math.round(t.lastSeen),reachable:t.reachable??!0}}describe(){let t=this.snapshot;if(!t)return{status:"no world data from the headset yet"};let e=this.gazeTarget();return{you:{state:t.avatar.state,metres_from_user:Number(rr(t.avatar.pos,t.user.pos).toFixed(1)),direction_for_user:i.bearing(t.user,t.avatar.pos)},user_is_looking_toward:e?e.id:"nothing you know about",room:t.room??"unknown",objects:t.objects.map(n=>this.describeObject(n))}}summary(){let t=this.snapshot;return t?t.objects.length===0?"You know of no objects in the room yet.":t.objects.map(e=>`- ${e.id}: a ${e.label}, ${Xh[e.source]??e.source}${e.reachable===!1?", NOT reachable on foot":""}`).join(`
`):"No world data from the headset yet."}contextText(){let t=this.snapshot;if(!t)return"No world data from the headset yet.";let e=this.gazeTarget(),n=[`you: ${t.avatar.state}, ${rr(t.avatar.pos,t.user.pos).toFixed(1)} m from the user, ${i.bearing(t.user,t.avatar.pos)} of them`,`user is looking toward: ${e?e.id:"nothing you know about"}`,`room: ${t.room?`${t.room.source}, walkable floor ${t.room.navmesh?"mapped":"NOT mapped"}`:"unknown"}`];if(t.objects.length===0)n.push("objects: none known yet");else{n.push("objects:");for(let s of t.objects)n.push(`- ${s.id}: ${s.label}, ${Xh[s.source]??s.source}, ${rr(s.pos,t.avatar.pos).toFixed(1)} m from you, ${rr(s.pos,t.user.pos).toFixed(1)} m from the user (${i.bearing(t.user,s.pos)} for them)${s.source==="detected"?`, last seen ${Math.round(s.lastSeen)} s ago, confidence ${s.confidence.toFixed(1)}`:""}${s.reachable===!1?", NOT reachable on foot":""}`)}return n.join(`
`)}};var $h=[],Fl=class{constructor(t,e,n,s){Q(this,"link",t);Q(this,"opts",e);Q(this,"capabilities",{});Q(this,"world",new Dl);Q(this,"skills");Q(this,"brain");Q(this,"pending",new Map);Q(this,"nextId",1);Q(this,"worldSig","");Q(this,"refreshTimer",null);Q(this,"device","unknown");Q(this,"timer",new Ll);Q(this,"knownIds",null);Q(this,"userFar",!1);Q(this,"disposed",!1);this.skills=new Rl(this,this.world,n);let r={send:l=>this.send(l),skills:this.skills,world:this.world,memory:n,timer:this.timer,log:(l,c)=>this.log(l,c)};this.timer.onRecord=l=>{$h.push(l),$h.length>500&&$h.shift(),this.log("info",`latency ${l.trigger} "${l.input}": ${Object.entries(l.ms).map(([c,h])=>`${c}=${h}ms`).join(" ")}${l.plan_ms!==void 0?` plan=${l.plan_ms}ms`:""} llm_calls=${l.llm_calls}`),this.send({type:"metrics",turn:l})};let o=(l,c)=>this.log(l,c);this.brain=s(e,r,o,e.brain),this.skills.onFeedback=l=>{this.log("info",`feedback ${JSON.stringify(l).slice(0,300)}`),this.brain.refreshContext(),this.brain.onFeedback(l,!0)};let a=()=>this.send({type:"ready",protocol:1,brain:this.brain.name,audioRate:24e3});this.brain.start().then(a).catch(l=>{if(this.brain.name==="realtime"&&!e.brainFixed&&e.apiKey)return this.log("warn",`live speech-to-speech is unavailable (${l?.message??l}); using the 'audio' mind instead.`),this.brain.close(),this.brain=s(e,r,o,"audio"),this.brain.start().then(a);this.log("error",`brain failed to start: ${l?.message??l}. Check OPENAI_API_KEY / network.`)}).catch(l=>this.log("error",`brain failed to start: ${l?.message??l}. Check OPENAI_API_KEY / network.`))}log(t,e){this.opts.quiet||console[t==="info"?"log":t](`[${this.device}] ${e}`),t!=="info"&&this.send({type:"log",level:t,message:e})}send(t){this.link.open()&&this.link.send(JSON.stringify(t)),t.type==="transcript"&&!this.opts.quiet&&console.log(`[${this.device}] ${t.role}: ${t.text}`)}request(t,e,n,s=3e4){let r=`a${this.nextId++}`;return new Promise(o=>{let a=setTimeout(()=>{this.pending.delete(r),o({type:"action_result",id:r,status:"failed",reason:`The headset did not finish ${t} within ${s/1e3}s.`})},s);this.pending.set(r,{resolve:o,timer:a}),this.send({type:"action",id:r,action:t,target_id:e,params:n,status:"requested"}),this.timer.mark("action_dispatched")})}receive(t){let e;try{e=JSON.parse(t)}catch{return}this.onMessage(e)}onMessage(t){switch(t.type){case"hello":this.device=t.device,this.capabilities=t.capabilities??{},this.log("info",`hello protocol=${t.protocol} capabilities=${JSON.stringify(this.capabilities)}`),t.protocol!==1&&this.log("warn",`protocol mismatch: device ${t.protocol}, backend ${1}`);break;case"audio":this.brain.onAudio(t.pcm16);break;case"text":this.brain.onText(t.text);break;case"interrupt":this.brain.interrupt();break;case"world":{this.world.update(t.world),this.detectWorldEvents();let e=this.world.signature();e!==this.worldSig&&(this.worldSig=e,this.refreshTimer&&clearTimeout(this.refreshTimer),this.refreshTimer=setTimeout(()=>this.brain.refreshContext(),400));break}case"action_result":{let e=this.pending.get(t.id);if(!e)break;clearTimeout(e.timer),this.pending.delete(t.id),e.resolve(t);break}case"frame":this.onFrame(t.id,t.jpeg);break;case"event":t.name==="action_started"?(this.timer.mark("device_started"),this.timer.note({plan_ms:Number(t.data?.plan_ms??0),path_m:Number(t.data?.path_m??0)})):this.log("info",`event ${t.name} ${JSON.stringify(t.data??{})}`);break}}detectWorldEvents(){let t=this.world.snapshot;if(!t||!this.brain.onWorldEvent)return;let e=new Set(t.objects.map(s=>s.id));if(this.knownIds&&this.pending.size===0){for(let s of t.objects)this.knownIds.has(s.id)||this.brain.onWorldEvent(`A new object is now known: ${s.id} (${s.label}).`,!1);for(let s of this.knownIds)e.has(s)||this.brain.onWorldEvent(`Object ${s} is no longer known.`,!1)}this.knownIds=e;let n=Math.hypot(t.avatar.pos[0]-t.user.pos[0],t.avatar.pos[2]-t.user.pos[2]);!this.userFar&&n>3.5&&t.avatar.state==="idle"?(this.userFar=!0,this.brain.onWorldEvent(`The user has moved away; they are now ${n.toFixed(1)} m from you.`,!0)):this.userFar&&n<2.5&&(this.userFar=!1)}async onFrame(t,e){if(!this.opts.apiKey){this.send({type:"detections",frameId:t,items:[],error:"No vision model configured on the backend (OPENAI_API_KEY missing)."});return}try{let n=await Sp(e,{apiKey:this.opts.apiKey,model:this.opts.visionModel});this.log("info",`vision: ${n.map(s=>`${s.label}@${s.x.toFixed(2)},${s.y.toFixed(2)}`).join(" ")||"nothing"}`),this.send({type:"detections",frameId:t,items:n})}catch(n){this.log("error",`vision failed: ${n?.message??n}`),this.send({type:"detections",frameId:t,items:[],error:String(n?.message??n)})}}dispose(){if(!this.disposed){this.disposed=!0,this.refreshTimer&&clearTimeout(this.refreshTimer);for(let t of this.pending.values())clearTimeout(t.timer),t.resolve({type:"action_result",id:"",status:"failed",reason:"headset disconnected"});this.pending.clear(),this.brain.close(),this.opts.quiet||console.log(`[${this.device}] disconnected`)}}};function bp(i,t){let e={port:0,brain:"audio",apiKey:i,realtimeModel:"gpt-realtime",realtimeVoice:"alloy",visionModel:"gpt-4.1-mini",memoryPath:"memory.json"},n=!0,s=new Fl({send:r=>{Promise.resolve().then(()=>n&&t(r))},open:()=>n},e,new Tl("memory.json"),(r,o,a)=>new Pl(o,{apiKey:i,model:"gpt-5.4-mini",effort:"none",ears:new sr({apiKey:i,model:r.realtimeModel,transcribeModel:"gpt-4o-mini-transcribe",mode:"http"},a),mouth:new Cl({apiKey:i,model:"gpt-4o-mini-tts",voice:"alloy"},a),worldEventMinGapMs:8e3,audioModel:"gpt-audio-mini",voice:"alloy"}));return{send:r=>n&&s.receive(r),close:()=>{n=!1,s.dispose()}}}var Zn=new URLSearchParams(location.search),_e=i=>document.getElementById(i),vS=/OculusBrowser|Quest/i.test(navigator.userAgent),Le=new yl({antialias:!0,alpha:!0});Le.setPixelRatio(Math.min(2,window.devicePixelRatio||1));Le.setSize(window.innerWidth,window.innerHeight);Le.outputColorSpace=ne;Le.xr.enabled=!0;document.body.prepend(Le.domElement);var En=new Tr,ln=new Te(65,window.innerWidth/window.innerHeight,.05,50);ln.position.set(0,1.6,1.2);ln.rotation.order="YXZ";En.add(ln);En.add(new Xr(16777215,9080728,1.6));var Op=new ss(16777215,1.4);Op.position.set(1.5,3,2);En.add(Op);window.addEventListener("resize",()=>{Le.xr.isPresenting||(ln.aspect=window.innerWidth/window.innerHeight,ln.updateProjectionMatrix(),Le.setSize(window.innerWidth,window.innerHeight))});var ae={source:"unknown",floorY:null,floors:[],obstacles:[],origin:{x:0,z:0}},wp=.25;function Bl(i,t,e){let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let o=e[s],a=e[r];o[1]>t!=a[1]>t&&i<(a[0]-o[0])*(t-o[1])/(a[1]-o[1])+o[0]&&(n=!n)}return n}function Ep(i,t,e){let n=1/0;for(let s=0,r=e.length-1;s<e.length;r=s++){let o=e[r][0],a=e[r][1],l=e[s][0]-o,c=e[s][1]-a,h=l*l+c*c,u=h>0?Math.max(0,Math.min(1,((i-o)*l+(t-a)*c)/h)):0;n=Math.min(n,Math.hypot(i-o-l*u,t-a-c*u))}return n}function tu(i,t){if(ae.floorY===null)return!1;if(ae.floors.length>0){let e=!1;for(let n of ae.floors)Bl(i,t,n)&&Ep(i,t,n)>wp&&(e=!0);if(!e)return!1}else if(Math.hypot(i-ae.origin.x,t-ae.origin.z)>4)return!1;for(let e of ae.obstacles)if(Bl(i,t,e.poly)||Ep(i,t,e.poly)<wp)return!1;return!0}var Oi=null,jh=null,or=null,_o=0,wo=new Set,Nl=new Uint8Array(256);function Eo(){return Oi||(Oi=new(window.AudioContext||window.webkitAudioContext),jh=Oi.createGain(),or=Oi.createAnalyser(),or.fftSize=512,jh.connect(or),or.connect(Oi.destination)),Oi.state==="suspended"&&Oi.resume(),Oi}function SS(i){let t=Eo(),e=t.createBuffer(1,i.length,mo.AUDIO_RATE),n=e.getChannelData(0);for(let r=0;r<i.length;r++)n[r]=i[r]/32768;let s=t.createBufferSource();s.buffer=e,s.connect(jh),_o=Math.max(_o,t.currentTime+.04),s.start(_o),_o+=e.duration,wo.add(s),s.onended=()=>wo.delete(s)}function MS(){for(let i of wo)try{i.stop()}catch{}wo.clear(),_o=0}function bS(){if(!or||wo.size===0)return 0;or.getByteTimeDomainData(Nl);let i=0;for(let t=0;t<Nl.length;t++){let e=(Nl[t]-128)/128;i+=e*e}return Math.min(1,Math.sqrt(i/Nl.length)*5)}var Tp=!1;async function Bp(){if(Tp)return!0;try{let i=Eo(),t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,channelCount:1}}),e="class P extends AudioWorkletProcessor{process(i){const c=i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('simulacra-mic',P)";await i.audioWorklet.addModule(URL.createObjectURL(new Blob([e],{type:"text/javascript"})));let n=new AudioWorkletNode(i,"simulacra-mic");return n.port.onmessage=s=>Yt.pushMic(s.data,s.data.length,i.sampleRate),i.createMediaStreamSource(t).connect(n),Tp=!0,_e("mic").disabled=!0,_e("mic").textContent="Microphone on",!0}catch(i){return ar("Microphone unavailable: "+(i&&i.message?i.message:i)),!1}}var fs=null,us=new F,Bi=new F;function mi(){return Le.xr.isPresenting?Le.xr.getCamera():ln}function Ap(i,t){let e=null,n=8,s=(r,o)=>{if(Math.abs(t.y)<1e-4)return;let a=(r-i.y)/t.y;if(a<=.05||a>=n)return;let l=i.x+t.x*a,c=i.z+t.z*a;o(l,c)&&(n=a,e=new F(l,r,c))};for(let r of ae.obstacles)s(r.top,(o,a)=>Bl(o,a,r.poly));return ae.floorY!==null&&s(ae.floorY,()=>!0),e}var wS={send:i=>{On&&On.readyState===WebSocket.OPEN&&On.send(i)},headPosition:()=>(mi().getWorldPosition(us),nr(us.x,us.y,us.z)),headForward:()=>(mi().getWorldDirection(Bi),nr(Bi.x,Bi.y,Bi.z)),floorY:()=>ae.floorY,isFloor:i=>tu(i.x,-i.z),pointerHit:()=>{let i=fs&&fs.visible?fs:mi();i.getWorldPosition(us),i.getWorldDirection(Bi),i!==mi()&&Bi.negate();let t=Ap(us,Bi)||(i!==mi()?Ap(mi().getWorldPosition(us),mi().getWorldDirection(Bi)):null);return t?nr(t.x,t.y,t.z):null},playAudio:SS,stopAudio:MS,log:i=>console.log(i),roomInfo:()=>({source:ae.source,obstacles:ae.obstacles.length})},kl=!0,Yt=new mo(wS,"webxr");Yt.wander=Zn.get("wander")!=="0";var On=null,To=!/^\/xr\//.test(location.pathname);function ES(){let i="";try{i=localStorage.getItem("simulacra.backend")||""}catch{}return Zn.get("backend")||(To?i:(location.protocol==="https:"?"wss://":"ws://")+location.host)}function eu(){try{return localStorage.getItem("simulacra.openaiKey")||""}catch{return""}}var kp=()=>To&&!Zn.get("backend")&&!!eu(),xo=0;function vo(){let i=++xo;if(kp()){let n=bp(eu(),s=>{i===xo&&Yt.onMessage(s)});On={readyState:WebSocket.OPEN,send:s=>n.send(s),close:()=>{n.close(),Yt.onClose(),vo()}},Yt.onOpen();return}let t=ES();if(document.activeElement!==_e("backend")&&(_e("backend").value=t),!t)return;let e=On=new WebSocket(t.replace(/\/$/,"")+"/device");e.onopen=()=>Yt.onOpen(),e.onmessage=n=>{typeof n.data=="string"&&i===xo&&Yt.onMessage(n.data)},e.onclose=()=>{i===xo&&(Yt.onClose(),setTimeout(()=>{i===xo&&vo()},2e3))},e.onerror=()=>{}}var cn=new Ke;cn.visible=!1;En.add(cn);var zl=document.createElement("canvas");zl.width=zl.height=128;var nu=zl.getContext("2d"),iu=nu.createRadialGradient(64,64,6,64,64,64);iu.addColorStop(0,"rgba(0,0,0,0.5)");iu.addColorStop(1,"rgba(0,0,0,0)");nu.fillStyle=iu;nu.fillRect(0,0,128,128);var su=new Re(new li(.95,.95),new ji({map:new ks(zl),transparent:!0,depthWrite:!1}));su.rotation.x=-Math.PI/2;su.position.y=.006;cn.add(su);var Rp={hips:["bip01 pelvis","hips"],head:["bip01 head","head"],lUpperArm:["bip01 l upperarm","leftarm"],lForearm:["bip01 l forearm","leftforearm"],rUpperArm:["bip01 r upperarm","rightarm"],rForearm:["bip01 r forearm","rightforearm"],lThigh:["bip01 l thigh","leftupleg"],lCalf:["bip01 l calf","leftleg"],lFoot:["bip01 l foot","leftfoot"],rThigh:["bip01 r thigh","rightupleg"],rCalf:["bip01 r calf","rightleg"],rFoot:["bip01 r foot","rightfoot"]},TS=i=>{let t=String(i).toLowerCase().replace(/_/g," ").replace(/\s+/g," ").trim(),e=t.lastIndexOf(":");return e>=0&&(t=t.substring(e+1)),t.replace(/^mixamorig/,"")},Tt={ready:!1,bones:{},rest:{},leg:.85,phase:0,walk:0,headYaw:0,headPitch:0,gesture:"",gestureT:0,jaw:[],blink:[],blinkAt:2,jawNow:0,kind:"none"},Cp=new ye,Ip=new ye,So=new F(0,1,0);function AS(i,t){i.parent.getWorldQuaternion(Ip),i.quaternion.copy(Ip.invert().multiply(t)),i.updateMatrixWorld(!0)}function Xe(i,t,e){let n=Tt.bones[i];!n||e===0||(n.getWorldQuaternion(Cp),AS(n,new ye().setFromAxisAngle(t,e).multiply(Cp)))}function Pp(i,t,e){let n=Tt.bones[i],s=Tt.bones[t];if(!n||!s)return;let r=s.getWorldPosition(new F).sub(n.getWorldPosition(new F)).normalize(),o=new F(e.x*.13,-1,e.z*.13).normalize(),a=new F().crossVectors(r,o),l=a.length();l<1e-4||Xe(i,a.normalize(),Math.atan2(l,r.dot(o)))}function RS(i,t){let e={};i.traverse(l=>{let c=TS(l.name);if(c in e||(e[c]=l),l.isMesh&&(l.frustumCulled=!1,l.morphTargetDictionary))for(let h in l.morphTargetDictionary){let u=h.toLowerCase();u.includes("jawopen")?Tt.jaw.push([l,l.morphTargetDictionary[h]]):(u.includes("eyeblinkleft")||u.includes("eyeblinkright"))&&Tt.blink.push([l,l.morphTargetDictionary[h]])}});for(let l in Rp)for(let c of Rp[l])e[c]&&!Tt.bones[l]&&(Tt.bones[l]=e[c]);cn.add(i),i.updateMatrixWorld(!0);let n=Tt.bones,s=l=>l.getWorldPosition(new F);if(n.head&&n.lFoot){let l=s(n.head).sub(s(n.lFoot));Math.abs(l.z)>Math.abs(l.y)?i.rotation.x+=l.z>0?-Math.PI/2:Math.PI/2:l.y<0&&(i.rotation.x+=Math.PI),i.updateMatrixWorld(!0)}if(n.lThigh&&n.rThigh){let l=s(n.rThigh).sub(s(n.lThigh)),c=new F().crossVectors(So,l);i.rotation.y-=Math.atan2(c.x,c.z),i.updateMatrixWorld(!0)}let r=new tn().setFromObject(i,!0),o=r.max.y-r.min.y,a=Number(Zn.get("height"))||1.7;o>.01&&i.scale.multiplyScalar(a/o),i.updateMatrixWorld(!0),r.setFromObject(i,!0),i.position.x-=(r.min.x+r.max.x)/2,i.position.z-=(r.min.z+r.max.z)/2,i.position.y-=r.min.y,i.updateMatrixWorld(!0);for(let l in n)Tt.rest[l]=n[l].quaternion.clone();if(Tt.ready=!!(n.lThigh&&n.rThigh&&n.lCalf&&n.rCalf),Tt.ready&&n.lFoot){let l=s(n.lThigh).distanceTo(s(n.lCalf))+s(n.lCalf).distanceTo(s(n.lFoot));l>.3&&l<1.4&&(Tt.leg=l)}Tt.kind=t}function Yh(){let i=new Ke,t=new Xn({color:7311285,roughness:.8}),e=(s,r)=>{let o=new Re(s,t);return o.position.y=r,i.add(o),o};e(new ts(.17,.5,6,16),1.12),e(new zr(.115,20,16),1.6),e(new ts(.075,.68,4,12),.42).position.x=-.1,e(new ts(.075,.68,4,12),.42).position.x=.1;let n=e(new Fr(.03,.08,8),1.6);n.position.z=.13,n.rotation.x=Math.PI/2,cn.add(i),Tt.kind="placeholder"}function CS(){return new Promise(i=>{if(Zn.get("avatar")==="placeholder")return Yh(),i();let t=new is,e=(s,r)=>{let o=t.load("./avatar/"+s);return r&&(o.colorSpace=ne),o},n=new Vs;n.setURLModifier(s=>/\.fbx$/i.test(s)?s:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),new bl(n).load("./avatar/RocketboxAdult.fbx",s=>{try{let r={},o=a=>{let l=String(a.name||"").toLowerCase();if(r[l])return r[l];let c;return l.includes("opacity")?c=new Xn({map:e("f006_opacity_color.png",!0),transparent:!0,alphaTest:.35,side:Sn,roughness:.75}):l.includes("head")?c=new Xn({map:e("f006_head_color.png",!0),normalMap:e("f006_head_normal.png",!1),roughness:.7}):c=new Xn({map:e("f006_body_color.png",!0),normalMap:e("f006_body_normal.png",!1),roughness:.8}),c.name=a.name,r[l]=c,c};s.traverse(a=>{a.isMesh&&(a.material=Array.isArray(a.material)?a.material.map(o):o(a.material))}),RS(s,"rocketbox")}catch(r){console.warn("avatar setup failed, using the placeholder",r),Yh()}i()},void 0,s=>{console.warn("avatar failed to load, using the placeholder",s),Yh(),i()})})}function IS(i,t){let e=Yt.avatar,n=cp(e.pos);cn.position.set(n.x,n.y,n.z),cn.rotation.y=Math.PI-e.yaw,cn.updateMatrixWorld(!0),e.gesture&&(Tt.gesture=e.gesture,Tt.gestureT=0);let s=bS();Tt.jawNow+=(s-Tt.jawNow)*Math.min(1,i*18);for(let[y,m]of Tt.jaw)y.morphTargetInfluences[m]=Tt.jawNow*.8;Tt.blinkAt-=i;let r=Tt.blinkAt<.12?1:0;Tt.blinkAt<0&&(Tt.blinkAt=2.5+Math.random()*3);for(let[y,m]of Tt.blink)y.morphTargetInfluences[m]=r;if(!Tt.ready)return;for(let y in Tt.bones)Tt.bones[y].quaternion.copy(Tt.rest[y]);cn.updateMatrixWorld(!0);let o=new F(Math.sin(e.yaw),0,-Math.cos(e.yaw)),a=new F().crossVectors(o,So).normalize(),l=a.clone().negate();Pp("lUpperArm","lForearm",l),Pp("rUpperArm","rForearm",a),Xe("lForearm",a,.24),Xe("rForearm",a,.24);let c=e.speed01>.06?1:0;Tt.walk+=Math.max(-i*4,Math.min(i*4,c-Tt.walk));let h=.42*Math.max(.35,Math.min(1.2,e.speed01));Tt.phase+=2*Math.PI*t/Math.max(.25,4*Tt.leg*Math.sin(h));let u=Math.sin(Tt.phase),f=Math.cos(Tt.phase);Xe("lThigh",a,u*h*Tt.walk),Xe("rThigh",a,-u*h*Tt.walk),Xe("lCalf",a,-Math.max(0,f)*.6*Tt.walk),Xe("rCalf",a,-Math.max(0,-f)*.6*Tt.walk),Xe("lUpperArm",a,-u*h*.6*Tt.walk),Xe("rUpperArm",a,u*h*.6*Tt.walk);let d=0,p=0;if(Tt.gesture){Tt.gestureT+=i;let y=Tt.gestureT,m=Math.min(1,y*4)*Math.min(1,Math.max(0,(1.8-y)*4));Tt.gesture==="wave"?(Xe("rUpperArm",o,-1.9*m),Xe("rForearm",o,-(.9+Math.sin(y*11)*.4)*m)):Tt.gesture==="shrug"?(Xe("lUpperArm",o,.35*m),Xe("rUpperArm",o,-.35*m),Xe("lForearm",a,.9*m),Xe("rForearm",a,.9*m)):Tt.gesture==="nod"?d=Math.sin(y*9)*.22*m:Tt.gesture==="shake_head"&&(p=Math.sin(y*9)*.35*m),y>1.8&&(Tt.gesture="")}if(Tt.bones.head){let y=Tt.bones.head.getWorldPosition(new F),m=mi().getWorldPosition(new F).sub(y),g=Math.atan2(m.x,m.z)-Math.atan2(o.x,o.z);g=Math.atan2(Math.sin(g),Math.cos(g));let v=Math.atan2(m.y,Math.hypot(m.x,m.z));Math.abs(g)>1.3&&(g=0,v=0);let w=Math.min(1,i*6);Tt.headYaw+=(Math.max(-1,Math.min(1,g))*.75-Tt.headYaw)*w,Tt.headPitch+=(Math.max(-.4,Math.min(.4,v))*.7-Tt.headPitch)*w,Xe("head",So,Tt.headYaw+p),Xe("head",a.clone().applyAxisAngle(So,Tt.headYaw),Tt.headPitch-d)}}var Ul=new Ke;function PS(){En.background=new It(1712166),ae.source="simulated",ae.floorY=0,ae.floors=[[[-2.6,-5],[2.6,-5],[2.6,2],[-2.6,2]]];let i=new Re(new li(5.2,7),new Xn({color:5858158,roughness:.95}));i.rotation.x=-Math.PI/2,i.position.set(0,0,-1.5),Ul.add(i);let t=(s,r,o,a,l,c,h,u)=>{let f=new Re(new Ri(l,c,h),new Xn({color:u,roughness:.85}));f.position.set(o,c/2,a),Ul.add(f),ae.obstacles.push({id:s,label:r,top:c,poly:[[o-l/2,a-h/2],[o+l/2,a-h/2],[o+l/2,a+h/2],[o-l/2,a+h/2]]}),Yt.upsert(s,r,nr(o,c/2,a),{x:l,y:c,z:h},"simulated")};t("table_1","table",.2,-2.4,1.3,.74,.7,9071178),t("chair_1","chair",-1.5,-3.6,.5,.9,.5,5078154),t("plant_1","plant",1.9,-4.2,.4,1.1,.4,5212759),En.add(Ul);let e={},n=null;return Le.domElement.addEventListener("pointerdown",s=>{n=[s.clientX,s.clientY]}),window.addEventListener("pointerup",()=>{n=null}),window.addEventListener("pointermove",s=>{n&&(ln.rotation.y-=(s.clientX-n[0])*.004,ln.rotation.x=Math.max(-1.2,Math.min(1.2,ln.rotation.x-(s.clientY-n[1])*.004)),n=[s.clientX,s.clientY])}),window.addEventListener("keydown",s=>{s.target===document.body&&(e[s.key.toLowerCase()]=!0)}),window.addEventListener("keyup",s=>{e[s.key.toLowerCase()]=!1}),s=>{let r=(e.w||e.arrowup?1:0)-(e.s||e.arrowdown?1:0),o=(e.d||e.arrowright?1:0)-(e.a||e.arrowleft?1:0);if(!r&&!o)return;let a=ln.rotation.y;ln.position.x+=(-Math.sin(a)*r+Math.cos(a)*o)*s*1.4,ln.position.z+=(-Math.cos(a)*r-Math.sin(a)*o)*s*1.4}}var Mo=null,ru=[],Lp=0,bo=!1,Dp=!1,Ol=0,Fp=new Map,Zh={},Kh=new Ke;En.add(Kh);function LS(i,t){let e=Fp.get(i);return e||(Zh[t]=(Zh[t]||0)+1,e=t+"_"+Zh[t],Fp.set(i,e)),e}var Np=i=>String(i||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");function DS(i,t){let e=[],n=[],s=new wt,r=[],o=i.detectedPlanes;if(o)for(let h of o){let u=i.getPose(h.planeSpace,t);if(!u||!h.polygon||h.polygon.length<3)continue;s.fromArray(u.transform.matrix);let f=h.polygon.map(v=>new F(v.x,v.y,v.z).applyMatrix4(s)),d=new F(0,1,0).transformDirection(s),p=Np(h.semanticLabel),y=new tn().setFromPoints(f),m=h.orientation?h.orientation==="horizontal":Math.abs(d.y)>.8,g=f.map(v=>[v.x,v.z]);if(!(p==="ceiling"||p==="global_mesh"))if(m){let v=(y.min.y+y.max.y)/2;p==="floor"||p===""&&Math.abs(v)<.15?e.push({poly:g,y:v}):v>.2&&v<1.9&&r.push({key:h,label:p||"surface",poly:g,top:v,box:new tn(new F(y.min.x,0,y.min.z),new F(y.max.x,v,y.max.z)),solid:!0})}else p&&p!=="wall"&&p!=="invisible_wall_face"&&p!=="wall_face"&&r.push({key:h,label:p.replace(/_frame$/,""),poly:g,top:y.max.y,box:y,solid:!1})}let a=i.detectedMeshes;if(a)for(let h of a){let u=Np(h.semanticLabel);if(!u||u==="global_mesh"||u==="floor"||u==="ceiling"||u.includes("wall"))continue;let f=i.getPose(h.meshSpace,t);if(!f||!h.vertices||h.vertices.length<9)continue;s.fromArray(f.transform.matrix);let d=new tn,p=new tn,y=new F;for(let v=0;v+2<h.vertices.length;v+=3)d.expandByPoint(y.set(h.vertices[v],h.vertices[v+1],h.vertices[v+2])),p.expandByPoint(y.applyMatrix4(s));if(p.max.y<.2||p.min.y>1.9)continue;let m=[[p.min.x,p.min.z],[p.max.x,p.min.z],[p.max.x,p.max.z],[p.min.x,p.max.z]],g=p.getCenter(new F);r.some(v=>v.solid&&v.label===u&&Bl(g.x,g.z,v.poly))||r.push({key:h,label:u,poly:m,top:p.max.y,box:p,solid:!0})}let l=[];for(let h of r){let u=LS(h.key,h.label);l.push(u);let f=h.box.getCenter(new F),d=h.box.getSize(new F);Yt.upsert(u,h.label,nr(f.x,f.y,f.z),{x:Math.max(.1,d.x),y:Math.max(.1,d.y),z:Math.max(.1,d.z)},"room_scan"),h.solid&&n.push({id:u,label:h.label,poly:h.poly,top:h.top})}Yt.prune("room_scan",l);let c=bo;(e.length>0||n.length>0)&&(bo=!0),ae.floors=e.map(h=>h.poly),ae.obstacles=n,ae.floorY=e.length>0?e.reduce((h,u)=>h+u.y,0)/e.length:0,ae.source=e.length>0?"room_scan":n.length>0?"room_scan_no_floor_outline":"floor_level_only",bo!==c&&Yt.placed&&!tu(cn.position.x,cn.position.z)&&(Yt.placed=!1),Zn.has("debug")&&FS()}function FS(){Kh.clear();let i=(t,e,n)=>{let s=t.concat([t[0]]).map(r=>new F(r[0],e,r[1]));Kh.add(new Qi(new ze().setFromPoints(s),new Ai({color:n})))};for(let t of ae.floors)i(t,(ae.floorY||0)+.01,3399031);for(let t of ae.obstacles)i(t.poly,t.top,16733508)}async function zp(){Eo(),Bp();let i=Zn.get("depth")!=="0",t={requiredFeatures:["local-floor"],optionalFeatures:["plane-detection","mesh-detection","hand-tracking"]};i&&(t.optionalFeatures.push("depth-sensing"),t.depthSensing={usagePreference:["gpu-optimized"],dataFormatPreference:["unsigned-short","float32","luminance-alpha"]});let e;try{e=await navigator.xr.requestSession("immersive-ar",t)}catch(n){ar("Could not start AR: "+(n&&n.message?n.message:n));return}Mo=e,ru=Array.from(e.enabledFeatures||[]),kl=!1,Ul.visible=!1,En.background=null,Yt.prune("simulated",[]),ae.source="floor_level_only",ae.floors=[],ae.obstacles=[],ae.floorY=0,Yt.placed=!1,cn.visible=!1,Ol=0,bo=!1,Le.xr.setReferenceSpaceType("local-floor"),await Le.xr.setSession(e);for(let n=0;n<2;n++){let s=Le.xr.getController(n);En.add(s),s.addEventListener("selectstart",()=>{fs=s,Yt.interrupt()}),s.addEventListener("squeezestart",()=>{fs=s,Yt.placed=!1}),s.addEventListener("connected",()=>{fs=fs||s})}e.addEventListener("end",()=>{Mo=null,ar("AR session ended. Reload the page to start again.")})}var NS=(()=>{let i=document.createElement("canvas");i.width=1024,i.height=256;let t=i.getContext("2d"),e=new ks(i);e.colorSpace=ne;let n=new Re(new li(.48,.12),new ji({map:e,transparent:!0,depthTest:!1}));n.renderOrder=10,n.visible=!1,En.add(n);let s="",r=0;return{update(o,a,l){if(o!==s&&(s=o,r=a+7,t.clearRect(0,0,1024,256),t.fillStyle="rgba(12,16,20,0.72)",t.beginPath(),t.roundRect(0,0,1024,256,28),t.fill(),t.fillStyle="#eef3f7",t.font="38px system-ui, sans-serif",o.split(`
`).slice(0,5).forEach((d,p)=>t.fillText(d.length>52?d.slice(0,51)+"\u2026":d,28,54+p*46)),e.needsUpdate=!0),n.visible=Le.xr.isPresenting&&Zn.get("hud")!=="0"&&a<r,!n.visible)return;let c=mi(),h=c.getWorldPosition(new F),u=c.getWorldDirection(new F);u.y=0,u.normalize();let f=h.clone().addScaledVector(u,.95).addScaledVector(new F().crossVectors(u,So),-.34).add(new F(0,-.4,0));n.position.lerp(f,Math.min(1,l*4)),n.lookAt(h)}}})();function ar(i){_e("note").textContent=i}function US(){let i=[];return i.push(Yt.connected?(kp()?"Running in this browser":"Backend connected")+" \xB7 brain: "+Yt.brain:To?"Paste your OpenAI key below to start.":"Connecting to the backend\u2026"),Yt.connected&&Yt.brain==="mock"&&i.push("No AI keys yet: open /setup on the computer running the backend"),Yt.placed||i.push(ae.floorY===null?"Looking for the floor\u2026":"Finding a clear spot on the floor: look at open floor in front of you"),Yt.lastTranscript&&i.push(Yt.lastTranscript),Yt.lastAction&&i.push("Action: "+Yt.lastAction),Yt.lastError&&i.push(Yt.lastError),i.join(`
`)}var Qh=null,Jh=0,yo=null,Up=0,OS=Zn.has("halfduplex")?Zn.get("halfduplex")!=="0":vS;function BS(i,t){let e=i/1e3,n=Math.min(.1,Jh?e-Jh:.016);if(Jh=e,t&&Le.xr.isPresenting){if(Ol+=n,e>=Lp){Lp=e+.5;let a=Le.xr.getReferenceSpace();a&&DS(t,a),!bo&&!Dp&&Ol>4&&Mo&&typeof Mo.initiateRoomCapture=="function"&&ru.includes("plane-detection")&&(Dp=!0,Mo.initiateRoomCapture().catch(()=>{}))}}else Qh&&Qh(n);!Yt.placed&&ae.floorY!==null&&e>=Up&&(kl||Ol>1.2)&&(Up=e+.5,Yt.placeInFrontOfUser(kl?2.2:1.8)&&(yo=null)),Yt.micMuted=OS&&Yt.speakingFor>0,Yt.update(n),cn.visible=Yt.placed;let s=Yt.avatar.pos,r=yo?Math.hypot(s.x-yo.x,s.z-yo.z):0;yo={x:s.x,z:s.z},IS(n,r);let o=US();_e("status").textContent!==o&&(_e("status").textContent=o),NS.update(o,e,n),Le.render(En,ln)}async function kS(){_e("mic").onclick=Bp,_e("enter").onclick=zp,_e("backendRow").hidden=!To,_e("keyRow").hidden=!To;let i=()=>{_e("keyState").textContent=eu()?"A key is saved in this browser. Paste another to replace it.":"Stays in this browser; sent only to OpenAI."};i(),_e("keySave").onclick=()=>{let e=_e("key").value.trim().replace(/^["']|["']$/g,"");try{e?localStorage.setItem("simulacra.openaiKey",e):localStorage.removeItem("simulacra.openaiKey")}catch{ar("This browser will not store the key (private mode?).")}_e("key").value="",i(),Eo(),On&&On.readyState<=1?On.close():vo()},_e("backend").addEventListener("change",()=>{try{localStorage.setItem("simulacra.backend",_e("backend").value.trim())}catch{}On&&On.readyState<=1?On.close():vo()}),_e("text").addEventListener("keydown",e=>{if(e.key!=="Enter")return;Eo();let n=_e("text").value.trim();n&&Yt.sendText(n),_e("text").value=""}),Qh=PS(),await CS(),vo(),Le.setAnimationLoop(BS);let t=!1;try{t=!!navigator.xr&&await navigator.xr.isSessionSupported("immersive-ar")}catch{}if(t)_e("enter").disabled=!1,_e("mode").textContent="This browser supports AR. Press Enter AR to put the avatar in your room.",ar("Until then this is a preview in a simulated room.");else{_e("mode").textContent="PREVIEW \u2014 simulated room (this browser has no AR session)";let e=window.isSecureContext?navigator.xr?"This browser does not offer immersive AR sessions.":"This browser has no WebXR.":"AR needs a secure page: open this as http://localhost\u2026 (USB with adb reverse) or over https.";ar(e+" Drag to look, WASD to move.")}}window.simulacra={core:Yt,room:ae,body:Tt,scene:En,camera:ln,renderer:Le,avatarRoot:cn,enterAR:zp,isFloor:tu,get features(){return ru},get preview(){return kl}};kS();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.8.3
  *)
*/
