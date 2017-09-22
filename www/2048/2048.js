/**
 * Created by markzhou on 8/27/17.
 */
var num=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

function log(n){
  var x = Math.floor(n/4);
  var y = n%4;
  num[x][y] = 2;
  $('#' + x + y).text(2);
}
function value(s){
  var x = Math.floor(s/4);
  var y = s%4;
  return num[x][y];
}
function firstRandom() {
  var rand1 = Math.floor(Math.random() * 16);
  var rand2 = Math.floor(Math.random() * 16);
  while (rand1 == rand2) {
    rand1 = Math.floor(Math.random() * 16);
  }
  console.log(rand1);
  console.log(rand2);
  log(rand1);
  log(rand2);
  console.log(num);
}
function lognum(){
  for(var r = 0; r<=3; r ++){
    for(var c = 0; c <= 3; c ++){

      $('#'+r + c).text(num[r][c]);
      //if(num[r][c] == 0){
       // $('#'+r+c).text('');
      //}
      if(num[r][c] == 0){
        $('#'+r + c).css('background-color','peachpuff');
        $('#'+r + c).css('color','transparent');
      }
      if(num[r][c] == 2){
        $('#'+r + c).css('background-color','#bec300');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 4){
        $('#'+r + c).css('background-color','#7ab9d6');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 8){
        $('#'+r + c).css('background-color','#8ae7cd');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 16){
        $('#'+r + c).css('background-color','#c59d6e');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 32){
        $('#'+r + c).css('background-color','#bda0ce');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 64){
        $('#'+r + c).css('background-color','#ce718e');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 128){
        $('#'+r + c).css('background-color','#b4c4ce');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 256){
        $('#'+r + c).css('background-color','#68a27f');
        //$('#'+r + c).css('font-size','20px');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 512){
        $('#'+r + c).css('background-color','#37969a');
        //$('#'+r + c).css('font-size','20px');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 1024){
        $('#'+r + c).css('background-color','#363978');
        //$('#'+r + c).css('font-size','20px');
        $('#'+r + c).css('color','white');
      }
      if(num[r][c] == 2048){
        $('#'+r + c).css('background-color','#00ce1a');
        //$('#'+r + c).css('font-size','20px');
        $('#'+r + c).css('color','white');
        alert("YOU WON!!!!!!!");
      }

    }
  }
}

firstRandom();
lognum();
function getRandInt() {
  for (var x = 0; x < 1; x++) {
    var rand = Math.floor(Math.random() * 16);
    //alert(rand);
    while(value(rand) != 0) {
      rand = Math.floor(Math.random() * 16);
      //alert(rand);
    }

    log(rand);
  }
}
function newGame() {
  for(var r = 0; r<=3; r ++){
    for(var c = 0; c <= 3; c ++){
      num[r][c] = 0;
    }
  }
  firstRandom();
  lognum();
}
$(document).keydown(function(e) {
  if (e.which === 38) {
    //up
    e.preventDefault();
    var w = false;
    for(var r = 1; r<=3; r++){
      for(var c = 0; c <= 3; c++){
        var number = num[r][c];
        for(var n = r-1; n>=0; n-- ) {
          if (number == num[n][c] && number != 0) {
            num[n][c] *= 2;
            num[n+1][c] = 0;
            w = true;
            break;
          }
          else if (num[n][c] == 0 && number != 0 ) {
            num[n][c] = number;
            num[n+1][c] = 0;
            w = true;

          }
          else if(number != num[n][c] && num[n][c] != 0 && number != 0){
            break;
          }
        }
      }
    }
    if(w){
      getRandInt();
    }
    lognum();
  }
});
$(document).keydown(function(e) {
  if (e.which === 40) {
    //down
      e.preventDefault();
    var w = false;
    for(var r = 2; r>=0; r--){
      for(var c = 0; c <= 3; c++){
        var number = num[r][c];
        for(var n = r+1; n<=3; n++ ) {
          console.log(num);
          if (number == num[n][c] && number != 0) {
            num[n][c] *= 2;
            num[n-1][c] = 0;
            w = true;
            break;
          }
          else if (num[n][c] == 0 && number != 0 ) {
            num[n][c] = number;
            num[n-1][c] = 0;
            w = true;
          }
          else if(number != num[n][c] && num[n][c] != 0 && number != 0){
            break;
          }
        }

      }
    }
    if(w){
      getRandInt();
    }
    lognum();
  }
});
$(document).keydown(function(e) {
  if (e.which === 37) {
    //left
      e.preventDefault();
    var w = false;
    for(var r = 0; r<=3; r++){
      for(var c = 1; c <= 3; c++){
        var number = num[r][c];
        for(var n = c-1; n>=0; n-- ) {
          if (number == num[r][n] && number != 0 ) {
            num[r][n] *= 2;
            num[r][n+1] = 0;
            w = true;
            break;
          }
          else if (num[r][n] == 0 && number != 0) {
            num[r][n] = number;
            num[r][n+1] = 0;
            w = true;
          }
          else if(num[r][n] != 0 && number != num[r][n] && number != 0){
            break;
          }
        }

      }
    }
    if(w){
      getRandInt();
    }
    lognum();
  }
});
$(document).keydown(function(e) {
  if (e.which === 39) {
    //right
      e.preventDefault();
    var w = false;
    for(var r = 3; r>=0; r--){
      for(var c = 2; c >=0; c--){
        var number = num[r][c];
        for(var n = c+1; n<=3; n++ ) {
          console.log(num);
          if (number == num[r][n] && number != 0) {
            num[r][n] *= 2;
            num[r][n-1] = 0;
            w = true;
            break;
          }
          else if (num[r][n] == 0 && number != 0) {
            num[r][n] = number;
            num[r][n-1] = 0;
            w = true;
          }
          else if(num[r][n] != 0 && number != num[r][n]&& number != 0){
            break;
          }
        }

      }
    }
    if(w){
      getRandInt();
    }
    lognum();
  }
});
