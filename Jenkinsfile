pipeline {
    agent any
    stages {
        stage('build') {
            agent {
                docker { image 'node:latest'}
            }
            steps {
                sh 'npm --version'
                sh 'npm install' 
                sh 'npx nuxi generate'
                sh 'touch .output/public/.nojekyll'
                sh 'npm run deploy'
            }
        }
    }
}