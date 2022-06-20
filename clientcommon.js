function dget(e){
  return document.getElementById(e)
}

function ea(e){
  return dget(e).value
}

function updateih(e,a) {
  document.getElementById(e).innerHTML=a
}

function updatevalue(e,a){
  document.getElementById(e).value=a
}

function updatevaluejstr(e,o) {
  updatevalue(e,JSON.stringify(o))
}

function jpev(i) {
  return JSON.parse(ea(i))
}

function whpushstate(u){
  window.history.pushState({},'',u)
}

async function fetchjson(d){
  const r = await fetch(d)
  return(r.ok)?await r.json()
  :await Promise.reject(r)
}

function hbs_(e) {
  return Handlebars.compile(dget(e).innerHTML)
}

function appendCounter(e,n,d,i_id='counter') {
  var t=n+'/'+d
  var c=dget(i_id)
  if(c){updateih(i_id,t)}
  else{c=Object.assign(
      document.createElement('div'),
      {id:i_id,innerHTML:t}
    )
    document.getElementById(e).appendChild(c)
}}