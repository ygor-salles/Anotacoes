class Carro():
    def __init__(self, codigo, nome):
        self.codigo = codigo
        self.nome = nome
    
car1 = Carro(1, 'FIAT')
car2 = Carro(2, 'VOLKS')
car3 = Carro(3, 'CHEVROLET')
car4 = Carro(4, 'FORD')
car5 = Carro(5, 'RENAULT')

listaCarros = [car1, car2, car3, car4]

for i in listaCarros:
    print(i.codigo, i.nome)

listaCarros.append(car5)
print()

for i in listaCarros:
    print(i.codigo, i.nome)

listaCarros.remove(car5)
print()

for i in listaCarros:
    print(i.codigo, i.nome)
print()


print('tamanho da lista:',len(listaCarros))