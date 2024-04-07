pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      command:
        - sleep
      args:
        - 9999999
      volumeMounts:
        - name: kaniko-secret
          mountPath: /kaniko/.docker
        - name: dockerfile
          mountPath: /workspace
  restartPolicy: Never
  volumes:
    - name: kaniko-secret
      secret:
        secretName: dockercred
        items:
          - key: .dockerconfigjson
            path: config.json
    - name: dockerfile
      configMap:
        name: dockerfile-config
            """
        }
    }

    environment {
        DOCKERHUB_USERNAME = "mortonkuo"
        IMAGE_NAME = "our-new-image"
    }

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
              container("kaniko") {
                  script {
                      def context = "dir://workspace"
                      def dockerfile = "/workspace/Dockerfile"
                      def image = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"

                      sh "/kaniko/executor --context ${context} --dockerfile ${dockerfile} --destination ${image}"
                  }
              }
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