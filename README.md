## About Project
keygen is a powerful software licensing API for desktop apps, on-premise software and other software products written in C++, C#, Swift, Java, Kotlin, Node and more.
## product : 
A product could represent the software you are offering or selling.
payload: name
         code
         distributionStrategy
         url
         platforms
## policy :
refers to a set of rules or conditions that define how licenses for a product are managed, validated.
These policies can help you control aspects like: license expiration ,license Usage , feature Access.
payload: 
  name 
  floating
  maxMachines
## users
refers to the individuals or entities who are licensed to use the software. These can be customers, clients, employees, or anyone else who accesses your software product through a valid license.
payload:
 firstName
 lastName
 email
 password
 ## License
 license is a legal authorization that grants a user or entity the right to use a particular software product under specific conditions. 
 payload:
  name
  policy Id
  user Id
 ## machines
 machine generally refers to the hardware device (such as a computer, server, or virtual machine) on which the software is installed and run.
 payload : 
  fingerprint
  platform
  name.


## Pre-requisities:
 1. node version >12
 2. Visual Studio code
 3. git
## tools
 1. playwright
 2. typescript

## Browser Support :-
 Playwright supports all modern rendering engines including Chromium , Webkit and Firefox.
 Cross -platform :test on windows ,linux and macos,locally or on CI , headless or headed.

## Execution Steps :-
 1. checkout the branch from GitLab Url  https://github.com/ASWINI413/New-folder
 2. Execute the command `npm install`
 3. `npm run tests` to run code.
 4. `npm run report:generate` generates multipage Html Report

## CICD Integration
1. Jenkins : http://localhost:8080/
 Downnload and install the jenkins from https://www.jenkins.io/download/
2. install node plugins from mangage plugins in Jenkins
3. install git plugins from mangage plugins in Jenkins
4. add new Test 
5. click on build now option

 ## reference links 
 https://keygen.sh/

  

