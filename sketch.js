var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex,ta1,ground,ga,iGround,cloud,ca,Clouds,Obstacles,score,cactus,c1,c2,c3,c4,c5,c6,go,r1,tc
var highScore=0
var gameOver
var restart
var life = 0


function preload (){
  ta1 = loadAnimation("trex1.png","trex3.png","trex4.png");
  ga = loadImage("ground2.png");
  ca = loadImage("cloud.png");
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  go = loadImage("gameOver.png");
  r1 = loadImage("restart.png");
  tc = loadImage("trex_collided.png");
  
}

function setup() {
  createCanvas(600,200);
  trex = createSprite (50,170,20,20);
  trex.addAnimation("ta1",ta1);
  trex.scale=0.5;  
  
  ground = createSprite (300,190,600,10)
  ground.addImage(ga);
  ground.velocityX=-8
  ground.x = ground.width /2;
  
  iGround = createSprite (300,195,600,10);
  iGround.visible=false
  
  Clouds = new Group();
  Obstacles = new Group();
  
  score=0
  
  
  gameOver = createSprite(300,110,20,20)
  gameOver.addImage(go);
  
  restart = createSprite(300,140,20,20)
  restart.addImage(r1);
  
  restart.scale = 0.5;
  gameOver.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
}

function draw() {
  background("white");
  //console.log(trex.y);
  drawSprites();
  trex.collide(iGround)
  
  textSize(17);
  textFont("Georgia");
  textStyle(BOLD);
  if(highScore>0){
  text("high score "+highScore,457,90);
  }

  text("score "+score,500,110);
  
  life = frameCount + 1;
  
  if (gameState===PLAY){
  if(keyDown("space") && trex.y >= 160){
    trex.velocityY = -12.5 ;
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  //add gravity
  trex.velocityY = trex.velocityY + 1;
  
  spawnClouds();
  spawnObstacles();
  
  score=Math.round(score+getFrameRate()/60);
    
  
  if (Obstacles.isTouching(trex)){
      gameState=END;
    }

    
} else if(gameState === END) {
    End();
    
  if (highScore<score){
    highScore=score;
  }
  }
  
  if (mousePressedOver(restart)){
    reset();
  }
  

}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(ca);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    Clouds.add(cloud);
  }
  
}

function spawnObstacles(){
  
  
  if (frameCount% 60 ===0){
    cactus = createSprite(600,175 ,20,20);
    
    var number = Math.round(random(1,6));
    
  switch(number){
    case 1: cactus.addImage(c1); break;
    case 2: cactus.addImage(c2); break;
    case 3: cactus.addImage(c3); break;
    case 4: cactus.addImage(c4); break;
    case 5: cactus.addImage(c5); break;
    case 6: cactus.addImage(c6); break;
    default: break;
  }
    cactus.velocityX=-(5+2*score/100);
    cactus.scale=0.5;
    cactus.lifetime= (600/7);
    
    //add each obstacle to the group
    Obstacles.add(cactus);
  }
}

function End(){
  
  gameOver.visible = true;
  restart.visible = true;
  
  ground.velocityX=0;
  Obstacles.setVelocityXEach(0);
  Clouds.setVelocityXEach(0);
 
  trex.addImage(tc);

  ground.velocityX = 0;
  trex.velocityY = 0;
  Obstacles.setLifetimeEach(life);
  Clouds.setLifetimeEach(life);

  if (highScore<score){
    highScore=score;
  }
}

function reset(){
  
  gameState=PLAY;
  
  score=0;
  
  highScore.visible = true;
  gameOver.visible = false;
  restart.visible = false;
  
  trex.changeAnimation("ta1", ta1);
  
  Obstacles.destroyEach();
  Clouds.destroyEach();
}