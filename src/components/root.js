const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars');
const isFresh = require('./cache');
const pathName = path.join(__dirname,'../templete/tpr.tpl');
const source = fs.readFileSync(pathName);
const template  = Handlebars.compile(source.toString());

const mime = require('./mime');
const compress = require('./compress');
const range = require('./rang');

module.exports = async function(req,res,fileName,conf){

  try{
    const stats = await stat(fileName);
    //读取文件
    if(stats.isFile()){
      const contentType = mime(fileName);
      res.setHeader('Content-Type',contentType);

      //查看缓存，当没有更新内容时返回304,||执行下面
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      let rs;
      const {code,start,end}=range(stats.size,req,res);
      //rang方法
      if(code === 200){
        res.statusCode=200;
        rs=fs.createReadStream(fileName);
      } else {
        res.statusCode=206;
        rs=fs.createReadStream(fileName,{start,end});
      }
      if (fileName.match(conf.compress)){
        rs = compress(rs,req,res);
      }
      rs.pipe(res);
      //通过stats里的方法判断是否是文件还是文件夹
    }else if (stats.isDirectory()){
        const files= await readdir(fileName);
        const dpr = path.relative(conf.root,fileName);
        const data={
          files:files.map(files=>{
            return{
              files,
              icon:mime(files)
            }
          }),
          dpr:dpr?`/${dpr}`:'',
          title:path.basename(fileName)
        }
        res.statusCode=200;
        res.setHeader('Content-Type','text/html');
        res.end(template(data));
    }
    //错误时执行
  }catch (err){
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end(`${fileName} this is not fount ${err}`);
  }
}

