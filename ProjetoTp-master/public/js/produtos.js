function exibeProdutos(produtos) {
    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i];
        var dadosProdutos =
        
        '<div class="single-products-catagory clearfix" id="'+ produto.idImagensProdutos +'">'+
                '<a href="detalheProduto.html?id='+ produto.idProdutos +'">'+
                    '<img src="' + produto.caminhoImagem + '">'+
                    '<div class="hover-content">'+
                        '<div class="line"></div>'+
                        '<p>R$'+produto.precoAtual+'</p>'+
                        '<h4>'+produto.nome+'</h4>'+
                    '</div>'+
                '</a>'+
        '</div>';
                    
       document.getElementById('result').innerHTML += dadosProdutos;
    }
}


function lerProduto(){
    var param = new URLSearchParams
        (window.location.search);
    //console.log(param);
        if (param.has('id')) {
            //$(document).ready(function () {
                $.ajax({
                    url: '/produtos/lerProduto?id=' + param.get('id'),
                    dataType: 'json',
                    error: function (dados) {
                        alert('Erro: 1 ' + dados.data);
                    },
                    success: function (dados) {
                        if (dados.status === 'ERRO')
                            alert('Erro: 2 ' + dados.data);
                        else {
                            window.sessionStorage.valorProduto = dados.data[0].precoAtual;
                          var dados =  '<div class="col-12 col-lg-7">'+
                        '<div class="single_product_thumb">'+
                            
                            '<div id="product_details_slider" class="carousel slide" data-ride="carousel">' +                                                     
                                '<div class="carousel-item active">'+
                                    '<a id="imagemProduto" class="gallery_img">'+
                                        '<img class="d-block w-100"   height="20em" src="'+ dados.data[0].caminhoImagem +'">'+
                                    '</a>'+
                                '</div>' +                               
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="col-12 col-lg-5">'+
                        '<div class="single_product_desc">'+
                            '<div class="product-meta-data">'+
                                '<div class="line"></div>'+
                                '<p id="preco-produto" class="product-price">'+ dados.data[0].nome +'</p>' +                                
                                '<p id="titulo-produto">R$ '+ dados.data[0].precoAtual +'</p>' +
                                '<p id="tempo-produto" class="avaibility"><i class="fa fa-circle"></i></p>'+
                            '</div>'+

                            '<div id="descricao-produtos" class="short_overview my-5">'+
                                '<p>Descrição: '+ dados.data[0].descricao+'</p>'+
                            '</div>'+
    
                            '<form class="cart clearfix" method="post">'+
                                '<div class="cart-btn d-flex mb-50">'+
                                    '<p id="quantprod">Quantidade</p>'+
                                    '<div class="quantity">'+
                                        '<span class="qty-minus" onclick="aumentaQntd();"><i class="fa fa-caret-down" aria-hidden="true"></i></span>'+
                                        '<input type="number" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1">'+
                                        '<span class="qty-plus" onclick="diminuiQntd();"><i class="fa fa-caret-up" aria-hidden="true"></i></span>'+
                                    '</div>'+
                                '</div>'+
                                '<input type="button" name="addtocart" value="Adicionar ao carrinho" onclick="adicionarCarrinho('+dados.data[0].idProdutos+');" class="button">'+
                           '</form>'+

                        '</div>'+
                    '</div>';
                    document.getElementById('dadosProduto').innerHTML = dados;


                        }
                    }
                });
            //});
        }
}

//funções criadas para poder usar o innerHTML de cima
function aumentaQntd(){
    var effect = document.getElementById('qty'); 
    var qty = effect.value; 
    console.log(qty);
    if( !isNaN( qty )) 
        if(effect.value == 1)
            alert("Necessario pelo menos um produto!");
        else    
            effect.value--;
    return false;
}

function diminuiQntd(){
    var effect = document.getElementById('qty'); 
    var qty = effect.value; 
    if( !isNaN( qty )) 
        effect.value++;
    return false;
}

/*function criaCarrinho(){
    console.log(window.localStorage.getItem("id"));
    $.ajax({//cria um carrinho para o cliente qnd ele loga
        url: '/produtos/criaCarrinho?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        type: 'post',
        error: function (dados) {
            alert('Erro em criar o carrinho 3 ' + dados.data);
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
                        alert('Erro em criar o carrinho' + dados.data);
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

   
}*/



function adicionarCarrinho(id){
  
    var effect = document.getElementById('qty');// pego a quantidade de itens comprados
    var valor = window.sessionStorage.getItem('valorProduto');//valor do produto
    var idComprasAux = window.localStorage.getItem("idCompras");//lista de compras

    var dadosProdutos = ({
        idCompras: idComprasAux,
        idProd: id,
        valorProd: valor,
        qntdProd: effect.value
    });

    console.log(dadosProdutos);

    $.ajax({
        url: '/produtos/adicionarCarrinho',
        dataType: 'json',
        type: 'post',
        data: dadosProdutos,
        error: function (dados) {
            alert('Erro: 1 AddCarrinho ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: 2 ' + dados.data);
            else {
                alert(dados.data);

            }
        }
    });    
}

function dadosCarrinho(){
    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/produtos/lerCarrinho?id=' + window.localStorage.getItem("idCompras"),
        dataType: 'json',
        error: function (dados) {
            alert('Erro em ler o carrinho ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                  console.log(dados.data);
                  exibeCarrinho(dados.data);
                
                }
                  
            }
        });



    dadosEndereco = 
    '<h5>'
    +window.localStorage.getItem("rua") + ',' 
    +window.localStorage.getItem("numero") + ',' 
    +window.localStorage.getItem("cidade") + ',' 
    +window.localStorage.getItem("estado") + '</h5>';    
    console.log(dadosEndereco);
    document.getElementById("endereco").innerHTML = dadosEndereco;
}

    
function exibeCarrinho(dados){
    var aux = dados.length;
    var valorTotal = 0;
    for(var i = 0; i < aux; i++){

        var dadosCarrinho =
            '<tr>' +
            '<td class="cart_product_img">' +
            '<a href="#"><img src="'+ dados[i].caminhoImagem +'" alt="Product"></a>' +
            '</td>' +
            '<td class="price" id="idProdutos">' +
            '<span>'+dados[i].idProdutos+'</span>' +
            '</td>' +
            '<td class="cart_product_desc">' +
            '<h5>'+dados[i].nome+'</h5>' +
            '</td>' +
            '<td class="price">' +
            ' <span>R$'+dados[i].precoAtual+'</span>' +
            '</td>' +
            '<td class="qty">' +
            '<div class="qty-btn d-flex">' +
            '<p>Qtd</p>' +
            '<div class="quantity">' +
            '<span class="qty-minus" onclick="aumentaQntd();"><i class="fa fa-minus"aria-hidden="true"></i></span>' +
            '<input type="number" class="qty-text" id="qty" step="1" min="1" max="300"name="quantity" value="'+dados[i].quantidadeComprada+'">' +
            '<span class="qty-plus" onclick="diminuiQntd();"><i class="fa fa-plus" aria-hidden="true"></i></span>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>';

            document.getElementById("listaCarrinho").innerHTML += dadosCarrinho;
            valorTotal += dados[i].precoAtual * dados[i].quantidadeComprada;
    }
    window.localStorage.valorTotal = valorTotal;
    var dadosValor = 
    '<h5 id="dadosValor" >R$'+ valorTotal+ '</h5>';    
    document.getElementById("total").innerHTML = dadosValor;
    //console.log(valorTotal);


    if(valorTotal === 0)
    {
        var dadosValor = 
        '<h5>R$ 0.00'+'</h5>';    
        document.getElementById("total").innerHTML = dadosValor;
    }

    else
    {
        var dadosValor = 
        '<h5>R$'+ valorTotal+ '</h5>';    
        document.getElementById("total").innerHTML = dadosValor;
    }

}

function finalizaCompra(){

    var dadosFinalizaCompra = ({
        idCompras: window.localStorage.getItem("idCompras"),
        valor: window.localStorage.getItem("valorTotal")
    }); 

    console.log(dadosFinalizaCompra);
    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/produtos/finalizaCompra',
        dataType: 'json',
        type: 'post',
        data: dadosFinalizaCompra,
        error: function (dados) {
            alert('Erro ao finalizar a compra ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                  alert(dados.data);
                  window.localStorage.compraFinalizada = true;
                  window.location.href = '/index.html'
                }
                  
            }
        });
}

function excluiProduto(){
    var id = document.getElementById("id").textContent;
    console.log(id);
}