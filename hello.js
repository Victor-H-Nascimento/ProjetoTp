var http = require('http');
var util = require('./util.js');
var mySQL = require('mysql');

http.createServer(function(request,response){
    response.writeHead(200,{'Content-type': 'text/plain'});
    console.log('Teste');
    response.end('Hello World!' + util.dataTime());

}
).listen(3000);

var conMySQL = mySQL.createConnection({

host: 'esparta',
port: 3306,
user: 'patriciadados',
password: 'dados',
database: 'patricia'

});

var retornaDados = function(error,result){
    console.log(JSON.stringify(result));
};


var query = 'SELECT * FROM pessoa';
conMySQL.query(query,retornaDados)