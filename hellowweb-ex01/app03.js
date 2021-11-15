const connect = require('connect');
const serverStatic = require('serve-static');

const port = 9999;
const app = connect();

app.use(serverStatic(__dirname + "/public"));

app.listen(port, function(){
    console.log(`http server running on ${port }`);
});