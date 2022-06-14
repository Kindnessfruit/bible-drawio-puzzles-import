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
  return JSON.parse(document.getElementById(i).value)
}

async function fetchjson(d){
  const r = await fetch(d)
  return(r.ok)?await r.json()
  :await Promise.reject(r)
}

function tasetheight(h=40) {    
  var r=document.getElementById('r')
  r.style.height = h+"px";
  r.style.height = (r.scrollHeight)+h+"px";
}

function bcao(i_){
  if(i_){
    i_.forEach((e)=>{
      Object.keys(e).forEach((f)=>{
        var m=document.getElementById(`${f}_${e.i}`)
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

// reload l_
async function rel_(i_,la) {
  return await Promise.all(i_.map(async(i)=>{
    return {i:i.i,l_:(i.l_)?i.l_:la.l_} //
  }))  
}  

// set properties of l_
async function l_l_(f,l,i) {  
  // populate l.bn
  if (f=='dbnn'){l.bn=(await fetchjson('/api/l_/'+i.dbnn)).l}

  // future: change the list of options of the loading column to [{appropriatekey:'loading'}]
  
  // if the first character is b, then load c_
  if(f=='b'||i.b){
    l.c=(await fetchjson(`/api/l_/${i.dbnn}/${i.b}`)).l}
  if(+i.c>l.c.length){i.c=1;i.a=1;i.o=1}

  // if the first character is c, then load a_
  if(f=='c'||i.b&&i.c){
    l.a=(await fetchjson(`/api/l_/${i.dbnn}/${i.b}/?c=${i.c}`)).l}

  if(+i.a>l.a.length){i.a=1;i.o=1}
  if(+i.o>l.a.length){i.o=1}
  
  // if the first character is a, then load o_=a.slice(...)
  if(f=='a'||i.b&&i.c&&i.a){l.o=l.a.slice(i.a-1)}
  if(+i.a>+i.o){i.o=i.a};
}

function hbs_(e){
  return Handlebars.compile(document.getElementById(e).innerHTML)
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

async function active(an='/'){
  var e = document.activeElement
  var [n,a]=[e.id,e.value]
  
  if(f=='j'){a=(e.checked)?1:0}
  var [f,i]=n.split('_')
  var [i_,l_]=[jpev('i_'),jpev('l_')]
  var[i,l]=[i_[i],l_[i].l_];i[f]=a
  
  await l_l_(f,l,i)
  console.log('after l_l_(), i_:',i_);
  console.log('after l_l_(), l_:',l_);
  console.log();
  updatei_l_(i_,l_)
}

function passive(f_=['m','j','w','s','y']){
  var i_=jpev('i_')
  i_.forEach(
    async(i)=>{f_.forEach(async(f)=>{
      var nn=`${f}_${i.i}`; 
      var en=document.getElementById(nn)
      en=''+((f=='j')?+en.checked:en.value)
      if(f=='j'){i[f]=+i[f]}
      if(en!=''+i[f]){i[f]=en}
    })}
  );
  updatevalue('i_',JSON.stringify(i_))
  console.log(document.getElementById('i_').value);
  console.log();
}

async function buttons(an='/'){
  var a_id=document.activeElement.id
  var m={b:'book',c:'chapter',a:'the starting verse',o:'the ending verse'}
  var i_=jpev('i_');var [n,fn,fi]=[1,'',''];
  if(a_id=='submit'){
    var f_=['b','c','a','o']
    i_.every((i)=>{i=i.i;f_.every((f)=>{
        if(!document.getElementById(f+'_'+i).value){
          n=0;fn=f;fi=i}
        return(n)?true:false
      });return(n)?true:false
    })    
    if(!n){alert(`Form incomplete. Please select ${m[fn]} from group ${fi}.`)
       
    }else{
      // api call
      updateih('r','loading...')
      updateih('r',(await fetchjson('/api?i_='+JSON.stringify(i_))).r)
      tasetheight()
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
  }
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
  const db__ = await Promise.all(k___.db_a.map(async (e) => { return { n: e } }))
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
  
  var i_=JSON.parse(qu.i_)
  i_=(i_)?i_:[{i:0,...ia}]

  var l_=await rel_(i_,la)

  updatei_l_(i_,l_,db__,b_)
}

(async()=>{await initialise()})()