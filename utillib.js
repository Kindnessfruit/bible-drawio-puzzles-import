export var jstypestr = (function (global) {
  var cache = {};
  return function (obj) {
    var key;
    return obj === null ? 'null' // null
    : obj === global ? 'global' // window in browser or global in nodejs
    : (key = typeof obj) !== 'object' ? key // basic: string, boolean, number, undefined, function
    : obj.nodeType ? 'object' // DOM element
    : cache[key = ({}).toString.call(obj)] // cached. date, regexp, error, object, array, math
    || (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
  };
}(this));

export function jsobjstr(o){return JSON.stringify(o, null, 4)}
export function jslogtype(o){console.log(jstypestr(o))}
export function jslogobj(o){console.log(jsobjstr(o))}
export function jsjoinkey_field(o,j=1){
  var r='';for(var i in o){r+=((j>0)?i+' ':'')+o[i]+'\n'}return r
}
export function jsT2DA(a){
  return a[0].map(function(_,c){
    return a.map(function(r){return r[c]})})
}
export function jsCSVr(a,dlmt='","'){return `"${a.join(dlmt)}"`}
export function jsACSV(a,dlmt='","'){return a.map(l=>jsCSVr(l,dlmt)).join('\n')}
export function jsPEXT(c=undefined){process.exit(c)}
export function jsrn(n=12){return Math.round(Math.random()*(10**n))}
export default { 
  jstypestr,
  jsobjstr,
  jslogtype,
  jslogobj,
  jsjoinkey_field,
  jsT2DA,
  jsCSVr,
  jsACSV,
  jsPEXT,
  jsrn,
}