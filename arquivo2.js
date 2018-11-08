var http = require('http');
var util = require('./util2.js');
var mySQL = require('mysql');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-type':'text/plain'});
    console.log("Teste");
    response.end("Hello Word !" + util.dateTime());
}
).listen(3600);

var conectMySql = mySQL.createConnection({
    host:"https://databases.000webhost.com/",
    port: 3306,
    user:"id6714582_projetotp",
    passaword:"puccamp2018",
    database:"id6714582_projetotp"
});

var retornaDados = function(error, results){
    console.log(JSON.stringify(results));
};

var query = 'SELECT * FROM pessoa';
conectMySql.query(query, retonaDados);