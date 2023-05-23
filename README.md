# DevsecOps Practice Project

## Introduction
This project is created as a practice implementation of the DevsecOps flow, which involves integrating security into the software development process.

## Features
- Continuous Integration (CI) using Gitlab
- Application Testing using sonarqube
- Continuous Delivery (CD) using Kubernetes

## Setup
1. Clone the repository: `git clone https://github.com/Qqbbix/devsecOpsWorkshop.git`
2. Navigate to the folder: cd devsecOpsWorkshop
3. Configure the environment variables for each tool in .env file.
4. Build and run the project locally: docker compose -f main/docker-compose-dev.yml  up -d --build

## CI/CD Flow
![alt text](https://www.freecodecamp.org/news/content/images/size/w1000/2021/11/image-57.png "DevsecOps Flow")

## Conclusion
This project is a simple example of how to implement DevsecOps practices into software development workflow. It can be used as a starting point for implementing security in a more complex software project.