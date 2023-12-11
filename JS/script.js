//REGN
function makeItRain() {
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.hidden = false
  
  if(canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    
    
    var init = [];
    var maxParts = 1000;
    for(var a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * w,
        y: Math.random() * h,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10
      })
    }
    
    var particles = [];
    for(var b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }
    
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for(var c = 0; c < particles.length; c++) {
        var p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      }
      move();
    }
    
    function move() {
      for(var b = 0; b < particles.length; b++) {
        var p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if(p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      }
    }
    
    
}
setInterval(draw, 30);
}

//SNE
 function makeItSnow(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  canvas.hidden = false
  
  var mp = 50; 
  var particles = [];
  for(var i = 0; i < mp; i++)
  {
    particles.push({
      x: Math.random()*W, 
      y: Math.random()*H, 
      r: Math.random()*4+1, 
      d: Math.random()*mp 
    })
  }
  
  function draw()
  {
    ctx.clearRect(0, 0, W, H);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();
  }
  
  
  var angle = 0;
  function update()
  {
    angle += 0.01;
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i]

      p.y += Math.cos(angle+p.d) + 1 + p.r/2;
      p.x += Math.sin(angle) * 2;
      
      if(p.x > W+5 || p.x < -5 || p.y > H)
      {
        if(i%3 > 0) 
        {
          particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
        }
        else
        {
          if(Math.sin(angle) > 0)
          {
            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
          }
          else
          {
            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
          }
        }
      }
    }
  }
  setInterval(draw, 33);
}


//LYN
function render() { 
  
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.hidden = false
  var ctx = canvas.getContext("2d");

  var center = {x: window.innerWidth / 2, y: 20};
  var minSegmentHeight = 5;
  var groundHeight = window.innerHeight - 20;
  var color = "hsl(180, 80%, 80%)";
  var roughness = 2;
  var maxDifference = window.innerHeight / 5;

  ctx.globalCompositeOperation = "lighter";

  ctx.strokeStyle = color;
  ctx.shadowColor = color;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "hsla(0, 0%, 10%, 0.2)";

  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowBlur = 15;
  function createLightning() {
    var segmentHeight = groundHeight - center.y;
    var lightning = [];
    lightning.push({x: center.x, y: center.y});
    lightning.push({x: Math.random() * (window.innerHeight - 200) + 50, y: groundHeight + (Math.random() - 0.9) * 50});
    var currDiff = maxDifference;
    while (segmentHeight > minSegmentHeight) {
      var newSegments = [];
      for (var i = 0; i < lightning.length - 1; i++) {
        var start = lightning[i];
        var end = lightning[i + 1];
        var midX = (start.x + end.x) / 2;
        var newX = midX + (Math.random() * 2 - 1) * currDiff;
        newSegments.push(start, {x: newX, y: (start.y + end.y) / 2});
      }
      
      newSegments.push(lightning.pop());
      lightning = newSegments;
      
      currDiff /= roughness;
      segmentHeight /= 2;
    }
    return lightning;
  }
  var lightning = createLightning();
  ctx.beginPath();
  for (var i = 0; i < lightning.length; i++) {
    ctx.lineTo(lightning[i].x, lightning[i].y);
  }

  ctx.stroke();
  requestAnimationFrame(render);
}

//SKYER
//*window.requestAnimFrame=function (){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

/* Basic Setup 
var bg = document.createElement( 'canvas' ),
    mg = document.createElement( 'canvas' ),
    fg = document.createElement( 'canvas' ),
    ctxbg = bg.getContext( '2d' ),
    ctxmg = mg.getContext( '2d' ),
    ctxfg = fg.getContext( '2d' ),
    cw = bg.width = mg.width = fg.width = 500,
    ch = bg.height = mg.height = fg.height = 300;
    
 Background Gradient 
gradient = ctxbg.createRadialGradient( 100, 75, 1, 100, 75, cw );
gradient.addColorStop(0, '#fad797');
gradient.addColorStop(0.1, '#ebb44f');
gradient.addColorStop(0.3, '#9b4b34');
gradient.addColorStop(0.5, '#4e2835');
gradient.addColorStop(0.6, '#361e36');
gradient.addColorStop(0.9, '#271a36');
gradient.addColorStop(1, '#0b0a22');
ctxbg.fillStyle = gradient;
ctxbg.fillRect( 0, 0, cw, ch );

/* Noise 
for( var x = 0; x < cw; x++ ){
  for( var y = 0; y < ch; y++ ){
    ctxbg.fillStyle = 'hsla(0, 0%, ' + Math.random() * 100 + '%, ' + Math.random() / 40 + ')';
    ctxbg.fillRect(x, y, 1, 1);
  }
}

function loop(){
  requestAnimationFrame( loop );
  
  ctxmg.globalCompositeOperation = 'destination-out';
  ctxmg.fillStyle = 'rgba(0, 0, 0, .1)';
  ctxmg.fillRect( 0, 0, cw, ch );
  ctxmg.globalCompositeOperation = 'lighter';
  
  /* Sun 
  ctxmg.beginPath();
  ctxmg.arc( 100 + Math.random() * 2, 75 + Math.random() * 2, 50 + Math.random() * 10, 0, Math.PI * 2);
  ctxmg.fillStyle = 'rgba(255, 249, 21, 0.8)';
  ctxmg.fill();
}

loop();

/* Append Canvases 
document.body.appendChild( bg );
document.body.appendChild( mg );
document.body.appendChild( fg );
*/






    
  