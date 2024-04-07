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
            agent {
                docker {
                    image 'docker:latest'
                    // Run the container on the node specified at the
                    // top-level of the Pipeline, in the same workspace,
                    // rather than on a new node entirely:
                    // reuseNode true
                }
            }
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