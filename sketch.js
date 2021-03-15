var backImage,backgr;
var player, player_running;
var ground,ground_img;
var food, foodImg;
var obstacle, obstacleImg;
var gameOver, gameOverImg;
var foodGroup, obstacleGroup;

var END =0;
var PLAY =1;
var score= 0;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  foodImg= loadImage("banana.png");
  obstacleImg= loadImage("stone.png");
  gameOverImg= loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  gameOver= createSprite(400,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale= 0.5;
  gameOver.visible= false;

  foodGroup= createGroup();
  obstacleGroup= createGroup();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score= score+ 2;
      player.scale+= 0.030;
    }
    if(obstacleGroup.isTouching(player)){
      gameState= END;
    }
  }
  else if(gameState === END){
    gameOver.visible= true;
    backgr.velocityX= 0;
    player.visible= false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    //ground.setVelocity(0,0);
  }

  spawnFood();
  spawnObstacle();
  drawSprites();

  stroke("black");
  textSize(32);
  fill("white");
  text("Score:"+ score, 600, 70);
}

function spawnFood(){
  if(frameCount% 80 === 0){
    var banana= createSprite(600,250,40,10);
    banana.y= random(120,200);
    banana.addImage(foodImg);
    banana.scale= 0.05;
    banana.velocityX= -4;

    banana.lifetime= 300;
    player.depth= banana.depth+ 1;
    foodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 80=== 0){
    var stone= createSprite(300,325,20,20);
    stone.addImage(obstacleImg);
    stone.scale= 0.1;
    stone.velocityX= -4;
    stone.lifetime= -10;
    obstacleGroup.add(stone);
  }
}
