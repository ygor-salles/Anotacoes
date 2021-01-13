from sqlalchemy import (
    create_engine, Column, Integer, String, ForeignKey
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationships, sessionmaker, relationship

engine = create_engine('postgresql+psycopg2://postgres:123456@localhost:5432/teste2', echo=False)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


class Department(Base):
    __tablename__ = 'department'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    employees = relationship('Employee', secondary='department_employee')

class Employee(Base):
    __tablename__ = 'employee'
    id = Column(Integer, primary_key=True)
    name = Column(String)

class DepartmentEmployee(Base):
    __tablename__ = 'department_employee'
    department_id = Column(Integer, ForeignKey('department.id'), primary_key=True)
    employee_id = Column(Integer, ForeignKey('employee.id'), primary_key=True)

# Um departamento possui vários funcionários, e um funcionário só pode estar em um departamento

Base.metadata.create_all(engine)

# maria = Employee(id=1, name='maria')
# marcia = Employee(id=2, name='marcia')
# pedro = Employee(id=3, name='pedro')
# session.add_all([maria, marcia, pedro])
# session.commit()
# session.close()

# it_department = Department(id=1, name='IT')
# rh_department = Department(id=2, name='RH')
# session.add_all([it_department, rh_department])
# session.commit()
# session.close()

# rel1 = DepartmentEmployee(department_id=1, employee_id=1)
# rel2 = DepartmentEmployee(department_id=1, employee_id=2)
# rel3 = DepartmentEmployee(department_id=2, employee_id=1)
# session.add_all([rel1, rel2, rel3])
# session.commit()
# session.close()

array = session.query(Department).all()

for i in array:
    print('\n', i.id, i.name)
    for j in i.employees:
        print(j.id, j.name)

