const spriteWidth = 83;
const spriteHeight = 133;

const animationsStates = [
    {
        state: 'idle',
        frames: 6,
    },
    {
        state: 'walking',
        frames: 8,
    },
]

let animationsFrames = []

animationsStates.forEach((item, index)=> {
    
    let frames = {
        loc: []
    }

    for(let i=0; i<item.frames; i++){
        frames.loc.push({
            x: spriteWidth * i,
            y: spriteHeight * index,
        })

    }

    animationsFrames.push({
        [item.state]: frames,
    })
    
})

console.log(animationsFrames[1].walking)