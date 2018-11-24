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
    //console.log(id);
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
    if (req.session.logado) {
        var input = req.body;
        //console.log("PUDIM 3 " + input);
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO ProdutosComprados SET idCompras = ?, idProdutos = ?, valorUnitario = ?, quantidadeComprada = ? ',[ input.idCompras ,input.idProd, input.valorProd, input.qntdProd], function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                //console.log("PUDIM@");    
                res.json({ status: 'OK', data: "Produto adicionado com sucesso no carrinho" });
            });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }

});


router.post('/finalizaCompra', function (req, res, next) {
    if (req.session.logado) {
        var input = req.body;
        console.log(input);
        req.getConnection(function (err, connection) {
            connection.query('UPDATE Compras SET valorTotal = ? WHERE idCompras = ?', [input.valor, input.idCompras], function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: "Compra Finalizada com sucesso!" });
            });
            if (err)
                res.json({ status: 'ERRO', data: err });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

router.get('/lerCarrinho', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        //console.log(id);
        req.getConnection(function (err, connection) {
            connection.query('SELECT p.nome, p.precoAtual, p.idProdutos, pc.quantidadeComprada, i.caminhoImagem  FROM ProdutosComprados as pc, Produtos as p, ImagensProdutos as i WHERE p.idProdutos = i.idProdutos and pc.idProdutos = p.idProdutos and pc.idCompras = ' + id, function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: rows });
            });
            if (err)
                res.json({ status: 'ERRO', data: rows });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

module.exports = router;
