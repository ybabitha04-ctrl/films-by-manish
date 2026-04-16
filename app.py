from flask import Flask, render_template
from whitenoise import WhiteNoise

app = Flask(__name__)

# Enable static files in production
app.wsgi_app = WhiteNoise(app.wsgi_app, root="static/", prefix="static/")

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
