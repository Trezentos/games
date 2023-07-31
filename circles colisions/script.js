/** @type {HTMLCanvasElement} */  

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;
let gameFrame = 0;
let isDragging = false;
let startX;
let startY;
let selectedColorCircle;

const circles = [
    { x: 350, y: 150, radius: 75, color: 'deepskyblue', colisionColor: 'gray' },
    { x: 280, y: 390, radius: 50, color: 'crimson', colisionColor: 'gray' },
]

function isMouseInShape (xClick, yClick, circle) {
    if(xClick > circle.x - circle.radius && xClick < circle.x + circle.radius && 
       yClick > circle.y - circle.radius && yClick < circle.y + circle.radius) {
        
        selectedColorCircle = circle.color;
        
        return true
       
    } 

    return false;
}

function mouseDown(e) {
    e.preventDefault();

    let startX = parseInt(e.clientX);
    let startY = parseInt(e.clientY);
    

    circles.forEach((circle, index) => {
        isMouseInShape(e.offsetX, e.offsetY, circle)
        isDragging = true;
        return; 
    })

}
canvas.onmousedown = mouseDown;

function mouseUp(e){
    if (!isDragging){
        return;
    }
    e.preventDefault();
    isDragging = false;
}
canvas.onmouseup = mouseUp;

function mouseOut(e){
    if (!isDragging) {
        return;
    }

    e.preventDefault();
    isDragging = false;
}

function mouseMove(e) {
    if (!isDragging) {
        return;
    } else {
        e.preventDefault();
        let mouseX = parseInt(e.clientX)
        let mouseY = parseInt(e.clientY)

        let dx = mouseX - startX;
        let dy = mouseY - startY;

        let current_circle = circles.find(circle => circle.color === selectedColorCircle)

        if (!current_circle) return;

        current_circle.x += dx
        current_circle.y += dy

        startX = mouseX;
        startY = mouseY;

        animate();
    }
}
canvas.onmousemove = mouseMove;

function drawTriangleBetween(circle1, circle2){

    ctx.beginPath();
    ctx.moveTo(circle1.x, circle1.y)
    ctx.lineTo(circle1.x, circle2.y)

    ctx.moveTo(circle2.x, circle2.y)
    ctx.lineTo(circle1.x, circle2.y)

    ctx.moveTo(circle1.x, circle1.y)
    ctx.lineTo(circle2.x, circle2.y)

    ctx.font = "17px Arial";
    ctx.fillStyle = 'purple'
    
    const a = Math.abs((circle1.x - circle2.x))
    const b = Math.abs((circle1.y - circle2.y))

    ctx.fillText(a, (circle1.x + circle2.x)/2, circle2.y);
    ctx.fillText(b, circle1.x, (circle1.y + circle2.y)/2);

    const hipotenusa = Math.sqrt(a * a + b * b).toFixed(0);

    ctx.fillText(hipotenusa, (circle1.x + circle2.x)/2, (circle1.y + circle2.y)/2);

    ctx.stroke();


}

function colisionDetection(circle1, circle2){
    const a = Math.abs((circle1.x - circle2.x))
    const b = Math.abs((circle1.y - circle2.y))

    ctx.fillText(a, (circle1.x + circle2.x)/2, circle2.y);
    ctx.fillText(b, circle1.x, (circle1.y + circle2.y)/2);

    const hipotenusa = Math.sqrt(a * a + b * b).toFixed(0);
    const totalRadius = circle1.radius + circle2.radius;

    if (totalRadius >= hipotenusa){
        
       return true;

    } else {
        return false;
    }
    

}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);


        if (colisionDetection(circles[0], circles[1])){
            ctx.fillStyle = 'gray';
        } else {
            ctx.fillStyle = circle.color;
        }


        ctx.fill();
        ctx.stroke();
    })

    drawTriangleBetween(circles[0], circles[1])

    requestAnimationFrame(animate);
}

animate();