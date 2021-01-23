# ORM SQLAlchemy

https://pypi.org/project/SQLAlchemy/

### Link da documentação oficial

https://docs.sqlalchemy.org/en/13/orm/relationships.html

### Link secundário

https://www.pythoncentral.io/sqlalchemy-orm-examples/

### bancos:

* No postgreSQL

```python
engine = create_engine('postgresql+psycopg2://postgres:123456@localhost:5432/teste', echo=False)
```

* No SQLite

```python
engine = create_engine('sqlite:///test.db', echo=True)
```

## Ferramenta para gerar o código a partir do banco já criado: SQLAcodegen

https://pypi.org/project/sqlacodegen/

* Comando para gerar o mapeamento do banco em python com SQLAcodegen
``` bash
sqlacodegen –-schema nomeSchema –-outfile model.py postgresql+psycopg2://postgres:123456@localhost:5432/nomeBanco
```
