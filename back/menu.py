import sqlite3
import pandas as pd

class Ecommerce:
    def __init__(self, db='db.sqlite3'):
        self.conn = sqlite3.connect(db)
        self.menu()

    def menu(self):
        while True:
            print('\n'
                  '[1]-Create\n'
                  '[2]-Read\n'
                  '[3]-Update\n'
                  '[4]-Delete\n'
                  '[5]-Exit\n\n'
                  )
            op = int(input('Escolha uma opção: '))
            match op:
                case 1:
                    self.menu_create()
                case 2:
                    self.read()
                case 3:
                    self.atualizar()
                case 4:
                    produto_id = int(input('Digite o ID: '))
                    self.delete(produto_id)
                case 5:
                    print('Exit')
                    break
                case _:
                    print('Escolha uma opção válida!')
    
    def create(self, titulo, preco, descricao, imgProduto, catProduto, classProduto, exibirHome):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO api_produto (tituloProduto, preco, descricao, imgProduto, catProduto, classProduto, exibirHome)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (titulo, preco, descricao, imgProduto, catProduto, classProduto, exibirHome))
        self.conn.commit()
        print("Produto criado com sucesso.")
    
    def menu_create(self):
        print('\n'
              '[1]-Título\n'
              '[2]-Preço\n'
              '[3]-Descrição\n'
              '[4]-Imagem\n'
              '[5]-Categoria\n'
              '[6]-Classe\n'
              '[7]-Exibir\n'
        )
        titulo = input('Título: ')
        preco = float(input('Valor: '))
        descricao = input('Descrição: ')
        imgProduto = input('Imagem: ')
        catProduto = input('Categoria: ')
        classProduto = input('Classe: ')
        exibirHome = input('Exibir(True, False): ')
        self.create(titulo, preco, descricao, imgProduto, catProduto, classProduto, exibirHome)

 
    def read(self):
        print(
            '\n'
            '[1]-Listar todos os produtos\n'
            '[2]-Listar por título\n\n'
        )
        op = int(input('Escolha a opção: '))
        match op:
            case 1:
                df = pd.read_sql_query("SELECT * FROM api_produto", self.conn)
                return print(df)
            case 2:
                query = "SELECT id, tituloProduto FROM api_produto"
                df = pd.read_sql_query(query, self.conn)
                return print(df)

    def update(self, produto_id, titulo=None, preco=None, descricao=None, 
                            imgProduto=None, catProduto=None, classProduto=None, exibirHome=None):
        cursor = self.conn.cursor()
        campos = []
        valores = []

        if titulo:
            campos.append("tituloProduto = ?")
            valores.append(titulo)
        if preco:
            campos.append("preco = ?")
            valores.append(preco)
        if descricao:
            campos.append("descricao = ?")
            valores.append(descricao)
        if imgProduto:
            campos.append("imgProduto = ?")
            valores.append(imgProduto)
        if catProduto:
            campos.append("catProduto = ?")
            valores.append(catProduto)
        if classProduto:
            campos.append("classProduto = ?")
            valores.append(classProduto)
        if exibirHome is not None:
            campos.append("exibirHome = ?")
            valores.append(exibirHome)

        if campos:
            valores.append(produto_id)
            cursor.execute(f'''UPDATE api_produto SET {', '.join(campos)} WHERE id = ?''', valores)
            self.conn.commit()
            print("Produto atualizado com sucesso.\n")
        else:
            print("Nenhum campo para atualizar.")

    def atualizar(self):
        produto_id = input('ID:')
        query = "SELECT * FROM api_produto WHERE id = ?"
        df = pd.read_sql_query(query, self.conn, params=(produto_id,))
        print(df)

        titulo = input('Título: ')
        preco = float(input('Preço: '))
        descricao = input('Descrição: ')
        imgProduto = input('Imagem: ')
        catProduto = input('Categoria: ')
        classProduto = input('Classificação: ')
        exibirHome = input('Exibir(True, False): ')
        print('\n\n')

        self.update(produto_id, titulo, preco, descricao, imgProduto, catProduto, classProduto, exibirHome)
        df = pd.read_sql_query(query, self.conn, params=(produto_id,))
        print(df)

        if not df.empty:
            return df
        else:
            print("Produto não encontrado.")
            return None
        
    def delete(self, produto_id):
        cursor = self.conn.cursor()
        cursor.execute('DELETE FROM api_produto WHERE id = ?', (produto_id,))
        self.conn.commit()
        print("Produto deletado com sucesso.")
        


x = Ecommerce()
