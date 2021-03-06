// variables
let startY;

// selectors
const   speed = document.querySelector('.speed'),
        speedBar = document.querySelector('.speed-bar'),
        video = document.querySelector('.flex');

// Event Listener
speed.addEventListener('mousedown', selectBar);
speed.addEventListener('mouseup', stopBar);
// speed.addEventListener('mousemove', moveSpeed);

// functions
    // run function if mousedown
function selectBar(e){    
    this.addEventListener('mousemove', moveSpeed);
}

function moveSpeed(e){
    const   max = 4,
            min = 0.5,
            // start calculating in the speed element
            y = e.pageY - speed.offsetTop;
            // convert y into 1 to 4 to set speed
            s = y / 100
            // get percentage update speedBar's height
            per = (y/max)
    // exit if limits are exceeded
    if(s > 4 || s < 0 ) return;
    // display speed in text
    speedBar.innerHTML = `${s} x`;
    // move speedbar
    speedBar.style.height = `${per}%`
    // set the play speed
    video.playbackRate = s;    
}
    // stop function if mouseup
function stopBar(e){
    this.removeEventListener('mousemove', moveSpeed);
}





