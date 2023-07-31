

// wait for page to fully load
document.addEventListener("DOMContentLoaded", function() {
    // get all anchor elements with class "user"
    const userChannels = document.querySelectorAll(".user");
    const chatContainer = document.querySelector("#chat-html-container");
    var canMessage = false;

    const socket = io.connect("http://localhost:5000");
    socket.on('connect', function() {
        socket.send("##UserConnected##");
    });
    
    socket.on('message', function(data) {        // data = 2 parts
        // username||message
        var _sdata = data.split("||");
        var username = _sdata[0];
        var message = _sdata[1];
        chatContainer.appendChild(createMessage(username, message));
    });
    
    // setup ajax enter button thing
    $("#chat-form-input").keyup(function(event) {
        if(event.keyCode === 13) {
            // store value of input into variable
            var input = $("#chat-form-input").val();
            // clear input
            $("#chat-form-input").val("");
            // send data to server
            socket.send(input);
        }
    });

    // console.log(userChannels);
    // attach click evenst to each anchor element
    userChannels.forEach(channel => {
        if (channel.className == "user") {
            channel.addEventListener("click", function(event) {
                event.preventDefault();
                var username = channel.getElementsByTagName("div")[1].textContent.split("\n")[1].trim();
                // chatContainer.appendChild(createMessage(username, "this is text"));
                socket.send("User clicked on " + username);
            });
        };
    });
})

function createMessage(userName, text = "Added by clicking something") {
    // console.log("clicked");
    const newDiv = document.createElement("div");
    newDiv.classList.add("chat-message");
    
    // add text + image to div
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("user-icon");
    const userIcon = document.createElement("img");
    userIcon.src = "assets/user.png";
    iconDiv.appendChild(userIcon);
    newDiv.appendChild(iconDiv);

    const divText = document.createElement("div");
    divText.classList.add("chat-content");
    divText.textContent = userName + ": " + text;
    newDiv.appendChild(divText);

    return newDiv;
}

function sendData(socket, data){
    socket.send(data);
}


