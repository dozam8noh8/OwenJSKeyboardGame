
var listHeight = 200;
var listWidth = 600;
var numElems = 4;
//not used
var listBounds = createDiv(listHeight, listWidth, "red", "absolute");
listBounds.style.top = parseInt(screen.height)/3;
listBounds.style.left = parseInt(screen.width)/3;
listBounds.id = 'dropzone';
console.log(listBounds);

//make a div given height, width, background col and pos
function createDiv(h, w, bCol, pos){
      var div = document.createElement("div");
      div.style.height = h;
      div.style.width = w;
      div.style.backgroundColor = bCol;
      div.style.position = pos;
      document.body.appendChild(div);
      return div;
}
//Make containers
for (var i = 0; i < numElems; i++){
      let div = createDiv(30, 400, "green", "absolute");
      div.style.top = 500 /*base height*/ + 30 * i + 10*i; //gap between them
      div.style.position = "relative";
      div.setAttribute('id', 'dropzone' + i);
      div.innerHTML = 'ONTO HERE' + i;
      div.style.textAlign = 'centre';
      div.ondrop = function(event, div){
            var id = event.dataTransfer.getData("id");
            var elementToAppend = document.getElementById(id);
            elementToAppend.style.top = 0;
            elementToAppend.style.left = 0;
            var acceptableTarg = /dropzone./;
            //console.log(event.target.id);
            //console.log(acceptableTarg.test(event.target.id));
            var appendTo = event.target;
            console.log("curr = ")
            console.log(event.target);
            console.log(event.currentTarget);
            if (!acceptableTarg.test(event.target.id)){
                  //event.target.ondrop = false;
                  appendTo = event.target.parentElement;
                  //console.log(event.target.parentElement);  
                  //console.log(appendTo    );
            }
            if (appendTo.children.length >= 1){
                  var oldLi = appendTo.children[0];
                  var parentToMove = elementToAppend.parentElement;
                  parentToMove.appendChild(oldLi);
            }
            appendTo.appendChild(elementToAppend);
            //console.log(event.target.children);
      }
      div.ondragover = function(event){

            //console.log(event.target);
            //console.log(div);
            //console.log(event.target.id);
            var acceptableTarg = /dropzone./;
            if ((acceptableTarg.test(event.target.id)) || (acceptableTarg.test(event.target.parentElement.id))){ //we are hovering over }
                  //console.log("IN IF YO");
                  event.preventDefault();
            }
            if (acceptableTarg.test(event.target.parentElement.id)){
                  event.target = event.target.parentElement;
                  //console.log(event.target);
                  //event.preventDefault();
            }
      }
      document.body.append(div);
}
function formatListBlocks(){
      var li = document.createElement("li");
      li.style.position = "relative";
      li.style.height = height;
      li.style.width = width;
      li.style.top = height * i + 30*i;
      li.style.left = 0;
      li.style.backgroundColor = "blue";
      li.id = `drag${i}`;
      li.innerHTML = `DRAG THESE ${i}`
      li.setAttribute('draggable', true);
      return li;
}
for (var i = 0; i < numElems; i++){
      var height = 20;
      var width = 300;
      var li = formatListBlocks();

      addEListeners(li);
      li.ondragstart = function(ev){
            ev.target.style.backgroundColor = "red";
            ev.dataTransfer.setData("id", ev.target.id); //get the id as text
            ev.dataTransfer.setData("top", ev.target.style.top);
            ev.dataTransfer.setData("left", ev.target.style.left);

            //console.log("DRAGGING");
      }
      document.body.appendChild(li);

}

function addEListeners(elem){
      /*elem.addEventListener('dragstart', function(){
            console.log("Dragstarted");
      });*/
      /*elem.addEventListener('dragstop', function (){
            console.log("dragstopped");
      });*/
      /*elem.addEventListener('dragover', function(){
            console.log("dragovered");
      });*/
}


/*
Now we want to append the element that we are kicking out to the parent of the element that we are dragging. 

*/