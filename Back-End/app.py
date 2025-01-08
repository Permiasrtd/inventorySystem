from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Adjust the origin as needed

@app.route('/api/get', methods=['GET'])
def get_data():
    return jsonify({"message": "Retrieving all"})

@app.route('/api/send', methods=['POST'])
def post_data():
    data = request.json
    return jsonify({"received": data}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
