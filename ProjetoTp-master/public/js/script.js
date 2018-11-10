/*
Código retirado de:

http://viacep.com.br/exemplo/jquery/
*/

$(document).ready(function() {

            function limpa_formulário_cep() {
                // Limpa valores do formulário de cep.
                $("#rua").val("");
                $("#bairro").val("");
                $("#cidade").val("");
                $("#uf").val("");
               
            }
            
            //Quando o campo cep perde o foco.
            $("#cep").blur(function() {

                //Nova variável "cep" somente com dígitos.
                var cep = $(this).val().replace(/\D/g, '');

                //Verifica se campo cep possui valor informado.
                if (cep != "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
                        $("#rua").val("...");
                        $("#bairro").val("...");
                        $("#cidade").val("...");
                        $("#uf").val("...");
                       

                        //Consulta o webservice viacep.com.br/
                        $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

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
            });
        });



//Verifica nível da senha        

/* 
Retirado de:
https://pt.stackoverflow.com/questions/105637/como-criar-uma-progressbar-animada-para-informar-a-for%C3%A7a-da-senha

*/

$(function() {
  
    $('input').on('keyup', function() {
      
      // Obtém a quantidade de caracteres do valor inserido no input.
      var length = $(this).val().length;
  
      // Por padrão, o texto será 'Força da senha', caso a quantidade
      // de caracteres seja menor que 1.
      var title = '';
      if (length > 0) {
        if (length <= 2)
          title = 'Senha Fraca';
        
        else if (length > 2 && length < 8)
          title = 'Senha Média';
        
        else 
          title = 'Senha Forte';
      }
      
      // Altera o atributo título com a palavra que identifica força da senha.
      $('.password-strength').attr('title', title);
    });
    
  });