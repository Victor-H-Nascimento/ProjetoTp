var express = require('express');
var router = express.Router();

router.get('/lista', function (req, res, next) {
        req.getConnection(function (err, connection) {
            connection.query("SELECT p.nome, p.idProdutos, p.precoAtual,i.idImagensProdutos, i.caminhoImagem FROM Produtos as p INNER JOIN ImagensProdutos i ON p.idProdutos = i.idProdutos", function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: "TEste" });
                else
                    res.json({ status: 'OK', data: rows });
            });
            if (err)
                res.json({ status: 'ERRO', data: "TESTE2" });
        });
});

router.get('/lerProduto', function (req, res, next) {
    var id = req.query.id; 
    console.log(id);
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM Produtos as p INNER JOIN ImagensProdutos i ON p.idProdutos = i.idProdutos WHERE p.idProdutos=' + id, function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            //console.log("PUDIM@");    
            res.json({ status: 'OK', data: rows });
        });
        if (err)
            res.json({ status: 'ERRO', data: err });
    });
});

router.post('/adicionarCarrinho', function (req, res, next) {
    var id = req.query.id; 
    //console.log(id);
    req.getConnection(function (err, connection) {
        connection.query('INSERT * FROM Produtos as p INNER JOIN ImagensProdutos i ON p.idProdutos = i.idProdutos WHERE p.idProdutos=' + id, function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            //console.log("PUDIM@");    
            res.json({ status: 'OK', data: rows });
        });
        if (err)
            res.json({ status: 'ERRO', data: err });
    });
});

module.exports = router;
