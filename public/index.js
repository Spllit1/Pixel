let MyName = "";
const newtab = !document.URL.endsWith(".id.repl.co/"); 

var curr = 255;
var curg = 0;
var curb = 0;

function changecol(r, g, b){
  curr = Number(r) //Brag-umber
  curg = Number(g) //Brag-umber
  curb = Number(b) //Brag-umber
}


// in theorie its working
let pixelSize = 10;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(153);
  stroke(0,0)  
}

///////////////////////////////////////////////////////////////////////
if(newtab){
  // when user is in a new tab
  const socket = io();
  socket.on("changeName", (data)=>{
    MyName = data
  })
  socket.on("setPixel", (data)=>{
    console.log(data);
    fill(data['r'], data['g'], data['b']);
    rect(data['x']*pixelSize + 10, data['y']*pixelSize + 50, pixelSize, pixelSize);
  })
  socket.on("loadPixel", (data) => {
    const x = data['x'];
    const y = data['y'];
    const r = data['r'];
    const g = data['g'];
    const b = data['b'];
    for (let i = 0; i < x.length; i++) { // no my computer cant play music
      let pixelX = x[i];
      let pixelY = y[i];
      fill(r[i], g[i], b[i]);
      rect(pixelX*pixelSize + 10, pixelY*pixelSize + 50, pixelSize, pixelSize);
    }

    // hitbox
  })
  function mouseClicked() {
    let pixelX = Math.floor((mouseX - 10) / pixelSize);
    let pixelY = Math.floor((mouseY - 50) / pixelSize);
      socket.emit("setPixel", {
        "x": pixelX,
        "y": pixelY,
        "r": curr,
        "g": curg,
        "b": curb,
      })
    }
  function draw(){
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