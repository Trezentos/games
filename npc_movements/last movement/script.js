/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 250;
const CANVAS_HEIGTH = canvas.height = 500;
const enemiesNumber = 10;
let gameFrame = 0;


class Enemy {
    constructor(speed = 1){
        this.image = new Image();
        this.image.src = 'bat_sprites/spinner.png';
        this.speed = Math.random() * 4;
        this.spriteWidth = 213;
        this.spriteHeight = 212;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteWidth / 4;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);

        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1); 
        this.interval = Math.floor(Math.random() * 50 + 100);


    }

    update(){
        if (gameFrame % 120 === this.interval) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }

        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        this.x -= dx/80;
        this.y -= dy/80;

        if (this.x + this.width < 0) this.x = canvas.width;

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