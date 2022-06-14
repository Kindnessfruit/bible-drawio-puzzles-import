import ep from "express";

import cl from "./bibledrawiolib.js";
import u_ from "./utillib.js";

import http from "http";

import { readdirSync } from "fs";

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const host = ep()
var port = process.env.PORT || 8000

const k_ = cl.k
const kq = k_.q
const db_a = readdirSync(k_.ddir)

var [ic,osrt,okey,ii] = 
['ic','osrt','okey','ii']
var [ic,osrt,okey,ii] = 
[k_[ic],k_[osrt],k_[okey],k_[ii]]

const ddb3=cl.b3(k_.ddir+kq.dbnn)
const b_ = cl.qa(ddb3,`SELECT ${okey}, ${ic} FROM ${ii} ORDER BY ${osrt}`)
ddb3.close()

// json error handling helper
function apierrorhandling(an,er) {
  console.log(er);
  an.json({e:0})  
}

// home page
host.get('/', async(qo,an)=>{
  an.sendFile(__dirname+'/client.html')
})

// api for settings
host.get('/api/k',async(qo,an)=>{
  try{
    an.json({
      k_:k_,
      db_a:db_a,
      b_:b_,
    })
  }catch(er){apierrorhandling(an,er)}
})

// api for generating bible versions
host.get('/api/l_/:dbnn',async(qo,an)=>{
  try{
    var dbnn=qo.params.dbnn
    an.json({
      l:(db_a.includes(dbnn))?cl.bibleColumns(cl.b3(k_.ddir+dbnn)):false
    })    
  }catch(er){apierrorhandling(an,er)}
})

// api for generating list of chapters and verses
host.get('/api/l_/:dbnn/:b/', async(qo,an)=>{
  try{
    const dbnn=qo.params.dbnn
    const b=qo.params.b
    const c=qo.query.c
    var db=cl.b3(k_.ddir+dbnn)
    var r={l:cl.qa(db,(c)?`SELECT v FROM t WHERE b is ${b} AND c is ${c}`
    :`SELECT DISTINCT c FROM t WHERE b is `+b)};db.close()
    an.json(r)
  } catch(er){apierrorhandling(an,er)}
})

// get request api
host.get('/api',async(qo,an)=>{
  try{an.json({r:await cl.qi2l(JSON.parse(qo.query.i_))})}
  catch(er){apierrorhandling(an,er)}
})

host.get('/client.js',async(qo,an)=>{
  an.sendFile(__dirname+'/client.js')
})

// wakey wakey~
host.get('/api/wakey',async(qo,an)=>{
  an.json({})
})

host.listen(port,()=>{
  console.log(`listening on localhost:${port}`);
})

// wakey wakey~
setInterval(() => {
  http.get("http://biblepuzzles.herokuapp.com/api/wakey");
}, 20 * 60 * 1000);