// some imports
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);
const { getUserInfo } = require("@replit/repl-auth")

// uses static site from /public
app.use(express.static("public"));

let number;
let timesUpdated = 0
let user = []
let pixels = []

// testing variabels
let curx, cury; 
let width = 250;
let height = 

// Class to create the pixel
class pixel {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
  }

  update() {
    io.emit("draw", this.x, this.y, color)
  }
}


function pixelDataToJSON() {
  for (i = 0; i < 250*250; i++)
}

for(let y=0; y<250; y++){
  for(let y=0; y<250; y++){
    const px = new pixel(curx, cury, [255, 20, 205])
    pixels.push(px)
    // console.log(pixels)
    
    curx += 1
  }
  cury += 1
}



setInterval(()=>{
  console.log(user)
}, 1000)

// when user connects
io.on("connect", function(socket) {
  let username = socket.handshake.headers["x-replit-user-name"]
  // serves name to client
  socket.emit("changeName", username)
  // if user already joined
  if (user.includes(username)) {
    // quits connection
    socket.disconnect();
    console.log('User @'+username+' already joined');
  }
  else {
    console.log(username)
    user.push(username)
  
    // event when diconnecting
    socket.on("disconnect", function() {
      console.log('disconnected: @'+username);
      const index = user.indexOf(username);
  
      // removes user from list
      if (index > -1) {
        user.splice(index, 1); 
      }
      
    })
  }
})


server.listen(port, function() {
  console.clear()
  console.log("🟢 " + port);
});