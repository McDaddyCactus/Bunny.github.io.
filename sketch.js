const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var bunny;
var button;
var blink;
var eat;
var sad;
var blower;
var BgSound,cutSound,sadSound,eatingSound,airSound;
var muteBttn;

var rope,rope2,rope3;


function preload(){
  sad = loadAnimation ("sad_1.png","sad_2.png","sad_3.png");
  eat = loadAnimation ("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png",);
  blink = loadAnimation ("blink_1.png","blink_2.png","blink_3.png",);
  bg = loadImage ("background.png");
  food = loadImage ("melon.png");
  rabbit = loadImage ("Rabbit-01.png");
  cutb = loadImage ("cut_button.png");

  BgSound = loadSound ("sound1.mp3");
  sadSound = loadSound ("sad.wav");
  cutSound = loadSound ("rope_cut.mp3");
  eatingSound = loadSound ("eating_sound.mp3");
  airSound = loadSound ("air.wav");

  blink.playing = true;
  blink.looping = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}
function setup() 
{
  var isMobile =/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile){
   W = displayWidth;
   H = displayHeight;
   createCanvas(W+80,H);
  }
  else{
    W = windowWidth;
    H = windowHeight;
    createCanvas(W,H);
  }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,H,600,20);

  BgSound.play();
  BgSound.setVolume(0.25);
  bunny = createSprite(170,H-80,90,90);
  bunny.addImage(rabbit);
  bunny.scale = 0.2
  blink.frameDelay = 20;
  sad.frameDelay = 20;
  eat.frameDelay = 20;
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("crying",sad)
  bunny.addAnimation("eating",eat)
  bunny.changeAnimation("blinking")
  console.log()
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  fruitC = new Link(rope,fruit);
  fruitC2 = new Link(rope2,fruit);
  fruitC3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  imageMode (CENTER);

  //button1
  button = createImg("cut_button.png");
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //button2
  button2 = createImg("cut_button.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

    //button3
    button3 = createImg("cut_button.png");
    button3.position(360,200);
    button3.size(50,50);
    button3.mouseClicked(drop3);

 blower = createImg("balloon.png");
 blower.position(10,250);
 blower.size(150,100);
 blower.mouseClicked(airBlow);

 muteBttn = createImg ("mute.png")
 muteBttn.position(450,20);
 muteBttn.size(50,50);
 muteBttn.mouseClicked(mute);
}
function drop() {
  cutSound.play();
  rope.break();
  fruitC.detach();
  fruitC = null;
}

function drop2() {
  cutSound.play();
  rope2.break();
  fruitC2.detach();
  fruitC2 = null;
}

function drop3() {
  cutSound.play();
  rope3.break();
  fruitC3.detach();
  fruitC3 = null;
}
function draw() 
{
  background(51);
  image (bg,0,0,W+80,H);

  
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  if (fruit != null) {
    image (food,fruit.position.x,fruit.position.y,60,60)
  }
  if(collide(fruit,bunny)== true){
    bunny.changeAnimation ("eating")
    eatingSound.play();
  }

    if (fruit != null && fruit.position.y >= 650){
    bunny.changeAnimation ("crying")
    BgSound.stop();
    sadSound.play();
    fruit = null
  }

  Engine.update(engine);
  
  drawSprites();

 
   
}
function collide(body,sprite){
if (body != null){
 var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
if (distance <= 50){
  World.remove(engine.world,fruit) 
  fruit = null
  return true;
  
}
else return false
}

}
function airBlow(){
   Matter.Body.applyForce(fruit,{x:0, y:0},{x:0.01,y:0});
   airSound.play();
}
function mute(){
  if (BgSound.isPlaying()){
    BgSound.stop();
  }
  else{
    BgSound.play();
  }
}