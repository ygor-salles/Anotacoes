from mongoengine import *
from mongoengine.connection import connect
from mongoengine.document import Document
from mongoengine.errors import DoesNotExist
from mongoengine.fields import FloatField, IntField, ReferenceField, StringField
connect('teste')

class Produto(Document):
    codigo = IntField()
    nome = StringField()
    preco = FloatField()

class Pessoa(Document):
    email = StringField()
    nome = StringField()
    idade = IntField()
    produto = ReferenceField(Produto)


# INSERÇÃO -----------------------------------------------------
# prod1 = Produto(codigo=1, nome='Salgadinho', preco=0.50)
# prod1.save()

# pessoa1 = Pessoa(email='ygor@unifei.edu.br', nome='Ygor Salles', idade=24, produto=prod1)
# pessoa1.save()

# LISTAR -----------------------------------------------------
listaPessoa = Pessoa.objects()
try:
    for pessoa in listaPessoa:
        print(pessoa.email, pessoa.nome, pessoa.idade, 
            pessoa.produto.codigo, pessoa.produto.nome, pessoa.produto.preco)
except DoesNotExist:
    for pessoa in listaPessoa:
        print(pessoa.email, pessoa.nome, pessoa.idade, 'SEM PRODUTO')

# LISTAR POR ID -----------------------------------------------------
# obj = Pessoa.objects(email='ygor@unifei.edu.br').first()
# print(obj.email, obj.nome, obj.idade, obj.produto.codigo, obj.produto.nome, obj.produto.preco)


# ATUALIZAR --------------------------------------------------------
# Pessoa.objects(email='ygor@unifei.edu.br').update(nome='Ygor Salles Aniceto')


# DELETAR -----------------------------------------------------
Produto.objects(nome='Salgadinho').delete()

# Pessoa.objects(email='ygor@unifei.edu.br').delete()
