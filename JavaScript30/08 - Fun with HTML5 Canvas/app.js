window.addEventListener('load',() => {
  
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  // ctx.beginPath();

  let painting = false;

  function startPaiting(e){
    painting = true;
    // for the dots to be drawn
    draw(e);
  }
  
  function stopPaiting(){
    painting = false;
    ctx.beginPath();
    
  }

  function draw(e){
    // exit if not painting
    if(!painting) return;
    // pen's thickness
    ctx.lineWidth = 15;
    // pen's border would be rounded
    ctx.lineCap = "round";
    // track mouse move to paint
    ctx.lineTo(e.clientX, e.clientY);
    // the actual pen's ink
    ctx.stroke();
    

    // ctx.beginPath();
    // ctx.moveTo(e.clientX, e.clientY);

  }

  canvas.addEventListener('mousedown', startPaiting);
  canvas.addEventListener('mouseup', stopPaiting);
  canvas.addEventListener('mousemove', draw);

})