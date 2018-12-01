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
    /*if (req.session.logado) {
        var input = req.query.id;
        console.log(JSON.parse(input).idProd);
        console.log(JSON.parse(input).valorProd);
    
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO ProdutosComprados SET idCompras = ?, idProdutos = ?, valorUnitario = ?, quantidadeComprada = ? ',[ id,input.idProd, input.valorProd, input.qntdProd], function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                //console.log("PUDIM@");    
                res.json({ status: 'OK', data: "Produto adicionado com sucesso no carrinho" });
            });
        });
    }*/
   // else {
     //   res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    //}
    
    var input = req.body;
    console.log("PUDIM " + JSON.parse(input));
    res.json({ status: 'OK', data: "deu bom !" });
});


router.post('/finalizaCompra', function (req, res, next) {
    if (req.session.logado) {
        var produtos = JSON.parse(req.query.teste);
        var dados = req.body;
        console.log(produtos);
        console.log(dados);
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO Compras SET valorTotal = ?, idUsuario = ?', [dados.valor, dados.id], function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: "err" });
                else{
                    
                    for(var i = 0; i < produtos.length; i++){
                        req.getConnection(function (err, connection) {
                            connection.query('INSERT INTO ProdutosComprados SET idCompras = ?, idProdutos = ?, valorTotal = ?, quantidadeComprada = ? ', [rows.insertId, produtos[i].idProd, produtos[i].valor, produtos[i].qntd] , function (err, rows) {
                                if (err)
                                    res.json({ status: 'ERRO', data: "err1" });
                                console.log("PUDIM@");    
                                res.json({ status: 'OK', data: "Compra Finalizada com sucesso!" });
                            });
                            if (err)
                                res.json({ status: 'ERRO', data: "err2" });
                        });
                    }
                    //res.json({ status: 'OK', data: "Compra Finalizada com sucesso!" });
                }    
                
            });
            if (err)
                res.json({ status: 'ERRO', data: "err3" });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }

    
    /*console.log((input));
    console.log((input[0].idProd));
    console.log((input[1].idProd));
    console.log(typeof(input));
    
    console.log(aux);
    //console.log(typeof(input));
    //console.log((input.id));
    //console.log((input.valor));
   // console.log((input.produtos));

    //console.log(JSON.stringify(input[10]));
    //console.log(JSON.parse(input));
    //console.log(input[3]);
    for (var i = 0; i < 5; i++) {
        console.log("PUDIM " + i);
    }
   
    res.json({ status: 'OK', data: "deu bom !" });*/
});



/*router.post('/deletaProduto', function (req, res, next) {
    var input = req.body;
    console.log(input);
    req.getConnection(function (err, connection) {
        connection.query('DELETE FROM ProdutosComprados WHERE idProdutos = ? AND idCompras = ?', [input.idProdutos, input.idCompras], function (err, rows) {
            if (err) {
                res.json({ status: 'ERROR', data: err });
            }
            res.json({ status: 'OK', data: "Excluido com sucesso" });
        });
        if (err)
            res.json({ status: 'ERROR', data: err });
    });
});*/

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
