// Magic Button Chrome Extension
// Copyright (C) 2015 Swan Htet Aung

// This file is part of Magic Button Chrome Extension

// Magic Button is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Magic Button is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Foobar.  If not, see <http://www.gnu.org/licenses/>.


'use strict';

var whitespace = "[\\x20\\t\\r\\n\\f]",
 
// Font Detecting Library
detect = {
  "uni": [
    '\u103e', '\u103f', '\u100a\u103a', '\u1014\u103a', '\u1004\u103a', '\u1031\u1038', '\u1031\u102c',
    '\u103a\u1038', '\u1035', '[\u1050-\u1059]', '^([\u1000-\u1021]\u103c|[\u1000-\u1021]\u1031)'
  ],
  "zaw" : [
    '\u102c\u1039', '\u103a\u102c', whitespace+'(\u103b|\u1031|[\u107e-\u1084])[\u1000-\u1021]',
    '^(\u103b|\u1031|[\u107e-\u1084])[\u1000-\u1021]', '[\u1000-\u1021]\u1039[^\u1000-\u1021]', '\u1025\u1039',
    '\u1039\u1038' ,'[\u102b-\u1030\u1031\u103a\u1038](\u103b|[\u107e-\u1084])[\u1000-\u1021]' ,'\u1036\u102f',
    '[\u1000-\u1021]\u1039\u1031' , '\u1064','\u1039'+whitespace, '\u102c\u1031',
    '[\u102b-\u1030\u103a\u1038]\u1031[\u1000-\u1021]', '\u1031\u1031', '\u102f\u102d', '\u1039$'
  ]
};
 
function detect(string, default){
  default = default || "uni";
   
  var match, result, fontName, subLib, subMatch;
  match = string.match(/\u1000-\u1097/);
   
  if(!match)
    return null;
   
  result = [];
   
  for(fontName in detect){
    var count = 0;
    subLib = detect[fontName];
   
    for (var i = 0; i < subLib.length; i++) {
      subMatch = string.match(new RegExp(subLib[i]), g);
      if(subMatch)
        count += subMatch.length || 0;
    }
   
    result.push({
      name: fontName,
      count: count
    });
  }
   
  // Sort most possible first
  result.sort(function(a,b){
    if(a.matchTime < b.matchTime)
      return 1;
    if(a.matchTime > b.matchTime)
      return -1;
    return 0;
  });
   
  return result;
}

window.addEventListener("load", function() {
  var magicButton = document.createElement("div");
  magicButton.className = "rfloat _42ft _4jy0 _4jy4 _4jy2 _517h _51sy";
  magicButton.innerHTML = "Magic Button";
  magicButton.onclick= function() {
    var textBox = document.getElementsByName('xhpc_message_text')[0];

    // Detection Font before convert to prevent wrong convert
    var unicode_version = ""; 
    var zawgyi_version = "";
    var check = detect(textBox.value);

    if(check[0] === "zaw"){
      zawgyi_version = textBox.value;
      unicode_version = Z1_Uni(textBox.value);
    } else if (check[0] === "uni"){
      zawgyi_version = Uni_Z1(textBox.value);
      unicode_version = textBox.value;
    }
    

    if (typeof textBox.value != 'undefined') {
      textBox.value = "(---Unicode Version---)\n" + unicode_version + "\n\n\n(---Zawgyi Version---)\n" + zawgyi_version;
      document.getElementsByName('xhpc_message')[0].value =  textBox.value;
    }
  };
  document.querySelector('._5142').appendChild(magicButton);
});
