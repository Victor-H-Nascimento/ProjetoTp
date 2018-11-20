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
                        console.log(rows[0]);
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

router.post('/criaCarrinho', function (req, res, next) {
    if (req.session.logado) {
        var id = req.query.id;
        //console.log("PUDIM 3 " + id)
        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO Compras (idUsuario) VALUES (?)', id, function (err, rows) {
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
module.exports = router;