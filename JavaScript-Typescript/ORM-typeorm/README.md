## Gerar modelagem no typeorm a partir de bancos já criados

link:

https://www.npmjs.com/package/typeorm-model-generator

* Gerando model a partir do postgreSQL local

```bash
typeorm-model-generator -h localhost -d postgres -u postgres -x !Password -e postgres -o . -s public -p 5433
```


* Gerando model a partir do postgreSQL local e com docker
```bash
typeorm-model-generator -h localhost -d mussum -u postgres -x docker -e postgres -o ./typegen -s public -p 5433
```
