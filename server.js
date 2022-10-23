import ep from "express";

import cl from "./bibledrawiolib.js";
import u_ from "./utillib.js";
import { exit } from "process";

import { readdirSync } from "fs";

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import http from "http";


const host = ep()
var port = process.env.PORT || 8000
// body parser for custom lines post requests
host.use(ep.urlencoded())
host.use(ep.json())

// serve client files
const cpth = __dirname+'/client'
host.use("/client",ep.static(cpth))

const k_ = cl.k
const kq = k_.q
const db_a = readdirSync(k_.ddir)

var [ic,osrt,okey,ii] = [k_.ic,k_.osrt,k_.okey,k_.ii]
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
  an.sendFile(cpth+'/client.html')
})

// send the whole menu instead of requesting for individual list of chapters or verses
host.get('/api/menu.json',async(qo,an)=>{
  an.sendFile(__dirname+"/menu.json")
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

// get and post requests
async function result(qo,an,p=0) {
  try {
    const __=(p)?qo.body:qo.query
    const i_=(p)?__.i_:JSON.parse(__.i_)
    const cm=(p)?__.cm:JSON.parse(__.cm)
    an.json({
      r:(!(!!(i_&&i_.length)^!!(cm&&cm.length)))
        ?await cl.qi2l({qi:i_,cm:cm})
        :((i_&&i_.length)?await cl.qi2l({qi:i_})
        :await cl.qi2l({cm:cm}))
    })
  }catch(er){apierrorhandling(an,er)}
}
host.get('/api',async(qo,an)=>{await result(qo,an)})  // may not be necessary in the future.
host.post('/api',async(qo,an)=>{await result(qo,an,1)})

// wakey wakey~
host.get('/api/wakey',async(qo,an)=>{
  an.send()
})

host.listen(port,()=>{
  console.log(`listening on localhost:${port}`);
})

// wakey wakey~
setInterval(() => {
  http.get("http://biblepuzzles.herokuapp.com/api/wakey");
}, 20 * 60 * 1000);