var snake;
var scl=20;
var w=600;
var h=600;
var food;
var score=0;
var v=10;
var slider;
var ingame = false;
var test;



function setup(){
  createCanvas(w,h);
  slider = createSlider(0.1,1,0.1,0.1);
  slider.position(0,h+scl);
  frameRate(v);
  snake = new snake(w/2,h/2);
  snake.vel.y = -scl;
  pickLocation();
}

function pickLocation(){
  let cols = floor(w/scl);
  let rows = floor(h/scl);
  food = createVector(floor(random(cols)),floor(random(rows)));
  food.mult(scl);
}

function draw(){
  background(51);
  if(play()){
    fill(255,0,100);
    rect(food.x,food.y,scl,scl);
    if(snake.eat()){
      pickLocation();
    }
    if(snake.loose()){
      noLoop();
      textAlign(CENTER);
      textSize(42);
      text("game over !\nscore : " + score,w/2,h/2);
    }
    snake.update();
    snake.show();
  }
}

function play(){
  if(key === ' ' || ingame){
    ingame = true
    return true;
  }else{

    fill(255);
    textAlign(CENTER);
    text('press space to play\n( You can fix the difficulty with the slider at the bottom left)',w/2,h/2);
    return false;
  }
}



function snake(x,y) {

  this.pos=createVector(x,y);
  this.vel=createVector(0,0);
  this.total=1;
  this.tail = [];

  this.update = function(){
    frameRate(v);
    if(this.total === this.tail.length){
      for(let i=0; i<this.tail.length-1; i++){
        this.tail[i]=this.tail[i+1];
      }
    }
    this.tail[this.total-1]=createVector(this.pos.x,this.pos.y);

    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, -scl, w);
    this.pos.y = constrain(this.pos.y, -scl, h);
  }

  this.eat = function(){
    var d = dist(this.pos.x, this.pos.y, food.x,food.y);
    if(d<1){
      this.total++;
      v += slider.value();
      score += floor(v);
      return true;
    }else {
      return false;
    }
  }

  this.loose = function(){
    let d;
    if(this.pos.x == w){
      return true;
    }
    if(this.pos.x == -scl){
      return true;
    }
    if(this.pos.y == h){
      return true;
    }
    if(this.pos.y == -scl){
        return true;
    }
    for(var i=0; i<this.tail.length; i++){
      d = dist(this.pos.x,this.pos.y,this.tail[i].x,this.tail[i].y);
      if(d<1){
        return true;
      }
    }
    return false;
  }

  this.show = function(){
    for(let i=0;i<this.tail.length;i++){
      var c = 255-i*5;
      fill(c);
      rect(this.tail[i].x, this.tail[i].y,scl,scl);
    }
    fill(200,200,100);
    rect(this.pos.x, this.pos.y,scl,scl);
    fill(255);
    textSize(8);
    text(score,scl,scl);
  }
}


function keyPressed(){
  if(keyCode == 37 && snake.vel.x==0){
    snake.vel.mult(0);
    snake.vel.add(-scl,0);
  }else if(keyCode == 38 && snake.vel.y==0){
    snake.vel.mult(0);
    snake.vel.add(0,-scl);
  }else if(keyCode == 39  && snake.vel.x==0){
    snake.vel.mult(0);
    snake.vel.add(scl,0);
  }else if(keyCode == 40  && snake.vel.y==0){
    snake.vel.mult(0);
    snake.vel.add(0,scl);
  }
}
