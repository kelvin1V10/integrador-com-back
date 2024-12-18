import sqlite3
import os

def conectar():
    return sqlite3.connect('db.sqlite3')

caminho_atual = os.getcwd()
c = caminho_atual.replace("\\", "/")

conexao = conectar()
cursor = conexao.cursor()

def inserir_sensor(tituloProduto, preco, descricao, imgProduto, catProduto, classProduto, exibirHome):
    try:
        if conexao:  
            inserir_sensor = f"""INSERT INTO api_produto(tituloProduto, preco, descricao, imgProduto, catProduto, classProduto, exibirHome)
            values
            ('{tituloProduto}', '{preco}', '{descricao}', '{imgProduto}', '{catProduto}', '{classProduto}', '{exibirHome}');"""
            cursor.execute(inserir_sensor)
            conexao.commit()
        else:
            print("Erro: Conexão com o banco de dados está fechada.")
    except Exception as e:
        print('Erro ao adicionar o sensor:', e)

inserir_sensor("lapis", 1, 'lapis de cor', c+'/images', '56556', 'livre', True)


conexao.close()
