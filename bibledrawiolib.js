import sqlt3 from 'better-sqlite3'
import bb from "bluebird"
import pppt from 'puppeteer'
import u_ from "./utillib.js"

// utill
export const u = u_

// default variables
const mm = 2
const jj = 1
const ww = 400
const fs = 14
const ff = "Helvetica"
const bnn = 'King James Version (1769)'
const dbn = 'main.db'
const dbd = './db/'
const icn = 'title_short'
const osr = 'o2'
const oky = 'oe'
const iin = 'book_info'

export const k = { 
  q:{
    m: mm,
    j: jj,
    w: ww,
    s: fs,
    y: ff,
    bn: bnn,
    dbnn: dbn,
  },
  ddir: dbd,
  ic: icn,
  osrt: osr,
  okey: oky,
  ii: iin,
}

// custom
export async function kjvhtml_a(tt, m = k.m) {
  // m = 1, display itallic from kjv
  tt = (m > 0) ? tt.replace(/<FI>(.*?)<Fi>/g, "<i>$1</i>") : tt
  // m = 2, show red texts
  tt = (m > 1) ? tt.replace(/<FR>(.*?)<Fr>/g, "<font color='red'>$1</font>") : tt
  // m = 3, show strong's number as superscript
  const href = 'https://biblehub.com'
  if (m > 2) {
    tt = tt.replace(/<WH(.*?)>/g, `<sup><a href='${href}/hebrew/$1.htm'>H$1</a></sup>`)
    tt = tt.replace(/<WG(.*?)>/g, `<sup><a href='${href}/greek/$1.htm'>G$1</a></sup>`)
  }
  // remove all other tags
  tt = tt.replace(/<RF>.*?<Rf>/g, '')
  tt = tt.replace(/(<\/?(?:font|i|sup|a)[^>]*>)|<[^>]+>/ig, '$1')
  // console.log(tt)
  return tt
}

export function kjvhtml (tt, m=k.m) {
  // m = 1, display itallic from kjv
  tt = (m > 0) ? tt.replace(/<FI>(.*?)<Fi>/g, "<i>$1</i>") : tt
  // m = 2, show red texts
  tt = (m > 1) ? tt.replace(/<FR>(.*?)<Fr>/g, "<font color='red'>$1</font>") : tt
  // m = 3, show strong's number as superscript
  const href='https://biblehub.com'
  if (m > 2) {
    tt = tt.replace(/<WH(.*?)>/g, `<sup><a href='${href}/hebrew/$1.htm'>H$1</a></sup>`)
    tt = tt.replace(/<WG(.*?)>/g, `<sup><a href='${href}/greek/$1.htm'>G$1</a></sup>`)
  }
  // remove all other tags
  tt = tt.replace(/<RF>.*?<Rf>/g,'')
  tt = tt.replace(/(<\/?(?:font|i|sup|a)[^>]*>)|<[^>]+>/ig, '$1')
  // console.log(tt)
  return tt
}

export function b3(dbnn){return new sqlt3(dbnn)}

export function q_(db,q){return db.prepare(q)}

export function qa(db,q){return q_(db,q).all()}

export function b3q_(dbnn,q){return q_(b3(dbnn),q)}

export function b3qa(dbnn,q){return qa(b3(dbnn),q)}

export function bibleColumns(db){var bn = [] 
  qa(db,`PRAGMA table_info(t)`).forEach(async(e)=>{
    var n=e.name;
    if(n!='vid'&&n!='b'&&n!='c'&&n!='v'){
      bn.push({n:n})
    }
  });return bn
}

export function biblebn(dbnn,b){
  return b3qa(dbnn,`SELECT ${k.ic} FROM ${k.ii} WHERE ${k.okey} IS ${b}`)
}

export function bibledbqs(b,c,a,o,bn=k.q.bn){
  return `
  SELECT ${bn} FROM t 
  WHERE b is ${b}
  AND c is ${c}
  AND v BETWEEN ${a} AND ${o}`
}

export function bibledbquery(b,c,a,o,bn=k.q.bn,dbnn=k.q.dbnn){
  return b3qa(dbnn,bibledbqs(b,c,a,o,bn))
}

export async function bibledbA(b,c,a,o,bn=k.q.bn,dbnn=k.q.dbnn,albn=undefined)
{return bb.map(bibledbquery(b,c,a,o,(albn)?albn:bn,dbnn),async(e)=>{return e[bn]})}

export function bibledbobj(b,c,a,o,bn=k.q.bn,dbnn=k.q.dbnn){
  const ro = bibledbquery(b,c,a,o,bn,dbnn);const re={};
  ro.forEach(function(r,i){re[a+i]=r[bn]});return re
}

export function htmlfromdb(b,c,a,o,m=k.q.m,j=k.q.j,bn=k.q.bn,dbnn=k.q.dbnn){
  return kjvhtml(u_.jsjoinkey_field(bibledbobj(b,c,a,o,bn,dbnn),j),m)
}

export function tafromdb(b,c,a,o,m=k.q.m,j=k.q.j,bn=k.q.bn,dbnn=k.q.dbnn) {
  const r=htmlfromdb(b,c,a,o,m,j,bn,dbnn).split('\n');r.pop();return r
}

export async function qiq_(q){
  var[qi,b,c,a,o,m,j,w,s,y,bn,dbnn]= 
  ['i','b','c','a','o','m','j','w','s','y','bn','dbnn']
  var[qi,b,c,a,o,m,j,w,s,y,bn,dbnn]= 
  [q[qi],q[b],q[c],q[a],q[o],q[m],q[j],q[w],q[s],q[y],q[bn],q[dbnn]]
  dbnn=k.ddir+dbnn;
  var p=`${biblebn(dbnn,b)[0][k.ic]} ${c}:${a}-${o}`
  var albn=`"${bn}"`; var wi=w-20; var _p=u_.jsrn(8)+'_'+p; 
  var q=(await bibledbA(b,c,a,o,bn,dbnn,albn))
  q=await bb.map(q,async(t,i)=>{
    return{w:wi,s:s,y:y,p:_p,n:+a+i,t:t,m:m,j:j,qi:qi}})
  q.unshift({w:w,s:s,y:y,n:_p,t:p,qi:qi});return q
}

export async function qiqo(q){
  var [q,u]=[(await bb.map(q,qiq_)),[]]
  await bb.each(q,async(i)=>{u.push(i[0])})
  q=q.flat();return [u,q]
}
  
export function pppe(e){
  console.error(e)
  process.exit(0)
}  

export function uc(o){
  var s = document.getElementById('s')
  var c = `
  .qi${o.qi}{
    width: ${o.w-20-4}pt;
    font-size: ${o.s}pt;
    font-family: ${o.y};
  }  
  `
  s.appendChild(document.createTextNode(c))  
}  

export async function ucss(p,tu){
  await bb.each(tu,async(o)=>{
    await p.evaluate(uc,o)})
}

export function htch(qi,t){
  e=document.createElement('div');
  e.className='qi'+qi;e.innerHTML=t
  document.body.append(e)
  return e.clientHeight
}  

export async function getTNHC(p,qi,t){
  return await p.evaluate(htch,qi,t)
}

export async function qo2l(qo){var [tu,tt]=qo
  try {    
    console.log(`launching puppeteer...`)
    const b = await pppt.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const p = await b.newPage();
    await p.goto('about:blank')
    await p.evaluate(async()=>{
      var s = document.createElement('style');s.id = 's'; 
      document.head.appendChild(s)
    })
    await ucss(p,tu)

    const ce=Math.ceil
    tt = await bb.map(tt,async(t)=>{
      var [w,s,y,p_,n,t_,m,j,qi] = 
      ['w','s','y','p','n','t','m','j','qi']
      var [w,s,y,p_,n,t_,m,j,qi] = 
      [t[w],t[s],t[y],t[p_],t[n],t[t_],t[m],t[j],t[qi]]
      
      // joining verse number
      if(+j){t_=n+' '+t_};var l=[]

      if(p_){
        const bt=await kjvhtml_a(t_,0)
        const ht=await kjvhtml_a(t_,m)
        var h=(await getTNHC(p,qi,ht))*3/4
        // height < 40,       are rounded to the nearest ceiling of 10,
        // 40 < height <= 45, are rounded to 50,
        // height >45,        are rounded to the nearest ceiling of 70,90,110, forward and onward.
        h=(h<40)?ce(h/10)*10:(h<45)?50:ce(h/20)*20+10
        var a=(h<50)?12:(h<120)?8:4   // arcSize 0-50:12;50-120:8;120<h:4
        l=[h,a,0,10,w,s,y,p_,n+'_'+Math.round(Math.random()*1e12),bt,ht]
      }else{l=[0,0,0,0,w,'','','',n,t_,t_]}
      return l
    })
    console.log(`closing puppeteer...`)
    await b.close()

    // update heights and positions
    var [lpos,hpos,h_id]=[0,0,0];
    tt.forEach((t,i)=>{
      // update top
      if(!+t[0]){
        // update swimlane height
        if(i>0){tt[h_id][0]=hpos;h_id=i}
        hpos=30;
      }else{t[2]+=hpos;hpos+=+t[0]+10}      
      // update left
      if(!+t[3]){t[3]+=lpos;lpos+=+t[4]+40}
      // update swimlane height on last row
      if(i==tt.length-1){tt[h_id][0]=hpos}
    })
    
  }catch(e){pppe(e)}return tt
}

export const drawiocsvheader = `## Double # are used for comment.
# style: fontSize=%fontSize%;fontFamily=%fontFamily%;whiteSpace=wrap;align=left;html=1;rounded=1;arcSize=%arcSize%;
# width: @width
# height: @height
# label: %label%
# identity: partName
# parent: parent
# parentstyle: swimlane;startSize=20;
# top: top
# left: left
height,arcSize,top,left,width,fontSize,fontFamily,parent,partName,text,label
`

export async function qi2l(qi){
  var qo=await qiqo(qi)
  // console.log(qo);
  var l_=await qo2l(qo)
  // console.log(l_);
  var l_=drawiocsvheader+u_.jsACSV(l_)
  return l_
}

export default { 
  // js export default multiple functions: https://stackoverflow.com/a/33179024.
  k,
  u,
  kjvhtml,
  kjvhtml_a,
  b3,
  q_,
  qa,
  b3q_,
  b3qa,
  bibleColumns,
  biblebn,
  bibledbqs,
  bibledbquery,
  bibledbA,
  bibledbobj,
  htmlfromdb,
  tafromdb,
  qiq_,
  qiqo,
  pppe,
  uc,
  ucss,
  htch,
  getTNHC,
  qo2l,
  drawiocsvheader,
  qi2l,
}