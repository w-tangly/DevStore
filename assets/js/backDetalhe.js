// procura pelo parâmetro na barra do navegador
const queryString = window.location.search

// parâmetros de url
const urlParams = new URLSearchParams(queryString)

// pegar o id do produto na barra de endereços
var id = urlParams.get('idProd')