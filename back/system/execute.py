import sqlite3
import os

# A função de conexão com o banco de dados
def conectar():
    return sqlite3.connect('db.sqlite3')

# Obtenha o caminho atual
caminho_atual = os.getcwd()
c = caminho_atual.replace("\\", "/")

# Estabelecendo conexão e criando cursor
conexao = conectar()
cursor = conexao.cursor()


def create(tituloProduto, preco, descricao, imgProduto, catProduto, classProduto, exibirHome):
        try:
            if conexao:  # Verifica se a conexão está aberta
                create = f"""INSERT INTO api_produto(tituloProduto, preco, descricao, imgProduto, catProduto, classProduto, exibirHome)
                values
                ('{tituloProduto}', '{preco}', '{descricao}', '{imgProduto}', '{catProduto}', '{classProduto}', '{exibirHome}');"""
                cursor.execute(create)
                conexao.commit()
            else:
                print("Erro: Conexão com o banco de dados está fechada.")
        except Exception as e:
            print('Erro ao adicionar o sensor:', e)

        # create("lapis", 1, 'lapis de cor', c+'/images', '56556', 'livre', True)

        # Fechando a conexão ao final (se não for usada mais)
        conexao.close()  

class loja:
    def __init__(self, teste):
        self.teste = teste
    
    def menu():
        while True:
            print('\n'
                '[1] - Create\n'
                '[2] - Read\n'
                '[3] - Update\n'
                '[4] - Delete\n'
                '[5] - Exit\n'
                )
            op = int(input('Escolha a opção: '))
            match op:
                case 1:
                    tituloProduto = input("Informe o título do produto: ")
                    preco = float(input("Informe o preço: "))
                    descricao = input("Informe a descrição: ")
                    imgProduto = c + '/images' 
                    catProduto = input("Informe a categoria do produto: ")
                    classProduto = input("Informe a classificação do produto: ")
                    exibirHome = bool(input("Exibir na home (True/False)? "))
                    create(tituloProduto, preco, descricao, imgProduto, catProduto, classProduto, exibirHome)
                case 2:
                    pass
                case 3:
                    pass
                case 4:
                    pass
                case 5:
                    break
    
loja.menu()