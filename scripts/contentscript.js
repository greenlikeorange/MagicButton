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

window.addEventListener("load", function() {
  var magicButton = document.createElement("div");
  magicButton.className = "rfloat _42ft _4jy0 _4jy4 _4jy2 _517h _51sy";
  magicButton.innerHTML = "Magic Button";

  var magicOption = document.createElement("div");
  magicOption.className = "rfloat";
  magicOption.innerHTML = "<select style='height:28px' id='magic_button_select'><option value='tozawgyi'>Unicode To Zawgyi</option><option value='tounicode'>Zawgyi to Unicode</option></select>";

  magicButton.onclick= function() {
    var textBox = document.getElementsByName('xhpc_message_text')[0];

    if (typeof textBox.value != 'undefined') {
        var select = document.getElementById('magic_button_select');
        
        //To Zawgyi
        if (select.options[select.selectedIndex].value === "tozawgyi") {
            textBox.value = "(---Unicode Version---)\n" + textBox.value + "\n\n\n(---Zawgyi Version---)\n" + Uni_Z1(textBox.value);
        } 

        //To Unicode
        if (select.options[select.selectedIndex].value === "tounicode") {
            textBox.value = "(---Zawgyi Version---)\n" + textBox.value + "\n\n\n(---Unicode Version---)\n" + Z1_Uni(textBox.value);
        } 

        document.getElementsByName('xhpc_message')[0].value =  textBox.value;
    }

  };
  document.querySelector('._5142').appendChild(magicOption);
  magicOption.appendChild(magicButton);

});