pipeline {
    agent { docker 'ubuntu:latest' }
    stages {
        stage('build') {
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