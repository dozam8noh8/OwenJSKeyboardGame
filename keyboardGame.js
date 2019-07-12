(function dragAndDropGame (){ //create new scope
      document.write("hello world");
      document.createAttribute("health");
      function makeDiv(h, w, col, name){
            var myDiv = document.createElement('div');
            myDiv.style.width = w;
            myDiv.style.height = h;
            myDiv.style.color = "red";
            myDiv.style.backgroundColor = col;
            myDiv.style.position = "absolute";

            //myDiv.innerHTML= "MYDIV";
            document.body.appendChild(myDiv);
            myDiv.name = name;
            myDiv.setAttribute("name", name);
            return myDiv;
      }
      (function generateTargets(){
            for (var i = 0; i < 10; i++){
                  let topPos = 200; //this might wastes time cuz let every time for loop goes through? idk.
                  let width = 50;
                  let height = 50;
                  let targ = makeDiv(height, width, 'red', 'target');
                  targ.style.top = height + 30;
                  targ.style.left = 100 + 10* i + (width*i);
                  targ.setAttribute("health", 5);
            }
      })();

      var player = (function makePlayer(){
            var player = makeDiv(100,100, "blue", "movingDiv");
            player.style.top = window.innerHeight/2+200;
            player.style.left = parseInt(window.innerWidth)/2;
            return player;
      })();
      var enemy = (function makeEnemy(){
            var enemy = makeDiv(50,50, "gold","enemy");
            enemy.style.left = window.innerWidth/2;
            enemy.style.top = 20;
            var intervalID2 = setInterval(function (){
                  enemyShoot(enemy, intervalID2);
            }, Math.random() * 3000);
            return enemy;
      })();
      
      function enemyShoot(enemy, intervalID2){ //fires at a random amount of time between 0 and 2000 ms
                  var bullet = makeDiv(10, 10, "blue", "enemyBullet");
                  var angle = Math.random() * 140 + 20; //generate a degree   //=========NOT HAVING VAR HERE TOTALLY FUCKED EVERYTHING, angle would change on every interval call thing.
                  angle = angle/180 * Math.PI; //turn it into radians
                  bullet.style.top = parseInt(enemy.style.top) + parseInt(enemy.style.height);
                  bullet.style.left = parseInt(enemy.style.left) + parseInt(enemy.style.width)/2 - parseInt(bullet.style.width)/2;
                  var intervalID = setInterval(function (){
                        moveBullet(bullet, intervalID, angle, intervalID2);
                  }, 300);
                  //Generate random angle in below 180 degrees
                  //Fire bullet from bottom of enemy
      }


      document.addEventListener('keypress', function(){
            movePlayer(event, player, enemy);
      });

      function movePlayer (event, div, enemy){
            console.log(event.key);
            switch(event.key){
                  case "w":
                        moveDiv("up", div);
                        break;
                  case "a":
                        moveDiv("left", div);
                        break;
                  case "s":
                        moveDiv("down", div);
                        break;
                  case "d":
                        moveDiv("right", div);
                        break;
                  case " ":
                        var bullet = makeDiv(20, 10, "green", "playerBullet");
                        fireDiv(bullet, div);
                        break;
                  case "j":
                        enemyShoot(enemy);
                        break;
            }
            //console.log(event.char);
            //console.log("Hello!!");
      }
      function moveDiv(dir, element){
            var dist = 60;
            switch(dir){
                  case "left":
                        console.log("hello");
                        element.style.left = parseInt(element.style.left) - dist;
                        console.log(element.style.left);
                        break;
                  case "right":
                        element.style.left = parseInt(element.style.left) + dist;
                        //element.style.left = 0;
                        break;
                  case "up":
                        element.style.top = parseInt(element.style.top) - dist;
                        break;
                  case "down":
                        element.style.top = parseInt(element.style.top) +dist;
                        break;
            }
      }
      function fireDiv(bullet, gun){
            bullet.style.top = parseInt(gun.style.top) - parseInt(gun.style.height);
            bullet.style.left = parseInt(gun.style.left) + parseInt(gun.style.width)/2;
            var intervalID = setInterval(function(){
                  moveBullet(bullet, intervalID, -Math.PI/2);
            }, 50);
      }
      function moveBullet(bullet, intervalID, angle, intervalID2){
            //console.log("calling move bullet");
            //console.log("angle = " + angle);
            if (parseInt(bullet.style.top) < 0 || parseInt(bullet.style.top) > parseInt(screen.height)-200 || parseInt(bullet.style.left) > parseInt(screen.width)-200){ //CLEAR THESE PROPERLY
                  clearInterval(intervalID);
                  document.body.removeChild(bullet);
                  return;
            }
            bullet.style.top = parseInt(bullet.style.top) + (50 * Math.sin(angle));
            bullet.style.left = parseInt(bullet.style.left) + (50 * Math.cos(angle));
            //console.log(bullet.name);
            if (bullet.getAttribute("name") == "playerBullet" && document.getElementsByName("target").length != 0){ //can we move this so im not checking this in the enemy call aswell (or just make an enemy move bullet)
                  checkTargetsForCollisions(bullet, "target", intervalID);
            }
            else if (bullet.getAttribute("name") == "enemyBullet"){
                  //console.log("in else if");
                  checkForCollisionEnemy(bullet, player, intervalID, intervalID2);
            }
      }

      function checkTargetsForCollisions(bullet, targetName, intervalID){
            var targets = document.getElementsByName(targetName);
            var targListLen = targets.length;
            for (var i = targListLen-1; i >= 0; i--){ //use foreach?
                  var target = targets[i];
                  //console.log(targets);
                  checkForCollision(bullet, target, targets, intervalID);
            }
      }
      function checkForCollisionEnemy(bullet, target, intervalID, intervalID2){
            var t = target.getBoundingClientRect();
            var b = bullet.getBoundingClientRect();
            if (t.top + t.height > b.top 
                  && t.left + t.width > b.left
                  && t.bottom - t.height < b.bottom
                  && t.right -t.width < b.right){
                        console.log("Player got hit");
                        var bullets = document.getElementsByName("enemyBullet");
                        alert("You died");
                        endGame();
                        //debugger;

                  }

      }
      function endGame (){
            var bullets = document.getElementsByName("enemyBullet");
            interval_id = setInterval(function(){
                  return;
            }, 9);
            for (var i = 1; i < interval_id; i++){
                   window.clearInterval(i);
            }
            for (var i = bullets.length-1; i>= 0; i--){
                  document.body.removeChild(bullets[i]);
            }

      }
      function checkForCollision(bullet, target, targets, intervalID){ //checks if bullet is in target, we should just check if one part touches target
                  var t = target.getBoundingClientRect();
                  var b = bullet.getBoundingClientRect();
                  if (t.top + t.height > b.top 
                        && t.left + t.width > b.left
                        && t.bottom - t.height < b.bottom
                        && t.right -t.width < b.right){
                        document.body.removeChild(bullet);
                        clearInterval(intervalID);
                        //targets[i].style.backgroundColor = "white"; NOOB LEVEL
                        health = target.getAttribute("health");
                        health --;
                        target.setAttribute("health", health); //reduce health of target
                        target.style.backgroundColor = myEnum[health]; //change colour of target according to health.
                        if (health <= 0) {
                              document.body.removeChild(target);
                              console.log("Targets length = " + targets.length);
                              if (targets.length == 0) {
                                    endGame();
                                    setTimeout(youWin, 100);

                              }
                        }
                        console.log("Collision");
                  }
            
      }
      myEnum = {
            1: "purple",
            2: "green",
            3: "blue",
            4: "black",
      }
      function youWin (){
            alert("CONGRATULATIONS YOU'VE WON!");
      }
      
})();


/* Things I'd like to change:
- currently, I'm passing interval ID around a lot so that I can cancel it when I want to, is there a better way to do this?
*/