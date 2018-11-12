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
                    req.session.logado = true;
                    req.session.login =
                        rows[0].login;
                    res.json({
                        status: 'OK', data:
                            'Logado com sucesso!'
                    });
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
module.exports = router;