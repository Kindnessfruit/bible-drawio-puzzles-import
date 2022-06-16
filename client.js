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

function tasetheight(h=40) {    
  var r=dget('r')
  r.style.height = h+"px";
  r.style.height = (r.scrollHeight)+h+"px";
}

function bcao(i_){
  if(i_){
    i_.forEach((e)=>{
      Object.keys(e).forEach((f)=>{
        var m=dget(`${f}_${e.i}`)
        if(f!='i'){
          if(f!='l_'){m.value=e[f]}
          if(f=='j'){m.checked=(+e[f])
          }  
        }  
      })  
    })  
  }
  tasetheight()
}

// set properties of l_
async function l_l_(f,i,l,u=1) {  
  // populate l.bn
  if (u&&f=='dbnn'){l.bn=(await fetchjson('/api/l_/'+i.dbnn)).l}  //

  // future: change the list of options of the loading column to [{appropriatekey:'loading'}]
  
  // if the first character is b, then load c_
  if(u&&f=='b'||+i.b){                                            //
    l.c=await Promise.all(
      Object.keys(jpev('menu')[i.b]).map(async(c)=>{return{c:c}}))
  }
  if(u&&+i.c>l.c.length){i.c=0;i.a=0;i.o=0}
  // load chapter 1 of the book when it's been selected for the first time.
  if(u&&f=='b'){if(!+i.c){i.c=1}}

  // if the first character is c, then load a_
  if(u&&f=='c'||+i.b&&+i.c){                                      //
    l.a=await Promise.all(jpev('menu')[i.b][i.c].map(async(n)=>{return{v:n}}))
  }
  // load the beginning and the end verse of a chapter when a chapter is selected,
  // when the verses themselves have not been selected.
  if(u&&f=='c'){if(!+i.a){i.a=1};if(!+i.o){i.o=l.a.length}}
  
  // if the prior selections exceeded the number of verses available in the current chapter,
  // then reset verses according to the current chapter.
  if(u&&+i.a>l.a.length){i.a=1;i.o=l.a.length}
  if(u&&+i.o>l.a.length){i.o=l.a.length}
  
  // if the first character is a, then load o_=a.slice(...)
  if(u&&f=='a'||+i.b&&+i.c&&+i.a){l.o=l.a.slice(i.a-1)}
  if(u&&f=='a'){if(!+i.o){i.o=l.a.length}}
  if(u&&+i.a>+i.o){i.o=i.a};
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

// reload l_
async function rel_(i_,la=undefined){
  if(!la){la=jpev('la')}
  var d=i_.length*4
  var n=0;appendCounter('qi',n,d)
  return await Promise.all(i_.map(async(i)=>{
    var l={...la.l_};
    t=['dbnn','b','c','a',];
    for(ti in t){var f=t[ti]
      if(+i[f]){await l_l_(f,i,l,0)}
      n++;appendCounter('qi',n,d)
    }
    return {i:i.i,l_:l}
  }))
}

function hbs_(e){
  return Handlebars.compile(dget(e).innerHTML)
}

const hbsq = hbs_('qi__')

function updatei_l_(i_,l_,db__=undefined,b_=undefined) {  
  // get db__, b_ from hidden form
  if(!db__){db__=jpev('db__')}
  if(!b_){b_=jpev('b_')}
  
  updateih('qi',hbsq({db__,b_,i_,l_}));
  
  bcao(i_)
  updatevaluejstr('i_',i_)
  updatevaluejstr('l_',l_)
}

function ohandler(){
  const n=document.activeElement.id
  const i=n.split('_')[1]
  const a=ea('a_'+i)

  var i_=jpev('i_');i_[i].o=a
  updatevaluejstr('i_',i_)
  updatevalue('o_'+i,a)

  // whpushstate('/?i_='+JSON.stringify(i_))

  console.log(`after ohandler() on ${n}, i_:`,jpev('i_'));
  console.log();
}

async function active(){
  var e=document.activeElement
  var [n,a]=[e.id,e.value]
  
  if(f=='j'){a=(e.checked)?1:0}
  var [f,i]=n.split('_')
  var [i_,l_]=[jpev('i_'),jpev('l_')]
  var[i,l]=[i_[i],l_[i].l_];i[f]=a
  
  await l_l_(f,i,l)
  console.log('after l_l_(), i_:',i_);
  console.log('after l_l_(), l_:',l_);
  console.log();
  updatei_l_(i_,l_)

  // whpushstate('/?i_='+JSON.stringify(i_))
}

function passive(f_=['m','j','w','s','y']){
  var i_=jpev('i_')
  i_.forEach(
    async(i)=>{f_.forEach(async(f)=>{
      var nn=`${f}_${i.i}`; 
      var en=dget(nn)
      en=''+((f=='j')?+en.checked:en.value)
      if(f=='j'){i[f]=+i[f]}
      if(en!=''+i[f]){i[f]=en}
    })}
  );
  updatevaluejstr('i_',i_)
  console.log(ea('i_'));
  console.log();

  // whpushstate('/?i_='+JSON.stringify(i_))
}

async function getresults(i_){
  updateih('r','loading...')
  tasetheight()
  updateih('r',(await fetchjson('/api?i_='+JSON.stringify(i_))).r)
  tasetheight()
}

async function buttons(){
  var a_id=document.activeElement.id
  var m={b:'book',c:'chapter',a:'the starting verse',o:'the ending verse'}
  var i_=jpev('i_');var [n,fn,fi]=[1,'',''];
  if(a_id=='submit'){
    var f_=['b','c','a','o']
    i_.every((i)=>{i=i.i;f_.every((f)=>{
        if(!ea(f+'_'+i)){n=0;fn=f;fi=i}
        return(n)?true:false
      });return(n)?true:false
    })    
    if(!n){alert(`Form incomplete. Please select ${m[fn]} from group ${fi}.`)}
    else{
      // api call
      whpushstate('/?i_='+JSON.stringify(i_)+'&r=1')
      getresults(i_)
    }
  }else{
    var l_ = jpev('l_')
    if(a_id=='more'){
      i_.push({i:i_.length,...jpev('ia')})
      l_.push({i:l_.length,...jpev('la')})
    }
    if(a_id=='less'){
      i_.pop()
      l_.pop()
    }
    console.log(`after "${a_id}" button press, i_:`,i_);
    console.log(`after "${a_id}" button press, l_:`,l_);
    console.log();
    updatei_l_(i_,l_)

    // whpushstate('/?i_=' + JSON.stringify(i_))
  }
}

function updateurl(){
  whpushstate('/?i_='+JSON.stringify(jpev('i_'))+'&r=1')
}

const ia_p={b:0,c:0,a:0,o:0,}
const la_p={c:[{}],a:[{}],o:[{}],}

async function initialise(){
  updateih('qi','Initialising form...')

  var sdir = window.location.search
  // get query string values in JavaScript: https://stackoverflow.com/a/901144
  const qu = new Proxy(new URLSearchParams(sdir), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  
  const k___ = await fetchjson('/api/k')
  const db__ = await Promise.all(k___.db_a.map(async(e)=>{return{n:e}}))
  const b_ = k___.b_

  updatevaluejstr('db__',db__)
  updatevaluejstr('b_',b_)

  const kq = k___.k_.q
  const ia = {
    ...ia_p,
    ...kq,
  }  
  const la={l_:{
    ...la_p,
    bn:(await fetchjson('/api/l_/'+kq.dbnn)).l}
  }

  updatevaluejstr('kq',kq)
  updatevaluejstr('ia',ia)
  updatevaluejstr('la',la)

  const menu = await fetchjson('/api/menu.json')

  updatevaluejstr('menu',menu)
  
  var i_=JSON.parse(qu.i_)
  i_=(i_)?i_:[{i:0,...ia}]

  if(+qu.r){getresults(i_)}

  var l_=await rel_(i_,la)

  updatei_l_(i_,l_,db__,b_)
}

(async()=>{await initialise()})()