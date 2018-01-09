

const http = require('http');
const fs = require('fs');
const path = require('path');
const conf = require('./components/defdecode');
const roots = require('./components/root');
const openurl = require('./components/openurl');

class Server {
  constructor(config){
    this.conf = Object.assign({},conf,config);
  }

  start(){
    const server = http.createServer((req,res)=>{
      const fileName = path.join(this.conf.root,req.url);
      roots(req,res,fileName,this.conf);
  });

  server.listen(this.conf.port, this.conf.hostname, () => {
    const addr = `http://${this.conf.hostname}:${this.conf.port}/`
    console.log(`Server running at ${addr}`);
    openurl(addr);
  });
  }
}

module.exports = Server;
