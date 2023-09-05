const http = require('http');
const {createWriteStream} = require('fs');
const { error } = require('console');
let er;
const ws = createWriteStream('./sample.txt',{'encoding':'utf-8'});
http.get('http://localhost:3000/test',(res)=>{
    res.pipe(ws);
    console.log(res.headers);
    let ct = res.headers['content-type'];
    let {statusCode} = res;
    console.log(statusCode);
    if(!/application\/json/ig.test(ct)){
        er  = new Error('expected a json response');
    }
    if(statusCode !== 200){
        er = new Error('response not 200');
    }
    if (er) {
        console.log(er.message);
        res.resume();
        return;
    }
});
