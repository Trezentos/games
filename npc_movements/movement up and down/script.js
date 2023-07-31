/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 250;
const CANVAS_HEIGTH = canvas.height = 500;
const enemiesNumber = 20;
let gameFrame = 0;


class Enemy {
    constructor(speed = 1){
        this.image = new Image();
        this.image.src = 'bat_sprites/enemy_bat_3.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 3.5;
        this.height = this.spriteWidth / 5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 2);

        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 0.05;
        this.curve = Math.random() * 4;
    }

    update(){
        this.x-= Math.random() * this.speed;
        if (this.width + this.x < 0) this.x = canvas.width;

        this.y+= this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;


        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw(){
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, 
        this.spriteHeight, this.x, this.y, this.width, this.height)
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