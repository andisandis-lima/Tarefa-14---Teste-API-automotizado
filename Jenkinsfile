pipeline {
    agent any

    stages {
        stage('Clonar Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/andisandis-lima/Tarefa-14---Teste-API-automotizado.git'
            }
        }
        stage('Instalar depedencias') {
            steps {
               sh 'npm install'
            }
        }
         stage('Execucao dos testes') {
            steps {
               sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}
