
function exibeClientes(clientes) {
    for (var i = 0; i < clientes.length; i++) {
        var cliente = clientes[i];
        var dadosCliente = '<div id ="' + cliente.id + ' ">' +
            'ID:' + cliente.id +
            '<br>Nome: ' + cliente.nome +
            '<br>Endereço: ' + cliente.endereco +
            '<br>Telefone: ' + cliente.telefone +
            '<br>Email: ' + cliente.email +
            '<br><a href="#" onClick="deletaCliente(' + cliente.id + ')">Excluir / </a>' +
            '<a href="insereCliente.html?id=' + cliente.id + ' ">Alterar </a>' +
            '</div>';
        document.getElementById('result').innerHTML += dadosCliente + '<br><br>';
    }
}

function deletaCliente(id) {
    $.ajax({
        url: '/cliente/deleta?id=' + id,
        dataType: 'json',
        type: 'post',
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: pudim' + dados.data);
            else {
                alert(dados.data);
                var divResult = document.getElementById('result');
                divResult.removeChild(document.getElementById(id));
            }
        }
    });
}


function salvaCliente() {
    var form = document.formCliente;
    var input = {
        usuario: form.usuario.value,
        senha: form.senha.value,
        //nome: form.nome.value,
        nome: "batata",
        celular: form.celular.value,
        CPF: form.CPF.value,
        rua: form.rua.value,
        numero: form.numeroCasa.value,
        complemento: form.complemento.value,
        CEP: form.cep.value,
        bairro: form.bairro.value,
        cidade: form.cidade.value,
        estado: form.uf.value,
        email: form.email.value,
        dataNascimento: "08/03/1997"
        //dataNascimento: form.dataNascimento.value
    };

    var param = new URLSearchParams
        (window.location.search);
        var urlAcao ;
    if (param.has('id')) {
        urlAcao = '/cliente/altera?id=' + param.get('id');
    }
    else{
        alert("Entrou aqui!");
        urlAcao = '/cliente/insere';
    }

    $.ajax({
        url: urlAcao,
        dataType: 'json',
        type: 'post',
        data: input,
        error: function (dados) {
            alert('Erro: em salvar ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro:' + dados.data);
            else {
                alert(dados.data);
                window.location.href ='/index.html'
            }
        }
    });
}

function alterarCliente(id) {

    var param = new URLSearchParams
        (window.location.search);

    if (param.has('id')) {
        $(document).ready(function () {
            $.ajax({
                url: '/cliente/listaCliente?id=' + param.get('id'),
                dataType: 'json',
                error: function (dados) {
                    alert('Erro: ' + dados.data);
                },
                success: function (dados) {
                    if (dados.status === 'ERRO')
                        alert('Erro: ' + dados.data);
                        else {
                            var form = document.formCliente;
                            console.log(dados.data[0]);
                            form.usuario.value = dados.data[0].usuario;
                            form.senha.value = dados.data[0].senha;
                            form.nome.value = dados.data[0].nome;
                            form.endereco.value = dados.data[0].endereco;
                            form.telefone.value = dados.data[0].telefone;
                            form.celular.value = dados.data[0].celular;
                            form.CPF.value = dados.data[0].CPF;
                            form.rua.value = dados.data[0].rua;
                            form.numero.value = dados.data[0].numero;
                            form.complemento.value = dados.data[0].complemento;
                            form.cep.value = dados.data[0].CEP;
                            form.bairro.value = dados.data[0].bairro;
                            form.cidade.value = dados.data[0].cidade;
                            form.estado.value = dados.data[0].estado;
                            form.email.value = dados.data[0].email;
                            form.dataNascimento.value = dados.data[0].dataNascimento;
                        }
                }
            });
        });

    }
}