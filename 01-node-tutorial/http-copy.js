const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.end('hello');
    }
    else{
        res.end('bye');
    }
})
server.listen(3003);