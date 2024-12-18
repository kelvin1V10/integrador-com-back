import sqlite3
import os

def conectar():
    return sqlite3.connect('db.sqlite3')

def read_data():
    caminho_atual = os.getcwd()
    c = caminho_atual.replace("\\", "/")

    conexao = conectar()
    cursor = conexao.cursor()

    titulo = "Alicate"

    if conexao:
        try:
            # Realiza a consulta e busca os dados
            # cursor.execute("SELECT * FROM api_produto;")
            cursor.execute("SELECT * FROM api_produto WHERE tituloProduto = ?", (titulo,))
            resultados = cursor.fetchall()  # Pega todos os resultados da consulta

            if resultados:
                for linha in resultados:
                    print(linha)  # Exibe os resultados
            else:
                print("Nenhum dado encontrado.")
        except sqlite3.Error as e:
            print(f"Erro ao executar a consulta: {e}")
        finally:
            conexao.close()
    else:
        print("Erro: Conexão com o banco de dados está fechada.")

if __name__ == "__main__":
    read_data()
