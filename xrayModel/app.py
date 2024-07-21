from flask import Flask, request, jsonify
from flask_cors import CORS


# DenseNet 
# Multilayer / MultiLevel

from keras.models import load_model
from keras.applications.densenet import preprocess_input as preprocess_input_densenet
import numpy as np
import cv2
import os

from focal_loss import BinaryFocalLoss

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the Keras models
model_bone_type = load_model('model_CAT.h5')
model_fracture = load_model('MURA-DenseNet-v1.7-Humerus.h5')

bone_class_labels = ['XR_ELBOW', 'XR_FINGER', 'XR_FOREARM', 'XR_HAND', 'XR_HUMERUS', 'XR_SHOULDER', 'XR_WRIST']

def load_and_preprocess_image(image_path, target_size=(256, 256), model_type='default'):
    image = cv2.imread(image_path)
    image = cv2.resize(image, target_size)
    if model_type == 'densenet':
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert to RGB for DenseNet
        image = preprocess_input_densenet(image)  # Preprocess for DenseNet model
    else:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert to RGB for other models
        image = image.astype('float32') / 255.0  # Normalize for other models
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        # Save the uploaded image temporarily
        image_path = './uploaded_image.png'
        file.save(image_path)

        # Load and preprocess the image for bone type prediction
        image_bone_type = load_and_preprocess_image(image_path, target_size=(256, 256), model_type='default')
        bone_type_prediction = model_bone_type.predict(image_bone_type)
        predicted_bone_class = np.argmax(bone_type_prediction, axis=1)

        # Load and preprocess the image for fracture prediction
        image_fracture = load_and_preprocess_image(image_path, target_size=(224, 224), model_type='densenet')
        fracture_prediction = model_fracture.predict(image_fracture)
        prediction_label = 'positive' if fracture_prediction > 0.5 else 'negative'

        # Clean up temporary image file
        os.remove(image_path)

        # Return the predicted bone type and fracture label
        return jsonify({
            'bone_type': bone_class_labels[predicted_bone_class[0]],
            'fracture_prediction': prediction_label
        })

    except Exception as e:
        error_msg = f'Error predicting image: {str(e)}'
        print(error_msg)
        return jsonify({'error': error_msg}), 500

if __name__ == '__main__':
    app.run(debug=True)
