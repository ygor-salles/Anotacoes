from flask import Blueprint, current_app, request
from .model import Book
from .serializer import BookSchema

bp_books = Blueprint('books', __name__)

@bp_books.route('/exibir', methods=['GET'])
def exibir():
    bs = BookSchema(many=True)
    result = Book.query.all()
    return bs.jsonify(result), 200

@bp_books.route('/cadastrar', methods=['POST'])
def cadastrar():
    bs = BookSchema()
    book, error = bs.load(request.json)
    current_app.db.session.add(book)
    current_app.db.session.commit() 
    return bs.jsonify(book), 201

@bp_books.route('/deletar', methods=['DELETE'])
def deletar():
    ...

@bp_books.route('/alterar', methods=['PUT'])
def alterar(): 
    ...