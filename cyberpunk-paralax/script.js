const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 344;
const CANVAS_HEIGHT = canvas.height = 272;

const background1 = new Image()
background1.src = 'images/foreground.png'
const background2 = new Image()
background2.src = 'images/middle.png'
const background3 = new Image()
background3.src = 'images/back.png'

let gameSpeed = 1;

let x = 0;
let x2 = 688;

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 688;
        this.height = 272;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * speedModifier;
        this.image = image;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;

        if (this.x < -688) {
            this.x = 0;
        }

        // this.x = Math.floor(this.x - this.speed);   
        this.x = this.x - this.speed;   
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layers = [
    new Layer(background3, 0.5),
    new Layer(background2, 0.4),
    new Layer(background1, 0.3),
]

const slider = document.getElementById('slider')
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change', (e)=>{
    showGameSpeed.innerHTML = gameSpeed = e.target.value ;
    console.log(gameSpeed)
})

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    layers.forEach(item=>{
        item.update();
        item.draw();
    })

    requestAnimationFrame(animate);
}

animate();