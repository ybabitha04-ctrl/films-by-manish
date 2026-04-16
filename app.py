from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# FIX: Serve static files manually
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(os.getcwd(), 'static'), filename)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/marriage')
def marriage():
    return render_template('marriage.html')

@app.route('/prewedding')
def prewedding():
    return render_template('prewedding.html')

@app.route('/celebrations')
def celebrations():
    return render_template('celebrations.html')

if __name__ == '__main__':
    app.run(debug=True)
