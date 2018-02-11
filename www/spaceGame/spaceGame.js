
var health;
var myGamePiece;
var myObstacles = [];
var myScore;
var meteors = [];
  function startGame() {
    $('button').css('display',"none");
    myGameArea.start();
      myGamePiece = new component(30, 30, "#5dc187", 330, myGameArea.canvas.height - 30 - 10,'','myGamePiece');
      myScore = new component("30px", "Consolas", "black", 280, 40, "text");
      health =  new component("30px", "Consolas", "white", 500, 40, "text");
  }
  var myGameArea = {
      canvas : document.createElement("canvas"),

      start : function() {
          this.canvas.width = 700;
          this.canvas.height = 600;
          this.canvas.style.display = 'block';
          this.canvas.style.marginLeft = '360px';
          this.canvas.style.cursor = "none"; //hide the original cursor
          this.context = this.canvas.getContext("2d");
          document.body.insertBefore(this.canvas, document.body.childNodes[1]);
          this.frameNo = 0;
          this.interval = setInterval(updateGameArea, 5);

          window.addEventListener('mousemove', function (e) {
              myGameArea.x = e.pageX-369;
              myGameArea.y = e.pageY-15;
          })

       },
      clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
  }


  function component(width, height, color, x, y,type) {
      this.gamearea = myGameArea;
      this.width = width;
      this.height = height;
      this.score = 0;
      this.x = x;
      this.y = y;
      this.type = type;

      this.update = function() {
          ctx = myGameArea.context;
          if (this.type == "text") {
              ctx.font = this.width + " " + this.height;
              ctx.fillStyle = color;
              ctx.fillText(this.text, this.x, this.y);

          } else {
              ctx.fillStyle = color;
              ctx.fillRect(this.x, this.y, this.width, this.height);
          }
      }
      if(this.name =='myGamePiece'){
        setInterval(function a(){
          xAxis = x;
          yAxis = y;

        },1000)

      }
      this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
       }



      this.crashWith = function(otherobj) {
          var myleft = this.x;
          var myright = this.x + (this.width);
          var mytop = this.y;
          var mybottom = this.y + (this.height);
          var otherleft = otherobj.x;
          var otherright = otherobj.x + (otherobj.width);
          var othertop = otherobj.y;
          var otherbottom = otherobj.y + (otherobj.height);
          var crash = true;
          if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
              crash = false;
          }
          return crash;
      }

  }
  gameOver = false;
  healthV = 5;
  s = 0.8;
  s2 = 1.8;

  function updateGameArea() {

      var x, height, gap, minHeight, maxHeight, minGap, maxGap;
      for (i = 0; i < meteors.length; i += 1) {
          if (myGamePiece.crashWith(meteors[i])) {
            healthV -= 1;

            meteors.splice(i,1);
            gameOver = false;




            game();


          }
      }



      for (i = 0; i < myObstacles.length; i += 1) {
          if (myGamePiece.crashWith(myObstacles[i])) {
            gameOver = true;
            game();
            return;

          }
      }


      if(healthV==0){

        gameOver = true;
        game();



        health.text = "Health:"+healthV;
        health.update();



        return;

      }


      myGameArea.clear();

      myGameArea.frameNo += 1;
      if(everyinterval(1000)){
        s += 0.1;
        s2 += 0.1;

      }

      if (myGameArea.frameNo == 1 || everyinterval(250)) {
          x = myGameArea.canvas.width;
          minHeight = 20;
          maxHeight = 200;
          max = x-120;
          min = 120
          width = Math.floor(Math.random() * (max - min + 1)) + min;
          width2 = x-width-120;
          y = 0;
          myObstacles.push(new component(width , 50, '#5283bf', 0, -50));
          myObstacles.push(new component(width2 , 50, '#5283bf', x-width2 , -50));
      }
      for (i = 0; i < myObstacles.length; i += 1) {
          myObstacles[i].y += s;
          myObstacles[i].update();

      }
      //meteors
      if(myGameArea.frameNo == 1 || everyinterval(50)){
        place = Math.floor(Math.random() * (700 + 1));
        meteors.push(new component(10 , 30, 'red', place, -30));
      }

      for (i = 0; i < meteors.length; i += 1) {
          meteors[i].y += s2;
          meteors[i].update();
      }
      health.text = "Health:"+healthV;
      health.update();
      myScore.text="Score: " + Math.floor(myGameArea.frameNo/200);
      myScore.update();



      if (myGameArea.x && myGameArea.y) {
        myGamePiece.x = myGameArea.x;
        myGamePiece.y = myGameArea.y;
      }
      if(myGameArea.x <=0 ){
        myGamePiece.x = 0;

      }
      else if (myGameArea.x >= 670){
        myGamePiece.x = 670;
      }



      myGamePiece.update();



  }
  function gameAgain(){
  myGameArea.clear();
  myObstacles = [];
  meteors = [];
  myScore = 0;
  myGameArea.frameNo = 0;
  clearInterval(myGameArea.interval);
  healthV=5;
  s = 0.8;
  s2 = 1.8;
}
  function game(){
    if(gameOver){
      $('button').css('display', "block");


    }
  }
  function everyinterval(n) {
      if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
      return false;
  }
