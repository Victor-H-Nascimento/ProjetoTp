

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
<<<<<<< Updated upstream
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
=======
              alert(dados.data);
              window.localStorage.compraFinalizada = true;
              window.location.href = '/index.html'
          }
      }
  });
>>>>>>> Stashed changes
}

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
<<<<<<< Updated upstream
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
=======
              alert(dados.data);
              window.localStorage.compraFinalizada = true;
              window.location.href = '/index.html'
          }
      }
  });
>>>>>>> Stashed changes
}

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
<<<<<<< Updated upstream
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
=======
              alert(dados.data);
              window.localStorage.compraFinalizada = true;
              window.location.href = '/index.html'
          }
      }
  });
>>>>>>> Stashed changes
}
                            var dados =  '<div class="col-12 col-lg-7">'+
                            '<div class="single_product_thumb">'+

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
<<<<<<< Updated upstream
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
=======
              alert(dados.data);
              window.localStorage.compraFinalizada = true;
              window.location.href = '/index.html'
          }
      }
  });
>>>>>>> Stashed changes
}