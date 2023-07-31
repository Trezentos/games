let selectedValue = document.getElementById('animations');
const canvas = document.getElementById('mortal-kombat')
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 90;
const CANVAS_HEIGHT = canvas.height = 150;

const playerImage = new Image();
playerImage.src = '/sprites/subzero.png'


const spriteWidth = 83;
const spriteHeight = 133;

let gameFrame = 0;
const staggerFrames = 12;

const spriteSubzeroAnimations = [];
const animationsStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'walking',
        frames: 8,
    },
]

animationsStates.forEach((item, index) => {
    let frames = {
        loc: []
    }
    
    for(let j=0; j<item.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY })
    }

    spriteSubzeroAnimations[item.name] = frames
})

console.log('spriteSubzeroAnimations: ', spriteSubzeroAnimations)

function animate() {
    let playerState = selectedValue.value;
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position = Math.floor(gameFrame / staggerFrames) % spriteSubzeroAnimations[playerState].
    loc.length;

    
    let frameX = spriteWidth * position;
    let frameY = spriteSubzeroAnimations[playerState].loc[position].y
    
    ctx.drawImage(playerImage, frameX, frameY,
    spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();