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
                console.log(dados.data[0]);
                insereLocalStorage(dados.data[0]);
                alert('Logado com sucesso!');
                window.location.href = '/index.html';
            }
        }
    });
}

function  insereLocalStorage(dados) {
    //localStorage
    console.log(dados);
    window.localStorage.usuario = dados.usuario;
    window.localStorage.id = dados.idUsuarios;
    window.localStorage.rua = dados.rua;
    window.localStorage.numero = dados.numero;
    window.localStorage.complento = dados.complemento ;
    window.localStorage.bairro = dados.bairro; 
    window.localStorage.cidade = dados.cidade;
    window.localStorage.estado = dados.estado;
    window.localStorage.cep = dados.CEP;
}

function colocarUsuario() {
    if (window.localStorage) {
        var dados = '<h1>Olá,'+ window.localStorage.getItem("usuario") +'</h1>';
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
                alert(dados.data);
                window.location.href = '/login.html';
            }
        }
    });    
} 
   

function retiraUsuario() {
    if (!window.localStorage) {
        var dados = '<h1>Faça o login</h1>';
        document.getElementById('login').innerHTML = dados;
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

function enderecoCarrinho(){

    var dadosEndereco = "";
    
    dadosEndereco = 
    '<h5>'
    +window.localStorage.getItem("rua") + ',' 
    +window.localStorage.getItem("numero") + ',' 
    +window.localStorage.getItem("cidade") + ',' 
    +window.localStorage.getItem("estado") + '</h5>';    
    console.log(dadosEndereco);
    document.getElementById("endereco").innerHTML = dadosEndereco;
}
