//makeCanvas();
var col = 'red';
var colEnum = {
      0: 'red',
      1: 'blue',
      2: 'green',
      3: 'purple',
      4: 'black',
}
createColourChoices();
addListenersToColours();


document.getElementById('easterEgg').addEventListener('click', function(){
      alert('I have no life :(');

});
//addSomeRadioButtons('Rcircle', 'circle', 'shape');
//addSomeRadioButtons('Rsquare', 'square', 'shape');
function addSomeRadioButtons(id, text, name){
      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.id = id;
      radio.name = name;
      var label = document.createElement('label');
      label.htmlFor = radio.id;
      label.innerHTML = text;
      document.getElementById('inputDiv').appendChild(label);
      document.getElementById('inputDiv').appendChild(radio);
};
function createColourChoices(){
      for (var i = 0; i < Object.keys(colEnum).length; i++ ) {
            var colCirc = generateCircle(100, (100 * i + 20 * i), 100, 100, colEnum[i], false, 'circle');
            colCirc.setAttribute('name', 'colCirc');
            colCirc.setAttribute('colour', colEnum[i]);
            /*var colCircs = document.getElementsByName('colCirc');
            console.log(colCircs);*/
            
            colCirc.id = 'col' + colEnum[i];
      }
}
function addListenersToColours(){
      var colCircs = document.getElementsByName('colCirc');
      for (var i = 0; i < colCircs.length; i++){
            //console.log(colCircs[i]);
            colCircs[i].addEventListener('click', function(colCirc){
                  //console.log(this.getAttribute('colour'));
                  col = this.getAttribute('colour');
            })
      }
      //console.log(colCircs);

      /*colCirc.addEventListener('mousedown', function(event, i){
            console.log(i);
            console.log('changing col to ' + colEnum[i]);
            col = colEnum[i];
      });
      return function closure (){
            var savedCol = colEnum[i];
            return savedCol;
      }*/
}
createInputBoxes();
createInputAndLabel('sizeInput', "Size:", 20);
createInputAndLabel('TimeOfPaint', "How Long should paint last? (ms)" , 1000);
function createInputAndLabel(inputId, labelText, defVal){
      var div = document.getElementById("inputDiv");
      var sizeInput = document.createElement('input');
      sizeInput.style.position = 'relative';
      sizeInput.style.top = '20';
      sizeInput.style.left = '20';
      sizeInput.defaultValue = defVal;
      sizeInput.id = inputId;
      div.appendChild(sizeInput);
      var sizeLabel = document.createElement('label');
      //sizeLabel.htmlFor = 'SIZE';
      sizeLabel.innerHTML = labelText;
      sizeLabel.height = 20;
      sizeLabel.width = 20;
      div.insertBefore(sizeLabel, sizeInput);
      sizeLabel.position = 'relative';
      //var br = document.createElement("BR");
      //div.insertBefore(br, sizeInput.nextSibling);
}
function createInputBoxes(){

}



var handleMD = function myFunction (){
      document.addEventListener('mousemove', handleMM);
};
var handleMM = function (event){
      //console.log(event);
      var x = event.clientX;
      var y = event.clientY;
      //console.log("You clicked at " + x + ' ' + y );
      var sizeInput = document.getElementById('sizeInput');
      var radioButtons = document.getElementsByName('shapeType');
      console.log(radioButtons);
      var shape = 'circle'; //default
      for (button of radioButtons){
            if (button.checked){
                  shape = button.id;
            }
      }
      var time = document.getElementById('TimeOfPaint');
      time = time.value;

      //console.log(shapeInput.value);
      //console.log(sizeInput);
      generateCircle(x,y, sizeInput.value, sizeInput.value , col, true, shape, time);
      };
var clickToDraw = document.getElementById('clickToDraw');
document.removeEventListener('mousemove', handleMD);
            document.addEventListener('mousedown', handleMD);
            document.addEventListener('mouseup', function(event){
                  console.log("Trying to remove something");
                  document.removeEventListener('mousemove', handleMM);
            });

function confirmChange(){
      if (this.checked == true){
            document.removeEventListener('mousemove', handleMD);
            document.addEventListener('mousedown', handleMD);
            document.addEventListener('mouseup', function(event){
                  console.log("Trying to remove something");
                  document.removeEventListener('mousemove', handleMM);
            })
      }
      else {
            document.addEventListener('mousemove', handleMD);
      }
}
clickToDraw.addEventListener('change', confirmChange);

function generateCircle(x,y, h, w, bCol, vanish, shape, time){
      switch (shape){
            case 'circle':
                  var div = document.createElement('span');
                  div.style.borderRadius = '50px';
                  break;
            case 'square':
                  var div = document.createElement('div');
                  break;
            default:
                  var div = document.createElement('span');
      }
      div.style.position = 'absolute';

      div.style.top = y;
      div.style.left = x;
      div.style.height = h;
      div.style.width = w;
      div.style.backgroundColor = bCol;
      div.style.display = 'inline-block'  ;
      document.body.appendChild(div);
      if (vanish){
            setTimeout(function(){
                  document.body.removeChild(div);
            }, time);
      }     
      return div;
}
/*function makeCanvas(){
      var canv = document.createElement('canvas');
      canv.id = 'canvas';
      canv.style.width = 400;
      canv.style.height = 400;
      canv.backgroundColor = 'blue';
      document.body.appendChild(canv);

}*/
