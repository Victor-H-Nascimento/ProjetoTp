var express = require('express');
var router = express.Router();

/*router.get('/lista', function (req, res, next) {
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM cliente', function (err, rows) {
            if (err)
                res.json({ status: 'ERROR', data: err });
            res.json({ status: 'OK', data: rows });
        });
        if (err)
            res.json({ status: 'ERROR', data: err });
    });
});*/

router.get('/lista', function (req, res, next) {
    if (req.session.logado) {
        req.getConnection(function (err, connection) {
            connection.query("SELECT * FROM cliente", function (err, rows) {
                if (err)
                    res.json({ status: 'ERRO', data: + err });
                else
                    res.json({ status: 'OK', data: rows });
            });
            if (err)
                res.json({ status: 'ERRO', data: + err });
        });
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
    }
});


router.get('/listaCliente', function (req, res, next) {
    var id = req.query.id; 
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM cliente WHERE id=' + id, function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            console.log("PUDIM@");    
            res.json({ status: 'OK', data: rows });
        });
        if (err)
            res.json({ status: 'ERRO', data: err });
    });
});

router.post('/deleta', function (req, res, next) {
    var id = req.query.id;
    req.getConnection(function (err, connection) {
        connection.query('DELETE FROM cliente WHERE id =' + id, function (err, rows) {
            if (err) {
                res.json({ status: 'ERROR', data: err });
            }

            res.json({ status: 'OK', data: "Excluido com sucesso" });
        });
        if (err)
            res.json({ status: 'ERROR', data: err });
    });
});

router.post('/insere', function (req, res, next) {
    var input = req.body;
    console.log(input);
    req.getConnection(function (err, connection) {
        connection.query("INSERT INTO Usuarios SET ?", [input], function (err, rows) {
            if (err) {
                res.json({ status: 'ERROR', data: "Deu ruim pai!" });
            }
            res.json({ status: 'OK', data: "Inserido com sucesso" });
        });
    });
});


router.post('/altera', function (req, res, next) {
    var input = req.body;
    var id = req.query.id;
    console.log(input);
    req.getConnection(function (err, connection) {
        connection.query("UPDATE cliente SET ? WHERE id = ?", [input, id], function (err, rows) {
            if (err) {
                res.json({ status: 'ERROR', data: err });
            }
            res.json({ status: 'OK', data: "Alterado com sucesso" });
        });
    });
});

/*router.post('/salvar', function (req, res, next) {
    var input = req.body;
    req.getConnection(function (err, connection) {
        connection.query("UPDATE cliente SET nome = '" + input.name + "', endereco= '" + input.endereco + "', telefone = '" + input.telefone + "', email= '" + input.email + "' WHERE id =" + input.id, function (err, rows) {
            if (err) {
                //console.log();
                res.json({ status: 'ERROR', data: err });
            }
            res.json({ status: 'OK', data: "Alterado com sucesso" });
        });
    });
});*/

module.exports = router;
