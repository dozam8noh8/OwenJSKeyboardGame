console.log("Hello World");
const divs = document.getElementsByTagName("div");
const square = divs[0];
checkIfCollision();
squareStyle = window.getComputedStyle(square);
console.log(squareStyle.getPropertyValue('height'));
//console.log(style);
intervalID = 0;
score = 0;
square.addEventListener('mousedown', activateFollowMouse);
square.addEventListener('mouseup', checkIfCollision);
square.addEventListener('mouseup', deactivateFollowMouse);
square.addEventListener('mouseover', function () { increaseScore(square)});
//square.addEventListener('mouseup', document.removeEventListener('mousedown', checkIfCollision));
function activateFollowMouse(){
    document.addEventListener('mousemove', followMouse);
}   
function deactivateFollowMouse(){
    document.removeEventListener('mousemove', followMouse);
}



function checkIfCollision(){
    ballBounds = square.getBoundingClientRect();
    goalsList = document.getElementsByClassName("goals");
    //console.log(goalsList[0]);
    goalBounds = goalsList[0].getBoundingClientRect();
    if(goalBounds.top + goalBounds.height > ballBounds.top
        && goalBounds.left + goalBounds.width > ballBounds.left
        && goalBounds.bottom - goalBounds.height < ballBounds.bottom
        && goalBounds.right - goalBounds.width < ballBounds.right) {
        console.log("Collisions!");
        //randomly generate an angle in degrees between 0 and 360
        angle = Math.random() * 360;
        angle = angle / 180 * Math.PI;
        speed = 2000;
        intervalID = setInterval(function () { randomlyPlace(square, angle, speed)}, 100);
        score +=1;
        scoreCounter = document.getElementsByClassName("score")[0];
        //  scoreCount.style.text-align= "center";
        scoreCounter.innerHTML = "Your score here\n <br>" + score;
    }
}

function increaseScore(object){
    console.log('object = ' + object + '  score = ' +  score + ' intervalID = ' + intervalID)
    score +=1;
    speed = 2000;
    console.log(score);
    scoreCounter = document.getElementsByClassName("score")[0];
    scoreCounter.innerHTML = "Your score here\n <br>" + score;
    if (intervalID){
        clearInterval(intervalID);
        intervalID = 0;
    }

    object.style.top = 307;
    object.style.left = 444;
    angle = Math.random() * 360/180*Math.PI;
    intervalID = setInterval(function () { randomlyPlace(square, angle, speed)}, 100);  
    return;
}

function randomlyPlace(object, angle, speed){

    //console.log('angle = ' + angle);
    //convert angle to radians

    //console.log(angle);
    //console.log('Angle = '  + Math.cos(angle));
    newX = parseInt(object.style.left) + (Math.cos(angle) * speed/60); //speed/60 is fps
    newY = parseInt(object.style.top) + (Math.sin(angle) * speed/60); //move the component times the speed divided by each frame
    console.log(object.style.top);
    if ((newX < 0) || (newY < 0) || (newX > screen.width) || (newY > screen.height))  {
        console.log("In if statement");
        clearInterval(intervalID);
        intervalID = 0;
        object.style.top = 307;
        object.style.left = 444;
        angle = Math.random() * 360/180*Math.PI;
        intervalID = setInterval(function () { randomlyPlace(square, angle, speed)}, 100);  
        return;
    }
    //console.log('newX = ' + newX);
    //console.log('newY = ' + newY);

    object.style.top = newY;
    object.style.left = newX;
}
//square.addEventListener('click', moveSquare);
function moveSquare(event){
    console.log('X coord = ' + event.clientX);
    console.log('Y coord = ' + event.clientY);
    if (square.style.top == ''){
        square.style.top = '50%' ;
        square.style.left = '50%' ;
    }
    console.log(square.style.top);
    pos = parseInt(square.style.top, 10);
    console.log(pos);
    pos += 50;
    square.style.top = pos + 'px';
    /*square.style.top 
    square.style.top = 'px';
    console.log(square.style.top);*/
}
function followMouse(event){
    x = event.clientX - parseInt(squareStyle.getPropertyValue('width'))/2;
    y = event.clientY - parseInt(squareStyle.getPropertyValue('height'))/2;
    console.log(x);
    console.log(y)
    square.style.top = y;
    square.style.left = x;
}