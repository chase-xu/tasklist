pipeline {

  agent any
  parameters {
    booleanParam(name: 'executeTests', defaultValue: true, description:'')
    booleanParam(name: 'executeBuild', defaultValue: true, description:'')
    booleanParam(name: 'executeDeploy', defaultValue: true, description:'')
  }
  stages{
    stage('build') {
      when{
        expression{
          params.executeBuild
        }
      }
      steps{
        echo "building ..."
        script{
          withCredentials([
              string(
                credentialsId: 'MONGO_URI',
                variable: 'MURI'),
              string(
                credentialsId: 'JWT_SECRET',
                variable: 'JWT'
              )
          ]) {
            docker.withRegistry('', 'docker'){
                def img = docker.build('chaseatdocker/cpxu-tasklist:latest', "--build-arg MONGO_URI='${MURI}'  --build-arg JWT_SECRET=${JWT} ./")
                img.push()
            }
          }
        }
      }
    }
    stage('test'){
      when{
        expression{
          params.executeTests
        }
      }
      steps{
        echo "testing ..."
      }
    }
    stage('deploy'){
      when{
        expression{
          params.executeDeploy
        }
      }
      steps{
        echo "deploying ..."
        echo "starting docker container"
        sh 'docker-compose -f docker-compose.yml up -d'
        echo "dcoker container started"
        echo "finished deploying"
      }
    }
  }
}
