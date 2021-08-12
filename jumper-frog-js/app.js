// Selectors
const myCanvas = document.getElementById('myCanvas'),
      ctx = myCanvas.getContext('2d');

// Variables
let xFrogStart = 130, xFrog = 126, yFrog = 128, frogSize = 16, xJump = 28, yJump = 14, slowLaneCarDistance = 20; carWidth = 30, carHeight = 15;
const speed = getSpeed();
let keys = [];
const gap = 42;

// Functions

function getSpeed(min = 1, max = 10) {
    return Math.random() * (max - min) + min;
  }
  
  function roadLanes(){
      
    let lineEnds = 5;
    ctx.beginPath();
    for(let i = 1; i < 9; i++){
        ctx.moveTo(lineEnds, 40);    
        ctx.lineTo(lineEnds += 30, 40);        
        lineEnds += 30
    }
                              
    ctx.lineWidth = 0.2;    
    ctx.closePath();
    ctx.strokeStyle = "gray";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 19);    
    ctx.lineTo(myCanvas.width, 19);

    ctx.moveTo(0, 60);    
    ctx.lineTo(myCanvas.width, 60);

    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.stroke();


}

function drawFrogImage(x = 127, y = 129){        
    base_image = new Image();    
    base_image.src = 'img/frog.svg';    
    base_image.onload = function(){
        ctx.drawImage(base_image, x, y, frogSize, frogSize);
    }        
}

function moveFrog(e){
    // store any key pressed
    keys[e.keyCode] = true;    
    // Left - canvas limit
    if(keys[37] && xFrog > 14){
        // left frog's jump length
        xFrog -= xJump;
    }
    // right - canvas limit
    if(keys[39] && xFrog < 266){
        // right frog's jump length
        xFrog += xJump;
    }
    // down - canvas limit
    if(keys[38]){
        // down frog's jump length
        yFrog -= yJump;
    }
    // up - canvas limit
    if(keys[40] && yFrog < xFrogStart ){
        // up frog's jump length
        yFrog += yJump;
    }    
    // clear canvas
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    // draw frog on new position
    drawFrogImage(xFrog, yFrog);
    // check if you won
    didYouWin(yFrog);
    
    console.log({xFrog, yFrog});

    e.preventDefault();       
}

function releasedKey(e){
    // mark keys that were released
    keys[e.keyCode] = false;
}

class Car {
    constructor(x, y, color, speed){
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
    }

    drawRight(){
        //clear car previus position
        ctx.clearRect(this.x - 1, this.y, carWidth, carHeight);
        // reset car
        if(this.x > 300 ){
            this.x = 0;
        }    
        // draw car
        ctx.beginPath();
        ctx.fillStyle = this.color;    
        // move car position
        this.x += this.speed;     
        ctx.fillRect(this.x, this.y, carWidth, carHeight);    
        ctx.closePath();
        // check for collisions
        this.collision();
    }

    drawLeft(){
        //clear car previus position
        ctx.clearRect(this.x + 1, this.y, carWidth, carHeight);
        // reset car
        if(this.x < -30 ){
            this.x = 300;
        }    
        // draw car
        ctx.beginPath();
        ctx.fillStyle = this.color;    
        // move car position
        this.x -= this.speed;     
        ctx.fillRect(this.x, this.y, carWidth, carHeight);    
        ctx.closePath();
        // check for collisions        
        this.collision();
    }
       
    collision(){
        if( this.x < xFrog + frogSize &&
            this.x + carWidth > xFrog &&
            this.y < yFrog + frogSize &&
            this.y + carHeight > yFrog
            ){
              notification('Frog is dead');
        }
    }    
}

const blueCar = new Car(300,94, "blue", 3);
const redCar = new Car(0,114, "red", 1);


function slowLaneLeft(cars, y, speed){
    let activeCars = [];
    for(let i = 0; i < cars; i++ ){
        activeCars.push(new Car(slowLaneCarDistance += 80, y, "blue", speed));
    }
    return activeCars;
}

function slowLaneRight(cars, y, speed){
    let activeCars = [];
    for(let i = 0; i < cars; i++ ){
        activeCars.push(new Car(slowLaneCarDistance -= 80, y, "red", speed));
    }
    return activeCars;
}

// check if you won
function didYouWin(yFrog){   
    if(yFrog < 5){
        notification('YOU WIN');
    }
}

function notification(message){
    const playAgain = alert(`${message}`)
    // reload game
    location.reload();    
}

function draw(firstLane, secondLane){
    // ctx.clearRect(xCar, yCar, carWidth, carHeight);
        
    // redCar.drawRight();
    // blueCar.drawLeft();
    
    firstLane.forEach( car => car.drawLeft());
    secondLane.forEach( car => car.drawRight());
    roadLanes()    
                  
}

function animate(firstLane, secondLane){    
    // creates the animation loop    
    requestAnimationFrame(() => animate(firstLane, secondLane)); 
    
    draw(firstLane, secondLane);    
}

let gameOn = false;

function startGame(){
    // Trigers Event lister
    window.addEventListener('keydown', moveFrog);
    window.addEventListener('keyup', releasedKey); 
    
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    // Reset Frog
    xFrog = 126, yFrog = xFrogStart;      
    drawFrogImage();
    
    const firstLane = slowLaneLeft(2, 42, 0.5);
    const secondLane = slowLaneRight(4, 21, 0.5);

        
    // Conditional prevents cars from increasing speed when clickling on startGame constantly.
    if(gameOn === false){
        animate(firstLane, secondLane);
        gameOn = true;
    }            
}

// draw street 
roadLanes(gap); 







