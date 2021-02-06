from mongoengine import *
from mongoengine.connection import connect
from mongoengine.document import Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, FloatField, IntField, ListField, ReferenceField, StringField
from mongoengine.queryset.base import CASCADE
connect('teste')

class Produto(EmbeddedDocument):
    codigo = IntField(unique=True)
    nome = StringField()
    preco = FloatField()

class Pessoa(Document):
    email = StringField(unique=True)
    nome = StringField()
    idade = IntField()
    produto = EmbeddedDocumentField(Produto)


# INSERÇÃO -----------------------------------------------------
# prod1 = Produto(codigo=1, nome='Salgadinho', preco=0.50)
# pessoa1 = Pessoa(email='ygor@unifei.edu.br', nome='Ygor Salles', idade=24, produto=prod1)
# pessoa1.save()

# prod2 = Produto(codigo=2, nome='Bolacha', preco=2.50)
# pessoa2 = Pessoa(email='maria@gmail.com.br', nome='Maria Silva', idade=25, produto=prod2)
# pessoa2.save()

# LISTAR -----------------------------------------------------
# listaPessoa = Pessoa.objects()
# for pessoa in listaPessoa:
#     print(pessoa.email, pessoa.nome, pessoa.idade, 
#             pessoa.produto.codigo, pessoa.produto.nome, pessoa.produto.preco)

# LISTAR POR ID -----------------------------------------------------
# obj = Pessoa.objects(email='ygor@unifei.edu.br').first()
# print(obj.email, obj.nome, obj.idade, 
#         obj.produto.codigo, obj.produto.nome, obj.produto.preco)

# ATUALIZAR --------------------------------------------------------
# Pessoa.objects(email='ygor@unifei.edu.br').update(nome='Ygor Salles Aniceto')

# DELETAR -----------------------------------------------------
Pessoa.objects(email='ygor@unifei.edu.br').delete()
