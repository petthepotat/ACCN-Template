from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET'] = "secret123"
socketio = SocketIO(app, cors_allowed_origins="*")



@app.route('/')
def home_page():
    return render_template('index.html')

@socketio.on('connect')
def handle_message():
    print(f"Login")
    # send("Login Accepted", broadcast=False)

@socketio.on('message')
def handle_message(message):
    if message.startswith("#UC#"):
        send(f"`{message[4:]}` joined the server||", broadcast=True)
        return
    # split message
    name, msg = message.split("||")
    print(f"{name}||{msg}")
    send(f"{name}||{msg}", broadcast=True)

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)

