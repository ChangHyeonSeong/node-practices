const http = require('http');
const path = require('path');
const express = require('express');

const mainRouter = require('./routes/main');
const helloRouter = require('./routes/hello');

const port = 8080;

// Application Setup
const application = express()
    // 1. static resources
    .use(express.static(path.join(__dirname, 'public')))
    // 2. request body parser
    .use(express.urlencoded({extends: true}))  // application/x-www-form-urlencoded
    .use(express.json())                       // application/json
    // 3. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // 4. request router
    .all('*', function(req, res, next){
        req.locals.req = req;
        req.locals.res = res;
        next();
    })
    .use('/', mainRouter)
    .use('/hello', helloRouter)

// Server Setup
http.createServer(application)
    .on('listening', function(){
        console.info(`http server runs on ${port}`);
    })
    .on('error', function(error){
        switch(error.code) {
            case 'EACCESS':
                console.error(`${port} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;        
        }
    })
    .listen(port);