
var init = function(){
  var arry = new Array();
  arry = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

  arry[0][0] = 'A';

  for (var i = 1,k=65; i < arry.length; i++,k++) {
    arry[i][0] = String.fromCharCode(k);
  }

  for (var j = 1,k=65; j < arry.length; j++,k++) {
    arry[0][j] =  String.fromCharCode(k);
  }

  for (var i = 1,l=65; i < arry.length; i++,l++) {
    for (var j = 1, k = l; j < arry.length; j++,k++) {
      if (k >= 91) {
        k = 65;
      }
        arry[i][j] = String.fromCharCode(k);
    }
  }
  return arry;
}



var vigenereTable = init();
var getCol = function(arr,letter){
  for (var j = 0; j < arr.length; j++) {
    if (arr[0][j] == letter) {
      return j;
    }
  }
  return 0;
}
var getRow = function(arr,letter){
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] == letter) {
      return i;
    }
  }
  return 0;
}
var getColNum = function(vigenereTable,a,b){
  var row = getRow(vigenereTable,a);
  for (var j = 0; j < vigenereTable.length; j++) {
    if (vigenereTable[row][j] == b) {
      // console.log(j + " ------ " + b);
        return j;
    }
  }
  return 0;
}

// INPUT FOR THE PLAINTEXT AND THE KEYWORD, AND TRIMMING ALL SPACES FROM THE PLAINTEXT
var pText = "MICHIGAN TECHNOLOGICAL UNIVERSITY";
pText = pText.replace(/\s/g,'');
var keywordInput = 'HOUGHTON';
var keyword = (keywordInput).split('');

// FUNCTION FOR EXPANDING THE KEYWORD TO THE SAME LENGTH OF THE PLAIN TEXT
var align = function(plainText,keyword){
  var key = new Array();
  for (var i = 0,k =0; i < plainText.length; i++,k++) {
    if (k == (keyword.length)) {
      k = 0;
    }
    key[i] = keyword[k];
  }
  return key;
}
var expandedKey = align(pText,keyword);

var vigenereEncrypt = function(pText , expandedKey,vigenereTable){
  var col,row = 0;
  var cipher = new Array();
  for (var i = 0; i < pText.length; i++) {
    row = getRow(vigenereTable,pText.charAt(i));
    col = getCol(vigenereTable,expandedKey[i]);
    cipher[i]= vigenereTable[row][col];
  }
  return cipher;
}

var vigenereDecrypt = function(cText, expandedKey , vigenereTable){
  var col,row = 0;
  var text = new Array();
  for (var i = 0; i < cText.length; i++) {
    text[i] = vigenereTable[0][getColNum(vigenereTable,expandedKey[i],cText.charAt(i))];
  }
  return text;
}

console.log("************************ ENCRYPTION ****************************");

var cText = vigenereEncrypt(pText,expandedKey,vigenereTable);
cText = cText.join();
cText = cText.replace(/,/g,'');
console.log("Cipher Text : " + cText);

console.log("************************ DECRYPTION ****************************");

var text = vigenereDecrypt(cText,expandedKey,vigenereTable);
text = text.join();
text = text.replace(/,/g,'');
console.log("Plain Text : " + text);
// console.log(vigenereTable[0][getColNum(vigenereTable,'H','T')]);
// var j = getCol(vigenereTable,'T');
// var i = getRow(vigenereTable,'T');
// console.log(vigenereTable[i][j]);
