from django.db import models

class Produto(models.Model):
    codigoProduto = models.AutoField(primary_key=True)
    tituloProduto = models.CharField(max_length=255)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.CharField(max_length=255)
    imagemProduto = models.JSONField(default=dict)
    categoriaProduto = models.CharField(max_length=255)
    classificacaoProduto = models.CharField(max_length=255)
    exibirHome = models.BooleanField(default=True)
