function exibeProdutos(produtos) {
    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i];
        var dadosProdutos =

            '<div class="single-products-catagory clearfix" id="' + produto.idImagensProdutos + '">' +
            '<a href="detalheProduto.html?id=' + produto.idProdutos + '">' +
            '<img src="' + produto.caminhoImagem + '">' +
            '<div class="hover-content">' +
            '<div class="line"></div>' +
            '<p>R$' + produto.precoAtual + '</p>' +
            '<h4>' + produto.nome + '</h4>' +
            '</div>' +
            '</a>' +
            '</div>';

        document.getElementById('result').innerHTML += dadosProdutos;
    }
}


function lerProduto() {
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

                    var dados = '<div class="col-12 col-lg-7">' +
                        '<div class="single_product_thumb">' +

                        '<div id="product_details_slider" class="carousel slide" data-ride="carousel">' +
                        '<div class="carousel-item active">' +
                        '<a  class="gallery_img" >' +
                        '<img  class="d-block w-100" id="imagemProduto"  height="20em" src="' + dados.data[0].caminhoImagem + '">' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +

                        '<div class="col-12 col-lg-5">' +
                        '<div class="single_product_desc">' +
                        '<div class="product-meta-data">' +
                        '<div class="line"></div>' +
                        '<p id="preco-produto"  class="product-price">R$ ' + dados.data[0].precoAtual + '</p>' +
                        '<p id="titulo-produto">' + dados.data[0].nome + '</p>' +
                        '<p id="tempo-produto" class="avaibility"><i class="fa fa-circle"></i></p>' +
                        '</div>' +

                        '<div id="descricao-produtos" class="short_overview my-5">' +
                        '<p>Descrição: ' + dados.data[0].descricao + '</p>' +
                        '</div>' +

                        '<form class="cart clearfix" method="post">' +
                        '<div class="cart-btn d-flex mb-50">' +
                        '<p id="quantprod">Quantidade</p>' +
                        '<div class="quantity">' +
                        '<span class="qty-minus" onclick="aumentaQntd();"><i class="fa fa-caret-down" aria-hidden="true"></i></span>' +
                        '<input type="number" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1">' +
                        '<span class="qty-plus" onclick="diminuiQntd();"><i class="fa fa-caret-up" aria-hidden="true"></i></span>' +
                        '</div>' +
                        '</div>' +
                        '<input type="button" name="addtocart" value="Adicionar ao carrinho" onclick="adicionarCarrinho(' + dados.data[0].precoAtual + ', ' + dados.data[0].idProdutos + ');"  class="button">' +
                        '</form>' +

                        '</div>' +
                        '</div>';
                    document.getElementById('dadosProduto').innerHTML = dados;


                }
            }
        });
        //});
    }
}

//funções criadas para poder usar o innerHTML de cima
function aumentaQntd() {
    var effect = document.getElementById('qty');
    var qty = effect.value;
    console.log(qty);
    if (!isNaN(qty))
        if (effect.value == 1)
            alert("Necessario pelo menos um produto!");
        else
            effect.value--;
    return false;
}

function diminuiQntd() {
    var effect = document.getElementById('qty');
    var qty = effect.value;
    if (!isNaN(qty))
        effect.value++;
    return false;
}


function adicionarCarrinho(valor, id) {
    var effect = document.getElementById('qty');// pego a quantidade de itens comprados
    var src = document.getElementById('imagemProduto').src;
    var nome = document.getElementById('titulo-produto').textContent;

    //limpa o endereco da imagem
    var textoReplace = "http://localhost:3000/";
    var resultado_str = src.substring(src.indexOf(textoReplace) + textoReplace.length);

    //var dadosProdutos = '[{"nome": "'+nome+'"},{"imagem": "'+resultado_str+'"},{"idProd": '+id+'},{"valorProd": '+valor+'},{"qntdProd": '+effect.value+'}]';

    var dadosProdutos = ({
        nome: nome,
        imagem: resultado_str,
        idProd: id,
        valorProd: valor,
        qntdProd: effect.value
    });

    console.log((dadosProdutos));
    window.sessionStorage.setItem("produtoCarrinho" + id, JSON.stringify(dadosProdutos));
    alert("Produto adicionado no carrinho com sucesso!");
    window.location.href = '/index.html';


}

function dadosCarrinho() {

    exibeCarrinho();

    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/acesso/lerDadosPessoais?id=' + window.localStorage.getItem("id"),
        dataType: 'json',
        error: function (dados) {
            alert('Erro em endereco do cliente ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {

                var dadosEndereco =
                    '<h5>'
                    + dados.data[0].rua + ','
                    + dados.data[0].numero + ','
                    + dados.data[0].cidade + ','
                    + dados.data[0].estado + '</h5>';
                console.log(dadosEndereco);
                document.getElementById("endereco").innerHTML = dadosEndereco;

            }
        }
    });
}





function exibeCarrinho() {

    /*0: {nome: "Teste"}
    1: {imagem: "img/bg-img/1.jpg"}
    2: {idProd: 1}
    3: {valorProd: 1000}
    4: {qntdProd: 1}*/
    var valorTotal = 0;
    var produtos = Object.keys(sessionStorage);
    for (var i = 0; i < produtos.length; i++) {
        console.log("PUDIM " + i + produtos[i]);
        console.log(JSON.parse(window.sessionStorage.getItem(produtos[i])));
        var aux = JSON.parse(window.sessionStorage.getItem(produtos[i]));

        console.log("typeof(aux) " +typeof(aux));
        var dadosCarro =
            '<tr>' +
            '<td class="cart_product_img">' +
            '<a href="#"><img src="' + aux.imagem + '" alt="Product"></a>' +
            '</td>' +
            '<td class="price" id="idProdutos">' +
            '<span>' + aux.idProd + '</span>' +
            '</td>' +
            '<td class="cart_product_desc">' +
            '<h5>' + aux.nome + '</h5>' +
            '</td>' +
            '<td class="price" id="idProdutoValor">' +
            ' <span>R$' + aux.valorProd + '</span>' +
            '</td>' +
            '<td class="qty"  >' +
            '<div class="qty-btn d-flex">' +
            '<p>Qtd</p>' +
            '<div class="quantity" >' +
            '<span class="qty-minus" onclick="aumentaQntd();"><i class="fa fa-minus"aria-hidden="true"></i></span>' +
            '<input type="number" class="qty-text" id="qty" step="1" min="1" max="300"name="quantity" value="' + aux.qntdProd + '">' +
            '<span class="qty-plus" onclick="diminuiQntd();"><i class="fa fa-plus" aria-hidden="true"></i></span>' +
            '</div>' +
            '</div>' +
            '<button  onclick="excluiProduto(' + aux.idProd + ', ' + aux.valorProd + ');">Remover</button>' +
            '</td>' +
            '</tr>';

        document.getElementById("listaCarrinho").innerHTML += dadosCarro;
        valorTotal += JSON.parse(window.sessionStorage.getItem(produtos[i])).valorProd * JSON.parse(window.sessionStorage.getItem(produtos[i])).qntdProd;
    }

    window.localStorage.valorTotal = valorTotal;
    var dadosValor =
        '<h5 id="dadosValor" >R$' + valorTotal + '</h5>';
    document.getElementById("total").innerHTML = dadosValor;
    //console.log(valorTotal);


    if (valorTotal === 0) {
        var dadosValor =
            '<h5>R$ 0.00' + '</h5>';
        document.getElementById("total").innerHTML = dadosValor;
    }

    else {
        var dadosValor =
            '<h5>R$' + valorTotal + '</h5>';
        document.getElementById("total").innerHTML = dadosValor;
    }
}

function finalizaCompra() {

    var produtos = Object.keys(sessionStorage);
    var dadosFinalizaCompra = ({
        id: window.localStorage.getItem("id"),
        valor: window.localStorage.getItem("valorTotal")
    })

    console.log("teste " + (dadosFinalizaCompra));
    //console.log((dadosFinalizaCompra));
    var dadosAddCarrinho = new Array(produtos.length);
    for (var i = 0; i < produtos.length; i++) {

        var aux = JSON.parse(window.sessionStorage.getItem(produtos[i]));
        console.log(aux);

        
      
        dadosAddCarrinho[i] = ({ 
            idProd: aux.idProd, 
            valor: aux.valorProd, 
            qntd: aux.qntdProd 
         });

         console.log("teste 2 " + typeof(dadosAddCarrinho));

       
    
    }
    
    //console.log(dadosAddCarrinho);
   console.log("teste 3 " + typeof((dadosFinalizaCompra)));
    console.log((dadosFinalizaCompra));

    $.ajax({//idCarrinho para pegar o id do carrinho do usuario
        url: '/produtos/finalizaCompra?teste= '+ JSON.stringify(dadosAddCarrinho),
        dataType: 'json',
        type: 'post',
        data: (dadosFinalizaCompra),
        error: function (dados) {
            alert('Erro ao finalizar a compra ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'SEMACESSO')
                alert('Erro: 2 ' + dados.data);
            else {
                alert(dados.data);
                //console.log(dados.data);
                window.sessionStorage.clear();
                window.location.href = '/index.html'
                
            }
        }
    });
}

function excluiProduto(idProduto, precoAtual) {

    var produtos = "produtoCarrinho" + idProduto;
    console.log(produtos);
    window.sessionStorage.removeItem(produtos);
    alert("Item " + idProduto + " excluido com sucesso!");
    window.location.href = '/carrinho.html';

    /*var dadosExclusao = ({
        idProdutos: idProduto,
        idCompras: window.localStorage.getItem('idCompras')
    });

    var valorProduto = document.getElementById("idProdutoValor").textContent;
    console.log(valorProduto);

    $.ajax({
        url: '/produtos/deletaProduto',
        dataType: 'json',
        type: 'post',
        data: dadosExclusao,
        error: function (dados) {
            alert('Erro: 1 ExcluiItem ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro: 2 ' + dados.data);
            else {
                window.localStorage.valorTotal = window.localStorage.valorTotal - precoAtual;
                var dadosValor = '<h5 id="dadosValor" >R$'+ window.localStorage.valorTotal + '</h5>';    
                document.getElementById("total").innerHTML = dadosValor;

                if(window.localStorage.valorTotal === 0) {
                    var dadosValor = 
                    '<h5>R$ 0.00'+'</h5>';    
                    document.getElementById("total").innerHTML = dadosValor;
                }

                window.location.href = '/carrinho.html'
            }
        }
    });    */

}