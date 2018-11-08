function loginUsuario() {
    var form = document.formLogin;
    var input = {
        login: form.login.value,
        senha: form.senha.value
    };

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
                alert(dados.data);
                window.location.href = '/listaCliente.html';
            }
        }
    });
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
                alert(dados.data);
                window.location.href = '/login.html';
            }
        }
    });    
} 