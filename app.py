from flask import Flask, render_template

app = Flask(__name__)

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
