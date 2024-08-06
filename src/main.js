import { AnimatedSprite, Application, Assets } from "pixi.js";

let app;
let pathName = "../assets/Knight_Sprites/";
let animatedSprites = [];
let animations = ["idle", "run", "roll"];
let keysPressed = {};
let setupComplete = false;
let currentSprite;
let currentPosi = {};

window.onload = async () => {
  app = new Application({
    resizeTo: window,
    background: "#1099bb",
  });

  document.body.appendChild(app.view);

  await createAnimations(animations);
  console.log(animatedSprites);

  currentSprite = animatedSprites[0];
  console.log(currentSprite);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  currentPosi.x = app.screen.width/2;
  currentPosi.y = app.screen.height/2;

  app.ticker.add(gameloop);
  app.ticker.start();
}

function gameloop(){
  let flag = true;
  if(!setupComplete) return;

  if(keysPressed['d']){
    flag = false;
    currentSprite = animatedSprites[1];
    currentPosi.x += 2;
    currentSprite.scale.x = 1;
  }
  if(keysPressed['a']){
    flag = false;
    currentSprite = animatedSprites[1];
    currentPosi.x -= 2;
    currentSprite.scale.x = -1
  }
  if(keysPressed[' '] && keysPressed['d']){
    flag = false;
    currentPosi.x += 2
    currentSprite = animatedSprites[2];
    currentSprite.scale.x = 1
  }
  if(keysPressed[' '] && keysPressed['a']){
    flag = false;
    currentPosi.x -= 2
    currentSprite = animatedSprites[2];
    currentSprite.scale.x = -1
  }
  if(flag){
    currentSprite = animatedSprites[0]
  }
  currentSprite.x = currentPosi.x;
  currentSprite.y = currentPosi.y;
  app.stage.removeChildren()
  app.stage.addChild(currentSprite);
}

function keyPressed(e){
  keysPressed[e.key] = true;
}

function keyReleased(e){
  keysPressed[e.key] = false;
}

async function createAnimatedSprite(animName) {
  let sheetTexture = await Assets.load(`${pathName}${animName}.png`);

  Assets.add({
    alias: `${animName}Asset`,
    src: `${pathName}${animName}.json`,
    data: {
      texture: sheetTexture,
    },
  });

  let sheet = await Assets.load(`${animName}Asset`);
  let animatedSprite = new AnimatedSprite(sheet.animations[`${animName}`]);
  animatedSprite.anchor.set(0.5);
  animatedSprite.x = app.screen.width / 2;
  animatedSprite.y = app.screen.height / 2;
  animatedSprite.animationSpeed = .2;
  animatedSprite.play();
  return animatedSprite;
}

async function createAnimations(anims) {
  for (let anim of anims) {
    let animatedSprite = await createAnimatedSprite(anim);
    animatedSprites.push(animatedSprite);
  }
  setupComplete = true;
}

