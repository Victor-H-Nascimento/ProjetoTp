
    
    



/*
Código retirado de:

http://viacep.com.br/exemplo/jquery/
*/

function preencheCEP(){

 var cepPar = document.getElementById('cep').value;
 
 //Nova variável "cep" somente com dígitos.
 var cep = cepPar.replace(/\D/g, '');


 //Verifica se campo cep possui valor informado.
 if (cep != "") {

     //Expressão regular para validar o CEP.
     var validacep = /^[0-9]{8}$/;

     //Valida o formato do CEP.
     if (validacep.test(cep)) {

         //Preenche os campos com "..." enquanto consulta webservice.
         $("#rua").val("...");
         $("#bairro").val("...");
         $("#cidade").val("...");
         $("#uf").val("...");


         //Consulta o webservice viacep.com.br/
         $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

             if (!("erro" in dados)) {
                 //Atualiza os campos com os valores da consulta.
                 $("#rua").val(dados.logradouro);
                 $("#bairro").val(dados.bairro);
                 $("#cidade").val(dados.localidade);
                 $("#uf").val(dados.uf);

             } //end if.
             else {
                 //CEP pesquisado não foi encontrado.
                 limpa_formulário_cep();
                 alert("CEP não encontrado.");
             }
         });
     } //end if.
     else {
         //cep é inválido.
         limpa_formulário_cep();
         alert("Formato de CEP inválido.");
     }
 } //end if.
 else {
     //cep sem valor, limpa formulário.
     limpa_formulário_cep();
 }
}

function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");

}



//Verifica nível da senha        

/* 
Retirado de:
https://pt.stackoverflow.com/questions/105637/como-criar-uma-progressbar-animada-para-informar-a-for%C3%A7a-da-senha

*/

$(function () {

    $('input').on('keyup', function () {

        // Obtém a quantidade de caracteres do valor inserido no input.
        var length = $(senha).val().length;

        // Por padrão, o texto será 'Força da senha', caso a quantidade
        // de caracteres seja menor que 1.
        var title = '';
        if (length > 0) {
            if (length <= 4)
                title = 'Senha Fraca';

            else if (length > 4 && length < 10)
                title = 'Senha Média';

            else
                title = 'Senha Forte';
        }

        // Altera o atributo título com a palavra que identifica força da senha.
        $('.password-strength').attr('title', title);
    });

});


//Botao pra mostrar/esconder senha
/*
Retirado de:
http://www.kadunew.com/blog/html/botao-mostrar-ou-ocultar-senha
*/



function mostrarEsconderSenha()
{

    // Get the password field
    var passwordField = document.getElementById("senha");
    var confirmPasswordField = document.getElementById("confirmaSenha");
    alert("Entrou aqui");


    // Get the current type of the password field will be password or text
    var passwordFieldType = passwordField.attr('type');
    var confirmPasswordFieldType = confirmPasswordField.attr('type');

    // Check to see if the type is a password field
    if (passwordFieldType == 'password') {
        // Change the password field to text
        passwordField.attr('type', 'text');

        // Change the Text on the show password button to Hide
        $(this).val('Esconder senha');
    } else {
        // If the password field type is not a password field then set it to password
        passwordField.attr('type', 'password');

        // Change the value of the show password button to Show
        $(this).val('Mostrar senha');
    }

    if (confirmPasswordFieldType == 'password') {
        // Change the password field to text
        confirmPasswordField.attr('type', 'text');

        // Change the Text on the show password button to Hide
        $(this).val('Esconder senha');
    } else {
        // If the password field type is not a password field then set it to password
        confirmPasswordField.attr('type', 'password');

        // Change the value of the show password button to Show
        $(this).val('Mostrar senha');
    }


}


/*
//Mostrar e Esconder senha
$(document).ready(function () {

    // Click event of the showPassword button
    $('#mostrarSenha').on('click', function () {

        // Get the password field
        var passwordField = $('#senha');
        var confirmPasswordField = $('#confirmaSenha');


        // Get the current type of the password field will be password or text
        var passwordFieldType = passwordField.attr('type');
        var confirmPasswordFieldType = confirmPasswordField.attr('type');

        // Check to see if the type is a password field
        if (passwordFieldType == 'password') {
            // Change the password field to text
            passwordField.attr('type', 'text');

            // Change the Text on the show password button to Hide
            $(this).val('Esconder senha');
        } else {
            // If the password field type is not a password field then set it to password
            passwordField.attr('type', 'password');

            // Change the value of the show password button to Show
            $(this).val('Mostrar senha');
        }

        if (confirmPasswordFieldType == 'password') {
            // Change the password field to text
            confirmPasswordField.attr('type', 'text');

            // Change the Text on the show password button to Hide
            $(this).val('Esconder senha');
        } else {
            // If the password field type is not a password field then set it to password
            confirmPasswordField.attr('type', 'password');

            // Change the value of the show password button to Show
            $(this).val('Mostrar senha');
        }


    });
});*/

//comparar se as senhas sao iguais
function testaSenha(){
    var senha1 = document.formCliente.senha.value;
    var confirmaSenha1 = document.formCliente.confirmaSenha.value;

    if(senha1 == confirmaSenha1){
        console.log("Senhas iguais");
        document.getElementById("confirmaSenha").classList.remove("errado");
        document.getElementById("confirmaSenha").classList.add('correta');
    }
    else{
        console.log("Senhas Diferentes");
        document.getElementById("confirmaSenha").classList.remove("correta");
        document.getElementById("confirmaSenha").classList.add('errado');
    }
    
}


//verificar se o usuario esta logado para mostrar login/logout

function verificaLogin(){
    if(window.localStorage.getItem("id") != null){//usuário logado
        var login = document.getElementById("botaoLogin");
        login.style.visibility = "hidden";
        var logout = document.getElementById("botaoLogout");
        logout.style.visibility = "visible";
        logout.style.bottom = "50px";
        logout.style.position = "relative";
        colocarUsuario();
    } 
    else{   //não logado
        var login = document.getElementById("botaoLogin");
        login.style.visibility = "visible";
        var logout = document.getElementById("botaoLogout");
        logout.style.visibility = "hidden";
    }
}

//Login novo

function openwindow() {
    window.open("login.html", "Login", "menubar=no,top=100,left=500,resizable=no,width=350,height=350");
}

function abrePopUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function teste() {
    abrePopUp();
    window.open("checkout.html", "_self");
}

function abrePopUp1() {
    var popup = document.getElementById("myPopUp1");
    popup.classList.toggle("show");
}


function trocaPagina() {
    abrePopUp1();
    window.open("carrinho.html", "_self");
}

