const { readFileSync, writeFileSync,writeFile } = require('fs')
const {Buffer} = require('buffer');
const fle = Buffer.alloc(19,'./content/first.txt');
console.log(fle);
console.log('start')
const first = readFileSync(fle, 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')
const third = readFileSync('./sahil.txt', 'utf8')

//write in a file named sahil.txt 'hello world' 
writeFileSync('./sahil.txt','hehe');
//write asyncronously
writeFile('./content/result-sync.txt',new Uint8Array(Buffer.from("jaadu")),{flag:'a'},(err)=>{
  if(err){
    console.log(err);
  }
  console.log('wrote jaadu');
})
writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}, ${third}`,
  { flag: 'a' }
)
console.log('done with this task')
console.log('starting the next one')
