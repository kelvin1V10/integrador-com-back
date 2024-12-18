import sqlite3

conexao = sqlite3.connect('db.sqlite3')

cursor = conexao.cursor()
cursor.execute('SELECT sqlite_version();')
linha = cursor.fetchone()
print(f'Versão do SQLite => {linha[0]}')

cursor.execute('PRAGMA database_list;')
banco = cursor.fetchall()
print(f'Banco de dados => {banco[0][1]}')

conexao.close()
