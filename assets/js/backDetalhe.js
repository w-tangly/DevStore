//procura pelo parametro na barra do navegador
const queryString = window.location.search;
//parametros de url
const urlParams = new URLSearchParams(queryString);
//pegar o id do produto na barra de endereços
var id = urlParams.get('idProd');
//cria os vetores para as sugestões de produtos
var idsProds=[];
var descProds = [];
var precoProds = [];
var tamanhoProds = [];
var fotoProds = [];
var categoriaProds = [];
//função para zerar os vetores
function limpa_vetores(){
    idsProds=[];
    descProds = [];
    precoProds = [];
    tamanhoProds = [];
    fotoProds = [];
    categoriaProds = [];
}
//função do evento onload
window.onload=()=>{
    pesquisaProduto();
}
//função para pesquisar o produto pelo id
function pesquisaProduto(){
    //limpar os vetores
    limpa_vetores();
    //requisita o backend passando o id
    fetch('http://localhost/devstore/'+
        'produtos.php?idProd='+id)
    //traz a resposta pra json
    .then(response=>response.json())
    //manipula os dados da resposta
    .then(data=>{
        //pega os elementos do html
        const breadcrumb = 
        document.getElementById('breadcrumb');
        breadcrumb.replaceChildren();
        const divProduct = 
        document.getElementById('product');
        const fotoProd = 
        document.getElementById('fotoProd');
        const idProd = 
        document.getElementById('idProd');
        const nomeProd = 
        document.getElementById('nomeProd');
        const tamProd = 
        document.getElementById('tamProd');
        const precoProd = 
        document.getElementById('precoProd');
        const descProd = 
        document.getElementById('descProd');
        const precoCheio = 
        document.getElementById('precoCheio');
        //estrutura para alimentar os detalhes
        for(var j=0;j<1;j++){
            //variaveis para os detalhes
            var id = data[j].idProd;
            var desc = data[j].descProd;
            var tamanho = data[j].tamanhoProd;
            var preco = data[j].precoProd;
            var foto = data[j].fotoProd;
            var categoria = data[j].categoriaProd;
            //altera o conteudo dos elementos
            breadcrumb.textContent =
            'Home > '+categoria+' > '+desc;
            fotoProd.setAttribute('src',
                './assets/images/products/'+foto
            );
            idProd.textContent = 'CÓD: '+id;
            nomeProd.textContent = desc;
            tamProd.innerHTML = 
            '<div class="btn-icon">'+tamanho+'</div>';
            precoProd.textContent = 'R$: '+preco;
            descProd.innerHTML = desc + '<br>' + desc +
            '<br>'+desc+'<br>';
            let precoNormal = preco * 1.5;
            precoCheio.innerHTML =
            'de <span>R$ '+precoNormal.toFixed(2)+
            '</span> por:';
        }
        pesquisaSelecionados();
    })
    .catch(error=>{
        alert('Erro: '+error);
    });

}
//função para carregar os selecionados
//reaproveitar do outro js
function pesquisaSelecionados(){
    limpa_vetores();
    //faz a requisicao ao backend
    fetch('http://localhost/devstore/produtos.php')
    //transforma a resposta do servidor
    .then(response=>response.json())
    //manipula os dados e monta a resposta na tela
    .then(data=>{
        //captura as 2 listas de produt
        const divProds = 
        document.getElementById('products-area');
       
        //exclui o conteudo atual
        divProds.replaceChildren();
        
        //estrutura para alimentar os vetores
        for(var i=0;i<data.length;i++){
            //push adiciona um item no final
            //de cada vetor
            idsProds.push(data[i].idProd);
            descProds.push(data[i].descProd);
            precoProds.push(data[i].precoProd);
            categoriaProds.push(data[i].categoriaProd);
            tamanhoProds.push(data[i].tamanhoProd);
            fotoProds.push(data[i].fotoProd);
        }
        //estrutura para montar os cards na tela
        for(var j=1;j<idsProds.length;j=j+4){
            var id = idsProds[j];
            var desc = descProds[j];
            var tamanho = tamanhoProds[j];
            var preco = precoProds[j];
            var foto = fotoProds[j];
            var categoria = categoriaProds[j];
            //cria uma div para o produto
            var cardProd = 
            document.createElement('div');
            cardProd.setAttribute('class',
                'product-item');
            cardProd.innerHTML = 
            '<a href="./product.html?idProd='+id+'">'+
            '<div class="product-photo">'+
            '<img src="./assets/images/products/'+foto+
            '"/>'+
            '</div>'+
            '<div class="product-name">'+desc+'</div>'+
            '<div class="product-price">R$'+preco+'</div>'+
            '<div class="product-info">Pague via Pix</div>'+
            '</a><div class="product-fav">'+
            '<img src="./assets/images/ui/heart-3-line.png"/>'+
            '</div></div>';
            divProds.appendChild(cardProd);
            
        }
        
    })
    .catch(error=>{
        alert("Erro: "+error);
    });
}
