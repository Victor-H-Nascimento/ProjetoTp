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



     /*var produtosLimpos;
        var j = 0;//para percorrer o vetor de limpos
        for (var i = 0; i < produtos.length; i++) {
            if (produtosLimpos === NULL || produtosLimpos === undefined){
                produtosLimpos[j] = produtos[i];
                j++;
            }

            else{
                for (var x = 0; x < j; x++) {
                    if(produtosLimpos[x].id)
                }
            }

        }*/

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
                          var dados =  '<div class="col-12 col-lg-7">'+
                        '<div class="single_product_thumb">'+
                            
                            '<div id="product_details_slider" class="carousel slide" data-ride="carousel">' +                                                     
                                '<div class="carousel-item active">'+
                                    '<a id="imagemProduto" class="gallery_img" href="'+ dados.data[0].caminhoImagem +'">'+
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
                                    '<p>Quantidade</p>'+
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
    var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value--;return false;
}

function diminuiQntd(){
    var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;
}

function adicionarCarrinho(id){
    if (req.session.logado) {
    console.log(id);
    }
    else {
        res.json({ status: 'SEMACESSO', data: 'Usuário precisa estar logado!' });
        }
    /*$.ajax({
        url: '/produtos/adicionarCarinho?id=' + id,
        dataType: 'json',
        error: function (dados) {
            alert('Erro: 1 ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: 2 ' + dados.data);
            else {
            }
        }
    }*/
}