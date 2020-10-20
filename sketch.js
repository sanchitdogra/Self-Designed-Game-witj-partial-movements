const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engineObj, world;
var ground;
var player;
var invisibleGround;
var playerWalkImg;
var jumpState = 0;

function preload(){
  playerStandImg=loadAnimation("boy_walking_01.png");
  playerWalkImg=loadAnimation("boy_walking_01.png","boy_walking_03.png","boy_walking_04.png","boy_walking_05.png","boy_walking_06.png");
  playerJumpAnimation = loadAnimation("boy_jumping_01.png","boy_jumping_03.png","boy_jumping_04.png","boy_jumping_05.png","boy_jumping_06.png","boy_jumping_07.png","boy_jumping_08.png")
 
}
function setup() 
{
  createCanvas(displayWidth, displayHeight-120);
  engineObj = Engine.create();
  world = engineObj.world;

  //ground = new Ground(0,displayHeight/2+200,displayWidth, 80);
  ground = new Ground(displayWidth/2-700,displayHeight/2+220,displayWidth*9,100);
  player  = createSprite(displayWidth/2-700, displayHeight-250, 100,100);
  //player  = createSprite(0,0, 100,100);
  
  player.addAnimation("standing",playerStandImg);
  player.addAnimation("walking",playerWalkImg);
  player.addAnimation("jumping",playerJumpAnimation);
  player.setCollider("circle", 0,0,40);

  //player.scale=0.5;
 invisibleGround = createSprite(displayWidth/2-20,displayHeight-200, displayWidth*20,10);
 invisibleGround.visible=true;

 player.debug = true;
}

function draw() 
{
  background("tan");  

  Engine.update(engineObj);

  console.log(player.y);

  //ground.display();
  camera.debug=true;
  camera.position.x =player.x +700;
  //camera.position.y =  displayHeight-250;
  playerMovement();
  player.velocityY=player.velocityY+0.5
  player.collide(invisibleGround);

  drawSprites();
}

function playerMovement()
{
  if(keyWentDown(RIGHT_ARROW))
  {
    player.velocityX = 20;
    player.changeAnimation("walking",playerWalkImg);
  }

  if(keyWentUp(RIGHT_ARROW))
  {
    player.velocityX = 0;
    player.changeAnimation("standing",playerStandImg);
  }
  if(keyWentDown("space")){
    player.velocityY=-10;
    player.changeAnimation("jumping",playerJumpAnimation);
    jumpState = 1;
  }
  if(jumpState === 1&&player.isTouching(invisibleGround)){
    player.changeAnimation("standing",playerStandImg);
    jumpState =0;
  }
  //if(player.isTouching(invisibleGround)){
    //player.changeAnimation("standing",playerStandImg);
  //}
}