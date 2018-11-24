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
				verificaLogin();
                //window.location.href = '/index.html';

                $.ajax({//cria um carrinho para o cliente qnd ele loga
                    url: '/acesso/criaCarrinho?id=' + dados.data.idUsuarios,
                    dataType: 'json',
                    type: 'post',
                    error: function (dados) {
                        alert('Erro em criar o carrinho 1 ' + dados.data);
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

function insereLocalStorage(dados) {
    //localStorage
    //console.log(dados);

    var spl = dados.nome.split(' ');
    window.localStorage.nome = spl[0];
    window.localStorage.usuario = dados.usuario;
    window.localStorage.id = dados.idUsuarios;
    window.localStorage.rua = dados.rua;
    window.localStorage.numero = dados.numero;
    window.localStorage.complento = dados.complemento;
    window.localStorage.bairro = dados.bairro;
    window.localStorage.cidade = dados.cidade;
    window.localStorage.estado = dados.estado;
    window.localStorage.cep = dados.CEP;
}

function colocarUsuario() {
    if (window.localStorage) {
        var dados = '<h2 class="nomeAposLogin">Olá,' + window.localStorage.getItem("nome") + '</h2>';
        document.getElementById('nomeUsuario').innerHTML = dados;
    }
}

function logoutUsuario() {
    //TEMOS QUE TIRAR PRIMEIRO OS PRODUTOSCOMPRADOS DPS COMPRAS 
    //PQ POSSUEM UMA DEPENDENCIA
    $.ajax({//tira a linha da tabela produtos comprados
        url: '/acesso/destroiProdutosComprados?id=' + window.localStorage.getItem("idCompras"),
        type: 'post',
        error: function (dados) {
            alert('Erro em logout' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: ' + dados.data);
            else {
                alert(dados.data);

                $.ajax({//tira a linha da tabela compras
                    url: '/acesso/destruirCompras?id=' + window.localStorage.getItem("idCompras"),
                    dataType: 'json',
                    type: 'post',
                    error: function (dados) {
                        alert('Erro em destruir compras ' + dados.data);
                    },
                    success: function (dados) {
                        if (dados.status === 'ERRO')
                            alert('Erro: ' + dados.data);
                        else {
                            alert(dados.data);

                            $.ajax({//ENCERRA A SESSAO DO USURIO
                                url: '/acesso/logout',
                                type: 'post',
                                error: function (dados) {
                                    alert('Erro em logout' + dados.data);
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
                    }
                });
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

function retiraLocalStorage() {
    //localStorage
    if (window.localStorage.clear()) {
        console.log('O browser suporta localStorage');
    } else {
        console.log('O browser NÃO suporta localStorage');
    }
}



function criaCarrinho() {
    console.log("Teste " + window.localStorage.getItem("id"));
    $.ajax({//cria um carrinho para o cliente qnd ele loga
        url: '/acesso/criaCarrinho?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        type: 'post',
        error: function (dados) {
            alert('Erro em criar o carrinho 1 ' + dados.data);
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
                            window.localStorage.compraFinalizada = false;

                        }
                    }
                });



            }
        }
    });


}

function redefinirSenha(id) {

//atraves do id, pegar a senha atual da pessoa
//exibir um formulario com 3 campos: senha atual, nova senha e confirmar nova senha
//a pessoa digita a senha atual e comparamos com a senha que buscamos atraves do id, se igual, prosseguir
//a pessoa digita a nova senha e depois confirma a nova senha. Comparamos se ambas são iguais, se sim, prosseguir
//comparamos a nova senha com a senha atual para evitar que a pessoa cadastra a senha que ela ja tem, se diferentes prosseguir
//um botao que inicialmente esta indisponivel se torna disponivel para clique
//ao clicar no botao, redefinimos a senha da pessoa no bd e mostramos a ela uma mensagem falando que a troca foi feita
//acontece o reload da pagina a fim de limpar a mesma e permitir que o usuario faça, se quiser, mais alteraçoes em seus dados.

var dadosRedefinir =

    '<div>'+
        '<form id="formRedefineSenha" name="formRedefineSenha" action="#" method="post">'+
           '<div class="col-md-6 mb-3">'+

                '<input type="password" name="senhaAtual" class="form-control" id="senhaAtual" value="" placeholder="Digite sua senha atual" required ></input>'+
                '<input type="password" name="novaSenha" class="form-control" id="novaSenha" value="" placeholder="Digite sua nova senha" required ></input>'+
                '<input type="password" name="confirmaNovaSenha" class="form-control" id="confirmaNovaSenha" value="" placeholder="Confirme sua nova senha" required ></input>'+
            '</div>'+
        '</form>'+

 '<input type="button" class="button" name="redefineSenha" value="Redefinir Senha" onClick="redefineSenhaNoBD();"></input>'+

    '</div>';

    document.getElementById('perfilPagina').innerHTML = dadosRedefinir;
}

function historicoCompra(id) {

    //limpar página, para nao exibir em cima de outros dados
    //no bd, retornar quantas compras um usuario fez
    //fazer loop e printar cada uma das compras, contendo itens comprados e valor pago
    
    
    var dadosHistorico =
    
    '<div>'+

        '<h1>DADOS HISTORICO</h1>'+
    
    '</div>';
        
    
        
        document.getElementById('perfilPagina').innerHTML = dadosHistorico;
}


function alterarDadosPessoais(id) {

    //limpar página, para nao exibir em cima de outros dados
    //através do id, recuperar dados pessoais: usuario,nome,data de nascimento,celular,CPF e email.
    //criar variavel mudanças e inicializá-la com 0
    //colocar todos os dados em um form e disponibiliza-los para o usuario altera-los, se quiser
    //se algum dado for alterado, variavel mudanca fica diferente de 0
    //disponibilizar botao ALTERAR que so estara disponivel se mudanca !=0
    //quando cliente clicar no batao, fazer respectivas alterações no bd  

    
    
    var dadosPessoais =
    
    '<div>'+

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="usuario" class="form-control" id="usuario" value="" placeholder="Usuário" >' +
        '</div>' +

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="nome" class="form-control" id="nome" value="" placeholder="Nome Completo" >' +
        '</div>' +

        '<div class="col-md-6 mb-3">' +
        '<input type="date" name="dataNascimento" class="form-control" id="dataNascimento" value="" placeholder="Data de Nascimento" >' +
        '</div>' +

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="celular" class="form-control" id="celular" value="" placeholder="Celular" >' +
        '</div>' +


        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="CPF" class="form-control" id="CPF" value="" placeholder="CPF" >' +
        '</div>' +     

        '<div class="col-12 mb-3">'+
        '<input type="email" name="email" class="form-control" id="email" placeholder="Email" value="" >'+
        '</div>'+

        '<input type="button" class="button" name="alteraDadosPessoais" value="Alterar" onClick="alteraDadosPessoaisNoBD();"></input>'+

    '</div>';
        
    
        
        document.getElementById('perfilPagina').innerHTML = dadosPessoais;
}

function alterarDadosEntrega(id) {

    //limpar página, para nao exibir em cima de outros dados
    //através do id, recuperar dados pessoais: cep,rua,numero,bairro,complemento,cidade,estado.
    //criar variavel mudanças e inicializá-la com 0
    //colocar todos os dados em um form e disponibiliza-los para o usuario altera-los, se quiser
    //se algum dado for alterado, variavel mudanca fica diferente de 0
    //disponibilizar botao ALTERAR que so estara disponivel se mudanca !=0
    //quando cliente clicar no batao, fazer respectivas alterações no bd  

    
    
    var dadosEntrega =
    
    '<div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="cep" class="form-control" id="cep" value="" placeholder="CEP" >'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="rua" class="form-control" id="rua" value="" placeholder="Rua" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="numeroCasa" class="form-control" id="numeroCasa" value="" placeholder="Número" >'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="complemento" class="form-control" id="complemento" value="" placeholder="Complemento" >'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="bairro" class="form-control" id="bairro" value="" placeholder="Bairro" disabled>'+
            '</div>'+

           ' <div class="col-md-6 mb-3">'+
                '<input type="text" name="cidade" class="form-control" id="cidade" value="" placeholder="Cidade" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="uf" class="form-control" id="uf" value="" placeholder="UF" disabled>'+
            '</div>'+

            '<input type="button" class="button" name="alteraDadosEntrega" value="Alterar" onClick="alteraDadosEntregaNoBD();"></input>'+

       
    '</div>';
        
    
        
        document.getElementById('perfilPagina').innerHTML = dadosEntrega;
}




function exibirDados() {
 
    var todosDados =
    
    '<div>'+

    
    '<form id="formDados" name="formDados" action="#" method="post">'+
        '<div class="row">'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="usuario" class="form-control" id="usuario" value="" placeholder="Usuário" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="nome" class="form-control" id="nome" value="" placeholder="Nome Completo" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="date" name="dataNascimento" class="form-control" id="dataNascimento" value="" placeholder="Data de Nascimento" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="celular" class="form-control" id="celular" value="" placeholder="Celular" disabled>'+
            '</div>'+


            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="CPF" class="form-control" id="CPF" value="" placeholder="CPF" disabled>'+
            '</div>'+


            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="cep" class="form-control" id="cep" value="" placeholder="CEP" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="rua" class="form-control" id="rua" value="" placeholder="Rua" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="numeroCasa" class="form-control" id="numeroCasa" value="" placeholder="Número" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="complemento" class="form-control" id="complemento" value="" placeholder="Complemento" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="bairro" class="form-control" id="bairro" value="" placeholder="Bairro" disabled>'+
            '</div>'+

           ' <div class="col-md-6 mb-3">'+
                '<input type="text" name="cidade" class="form-control" id="cidade" value="" placeholder="Cidade" disabled>'+
            '</div>'+

            '<div class="col-md-6 mb-3">'+
                '<input type="text" name="uf" class="form-control" id="uf" value="" placeholder="UF" disabled>'+
            '</div>'+

            '<div class="col-12 mb-3">'+
                '<input type="email" name="email" class="form-control" id="email" placeholder="Email" value="" disabled>'+
            '</div>'+

            '</div>'+
    '</form>'+
    
    '</div>';
        
    
        
        document.getElementById('perfilPagina').innerHTML = todosDados;
}