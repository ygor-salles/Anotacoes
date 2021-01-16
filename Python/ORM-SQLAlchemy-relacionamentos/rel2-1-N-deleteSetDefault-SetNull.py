from sqlalchemy import (create_engine, Column, Integer, String, ForeignKey)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, sessionmaker, relationship

engine = create_engine('postgresql+psycopg2://postgres:123456@localhost:5432/teste', echo=False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


class Department(Base):
    __tablename__ = 'department'
    id = Column(Integer, primary_key=True, default='SEM DEPARTAMENTO')
    name = Column(String)
    employee = relationship('Employee')

    def __repr__(self):
        return f'Department=(id={self.id}, name={self.name}, employee={self.employee})'

class Employee(Base):
    __tablename__ = 'employee'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    departament_id = Column(Integer, ForeignKey('department.id', ondelete='SET DEFAULT', onupdate='CASCADE'), default='SEM DEPARTAMENTO')

    def __repr__(self):
        return f'Employee=(id={self.id}, name={self.name}, departament_id={self.departament_id})'

# Um departamento possui varios funcionário, e um funcionário só pode estar em um departamento. Se o
# departamento for excluído as chaves estrangeiras devem ser descritas como 'SEM DEPARTAMENTO'
# pode-se associar com back-populates ou backref. No caso do back_populates deve se colocar nas duas tabelas. E por estranho que pareça se não colocar nenhum dos dois funciona tb 

Base.metadata.create_all(engine)

# it_department = Department(id=1, name='IT')
# rh_department = Department(id=2, name='RH')
# session.add_all([it_department, rh_department])
# session.commit()
# session.close()

# maria = Employee(id=1, name='maria', departament_id=1)
# marcia = Employee(id=2, name='marcia', departament_id=2)
# caio = Employee(id=3, name='caio', departament_id=2)
# pedro = Employee(id=4, name='pedro', departament_id=2)
# fabio = Employee(id=5, name='fabio', departament_id=1)
# session.add_all([maria, marcia, caio, pedro, fabio])
# session.commit()
# session.close()

# array = session.query(Department).all()
# for i in array:
#     print('\n', i.id, i.name)
#     for j in i.employee:
#         print(j.id, j.name)
# session.commit()
# session.close()

# it_department = session.query(Department).filter(Department.id == 1).first()
# session.delete(it_department)
# session.commit()
# session.close()

# from pprint import pprint
# pprint(session.query(Employee).all())
# session.commit()
# session.close()

# array = session.query(Employee).all()
# for i in array:    
#     print('\n', i.id, i.name, i.departament_id)
# session.commit()
# session.close()

# Note que no postgreSQL o SET DEFAULT não funciona, acabando por definir a chave estrangeira que 
# faz refenrecia ao registro excluído setando em None(null)
# Para ajustar isso, pode ser feito na aplicação, conforme abaixo:

array = session.query(Employee).all()
for i in array:
    if i.departament_id == None:    
        print('\n', i.id, i.name, 'SEM DEPARTAMENTO')
    else:
        print('\n', i.id, i.name, i.departament_id)
session.commit()
session.close()