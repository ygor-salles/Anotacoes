from tkinter import *
from tkinter import ttk

root = Tk()
root.title('Teste')
root.geometry('500x500')

my_tree = ttk.Treeview(root)

# Definindo suas colunas
my_tree['columns'] = ('Name', 'ID', 'Pizza Favorita')

# Formato das colunas
my_tree.column('#0', width=120, minwidth=25)
my_tree.column('Name', anchor=W, width=120)
my_tree.column('ID', anchor=CENTER, width=80)
my_tree.column('Pizza Favorita', anchor=W, width=120)

# Criando titulos
my_tree.heading('#0', text='Label', anchor=W)
my_tree.heading('Name', text='Name', anchor=W)
my_tree.heading('ID', text='ID', anchor=CENTER)
my_tree.heading('Pizza Favorita', text='Pizza Favorita', anchor=W)

# Adicionar pais
my_tree.insert(parent='', index='end', iid=0, text='Parent', values=('John', 0, 'Perperoni'))
# Adicionar filhos
my_tree.insert(parent='', index='end', iid=1, text='Child', values=('John', 1, 'Perperoni'))
my_tree.insert(parent='', index='end', iid=2, text='Child', values=('John', 2, 'Perperoni'))
my_tree.move('1', '0', '0')
my_tree.move('2', '0', '0')

# Adicionar pais
my_tree.insert(parent='', index='end', iid=3, text='Parent', values=('John', '3', 'Perperoni'))
# Adicionar filhos
my_tree.insert(parent='', index='end', iid=4, text='Child', values=('John', 4, 'Perperoni'))
my_tree.insert(parent='', index='end', iid=5, text='Child', values=('John', 5, 'Perperoni'))
my_tree.move('4', '3', '3')
my_tree.move('5', '3', '3')


my_tree.pack(pady=20)

root.mainloop()