from mongoengine import *
from mongoengine.connection import connect
from mongoengine.document import Document
from mongoengine.fields import FloatField, IntField, ListField, StringField
connect('teste')

class Produto(Document):
    codigo = IntField()
    nome = StringField()
    preco = FloatField()

class Pessoa(Document):
    email = StringField()
    nome = StringField()
    idade = IntField()
    produtos = ListField()


# INSERÇÃO -----------------------------------------------------
# prod1 = Produto(codigo=1, nome='Salgadinho', preco=0.50)
# prod2 = Produto(codigo=2, nome='Refrigerenate', preco=5)
# prod3 = Produto(codigo=3, nome='Paçoca', preco=1)
# prod4 = Produto(codigo=4, nome='Bolacha', preco=2.50)
# prod1.save()
# prod2.save()
# prod3.save()
# prod4.save()

# listaObjProdutos = Produto.objects()
# listaAux = []
# for i in listaObjProdutos: 
#     listaAux.append({
#         '_id' : i.id,
#         'codigo': i.codigo,
#         'nome' : i.nome,
#         'preco' : i.preco
#     })
# pessoa1 = Pessoa(email='ygor@unifei.edu.br', nome='Ygor Salles', idade=24, produtos=listaAux)
# pessoa1.save()

# LISTAR -----------------------------------------------------
# listaPessoa = Pessoa.objects()
# for p in listaPessoa:
#     print(p.email, p.nome, p.idade)
#     for prod in p.produtos:
#         print(prod['codigo'], prod['nome'], prod['preco'])

# LISTAR POR ID -----------------------------------------------------
# obj = Pessoa.objects(email='ygor@unifei.edu.br').first()
# print(obj.email, obj.nome, obj.idade)
# for prod in obj.produtos:
#     print(prod.nome, prod.preco)


# ATUALIZAR --------------------------------------------------------
# Pessoa.objects(email='ygor@unifei.edu.br').update(nome='Ygor Salles Aniceto')


# DELETAR -----------------------------------------------------
# Produto.objects(nome='Paçoca').delete()
