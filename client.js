function updateih(e,a) {
  document.getElementById(e).innerHTML=a
}

function updatevalue(e,a){
  document.getElementById(e).value=a
}

function updatevaluejstr(e,o) {
  updatevalue(e,JSON.stringify(o))
}

async function fetchjson(d){
  const r = await fetch(d)
  return(r.ok)?await r.json()
  :await Promise.reject(r)
}

function post(i, n = "change", an = '/') {
  // https://stackoverflow.com/a/133997
  var hinp = document.getElementById('hiddeninput')
  hinp.value = i; if (n != "change") { hinp.name = n }
  if (an != '/') { document.getElementById('bind').action = an }
  document.getElementById('bind').submit();
}  

function tasetheight(h=40) {    
  var r=document.getElementById('r')
  r.style.height = h+"px";
  r.style.height = (r.scrollHeight)+h+"px";
}

function bcao(i_){
  if(i_){
    // console.log(i_)
    i_.forEach((e)=>{
      // console.log(e);
      Object.keys(e).forEach((f)=>{
        // console.log(`${f}_${e.i}`);
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
  // console.log();
  // if(r.scrollHeight>r.style.height){
  // }  
}

// reload l_
async function rel_(i_,la) {
  return await Promise.all(i_.map(async(i)=>{
    return {i:i.i,l_:(i.l_)?i.l_:la.l_} //
  }))  
}  

function jpev(i) {
  return JSON.parse(document.getElementById(i).value)
}

// set properties of l_
async function l_l_(f,l,i) {
  // var l_ = JSON.parse(document.getElementById('l_').value)
  // var i_ = JSON.parse(document.getElementById('i_').value)
  
  // console.log('l_',l_);
  // console.log('i_',i_);

  // console.log(JSON.parse(l_))
  // console.log(JSON.parse(i_))
  
  // exit()
  // var[l,i] = [l_[i].l_,i_[i]]

  // console.log('f',f);
  // console.log();
  
  // populate l.bn
  if (f=='dbnn'){l.bn=(await fetchjson('/api/l_/'+i.dbnn)).l}
  
  // if the first character is b, then load c_
  if(f=='b'||i.b){
    l.c=(await fetchjson(`/api/l_/${i.dbnn}/${i.b}`)).l
    // console.log("f=='b'");
    // console.log(`/api/l_/${i.dbnn}/${i.b}`);
  }
  if(+i.c>l.c.length){i.c=1;i.a=1;i.o=1}
    
  // console.log(l);
  // exit()  
  // if the first character is c, then load a_
  if(f=='c'||i.b&&i.c){
    l.a=(await fetchjson(`/api/l_/${i.dbnn}/${i.b}/?c=${i.c}`)).l}
      
  // console.log(`/api/l_/${i.dbnn}/${i.b}/?c=${i.c}`);
  // var tp = (await fetchjson(`/api/l_/${i.dbnn}/${i.b}/?c=${i.c}`))
  // console.log(tp);

  if(+i.a>l.a.length){i.a=1;i.o=1}
  if(+i.o>l.a.length){i.o=1}
  
  // if the first character is a, then load o_=a.slice(...)
  if(f=='a'||i.b&&i.c&&i.a){l.o=l.a.slice(i.a-1)}
  if(+i.a>+i.o){i.o=i.a};
  
  // console.log('l_[i.i]',l_[i.i]);
  // console.log('l',l);
  // console.log();
  // console.log('i.i',i.i);x
  // console.log('i',i);

}

async function active(an='/'){
  var e = document.activeElement
  var [n,a]=[e.id,e.value]

  
  // update 'w','s' 
  // if(!a){
    // JSON.parse(document.getElementById('i_').value).every(
      // async(i)=>{var b=0;['w','s'].every(async(f)=>{
        // var n_=`${f}_${i.i}`; 
        // var a_=document.getElementById(n_).value
        // if(+a_!=+i[f]){n=n_;a=a_;b=1;return false}
        // else{return true}
      // })
      // return(b==0)
    // })
  // }
  
  if(f=='j'){a=(e.checked)?1:0}
  var [f,i]=n.split('_')
  var [i_,l_]=[jpev('i_'),jpev('l_')]
  var[i,l]=[i_[i],l_[i].l_];i[f]=a
  // console.log(i_);
  await l_l_(f,l,i)
  console.log('after l_l_(), i_:',i_);
  console.log('after l_l_(), l_:',l_);
  console.log();
  updatei_l_(i_,l_)
  // post(a,n,an)
}

function passive(f_=['m','j','w','s','y']){
  var i_=jpev('i_')
  i_.forEach(
    async(i)=>{f_.forEach(async(f)=>{
      var nn=`${f}_${i.i}`; 
      var en=document.getElementById(nn)
      en=''+((f=='j')?+en.checked:en.value)
      // console.log(en)
      if(f=='j'){i[f]=+i[f]}
      // console.log(n_,en)
      // console.log(f,i.i,i[f],+i[f],+i[f]+'')
      if(en!=''+i[f]){i[f]=en}
    })}
  );
  // console.log(i_)
  updatevalue('i_',JSON.stringify(i_))
  console.log(document.getElementById('i_').value);
  console.log();
}

async function buttons(an='/'){
  // passive()
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
      
      // console.log()
      updateih('r',(await fetchjson('/api?i_='+JSON.stringify(i_))).r)
      tasetheight()
      // updateih('r', (await fetchjson('/api?i_='+i_)))
      // post(a_id,"change",an)
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
    // console.log(Object.prototype.toString.call(i_));
    // console.log();
    updatei_l_(i_,l_)
  }

  // console.log(document.getElementById('i_').value)
  // console.log(document.activeElement.id)
}

// function hget(d) {
//   var r=new XMLHttpRequest();
//   r.open('GET',d,false)
//   r.send(null); 
//   return r.responseText
// }

// function ht2o(d){return JSON.parse(hget(d))}

function hbs_(e) {
  return Handlebars.compile(document.getElementById(e).innerHTML)
}

const hbsq = hbs_('qi__')

function updatei_l_(i_,l_,db__=undefined,b_=undefined) {
  // const k___ = await fetchjson('/api/k')
  
  // get db__, b_ from hidden form
  if(!db__){db__=jpev('db__')}
  if(!b_){b_=jpev('b_')}
  // console.log('l_',l_);
  // console.log();
  // console.log(hbsq({db__,b_,i_,l_}));
  // console.log();
  // exit()
  
  updateih('qi',hbsq({db__,b_,i_,l_}));
  // console.log(i_);
  // console.log();
  
  bcao(i_)
  updatevaluejstr('i_',i_)
  updatevaluejstr('l_',l_)
}

const ia_p={b:0,c:0,a:0,o:0,}
const la_p={c:[{}],a:[{}],o:[{}],}

async function initialise(){  
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
  // console.log(l_);

  // i_=await Promise.all(i_.map(async(e,i)=>{return{...e,l_:l_[i].l_}}))

  updatei_l_(i_,l_,db__,b_)
}

(async()=>{await initialise()})()
// iapi.then((d) => {
//   // This is the JSON from our response
//   d_=d;document.getElementById('Abel').innerHTML=mhbs(d);bcao(d.i_)
//   console.log(d);
// }).catch((er)=>{console.error(er)})

// console.log(qu.i_);
// iapi.then(()=>{bcao(qu.i_)}).catch((er)=>{console.error(er)})


// function geti(){
//   return JSON.parse(document.getElementById('i_').value)
// }

// // update input 'i_' in 'bind'

// function msub(){
//   var f=document.getElementById('qi')
//   f.action='/s'
//   f.submit()
// }

// function sayHi() {
//   var p = document.createElement('p')
//   p.innerHTML = "Hi"
//   document.body.appendChild(p)
// }

// var tstr = document.getElementById('template').innerHTML
// var thbs = Handlebars.compile(tstr)

// var t = thbs({
//   name: 'lalalala',
//   b: 'lala',
//   c: 'la',
// })

// // console.log(t);

// var iapi = $.ajax({
//   type:'get',
//   url:'/api'
// })

// iapi.then(
//   (p)=>{
//     // console.log(p);
//     var m = mhbs(p)
//     console.log(m);
//     $('body').append(m)
//   }
// )

// ok.then(function(p){
//   console.log(p);
//   var t = thbs({
//     name: 'lalalala',
//     b: 'lala',
//     c: 'la',
//   })
//   console.log(t);
// },function (er) {
//   console.error(er);
// })

// console.log("Hi");



// console.log(params.i_);

