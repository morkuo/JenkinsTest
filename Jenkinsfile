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
        - 99d
      volumeMounts:
        - name: kaniko-secret
          mountPath: /kaniko/.docker
  restartPolicy: Never
  volumes:
    - name: kaniko-secret
      secret:
        secretName: dockercred
        items:
          - key: .dockerconfigjson
            path: config.json
            """
        }
    }

    environment {
        DOCKERHUB_USERNAME = "mortonkuo"
        IMAGE_NAME = "our-new-image"
        CONTEXT = "dir://workspace"
        DOCKERFILE = "/workspace/Dockerfile"
        IMAGE = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
    }

    stages {
        // stage('git clone'){
        //     steps {
        //         git branch: 'main',
        //             url: 'https://github.com/morkuo/JenkinsTest.git'
        //     }  
        //     post {
        //         failure {
        //             echo "[*] git clone failure"
        //         }
        //         success {
        //             echo '[*] git clone successful'
        //         }
        //     }
        // }
        stage('Build') {
            steps {
              container("kaniko") {
                  git 'https://github.com/morkuo/JenkinsTest.git'
                  sh "/kaniko/executor --context ${context} --dockerfile ${dockerfile} --destination ${image}"
              }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}