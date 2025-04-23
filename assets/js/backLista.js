// Captura a barra de endereços do navegador
const queryString = window.location.search;

// Procura por parametros na barra de endereços
const urlParams = new URLSearchParams(queryString);

// Váriavel para pegar o parâmetro da categoria
var cat = urlParams.get('categoriaProd');

// Declara os vetores para carregar os produtos
var idsProds=[];
var descProds=[];
var precoProds=[];
var tamanhoProds=[];
var fotoProds=[];
var categoriaProds=[];

// Função para limpar os vetores
function limpa_vetores(){
    idsProds=[];
    descProds=[];
    precoProds=[];
    tamanhoProds=[];
    fotoProds=[];
    categoriaProds=[];
}

// Evento que é executado no carregamento da página
window.onload=()=>{
    pesquisaProdutosCategoria();
}

// Função para trazer os produtos por categoria
function pesquisaProdutosCategoria(){
    // Evitar a duplicação
    limpa_vetores();

    // Faz a requisição ao backend
    fetch('http://localhost/devstore/produtos.php?categoriaProd='+cat)

    // Transforma em json
    .then(response=>response.json())

    // Manipula os dados vindos no json
    .then(data=>{
        // Captura a div dos produtos
        const divProds = document.getElementById('produtosGrid');

        // Zera a grid de produtos
        divProds.replaceChildren();

        // Captura a qtde de produtos
        const qtde = document.getElementById('qtde');

        // Captura o breadcrumb
        const breadcrumb = document.getElementById('breadcrumb');
        
        // Zera o breadcrumb
        breadcrumb.replaceChildren();

        // Novo breadcrumb
        breadcrumb.textContent = 'Home > '+cat;
    })
}