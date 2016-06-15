!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.catNap=e():t.catNap=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";t.exports={Server:r(3),Endpoint:r(4),Model:r(1),Schema:r(2)}},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=function(){function t(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(c){o=!0,i=c}finally{try{!n&&u["return"]&&u["return"]()}finally{if(o)throw i}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i={paths:Symbol("paths"),dirtyList:Symbol("dirtyList"),parent:Symbol("parent")},a=function(t,e){var r=this,n=Symbol(t);this[i.paths].set(t,n),Object.defineProperty(this,t,{get:function(){return r[n]}})},u=function(){var t=!0,e=!1,r=void 0;try{for(var n,i=this.constructor.schema[Symbol.iterator]();!(t=(n=i.next()).done);t=!0){var u=o(n.value,2),c=u[0],s=u[1];a.call(this,c,s)}}catch(f){e=!0,r=f}finally{try{!t&&i["return"]&&i["return"]()}finally{if(e)throw r}}},c=function(){function t(e,n){r(this,t),this[i.parent]=n,this[i.paths]=new Map,this[i.dirtyList]=new Set,u.call(this),this.merge(e)}return n(t,[{key:"clearDirtyList",value:function(){this[i.dirtyList].clear()}},{key:"merge",value:function(t){var e=this;return Object.keys(t).forEach(function(r){var n=t[r],o=e[i.paths].get(r);if(!o){if(e.constructor.schema.strict)return;a.call(e,r),o=e[i.paths].get(r)}e[o]=n,e[i.dirtyList].add(r)}),this}},{key:"reduce",value:function(t,e){var r=!0,n=!1,a=void 0;try{for(var u,c=this[i.paths][Symbol.iterator]();!(r=(u=c.next()).done);r=!0){var s=o(u.value,2),f=s[0],l=s[1];e=t.call(this,e,f,this[l])}}catch(p){n=!0,a=p}finally{try{!r&&c["return"]&&c["return"]()}finally{if(n)throw a}}return e}},{key:"values",get:function(){return Object.assign({},this.reduce(function(t,e,r){return t[e]=r,t},{}))}},{key:"dirtyValues",get:function(){var t={},e=!0,r=!1,n=void 0;try{for(var o,a=this[i.dirtyList][Symbol.iterator]();!(e=(o=a.next()).done);e=!0){var u=o.value;t[u]=this[u]}}catch(c){r=!0,n=c}finally{try{!e&&a["return"]&&a["return"]()}finally{if(r)throw n}}return Object.assign({},t)}},{key:"parentDoc",get:function(){return this[i.parent]}},{key:"primaryIdentifier",get:function(){return this[this.constructor.schema.primary]}}]),t}();t.exports=c},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(6),a=function(){function t(){var e=this,r=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];n(this,t),this.data=new Map,this[Symbol.iterator]=this.data[Symbol.iterator].bind(this.data),Object.keys(r).forEach(function(t){return e.set(t,r[t])}),Object.assign(this,o)}return o(t,[{key:"set",value:function(t,e){e.primary&&(this.primary=t),this.data.set(t,new i(e))}},{key:"get",value:function(t){return this.data.get(t)}}]),t}();t.exports=a},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(11).JsonFetcher,a=new i,u=function(){function t(e){n(this,t),this.base=e,this.config({credentials:"include"})}return o(t,[{key:"config",value:function(t){a.config(t)}},{key:"get",value:function(t){return a.get(this.base+t)}},{key:"delete",value:function(t){return a["delete"](base+t)}},{key:"post",value:function(t,e){return a.post(this.base+t,{body:e})}},{key:"put",value:function(t,e){return a.put(base+t,{body:e})}}]),t}();t.exports=u},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=(r(3),r(1),function(t,e){var r=this;return t.map(function(t){return a.call(r,t,e)})}),a=function(t,e){return new this(t,e)},u=function(){function t(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return n(this,t),this.parent=r,this.data=new this.constructor.model(e,r.model),new Proxy(this,{get:function(t,e){return t[e]?t[e]:t.data[e]}})}return o(t,[{key:"update",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!this.id)throw new Error("cannot update document without id. try calling create");this.data.merge(e);var r=this.data.dirtyValues;return this.constructor.server.put(this.url,r).then(function(e){return t.data.merge(e)}).then(function(){return t.data.clearDirtyList()})}},{key:"create",value:function(){var t=this;if(this.id)throw new Error("cannot recreate document that already has identifier");return this.constructor.create(this.data.values).then(function(e){return t.data.merge(e)}).then(function(){return t.data.clearDirtyList()})}},{key:"delete",value:function(){return this.constructor["delete"](this.url)}},{key:"id",get:function(){return this.data[primaryIdentifier]}},{key:"parentUrl",get:function(){return this.parent?this.parent.url:this.constructor.path}},{key:"url",get:function(){var t=void 0;return this.constructor.parents&&(t=this.constructor.parents.get(this.parent.constructor)),[this.parentUrl,t,this.id].filter(function(t){return!!t}).join("/")}}],[{key:"find",value:function(){arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(this.parent)throw new Error("cannot find on nested route");return this.server.get(this.path).then(i.bind(this))}},{key:"delete",value:function(t){return this.server["delete"](t)}},{key:"findById",value:function(t){if(this.parent)throw new Error("cannot find by id on nested route");return this.server.get(this.path+"/"+t).then(a.bind(this))}},{key:"create",value:function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(this.parent)throw new Error("cannot create "+this.name+" with create method because "+this.name+" is a subclass. call create from a parent.");return this.server.post(this.path,t).then(a.bind(this))}}]),t}();t.exports=u,t.exports.Schema=r(2)},function(t,e){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i=function(t){function e(){return r(this,e),n(this,Object.getPrototypeOf(e).apply(this,arguments))}return o(e,t),e}(Error);t.exports=i},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(8),a=r(5),u=function(){this.type&&this.validators.push("type"),this.validators=this.validators.map(function(t){return"string"==typeof t?i[t]:t}).filter(function(t){return!!t})},c=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];n(this,t),Object.assign(this,e),this.validators=this.validators||[],u.call(this)}return o(t,[{key:"validate",value:function(t){var e=this,r=this.validators.map(function(e){return e.validator(t)});return Promise.all(r).then(function(r){return r.map(function(r,n){return r?new a(e.validators[n].error(t)):void 0})}).then(function(t){return t.filter(function(t){return!!t})})}}]),t}();t.exports=c},function(t,e){"use strict";t.exports.validator=function(t){var e=/\S+@\S+\.\S+/;return e.test(t)},t.exports.error=function(t){return t+" is not an email address"}},function(t,e,r){"use strict";e.email=r(7),e.required=r(9),e.type=r(10)},function(t,e){"use strict";t.exports.validator=function(t){return!(void 0).required||!!t},t.exports.error=function(){return"Value is required for this path"}},function(t,e){"use strict";t.exports.validator=function(t){return!!t&&t.constructor===(void 0).type},t.exports.error=function(t){return t+" does not match correct type"}},function(t,e,r){!function(e,r){t.exports=r()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=r(4),u=r(2),c=r(3),s={credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"}},f=function(t){return"string"===!("undefined"==typeof t?"undefined":i(t))?t:JSON.stringify(t)},l=function(t){return"string"==typeof t?t:a.stringify(options.query)},p=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];n(this,t),this.defaults=Object.assign(e,s)}return o(t,[{key:"config",value:function(t){c(this.defaults,t)}},{key:"request",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(e=Object.assign(u(this.defaults),e),e.body)try{e.body=f(e.body)}catch(r){return Promise.reject(r)}return e.query&&(e.query=l(e.query),t+="?"+e.query),fetch(t,e).then(function(t){return t.json()}).then(function(t){return"string"==typeof t?JSON.parse(t):t})}}]),t}();["head","options","connect","get","post","put","delete"].reduce(function(t,e){return t[e]=function(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return r.method=e.toUpperCase(),this.request(t,r)},t},p.prototype),e.JsonFetcher=p},function(t,e){"use strict";var r=function(){for(var t=new Array(256),e=0;256>e;++e)t[e]="%"+((16>e?"0":"")+e.toString(16)).toUpperCase();return t}();e.arrayToObject=function(t,e){for(var r=e.plainObjects?Object.create(null):{},n=0;n<t.length;++n)"undefined"!=typeof t[n]&&(r[n]=t[n]);return r},e.merge=function(t,r,n){if(!r)return t;if("object"!=typeof r){if(Array.isArray(t))t.push(r);else{if("object"!=typeof t)return[t,r];t[r]=!0}return t}if("object"!=typeof t)return[t].concat(r);var o=t;return Array.isArray(t)&&!Array.isArray(r)&&(o=e.arrayToObject(t,n)),Object.keys(r).reduce(function(t,o){var i=r[o];return Object.prototype.hasOwnProperty.call(t,o)?t[o]=e.merge(t[o],i,n):t[o]=i,t},o)},e.decode=function(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(e){return t}},e.encode=function(t){if(0===t.length)return t;for(var e="string"==typeof t?t:String(t),n="",o=0;o<e.length;++o){var i=e.charCodeAt(o);45===i||46===i||95===i||126===i||i>=48&&57>=i||i>=65&&90>=i||i>=97&&122>=i?n+=e.charAt(o):128>i?n+=r[i]:2048>i?n+=r[192|i>>6]+r[128|63&i]:55296>i||i>=57344?n+=r[224|i>>12]+r[128|i>>6&63]+r[128|63&i]:(o+=1,i=65536+((1023&i)<<10|1023&e.charCodeAt(o)),n+=r[240|i>>18]+r[128|i>>12&63]+r[128|i>>6&63]+r[128|63&i])}return n},e.compact=function(t,r){if("object"!=typeof t||null===t)return t;var n=r||[],o=n.indexOf(t);if(-1!==o)return n[o];if(n.push(t),Array.isArray(t)){for(var i=[],a=0;a<t.length;++a)t[a]&&"object"==typeof t[a]?i.push(e.compact(t[a],n)):"undefined"!=typeof t[a]&&i.push(t[a]);return i}for(var u=Object.keys(t),c=0;c<u.length;++c){var s=u[c];t[s]=e.compact(t[s],n)}return t},e.isRegExp=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},e.isBuffer=function(t){return null===t||"undefined"==typeof t?!1:!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))}},function(t,e){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},n=t.exports=function(t){if(null==t||"object"!=("undefined"==typeof t?"undefined":r(t)))return t;var e=t.constructor();return Object.keys(t).forEach(function(r){t instanceof Object?e[r]=n(t[r]):e[r]=t[r]}),e}},function(t,e){"use strict";function r(t){return t&&"object"===("undefined"==typeof t?"undefined":n(t))&&!Array.isArray(t)&&null!==t}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},o=t.exports=function(t,e){return r(t)&&r(e)?(Object.keys(e).forEach(function(n){r(e[n])?(t[n]||(t[n]={}),o(t[n],e[n])):t[n]=e[n]}),t):t}},function(t,e,r){"use strict";var n=r(6),o=r(5);t.exports={stringify:n,parse:o}},function(t,e,r){"use strict";var n=r(1),o={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1e3,strictNullHandling:!1,plainObjects:!1,allowPrototypes:!1,allowDots:!1,decoder:n.decode},i=function(t,e){for(var r={},n=t.split(e.delimiter,e.parameterLimit===1/0?void 0:e.parameterLimit),o=0;o<n.length;++o){var i=n[o],a=-1===i.indexOf("]=")?i.indexOf("="):i.indexOf("]=")+1;if(-1===a)r[e.decoder(i)]="",e.strictNullHandling&&(r[e.decoder(i)]=null);else{var u=e.decoder(i.slice(0,a)),c=e.decoder(i.slice(a+1));Object.prototype.hasOwnProperty.call(r,u)?r[u]=[].concat(r[u]).concat(c):r[u]=c}}return r},a=function c(t,e,r){if(!t.length)return e;var n,o=t.shift();if("[]"===o)n=[],n=n.concat(c(t,e,r));else{n=r.plainObjects?Object.create(null):{};var i="["===o[0]&&"]"===o[o.length-1]?o.slice(1,o.length-1):o,a=parseInt(i,10);!isNaN(a)&&o!==i&&String(a)===i&&a>=0&&r.parseArrays&&a<=r.arrayLimit?(n=[],n[a]=c(t,e,r)):n[i]=c(t,e,r)}return n},u=function(t,e,r){if(t){var n=r.allowDots?t.replace(/\.([^\.\[]+)/g,"[$1]"):t,o=/^([^\[\]]*)/,i=/(\[[^\[\]]*\])/g,u=o.exec(n),c=[];if(u[1]){if(!r.plainObjects&&Object.prototype.hasOwnProperty(u[1])&&!r.allowPrototypes)return;c.push(u[1])}for(var s=0;null!==(u=i.exec(n))&&s<r.depth;)s+=1,(r.plainObjects||!Object.prototype.hasOwnProperty(u[1].replace(/\[|\]/g,""))||r.allowPrototypes)&&c.push(u[1]);return u&&c.push("["+n.slice(u.index)+"]"),a(c,e,r)}};t.exports=function(t,e){var r=e||{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.delimiter="string"==typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=r.parseArrays!==!1,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===t||null===t||"undefined"==typeof t)return r.plainObjects?Object.create(null):{};for(var a="string"==typeof t?i(t,r):t,c=r.plainObjects?Object.create(null):{},s=Object.keys(a),f=0;f<s.length;++f){var l=s[f],p=u(l,a[l],r);c=n.merge(c,p,r)}return n.compact(c)}},function(t,e,r){"use strict";var n=r(1),o={brackets:function(t){return t+"[]"},indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},i={delimiter:"&",strictNullHandling:!1,skipNulls:!1,encode:!0,encoder:n.encode},a=function u(t,e,r,o,i,a,c,s,f){var l=t;if("function"==typeof c)l=c(e,l);else if(l instanceof Date)l=l.toISOString();else if(null===l){if(o)return a?a(e):e;l=""}if("string"==typeof l||"number"==typeof l||"boolean"==typeof l||n.isBuffer(l))return a?[a(e)+"="+a(l)]:[e+"="+String(l)];var p=[];if("undefined"==typeof l)return p;var y;if(Array.isArray(c))y=c;else{var d=Object.keys(l);y=s?d.sort(s):d}for(var h=0;h<y.length;++h){var v=y[h];i&&null===l[v]||(p=Array.isArray(l)?p.concat(u(l[v],r(e,v),r,o,i,a,c,s,f)):p.concat(u(l[v],e+(f?"."+v:"["+v+"]"),r,o,i,a,c,s,f)))}return p};t.exports=function(t,e){var r,n,u=t,c=e||{},s="undefined"==typeof c.delimiter?i.delimiter:c.delimiter,f="boolean"==typeof c.strictNullHandling?c.strictNullHandling:i.strictNullHandling,l="boolean"==typeof c.skipNulls?c.skipNulls:i.skipNulls,p="boolean"==typeof c.encode?c.encode:i.encode,y=p?"function"==typeof c.encoder?c.encoder:i.encoder:null,d="function"==typeof c.sort?c.sort:null,h="undefined"==typeof c.allowDots?!1:c.allowDots;if(null!==c.encoder&&void 0!==c.encoder&&"function"!=typeof c.encoder)throw new TypeError("Encoder has to be a function.");"function"==typeof c.filter?(n=c.filter,u=n("",u)):Array.isArray(c.filter)&&(r=n=c.filter);var v=[];if("object"!=typeof u||null===u)return"";var b;b=c.arrayFormat in o?c.arrayFormat:"indices"in c?c.indices?"indices":"repeat":"indices";var m=o[b];r||(r=Object.keys(u)),d&&r.sort(d);for(var g=0;g<r.length;++g){var w=r[g];l&&null===u[w]||(v=v.concat(a(u[w],w,m,f,l,y,n,d,h)))}return v.join(s)}}])})}])});
//# sourceMappingURL=index.js.map