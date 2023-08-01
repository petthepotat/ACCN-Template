# import flask
# from flask import Flask, request, jsonify

# import json


# # This website is a Discord Clone
# app = Flask("ACCN Discord Template")


# @app.route("/", methods=["GET", "POST"])
# def home():
#     print("Input Received")
#     return "Hello, world!"


# @app.route("/post", methods=["POST"])
# def _post():
#     data = request.get_json()
#     # Process the data as needed
#     print("DAD AWD AW", data)
#     return jsonify({"status": "success"})


# app.run(port=5000, debug=True)


from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET'] = "secret123"
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('connect')
def handle_message(message):
    print("Login: ", message)
    # send("Login Accepted", broadcast=False)

@socketio.on('message')
def handle_message(message):
    if message == "##UserConnected##": 
        return
    # split message
    name, msg = message.split("||")
    print(f"{name}||{msg}")
    send(f"{name}||{msg}", broadcast=True)


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
