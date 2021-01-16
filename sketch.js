var banana_img, stone_img;
var monkey_moving, mon_collided;
var obstacleGroup;
var bg;
var score;
var gameOver;

function preload() {
  monkey_moving = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  mon_collided = loadImage("Monkey_08.png");

  banana_img = loadImage("banana.png");

  stone_img = loadImage("stone.png");

  bg = loadImage("jungle.jpg");

  gameOver = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 400);

  back = createSprite(300, 125);
  back.addImage(bg);
  back.velocityX = -4;
  back.scale = 1.3;
  back.x = back.width / 2;

  monkey = createSprite(100, 330);
  //monkey.debug = true;
  monkey.addAnimation("monkey", monkey_moving);
  monkey.addImage("collided", mon_collided);
  monkey.scale = 0.1;

  ground = createSprite(300, 340, 600, 10);
  ground.visible = false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  over = createSprite(300, 200);
  over.addImage(gameOver);

  gameState = 1;
  PLAY = 1;
  END = 0;

  score = 0;

  food = 0;
}

function draw() {
  background("white");

  drawSprites();

  //coliding the monkey
  monkey.collide(ground);

  //displaying survival time
  stroke("red");
  textSize(20);
  fill("black");
  textFont("Georgia");
  text("Survival Time: " + score, 430, 20);

  //bananas eaten
  stroke("red");
  textSize(20);
  fill("black");
  textFont("Georgia");
  text("Bananas eaten: " + food, 20, 20);

  if (gameState === PLAY) {

    score = score + Math.ceil(getFrameRate() / 150);

    //jumping
    if (keyDown("space") && monkey.y > 270) {
      monkey.velocityY = -12;
    }

    //gravity
    monkey.velocityY = monkey.velocityY + 0.5;

    over.visible = false;

    //background
    if (back.x < 300) {
      back.x = back.width / 2;
    }

    //calling 
    fruit();
    obstacle();

    if (bananaGroup.isTouching(monkey)) {
      food = food + 1;
      bananaGroup.destroyEach();


      switch (score) {
        case 200:
          monkey.scale = 0.12;
          break;

        case 400:
          monkey.scale = 0.14;
          break;

        case 600:
          monkey.scale = 0.16;
          break;

        case 800:
          monkey.scale = 0.12;
          break;

        default:
          break;
      }
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if (gameState === END) {
    reset();
  }

}

function fruit() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400, random(120, 200));
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 100;

    bananaGroup.add(banana);
  }
}

function obstacle() {
  if (World.frameCount % 200 === 0) {
    var rock = createSprite(400, 320);
    rock.addImage(stone_img);
    rock.velocityX = -4;
    rock.scale = 0.2;
    rock.lifetime = 100;

    obstacleGroup.add(rock);
  }
}

function reset() {
  monkey.changeAnimation("collided", mon_collided);
  monkey.scale = 0.1;
  ground.velocityX = 0;
  monkey.velocityY = 0;
  back.velocityX = 0;
  bananaGroup.setVelocityEach(0, 0);
  obstacleGroup.setVelocityEach(0, 0);
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  over.visible = true;
  //score=    ;
}