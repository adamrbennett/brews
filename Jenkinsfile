node {
  git 'git@github.com:adamrbennett/brews.git'

  def img
  stage('Build') {
    img = docker.build("814258403605.dkr.ecr.us-east-1.amazonaws.com/pointsource/brews:${env.BUILD_NUMBER}")
  }

  docker.withRegistry('http://814258403605.dkr.ecr.us-east-1.amazonaws.com/') {
    stage('Publish') {
      img.push()
      img.push('latest')
    }
  }

  stage('Deploy') {
    withEnv(['DOCKER_HOST=tcp://mgr1.node.consul:2375']) {
      sh "docker service create --with-registry-auth --name brews-${env.BUILD_NUMBER} --network sfi -e SERVICE_NAME=brews -e SERVICE_TAGS=${env.BUILD_NUMBER} 814258403605.dkr.ecr.us-east-1.amazonaws.com/pointsource/brews:${env.BUILD_NUMBER}"
    }
  }
}
