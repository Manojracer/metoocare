pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = credentials('aws-account-id')
        REGION = "ap-south-1"
        REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/metoocare"
        IMAGE_TAG = "1.0.0-${BUILD_NUMBER}"
    }

    stages {
        stage('Git Pull') {
            steps {
                script {
                    // Clean workspace and clone the repository
                    cleanWs()
                    git credentialsId: 'pixclick-github', branch: 'main', url: "https://github.com/Pixaliveworks/metoocare.git"
                    sh 'env'
                    echo "Debug: Completed git pull stage"
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t metoocare:1.0.0 ."
                }
            }
        }

        stage('Image Push to ECR') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                        sh """
                            aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com
                            docker tag metoocare:1.0.0 ${REGISTRY}:${IMAGE_TAG}
                            docker push ${REGISTRY}:${IMAGE_TAG}
                        """
                    }
                }
            }
        }

        stage('Trigger Deploy pipeline') {
            when {
                expression {
                    changeset ".*" // Match any changes
                    changeset "k8-deployment/**/*" == null // No changes in k8-deployment folder
                }
            }
            steps {
                echo "Debug: Triggering CD pipeline with IMAGE_TAG=${IMAGE_TAG}"
                build job: "metocare/metoocare-CD", parameters: [
                    string(name: 'IMAGE_TAG', value: "${IMAGE_TAG}")
                ], wait: false
            }
        }
    }

    post {
        success {
            mail bcc: '', body: "Job success - ${JOB_BASE_NAME}\nJenkins URL - ${JOB_URL}", cc: 'rajasekar@pixalive.me,sarathkumar@pixalive.me,imraz@pixalive.me', from: 'kiran@pixalive.me', replyTo: '', subject: "The Pipeline success - ${JOB_NAME}", to: 'kabeer@pixalive.me,kiran@pixalive.me'
        }
        failure {
            mail bcc: '', body: "Job Failed - ${JOB_BASE_NAME}\nJenkins URL - ${JOB_URL}", cc: 'rajasekar@pixalive.me,sarathkumar@pixalive.me,imraz@pixalive.me', from: 'kiran@pixalive.me', replyTo: '', subject: "The Pipeline failed - ${JOB_NAME}", to: 'kabeer@pixalive.me,kiran@pixalive.me'
        }
    }
}

