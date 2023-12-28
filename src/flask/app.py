from flask import Flask, jsonify, request
from flask_cors import CORS
import Smartmodel

app = Flask(__name__)
CORS(app, origins='*')  # Specify the allowed origin

@app.route("/predict", methods=["POST"])  # Change the method to POST
def predict():
    data = request.get_json()  # Retrieve the JSON data from the request
    print(data)
    predictions = Smartmodel.predict(data)
    print(predictions)
    return jsonify({"Predictions": predictions})

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, port=5050)
