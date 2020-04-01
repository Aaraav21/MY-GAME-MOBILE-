var ground,groundimg;
var cannon,cannonimg;
var invisibleground;
var enemygroup,enemyimg,enemy;
var enemygroup2,enemyimg2,enemy2;
var wallgroup,wallimg,wall;
var bulletgroup,bulletimg,bullet;
var score=0;
var gamestate="play";
var gameover,gameoverimg;
var bulletsound,enemysound,gameoversound;
var end,end1;
var welcome1,welcomeimg;
//var bg,bgimg;



function preload(){
cannonimg=loadImage("sprites/cannon3.png");
groundimg=loadImage("sprites/ground23.png");
enemyimg=loadImage("sprites/ene1.png");
enemyimg2=loadImage("sprites/ene2.png");
wallimg=loadImage("sprites/wall.png");
bulletimg=loadImage("sprites/bullet.png");
gameoverimg=loadImage("sprites/GameOver.png");
bulletsound=loadSound("sounds/bullet5.mp3");
enemysound=loadSound("sounds/enemy5.mp3");
gameover5=loadSound("sounds/gameover5.mp3");
end1=loadImage("sprites/repalyb.png");
welcomeimg=loadImage("sprites/welcome21.jpg");
//bgimg=loadImage("sprites/bg21.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 // bg=createSprite(windowWidth,windowHeight);
  //bg.addImage("bg",bgimg);
  //bg.visible=false;
  welcome1=createSprite(400,200);
  welcome1.scale=0.8;
  welcome1.addImage("welcome1",welcomeimg);
  ground=createSprite(width/2,height-50,width,125);
  ground.addImage("ground",groundimg);
  ground.scale=0.5;
  cannon=createSprite(width/2,height-100);
  cannon.addImage("cannon3",cannonimg);
  cannon.scale=0.2;
  invisibleground=createSprite(400,375,800,20);
  invisibleground.visible=false;
  gameover=createSprite(windowWidth-800,windowHeight-400);
  gameover.addImage("gameover",gameoverimg);
  end=createSprite(400,200);
  end.addImage("end",end1);
  end.scale=0.3;
  end.visible=false;
  gameover.visible=false;
  ground.visible=false;
  cannon.visible=false;
  enemygroup=new Group();
  enemygroup2=new Group();
  wallgroup=new Group();
  bulletgroup=new Group();
}

function draw() {
  background(48,48,48);
  textSize(20);
  fill("white");

//if(touches.length>0||mousePressedOver(welcome1)){
 // gamestate="play";
  //touches=[];
//}
if(gamestate==="play"){
  background("red");
 // bg.visible=true;
 
 end.visible=false;
  gameover.visible=false;
  welcome1.visible=false;
  cannon.x=mouseX; 
  cannon.collide(invisibleground);
  cannon.visible=true;
  ground.visible=true;


if(touches.length>0||mousePressedOver(cannon)){
  
  spawnbullet();
  bulletsound.play();
  touches=[];
  
}
  spawnenemy();
  spawnenemy2();
  spawnwall();
if(bulletgroup.isTouching(enemygroup)){
  enemygroup.destroyEach();
  score=score+1;
}
if(bulletgroup.isTouching(enemygroup2)){
  enemygroup2.destroyEach();
  score=score+1;
}
if(bulletgroup.isTouching(wallgroup)){
gamestate="end";
}
}
if(gamestate==="end"){
 
  background("black");
//bg.visible=false;
  score=0;
  enemysound.stop();
  gameover.visible=true;
  end.visible=false;
  cannon.visible=false;
  ground.visible=false;

  enemygroup.destroyEach();
  enemygroup2.destroyEach();
  
  wallgroup.destroyEach();
  enemygroup.setVelocityXEach(0);
  enemygroup2.setVelocityXEach(0);
  wallgroup.setVelocityXEach(0);

  enemygroup.setLifetimeEach(-1);
  enemygroup2.setLifetimeEach(-1);
  wallgroup.setLifetimeEach(-1);

  enemy.visible=false;
  enemy2.visible=false;
  wall.visible=false;
  if(mousePressedOver(end)){
    
    gamestate="reset";
  }

  }
  if(gamestate==="reset"){
    score=0;
    gameover.visible=false;
    end.visible=false;
    gamestate="play";
    
    cannon.visible=true;
    ground.visible=true;
    enemygroup.setVelocityXEach(0);
      enemygroup2.setVelocityXEach(0);
      wallgroup.setVelocityXEach(0);
    
  }

  drawSprites();
  text("SCORE:"+score,windowWidth-180,windowHeight-670);
}
function spawnenemy(){
  if(frameCount%97===0){
     enemy=createSprite(windowWidth,windowHeight-550,20,20);
     enemysound.play();
    enemy.addImage("enemy",enemyimg);
    enemy.velocityX=-4;
    enemy.scale=0.05;
    enemy.y=Math.round(random(windowHeight-600,windowHeight-650));
    enemygroup.add(enemy);
  }
}
function spawnenemy2(){
  if(frameCount%133===0){
     enemy2=createSprite(windowWidth,windowHeight-400,20,20);
    enemy2.addImage("enemy2",enemyimg2);
    enemy2.velocityX=-3;
    enemy2.scale=0.2;
    enemy2.y=Math.round(random(windowHeight-400,windowHeight-450));
    enemygroup2.add(enemy2);
  }
}
function spawnwall(){
  if(frameCount%159===0){
     wall=createSprite(windowWidth,windowHeight-300,20,20);
    wall.addImage("wall",wallimg);
    wall.velocityX=-6;
    wall.scale=0.5;
    wall.y=Math.round(random(windowHeight-500,windowHeight-550));
  wallgroup.add(wall);
  }
}
function spawnbullet(){
   bullet=createSprite(width/2,height-120);
  bullet.addImage("bullet",bulletimg);
  bullet.scale=0.05;
  bullet.velocityY=-7;
  bullet.x=cannon.x;
 // bullet.y=cannon.y;
  bulletgroup.add(bullet);
}