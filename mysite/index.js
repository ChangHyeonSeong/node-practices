const http = require('http');
const path = require('path');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const multer = require('multer');

// 1. Enviroment Variables
dotenv.config({ path: path.join(__dirname, 'config/app.env') });
dotenv.config({ path: path.join(__dirname, 'config/db.env') });

// 2. Application Routers
const { applicationRouter } = require('./routes'); // 구조분해 사용 appllicationRouter 속성객체만 쓴다면 이렇게
const { SIGTERM } = require('constants');

// 3. Logger
const logger = require('./logging');

// 4. Application Setup
const application = express()
    // 4-1 Session Enviroment
    .use(session({
        secret: "mysite-session",
        resave: false
    }))
    
    // 4-2. request body parser
    .use(express.urlencoded({extended: true}))  // application/x-www-form-urlencoded
    .use(express.json())                       // application/json
    
    // 4-3. Multipart
    .use(multer({
        dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE)
    }).single('file'))


    // 4-4. static resources
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY) ))
    // 4-5. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

// 5. Application Router setup
applicationRouter.setup(application);
    


// Server Setup
http.createServer(application)
    .on('listening', function(){
        console.info(`http server runs on ${process.env.PORT}`);
    })
    .on('error', function(error){
        switch(error.code) {
            case 'EACCESS':
                console.error(`${process.env.PORT} requires privileges`);
                logger.error(`${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${process.env.PORT} is already in use`);
                logger.error(`${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                console.error('error : ' + error);
                logger.error('error : ' + error);
                throw error;        
        }
    })
    .listen(process.env.PORT);