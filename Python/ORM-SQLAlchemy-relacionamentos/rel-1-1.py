from sqlalchemy import (create_engine, Column, Integer, String, ForeignKey)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, sessionmaker, relationship

engine = create_engine('postgresql+psycopg2://postgres:123456@localhost:5432/teste', echo=False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


class Department(Base):
    __tablename__ = 'department'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    employee = relationship('Employee', uselist=False, backref='department', cascade='delete,all')

class Employee(Base):
    __tablename__ = 'employee'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    departament_id = Column(Integer, ForeignKey('department.id'), unique=True)

# Um departamento possui um funcionário, e um funcionário só pode estar em um departamento


Base.metadata.create_all(engine)

# it_department = Department(id=1, name='IT')
# rh_department = Department(id=2, name='RH')
# session.add_all([it_department, rh_department])
# session.commit()
# session.close()

# maria = Employee(id=1, name='maria', departament_id=1)
# marcia = Employee(id=2, name='marcia', departament_id=2)
# session.add_all([maria, marcia])
# session.commit()
# session.close()


array = session.query(Department).all()
for i in array:
    print('\n', i.id, i.name, i.employee.id, i.employee.name)
session.commit()
session.close()
