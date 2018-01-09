const path = require('path');
const  mimeType={
    'evy':'application/envoy',
    'fif':'application/fractals',
    'spl':'application/futuresplash',
    'hta':'application/hta',
    'htm':'text/html',
    'html':'text/html',
    'jfif':'image/pipeg',
    'jpe'	:'image/jpeg',
    'jpeg':	'image/jpeg',
    'jpg':'image/jpeg',
    'css':'text/css',
    'js':'application/x-javascript',
    'tex':'application/x-tex',
    'txt':'text/plain'

}
module.exports = (fileName)=>{
  let ext = path.extname(fileName).split('.').pop().toLowerCase();
  if (!ext){
    ext = fileName
  }
  return mimeType[ext] || mimeType['txt'];
}
