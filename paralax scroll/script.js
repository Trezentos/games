const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'backgroundLayers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'backgroundLayers/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'backgroundLayers/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'backgroundLayers/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'backgroundLayers/layer-5.png';

const slider = document.getElementById('slider')
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change', (e)=>{
    showGameSpeed.innerHTML = gameSpeed = e.target.value;
})

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x < -this.width ) {
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed)
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

const gameObjects = [
    new Layer(backgroundLayer1, 0.2),
    new Layer(backgroundLayer2, 0.4),
    new Layer(backgroundLayer3, 0.6),
    new Layer(backgroundLayer4, 0.8),
    new Layer(backgroundLayer5, 0.1),
]

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   
    gameObjects.forEach(item => {
        item.draw();
        item.update();
    })



    requestAnimationFrame(animate);
}

animate();