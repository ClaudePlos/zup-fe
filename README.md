# ZupFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

***********************************************************************************************
## zup-fe
## added: k.skowronski (2021.11.3)
Install:
1. After download zip from github (`https://github.com/ClaudePlos/zup-fe`) unzip and Run in Visula Studio Code and in terminal > npm install
2. ng serve > run project on `http://localhost:4200/`.
3. Run also backend (`https://github.com/ClaudePlos/zup-be`) in Intelij 

# Test development 
1. After run project in browser: http://localhost:4200/zupui/login/[login pracownika]

# Product development
Docker build, push and pull:
1. In terminal: npm ci  (clean and install)
2. In terminal: ng build --prod (addresses are replaced with those in the file `environment.prod.ts`)
3. Run Docker Desktop in Windows 
4. In terminal: docker build -t 192.168.0.93:5000/fu-fe .
5. In terminal: docker push 192.168.0.93:5000/fu-fe
6. Pull in terminal on 192.168.0.93: docker pull 192.168.0.93:5000/fu-fe

Update project on 192.168.0.93: 
1. You have to find CONTAINER_ID: sudo docker ps -a
2. sudo docker stop [CONTAINER ID]
3. sudo docker remove [CONTAINER ID]
4. And run project: sudo docker run -d -p 8084:80 --restart=always --name fu-fe 192.168.0.93:5000/fu-fe
