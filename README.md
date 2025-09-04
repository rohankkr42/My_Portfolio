Step 1: Setup jenkins up...
    * Official Website:- https://www.jenkins.io/doc/book/installing/linux/
    <img width="1348" height="899" alt="image" src="https://github.com/user-attachments/assets/c46b628c-d549-4fbb-992a-b5bd5d80ebc9" />
    * Go to Manage Jenkins → Manage Plugins → Installed.
    * Make sure Git plugin and GitHub Integration / GitHub Webhook plugin are installed.
    * Go to Manage Jenkins → Credentials → System → Global Credentials.
    * Click Add Credentials → Kind: Username with password or Personal Access Token (Personal Access Token is recommended for GitHub).
    * Username: Your GitHub username, Password: GitHub Personal Access Token → Save Credentials.

Step 2: Configure the Jenkins Job.
   * Create a new pipeline job → Go to Jenkins → New Item Enter a name: My_Portfolio_Pipeline → Select Pipeline → Click OK.
   * Set pipeline definition → Under Pipeline → Definition, select Pipeline script from SCM → SCM: Git
      Repository URL: https://github.com/rohankkr42/My_Portfolio.git
   * Branch: main → Credentials: Select the credentials you added earlier → Script Path: Jenkinsfile (or wherever your pipeline script is located).

Step 3: Configure Webhook in GitHub.
   * Go to your GitHub repository → URL: https://github.com/rohankkr42/My_Portfolio.git → Click Settings → Webhooks → Add webhook → Add webhook details
      Payload URL: http://<your-jenkins-server>/github-webhook/  Note:- Replace with your Jenkins server IP or domain.
   * Content type: application/json → Secret: Optional (can be left empty for now) → Which events would you like to trigger this webhook? → Select: Just the push event → Click Add webhook.
     
Step 4: Configure Jenkins to respond to webhook.
   * Go back to your Jenkins job → Build Triggers → Check GitHub hook trigger for GITScm polling → Save the configuration → Test the webhook: → In GitHub webhook settings → Click Test webhook → Jenkins should log a build trigger in Build History.
    <img width="1325" height="392" alt="image" src="https://github.com/user-attachments/assets/200740e3-fa1d-4fb0-8ac9-3c3815ec6a05" />

     
Step 5: Update your Pipeline Jenkinsfile.
   * Your Jenkinsfile should now contain the stages to:
      - Pull the latest code
      - Clean old containers/images
      - Build the Docker image
      - Run the container

My_Jenkins_Pipeline:
#################################################################################################################################################################
pipeline {
    agent any

    environment {
        IMAGE_NAME = "my_portfolio"
        CONTAINER_NAME = "my_portfolio_container"
        HOST_PORT = "8080"
        CONTAINER_PORT = "80"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "main", url: "https://github.com/rohankkr42/My_Portfolio.git"
            }
        }

        stage('Clean Old Containers & Images') {
            steps {
                script {
                    sh '''
                    docker ps -aq --filter "name=${CONTAINER_NAME}" | xargs -r docker stop
                    docker ps -aq --filter "name=${CONTAINER_NAME}" | xargs -r docker rm
                    docker image prune -a -f
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    docker build --no-cache --rm --force-rm \
                        -t ${IMAGE_NAME}:latest \
                        -f My_Portfolio/project/Dockerfile \
                        My_Portfolio/project
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh '''
                    docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}:latest
                    '''
                }
            }
        }

        stage('Verify Container') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }
    }
}
###########################################################################################################################################################

Step 6: Step 6: Test the webhook.
   * Make a small change in your GitHub repo (e.g., README.md) → Push the change to main branch → Jenkins should automatically trigger the pipeline and: → Pull the latest code →Build the Docker image →Run the container on port 8080 → Check the Build History to confirm the build was triggered by the webhook.

Step 7: Test the dockerise website.
   * Check the public ip of the instance with port number(80) and browse.
   * Make sure the port 81 is allowed in firewall(GCP), security groups(AWS)
     <img width="1341" height="158" alt="image" src="https://github.com/user-attachments/assets/26da69f2-b41c-41c6-bcc5-bedf5cf12f38" />

<img width="1856" height="965" alt="image" src="https://github.com/user-attachments/assets/20f2866c-8c4f-4e80-8ea4-1dc4359ae00c" />
