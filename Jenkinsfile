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
                    - name: kubeconfig-volume
                      mountPath: /kubeconfig
                      readOnly: true
              restartPolicy: Never
              volumes:
                - name: kaniko-secret
                  secret:
                    secretName: dockercred
                    items:
                      - key: .dockerconfigjson
                        path: config.json
                - name: kubeconfig-volume
                  secret:
                    secretName: my-kubeconfig
            """
        }
    }

    environment {
        DOCKERHUB_USERNAME = "mortonkuo"
        IMAGE_NAME = "our-new-image"
        IMAGE = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
    }

    stages {
        // stage('git clone') {
        //     steps {
        //         git branch: 'main',
        //             url: 'https://github.com/morkuo/JenkinsTest.git'
        //     }
        //     post {
        //         success {
        //             echo 'Cloned successfully'
        //         }
        //     }
        // }
        // stage('Test') {
        //     tools { nodejs "node" }
        //     steps {
        //         echo 'Testing..'
        //         sh 'npm install'
        //         sh 'npm test'
        //     }
        //     post {
        //         success {
        //             echo 'Tests passed'
        //         }
        //     }
        // }
        // stage('Build') {
        //     steps {
        //       echo 'Building....'
        //       container("kaniko") {
        //           sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination ${image}"
        //       }
        //     }
        // }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/arm64/kubectl"'
                sh 'chmod u+x ./kubectl'
                sh 'cat /kubeconfig'
                sh './kubectl --kubeconfig=/kubeconfig config view'
                // sh './kubectl version'
                // sh './kubectl apply -f app.yaml'
                sh './kubectl config view'
                sh './kubectl get pods'
            }
        }
    }
}