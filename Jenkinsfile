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
