
function decode(encodedtext, shift) {
  var decodedtext = "";
  for(var i = 0; i < encodedtext.length; i++) {
    var decodedchar = encodedtext.charCodeAt(i);
    if(decodedchar >= 97 && decodedchar <= 122) {
      decodedtext += String.fromCharCode((decodedchar - 97 - shift + 26) % 26 + 97);
    } else if(decodedchar >= 65 && decodedchar <= 90) {
      decodedtext += String.fromCharCode((decodedchar - 65 - shift + 26) % 26 + 65);
    } else {
      throw new Error('Invalid char');
    };
  };
  return decodedtext;
};


module.exports = decode;
