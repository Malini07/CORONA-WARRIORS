var bg;
var girlImg;
var mask1Img, mask2Img, mask3Img, sanitiser1Img, sanitiser2Img, sanitiser3Img;
var invisibleGround;
var score =0;
var mask_SanitiserGroup;
var coronaGroup;
var heartImg;
var heartCount=3;
var xPos=100;
var showHeart=true;
var gameState=0;
var gameOverImg,restartImg;

function preload() {
  bgImg = loadImage("Images/BgFinal.jpg");
  girlImg = loadAnimation("Images/Girl11.png", "Images/Girl22.png", "Images/Girl33.png", "Images/Girl44.png",
    "Images/Girl55.png", "Images/Girl66.png", "Images/Girl77.png", "Images/Girl88.png")
  mask1Img = loadImage("Images/mask11.png")
  mask2Img = loadImage("Images/mask22.png")
  mask3Img = loadImage("Images/mask33.png")
  sanitiser1Img = loadImage("Images/sanitiser22.png")
  sanitiser2Img = loadImage("Images/sanitizer11.png")
  sanitiser3Img = loadImage("Images/sanitizer33.png")
  corona1 = loadImage("Images/corona2.png")
  corona2 = loadImage("Images/corona3.png")
  heartImg = loadImage("Images/heart.png")
  gameOverImg = loadImage("Images/gameOver.png")
  restartImg = loadImage("Images/restart.png")
}

function setup() {
  createCanvas(displayWidth - 50, displayHeight - 150)
  bkg = createSprite(width / 2 + 450, height / 2, width + 200, height)
  bkg.addImage(bgImg)
  bkg.scale = 2;
  bkg.velocityX = -2;

  girl = createSprite(200, displayHeight - 340)
  girl.addAnimation("girlRunning", girlImg);
  girl.scale = 0.8;
  invisibleGround = createSprite(200, displayHeight - 230, 500, 20)
  invisibleGround.visible = false;

  mask_SanitiserGroup=new Group()
  coronaGroup=new Group()
  heartGroup=new Group()

  gameOver = createSprite(displayWidth/2,displayHeight/2-100)
  gameOver.addImage(gameOverImg)
  //gameOver.scale = 0.5;
  
  restart = createSprite(displayWidth/2,displayHeight/2)
  restart.addImage(restartImg)
  //restart.scale = 0.5;
  

}


function draw() {

  if(gameState===0){
    gameOver.visible=false;
    restart.visible=false;
  if (bkg.x < (width / 2 - 400)) {
    bkg.x = width / 2 + 450;
  }
  spawnMaskAndSanitiser();

  if (keyDown("space")) {
    girl.velocityY = -4;
  }
  girl.velocityY = girl.velocityY + 0.05;
  girl.collide(invisibleGround);

  spawnCorona();

  if(girl.isTouching(mask_SanitiserGroup)){
    mask_SanitiserGroup.destroyEach()
    score=score+1;
  }

  if(girl.isTouching(coronaGroup)){
    coronaGroup.destroyEach()
    heartCount=heartCount-1;
    showHeart=true;
    heartGroup.destroyEach();
    xPos=100;
  }
    
if(showHeart===true){

  for (var i = 1; i <=heartCount; i++) {
    if(i===heartCount){
      console.log(i);
       showHeart=false;
       
      }
    xPos=xPos+50;
    console.log(xPos)
    heart=createSprite(xPos,60);
    heart.addImage(heartImg);
    heart.scale=0.05;
    heartGroup.add(heart);
    console.log("heartCount: "+heartCount+" showing: "+i) 
  }
}

if(heartCount===0){
  gameState=1
}
  }
  else if(gameState===1){
    gameOver.visible=true;
    restart.visible=true;
    bkg.velocityX=0;
    girl.visible=false;
    mask_SanitiserGroup.setVelocityXEach(0)
    coronaGroup.setVelocityXEach(0)
    if(mousePressedOver(restart)) {
       reset(); 
      }

  }

  drawSprites();
  fill("black")
  textSize(30)
  text("SCORE = "+score,displayWidth-250,100);
  text("LIFE :",40,70)
}

function spawnMaskAndSanitiser() {
  if (frameCount % 100 === 0) {

    var rnd1 = Math.round(random(displayHeight - 300, displayHeight - 450))

    mask_Sanitiser = createSprite(displayWidth, rnd1);
    mask_Sanitiser.velocityX = -3;
    mask_Sanitiser.scale = 0.3;
    var rnd2 = Math.round(random(1, 6));
    switch (rnd2) {
      case 1: mask_Sanitiser.addImage(mask1Img)
        break;
      case 2: mask_Sanitiser.addImage(mask2Img)
        break;
      case 3: mask_Sanitiser.addImage(mask3Img)
        break;
      case 4: mask_Sanitiser.addImage(sanitiser1Img)
        break;
      case 5: mask_Sanitiser.addImage(sanitiser2Img)
        break;
      case 6: mask_Sanitiser.addImage(sanitiser3Img)
        break;
    }
    mask_SanitiserGroup.add(mask_Sanitiser)
    mask_Sanitiser.lifetime=800
  }
}

function spawnCorona() {
  if (frameCount % 150 === 0) {

    var rnd1 = Math.round(random(displayHeight - 300, displayHeight - 450))

    corona = createSprite(displayWidth, rnd1);
    corona.velocityX = -3;
    corona.scale = 0.07;
    var rnd2 = Math.round(random(1, 2));
    switch (rnd2) {
      case 1: corona.addImage(corona1)
        break;
      case 2: corona.addImage(corona2)
        break;
     
    }
    coronaGroup.add(corona)
    corona.lifetime=800
  }
}
function reset(){
  gameState=0;
  gameOver.visible=false;
  restart.visible=false;
  girl.visible=true;
  heartCount=3;
  showHeart=true;
  score=0;
  mask_SanitiserGroup.destroyEach();
  coronaGroup.destroyEach();
  bkg.velocityX=-2;
}
