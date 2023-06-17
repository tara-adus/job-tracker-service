# job tracker service

# Purpose

This is the backend Nodejs service to handle requests from the Job Tracker web application.
It will save job application to a database and be able to retrieve them via Rest Apis using JSON payload.

# How to run this service
Ensure Nodejs is installed. If not, follow the instructions here: https://nodejs.org/en/download 
Ensure Git is installed. If not, follow the instructions here: https://github.com/git-guides/install-git

git clone <repo-url>
cd job-tracker-service
node src/app.js

# Supported Rest Apis

POST /application
GET /application
