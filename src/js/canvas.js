const platform = '../medias/platform.png'
const hills = '../medias/hills.png'
const background = '../medias/background.png'
const platformSmallTall = '../medias/platformSmallTall.png'
const run = '../medias/run.png'
const zombie = '../medias/zombie_stand.png'
const endScreen = document.getElementById('endScreen')
const menu = document.getElementById('menu');
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
canvas.style.display = 'none'

const gravity = 1.5
let loopPlay = false;

function start() { 

  console.log('start');
  this.toggleScreen('menu', false)
  this.toggleScreen('canvas', true)
    init();
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = ( toggle ) ? 'block' : 'none';
  element.style.display = display;
}

function gameOver() {
    pushscore(100);
}

function restart() {
    endScreen.style.visibility = 'hidden';
    start();
}

function win() {
  endScreen.innerHTML = `<div class="youWin">Well done ! You overcome this motherfucker</div>`;
}

function historyGame() {

  const menu = document.getElementById('menu')
   
    menu.innerHTML = "<p> Gandalf a de grands ennuis, un vilain gobelin ou peut-être un orc lui a volé son herbe à pipe, il se hâte dans les montagnes de la Moria récupérer sa marchandise que seul un magicien aguerri peut inhaler. Va t'il y arriver? Cliques sur l'écran pour commencer l'aventure</p>"
    const message = document.querySelector('p')
    message.addEventListener('click', function ()  {
      console.log('tu click')
      canvas.style.display = 'block';
      menu.style.display = 'none';

    
    })
}

class Player {
    constructor (){
        this.speed = 10
        this.position = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 130
        this.height = 150
        this.image = createImage(run)
        this.frames = 0
        
    }

    draw() {
      c.drawImage(
        this.image,
        230 * this.frames,
        0,
        230,
        137,
        this.position.x, this.position.y,
        this.width, this.height)
    }

    update() {
        this.frames ++
        if(this.frames > 8) {
          this.frames = 0
        }
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if(this.position.y +this.height +this.velocity.y <= canvas.height)
    
        this.velocity.y += gravity   
    }
}


class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y,
            image: image
        }

        this.image = image
        this.width = image.width
        this.height = image.height 
    }

    draw() {
       c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
  constructor({ x, y, image }) {
      this.position = {
          x,
          y,
          image: image
      }

      this.image = image
      this.width = image.width
      this.height = image.height 
  }

  draw() {
     c.drawImage(this.image, this.position.x, this.position.y)
  }
}


function createImage(imageSrc) {

  const image = new Image();
  image.src = imageSrc;
  return image;
}

let animationFrame;
let player;
let platforms = []
let genericObjects = []
let scrollOffset = 0;

const keys = {
  right: {
      pressed: false
  },
  left: {
      pressed: false
  },
  up: {
    pressed: false
  }
}

function stop() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);

    cancelAnimationFrame(animationFrame);

    player = undefined;
    platforms = []
    genericObjects = []
    scrollOffset = 0;

    keys.right.pressed = false;
    keys.left.pressed = false;
    keys.up.pressed = false;
}

function onKeyDown() {
    return ({keyCode}) => {

        switch (keyCode) {
            case 81:
                console.log('left')
                keys.left.pressed = true
                break

            case 68:
                console.log('right')
                keys.right.pressed = true
                break

            case 90:
                console.log('up')
                player.velocity.y -= 20
                keys.up.pressed = true
                break

            case 83:
                console.log('down')
                break

        }
    };
}

function onKeyUp() {
    return ({keyCode}) => {

        switch (keyCode) {
            case 81:
                console.log('left')
                keys.left.pressed = false
                break

            case 68:
                console.log('right')
                keys.right.pressed = false
                break

            case 90:
                console.log('up')
                keys.up.pressed = false
                break

            case 83:
                console.log('down')
                break

        }
    };
}

function init() {

    let platformImage = createImage(platform);
    let platformSmallTallImage = createImage(platformSmallTall);
  player = new Player();

  platforms = [
    new Platform({ 
      x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
      y:270, 
      image: createImage(platformSmallTall)}),
    new Platform({ 
      x: platformImage.width * 2 + 500 - 2 + platformImage.width - platformSmallTallImage.width,
      y:270, 
      image: createImage(platformSmallTall)}),
    new Platform({ 
      x: platformImage.width * 5 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
      y:270, 
      image: createImage(platformSmallTall)}),
    new Platform({ 
      x: platformImage.width * 6 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
      y:270, 
      image: createImage(platformSmallTall)}),
    new Platform({ 
      x: platformImage.width * 8 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
      y:270, 
      image: createImage(platformSmallTall)}),
    new Platform({ 
      x: platformImage.width * 11 + 350- 2 + platformImage.width - platformSmallTallImage.width,
      y:270, 
      image: createImage(platformSmallTall)}),
    new Platform({
      x: -1, y:470, image: platformImage}), 
    new Platform({ 
      x: platformImage.width - 3, y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 2 + 375, y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 3 + 300, y:470, image: platformImage }),  
    new Platform({ 
      x: platformImage.width * 4 + 300 - 2, y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 5 + 600 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 6 + 450 , y:470, image: platformImage }), 
    new Platform({ 
      x: platformImage.width * 7 + 230 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 8 + 600 , y:470, image: platformImage }), 
    new Platform({ 
      x: platformImage.width * 9 + 690 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 10 + 890 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 11 + 990 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 12 + 660 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 13 + 1140 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 14 + 690 , y:470, image: platformImage }),
    new Platform({ 
      x: platformImage.width * 15 + 690 , y:470, image: platformImage }),
  ];

  genericObjects = [
    new GenericObject({ x:-1, y:-1, image: createImage(background)}),
    new GenericObject({ x:-1, y:-1, image: createImage(hills)})
  ]


 scrollOffset = 0;



    animate ();

    window.addEventListener('keydown', onKeyDown())
    window.addEventListener('keyup', onKeyUp())
}


function animate () {

    animationFrame = requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    genericObjects.forEach(genericObject => {
        genericObject.draw();
    })
    platforms.forEach(platform => { 
        platform.draw();
    })

    player.update();
   

    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed

    } else if ((keys.left.pressed && player.position.x > 100) 
      || (keys.left.pressed && scrollOffset === 0
      && player.position.x > 0)) {
        
      player.velocity.x = -player.speed

    } else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            scrollOffset +=5;
            platforms.forEach(platform => { 
              platform.position.x -= player.speed
            })
            genericObjects.forEach(genericObject => {
              genericObject.position.x -= player.speed * 0.66
            })
        } else if(keys.left.pressed) {
            scrollOffset -= player.speed
            platforms.forEach(platform => { 
                platform.position.x += player.speed
            })
            genericObjects.forEach(genericObject => {
              genericObject.position.x += player.speed * 0.66
            })
        }
    }
// platform colision detection
    platforms.forEach(platform => { 
        if(player.position.y + player.height <= platform.position.y && 
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.width + platform.position.x) {

            player.velocity.y = 0

            
        }
     
    })
// canvas colision detection
    if(player.position.x <= 10) {
      player.velocity.x = 0
      if(keys.right.pressed) {
        player.velocity.x = player.speed
      }if(player.position.x <= 10) {
        gameOver()
      }
    } else if(player.position.y < -30) {
      gameOver()
       
    }

// win conditions
    if(scrollOffset > 6000) {
        console.log('You win little bastard')
        win()
    }

// lose conditions
    if(player.position.y > canvas.height) {
        
      gameOver()
    }

}

