var express = require('express');
var router = express.Router();

router.get('/lista', function (req, res, next) {
        req.getConnection(function (err, connection) {
            //exibe os produtos mais vendidos na loja como destaque da pagina principal
            connection.query("SELECT p.nome, ProdutosComprados.idProdutos, p.precoAtual,ImagensProdutos.idImagensProdutos, ImagensProdutos.caminhoImagem FROM Produtos as p INNER JOIN ImagensProdutos ON p.idProdutos = ImagensProdutos.idProdutos INNER JOIN ProdutosComprados ON ProdutosComprados.idProdutos = p.idProdutos group by ProdutosComprados.idProdutos order by  sum(ProdutosComprados.quantidadeComprada) DESC", function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: "TEste" });
                else
                    res.json({ status: 'OK', data: rows });
            });
            if (err)
                res.json({ status: 'ERRO', data: "TESTE2" });
        });
});


// ORDER BY OPTION SELECIONADA PELO USUÁRIO
router.get('/listaLoja', function (req, res, next) {
    var ordem = req.query.selection;
    console.log(ordem);


    if(ordem === "vendidos" ){


        req.getConnection(function (err, connection) {
        
            connection.query("SELECT p.nome, ProdutosComprados.idProdutos, p.precoAtual,ImagensProdutos.idImagensProdutos, ImagensProdutos.caminhoImagem FROM Produtos as p INNER JOIN ImagensProdutos ON p.idProdutos = ImagensProdutos.idProdutos INNER JOIN ProdutosComprados ON ProdutosComprados.idProdutos = p.idProdutos group by ProdutosComprados.idProdutos order by  sum(ProdutosComprados.quantidadeComprada) DESC" , function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: "TEste1" });
                else
                    res.json({ status: 'OK', data: rows });
            });
            if (err)
                res.json({ status: 'ERRO', data: "TESTE2" });
        });
    }

    else{
        if(ordem === "dataLancamento" ){


            req.getConnection(function (err, connection) {
            
                connection.query("SELECT p.nome, p.idProdutos, p.precoAtual,ImagensProdutos.idImagensProdutos, ImagensProdutos.caminhoImagem FROM Produtos as p INNER JOIN ImagensProdutos ON p.idProdutos = ImagensProdutos.idProdutos order by p.dataLancamento DESC" , function (err, rows) {
                    if (err)
                        res.json({ status: 'ERRO', data: "TEste1" });
                    else
                        res.json({ status: 'OK', data: rows });
                });
                if (err)
                    res.json({ status: 'ERRO', data: "TESTE2" });
            });
        }

        else{

            req.getConnection(function (err, connection) {
                 
                 connection.query("SELECT p.nome, p.idProdutos, p.precoAtual,i.idImagensProdutos, i.caminhoImagem FROM Produtos as p INNER JOIN ImagensProdutos i ON p.idProdutos = i.idProdutos ORDER BY " + ordem, function (err, rows) {
                     if (err)
                         res.json({ status: 'ERRO', data: "TEste3" });
                     else
                         res.json({ status: 'OK', data: rows });
                 });
                 if (err)
                     res.json({ status: 'ERRO', data: "TESTE2" });
             });
         }
    }



});

router.get('/lerProduto', function (req, res, next) {
    var id = req.query.id;
    console.log(id);
    req.getConnection(function (err, connection) {
        connection.query('SELECT p.nome, p.idProdutos, p.precoAtual, p.descricao, i.idImagensProdutos, i.caminhoImagem, Categoria.nome as categoriaProduto FROM Produtos as p INNER JOIN ImagensProdutos i ON p.idProdutos = i.idProdutos  and p.idProdutos = ? INNER JOIN Categoria ON p.idCategoria = Categoria.idCategoria', id, function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            //console.log("PUDIM@");    
            res.json({ status: 'OK', data: rows });
        });
        if (err)
            res.json({ status: 'ERRO', data: err });
    });
});


router.post('/finalizaCompra', function (req, res, next) {
    if (req.session.logado) {
        var produtos = JSON.parse(req.query.teste);
        var dados = req.body;
        //console.log(produtos);
        //console.log(dados);
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO Compras SET valorDaCompra = ?, idUsuario = ?', [dados.valor, dados.id], function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: "Erro pq nao esta logado" });
                else{
                    
                    /*for(var i = 0; i < produtos.length; i++){
                        req.getConnection(function (err, connection) {
                            console.log("Teste " + rows.insertId, produtos[i].idProd, produtos[i].valor, produtos[i].qntd);
                            connection.query('INSERT INTO ProdutosComprados SET idCompras = ?, idProdutos = ?, valorTotal = ?, quantidadeComprada = ? ', [rows.insertId, produtos[i].idProd, produtos[i].valor, produtos[i].qntd] , function (err, rows) {
                                if (err){
                                    console.log("PUDIM#");  
                                    res.json({ status: 'ERRO', data: "err1" });
                                }
                                else{
                                console.log("PUDIM@");    
                                res.json({ status: 'OK', data: "Compra Finalizada com sucesso!" });
                                }
                                
                            });
                            if (err)
                                res.json({ status: 'ERRO', data: "err2" });
                        });
                    }*/
                    var i = 0;
                    var aux = 0;
                    do {
                        req.getConnection(function (err, connection) {
                            console.log("Teste " + rows.insertId, produtos[i].idProd, produtos[i].valor, produtos[i].qntd);
                            connection.query('INSERT INTO ProdutosComprados SET idCompras = ?, idProdutos = ?, valorTotal = ?, quantidadeComprada = ? ', [rows.insertId, produtos[i].idProd, produtos[i].valor, produtos[i].qntd] , function (err, rows) {
                                if (err){
                                    console.log("PUDIM#");  
                                    res.json({ status: 'ERRO', data: "err1" });
                                }
                                else{
                                console.log("PUDIM@");    
                                }
                                
                            });
                            if (err)
                                res.json({ status: 'ERRO', data: "err2" });
                        });
                        i++;
                        //console.log("teste 2 " + i + aux);
                    }while(i < produtos.length)
                    res.json({ status: 'OK', data: "Compra Finalizada com sucesso! " + i   });
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
