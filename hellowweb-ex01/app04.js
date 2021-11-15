const connect = require('connect');
const serverStatic = require('serve-static');
const connectRoute = require('connect-route');

const port = 9999;
const app = connect();


app.use(connectRoute(function(router){
    router.get("/",function(req,resp){
        resp.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        resp.end('<h1>Hello ex04</h1>');
    });

    router.get("/user",function(req,resp){
        console.log(req._parsedUrl.query); //?no=10 문자열 받아서 때서 써야한다

        req.query = {};
        params = (req._parsedUrl.query || '' ).split('&');

        params.forEach(function(params){
            tokens = params.split('=');
            req.query[tokens[0]] = tokens[1];
        });

        resp.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        resp.end(`<h1>User No: ${req.query.no }</h1>`);
    });

    router.get("/guestbook",function(req,resp){
        resp.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        resp.end('<h1>guestbook list</h1>');
    });

    router.get("/board",function(req,resp){
        resp.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        resp.end('<h1>board list</h1>');
    });

    router.get("/board/:no",function(req,resp){
        resp.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        resp.end(`<h1>board View: ${req.params.no }</h1>`);
    });
}));
app.use(serverStatic(__dirname + "/public")); //index.html ??

app.listen(port, function(){
    console.log(`http server running on ${port }`);
});