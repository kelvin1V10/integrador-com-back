import subprocess

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
                subprocess.run(["python", "system/create.py"])  
            case 2:
                subprocess.run(["python", "system/read.py"])  
            case 3:
                subprocess.run(["python", "system/update.py"])  
            case 4:
                subprocess.run(["python", "system/delete.py"])  
            case 5:
                break
            

menu()