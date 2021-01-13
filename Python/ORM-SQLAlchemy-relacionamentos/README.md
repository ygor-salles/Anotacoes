# ORM SQLAlchemy

https://pypi.org/project/SQLAlchemy/

### Link da documentação oficial

https://docs.sqlalchemy.org/en/13/orm/relationships.html

### Link secundário

https://www.pythoncentral.io/sqlalchemy-orm-examples/

### Anotações:

* nullable=False representa not null do SQL, o qual pode ser adicionando para representar cardinalidades 0-1 ou 0-N. E nullable=True para cardinalidades 1-1 ou 1-N. 
Segue um exmplo onde o nullable deve ser descrito

```python
Column('department_id', ForeignKey('department.id'), primary_key=True, nullable=False)
```

## Ferramenta para gerar o código a partir do banco já criado: SQLAcodegen

https://pypi.org/project/sqlacodegen/

* Comando para gerar o mapeamento do banco em python com SQLAcodegen
``` bash
sqlacodegen –schema nomeSchema –outfile model.py postgresql+psycopg2://postgres:123456@localhost:5432/nomeBanco
```
