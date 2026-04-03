from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

IMAGES_DIR = os.path.join(os.path.dirname(__file__), 'images', 'pictures')


@app.route('/')
def index():
    images = sorted([
        f for f in os.listdir(IMAGES_DIR)
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
    ])
    return render_template('index.html', images=images)


@app.route('/images/pictures/<path:filename>')
def serve_image(filename):
    return send_from_directory(IMAGES_DIR, filename)


if __name__ == '__main__':
    app.run(debug=True, port=5001)
