from flask import Flask
from flask_migrate import Migrate
from .model import configure as config_db
from .serializer import configure as config_ma

def create_app():
    # App Flask
    app = Flask(__name__)
    
    # SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:123456@localhost:5432/book'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Banco 
    config_db(app)
    
    # Serializer
    config_ma(app)
    
    # Migração
    Migrate(app, app.db)
    
    from .books import bp_books
    app.register_blueprint(bp_books)
    return app 