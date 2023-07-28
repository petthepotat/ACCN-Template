import flask
from flask import Flask, request, jsonify

import json


# This website is a Discord Clone
app = Flask("ACCN Discord Template")

@app.route('/', methods=["GET", "POST"])
def home():
    print("Input Received")
    return "Hello, world!"


@app.route('/post', methods=["POST"])
def request():
    try:
        data = request.get_json()
        print(data)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(e)


app.run(port=5000, debug=True)


