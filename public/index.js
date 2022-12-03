let MyName = "";
const newtab = !document.URL.endsWith(".id.repl.co/"); 

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(153);
  
}

///////////////////////////////////////////////////////////////////////
if(newtab){
  // when user is in a new tab
  const socket = io();
  socket.on("changeName", (data)=>{
    MyName = data
  })
  socket.on("loadPixel", (data) => {
    const x = data['x'];
    const y = data['y'];
    const r = data['r'];
    const g = data['g'];
    const b = data['b'];
    for (let i = 0; i < x.length; i++) { // no my computer cant play music
      pixelX = x[i];
      pixelY = y[i];
      fill(r[i], g[i], b[i]);
      stroke(0,0)
      rect(pixelX*2 + 10, pixelY*2 + 50, 2, 2);
    }
  })
  function draw(){
    // background(0, 0, 0)
    fill(100, 255);
    textAlign(LEFT, TOP);
    textSize(25)
    text("Connected as: "+MyName, 10, 10)
  }
///////////////////////////////////////////////////////////////////////
} else {
  // when user hasnt opened a new tab
  function draw(){
    textAlign(CENTER)
    textSize(40)
    text("You have to open this", width/2, (height/2)-25)
    text("website in a new tab!", width/2, (height/2)+25)
  }
}


// hmm... grid with pixels