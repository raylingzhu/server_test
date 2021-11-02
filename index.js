const WebSocket = require("ws");
const por = process.env.PORT || 8082 
const wss = new WebSocket.Server({port:por});


var users = 0;
recievedchat = ' ';
let i;
var usersids =  {};
console.log("server on");

wss.on("connection", ws =>{
    user_id = users;
    usersids[user_id] = ws;
    ws.send(user_id);
    users = users + 1;
    console.log("User " + user_id + " connected on server1");

    ws.on("message", data => {
        console.log(`Server recieved: ${data}`);
        recievedchat = ""+ data +"";
        if (recievedchat[0] == "t"){
            for( i in usersids){
                let socket = usersids[i];
                socket.send(recievedchat);
            }
        }
        else if (recievedchat[0] == "i"){
            //Object.defineProperty(o, new_key,
            //Object.getOwnPropertyDescriptor(o, old_key));
            //delete o[old_key];
        }
        
    })
    
    ws.on("close", () =>{
        users = users - 1;
        console.log("disconnected from server1");    
    });  
});
