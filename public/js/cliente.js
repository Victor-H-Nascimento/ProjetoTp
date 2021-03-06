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
        nome: form.nome.value,
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
        dataNascimento: form.dataNascimento.value
    };

    var param = new URLSearchParams
        (window.location.search);
    var urlAcao;
    if (param.has('id')) {
        urlAcao = '/cliente/altera?id=' + param.get('id');
    }
    else {
        //alert("Entrou aqui!");
        console.log(input);
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
                //alert(dados.data);
                window.location.href = '/index.html'
            }
        }
    });
}

function confirmaSenhas() {
    var senha = document.formCliente.senha.value;
    var senhaConfirmacao = document.formCliente.confirmaSenha.value;

    if(senha != senhaConfirmacao){
        bordaVermelha();
        //  ou
        //  mostraMensagemDeValidacao();
    }
}

//  function mostraMensagemDeValidacao() {
//      innerHTML   "As senhas devem ser iguais"
//  }

function bordaVermelha() {
    document.getElementById("confirmaSenha").style.borderColor == "red";
}

function validaFormularioVazio(){
    var campoEstaVazio = false;
    var input = document.formCliente;

    if( input.usuario.value === "" || 
        input.senha.value === "" || 
        input.confirmaSenha.value === "" ||
        input.nome.value === "" ||
        input.dataNascimento.value === "" ||
        input.celular.value === "" ||
        input.CPF.value === "" ||
        input.cep.value === "" ||
        input.rua.value === "" ||
        input.numeroCasa.value === "" ||
        input.bairro.value === "" ||
        input.cidade.value === "" ||
        input.uf.value === "" ||
        input.email.value === ""
        ){
        campoEstaVazio = true;
    }

  verificaCampoEstaVazio(campoEstaVazio);
}

function verificaCampoEstaVazio(campoEstaVazio){
    if(campoEstaVazio){
        alert("Há campos obrigatório sem preencher");
    } else {
        salvaCliente();
    }
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

function resetaCliente() {

    var opcao = confirm("Deseja realmente limpar o formulario?");
    if (opcao === true) {
        document.getElementById("formCliente").reset();

    }
}

