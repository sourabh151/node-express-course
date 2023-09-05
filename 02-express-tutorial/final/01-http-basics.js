//jshint esversion:10
//44310

console.log('Express Tutorial');
const express = require('express');
const http = require('http');
const {readFileSync} = require('fs');


//reading homepage file
const homepage = readFileSync('../navbar-app/index.html');
const browserApp = readFileSync('../navbar-app/browser-app.js');
const logo = readFileSync('../navbar-app/logo.svg');
const styles = readFileSync('../navbar-app/styles.css');
const arr = [2,3,4,5];

const server = http.createServer((req, res) => {
    //let reg = /\/homepage\/?[a-zA-z0-9]*/ig;
    if (req.url==='/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(homepage);
        res.end();
        //console.log(req);
    }
    else if (req.url==='/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' });
        res.write(browserApp);
        res.end();
    }
    else if (req.url==='/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' });
        res.write(logo);
        res.end();
    }
    else if (req.url==='/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' });
        res.write(styles);
        res.end();
    }
    else if(req.url === '/test'){
        res.writeHead(201,{'content-type':'application/json'});
        res.write(JSON.stringify(arr));
        res.end();
    }

    else{
        res.writeHead(404);
        res.end();
        // res.write("<h1>NOT Home page</h1>");
        // res.end();
    }

});
server.listen(3000);