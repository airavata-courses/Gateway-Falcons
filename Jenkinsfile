pipeline {
    agent any
    environment{
        LOCAL_DIET_IP = "${env.DIET_IP}"
    }
    stages {
        stage('Build') {
            steps {
                //sh 'sudo apt-get install python3-pip -y'
		sh 'python --version'
                sh 'pip3 install -r ./diet/requirements.txt'             
            }
        }
		stage('Deploy') {
			steps {
				sh '''
					JENKINS_NODE_COOKIE=dontKillMe ssh ubuntu@$LOCAL_DIET_IP sudo apt-get --assume-yes install expect
					JENKINS_NODE_COOKIE=dontKillMe nohup ssh -f ubuntu@$LOCAL_SUGGEST_IP sudo ./dietexpect.sh
          JENKINS_NODE_COOKIE=dontKillMe ssh ubuntu@$LOCAL_DIET_IP ./dietcron.sh      
				'''
			}
		}
    }
}