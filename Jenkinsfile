pipeline {
    agent any

    stages {
        stage('git clone'){
            steps {
                git branch: 'main',
                    url: 'https://github.com/morkuo/JenkinsTest.git'
            }  
            post {
                failure {
                    echo "[*] git clone failure"
                }
                success {
                    echo '[*] git clone successful'
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'docker build . -t app'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'docker run --name app app npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}