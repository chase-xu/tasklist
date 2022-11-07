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
                variable: 'URI'),
              string(
                credentialsId: 'JWT_SECRET',
                variable: 'JWT'
              )
          ]) {
            def img = docker.build('cpxu-tasklist:latest', "--build-arg MONGO_URI=${URI} JWT_SECRET=${JWT} ./")
            img.push()
              
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
      }
    }
  }
}
