const {cache} = require('./defdecode');

function refreshRes(stats,res) {
  const { maxAge,expires,cacheControl,lastModified,etag} = cache;

  if (expires){
    res.setHeader('Expires',(new Date(Date.now()+maxAge*1000)).toUTCString());
  }

  if (cacheControl){
    res.setHeader('Cache-Control',`public,max-age=${maxAge}`);
  }

  if(lastModified){
    res.setHeader('Last-Modified',stats.mtime.toUTCString());
  }

  if(etag){
    res.setHeader('Etag',`${stats.size}-${stats.mtime.toUTCString()}`);
  }
}

module.exports = function isFresh(stats,req,res){
  refreshRes(stats,res);
  const lastModified = req.headers['if-Modified-Since'];
  const etag = req.headers['if-None-Match'];
  if(!lastModified && !etag){
    return false;
  }
  if(lastModified && lastModified !== res.getHeader('Last-Modified')){
    return false;
  }
  if(etag && etag !== res.getHeader('Etag')){
    return false;
  }
  return true;
};
