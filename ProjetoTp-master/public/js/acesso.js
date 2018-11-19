function loginUsuario() {

    var form = document.formLogin;
    var input = {
        login: form.login.value,
        senha: form.senha.value
    };
    console.log(input);
    $.ajax({
        url: '/acesso/login',
        type: 'post',
        data: input,
        error: function (dados) {
            alert('Erro: 1' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            else {
                insereLocalStorage(input);
                alert(dados.data);
                
                window.location.href = '/index.html';
            }
        }
    });
}

function  insereLocalStorage(dados) {
    //localStorage
    if (window.localStorage.nome= dados.login) {
        console.log('O browser suporta localStorage');
    } else {
        console.log('O browser NÃO suporta localStorage');
    }
}

function colocarUsuario() {
    if (window.localStorage) {
        var dados = '<h1>Olá,'+ window.localStorage.getItem("nome") +'</h1>';
        document.getElementById('login').innerHTML = dados;
    }
}

function logoutUsuario() {
    $.ajax({
        url: '/acesso/logout',
        type: 'post',
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            else {
                retiraLocalStorage();
                retiraUsuario();
                alert(dados.data);
                window.location.href = '/index.html';
            }
        }
    });
}

function retiraUsuario() {
    if (!window.localStorage) {
        var dados = '<h1></h1>';
        document.getElementById('login').innerHTML = null;
    }
}

function  retiraLocalStorage() {
    //localStorage
    if (window.localStorage.clear()) {
        console.log('O browser suporta localStorage');
    } else {
        console.log('O browser NÃO suporta localStorage');
    }
}