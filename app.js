var hm=Object.create;var sc=Object.defineProperty;var um=Object.getOwnPropertyDescriptor;var fm=Object.getOwnPropertyNames;var dm=Object.getPrototypeOf,pm=Object.prototype.hasOwnProperty;var mm=(i,t,e)=>t in i?sc(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var gm=(i,t,e)=>()=>{if(e)throw e[0];try{return i&&(t=i(i=0)),t}catch(n){throw e=[n],n}};var rc=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var ym=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of fm(t))!pm.call(i,s)&&s!==e&&sc(i,s,{get:()=>t[s],enumerable:!(n=um(t,s))||n.enumerable});return i};var xm=(i,t,e)=>(e=i!=null?hm(dm(i)):{},ym(t||!i||!i.__esModule?sc(e,"default",{value:i,enumerable:!0}):e,i));var W=(i,t,e)=>mm(i,typeof t!="symbol"?t+"":t,e);var Uu=rc(Ho=>{"use strict";Pt();Ho.byteLength=_m;Ho.toByteArray=Mm;Ho.fromByteArray=Em;var Hn=[],Mn=[],vm=typeof Uint8Array<"u"?Uint8Array:Array,oc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(ji=0,Fu=oc.length;ji<Fu;++ji)Hn[ji]=oc[ji],Mn[oc.charCodeAt(ji)]=ji;var ji,Fu;Mn[45]=62;Mn[95]=63;function Nu(i){var t=i.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=i.indexOf("=");e===-1&&(e=t);var n=e===t?0:4-e%4;return[e,n]}function _m(i){var t=Nu(i),e=t[0],n=t[1];return(e+n)*3/4-n}function Sm(i,t,e){return(t+e)*3/4-e}function Mm(i){var t,e=Nu(i),n=e[0],s=e[1],r=new vm(Sm(i,n,s)),o=0,a=s>0?n-4:n,l;for(l=0;l<a;l+=4)t=Mn[i.charCodeAt(l)]<<18|Mn[i.charCodeAt(l+1)]<<12|Mn[i.charCodeAt(l+2)]<<6|Mn[i.charCodeAt(l+3)],r[o++]=t>>16&255,r[o++]=t>>8&255,r[o++]=t&255;return s===2&&(t=Mn[i.charCodeAt(l)]<<2|Mn[i.charCodeAt(l+1)]>>4,r[o++]=t&255),s===1&&(t=Mn[i.charCodeAt(l)]<<10|Mn[i.charCodeAt(l+1)]<<4|Mn[i.charCodeAt(l+2)]>>2,r[o++]=t>>8&255,r[o++]=t&255),r}function bm(i){return Hn[i>>18&63]+Hn[i>>12&63]+Hn[i>>6&63]+Hn[i&63]}function wm(i,t,e){for(var n,s=[],r=t;r<e;r+=3)n=(i[r]<<16&16711680)+(i[r+1]<<8&65280)+(i[r+2]&255),s.push(bm(n));return s.join("")}function Em(i){for(var t,e=i.length,n=e%3,s=[],r=16383,o=0,a=e-n;o<a;o+=r)s.push(wm(i,o,o+r>a?a:o+r));return n===1?(t=i[e-1],s.push(Hn[t>>2]+Hn[t<<4&63]+"==")):n===2&&(t=(i[e-2]<<8)+i[e-1],s.push(Hn[t>>10]+Hn[t>>4&63]+Hn[t<<2&63]+"=")),s.join("")}});var Ou=rc(ac=>{Pt();ac.read=function(i,t,e,n,s){var r,o,a=s*8-n-1,l=(1<<a)-1,c=l>>1,h=-7,u=e?s-1:0,f=e?-1:1,d=i[t+u];for(u+=f,r=d&(1<<-h)-1,d>>=-h,h+=a;h>0;r=r*256+i[t+u],u+=f,h-=8);for(o=r&(1<<-h)-1,r>>=-h,h+=n;h>0;o=o*256+i[t+u],u+=f,h-=8);if(r===0)r=1-c;else{if(r===l)return o?NaN:(d?-1:1)*(1/0);o=o+Math.pow(2,n),r=r-c}return(d?-1:1)*o*Math.pow(2,r-n)};ac.write=function(i,t,e,n,s,r){var o,a,l,c=r*8-s-1,h=(1<<c)-1,u=h>>1,f=s===23?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:r-1,p=n?1:-1,x=t<0||t===0&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,o=h):(o=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-o))<1&&(o--,l*=2),o+u>=1?t+=f/l:t+=f*Math.pow(2,1-u),t*l>=2&&(o++,l/=2),o+u>=h?(a=0,o=h):o+u>=1?(a=(t*l-1)*Math.pow(2,s),o=o+u):(a=t*Math.pow(2,u-1)*Math.pow(2,s),o=0));s>=8;i[e+d]=a&255,d+=p,a/=256,s-=8);for(o=o<<s|a,c+=s;c>0;i[e+d]=o&255,d+=p,o/=256,c-=8);i[e+d-p]|=x*128}});var tf=rc(Rs=>{"use strict";Pt();var lc=Uu(),Ts=Ou(),Bu=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;Rs.Buffer=J;Rs.SlowBuffer=Pm;Rs.INSPECT_MAX_BYTES=50;var Wo=2147483647;Rs.kMaxLength=Wo;J.TYPED_ARRAY_SUPPORT=Tm();!J.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function Tm(){try{let i=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(i,t),i.foo()===42}catch{return!1}}Object.defineProperty(J.prototype,"parent",{enumerable:!0,get:function(){if(J.isBuffer(this))return this.buffer}});Object.defineProperty(J.prototype,"offset",{enumerable:!0,get:function(){if(J.isBuffer(this))return this.byteOffset}});function ii(i){if(i>Wo)throw new RangeError('The value "'+i+'" is invalid for option "size"');let t=new Uint8Array(i);return Object.setPrototypeOf(t,J.prototype),t}function J(i,t,e){if(typeof i=="number"){if(typeof t=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return fc(i)}return Gu(i,t,e)}J.poolSize=8192;function Gu(i,t,e){if(typeof i=="string")return Rm(i,t);if(ArrayBuffer.isView(i))return Cm(i);if(i==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i);if(Wn(i,ArrayBuffer)||i&&Wn(i.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(Wn(i,SharedArrayBuffer)||i&&Wn(i.buffer,SharedArrayBuffer)))return hc(i,t,e);if(typeof i=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let n=i.valueOf&&i.valueOf();if(n!=null&&n!==i)return J.from(n,t,e);let s=Im(i);if(s)return s;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof i[Symbol.toPrimitive]=="function")return J.from(i[Symbol.toPrimitive]("string"),t,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i)}J.from=function(i,t,e){return Gu(i,t,e)};Object.setPrototypeOf(J.prototype,Uint8Array.prototype);Object.setPrototypeOf(J,Uint8Array);function Hu(i){if(typeof i!="number")throw new TypeError('"size" argument must be of type number');if(i<0)throw new RangeError('The value "'+i+'" is invalid for option "size"')}function Am(i,t,e){return Hu(i),i<=0?ii(i):t!==void 0?typeof e=="string"?ii(i).fill(t,e):ii(i).fill(t):ii(i)}J.alloc=function(i,t,e){return Am(i,t,e)};function fc(i){return Hu(i),ii(i<0?0:dc(i)|0)}J.allocUnsafe=function(i){return fc(i)};J.allocUnsafeSlow=function(i){return fc(i)};function Rm(i,t){if((typeof t!="string"||t==="")&&(t="utf8"),!J.isEncoding(t))throw new TypeError("Unknown encoding: "+t);let e=Wu(i,t)|0,n=ii(e),s=n.write(i,t);return s!==e&&(n=n.slice(0,s)),n}function cc(i){let t=i.length<0?0:dc(i.length)|0,e=ii(t);for(let n=0;n<t;n+=1)e[n]=i[n]&255;return e}function Cm(i){if(Wn(i,Uint8Array)){let t=new Uint8Array(i);return hc(t.buffer,t.byteOffset,t.byteLength)}return cc(i)}function hc(i,t,e){if(t<0||i.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(i.byteLength<t+(e||0))throw new RangeError('"length" is outside of buffer bounds');let n;return t===void 0&&e===void 0?n=new Uint8Array(i):e===void 0?n=new Uint8Array(i,t):n=new Uint8Array(i,t,e),Object.setPrototypeOf(n,J.prototype),n}function Im(i){if(J.isBuffer(i)){let t=dc(i.length)|0,e=ii(t);return e.length===0||i.copy(e,0,0,t),e}if(i.length!==void 0)return typeof i.length!="number"||mc(i.length)?ii(0):cc(i);if(i.type==="Buffer"&&Array.isArray(i.data))return cc(i.data)}function dc(i){if(i>=Wo)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Wo.toString(16)+" bytes");return i|0}function Pm(i){return+i!=i&&(i=0),J.alloc(+i)}J.isBuffer=function(t){return t!=null&&t._isBuffer===!0&&t!==J.prototype};J.compare=function(t,e){if(Wn(t,Uint8Array)&&(t=J.from(t,t.offset,t.byteLength)),Wn(e,Uint8Array)&&(e=J.from(e,e.offset,e.byteLength)),!J.isBuffer(t)||!J.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let n=t.length,s=e.length;for(let r=0,o=Math.min(n,s);r<o;++r)if(t[r]!==e[r]){n=t[r],s=e[r];break}return n<s?-1:s<n?1:0};J.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};J.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return J.alloc(0);let n;if(e===void 0)for(e=0,n=0;n<t.length;++n)e+=t[n].length;let s=J.allocUnsafe(e),r=0;for(n=0;n<t.length;++n){let o=t[n];if(Wn(o,Uint8Array))r+o.length>s.length?(J.isBuffer(o)||(o=J.from(o)),o.copy(s,r)):Uint8Array.prototype.set.call(s,o,r);else if(J.isBuffer(o))o.copy(s,r);else throw new TypeError('"list" argument must be an Array of Buffers');r+=o.length}return s};function Wu(i,t){if(J.isBuffer(i))return i.length;if(ArrayBuffer.isView(i)||Wn(i,ArrayBuffer))return i.byteLength;if(typeof i!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof i);let e=i.length,n=arguments.length>2&&arguments[2]===!0;if(!n&&e===0)return 0;let s=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return uc(i).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return e*2;case"hex":return e>>>1;case"base64":return Qu(i).length;default:if(s)return n?-1:uc(i).length;t=(""+t).toLowerCase(),s=!0}}J.byteLength=Wu;function Lm(i,t,e){let n=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((e===void 0||e>this.length)&&(e=this.length),e<=0)||(e>>>=0,t>>>=0,e<=t))return"";for(i||(i="utf8");;)switch(i){case"hex":return Gm(this,t,e);case"utf8":case"utf-8":return qu(this,t,e);case"ascii":return zm(this,t,e);case"latin1":case"binary":return Vm(this,t,e);case"base64":return Bm(this,t,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Hm(this,t,e);default:if(n)throw new TypeError("Unknown encoding: "+i);i=(i+"").toLowerCase(),n=!0}}J.prototype._isBuffer=!0;function Zi(i,t,e){let n=i[t];i[t]=i[e],i[e]=n}J.prototype.swap16=function(){let t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)Zi(this,e,e+1);return this};J.prototype.swap32=function(){let t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)Zi(this,e,e+3),Zi(this,e+1,e+2);return this};J.prototype.swap64=function(){let t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)Zi(this,e,e+7),Zi(this,e+1,e+6),Zi(this,e+2,e+5),Zi(this,e+3,e+4);return this};J.prototype.toString=function(){let t=this.length;return t===0?"":arguments.length===0?qu(this,0,t):Lm.apply(this,arguments)};J.prototype.toLocaleString=J.prototype.toString;J.prototype.equals=function(t){if(!J.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:J.compare(this,t)===0};J.prototype.inspect=function(){let t="",e=Rs.INSPECT_MAX_BYTES;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"};Bu&&(J.prototype[Bu]=J.prototype.inspect);J.prototype.compare=function(t,e,n,s,r){if(Wn(t,Uint8Array)&&(t=J.from(t,t.offset,t.byteLength)),!J.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(e===void 0&&(e=0),n===void 0&&(n=t?t.length:0),s===void 0&&(s=0),r===void 0&&(r=this.length),e<0||n>t.length||s<0||r>this.length)throw new RangeError("out of range index");if(s>=r&&e>=n)return 0;if(s>=r)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,s>>>=0,r>>>=0,this===t)return 0;let o=r-s,a=n-e,l=Math.min(o,a),c=this.slice(s,r),h=t.slice(e,n);for(let u=0;u<l;++u)if(c[u]!==h[u]){o=c[u],a=h[u];break}return o<a?-1:a<o?1:0};function Xu(i,t,e,n,s){if(i.length===0)return-1;if(typeof e=="string"?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,mc(e)&&(e=s?0:i.length-1),e<0&&(e=i.length+e),e>=i.length){if(s)return-1;e=i.length-1}else if(e<0)if(s)e=0;else return-1;if(typeof t=="string"&&(t=J.from(t,n)),J.isBuffer(t))return t.length===0?-1:ku(i,t,e,n,s);if(typeof t=="number")return t=t&255,typeof Uint8Array.prototype.indexOf=="function"?s?Uint8Array.prototype.indexOf.call(i,t,e):Uint8Array.prototype.lastIndexOf.call(i,t,e):ku(i,[t],e,n,s);throw new TypeError("val must be string, number or Buffer")}function ku(i,t,e,n,s){let r=1,o=i.length,a=t.length;if(n!==void 0&&(n=String(n).toLowerCase(),n==="ucs2"||n==="ucs-2"||n==="utf16le"||n==="utf-16le")){if(i.length<2||t.length<2)return-1;r=2,o/=2,a/=2,e/=2}function l(h,u){return r===1?h[u]:h.readUInt16BE(u*r)}let c;if(s){let h=-1;for(c=e;c<o;c++)if(l(i,c)===l(t,h===-1?0:c-h)){if(h===-1&&(h=c),c-h+1===a)return h*r}else h!==-1&&(c-=c-h),h=-1}else for(e+a>o&&(e=o-a),c=e;c>=0;c--){let h=!0;for(let u=0;u<a;u++)if(l(i,c+u)!==l(t,u)){h=!1;break}if(h)return c}return-1}J.prototype.includes=function(t,e,n){return this.indexOf(t,e,n)!==-1};J.prototype.indexOf=function(t,e,n){return Xu(this,t,e,n,!0)};J.prototype.lastIndexOf=function(t,e,n){return Xu(this,t,e,n,!1)};function Dm(i,t,e,n){e=Number(e)||0;let s=i.length-e;n?(n=Number(n),n>s&&(n=s)):n=s;let r=t.length;n>r/2&&(n=r/2);let o;for(o=0;o<n;++o){let a=parseInt(t.substr(o*2,2),16);if(mc(a))return o;i[e+o]=a}return o}function Fm(i,t,e,n){return Xo(uc(t,i.length-e),i,e,n)}function Nm(i,t,e,n){return Xo($m(t),i,e,n)}function Um(i,t,e,n){return Xo(Qu(t),i,e,n)}function Om(i,t,e,n){return Xo(Ym(t,i.length-e),i,e,n)}J.prototype.write=function(t,e,n,s){if(e===void 0)s="utf8",n=this.length,e=0;else if(n===void 0&&typeof e=="string")s=e,n=this.length,e=0;else if(isFinite(e))e=e>>>0,isFinite(n)?(n=n>>>0,s===void 0&&(s="utf8")):(s=n,n=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let r=this.length-e;if((n===void 0||n>r)&&(n=r),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");s||(s="utf8");let o=!1;for(;;)switch(s){case"hex":return Dm(this,t,e,n);case"utf8":case"utf-8":return Fm(this,t,e,n);case"ascii":case"latin1":case"binary":return Nm(this,t,e,n);case"base64":return Um(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Om(this,t,e,n);default:if(o)throw new TypeError("Unknown encoding: "+s);s=(""+s).toLowerCase(),o=!0}};J.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Bm(i,t,e){return t===0&&e===i.length?lc.fromByteArray(i):lc.fromByteArray(i.slice(t,e))}function qu(i,t,e){e=Math.min(i.length,e);let n=[],s=t;for(;s<e;){let r=i[s],o=null,a=r>239?4:r>223?3:r>191?2:1;if(s+a<=e){let l,c,h,u;switch(a){case 1:r<128&&(o=r);break;case 2:l=i[s+1],(l&192)===128&&(u=(r&31)<<6|l&63,u>127&&(o=u));break;case 3:l=i[s+1],c=i[s+2],(l&192)===128&&(c&192)===128&&(u=(r&15)<<12|(l&63)<<6|c&63,u>2047&&(u<55296||u>57343)&&(o=u));break;case 4:l=i[s+1],c=i[s+2],h=i[s+3],(l&192)===128&&(c&192)===128&&(h&192)===128&&(u=(r&15)<<18|(l&63)<<12|(c&63)<<6|h&63,u>65535&&u<1114112&&(o=u))}}o===null?(o=65533,a=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|o&1023),n.push(o),s+=a}return km(n)}var zu=4096;function km(i){let t=i.length;if(t<=zu)return String.fromCharCode.apply(String,i);let e="",n=0;for(;n<t;)e+=String.fromCharCode.apply(String,i.slice(n,n+=zu));return e}function zm(i,t,e){let n="";e=Math.min(i.length,e);for(let s=t;s<e;++s)n+=String.fromCharCode(i[s]&127);return n}function Vm(i,t,e){let n="";e=Math.min(i.length,e);for(let s=t;s<e;++s)n+=String.fromCharCode(i[s]);return n}function Gm(i,t,e){let n=i.length;(!t||t<0)&&(t=0),(!e||e<0||e>n)&&(e=n);let s="";for(let r=t;r<e;++r)s+=Jm[i[r]];return s}function Hm(i,t,e){let n=i.slice(t,e),s="";for(let r=0;r<n.length-1;r+=2)s+=String.fromCharCode(n[r]+n[r+1]*256);return s}J.prototype.slice=function(t,e){let n=this.length;t=~~t,e=e===void 0?n:~~e,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),e<t&&(e=t);let s=this.subarray(t,e);return Object.setPrototypeOf(s,J.prototype),s};function Oe(i,t,e){if(i%1!==0||i<0)throw new RangeError("offset is not uint");if(i+t>e)throw new RangeError("Trying to access beyond buffer length")}J.prototype.readUintLE=J.prototype.readUIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||Oe(t,e,this.length);let s=this[t],r=1,o=0;for(;++o<e&&(r*=256);)s+=this[t+o]*r;return s};J.prototype.readUintBE=J.prototype.readUIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||Oe(t,e,this.length);let s=this[t+--e],r=1;for(;e>0&&(r*=256);)s+=this[t+--e]*r;return s};J.prototype.readUint8=J.prototype.readUInt8=function(t,e){return t=t>>>0,e||Oe(t,1,this.length),this[t]};J.prototype.readUint16LE=J.prototype.readUInt16LE=function(t,e){return t=t>>>0,e||Oe(t,2,this.length),this[t]|this[t+1]<<8};J.prototype.readUint16BE=J.prototype.readUInt16BE=function(t,e){return t=t>>>0,e||Oe(t,2,this.length),this[t]<<8|this[t+1]};J.prototype.readUint32LE=J.prototype.readUInt32LE=function(t,e){return t=t>>>0,e||Oe(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216};J.prototype.readUint32BE=J.prototype.readUInt32BE=function(t,e){return t=t>>>0,e||Oe(t,4,this.length),this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])};J.prototype.readBigUInt64LE=Ei(function(t){t=t>>>0,As(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&Sr(t,this.length-8);let s=e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24,r=this[++t]+this[++t]*2**8+this[++t]*2**16+n*2**24;return BigInt(s)+(BigInt(r)<<BigInt(32))});J.prototype.readBigUInt64BE=Ei(function(t){t=t>>>0,As(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&Sr(t,this.length-8);let s=e*2**24+this[++t]*2**16+this[++t]*2**8+this[++t],r=this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n;return(BigInt(s)<<BigInt(32))+BigInt(r)});J.prototype.readIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||Oe(t,e,this.length);let s=this[t],r=1,o=0;for(;++o<e&&(r*=256);)s+=this[t+o]*r;return r*=128,s>=r&&(s-=Math.pow(2,8*e)),s};J.prototype.readIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||Oe(t,e,this.length);let s=e,r=1,o=this[t+--s];for(;s>0&&(r*=256);)o+=this[t+--s]*r;return r*=128,o>=r&&(o-=Math.pow(2,8*e)),o};J.prototype.readInt8=function(t,e){return t=t>>>0,e||Oe(t,1,this.length),this[t]&128?(255-this[t]+1)*-1:this[t]};J.prototype.readInt16LE=function(t,e){t=t>>>0,e||Oe(t,2,this.length);let n=this[t]|this[t+1]<<8;return n&32768?n|4294901760:n};J.prototype.readInt16BE=function(t,e){t=t>>>0,e||Oe(t,2,this.length);let n=this[t+1]|this[t]<<8;return n&32768?n|4294901760:n};J.prototype.readInt32LE=function(t,e){return t=t>>>0,e||Oe(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24};J.prototype.readInt32BE=function(t,e){return t=t>>>0,e||Oe(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]};J.prototype.readBigInt64LE=Ei(function(t){t=t>>>0,As(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&Sr(t,this.length-8);let s=this[t+4]+this[t+5]*2**8+this[t+6]*2**16+(n<<24);return(BigInt(s)<<BigInt(32))+BigInt(e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24)});J.prototype.readBigInt64BE=Ei(function(t){t=t>>>0,As(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&Sr(t,this.length-8);let s=(e<<24)+this[++t]*2**16+this[++t]*2**8+this[++t];return(BigInt(s)<<BigInt(32))+BigInt(this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n)});J.prototype.readFloatLE=function(t,e){return t=t>>>0,e||Oe(t,4,this.length),Ts.read(this,t,!0,23,4)};J.prototype.readFloatBE=function(t,e){return t=t>>>0,e||Oe(t,4,this.length),Ts.read(this,t,!1,23,4)};J.prototype.readDoubleLE=function(t,e){return t=t>>>0,e||Oe(t,8,this.length),Ts.read(this,t,!0,52,8)};J.prototype.readDoubleBE=function(t,e){return t=t>>>0,e||Oe(t,8,this.length),Ts.read(this,t,!1,52,8)};function on(i,t,e,n,s,r){if(!J.isBuffer(i))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>s||t<r)throw new RangeError('"value" argument is out of bounds');if(e+n>i.length)throw new RangeError("Index out of range")}J.prototype.writeUintLE=J.prototype.writeUIntLE=function(t,e,n,s){if(t=+t,e=e>>>0,n=n>>>0,!s){let a=Math.pow(2,8*n)-1;on(this,t,e,n,a,0)}let r=1,o=0;for(this[e]=t&255;++o<n&&(r*=256);)this[e+o]=t/r&255;return e+n};J.prototype.writeUintBE=J.prototype.writeUIntBE=function(t,e,n,s){if(t=+t,e=e>>>0,n=n>>>0,!s){let a=Math.pow(2,8*n)-1;on(this,t,e,n,a,0)}let r=n-1,o=1;for(this[e+r]=t&255;--r>=0&&(o*=256);)this[e+r]=t/o&255;return e+n};J.prototype.writeUint8=J.prototype.writeUInt8=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,1,255,0),this[e]=t&255,e+1};J.prototype.writeUint16LE=J.prototype.writeUInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,2,65535,0),this[e]=t&255,this[e+1]=t>>>8,e+2};J.prototype.writeUint16BE=J.prototype.writeUInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=t&255,e+2};J.prototype.writeUint32LE=J.prototype.writeUInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=t&255,e+4};J.prototype.writeUint32BE=J.prototype.writeUInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4};function $u(i,t,e,n,s){Ku(t,n,s,i,e,7);let r=Number(t&BigInt(4294967295));i[e++]=r,r=r>>8,i[e++]=r,r=r>>8,i[e++]=r,r=r>>8,i[e++]=r;let o=Number(t>>BigInt(32)&BigInt(4294967295));return i[e++]=o,o=o>>8,i[e++]=o,o=o>>8,i[e++]=o,o=o>>8,i[e++]=o,e}function Yu(i,t,e,n,s){Ku(t,n,s,i,e,7);let r=Number(t&BigInt(4294967295));i[e+7]=r,r=r>>8,i[e+6]=r,r=r>>8,i[e+5]=r,r=r>>8,i[e+4]=r;let o=Number(t>>BigInt(32)&BigInt(4294967295));return i[e+3]=o,o=o>>8,i[e+2]=o,o=o>>8,i[e+1]=o,o=o>>8,i[e]=o,e+8}J.prototype.writeBigUInt64LE=Ei(function(t,e=0){return $u(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))});J.prototype.writeBigUInt64BE=Ei(function(t,e=0){return Yu(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))});J.prototype.writeIntLE=function(t,e,n,s){if(t=+t,e=e>>>0,!s){let l=Math.pow(2,8*n-1);on(this,t,e,n,l-1,-l)}let r=0,o=1,a=0;for(this[e]=t&255;++r<n&&(o*=256);)t<0&&a===0&&this[e+r-1]!==0&&(a=1),this[e+r]=(t/o>>0)-a&255;return e+n};J.prototype.writeIntBE=function(t,e,n,s){if(t=+t,e=e>>>0,!s){let l=Math.pow(2,8*n-1);on(this,t,e,n,l-1,-l)}let r=n-1,o=1,a=0;for(this[e+r]=t&255;--r>=0&&(o*=256);)t<0&&a===0&&this[e+r+1]!==0&&(a=1),this[e+r]=(t/o>>0)-a&255;return e+n};J.prototype.writeInt8=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=t&255,e+1};J.prototype.writeInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,2,32767,-32768),this[e]=t&255,this[e+1]=t>>>8,e+2};J.prototype.writeInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=t&255,e+2};J.prototype.writeInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,4,2147483647,-2147483648),this[e]=t&255,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4};J.prototype.writeInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||on(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4};J.prototype.writeBigInt64LE=Ei(function(t,e=0){return $u(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});J.prototype.writeBigInt64BE=Ei(function(t,e=0){return Yu(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function Ju(i,t,e,n,s,r){if(e+n>i.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function ju(i,t,e,n,s){return t=+t,e=e>>>0,s||Ju(i,t,e,4,34028234663852886e22,-34028234663852886e22),Ts.write(i,t,e,n,23,4),e+4}J.prototype.writeFloatLE=function(t,e,n){return ju(this,t,e,!0,n)};J.prototype.writeFloatBE=function(t,e,n){return ju(this,t,e,!1,n)};function Zu(i,t,e,n,s){return t=+t,e=e>>>0,s||Ju(i,t,e,8,17976931348623157e292,-17976931348623157e292),Ts.write(i,t,e,n,52,8),e+8}J.prototype.writeDoubleLE=function(t,e,n){return Zu(this,t,e,!0,n)};J.prototype.writeDoubleBE=function(t,e,n){return Zu(this,t,e,!1,n)};J.prototype.copy=function(t,e,n,s){if(!J.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),!s&&s!==0&&(s=this.length),e>=t.length&&(e=t.length),e||(e=0),s>0&&s<n&&(s=n),s===n||t.length===0||this.length===0)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(s<0)throw new RangeError("sourceEnd out of bounds");s>this.length&&(s=this.length),t.length-e<s-n&&(s=t.length-e+n);let r=s-n;return this===t&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(e,n,s):Uint8Array.prototype.set.call(t,this.subarray(n,s),e),r};J.prototype.fill=function(t,e,n,s){if(typeof t=="string"){if(typeof e=="string"?(s=e,e=0,n=this.length):typeof n=="string"&&(s=n,n=this.length),s!==void 0&&typeof s!="string")throw new TypeError("encoding must be a string");if(typeof s=="string"&&!J.isEncoding(s))throw new TypeError("Unknown encoding: "+s);if(t.length===1){let o=t.charCodeAt(0);(s==="utf8"&&o<128||s==="latin1")&&(t=o)}}else typeof t=="number"?t=t&255:typeof t=="boolean"&&(t=Number(t));if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e=e>>>0,n=n===void 0?this.length:n>>>0,t||(t=0);let r;if(typeof t=="number")for(r=e;r<n;++r)this[r]=t;else{let o=J.isBuffer(t)?t:J.from(t,s),a=o.length;if(a===0)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(r=0;r<n-e;++r)this[r+e]=o[r%a]}return this};var Es={};function pc(i,t,e){Es[i]=class extends e{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${i}]`,this.stack,delete this.name}get code(){return i}set code(s){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:s,writable:!0})}toString(){return`${this.name} [${i}]: ${this.message}`}}}pc("ERR_BUFFER_OUT_OF_BOUNDS",function(i){return i?`${i} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);pc("ERR_INVALID_ARG_TYPE",function(i,t){return`The "${i}" argument must be of type number. Received type ${typeof t}`},TypeError);pc("ERR_OUT_OF_RANGE",function(i,t,e){let n=`The value of "${i}" is out of range.`,s=e;return Number.isInteger(e)&&Math.abs(e)>2**32?s=Vu(String(e)):typeof e=="bigint"&&(s=String(e),(e>BigInt(2)**BigInt(32)||e<-(BigInt(2)**BigInt(32)))&&(s=Vu(s)),s+="n"),n+=` It must be ${t}. Received ${s}`,n},RangeError);function Vu(i){let t="",e=i.length,n=i[0]==="-"?1:0;for(;e>=n+4;e-=3)t=`_${i.slice(e-3,e)}${t}`;return`${i.slice(0,e)}${t}`}function Wm(i,t,e){As(t,"offset"),(i[t]===void 0||i[t+e]===void 0)&&Sr(t,i.length-(e+1))}function Ku(i,t,e,n,s,r){if(i>e||i<t){let o=typeof t=="bigint"?"n":"",a;throw r>3?t===0||t===BigInt(0)?a=`>= 0${o} and < 2${o} ** ${(r+1)*8}${o}`:a=`>= -(2${o} ** ${(r+1)*8-1}${o}) and < 2 ** ${(r+1)*8-1}${o}`:a=`>= ${t}${o} and <= ${e}${o}`,new Es.ERR_OUT_OF_RANGE("value",a,i)}Wm(n,s,r)}function As(i,t){if(typeof i!="number")throw new Es.ERR_INVALID_ARG_TYPE(t,"number",i)}function Sr(i,t,e){throw Math.floor(i)!==i?(As(i,e),new Es.ERR_OUT_OF_RANGE(e||"offset","an integer",i)):t<0?new Es.ERR_BUFFER_OUT_OF_BOUNDS:new Es.ERR_OUT_OF_RANGE(e||"offset",`>= ${e?1:0} and <= ${t}`,i)}var Xm=/[^+/0-9A-Za-z-_]/g;function qm(i){if(i=i.split("=")[0],i=i.trim().replace(Xm,""),i.length<2)return"";for(;i.length%4!==0;)i=i+"=";return i}function uc(i,t){t=t||1/0;let e,n=i.length,s=null,r=[];for(let o=0;o<n;++o){if(e=i.charCodeAt(o),e>55295&&e<57344){if(!s){if(e>56319){(t-=3)>-1&&r.push(239,191,189);continue}else if(o+1===n){(t-=3)>-1&&r.push(239,191,189);continue}s=e;continue}if(e<56320){(t-=3)>-1&&r.push(239,191,189),s=e;continue}e=(s-55296<<10|e-56320)+65536}else s&&(t-=3)>-1&&r.push(239,191,189);if(s=null,e<128){if((t-=1)<0)break;r.push(e)}else if(e<2048){if((t-=2)<0)break;r.push(e>>6|192,e&63|128)}else if(e<65536){if((t-=3)<0)break;r.push(e>>12|224,e>>6&63|128,e&63|128)}else if(e<1114112){if((t-=4)<0)break;r.push(e>>18|240,e>>12&63|128,e>>6&63|128,e&63|128)}else throw new Error("Invalid code point")}return r}function $m(i){let t=[];for(let e=0;e<i.length;++e)t.push(i.charCodeAt(e)&255);return t}function Ym(i,t){let e,n,s,r=[];for(let o=0;o<i.length&&!((t-=2)<0);++o)e=i.charCodeAt(o),n=e>>8,s=e%256,r.push(s),r.push(n);return r}function Qu(i){return lc.toByteArray(qm(i))}function Xo(i,t,e,n){let s;for(s=0;s<n&&!(s+e>=t.length||s>=i.length);++s)t[s+e]=i[s];return s}function Wn(i,t){return i instanceof t||i!=null&&i.constructor!=null&&i.constructor.name!=null&&i.constructor.name===t.name}function mc(i){return i!==i}var Jm=(function(){let i="0123456789abcdef",t=new Array(256);for(let e=0;e<16;++e){let n=e*16;for(let s=0;s<16;++s)t[n+s]=i[e]+i[s]}return t})();function Ei(i){return typeof BigInt>"u"?jm:i}function jm(){throw new Error("BigInt not supported")}});var ef,Pt=gm(()=>{ef=xm(tf());globalThis.Buffer=globalThis.Buffer||ef.Buffer});Pt();Pt();Pt();var kf=0,Qc=1,zf=2;var co=1,Vf=2,ir=3,Vi=0,sn=1,En=2,ds=0,sr=1,th=2,eh=3,nh=4,Gf=5;var ps=100,Hf=101,Wf=102,Xf=103,qf=104,$f=200,Yf=201,Jf=202,jf=203,ih=204,sh=205,Zf=206,Kf=207,Qf=208,td=209,ed=210,nd=211,id=212,sd=213,rd=214,xa=0,va=1,_a=2,Ws=3,Sa=4,Ma=5,ba=6,wa=7,ho=0,od=1,ad=2,jn=0,rh=1,oh=2,ah=3,lh=4,ch=5,hh=6,uh=7,kc="attached",ld="detached",fh=300,ms=301,rr=302,or=303,Xa=304,ns=1e3,dn=1001,Ea=1002,ke=1003,cd=1004;var uo=1005;var en=1006,qa=1007;var yi=1008;var ln=1009,dh=1010,ph=1011,ar=1012,$a=1013,On=1014,Tn=1015,Bn=1016,Ya=1017,Ja=1018,gs=1020,mh=35902,gh=35899,yh=1021,xh=1022,An=1023,ui=1026,xi=1027,vh=1028,ja=1029,Gi=1030,Za=1031;var Ka=1033,fo=33776,po=33777,mo=33778,go=33779,Qa=35840,tl=35841,el=35842,nl=35843,il=36196,sl=37492,rl=37496,ol=37488,al=37489,yo=37490,ll=37491,cl=37808,hl=37809,ul=37810,fl=37811,dl=37812,pl=37813,ml=37814,gl=37815,yl=37816,xl=37817,vl=37818,_l=37819,Sl=37820,Ml=37821,bl=36492,wl=36494,El=36495,Tl=36283,Al=36284,xo=36285,Rl=36286;var Dr=2300,Ta=2301,ga=2302,zc=2303,Vc=2400,Gc=2401,Hc=2402,hd=2500;var ud=3200;var lr=0,fd=1,vi="",ie="srgb",Fr="srgb-linear",Nr="linear",ae="srgb";var ya=7680;var dd=519,pd=512,md=513,gd=514,_h=515,yd=516,xd=517,Sh=518,Mh=519,vd=35044;var bh="300 es",wn=2e3,Xs=2001;function Zm(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Km(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _d(){let i=qs("canvas");return i.style.display="block",i}var nf={},$s=null;function wh(...i){let t="THREE."+i.shift();$s?$s("log",t,...i):console.log(t,...i)}function Sd(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ct(...i){i=Sd(i);let t="THREE."+i.shift();if($s)$s("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Bt(...i){i=Sd(i);let t="THREE."+i.shift();if($s)$s("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ir(...i){let t=i.join(" ");t in nf||(nf[t]=!0,Ct(...i))}function Md(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var bd={[xa]:xa,[_a]:ba,[Sa]:Sa,[Ws]:Ma,[va]:va,[ba]:_a,[wa]:wa,[Ma]:Ws},$n=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sf=1234567,Pr=Math.PI/180,is=180/Math.PI;function Hi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ye[i&255]+Ye[i>>8&255]+Ye[i>>16&255]+Ye[i>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function Eh(i,t){return(i%t+t)%t}function Qm(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function tg(i,t,e){return i!==t?(e-i)/(t-i):0}function Lr(i,t,e){return(1-e)*i+e*t}function eg(i,t,e,n){return Lr(i,t,1-Math.exp(-e*n))}function ng(i,t=1){return t-Math.abs(Eh(i,t*2)-t)}function ig(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function sg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function rg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function og(i,t){return i+Math.random()*(t-i)}function ag(i){return i*(.5-Math.random())}function lg(i){i!==void 0&&(sf=i);let t=sf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cg(i){return i*Pr}function hg(i){return i*is}function ug(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function fg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Th(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function dg(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),p=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*p,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*p,a*c);break;case"ZYZ":i.set(l*p,l*d,a*h,a*c);break;default:Ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ah(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function wd(i,t){if(t.constructor===Float32Array)return i;let e=Ah(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Ed(i,t){if(t.constructor===Float32Array)return i;let e=Ah(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var We={DEG2RAD:Pr,RAD2DEG:is,generateUUID:Hi,clamp:Yt,euclideanModulo:Eh,mapLinear:Qm,inverseLerp:tg,lerp:Lr,damp:eg,pingpong:ng,smoothstep:ig,smootherstep:sg,randInt:rg,randFloat:og,randFloatSpread:ag,seededRandom:lg,degToRad:cg,radToDeg:hg,isPowerOfTwo:ug,ceilPowerOfTwo:fg,floorPowerOfTwo:Th,setQuaternionFromProperEuler:dg,normalize:Ed,denormalize:wd},Lh=class Lh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Lh.prototype.isVector2=!0;var Xt=Lh,_e=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],p=r[o+2],x=r[o+3];if(u!==x||l!==f||c!==d||h!==p){let m=l*f+c*d+h*p+u*x;m<0&&(f=-f,d=-d,p=-p,x=-x,m=-m);let g=1-a;if(m<.9995){let _=Math.acos(m),w=Math.sin(_);g=Math.sin(g*_)/w,a=Math.sin(a*_)/w,l=l*g+f*a,c=c*g+d*a,h=h*g+p*a,u=u*g+x*a}else{l=l*g+f*a,c=c*g+d*a,h=h*g+p*a,u=u*g+x*a;let _=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=_,c*=_,h*=_,u*=_}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+h*u+l*d-c*f,t[e+1]=l*p+h*f+c*u-a*d,t[e+2]=c*p+h*d+a*f-l*u,t[e+3]=h*p-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"YZX":this._x=f*h*u+c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u-f*d*p;break;case"XZY":this._x=f*h*u-c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u+f*d*p;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Dh=class Dh{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(rf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(rf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return gc.copy(this).projectOnVector(t),this.sub(gc)}reflect(t){return this.sub(gc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Dh.prototype.isVector3=!0;var F=Dh,gc=new F,rf=new _e,Fh=class Fh{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],x=s[0],m=s[3],g=s[6],_=s[1],w=s[4],M=s[7],A=s[2],E=s[5],y=s[8];return r[0]=o*x+a*_+l*A,r[3]=o*m+a*w+l*E,r[6]=o*g+a*M+l*y,r[1]=c*x+h*_+u*A,r[4]=c*m+h*w+u*E,r[7]=c*g+h*M+u*y,r[2]=f*x+d*_+p*A,r[5]=f*m+d*w+p*E,r[8]=f*g+d*M+p*y,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,p=e*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Ir("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(yc.makeScale(t,e)),this}rotate(t){return Ir("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(yc.makeRotation(-t)),this}translate(t,e){return Ir("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(yc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Fh.prototype.isMatrix3=!0;var Ot=Fh,yc=new Ot,of=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),af=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pg(){let i={enabled:!0,workingColorSpace:Fr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ae&&(s.r=hi(s.r),s.g=hi(s.g),s.b=hi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ae&&(s.r=Gs(s.r),s.g=Gs(s.g),s.b=Gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?Nr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Fr]:{primaries:t,whitePoint:n,transfer:Nr,toXYZ:of,fromXYZ:af,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ie},outputColorSpaceConfig:{drawingBufferColorSpace:ie}},[ie]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:of,fromXYZ:af,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ie}}}),i}var Vt=pg();function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Cs,Aa=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Cs===void 0&&(Cs=qs("canvas")),Cs.width=t.width,Cs.height=t.height;let s=Cs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Cs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=qs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=hi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hi(e[n]/255)*255):e[n]=hi(e[n]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},mg=0,Ys=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Hi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(xc(s[o].image)):r.push(xc(s[o]))}else r=xc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function xc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Aa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}var gg=0,vc=new F,ze=class i extends $n{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=dn,s=dn,r=en,o=yi,a=An,l=ln,c=i.DEFAULT_ANISOTROPY,h=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gg++}),this.uuid=Hi(),this.name="",this.source=new Ys(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(vc).x}get height(){return this.source.getSize(vc).y}get depth(){return this.source.getSize(vc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==fh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ns:t.x=t.x-Math.floor(t.x);break;case dn:t.x=t.x<0?0:1;break;case Ea:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ns:t.y=t.y-Math.floor(t.y);break;case dn:t.y=t.y<0?0:1;break;case Ea:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=fh;ze.DEFAULT_ANISOTROPY=1;var Nh=class Nh{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],p=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,M=(d+1)/2,A=(g+1)/2,E=(h+f)/4,y=(u+x)/4,b=(p+m)/4;return w>M&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=E/n,r=y/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=E/s,r=b/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=y/r,s=b/r),this.set(n,s,r,e),this}let _=Math.sqrt((m-p)*(m-p)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(u-x)/_,this.z=(f-h)/_,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Nh.prototype.isVector4=!0;var Jt=Nh,Ra=class extends $n{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new ze({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ys(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},pn=class extends Ra{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ur=class extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ca=class extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Wa=class Wa{constructor(t,e,n,s,r,o,a,l,c,h,u,f,d,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,d,p,x,m)}set(t,e,n,s,r,o,a,l,c,h,u,f,d,p,x,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wa().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Is.setFromMatrixColumn(t,0).length(),r=1/Is.setFromMatrixColumn(t,1).length(),o=1/Is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,d=o*u,p=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+p*c,e[5]=f-x*c,e[9]=-a*l,e[2]=x-f*c,e[6]=p+d*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,p=c*h,x=c*u;e[0]=f+x*a,e[4]=p*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-p,e[6]=x+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,p=c*h,x=c*u;e[0]=f-x*a,e[4]=-o*u,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,d=o*u,p=a*h,x=a*u;e[0]=l*h,e[4]=p*c-d,e[8]=f*c+x,e[1]=l*u,e[5]=x*c+f,e[9]=d*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,d=o*c,p=a*l,x=a*c;e[0]=l*h,e[4]=x-f*u,e[8]=p*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+p,e[10]=f-x*u}else if(t.order==="XZY"){let f=o*l,d=o*c,p=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+x,e[5]=o*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yg,t,xg)}lookAt(t,e,n){let s=this.elements;return un.subVectors(t,e),un.lengthSq()===0&&(un.z=1),un.normalize(),Ti.crossVectors(n,un),Ti.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Ti.crossVectors(n,un)),Ti.normalize(),qo.crossVectors(un,Ti),s[0]=Ti.x,s[4]=qo.x,s[8]=un.x,s[1]=Ti.y,s[5]=qo.y,s[9]=un.y,s[2]=Ti.z,s[6]=qo.z,s[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],x=n[6],m=n[10],g=n[14],_=n[3],w=n[7],M=n[11],A=n[15],E=s[0],y=s[4],b=s[8],I=s[12],R=s[1],L=s[5],U=s[9],z=s[13],P=s[2],H=s[6],q=s[10],G=s[14],nt=s[3],X=s[7],tt=s[11],et=s[15];return r[0]=o*E+a*R+l*P+c*nt,r[4]=o*y+a*L+l*H+c*X,r[8]=o*b+a*U+l*q+c*tt,r[12]=o*I+a*z+l*G+c*et,r[1]=h*E+u*R+f*P+d*nt,r[5]=h*y+u*L+f*H+d*X,r[9]=h*b+u*U+f*q+d*tt,r[13]=h*I+u*z+f*G+d*et,r[2]=p*E+x*R+m*P+g*nt,r[6]=p*y+x*L+m*H+g*X,r[10]=p*b+x*U+m*q+g*tt,r[14]=p*I+x*z+m*G+g*et,r[3]=_*E+w*R+M*P+A*nt,r[7]=_*y+w*L+M*H+A*X,r[11]=_*b+w*U+M*q+A*tt,r[15]=_*I+w*z+M*G+A*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],x=t[7],m=t[11],g=t[15],_=l*d-c*f,w=a*d-c*u,M=a*f-l*u,A=o*d-c*h,E=o*f-l*h,y=o*u-a*h;return e*(x*_-m*w+g*M)-n*(p*_-m*A+g*E)+s*(p*w-x*A+g*y)-r*(p*M-x*E+m*y)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],x=t[13],m=t[14],g=t[15],_=e*a-n*o,w=e*l-s*o,M=e*c-r*o,A=n*l-s*a,E=n*c-r*a,y=s*c-r*l,b=h*x-u*p,I=h*m-f*p,R=h*g-d*p,L=u*m-f*x,U=u*g-d*x,z=f*g-d*m,P=_*z-w*U+M*L+A*R-E*I+y*b;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/P;return t[0]=(a*z-l*U+c*L)*H,t[1]=(s*U-n*z-r*L)*H,t[2]=(x*y-m*E+g*A)*H,t[3]=(f*E-u*y-d*A)*H,t[4]=(l*R-o*z-c*I)*H,t[5]=(e*z-s*R+r*I)*H,t[6]=(m*M-p*y-g*w)*H,t[7]=(h*y-f*M+d*w)*H,t[8]=(o*U-a*R+c*b)*H,t[9]=(n*R-e*U-r*b)*H,t[10]=(p*E-x*M+g*_)*H,t[11]=(u*M-h*E-d*_)*H,t[12]=(a*I-o*L-l*b)*H,t[13]=(e*L-n*I+s*b)*H,t[14]=(x*w-p*A-m*_)*H,t[15]=(h*A-u*w+f*_)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,p=r*u,x=o*h,m=o*u,g=a*u,_=l*c,w=l*h,M=l*u,A=n.x,E=n.y,y=n.z;return s[0]=(1-(x+g))*A,s[1]=(d+M)*A,s[2]=(p-w)*A,s[3]=0,s[4]=(d-M)*E,s[5]=(1-(f+g))*E,s[6]=(m+_)*E,s[7]=0,s[8]=(p+w)*y,s[9]=(m-_)*y,s[10]=(1-(f+x))*y,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Is.set(s[0],s[1],s[2]).length(),a=Is.set(s[4],s[5],s[6]).length(),l=Is.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Pn.copy(this);let c=1/o,h=1/a,u=1/l;return Pn.elements[0]*=c,Pn.elements[1]*=c,Pn.elements[2]*=c,Pn.elements[4]*=h,Pn.elements[5]*=h,Pn.elements[6]*=h,Pn.elements[8]*=u,Pn.elements[9]*=u,Pn.elements[10]*=u,e.setFromRotationMatrix(Pn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=wn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),p,x;if(l)p=r/(o-r),x=o*r/(o-r);else if(a===wn)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Xs)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=wn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),p,x;if(l)p=1/(o-r),x=o/(o-r);else if(a===wn)p=-2/(o-r),x=-(o+r)/(o-r);else if(a===Xs)p=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Wa.prototype.isMatrix4=!0;var wt=Wa,Is=new F,Pn=new wt,yg=new F(0,0,0),xg=new F(1,1,1),Ti=new F,qo=new F,un=new F,lf=new wt,cf=new _e,Ce=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return lf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(lf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return cf.setFromEuler(this),this.setFromQuaternion(cf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ce.DEFAULT_ORDER="XYZ";var Or=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},vg=0,hf=new F,Ps=new _e,si=new wt,$o=new F,Mr=new F,_g=new F,Sg=new _e,uf=new F(1,0,0),ff=new F(0,1,0),df=new F(0,0,1),pf={type:"added"},Mg={type:"removed"},Ls={type:"childadded",child:null},_c={type:"childremoved",child:null},pe=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new Ce,n=new _e,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new wt},normalMatrix:{value:new Ot}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Or,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(t,e){return Ps.setFromAxisAngle(t,e),this.quaternion.premultiply(Ps),this}rotateX(t){return this.rotateOnAxis(uf,t)}rotateY(t){return this.rotateOnAxis(ff,t)}rotateZ(t){return this.rotateOnAxis(df,t)}translateOnAxis(t,e){return hf.copy(t).applyQuaternion(this.quaternion),this.position.add(hf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(uf,t)}translateY(t){return this.translateOnAxis(ff,t)}translateZ(t){return this.translateOnAxis(df,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?$o.copy(t):$o.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(Mr,$o,this.up):si.lookAt($o,Mr,this.up),this.quaternion.setFromRotationMatrix(si),s&&(si.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(si),this.quaternion.premultiply(Ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Bt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(pf),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null):Bt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Mg),_c.child=t,this.dispatchEvent(_c),_c.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),si.multiply(t.parent.matrixWorld)),t.applyMatrix4(si),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(pf),Ls.child=t,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,t,_g),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Sg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};pe.DEFAULT_UP=new F(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var tn=class extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}},bg={type:"move"},Js=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Td={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Yo={h:0,s:0,l:0};function Sc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Lt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Vt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Vt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Vt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Vt.workingColorSpace){if(t=Eh(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Sc(o,r,t+1/3),this.g=Sc(o,r,t),this.b=Sc(o,r,t-1/3)}return Vt.colorSpaceToWorking(this,s),this}setStyle(t,e=ie){function n(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ie){let n=Td[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ie){return Vt.workingToColorSpace(Je.copy(this),t),Math.round(Yt(Je.r*255,0,255))*65536+Math.round(Yt(Je.g*255,0,255))*256+Math.round(Yt(Je.b*255,0,255))}getHexString(t=ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Vt.workingColorSpace){Vt.workingToColorSpace(Je.copy(this),e);let n=Je.r,s=Je.g,r=Je.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Vt.workingColorSpace){return Vt.workingToColorSpace(Je.copy(this),e),t.r=Je.r,t.g=Je.g,t.b=Je.b,t}getStyle(t=ie){Vt.workingToColorSpace(Je.copy(this),t);let e=Je.r,n=Je.g,s=Je.b;return t!==ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ai),this.setHSL(Ai.h+t,Ai.s+e,Ai.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ai),t.getHSL(Yo);let n=Lr(Ai.h,Yo.h,e),s=Lr(Ai.s,Yo.s,e),r=Lr(Ai.l,Yo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Je=new Lt;Lt.NAMES=Td;var Br=class extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ce,this.environmentIntensity=1,this.environmentRotation=new Ce,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ln=new F,ri=new F,Mc=new F,oi=new F,Ds=new F,Fs=new F,mf=new F,bc=new F,wc=new F,Ec=new F,Tc=new Jt,Ac=new Jt,Rc=new Jt,Li=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Ln.subVectors(t,e),s.cross(Ln);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Ln.subVectors(s,e),ri.subVectors(n,e),Mc.subVectors(t,e);let o=Ln.dot(Ln),a=Ln.dot(ri),l=Ln.dot(Mc),c=ri.dot(ri),h=ri.dot(Mc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,p=(o*h-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,oi.x),l.addScaledVector(o,oi.y),l.addScaledVector(a,oi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Tc.setScalar(0),Ac.setScalar(0),Rc.setScalar(0),Tc.fromBufferAttribute(t,e),Ac.fromBufferAttribute(t,n),Rc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Tc,r.x),o.addScaledVector(Ac,r.y),o.addScaledVector(Rc,r.z),o}static isFrontFacing(t,e,n,s){return Ln.subVectors(n,e),ri.subVectors(t,e),Ln.cross(ri).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ln.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),Ln.cross(ri).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Ds.subVectors(s,n),Fs.subVectors(r,n),bc.subVectors(t,n);let l=Ds.dot(bc),c=Fs.dot(bc);if(l<=0&&c<=0)return e.copy(n);wc.subVectors(t,s);let h=Ds.dot(wc),u=Fs.dot(wc);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),e.copy(n).addScaledVector(Ds,o);Ec.subVectors(t,r);let d=Ds.dot(Ec),p=Fs.dot(Ec);if(p>=0&&d<=p)return e.copy(r);let x=d*c-l*p;if(x<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Fs,a);let m=h*p-d*u;if(m<=0&&u-h>=0&&d-p>=0)return mf.subVectors(r,s),a=(u-h)/(u-h+(d-p)),e.copy(s).addScaledVector(mf,a);let g=1/(m+x+f);return o=x*g,a=f*g,e.copy(n).addScaledVector(Ds,o).addScaledVector(Fs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Jo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jo.copy(n.boundingBox)),Jo.applyMatrix4(t.matrixWorld),this.union(Jo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(br),jo.subVectors(this.max,br),Ns.subVectors(t.a,br),Us.subVectors(t.b,br),Os.subVectors(t.c,br),Ri.subVectors(Us,Ns),Ci.subVectors(Os,Us),Ki.subVectors(Ns,Os);let e=[0,-Ri.z,Ri.y,0,-Ci.z,Ci.y,0,-Ki.z,Ki.y,Ri.z,0,-Ri.x,Ci.z,0,-Ci.x,Ki.z,0,-Ki.x,-Ri.y,Ri.x,0,-Ci.y,Ci.x,0,-Ki.y,Ki.x,0];return!Cc(e,Ns,Us,Os,jo)||(e=[1,0,0,0,1,0,0,0,1],!Cc(e,Ns,Us,Os,jo))?!1:(Zo.crossVectors(Ri,Ci),e=[Zo.x,Zo.y,Zo.z],Cc(e,Ns,Us,Os,jo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ai),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ai=[new F,new F,new F,new F,new F,new F,new F,new F],Dn=new F,Jo=new nn,Ns=new F,Us=new F,Os=new F,Ri=new F,Ci=new F,Ki=new F,br=new F,jo=new F,Zo=new F,Qi=new F;function Cc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Qi.fromArray(i,r);let a=s.x*Math.abs(Qi.x)+s.y*Math.abs(Qi.y)+s.z*Math.abs(Qi.z),l=t.dot(Qi),c=e.dot(Qi),h=n.dot(Qi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Ee=new F,Ko=new Xt,wg=0,qn=class extends $n{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=vd,this.updateRanges=[],this.gpuType=Tn,this.version=0,this._normalizationScale=t!==void 0?Ah(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ko.fromBufferAttribute(this,e),Ko.applyMatrix3(t),this.setXY(e,Ko.x,Ko.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):wd(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Ed(t,this.array)}};var ss=class extends qn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var kr=class extends qn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ce=class extends qn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Eg=new nn,wr=new F,Ic=new F,fi=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Eg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;wr.subVectors(t,this.center);let e=wr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(wr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ic.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(wr.copy(t.center).add(Ic)),this.expandByPoint(wr.copy(t.center).sub(Ic))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Tg=0,bn=new wt,Pc=new pe,Bs=new F,fn=new nn,Er=new nn,Be=new F,Ve=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zm(t)?kr:ss)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return Pc.lookAt(t),Pc.updateMatrix(),this.applyMatrix4(Pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ce(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Er.setFromBufferAttribute(a),this.morphTargetsRelative?(Be.addVectors(fn.min,Er.min),fn.expandByPoint(Be),Be.addVectors(fn.max,Er.max),fn.expandByPoint(Be)):(fn.expandByPoint(Er.min),fn.expandByPoint(Er.max))}fn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Be.fromBufferAttribute(a,c),l&&(Bs.fromBufferAttribute(t,c),Be.add(Bs)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new qn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let I=0;I<n.count;I++)a[I]=new F,l[I]=new F;let h=new F,u=new F,f=new F,d=new Xt,p=new Xt,x=new Xt,m=new F,g=new F;function _(I,R,L){c[I]=c[R]=c[L]=1,h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,R),f.fromBufferAttribute(n,L),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,R),x.fromBufferAttribute(r,L),u.sub(h),f.sub(h),p.sub(d),x.sub(d);let U=1/(p.x*x.y-x.x*p.y);isFinite(U)&&(m.copy(u).multiplyScalar(x.y).addScaledVector(f,-p.y).multiplyScalar(U),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(U),a[I].add(m),a[R].add(m),a[L].add(m),l[I].add(g),l[R].add(g),l[L].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let I=0,R=w.length;I<R;++I){let L=w[I],U=L.start,z=L.count;for(let P=U,H=U+z;P<H;P+=3)_(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let M=new F,A=new F,E=new F,y=new F;function b(I){E.fromBufferAttribute(s,I),y.copy(E);let R=a[I];M.copy(R),M.sub(E.multiplyScalar(E.dot(R))).normalize(),A.crossVectors(y,R);let U=A.dot(l[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,U)}for(let I=0,R=n.count;I<R;++I)c[I]&&b(I);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new qn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,u=new F;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,p=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let g=0;g<h;g++)f[p++]=c[d++]}return new qn(f,h,u)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Lc=new F,Ag=new F,Rg=new Ot,Fn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Lc.subVectors(n,e).cross(Ag.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Lc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Rg.getNormalMatrix(t),s=this.coplanarPoint(Lc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Cg=0,Nn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Hi(),this.name="",this.type="Material",this.blending=sr,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ih,this.blendDst=sh,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ya,this.stencilZFail=ya,this.stencilZPass=ya,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Lt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Fn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var li=new F,Dc=new F,Qo=new F,ta=new F,js=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(li.copy(this.origin).addScaledVector(this.direction,e),li.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Dc.copy(t).add(e).multiplyScalar(.5),Qo.copy(e).sub(t).normalize(),ta.copy(this.origin).sub(Dc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Qo),a=ta.dot(this.direction),l=-ta.dot(Qo),c=ta.lengthSq(),h=Math.abs(1-o*o),u,f,d,p;if(h>0)if(u=o*l-a,f=o*a-l,p=r*h,u>=0)if(f>=-p)if(f<=p){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Dc).addScaledVector(Qo,f),d}intersectSphere(t,e){if(t.radius<0)return null;li.subVectors(t.center,this.origin);let n=li.dot(this.direction),s=li.dot(li)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,li)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,f=t.y-o.y,d=t.z-o.z,p=e.x-o.x,x=e.y-o.y,m=e.z-o.z,g=n.x-o.x,_=n.y-o.y,w=n.z-o.z,M=Math.abs(l),A=Math.abs(c),E=Math.abs(h),y,b,I,R,L,U,z,P,H,q,G,nt;if(M>=A&&M>=E?(I=l,U=u,H=p,nt=g,l>=0?(y=c,b=h,R=f,L=d,z=x,P=m,q=_,G=w):(y=h,b=c,R=d,L=f,z=m,P=x,q=w,G=_)):A>=E?(I=c,U=f,H=x,nt=_,c>=0?(y=h,b=l,R=d,L=u,z=m,P=p,q=w,G=g):(y=l,b=h,R=u,L=d,z=p,P=m,q=g,G=w)):(I=h,U=d,H=m,nt=w,h>=0?(y=l,b=c,R=u,L=f,z=p,P=x,q=g,G=_):(y=c,b=l,R=f,L=u,z=x,P=p,q=_,G=g)),I===0)return null;let X=y/I,tt=b/I,et=1/I,_t=R-X*U,Nt=L-tt*U,j=z-X*H,dt=P-tt*H,vt=q-X*nt,It=G-tt*nt,mt=vt*dt-It*j,kt=_t*It-Nt*vt,Me=j*Nt-dt*_t;if(s){if(mt<0||kt<0||Me<0)return null}else if((mt<0||kt<0||Me<0)&&(mt>0||kt>0||Me>0))return null;let Ft=mt+kt+Me;if(Ft===0)return null;let ee=et*(mt*U+kt*H+Me*nt);return(Ft>0?ee<0:ee>0)?null:this.at(ee/Ft,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},rs=class extends Nn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ce,this.combine=ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},gf=new wt,ts=new js,ea=new fi,yf=new F,na=new F,ia=new F,sa=new F,Fc=new F,ra=new F,xf=new F,oa=new F,Ie=class extends pe{constructor(t=new Ve,e=new rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ra.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Fc.fromBufferAttribute(u,t),o?ra.addScaledVector(Fc,h):ra.addScaledVector(Fc.sub(e),h))}e.add(ra)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(r),ts.copy(t.ray).recast(t.near),!(ea.containsPoint(ts.origin)===!1&&(ts.intersectSphere(ea,yf)===null||ts.origin.distanceToSquared(yf)>(t.far-t.near)**2))&&(gf.copy(r).invert(),ts.copy(t.ray).applyMatrix4(gf),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ts)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,x=f.length;p<x;p++){let m=f[p],g=o[m.materialIndex],_=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=_,A=w;M<A;M+=3){let E=a.getX(M),y=a.getX(M+1),b=a.getX(M+2);s=aa(this,g,t,n,c,h,u,E,y,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=p,g=x;m<g;m+=3){let _=a.getX(m),w=a.getX(m+1),M=a.getX(m+2);s=aa(this,o,t,n,c,h,u,_,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,x=f.length;p<x;p++){let m=f[p],g=o[m.materialIndex],_=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=_,A=w;M<A;M+=3){let E=M,y=M+1,b=M+2;s=aa(this,g,t,n,c,h,u,E,y,b),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=p,g=x;m<g;m+=3){let _=m,w=m+1,M=m+2;s=aa(this,o,t,n,c,h,u,_,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Ig(i,t,e,n,s,r,o,a){let l;if(t.side===sn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Vi,a),l===null)return null;oa.copy(a),oa.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(oa);return c<e.near||c>e.far?null:{distance:c,point:oa.clone(),object:i}}function aa(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,na),i.getVertexPosition(l,ia),i.getVertexPosition(c,sa);let h=Ig(i,t,e,n,na,ia,sa,xf);if(h){let u=new F;Li.getBarycoord(xf,na,ia,sa,u),s&&(h.uv=Li.getInterpolatedAttribute(s,a,l,c,u,new Xt)),r&&(h.uv1=Li.getInterpolatedAttribute(r,a,l,c,u,new Xt)),o&&(h.normal=Li.getInterpolatedAttribute(o,a,l,c,u,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new F,materialIndex:0};Li.getNormal(na,ia,sa,f.normal),h.face=f,h.barycoord=u}return h}var Tr=new Jt,vf=new Jt,_f=new Jt,Pg=new Jt,Sf=new wt,la=new F,Nc=new fi,Mf=new wt,Uc=new js,zr=class extends Ie{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=kc,this.bindMatrix=new wt,this.bindMatrixInverse=new wt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new nn),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,la),this.boundingBox.expandByPoint(la)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fi),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,la),this.boundingSphere.expandByPoint(la)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Nc.copy(this.boundingSphere),Nc.applyMatrix4(s),t.ray.intersectsSphere(Nc)!==!1&&(Mf.copy(s).invert(),Uc.copy(t.ray).applyMatrix4(Mf),!(this.boundingBox!==null&&Uc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Uc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new Jt,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===kc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ld?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ct("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;vf.fromBufferAttribute(s.attributes.skinIndex,t),_f.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(Tr.copy(e),e.set(0,0,0,0)):(Tr.set(e.x,e.y,e.z,1),e.set(0,0,0)),Tr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=_f.getComponent(r);if(o!==0){let a=vf.getComponent(r);Sf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Pg.copy(Tr).applyMatrix4(Sf),o)}}return e.isVector4&&(e.w=Tr.w),e.applyMatrix4(this.bindMatrixInverse)}},os=class extends pe{constructor(){super(),this.isBone=!0,this.type="Bone"}},Vr=class extends ze{constructor(t=null,e=1,n=1,s,r,o,a,l,c=ke,h=ke,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},bf=new wt,Lg=new wt,Gr=class i{constructor(t=[],e=[]){this.uuid=Hi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){Ct("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new wt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new wt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:Lg;bf.multiplyMatrices(a,e[r]),bf.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Vr(e,t,t,An,Tn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(Ct("Skeleton: No bone found with UUID:",r),o=new os),this.bones.push(o),this.boneInverses.push(new wt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}};var es=new fi,Dg=new Xt(.5,.5),ca=new F,Di=class{constructor(t=new Fn,e=new Fn,n=new Fn,s=new Fn,r=new Fn,o=new Fn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=wn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],x=r[9],m=r[10],g=r[11],_=r[12],w=r[13],M=r[14],A=r[15];if(s[0].setComponents(c-o,d-h,g-p,A-_).normalize(),s[1].setComponents(c+o,d+h,g+p,A+_).normalize(),s[2].setComponents(c+a,d+u,g+x,A+w).normalize(),s[3].setComponents(c-a,d-u,g-x,A-w).normalize(),n)s[4].setComponents(l,f,m,M).normalize(),s[5].setComponents(c-l,d-f,g-m,A-M).normalize();else if(s[4].setComponents(c-l,d-f,g-m,A-M).normalize(),e===wn)s[5].setComponents(c+l,d+f,g+m,A+M).normalize();else if(e===Xs)s[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(t){es.center.set(0,0,0);let e=Dg.distanceTo(t.center);return es.radius=.7071067811865476+e,es.applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ca.x=s.normal.x>0?t.max.x:t.min.x,ca.y=s.normal.y>0?t.max.y:t.min.y,ca.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ca)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},wf=new wt,Ia=class i{constructor(){this.coordinateSystem=wn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];wf.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Di),n[s].setFromProjectionMatrix(wf,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Di),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var Fi=class extends Nn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Pa=new F,La=new F,Ef=new wt,Ar=new js,ha=new fi,Oc=new F,Tf=new F,as=class extends pe{constructor(t=new Ve,e=new Fi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Pa.fromBufferAttribute(e,s-1),La.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Pa.distanceTo(La);t.setAttribute("lineDistance",new ce(n,1))}else Ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,t.ray.intersectsSphere(ha)===!1)return;Ef.copy(s).invert(),Ar.copy(t.ray).applyMatrix4(Ef);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let x=d,m=p-1;x<m;x+=c){let g=h.getX(x),_=h.getX(x+1),w=ua(this,t,Ar,l,g,_,x);w&&e.push(w)}if(this.isLineLoop){let x=h.getX(p-1),m=h.getX(d),g=ua(this,t,Ar,l,x,m,p-1);g&&e.push(g)}}else{let d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let x=d,m=p-1;x<m;x+=c){let g=ua(this,t,Ar,l,x,x+1,x);g&&e.push(g)}if(this.isLineLoop){let x=ua(this,t,Ar,l,p-1,d,p-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ua(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(Pa.fromBufferAttribute(a,s),La.fromBufferAttribute(a,r),e.distanceSqToSegment(Pa,La,Oc,Tf)>n)return;Oc.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Oc);if(!(c<t.near||c>t.far))return{distance:c,point:Tf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Hr=class extends ze{constructor(t=[],e=ms,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Zs=class extends ze{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var di=class extends ze{constructor(t,e,n=On,s,r,o,a=ke,l=ke,c,h=ui,u=1){if(h!==ui&&h!==xi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ys(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Wr=class extends di{constructor(t,e=On,n=ms,s,r,o=ke,a=ke,l,c=ui){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Xr=class extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ni=class i extends Ve{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2));function p(x,m,g,_,w,M,A,E,y,b,I){let R=M/y,L=A/b,U=M/2,z=A/2,P=E/2,H=y+1,q=b+1,G=0,nt=0,X=new F;for(let tt=0;tt<q;tt++){let et=tt*L-z;for(let _t=0;_t<H;_t++){let Nt=_t*R-U;X[x]=Nt*_,X[m]=et*w,X[g]=P,c.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[g]=E>0?1:-1,h.push(X.x,X.y,X.z),u.push(_t/y),u.push(1-tt/b),G+=1}}for(let tt=0;tt<b;tt++)for(let et=0;et<y;et++){let _t=f+et+H*tt,Nt=f+et+H*(tt+1),j=f+(et+1)+H*(tt+1),dt=f+(et+1)+H*tt;l.push(_t,Nt,dt),l.push(Nt,j,dt),nt+=6}a.addGroup(d,nt,I),d+=nt,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ls=class i extends Ve{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,u=Math.PI/2*t,f=e,d=2*u+f,p=n*2+r,x=s+1,m=new F,g=new F;for(let _=0;_<=p;_++){let w=0,M=0,A=0,E=0;if(_<=n){let I=_/n,R=I*Math.PI/2;M=-h-t*Math.cos(R),A=t*Math.sin(R),E=-t*Math.cos(R),w=I*u}else if(_<=n+r){let I=(_-n)/r;M=-h+I*e,A=t,E=0,w=u+I*f}else{let I=(_-n-r)/n,R=I*Math.PI/2;M=h+t*Math.sin(R),A=t*Math.cos(R),E=t*Math.sin(R),w=u+f+I*u}let y=Math.max(0,Math.min(1,w/d)),b=0;_===0?b=.5/s:_===p&&(b=-.5/s);for(let I=0;I<=s;I++){let R=I/s,L=R*Math.PI*2,U=Math.sin(L),z=Math.cos(L);g.x=-A*z,g.y=M,g.z=A*U,a.push(g.x,g.y,g.z),m.set(-A*z,E,A*U),m.normalize(),l.push(m.x,m.y,m.z),c.push(R+b,y)}if(_>0){let I=(_-1)*x;for(let R=0;R<s;R++){let L=I+R,U=I+R+1,z=_*x+R,P=_*x+R+1;o.push(L,U,z),o.push(U,P,z)}}}this.setIndex(o),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(l,3)),this.setAttribute("uv",new ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var Da=class i extends Ve{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],p=0,x=[],m=n/2,g=0;_(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new ce(u,3)),this.setAttribute("normal",new ce(f,3)),this.setAttribute("uv",new ce(d,2));function _(){let M=new F,A=new F,E=0,y=(e-t)/n;for(let b=0;b<=r;b++){let I=[],R=b/r,L=R*(e-t)+t;for(let U=0;U<=s;U++){let z=U/s,P=z*l+a,H=Math.sin(P),q=Math.cos(P);A.x=L*H,A.y=-R*n+m,A.z=L*q,u.push(A.x,A.y,A.z),M.set(H,y,q).normalize(),f.push(M.x,M.y,M.z),d.push(z,1-R),I.push(p++)}x.push(I)}for(let b=0;b<s;b++)for(let I=0;I<r;I++){let R=x[I][b],L=x[I+1][b],U=x[I+1][b+1],z=x[I][b+1];(t>0||I!==0)&&(h.push(R,L,z),E+=3),(e>0||I!==r-1)&&(h.push(L,U,z),E+=3)}c.addGroup(g,E,0),g+=E}function w(M){let A=p,E=new Xt,y=new F,b=0,I=M===!0?t:e,R=M===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),p++;let L=p;for(let U=0;U<=s;U++){let P=U/s*l+a,H=Math.cos(P),q=Math.sin(P);y.x=I*q,y.y=m*R,y.z=I*H,u.push(y.x,y.y,y.z),f.push(0,R,0),E.x=H*.5+.5,E.y=q*.5*R+.5,d.push(E.x,E.y),p++}for(let U=0;U<s;U++){let z=A+U,P=L+U;M===!0?h.push(P,P+1,z):h.push(P+1,P,z),b+=3}c.addGroup(g,b,M===!0?1:2),g+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qr=class i extends Da{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var $r=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ct("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Xt:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new F,s=[],r=[],o=[],a=new F,l=new wt;for(let d=0;d<=t;d++){let p=d/t;s[d]=this.getTangentAt(p,new F)}r[0]=new F,o[0]=new F;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Yt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Yt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}};function Fg(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Ad(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=kg(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,u=l;for(let f=e;f<s;f+=e){let d=i[f],p=i[f+1];d<a&&(a=d),p<l&&(l=p),d>h&&(h=d),p>u&&(u=p)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Yr(r,o,e,a,l,c,0),o}function Ad(i,t,e,n,s){let r;if(s===jg(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Af(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Af(o/n|0,i[o],i[o+1],r);return r&&Ks(r,r.next)&&(jr(r),r=r.next),r}function cs(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ks(e,e.next)||ve(e.prev,e,e.next)===0)){if(jr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Yr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Wg(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Ug(i,n,s,r):Ng(i)){t.push(l.i,i.i,c.i),jr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Og(cs(i),t),Yr(i,t,e,n,s,r,2)):o===2&&Bg(i,t,e,n,s,r):Yr(cs(i),t,e,n,s,r,1);break}}}function Ng(i){let t=i.prev,e=i,n=i.next;if(ve(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&Rr(s,a,r,l,o,c,p.x,p.y)&&ve(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Ug(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ve(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,l,c),p=Math.min(h,u,f),x=Math.max(a,l,c),m=Math.max(h,u,f),g=Wc(d,p,t,e,n),_=Wc(x,m,t,e,n),w=i.prevZ,M=i.nextZ;for(;w&&w.z>=g&&M&&M.z<=_;){if(w.x>=d&&w.x<=x&&w.y>=p&&w.y<=m&&w!==s&&w!==o&&Rr(a,h,l,u,c,f,w.x,w.y)&&ve(w.prev,w,w.next)>=0||(w=w.prevZ,M.x>=d&&M.x<=x&&M.y>=p&&M.y<=m&&M!==s&&M!==o&&Rr(a,h,l,u,c,f,M.x,M.y)&&ve(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;w&&w.z>=g;){if(w.x>=d&&w.x<=x&&w.y>=p&&w.y<=m&&w!==s&&w!==o&&Rr(a,h,l,u,c,f,w.x,w.y)&&ve(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;M&&M.z<=_;){if(M.x>=d&&M.x<=x&&M.y>=p&&M.y<=m&&M!==s&&M!==o&&Rr(a,h,l,u,c,f,M.x,M.y)&&ve(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Og(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Ks(n,s)&&Cd(n,e,e.next,s)&&Jr(n,s)&&Jr(s,n)&&(t.push(n.i,e.i,s.i),jr(e),jr(e.next),e=i=s),e=e.next}while(e!==i);return cs(e)}function Bg(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$g(o,a)){let l=Id(o,a);o=cs(o,o.next),l=cs(l,l.next),Yr(o,t,e,n,s,r,0),Yr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function kg(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Ad(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(qg(c))}s.sort(zg);for(let r=0;r<s.length;r++)e=Vg(s[r],e);return e}function zg(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Vg(i,t){let e=Gg(i,t);if(!e)return t;let n=Id(e,i);return cs(n,n.next),cs(e,e.next)}function Gg(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Ks(i,e))return e;do{if(Ks(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Rd(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);Jr(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Hg(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function Hg(i,t){return ve(i.prev,i,t.prev)<0&&ve(t.next,i,i.next)<0}function Wg(i,t,e,n){let s=i;do s.z===0&&(s.z=Wc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Xg(s)}function Xg(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Wc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function qg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Rd(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Rr(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Rd(i,t,e,n,s,r,o,a)}function $g(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Yg(i,t)&&(Jr(i,t)&&Jr(t,i)&&Jg(i,t)&&(ve(i.prev,i,t.prev)||ve(i,t.prev,t))||Ks(i,t)&&ve(i.prev,i,i.next)>0&&ve(t.prev,t,t.next)>0)}function ve(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ks(i,t){return i.x===t.x&&i.y===t.y}function Cd(i,t,e,n){let s=da(ve(i,t,e)),r=da(ve(i,t,n)),o=da(ve(e,n,i)),a=da(ve(e,n,t));return!!(s!==r&&o!==a||s===0&&fa(i,e,t)||r===0&&fa(i,n,t)||o===0&&fa(e,i,n)||a===0&&fa(e,t,n))}function fa(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function da(i){return i>0?1:i<0?-1:0}function Yg(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Cd(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Jr(i,t){return ve(i.prev,i,i.next)<0?ve(i,t,i.next)>=0&&ve(i,i.prev,t)>=0:ve(i,t,i.prev)<0||ve(i,i.next,t)<0}function Jg(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Id(i,t){let e=Xc(i.i,i.x,i.y),n=Xc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Af(i,t,e,n){let s=Xc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function jr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Xc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function jg(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var qc=class{static triangulate(t,e,n=2){return Fg(t,e,n)}},Zr=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Rf(t),Cf(n,t);let o=t.length;e.forEach(Rf);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Cf(n,e[l]);let a=qc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Rf(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Cf(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var pi=class i extends Ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,d=[],p=[],x=[],m=[];for(let g=0;g<h;g++){let _=g*f-o;for(let w=0;w<c;w++){let M=w*u-r;p.push(M,-_,0),x.push(0,0,1),m.push(w/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<a;_++){let w=_+c*g,M=_+c*(g+1),A=_+1+c*(g+1),E=_+1+c*g;d.push(w,M,E),d.push(M,A,E)}this.setIndex(d),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Kr=class i extends Ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new F,f=new F,d=[],p=[],x=[],m=[];for(let g=0;g<=n;g++){let _=[],w=g/n,M=o+w*a,A=t*Math.cos(M),E=Math.sqrt(t*t-A*A),y=0;g===0&&o===0?y=.5/e:g===n&&l===Math.PI&&(y=-.5/e);for(let b=0;b<=e;b++){let I=b/e,R=s+I*r;u.x=-E*Math.cos(R),u.y=A,u.z=E*Math.sin(R),p.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(I+y,1-w),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<e;_++){let w=h[g][_+1],M=h[g][_],A=h[g+1][_],E=h[g+1][_+1];(g!==0||o>0)&&d.push(w,M,E),(g!==n-1||l<Math.PI)&&d.push(M,A,E)}this.setIndex(d),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function ys(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(If(s))s.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(If(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function je(i){let t={};for(let e=0;e<i.length;e++){let n=ys(i[e]);for(let s in n)t[s]=n[s]}return t}function If(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Zg(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Rh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Vt.workingColorSpace}var Pd={clone:ys,merge:je},Kg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Yn=class extends Nn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kg,this.fragmentShader=Qg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ys(t.uniforms),this.uniformsGroups=Zg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Lt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Jt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"m4":this.uniforms[n].value=new wt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Fa=class extends Yn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Jn=class extends Nn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lr,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ce,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Ui=class extends Nn{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Lt(16777215),this.specular=new Lt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lr,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ce,this.combine=ho,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Qr=class extends Nn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lr,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ce,this.combine=ho,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Na=class extends Nn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ud,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ua=class extends Nn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Pi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Cr(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function t0(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function Pf(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let l=0;l!==t;++l)s[o++]=i[a+l]}return s}function e0(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}var Oi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Oa=class extends Oi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vc,endingEnd:Vc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Gc:r=t,a=2*e-n;break;case Hc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Gc:o=t,l=2*n-e;break;case Hc:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-e)/(s-e),x=p*p,m=x*p,g=-f*m+2*f*x-f*p,_=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*p+1,w=(-1-d)*m+(1.5+d)*x+.5*p,M=d*m-d*x;for(let A=0;A!==a;++A)r[A]=g*o[h+A]+_*o[c+A]+w*o[l+A]+M*o[u+A];return r}},Ba=class extends Oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},ka=class extends Oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},za=class extends Oi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-e)/(s-e),x=1-p;for(let m=0;m!==a;++m)r[m]=o[c+m]*x+o[l+m]*p;return r}let f=a*2,d=t-1;for(let p=0;p!==a;++p){let x=o[c+p],m=o[l+p],g=d*f+p*2,_=u[g],w=u[g+1],M=t*f+p*2,A=h[M],E=h[M+1],y=i0(n,e,_,A,s);r[p]=Ld(y,x,w,E,m)}return r}};function Ld(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function n0(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function i0(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Ld(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=n0(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var an=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Pi(e,this.TimeBufferType),this.values=Pi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Pi(t.times,Array),values:Pi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Cr(t.settings)&&(n.settings={inTangents:Pi(t.settings.inTangents,Array),outTangents:Pi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ba(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Oa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new za(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Dr:e=this.InterpolantFactoryMethodDiscrete;break;case Ta:e=this.InterpolantFactoryMethodLinear;break;case ga:e=this.InterpolantFactoryMethodSmooth;break;case zc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ct("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Dr;case this.InterpolantFactoryMethodLinear:return Ta;case this.InterpolantFactoryMethodSmooth:return ga;case this.InterpolantFactoryMethodBezier:return zc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;Cr(this.settings)&&(Lf(this.settings.inTangents,t),Lf(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Cr(this.settings)&&(Df(this.settings.inTangents,t),Df(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Bt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Bt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Bt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Bt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Km(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Bt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ga,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){let x=e[u+p];if(x!==e[f+p]||x!==e[d+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Cr(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Lf(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function Df(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}an.prototype.ValueTypeName="";an.prototype.TimeBufferType=Float32Array;an.prototype.ValueBufferType=Float32Array;an.prototype.DefaultInterpolation=Ta;var mi=class extends an{constructor(t,e,n){super(t,e,n)}};mi.prototype.ValueTypeName="bool";mi.prototype.ValueBufferType=Array;mi.prototype.DefaultInterpolation=Dr;mi.prototype.InterpolantFactoryMethodLinear=void 0;mi.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends an{constructor(t,e,n,s){super(t,e,n,s)}};to.prototype.ValueTypeName="color";var Bi=class extends an{constructor(t,e,n,s){super(t,e,n,s)}};Bi.prototype.ValueTypeName="number";var Va=class extends Oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)_e.slerpFlat(r,0,o,c-a,o,c,l);return r}},ki=class extends an{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Va(this.times,this.values,this.getValueSize(),t)}};ki.prototype.ValueTypeName="quaternion";ki.prototype.InterpolantFactoryMethodSmooth=void 0;var gi=class extends an{constructor(t,e,n){super(t,e,n)}};gi.prototype.ValueTypeName="string";gi.prototype.ValueBufferType=Array;gi.prototype.DefaultInterpolation=Dr;gi.prototype.InterpolantFactoryMethodLinear=void 0;gi.prototype.InterpolantFactoryMethodSmooth=void 0;var hs=class extends an{constructor(t,e,n,s){super(t,e,n,s)}};hs.prototype.ValueTypeName="vector";var eo=class{constructor(t="",e=-1,n=[],s=hd){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=Hi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(r0(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(an.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=t0(l);l=Pf(l,1,h),c=Pf(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Bi(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};function s0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bi;case"vector":case"vector2":case"vector3":case"vector4":return hs;case"color":return to;case"quaternion":return ki;case"bool":case"boolean":return mi;case"string":return gi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function r0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=s0(i.type);if(i.times===void 0){let n=[],s=[];e0(i.keys,n,s,"value"),i.times=n,i.values=s}let e;return t.parse!==void 0?e=t.parse(i):e=new t(i.name,i.times,i.values,i.interpolation),Cr(i.settings)&&(e.settings={inTangents:Pi(i.settings.inTangents,Float32Array),outTangents:Pi(i.settings.outTangents,Float32Array)}),e}var Hs={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(Ff(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!Ff(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Ff(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var Qs=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],p=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Dd=new Qs,Un=class{constructor(t){this.manager=t!==void 0?t:Dd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Un.DEFAULT_MATERIAL_NAME="__DEFAULT";var ci={},$c=class extends Error{constructor(t,e){super(t),this.response=e}},no=class extends Un{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=Hs.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(ci[t]!==void 0){ci[t].push({onLoad:e,onProgress:n,onError:s});return}ci[t]=[],ci[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ct("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ci[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0,x=0,m=new ReadableStream({start(g){_();function _(){u.read().then(({done:w,value:M})=>{if(w)g.close();else{x+=M.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:d});for(let E=0,y=h.length;E<y;E++){let b=h[E];b.onProgress&&b.onProgress(A)}g.enqueue(M),_()}},w=>{g.error(w)})}}});return new Response(m)}else throw new $c(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Hs.add(`file:${t}`,c);let h=ci[t];delete ci[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=ci[t];if(h===void 0)throw this.manager.itemError(t),c;delete ci[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ks=new WeakMap,Ga=class extends Un{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Hs.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=ks.get(o);u===void 0&&(u=[],ks.set(o,u)),u.push({onLoad:e,onError:s})}return o}let a=qs("img");function l(){h(),e&&e(this);let u=ks.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}ks.delete(this),r.manager.itemEnd(t)}function c(u){h(),s&&s(u),Hs.remove(`image:${t}`);let f=ks.get(this)||[];for(let d=0;d<f.length;d++){let p=f[d];p.onError&&p.onError(u)}ks.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Hs.add(`image:${t}`,a),r.manager.itemStart(t),a.fetchPriority=this.priority,a.src=t,a}};var us=class extends Un{constructor(t){super(t)}load(t,e,n,s){let r=new ze,o=new Ga(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},zi=class extends pe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},io=class extends zi{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Bc=new wt,Nf=new F,Uf=new F,tr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Di,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Nf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nf),Uf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Uf),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Bc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Bc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Xs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Bc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},pa=new F,ma=new _e,Xn=new F,so=class extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(pa,ma,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pa,ma,Xn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(pa,ma,Xn),Xn.x===1&&Xn.y===1&&Xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pa,ma,Xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ii=new F,Of=new Xt,Bf=new Xt,Re=class extends so{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z)}getViewSize(t,e){return this.getViewBounds(t,Of,Bf),e.subVectors(Bf,Of)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Yc=class extends tr{constructor(){super(new Re(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=is*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},ro=class extends zi{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Yc}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},Jc=class extends tr{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0}},er=class extends zi{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Jc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},oo=class extends so{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},jc=class extends tr{constructor(){super(new oo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fs=class extends zi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new jc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},ao=class extends zi{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var lo=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}};var zs=-90,Vs=1,nr=class extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Re(zs,Vs,t,e);s.layers=this.layers,this.add(s);let r=new Re(zs,Vs,t,e);r.layers=this.layers,this.add(r);let o=new Re(zs,Vs,t,e);o.layers=this.layers,this.add(o);let a=new Re(zs,Vs,t,e);a.layers=this.layers,this.add(a);let l=new Re(zs,Vs,t,e);l.layers=this.layers,this.add(l);let c=new Re(zs,Vs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ha=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Ch="\\[\\]\\.:\\/",o0=new RegExp("["+Ch+"]","g"),Ih="[^"+Ch+"]",a0="[^"+Ch.replace("\\.","")+"]",l0=/((?:WC+[\/:])*)/.source.replace("WC",Ih),c0=/(WCOD+)?/.source.replace("WCOD",a0),h0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ih),u0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ih),f0=new RegExp("^"+l0+c0+h0+u0+"$"),d0=["material","materials","bones","map"],Zc=class{constructor(t,e,n){let s=n||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},oe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(o0,"")}static parseTrackName(t){let e=f0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);d0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Bt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Bt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Bt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Bt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Bt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;Bt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=Zc;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var vM=new Float32Array(1);var Uh=class Uh{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Uh.prototype.isMatrix2=!0;var Kc=Uh;function Ph(i,t,e,n){let s=p0(n);switch(e){case yh:return i*t;case vh:return i*t/s.components*s.byteLength;case ja:return i*t/s.components*s.byteLength;case Gi:return i*t*2/s.components*s.byteLength;case Za:return i*t*2/s.components*s.byteLength;case xh:return i*t*3/s.components*s.byteLength;case An:return i*t*4/s.components*s.byteLength;case Ka:return i*t*4/s.components*s.byteLength;case fo:case po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case mo:case go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case tl:case nl:return Math.max(i,16)*Math.max(t,8)/4;case Qa:case el:return Math.max(i,8)*Math.max(t,8)/2;case il:case sl:case ol:case al:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case rl:case yo:case ll:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case cl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case dl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case pl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ml:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case gl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case yl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case xl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case vl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case _l:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Sl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case bl:case wl:case El:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Tl:case Al:return Math.ceil(i/4)*Math.ceil(t/4)*8;case xo:case Rl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function p0(i){switch(i){case ln:case dh:return{byteLength:1,components:1};case ar:case ph:case Bn:return{byteLength:2,components:1};case Ya:case Ja:return{byteLength:2,components:4};case On:case $a:case Tn:return{byteLength:4,components:1};case mh:case gh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function ep(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function g0(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){let p=u[f],x=u[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){let x=u[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var y0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,x0=`#ifdef USE_ALPHAHASH
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
#endif`,v0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,M0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,b0=`#ifdef USE_AOMAP
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
#endif`,w0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,E0=`#ifdef USE_BATCHING
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
#endif`,T0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,R0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,I0=`#ifdef USE_IRIDESCENCE
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
#endif`,P0=`#ifdef USE_BUMPMAP
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
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,U0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,O0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,k0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,z0=`#define PI 3.141592653589793
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
} // validated`,V0=`vec3 transformedNormal = objectNormal;
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
#endif`,G0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,H0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,W0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,X0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,q0="gl_FragColor = linearToOutputTexel( gl_FragColor );",$0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y0=`#ifdef USE_ENVMAP
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
#endif`,J0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,K0=`#ifdef USE_ENVMAP
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
#endif`,Q0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ty=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ey=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ny=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iy=`#ifdef USE_GRADIENTMAP
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
}`,sy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ry=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ay=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ly=`#ifdef USE_ENVMAP
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
#endif`,cy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dy=`PhysicalMaterial material;
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
#endif`,py=`uniform sampler2D dfgLUT;
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
}`,my=`
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
#endif`,gy=`#if defined( RE_IndirectDiffuse )
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
#endif`,yy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xy=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,vy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_y=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,My=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,by=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ey=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ty=`#if defined( USE_POINTS_UV )
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
#endif`,Ay=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ry=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Iy=`#if defined( USE_MORPHCOLORS )
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
#endif`,Py=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ly=`#ifdef USE_MORPHTARGETS
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
#endif`,Dy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ny=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Uy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,By=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ky=`#ifdef USE_NORMALMAP
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
#endif`,zy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$y=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ky=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ex=`float getShadowMask() {
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
}`,nx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ix=`#ifdef USE_SKINNING
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
#endif`,sx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rx=`#ifdef USE_SKINNING
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
#endif`,ox=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hx=`#ifdef USE_TRANSMISSION
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
#endif`,ux=`#ifdef USE_TRANSMISSION
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
#endif`,fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yx=`uniform sampler2D t2D;
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
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vx=`uniform float backgroundBlurriness;
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
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mx=`#include <common>
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
}`,bx=`#if DEPTH_PACKING == 3200
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
}`,wx=`#define DISTANCE
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
}`,Ex=`#define DISTANCE
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
}`,Tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ax=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`uniform float scale;
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
}`,Cx=`uniform vec3 diffuse;
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
}`,Ix=`#include <common>
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
}`,Px=`uniform vec3 diffuse;
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
}`,Lx=`#define LAMBERT
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
}`,Dx=`#define LAMBERT
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
}`,Fx=`#define MATCAP
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
}`,Nx=`#define MATCAP
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
}`,Ux=`#define NORMAL
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
}`,Ox=`#define NORMAL
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
}`,Bx=`#define PHONG
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
}`,kx=`#define PHONG
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
}`,zx=`#define STANDARD
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
}`,Vx=`#define STANDARD
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
}`,Gx=`#define TOON
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
}`,Hx=`#define TOON
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
}`,Wx=`uniform float size;
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
}`,Xx=`uniform vec3 diffuse;
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
}`,qx=`#include <common>
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
}`,$x=`uniform vec3 color;
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
}`,Yx=`uniform float rotation;
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
}`,Jx=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:y0,alphahash_pars_fragment:x0,alphamap_fragment:v0,alphamap_pars_fragment:_0,alphatest_fragment:S0,alphatest_pars_fragment:M0,aomap_fragment:b0,aomap_pars_fragment:w0,batching_pars_vertex:E0,batching_vertex:T0,begin_vertex:A0,beginnormal_vertex:R0,bsdfs:C0,iridescence_fragment:I0,bumpmap_pars_fragment:P0,clipping_planes_fragment:L0,clipping_planes_pars_fragment:D0,clipping_planes_pars_vertex:F0,clipping_planes_vertex:N0,color_fragment:U0,color_pars_fragment:O0,color_pars_vertex:B0,color_vertex:k0,common:z0,defaultnormal_vertex:V0,displacementmap_pars_vertex:G0,displacementmap_vertex:H0,emissivemap_fragment:W0,emissivemap_pars_fragment:X0,colorspace_fragment:q0,colorspace_pars_fragment:$0,envmap_fragment:Y0,envmap_common_pars_fragment:J0,envmap_pars_fragment:j0,envmap_pars_vertex:Z0,envmap_physical_pars_fragment:ly,envmap_vertex:K0,fog_vertex:Q0,fog_pars_vertex:ty,fog_fragment:ey,fog_pars_fragment:ny,gradientmap_pars_fragment:iy,lightmap_pars_fragment:sy,lights_lambert_fragment:ry,lights_lambert_pars_fragment:oy,lights_pars_begin:ay,lights_toon_fragment:cy,lights_toon_pars_fragment:hy,lights_phong_fragment:uy,lights_phong_pars_fragment:fy,lights_physical_fragment:dy,lights_physical_pars_fragment:py,lights_fragment_begin:my,lights_fragment_maps:gy,lights_fragment_end:yy,lightprobes_pars_fragment:xy,logdepthbuf_fragment:vy,logdepthbuf_pars_fragment:_y,logdepthbuf_pars_vertex:Sy,logdepthbuf_vertex:My,map_fragment:by,map_pars_fragment:wy,map_particle_fragment:Ey,map_particle_pars_fragment:Ty,metalnessmap_fragment:Ay,metalnessmap_pars_fragment:Ry,morphinstance_vertex:Cy,morphcolor_vertex:Iy,morphnormal_vertex:Py,morphtarget_pars_vertex:Ly,morphtarget_vertex:Dy,normal_fragment_begin:Fy,normal_fragment_maps:Ny,normal_pars_fragment:Uy,normal_pars_vertex:Oy,normal_vertex:By,normalmap_pars_fragment:ky,clearcoat_normal_fragment_begin:zy,clearcoat_normal_fragment_maps:Vy,clearcoat_pars_fragment:Gy,iridescence_pars_fragment:Hy,opaque_fragment:Wy,packing:Xy,premultiplied_alpha_fragment:qy,project_vertex:$y,dithering_fragment:Yy,dithering_pars_fragment:Jy,roughnessmap_fragment:jy,roughnessmap_pars_fragment:Zy,shadowmap_pars_fragment:Ky,shadowmap_pars_vertex:Qy,shadowmap_vertex:tx,shadowmask_pars_fragment:ex,skinbase_vertex:nx,skinning_pars_vertex:ix,skinning_vertex:sx,skinnormal_vertex:rx,specularmap_fragment:ox,specularmap_pars_fragment:ax,tonemapping_fragment:lx,tonemapping_pars_fragment:cx,transmission_fragment:hx,transmission_pars_fragment:ux,uv_pars_fragment:fx,uv_pars_vertex:dx,uv_vertex:px,worldpos_vertex:mx,background_vert:gx,background_frag:yx,backgroundCube_vert:xx,backgroundCube_frag:vx,cube_vert:_x,cube_frag:Sx,depth_vert:Mx,depth_frag:bx,distance_vert:wx,distance_frag:Ex,equirect_vert:Tx,equirect_frag:Ax,linedashed_vert:Rx,linedashed_frag:Cx,meshbasic_vert:Ix,meshbasic_frag:Px,meshlambert_vert:Lx,meshlambert_frag:Dx,meshmatcap_vert:Fx,meshmatcap_frag:Nx,meshnormal_vert:Ux,meshnormal_frag:Ox,meshphong_vert:Bx,meshphong_frag:kx,meshphysical_vert:zx,meshphysical_frag:Vx,meshtoon_vert:Gx,meshtoon_frag:Hx,points_vert:Wx,points_frag:Xx,shadow_vert:qx,shadow_frag:$x,sprite_vert:Yx,sprite_frag:Jx},yt={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Kn={basic:{uniforms:je([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:je([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)},envMapIntensity:{value:1}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:je([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:je([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:je([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Lt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:je([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:je([yt.points,yt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:je([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:je([yt.common,yt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:je([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:je([yt.sprite,yt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distance:{uniforms:je([yt.common,yt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distance_vert,fragmentShader:$t.distance_frag},shadow:{uniforms:je([yt.lights,yt.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Kn.physical={uniforms:je([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ot},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var Cl={r:0,b:0,g:0},jx=new wt,np=new Ot;np.set(-1,0,0,0,1,0,0,0,1);function Zx(i,t,e,n,s,r){let o=new Lt(0),a=s===!0?0:1,l,c,h=null,u=0,f=null;function d(_){let w=_.isScene===!0?_.background:null;if(w&&w.isTexture){let M=_.backgroundBlurriness>0;w=t.get(w,M)}return w}function p(_){let w=!1,M=d(_);M===null?m(o,a):M&&M.isColor&&(m(M,1),w=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(_,w){let M=d(w);M&&M.isCubeTexture?(c===void 0&&(c=new Ie(new Ni(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:ys(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,E,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(jx.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(np),c.material.toneMapped=Vt.getTransfer(M.colorSpace)!==ae,(h!==M||u!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ie(new pi(2,2),new Yn({name:"BackgroundMaterial",uniforms:ys(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Vt.getTransfer(M.colorSpace)!==ae,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,w){_.getRGB(Cl,Rh(i)),e.buffers.color.setClear(Cl.r,Cl.g,Cl.b,w,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,w=1){o.set(_),a=w,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,m(o,a)},render:p,addToRenderList:x,dispose:g}}function Kx(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(L,U,z,P,H){let q=!1,G=u(L,P,z,U);r!==G&&(r=G,c(r.object)),q=d(L,P,z,H),q&&p(L,P,z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,M(L,U,z,P),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function u(L,U,z,P){let H=P.wireframe===!0,q=n[U.id];q===void 0&&(q={},n[U.id]=q);let G=L.isInstancedMesh===!0?L.id:0,nt=q[G];nt===void 0&&(nt={},q[G]=nt);let X=nt[z.id];X===void 0&&(X={},nt[z.id]=X);let tt=X[H];return tt===void 0&&(tt=f(l()),X[H]=tt),tt}function f(L){let U=[],z=[],P=[];for(let H=0;H<e;H++)U[H]=0,z[H]=0,P[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:P,object:L,attributes:{},index:null}}function d(L,U,z,P){let H=r.attributes,q=U.attributes,G=0,nt=z.getAttributes();for(let X in nt)if(nt[X].location>=0){let et=H[X],_t=q[X];if(_t===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(_t=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(_t=L.instanceColor)),et===void 0||et.attribute!==_t||_t&&et.data!==_t.data)return!0;G++}return r.attributesNum!==G||r.index!==P}function p(L,U,z,P){let H={},q=U.attributes,G=0,nt=z.getAttributes();for(let X in nt)if(nt[X].location>=0){let et=q[X];et===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(et=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(et=L.instanceColor));let _t={};_t.attribute=et,et&&et.data&&(_t.data=et.data),H[X]=_t,G++}r.attributes=H,r.attributesNum=G,r.index=P}function x(){let L=r.newAttributes;for(let U=0,z=L.length;U<z;U++)L[U]=0}function m(L){g(L,0)}function g(L,U){let z=r.newAttributes,P=r.enabledAttributes,H=r.attributeDivisors;z[L]=1,P[L]===0&&(i.enableVertexAttribArray(L),P[L]=1),H[L]!==U&&(i.vertexAttribDivisor(L,U),H[L]=U)}function _(){let L=r.newAttributes,U=r.enabledAttributes;for(let z=0,P=U.length;z<P;z++)U[z]!==L[z]&&(i.disableVertexAttribArray(z),U[z]=0)}function w(L,U,z,P,H,q,G){G===!0?i.vertexAttribIPointer(L,U,z,H,q):i.vertexAttribPointer(L,U,z,P,H,q)}function M(L,U,z,P){x();let H=P.attributes,q=z.getAttributes(),G=U.defaultAttributeValues;for(let nt in q){let X=q[nt];if(X.location>=0){let tt=H[nt];if(tt===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor)),tt!==void 0){let et=tt.normalized,_t=tt.itemSize,Nt=t.get(tt);if(Nt===void 0)continue;let j=Nt.buffer,dt=Nt.type,vt=Nt.bytesPerElement,It=dt===i.INT||dt===i.UNSIGNED_INT||tt.gpuType===$a;if(tt.isInterleavedBufferAttribute){let mt=tt.data,kt=mt.isInterleavedBuffer===!0?mt.stride:mt.itemSize,Me=tt.offset;if(mt.isInstancedInterleavedBuffer||mt.isInstancedBufferAttribute){for(let Ft=0;Ft<X.locationSize;Ft++)g(X.location+Ft,mt.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Ft=0;Ft<X.locationSize;Ft++)m(X.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,j);for(let Ft=0;Ft<X.locationSize;Ft++)w(X.location+Ft,_t/X.locationSize,dt,et,kt*vt,(Me+_t/X.locationSize*Ft)*vt,It)}else{if(tt.isInstancedBufferAttribute){for(let mt=0;mt<X.locationSize;mt++)g(X.location+mt,tt.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let mt=0;mt<X.locationSize;mt++)m(X.location+mt);i.bindBuffer(i.ARRAY_BUFFER,j);for(let mt=0;mt<X.locationSize;mt++)w(X.location+mt,_t/X.locationSize,dt,et,_t*vt,_t/X.locationSize*mt*vt,It)}}else if(G!==void 0){let et=G[nt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(X.location,et);break;case 3:i.vertexAttrib3fv(X.location,et);break;case 4:i.vertexAttrib4fv(X.location,et);break;default:i.vertexAttrib1fv(X.location,et)}}}}_()}function A(){I();for(let L in n){let U=n[L];for(let z in U){let P=U[z];for(let H in P){let q=P[H];for(let G in q)h(q[G].object),delete q[G];delete P[H]}}delete n[L]}}function E(L){if(n[L.id]===void 0)return;let U=n[L.id];for(let z in U){let P=U[z];for(let H in P){let q=P[H];for(let G in q)h(q[G].object),delete q[G];delete P[H]}}delete n[L.id]}function y(L){for(let U in n){let z=n[U];for(let P in z){let H=z[P];if(H[L.id]===void 0)continue;let q=H[L.id];for(let G in q)h(q[G].object),delete q[G];delete H[L.id]}}}function b(L){for(let U in n){let z=n[U],P=L.isInstancedMesh===!0?L.id:0,H=z[P];if(H!==void 0){for(let q in H){let G=H[q];for(let nt in G)h(G[nt].object),delete G[nt];delete H[q]}delete z[P],Object.keys(z).length===0&&delete n[U]}}}function I(){R(),o=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfObject:b,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function Qx(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function tv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let y=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(y){return!(y!==An&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let b=y===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==ln&&y!==Tn&&!b&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(y){if(y==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ct("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Ct("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:w,maxFragmentUniforms:M,maxSamples:A,samples:E}}function ev(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Fn,a=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let p=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{let _=r?0:n,w=_*4,M=g.clippingState||null;l.value=M,M=h(p,f,w,d);for(let A=0;A!==w;++A)M[A]=e[A];g.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,p){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,p!==!0||m===null){let g=d+x*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<g)&&(m=new Float32Array(g));for(let w=0,M=d;w!==x;++w,M+=4)o.copy(u[w]).applyMatrix4(_,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var So=class extends pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Hr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ni(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:ds});r.uniforms.tEquirect.value=e;let o=new Ie(s,r),a=e.minFilter;return e.minFilter===yi&&(e.minFilter=en),new nr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Fd=256,nv=3,iv=20,ip=256,sp=16,sv=3,rv=new F,ov=new Lt,Pl=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new nr(1,10,null),this._boxMesh=new Ie(new Ni(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=rv}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,p=l.autoClearStencil,x=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(t.background=l.getClearColor(ov));let m=new nr(n,s,h);return m.position.copy(a),m.update(l,t),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=p,t.background=x,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Od(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ud(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Fd,Th(t))}_fromTexture(t,e){t.mapping===ms||t.mapping===rr?this._setSize(t.image.length===0?Fd:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Nd(t,!1,!1),n=Math.log2(t)-nv;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Nd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===ms||t.mapping===rr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Od()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Ud()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=av(),this._integrationMaterial=lv());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/sp);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-sv)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let l=a>0?Math.log2(e)+.5*Math.log2(6/(ip*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=cv());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Nd(i,t,e){return new So(i,{minFilter:yi,generateMipmaps:t,type:Bn,colorSpace:Fr,depthBuffer:e})}function Mo(i,t,e){return new Yn({name:i,uniforms:t,vertexShader:$t.cube_vert,fragmentShader:e,side:sn,blending:ds,depthTest:!1,depthWrite:!1})}function av(){return Mo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ip}u

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
	`)}function lv(){return Mo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:sp}},`

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
	`)}function cv(){return Mo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${iv}
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
	`)}function Ud(){return Mo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Od(){return Mo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function hv(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===or||d===Xa)if(t.has(f)){let p=t.get(f).texture;return a(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let x=new So(p.height);return x.fromEquirectangularTexture(i,f),t.set(f,x),f.addEventListener("dispose",c),a(x.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,p=d===or||d===Xa,x=d===ms||d===rr;if(p||x){let m=e.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Pl(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{let _=f.image;return p&&_&&_.height>0||x&&_&&l(_)?(n===null&&(n=new Pl(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function a(f,d){return d===or?f.mapping=ms:d===Xa&&(f.mapping=rr),f}function l(f){let d=0,p=6;for(let x=0;x<p;x++)f[x]!==void 0&&d++;return d===p}function c(f){let d=f.target;d.removeEventListener("dispose",c);let p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function uv(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ir("WebGLRenderer: "+n+" extension not supported."),s}}}function fv(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(p=>delete s[p]);function a(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete s[p.id],o.unregister(p);let x=r.get(p);x&&(t.remove(x),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,x){return s[x.id]!==void 0||(x.addEventListener("dispose",a),s[x.id]=new WeakRef(x),o.register(x,x.id,x),e.memory.geometries++),x}function h(p){let x=p.attributes;for(let m in x)t.update(x[m],i.ARRAY_BUFFER)}function u(p){let x=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let _=x!==null?x.array.length:m.array.length/3-1,w=m.count>=65535?kr:ss,M=new w(Math.ceil(_/3)*6,1),A=M.array;if(x!==null){let y=x.array;g=x.version;for(let b=0,I=0;b<_;b+=3){let R=y[b+0],L=y[b+1],U=y[b+2];A[I++]=R,A[I++]=L,A[I++]=L,A[I++]=U,A[I++]=U,A[I++]=R}}else{g=m.version;for(let y=0,b=0;y<_;y+=3){let I=y+0,R=y+1,L=y+2;A[b++]=I,A[b++]=R,A[b++]=R,A[b++]=L,A[b++]=L,A[b++]=I}}M.version=g;let E=r.get(p);E&&t.remove(E),r.set(p,M)}function f(p){let x=r.get(p);if(x){let m=p.index;m!==null&&x.version<m.version&&u(p)}else u(p);return r.get(p)}function d(){for(let p in s){let x=s[p].deref();x!==void 0&&l(x)}}return{get:c,update:h,getWireframeAttribute:f,dispose:d}}function dv(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let x=0;for(let m=0;m<d;m++)x+=f[m];e.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function pv(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Bt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function mv(i,t,e){let n=new WeakMap,s=new Jt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let I=function(){y.dispose(),n.delete(a),a.removeEventListener("dispose",I)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],w=0;d===!0&&(w=1),p===!0&&(w=2),x===!0&&(w=3);let M=a.attributes.position.count*w,A=1;M>t.maxTextureSize&&(A=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let E=new Float32Array(M*A*4*u),y=new Ur(E,M,A,u);y.type=Tn,y.needsUpdate=!0;let b=w*4;for(let R=0;R<u;R++){let L=m[R],U=g[R],z=_[R],P=M*A*4*R;for(let H=0;H<L.count;H++){let q=H*b;d===!0&&(s.fromBufferAttribute(L,H),E[P+q+0]=s.x,E[P+q+1]=s.y,E[P+q+2]=s.z,E[P+q+3]=0),p===!0&&(s.fromBufferAttribute(U,H),E[P+q+4]=s.x,E[P+q+5]=s.y,E[P+q+6]=s.z,E[P+q+7]=0),x===!0&&(s.fromBufferAttribute(z,H),E[P+q+8]=s.x,E[P+q+9]=s.y,E[P+q+10]=s.z,E[P+q+11]=z.itemSize===4?s.w:1)}}f={count:u,texture:y,size:new Xt(M,A)},n.set(a,f),a.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];let p=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function gv(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var yv={[rh]:"LINEAR_TONE_MAPPING",[oh]:"REINHARD_TONE_MAPPING",[ah]:"CINEON_TONE_MAPPING",[lh]:"ACES_FILMIC_TONE_MAPPING",[hh]:"AGX_TONE_MAPPING",[uh]:"NEUTRAL_TONE_MAPPING",[ch]:"CUSTOM_TONE_MAPPING"};function xv(i,t,e,n,s,r){let o=new pn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new Ve;h.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ce([0,2,0,0,2,0],2));let u=new Fa({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ie(h,u),d=new oo(-1,1,1,-1,0,1),p=null,x=null,m=!1,g,_=null,w=[],M=!1;this.setSize=function(A,E){o.setSize(A,E),a!==null&&a.setSize(A,E),l!==null&&l.setSize(A,E);for(let y=0;y<w.length;y++){let b=w[y];b.setSize&&b.setSize(A,E)}},this.setEffects=function(A){w=A,M=w.length>0&&w[0].isRenderPass===!0;let E=o.width,y=o.height;w.length>0&&a===null&&(a=new pn(E,y,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),l=new pn(E,y,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&w.some(I=>I.needsDepthTexture===!0);b!==(o.depthTexture!==null)&&(b===!0&&c===null&&(c=new di(E,y),r===!0&&(c.format=xi,c.type=gs)),o.dispose(),o.depthTexture=b?c:null,o.resolveDepthBuffer=b,o.storeMultisampledDepthBuffer=b);for(let I=0;I<w.length;I++){let R=w[I];R.setSize&&R.setSize(E,y),b&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(A,E){if(m||A.toneMapping===jn&&w.length===0)return!1;if(_=E,E!==null){let y=E.width,b=E.height;(o.width!==y||o.height!==b)&&this.setSize(y,b)}return M===!1&&A.setRenderTarget(o),g=A.toneMapping,A.toneMapping=jn,!0},this.hasRenderPass=function(){return M},this.end=function(A,E){A.toneMapping=g,m=!0;let y=o,b=a;for(let I=0;I<w.length;I++){let R=w[I];R.enabled!==!1&&(R.render(A,b,y,E),R.needsSwap!==!1&&(y=b,b=b===a?l:a))}if(p!==A.outputColorSpace||x!==A.toneMapping){p=A.outputColorSpace,x=A.toneMapping,u.defines={},Vt.getTransfer(p)===ae&&(u.defines.SRGB_TRANSFER="");let I=yv[x];I&&(u.defines[I]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,A.setRenderTarget(_),A.render(f,d),_=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var rp=new ze,op=new di(1,1),ap=new Wr(1),lp=new Ur,cp=new Ca,hp=new Hr,Bd=[],kd=[],zd=new Float32Array(16),Vd=new Float32Array(9),Gd=new Float32Array(4);function hr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Bd[s];if(r===void 0&&(r=new Float32Array(s),Bd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Pe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Dl(i,t){let e=kd[t];e===void 0&&(e=new Int32Array(t),kd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function vv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function _v(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function Sv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function Mv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function bv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;Gd.set(n),i.uniformMatrix2fv(this.addr,!1,Gd),Le(e,n)}}function wv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;Vd.set(n),i.uniformMatrix3fv(this.addr,!1,Vd),Le(e,n)}}function Ev(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;zd.set(n),i.uniformMatrix4fv(this.addr,!1,zd),Le(e,n)}}function Tv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Av(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function Rv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function Cv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function Iv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Pv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function Lv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function Dv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function Fl(i){return i.version===0&&(i.compareFunction=Mh,i.needsUpdate=!0),i}function Fv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Fl(op):r=rp,e.setTexture2D(t||r,s)}function Nv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||cp,s)}function Uv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Fl(ap):r=hp,e.setTextureCube(t||r,s)}function Ov(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||lp,s)}function Bv(i){switch(i){case 5126:return vv;case 35664:return _v;case 35665:return Sv;case 35666:return Mv;case 35674:return bv;case 35675:return wv;case 35676:return Ev;case 5124:case 35670:return Tv;case 35667:case 35671:return Av;case 35668:case 35672:return Rv;case 35669:case 35673:return Cv;case 5125:return Iv;case 36294:return Pv;case 36295:return Lv;case 36296:return Dv;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Nv;case 35680:case 36300:case 36308:case 36293:return Uv;case 36289:case 36303:case 36311:case 36292:return Ov}}function kv(i,t){i.uniform1fv(this.addr,t)}function zv(i,t){let e=hr(t,this.size,2);i.uniform2fv(this.addr,e)}function Vv(i,t){let e=hr(t,this.size,3);i.uniform3fv(this.addr,e)}function Gv(i,t){let e=hr(t,this.size,4);i.uniform4fv(this.addr,e)}function Hv(i,t){let e=hr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Wv(i,t){let e=hr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Xv(i,t){let e=hr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function qv(i,t){i.uniform1iv(this.addr,t)}function $v(i,t){i.uniform2iv(this.addr,t)}function Yv(i,t){i.uniform3iv(this.addr,t)}function Jv(i,t){i.uniform4iv(this.addr,t)}function jv(i,t){i.uniform1uiv(this.addr,t)}function Zv(i,t){i.uniform2uiv(this.addr,t)}function Kv(i,t){i.uniform3uiv(this.addr,t)}function Qv(i,t){i.uniform4uiv(this.addr,t)}function t_(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Fl(op):o=rp;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function e_(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||cp,r[o])}function n_(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=Fl(ap):o=hp;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function i_(i,t,e){let n=this.cache,s=t.length,r=Dl(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||lp,r[o])}function s_(i){switch(i){case 5126:return kv;case 35664:return zv;case 35665:return Vv;case 35666:return Gv;case 35674:return Hv;case 35675:return Wv;case 35676:return Xv;case 5124:case 35670:return qv;case 35667:case 35671:return $v;case 35668:case 35672:return Yv;case 35669:case 35673:return Jv;case 5125:return jv;case 36294:return Zv;case 36295:return Kv;case 36296:return Qv;case 35678:case 36198:case 36298:case 36306:case 35682:return t_;case 35679:case 36299:case 36307:return e_;case 35680:case 36300:case 36308:case 36293:return n_;case 36289:case 36303:case 36311:case 36292:return i_}}var kh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bv(e.type)}},zh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=s_(e.type)}},Vh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Oh=/(\w+)(\])?(\[|\.)?/g;function Hd(i,t){i.seq.push(t),i.map[t.id]=t}function r_(i,t,e){let n=i.name,s=n.length;for(Oh.lastIndex=0;;){let r=Oh.exec(n),o=Oh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Hd(e,c===void 0?new kh(a,i,t):new zh(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Vh(a),Hd(e,u)),e=u}}}var cr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);r_(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Wd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var o_=37297,a_=0;function l_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Xd=new Ot;function c_(i){Vt._getMatrix(Xd,Vt.workingColorSpace,i);let t=`mat3( ${Xd.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(i)){case Nr:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function qd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+l_(i.getShaderSource(t),a)}else return r}function h_(i,t){let e=c_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var u_={[rh]:"Linear",[oh]:"Reinhard",[ah]:"Cineon",[lh]:"ACESFilmic",[hh]:"AgX",[uh]:"Neutral",[ch]:"Custom"};function f_(i,t){let e=u_[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Il=new F;function d_(){Vt.getLuminanceCoefficients(Il);let i=Il.x.toFixed(4),t=Il.y.toFixed(4),e=Il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function p_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_o).join(`
`)}function m_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function g_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function _o(i){return i!==""}function $d(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Yd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var y_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gh(i){return i.replace(y_,x_)}function x_(i,t){let e=$t[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Gh(e)}var v_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jd(i){return i.replace(v_,__)}function __(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var S_={[co]:"SHADOWMAP_TYPE_PCF",[ir]:"SHADOWMAP_TYPE_VSM"};function M_(i){return S_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var b_={[rr]:"ENVMAP_MODE_REFRACTION"};function w_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":b_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var E_={[ho]:"ENVMAP_BLENDING_MULTIPLY",[od]:"ENVMAP_BLENDING_MIX",[ad]:"ENVMAP_BLENDING_ADD"};function T_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":E_[i.combine]||"ENVMAP_BLENDING_NONE"}function A_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=M_(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=w_(e),u=T_(e),f=p_(e),d=m_(r),p=s.createProgram(),x,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(_o).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(_o).join(`
`),m.length>0&&(m+=`
`)):(x=[jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_o).join(`
`),m=[jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==jn?"#define TONE_MAPPING":"",e.toneMapping!==jn?$t.tonemapping_pars_fragment:"",e.toneMapping!==jn?f_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,h_("linearToOutputTexel",e.outputColorSpace),d_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_o).join(`
`)),o=Gh(o),o=$d(o,e),o=Yd(o,e),a=Gh(a),a=$d(a,e),a=Yd(a,e),o=Jd(o),a=Jd(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let _=g+x+o,w=g+m+a,M=Wd(s,s.VERTEX_SHADER,_),A=Wd(s,s.FRAGMENT_SHADER,w);s.attachShader(p,M),s.attachShader(p,A),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function E(R){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(p)||"",U=s.getShaderInfoLog(M)||"",z=s.getShaderInfoLog(A)||"",P=L.trim(),H=U.trim(),q=z.trim(),G=!0,nt=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,M,A);else{let X=qd(s,M,"vertex"),tt=qd(s,A,"fragment");Bt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+P+`
`+X+`
`+tt)}else P!==""?Ct("WebGLProgram: Program Info Log:",P):(H===""||q==="")&&(nt=!1);nt&&(R.diagnostics={runnable:G,programLog:P,vertexShader:{log:H,prefix:x},fragmentShader:{log:q,prefix:m}})}s.deleteShader(M),s.deleteShader(A),y=new cr(s,p),b=g_(s,p)}let y;this.getUniforms=function(){return y===void 0&&E(this),y};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(p,o_)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=a_++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=A,this}var R_=0,Hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Wh(t),e.set(t,n)),n}},Wh=class{constructor(t){this.id=R_++,this.code=t,this.usedTimes=0}};function C_(i){return i===Gi||i===yo||i===xo}function I_(i,t,e,n,s,r){let o=new Or,a=new Hh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(y){return l.add(y),y===0?"uv":`uv${y}`}function p(y,b,I,R,L,U){let z=R.fog,P=L.geometry,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,q=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,G=t.get(y.envMap||H,q),nt=f[y.type],X=n.precision;y.precision!==null&&(X=n.getMaxPrecision(y.precision),X!==y.precision&&Ct("WebGLProgram.getParameters:",y.precision,"not supported, using",X,"instead."));let tt=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,et=tt!==void 0?tt.length:0,_t=0;P.morphAttributes.position!==void 0&&(_t=1),P.morphAttributes.normal!==void 0&&(_t=2),P.morphAttributes.color!==void 0&&(_t=3);let Nt,j,dt,vt;if(nt){let gt=Kn[nt];Nt=gt.vertexShader,j=gt.fragmentShader}else{Nt=y.vertexShader,j=y.fragmentShader;let gt=a.getVertexShaderStage(y),le=a.getFragmentShaderStage(y);a.update(y,gt,le),dt=gt.id,vt=le.id}let It=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),kt=L.isInstancedMesh===!0,Me=L.isBatchedMesh===!0,Ft=!!y.map,ee=!!y.matcap,re=!!G,jt=re&&G.isPMREMTexture===!0,Ge=!!y.aoMap,Te=!!y.lightMap,rn=!!y.bumpMap&&y.wireframe===!1,ye=!!y.normalMap,Gn=!!y.displacementMap,Fe=!!y.emissiveMap,xn=!!y.metalnessMap,vn=!!y.roughnessMap,_n=y.anisotropy>0,N=y.clearcoat>0,Sn=y.diffuseRoughness>0,me=y.dispersion>0,ge=y.retroreflectivity>0,pt=y.iridescence>0,Ae=y.sheen>0,Ut=y.transmission>0,zt=_n&&!!y.anisotropyMap,T=N&&!!y.clearcoatMap,v=N&&!!y.clearcoatNormalMap,B=N&&!!y.clearcoatRoughnessMap,it=Sn&&!!y.diffuseRoughnessMap,Q=pt&&!!y.iridescenceMap,ot=pt&&!!y.iridescenceThicknessMap,ut=Ae&&!!y.sheenColorMap,Y=Ae&&!!y.sheenRoughnessMap,Z=!!y.specularMap,lt=!!y.specularColorMap,C=!!y.specularIntensityMap,K=Ut&&!!y.transmissionMap,$=Ut&&!!y.thicknessMap,ct=!!y.gradientMap,rt=!!y.alphaMap,at=y.alphaTest>0,Rt=!!y.alphaHash,qt=!!y.extensions,st=jn;y.toneMapped&&(It===null||It.isXRRenderTarget===!0)&&(st=i.toneMapping);let Dt=jt?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,Wt={shaderID:nt,shaderType:y.type,shaderName:y.name,vertexShader:Nt,fragmentShader:j,defines:y.defines,customVertexShaderID:dt,customFragmentShaderID:vt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:X,batching:Me,batchingColor:Me&&L._colorsTexture!==null,instancing:kt,instancingColor:kt&&L.instanceColor!==null,instancingMorph:kt&&L.morphTexture!==null,outputColorSpace:It===null?i.outputColorSpace:It.isXRRenderTarget===!0?It.texture.colorSpace:Vt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ft,matcap:ee,envMap:re,envMapMode:re&&G.mapping,envMapPMREM:jt,envMapMaxLod:jt?Dt.length-1:null,envMapSize:jt?Dt[0].width:null,aoMap:Ge,lightMap:Te,bumpMap:rn,normalMap:ye,displacementMap:Gn,emissiveMap:Fe,normalMapObjectSpace:ye&&y.normalMapType===fd,normalMapTangentSpace:ye&&y.normalMapType===lr,packedNormalMap:ye&&y.normalMapType===lr&&C_(y.normalMap.format),metalnessMap:xn,roughnessMap:vn,anisotropy:_n,anisotropyMap:zt,clearcoat:N,clearcoatMap:T,clearcoatNormalMap:v,clearcoatRoughnessMap:B,diffuseRoughness:Sn,diffuseRoughnessMap:it,dispersion:me,retroreflection:ge,iridescence:pt,iridescenceMap:Q,iridescenceThicknessMap:ot,sheen:Ae,sheenColorMap:ut,sheenRoughnessMap:Y,specularMap:Z,specularColorMap:lt,specularIntensityMap:C,transmission:Ut,transmissionMap:K,thicknessMap:$,gradientMap:ct,opaque:y.transparent===!1&&y.blending===sr&&y.alphaToCoverage===!1,alphaMap:rt,alphaTest:at,alphaHash:Rt,combine:y.combine,mapUv:Ft&&d(y.map.channel),aoMapUv:Ge&&d(y.aoMap.channel),lightMapUv:Te&&d(y.lightMap.channel),bumpMapUv:rn&&d(y.bumpMap.channel),normalMapUv:ye&&d(y.normalMap.channel),displacementMapUv:Gn&&d(y.displacementMap.channel),emissiveMapUv:Fe&&d(y.emissiveMap.channel),metalnessMapUv:xn&&d(y.metalnessMap.channel),roughnessMapUv:vn&&d(y.roughnessMap.channel),anisotropyMapUv:zt&&d(y.anisotropyMap.channel),clearcoatMapUv:T&&d(y.clearcoatMap.channel),clearcoatNormalMapUv:v&&d(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&d(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:it&&d(y.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&d(y.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&d(y.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&d(y.sheenColorMap.channel),sheenRoughnessMapUv:Y&&d(y.sheenRoughnessMap.channel),specularMapUv:Z&&d(y.specularMap.channel),specularColorMapUv:lt&&d(y.specularColorMap.channel),specularIntensityMapUv:C&&d(y.specularIntensityMap.channel),transmissionMapUv:K&&d(y.transmissionMap.channel),thicknessMapUv:$&&d(y.thicknessMap.channel),alphaMapUv:rt&&d(y.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(ye||_n),vertexNormals:!!P.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!P.attributes.uv&&(Ft||rt),fog:!!z,useFog:y.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||P.attributes.normal===void 0&&ye===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:mt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:_t,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:U.filter(gt=>gt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:Ft&&y.map.isVideoTexture===!0&&Vt.getTransfer(y.map.colorSpace)===ae,decodeVideoTextureEmissive:Fe&&y.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(y.emissiveMap.colorSpace)===ae,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===En,flipSided:y.side===sn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:qt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&y.extensions.multiDraw===!0||Me)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Wt.vertexUv1s=l.has(1),Wt.vertexUv2s=l.has(2),Wt.vertexUv3s=l.has(3),l.clear(),Wt}function x(y){let b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(let I in y.defines)b.push(I),b.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(m(b,y),g(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function m(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapPMREM),y.push(b.envMapMaxLod),y.push(b.envMapSize),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.diffuseRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.numSunLights),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numSunLightShadows),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.numLightProbeGrids),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function g(y,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.diffuseRoughness&&o.enable(25),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function _(y){let b=f[y.type],I;if(b){let R=Kn[b];I=Pd.clone(R.uniforms)}else I=y.uniforms;return I}function w(y,b){let I=h.get(b);return I!==void 0?++I.usedTimes:(I=new A_(i,b,y,s),c.push(I),h.set(b,I)),I}function M(y){if(--y.usedTimes===0){let b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function A(y){a.remove(y)}function E(){a.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:_,acquireProgram:w,releaseProgram:M,releaseShaderCache:A,programs:c,dispose:E}}function P_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function L_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Zd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Kd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,p,x,m,g){let _=i[t];return _===void 0?(_={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:x,renderOrder:f.renderOrder,z:m,group:g},i[t]=_):(_.id=f.id,_.object=f,_.geometry=d,_.material=p,_.materialVariant=o(f),_.groupOrder=x,_.renderOrder=f.renderOrder,_.z=m,_.group=g),t++,_}function l(f,d,p,x,m,g,_){_.reversedDepth===!0&&(m=-m);let w=a(f,d,p,x,m,g);p.transmission>0?n.push(w):p.transparent===!0?s.push(w):e.push(w)}function c(f,d,p,x,m,g){let _=a(f,d,p,x,m,g);p.transmission>0?n.unshift(_):p.transparent===!0?s.unshift(_):e.unshift(_)}function h(f,d){e.length>1&&e.sort(f||L_),n.length>1&&n.sort(d||Zd),s.length>1&&s.sort(d||Zd)}function u(){for(let f=t,d=i.length;f<d;f++){let p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function D_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Kd,i.set(n,[o])):s>=r.length?(o=new Kd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function F_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new F,color:new Lt};break;case"SpotLight":e={position:new F,direction:new F,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function N_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var U_=0;function O_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function B_(i){let t=new F_,e=N_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);let s=new F,r=new wt,o=new wt;function a(c){let h=0,u=0,f=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let d=0,p=0,x=0,m=0,g=0,_=0,w=0,M=0,A=0,E=0,y=0,b=0,I=0,R=0;c.sort(O_);for(let U=0,z=c.length;U<z;U++){let P=c[U],H=P.color,q=P.intensity,G=P.distance,nt=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Gi?nt=P.shadow.map.texture:nt=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=H.r*q,u+=H.g*q,f+=H.b*q;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],q);R++}else if(P.isSunLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let tt=P.shadow,et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[p]=et,n.sunShadowMap[p]=nt;let _t=tt.getViewportCount();for(let Nt=0;Nt<_t;Nt++)n.sunShadowMatrix[x+Nt]=tt.getMatrix(Nt),n.sunShadowCascade[x+Nt]=tt._cascadeData[Nt];x+=_t,p++}n.sun[d]=X,d++}else if(P.isDirectionalLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let tt=P.shadow,et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,n.directionalShadow[m]=et,n.directionalShadowMap[m]=nt,n.directionalShadowMatrix[m]=P.shadow.matrix,A++}n.directional[m]=X,m++}else if(P.isSpotLight){let X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(H).multiplyScalar(q),X.distance=G,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[_]=X;let tt=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,tt.updateMatrices(P),P.castShadow&&I++),n.spotLightMatrix[_]=tt.matrix,P.castShadow){let et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,n.spotShadow[_]=et,n.spotShadowMap[_]=nt,y++}_++}else if(P.isRectAreaLight){let X=t.get(P);X.color.copy(H).multiplyScalar(q),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[w]=X,w++}else if(P.isPointLight){let X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let tt=P.shadow,et=e.get(P);et.shadowIntensity=tt.intensity,et.shadowBias=tt.bias,et.shadowNormalBias=tt.normalBias,et.shadowRadius=tt.radius,et.shadowMapSize=tt.mapSize,et.shadowCameraNear=tt.camera.near,et.shadowCameraFar=tt.camera.far,n.pointShadow[g]=et,n.pointShadowMap[g]=nt,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=X,g++}else if(P.isHemisphereLight){let X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(q),X.groundColor.copy(P.groundColor).multiplyScalar(q),n.hemi[M]=X,M++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=yt.LTC_FLOAT_1,n.rectAreaLTC2=yt.LTC_FLOAT_2):(n.rectAreaLTC1=yt.LTC_HALF_1,n.rectAreaLTC2=yt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let L=n.hash;(L.sunLength!==d||L.directionalLength!==m||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==w||L.hemiLength!==M||L.numSunShadows!==p||L.numDirectionalShadows!==A||L.numPointShadows!==E||L.numSpotShadows!==y||L.numSpotMaps!==b||L.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=m,n.spot.length=_,n.rectArea.length=w,n.point.length=g,n.hemi.length=M,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+b-I,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=R,L.sunLength=d,L.directionalLength=m,L.pointLength=g,L.spotLength=_,L.rectAreaLength=w,L.hemiLength=M,L.numSunShadows=p,L.numDirectionalShadows=A,L.numPointShadows=E,L.numSpotShadows=y,L.numSpotMaps=b,L.numLightProbes=R,n.version=U_++)}function l(c,h){let u=0,f=0,d=0,p=0,x=0,m=0,g=h.matrixWorldInverse;for(let _=0,w=c.length;_<w;_++){let M=c[_];if(M.isSunLight){let A=n.sun[u];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),u++}else if(M.isDirectionalLight){let A=n.directional[f];A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),f++}else if(M.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(g),p++}else if(M.isRectAreaLight){let A=n.rectArea[x];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),o.identity(),r.copy(M.matrixWorld),r.premultiply(g),o.extractRotation(r),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){let A=n.point[d];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){let A=n.hemi[m];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function Qd(i){let t=new B_(i),e=[],n=[],s=[];function r(u){h.camera=u,e.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):e.push(u)}function a(u){n.push(u)}function l(){t.setup(e),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function k_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Qd(i),t.set(s,[a])):r>=o.length?(a=new Qd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var z_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,V_=`uniform sampler2D shadow_pass;
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
}`,G_=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],H_=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],tp=new wt,vo=new F,Bh=new F;function W_(i,t,e){let n=new Di,s=new Xt,r=new Xt,o=new Jt,a=new Na,l=new Ua,c={},h=e.maxTextureSize,u={[Vi]:sn,[sn]:Vi,[En]:En},f=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:z_,fragmentShader:V_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new Ve;p.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ie(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=co;let g=this.type;this.render=function(E,y,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Vf&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=co);let I=i.getRenderTarget(),R=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(ds),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let z=g!==this.type;z&&y.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(H=>H.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,H=E.length;P<H;P++){let q=E[P],G=q.shadow;if(G===void 0){Ct("WebGLShadowMap:",q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let nt=G.getFrameExtents();s.multiply(nt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,G.mapSize.y=r.y));let X=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=X,G.map===null||z===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===ir){if(q.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new pn(s.x,s.y,{format:Gi,type:Bn,minFilter:en,magFilter:en,generateMipmaps:!1}),G.map.texture.name=q.name+".shadowMap",G.map.depthTexture=new di(s.x,s.y,Tn),G.map.depthTexture.name=q.name+".shadowMapDepth",G.map.depthTexture.format=ui,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=ke,G.map.depthTexture.magFilter=ke}else q.isPointLight?(G.map=new So(s.x),G.map.depthTexture=new Wr(s.x,On)):(G.map=new pn(s.x,s.y),G.map.depthTexture=new di(s.x,s.y,On)),G.map.depthTexture.name=q.name+".shadowMap",G.map.depthTexture.format=ui,this.type===co?(G.map.depthTexture.compareFunction=X?Sh:_h,G.map.depthTexture.minFilter=en,G.map.depthTexture.magFilter=en):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=ke,G.map.depthTexture.magFilter=ke);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);let tt=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();q.isPointLight!==!0&&G.updateMatrices(q,b);let et=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:b.layers;for(let _t=0;_t<tt;_t++){let Nt=G.getCamera(_t);if(q.isPointLight){let j=G.camera,dt=G.matrix,vt=q.distance||j.far;vt!==j.far&&(j.far=vt,j.updateProjectionMatrix()),vo.setFromMatrixPosition(q.matrixWorld),j.position.copy(vo),Bh.copy(j.position),Bh.add(G_[_t]),j.up.copy(H_[_t]),j.lookAt(Bh),j.updateMatrixWorld(),dt.makeTranslation(-vo.x,-vo.y,-vo.z),tp.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),G._frustum.setFromProjectionMatrix(tp,j.coordinateSystem,j.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,_t),i.clear();else{_t===0&&(i.setRenderTarget(G.map),i.clear());let j=G.getViewport(_t);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),U.viewport(o)}n=G.getFrustum(_t),M(y,b,Nt,q,et,this.type)}G.isPointLightShadow!==!0&&this.type===ir&&_(G,b),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(I,R,L)};function _(E,y){let b=t.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new pn(s.x,s.y,{format:Gi,type:Bn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(y,null,b,f,x,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(y,null,b,d,x,null)}function w(E,y,b,I){let R=null,L=b.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)R=L;else if(R=b.isPointLight===!0?l:a,i.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let U=R.uuid,z=y.uuid,P=c[U];P===void 0&&(P={},c[U]=P);let H=P[z];H===void 0&&(H=R.clone(),P[z]=H,y.addEventListener("dispose",A)),R=H}if(R.visible=y.visible,R.wireframe=y.wireframe,I===ir?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:u[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let U=i.properties.get(R);U.light=b}return R}function M(E,y,b,I,R,L){if(E.visible===!1)return;if(E.layers.test(R)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===ir)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,E.matrixWorld);let P=t.update(E),H=E.material;if(Array.isArray(H)){let q=P.groups;for(let G=0,nt=q.length;G<nt;G++){let X=q[G],tt=H[X.materialIndex];if(tt&&tt.visible){let et=w(E,tt,I,L);E.onBeforeShadow(i,E,y,b,P,et,X),i.renderBufferDirect(b,null,P,et,E,X),E.onAfterShadow(i,E,y,b,P,et,X)}}}else if(H.visible){let q=w(E,H,I,L);E.onBeforeShadow(i,E,y,b,P,q,null),i.renderBufferDirect(b,null,P,q,E,null),E.onAfterShadow(i,E,y,b,P,q,null)}}let z=E.children;for(let P=0,H=z.length;P<H;P++)M(z[P],y,b,I,R,L)}function A(E){E.target.removeEventListener("dispose",A);for(let b in c){let I=c[b],R=E.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function X_(i,t){function e(){let C=!1,K=new Jt,$=null,ct=new Jt(0,0,0,0);return{setMask:function(rt){$!==rt&&!C&&(i.colorMask(rt,rt,rt,rt),$=rt)},setLocked:function(rt){C=rt},setClear:function(rt,at,Rt,qt,st){st===!0&&(rt*=qt,at*=qt,Rt*=qt),K.set(rt,at,Rt,qt),ct.equals(K)===!1&&(i.clearColor(rt,at,Rt,qt),ct.copy(K))},reset:function(){C=!1,$=null,ct.set(-1,0,0,0)}}}function n(){let C=!1,K=!1,$=null,ct=null,rt=null;return{setReversed:function(at){if(K!==at){let Rt=t.get("EXT_clip_control");at?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),K=at;let qt=rt;rt=null,this.setClear(qt)}},getReversed:function(){return K},setTest:function(at){at?mt(i.DEPTH_TEST):kt(i.DEPTH_TEST)},setMask:function(at){$!==at&&!C&&(i.depthMask(at),$=at)},setFunc:function(at){if(K&&(at=bd[at]),ct!==at){switch(at){case xa:i.depthFunc(i.NEVER);break;case va:i.depthFunc(i.ALWAYS);break;case _a:i.depthFunc(i.LESS);break;case Ws:i.depthFunc(i.LEQUAL);break;case Sa:i.depthFunc(i.EQUAL);break;case Ma:i.depthFunc(i.GEQUAL);break;case ba:i.depthFunc(i.GREATER);break;case wa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=at}},setLocked:function(at){C=at},setClear:function(at){rt!==at&&(rt=at,K&&(at=1-at),i.clearDepth(at))},reset:function(){C=!1,$=null,ct=null,rt=null,K=!1}}}function s(){let C=!1,K=null,$=null,ct=null,rt=null,at=null,Rt=null,qt=null,st=null;return{setTest:function(Dt){C||(Dt?mt(i.STENCIL_TEST):kt(i.STENCIL_TEST))},setMask:function(Dt){K!==Dt&&!C&&(i.stencilMask(Dt),K=Dt)},setFunc:function(Dt,Wt,gt){($!==Dt||ct!==Wt||rt!==gt)&&(i.stencilFunc(Dt,Wt,gt),$=Dt,ct=Wt,rt=gt)},setOp:function(Dt,Wt,gt){(at!==Dt||Rt!==Wt||qt!==gt)&&(i.stencilOp(Dt,Wt,gt),at=Dt,Rt=Wt,qt=gt)},setLocked:function(Dt){C=Dt},setClear:function(Dt){st!==Dt&&(i.clearStencil(Dt),st=Dt)},reset:function(){C=!1,K=null,$=null,ct=null,rt=null,at=null,Rt=null,qt=null,st=null}}}let r=new e,o=new n,a=new s,l={},c=new WeakMap,h={},u={},f={},d=new WeakMap,p=[],x=null,m=!1,g=null,_=null,w=null,M=null,A=null,E=null,y=null,b=new Lt(0,0,0),I=0,R=!1,L=null,U=null,z=null,P=null,H=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,nt=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(X)[1]),G=nt>=1):X.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),G=nt>=2);let tt=null,et={},_t=i.getParameter(i.SCISSOR_BOX),Nt=i.getParameter(i.VIEWPORT),j=new Jt().fromArray(_t),dt=new Jt().fromArray(Nt);function vt(C,K,$,ct){let rt=new Uint8Array(4),at=i.createTexture();i.bindTexture(C,at),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<$;Rt++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,ct,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(K+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return at}let It={};It[i.TEXTURE_2D]=vt(i.TEXTURE_2D,i.TEXTURE_2D,1),It[i.TEXTURE_CUBE_MAP]=vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),It[i.TEXTURE_2D_ARRAY]=vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),It[i.TEXTURE_3D]=vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),mt(i.DEPTH_TEST),o.setFunc(Ws),rn(!1),ye(Qc),mt(i.CULL_FACE),Ge(ds);function mt(C){h[C]!==!0&&(i.enable(C),h[C]=!0)}function kt(C){h[C]!==!1&&(i.disable(C),h[C]=!1)}function Me(C,K){return f[C]!==K?(i.bindFramebuffer(C,K),f[C]=K,C===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=K),C===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=K),!0):!1}function Ft(C,K){let $=p,ct=!1;if(C){$=d.get(K),$===void 0&&($=[],d.set(K,$));let rt=C.textures;if($.length!==rt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let at=0,Rt=rt.length;at<Rt;at++)$[at]=i.COLOR_ATTACHMENT0+at;$.length=rt.length,ct=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,ct=!0);ct&&i.drawBuffers($)}function ee(C){return x!==C?(i.useProgram(C),x=C,!0):!1}let re={[ps]:i.FUNC_ADD,[Hf]:i.FUNC_SUBTRACT,[Wf]:i.FUNC_REVERSE_SUBTRACT};re[Xf]=i.MIN,re[qf]=i.MAX;let jt={[$f]:i.ZERO,[Yf]:i.ONE,[Jf]:i.SRC_COLOR,[ih]:i.SRC_ALPHA,[ed]:i.SRC_ALPHA_SATURATE,[Qf]:i.DST_COLOR,[Zf]:i.DST_ALPHA,[jf]:i.ONE_MINUS_SRC_COLOR,[sh]:i.ONE_MINUS_SRC_ALPHA,[td]:i.ONE_MINUS_DST_COLOR,[Kf]:i.ONE_MINUS_DST_ALPHA,[nd]:i.CONSTANT_COLOR,[id]:i.ONE_MINUS_CONSTANT_COLOR,[sd]:i.CONSTANT_ALPHA,[rd]:i.ONE_MINUS_CONSTANT_ALPHA};function Ge(C,K,$,ct,rt,at,Rt,qt,st,Dt){if(C===ds){m===!0&&(kt(i.BLEND),m=!1);return}if(m===!1&&(mt(i.BLEND),m=!0),C!==Gf){if(C!==g||Dt!==R){if((_!==ps||A!==ps)&&(i.blendEquation(i.FUNC_ADD),_=ps,A=ps),Dt)switch(C){case sr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case th:i.blendFunc(i.ONE,i.ONE);break;case eh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Bt("WebGLState: Invalid blending: ",C);break}else switch(C){case sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case th:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case eh:Bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nh:Bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Bt("WebGLState: Invalid blending: ",C);break}w=null,M=null,E=null,y=null,b.set(0,0,0),I=0,g=C,R=Dt}return}rt=rt||K,at=at||$,Rt=Rt||ct,(K!==_||rt!==A)&&(i.blendEquationSeparate(re[K],re[rt]),_=K,A=rt),($!==w||ct!==M||at!==E||Rt!==y)&&(i.blendFuncSeparate(jt[$],jt[ct],jt[at],jt[Rt]),w=$,M=ct,E=at,y=Rt),(qt.equals(b)===!1||st!==I)&&(i.blendColor(qt.r,qt.g,qt.b,st),b.copy(qt),I=st),g=C,R=!1}function Te(C,K){C.side===En?kt(i.CULL_FACE):mt(i.CULL_FACE);let $=C.side===sn;K&&($=!$),rn($),C.blending===sr&&C.transparent===!1?Ge(ds):Ge(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),o.setFunc(C.depthFunc),o.setTest(C.depthTest),o.setMask(C.depthWrite),r.setMask(C.colorWrite);let ct=C.stencilWrite;a.setTest(ct),ct&&(a.setMask(C.stencilWriteMask),a.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),a.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Fe(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?mt(i.SAMPLE_ALPHA_TO_COVERAGE):kt(i.SAMPLE_ALPHA_TO_COVERAGE)}function rn(C){L!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),L=C)}function ye(C){C!==kf?(mt(i.CULL_FACE),C!==U&&(C===Qc?i.cullFace(i.BACK):C===zf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):kt(i.CULL_FACE),U=C}function Gn(C){C!==z&&(G&&i.lineWidth(C),z=C)}function Fe(C,K,$){C?(mt(i.POLYGON_OFFSET_FILL),(P!==K||H!==$)&&(P=K,H=$,o.getReversed()&&(K=-K,$=-$),i.polygonOffset(K,$))):kt(i.POLYGON_OFFSET_FILL)}function xn(C){C?mt(i.SCISSOR_TEST):kt(i.SCISSOR_TEST)}function vn(C){C===void 0&&(C=i.TEXTURE0+q-1),tt!==C&&(i.activeTexture(C),tt=C)}function _n(C,K,$){$===void 0&&(tt===null?$=i.TEXTURE0+q-1:$=tt);let ct=et[$];ct===void 0&&(ct={type:void 0,texture:void 0},et[$]=ct),(ct.type!==C||ct.texture!==K)&&(tt!==$&&(i.activeTexture($),tt=$),i.bindTexture(C,K||It[C]),ct.type=C,ct.texture=K)}function N(){let C=et[tt];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Sn(){try{i.compressedTexImage2D(...arguments)}catch(C){Bt("WebGLState:",C)}}function me(){try{i.compressedTexImage3D(...arguments)}catch(C){Bt("WebGLState:",C)}}function ge(){try{i.texSubImage2D(...arguments)}catch(C){Bt("WebGLState:",C)}}function pt(){try{i.texSubImage3D(...arguments)}catch(C){Bt("WebGLState:",C)}}function Ae(){try{i.compressedTexSubImage2D(...arguments)}catch(C){Bt("WebGLState:",C)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch(C){Bt("WebGLState:",C)}}function zt(){try{i.texStorage2D(...arguments)}catch(C){Bt("WebGLState:",C)}}function T(){try{i.texStorage3D(...arguments)}catch(C){Bt("WebGLState:",C)}}function v(){try{i.texImage2D(...arguments)}catch(C){Bt("WebGLState:",C)}}function B(){try{i.texImage3D(...arguments)}catch(C){Bt("WebGLState:",C)}}function it(C){return u[C]!==void 0?u[C]:i.getParameter(C)}function Q(C,K){u[C]!==K&&(i.pixelStorei(C,K),u[C]=K)}function ot(C){j.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),j.copy(C))}function ut(C){dt.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),dt.copy(C))}function Y(C,K){let $=c.get(K);$===void 0&&($=new WeakMap,c.set(K,$));let ct=$.get(C);ct===void 0&&(ct=i.getUniformBlockIndex(K,C.name),i.uniformBlockBinding(K,ct,ct),$.set(C,ct))}function Z(C,K,$){let rt=c.get(K).get(C);l[rt]!==$&&(i.bindBufferBase(i.UNIFORM_BUFFER,rt,$),l[rt]=$)}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},tt=null,et={},f={},l={},d=new WeakMap,p=[],x=null,m=!1,g=null,_=null,w=null,M=null,A=null,E=null,y=null,b=new Lt(0,0,0),I=0,R=!1,L=null,U=null,z=null,P=null,H=null,j.set(0,0,i.canvas.width,i.canvas.height),dt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:mt,disable:kt,bindFramebuffer:Me,drawBuffers:Ft,useProgram:ee,setBlending:Ge,setMaterial:Te,setFlipSided:rn,setCullFace:ye,setLineWidth:Gn,setPolygonOffset:Fe,setScissorTest:xn,activeTexture:vn,bindTexture:_n,unbindTexture:N,compressedTexImage2D:Sn,compressedTexImage3D:me,texImage2D:v,texImage3D:B,pixelStorei:Q,getParameter:it,updateUBOMapping:Y,uniformBlockBinding:Z,texStorage2D:zt,texStorage3D:T,texSubImage2D:ge,texSubImage3D:pt,compressedTexSubImage2D:Ae,compressedTexSubImage3D:Ut,scissor:ot,viewport:ut,reset:lt}}function q_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xt,h=new WeakMap,u=new Set,f,d=new WeakMap,p=new Set,x=new FinalizationRegistry(T=>p.delete(T)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return m?new OffscreenCanvas(T,v):qs("canvas")}function _(T,v,B){let it=1,Q=zt(T);if((Q.width>B||Q.height>B)&&(it=B/Math.max(Q.width,Q.height)),it<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let ot=Math.floor(it*Q.width),ut=Math.floor(it*Q.height);f===void 0&&(f=g(ot,ut));let Y=v?g(ot,ut):f;return Y.width=ot,Y.height=ut,Y.getContext("2d").drawImage(T,0,0,ot,ut),Ct("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ot+"x"+ut+")."),Y}else return"data"in T&&Ct("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function w(T){return T.generateMipmaps}function M(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,v,B,it,Q,ot=!1){if(T!==null){if(i[T]!==void 0)return i[T];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ut;it&&(ut=t.get("EXT_texture_norm16"),ut||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8),B===i.UNSIGNED_SHORT&&ut&&(Y=ut.R16_EXT),B===i.SHORT&&ut&&(Y=ut.R16_SNORM_EXT)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),v===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8),B===i.UNSIGNED_SHORT&&ut&&(Y=ut.RG16_EXT),B===i.SHORT&&ut&&(Y=ut.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),v===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),v===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),v===i.RGB&&(B===i.UNSIGNED_SHORT&&ut&&(Y=ut.RGB16_EXT),B===i.SHORT&&ut&&(Y=ut.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),v===i.RGBA){let Z=ot?Nr:Vt.getTransfer(Q);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=Z===ae?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ut&&(Y=ut.RGBA16_EXT),B===i.SHORT&&ut&&(Y=ut.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function y(T,v){let B;return T?v===null||v===On||v===gs?B=i.DEPTH24_STENCIL8:v===Tn?B=i.DEPTH32F_STENCIL8:v===ar&&(B=i.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===On||v===gs?B=i.DEPTH_COMPONENT24:v===Tn?B=i.DEPTH_COMPONENT32F:v===ar&&(B=i.DEPTH_COMPONENT16),B}function b(T,v){return w(T)===!0||T.isFramebufferTexture&&T.minFilter!==ke&&T.minFilter!==en?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function I(T){let v=new WeakRef(T);n.get(T).__ref=v,p.add(v),x.register(T,v,v)}function R(T){let v=n.get(T).__ref;v!==void 0&&(p.delete(v),x.unregister(v))}function L(T){z(T.target)}function U(T){P(T.target)}function z(T){T.removeEventListener("dispose",L),R(T),q(T),T.isVideoTexture&&h.delete(T),T.isHTMLTexture&&u.delete(T)}function P(T){T.removeEventListener("dispose",U),R(T),nt(T)}function H(){for(let T of p){let v=T.deref();v!==void 0&&(v.isRenderTarget===!0?P(v):z(v))}p.clear(),u.clear()}function q(T){let v=n.get(T);if(v.__webglInit===void 0)return;let B=T.source,it=d.get(B);if(it){let Q=it[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&G(T),Object.keys(it).length===0&&d.delete(B)}n.remove(T)}function G(T){let v=n.get(T);i.deleteTexture(v.__webglTexture);let B=T.source,it=d.get(B);delete it[v.__cacheKey],o.memory.textures--}function nt(T){let v=n.get(T);v.__depthDisposeCallback&&v.__depthDisposeCallback();let B=T.depthTexture;if(B&&B.renderTarget===T&&z(B),T.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(v.__webglFramebuffer[Q]))for(let ot=0;ot<v.__webglFramebuffer[Q].length;ot++)i.deleteFramebuffer(v.__webglFramebuffer[Q][ot]);else i.deleteFramebuffer(v.__webglFramebuffer[Q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Q])}else{if(Array.isArray(v.__webglFramebuffer))for(let Q=0;Q<v.__webglFramebuffer.length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[Q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Q=0;Q<v.__webglColorRenderbuffer.length;Q++)v.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let it=T.textures;for(let Q=0,ot=it.length;Q<ot;Q++){let ut=n.get(it[Q]);ut.__webglTexture&&(i.deleteTexture(ut.__webglTexture),o.memory.textures--),n.remove(it[Q])}n.remove(T)}let X=0;function tt(){X=0}function et(){return X}function _t(T){X=T}function Nt(){let T=X;return T>=s.maxTextures&&Ct("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,T}function j(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.mipmapsAutoUpdate),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function dt(T,v){let B=n.get(T);if(T.isVideoTexture&&Ae(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let it=T.image;if(it===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{Te(B,T,v);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function vt(T,v){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Te(B,T,v);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function It(T,v){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Te(B,T,v);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function mt(T,v){let B=n.get(T);if(T.version>0&&B.__version!==T.version){rn(B,T,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}let kt={[ns]:i.REPEAT,[dn]:i.CLAMP_TO_EDGE,[Ea]:i.MIRRORED_REPEAT},Me={[ke]:i.NEAREST,[cd]:i.NEAREST_MIPMAP_NEAREST,[uo]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[qa]:i.LINEAR_MIPMAP_NEAREST,[yi]:i.LINEAR_MIPMAP_LINEAR},Ft={[pd]:i.NEVER,[Mh]:i.ALWAYS,[md]:i.LESS,[_h]:i.LEQUAL,[gd]:i.EQUAL,[Sh]:i.GEQUAL,[yd]:i.GREATER,[xd]:i.NOTEQUAL};function ee(T,v){if(v.type===Tn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===en||v.magFilter===qa||v.magFilter===uo||v.magFilter===yi||v.minFilter===en||v.minFilter===qa||v.minFilter===uo||v.minFilter===yi)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,kt[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,kt[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,kt[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Me[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Me[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===ke||v.minFilter!==uo&&v.minFilter!==yi||v.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function re(T,v){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",L),I(v));let it=v.source,Q=d.get(it);Q===void 0&&(Q={},d.set(it,Q));let ot=j(v);if(ot!==T.__cacheKey){Q[ot]===void 0&&(Q[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[ot].usedTimes++;let ut=Q[T.__cacheKey];ut!==void 0&&(Q[T.__cacheKey].usedTimes--,ut.usedTimes===0&&G(v)),T.__cacheKey=ot,T.__webglTexture=Q[ot].texture}return B}function jt(T,v,B){return Math.floor(Math.floor(T/B)/v)}function Ge(T,v,B,it){let ot=T.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,B,it,v.data);else{ot.sort((C,K)=>C.start-K.start);let ut=0;for(let C=1;C<ot.length;C++){let K=ot[ut],$=ot[C],ct=K.start+K.count,rt=jt($.start,v.width,4),at=jt(K.start,v.width,4);$.start<=ct+1&&rt===at&&jt($.start+$.count-1,v.width,4)===rt?K.count=Math.max(K.count,$.start+$.count-K.start):(++ut,ot[ut]=$)}ot.length=ut+1;let Y=e.getParameter(i.UNPACK_ROW_LENGTH),Z=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let C=0,K=ot.length;C<K;C++){let $=ot[C],ct=Math.floor($.start/4),rt=Math.ceil($.count/4),at=ct%v.width,Rt=Math.floor(ct/v.width),qt=rt,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,at),e.pixelStorei(i.UNPACK_SKIP_ROWS,Rt),e.texSubImage2D(i.TEXTURE_2D,0,at,Rt,qt,st,B,it,v.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Y),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function Te(T,v,B){let it=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(it=i.TEXTURE_3D);let Q=re(T,v),ot=v.source;e.bindTexture(it,T.__webglTexture,i.TEXTURE0+B);let ut=n.get(ot);if(ot.version!==ut.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let st=Vt.getPrimaries(Vt.workingColorSpace),Dt=v.colorSpace===vi?null:Vt.getPrimaries(v.colorSpace),Wt=v.colorSpace===vi||st===Dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt)}e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let Z=_(v.image,!1,s.maxTextureSize);Z=Ut(v,Z);let lt=r.convert(v.format,v.colorSpace),C=r.convert(v.type),K=E(v.internalFormat,lt,C,v.normalized,v.colorSpace,v.isVideoTexture);ee(it,v);let $,ct=v.mipmaps,rt=v.isVideoTexture!==!0,at=ut.__version===void 0||Q===!0,Rt=ot.dataReady,qt=b(v,Z);if(v.isDepthTexture)K=y(v.format===xi,v.type),at&&(rt?e.texStorage2D(i.TEXTURE_2D,1,K,Z.width,Z.height):e.texImage2D(i.TEXTURE_2D,0,K,Z.width,Z.height,0,lt,C,null));else if(v.isDataTexture)if(ct.length>0){rt&&at&&e.texStorage2D(i.TEXTURE_2D,qt,K,ct[0].width,ct[0].height);for(let st=0,Dt=ct.length;st<Dt;st++)$=ct[st],rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,$.width,$.height,lt,C,$.data):e.texImage2D(i.TEXTURE_2D,st,K,$.width,$.height,0,lt,C,$.data);v.generateMipmaps=!1}else rt?(at&&e.texStorage2D(i.TEXTURE_2D,qt,K,Z.width,Z.height),Rt&&Ge(v,Z,lt,C)):e.texImage2D(i.TEXTURE_2D,0,K,Z.width,Z.height,0,lt,C,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){rt&&at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,qt,K,ct[0].width,ct[0].height,Z.depth);for(let st=0,Dt=ct.length;st<Dt;st++)if($=ct[st],v.format!==An)if(lt!==null)if(rt){if(Rt)if(v.layerUpdates.size>0){let Wt=Ph($.width,$.height,v.format,v.type);for(let gt of v.layerUpdates){let le=$.data.subarray(gt*Wt/$.data.BYTES_PER_ELEMENT,(gt+1)*Wt/$.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,gt,$.width,$.height,1,lt,le)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,$.width,$.height,Z.depth,lt,$.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,K,$.width,$.height,Z.depth,0,$.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?Rt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,$.width,$.height,Z.depth,lt,C,$.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,K,$.width,$.height,Z.depth,0,lt,C,$.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{rt&&at&&e.texStorage2D(i.TEXTURE_2D,qt,K,ct[0].width,ct[0].height);for(let st=0,Dt=ct.length;st<Dt;st++)$=ct[st],v.format!==An?lt!==null?rt?Rt&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,$.width,$.height,lt,$.data):e.compressedTexImage2D(i.TEXTURE_2D,st,K,$.width,$.height,0,$.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,$.width,$.height,lt,C,$.data):e.texImage2D(i.TEXTURE_2D,st,K,$.width,$.height,0,lt,C,$.data)}else if(v.isDataArrayTexture)if(rt){if(at&&e.texStorage3D(i.TEXTURE_2D_ARRAY,qt,K,Z.width,Z.height,Z.depth),Rt)if(v.layerUpdates.size>0){let st=Ph(Z.width,Z.height,v.format,v.type);for(let Dt of v.layerUpdates){let Wt=Z.data.subarray(Dt*st/Z.data.BYTES_PER_ELEMENT,(Dt+1)*st/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Dt,Z.width,Z.height,1,lt,C,Wt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,lt,C,Z.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,K,Z.width,Z.height,Z.depth,0,lt,C,Z.data);else if(v.isData3DTexture)rt?(at&&e.texStorage3D(i.TEXTURE_3D,qt,K,Z.width,Z.height,Z.depth),Rt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,lt,C,Z.data)):e.texImage3D(i.TEXTURE_3D,0,K,Z.width,Z.height,Z.depth,0,lt,C,Z.data);else if(v.isFramebufferTexture){if(at)if(rt)e.texStorage2D(i.TEXTURE_2D,qt,K,Z.width,Z.height);else{let st=Z.width,Dt=Z.height;for(let Wt=0;Wt<qt;Wt++)e.texImage2D(i.TEXTURE_2D,Wt,K,st,Dt,0,lt,C,null),st>>=1,Dt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),Z.parentNode!==st){st.appendChild(Z),u.add(v),st.onpaint=Dt=>{let Wt=Dt.changedElements;for(let gt of u)Wt.includes(gt.image)&&(gt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Z);else{let Wt=i.RGBA,gt=i.RGBA,le=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Wt,gt,le,Z)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ct.length>0){if(rt&&at){let st=zt(ct[0]);e.texStorage2D(i.TEXTURE_2D,qt,K,st.width,st.height)}for(let st=0,Dt=ct.length;st<Dt;st++)$=ct[st],rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,lt,C,$):e.texImage2D(i.TEXTURE_2D,st,K,lt,C,$);v.generateMipmaps=!1}else if(rt){if(at){let st=zt(Z);e.texStorage2D(i.TEXTURE_2D,qt,K,st.width,st.height)}Rt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,C,Z)}else e.texImage2D(i.TEXTURE_2D,0,K,lt,C,Z);w(v)&&v.mipmapsAutoUpdate===!0&&M(it),ut.__version=ot.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function rn(T,v,B){if(v.image.length!==6)return;let it=re(T,v),Q=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let ot=n.get(Q);if(Q.version!==ot.__version||it===!0){e.activeTexture(i.TEXTURE0+B);let ut=Vt.getPrimaries(Vt.workingColorSpace),Y=v.colorSpace===vi?null:Vt.getPrimaries(v.colorSpace),Z=v.colorSpace===vi||ut===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let lt=v.isCompressedTexture||v.image[0].isCompressedTexture,C=v.image[0]&&v.image[0].isDataTexture,K=[];for(let gt=0;gt<6;gt++)!lt&&!C?K[gt]=_(v.image[gt],!0,s.maxCubemapSize):K[gt]=C?v.image[gt].image:v.image[gt],K[gt]=Ut(v,K[gt]);let $=K[0],ct=r.convert(v.format,v.colorSpace),rt=r.convert(v.type),at=E(v.internalFormat,ct,rt,v.normalized,v.colorSpace),Rt=v.isVideoTexture!==!0,qt=ot.__version===void 0||it===!0,st=Q.dataReady,Dt=b(v,$);ee(i.TEXTURE_CUBE_MAP,v);let Wt;if(v.isDepthTexture){if(at=y(v.format===xi,v.type),qt)if(Rt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,at,$.width,$.height);else for(let gt=0;gt<6;gt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,at,$.width,$.height,0,ct,rt,null)}else if(lt){Rt&&qt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Dt,at,$.width,$.height);for(let gt=0;gt<6;gt++){Wt=K[gt].mipmaps;for(let le=0;le<Wt.length;le++){let Ne=Wt[le];v.format!==An?ct!==null?Rt?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,0,0,Ne.width,Ne.height,ct,Ne.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,at,Ne.width,Ne.height,0,Ne.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,0,0,Ne.width,Ne.height,ct,rt,Ne.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le,at,Ne.width,Ne.height,0,ct,rt,Ne.data)}}}else{if(Wt=v.mipmaps,Rt&&qt){Wt.length>0&&Dt++;let gt=zt(K[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Dt,at,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(C){Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,K[gt].width,K[gt].height,ct,rt,K[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,at,K[gt].width,K[gt].height,0,ct,rt,K[gt].data);for(let le=0;le<Wt.length;le++){let bi=Wt[le].image[gt].image;Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,0,0,bi.width,bi.height,ct,rt,bi.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,at,bi.width,bi.height,0,ct,rt,bi.data)}}else{Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,ct,rt,K[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,at,ct,rt,K[gt]);for(let le=0;le<Wt.length;le++){let Ne=Wt[le];Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,0,0,ct,rt,Ne.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,le+1,at,ct,rt,Ne.image[gt])}}}w(v)&&v.mipmapsAutoUpdate===!0&&M(i.TEXTURE_CUBE_MAP),ot.__version=Q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ye(T,v,B,it,Q,ot){let ut=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),Z=E(B.internalFormat,ut,Y,B.normalized,B.colorSpace),lt=n.get(v),C=n.get(B);if(C.__renderTarget=v,!lt.__hasExternalTextures){let K=Math.max(1,v.width>>ot),$=Math.max(1,v.height>>ot);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,ot,Z,K,$,v.depth,0,ut,Y,null):e.texImage2D(Q,ot,Z,K,$,0,ut,Y,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),pt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,Q,C.__webglTexture,0,ge(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,Q,C.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gn(T,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){let it=v.depthTexture,Q=it&&it.isDepthTexture?it.type:null,ot=y(v.stencilBuffer,Q),ut=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(v),ot,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(v),ot,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ot,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,T)}else{let it=v.textures;for(let Q=0;Q<it.length;Q++){let ot=it[Q],ut=r.convert(ot.format,ot.colorSpace),Y=r.convert(ot.type),Z=E(ot.internalFormat,ut,Y,ot.normalized,ot.colorSpace);pt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(v),Z,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(v),Z,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Z,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(T,v,B){let it=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(v.depthTexture);Q.__renderTarget=v;let ot=it?v.depthTexture.image[0]:v.depthTexture.image;(!Q.__webglTexture||ot.width!==v.width||ot.height!==v.height)&&(ot.width=v.width,ot.height=v.height,v.depthTexture.needsUpdate=!0),it?mt(v.depthTexture,0):dt(v.depthTexture,0);let ut=Q.__webglTexture,Y=ge(v),Z=it?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,lt=v.depthTexture.format===xi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===ui)pt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,Z,ut,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,lt,Z,ut,0);else if(v.depthTexture.format===xi)pt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,Z,ut,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,lt,Z,ut,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function xn(T){let v=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let it=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),it){let Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,it.removeEventListener("dispose",Q)};it.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=it}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let it=0;it<6;it++)Fe(v.__webglFramebuffer[it],T,it);else T.texture.mipmaps.length>0?Fe(v.__webglFramebuffer[0],T,0):Fe(v.__webglFramebuffer,T,0);else if(B){v.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[it]),v.__webglDepthbuffer[it]===void 0)v.__webglDepthbuffer[it]=i.createRenderbuffer(),Gn(v.__webglDepthbuffer[it],T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=v.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ot)}}else if(T.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Gn(v.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ot)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function vn(T,v,B){let it=n.get(T);v!==void 0&&ye(it.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&xn(T)}function _n(T){let v=T.texture,B=n.get(T),it=n.get(v);T.addEventListener("dispose",U),I(T);let Q=T.textures,ot=T.isWebGLCubeRenderTarget===!0,ut=Q.length>1;if(ut||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=v.version,o.memory.textures++),ot){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let Z=0;Z<v.mipmaps.length;Z++)B.__webglFramebuffer[Y][Z]=i.createFramebuffer()}else B.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(v.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)B.__webglFramebuffer[Y]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ut)for(let Y=0,Z=Q.length;Y<Z;Y++){let lt=n.get(Q[Y]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&pt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<Q.length;Y++){let Z=Q[Y];B.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let lt=r.convert(Z.format,Z.colorSpace),C=r.convert(Z.type),K=E(Z.internalFormat,lt,C,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),$=ge(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,$,K,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Gn(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),ee(i.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)ye(B.__webglFramebuffer[Y][Z],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else ye(B.__webglFramebuffer[Y],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);w(v)?M(i.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}else if(ut){for(let Y=0,Z=Q.length;Y<Z;Y++){let lt=Q[Y],C=n.get(lt),K=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(K=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,C.__webglTexture),ee(K,lt),ye(B.__webglFramebuffer,T,lt,i.COLOR_ATTACHMENT0+Y,K,0),w(lt)&&M(K)}e.unbindTexture()}else{let Y=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Y=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Y,it.__webglTexture),ee(Y,v),v.mipmaps.length>0)for(let Z=0;Z<v.mipmaps.length;Z++)ye(B.__webglFramebuffer[Z],T,v,i.COLOR_ATTACHMENT0,Y,Z);else ye(B.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,Y,0);w(v)?M(Y):v.mipmaps.length>0&&i.texParameteri(Y,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}T.depthBuffer&&xn(T)}function N(T){let v=T.textures;for(let B=0,it=v.length;B<it;B++){let Q=v[B];if(w(Q)&&Q.mipmapsAutoUpdate===!0){let ot=A(T),ut=n.get(Q).__webglTexture;e.bindTexture(ot,ut),M(ot),e.unbindTexture()}}}let Sn=[];function me(T){if(T.samples>0){if(pt(T)===!1){let v=T.textures,B=T.width,it=T.height,Q=i.COLOR_BUFFER_BIT,ot=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=n.get(T),Y=v.length>1;if(Y)for(let lt=0;lt<v.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let lt=0;lt<v.length;lt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ut.__webglColorRenderbuffer[lt]);let C=n.get(v[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,B,it,0,0,B,it,Q,i.NEAREST),l===!0&&(Sn.length=0,Sn.push(i.COLOR_ATTACHMENT0+lt),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Sn.push(ot),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Sn))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let lt=0;lt<v.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,ut.__webglColorRenderbuffer[lt]);let C=n.get(v[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,C,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ge(T){return Math.min(s.maxSamples,T.samples)}function pt(T){let v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ae(T){let v=o.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Ut(T,v){let B=T.colorSpace,it=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Fr&&B!==vi&&(Vt.getTransfer(B)===ae?(it!==An||Q!==ln)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Bt("WebGLTextures: Unsupported texture color space:",B)),v}function zt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=Nt,this.resetTextureUnits=tt,this.getTextureUnits=et,this.setTextureUnits=_t,this.setTexture2D=dt,this.setTexture2DArray=vt,this.setTexture3D=It,this.setTextureCube=mt,this.rebindTextures=vn,this.setupRenderTarget=_n,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=xn,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=pt,this.dispose=H}function $_(i,t){function e(n,s=vi){let r,o=Vt.getTransfer(s);if(n===ln)return i.UNSIGNED_BYTE;if(n===Ya)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ja)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===dh)return i.BYTE;if(n===ph)return i.SHORT;if(n===ar)return i.UNSIGNED_SHORT;if(n===$a)return i.INT;if(n===On)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===Bn)return i.HALF_FLOAT;if(n===yh)return i.ALPHA;if(n===xh)return i.RGB;if(n===An)return i.RGBA;if(n===ui)return i.DEPTH_COMPONENT;if(n===xi)return i.DEPTH_STENCIL;if(n===vh)return i.RED;if(n===ja)return i.RED_INTEGER;if(n===Gi)return i.RG;if(n===Za)return i.RG_INTEGER;if(n===Ka)return i.RGBA_INTEGER;if(n===fo||n===po||n===mo||n===go)if(o===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===go)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qa||n===tl||n===el||n===nl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===il||n===sl||n===rl||n===ol||n===al||n===yo||n===ll)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===il||n===sl)return o===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===rl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ol)return r.COMPRESSED_R11_EAC;if(n===al)return r.COMPRESSED_SIGNED_R11_EAC;if(n===yo)return r.COMPRESSED_RG11_EAC;if(n===ll)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===cl||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===yl||n===xl||n===vl||n===_l||n===Sl||n===Ml)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===cl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ul)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ml)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_l)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ml)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bl||n===wl||n===El)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===bl)return o===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===El)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tl||n===Al||n===xo||n===Rl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Tl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Y_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,J_=`
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

}`,Xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Xr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Yn({vertexShader:Y_,fragmentShader:J_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new pi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qh=class extends $n{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,p=null,x=typeof XRWebGLBinding<"u",m=new Xh,g={},_=e.getContextAttributes(),w=null,M=null,A=[],E=[],y=new Xt,b=null,I=null,R=new Re;R.viewport=new Jt;let L=new Re;L.viewport=new Jt;let U=[R,L],z=new Ha,P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let dt=A[j];return dt===void 0&&(dt=new Js,A[j]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(j){let dt=A[j];return dt===void 0&&(dt=new Js,A[j]=dt),dt.getGripSpace()},this.getHand=function(j){let dt=A[j];return dt===void 0&&(dt=new Js,A[j]=dt),dt.getHandSpace()};function q(j){let dt=E.indexOf(j.inputSource);if(dt===-1)return;let vt=A[dt];vt!==void 0&&(vt.update(j.inputSource,j.frame,c||o),vt.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",nt);for(let j=0;j<A.length;j++){let dt=E[j];dt!==null&&(E[j]=null,A[j].disconnect(dt))}P=null,H=null,m.reset();for(let j in g)delete g[j];if(t.setRenderTarget(w),d=null,f=null,u=null,s=null,M=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(y.width,y.height,!1),I!==null){let j=I.camera;j.fov=I.fov,j.zoom=I.zoom,j.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",G),s.addEventListener("inputsourceschange",nt),_.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,It=null,mt=null;_.depth&&(mt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=_.stencil?xi:ui,It=_.stencil?gs:On);let kt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(kt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new pn(f.textureWidth,f.textureHeight,{format:An,type:ln,depthTexture:new di(f.textureWidth,f.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let vt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new pn(d.framebufferWidth,d.framebufferHeight,{format:An,type:ln,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Nt.setContext(s),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(j){for(let dt=0;dt<j.removed.length;dt++){let vt=j.removed[dt],It=E.indexOf(vt);It>=0&&(E[It]=null,A[It].disconnect(vt))}for(let dt=0;dt<j.added.length;dt++){let vt=j.added[dt],It=E.indexOf(vt);if(It===-1){for(let kt=0;kt<A.length;kt++)if(kt>=E.length){E.push(vt),It=kt;break}else if(E[kt]===null){E[kt]=vt,It=kt;break}if(It===-1)break}let mt=A[It];mt&&mt.connect(vt)}}function X(j,dt){dt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(dt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let dt=j.near,vt=j.far;m.texture!==null&&(m.depthNear>0&&(dt=m.depthNear),m.depthFar>0&&(vt=m.depthFar)),z.near=L.near=R.near=dt,z.far=L.far=R.far=vt,(P!==z.near||H!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),P=z.near,H=z.far),z.layers.mask=j.layers.mask|6,R.layers.mask=z.layers.mask&-5,L.layers.mask=z.layers.mask&-3;let It=j.parent,mt=z.cameras;X(z,It);for(let kt=0;kt<mt.length;kt++)X(mt[kt],It);z.projectionMatrix.copy(R.projectionMatrix),z.projectionMatrixInverse.copy(R.projectionMatrixInverse),I===null&&j.isPerspectiveCamera&&(I={camera:j,fov:j.fov,zoom:j.zoom}),tt(j,z,It)};function tt(j,dt,vt){vt===null?j.matrix.copy(dt.matrixWorld):(j.matrix.copy(vt.matrixWorld),j.matrix.invert(),j.matrix.multiply(dt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(dt.projectionMatrix),j.projectionMatrixInverse.copy(dt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=is*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(j){return g[j]};let et=null;function _t(j,dt){if(h=dt.getViewerPose(c||o),p=dt,h!==null){let vt=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let It=!1;vt.length!==z.cameras.length&&(z.cameras.length=0,It=!0);for(let Ft=0;Ft<vt.length;Ft++){let ee=vt[Ft],re=null;if(d!==null)re=d.getViewport(ee);else{let Ge=u.getViewSubImage(f,ee);re=Ge.viewport,Ft===0&&(t.setRenderTargetTextures(M,Ge.colorTexture,Ge.depthStencilTexture),t.setRenderTarget(M))}let jt=U[Ft];jt===void 0&&(jt=new Re,jt.layers.enable(Ft),jt.viewport=new Jt,U[Ft]=jt),jt.matrix.fromArray(ee.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(ee.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(re.x,re.y,re.width,re.height),Ft===0&&(z.matrix.copy(jt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),It===!0&&z.cameras.push(jt)}let mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let Ft=u.getDepthInformation(vt[0]);Ft&&Ft.isValid&&Ft.texture&&m.init(Ft,s.renderState)}if(mt&&mt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let Ft=0;Ft<vt.length;Ft++){let ee=vt[Ft].camera;if(ee){let re=g[ee];re||(re=new Xr,g[ee]=re);let jt=u.getCameraImage(ee);re.sourceTexture=jt}}}}for(let vt=0;vt<A.length;vt++){let It=E[vt],mt=A[vt];It!==null&&mt!==void 0&&mt.update(It,dt,c||o)}et&&et(j,dt),dt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:dt}),p=null}let Nt=new ep;Nt.setAnimationLoop(_t),this.setAnimationLoop=function(j){et=j},this.dispose=function(){}}},j_=new wt,up=new Ot;up.set(-1,0,0,0,1,0,0,0,1);function Z_(i,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Rh(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,_,w,M){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,M)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,_,w):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===sn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===sn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let _=t.get(g),w=_.envMap,M=_.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(j_.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(up),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,_,w){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*_,m.scale.value=w*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,_){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===sn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let _=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function K_(i,t,e,n){let s={},r={};function o(_,w){let M=w.program;n.uniformBlockBinding(_,M,s[_.id])}function a(_,w){let M=s[_.id];M===void 0&&(p(_),M=l(_),s[_.id]=M,_.addEventListener("dispose",m));let A=w.program;n.updateUBOMapping(_,A);let E=t.render.frame;r[_.id]!==E&&(c(_),r[_.id]=E)}function l(_){let w=i.createBuffer(),M=_.__size,A=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,M,A),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(_){let w=s[_.id],M=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let E=0,y=M.length;E<y;E++){let b=M[E];if(Array.isArray(b))for(let I=0,R=b.length;I<R;I++)h(b[I],E,I,A);else h(b,E,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(_,w,M,A){if(f(_,w,M,A)===!0){let E=_.__offset,y=_.value;if(Array.isArray(y)){let b=0;for(let I=0;I<y.length;I++){let R=y[I],L=x(R,!0);u(R,_.__data,b),b+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else u(y,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,_.__data)}}function u(_,w,M){typeof _=="number"||typeof _=="boolean"?w[M]=_:_.isMatrix3?(w[M]=_.elements[0],w[M+1]=_.elements[1],w[M+2]=_.elements[2],w[M+3]=0,w[M+4]=_.elements[3],w[M+5]=_.elements[4],w[M+6]=_.elements[5],w[M+7]=0,w[M+8]=_.elements[6],w[M+9]=_.elements[7],w[M+10]=_.elements[8],w[M+11]=0):ArrayBuffer.isView(_)?w.set(_.subarray(0,w.length-M),M):_.toArray(w,M)}function f(_,w,M,A){let E=_.value,y=w+"_"+M;if(Array.isArray(E)){A[y]===void 0&&(A[y]=[]);let b=A[y],I=!1;for(let R=0;R<E.length;R++)d(E[R],b,R)===!0&&(I=!0);return I}return d(E,A,y)}function d(_,w,M){if(w[M]===void 0)return typeof _=="number"||typeof _=="boolean"?w[M]=_:ArrayBuffer.isView(_)?w[M]=_.slice():w[M]=_.clone(),!0;{let A=w[M];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return w[M]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(A.equals(_)===!1)return A.copy(_),!0}}return!1}function p(_){let w=_.uniforms,M=0,A=16;for(let y=0,b=w.length;y<b;y++){let I=Array.isArray(w[y])?w[y]:[w[y]];for(let R=0,L=I.length;R<L;R++){let U=I[R],z=Array.isArray(U.value)?U.value:[U.value],P=Array.isArray(w[y])||Array.isArray(U.value),H=M;for(let G=0,nt=z.length;G<nt;G++){let X=z[G],tt=x(X,P),et=M%A,_t=et%tt.boundary,Nt=et+_t;M+=_t,Nt!==0&&A-Nt<tt.storage&&(M+=A-Nt),G===0&&(H=M),M+=tt.storage}let q=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new q((M-H)/Float32Array.BYTES_PER_ELEMENT),U.__offset=H}}let E=M%A;return E>0&&(M+=A-E),_.__size=M,_.__cache={},this}function x(_,w){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=16,M.storage=48):_.isMatrix4?(M.boundary=16,M.storage=64):_.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",_),w===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function m(_){let w=_.target;w.removeEventListener("dispose",m),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function g(){for(let _ in s)i.deleteBuffer(s[_]);s={},r={}}return{bind:o,update:a,dispose:g}}var Q_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zn=null;function tS(){return Zn===null&&(Zn=new Vr(Q_,16,16,Gi,Bn),Zn.name="DFG_LUT",Zn.minFilter=en,Zn.magFilter=en,Zn.wrapS=dn,Zn.wrapT=dn,Zn.generateMipmaps=!1,Zn.needsUpdate=!0),Zn}var Ll=class{constructor(t={}){let{canvas:e=_d(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=ln}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let x=d,m=new Set([Ka,Za,ja]),g=new Set([ln,On,ar,gs,Ya,Ja]),_=new Uint32Array(4),w=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},A=null,E=null,y=[],b=[],I=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,U=null,z=null,P=null,H=null;this._outputColorSpace=ie;let q=0,G=0,nt=null,X=-1,tt=null,et=new Jt,_t=new Jt,Nt=null,j=new Lt(0),dt=0,vt=e.width,It=e.height,mt=1,kt=null,Me=null,Ft=new Jt(0,0,vt,It),ee=new Jt(0,0,vt,It),re=!1,jt=new Di,Ge=new Ia,Te=!1,rn=!1,ye=new wt,Gn=new F,Fe=new Jt,xn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},vn=!1;function _n(){return nt===null?mt:1}let N=n;function Sn(S,D){return e.getContext(S,D)}let me,ge,pt,Ae,Ut,zt,T,v,B,it,Q,ot,ut,Y,Z,lt,C,K,$,ct,rt,at,Rt;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Dt,!1),e.addEventListener("webglcontextrestored",Wt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),N===null){let D="webgl2";if(N=Sn(D,S),N===null)throw Sn(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qt()}catch(S){throw e.removeEventListener("webglcontextlost",Dt,!1),e.removeEventListener("webglcontextrestored",Wt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Bt("WebGLRenderer: "+S.message),S}function qt(){me=new uv(N),me.init(),rt=new $_(N,me),ge=new tv(N,me,t,rt),pt=new X_(N,me),ge.reversedDepthBuffer&&f&&pt.buffers.depth.setReversed(!0),z=N.createFramebuffer(),P=N.createFramebuffer(),H=N.createFramebuffer(),Ae=new pv(N),Ut=new P_,zt=new q_(N,me,pt,Ut,ge,rt,Ae),T=new hv(R),v=new g0(N),at=new Kx(N,v),B=new fv(N,v,Ae,at),it=new gv(N,B,v,at,Ae),K=new mv(N,ge,zt),Z=new ev(Ut),Q=new I_(R,T,me,ge,at,Z),ot=new Z_(R,Ut),ut=new D_,Y=new k_(me),C=new Zx(R,T,pt,it,p,l),lt=new W_(R,it,ge),Rt=new K_(N,Ae,ge,pt),$=new Qx(N,me,Ae),ct=new dv(N,me,Ae),Ae.programs=Q.programs,R.capabilities=ge,R.extensions=me,R.properties=Ut,R.renderLists=ut,R.shadowMap=lt,R.state=pt,R.info=Ae}x!==ln&&(I=new xv(x,e.width,e.height,a,s,r));let st=new qh(R,N);this.xr=st,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let S=me.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=me.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(S){S!==void 0&&(mt=S,this.setSize(vt,It,!1))},this.getSize=function(S){return S.set(vt,It)},this.setSize=function(S,D,V=!0){if(st.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}vt=S,It=D,e.width=Math.floor(S*mt),e.height=Math.floor(D*mt),V===!0&&(e.style.width=S+"px",e.style.height=D+"px"),I!==null&&I.setSize(e.width,e.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(vt*mt,It*mt).floor()},this.setDrawingBufferSize=function(S,D,V){vt=S,It=D,mt=V,e.width=Math.floor(S*V),e.height=Math.floor(D*V),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(x===ln){Bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){Ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(et)},this.getViewport=function(S){return S.copy(Ft)},this.setViewport=function(S,D,V,O){S.isVector4?Ft.set(S.x,S.y,S.z,S.w):Ft.set(S,D,V,O),pt.viewport(et.copy(Ft).multiplyScalar(_n()).round())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,D,V,O){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,D,V,O),pt.scissor(_t.copy(ee).multiplyScalar(_n()).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(S){pt.setScissorTest(re=S)},this.setOpaqueSort=function(S){kt=S},this.setTransparentSort=function(S){Me=S},this.getClearColor=function(S){return S.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,V=!0){let O=0;if(S){let k=!1;if(nt!==null){let ft=nt.texture.format;k=m.has(ft)}if(k){let ft=nt.texture.type,St=g.has(ft),ht=C.getClearColor(),xt=C.getClearAlpha(),Et=ht.r,Gt=ht.g,Zt=ht.b;St?(_[0]=Et,_[1]=Gt,_[2]=Zt,_[3]=xt,N.clearBufferuiv(N.COLOR,0,_)):(w[0]=Et,w[1]=Gt,w[2]=Zt,w[3]=xt,N.clearBufferiv(N.COLOR,0,w))}else O|=N.COLOR_BUFFER_BIT}D&&(O|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(O|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&N.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){e.removeEventListener("webglcontextlost",Dt,!1),e.removeEventListener("webglcontextrestored",Wt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),C.dispose(),ut.dispose(),Y.dispose(),zt.dispose(),Ut.dispose(),T.dispose(),it.dispose(),B.dispose(),at.dispose(),Rt.dispose(),Q.dispose(),st.dispose(),st.removeEventListener("sessionstart",wu),st.removeEventListener("sessionend",Eu),$i.stop()};function Dt(S){S.preventDefault(),wh("WebGLRenderer: Context Lost."),L=!0}function Wt(){wh("WebGLRenderer: Context Restored."),L=!1;let S=Ae.autoReset,D=lt.enabled,V=lt.autoUpdate,O=lt.needsUpdate,k=lt.type;qt(),Ae.autoReset=S,lt.enabled=D,lt.autoUpdate=V,lt.needsUpdate=O,lt.type=k}function gt(S){Bt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function le(S){let D=S.target;D.removeEventListener("dispose",le),Ne(D)}function Ne(S){bi(S),Ut.remove(S)}function bi(S){let D=Ut.get(S).programs;D!==void 0&&(D.forEach(function(V){Q.releaseProgram(V)}),S.isShaderMaterial&&Q.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,V,O,k,ft){D===null&&(D=xn);let St=k.isMesh&&k.matrixWorld.determinantAffine()<0,ht=am(S,D,V,O,k);pt.setMaterial(O,St);let xt=V.index,Et=1;if(O.wireframe===!0){if(xt=B.getWireframeAttribute(V),xt===void 0)return;Et=2}let Gt=V.drawRange,Zt=V.attributes.position,Mt=Gt.start*Et,Kt=(Gt.start+Gt.count)*Et;ft!==null&&(Mt=Math.max(Mt,ft.start*Et),Kt=Math.min(Kt,(ft.start+ft.count)*Et)),xt!==null?(Mt=Math.max(Mt,0),Kt=Math.min(Kt,xt.count)):Zt!=null&&(Mt=Math.max(Mt,0),Kt=Math.min(Kt,Zt.count));let we=Kt-Mt;if(we<0||we===1/0)return;at.setup(k,O,ht,V,xt);let de,fe=$;if(xt!==null&&(de=v.get(xt),fe=ct,fe.setIndex(de)),k.isMesh)O.wireframe===!0?(pt.setLineWidth(O.wireframeLinewidth*_n()),fe.setMode(N.LINES)):fe.setMode(N.TRIANGLES);else if(k.isLine){let qe=O.linewidth;qe===void 0&&(qe=1),pt.setLineWidth(qe*_n()),k.isLineSegments?fe.setMode(N.LINES):k.isLineLoop?fe.setMode(N.LINE_LOOP):fe.setMode(N.LINE_STRIP)}else k.isPoints?fe.setMode(N.POINTS):k.isSprite&&fe.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(me.get("WEBGL_multi_draw"))fe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let qe=k._multiDrawStarts,bt=k._multiDrawCounts,Qe=k._multiDrawCount,ne=xt?v.get(xt).bytesPerElement:1,Yi=Ut.get(O).currentProgram.getUniforms();for(let $e=0;$e<Qe;$e++)Yi.setValue(N,"_gl_DrawID",$e),fe.render(qe[$e]/ne,bt[$e])}else if(k.isInstancedMesh)fe.renderInstances(Mt,we,k.count);else if(V.isInstancedBufferGeometry){let qe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,bt=Math.min(V.instanceCount,qe);fe.renderInstances(Mt,we,bt)}else fe.render(Mt,we)};function bu(S,D,V,O){U!==null&&S.isNodeMaterial&&U.setObject(O,S),Te===!0&&Z.setState(S,V,!1),S.transparent===!0&&S.side===En&&S.forceSinglePass===!1?(S.side=sn,S.needsUpdate=!0,_r(S,D,O),S.side=Vi,S.needsUpdate=!0,_r(S,D,O),S.side=En):_r(S,D,O)}this.compile=function(S,D,V=null){V===null&&(V=S),U!==null&&U.renderStart(S,D,V),E=Y.get(V),E.init(D),b.push(E),V.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),S!==V&&S.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),E.setupLights(),U!==null&&U.updateLights(E.state.lightsArray),rn=this.localClippingEnabled,Te=Z.init(this.clippingPlanes,rn),Te===!0&&Z.setGlobalState(this.clippingPlanes,D),U!==null&&lt.render(E.state.shadowsArray,V,D);let O=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let St=0;St<ft.length;St++){let ht=ft[St];bu(ht,V,D,k),O.add(ht)}else bu(ft,V,D,k),O.add(ft)}),E=b.pop(),U!==null&&U.renderEnd(),O},this.compileAsync=function(S,D,V=null){let O=this.compile(S,D,V);return new Promise(k=>{function ft(){if(O.forEach(function(St){let xt=Ut.get(St).currentProgram;(xt===void 0||xt.isReady())&&O.delete(St)}),O.size===0){k(S);return}setTimeout(ft,10)}me.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let nc=null;function rm(S){nc&&nc(S)}function wu(){$i.stop()}function Eu(){$i.start()}let $i=new ep;$i.setAnimationLoop(rm),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(S){nc=S,st.setAnimationLoop(S),S===null?$i.stop():$i.start()},st.addEventListener("sessionstart",wu),st.addEventListener("sessionend",Eu),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){Bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;U!==null&&U.renderStart(S,D);let V=st.enabled===!0&&st.isPresenting===!0,O=I!==null&&(nt===null||V)&&I.begin(R,nt);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(D),D=st.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,D,nt),E=Y.get(S,b.length),E.init(D),E.state.textureUnits=zt.getTextureUnits(),b.push(E),ye.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?Ge.setFromArrayCamera(D):jt.setFromProjectionMatrix(ye,wn,D.reversedDepth),rn=this.localClippingEnabled,Te=Z.init(this.clippingPlanes,rn),A=ut.get(S,y.length),A.init(),y.push(A),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){let St=R.xr.getDepthSensingMesh();St!==null&&ic(St,D,-1/0,R.sortObjects)}ic(S,D,0,R.sortObjects),A.finish(),U!==null&&U.updateLights(E.state.lightsArray),R.sortObjects===!0&&A.sort(kt,Me),vn=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,vn&&C.addToRenderList(A,S),this.info.autoReset===!0&&this.info.reset(),Te===!0&&Z.beginShadows();let k=E.state.shadowsArray;if(lt.render(k,S,D),Te===!0&&Z.endShadows(),(O&&I.hasRenderPass())===!1){let St=A.opaque,ht=A.transmissive;if(E.setupLights(),D.isArrayCamera){let xt=D.cameras;if(ht.length>0)for(let Et=0,Gt=xt.length;Et<Gt;Et++){let Zt=xt[Et];Au(St,ht,S,Zt)}vn&&C.render(S);for(let Et=0,Gt=xt.length;Et<Gt;Et++){let Zt=xt[Et];Tu(A,S,Zt,Zt.viewport)}}else ht.length>0&&Au(St,ht,S,D),vn&&C.render(S),Tu(A,S,D)}nt!==null&&G===0&&(zt.updateMultisampleRenderTarget(nt),zt.updateRenderTargetMipmap(nt)),O&&I.end(R),S.isScene===!0&&S.onAfterRender(R,S,D),at.resetDefaultState(),X=-1,tt=null,b.pop(),b.length>0?(E=b[b.length-1],zt.setTextureUnits(E.state.textureUnits),Te===!0&&Z.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,y.pop(),y.length>0?A=y[y.length-1]:A=null,U!==null&&U.renderEnd()};function ic(S,D,V,O){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){let St=D.isArrayCamera?Ge:jt;if(!S.frustumCulled||S.intersectsFrustum(St)){O&&Fe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ye);let ht=it.update(S),xt=S.material;xt.visible&&A.push(S,ht,xt,V,Fe.z,null,D)}}else if(S.isMesh||S.isLine||S.isPoints){let St=D.isArrayCamera?Ge:jt;if(!S.frustumCulled||S.intersectsFrustum(St)){let ht=it.update(S),xt=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Fe.copy(S.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Fe.copy(ht.boundingSphere.center)),Fe.applyMatrix4(S.matrixWorld).applyMatrix4(ye)),Array.isArray(xt)){let Et=ht.groups;for(let Gt=0,Zt=Et.length;Gt<Zt;Gt++){let Mt=Et[Gt],Kt=xt[Mt.materialIndex];Kt&&Kt.visible&&A.push(S,ht,Kt,V,Fe.z,Mt,D)}}else xt.visible&&A.push(S,ht,xt,V,Fe.z,null,D)}}}let ft=S.children;for(let St=0,ht=ft.length;St<ht;St++)ic(ft[St],D,V,O)}function Tu(S,D,V,O){let{opaque:k,transmissive:ft,transparent:St}=S;E.setupLightsView(V),Te===!0&&Z.setGlobalState(R.clippingPlanes,V),O&&pt.viewport(et.copy(O)),k.length>0&&Vo(k,D,V),ft.length>0&&Vo(ft,D,V),St.length>0&&Vo(St,D,V),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function Au(S,D,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[O.id]===void 0){let Mt=me.has("EXT_color_buffer_half_float")||me.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[O.id]=new pn(1,1,{generateMipmaps:!0,type:Mt?Bn:ln,minFilter:yi,samples:Math.max(4,ge.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Vt.workingColorSpace})}let ft=E.state.transmissionRenderTarget[O.id],St=O.viewport||et;ft.setSize(St.z*R.transmissionResolutionScale,St.w*R.transmissionResolutionScale);let ht=R.getRenderTarget(),xt=R.getActiveCubeFace(),Et=R.getActiveMipmapLevel();R.setRenderTarget(ft),R.getClearColor(j),dt=R.getClearAlpha(),dt<1&&R.setClearColor(16777215,.5),R.clear(),vn&&C.render(V);let Gt=R.toneMapping;R.toneMapping=jn;let Zt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),E.setupLightsView(O),Te===!0&&Z.setGlobalState(R.clippingPlanes,O),Vo(S,V,O),zt.updateMultisampleRenderTarget(ft),zt.updateRenderTargetMipmap(ft),me.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let Kt=0,we=D.length;Kt<we;Kt++){let de=D[Kt],{object:fe,geometry:qe,material:bt,group:Qe}=de;if(bt.side===En&&fe.layers.test(O.layers)){let ne=bt.side;bt.side=sn,bt.needsUpdate=!0,Ru(fe,V,O,qe,bt,Qe),bt.side=ne,bt.needsUpdate=!0,Mt=!0}}Mt===!0&&(zt.updateMultisampleRenderTarget(ft),zt.updateRenderTargetMipmap(ft))}R.setRenderTarget(ht,xt,Et),R.setClearColor(j,dt),Zt!==void 0&&(O.viewport=Zt),R.toneMapping=Gt}function Vo(S,D,V){let O=D.isScene===!0?D.overrideMaterial:null;for(let k=0,ft=S.length;k<ft;k++){let St=S[k],{object:ht,geometry:xt,group:Et}=St,Gt=St.material;Gt.allowOverride===!0&&O!==null&&(Gt=O),ht.layers.test(V.layers)&&Ru(ht,D,V,xt,Gt,Et)}}function Ru(S,D,V,O,k,ft){U!==null&&k.isNodeMaterial&&U.setObject(S,k),S.onBeforeRender(R,D,V,O,k,ft),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(R,D,V,O,S,ft),k.transparent===!0&&k.side===En&&k.forceSinglePass===!1?(k.side=sn,k.needsUpdate=!0,R.renderBufferDirect(V,D,O,k,S,ft),k.side=Vi,k.needsUpdate=!0,R.renderBufferDirect(V,D,O,k,S,ft),k.side=En):R.renderBufferDirect(V,D,O,k,S,ft),S.onAfterRender(R,D,V,O,k,ft)}function Cu(S){let D=0;for(let V of S)V.texture!==null&&D++;return D}function _r(S,D,V){D.isScene!==!0&&(D=xn);let O=Ut.get(S),k=E.state.lights,ft=E.state.shadowsArray,St=k.state.version,ht=Q.getParameters(S,k.state,ft,D,V,E.state.lightProbeGridArray),xt=Q.getProgramCacheKey(ht),Et=O.programs;O.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;let Gt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;O.envMap=T.get(S.envMap||O.environment,Gt),O.envMapRotation=O.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Et===void 0&&(S.addEventListener("dispose",le),Et=new Map,O.programs=Et,O.programVariants=new Map);let Zt=Et.get(xt);if(Zt!==void 0){if(O.currentProgram===Zt&&O.lightsStateVersion===St)return Pu(S,ht),Zt}else ht.uniforms=Q.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,V,ht),S.onBeforeCompile(ht,R),Zt=Q.acquireProgram(ht,xt),Et.set(xt,Zt),O.uniforms=ht.uniforms;let Mt=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Mt.clippingPlanes=Z.uniform),Pu(S,ht),O.needsLights=cm(S),O.lightsStateVersion=St,O.needsLights&&(Mt.ambientLightColor.value=k.state.ambient,Mt.lightProbe.value=k.state.probe,Mt.sunLights.value=k.state.sun,Mt.sunLightShadows.value=k.state.sunShadow,Mt.directionalLights.value=k.state.directional,Mt.directionalLightShadows.value=k.state.directionalShadow,Mt.spotLights.value=k.state.spot,Mt.spotLightShadows.value=k.state.spotShadow,Mt.rectAreaLights.value=k.state.rectArea,Mt.ltc_1.value=k.state.rectAreaLTC1,Mt.ltc_2.value=k.state.rectAreaLTC2,Mt.pointLights.value=k.state.point,Mt.pointLightShadows.value=k.state.pointShadow,Mt.hemisphereLights.value=k.state.hemi,Mt.sunShadowMatrix.value=k.state.sunShadowMatrix,Mt.sunShadowCascade.value=k.state.sunShadowCascade,Mt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Mt.spotLightMatrix.value=k.state.spotLightMatrix,Mt.spotLightMap.value=k.state.spotLightMap,Mt.pointShadowMatrix.value=k.state.pointShadowMatrix),O.numLightProbeGrids=Cu(E.state.lightProbeGridArray),O.currentProgram=Zt,O.uniformsList=null,Zt}function om(S,D,V,O,k){let ft=Ut.get(S),St=ft.currentProgram.id+","+O+","+k,ht=ft.programVariants.get(St);return ht===void 0?(ht=_r(S,D,V),ft.programVariants.set(St,ht)):(ft.currentProgram=ht,ft.uniformsList=null,ft.outputColorSpace=O,ft.toneMapping=k),ht}function Iu(S){if(S.uniformsList===null){let D=S.currentProgram.getUniforms();S.uniformsList=cr.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Pu(S,D){let V=Ut.get(S);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function am(S,D,V,O,k){D.isScene!==!0&&(D=xn),zt.resetTextureUnits();let ft=D.fog,St=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,ht=nt===null?R.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Vt.workingColorSpace,xt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Et=T.get(O.envMap||St,xt),Gt=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Zt=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Mt=!!V.morphAttributes.position,Kt=!!V.morphAttributes.normal,we=!!V.morphAttributes.color,de=jn;O.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(de=R.toneMapping);let fe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,qe=fe!==void 0?fe.length:0,bt=Ut.get(O),Qe=E.state.lights;if(Te===!0&&(rn===!0||S!==tt)){let xe=S===tt&&O.id===X;Z.setState(O,S,xe)}let ne=!1,Yi=!1;O.version===bt.__version?bt.needsLights&&bt.lightsStateVersion!==Qe.state.version||k.isBatchedMesh&&bt.batching===!1||!k.isBatchedMesh&&bt.batching===!0||k.isBatchedMesh&&bt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&bt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&bt.instancing===!1||!k.isInstancedMesh&&bt.instancing===!0||k.isSkinnedMesh&&bt.skinning===!1||!k.isSkinnedMesh&&bt.skinning===!0||k.isInstancedMesh&&bt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&bt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&bt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&bt.instancingMorph===!1&&k.morphTexture!==null||bt.envMap!==Et||O.fog===!0&&bt.fog!==ft||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==Z.numPlanes||bt.numIntersection!==Z.numIntersection)||bt.vertexAlphas!==Gt||bt.vertexTangents!==Zt||bt.morphTargets!==Mt||bt.morphNormals!==Kt||bt.morphColors!==we||bt.morphTargetsCount!==qe||bt.numLightProbeGrids!==Cu(E.state.lightProbeGridArray)?ne=!0:(bt.outputColorSpace!==ht||bt.toneMapping!==de)&&(Yi=!0):(ne=!0,bt.__version=O.version);let $e=bt.currentProgram;(ne===!0||Yi===!0)&&($e=Yi===!0?om(O,D,k,ht,de):_r(O,D,k),U&&O.isNodeMaterial&&U.onUpdateProgram(O,$e,bt));let Go=!1,wi=!1,Ji=!1,te=$e.getUniforms(),He=bt.uniforms;if(pt.useProgram($e.program)&&(Go=!0,wi=!0,Ji=!0),O.id!==X&&(X=O.id,wi=!0),Go||tt!==S){pt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),te.setValue(N,"projectionMatrix",S.projectionMatrix),te.setValue(N,"viewMatrix",S.matrixWorldInverse);let Ue=te.map.cameraPosition;Ue!==void 0&&Ue.setValue(N,Gn.setFromMatrixPosition(S.matrixWorld)),ge.logarithmicDepthBuffer&&te.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&te.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),tt!==S&&(tt=S,wi=!0,Ji=!0)}if(bt.needsLights&&(Qe.state.sunShadowMap.length>0&&te.setValue(N,"sunShadowMap",Qe.state.sunShadowMap,zt),Qe.state.directionalShadowMap.length>0&&te.setValue(N,"directionalShadowMap",Qe.state.directionalShadowMap,zt),Qe.state.spotShadowMap.length>0&&te.setValue(N,"spotShadowMap",Qe.state.spotShadowMap,zt),Qe.state.pointShadowMap.length>0&&te.setValue(N,"pointShadowMap",Qe.state.pointShadowMap,zt)),k.isSkinnedMesh){te.setOptional(N,k,"bindMatrix"),te.setOptional(N,k,"bindMatrixInverse");let xe=k.skeleton;xe&&(xe.boneTexture===null&&xe.computeBoneTexture(),te.setValue(N,"boneTexture",xe.boneTexture,zt))}k.isBatchedMesh&&(te.setOptional(N,k,"batchingTexture"),te.setValue(N,"batchingTexture",k._matricesTexture,zt),te.setOptional(N,k,"batchingIdTexture"),te.setValue(N,"batchingIdTexture",k._indirectTexture,zt),te.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&te.setValue(N,"batchingColorTexture",k._colorsTexture,zt));let In=V.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&K.update(k,V,$e),(wi||bt.receiveShadow!==k.receiveShadow)&&(bt.receiveShadow=k.receiveShadow,te.setValue(N,"receiveShadow",k.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(He.envMapIntensity.value=D.environmentIntensity),He.dfgLUT!==void 0&&(He.dfgLUT.value=tS()),wi){if(te.setValue(N,"toneMappingExposure",R.toneMappingExposure),bt.needsLights&&lm(He,Ji),ft&&O.fog===!0&&ot.refreshFogUniforms(He,ft),ot.refreshMaterialUniforms(He,O,mt,It,E.state.transmissionRenderTarget[S.id]),bt.needsLights&&bt.numLightProbeGrids>0){let xe=M,Ue=0;for(let ni of E.state.lightProbeGridArray)ni.texture!==null&&(xe.textures[Ue]=ni.texture,xe.min[Ue]=ni.boundingBox.min,xe.max[Ue]=ni.boundingBox.max,xe.resolution[Ue]=ni.resolution,Ue++);for(let ni in xe)xe[ni].length=Ue;He.probesSH.value=xe.textures,He.probesMin.value=xe.min,He.probesMax.value=xe.max,He.probesResolution.value=xe.resolution}cr.upload(N,Iu(bt),He,zt)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(cr.upload(N,Iu(bt),He,zt),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&te.setValue(N,"center",k.center),te.setValue(N,"modelViewMatrix",k.modelViewMatrix),te.setValue(N,"normalMatrix",k.normalMatrix),te.setValue(N,"modelMatrix",k.matrixWorld),O.uniformsGroups!==void 0){let xe=O.uniformsGroups;for(let Ue=0,ni=xe.length;Ue<ni;Ue++){let Du=xe[Ue];Rt.update(Du,$e),Rt.bind(Du,$e)}}return $e}function lm(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.sunLights.needsUpdate=D,S.sunLightShadows.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function cm(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(S,D,V){let O=Ut.get(S);O.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),Ut.get(S.texture).__webglTexture=D,Ut.get(S.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){let V=Ut.get(S);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,V=0){nt=S,q=D,G=V;let O=null,k=!1,ft=!1;if(S){let ht=Ut.get(S);if(ht.__useDefaultFramebuffer!==void 0){pt.bindFramebuffer(N.FRAMEBUFFER,ht.__webglFramebuffer),et.copy(S.viewport),_t.copy(S.scissor),Nt=S.scissorTest,pt.viewport(et),pt.scissor(_t),pt.setScissorTest(Nt),X=-1;return}else if(ht.__webglFramebuffer===void 0)zt.setupRenderTarget(S);else if(ht.__hasExternalTextures)zt.rebindTextures(S,Ut.get(S.texture).__webglTexture,Ut.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Gt=S.depthTexture;if(ht.__boundDepthTexture!==Gt){if(Gt!==null&&Ut.has(Gt)&&(S.width!==Gt.image.width||S.height!==Gt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");zt.setupDepthRenderbuffer(S)}}let xt=S.texture;(xt.isData3DTexture||xt.isDataArrayTexture||xt.isCompressedArrayTexture)&&(ft=!0);let Et=Ut.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Et[D])?O=Et[D][V]:O=Et[D],k=!0):S.samples>0&&zt.useMultisampledRTT(S)===!1?O=Ut.get(S).__webglMultisampledFramebuffer:Array.isArray(Et)?O=Et[V]:O=Et,et.copy(S.viewport),_t.copy(S.scissor),Nt=S.scissorTest}else et.copy(Ft).multiplyScalar(mt).floor(),_t.copy(ee).multiplyScalar(mt).floor(),Nt=re;if(V!==0&&(O=z),pt.bindFramebuffer(N.FRAMEBUFFER,O)&&pt.drawBuffers(S,O),pt.viewport(et),pt.scissor(_t),pt.setScissorTest(Nt),k){let ht=Ut.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht.__webglTexture,V)}else if(ft){let ht=D;for(let xt=0;xt<S.textures.length;xt++){let Et=Ut.get(S.textures[xt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+xt,Et.__webglTexture,V,ht)}}else if(S!==null&&V!==0){let ht=Ut.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ht.__webglTexture,V)}X=-1};function Lu(S){let D=Ut.get(S);return(D.__readFormat!==S.format||D.__readType!==S.type)&&(D.__readFormat=S.format,D.__readType=S.type,D.__formatReadable=ge.textureFormatReadable(S.format),D.__typeReadable=ge.textureTypeReadable(S.type)),D}this.readRenderTargetPixels=function(S,D,V,O,k,ft,St,ht=0){if(!(S&&S.isWebGLRenderTarget)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=Ut.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(xt=xt[St],Array.isArray(xt)&&(xt=xt[0])),xt){pt.bindFramebuffer(N.FRAMEBUFFER,xt);try{let Et=S.textures[ht],Gt=Et.format,Zt=Et.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht);let Mt=Lu(Et);if(Mt.__formatReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-O&&V>=0&&V<=S.height-k&&N.readPixels(D,V,O,k,rt.convert(Gt),rt.convert(Zt),ft)}finally{let Et=nt!==null?Ut.get(nt).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(S,D,V,O,k,ft,St,ht=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=Ut.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(xt=xt[St],Array.isArray(xt)&&(xt=xt[0])),xt)if(D>=0&&D<=S.width-O&&V>=0&&V<=S.height-k){pt.bindFramebuffer(N.FRAMEBUFFER,xt);let Et=S.textures[ht],Gt=Et.format,Zt=Et.type;S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht);let Mt=Lu(Et);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Kt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Kt),N.bufferData(N.PIXEL_PACK_BUFFER,ft.byteLength,N.STREAM_READ),N.readPixels(D,V,O,k,rt.convert(Gt),rt.convert(Zt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let we=nt!==null?Ut.get(nt).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,we);let de=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Md(N,de,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Kt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ft),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(Kt),N.deleteSync(de),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,V=0){let O=Math.pow(2,-V),k=Math.floor(S.image.width*O),ft=Math.floor(S.image.height*O),St=D!==null?D.x:0,ht=D!==null?D.y:0;zt.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,St,ht,k,ft),pt.unbindTexture()},this.copyTextureToTexture=function(S,D,V=null,O=null,k=0,ft=0){let St,ht,xt,Et,Gt,Zt,Mt,Kt,we,de=S.isCompressedTexture?S.mipmaps[ft]:S.image;if(V!==null)St=V.max.x-V.min.x,ht=V.max.y-V.min.y,xt=V.isBox3?V.max.z-V.min.z:1,Et=V.min.x,Gt=V.min.y,Zt=V.isBox3?V.min.z:0;else{let te=Math.pow(2,-k);St=Math.floor(de.width*te),ht=Math.floor(de.height*te),S.isDataArrayTexture?xt=de.depth:S.isData3DTexture?xt=Math.floor(de.depth*te):xt=1,Et=0,Gt=0,Zt=0}O!==null?(Mt=O.x,Kt=O.y,we=O.z):(Mt=0,Kt=0,we=0);let fe=rt.convert(D.format),qe=rt.convert(D.type),bt;D.isData3DTexture?(zt.setTexture3D(D,0),bt=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(zt.setTexture2DArray(D,0),bt=N.TEXTURE_2D_ARRAY):(zt.setTexture2D(D,0),bt=N.TEXTURE_2D),pt.activeTexture(N.TEXTURE0),pt.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),pt.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),pt.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);let Qe=pt.getParameter(N.UNPACK_ROW_LENGTH),ne=pt.getParameter(N.UNPACK_IMAGE_HEIGHT),Yi=pt.getParameter(N.UNPACK_SKIP_PIXELS),$e=pt.getParameter(N.UNPACK_SKIP_ROWS),Go=pt.getParameter(N.UNPACK_SKIP_IMAGES);pt.pixelStorei(N.UNPACK_ROW_LENGTH,de.width),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,de.height),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,Et),pt.pixelStorei(N.UNPACK_SKIP_ROWS,Gt),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,Zt);let wi=S.isDataArrayTexture||S.isData3DTexture,Ji=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){let te=Ut.get(S),He=Ut.get(D),In=Ut.get(te.__renderTarget),xe=Ut.get(He.__renderTarget);pt.bindFramebuffer(N.READ_FRAMEBUFFER,In.__webglFramebuffer),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Ue=0;Ue<xt;Ue++)wi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ut.get(S).__webglTexture,k,Zt+Ue),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ut.get(D).__webglTexture,ft,we+Ue)),N.blitFramebuffer(Et,Gt,Et+St,Gt+ht,Mt,Kt,Mt+St,Kt+ht,N.DEPTH_BUFFER_BIT,N.NEAREST);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||Ut.has(S)){let te=Ut.get(S),He=Ut.get(D);pt.bindFramebuffer(N.READ_FRAMEBUFFER,P),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,H);for(let In=0;In<xt;In++)wi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,te.__webglTexture,k,Zt+In):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,te.__webglTexture,k),Ji?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,He.__webglTexture,ft,we+In):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,He.__webglTexture,ft),k!==0?N.blitFramebuffer(Et,Gt,Et+St,Gt+ht,Mt,Kt,Mt+St,Kt+ht,N.COLOR_BUFFER_BIT,N.NEAREST):Ji?N.copyTexSubImage3D(bt,ft,Mt,Kt,we+In,Et,Gt,St,ht):N.copyTexSubImage2D(bt,ft,Mt,Kt,Et,Gt,St,ht);pt.bindFramebuffer(N.READ_FRAMEBUFFER,null),pt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Ji?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(bt,ft,Mt,Kt,we,St,ht,xt,fe,qe,de.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,ft,Mt,Kt,we,St,ht,xt,fe,de.data):N.texSubImage3D(bt,ft,Mt,Kt,we,St,ht,xt,fe,qe,de):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ft,Mt,Kt,St,ht,fe,qe,de.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ft,Mt,Kt,de.width,de.height,fe,de.data):N.texSubImage2D(N.TEXTURE_2D,ft,Mt,Kt,St,ht,fe,qe,de);pt.pixelStorei(N.UNPACK_ROW_LENGTH,Qe),pt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ne),pt.pixelStorei(N.UNPACK_SKIP_PIXELS,Yi),pt.pixelStorei(N.UNPACK_SKIP_ROWS,$e),pt.pixelStorei(N.UNPACK_SKIP_IMAGES,Go),ft===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&N.generateMipmap(bt),pt.unbindTexture()},this.initRenderTarget=function(S){Ut.get(S).__webglFramebuffer===void 0&&zt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?zt.setTextureCube(S,0):S.isData3DTexture?zt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?zt.setTexture2DArray(S,0):zt.setTexture2D(S,0),pt.unbindTexture()},this.resetState=function(){q=0,G=0,nt=null,pt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Vt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Vt._getUnpackColorSpace()}};Pt();Pt();var Rn=Uint8Array,ur=Uint16Array,nS=Int32Array,fp=new Rn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),dp=new Rn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),iS=new Rn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),pp=function(i,t){for(var e=new ur(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new nS(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return{b:e,r:s}},mp=pp(fp,2),gp=mp.b,sS=mp.r;gp[28]=258,sS[258]=28;var yp=pp(dp,0),rS=yp.b,D1=yp.r,Jh=new ur(32768);for(se=0;se<32768;++se)_i=(se&43690)>>1|(se&21845)<<1,_i=(_i&52428)>>2|(_i&13107)<<2,_i=(_i&61680)>>4|(_i&3855)<<4,Jh[se]=((_i&65280)>>8|(_i&255)<<8)>>1;var _i,se,bo=(function(i,t,e){for(var n=i.length,s=0,r=new ur(t);s<n;++s)i[s]&&++r[i[s]-1];var o=new ur(t);for(s=1;s<t;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(e){a=new ur(1<<t);var l=15-t;for(s=0;s<n;++s)if(i[s])for(var c=s<<4|i[s],h=t-i[s],u=o[i[s]-1]++<<h,f=u|(1<<h)-1;u<=f;++u)a[Jh[u]>>l]=c}else for(a=new ur(n),s=0;s<n;++s)i[s]&&(a[s]=Jh[o[i[s]-1]++]>>15-i[s]);return a}),wo=new Rn(288);for(se=0;se<144;++se)wo[se]=8;var se;for(se=144;se<256;++se)wo[se]=9;var se;for(se=256;se<280;++se)wo[se]=7;var se;for(se=280;se<288;++se)wo[se]=8;var se,xp=new Rn(32);for(se=0;se<32;++se)xp[se]=5;var se;var oS=bo(wo,9,1);var aS=bo(xp,5,1),$h=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},kn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},Yh=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},lS=function(i){return(i+7)/8|0},cS=function(i,t,e){return(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length),new Rn(i.subarray(t,e))};var hS=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],zn=function(i,t,e){var n=new Error(t||hS[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,zn),!e)throw n;return n},uS=function(i,t,e,n){var s=i.length,r=n?n.length:0;if(!s||t.f&&!t.l)return e||new Rn(0);var o=!e,a=o||t.i!=2,l=t.i;o&&(e=new Rn(s*3));var c=function(Ft){var ee=e.length;if(Ft>ee){var re=new Rn(Math.max(ee*2,Ft));re.set(e),e=re}},h=t.f||0,u=t.p||0,f=t.b||0,d=t.l,p=t.d,x=t.m,m=t.n,g=s*8;do{if(!d){h=kn(i,u,1);var _=kn(i,u+1,3);if(u+=3,_)if(_==1)d=oS,p=aS,x=9,m=5;else if(_==2){var E=kn(i,u,31)+257,y=kn(i,u+10,15)+4,b=E+kn(i,u+5,31)+1;u+=14;for(var I=new Rn(b),R=new Rn(19),L=0;L<y;++L)R[iS[L]]=kn(i,u+L*3,7);u+=y*3;for(var U=$h(R),z=(1<<U)-1,P=bo(R,U,1),L=0;L<b;){var H=P[kn(i,u,z)];u+=H&15;var w=H>>4;if(w<16)I[L++]=w;else{var q=0,G=0;for(w==16?(G=3+kn(i,u,3),u+=2,q=I[L-1]):w==17?(G=3+kn(i,u,7),u+=3):w==18&&(G=11+kn(i,u,127),u+=7);G--;)I[L++]=q}}var nt=I.subarray(0,E),X=I.subarray(E);x=$h(nt),m=$h(X),d=bo(nt,x,1),p=bo(X,m,1)}else zn(1);else{var w=lS(u)+4,M=i[w-4]|i[w-3]<<8,A=w+M;if(A>s){l&&zn(0);break}a&&c(f+M),e.set(i.subarray(w,A),f),t.b=f+=M,t.p=u=A*8,t.f=h;continue}if(u>g){l&&zn(0);break}}a&&c(f+131072);for(var tt=(1<<x)-1,et=(1<<m)-1,_t=u;;_t=u){var q=d[Yh(i,u)&tt],Nt=q>>4;if(u+=q&15,u>g){l&&zn(0);break}if(q||zn(2),Nt<256)e[f++]=Nt;else if(Nt==256){_t=u,d=null;break}else{var j=Nt-254;if(Nt>264){var L=Nt-257,dt=fp[L];j=kn(i,u,(1<<dt)-1)+gp[L],u+=dt}var vt=p[Yh(i,u)&et],It=vt>>4;vt||zn(3),u+=vt&15;var X=rS[It];if(It>3){var dt=dp[It];X+=Yh(i,u)&(1<<dt)-1,u+=dt}if(u>g){l&&zn(0);break}a&&c(f+131072);var mt=f+j;if(f<X){var kt=r-X,Me=Math.min(X,mt);for(kt+f<0&&zn(3);f<Me;++f)e[f]=n[kt+f]}for(;f<mt;++f)e[f]=e[f-X]}}t.l=d,t.p=_t,t.b=f,t.f=h,d&&(h=1,t.m=x,t.d=p,t.n=m)}while(!h);return f!=e.length&&o?cS(e,0,f):e.subarray(0,f)};var fS=new Rn(0);var dS=function(i,t){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&zn(6,"invalid zlib data"),(i[1]>>5&1)==+!t&&zn(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function vp(i,t){return uS(i.subarray(dS(i,t&&t.dictionary),-4),{i:2},t&&t.out,t&&t.dictionary)}var pS=typeof TextDecoder<"u"&&new TextDecoder,mS=0;try{pS.decode(fS,{stream:!0}),mS=1}catch{}Pt();Pt();function _p(i,t,e){let n=e.length-i-1;if(t>=e[n])return n-1;if(t<=e[i])return i;let s=i,r=n,o=Math.floor((s+r)/2);for(;t<e[o]||t>=e[o+1];)t<e[o]?r=o:s=o,o=Math.floor((s+r)/2);return o}function gS(i,t,e,n){let s=[],r=[],o=[];s[0]=1;for(let a=1;a<=e;++a){r[a]=t-n[i+1-a],o[a]=n[i+a]-t;let l=0;for(let c=0;c<a;++c){let h=o[c+1],u=r[a-c],f=s[c]/(h+u);s[c]=l+h*f,l=u*f}s[a]=l}return s}function Sp(i,t,e,n){let s=_p(i,n,t),r=gS(s,n,i,t),o=new Jt(0,0,0,0);for(let a=0;a<=i;++a){let l=e[s-i+a],c=r[a],h=l.w*c;o.x+=l.x*h,o.y+=l.y*h,o.z+=l.z*h,o.w+=l.w*c}return o}function yS(i,t,e,n,s){let r=[];for(let u=0;u<=e;++u)r[u]=0;let o=[];for(let u=0;u<=n;++u)o[u]=r.slice(0);let a=[];for(let u=0;u<=e;++u)a[u]=r.slice(0);a[0][0]=1;let l=r.slice(0),c=r.slice(0);for(let u=1;u<=e;++u){l[u]=t-s[i+1-u],c[u]=s[i+u]-t;let f=0;for(let d=0;d<u;++d){let p=c[d+1],x=l[u-d];a[u][d]=p+x;let m=a[d][u-1]/a[u][d];a[d][u]=f+p*m,f=x*m}a[u][u]=f}for(let u=0;u<=e;++u)o[0][u]=a[u][e];for(let u=0;u<=e;++u){let f=0,d=1,p=[];for(let x=0;x<=e;++x)p[x]=r.slice(0);p[0][0]=1;for(let x=1;x<=n;++x){let m=0,g=u-x,_=e-x;u>=x&&(p[d][0]=p[f][0]/a[_+1][g],m=p[d][0]*a[g][_]);let w=g>=-1?1:-g,M=u-1<=_?x-1:e-u;for(let E=w;E<=M;++E)p[d][E]=(p[f][E]-p[f][E-1])/a[_+1][g+E],m+=p[d][E]*a[g+E][_];u<=_&&(p[d][x]=-p[f][x-1]/a[_+1][u],m+=p[d][x]*a[u][_]),o[x][u]=m;let A=f;f=d,d=A}}let h=e;for(let u=1;u<=n;++u){for(let f=0;f<=e;++f)o[u][f]*=h;h*=e-u}return o}function xS(i,t,e,n,s){let r=s<i?s:i,o=[],a=_p(i,n,t),l=yS(a,n,i,r,t),c=[];for(let h=0;h<e.length;++h){let u=e[h].clone(),f=u.w;u.x*=f,u.y*=f,u.z*=f,c[h]=u}for(let h=0;h<=r;++h){let u=c[a-i].clone().multiplyScalar(l[h][0]);for(let f=1;f<=i;++f)u.add(c[a-i+f].clone().multiplyScalar(l[h][f]));o[h]=u}for(let h=r+1;h<=s+1;++h)o[h]=new Jt(0,0,0);return o}function vS(i,t){let e=1;for(let s=2;s<=i;++s)e*=s;let n=1;for(let s=2;s<=t;++s)n*=s;for(let s=2;s<=i-t;++s)n*=s;return e/n}function _S(i){let t=i.length,e=[],n=[];for(let r=0;r<t;++r){let o=i[r];e[r]=new F(o.x,o.y,o.z),n[r]=o.w}let s=[];for(let r=0;r<t;++r){let o=e[r].clone();for(let a=1;a<=r;++a)o.sub(s[r-a].clone().multiplyScalar(vS(r,a)*n[a]));s[r]=o.divideScalar(n[0])}return s}function Mp(i,t,e,n,s){let r=xS(i,t,e,n,s);return _S(r)}var Nl=class extends $r{constructor(t,e,n,s,r){super();let o=e?e.length-1:0,a=n?n.length:0;this.degree=t,this.knots=e,this.controlPoints=[],this.startKnot=s||0,this.endKnot=r||o;for(let l=0;l<a;++l){let c=n[l];this.controlPoints[l]=new Jt(c.x,c.y,c.z,c.w)}}getPoint(t,e=new F){let n=e,s=this.knots[this.startKnot]+t*(this.knots[this.endKnot]-this.knots[this.startKnot]),r=Sp(this.degree,this.knots,this.controlPoints,s);return r.w!==1&&r.divideScalar(r.w),n.set(r.x,r.y,r.z)}getTangent(t,e=new F){let n=e,s=this.knots[0]+t*(this.knots[this.knots.length-1]-this.knots[0]),r=Mp(this.degree,this.knots,this.controlPoints,s,1);return n.copy(r[1]).normalize(),n}copy(t){return super.copy(t),this.degree=t.degree,this.knots=[...t.knots],this.controlPoints=t.controlPoints.map(e=>e.clone()),this.startKnot=t.startKnot,this.endKnot=t.endKnot,this}toJSON(){let t=super.toJSON();return t.degree=this.degree,t.knots=[...this.knots],t.controlPoints=this.controlPoints.map(e=>e.toArray()),t.startKnot=this.startKnot,t.endKnot=this.endKnot,t}fromJSON(t){return super.fromJSON(t),this.degree=t.degree,this.knots=[...t.knots],this.controlPoints=t.controlPoints.map(e=>new Jt(e[0],e[1],e[2],e[3])),this.startKnot=t.startKnot,this.endKnot=t.endKnot,this}};var Ht,be,De,Ol=class extends Un{constructor(t){super(t),this.trimAnimationClips=!1}load(t,e,n,s){let r=this,o=r.path===""?lo.extractUrlBase(t):r.path,a=new no(this.manager);a.setPriority(this.priority),a.setCache(this.cache),a.setPath(r.path),a.setResponseType("arraybuffer"),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(l){try{e(r.parse(l,o))}catch(c){s?s(c):console.error(c),r.manager.itemError(t)}},n,s)}parse(t,e){if(MS(t))Ht=new iu().parse(t);else{let s=Ep(t);if(!bS(s))throw new Error("THREE.FBXLoader: Unknown format.");if(bp(s)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+bp(s));Ht=new nu().parse(s)}let n=new us(this.manager).setPath(this.resourcePath||e).setCrossOrigin(this.crossOrigin);return n.setPriority(this.priority),n.setCache(this.cache),new Qh(n,this.manager,this.trimAnimationClips).parse(Ht)}},Qh=class{constructor(t,e,n){this.textureLoader=t,this.manager=e,this.trimAnimationClips=n}parse(){be=this.parseConnections();let t=this.parseImages(),e=this.parseTextures(t),n=this.parseMaterials(e),s=this.parseDeformers(),r=new tu().parse(s);return this.parseScene(s,r,n),De}parseConnections(){let t=new Map;return"Connections"in Ht&&Ht.Connections.connections.forEach(function(n){let s=n[0],r=n[1],o=n[2];t.has(s)||t.set(s,{parents:[],children:[]});let a={ID:r,relationship:o};t.get(s).parents.push(a),t.has(r)||t.set(r,{parents:[],children:[]});let l={ID:s,relationship:o};t.get(r).children.push(l)}),t}parseImages(){let t={},e={};if("Video"in Ht.Objects){let n=Ht.Objects.Video;for(let s in n){let r=n[s],o=parseInt(s);if(t[o]=r.RelativeFilename||r.Filename,"Content"in r){let a=r.Content instanceof ArrayBuffer&&r.Content.byteLength>0,l=typeof r.Content=="string"&&r.Content!=="";if(a||l){let c=this.parseImage(n[s]);e[r.RelativeFilename||r.Filename]=c}}}}for(let n in t){let s=t[n];e[s]!==void 0?t[n]=e[s]:t[n]=t[n].split("\\").pop()}return t}parseImage(t){let e=t.Content,n=t.RelativeFilename||t.Filename,s=n.slice(n.lastIndexOf(".")+1).toLowerCase(),r;switch(s){case"bmp":r="image/bmp";break;case"jpg":case"jpeg":r="image/jpeg";break;case"png":r="image/png";break;case"tif":r="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),r="image/tga";break;case"webp":r="image/webp";break;default:console.warn('FBXLoader: Image type "'+s+'" is not supported.');return}if(typeof e=="string")return"data:"+r+";base64,"+e;{let o=new Uint8Array(e);return URL.createObjectURL(new Blob([o],{type:r}))}}parseTextures(t){let e=new Map;if("Texture"in Ht.Objects){let n=Ht.Objects.Texture;for(let s in n){let r=this.parseTexture(n[s],t);e.set(parseInt(s),r)}}return e}parseTexture(t,e){let n=this.loadTexture(t,e);n.ID=t.id,n.name=t.attrName;let s=t.WrapModeU,r=t.WrapModeV,o=s!==void 0?s.value:0,a=r!==void 0?r.value:0;if(n.wrapS=o===0?ns:dn,n.wrapT=a===0?ns:dn,"Scaling"in t){let l=t.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in t){let l=t.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(t,e){let n=t.FileName.split(".").pop().toLowerCase(),s=this.manager.getHandler(`.${n}`);s===null&&(s=this.textureLoader);let r=s.path;r||s.setPath(this.textureLoader.path);let o=be.get(t.id).children,a;if(o!==void 0&&o.length>0&&e[o[0].ID]!==void 0&&(a=e[o[0].ID],(a.indexOf("blob:")===0||a.indexOf("data:")===0)&&s.setPath(void 0)),a===void 0)return console.warn("FBXLoader: Undefined filename, creating placeholder texture."),new ze;let l=s.load(a);return s.setPath(r),l}parseMaterials(t){let e=new Map;if("Material"in Ht.Objects){let n=Ht.Objects.Material;for(let s in n){let r=this.parseMaterial(n[s],t);r!==null&&e.set(parseInt(s),r)}}return e}parseMaterial(t,e){let n=t.id,s=t.attrName,r=t.ShadingModel;if(typeof r=="object"&&(r=r.value),!be.has(n))return null;let o=this.parseParameters(t,e,n),a;switch(r.toLowerCase()){case"phong":a=new Ui;break;case"lambert":a=new Qr;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',r),a=new Ui;break}return a.setValues(o),a.name=s,a}parseParameters(t,e,n){let s={};t.BumpFactor&&(s.bumpScale=t.BumpFactor.value),t.Diffuse?s.color=Vt.colorSpaceToWorking(new Lt().fromArray(t.Diffuse.value),ie):t.DiffuseColor&&(t.DiffuseColor.type==="Color"||t.DiffuseColor.type==="ColorRGB")&&(s.color=Vt.colorSpaceToWorking(new Lt().fromArray(t.DiffuseColor.value),ie)),t.DisplacementFactor&&(s.displacementScale=t.DisplacementFactor.value),t.Emissive?s.emissive=Vt.colorSpaceToWorking(new Lt().fromArray(t.Emissive.value),ie):t.EmissiveColor&&(t.EmissiveColor.type==="Color"||t.EmissiveColor.type==="ColorRGB")&&(s.emissive=Vt.colorSpaceToWorking(new Lt().fromArray(t.EmissiveColor.value),ie)),t.EmissiveFactor&&(s.emissiveIntensity=parseFloat(t.EmissiveFactor.value)),s.opacity=1-(t.TransparencyFactor?parseFloat(t.TransparencyFactor.value):0),(s.opacity===1||s.opacity===0)&&(s.opacity=t.Opacity?parseFloat(t.Opacity.value):null,s.opacity===null&&(s.opacity=1)),s.opacity<1&&(s.transparent=!0),t.ReflectionFactor&&(s.reflectivity=t.ReflectionFactor.value),t.Shininess&&(s.shininess=t.Shininess.value),t.Specular?s.specular=Vt.colorSpaceToWorking(new Lt().fromArray(t.Specular.value),ie):t.SpecularColor&&t.SpecularColor.type==="Color"&&(s.specular=Vt.colorSpaceToWorking(new Lt().fromArray(t.SpecularColor.value),ie));let r=this;return be.get(n).children.forEach(function(o){let a=o.relationship;switch(a){case"Bump":s.bumpMap=r.getTexture(e,o.ID);break;case"Maya|TEX_ao_map":s.aoMap=r.getTexture(e,o.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":s.map=r.getTexture(e,o.ID),s.map!==void 0&&(s.map.colorSpace=ie);break;case"DisplacementColor":s.displacementMap=r.getTexture(e,o.ID);break;case"EmissiveColor":s.emissiveMap=r.getTexture(e,o.ID),s.emissiveMap!==void 0&&(s.emissiveMap.colorSpace=ie);break;case"NormalMap":case"Maya|TEX_normal_map":s.normalMap=r.getTexture(e,o.ID);break;case"ReflectionColor":s.envMap=r.getTexture(e,o.ID),s.envMap!==void 0&&(s.envMap.mapping=or,s.envMap.colorSpace=ie);break;case"SpecularColor":s.specularMap=r.getTexture(e,o.ID),s.specularMap!==void 0&&(s.specularMap.colorSpace=ie);break;case"TransparentColor":case"TransparencyFactor":s.alphaMap=r.getTexture(e,o.ID),s.transparent=!0;break;default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),s}getTexture(t,e){return"LayeredTexture"in Ht.Objects&&e in Ht.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),e=be.get(e).children[0].ID),t.get(e)}parseDeformers(){let t={},e={};if("Deformer"in Ht.Objects){let n=Ht.Objects.Deformer;for(let s in n){let r=n[s],o=be.get(parseInt(s));if(r.attrType==="Skin"){let a=this.parseSkeleton(o,n);a.ID=s,o.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=o.parents[0].ID,t[s]=a}else if(r.attrType==="BlendShape"){let a={id:s};a.rawTargets=this.parseMorphTargets(o,n),a.id=s,o.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),e[s]=a}}}return{skeletons:t,morphTargets:e}}parseSkeleton(t,e){let n=[];return t.children.forEach(function(s){let r=e[s.ID];if(r.attrType!=="Cluster")return;let o={ID:s.ID,indices:[],weights:[],transformLink:new wt().fromArray(r.TransformLink.a)};"Indexes"in r&&(o.indices=r.Indexes.a,o.weights=r.Weights.a),n.push(o)}),{rawBones:n,bones:[]}}parseMorphTargets(t,e){let n=[];for(let s=0;s<t.children.length;s++){let r=t.children[s],o=e[r.ID],a={name:o.attrName,initialWeight:o.DeformPercent,id:o.id,fullWeights:o.FullWeights.a};if(o.attrType!=="BlendShapeChannel")return;a.geoID=be.get(parseInt(r.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(t,e,n){De=new tn;let s=this.parseModels(t.skeletons,e,n),r=Ht.Objects.Model,o=this;s.forEach(function(u){let f=r[u.ID];o.setLookAtProperties(u,f),be.get(u.ID).parents.forEach(function(p){let x=s.get(p.ID);x!==void 0&&x.add(u)}),u.parent===null&&De.add(u)}),this.addGlobalSceneSettings(),De.traverse(function(u){if(u.userData.transformData){u.parent&&(u.userData.transformData.parentMatrix=u.parent.matrix,u.userData.transformData.parentMatrixWorld=u.parent.matrixWorld);let f=wp(u.userData.transformData);u.applyMatrix4(f),u.updateWorldMatrix()}});let a=this.parsePoseNodes(),l=new Set;for(let u in t.skeletons)t.skeletons[u].rawBones.forEach(function(f,d){let p=t.skeletons[u].bones[d];p&&l.add(p.ID)});let c=new wt;De.traverse(function(u){if(u.isBone&&u.ID!==void 0&&!l.has(u.ID)){let f=a[u.ID];f!==void 0&&(u.parent?(c.copy(u.parent.matrixWorld).invert(),c.multiply(f)):c.copy(f),c.decompose(u.position,u.quaternion,u.scale),u.updateMatrix(),u.matrixWorld.copy(f))}}),this.bindSkeleton(t.skeletons,e,s);let h=new eu(this.trimAnimationClips).parse();De.children.length===1&&De.children[0].isGroup&&(De.children[0].animations=h,Object.assign(De.children[0].userData,De.userData),De=De.children[0]),De.animations=h,"GlobalSettings"in Ht&&"UpAxis"in Ht.GlobalSettings&&Ht.GlobalSettings.UpAxis.value===2&&(console.warn("THREE.FBXLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted."),De.rotation.set(-Math.PI/2,0,0))}parseModels(t,e,n){let s=new Map,r=Ht.Objects.Model;for(let o in r){let a=parseInt(o),l=r[o],c=be.get(a),h=this.buildSkeleton(c,t,a,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,e,n);break;case"NurbsCurve":h=this.createCurve(c,e);break;case"LimbNode":case"Root":h=new os;break;default:h=new tn;break}h.name=l.attrName?oe.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=a}this.getTransformData(h,l),s.set(a,h)}return s}buildSkeleton(t,e,n,s){let r=null;return t.parents.forEach(function(o){for(let a in e){let l=e[a];l.rawBones.forEach(function(c,h){if(c.ID===o.ID){let u=r;r=new os,r.matrixWorld.copy(c.transformLink),r.name=s?oe.sanitizeNodeName(s):"",r.userData.originalName=s,r.ID=n,l.bones[h]=r,u!==null&&r.add(u)}})}}),r}createCamera(t){let e,n;if(t.children.forEach(function(s){let r=Ht.Objects.NodeAttribute[s.ID];r!==void 0&&(n=r)}),n===void 0)e=new pe;else{let s=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(s=1);let r=1;n.NearPlane!==void 0&&(r=n.NearPlane.value/1e3);let o=1e3;n.FarPlane!==void 0&&(o=n.FarPlane.value/1e3);let a=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,l=n.AspectHeight.value);let c=a/l,h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);let u=n.FocalLength?n.FocalLength.value:null;switch(s){case 0:e=new Re(h,c,r,o),u!==null&&e.setFocalLength(u);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),e=new pe;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+s+"."),e=new pe;break}}return e}createLight(t){let e,n;if(t.children.forEach(function(s){let r=Ht.Objects.NodeAttribute[s.ID];r!==void 0&&(n=r)}),n===void 0)e=new pe;else{let s;n.LightType===void 0?s=0:s=n.LightType.value;let r=16777215;n.Color!==void 0&&(r=Vt.colorSpaceToWorking(new Lt().fromArray(n.Color.value),ie));let o=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(o=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);let l=1;switch(s){case 0:e=new er(r,o,a,l);break;case 1:e=new fs(r,o);break;case 2:let c=Math.PI/3,h=0;n.OuterAngle!==void 0?(c=We.degToRad(n.OuterAngle.value),n.InnerAngle!==void 0&&(h=1-n.InnerAngle.value/n.OuterAngle.value,h=Math.max(0,h))):n.InnerAngle!==void 0&&(c=We.degToRad(n.InnerAngle.value)),e=new ro(r,o,a,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),e=new er(r,o);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(e.castShadow=!0)}return e}createMesh(t,e,n){let s,r=null,o=null,a=[];if(t.children.forEach(function(l){e.has(l.ID)&&(r=e.get(l.ID)),n.has(l.ID)&&a.push(n.get(l.ID))}),a.length>1?o=a:a.length>0?o=a[0]:(o=new Ui({name:Un.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(o)),"color"in r.attributes&&a.forEach(function(l){l.vertexColors=!0}),r.groups.length>0){let l=!1;for(let c=0,h=r.groups.length;c<h;c++){let u=r.groups[c];(u.materialIndex<0||u.materialIndex>=a.length)&&(u.materialIndex=a.length,l=!0)}if(l){let c=new Ui;a.push(c)}}return r.FBX_Deformer?(s=new zr(r,o),s.normalizeSkinWeights()):s=new Ie(r,o),s}createCurve(t,e){let n=t.children.reduce(function(r,o){return e.has(o.ID)&&(r=e.get(o.ID)),r},null),s=new Fi({name:Un.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new as(n,s)}getTransformData(t,e){let n={};"InheritType"in e&&(n.inheritType=parseInt(e.InheritType.value)),"RotationOrder"in e?n.eulerOrder=Eo(e.RotationOrder.value):n.eulerOrder=Eo(0),"Lcl_Translation"in e&&(n.translation=e.Lcl_Translation.value),"PreRotation"in e&&(n.preRotation=e.PreRotation.value),"Lcl_Rotation"in e&&(n.rotation=e.Lcl_Rotation.value),"PostRotation"in e&&(n.postRotation=e.PostRotation.value),"Lcl_Scaling"in e&&(n.scale=e.Lcl_Scaling.value),"ScalingOffset"in e&&(n.scalingOffset=e.ScalingOffset.value),"ScalingPivot"in e&&(n.scalingPivot=e.ScalingPivot.value),"RotationOffset"in e&&(n.rotationOffset=e.RotationOffset.value),"RotationPivot"in e&&(n.rotationPivot=e.RotationPivot.value),t.userData.transformData=n}setLookAtProperties(t,e){"LookAtProperty"in e&&be.get(t.ID).children.forEach(function(s){if(s.relationship==="LookAtProperty"){let r=Ht.Objects.Model[s.ID];if("Lcl_Translation"in r){let o=r.Lcl_Translation.value;t.target!==void 0?(t.target.position.fromArray(o),De.add(t.target)):t.lookAt(new F().fromArray(o))}}})}bindSkeleton(t,e,n){for(let s in t){let r=t[s],o=[];for(let l=0,c=r.bones.length;l<c;l++){let h=new wt;r.bones[l]&&r.rawBones[l]&&h.copy(r.rawBones[l].transformLink).invert(),o.push(h)}be.get(parseInt(r.ID)).parents.forEach(function(l){if(e.has(l.ID)){let c=l.ID;be.get(c).parents.forEach(function(u){if(n.has(u.ID)){let f=n.get(u.ID);f.updateMatrixWorld(!0),f.bind(new Gr(r.bones,o),f.matrixWorld)}})}})}}parsePoseNodes(){let t={};if("Pose"in Ht.Objects){let e=Ht.Objects.Pose;for(let n in e)if(e[n].attrType==="BindPose"&&e[n].NbPoseNodes>0){let s=e[n].PoseNode;Array.isArray(s)?s.forEach(function(r){t[r.Node]=new wt().fromArray(r.Matrix.a)}):t[s.Node]=new wt().fromArray(s.Matrix.a)}}return t}addGlobalSceneSettings(){if("GlobalSettings"in Ht){if("AmbientColor"in Ht.GlobalSettings){let t=Ht.GlobalSettings.AmbientColor.value,e=t[0],n=t[1],s=t[2];if(e!==0||n!==0||s!==0){let r=new Lt().setRGB(e,n,s,ie);De.add(new ao(r,1))}}"UnitScaleFactor"in Ht.GlobalSettings&&(De.userData.unitScaleFactor=Ht.GlobalSettings.UnitScaleFactor.value)}}},tu=class{constructor(){this.negativeMaterialIndices=!1}parse(t){let e=new Map;if("Geometry"in Ht.Objects){let n=Ht.Objects.Geometry;for(let s in n){let r=be.get(parseInt(s)),o=this.parseGeometry(r,n[s],t);e.set(parseInt(s),o)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),e}parseGeometry(t,e,n){switch(e.attrType){case"Mesh":return this.parseMeshGeometry(t,e,n);case"NurbsCurve":return this.parseNurbsGeometry(e)}}parseMeshGeometry(t,e,n){let s=n.skeletons,r=[],o=t.parents.map(function(u){return Ht.Objects.Model[u.ID]});if(o.length===0)return;let a=t.children.reduce(function(u,f){return s[f.ID]!==void 0&&(u=s[f.ID]),u},null);t.children.forEach(function(u){n.morphTargets[u.ID]!==void 0&&r.push(n.morphTargets[u.ID])});let l=o[0],c={};"RotationOrder"in l&&(c.eulerOrder=Eo(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);let h=wp(c);return this.genGeometry(e,a,r,h)}genGeometry(t,e,n,s){let r=new Ve;t.attrName&&(r.name=t.attrName);let o=this.parseGeoNode(t,e),a=this.genBuffers(o),l=new ce(a.vertex,3);if(l.applyMatrix4(s),r.setAttribute("position",l),a.colors.length>0&&r.setAttribute("color",new ce(a.colors,3)),e&&(r.setAttribute("skinIndex",new ss(a.weightsIndices,4)),r.setAttribute("skinWeight",new ce(a.vertexWeights,4)),r.FBX_Deformer=e),a.normal.length>0){let c=new Ot().getNormalMatrix(s),h=new ce(a.normal,3);h.applyNormalMatrix(c),r.setAttribute("normal",h)}if(a.uvs.forEach(function(c,h){let u=h===0?"uv":`uv${h}`;r.setAttribute(u,new ce(a.uvs[h],2))}),o.material&&o.material.mappingType!=="AllSame"){let c=a.materialIndex[0],h=0;if(a.materialIndex.forEach(function(u,f){u!==c&&(r.addGroup(h,f-h,c),c=u,h=f)}),r.groups.length>0){let u=r.groups[r.groups.length-1],f=u.start+u.count;f!==a.materialIndex.length&&r.addGroup(f,a.materialIndex.length-f,c)}r.groups.length===0&&r.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(r,t,n,s),r}parseGeoNode(t,e){let n={};if(n.vertexPositions=t.Vertices!==void 0?t.Vertices.a:[],n.vertexIndices=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],t.LayerElementColor&&t.LayerElementColor[0].Colors&&(n.color=this.parseVertexColors(t.LayerElementColor[0])),t.LayerElementMaterial&&(n.material=this.parseMaterialIndices(t.LayerElementMaterial[0])),t.LayerElementNormal&&(n.normal=this.parseNormals(t.LayerElementNormal[0])),t.LayerElementUV){n.uv=[];let s=0;for(;t.LayerElementUV[s];)t.LayerElementUV[s].UV&&n.uv.push(this.parseUVs(t.LayerElementUV[s])),s++}return n.weightTable={},e!==null&&(n.skeleton=e,e.rawBones.forEach(function(s,r){s.indices.forEach(function(o,a){n.weightTable[o]===void 0&&(n.weightTable[o]=[]),n.weightTable[o].push({id:r,weight:s.weights[a]})})})),n}genBuffers(t){let e={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]},n=0,s=0,r=!1,o=[],a=[],l=[],c=[],h=[],u=[],f=this;return t.vertexIndices.forEach(function(d,p){let x,m=!1;d<0&&(d=d^-1,m=!0);let g=[],_=[];if(o.push(d*3,d*3+1,d*3+2),t.color){let w=Ul(p,n,d,t.color);l.push(w[0],w[1],w[2])}if(t.skeleton){if(t.weightTable[d]!==void 0&&t.weightTable[d].forEach(function(w){_.push(w.weight),g.push(w.id)}),_.length>4){r||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),r=!0);let w=[0,0,0,0],M=[0,0,0,0];_.forEach(function(A,E){let y=A,b=g[E];M.forEach(function(I,R,L){if(y>I){L[R]=y,y=I;let U=w[R];w[R]=b,b=U}})}),g=w,_=M}for(;_.length<4;)_.push(0),g.push(0);for(let w=0;w<4;++w)h.push(_[w]),u.push(g[w])}if(t.normal){let w=Ul(p,n,d,t.normal);a.push(w[0],w[1],w[2])}t.material&&t.material.mappingType!=="AllSame"&&(x=Ul(p,n,d,t.material)[0],x<0&&(f.negativeMaterialIndices=!0,x=0)),t.uv&&t.uv.forEach(function(w,M){let A=Ul(p,n,d,w);c[M]===void 0&&(c[M]=[]),c[M].push(A[0]),c[M].push(A[1])}),s++,m&&(f.genFace(e,t,o,x,a,l,c,h,u,s),n++,s=0,o=[],a=[],l=[],c=[],h=[],u=[])}),e}getNormalNewell(t){let e=new F(0,0,0);for(let n=0;n<t.length;n++){let s=t[n],r=t[(n+1)%t.length];e.x+=(s.y-r.y)*(s.z+r.z),e.y+=(s.z-r.z)*(s.x+r.x),e.z+=(s.x-r.x)*(s.y+r.y)}return e.normalize(),e}getNormalTangentAndBitangent(t){let e=this.getNormalNewell(t),s=(Math.abs(e.z)>.5?new F(0,1,0):new F(0,0,1)).cross(e).normalize(),r=e.clone().cross(s).normalize();return{normal:e,tangent:s,bitangent:r}}flattenVertex(t,e,n){return new Xt(t.dot(e),t.dot(n))}genFace(t,e,n,s,r,o,a,l,c,h){let u;if(h>3){let f=[],d=e.baseVertexPositions||e.vertexPositions;for(let g=0;g<n.length;g+=3)f.push(new F(d[n[g]],d[n[g+1]],d[n[g+2]]));let{tangent:p,bitangent:x}=this.getNormalTangentAndBitangent(f),m=[];for(let g of f)m.push(this.flattenVertex(g,p,x));u=Zr.triangulateShape(m,[])}else u=[[0,1,2]];for(let[f,d,p]of u)t.vertex.push(e.vertexPositions[n[f*3]]),t.vertex.push(e.vertexPositions[n[f*3+1]]),t.vertex.push(e.vertexPositions[n[f*3+2]]),t.vertex.push(e.vertexPositions[n[d*3]]),t.vertex.push(e.vertexPositions[n[d*3+1]]),t.vertex.push(e.vertexPositions[n[d*3+2]]),t.vertex.push(e.vertexPositions[n[p*3]]),t.vertex.push(e.vertexPositions[n[p*3+1]]),t.vertex.push(e.vertexPositions[n[p*3+2]]),e.skeleton&&(t.vertexWeights.push(l[f*4]),t.vertexWeights.push(l[f*4+1]),t.vertexWeights.push(l[f*4+2]),t.vertexWeights.push(l[f*4+3]),t.vertexWeights.push(l[d*4]),t.vertexWeights.push(l[d*4+1]),t.vertexWeights.push(l[d*4+2]),t.vertexWeights.push(l[d*4+3]),t.vertexWeights.push(l[p*4]),t.vertexWeights.push(l[p*4+1]),t.vertexWeights.push(l[p*4+2]),t.vertexWeights.push(l[p*4+3]),t.weightsIndices.push(c[f*4]),t.weightsIndices.push(c[f*4+1]),t.weightsIndices.push(c[f*4+2]),t.weightsIndices.push(c[f*4+3]),t.weightsIndices.push(c[d*4]),t.weightsIndices.push(c[d*4+1]),t.weightsIndices.push(c[d*4+2]),t.weightsIndices.push(c[d*4+3]),t.weightsIndices.push(c[p*4]),t.weightsIndices.push(c[p*4+1]),t.weightsIndices.push(c[p*4+2]),t.weightsIndices.push(c[p*4+3])),e.color&&(t.colors.push(o[f*3]),t.colors.push(o[f*3+1]),t.colors.push(o[f*3+2]),t.colors.push(o[d*3]),t.colors.push(o[d*3+1]),t.colors.push(o[d*3+2]),t.colors.push(o[p*3]),t.colors.push(o[p*3+1]),t.colors.push(o[p*3+2])),e.material&&e.material.mappingType!=="AllSame"&&(t.materialIndex.push(s),t.materialIndex.push(s),t.materialIndex.push(s)),e.normal&&(t.normal.push(r[f*3]),t.normal.push(r[f*3+1]),t.normal.push(r[f*3+2]),t.normal.push(r[d*3]),t.normal.push(r[d*3+1]),t.normal.push(r[d*3+2]),t.normal.push(r[p*3]),t.normal.push(r[p*3+1]),t.normal.push(r[p*3+2])),e.uv&&e.uv.forEach(function(x,m){t.uvs[m]===void 0&&(t.uvs[m]=[]),t.uvs[m].push(a[m][f*2]),t.uvs[m].push(a[m][f*2+1]),t.uvs[m].push(a[m][d*2]),t.uvs[m].push(a[m][d*2+1]),t.uvs[m].push(a[m][p*2]),t.uvs[m].push(a[m][p*2+1])})}addMorphTargets(t,e,n,s){if(n.length===0)return;t.morphTargetsRelative=!0,t.morphAttributes.position=[];let r=s.clone().setPosition(0,0,0),o=this;n.forEach(function(a){a.rawTargets.forEach(function(l){let c=Ht.Objects.Geometry[l.geoID];c!==void 0&&o.genMorphGeometry(t,e,c,r,l.name)})})}genMorphGeometry(t,e,n,s,r){let o=e.Vertices!==void 0?e.Vertices.a:[],a=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=t.attributes.position.count*3,u=new Float32Array(h);for(let x=0;x<c.length;x++){let m=c[x]*3;u[m]=l[x*3],u[m+1]=l[x*3+1],u[m+2]=l[x*3+2]}let f={vertexIndices:a,vertexPositions:u,baseVertexPositions:o},d=this.genBuffers(f),p=new ce(d.vertex,3);p.name=r||n.attrName,p.applyMatrix4(s),t.morphAttributes.position.push(p)}parseNormals(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,s=t.Normals.a,r=[];return n==="IndexToDirect"&&("NormalIndex"in t?r=t.NormalIndex.a:"NormalsIndex"in t&&(r=t.NormalsIndex.a)),{dataSize:3,buffer:s,indices:r,mappingType:e,referenceType:n}}parseUVs(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,s=t.UV.a,r=[];return n==="IndexToDirect"&&(r=t.UVIndex.a),{dataSize:2,buffer:s,indices:r,mappingType:e,referenceType:n}}parseVertexColors(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,s=t.Colors.a,r=[];n==="IndexToDirect"&&(r=t.ColorIndex.a);for(let o=0,a=new Lt;o<s.length;o+=4)a.fromArray(s,o),Vt.colorSpaceToWorking(a,ie),a.toArray(s,o);return{dataSize:4,buffer:s,indices:r,mappingType:e,referenceType:n}}parseMaterialIndices(t){let e=t.MappingInformationType,n=t.ReferenceInformationType;if(e==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};let s=t.Materials.a,r=[];for(let o=0;o<s.length;++o)r.push(o);return{dataSize:1,buffer:s,indices:r,mappingType:e,referenceType:n}}parseNurbsGeometry(t){let e=parseInt(t.Order);if(isNaN(e))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",t.Order,t.id),new Ve;let n=e-1,s=t.KnotVector.a,r=[],o=t.Points.a;for(let u=0,f=o.length;u<f;u+=4)r.push(new Jt().fromArray(o,u));let a,l;if(t.Form==="Closed")r.push(r[0]);else if(t.Form==="Periodic"){a=n,l=s.length-1-a;for(let u=0;u<n;++u)r.push(r[u])}let h=new Nl(n,s,r,a,l).getPoints(r.length*12);return new Ve().setFromPoints(h)}},eu=class{constructor(t){this.trimAnimationClips=t}parse(){let t=[],e=this.parseClips();if(e!==void 0)for(let n in e){let s=e[n],r=this.addClip(s);t.push(r)}return t}parseClips(){if(Ht.Objects.AnimationCurve===void 0)return;let t=this.parseAnimationCurveNodes();this.parseAnimationCurves(t);let e=this.parseAnimationLayers(t);return this.parseAnimStacks(e)}parseAnimationCurveNodes(){let t=Ht.Objects.AnimationCurveNode,e=new Map;for(let n in t){let s=t[n];if(s.attrName.match(/S|R|T|DeformPercent/)!==null){let r={id:s.id,attr:s.attrName,curves:{}};e.set(r.id,r)}}return e}parseAnimationCurves(t){let e=Ht.Objects.AnimationCurve;for(let n in e){let s={id:e[n].id,times:e[n].KeyTime.a.map(jh),values:e[n].KeyValueFloat.a},r=be.get(s.id);if(r!==void 0){let o=r.parents[0].ID,a=r.parents[0].relationship;a.match(/X/)?t.get(o).curves.x=s:a.match(/Y/)?t.get(o).curves.y=s:a.match(/Z/)?t.get(o).curves.z=s:a.match(/DeformPercent/)&&t.has(o)&&(t.get(o).curves.morph=s)}}}parseAnimationLayers(t){let e=Ht.Objects.AnimationLayer,n=new Map;for(let s in e){let r=[],o=be.get(parseInt(s));o!==void 0&&(o.children.forEach(function(l,c){if(t.has(l.ID)){let h=t.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(r[c]===void 0){let u=be.get(l.ID).parents.filter(function(d){return d.relationship!==void 0});if(u.length===0)return;let f=u[0].ID;if(f!==void 0){let d=Ht.Objects.Model[f.toString()];if(d===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}let p={modelName:d.attrName?oe.sanitizeNodeName(d.attrName):"",ID:d.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};De.traverse(function(x){x.ID===d.id&&(p.transform=x.matrix,x.userData.transformData&&(p.eulerOrder=x.userData.transformData.eulerOrder,x.userData.transformData.rotation&&(p.initialRotation=x.userData.transformData.rotation)))}),p.transform||(p.transform=new wt),"PreRotation"in d&&(p.preRotation=d.PreRotation.value),"PostRotation"in d&&(p.postRotation=d.PostRotation.value),r[c]=p}}r[c]&&(r[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(r[c]===void 0){let u=be.get(l.ID).parents.filter(function(_){return _.relationship!==void 0});if(u.length===0)return;let f=u[0].ID,d=be.get(f).parents[0].ID,p=be.get(d).parents[0].ID,x=be.get(p).parents[0].ID,m=Ht.Objects.Model[x],g={modelName:m.attrName?oe.sanitizeNodeName(m.attrName):"",morphName:Ht.Objects.Deformer[f].attrName};r[c]=g}r[c][h.attr]=h}}}),n.set(parseInt(s),r))}return n}parseAnimStacks(t){let e=Ht.Objects.AnimationStack,n={};for(let s in e){let r=be.get(parseInt(s)).children;r.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");let o=t.get(r[0].ID),a=e[s];n[s]={name:a.attrName,layer:o,localStart:a.LocalStart!==void 0?jh(Number(a.LocalStart.value)):0,localStop:a.LocalStop!==void 0?jh(Number(a.LocalStop.value)):0}}return n}addClip(t){let e=[],n=this;return t.layer.forEach(function(s){e=e.concat(n.generateTracks(s))}),this.trimAnimationClips===!0&&t.localStop>t.localStart&&(e=this.trimTracks(e,t.localStart,t.localStop)),new eo(t.name,-1,e)}trimTracks(t,e,n){let s=Math.fround(e),r=Math.fround(n),o=[];for(let a=0;a<t.length;a++){let l=t[a],c=l.getValueSize(),h=[],u=[];for(let f=0;f<l.times.length;f++){let d=l.times[f];if(!(d<s||d>r)){h.push(d-s);for(let p=0;p<c;p++)u.push(l.values[f*c+p])}}h.length!==0&&(l.times=new Float32Array(h),l.values=new Float32Array(u),o.push(l))}return o}generateTracks(t){let e=[],n=new F,s=new F;if(t.transform&&t.transform.decompose(n,new _e,s),n=n.toArray(),s=s.toArray(),t.T!==void 0&&Object.keys(t.T.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.T.curves,n,"position");r!==void 0&&e.push(r)}if(t.R!==void 0&&Object.keys(t.R.curves).length>0){let r=this.generateRotationTrack(t.modelName,t.R.curves,t.preRotation,t.postRotation,t.eulerOrder,t.initialRotation);r!==void 0&&e.push(r)}if(t.S!==void 0&&Object.keys(t.S.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.S.curves,s,"scale");r!==void 0&&e.push(r)}if(t.DeformPercent!==void 0){let r=this.generateMorphTrack(t);r!==void 0&&e.push(r)}return e}generateVectorTrack(t,e,n,s){let r=this.getTimesForAllAxes(e),o=this.getKeyframeTrackValues(r,e,n);return new hs(t+"."+s,r,o)}generateRotationTrack(t,e,n,s,r,o){let a,l;if(e.x!==void 0||e.y!==void 0||e.z!==void 0){let d=this.getTimesForAllAxes(e);if(d.length>0){let p=o||[0,0,0],x=this.synchronizeCurve(e.x,d,p[0]),m=this.synchronizeCurve(e.y,d,p[1]),g=this.synchronizeCurve(e.z,d,p[2]),_=this.interpolateRotations(x,m,g,r);a=_[0],l=_[1]}}let c=Eo(0);n!==void 0&&(n=n.map(We.degToRad),n.push(c),n=new Ce().fromArray(n),n=new _e().setFromEuler(n)),s!==void 0&&(s=s.map(We.degToRad),s.push(c),s=new Ce().fromArray(s),s=new _e().setFromEuler(s).invert());let h=new _e,u=new Ce,f=[];if(!(!l||!a)){for(let d=0;d<l.length;d+=3)u.set(l[d],l[d+1],l[d+2],r),h.setFromEuler(u),n!==void 0&&h.premultiply(n),s!==void 0&&h.multiply(s),d>2&&new _e().fromArray(f,(d-3)/3*4).dot(h)<0&&h.set(-h.x,-h.y,-h.z,-h.w),h.toArray(f,d/3*4);return new ki(t+".quaternion",a,f)}}generateMorphTrack(t){let e=t.DeformPercent.curves.morph,n=e.values.map(function(r){return r/100}),s=De.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];return new Bi(t.modelName+".morphTargetInfluences["+s+"]",e.times,n)}getTimesForAllAxes(t){let e=[];if(t.x!==void 0&&(e=e.concat(t.x.times)),t.y!==void 0&&(e=e.concat(t.y.times)),t.z!==void 0&&(e=e.concat(t.z.times)),e=e.sort(function(n,s){return n-s}),e.length>1){let n=1,s=e[0];for(let r=1;r<e.length;r++){let o=e[r];o!==s&&(e[n]=o,s=o,n++)}e=e.slice(0,n)}return e}getKeyframeTrackValues(t,e,n){let s=n,r=[],o=-1,a=-1,l=-1;return t.forEach(function(c){if(e.x&&(o=e.x.times.indexOf(c)),e.y&&(a=e.y.times.indexOf(c)),e.z&&(l=e.z.times.indexOf(c)),o!==-1){let h=e.x.values[o];r.push(h),s[0]=h}else r.push(s[0]);if(a!==-1){let h=e.y.values[a];r.push(h),s[1]=h}else r.push(s[1]);if(l!==-1){let h=e.z.values[l];r.push(h),s[2]=h}else r.push(s[2])}),r}synchronizeCurve(t,e,n){if(t===void 0)return{times:e,values:e.map(()=>n)};if(t.times.length===e.length)return t;let s=[];for(let r=0;r<e.length;r++)s.push(this.sampleCurveValue(t,e[r],n));return{times:e,values:s}}sampleCurveValue(t,e,n){let s=t.times,r=t.values;if(e<=s[0])return r[0];if(e>=s[s.length-1])return r[r.length-1];for(let o=0;o<s.length-1;o++)if(e>=s[o]&&e<=s[o+1]){if(s[o]===e)return r[o];let a=(e-s[o])/(s[o+1]-s[o]);return r[o]*(1-a)+r[o+1]*a}return n}interpolateRotations(t,e,n,s){let r=[],o=[];r.push(t.times[0]),o.push(We.degToRad(t.values[0])),o.push(We.degToRad(e.values[0])),o.push(We.degToRad(n.values[0]));for(let a=1;a<t.values.length;a++){let l=[t.values[a-1],e.values[a-1],n.values[a-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;let c=l.map(We.degToRad),h=[t.values[a],e.values[a],n.values[a]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;let u=h.map(We.degToRad),f=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],d=[Math.abs(f[0]),Math.abs(f[1]),Math.abs(f[2])];if(d[0]>=180||d[1]>=180||d[2]>=180){let x=Math.max(...d)/180,m=new Ce(...c,s),g=new Ce(...u,s),_=new _e().setFromEuler(m),w=new _e().setFromEuler(g);_.dot(w)<0&&w.set(-w.x,-w.y,-w.z,-w.w);let M=t.times[a-1],A=t.times[a]-M,E=new _e,y=new Ce;for(let b=0;b<1;b+=1/x)E.copy(_.clone().slerp(w.clone(),b)),r.push(M+b*A),y.setFromQuaternion(E,s),o.push(y.x),o.push(y.y),o.push(y.z)}else r.push(t.times[a]),o.push(We.degToRad(t.values[a])),o.push(We.degToRad(e.values[a])),o.push(We.degToRad(n.values[a]))}return[r,o]}},nu=class{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(t){this.nodeStack.push(t),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(t,e){this.currentProp=t,this.currentPropName=e}parse(t){this.currentIndent=0,this.allNodes=new kl,this.nodeStack=[],this.currentProp=[],this.currentPropName="";let e=this,n=t.split(/[\r\n]+/);return n.forEach(function(s,r){let o=s.match(/^[\s\t]*;/),a=s.match(/^[\s\t]*$/);if(o||a)return;let l=s.match("^\\t{"+e.currentIndent+"}(\\w+):(.*){",""),c=s.match("^\\t{"+e.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=s.match("^\\t{"+(e.currentIndent-1)+"}}");l?e.parseNodeBegin(s,l):c?e.parseNodeProperty(s,c,n[++r]):h?e.popStack():s.match(/^[^\s\t}]/)&&e.parseNodePropertyContinued(s)}),this.allNodes}parseNodeBegin(t,e){let n=e[1].trim().replace(/^"/,"").replace(/"$/,""),s=e[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),r={name:n},o=this.parseNodeAttr(s),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,r):n in a?(n==="PoseNode"?a.PoseNode.push(r):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),o.id!==""&&(a[n][o.id]=r)):typeof o.id=="number"?(a[n]={},a[n][o.id]=r):n!=="Properties70"&&(n==="PoseNode"?a[n]=[r]:a[n]=r),typeof o.id=="number"&&(r.id=o.id),o.name!==""&&(r.attrName=o.name),o.type!==""&&(r.attrType=o.type),this.pushStack(r)}parseNodeAttr(t){let e=t[0];t[0]!==""&&(e=parseInt(t[0]),isNaN(e)&&(e=t[0]));let n="",s="";return t.length>1&&(n=t[1].replace(/^(\w+)::/,""),s=t[2]),{id:e,name:n,type:s}}parseNodeProperty(t,e,n){let s=e[1].replace(/^"/,"").replace(/"$/,"").trim(),r=e[2].replace(/^"/,"").replace(/"$/,"").trim();s==="Content"&&r===","&&(r=n.replace(/"/g,"").replace(/,$/,"").trim());let o=this.getCurrentNode();if(o.name==="Properties70"){this.parseNodeSpecialProperty(t,s,r);return}if(s==="C"){let l=r.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]),u=r.split(",").slice(3);u=u.map(function(f){return f.trim().replace(/^"/,"")}),s="connections",r=[c,h],ES(r,u),o[s]===void 0&&(o[s]=[])}s==="Node"&&(o.id=r),s in o&&Array.isArray(o[s])?o[s].push(r):s!=="a"?o[s]=r:o.a=r,this.setCurrentProp(o,s),s==="a"&&r.slice(-1)!==","&&(o.a=Kh(r))}parseNodePropertyContinued(t){let e=this.getCurrentNode();e.a+=t,t.slice(-1)!==","&&(e.a=Kh(e.a))}parseNodeSpecialProperty(t,e,n){let s=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),r=s[0],o=s[1],a=s[2],l=s[3],c=s[4];switch(o){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=Kh(c);break}this.getPrevNode()[r]={type:o,type2:a,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),r)}},iu=class{parse(t){let e=new Bl(t);e.skip(23);let n=e.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);let s=new kl;for(;!this.endOfContent(e);){let r=this.parseNode(e,n);r!==null&&s.add(r.name,r)}return s}endOfContent(t){return t.size()%16===0?(t.getOffset()+160+16&-16)>=t.size():t.getOffset()+160+16>=t.size()}parseNode(t,e){let n={},s=e>=7500?t.getUint64():t.getUint32(),r=e>=7500?t.getUint64():t.getUint32();e>=7500?t.getUint64():t.getUint32();let o=t.getUint8(),a=t.getString(o);if(s===0)return null;let l=[];for(let f=0;f<r;f++)l.push(this.parseProperty(t));let c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",u=l.length>2?l[2]:"";for(n.singleProperty=r===1&&t.getOffset()===s;s>t.getOffset();){let f=this.parseNode(t,e);f!==null&&this.parseSubNode(a,n,f)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),u!==""&&(n.attrType=u),a!==""&&(n.name=a),n}parseSubNode(t,e,n){if(n.singleProperty===!0){let s=n.propertyList[0];Array.isArray(s)?(e[n.name]=n,n.a=s):e[n.name]=s}else if(t==="Connections"&&n.name==="C"){let s=[];n.propertyList.forEach(function(r,o){o!==0&&s.push(r)}),e.connections===void 0&&(e.connections=[]),e.connections.push(s)}else if(n.name==="Properties70")Object.keys(n).forEach(function(r){e[r]=n[r]});else if(t==="Properties70"&&n.name==="P"){let s=n.propertyList[0],r=n.propertyList[1],o=n.propertyList[2],a=n.propertyList[3],l;s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),r==="Color"||r==="ColorRGB"||r==="Vector"||r==="Vector3D"||r.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],e[s]={type:r,type2:o,flag:a,value:l}}else e[n.name]===void 0?typeof n.id=="number"?(e[n.name]={},e[n.name][n.id]=n):e[n.name]=n:n.name==="PoseNode"?(Array.isArray(e[n.name])||(e[n.name]=[e[n.name]]),e[n.name].push(n)):e[n.name][n.id]===void 0&&(e[n.name][n.id]=n)}parseProperty(t){let e=t.getString(1),n;switch(e){case"C":return t.getBoolean();case"D":return t.getFloat64();case"F":return t.getFloat32();case"I":return t.getInt32();case"L":return t.getInt64();case"R":return n=t.getUint32(),t.getArrayBuffer(n);case"S":return n=t.getUint32(),t.getString(n);case"Y":return t.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":let s=t.getUint32(),r=t.getUint32(),o=t.getUint32();if(r===0)switch(e){case"b":case"c":return t.getBooleanArray(s);case"d":return t.getFloat64Array(s);case"f":return t.getFloat32Array(s);case"i":return t.getInt32Array(s);case"l":return t.getInt64Array(s)}let a=vp(new Uint8Array(t.getArrayBuffer(o))),l=new Bl(a.buffer);switch(e){case"b":case"c":return l.getBooleanArray(s);case"d":return l.getFloat64Array(s);case"f":return l.getFloat32Array(s);case"i":return l.getInt32Array(s);case"l":return l.getInt64Array(s)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+e)}}},Bl=class{constructor(t,e){this.dv=new DataView(t),this.offset=0,this.littleEndian=e!==void 0?e:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(t){this.offset+=t}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(t){let e=[];for(let n=0;n<t;n++)e.push(this.getBoolean());return e}getUint8(){let t=this.dv.getUint8(this.offset);return this.offset+=1,t}getInt16(){let t=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}getInt32(){let t=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}getInt32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt32());return e}getUint32(){let t=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}getInt64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e&2147483648?(e=~e&4294967295,t=~t&4294967295,t===4294967295&&(e=e+1&4294967295),t=t+1&4294967295,-(e*4294967296+t)):e*4294967296+t}getInt64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt64());return e}getUint64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e*4294967296+t}getFloat32(){let t=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}getFloat32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat32());return e}getFloat64(){let t=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}getFloat64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat64());return e}getArrayBuffer(t){let e=this.dv.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e}getString(t){let e=this.offset,n=new Uint8Array(this.dv.buffer,e,t);this.skip(t);let s=n.indexOf(0);return s>=0&&(n=new Uint8Array(this.dv.buffer,e,s)),this._textDecoder.decode(n)}},kl=class{add(t,e){this[t]=e}};function MS(i){let t="Kaydara FBX Binary  \0";return i.byteLength>=t.length&&t===Ep(i,0,t.length)}function bS(i){let t=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"],e=0;function n(s){let r=i[s-1];return i=i.slice(e+s),e++,r}for(let s=0;s<t.length;++s)if(n(1)===t[s])return!1;return!0}function bp(i){let t=/FBXVersion: (\d+)/,e=i.match(t);if(e)return parseInt(e[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function jh(i){return i/46186158e3}var wS=[];function Ul(i,t,e,n){let s;switch(n.mappingType){case"ByPolygonVertex":s=i;break;case"ByPolygon":s=t;break;case"ByVertice":s=e;break;case"AllSame":s=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(s=n.indices[s]);let r=s*n.dataSize,o=r+n.dataSize;return TS(wS,n.buffer,r,o)}var Zh=new Ce,fr=new F;function wp(i){let t=new wt,e=new wt,n=new wt,s=new wt,r=new wt,o=new wt,a=new wt,l=new wt,c=new wt,h=new wt,u=new wt,f=new wt,d=i.inheritType?i.inheritType:0;i.translation&&t.setPosition(fr.fromArray(i.translation));let p=Eo(0);if(i.preRotation){let L=i.preRotation.map(We.degToRad);L.push(p),e.makeRotationFromEuler(Zh.fromArray(L))}if(i.rotation){let L=i.rotation.map(We.degToRad);L.push(i.eulerOrder||p),n.makeRotationFromEuler(Zh.fromArray(L))}if(i.postRotation){let L=i.postRotation.map(We.degToRad);L.push(p),s.makeRotationFromEuler(Zh.fromArray(L)),s.invert()}i.scale&&r.scale(fr.fromArray(i.scale)),i.scalingOffset&&a.setPosition(fr.fromArray(i.scalingOffset)),i.scalingPivot&&o.setPosition(fr.fromArray(i.scalingPivot)),i.rotationOffset&&l.setPosition(fr.fromArray(i.rotationOffset)),i.rotationPivot&&c.setPosition(fr.fromArray(i.rotationPivot)),i.parentMatrixWorld&&(u.copy(i.parentMatrix),h.copy(i.parentMatrixWorld));let x=e.clone().multiply(n).multiply(s),m=new wt;m.extractRotation(h);let g=new wt;g.copyPosition(h);let _=g.clone().invert().multiply(h),w=m.clone().invert().multiply(_),M=r,A=new wt;if(d===0)A.copy(m).multiply(x).multiply(w).multiply(M);else if(d===1)A.copy(m).multiply(w).multiply(x).multiply(M);else{let U=new wt().scale(new F().setFromMatrixScale(u)).clone().invert(),z=w.clone().multiply(U);A.copy(m).multiply(x).multiply(z).multiply(M)}let E=c.clone().invert(),y=o.clone().invert(),b=t.clone().multiply(l).multiply(c).multiply(e).multiply(n).multiply(s).multiply(E).multiply(a).multiply(o).multiply(r).multiply(y),I=new wt().copyPosition(b),R=h.clone().multiply(I);return f.copyPosition(R),b=f.clone().multiply(A),b.premultiply(h.invert()),b}function Eo(i){i=i||0;let t=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return i===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),t[0]):t[i]}function Kh(i){return i.split(",").map(function(e){return parseFloat(e)})}function Ep(i,t,e){return t===void 0&&(t=0),e===void 0&&(e=i.byteLength),new TextDecoder().decode(new Uint8Array(i,t,e))}function ES(i,t){for(let e=0,n=i.length,s=t.length;e<s;e++,n++)i[n]=t[e]}function TS(i,t,e,n){for(let s=e,r=0;s<n;s++,r++)i[r]=t[s];return i}Pt();function xs(i,t,e){return{x:i,y:t,z:-e}}function Tp(i){return{x:i.x,y:i.y,z:-i.z}}var To="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function AS(i,t){let e="",n=t*2,s=r=>{let o=i[r>>1]&65535;return(r&1)===0?o&255:o>>8};for(let r=0;r<n;r+=3){let o=s(r),a=r+1<n?s(r+1):0,l=r+2<n?s(r+2):0;e+=To.charAt(o>>2)+To.charAt((o&3)<<4|a>>4),e+=r+1<n?To.charAt((a&15)<<2|l>>6):"=",e+=r+2<n?To.charAt(l&63):"="}return e}function RS(i){let t=i.length;for(;t>0&&i.charAt(t-1)==="=";)t--;let e=Math.floor(t*3/4),n=new Int16Array(e>>1),s=0,r=0,o=0,a=0;for(let l=0;l<t;l++){let c=To.indexOf(i.charAt(l));if(!(c<0)&&(s=s<<6|c,r+=6,r>=8)){r-=8;let h=s>>r&255;if((o&1)===0)a=h;else{let u=a|h<<8;n[o>>1]=u>=32768?u-65536:u}o++}}return n}var Se=(i,t)=>Math.sqrt((i.x-t.x)*(i.x-t.x)+(i.z-t.z)*(i.z-t.z)),dr=class dr{constructor(t,e){W(this,"host",t);W(this,"deviceName",e);W(this,"walkSpeed",.9);W(this,"turnSpeed",3.5);W(this,"userDistance",1.2);W(this,"micMuted",!1);W(this,"wander",!1);W(this,"idleFor",0);W(this,"wanderAfter",6);W(this,"wanderOut",!0);W(this,"objects",[]);W(this,"avatar",{pos:{x:0,y:0,z:0},yaw:0,state:"idle",speed01:0,gesture:""});W(this,"connected",!1);W(this,"brain","-");W(this,"lastAction","");W(this,"lastTranscript","");W(this,"lastError","");W(this,"speakingFor",0);W(this,"placed",!1);W(this,"clock",0);W(this,"nextWorld",0);W(this,"counters",{});W(this,"goal",null);W(this,"face",null);W(this,"goalTarget","");W(this,"pendingGesture","");W(this,"route",[]);W(this,"planned",[]);W(this,"following",!1);W(this,"done",null);W(this,"stuckFor",0);W(this,"bestDistance",0);W(this,"sideBias",0);W(this,"sideBiasFor",0);W(this,"mic",new Int16Array(dr.AUDIO_RATE/1e3*60));W(this,"micCount",0);W(this,"micPos",0);W(this,"canSee",!1);W(this,"autoLook",0);W(this,"lookIn",3);W(this,"lookSeq",0);W(this,"looking",null);W(this,"lastViewAt",-100);W(this,"personalSpace",.65);W(this,"status","idle")}onOpen(){this.connected=!0,this.lastError="",this.announce(),this.nextWorld=0}announce(){this.sendJson({type:"hello",protocol:1,device:this.deviceName,capabilities:{vision:this.canSee,navmesh:!1}})}look(t){let e=this.canSee&&this.host.captureView?this.host.captureView():null;if(!e)return t&&t(!1,"the camera is not available right now; ask the user to look at things and name them"),!1;this.looking&&this.looking.reply&&this.looking.reply(!1,"superseded by a newer look");let n="look"+ ++this.lookSeq;return this.looking={id:n,locate:e.locate,reply:t,until:this.clock+25},this.sendJson({type:"frame",id:n,jpeg:e.jpeg}),!0}sawThings(t){let e=this.looking;if(!e||t.frameId!==e.id)return;if(this.looking=null,t.error){e.reply&&e.reply(!1,"recognition failed: "+t.error);return}let n=[],s=0,r=t.items||[];for(let o=0;o<r.length;o++){let a=e.locate(Number(r[o].x),Number(r[o].y));if(!a){s++;continue}let l=!1;for(let h=0;h<this.objects.length;h++)this.objects[h].source!=="detected"&&Se(this.objects[h].pos,a)<.6&&(l=!0);if(l)continue;let c=this.register(String(r[o].label),a,"detected");c.confidence=Number(r[o].confidence)||.5,n.push(c.id)}this.nextWorld=0,e.reply&&e.reply(!0,"",{seen:n,could_not_place:s,note:"Positions are estimated from the camera view and are approximate."})}onClose(){this.connected=!1,this.brain="-"}onMessage(t){let e;try{e=JSON.parse(t)}catch{return}switch(e.type){case"ready":this.brain=String(e.brain);break;case"audio":{let n=RS(String(e.pcm16));this.speakingFor+=n.length/dr.AUDIO_RATE,this.host.playAudio(n);break}case"audio_stop":this.speakingFor=0,this.host.stopAudio();break;case"action":this.handleAction(e);break;case"detections":this.sawThings(e);break;case"state":if((e.status==="listening"||e.status==="speaking")&&this.attend(),e.status==="listening"&&this.canSee&&this.host.captureView&&this.clock-this.lastViewAt>4){let n=this.host.captureView();n&&(this.lastViewAt=this.clock,this.sendJson({type:"view",jpeg:n.jpeg}))}e.status!=="idle"&&(this.idleFor=0),this.status=String(e.status);break;case"transcript":this.lastTranscript=(e.role==="user"?"You: ":"Sim: ")+String(e.text);break;case"log":this.lastError=String(e.message),this.host.log("[backend "+e.level+"] "+e.message);break}}sendJson(t){this.connected&&this.host.send(JSON.stringify(t))}interrupt(){this.speakingFor=0,this.host.stopAudio(),this.sendJson({type:"interrupt"})}pushMic(t,e,n){let s=n/dr.AUDIO_RATE;for(;this.micPos<e;){let r=Math.floor(this.micPos),o=t[r],a=r+1<e?t[r+1]:o,l=o+(a-o)*(this.micPos-r);this.micMuted&&(l=0),l=l<-1?-1:l>1?1:l,this.mic[this.micCount++]=Math.round(l*32767),this.micCount===this.mic.length&&(this.sendJson({type:"audio",pcm16:AS(this.mic,this.micCount)}),this.micCount=0),this.micPos+=s}this.micPos-=e}find(t){let e=String(t||"").toLowerCase();for(let n=0;n<this.objects.length;n++)if(this.objects[n].id.toLowerCase()===e)return this.objects[n];return null}register(t,e,n){t=String(t||"object").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"object";for(let r=0;r<this.objects.length;r++){let o=this.objects[r];if(o.label===t&&Se(o.pos,e)<.75)return o.seenAt=this.clock,o}this.counters[t]=(this.counters[t]||0)+1;let s={id:t+"_"+this.counters[t],label:t,pos:e,size:{x:.5,y:.5,z:.5},source:n,confidence:1,seenAt:this.clock};return this.objects.push(s),s}upsert(t,e,n,s,r){let o=this.find(t);return o||(o={id:t,label:e,pos:n,size:s,source:r,confidence:1,seenAt:this.clock},this.objects.push(o)),o.label=e,o.pos=n,o.size=s,o.seenAt=this.clock,o}prune(t,e){for(let n=this.objects.length-1;n>=0;n--)this.objects[n].source===t&&e.indexOf(this.objects[n].id)<0&&this.objects.splice(n,1)}sendText(t){this.sendJson({type:"text",text:t})}placeInFrontOfUser(t){let e=this.host.floorY();if(e===null)return!1;let n=this.host.headPosition(),s=this.host.headForward(),r=Math.sqrt(s.x*s.x+s.z*s.z)||1,o=Math.atan2(s.x/r,s.z/r),a={x:n.x,y:e,z:n.z},l=[t,t*.75,t*1.3,1];for(let c=0;c<l.length;c++)for(let h=0;h<9;h++){let u=o+Math.ceil(h/2)*.44*(h%2===0?-1:1),f={x:a.x+Math.sin(u)*l[c],y:e,z:a.z+Math.cos(u)*l[c]};if(!(!this.host.isFloor(f)||!this.clearLine(a,f,!0)))return this.avatar.pos=f,this.avatar.yaw=Math.atan2(a.x-f.x,a.z-f.z),this.placed=!0,!0}return!1}userFloor(){let t=this.host.headPosition(),e=this.host.floorY();return{x:t.x,y:e===null?this.avatar.pos.y:e,z:t.z}}walkable(t){if(!this.host.isFloor(t))return!1;let e=this.host.headPosition(),n=Se(t,e);return n>this.personalSpace||n>Se(this.avatar.pos,e)+.001}clearLine(t,e,n){let s=Math.max(1,Math.ceil(Se(t,e)/.25));for(let r=1;r<=s;r++){let o=r/s,a={x:t.x+(e.x-t.x)*o,y:t.y,z:t.z+(e.z-t.z)*o};if(n?!this.host.isFloor(a):!this.walkable(a))return!1}return!0}planPath(t,e){if(this.clearLine(t,e))return[e];let n=.2,s=60,r=(E,y)=>(E+s)*(2*s+1)+(y+s),o=(E,y)=>({x:t.x+E*n,y:t.y,z:t.z+y*n}),a=Math.round((e.x-t.x)/n),l=Math.round((e.z-t.z)/n);if(Math.abs(a)>s||Math.abs(l)>s)return null;let c={},h=(E,y)=>{if(Math.abs(E)>s||Math.abs(y)>s)return!1;let b=r(E,y);return c[b]===void 0&&(c[b]=E===0&&y===0||this.walkable(o(E,y))),c[b]};if(!h(a,l))return null;let u=[[0,0,0,0]],f={},d={};f[r(0,0)]=0;let p=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],x=!1;for(let E=0;E<6e3&&u.length>0;E++){let y=0;for(let I=1;I<u.length;I++)u[I][3]<u[y][3]&&(y=I);let b=u.splice(y,1)[0];if(b[0]===a&&b[1]===l){x=!0;break}if(!(b[2]>f[r(b[0],b[1])]))for(let I=0;I<p.length;I++){let R=b[0]+p[I][0],L=b[1]+p[I][1];if(!h(R,L)||p[I][0]!==0&&p[I][1]!==0&&(!h(b[0]+p[I][0],b[1])||!h(b[0],b[1]+p[I][1])))continue;let U=b[2]+(p[I][0]!==0&&p[I][1]!==0?1.414:1),z=r(R,L);if(f[z]!==void 0&&f[z]<=U)continue;f[z]=U,d[z]=[b[0],b[1]];let P=Math.abs(a-R),H=Math.abs(l-L);u.push([R,L,U,U+Math.max(P,H)+.414*Math.min(P,H)])}}if(!x)return null;let m=[],g=a,_=l;for(;!(g===0&&_===0);){m.unshift(o(g,_));let E=d[r(g,_)];g=E[0],_=E[1]}m[m.length-1]=e;let w=[],M=t,A=0;for(;A<m.length;){let E=A;for(let y=m.length-1;y>A;y--)if(this.clearLine(M,m[y])){E=y;break}w.push(m[E]),M=m[E],A=E+1}return w}standPoint(t,e){let n=this.avatar.pos,s=Math.atan2(n.x-t.x,n.z-t.z),r=[e,e+.3,e+.7];for(let o=0;o<r.length;o++)for(let a=0;a<12;a++){let l=s+Math.ceil(a/2)*(Math.PI/6)*(a%2===0?-1:1),c={x:t.x+Math.sin(l)*r[o],y:n.y,z:t.z+Math.cos(l)*r[o]};if(!this.walkable(c))continue;let h=this.planPath(n,c);if(h!==null)return this.planned=h,c}return null}resolve(t){if(String(t).toLowerCase()==="user")return{pos:this.userFloor(),standOff:this.userDistance};let e=this.find(t);if(!e)return null;let n=Math.max(e.size.x,e.size.z)/2+.45;return{pos:e.pos,standOff:Math.min(2,Math.max(.6,n))}}attend(){this.done||this.following||!this.placed||(this.goal=this.avatar.pos,this.route=[],this.face=this.userFloor(),this.goalTarget="",this.idleFor=0)}startStroll(){this.idleFor=0,this.wanderAfter=6+Math.random()*8;let t=this.userFloor(),e=this.avatar.pos,n=null,s=t;if(this.wanderOut){let r=[];for(let o=0;o<this.objects.length;o++)Se(this.objects[o].pos,t)<3.5&&Se(this.objects[o].pos,e)>1.2&&r.push(this.objects[o]);if(r.length>0&&Math.random()<.7){let o=r[Math.floor(Math.random()*r.length)],a=this.resolve(o.id);a&&(n=this.standPoint(a.pos,a.standOff)),n&&(s=o.pos)}for(let o=0;!n&&o<6;o++){let a=Math.random()*Math.PI*2,l=1.5+Math.random()*1.3,c={x:t.x+Math.sin(a)*l,y:e.y,z:t.z+Math.cos(a)*l};if(Se(c,e)<.8||!this.walkable(c))continue;let h=this.planPath(e,c);h&&(this.planned=h,n=c)}}else Se(e,t)>this.userDistance+.8&&(n=this.standPoint(t,this.userDistance+.3));this.wanderOut=!this.wanderOut,n&&(this.goal=this.planned[0],this.route=this.planned.slice(1),this.face=s,this.goalTarget="",this.stuckFor=0,this.bestDistance=Se(e,this.goal),this.sideBias=0)}finish(t,e){let n=this.done;this.goal=null,this.route=[],this.face=null,this.done=null,this.goalTarget="",this.avatar.state=this.following?"following":"idle",n&&n(t,e)}handleAction(t){let e=String(t.id),n=String(t.action||""),s=n==="approach_user"?"user":String(t.target_id||""),r=(a,l,c)=>{this.lastAction=n+(s?" "+s:"")+(a?" ok":" FAILED: "+l);let h={type:"action_result",id:e,status:a?"succeeded":"failed"};!a&&l&&(h.reason=l),c&&(h.data=c),this.sendJson(h)},o=a=>this.sendJson({type:"event",name:"action_started",data:{id:e,plan_ms:0,path_m:Math.round(a*10)/10}});if(this.lastAction=n+(s?" "+s:"")+" ...",n==="walk_to"||n==="inspect_object"||n==="approach_user"){if(!this.placed)return r(!1,"the floor has not been found yet; ask the user to look at the floor");let a=this.resolve(s);if(!a)return r(!1,"unknown target '"+s+"'");this.done&&this.finish(!1,"superseded by a newer action"),this.following=!1;let l=Se(this.avatar.pos,a.pos)<=a.standOff+.25,c=l?this.avatar.pos:this.standPoint(a.pos,a.standOff);if(!c)return r(!1,"there is no reachable floor next to "+s);this.route=l?[]:this.planned.slice(1),this.goal=l?c:this.planned[0],this.face=a.pos,this.goalTarget=s,this.stuckFor=0,this.bestDistance=Se(this.avatar.pos,c),this.sideBias=0,this.avatar.state="turning",o(Se(this.avatar.pos,c)),this.done=(h,u)=>r(h,u,{metres_from_target:Math.round(Se(this.avatar.pos,this.resolveOr(s,a.pos))*10)/10});return}if(n==="look_at"){let a=this.resolve(s);if(!a)return r(!1,"unknown target '"+s+"'");this.done&&this.finish(!1,"superseded by a newer action"),this.goal=this.avatar.pos,this.route=[],this.face=a.pos,this.avatar.state="turning",this.done=(l,c)=>r(l,c);return}if(n==="follow_user")return this.placed?(this.done&&this.finish(!1,"superseded by a newer action"),this.following=!0,this.avatar.state="following",o(0),r(!0,"",{following:!0})):r(!1,"the floor has not been found yet");if(n==="stop")return this.following=!1,this.done&&this.finish(!1,"stopped"),this.avatar.state="idle",r(!0,"");if(n==="gesture"){let a=String(t.params&&t.params.type||"");return["wave","nod","shake_head","shrug"].indexOf(a)<0?r(!1,"unknown gesture '"+a+"'"):(this.pendingGesture=a,r(!0,""))}if(n==="register_marker"){let a=String(t.params&&t.params.label||"");if(!a)return r(!1,"a label is required");let l=this.host.pointerHit();if(!l)return r(!1,"could not tell where the user is looking; ask them to look at the object or the floor beside it");let c=this.register(a,l,"manual");return this.nextWorld=0,r(!0,"",{id:c.id,label:c.label,origin:"registered by the user, not camera-detected"})}if(n==="scan_surroundings"){this.look(r);return}r(!1,"this device does not implement action '"+n+"'")}resolveOr(t,e){let n=this.resolve(t);return n?n.pos:e}turnToward(t,e){let n=Math.atan2(t.x-this.avatar.pos.x,t.z-this.avatar.pos.z),s=Math.atan2(Math.sin(n-this.avatar.yaw),Math.cos(n-this.avatar.yaw)),r=Math.min(Math.abs(s),this.turnSpeed*e);return this.avatar.yaw+=s<0?-r:r,s=Math.atan2(Math.sin(n-this.avatar.yaw),Math.cos(n-this.avatar.yaw)),Math.abs(s)}stepToward(t,e,n){let s=Math.atan2(t.x-this.avatar.pos.x,t.z-this.avatar.pos.z);this.sideBiasFor=Math.max(0,this.sideBiasFor-n),this.sideBiasFor===0&&(this.sideBias=0);let r=this.sideBias>0?[0,.6,1.2,1.6]:this.sideBias<0?[0,-.6,-1.2,-1.6]:[0,.6,-.6,1.2,-1.2,1.6,-1.6];for(let o=0;o<r.length;o++){let a=s+r[o],l={x:this.avatar.pos.x+Math.sin(a)*.3,y:this.avatar.pos.y,z:this.avatar.pos.z+Math.cos(a)*.3},c={x:this.avatar.pos.x+Math.sin(a)*e,y:this.avatar.pos.y,z:this.avatar.pos.z+Math.cos(a)*e};if(!this.walkable(c)||!this.walkable(l))continue;r[o]!==0&&(this.sideBias=r[o]>0?1:-1,this.sideBiasFor=1.5);let h=Math.atan2(Math.sin(a-this.avatar.yaw),Math.cos(a-this.avatar.yaw)),u=Math.min(Math.abs(h),this.turnSpeed*n);return this.avatar.yaw+=h<0?-u:u,this.avatar.pos=c,e}return 0}update(t){this.clock+=t,this.avatar.gesture=this.pendingGesture,this.pendingGesture="",this.speakingFor>0&&(this.speakingFor=Math.max(0,this.speakingFor-t));let e=0,n=this.host.floorY();if(n!==null&&this.placed&&(this.avatar.pos.y=n),this.goal&&this.face){if(this.goalTarget==="user"){let r=this.userFloor();if(Se(r,this.face)>.3){this.face=r;let o=Se(this.avatar.pos,r)<=this.userDistance+.25?this.avatar.pos:this.standPoint(r,this.userDistance);o===this.avatar.pos?(this.goal=o,this.route=[]):o&&(this.goal=this.planned[0],this.route=this.planned.slice(1),this.bestDistance=Se(this.avatar.pos,this.goal))}}let s=Se(this.avatar.pos,this.goal);if(s>.04){let r=Math.atan2(this.goal.x-this.avatar.pos.x,this.goal.z-this.avatar.pos.z),o=Math.abs(Math.atan2(Math.sin(r-this.avatar.yaw),Math.cos(r-this.avatar.yaw)));if(this.avatar.state!=="walking"&&o>.4&&this.sideBias===0)this.turnToward(this.goal,t),this.avatar.state="turning";else{e=this.stepToward(this.goal,Math.min(s,this.walkSpeed*t),t),this.avatar.state="walking";let a=Se(this.avatar.pos,this.goal);a<this.bestDistance-.05?(this.bestDistance=a,this.stuckFor=0):(this.stuckFor+=t,this.stuckFor>(e>0?4:1)&&this.finish(!1,"the way became blocked"))}}else this.route.length>0?(this.goal=this.route.shift(),this.bestDistance=Se(this.avatar.pos,this.goal),this.stuckFor=0,this.sideBias=0):this.turnToward(this.face,t)<.06?this.finish(!0,""):this.avatar.state="turning"}else if(this.following){let s=this.userFloor(),r=Se(this.avatar.pos,s),o=r>this.userDistance+.5?0:this.turnToward(s,t);r>this.userDistance+.5&&(e=this.stepToward(s,Math.min(r-this.userDistance,this.walkSpeed*t),t)),this.avatar.state="following"}if(this.avatar.speed01=t>0?Math.min(1,e/t/this.walkSpeed):0,this.looking&&this.clock>this.looking.until&&(this.looking.reply&&this.looking.reply(!1,"recognition took too long"),this.looking=null),this.autoLook>0&&this.connected&&this.canSee&&!this.looking&&(this.lookIn-=t,this.lookIn<=0&&this.status==="idle"&&(this.lookIn=this.autoLook,this.look(null))),this.placed&&!this.goal&&!this.following){let s=this.userFloor(),r=Se(this.avatar.pos,s);if(r<this.personalSpace-.1&&r>.01){let o=(this.personalSpace+.35)/r,a={x:s.x+(this.avatar.pos.x-s.x)*o,y:this.avatar.pos.y,z:s.z+(this.avatar.pos.z-s.z)*o};this.host.isFloor(a)&&(this.goal=a,this.route=[],this.face=s,this.goalTarget="",this.stuckFor=0,this.bestDistance=Se(this.avatar.pos,a),this.sideBias=1,this.sideBiasFor=.5)}}this.wander&&this.placed&&!this.goal&&!this.following&&this.speakingFor<=0&&this.status==="idle"?(this.idleFor+=t,this.idleFor>this.wanderAfter&&this.startStroll()):(this.done||this.following||this.speakingFor>0)&&(this.idleFor=0),this.connected&&this.clock>=this.nextWorld&&(this.nextWorld=this.clock+.4,this.sendWorld())}sendWorld(){let t=o=>[Math.round(o.x*1e3)/1e3,Math.round(o.y*1e3)/1e3,Math.round(o.z*1e3)/1e3],e=this.host.floorY(),n=this.host.roomInfo?this.host.roomInfo():null,s=[];for(let o=0;o<this.objects.length;o++){let a=this.objects[o];s.push({id:a.id,label:a.label,pos:t(a.pos),size:t(a.size),source:a.source,confidence:a.confidence,lastSeen:Math.round((this.clock-a.seenAt)*10)/10,reachable:!0})}let r=this.avatar.state==="idle"&&this.speakingFor>0?"speaking":this.avatar.state;this.sendJson({type:"world",world:{user:{pos:t(this.host.headPosition()),fwd:t(this.host.headForward())},avatar:{pos:t(this.avatar.pos),fwd:t({x:Math.sin(this.avatar.yaw),y:0,z:Math.cos(this.avatar.yaw)}),state:r},objects:s,room:{source:e===null?"unknown":n?n.source:"surface_hit_test",floorY:e===null?0:Math.round(e*1e3)/1e3,obstacles:n?n.obstacles:0,navmesh:!1}}})}};W(dr,"AUDIO_RATE",24e3);var Ao=dr;Pt();Pt();Pt();var su=i=>"simulacra.file:"+i;function Ap(i){try{return localStorage.getItem(su(i))!==null}catch{return!1}}function Rp(i){let t=localStorage.getItem(su(i));if(t===null)throw new Error("not found: "+i);return t}function Cp(i,t){try{localStorage.setItem(su(i),String(t))}catch{}}Pt();function Ip(i){let t=String(i).lastIndexOf("/");return t<0?".":i.slice(0,t)}var Pp=()=>({objectNotes:{},skillStats:{},learnedSkills:{},episodes:[]}),zl=class{constructor(t){W(this,"path",t);W(this,"data",Pp());if(t&&Ap(t))try{this.data={...Pp(),...JSON.parse(Rp(t,"utf8"))}}catch(e){console.warn(`[memory] could not read ${t}, starting empty:`,e)}}save(){if(this.path)try{Ip(this.path),Cp(this.path,JSON.stringify(this.data,null,2))}catch(t){console.warn("[memory] save failed:",t)}}recordOutcome(t,e,n,s){var o;let r=(o=this.data.skillStats)[t]??(o[t]={ok:0,fail:0});n==="succeeded"?r.ok++:(r.fail++,r.lastFailReason=s),this.data.episodes.push({t:new Date().toISOString(),skill:t,target:e,status:n,reason:s}),this.data.episodes.length>200&&this.data.episodes.splice(0,this.data.episodes.length-200),this.save()}rememberObject(t,e,n){var r;let s=(r=this.data.objectNotes)[t]??(r[t]={label:e,notes:[],updatedAt:""});s.label=e,n&&!s.notes.includes(n)&&s.notes.push(n),s.notes.length>8&&s.notes.shift(),s.updatedAt=new Date().toISOString(),this.save()}notesFor(t){return this.data.objectNotes[t]?.notes??[]}saveSkill(t){let e=this.data.learnedSkills[t.name];this.data.learnedSkills[t.name]={...t,createdAt:e?.createdAt??new Date().toISOString(),uses:e?.uses??0,successes:e?.successes??0},this.save()}skillUsed(t,e){let n=this.data.learnedSkills[t];n&&(n.uses++,e&&n.successes++,this.save())}summary(){let t=[],e=Object.values(this.data.learnedSkills);if(e.length){t.push("Skills you composed earlier (call with run_skill):");for(let o of e)t.push(`- ${o.name}: ${o.description} [${o.steps.map(a=>`${a.skill}(${a.target??""})`).join(" -> ")}] worked ${o.successes}/${o.uses} times`)}let n=Object.entries(this.data.skillStats).filter(([,o])=>o.fail>0);if(n.length){t.push("Past failures to learn from:");for(let[o,a]of n)t.push(`- ${o}: failed ${a.fail}x (ok ${a.ok}x), last reason: ${a.lastFailReason??"unknown"}`)}let s=Object.entries(this.data.objectNotes).filter(([,o])=>o.notes.length);if(s.length){t.push("Notes you saved about things (ids may differ between sessions, match by label):");for(let[o,a]of s)t.push(`- ${o} (${a.label}): ${a.notes.join("; ")}`)}let r=this.data.episodes.slice(-5);if(r.length){t.push("Most recent actions:");for(let o of r)t.push(`- ${o.skill}(${o.target??""}) ${o.status}${o.reason?`: ${o.reason}`:""}`)}return t.length?t.join(`
`):"Nothing remembered yet."}};Pt();Pt();var Lp=new Set(["walk_to","approach_user","follow_user","inspect_object","look_at","gesture","scan_surroundings","run_sequence","run_skill","stop_moving","register_marker"]),Ro=`You are Sim, an embodied AI companion. You have a human body standing on the floor of the user's real room, seen through their AR headset. You hear the user by voice and you can walk around their room.

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

Stay at a comfortable distance and never walk into the user.`;function Dp(i,t){if(typeof t!="object"||t===null||Array.isArray(t))return"input must be a JSON object";for(let e of i.required??[])if(!(e in t))return`missing required field "${e}"`;for(let[e,n]of Object.entries(t)){let s=i.properties?.[e];if(s){if(s.type==="string"&&typeof n!="string")return`field "${e}" must be a string`;if(s.type==="array"&&!Array.isArray(n))return`field "${e}" must be an array`;if(s.enum&&!s.enum.includes(n))return`field "${e}" must be one of ${s.enum.join(", ")}`}}return null}Pt();var cn=(i={},t=[])=>({type:"object",properties:i,required:t,additionalProperties:!1}),Fp={type:"string",description:'An object id from the world state (like "chair_1"), or "user".'},vs=[{type:"function",name:"get_world_state",description:"Fresh snapshot of the room: where you and the user are, what the user is looking toward, and every known object with its id, origin and distance. Call before answering questions about the surroundings.",parameters:cn()},{type:"function",name:"look_at",description:"Turn your body to face an object or the user.",parameters:cn({target_id:Fp},["target_id"])},{type:"function",name:"walk_to",description:"Walk across the real floor to stand next to an object or the user. Returns immediately; the outcome arrives later as an [action_result].",parameters:cn({target_id:Fp},["target_id"])},{type:"function",name:"approach_user",description:"Walk over to the user and stop at a comfortable conversational distance, facing them. Outcome arrives later as an [action_result].",parameters:cn()},{type:"function",name:"inspect_object",description:"Walk up to an object, face it, and get everything known about it including your saved notes. Outcome arrives later as an [action_result].",parameters:cn({id:{type:"string",description:"Object id from the world state."}},["id"])},{type:"function",name:"remember_object",description:"Save a short note about an object to long-term memory (kept across sessions).",parameters:cn({id:{type:"string"},note:{type:"string",description:"One short factual sentence."}},["id","note"])},{type:"function",name:"scan_surroundings",description:"Look through the headset camera (the user's current view) and detect real objects. New objects appear in the world state. Outcome arrives later as an [action_result].",parameters:cn()},{type:"function",name:"register_marker",description:'Register the spot the user is pointing or looking at as a named object, when the user tells you what something is ("this is my desk"). It is stored as registered-by-user, never as camera-detected.',parameters:cn({label:{type:"string",description:'Lowercase singular noun, e.g. "chair".'}},["label"])},{type:"function",name:"follow_user",description:"Keep following the user around at a comfortable distance until told to stop or given another movement. The body handles the walking by itself.",parameters:cn()},{type:"function",name:"gesture",description:"Make a body gesture.",parameters:cn({type:{type:"string",enum:["wave","nod","shake_head","shrug"]}},["type"])},{type:"function",name:"stop_moving",description:"Stop walking or following immediately.",parameters:cn()},{type:"function",name:"run_sequence",description:'Run several primitive skills one after another in a single go, without checking back in between (use this for multi-step requests such as "go to the table, then come back"). If save_as is given and every step succeeds, the sequence is stored as a reusable skill; when all its steps concern one object, it is stored generically and can later be run on any object with run_skill. Outcome arrives later as an [action_result].',parameters:cn({steps:{type:"array",items:cn({skill:{type:"string",enum:["walk_to","look_at","approach_user","inspect_object","scan_surroundings","gesture"]},target:{type:"string",description:'Object id, "user", or for gesture the gesture type.'}},["skill"])},save_as:{type:"string",description:"Optional snake_case name to remember this sequence under if it works."}},["steps"])},{type:"function",name:"run_skill",description:"Run a skill you saved earlier (run_sequence with save_as). Outcome arrives later as an [action_result].",parameters:cn({name:{type:"string"},target_id:{type:"string",description:'Replaces "$target" in the skill steps.'}},["name"])}],CS=45e3,Vl=8e3,Np=new Set(["walk_to","look_at","approach_user","inspect_object","scan_surroundings","gesture"]),Up=new Set(["wave","nod","shake_head","shrug"]),Gl=class{constructor(t,e,n){W(this,"device",t);W(this,"world",e);W(this,"memory",n);W(this,"onFeedback",()=>{});W(this,"runToken",0);W(this,"recentFailures",new Map)}async execute(t,e){if(e){e={...e};for(let n of["target_id","id"])typeof e[n]=="string"&&(e[n]=this.world.resolveId(e[n])??e[n])}try{switch(t){case"get_world_state":return{status:"ok",...this.world.describe()};case"look_at":return await this.runPrimitive("look_at",e.target_id);case"walk_to":case"approach_user":case"inspect_object":case"scan_surroundings":{let n=t==="inspect_object"?e.id:t==="walk_to"?e.target_id:void 0,s=this.validate(t,n);return s?this.fail(t,n,s):(this.background(t,n,()=>this.runPrimitive(t,n)),{status:"started",note:"In progress. Say a brief acknowledgement now; the outcome will arrive as an [action_result]."})}case"remember_object":{let n=this.world.find(e.id);return n?(this.memory.rememberObject(n.id,n.label,String(e.note??"")),{status:"succeeded",remembered:{id:n.id,note:e.note}}):this.fail(t,e.id,this.unknownTarget(e.id))}case"register_marker":{let n=String(e.label??"").trim().toLowerCase();if(!n)return{status:"failed",reason:"label is required"};let s=await this.device.request("register_marker",void 0,{label:n},Vl);return this.memory.recordOutcome(t,n,s.status,s.reason),{status:s.status,reason:s.reason,...s.data}}case"follow_user":{if(!this.world.snapshot)return this.fail(t,void 0,"The headset has not sent any world data yet.");this.runToken++;let n=await this.device.request("follow_user",void 0,void 0,Vl);return this.memory.recordOutcome(t,void 0,n.status,n.reason),{status:n.status,skill:t,reason:n.reason,...n.data}}case"gesture":return await this.runPrimitive("gesture",String(e.type??""));case"run_sequence":return this.runSequence(e);case"stop_moving":{this.runToken++;let n=await this.device.request("stop",void 0,void 0,Vl);return{status:n.status,reason:n.reason}}case"run_skill":return this.runSkill(e);default:return{status:"failed",reason:`Unknown skill "${t}". Available: ${vs.map(n=>n.name).join(", ")}`}}}catch(n){return this.fail(t,e?.target_id??e?.id,`internal error: ${n?.message??n}`)}}unknownTarget(t){let e=this.world.objects.map(n=>n.id);return`No object with id "${t}". Known ids: ${e.length?e.join(", "):"(none yet)"}, or "user". Try scan_surroundings or ask the user to point at it and use register_marker.`}record(t,e,n,s){let r=`${t}:${e??""}`;if(n==="succeeded")this.recentFailures.delete(r);else{let o=this.recentFailures.get(r),a=o&&Date.now()-o.at<3e4;this.recentFailures.set(r,{count:a?o.count+1:1,at:Date.now(),reason:s})}this.memory.recordOutcome(t,e,n,s)}validate(t,e){let n=this.recentFailures.get(`${t}:${e??""}`);return n&&n.count>=2&&Date.now()-n.at<3e4?`This exact action has just failed ${n.count} times in a row (${n.reason??"no reason given"}). Do not try it again now; tell the user and suggest something else.`:this.world.snapshot?t==="scan_surroundings"?this.device.capabilities.vision?null:"This headset has no camera access for object detection. Ask the user to point at things and use register_marker instead.":t==="approach_user"?null:t==="gesture"?e&&Up.has(e)?null:`Unknown gesture "${e}". Available: ${[...Up].join(", ")}.`:e?e==="user"?t==="inspect_object"?"inspect_object needs an object id, not the user.":null:this.world.find(e)?null:this.unknownTarget(e):"A target id is required.":"The headset has not sent any world data yet."}fail(t,e,n){return this.memory.recordOutcome(t,e,"failed",n),{status:"failed",skill:t,target_id:e,reason:n}}async runPrimitive(t,e){let n=this.validate(t,e);if(n)return this.fail(t,e,n);let s=t,r=t==="look_at"||t==="gesture"?Vl:CS,o=t==="gesture"?await this.device.request(s,void 0,{type:e},r):await this.device.request(s,e,void 0,r);this.record(t,e,o.status,o.reason);let a={status:o.status,skill:t,target_id:e,reason:o.reason,...o.data};if(t==="inspect_object"&&o.status==="succeeded"){let l=this.world.find(e);l&&(a.object=this.world.describeObject(l),a.your_notes=this.memory.notesFor(l.id))}return a}background(t,e,n){let s=++this.runToken;n().catch(r=>({status:"failed",skill:t,target_id:e,reason:String(r?.message??r)})).then(r=>{s!==this.runToken&&r.status==="failed"||this.onFeedback(r)})}runSkill(t){let e=String(t.name??"").trim().toLowerCase(),n=this.memory.data.learnedSkills[e];if(!n)return{status:"failed",reason:`No saved skill "${e}". Saved: ${Object.keys(this.memory.data.learnedSkills).join(", ")||"(none)"}`};let s=t.target_id;return n.steps.some(r=>r.target==="$target")&&!s?{status:"failed",reason:`Skill "${e}" needs a target_id.`}:(this.runSteps(e,n.steps,s,r=>this.memory.skillUsed(e,r)),{status:"started",note:`Running ${n.steps.length} steps. The outcome will arrive as an [action_result].`})}runSequence(t){let e=Array.isArray(t.steps)?t.steps.map(r=>({skill:String(r?.skill),target:r?.target})):[];if(e.length===0||e.length>6)return{status:"failed",reason:"A sequence needs 1 to 6 steps."};let n=e.find(r=>!Np.has(r.skill));if(n)return{status:"failed",reason:`Step skill "${n.skill}" is not a primitive. Allowed: ${[...Np].join(", ")}`};for(let r of e){let o=this.validate(r.skill,r.target);if(o)return this.fail("run_sequence",r.target,`step ${r.skill}: ${o}`)}let s=String(t.save_as??"").trim().toLowerCase().replace(/[^a-z0-9_]+/g,"_");return this.runSteps("run_sequence",e,void 0,r=>{if(r&&s&&!vs.some(o=>o.name===s)){let o=new Set(e.filter(l=>l.skill!=="gesture"&&l.target&&l.target!=="user").map(l=>l.target)),a=o.size===1?e.map(l=>l.skill!=="gesture"&&o.has(l.target)?{...l,target:"$target"}:l):e;this.memory.saveSkill({name:s,description:`Sequence that worked: ${a.map(l=>`${l.skill}(${l.target??""})`).join(" -> ")}`,steps:a}),this.memory.skillUsed(s,!0)}}),{status:"started",note:`Running ${e.length} steps. The outcome will arrive as an [action_result].`}}runSteps(t,e,n,s){let r=this.runToken+1;this.background(t,n,async()=>{let o=[];for(let a of e){if(this.runToken!==r)return{status:"failed",skill:t,reason:"interrupted by a newer action",steps:o};let l=a.target==="$target"?n:a.target,c=await this.runPrimitive(a.skill,l);if(o.push(c),c.status!=="succeeded")return s(!1),{status:"failed",skill:t,target_id:n,reason:`step ${o.length} (${a.skill}) failed: ${c.reason}`,steps:o}}return s(!0),{status:"succeeded",skill:t,target_id:n,steps:o}})}};Pt();Pt();var Qn=class{constructor(){throw new Error("this mind needs the backend; it cannot run inside the browser")}};W(Qn,"OPEN",1);Pt();var pr=class i{constructor(t,e){W(this,"opts",t);W(this,"log",e);W(this,"onSpeechStart",()=>{});W(this,"onSpeechEnd",()=>{});W(this,"onTranscript",()=>{});W(this,"onSpeechConfirmed",()=>{});W(this,"onUtterance",null);W(this,"onEarly",null);W(this,"onResumed",()=>{});W(this,"ws",null);W(this,"closed",!1);W(this,"retries",0);W(this,"mode","stream");W(this,"vad",{noise:.004,speaking:!1,confirmed:!1,early:!1,voicedMs:0,silentMs:0,chunks:[],pre:[],ms:0})}async start(){if(this.opts.mode==="http"){this.mode="http";return}try{await this.connect()}catch(t){this.mode="http",this.log("warn",`Live speech-to-text is unreachable (${t?.message??t}); hearing through plain HTTPS instead.`)}}connect(){return new Promise((t,e)=>{let n=this.opts.url??`wss://api.openai.com/v1/realtime?model=${encodeURIComponent(this.opts.model)}`,s=new Qn(n,{headers:{Authorization:`Bearer ${this.opts.apiKey}`}});this.ws=s;let r=!1;s.on("open",()=>{r=!0,this.retries=0,s.send(JSON.stringify({type:"session.update",session:{type:"realtime",output_modalities:["text"],audio:{input:{format:{type:"audio/pcm",rate:24e3},transcription:{model:this.opts.transcribeModel},turn_detection:{type:"server_vad",threshold:.6,silence_duration_ms:400,create_response:!1,interrupt_response:!1}}}}})),t()}),s.on("message",o=>{let a;try{a=JSON.parse(o.toString())}catch{return}if(a.type==="input_audio_buffer.speech_started")this.onSpeechStart();else if(a.type==="input_audio_buffer.speech_stopped")this.onSpeechEnd();else if(a.type==="conversation.item.input_audio_transcription.completed"){let l=String(a.transcript??"").trim();l&&this.onTranscript(l)}else a.type==="error"&&this.log("error",`speech-to-text error: ${a.error?.message??JSON.stringify(a)}`)}),s.on("error",o=>{this.log("error",`speech-to-text socket error: ${o.message}`),r||e(o)}),s.on("close",()=>{if(this.closed||!r)return;let o=Math.min(8e3,500*2**this.retries++);setTimeout(()=>!this.closed&&this.connect().catch(()=>{}),o)})})}audio(t){this.mode==="http"?this.detect(Buffer.from(t,"base64")):this.ws?.readyState===Qn.OPEN&&this.ws.send(JSON.stringify({type:"input_audio_buffer.append",audio:t}))}detect(t){let e=this.vad,n=t.length>>1;if(n===0)return;let s=0;for(let l=0;l<n;l++){let c=t.readInt16LE(l*2)/32768;s+=c*c}let r=Math.sqrt(s/n),o=n/24e3*1e3,a=r>Math.max(.008,e.noise*3.5);if(a||(e.noise+=(r-e.noise)*.05),!e.speaking){e.pre.push(t),e.pre.length>6&&e.pre.shift(),e.voicedMs=a?e.voicedMs+o:0,e.voicedMs>=120&&(e.speaking=!0,e.confirmed=!1,e.chunks=e.pre.splice(0),e.silentMs=0,e.ms=e.voicedMs,this.onSpeechStart());return}if(e.chunks.push(t),e.ms+=o,a&&(e.voicedMs+=o),!e.confirmed&&e.voicedMs>=300&&(e.confirmed=!0,this.onSpeechConfirmed()),e.silentMs=a?0:e.silentMs+o,a&&e.early?(e.early=!1,this.onResumed()):!e.early&&this.onEarly&&e.silentMs>=120&&e.voicedMs>=250&&(e.early=!0,this.onEarly(Buffer.concat(e.chunks))),e.silentMs>=(this.opts.silenceMs??350)||e.ms>=2e4){let l=Buffer.concat(e.chunks),c=e.voicedMs;e.speaking=!1,e.early=!1,e.chunks=[],e.voicedMs=0,this.onSpeechEnd(),c>=250&&(this.onUtterance?this.onUtterance(l):this.transcribe(l).then(h=>h&&!this.closed&&this.onTranscript(h)))}}static wav(t){let e=Buffer.alloc(44);return e.write("RIFF",0),e.writeUInt32LE(36+t.length,4),e.write("WAVEfmt ",8),e.writeUInt32LE(16,16),e.writeUInt16LE(1,20),e.writeUInt16LE(1,22),e.writeUInt32LE(24e3,24),e.writeUInt32LE(24e3*2,28),e.writeUInt16LE(2,32),e.writeUInt16LE(16,34),e.write("data",36),e.writeUInt32LE(t.length,40),Buffer.concat([e,t])}async transcribe(t){let e=new FormData;e.append("model",this.opts.transcribeModel),e.append("file",new Blob([new Uint8Array(i.wav(t))],{type:"audio/wav"}),"speech.wav");try{let n=await fetch(`${this.opts.httpBaseUrl??"https://api.openai.com/v1"}/audio/transcriptions`,{method:"POST",headers:{authorization:`Bearer ${this.opts.apiKey}`},body:e,signal:AbortSignal.timeout(15e3)});return n.ok?String((await n.json()).text??"").trim():(this.log("error",`speech-to-text failed (${n.status}): ${(await n.text()).slice(0,200)}`),"")}catch(n){return this.log("error",`speech-to-text failed: ${n?.message??n}`),""}}close(){this.closed=!0,this.ws?.close()}},Hl=class{constructor(t,e){W(this,"opts",t);W(this,"log",e);W(this,"onAudio",()=>{});W(this,"onFirstAudio",()=>{});W(this,"generation",0);W(this,"tail",Promise.resolve());W(this,"aborter",new AbortController)}say(t){if(t=t.trim(),!t)return;let e=this.generation,n=this.aborter.signal,s=fetch(`${this.opts.baseUrl??"https://api.openai.com/v1"}/audio/speech`,{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${this.opts.apiKey}`},body:JSON.stringify({model:this.opts.model,voice:this.opts.voice,input:t,response_format:"pcm",...this.opts.instructions?{instructions:this.opts.instructions}:{}}),signal:n});s.catch(()=>{}),this.tail=this.tail.then(async()=>{if(e===this.generation)try{let r=await s;if(!r.ok||!r.body)throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0,200)}`);let o=Buffer.alloc(0);for await(let a of r.body){if(e!==this.generation)return;let l=o.length?Buffer.concat([o,a]):Buffer.from(a),c=l.length-l.length%2;o=l.subarray(c),l=l.subarray(0,c),l.length&&(this.onFirstAudio(),this.onAudio(l.toString("base64")))}}catch(r){e===this.generation&&r?.name!=="AbortError"&&this.log("error",`text-to-speech failed: ${r?.message??r}`)}})}cancel(){this.generation++,this.aborter.abort(),this.aborter=new AbortController,this.tail=Promise.resolve()}},Wl=class{constructor(t){W(this,"emit",t);W(this,"buf","")}push(t){for(this.buf+=t;;){let e=this.buf.match(/^([\s\S]*?[.!?…]+["')\]]*)(\s+|$)/);if(!e||e[2]===""&&!/[.!?…]["')\]]*$/.test(this.buf)||e[2]==="")break;this.emit(e[1].trim()),this.buf=this.buf.slice(e[0].length)}}flush(){let t=this.buf.trim();this.buf="",t&&this.emit(t)}};var Op=new Map,IS=vs.filter(i=>i.name!=="get_world_state").map(i=>{let t=structuredClone(i.parameters);return Lp.has(i.name)&&(t.properties={...t.properties,say:{type:"string",description:'One short natural sentence to say out loud the instant this starts, e.g. "Sure, on my way." Put your spoken reply here rather than in text when you call this tool.'}}),Op.set(i.name,t),{type:"function",function:{name:i.name,description:i.description,parameters:t}}}),PS=vs.filter(i=>i.name!=="get_world_state").map(i=>({type:"function",function:{name:i.name,description:i.description,parameters:i.parameters}})),LS=`

# Voice
You hear the user's own voice and you answer out loud in yours; there is no "say" field. Speak the way people talk: one short sentence, a few words when that is enough. When the user asks you to move or look, call the skill AND say a few words ("On my way.") in the same reply. If you cannot make out what was said, ask them to say it again.
When an [action_result] arrives, say a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`,DS=[{re:/^(come( on)?( over| back)?( here| to me)|get over here|over here|come here( now)?)$/,skill:"approach_user"},{re:/^(follow me|come with me|come along|walk with me)$/,skill:"follow_user"},{re:/^(stop|wait|hold on|freeze|halt|stop moving|stay there|stay)$/,skill:"stop_moving"}],FS=new Set(["walk_to","approach_user","follow_user","inspect_object","look_at"]);function NS(i,t=()=>{}){let e=r=>r.split(" ").length<=3?t(r):void 0,n=i.toLowerCase().replace(/[^a-z0-9' ]+/g," ").replace(/\b(hey|hi|ok|okay|sim|please|now|can you|could you|will you|would you|just|yeah|yes|sure|and)\b/g," ").replace(/\s+/g," ").trim();for(let r of DS)if(r.re.test(n))return{skill:r.skill,args:{}};let s=/^(?:go|walk|head|move|run|come|get)(?: over| back| on over)? (?:to|towards?|next to|up to|by) (.+)$/.exec(n);if(s){let r=e(s[1]);if(r==="user")return{skill:"approach_user",args:{}};if(r)return{skill:"walk_to",args:{target_id:r}}}if(s=/^(?:go )?(?:check out|inspect|examine|take a look at|have a look at|go look at|go see) (.+)$/.exec(n),s){let r=e(s[1]);if(r&&r!=="user")return{skill:"inspect_object",args:{id:r}}}if(s=/^(?:look at|face|turn to|turn towards?) (.+)$/.exec(n),s){let r=e(s[1]);if(r)return{skill:"look_at",args:{target_id:r}}}return null}var Xl=class{constructor(t,e){W(this,"ctx",t);W(this,"opts",e);W(this,"name");W(this,"utterances",0);W(this,"heardAs",new Map);W(this,"reflex",{skill:"",at:-1e9});W(this,"early",null);W(this,"history",[]);W(this,"inbox",[]);W(this,"running",!1);W(this,"abort",null);W(this,"closed",!1);W(this,"speechEndAt",0);W(this,"lastCallAt",0);W(this,"worldEventTimer",null);e.mouth&&(e.mouth.onAudio=n=>this.ctx.send({type:"audio",pcm16:n}),e.mouth.onFirstAudio=()=>this.ctx.timer.mark("first_audio")),this.name=e.audioModel?"audio":"gpt",e.ears&&(e.ears.onSpeechStart=()=>this.ctx.send({type:"state",status:"listening"}),e.ears.onSpeechEnd=()=>this.speechEndAt=performance.now(),e.ears.onTranscript=n=>this.heard(n,"voice"),e.audioModel&&(e.ears.onSpeechConfirmed=()=>this.cutOff(),e.ears.onEarly=n=>this.heardAudio(n,!0),e.ears.onResumed=()=>this.discardEarly(),e.ears.onUtterance=n=>this.early?this.confirmEarly():this.heardAudio(n,!1)))}async start(){if(this.opts.ears)try{await this.opts.ears.start()}catch(t){this.ctx.log("error",`Hearing is unavailable (${t?.message??t}): the character cannot hear the microphone. Typed input still works.`),this.opts.ears=null}this.opts.mouth||this.ctx.log("warn","No text-to-speech configured: replies are text only.")}onAudio(t){this.opts.ears?.audio(t)}onText(t){this.heard(t,"text")}interrupt(){this.cutOff(),this.ctx.send({type:"state",status:"idle"})}onFeedback(t){this.inbox.push({kind:"event",text:`[action_result] ${JSON.stringify(t)}`}),this.pump()}onWorldEvent(t,e){if(this.inbox.push({kind:"note",text:`[world_event] ${t}`}),!e){this.inbox.filter(s=>s.kind==="note").length>12&&this.inbox.splice(this.inbox.findIndex(s=>s.kind==="note"),1);return}if(this.worldEventTimer)return;let n=Math.max(1500,this.opts.worldEventMinGapMs-(performance.now()-this.lastCallAt));this.worldEventTimer=setTimeout(()=>{this.worldEventTimer=null;for(let s of this.inbox)s.kind==="note"&&s.text.startsWith("[world_event]")&&(s.kind="event");this.pump()},n)}refreshContext(){}close(){this.closed=!0,this.cutOff(),this.worldEventTimer&&clearTimeout(this.worldEventTimer),this.opts.ears?.close()}heard(t,e){/\p{L}{2,}/u.test(t)&&(this.cutOff(),this.ctx.send({type:"transcript",role:"user",text:t}),this.ctx.timer.begin(e,t,e==="voice"&&this.speechEndAt?this.speechEndAt:performance.now()),e==="voice"&&this.ctx.timer.mark("transcript"),this.obey(t)&&this.inbox.push({kind:"note",text:`[note] The body already obeyed this by reflex (${this.reflex.skill}); do not call a movement skill for it, just say a few words.`}),this.inbox.push({kind:"user",text:`[user said] ${t}`}),this.pump())}heardAudio(t,e){let{ctx:n,opts:s}=this;if(e&&(this.running||this.early))return;e||this.cutOff();let r=++this.utterances,o={};this.heardAs.set(r,o),this.heardAs.size>8&&this.heardAs.delete(this.heardAs.keys().next().value);let a=()=>n.timer.begin("voice","(speech)",performance.now());if(e){let l=()=>{},c=new Promise(h=>l=h);this.early={release:l,gate:c,cancelled:!1,id:r,begin:a}}else a();this.inbox.push({kind:"user",text:"[the user said the attached audio]",audio:pr.wav(t).toString("base64"),utterance:r}),this.pump(),s.ears.transcribe(t).then(async l=>{this.closed||!l||!this.heardAs.has(r)||(this.early?.id===r&&await this.early.gate,this.heardAs.has(r)&&(o.text=l,n.timer.note({input:l.slice(0,80)}),n.send({type:"transcript",role:"user",text:l}),o.message&&(o.message.content=`${o.context}
[user said] ${l}`),this.obey(l)))})}obey(t){let e=NS(t,n=>this.ctx.world.resolveId(n));return!e||this.reflex.skill===e.skill&&performance.now()-this.reflex.at<4e3?!1:(this.reflex={skill:e.skill,at:performance.now()},this.ctx.log("info",`reflex ${e.skill}(${JSON.stringify(e.args)}) for "${t}"`),this.ctx.skills.execute(e.skill,e.args),!0)}confirmEarly(){let t=this.early;this.early=null,this.opts.mouth?.cancel(),this.ctx.send({type:"audio_stop"}),t.begin(),t.release()}discardEarly(){let t=this.early;t&&(t.cancelled=!0,this.early=null,this.heardAs.delete(t.id),this.inbox=this.inbox.filter(e=>e.utterance!==t.id),this.abort?.abort(),t.release())}cutOff(){this.opts.mouth?.cancel(),this.ctx.send({type:"audio_stop"}),this.abort?.abort()}async pump(){if(!(this.running||this.closed)&&this.inbox.some(t=>t.kind!=="note")){this.running=!0;try{for(;!this.closed&&this.inbox.some(t=>t.kind!=="note");){let t=this.inbox.splice(0);!t.some(l=>l.kind==="user")&&t.some(l=>l.kind==="event")&&this.ctx.timer.begin("event",t.find(l=>l.kind==="event").text);let e=`[context]
${this.ctx.world.contextText()}
memory:
${this.ctx.memory.summary()}
[/context]`,n=t.filter(l=>l.audio),s=n[n.length-1],r=`${e}
${t.filter(l=>!l.audio||l===s).map(l=>l.text).join(`
`)}`;for(let l of this.history)l.role==="user"&&Array.isArray(l.content)&&(l.content=String(l.content[0]?.text??"").replace("[the user said the attached audio]","[user said something that was not transcribed]"));let o={role:"user",content:s?[{type:"text",text:r},{type:"input_audio",input_audio:{data:s.audio,format:"wav"}}]:r};if(s){let l=this.heardAs.get(s.utterance);l&&(l.message=o,l.context=e,l.text&&(o.content=`${e}
[user said] ${l.text}`))}this.history.push(o);let a=s&&this.early?.id===s.utterance?this.early:null;this.trimHistory();for(let l=0;l<4&&await this.callOnce(l===0?a:null);l++);if(a?.cancelled){let l=this.history.indexOf(o);l>=0&&this.history.splice(l),this.inbox=this.inbox.filter(c=>!c.text.startsWith("[note] You were interrupted"))}}}catch(t){this.ctx.log("error",`OpenAI brain error: ${t?.message??t}`)}finally{this.running=!1,this.ctx.send({type:"state",status:"idle"})}}}async callOnce(t=null){let{ctx:e,opts:n}=this,s=this.abort=new AbortController,r=setTimeout(()=>s.abort(),2e4);this.lastCallAt=performance.now(),e.timer.mark("llm_request"),e.timer.countLlmCall(),e.send({type:"state",status:"thinking"});let o=[],a=new Map,l=[],c=Promise.resolve(),h="",u=!0,f=!1,d=new Wl(x=>this.speak(x)),p=x=>{if(a.has(x)||!o[x])return;let m=c.then(()=>this.runTool(o[x],l));c=m.catch(()=>{}),a.set(x,m)};try{let x=await fetch(`${n.baseUrl??"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${n.apiKey}`,"content-type":"application/json"},body:JSON.stringify(n.audioModel?{model:n.audioModel,stream:!0,modalities:["text","audio"],audio:{voice:n.voice??"alloy",format:"pcm16"},messages:[{role:"system",content:Ro+LS},...this.history],tools:PS}:{model:n.model,stream:!0,messages:[{role:"system",content:Ro},...this.history],tools:IS,...n.effort?{reasoning_effort:n.effort}:{}}),signal:s.signal});if(!x.ok||!x.body){let M=(await x.text().catch(()=>"")).slice(0,300);throw x.status===401?new Error("OpenAI rejected the key. Check it at /setup."):new Error(`OpenAI API error ${x.status}: ${M}. Check OPENAI_PLANNER_MODEL / OPENAI_PLANNER_EFFORT for this account.`)}let m=new TextDecoder,g="";for await(let M of x.body){g+=m.decode(M,{stream:!0});let A;for(;(A=g.indexOf(`
`))>=0;){let E=g.slice(0,A).trim();if(g=g.slice(A+1),!E.startsWith("data:")||E==="data: [DONE]")continue;let y;try{y=JSON.parse(E.slice(5)).choices?.[0]?.delta}catch{continue}if(y){if(t&&(await t.gate,t.cancelled))throw new Error("discarded");u&&(u=!1,e.timer.mark("llm_first_token")),y.audio?.data&&(f||(f=!0,e.timer.mark("speech_text"),e.timer.mark("first_audio"),e.send({type:"state",status:"speaking"})),e.send({type:"audio",pcm16:y.audio.data})),y.audio?.transcript&&(h+=y.audio.transcript),typeof y.content=="string"&&y.content&&(h+=y.content,d.push(y.content));for(let b of y.tool_calls??[]){let I=b.index??0;o[I]||(o[I]={id:b.id??`call_${I}`,name:"",json:""},I>0&&p(I-1)),b.id&&(o[I].id=b.id),b.function?.name&&(o[I].name+=b.function.name),b.function?.arguments&&(o[I].json+=b.function.arguments)}}}}if(clearTimeout(r),this.abort=null,t&&(await t.gate,t.cancelled))return!1;d.flush();for(let M=0;M<o.length;M++)p(M);let _=h.trim();_&&!/^<silent>$/i.test(_)&&e.send({type:"transcript",role:"assistant",text:_}),this.history.push({role:"assistant",content:_||null,...o.length?{tool_calls:o.map(M=>({id:M.id,type:"function",function:{name:M.name,arguments:M.json||"{}"}}))}:{}});let w=!1;for(let M=0;M<o.length;M++){let A=await a.get(M);this.history.push({role:"tool",tool_call_id:o[M].id,content:A.content}),A.failed&&(w=!0)}return w}catch(x){if(clearTimeout(r),this.abort=null,t?.cancelled)return!1;if(s.signal.aborted){await c;let m=[h.trim()?`you had begun saying: "${h.trim().slice(0,200)}"`:"",l.length?`you had already started: ${l.join("; ")}`:""].filter(Boolean);return m.length&&this.inbox.unshift({kind:"note",text:`[note] You were interrupted mid-reply; ${m.join(" and ")}.`}),!1}throw x}}async runTool(t,e){let n=u=>({failed:!0,content:u}),s;try{s=t.json.trim()?JSON.parse(t.json):{}}catch{return n(JSON.stringify({INVALID_JSON:t.json.slice(0,500)}))}let r=Op.get(t.name);if(!r)return n(`Unknown skill "${t.name}".`);let o=Dp(r,s);if(o)return n(`Invalid input: ${o}`);let{say:a,...l}=s;if(performance.now()-this.reflex.at<4e3&&(t.name===this.reflex.skill||this.reflex.skill!=="stop_moving"&&FS.has(t.name)))return typeof a=="string"&&a.trim()&&(this.speak(a),this.ctx.send({type:"transcript",role:"assistant",text:a.trim()})),e.push(`${t.name}()`),{failed:!1,content:JSON.stringify({status:"started",note:`The body had already obeyed the user by reflex (${this.reflex.skill}); this call was not needed and was not run.`})};this.ctx.log("info",`skill ${t.name}(${JSON.stringify(l)})`);let c=await this.ctx.skills.execute(t.name,l);this.ctx.log("info",`  -> ${JSON.stringify(c).slice(0,300)}`);let h=c.status==="failed";return!h&&typeof a=="string"&&a.trim()&&(this.speak(a),this.ctx.send({type:"transcript",role:"assistant",text:a.trim()})),h||e.push(`${t.name}(${JSON.stringify(l)})`),{failed:h,content:JSON.stringify(h&&a?{...c,note:'Your "say" line was NOT spoken because this failed.'}:c)}}speak(t){/^<silent>$/i.test(t.trim())||(this.ctx.timer.mark("speech_text"),this.ctx.send({type:"state",status:"speaking"}),this.opts.mouth?.say(t))}trimHistory(){if(!(this.history.length<=60)){for(let t=this.history.length-30;t<this.history.length;t++)if(this.history[t].role==="user"){this.history.splice(0,t);return}}}};Pt();Pt();var ql=class{constructor(){W(this,"history",[]);W(this,"onRecord",()=>{});W(this,"current",null);W(this,"t0",0);W(this,"flushTimer",null)}begin(t,e,n=performance.now()){this.flush(),this.t0=n,this.current={at:new Date().toISOString(),trigger:t,input:e.slice(0,80),ms:{},llm_calls:0},this.flushTimer=setTimeout(()=>this.flush(),8e3)}mark(t){!this.current||t in this.current.ms||(this.current.ms[t]=Math.round(performance.now()-this.t0))}note(t){this.current&&Object.assign(this.current,t)}countLlmCall(){this.current&&this.current.llm_calls++}flush(){this.flushTimer&&clearTimeout(this.flushTimer),this.flushTimer=null;let t=this.current;this.current=null,!(!t||Object.keys(t.ms).length===0)&&(this.history.push(t),this.history.length>200&&this.history.shift(),this.onRecord(t))}static summarize(t){let e={};for(let s of t){for(let[r,o]of Object.entries(s.ms))(e[r]??(e[r]=[])).push(o);s.plan_ms!==void 0&&(e.plan_ms??(e.plan_ms=[])).push(s.plan_ms)}let n={};for(let[s,r]of Object.entries(e))r.sort((o,a)=>o-a),n[s]={n:r.length,p50:r[Math.floor((r.length-1)*.5)],p90:r[Math.floor((r.length-1)*.9)]};return n}};Pt();var US={type:"object",additionalProperties:!1,required:["objects"],properties:{objects:{type:"array",items:{type:"object",additionalProperties:!1,required:["label","x","y","confidence"],properties:{label:{type:"string",description:'lowercase singular noun, e.g. "chair"'},x:{type:"number",description:"horizontal centre of the object, 0 (left edge) to 1 (right edge)"},y:{type:"number",description:"vertical centre of the object, 0 (top edge) to 1 (bottom edge)"},confidence:{type:"number",description:"0 to 1"}}}}}},OS="This is one frame from a mixed-reality headset camera in a room. List up to 8 distinct physical objects a person could walk up to or point at (furniture, appliances, bags, plants, laptops, bottles and so on). Skip walls, floor, ceiling, people and anything you are unsure about. For each give a lowercase singular label and the centre point of the object's visible body in normalised image coordinates.";async function Bp(i,t){let e=await fetch(`${t.baseUrl??"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${t.apiKey}`},body:JSON.stringify({model:t.model,messages:[{role:"user",content:[{type:"text",text:OS},{type:"image_url",image_url:{url:`data:image/jpeg;base64,${i}`}}]}],response_format:{type:"json_schema",json_schema:{name:"detections",strict:!0,schema:US}}}),signal:AbortSignal.timeout(2e4)});if(!e.ok)throw new Error(`vision HTTP ${e.status}: ${(await e.text()).slice(0,300)}`);let n=await e.json(),s=JSON.parse(n.choices?.[0]?.message?.content??'{"objects":[]}'),r=o=>Math.max(0,Math.min(1,Number(o)||0));return s.objects.map(o=>({label:String(o.label).toLowerCase().trim().replace(/\s+/g,"_"),x:r(o.x),y:r(o.y),confidence:r(o.confidence)})).filter(o=>o.label&&o.confidence>=.4)}Pt();var kp=(i,t)=>[i[0]-t[0],i[1]-t[1],i[2]-t[2]],mr=(i,t)=>Math.hypot(i[0]-t[0],i[2]-t[2]),ru={detected:"seen by the headset camera",room_scan:"from the user's room setup scan (not camera detection)",manual:"registered by the user pointing at it (not camera detection)",simulated:"simulated test object"},$l=class i{constructor(){W(this,"snapshot",null);W(this,"updatedAt",0)}update(t){this.snapshot=t,this.updatedAt=Date.now()}get objects(){return this.snapshot?.objects??[]}find(t){if(!t)return;let e=t.trim().toLowerCase();return this.objects.find(n=>n.id.toLowerCase()===e)}resolveId(t){if(!t)return;let e=t.trim().toLowerCase().replace(/[^a-z0-9_ ]+/g,"").replace(/^(the|that|this|my|a|an) /,"").trim();if(!e)return;if(["user","me","myself","you"].includes(e))return"user";let n=this.find(e);if(n)return n.id;let s=e.replace(/_/g," "),r=this.objects.filter(o=>{let a=o.label.toLowerCase().replace(/_/g," ");return a===s||new RegExp(`\\b${a.replace(/[^a-z0-9 ]/g,"")}s?\\b`).test(s)});return r.length===1?r[0].id:void 0}signature(){return this.objects.map(t=>`${t.id}:${t.label}:${t.source}:${t.reachable??""}`).sort().join("|")}static bearing(t,e){let n=kp(e,t.pos),s=t.fwd[0],r=t.fwd[2],o=Math.atan2(r*n[0]-s*n[2],s*n[0]+r*n[2])*180/Math.PI,a=Math.abs(o),l=o>0?"right":"left";return a<20?"straight ahead":a<70?`ahead-${l}`:a<110?`to the ${l}`:a<160?`behind-${l}`:"behind"}gazeTarget(t=25){let e=this.snapshot;if(!e)return;let n,s=t;for(let r of e.objects){let o=kp(r.pos,e.user.pos),a=Math.hypot(o[0],o[2]),l=Math.hypot(e.user.fwd[0],e.user.fwd[2]);if(a<.2||l<.1)continue;let c=(o[0]*e.user.fwd[0]+o[2]*e.user.fwd[2])/(a*l),h=Math.acos(Math.max(-1,Math.min(1,c)))*180/Math.PI;h<s&&(s=h,n=r)}return n}describeObject(t){let e=this.snapshot;return{id:t.id,label:t.label,origin:ru[t.source]??t.source,confidence:Number(t.confidence.toFixed(2)),metres_from_you:Number(mr(t.pos,e.avatar.pos).toFixed(1)),metres_from_user:Number(mr(t.pos,e.user.pos).toFixed(1)),direction_for_user:i.bearing(e.user,t.pos),seconds_since_observed:Math.round(t.lastSeen),reachable:t.reachable??!0}}describe(){let t=this.snapshot;if(!t)return{status:"no world data from the headset yet"};let e=this.gazeTarget();return{you:{state:t.avatar.state,metres_from_user:Number(mr(t.avatar.pos,t.user.pos).toFixed(1)),direction_for_user:i.bearing(t.user,t.avatar.pos)},user_is_looking_toward:e?e.id:"nothing you know about",room:t.room??"unknown",objects:t.objects.map(n=>this.describeObject(n))}}summary(){let t=this.snapshot;return t?t.objects.length===0?"You know of no objects in the room yet.":t.objects.map(e=>`- ${e.id}: a ${e.label}, ${ru[e.source]??e.source}${e.reachable===!1?", NOT reachable on foot":""}`).join(`
`):"No world data from the headset yet."}contextText(){let t=this.snapshot;if(!t)return"No world data from the headset yet.";let e=this.gazeTarget(),n=[`you: ${t.avatar.state}, ${mr(t.avatar.pos,t.user.pos).toFixed(1)} m from the user, ${i.bearing(t.user,t.avatar.pos)} of them`,`user is looking toward: ${e?e.id:"nothing you know about"}`,`room: ${t.room?`${t.room.source}, walkable floor ${t.room.navmesh?"mapped":"NOT mapped"}`:"unknown"}`];if(t.objects.length===0)n.push("objects: none known yet");else{n.push("objects:");for(let s of t.objects)n.push(`- ${s.id}: ${s.label}, ${ru[s.source]??s.source}, ${mr(s.pos,t.avatar.pos).toFixed(1)} m from you, ${mr(s.pos,t.user.pos).toFixed(1)} m from the user (${i.bearing(t.user,s.pos)} for them)${s.source==="detected"?`, last seen ${Math.round(s.lastSeen)} s ago, confidence ${s.confidence.toFixed(1)}`:""}${s.reachable===!1?", NOT reachable on foot":""}`)}return n.join(`
`)}};var au=[],Yl=class{constructor(t,e,n,s){W(this,"link",t);W(this,"opts",e);W(this,"capabilities",{});W(this,"world",new $l);W(this,"skills");W(this,"brain");W(this,"pending",new Map);W(this,"nextId",1);W(this,"worldSig","");W(this,"refreshTimer",null);W(this,"device","unknown");W(this,"timer",new ql);W(this,"knownIds",null);W(this,"userFar",!1);W(this,"disposed",!1);this.skills=new Gl(this,this.world,n);let r={send:l=>this.send(l),skills:this.skills,world:this.world,memory:n,timer:this.timer,log:(l,c)=>this.log(l,c)};this.timer.onRecord=l=>{au.push(l),au.length>500&&au.shift(),this.log("info",`latency ${l.trigger} "${l.input}": ${Object.entries(l.ms).map(([c,h])=>`${c}=${h}ms`).join(" ")}${l.plan_ms!==void 0?` plan=${l.plan_ms}ms`:""} llm_calls=${l.llm_calls}`),this.send({type:"metrics",turn:l})};let o=(l,c)=>this.log(l,c);this.brain=s(e,r,o,e.brain),this.skills.onFeedback=l=>{this.log("info",`feedback ${JSON.stringify(l).slice(0,300)}`),this.brain.refreshContext(),this.brain.onFeedback(l,!0)};let a=()=>this.send({type:"ready",protocol:1,brain:this.brain.name,audioRate:24e3});this.brain.start().then(a).catch(l=>{if(this.brain.name==="realtime"&&!e.brainFixed&&e.apiKey)return this.log("warn",`live speech-to-speech is unavailable (${l?.message??l}); using the 'audio' mind instead.`),this.brain.close(),this.brain=s(e,r,o,"audio"),this.brain.start().then(a);this.log("error",`brain failed to start: ${l?.message??l}. Check OPENAI_API_KEY / network.`)}).catch(l=>this.log("error",`brain failed to start: ${l?.message??l}. Check OPENAI_API_KEY / network.`))}log(t,e){this.opts.quiet||console[t==="info"?"log":t](`[${this.device}] ${e}`),t!=="info"&&this.send({type:"log",level:t,message:e})}send(t){this.link.open()&&this.link.send(JSON.stringify(t)),t.type==="transcript"&&!this.opts.quiet&&console.log(`[${this.device}] ${t.role}: ${t.text}`)}request(t,e,n,s=3e4){let r=`a${this.nextId++}`;return new Promise(o=>{let a=setTimeout(()=>{this.pending.delete(r),o({type:"action_result",id:r,status:"failed",reason:`The headset did not finish ${t} within ${s/1e3}s.`})},s);this.pending.set(r,{resolve:o,timer:a}),this.send({type:"action",id:r,action:t,target_id:e,params:n,status:"requested"}),this.timer.mark("action_dispatched")})}receive(t){let e;try{e=JSON.parse(t)}catch{return}this.onMessage(e)}onMessage(t){switch(t.type){case"hello":this.device=t.device,this.capabilities=t.capabilities??{},this.log("info",`hello protocol=${t.protocol} capabilities=${JSON.stringify(this.capabilities)}`),t.protocol!==1&&this.log("warn",`protocol mismatch: device ${t.protocol}, backend ${1}`);break;case"audio":this.brain.onAudio(t.pcm16);break;case"text":this.brain.onText(t.text);break;case"interrupt":this.brain.interrupt();break;case"world":{this.world.update(t.world),this.detectWorldEvents();let e=this.world.signature();e!==this.worldSig&&(this.worldSig=e,this.refreshTimer&&clearTimeout(this.refreshTimer),this.refreshTimer=setTimeout(()=>this.brain.refreshContext(),400));break}case"action_result":{let e=this.pending.get(t.id);if(!e)break;clearTimeout(e.timer),this.pending.delete(t.id),e.resolve(t);break}case"view":this.brain.onView?.(t.jpeg);break;case"frame":this.onFrame(t.id,t.jpeg);break;case"event":t.name==="action_started"?(this.timer.mark("device_started"),this.timer.note({plan_ms:Number(t.data?.plan_ms??0),path_m:Number(t.data?.path_m??0)})):this.log("info",`event ${t.name} ${JSON.stringify(t.data??{})}`);break}}detectWorldEvents(){let t=this.world.snapshot;if(!t||!this.brain.onWorldEvent)return;let e=new Set(t.objects.map(s=>s.id));if(this.knownIds&&this.pending.size===0){for(let s of t.objects)this.knownIds.has(s.id)||this.brain.onWorldEvent(`A new object is now known: ${s.id} (${s.label}).`,!1);for(let s of this.knownIds)e.has(s)||this.brain.onWorldEvent(`Object ${s} is no longer known.`,!1)}this.knownIds=e;let n=Math.hypot(t.avatar.pos[0]-t.user.pos[0],t.avatar.pos[2]-t.user.pos[2]);!this.userFar&&n>3.5&&t.avatar.state==="idle"?(this.userFar=!0,this.brain.onWorldEvent(`The user has moved away; they are now ${n.toFixed(1)} m from you.`,!0)):this.userFar&&n<2.5&&(this.userFar=!1)}async onFrame(t,e){if(!this.opts.apiKey){this.send({type:"detections",frameId:t,items:[],error:"No vision model configured on the backend (OPENAI_API_KEY missing)."});return}try{let n=await Bp(e,{apiKey:this.opts.apiKey,model:this.opts.visionModel});this.log("info",`vision: ${n.map(s=>`${s.label}@${s.x.toFixed(2)},${s.y.toFixed(2)}`).join(" ")||"nothing"}`),this.send({type:"detections",frameId:t,items:n})}catch(n){this.log("error",`vision failed: ${n?.message??n}`),this.send({type:"detections",frameId:t,items:[],error:String(n?.message??n)})}}dispose(){if(!this.disposed){this.disposed=!0,this.refreshTimer&&clearTimeout(this.refreshTimer);for(let t of this.pending.values())clearTimeout(t.timer),t.resolve({type:"action_result",id:"",status:"failed",reason:"headset disconnected"});this.pending.clear(),this.brain.close(),this.opts.quiet||console.log(`[${this.device}] disconnected`)}}};Pt();function zp(i,t,e){return async({onMessage:n,onClose:s})=>{let r=new RTCPeerConnection,o=r.addTransceiver("audio",{direction:"sendrecv"}).sender,a=e.onMic(u=>o.replaceTrack(u.getAudioTracks()[0]||null));r.ontrack=u=>e.onVoice(u.streams[0]);let l=r.createDataChannel("oai-events");l.onmessage=u=>n(String(u.data));let c=!1,h=()=>{if(!c){c=!0,a(),e.onVoice(null);try{r.close()}catch{}s()}};try{await r.setLocalDescription(await r.createOffer());let u=await fetch("https://api.openai.com/v1/realtime/calls?model="+encodeURIComponent(t),{method:"POST",headers:{Authorization:"Bearer "+i,"Content-Type":"application/sdp"},body:r.localDescription.sdp,signal:AbortSignal.timeout(8e3)});if(!u.ok)throw new Error("OpenAI refused the live connection ("+u.status+"): "+(await u.text()).slice(0,160));await r.setRemoteDescription({type:"answer",sdp:await u.text()}),await new Promise((f,d)=>{let p=setTimeout(()=>d(new Error("the live connection did not open within 8 s (this network may block it)")),8e3);l.onopen=()=>{clearTimeout(p),f()}})}catch(u){c=!0,a(),e.onVoice(null);try{r.close()}catch{}throw u}return r.onconnectionstatechange=()=>{(r.connectionState==="failed"||r.connectionState==="closed")&&h()},l.onclose=h,{send:u=>{l.readyState==="open"&&l.send(u)},close:h}}}Pt();var BS=vs.filter(i=>i.name!=="get_world_state"),kS=`
# Voice
You speak aloud directly; there is no "say" field. When you call a movement skill, call it FIRST, before saying anything, so the body sets off at once; then say a few words at most ("On my way."). Answer in one short sentence unless asked for more. The [context] block is the section "Current situation" below, kept up to date for you.
When an [action_result] arrives, say a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`,Jl=class{constructor(t,e){W(this,"ctx",t);W(this,"opts",e);W(this,"name","realtime");W(this,"ws",null);W(this,"call",null);W(this,"closed",!1);W(this,"responseActive",!1);W(this,"wantResponse",!1);W(this,"userSpeaking",!1);W(this,"reconnects",0);W(this,"handledCalls",new Set);W(this,"accepted",null);W(this,"running",Promise.resolve());W(this,"ranCalls",!1);W(this,"lastInstructions","");W(this,"viewSeq",0);W(this,"lastViewId","")}start(){return this.opts.connect?this.startCall():new Promise((t,e)=>{let n=this.opts.url??`wss://api.openai.com/v1/realtime?model=${encodeURIComponent(this.opts.model)}`,s=new Qn(n,{headers:{Authorization:`Bearer ${this.opts.apiKey}`}});this.ws=s;let r=!1;s.on("open",()=>{r=!0,this.reconnects=0,this.responseActive=!1,this.sendSession(),this.ctx.log("info",`realtime connected (${this.opts.model})`),this.accepted=a=>{if(this.accepted=null,clearTimeout(o),!a)return t();this.closed=!0,s.close(),e(new Error(a))};let o=setTimeout(()=>this.accepted?.("the service did not confirm the session settings"),4e3)}),s.on("message",o=>{try{this.handle(JSON.parse(o.toString()))}catch(a){this.ctx.log("error",`realtime message handling failed: ${a}`)}}),s.on("error",o=>{this.ctx.log("error",`realtime socket error: ${o.message}`),r||e(o)}),s.on("close",(o,a)=>{if(this.closed||(this.ctx.log("warn",`realtime closed (${o} ${a}); reconnecting`),!r))return;let l=Math.min(8e3,500*2**this.reconnects++);setTimeout(()=>!this.closed&&this.start().catch(c=>this.ctx.log("error",`realtime reconnect failed: ${c?.message??c}`)),l)})})}async startCall(){let t=await this.opts.connect({onMessage:e=>{try{this.handle(JSON.parse(e))}catch(n){this.ctx.log("error",`realtime message handling failed: ${n}`)}},onClose:()=>{if(this.closed||this.call!==t)return;this.call=null,this.ctx.log("warn","live voice connection lost; reconnecting");let e=Math.min(8e3,500*2**this.reconnects++);setTimeout(()=>!this.closed&&this.startCall().catch(n=>this.ctx.log("error",`live voice reconnect failed: ${n?.message??n}`)),e)}});this.call=t,this.responseActive=!1,this.sendSession(),this.ctx.log("info",`live voice connected (${this.opts.model})`),await new Promise((e,n)=>{let s=setTimeout(()=>this.accepted?.("the service did not confirm the session settings"),4e3);this.accepted=r=>{if(this.accepted=null,clearTimeout(s),!r)return this.reconnects=0,e();this.closed=!0,t.close(),n(new Error(r))}})}up(t){this.call?this.call.send(JSON.stringify(t)):this.ws?.readyState===Qn.OPEN&&this.ws.send(JSON.stringify(t))}sendSession(){this.up({type:"session.update",session:{type:"realtime",instructions:this.instructions(),output_modalities:["audio"],audio:{input:{...this.opts.connect?{}:{format:{type:"audio/pcm",rate:24e3}},transcription:{model:"gpt-4o-mini-transcribe"},turn_detection:{type:"server_vad",threshold:.6,silence_duration_ms:this.opts.silenceMs??350,prefix_padding_ms:200,create_response:!0,interrupt_response:!0}},output:{...this.opts.connect?{}:{format:{type:"audio/pcm",rate:24e3}},voice:this.opts.voice}},tools:BS,tool_choice:"auto"}})}instructions(){return`${Ro}
${kS}

# Current situation
${this.ctx.world.contextText()}

# Your long-term memory
${this.ctx.memory.summary()}`}refreshContext(){let t=this.instructions();t!==this.lastInstructions&&(this.lastInstructions=t,this.up({type:"session.update",session:{type:"realtime",instructions:t}}))}onAudio(t){this.opts.connect||this.up({type:"input_audio_buffer.append",audio:t})}onText(t){this.ctx.timer.begin("text",t),this.ctx.timer.countLlmCall(),this.up({type:"conversation.item.create",item:{type:"message",role:"user",content:[{type:"input_text",text:t}]}}),this.requestResponse()}interrupt(){this.responseActive&&this.up({type:"response.cancel"}),this.ctx.send({type:"audio_stop"})}onFeedback(t,e){this.up({type:"conversation.item.create",item:{type:"message",role:"user",content:[{type:"input_text",text:`[action_result] ${JSON.stringify(t)}`}]}}),e&&this.requestResponse()}onView(t){this.lastViewId&&this.up({type:"conversation.item.delete",item_id:this.lastViewId}),this.lastViewId=`view_${Date.now().toString(36)}_${++this.viewSeq}`,this.up({type:"conversation.item.create",item:{id:this.lastViewId,type:"message",role:"user",content:[{type:"input_text",text:"[view] This is what the user sees through the headset right now (you may be in the picture). Use it to answer questions about what is in front of them. It is not a request."},{type:"input_image",image_url:`data:image/jpeg;base64,${t}`}]}})}requestResponse(){if(this.responseActive||this.userSpeaking){this.wantResponse=!0;return}this.wantResponse=!1,this.responseActive=!0,this.up({type:"response.create"})}handle(t){if(this.accepted){if(t.type==="session.updated")this.accepted();else if(t.type==="error")return this.accepted(`settings rejected: ${t.error?.message??JSON.stringify(t)}`)}switch(t.type){case"response.created":this.responseActive=!0,this.ctx.timer.mark("llm_first_token"),this.ctx.send({type:"state",status:"thinking"});break;case"response.output_audio.delta":case"response.audio.delta":this.ctx.timer.mark("first_audio"),this.ctx.send({type:"audio",pcm16:t.delta});break;case"response.output_audio_transcript.done":case"response.audio_transcript.done":t.transcript&&this.ctx.send({type:"transcript",role:"assistant",text:t.transcript});break;case"conversation.item.input_audio_transcription.completed":t.transcript&&(this.ctx.timer.note({input:String(t.transcript).slice(0,80)}),this.ctx.send({type:"transcript",role:"user",text:t.transcript}));break;case"output_audio_buffer.started":this.ctx.timer.mark("first_audio"),this.ctx.send({type:"state",status:"speaking"});break;case"output_audio_buffer.stopped":case"output_audio_buffer.cleared":this.responseActive||this.ctx.send({type:"state",status:"idle"});break;case"input_audio_buffer.speech_started":this.userSpeaking=!0,this.refreshContext(),this.ctx.send({type:"audio_stop"}),this.ctx.send({type:"state",status:"listening"});break;case"input_audio_buffer.speech_stopped":this.userSpeaking=!1,this.ctx.timer.begin("voice","(speech)"),this.ctx.timer.countLlmCall();break;case"response.output_item.done":t.item?.type==="function_call"&&t.item.call_id&&!this.handledCalls.has(t.item.call_id)&&this.runCalls([t.item]);break;case"response.done":{this.responseActive=!1;let n=(t.response?.output??[]).filter(s=>s.type==="function_call"&&s.call_id&&!this.handledCalls.has(s.call_id));t.response?.status==="failed"&&this.ctx.log("error",`response failed: ${JSON.stringify(t.response?.status_details)}`),n.length&&this.runCalls(n),this.ranCalls?(this.ranCalls=!1,this.running.then(()=>this.requestResponse())):this.wantResponse?this.requestResponse():this.ctx.send({type:"state",status:"idle"});break}case"error":{let e=t.error?.message??JSON.stringify(t);if(/item.*(not found|does not exist)/i.test(e)||/no active response|cancellation failed/i.test(e))break;if(/active response/i.test(e)){this.wantResponse=!0;break}this.ctx.log("error",`realtime error: ${e}`);break}}}runCalls(t){this.ranCalls=!0;for(let e of t)this.handledCalls.add(e.call_id),this.running=this.running.then(async()=>{let n={};try{n=e.arguments?JSON.parse(e.arguments):{}}catch{}this.ctx.log("info",`skill ${e.name}(${JSON.stringify(n)})`);let s=await this.ctx.skills.execute(e.name,n).catch(r=>({status:"failed",reason:String(r?.message??r)}));this.ctx.log("info",`  -> ${JSON.stringify(s).slice(0,300)}`),this.up({type:"conversation.item.create",item:{type:"function_call_output",call_id:e.call_id,output:JSON.stringify(s)}})})}close(){this.closed=!0,this.call?.close(),this.ws?.close()}};function Vp(i,t,e,n){let s={port:0,brain:n,apiKey:i,realtimeModel:"gpt-realtime",realtimeVoice:"marin",visionModel:"gpt-4.1-mini",memoryPath:"memory.json"},r=!0,o=new Yl({send:a=>{Promise.resolve().then(()=>r&&t(a))},open:()=>r},s,new zl("memory.json"),(a,l,c,h)=>h==="realtime"?new Jl(l,{apiKey:i,model:a.realtimeModel,voice:a.realtimeVoice,connect:zp(i,a.realtimeModel,e)}):new Xl(l,{apiKey:i,model:"gpt-5.4-mini",effort:"none",ears:new pr({apiKey:i,model:a.realtimeModel,transcribeModel:"gpt-4o-mini-transcribe",mode:"http"},c),mouth:new Hl({apiKey:i,model:"gpt-4o-mini-tts",voice:"alloy"},c),worldEventMinGapMs:8e3,audioModel:"gpt-audio-mini",voice:"alloy"}));return{send:a=>r&&o.receive(a),close:()=>{r=!1,o.dispose()}}}var Ke=new URLSearchParams(location.search),he=i=>document.getElementById(i),zS=/OculusBrowser|Quest/i.test(navigator.userAgent),ue=new Ll({antialias:!0,alpha:!0});ue.setPixelRatio(Math.min(2,window.devicePixelRatio||1));ue.setSize(window.innerWidth,window.innerHeight);ue.outputColorSpace=ie;ue.xr.enabled=!0;document.body.prepend(ue.domElement);var yn=new Br,Ze=new Re(65,window.innerWidth/window.innerHeight,.05,50);Ze.position.set(0,1.6,1.2);Ze.rotation.order="YXZ";yn.add(Ze);yn.add(new io(16777215,9080728,1.6));var em=new fs(16777215,1.4);em.position.set(1.5,3,2);yn.add(em);window.addEventListener("resize",()=>{ue.xr.isPresenting||(Ze.aspect=window.innerWidth/window.innerHeight,Ze.updateProjectionMatrix(),ue.setSize(window.innerWidth,window.innerHeight))});var Qt={source:"unknown",floorY:null,floors:[],obstacles:[],origin:{x:0,z:0}},Gp=.25;function Ql(i,t,e){let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){let o=e[s],a=e[r];o[1]>t!=a[1]>t&&i<(a[0]-o[0])*(t-o[1])/(a[1]-o[1])+o[0]&&(n=!n)}return n}function Hp(i,t,e){let n=1/0;for(let s=0,r=e.length-1;s<e.length;r=s++){let o=e[r][0],a=e[r][1],l=e[s][0]-o,c=e[s][1]-a,h=l*l+c*c,u=h>0?Math.max(0,Math.min(1,((i-o)*l+(t-a)*c)/h)):0;n=Math.min(n,Math.hypot(i-o-l*u,t-a-c*u))}return n}function yu(i,t){if(Qt.floorY===null)return!1;if(Qt.floors.length>0){let e=!1;for(let n of Qt.floors)Ql(i,t,n)&&Hp(i,t,n)>Gp&&(e=!0);if(!e)return!1}else if(Math.hypot(i-Qt.origin.x,t-Qt.origin.z)>4)return!1;for(let e of Qt.obstacles)if(Ql(i,t,e.poly)||Hp(i,t,e.poly)<Gp)return!1;return!0}var Wi=null,uu=null,Lo=null,Do=0,yr=new Set,jl=new Uint8Array(256);function xr(){return Wi||(Wi=new(window.AudioContext||window.webkitAudioContext),uu=Wi.createGain(),Lo=Wi.createAnalyser(),Lo.fftSize=512,uu.connect(Lo),Lo.connect(Wi.destination)),Wi.state==="suspended"&&Wi.resume(),Wi}function VS(i){let t=xr(),e=t.createBuffer(1,i.length,Ao.AUDIO_RATE),n=e.getChannelData(0);for(let r=0;r<i.length;r++)n[r]=i[r]/32768;let s=t.createBufferSource();s.buffer=e,s.connect(uu),Do=Math.max(Do,t.currentTime+.04),s.start(Do),Do+=e.duration,yr.add(s),s.onended=()=>yr.delete(s)}function GS(){for(let i of yr)try{i.stop()}catch{}yr.clear(),Do=0}function HS(){let i=Ss||(yr.size>0?Lo:null);if(!i)return 0;i.getByteTimeDomainData(jl);let t=0;for(let e=0;e<jl.length;e++){let n=(jl[e]-128)/128;t+=n*n}return Math.min(1,Math.sqrt(t/jl.length)*5)}var fu=null,du=new Set,Ss=null,Co=null,pu=new Audio;pu.autoplay=!0;var WS={onMic(i){return fu&&i(fu),du.add(i),()=>du.delete(i)},onVoice(i){if(pu.srcObject=i,Co&&Co.disconnect(),Co=null,Ss=null,!i)return;pu.play().catch(()=>{});let t=xr();Co=t.createMediaStreamSource(i),Ss=t.createAnalyser(),Ss.fftSize=512,Co.connect(Ss)}},ws=!1,Bo=0;async function nm(){if(ws)return!0;try{let i=xr(),t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,channelCount:1}}),e="class P extends AudioWorkletProcessor{process(i){const c=i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('simulacra-mic',P)";await i.audioWorklet.addModule(URL.createObjectURL(new Blob([e],{type:"text/javascript"})));let n=new AudioWorkletNode(i,"simulacra-mic");n.port.onmessage=s=>{let r=0;for(let o=0;o<s.data.length;o++)r+=s.data[o]*s.data[o];Bo=Math.max(Math.sqrt(r/s.data.length),Bo*.9),Tt.pushMic(s.data,s.data.length,i.sampleRate)},i.createMediaStreamSource(t).connect(n),fu=t;for(let s of du)s(t);return ws=!0,he("mic").disabled=!0,he("mic").textContent="Microphone on",!0}catch(i){return Mi("Microphone unavailable: "+(i&&i.message?i.message:i)),!1}}var Ms=null,_s=new F,Xi=new F;function ti(){return ue.xr.isPresenting?ue.xr.getCamera():Ze}function mu(i,t){let e=null,n=8,s=(r,o)=>{if(Math.abs(t.y)<1e-4)return;let a=(r-i.y)/t.y;if(a<=.05||a>=n)return;let l=i.x+t.x*a,c=i.z+t.z*a;o(l,c)&&(n=a,e=new F(l,r,c))};for(let r of Qt.obstacles)s(r.top,(o,a)=>Ql(o,a,r.poly));return Qt.floorY!==null&&s(Qt.floorY,()=>!0),e}var ei=null,qi="",mn=document.createElement("canvas"),XS=Number(Ke.get("camfov"))||90;async function qS(){if(!(ei||Ke.get("camera")==="0"))try{let i=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"},width:{ideal:1280}}}),t=i.getVideoTracks()[0]&&i.getVideoTracks()[0].label||"";if(/avatar|selfie|virtual|front/i.test(t)&&!/passthrough|back|environment|world/i.test(t)){i.getTracks().forEach(n=>n.stop()),qi='refused: "'+t+'" is not an outward camera',gn("camera "+qi);return}let e=document.createElement("video");e.srcObject=i,e.muted=!0,e.playsInline=!0,await e.play(),ei=e,qi=t||"camera",gn("camera on: "+qi+" "+e.videoWidth+"x"+e.videoHeight)}catch(i){qi="unavailable: "+(i&&i.message?i.message:i),gn("camera "+qi)}}function $S(){let i=ti();i.updateMatrixWorld(!0);let t=i.getWorldPosition(new F),e=i.matrixWorld.clone(),n;if(ue.xr.isPresenting){if(!ei||ei.videoWidth===0)return null;mn.width=640,mn.height=Math.round(640*ei.videoHeight/ei.videoWidth),mn.getContext("2d").drawImage(ei,0,0,mn.width,mn.height);let r=Math.tan(XS*Math.PI/360),o=r*mn.height/mn.width;n=(a,l)=>new F((a*2-1)*r,(1-l*2)*o,-1).transformDirection(e)}else{ue.render(yn,Ze),mn.width=640,mn.height=Math.round(640*ue.domElement.height/ue.domElement.width),mn.getContext("2d").drawImage(ue.domElement,0,0,mn.width,mn.height);let r=Ze.projectionMatrixInverse.clone();n=(o,a)=>new F(o*2-1,1-a*2,.5).applyMatrix4(r).applyMatrix4(e).sub(t).normalize()}return{jpeg:mn.toDataURL("image/jpeg",.7).split(",")[1],locate:(r,o)=>{let a=mu(t,n(r,o));return a&&a.distanceTo(t)<7?xs(a.x,a.y,a.z):null}}}var im={send:i=>{Vn&&Vn.readyState===WebSocket.OPEN&&Vn.send(i)},headPosition:()=>(ti().getWorldPosition(_s),xs(_s.x,_s.y,_s.z)),headForward:()=>(ti().getWorldDirection(Xi),xs(Xi.x,Xi.y,Xi.z)),floorY:()=>Qt.floorY,isFloor:i=>yu(i.x,-i.z),pointerHit:()=>{let i=Ms&&Ms.visible?Ms:ti();i.getWorldPosition(_s),i.getWorldDirection(Xi),i!==ti()&&Xi.negate();let t=mu(_s,Xi)||(i!==ti()?mu(ti().getWorldPosition(_s),ti().getWorldDirection(Xi)):null);return t?xs(t.x,t.y,t.z):null},playAudio:VS,stopAudio:GS,log:i=>{console.log(i),gn(i)},roomInfo:()=>({source:Qt.source,obstacles:Qt.obstacles.length}),captureView:$S},gr=!0,Tt=new Ao(im,"webxr"),YS=Ke.get("wander")!=="0",Vn=null,vr=!/^\/xr\//.test(location.pathname);function JS(){let i="";try{i=localStorage.getItem("simulacra.backend")||""}catch{}return Ke.get("backend")||(vr?i:(location.protocol==="https:"?"wss://":"ws://")+location.host)}function xu(){try{return localStorage.getItem("simulacra.openaiKey")||""}catch{return""}}var vu=()=>vr&&!Ke.get("backend")&&!!xu(),bs=[],Cn=Ke.has("debug");try{Cn=Cn||localStorage.getItem("simulacra.debug")==="1"}catch{}var jS=performance.now();function gn(i){bs.push(((performance.now()-jS)/1e3).toFixed(1).padStart(6)+"  "+i),bs.length>200&&bs.shift()}function Wp(i){try{let t=JSON.parse(i);t.type==="ready"?gn("mind ready: "+t.brain):t.type==="state"?gn("state "+t.status):t.type==="action"?gn("ACTION "+t.action+" "+(t.target_id||"")+" "+(t.params?JSON.stringify(t.params):"")):t.type==="transcript"?gn((t.role==="user"?"heard: ":"said:  ")+t.text):t.type==="metrics"?gn("timing "+Object.entries(t.turn.ms||{}).map(([e,n])=>e+"="+n).join(" ")):t.type==="audio_stop"&&gn("speech cut off")}catch{}Tt.onMessage(i)}function tc(){let i=Tt.avatar,t=im.headPosition();return["mind: "+(Tt.connected?Tt.brain:"not connected")+(vu()?" (in this browser)":vr?" (no key, no backend)":" (backend)")+"   status: "+Tt.status,"microphone: "+(ws?"on, level "+Bo.toFixed(3)+(Tt.micMuted?" (paused while she speaks)":""):"OFF")+"   voice: "+(Ss?"live call":yr.size>0?"playing":"silent"),"camera: "+(ei?qi+" (looking every "+Tt.autoLook+" s)":gr?Tt.canSee?"the rendered view":"off in preview (add ?look=10)":qi||"not started")+"   seen by camera: "+Tt.objects.filter(e=>e.source==="detected").map(e=>e.id).join(" "),"room: "+Qt.source+", "+Qt.floors.length+" floor outline(s), "+Qt.obstacles.length+" obstacle(s), "+Tt.objects.length+" known object(s)"+(ko.length?"   features: "+ko.join(","):""),"her: "+i.state+" at "+i.pos.x.toFixed(2)+","+i.pos.z.toFixed(2)+"   you: "+t.x.toFixed(2)+","+t.z.toFixed(2)+"   apart: "+Math.hypot(i.pos.x-t.x,i.pos.z-t.z).toFixed(2)+" m   strolling: "+(Tt.wander?"allowed":"off"),"last action: "+(Tt.lastAction||"-")+(Tt.lastError?"   LAST ERROR: "+Tt.lastError:"")]}var Io=0;function Fo(){let i=++Io;if(vu()){let n=Vp(xu(),s=>{i===Io&&Wp(s)},WS,Ke.get("mind")==="audio"?"audio":"realtime");Vn={readyState:WebSocket.OPEN,send:s=>n.send(s),close:()=>{n.close(),Tt.onClose(),Fo()}},Tt.onOpen();return}let t=JS();if(document.activeElement!==he("backend")&&(he("backend").value=t),!t)return;let e=Vn=new WebSocket(t.replace(/\/$/,"")+"/device");e.onopen=()=>Tt.onOpen(),e.onmessage=n=>{typeof n.data=="string"&&i===Io&&Wp(n.data)},e.onclose=()=>{i===Io&&(Tt.onClose(),setTimeout(()=>{i===Io&&Fo()},2e3))},e.onerror=()=>{}}var hn=new tn;hn.visible=!1;yn.add(hn);var ec=document.createElement("canvas");ec.width=ec.height=128;var _u=ec.getContext("2d"),Su=_u.createRadialGradient(64,64,6,64,64,64);Su.addColorStop(0,"rgba(0,0,0,0.5)");Su.addColorStop(1,"rgba(0,0,0,0)");_u.fillStyle=Su;_u.fillRect(0,0,128,128);var Mu=new Ie(new pi(.95,.95),new rs({map:new Zs(ec),transparent:!0,depthWrite:!1}));Mu.rotation.x=-Math.PI/2;Mu.position.y=.006;hn.add(Mu);var Xp={hips:["bip01 pelvis","hips"],head:["bip01 head","head"],lUpperArm:["bip01 l upperarm","leftarm"],lForearm:["bip01 l forearm","leftforearm"],rUpperArm:["bip01 r upperarm","rightarm"],rForearm:["bip01 r forearm","rightforearm"],lThigh:["bip01 l thigh","leftupleg"],lCalf:["bip01 l calf","leftleg"],lFoot:["bip01 l foot","leftfoot"],rThigh:["bip01 r thigh","rightupleg"],rCalf:["bip01 r calf","rightleg"],rFoot:["bip01 r foot","rightfoot"]},ZS=i=>{let t=String(i).toLowerCase().replace(/_/g," ").replace(/\s+/g," ").trim(),e=t.lastIndexOf(":");return e>=0&&(t=t.substring(e+1)),t.replace(/^mixamorig/,"")},At={ready:!1,bones:{},rest:{},leg:.85,phase:0,walk:0,headYaw:0,headPitch:0,gesture:"",gestureT:0,jaw:[],blink:[],blinkAt:2,jawNow:0,kind:"none"},qp=new _e,$p=new _e,No=new F(0,1,0);function KS(i,t){i.parent.getWorldQuaternion($p),i.quaternion.copy($p.invert().multiply(t)),i.updateMatrixWorld(!0)}function Xe(i,t,e){let n=At.bones[i];!n||e===0||(n.getWorldQuaternion(qp),KS(n,new _e().setFromAxisAngle(t,e).multiply(qp)))}function Yp(i,t,e){let n=At.bones[i],s=At.bones[t];if(!n||!s)return;let r=s.getWorldPosition(new F).sub(n.getWorldPosition(new F)).normalize(),o=new F(e.x*.13,-1,e.z*.13).normalize(),a=new F().crossVectors(r,o),l=a.length();l<1e-4||Xe(i,a.normalize(),Math.atan2(l,r.dot(o)))}function QS(i,t){let e={};i.traverse(l=>{let c=ZS(l.name);if(c in e||(e[c]=l),l.isMesh&&(l.frustumCulled=!1,l.morphTargetDictionary))for(let h in l.morphTargetDictionary){let u=h.toLowerCase();u.includes("jawopen")?At.jaw.push([l,l.morphTargetDictionary[h]]):(u.includes("eyeblinkleft")||u.includes("eyeblinkright"))&&At.blink.push([l,l.morphTargetDictionary[h]])}});for(let l in Xp)for(let c of Xp[l])e[c]&&!At.bones[l]&&(At.bones[l]=e[c]);hn.add(i),i.updateMatrixWorld(!0);let n=At.bones,s=l=>l.getWorldPosition(new F);if(n.head&&n.lFoot){let l=s(n.head).sub(s(n.lFoot));Math.abs(l.z)>Math.abs(l.y)?i.rotation.x+=l.z>0?-Math.PI/2:Math.PI/2:l.y<0&&(i.rotation.x+=Math.PI),i.updateMatrixWorld(!0)}if(n.lThigh&&n.rThigh){let l=s(n.rThigh).sub(s(n.lThigh)),c=new F().crossVectors(No,l);i.rotation.y-=Math.atan2(c.x,c.z),i.updateMatrixWorld(!0)}let r=new nn().setFromObject(i,!0),o=r.max.y-r.min.y,a=Number(Ke.get("height"))||1.7;o>.01&&i.scale.multiplyScalar(a/o),i.updateMatrixWorld(!0),r.setFromObject(i,!0),i.position.x-=(r.min.x+r.max.x)/2,i.position.z-=(r.min.z+r.max.z)/2,i.position.y-=r.min.y,i.updateMatrixWorld(!0);for(let l in n)At.rest[l]=n[l].quaternion.clone();if(At.ready=!!(n.lThigh&&n.rThigh&&n.lCalf&&n.rCalf),At.ready&&n.lFoot){let l=s(n.lThigh).distanceTo(s(n.lCalf))+s(n.lCalf).distanceTo(s(n.lFoot));l>.3&&l<1.4&&(At.leg=l)}At.kind=t}function lu(){let i=new tn,t=new Jn({color:7311285,roughness:.8}),e=(s,r)=>{let o=new Ie(s,t);return o.position.y=r,i.add(o),o};e(new ls(.17,.5,6,16),1.12),e(new Kr(.115,20,16),1.6),e(new ls(.075,.68,4,12),.42).position.x=-.1,e(new ls(.075,.68,4,12),.42).position.x=.1;let n=e(new qr(.03,.08,8),1.6);n.position.z=.13,n.rotation.x=Math.PI/2,hn.add(i),At.kind="placeholder"}function tM(){return new Promise(i=>{if(Ke.get("avatar")==="placeholder")return lu(),i();let t=new us,e=(s,r)=>{let o=t.load("./avatar/"+s);return r&&(o.colorSpace=ie),o},n=new Qs;n.setURLModifier(s=>/\.fbx$/i.test(s)?s:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),new Ol(n).load("./avatar/RocketboxAdult.fbx",s=>{try{let r={},o=a=>{let l=String(a.name||"").toLowerCase();if(r[l])return r[l];let c;return l.includes("opacity")?c=new Jn({map:e("f006_opacity_color.png",!0),transparent:!0,alphaTest:.35,side:En,roughness:.75}):l.includes("head")?c=new Jn({map:e("f006_head_color.png",!0),normalMap:e("f006_head_normal.png",!1),roughness:.7}):c=new Jn({map:e("f006_body_color.png",!0),normalMap:e("f006_body_normal.png",!1),roughness:.8}),c.name=a.name,r[l]=c,c};s.traverse(a=>{a.isMesh&&(a.material=Array.isArray(a.material)?a.material.map(o):o(a.material))}),QS(s,"rocketbox")}catch(r){console.warn("avatar setup failed, using the placeholder",r),lu()}i()},void 0,s=>{console.warn("avatar failed to load, using the placeholder",s),lu(),i()})})}function eM(i,t){let e=Tt.avatar,n=Tp(e.pos);hn.position.set(n.x,n.y,n.z),hn.rotation.y=Math.PI-e.yaw,hn.updateMatrixWorld(!0),e.gesture&&(At.gesture=e.gesture,At.gestureT=0);let s=HS();At.jawNow+=(s-At.jawNow)*Math.min(1,i*18);for(let[x,m]of At.jaw)x.morphTargetInfluences[m]=At.jawNow*.8;At.blinkAt-=i;let r=At.blinkAt<.12?1:0;At.blinkAt<0&&(At.blinkAt=2.5+Math.random()*3);for(let[x,m]of At.blink)x.morphTargetInfluences[m]=r;if(!At.ready)return;for(let x in At.bones)At.bones[x].quaternion.copy(At.rest[x]);hn.updateMatrixWorld(!0);let o=new F(Math.sin(e.yaw),0,-Math.cos(e.yaw)),a=new F().crossVectors(o,No).normalize(),l=a.clone().negate();Yp("lUpperArm","lForearm",l),Yp("rUpperArm","rForearm",a),Xe("lForearm",a,.24),Xe("rForearm",a,.24);let c=e.speed01>.06?1:0;At.walk+=Math.max(-i*4,Math.min(i*4,c-At.walk));let h=.42*Math.max(.35,Math.min(1.2,e.speed01));At.phase+=2*Math.PI*t/Math.max(.25,4*At.leg*Math.sin(h));let u=Math.sin(At.phase),f=Math.cos(At.phase);Xe("lThigh",a,u*h*At.walk),Xe("rThigh",a,-u*h*At.walk),Xe("lCalf",a,-Math.max(0,f)*.6*At.walk),Xe("rCalf",a,-Math.max(0,-f)*.6*At.walk),Xe("lUpperArm",a,-u*h*.6*At.walk),Xe("rUpperArm",a,u*h*.6*At.walk);let d=0,p=0;if(At.gesture){At.gestureT+=i;let x=At.gestureT,m=Math.min(1,x*4)*Math.min(1,Math.max(0,(1.8-x)*4));At.gesture==="wave"?(Xe("rUpperArm",o,-1.9*m),Xe("rForearm",o,-(.9+Math.sin(x*11)*.4)*m)):At.gesture==="shrug"?(Xe("lUpperArm",o,.35*m),Xe("rUpperArm",o,-.35*m),Xe("lForearm",a,.9*m),Xe("rForearm",a,.9*m)):At.gesture==="nod"?d=Math.sin(x*9)*.22*m:At.gesture==="shake_head"&&(p=Math.sin(x*9)*.35*m),x>1.8&&(At.gesture="")}if(At.bones.head){let x=At.bones.head.getWorldPosition(new F),m=ti().getWorldPosition(new F).sub(x),g=Math.atan2(m.x,m.z)-Math.atan2(o.x,o.z);g=Math.atan2(Math.sin(g),Math.cos(g));let _=Math.atan2(m.y,Math.hypot(m.x,m.z));Math.abs(g)>1.3&&(g=0,_=0);let w=Math.min(1,i*6);At.headYaw+=(Math.max(-1,Math.min(1,g))*.75-At.headYaw)*w,At.headPitch+=(Math.max(-.4,Math.min(.4,_))*.7-At.headPitch)*w,Xe("head",No,At.headYaw+p),Xe("head",a.clone().applyAxisAngle(No,At.headYaw),At.headPitch-d)}}var Zl=new tn;function nM(){yn.background=new Lt(1712166),Qt.source="simulated",Qt.floorY=0,Qt.floors=[[[-2.6,-5],[2.6,-5],[2.6,2],[-2.6,2]]];let i=new Ie(new pi(5.2,7),new Jn({color:5858158,roughness:.95}));i.rotation.x=-Math.PI/2,i.position.set(0,0,-1.5),Zl.add(i);let t=(s,r,o,a,l,c,h,u)=>{let f=new Ie(new Ni(l,c,h),new Jn({color:u,roughness:.85}));f.position.set(o,c/2,a),Zl.add(f),Qt.obstacles.push({id:s,label:r,top:c,poly:[[o-l/2,a-h/2],[o+l/2,a-h/2],[o+l/2,a+h/2],[o-l/2,a+h/2]]}),Tt.upsert(s,r,xs(o,c/2,a),{x:l,y:c,z:h},"simulated")};t("table_1","table",.2,-2.4,1.3,.74,.7,9071178),t("chair_1","chair",-1.5,-3.6,.5,.9,.5,5078154),t("plant_1","plant",1.9,-4.2,.4,1.1,.4,5212759),yn.add(Zl);let e={},n=null;return ue.domElement.addEventListener("pointerdown",s=>{n=[s.clientX,s.clientY]}),window.addEventListener("pointerup",()=>{n=null}),window.addEventListener("pointermove",s=>{n&&(Ze.rotation.y-=(s.clientX-n[0])*.004,Ze.rotation.x=Math.max(-1.2,Math.min(1.2,Ze.rotation.x-(s.clientY-n[1])*.004)),n=[s.clientX,s.clientY])}),window.addEventListener("keydown",s=>{s.target===document.body&&(e[s.key.toLowerCase()]=!0)}),window.addEventListener("keyup",s=>{e[s.key.toLowerCase()]=!1}),s=>{let r=(e.w||e.arrowup?1:0)-(e.s||e.arrowdown?1:0),o=(e.d||e.arrowright?1:0)-(e.a||e.arrowleft?1:0);if(!r&&!o)return;let a=Ze.rotation.y;Ze.position.x+=(-Math.sin(a)*r+Math.cos(a)*o)*s*1.4,Ze.position.z+=(-Math.cos(a)*r-Math.sin(a)*o)*s*1.4}}var Uo=null,ko=[],Jp=0,Oo=!1,jp=!1,Kl=0,Zp=new Map,cu={},zo=new tn;yn.add(zo);function iM(i,t){let e=Zp.get(i);return e||(cu[t]=(cu[t]||0)+1,e=t+"_"+cu[t],Zp.set(i,e)),e}var Kp=i=>String(i||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");function sM(i,t){let e=[],n=[],s=new wt,r=[],o=i.detectedPlanes;if(o)for(let h of o){let u=i.getPose(h.planeSpace,t);if(!u||!h.polygon||h.polygon.length<3)continue;s.fromArray(u.transform.matrix);let f=h.polygon.map(_=>new F(_.x,_.y,_.z).applyMatrix4(s)),d=new F(0,1,0).transformDirection(s),p=Kp(h.semanticLabel),x=new nn().setFromPoints(f),m=h.orientation?h.orientation==="horizontal":Math.abs(d.y)>.8,g=f.map(_=>[_.x,_.z]);if(!(p==="ceiling"||p==="global_mesh"))if(m){let _=(x.min.y+x.max.y)/2;p==="floor"||p===""&&Math.abs(_)<.15?e.push({poly:g,y:_}):_>.2&&_<1.9&&r.push({key:h,label:p||"surface",poly:g,top:_,box:new nn(new F(x.min.x,0,x.min.z),new F(x.max.x,_,x.max.z)),solid:!0})}else p&&p!=="wall"&&p!=="invisible_wall_face"&&p!=="wall_face"&&r.push({key:h,label:p.replace(/_frame$/,""),poly:g,top:x.max.y,box:x,solid:!1})}let a=i.detectedMeshes;if(a)for(let h of a){let u=Kp(h.semanticLabel);if(!u||u==="global_mesh"||u==="floor"||u==="ceiling"||u.includes("wall"))continue;let f=i.getPose(h.meshSpace,t);if(!f||!h.vertices||h.vertices.length<9)continue;s.fromArray(f.transform.matrix);let d=new nn,p=new nn,x=new F;for(let _=0;_+2<h.vertices.length;_+=3)d.expandByPoint(x.set(h.vertices[_],h.vertices[_+1],h.vertices[_+2])),p.expandByPoint(x.applyMatrix4(s));if(p.max.y<.2||p.min.y>1.9)continue;let m=[[p.min.x,p.min.z],[p.max.x,p.min.z],[p.max.x,p.max.z],[p.min.x,p.max.z]],g=p.getCenter(new F);r.some(_=>_.solid&&_.label===u&&Ql(g.x,g.z,_.poly))||r.push({key:h,label:u,poly:m,top:p.max.y,box:p,solid:!0})}let l=[];for(let h of r){let u=iM(h.key,h.label);l.push(u);let f=h.box.getCenter(new F),d=h.box.getSize(new F);Tt.upsert(u,h.label,xs(f.x,f.y,f.z),{x:Math.max(.1,d.x),y:Math.max(.1,d.y),z:Math.max(.1,d.z)},"room_scan"),h.solid&&n.push({id:u,label:h.label,poly:h.poly,top:h.top})}Tt.prune("room_scan",l);let c=Oo;(e.length>0||n.length>0)&&(Oo=!0),Qt.floors=e.map(h=>h.poly),Qt.obstacles=n,Qt.floorY=e.length>0?e.reduce((h,u)=>h+u.y,0)/e.length:0,Qt.source=e.length>0?"room_scan":n.length>0?"room_scan_no_floor_outline":"floor_level_only",Oo!==c&&Tt.placed&&!yu(hn.position.x,hn.position.z)&&(Tt.placed=!1),Cn?rM():zo.children.length&&zo.clear()}function rM(){zo.clear();let i=(t,e,n)=>{let s=t.concat([t[0]]).map(r=>new F(r[0],e,r[1]));zo.add(new as(new Ve().setFromPoints(s),new Fi({color:n})))};for(let t of Qt.floors)i(t,(Qt.floorY||0)+.01,3399031);for(let t of Qt.obstacles)i(t.poly,t.top,16733508)}async function sm(){xr();let i=ws;await nm(),await qS();let t=Ke.get("depth")!=="0",e={requiredFeatures:["local-floor"],optionalFeatures:["plane-detection","mesh-detection","hand-tracking"]};t&&(e.optionalFeatures.push("depth-sensing"),e.depthSensing={usagePreference:["gpu-optimized"],dataFormatPreference:["unsigned-short","float32","luminance-alpha"]});let n;try{n=await navigator.xr.requestSession("immersive-ar",e)}catch(s){Mi(!i&&ws?"Microphone is on. Press Enter AR once more.":"Could not start AR: "+(s&&s.message?s.message:s));return}Uo=n,ko=Array.from(n.enabledFeatures||[]),gr=!1,Zl.visible=!1,yn.background=null,Tt.prune("simulated",[]),Qt.source="floor_level_only",Qt.floors=[],Qt.obstacles=[],Qt.floorY=0,Tt.placed=!1,hn.visible=!1,Kl=0,Oo=!1,ue.xr.setReferenceSpaceType("local-floor"),await ue.xr.setSession(n);for(let s=0;s<2;s++){let r=ue.xr.getController(s);yn.add(r),r.addEventListener("selectstart",()=>{Ms=r,Tt.interrupt()}),r.addEventListener("squeezestart",()=>{Ms=r,Tt.placed=!1}),r.addEventListener("connected",()=>{Ms=Ms||r})}n.addEventListener("end",()=>{Uo=null,Mi("AR session ended. Reload the page to start again.")})}var oM=(()=>{let i=document.createElement("canvas");i.width=1024,i.height=256;let t=i.getContext("2d"),e=new Zs(i);e.colorSpace=ie;let n=new Ie(new pi(.48,.12),new rs({map:e,transparent:!0,depthTest:!1}));n.renderOrder=10,n.visible=!1,yn.add(n);let s="",r=0;return{update(o,a,l){if(o!==s){s=o,r=a+7,t.clearRect(0,0,1024,256),t.fillStyle="rgba(12,16,20,0.72)",t.beginPath(),t.roundRect(0,0,1024,256,28),t.fill(),t.fillStyle="#eef3f7",t.font="38px system-ui, sans-serif";let d=o.split(`
`).slice(-9),p=d.length>5?24:38;t.font=p+"px system-ui, sans-serif";let x=Math.floor(1960/p);d.forEach((m,g)=>t.fillText(m.length>x?m.slice(0,x-1)+"\u2026":m,28,(p>30?54:34)+g*(p+(p>30?8:3)))),e.needsUpdate=!0}if(n.visible=ue.xr.isPresenting&&Ke.get("hud")!=="0"&&(Cn||a<r||!ws||!Tt.connected||Tt.status==="listening"||Tt.status==="thinking"),!n.visible)return;let c=ti(),h=c.getWorldPosition(new F),u=c.getWorldDirection(new F);u.y=0,u.normalize();let f=h.clone().addScaledVector(u,.95).addScaledVector(new F().crossVectors(u,No),-.34).add(new F(0,-.4,0));n.position.lerp(f,Math.min(1,l*4)),n.lookAt(h)}}})(),Qp=0;function Mi(i){i&&gn("note: "+i),he("note").textContent=i}function aM(){let i=[];return i.push(Tt.connected?(vu()?"Running in this browser":"Backend connected")+" \xB7 brain: "+Tt.brain:vr?ue.xr.isPresenting?"No OpenAI key: leave AR and paste it on the page":"Paste your OpenAI key below to start.":"Connecting to the backend\u2026"),Tt.connected&&Tt.brain==="mock"&&i.push("No AI keys yet: open /setup on the computer running the backend"),Tt.placed||i.push(Qt.floorY===null?"Looking for the floor\u2026":"Finding a clear spot on the floor: look at open floor in front of you"),ws?Tt.micMuted?i.push("(speaking: microphone paused)"):Tt.status==="listening"?i.push("Listening\u2026"):Tt.status==="thinking"?i.push("Thinking\u2026"):i.push("Microphone on "+(Bo>.02?"\u25AE\u25AE\u25AE":Bo>.006?"\u25AE\u25AE":"\u25AE")+" : just talk"):i.push("Microphone OFF: she cannot hear you"),ue.xr.isPresenting&&!ei&&i.push("No camera: she cannot see your view"),ue.xr.isPresenting&&Qt.source!=="room_scan"&&i.push("No room scan: she stays put (run Space Setup on the headset)"),Tt.lastTranscript&&i.push(Tt.lastTranscript),Tt.lastAction&&i.push("Action: "+Tt.lastAction),Tt.lastError&&i.push(Tt.lastError),i.join(`
`)}var gu=null,hu=0,Po=null,tm=0,lM=Ke.has("halfduplex")?Ke.get("halfduplex")!=="0":zS;function cM(i,t){let e=i/1e3,n=Math.min(.1,hu?e-hu:.016);if(hu=e,t&&ue.xr.isPresenting){if(Kl+=n,e>=Jp){Jp=e+.5;let l=ue.xr.getReferenceSpace();l&&sM(t,l),!Oo&&!jp&&Kl>4&&Uo&&typeof Uo.initiateRoomCapture=="function"&&ko.includes("plane-detection")&&(jp=!0,Uo.initiateRoomCapture().catch(()=>{}))}}else gu&&gu(n);!Tt.placed&&Qt.floorY!==null&&e>=tm&&(gr||Kl>1.2)&&(tm=e+.5,Tt.placeInFrontOfUser(gr?2.2:1.8)&&(Po=null)),Tt.micMuted=lM&&Tt.speakingFor>0&&!Ss;let s=gr?Ke.has("look"):!!ei;s!==Tt.canSee&&(Tt.canSee=s,Tt.announce()),Tt.autoLook=s&&Ke.get("look")!=="0"?Number(Ke.get("look"))||10:0,Tt.wander=YS&&(Qt.source==="room_scan"||Qt.source==="simulated"),Tt.update(n),hn.visible=Tt.placed;let r=Tt.avatar.pos,o=Po?Math.hypot(r.x-Po.x,r.z-Po.z):0;Po={x:r.x,z:r.z},eM(n,o);let a=aM();he("status").textContent!==a&&(he("status").textContent=a),oM.update(Cn?tc().concat(bs.slice(-4)).join(`
`):a,e,n),Cn&&!ue.xr.isPresenting&&e-Qp>.3&&(Qp=e,he("debug").textContent=tc().concat("",bs.slice(-60)).join(`
`)),ue.render(yn,Ze)}async function hM(){he("mic").onclick=nm;let i=()=>{he("debug").hidden=!Cn,he("debugCopy").hidden=!Cn,he("debugToggle").textContent=Cn?"Hide debug":"Debug"};i(),he("debugToggle").onclick=()=>{Cn=!Cn;try{localStorage.setItem("simulacra.debug",Cn?"1":"0")}catch{}i()},he("debugCopy").onclick=()=>navigator.clipboard.writeText(tc().concat("",bs).join(`
`)).then(()=>Mi("Debug log copied."),()=>Mi("Could not copy; select the text instead.")),window.addEventListener("error",n=>gn("PAGE ERROR "+n.message)),window.addEventListener("unhandledrejection",n=>gn("PAGE ERROR "+(n.reason&&n.reason.message?n.reason.message:n.reason))),he("enter").onclick=sm,he("backendRow").hidden=!vr,he("keyRow").hidden=!vr;let t=()=>{he("keyState").textContent=xu()?"A key is saved in this browser. Paste another to replace it.":"Stays in this browser; sent only to OpenAI."};t(),he("keySave").onclick=()=>{let n=he("key").value.trim().replace(/^["']|["']$/g,"");try{n?localStorage.setItem("simulacra.openaiKey",n):localStorage.removeItem("simulacra.openaiKey")}catch{Mi("This browser will not store the key (private mode?).")}he("key").value="",t(),xr(),Vn&&Vn.readyState<=1?Vn.close():Fo()},he("backend").addEventListener("change",()=>{try{localStorage.setItem("simulacra.backend",he("backend").value.trim())}catch{}Vn&&Vn.readyState<=1?Vn.close():Fo()}),he("text").addEventListener("keydown",n=>{if(n.key!=="Enter")return;xr();let s=he("text").value.trim();s&&Tt.sendText(s),he("text").value=""}),gu=nM(),await tM(),Fo(),ue.setAnimationLoop(cM);let e=!1;try{e=!!navigator.xr&&await navigator.xr.isSessionSupported("immersive-ar")}catch{}if(e)he("enter").disabled=!1,he("mode").textContent="This browser supports AR. Press Enter AR to put the avatar in your room.",Mi("Until then this is a preview in a simulated room.");else{he("mode").textContent="PREVIEW \u2014 simulated room (this browser has no AR session)";let n=window.isSecureContext?navigator.xr?"This browser does not offer immersive AR sessions.":"This browser has no WebXR.":"AR needs a secure page: open this as http://localhost\u2026 (USB with adb reverse) or over https.";Mi(n+" Drag to look, WASD to move.")}}window.simulacra={debugLines:bs,debugSummary:tc,core:Tt,room:Qt,body:At,scene:yn,camera:Ze,renderer:ue,avatarRoot:hn,enterAR:sm,isFloor:yu,get features(){return ko},get preview(){return gr}};hM();
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
