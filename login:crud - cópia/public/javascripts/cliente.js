
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
        nome: form.nome.value,
        endereco: form.endereco.value,
        email: form.email.value,
        telefone: form.telefone.value
    };

    var param = new URLSearchParams
        (window.location.search);
        var urlAcao ;
    if (param.has('id')) {
        urlAcao = '/cliente/altera?id=' + param.get('id');
    }
    else{
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
                window.location.href ='/listaCliente.html'
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
                        form.nome.value = dados.data[0].nome;
                        form.endereco.value = dados.data[0].endereco;
                        form.telefone.value = dados.data[0].telefone;
                        form.email.value = dados.data[0].email;
                    }
                }
            });
        });

    }
    /*$(document).ready(function () {
        //console.log(document);
        $.ajax({
            url: '/cliente/altera?id=' + id,
            dataType: 'json',
            error: function (dados) {
                alert('Erro: ' + dados.data);
            },
            success: function (dados) {
                if (dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                else {
                    //console.log(id);
                   // window.location.href = '/alteraCliente.html';
                    var dadosCliente = '<div id ="' + dados.data[0].id + '">' +
                        '<form name="formCliente" method="post" action="">'+
                        'ID:' + dados.data[0].id +
                        '<br>Nome: <br><input type="text" name="nome" value="' + dados.data[0].nome + '" required></br> ' +
                        '<br>Endereço: <br><textarea name="endereco"   required cols="30" rows="5" >'+dados.data[0].endereco+'</textarea></br>' +
                        '<br>Telefone: <br><input type="text" name="email" value='+ dados.data[0].telefone +' required><br>' +                         '<br>Email: <br><input type="text" name="telefone" value='+ dados.data[0].email+' required><br><br>' +                         '<br><a href="#"  onClick="salvaAlteracao(' + dados.data[0].id + ')">Salvar / </a>' +
                        '<a href="#" value="cancela"> Cancelar<\a>' +
                        '</form>'+
                        '</div>';
                    document.getElementById(dados.data[0].id).innerHTML = dadosCliente + '<br><br>';

                }
            }
        });
    });*/
}

/*function salvaAlteracao(id) {
    var form = document.formCliente;
    var input = {
        id: id,
        name: form.nome.value,
        endereco: form.endereco.value,
        email: form.email.value,
        telefone: form.telefone.value
    };

    console.log(input);

    $.ajax({
        url: '/cliente/salvar',
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

            }
        }
    });

    //location.href ='/listaCliente.html';
}*/