/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 250;
const CANVAS_HEIGTH = canvas.height = 500;
const enemiesNumber = 100;
let gameFrame = 0;


class Enemy {
    constructor(speed = 1){
        this.image = new Image();
        this.image.src = 'bat_sprites/enemy_ghost_1.png';
        // this.speed = Math.random() * 1.5 - 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteWidth / 4;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1); 

        this.angle = 0;
        this.angleSpeed = Math.random() * 0.5;
        this.curve = Math.random() * 20 + 100;
    }

    update(){
        this.x = canvas.width/2 * Math.cos(this.angle * Math.PI/  90) + (canvas.width/2 - this.width/2);
        this.y = canvas.height/2 * Math.sin(this.angle * Math.PI/ 270) + (canvas.height/2 - this.height/2);
        this.angle += this.angleSpeed;
        
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw(){
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth , this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

let enemies = []

for(let i=0; i<enemiesNumber; i++){
    enemies.push(new Enemy(0.2));
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    
    enemies.forEach(enemy=> {
        enemy.update();
        enemy.draw();
    })

    requestAnimationFrame(animate);
    gameFrame++;
}

animate();