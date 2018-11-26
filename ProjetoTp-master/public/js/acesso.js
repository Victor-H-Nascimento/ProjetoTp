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
                var spl = dados.data.nome.split(' ');
                window.localStorage.nome = spl[0];
                window.localStorage.usuario = dados.data.usuario;
                window.localStorage.id = dados.data.idUsuarios;
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

    '<div class="formataPerfil">' +
    '<form id="formRedefineSenha" name="formRedefineSenha" action="#" method="post">' +
    '<div class="col-md-6 mb-3">' +

    '<input type="password" name="senhaAtual" class="form-control" id="senhaAtual" value="" placeholder="Digite sua senha atual" required ></input>' +
    '<input type="password" name="novaSenha" class="form-control" id="novaSenha" value="" placeholder="Digite sua nova senha" required ></input>' +
    '<input type="password" name="confirmaNovaSenha" class="form-control" id="confirmaNovaSenha" value="" placeholder="Confirme sua nova senha" required ></input>' +
    '</div>' +
    '</form>' +

    '<input type="button" class="button formataPerfilButton" name="redefineSenha" value="Redefinir Senha" onClick="redefineSenhaNoBD();"></input>' +

    '</div>';

    document.getElementById('perfilPagina').innerHTML = dadosRedefinir;

}

function redefineSenhaNoBD() {
    var senhaNova = document.formRedefineSenha.novaSenha.value;
    var confirmaSenhaNova = document.formRedefineSenha.confirmaNovaSenha.value;
    var senhaAtual = document.formRedefineSenha.senhaAtual.value;

    console.log(senhaAtual);
    console.log(senhaNova);
    console.log(confirmaSenhaNova);


    if (senhaNova === confirmaSenhaNova) {
        console.log(window.localStorage.getItem("id"));

        $.ajax({//pega senha atual do usuario
            url: '/acesso/pegaSenha?id=' + window.localStorage.getItem("id"),
            dataType: 'json',
            error: function (dados) {
                alert('Erro em redefinir senha ' + dados.data);
            },
            success: function (dados) {
                if (dados.status === 'SEMACESSO')
                    alert('Erro: 2 ' + dados.data);
                else {
                    console.log(dados.data[0]);
                    if (dados.data[0].senha != senhaNova && dados.data[0].senha == senhaAtual) {
                        var dadosSenha = ({
                            id: window.localStorage.getItem("id"),
                            senha: senhaNova
                        });

                        console.log(dadosSenha);
                        $.ajax({//SAlva a senha nova 
                            url: '/acesso/alteraSenha',
                            dataType: "json",
                            type: 'post',
                            data: dadosSenha,
                            error: function (dados) {
                                alert('Erro em redefinir senha' + dados.data);
                            },
                            success: function (dados) {
                                if (dados.status === 'ERRO')
                                    alert('Erro: ' + dados.data);
                                else {
                                    alert(dados.data);
                                    window.location.href = '/perfil.html';
                                }
                            }
                        });
                    }

                    else {
                        alert("Senha atual incorreta!");
                    }
                }
            }
        });
    }

    else {
        alert("Senha Nova e Confimação de Senha Nova não são iguais")
    }
}



function historicoCompra(id) {

    //limpar página, para nao exibir em cima de outros dados
    //no bd, retornar quantas compras um usuario fez
    //fazer loop e printar cada uma das compras, contendo itens comprados e valor pago


    var dadosHistorico =

    '<div class="formataPerfil">' +

    '<h1>DADOS HISTORICO</h1>' +

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

    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/acesso/lerDadosPessoais?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        error: function (dados) {
            alert('Erro em ler dados pessoais ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                console.log(dados.data[0]);
                var d = new Date(dados.data[0].dataNascimento);
                console.log(d);

                var dadosPessoais =
                '<form id="formDadosPessoais" name="formDadosPessoais" action="#" method="post">' +
                '<div class="formataPerfil">' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="usuario" class="form-control" id="usuario" value="' + dados.data[0].usuario + '" placeholder="Usuário" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="nome" class="form-control" id="nome" value="' + dados.data[0].nome + '" placeholder="Nome Completo" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="date" name="dataNascimento" class="form-control" id="dataNascimento" value="'+dados.data[0].dataNascimento+'" placeholder="Data de Nascimento" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="celular" class="form-control" id="celular" value="' + dados.data[0].celular + '" placeholder="Celular" >' +
                '</div>' +


                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="CPF" class="form-control" id="CPF" value="' + dados.data[0].CPF + '" placeholder="CPF" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="email" name="email" class="form-control" id="email" placeholder="Email" value="' + dados.data[0].email + '" >' +
                '</div>' +

                '<input type="button" class="button formataPerfilButton" name="alteraDadosPessoais" value="Alterar" onClick="alteraDadosPessoaisNoBD();"></input>' +

                '</div>' +
                '</form>';

                document.getElementById('perfilPagina').innerHTML = dadosPessoais;
            }
        }
    });
}

function alteraDadosPessoaisNoBD() {
    var salvarDadosPessoais = ({
        id: window.localStorage.getItem("id"),
        usuario: document.formDadosPessoais.usuario.value,
        nome: document.formDadosPessoais.nome.value,
        dataNascimento: document.formDadosPessoais.dataNascimento.value,
        celular: document.formDadosPessoais.celular.value,
        cpf: document.formDadosPessoais.CPF.value,
        email: document.formDadosPessoais.email.value
    }); 
    console.log(salvarDadosPessoais);

    $.ajax({//salva dados alterados do cliente
        url: '/acesso/salvarDadosPessoais',
        dataType: 'json',
        type: 'post',
        data: salvarDadosPessoais,
        error: function (dados) {
            alert('Erro em alterar dados pessoais ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                alert(dados.data);
            }
        }
    });
}

function alterarDadosEntrega(id) {
    //limpar página, para nao exibir em cima de outros dados
    //através do id, recuperar dados pessoais: cep,rua,numero,bairro,complemento,cidade,estado.
    //criar variavel mudanças e inicializá-la com 0
    //colocar todos os dados em um form e disponibiliza-los para o usuario altera-los, se quiser
    //se algum dado for alterado, variavel mudanca fica diferente de 0
    //disponibilizar botao ALTERAR que so estara disponivel se mudanca !=0
    //quando cliente clicar no batao, fazer respectivas alterações no bd  

    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/acesso/lerDadosEntrega?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        error: function (dados) {
            alert('Erro em ler dados pessoais ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO') {
                alert('Erro: 2 ' + dados.data);
            }
            else {
                var dadosEntrega =

                '<div class="formataPerfil">' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="cep" class="form-control" id="cep" value="' + dados.data[0].CEP + '" placeholder="CEP" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="rua" class="form-control" id="rua" value="' + dados.data[0].rua + '" placeholder="Rua" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="numeroCasa" class="form-control" id="numeroCasa" value="' + dados.data[0].numero + '" placeholder="Número" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="complemento" class="form-control" id="complemento" value="' + dados.data[0].complemento + '" placeholder="Complemento" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="bairro" class="form-control" id="bairro" value="' + dados.data[0].bairro + '" placeholder="Bairro" >' +
                '</div>' +

                ' <div class="col-md-6 mb-3">' +
                '<input type="text" name="cidade" class="form-control" id="cidade" value="' + dados.data[0].cidade + '" placeholder="Cidade" >' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="uf" class="form-control" id="uf" value="' + dados.data[0].estado + '" placeholder="UF" >' +
                '</div>' +

                '<input type="button" class="button formataPerfilButton" name="alteraDadosEntrega" value="Alterar" onClick="alteraDadosEntregaNoBD();"></input>' +
                '</div>';

                document.getElementById('perfilPagina').innerHTML = dadosEntrega;
            }
        }
    });
}

function alteraDadosEntregaNoBD() { 
    var salvarDadosEntrega = ({ 
        id: window.localStorage.getItem("id"),
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        numero: document.getElementById("numeroCasa").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("uf").value
    });

    console.log(salvarDadosEntrega);

    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/acesso/salvarDadosEntregaNoBD',
        dataType: 'json',
        type: 'post',
        data: salvarDadosEntrega,
        error: function (dados) {
            alert('Erro em alterar dados pessoais ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                alert(dados.data);
            }
        }
    });
}

function exibirDados() {

    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/acesso/lerDadosPessoais?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        error: function (dados) {
            alert('Erro em ler dados pessoais ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {

                console.log(dados.data[0]);
                var d = new Date(dados.data[0].dataNascimento);
                console.log(d);

                var todosDados =

                '<div>' +


                '<form id="formDados" name="formDados" action="#" method="post">' +
                '<div class="row">' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="usuario" class="form-control" id="usuario" value="" placeholder="Usuário: ' + dados.data[0].usuario + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="nome" class="form-control" id="nome" value="" placeholder="Nome Completo: ' + dados.data[0].nome + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="date" name="dataNascimento" class="form-control" id="dataNascimento" value="" placeholder="Data de Nascimento: ' + dados.data[0].dataNascimento + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="celular" class="form-control" id="celular" value="" placeholder="Celular: ' + dados.data[0].celular + '" disabled>' +
                '</div>' +


                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="CPF" class="form-control" id="CPF" value="" placeholder="CPF: ' + dados.data[0].CPF + '" disabled>' +
                '</div>' +


                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="cep" class="form-control" id="cep" value="" placeholder="CEP: ' + dados.data[0].CEP + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="rua" class="form-control" id="rua" value="" placeholder="Rua: ' + dados.data[0].rua + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="numeroCasa" class="form-control" id="numeroCasa" value="" placeholder="Número: ' + dados.data[0].nuemro + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="complemento" class="form-control" id="complemento" value="" placeholder="Complemento: ' + dados.data[0].complemento + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="bairro" class="form-control" id="bairro" value="" placeholder="Bairro: ' + dados.data[0].bairro + '" disabled>' +
                '</div>' +

                ' <div class="col-md-6 mb-3">' +
                '<input type="text" name="cidade" class="form-control" id="cidade" value="" placeholder="Cidade: ' + dados.data[0].cidade + '" disabled>' +
                '</div>' +

                '<div class="col-md-6 mb-3">' +
                '<input type="text" name="uf" class="form-control" id="uf" value="" placeholder="UF: ' + dados.data[0].estado + '" disabled>' +
                '</div>' +

                '<div class="col-12 mb-3">' +
                '<input type="email" name="email" class="form-control" id="email" placeholder="Email: ' + dados.data[0].email+ '" value="" disabled>' +
                '</div>' +

                '</div>' +
                '</form>' +

                '</div>';

                document.getElementById('perfilPagina').innerHTML = todosDados;
            }
        }
    });
}

function historicoCompra(id) {
    $.ajax ({
        url: '/acesso/exibirHistoricoCompras?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        error: function (dados) {
            alert('Erro em ler historico de compras ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                exibeHistorico(dados.data);
            }
        }
    });
}

function exibeHistorico(dados) {
    console.log(dados);
    for(var i = 0; i < dados.length; i++){

        var dadosHistoricoCompras = 

        '<div class="formataPerfil">' +

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="notaFiscal" class="form-control" id="notaFiscal" value="" placeholder="Nota Fiscal: ' + dados[i].notaFiscal + '" >' +
        '</div>' +

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="dataCompra" class="form-control" id="dataCompra" value="" placeholder="Data da compra: ' + dados[i].dataCompra + '" >' +
        '</div>' +

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="valorTotal" class="form-control" id="valorTotal" value="" placeholder="Valor Total: ' + dados[i].valorTotal + '" >' +
        '</div>' +

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="frete" class="form-control" id="frete" value="" placeholder="Frete: ' + dados[i].frete + '" >' +
        '</div>' +

        '<div class="col-md-6 mb-3">' +
        '<input type="text" name="percentualDesconto" class="form-control" id="percentualDesconto" value="" placeholder="Percentual Desconto: ' + dados[i].percentualDesconto + '" >' +
        '</div>' +

        ' <div class="col-md-6 mb-3">' +
        '<input type="text" name="valorDaCompra" class="form-control" id="valorDaCompra" value="" placeholder="Valor da Compra: ' + dados[i].valorDaCompra + '" >' +
        '</div>' +

        '</div>';

        document.getElementById('perfilPagina').innerHTML = dadosHistoricoCompras;
    }   
}










