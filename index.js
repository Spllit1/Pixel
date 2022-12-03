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
const width = 250;
const height = 250;

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
  let jsonData = {
    'x':[], 
    'y':[], 
    'r':[],
    'g':[],
    'b':[]
  };
  for (i = 0; i < width*height; i++) {
    jsonData['x'].push(pixels[i].x);
    jsonData['y'].push(pixels[i].y);
    jsonData['r'].push(pixels[i].color[0]);
    jsonData['g'].push(pixels[i].color[1]);
    jsonData['b'].push(pixels[i].color[2]);
  }
  return jsonData;
}

for(let x=0; x<width; x++){
  for(let y=0; y<height; y++){
    const px = new pixel(x, y, [125, 124, 122]);
    pixels.push(px);
  }
}

// when user connects
io.on("connect", function(socket) {
  let username = socket.handshake.headers["x-replit-user-name"]
  // if user already joined
  if (user.includes(username)) {
    // quits connection
    socket.disconnect();
    console.log('\x1b[1m\x1b[33mUser @'+username+' already joined\x1b[0m');
  }
  else {
    // serves name to client
    socket.emit("changeName", username);
    socket.emit("loadPixel", pixelDataToJSON());
    user.push(username);
    console.log("\x1b[1m\x1b[32mjoined: @"+username+" \x1b[40mRemaining: "+user.length+"\x1b[0m");
    // event when diconnecting
    socket.on("disconnect", function() {
      // removes user from list
      const index = user.indexOf(username);
      if (index > -1) {
        user.splice(index, 1); 
      }
      console.log('\x1b[1m\x1b[31mdisconnected: @'+username+" \x1b[40mRemaining: "+user.length+"\x1b[0m");
  
      
    })
    socket.on("setPixel", (data) => {
      if (0 < data['x'] && data['x'] < width && 0 < data['y'] && data['y'] < height) {
        let index = data['x'] * 250 + data['y'];
        pixels[index].color = [data['r'], data['g'], data['b']];
        io.emit("setPixel", data);
      }
    })
  }
})


server.listen(port, function() {
  console.clear()
  console.log("🟢 " + port);
});