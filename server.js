import ep from "express";
import hb from "express-handlebars";

import cl from "./bibledrawiolib.js";
import u_ from "./utillib.js";

import sess from 'express-session';

import { readdirSync } from "fs";

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// jsPEXT()
// server ocde
const host = ep()
var port = process.env.PORT || 8000

host.engine('handlebars', hb())
host.set('view engine', 'handlebars')
// body parser
host.use(ep.urlencoded())
host.use(sess({
  secret:'secret-key',
  resave: false,
  saveUninitialized: false,
}))

const k_ = cl.k
const kq = k_.q

var [ic,osrt,okey,ii] = 
['ic','osrt','okey','ii']
var [ic,osrt,okey,ii] = 
[k_[ic],k_[osrt],k_[okey],k_[ii]]

var ia = {
  b:0,c:0,a:0,o:0,
  ...kq,
}

var db_a = readdirSync(k_.ddir)
var db__ = await Promise.all(db_a.map(async(e)=>{return{n:e}}))

var ddb3=cl.b3(k_.ddir+kq.dbnn)
var b_ = cl.qa(ddb3,`SELECT ${okey}, ${ic} FROM ${ii} ORDER BY ${osrt}`)
var la = {l_:{c:[{}],a:[{}],o:[{}],bn:cl.bibleColumns(ddb3)}}
ddb3.close()

// cl.u.jslogobj(la)
// jsPEXT()

// reload l_
async function rel_(i_) {
  return await Promise.all(i_.map(async(i)=>{
    return {i:i.i,l_:(i.l_)?i.l_:la.l_} //
  }))
}

// set properties of l_
async function l_l_(f,l,i) {
  var db=cl.b3(k_.ddir+i.dbnn)
  // console.log(i.dbnn);
  
  // populate l.bn
  if (f=='dbnn'){l.bn=l_bn(db)}

  // if the first character is b, then load c_
  if(f=='b'||i.b){
    l.c=db.prepare(`SELECT DISTINCT c FROM t WHERE b is `+i.b).all()}
    if(+i.c>l.c.length){i.c=1;i.a=1;i.o=1}
    
  // if the first character is c, then load a_
  if(f=='c'||i.b&&i.c){
    l.a=db.prepare(`SELECT v FROM t WHERE b is ${i.b} AND c is ${i.c}`).all()}
  if(+i.a>l.a.length){i.a=1;i.o=1}
  if(+i.o>l.a.length){i.o=1}
  
  // if the first character is a, then load o_=a.slice(...)
  if(f=='a'||i.b&&i.c&&i.a){l.o=l.a.slice(i.a-1)}
  if(+i.a>+i.o){i.o=i.a};

  db.close()
}    

function servererrorhandling(qo,an,er){
  console.error(er);
  qo.session.m = undefined
  qo.session.l_ = undefined
  an.redirect('/')
}

function apierrorhandling(an,er) {
  console.log(er);
  an.json({e:0})  
}

host.get('/', async(qo,an)=>{
  // an.render('trial')
  an.sendFile(__dirname+'/client.html')
})

host.get('/api/k',async(qo,an)=>{
  try {
    an.json({
      k_:k_,
      db_a:db_a,
      b_:b_,
    })
  }catch(er){apierrorhandling(an,er)}
})

host.get('/api/l_/:dbnn',async(qo,an)=>{
  try {
    var dbnn=qo.params.dbnn
    an.json({
      l:(db_a.includes(dbnn))?cl.bibleColumns(cl.b3(k_.ddir+dbnn)):false
    })    
  }catch(er){apierrorhandling(an,er)}
})

host.get('/api/l_/:dbnn/:b/', async(qo,an)=>{
  try {
    const dbnn=qo.params.dbnn
    const b=qo.params.b
    const c=qo.query.c
    var db=cl.b3(k_.ddir+dbnn)
    var r={l:cl.qa(db,(c)?`SELECT v FROM t WHERE b is ${b} AND c is ${c}`
    :`SELECT DISTINCT c FROM t WHERE b is `+b)};db.close()
    an.json(r)
  } catch (er){apierrorhandling(an,er)}
})

// get request api
host.get('/api',async(qo,an)=>{
  try {
    var s=qo.session
    var m=s.m;if(m){m=m[0]}
    
    // parse or initialise i_ 
    var qu=qo.query
    var l=Object.entries(qu).length
    var i_=(l)?JSON.parse(qu.i_):[{i:0,...ia}]
    // console.log(i_);
    
    // initialise or parse l_
    if(!(s.l_)){s.l_=await rel_(i_)};var l_=s.l_
    // cl.u.jslogobj(l_);
    
    // set l_ for html form
    if(m){
      if(m!='change'){
        // console.log(m);
        var [f,i]=m.split('_');l=l_[i].l_;i=i_[i];await l_l_(f,l,i)  
      }
    }else{
      await l_.forEach(async(l,i)=>{l=l.l_;i=i_[i];await l_l_('',l,i)})
    }

    // result
    var r='';if(qu.r){r=await cl.qi2l(i_)}
    
    i_=await Promise.all(i_.map(async(e,i)=>{return{...e,l_:l_[i].l_}}))

    // var i_st=JSON.stringify(i_)
    an.json({db__,b_,i_,r})

  }catch(er){servererrorhandling(qo,an,er)}
  
})

// post request to make changes to existing i_.
host.post('/api', async (qo,an) => {
  try {
    // get i_ and m token
    var b=qo.body
    var i_=JSON.parse(b.i_)
    var m=Object.entries(b)[1]
    
    // change i_
    if(m[0]=='change'){      
      if(m[1]=='more'){i_.push({i:i_.length,...ia})}
      if(m[1]=='less'){i_.pop()}    
      qo.session.l_=await rel_(i_)
    }else{
      var [f,i]=m[0].split('_')
      i_[i][f]=m[1]
    }
    
    // set m, separate l_, get api call.
    qo.session.m=m
    i_.forEach(async(i)=>{delete i.l_})
  
    var rurl='/?i_='+JSON.stringify(i_)
    if(m[1]=='submit'){rurl+='&r=1'}
  
    // console.log('redirection');
    an.redirect(rurl)

  }catch(er){servererrorhandling(qo,an,er)}

})

host.get('/client.js', async (qo,an)=>{
  an.sendFile(__dirname+'/client.js')
})

host.get('/style.css', async(qo,an)=>{
  an.sendFile(__dirname+'/style.css')
})

host.listen(port,()=>{
  console.log(`listening on localhost:${port}`);
})

// cl.u.jslogobj(i0)
// cl.u.jslogobj(JSON.parse(i0.st))
// cl.u.jslogtype(i0)
// cl.u.jslogtype(i0.st)
// console.log(i0.st);
// console.log(i0);
// cl.u.jslogtype(JSON.parse(i0.st))
// process.exit()

// function iadd(i_,f=0){i_.push({i:i_.length,...(f>0)?fa:ia})}
// async function i_2u(i_,n_=1){
//   var s = (await bb.map(i_, async (e) => {    
  //     var l = (await bb.map(Object.entries(e), async (_) => {
    //       // console.log(_[0]);
    //       return (_[0].slice(-1) != '_')?_[1]:''
    //     })).join('-').replace((n_)?/(-)\1+/g:'','')
//     // console.log(l);
//     return l
//   })).join('--')
//   // console.log(s);
//   // process.exit()
//   return s
// }

// async function qoi_(qo,u=undefined) {
  //   console.log(u);
  //   return await bb.map((u)?u:qo.params.list.split('--'), async(e)=>{
    //     e = e.split('-') 
    //     // console.log(e);
    //     if (e.length == 12) {
      //       return  {
//         i:e[0],
//         dbnn:e[1],bn:e[2],
//         b:e[3],c:e[4],a:e[5],o:e[6],
//         m:e[7],j:e[8],
//         w:e[9],s:e[10],y:e[11],
//       }
//     }else{
  //       console.log('error: list shorter than 12 elements');
  //       // need error handling on api entries other than 12 elements      
  //     }});
// }

// web_server.get('/:list/:change', async (qo,an)=>{
  //   var p = qo.params
  //   var [u,mm] = [p.list.split('--'),p.change.split('-')]
  //   // console.log(i_);
  //   // console.log(mm);
  
  //   if (mm.length==2) {
    //     if (mm[0]=='change'){      
      //       if (mm[1]=='more') {
        //         u=[...u,await i_2u([{i:u.length,...ia}])] //
        //       }
        //       if(mm[1]=='less'){u.pop()}
        //     }else{
          //       var [f,i]=mm[0].split('_')
          //       var ii = await qoi_('',[u[i]])  //
          //       ii[0][f] = mm[1]
          //       u[i] = await i_2u(ii) //
//     }    
//   }
//   u=u.join('--')
  
//   an.redirect('/'+u)
//   // an.send('debug mode (debugging)')
//   // an.send(sl)
// })

// web_server.get('/:list/', async (qo,an)=>{
//   // render page according to api
//   // console.log(qo.params.list);
  
//   // console.log(i_);
//   // console.log(i_.length);
//   // // (e.g. i_[0]['b']=test['b0'])
//   // ii[f] = test[f0]


//   var i_ = await bb.map((await qoi_(qo)), async(ii)=>{  //
//     // cl.u.jslogobj(ii)
//     ii.c_=[{}];ii.a_=[{}];ii.o_=[{}];
//     // if the first character is b, then load c_,
//     if(ii.b){
//       ii.c_=await db.prepare(`SELECT DISTINCT c FROM t WHERE b is `+ii.b).all()}
//     if(+ii.c>ii.c_.length){ii.c=1;ii.a=1;ii.o=1}
    
//     // if the first character is c, then load a_
//     if(ii.b&&ii.c){
//       ii.a_=await db.prepare(`SELECT v FROM t WHERE b is ${ii.b} AND c is ${ii.c}`).all()}
//     if(+ii.a>ii.a_.length){ii.a=1;ii.o=1}
//     if(+ii.o>ii.a_.length){ii.o=1}
    
//     // if the first character is a, then load o_=a.slice(...)
//     if(ii.b&&ii.c&&ii.a){ii.o_=ii.a_.slice(ii.a-1)}
//     if(+ii.a>+ii.o){ii.o=ii.a};
//     // ii = {...ii,...c_,...a_,...o_}
//     // cl.u.jslogobj(ii)
//     return ii
//   })
  
//   // cl.u.jslogobj(i_)
  
//   var i_st = JSON.stringify(i_)
//   an.render('home', { b_,i_,i_st })
//   // process.exit()

//   // cl.u.jslogobj(i_);
  
//   // an.send('landed on rendering api')
// })

// web_server.post('/b', async (qo,an) => {
//   b = qo.body.b;an.redirect('/')
// })

// web_server.post('/c', async (qo,an) => {
//   c = qo.body.c;an.redirect('/')
// })

// web_server.post('/a', async (qo,an) => {
//   a = qo.body.a;an.redirect('/')
// })

// web_server.post('/o', async (qo,an) => {
//   o = qo.body.o;an.redirect('/')
// })

