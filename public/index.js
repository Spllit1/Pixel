const socket = io()
let MyName = "";

socket.on("changeName", (data)=>{
  MyName = data
})

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(153);
  textSize(40)
  textAlign(CENTER);
  text("Loading...", width/2, height/2)
}



function draw(){
  background(0, 0, 0)
  fill(50, 255);
  textAlign(LEFT, TOP);
  textSize(25)
  text("Connected as: "+MyName, 10, 10)
}




socket.on("update", function(number) {
  
}) 
