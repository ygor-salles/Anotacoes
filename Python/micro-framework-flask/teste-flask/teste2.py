from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.debug = True
db = SQLAlchemy(app)

class Books(db.Model):
    __tablename__ = 'books'
    title = db.Column(db.String(100), primary_key=True)
    text = db.Column(db.String(), nullable=False)
    likes = db.Column(db.String(100), nullable=False, default=0)

    def __init__(self, title, text, likes) :
        self.title = title
        self.text = text
        self.likes = likes

@app.route('/test', methods=['GET'])
def test():
    return {'test': 'test1'}

@app.route('/books', methods=['GET'])
def getBooks():
    allBooks = Books.query.all()
    output = []
    for book in allBooks:
        currBook = {}
        currBook['title'] = book.title
        currBook['text'] = book.text
        currBook['likes'] = book.likes
        output.append(currBook)
    return jsonify(output)

app.run()