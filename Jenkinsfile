
pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo yarn install"
                sh "sudo yarn build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/v2dev.limecall.com/html/build"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/v2dev.limecall.com/html/build"
            }
        }
    }
}
