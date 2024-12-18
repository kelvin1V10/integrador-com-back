import os

caminho_atual = os.getcwd()
c = caminho_atual.replace("\\", "/")

print("Caminho da pasta atual:", c+"/")
