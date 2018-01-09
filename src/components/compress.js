const {createGzip,createDeflate}=require('zlib');

module.exports=(rs,req,res)=>{
    const acceptenCoding = req.headers['accept-encoding'];
    if(!acceptenCoding||!acceptenCoding.match(/\b(gzip|deflate)\b/)){
      return rs;
    }else if(acceptenCoding.match(/\bgzip\b/)){
      res.setHeader('Content-Encoding','gzip');
      return rs.pipe(createGzip());
    }else if(acceptenCoding.match(/\bdeflate\b/)){
      res.setHeader('Content-Encoding','deflate');
      return rs.pipe(createDeflate());
    }
}
