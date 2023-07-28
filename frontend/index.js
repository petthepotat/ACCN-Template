



// wait for page to fully load
document.addEventListener("DOMContentLoaded", function() {
    // get all anchor elements with class "user"
    const userChannels = document.querySelectorAll(".user");
    const chatContainer = document.querySelector("#chat-html-container");
    // console.log(chatContainer);
    // attach click evenst to each anchor element
    userChannels.forEach(channel => {
        channel.addEventListener("click", function(event) {
            event.preventDefault();
            chatContainer.appendChild(createSampleMessage());

            // // here we can ping the server
            // fetch("http://127.0.0.1:5000/post", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         'value': 'Hello World'
            //     }),
            // }).then(response => {
            //     console.log(response);
            //     if (!response.ok) {
            //         throw new Error("Network response was not ok");
            //     }
            //     console.log("Sent");
            // })
            // .catch(error => console.error("Error:", error));
            
            // Here we can ping the server
            fetch("http://127.0.0.1:5000/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                'value': 'Hello World'
                }),
            })
            .then(response => {
                if (response.ok) {
                console.log("Data sent successfully.");
                } else {
                throw new Error("Network response was not ok. Status: " + response.status);
                }
            })
            .catch(error => console.error("Error:", error.message));


            // $.post("https://127.0.0.1:5000/post", {
            //     "body": JSON.stringify({
            //         "value": "Hello World"
            //     })
            // })
        });
    });
})

function createSampleMessage(text = "Added by clicking something") {
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
    divText.textContent = text;
    newDiv.appendChild(divText);

    return newDiv;
}

