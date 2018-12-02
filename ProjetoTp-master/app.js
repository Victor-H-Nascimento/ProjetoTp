var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressSession = require('express-session');
var SQLiteStore = require('connect-sqlite3')(expressSession);

var produtos = require('./routes/produtos');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cliente = require('./routes/cliente');
var acesso = require('./routes/acesso');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  store: new SQLiteStore,
  secret: 'chaveteste', // informar a chave de criptografia da sua session
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 semana
}));

var connection = require('express-myconnection');
var mysql = require('mysql');
app.use(
  connection(mysql, {
    host: 'sql10.freemysqlhosting.net', //servidor do banco mysql, se for local: localhost,
    user: 'sql10263444', //usuario com permissao de conexao a base de dados
    password: 'EtslXPiKK4', //senha de acesso ao banco
    port: 3306, //porta do mysql, normalmente 3306
    database: 'sql10263444' //nome da base de dados (esquema)
  }, 'pool')
);

app.use('/produtos', produtos);
app.use('/acesso', acesso);
app.use('/cliente', cliente);
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var expressSession = require('express-session');
var SQLiteStore = require('connect-sqlite3')(expressSession);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var connection = require('express-myconnection');
var mysql = require('mysql');

app.use(
  connection(mysql, {
    host: 'sql10.freemysqlhosting.net', //servidor do banco mysql, se for local: localhost,
    user: 'sql10262360', //usuario com permissao de conexao a base de dados
    password: 'gNZqWUtxdF', //senha de acesso ao banco
    port: 3306, //porta do mysql, normalmente 3306
    database: 'sql10262360' //nome da base de dados (esquema)
  }, 'pool')
);


var acesso = require('./routes/acesso');
app.use('/acesso', acesso);*/
/*------------------------------------------configuração session -------------------------------------------*/
/*app.use(expressSession({
  store: new SQLiteStore,
  secret: 'Pudim', // informar a chave de criptografia da sua session
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 semana
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/
