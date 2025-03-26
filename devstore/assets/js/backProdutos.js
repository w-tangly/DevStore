// Cria os vetores para armazenar os dados do Back-End
var idsProds=[];
var descProds=[];
var precoProds=[];
var tamanhoProds=[];
var fotoProds=[];
var categoriaProds=[];

// informa ao navegador para chamar a função ao carregar a página
window.onload=()=>{
    pesquisaProdutos();
}

// Cria a função pesquisaProdutos()
// Essa função requisita e carrega os resultados
function pesquisaProdutos(){
    limpa_vetores();

    // faz a requisição do Back-End
    fetch('http://localhost/devstore/produtos.php')

    // Transforma a resposta em Json
    .then(response=>response.json())
    .then(data=>{
        // Captura as 2 listas de produtos
        const divProds = document.getElementById('products-area');
        const divSeen = document.getElementById('products-seen');

        // Exclui o conteúdo atual
        divProds.replaceChildren();
        divSeen.replaceChildren();

        // Estrutura para alimentar os vetores
        for (var i=0; i<data.length; i++){
            // Push adiciona um item no final de cada vetor
            idsProds.push(data[i].idProd);
            descProds.push(data[i].descProd);
            precoProds.push(data[i].precoProd);
            categoriaProds.push(data[i].categoriaProd);
            tamanhoProds.push(data[i].tamanhoProd);
            fotoProds.push(data[i].fotoProd);
        }

        // Estrutura para mostrar os cards na tela
        for(var j=1; j<idsProds.length; j=j+4){
            var id = idsProds[j];
            var desc = descProds[j];
            var tamanho = tamanhoProds[j];
            var preco = precoProds[j];
            var foto = fotoProds[j];
            var categoria = categoriaProds[j];

            // Cria uma div para o produto
            var cardProd = document.createElement('div');
            cardProd.setAttribute('class', 'product-item');
            cardProd.innerHTML = '<a href:"./products.html?idProd='+id+'">'+'<div class="product-photo">'+'<img src="./assets/images/products/'+foto+'"/>'
        }
    })
}


// products-area
// products-seen