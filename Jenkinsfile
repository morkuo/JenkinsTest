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

    tools { nodejs "node" }

    environment {
        DOCKERHUB_USERNAME = "mortonkuo"
        IMAGE_NAME = "our-new-image"
        IMAGE = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
    }

    stages {
        stage('git clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/morkuo/JenkinsTest.git'
            }
        }
        // stage('Test') {
        //     steps {
        //         echo 'Testing..'
        //         sh 'npm install'
        //         sh 'npm test'
        //     }
        // }
        stage('Build') {
            steps {
              container("kaniko") {
                  sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination ${image}"
              }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}