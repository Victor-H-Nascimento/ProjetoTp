function loginUsuario() {
    var form = document.formLogin;
    var input = {
        login: form.login.value,
        senha: form.senha.value
    };

    $.ajax({
        url: '/acesso/login',
        dataType: 'json',
        type: 'post',
        data: input,
        error: function (dados) {
            alert('Erro: 1' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            else {
                console.log(dados.data.idUsuarios);
                insereLocalStorage(dados.data);
                alert('Logado com sucesso!');
                colocarUsuario();
                //window.location.href = '/index.html';

                $.ajax({//cria um carrinho para o cliente qnd ele loga
                    url: '/acesso/criaCarrinho?id=' + dados.data.idUsuarios,
                    dataType: 'json',
                    type: 'post',
                    error: function (dados) {
                        alert('Erro em criar o carrinho 1 '  + dados.data);
                    },
                    success: function (dados) {
                        if (dados.status === 'SEMACESSO')
                            alert('Erro: 2 ' + dados.data);
                        else {
                              alert(dados.data);
                              $.ajax({//idCarrinho para pegar o id do carrinho do usuario
                                url: '/acesso/idCarrinho',
                                dataType: 'json',
                                error: function (dados) {
                                    alert('Erro em criar o carrinho 2 ' + dados.data);
                                },
                                success: function (dados) {
                                    if (dados.status === 'SEMACESSO')
                                        alert('Erro: 2 ' + dados.data);
                                    else {
                                          console.log(dados.data[0].id);
                                        window.localStorage.idCompras = dados.data[0].id;
                                          
                                    }
                                }
                            });
                        
            
            
                        }
                    }
                });
            }
        }
    });
}

/**/

function  insereLocalStorage(dados) {
    //localStorage
    //console.log(dados);
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
        var dados = '<h3>Olá,'+ window.localStorage.getItem("usuario") +'</h3>';
        document.getElementById('nomeUsuario').innerHTML = dados;
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
                window.localStorage.clear();
                window.location.href = '/index.html';

                
            
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



function criaCarrinho(){
    console.log(window.localStorage.getItem("id"));
    $.ajax({//cria um carrinho para o cliente qnd ele loga
        url: '/produtos/criaCarrinho?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        type: 'post',
        error: function (dados) {
            alert('Erro em criar o carrinho 1 '  + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                  alert(dados.data);
                 $.ajax({//idCarrinho para pegar o id do carrinho do usuario
                    url: '/produtos/idCarrinho',
                    dataType: 'json',
                    error: function (dados) {
                        alert('Erro em criar o carrinho 2 ' + dados.data);
                    },
                    success: function (dados) {
                        if (dados.status === 'SEMACESSO')
                            alert('Erro: 2 ' + dados.data);
                        else {
                              console.log(dados.data[0].id);
                            window.localStorage.idCompras = dados.data[0].id;
                              
                        }
                    }
                });
            


            }
        }
    });

   
}
