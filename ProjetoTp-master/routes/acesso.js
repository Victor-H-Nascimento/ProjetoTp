var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {

    var input = req.body;

    req.getConnection(function (err, connection) {
        var query = "SELECT * FROM Usuarios " +
            "WHERE usuario = '" + input.login + "' AND" + " senha = '" + input.senha + "'";
        connection.query(query, function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else {
                if (rows[0] === undefined)
                    res.json({
                        status: 'ERRO', data: 'Dados de login incorretos!'
                    });
                else {
                    if (rows[0] === undefined)
                        res.json({ status: 'ERRO', data: 'Dados de login incorretos!' });
                    else {
                        req.session.logado = true;
                        req.session.login = rows[0].login;
                        //console.log(rows[0]);
                        res.json({ status: 'OK', data:rows[0] });
                    }
                }
            }
        });
    });
});

router.post('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            res.json({ status: 'ERRO', data: + err });
        else
            res.json({ status: 'OK', data: 'Logout com sucesso!' });
    });
});

router.post('/destroiProdutosComprados', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        //console.log("PUDIM 7 " + id)
        req.getConnection(function (err, connection) {
            connection.query('DELETE FROM ProdutosComprados WHERE idCompras =' + id, function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: "ProdutosComprados apagados ..." });
            });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});


router.post('/destruirCompras', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        //console.log("PUDIM 6 " + id)
        req.getConnection(function (err, connection) {
            connection.query('DELETE FROM Compras WHERE idCompras =' + id, function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: "Compras apagada ..." });
            });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});//SELECT * FROM ProdutosComprados as p INNER JOIN Compras c ON c.idCompras = p.idCompras

router.post('/criaCarrinho', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        //console.log("PUDIM 6 " + id)
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO Compras SET idUsuario = '+ id, function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: "Deu Bom 2 ..." });
            });
            if (err)
                res.json({ status: 'ERRO', data: "Deu bom ..." });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

router.get('/idCarrinho', function (req, res, next) {
    if (req.session.logado) {
  
        req.getConnection(function (err, connection) {
            connection.query('SELECT LAST_INSERT_ID() as id', function (err, rows) {
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

+
router.post('/alteraSenha', function (req, res, next) {
    if (req.session.logado) {
        var input = req.body;
        console.log(input);
        req.getConnection(function (err, connection) {
            connection.query('UPDATE Usuarios SET senha = ? WHERE idUsuarios = ?',[input.senha, input.id], function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: "Senha alterada com sucesso!" });
            });
            if (err)
                res.json({ status: 'ERRO', data: rows });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

router.get('/pegaSenha', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        //console.log(id);
        req.getConnection(function (err, connection) {
            connection.query('SELECT senha FROM Usuarios WHERE idUsuarios = ' + id, function (err, rows) {                if (err)
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

router.get('/lerDadosPessoais', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        console.log(id);
        req.getConnection(function (err, connection) {
            connection.query('SELECT * FROM Usuarios WHERE idUsuarios = ' + id, function (err, rows) {                
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

router.post('/salvarDadosPessoais', function (req, res, next) {
    if (req.session.logado) {
        var input = req.body;
        console.log(input);
        req.getConnection(function (err, connection) {
            connection.query('UPDATE Usuarios SET usuario = ?, nome = ?, celular = ?, CPF = ?, email = ?, dataNascimento = ?  WHERE idUsuarios = ? ', [input.usuario,input.nome,input.celular,input.cpf,input.email,input.dataNascimento, input.id], function (err, rows) {                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: "Dados pessoais alteraos com sucesso!" });
            });
            if (err)
                res.json({ status: 'ERRO', data: rows });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

router.get('/lerDadosEntrega', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        console.log(id);
        req.getConnection(function (err, connection) {
            connection.query('SELECT * FROM Usuarios WHERE idUsuarios = ' + id, function (err, rows) {               
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

router.post('/salvarDadosEntregaNoBD', function (req, res, next) {
    if (req.session.logado) {
        var input = req.body;
        console.log(input);
        req.getConnection(function (err, connection) {
            connection.query('UPDATE Usuarios SET cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?  WHERE idUsuarios = ? ', [input.cep, input.rua, input.numero, input.complemento, input.cidade, input.bairro, input.estado, input.id], function (err, rows) {                if (err)
                    res.json({ status: 'ERRO', data: err });
                res.json({ status: 'OK', data: "Dados de entrega alterados com sucesso!" });
            });
            if (err)
                res.json({ status: 'ERRO', data: rows });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

router.get('/exibirHistoricoCompras', function (req, res, next) { 
    if (req.session.logado) {
        var id = req.query.id;
        console.log(id);
        req.getConnection(function (err, connection) {
            connection.query('SELECT * FROM Compras WHERE idUsuario = ' + id, function(err, rows) {
                if(err)
                    res.json({ status: 'ERRO', data: err});
                res.json({ status: 'OK', data: rows });
            });
            if(err)
                res.json({ status: 'ERRO', data: rows });
        });
    } else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

router.get('/exibirProdutosComprados', function (req, res, next) { 
    if (req.session.logado) {
        var id = req.query.id;
        req.getConnection(function (err, connection) {
            connection.query('SELECT * FROM ProdutosComprados WHERE idCompras = ' + id, function(err, rows) {
                if(err)
                    res.json({ status: 'ERRO', data: err});
                res.json({ status: 'OK', data: rows });
            });
            if(err)
                res.json({ status: 'ERRO', data: rows });
        });
    } else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});

module.exports = router;